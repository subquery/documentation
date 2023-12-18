# Arbitrum Quick Start

The goal of this quick start guide is to index the total claimed dividends paid to users on the [WINR staking contract](https://arbiscan.io/address/0xddAEcf4B02A3e45b96FC2d7339c997E072b0d034) on Arbitrum. Check out the video or follow the step by step instructions below.

<br/>
<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/7N-GE3ZuNdM" frameborder="0" allowfullscreen="true"></iframe>
</figure>

<!-- @include: ../snippets/evm-quickstart-reference.md -->

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Arbitrum/arbitrum-one-winr).
:::

We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for Arbitrum. Since Arbitrum is an EVM-compatible layer-2 scaling solution, we can use the core Ethereum framework to index it.

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

As we are indexing all claimed dividends from the WINR contract, the first step is to import the contract abi definition which can be obtained from [here](https://arbiscan.io/address/0xddaecf4b02a3e45b96fc2d7339c997e072b0d034#code). Copy the entire contract ABI and save it as a file called `winr-staking.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      // This is the block of the first claim dividend https://arbiscan.io/tx/0x300b6199816f44029408efc850fb9d6f8751bbedec3e273909eac6f3a61ee3b3
      startBlock: 91573785,
      options: {
        // Must be a key of assets
        abi: "winr-staking",
        // This is the contract address for WINR Staking https://arbiscan.io/tx/0x44e9396155f6a90daaea687cf48c309128afead3be9faf20c5de3d81f6f318a6
        address: "0xddAEcf4B02A3e45b96FC2d7339c997E072b0d034",
      },
      assets: new Map([
        ["winr-staking", { file: "./abis/winr-staking.abi.json" }],
      ]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleDividendBatch",
            filter: {
              /**
               * Follows standard log filters https://docs.ethers.io/v5/concepts/events/
               * address: "0x60781C2586D68229fde47564546784ab3fACA982"
               */
              topics: [
                "ClaimDividendBatch(address indexed user, uint256 reward)",
              ],
            },
          },
        ],
      },
    },
  ],
}
```

The above code indicates that you will be running a `handleDividendBatch` mapping function whenever there is a `ClaimDividendBatch` log on any transaction from the [WINR contract](https://arbiscan.io/address/0xddaecf4b02a3e45b96fc2d7339c997e072b0d034#code).

<!-- @include: ../snippets/arbitrum-manifest-note.md -->

<!-- @include: ../snippets/schema-intro-level2.md -->

Remove all existing entities and update the `schema.graphql` file as follows. Here you can see we are indexing block information such as the id, blockHeight and timestamp along with the user, the total rewards and the dividends.

```graphql
type Dividend @entity {
  id: ID! # Transaction hash
  blockHeight: BigInt!
  timestamp: BigInt!
  user: User!
  reward: BigInt!
}

type User @entity {
  id: ID! # Transaction hash
  totalRewards: BigInt!
  dividends: [Dividend]! @derivedFrom(field: "user")
}
```

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/evm-codegen.md -->

```ts
import { Dividend, User } from "../types";
```

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro-level2.md -->

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see three exported functions: `handleBlock`, `handleLog`, and `handleTransaction`. Replace these functions with the following code:

```ts
import { Dividend, User } from "../types";
import { ClaimDividendBatchLog } from "../types/abi-interfaces/WinrStakingAbi";

async function checkGetUser(userID: string): Promise<User> {
  let user = await User.get(userID.toLowerCase());
  if (!user) {
    user = User.create({
      id: userID.toLowerCase(),
      totalRewards: BigInt(0),
    });
  }
  return user;
}

export async function handleDividendBatch(
  batchDividendLog: ClaimDividendBatchLog
): Promise<void> {
  if (batchDividendLog.args) {
    logger.info(`New dividend at block ${batchDividendLog.blockNumber}`);

    const user = await checkGetUser(batchDividendLog.args[0]);

    const dividend = Dividend.create({
      id: `${batchDividendLog.transactionHash}-${batchDividendLog.logIndex}`,
      blockHeight: BigInt(batchDividendLog.blockNumber),
      timestamp: batchDividendLog.block.timestamp,
      userId: user.id,
      reward: batchDividendLog.args[1].toBigInt(),
    });

    user.totalRewards += dividend.reward;

    await user.save();
    await dividend.save();
  }
}
```

The `handleDividendBatch` function receives a `batchDividendLog` parameter of type `ClaimDividendBatchLog` which includes transaction log data in the payload. We extract this data and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

Check out our [Mappings](../../build/mapping/arbitrum.md) documentation to get more information on mapping functions.

<!-- @include: ../snippets/arbitrum-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
# Write your query or mutation q{here
{
  query {
    dividends(first: 2, orderBy: BLOCK_HEIGHT_DESC) {
      totalCount
      nodes {
        id
        userId
        reward
      }
    }
    users(first: 5, orderBy: TOTAL_REWARDS_DESC) {
      totalCount
      nodes {
        id
        totalRewards
        dividends(first: 5) {
          totalCount
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
    "query": {
      "dividends": {
        "totalCount": 1,
        "nodes": [
          {
            "id": "0x44e9396155f6a90daaea687cf48c309128afead3be9faf20c5de3d81f6f318a6-5",
            "userId": "0x9fd50776f133751e8ae6abe1be124638bb917e05",
            "reward": "12373884174795780000"
          }
        ]
      },
      "users": {
        "totalCount": 1,
        "nodes": [
          {
            "id": "0x9fd50776f133751e8ae6abe1be124638bb917e05",
            "totalRewards": "12373884174795780000",
            "dividends": {
              "totalCount": 1
            }
          }
        ]
      }
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Arbitrum/arbitrum-one-winr).
:::

<!-- @include: ../snippets/whats-next.md -->
