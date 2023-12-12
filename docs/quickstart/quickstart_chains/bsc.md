# BNB Smart Chain (BSC) Quick Start

The goal of this quick start guide is to index all deposits and withdrawls to MOBOX pools. [MOBOX](https://www.mobox.io/) has built a unique infrastructure that builds on the growing DeFi ecosystem and combines it with Gaming through unique NFTs. Using Liquidity Pools, Yield Farming, and NFTs, the GameFi infrastructure will not just find the best yield strategies for users but also generate unique NFTs that can be used across a multitude of games.

<!-- @include: ../snippets/evm-quickstart-reference.md -->

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/BNB%20Smart%20Chain/bsc-mobox-rewards).
:::

#### Check out how to get the BSC starter project running

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/2sxpy4NCcS0" frameborder="0" allowfullscreen="true"></iframe>
</figure>

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

::: warning Important
We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Handler`) for BNB Smart Chain (BSC). Since BSC is a layer-2 scaling solution, we can use the core Ethereum framework to index it.
:::

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to import the correct contract definitions and update the datasource handlers.

We are indexing actions from the MOBOX Farming contract, first you will need to import the contract abi definition from [here](https://bscscan.com/address/0xa5f8c5dbd5f286960b9d90548680ae5ebff07652#code). You can copy the entire JSON and save as a file `mobox.abi.json` in the root directory.

This section in the Project Manifest now imports all the correct definitions and lists the triggers that we look for on the blockchain when indexing.

**Since you are going to index all MOBOX Deposits and Withdrawls, you need to update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 17047980, //The block on which the Mobox Farming contract was deployed

      options: {
        // Must be a key of assets
        abi: "mobox_abi",
        // this is the contract address for Mobox Farming contract https://bscscan.com/address/0xa5f8c5dbd5f286960b9d90548680ae5ebff07652#code
        address: "0xa5f8c5dbd5f286960b9d90548680ae5ebff07652",
      },
      assets: new Map([["mobox_abi", { file: "mobox.abi.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleDeposit",
            filter: {
              topics: [
                "Deposit(address indexed user, uint256 indexed pid, uint256 amount)",
              ],
            },
          },
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleWithdraw",
            filter: {
              topics: [
                "Withdraw(address indexed user, uint256 indexed pid, uint256 amount)",
              ],
            },
          },
        ],
      },
    },
  ],
}
```

The above code indicates that you will be running a `handleDeposit` mapping function whenever there is an `Deposit` log on any transaction from the [MOBOX Farming contract](https://bscscan.com/address/0xa5f8c5dbd5f286960b9d90548680ae5ebff07652). Simarly, you'll be running a `handleWithdraw` mapping function whenever there is an `Withdraw` logs.

<!-- @include: ../snippets/evm-manifest-note.md -->

<!-- @include: ../snippets/schema-intro-level2.md -->

Remove all existing entities and update the `schema.graphql` file as follows. Here you can see we are indexing three entities, a `Deposit` and a `Withdrawl` each with a [foreign key relationship](../../build/graphql.md#entity-relationships) to the `User`.

```graphql
type PoolEvent @entity {
  id: ID! # Transaction_hash-log_index
  user: String!
  pool: Pool! # Foreign key
  type: String! # WITHDRAW or DEPOSIT
  value: BigInt!
  block: BigInt!
  timestamp: BigInt!
}

type Pool @entity {
  id: ID! # Pool ID
  totalSize: BigInt!
}
```

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/evm-codegen.md -->

In the example BSC SubQuery project, you would import these types like so.

```ts
import { DepositLog, WithdrawLog } from "../types/abi-interfaces/MoboxAbi";
```

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro-level2.md -->

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see three exported functions: `handleBlock`, `handleLog`, and `handleTransaction`. Replace these functions with the following code (**note the additional imports**):

```ts
import { Pool, PoolEvent } from "../types";
import { DepositLog, WithdrawLog } from "../types/abi-interfaces/MoboxAbi";

async function checkGetPool(id: string): Promise<Pool> {
  // Try get an existing Pool record first by ID
  let poolRecord = await Pool.get(id);
  if (!poolRecord) {
    // Pool record does not exist, create one
    poolRecord = Pool.create({
      id: id,
      totalSize: BigInt(0),
    });
    await poolRecord.save();
  }
  return poolRecord;
}

export async function handleDeposit(deposit: DepositLog): Promise<void> {
  logger.info(`New deposit transaction log at block ${deposit.blockNumber}`);
  const poolId = deposit.args[1].toString();

  // Check and get the pool record from the store
  const poolRecord = await checkGetPool(poolId);

  const poolEventRecord = PoolEvent.create({
    id: `${deposit.transactionHash}-${deposit.logIndex}`,
    user: deposit.args[0],
    poolId,
    type: "DEPOSIT",
    value: deposit.args[2].toBigInt(),
    block: BigInt(deposit.blockNumber),
    timestamp: deposit.block.timestamp,
  });
  await poolEventRecord.save();

  // Increase the total pool size by the new deposit value
  poolRecord.totalSize += poolEventRecord.value;
  await poolRecord.save();
}

export async function handleWithdraw(withdraw: WithdrawLog): Promise<void> {
  logger.info(`New withdraw transaction log at block ${withdraw.blockNumber}`);
  const poolId = withdraw.args[1].toString();

  // Check and get the pool record from the store
  const poolRecord = await checkGetPool(poolId);

  const poolEventRecord = PoolEvent.create({
    id: `${withdraw.transactionHash}-${withdraw.logIndex}`,
    user: withdraw.args[0],
    poolId,
    type: "WITHDRAW",
    value: withdraw.args[2].toBigInt(),
    block: BigInt(withdraw.blockNumber),
    timestamp: withdraw.block.timestamp,
  });
  await poolEventRecord.save();

  // Decrease the total pool size by the new withdrawl value
  poolRecord.totalSize -= poolEventRecord.value;
  await poolRecord.save();
}
```

Let’s understand how the above code works.

For `handleDeposit`, the function here receives an `DepositLog` which includes transaction log data in the payload. We extract this data and first confirm if we have a `Pool` record via the `checkGetPool` function. We then create a new `PoolEvent` entity that we defined in our `schema.graphql` and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_). We also increase the total pool size by the new deposit value.

For `handleWithdraw`, the function here receives an `WithdrawLog` which includes transaction log data in the payload. We extract this data and first confirm if we have a `Pool` record via `checkGetPool`. We then create a new `PoolEvent` entity that we defined in our `schema.graphql` and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_). We also decrease the total pool size by the new withdraw value.

<!-- @include: ../snippets/evm-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
query {
  pools(first: 5, orderBy: TOTAL_SIZE_DESC) {
    nodes {
      id
      totalSize

      poolEvents(first: 5, orderBy: BLOCK_DESC) {
        nodes {
          id
          user
          type
          value
          block
          timestamp
        }
      }
    }
  }

  poolEvents(
    first: 5
    orderBy: VALUE_DESC
    filter: { type: { equalTo: "DEPOSIT" } }
  ) {
    nodes {
      id
      user
      type
      value
      block
      timestamp
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "pools": {
      "nodes": [
        {
          "id": "81",
          "totalSize": "13939264748979290786527",
          "poolEvents": {
            "nodes": [
              {
                "id": "0x59226923047c9b8735432c8fbb9a5d7e1cfc6c6d68dafda4c53d1a7a11245de4-179",
                "user": "0x0D609B116F522e2aA4c81E71C019e3f72e5b84D3",
                "type": "DEPOSIT",
                "value": "13939264748979290786527",
                "block": "27271611",
                "timestamp": "1681267330"
              }
            ]
          }
        },
        {
          "id": "151",
          "totalSize": "75132986946987564601",
          "poolEvents": {
            "nodes": [
              {
                "id": "0xf2b3573544c13984145ca60906af3e41939445be435899a87ffe2e790d305446-73",
                "user": "0xBC02786613fFeE0CE5463E75f2F4064242B426d3",
                "type": "DEPOSIT",
                "value": "75132986946987564601",
                "block": "27272165",
                "timestamp": "1681268992"
              }
            ]
          }
        },
        {
          "id": "146",
          "totalSize": "52930427574604055961",
          "poolEvents": {
            "nodes": [
              {
                "id": "0xcd041afa3d59664c83a2e625339cb2e380f41cfd649b37894937335722851b9a-200",
                "user": "0x0D609B116F522e2aA4c81E71C019e3f72e5b84D3",
                "type": "DEPOSIT",
                "value": "52930427574604055961",
                "block": "27271989",
                "timestamp": "1681268464"
              }
            ]
          }
        },
        {
          "id": "163",
          "totalSize": "51987044530503846595",
          "poolEvents": {
            "nodes": [
              {
                "id": "0x9c4f9d3033addb662f755ce4c805a0710fcc0ef992963e65e4fca600d16575db-196",
                "user": "0xB5C0D7272591f148F0BD75b1cCD33B6955aA0C62",
                "type": "DEPOSIT",
                "value": "51987044530503846595",
                "block": "27271638",
                "timestamp": "1681267411"
              }
            ]
          }
        },
        {
          "id": "156",
          "totalSize": "9489053677969718728",
          "poolEvents": {
            "nodes": [
              {
                "id": "0x6a60d52fc81026f0ec4d20a16e9e0c3bb574bf9f758f8dc712e78101fff1b203-156",
                "user": "0x6de5F722870a06fe1a0811D5947fefD762CF748b",
                "type": "DEPOSIT",
                "value": "9489053677969718728",
                "block": "27271740",
                "timestamp": "1681267717"
              },
              {
                "id": "0x8c4e211e4f8347818d2a09743ecd3513261bfa1fea1d4717e7ff9935df9cbe04-151",
                "user": "0xc597CefF4AC988D5fAc9863d68458D7EBe1a7de7",
                "type": "DEPOSIT",
                "value": "0",
                "block": "27271220",
                "timestamp": "1681266142"
              }
            ]
          }
        }
      ]
    },
    "poolEvents": {
      "nodes": [
        {
          "id": "0x1c18697f1ba02f646ca5aa07fb7463b55500ac0d3f6c91bc880be0aff3a47730-313",
          "user": "0x83A5d5c54Ad83bBeA8667B3B95d7610E16e52723",
          "type": "DEPOSIT",
          "value": "93987418736549051250510",
          "block": "27271662",
          "timestamp": "1681267483"
        },
        {
          "id": "0x1c18697f1ba02f646ca5aa07fb7463b55500ac0d3f6c91bc880be0aff3a47730-277",
          "user": "0x4b70c41F514FBBEa718234Ac72f36c1b077a4162",
          "type": "DEPOSIT",
          "value": "69556634968703436638903",
          "block": "27271662",
          "timestamp": "1681267483"
        },
        {
          "id": "0x59226923047c9b8735432c8fbb9a5d7e1cfc6c6d68dafda4c53d1a7a11245de4-179",
          "user": "0x0D609B116F522e2aA4c81E71C019e3f72e5b84D3",
          "type": "DEPOSIT",
          "value": "13939264748979290786527",
          "block": "27271611",
          "timestamp": "1681267330"
        },
        {
          "id": "0xf2b3573544c13984145ca60906af3e41939445be435899a87ffe2e790d305446-73",
          "user": "0xBC02786613fFeE0CE5463E75f2F4064242B426d3",
          "type": "DEPOSIT",
          "value": "75132986946987564601",
          "block": "27272165",
          "timestamp": "1681268992"
        },
        {
          "id": "0xcd041afa3d59664c83a2e625339cb2e380f41cfd649b37894937335722851b9a-200",
          "user": "0x0D609B116F522e2aA4c81E71C019e3f72e5b84D3",
          "type": "DEPOSIT",
          "value": "52930427574604055961",
          "block": "27271989",
          "timestamp": "1681268464"
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/BNB%20Smart%20Chain/bsc-mobox-rewards).
:::

<!-- @include: ../snippets/whats-next.md -->
