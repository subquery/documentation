# Optimism Quick Start

The goal of this quick start guide is to index all claim events from the Optimism airdrop contract. Check out the video or follow the step by step instructions below.

<br/>
<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/lGm0wJWQQMA" frameborder="0" allowfullscreen="true"></iframe>
</figure>

Please initialise an Optimism project

<!-- @include: ../snippets/evm-quickstart-reference.md -->

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Optimism/optimism-airdrop). We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for Optimism. Since Optimism is a layer-2 scaling solution, we can use the core Ethereum framework to index it.
:::

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

As we are indexing all claim events from the Optimism airdrop contract, the first step is to import the contract abi definition which can be obtained from [here](https://optimistic.etherscan.io/address/0xfedfaf1a10335448b7fa0268f56d2b44dbd357de#code). Copy the entire contract ABI and save it as a file called `airdrop.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 100316590, // When the airdrop contract was deployed https://optimistic.etherscan.io/tx/0xdd10f016092f1584912a23e544a29a638610bdd6cb42a3e8b13030fd78334eba
      options: {
        // Must be a key of assets
        abi: "airdrop",
        // this is the contract address for Optimism Airdrop https://optimistic.etherscan.io/address/0xfedfaf1a10335448b7fa0268f56d2b44dbd357de
        address: "0xFeDFAF1A10335448b7FA0268F56D2B44DBD357de",
      },
      assets: new Map([["airdrop", { file: "./abis/airdrop.abi.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleClaim",
            filter: {
              topics: [
                "Claimed(uint256 index, address account, uint256 amount)",
              ],
            },
          },
        ],
      },
    },
  ],
}
```

The above code indicates that you will be running a `handleClaim` mapping function whenever there is a `Claimed` log on any transaction from the [Optimism airdrop contract](https://optimistic.etherscan.io/address/0xfedfaf1a10335448b7fa0268f56d2b44dbd357de#code).

<!-- @include: ../snippets/evm-manifest-note.md -->

<!-- @include: ../snippets/schema-intro-level2.md -->

Remove all existing entities and update the `schema.graphql` file as follows. Here you can see we are indexing block information such as the id, blockHeight and timestamp along with the value and the total claimed amount.

```graphql
type Claim @entity {
  id: ID! # Index
  transaction_hash: String!
  account: String!
  value: BigInt!
  block_height: BigInt!
  block_timestamp: BigInt!
  daily_claim_summary: DailyClaimSummary!
}

type DailyClaimSummary @entity {
  id: ID! # this is the ISO string of the day e.g. '2023-03-26'
  total_claimed: BigInt!
}
```

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/evm-codegen.md -->

```ts
import { Claim, DailyClaimSummary } from "../types";
import { ClaimedLog } from "../types/abi-interfaces/AirdropAbi";
```

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro-level2.md -->

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see two exported functions: `handleLog`, and `handleTransaction`. Replace these functions with the following code:

```ts
import { ClaimedLog } from "../types/abi-interfaces/AirdropAbi";
import assert from "assert";
import { Claim } from "../types/models/Claim";
import { DailyClaimSummary } from "../types/models/DailyClaimSummary";

async function checkGetDailyClaim(
  timestamp: bigint
): Promise<DailyClaimSummary> {
  // Create the ID from the iso date string (e.g. '2023-03-26')
  // Timestamps are in seconds, need to convert to ms
  const id = new Date(Number(timestamp) * 1000).toISOString().substring(0, 10);
  // Read to see if there is an existing aggregation record
  let dailyClaimSummary = await DailyClaimSummary.get(id);
  if (!dailyClaimSummary) {
    // This is a new day! Create a new aggregation
    dailyClaimSummary = DailyClaimSummary.create({
      id,
      total_claimed: BigInt(0),
    });
  }
  return dailyClaimSummary;
}

export async function handleClaim(log: ClaimedLog): Promise<void> {
  logger.info(`New claimed log at block ${log.blockNumber}`);
  assert(log.args, "No log.args");

  // We make sure we have a daily claim aggregation to update
  const dailyClaimSummary = await checkGetDailyClaim(log.block.timestamp);

  const newClaim = Claim.create({
    id: log.args.index.toString(),
    account: log.args.account,
    transaction_hash: log.transactionHash,
    block_height: BigInt(log.blockNumber),
    block_timestamp: log.block.timestamp,
    value: log.args.amount.toBigInt(),
    daily_claim_summaryId: dailyClaimSummary.id,
  });

  // We update the daily aggregation
  dailyClaimSummary.total_claimed += newClaim.value;

  // Save data to the store
  await dailyClaimSummary.save();
  await newClaim.save();
}
```

The `handleClaim` function receives a `log` parameter of type `ClaimedLog` which includes transaction log data in the payload. We extract this data, assign it to our newClaim object, and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_). We also call the `checkGetDailyClaim` function to retrieve the existing day aggregation (and create a new one if we need to), and the update the `total_claimed` on it.

<!-- @include: ../snippets/evm-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
# Write your query or mutation q{here
query {
  claims(first: 5, orderBy: VALUE_DESC) {
    nodes {
      blockHeight
      value
      blockHeight
      blockTimestamp
      account
    }
  }
  dailyClaimSummaries(first: 5) {
    nodes {
      id
      totalClaimed
      claims(first: 5) {
        totalCount
        nodes {
          id
          account
          value
        }
      }
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "claims": {
      "nodes": [
        {
          "blockHeight": "100322581",
          "value": "7477664852469040021504",
          "blockTimestamp": "1684714980",
          "account": "0x85399353400C5B67fD6eE53B1d2cd183bAE7dDdb"
        },
        {
          "blockHeight": "100316590",
          "value": "1746193727981909180416",
          "blockTimestamp": "1684711341",
          "account": "0xfa4d3CD41555d3A0FafD4A97e9ba91882A2f4755"
        }
      ]
    },
    "dailyClaimSummaries": {
      "nodes": [
        {
          "id": "2023-05-21",
          "totalClaimed": "9223858580450949201920",
          "claims": {
            "totalCount": 2,
            "nodes": [
              {
                "id": "247333",
                "account": "0xfa4d3CD41555d3A0FafD4A97e9ba91882A2f4755",
                "value": "1746193727981909180416"
              },
              {
                "id": "129721",
                "account": "0x85399353400C5B67fD6eE53B1d2cd183bAE7dDdb",
                "value": "7477664852469040021504"
              }
            ]
          }
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Optimism/optimism-airdrop).
:::

<!-- @include: ../snippets/whats-next.md -->
