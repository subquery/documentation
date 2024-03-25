# Base Quick Start

The goal of this quick start guide is to index the all the claims from the [Bridge to Base NFT contract](https://basescan.org/token/0xEa2a41c02fA86A4901826615F9796e603C6a4491) on [Base Mainnet](https://docs.base.org/using-base/).

Here is a description from Base team about this NFT collection: _"This NFT commemorates you being early — you’re one of the first to teleport into the next generation of the internet as we work to bring billions of people onchain."_

<!-- @include: ../snippets/evm-quickstart-reference.md -->

::: tip Code
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Base/base-nft).
:::

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

As we are indexing all user claims from the Bridge to Base NFT contract, the first step is to import the contract abi definition which can be obtained from [here](https://basescan.org/token/0xEa2a41c02fA86A4901826615F9796e603C6a4491#code). Copy the entire contract ABI and save it as a file called `erc721base.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 2155076,

      options: {
        // Must be a key of assets
        abi: "erc721base",
        // This is the contract address for Bridge To Base NFT Collection 0xea2a41c02fa86a4901826615f9796e603c6a4491
        address: "0xea2a41c02fa86a4901826615f9796e603c6a4491",
      },
      assets: new Map([["erc721base", { file: "./abis/erc721base.abi.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleNftClaim",
            filter: {
              /**
               * Follows standard log filters https://docs.ethers.io/v5/concepts/events/
               */
              topics: [
                " TokensClaimed (uint256 claimConditionIndex, address claimer, address receiver, uint256 startTokenId, uint256 quantityClaimed)\n",
              ],
            },
          },
        ],
      },
    },
  ],
}
```

The above code indicates that you will be running a `handleNftClaim` mapping function whenever there is a `TokensClaimed` event being logged on any transaction from the [Bridge to Base NFT contract](https://basescan.org/token/0xEa2a41c02fA86A4901826615F9796e603C6a4491).

<!-- @include: ../snippets/ethereum-manifest-note.md -->

<!-- @include: ../snippets/schema-intro.md#level2 -->

::: tip Etheruem
We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for Base. Since Base is an EVM-compatible layer-2 scaling solution, we can use the core Ethereum framework to index it.
:::

Remove all existing entities and update the `schema.graphql` file as follows. Here you can see we are indexing block information such as the id, blockHeight, claimer and claim receiver along with an aggregation of the total quantity of NFTs claimed per day.

```graphql
type Claim @entity {
  id: ID! # Transaction hash
  blockHeight: BigInt!
  timestamp: Date!
  claimer: String!
  receiver: String!
  tokenId: BigInt!
  quantity: BigInt!
}

# The following entity allows us to aggregate daily claims from the Bridge to Base NFT contract.
type DailyAggregation @entity {
  id: ID! # YYYY-MM-DD
  totalQuantity: BigInt!
}
```

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/evm-codegen.md -->

```ts
import { Claim, DailyAggregation } from "../types";
import { TokensClaimedLog } from "../types/abi-interfaces/Erc721baseAbi";
```

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro.md#level2 -->

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see two exported functions `handleNftClaim` and `handleDailyAggregation`:

```ts
export async function handleNftClaim(log: TokensClaimedLog): Promise<void> {
  logger.info(`New claim log at block ${log.blockNumber}`);
  assert(log.args, "No log.args");

  let date = new Date(Number(log.block.timestamp) * 1000);

  const claim = Claim.create({
    id: log.transactionHash,
    blockHeight: BigInt(log.blockNumber),
    timestamp: date,
    claimer: log.args.claimer,
    receiver: log.args.receiver,
    tokenId: log.args.startTokenId.toBigInt(),
    quantity: log.args.quantityClaimed.toBigInt(),
  });

  await handleDailyAggregation(date, claim.quantity);

  await claim.save();
}

export async function handleDailyAggregation(
  date: Date,
  quantity: bigint,
): Promise<void> {
  const id = date.toISOString().slice(0, 10);
  let aggregation = await DailyAggregation.get(id);
  logger.info(`New daily aggregation at ${id}`);

  if (!aggregation) {
    aggregation = DailyAggregation.create({
      id,
      totalQuantity: BigInt(0),
    });
  }

  aggregation.totalQuantity = aggregation.totalQuantity + quantity;

  await aggregation.save();
}
```

The `handleNftClaim` function receives a `log` parameter of type `TokensClaimedLog` which includes log data in the payload. We extract this data and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

<!-- @include: ../snippets/ethereum-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
# Write your query or mutation here
query {
  claims(first: 5) {
    nodes {
      id
      blockHeight
      timestamp
      claimer
      receiver
      tokenId
      quantity
    }
  }

  dailyAggregations(orderBy: TOTAL_QUANTITY_ASC) {
    nodes {
      id
      totalQuantity
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
          "id": "0xd91db90047591afbe6ef1c85d2ad0505ee46be161a82fdb79f569194383ed51e",
          "blockHeight": "2155198",
          "timestamp": "2023-08-03T21:55:43",
          "claimer": "0x0bAE5E0BE6CEA98C61591354a5F43339fdD5b611",
          "receiver": "0x0bAE5E0BE6CEA98C61591354a5F43339fdD5b611",
          "tokenId": "2313836",
          "quantity": "1000"
        },
        {
          "id": "0x0114a68ebb4ee609409931a4c62abd2256a66f0fb91388ca00003765186c0e60",
          "blockHeight": "2155088",
          "timestamp": "2023-08-03T21:52:03",
          "claimer": "0x8A17AD3aB5588AE18B0f875dfb65f7AD61D95bDd",
          "receiver": "0x8A17AD3aB5588AE18B0f875dfb65f7AD61D95bDd",
          "tokenId": "2312064",
          "quantity": "1"
        },
        {
          "id": "0x3ccdc484d705776eba946e67e3577c0a629cc82027da6e866717412a158de9e9",
          "blockHeight": "2155088",
          "timestamp": "2023-08-03T21:52:03",
          "claimer": "0x7a2aaecf0c3bF01411f7AAe7DBB97535a7205498",
          "receiver": "0x7a2aaecf0c3bF01411f7AAe7DBB97535a7205498",
          "tokenId": "2312054",
          "quantity": "10"
        },
        {
          "id": "0x1ab0a99382c2ccbed4b64cf1407be214e5d23deff5028a1e4c751d65a1864c04",
          "blockHeight": "2155087",
          "timestamp": "2023-08-03T21:52:01",
          "claimer": "0x51A7b9AFb62dB473107e4a220CedDa67a8025630",
          "receiver": "0x51A7b9AFb62dB473107e4a220CedDa67a8025630",
          "tokenId": "2311934",
          "quantity": "100"
        },
        {
          "id": "0x7cb2474628b4ca6598c008b47dd3956632813b38c6ade08f64dbf59c7d5ad658",
          "blockHeight": "2155092",
          "timestamp": "2023-08-03T21:52:11",
          "claimer": "0x2B4FC7483C42312C3f62feE98671f7407770f16f",
          "receiver": "0x2B4FC7483C42312C3f62feE98671f7407770f16f",
          "tokenId": "2312138",
          "quantity": "1"
        }
      ]
    },
    "dailyAggregations": {
      "nodes": [
        {
          "id": "2023-08-03",
          "totalQuantity": "3184"
        }
      ]
    }
  }
}
```

::: tip Code
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Base/base-nft).
:::

<!-- @include: ../snippets/whats-next.md -->
