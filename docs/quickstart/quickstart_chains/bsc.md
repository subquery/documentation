# BNB Smart Chain (BSC) Quick Start

## Goals

The goal of this quick start guide is to index all deposits and withdrawls to MOBOX pools. [MOBOX](https://www.mobox.io/) has built a unique infrastructure that builds on the growing DeFi ecosystem and combines it with Gaming through unique NFTs. Using Liquidity Pools, Yield Farming, and NFTs, the GameFi infrastructure will not just find the best yield strategies for users but also generate unique NFTs that can be used across a multitude of games.

::: warning
Before we begin, make sure that you have initialised your project using the provided steps in the [Start Here](../quickstart.md) section. **Please initialise a BNB Smart Chain (BSC) project**
:::

Now, let's move forward and update these configurations.

Previously, in the [1. Create a New Project](../quickstart.md) section, you must have noted [3 key files](../quickstart.md#_3-make-changes-to-your-project). Let's begin updating them one by one.

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/BNB%20Smart%20Chain/bsc-mobox-rewards).
:::

#### Check out how to get the BSC starter project running

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/2sxpy4NCcS0" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## 1. Update Your Project Manifest File

::: warning Important
We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Handler`) for BNB Smart Chain (BSC). Since BSC is a layer-2 scaling solution, we can use the core Ethereum framework to index it.
:::

The Project Manifest (`project.ts`) file works as an entry point to your BSC project. It defines most of the details on how SubQuery will index and transform the chain data. For BSC, there are three types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/bsc.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/bsc.md#mapping-handlers-and-filters): On each and every transaction that matches optional filter criteria, run a mapping function
- [LogHanders](../../build/manifest/bsc.md#mapping-handlers-and-filters): On each and every log that matches optional filter criteria, run a mapping function

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

Check out our [Manifest File](../../build/manifest/bsc.md) documentation to get more information about the Project Manifest (`project.ts`) file.

## 2. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal right at the start.

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

::: warning Important
When you make any changes to the schema file, please ensure that you regenerate your types directory.
:::

SubQuery makes it easy and type-safe to work with your GraphQL entities, as well as smart contracts, events, transactions, and logs. SubQuery CLI will generate types from your project's GraphQL schema and any contract ABIs included in the data sources.

::: code-tabs
@tab:active yarn

```shell
yarn codegen
```

@tab npm

```shell
npm run-script codegen
```

:::

This will create a new directory (or update the existing) `src/types` which contain generated entity classes for each type you have defined previously in `schema.graphql`. These classes provide type-safe entity loading, read and write access to entity fields - see more about this process in [the GraphQL Schema](../../build/graphql.md). All entites can be imported from the following directory:

```ts
import { Pool, PoolEvent } from "../types";
```

As you're creating a new EVM based project, this command will also generate ABI types and save them into `src/types` using the `npx typechain --target=ethers-v5` command, allowing you to bind these contracts to specific addresses in the mappings and call read-only contract methods against the block being processed.

It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. Read about how this is done in [EVM Codegen from ABIs](../../build/introduction.md#evm-codegen-from-abis).

In the example Polygon SubQuery project, you would import these types like so.

```ts
import { DepositLog, WithdrawLog } from "../types/abi-interfaces/MoboxAbi";
```

Check out the [GraphQL Schema](../../build/graphql.md) documentation to get in-depth information on `schema.graphql` file.

Now that you have made essential changes to the GraphQL Schema file, let’s proceed ahead with the Mapping Function’s configuration.

## 3. Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

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

Check out our [Mappings](../../build/mapping/ethereum.md) documentation to get more information on mapping functions.

## 4. Build Your Project

Next, build your work to run your new SubQuery project. Run the build command from the project's root directory as given here:

::: code-tabs
@tab:active yarn

```shell
yarn build
```

@tab npm

```shell
npm run-script build
```

:::

::: warning Important
Whenever you make changes to your mapping functions, you must rebuild your project.
:::

Now, you are ready to run your first SubQuery project. Let’s check out the process of running your project in detail.

## 5. Run Your Project Locally with Docker

Whenever you create a new SubQuery Project, first, you must run it locally on your computer and test it and using Docker is the easiest and quickiest way to do this.

The `docker-compose.yml` file defines all the configurations that control how a SubQuery node runs. For a new project, which you have just initialised, you won't need to change anything.

However, visit the [Running SubQuery Locally](../../run_publish/run.md) to get more information on the file and the settings.

Run the following command under the project directory:

::: code-tabs
@tab:active yarn

```shell
yarn start:docker
```

@tab npm

```shell
npm run-script start:docker
```

:::

::: tip Note
It may take a few minutes to download the required images and start the various nodes and Postgres databases.
:::

## 6. Query your Project

Next, let's query our project. Follow these three simple steps to query your SubQuery project:

1. Open your browser and head to `http://localhost:3000`.

2. You will see a GraphQL playground in the browser and the schemas which are ready to query.

3. Find the _Docs_ tab on the right side of the playground which should open a documentation drawer. This documentation is automatically generated and it helps you find what entities and methods you can query.

Try the following query to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/query.md).

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

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
