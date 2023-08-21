# Arbitrum Quick Start

## Goals

The goal of this quick start guide is to index the total claimed dividends paid to users on the [WINR staking contract](https://arbiscan.io/address/0xddAEcf4B02A3e45b96FC2d7339c997E072b0d034) on Arbitrum.

::: warning
Before we begin, **make sure that you have initialised your project** using the provided steps in the [Start Here](../quickstart.md) section. Please initialise an Arbitrum Nova project
:::

In every SubQuery project, there are [3 key files](../quickstart.md#_3-make-changes-to-your-project) to update. Let's begin updating them one by one.

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/subql-example-arbitrum-winr-rewards). We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for Arbitrum. Since Arbitrum is an EVM-compatible layer-2 scaling solution, we can use the core Ethereum framework to index it.
:::

## 1. Your Project Manifest File

The Project Manifest (`project.yaml`) file works as an entry point to your Arbitrum project. It defines most of the details on how SubQuery will index and transform the chain data. For Arbitrum, there are three types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/arbitrum.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/arbitrum.md#mapping-handlers-and-filters): On each and every transaction that matches optional filter criteria, run a mapping function
- [LogHanders](../../build/manifest/arbitrum.md#mapping-handlers-and-filters): On each and every log that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to import the correct contract definitions and update the datasource handlers.

As we are indexing all claimed dividends from the WINR contract, the first step is to import the contract abi definition which can be obtained from [here](https://arbiscan.io/address/0xddaecf4b02a3e45b96fc2d7339c997e072b0d034#code). Copy the entire contract ABI and save it as a file called `winr-staking.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```yaml
dataSources:
  - kind: ethereum/Runtime # We use ethereum runtime since Arbitrum is a layer-2 that is compatible
    startBlock: 91573785 # This is the block of the first claim dividend https://arbiscan.io/tx/0x300b6199816f44029408efc850fb9d6f8751bbedec3e273909eac6f3a61ee3b3
    options:
      # Must be a key of assets
      abi: winr-staking
      address: "0xddAEcf4B02A3e45b96FC2d7339c997E072b0d034" # This is the contract address for WINR Staking https://arbiscan.io/tx/0x44e9396155f6a90daaea687cf48c309128afead3be9faf20c5de3d81f6f318a6
    assets:
      winr-staking:
        file: "./abis/winr-staking.abi.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleDividendBatch
          kind: ethereum/LogHandler # We use ethereum handlers since Arbitrum is a layer-2 that is compatible
          filter:
            topics:
              ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
              - ClaimDividendBatch(address indexed user, uint256 reward)
              # address: "0x60781C2586D68229fde47564546784ab3fACA982"
```

The above code indicates that you will be running a `handleDividendBatch` mapping function whenever there is a `ClaimDividendBatch` log on any transaction from the [WINR contract](https://arbiscan.io/address/0xddaecf4b02a3e45b96fc2d7339c997e072b0d034#code).

Check out our [Manifest File](../../build/manifest/arbitrum.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

## 2. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal right at the start.

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

This will create a new directory (or update the existing one) `src/types` which contains generated entity classes for each type you have defined previously in `schema.graphql`. These classes provide type-safe entity loading, and read and write access to entity fields - see more about this process in [the GraphQL Schema](../../build/graphql.md). All entities can be imported from the following directory:

```ts
import { Dividend, User } from "../types";
```

If you're creating a new Etheruem based project, this command will also generate ABI types and save them into `src/types` using the `npx typechain --target=ethers-v5` command, allowing you to bind these contracts to specific addresses in the mappings and call read-only contract methods against the block being processed. It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. All of these types are written to `src/types/abi-interfaces` and `src/types/contracts` directories. In this example SubQuery project, you would import these types like so.

```ts
import { ClaimDividendBatchLog } from "../types/abi-interfaces/WinrStakingAbi";
```

::: warning Important
When you make any changes to the schema file, please ensure that you regenerate your types directory using the SubQuery CLI prompt `yarn codegen` or `npm run-script codegen`.
:::

Check out the [GraphQL Schema](../../build/graphql.md) documentation to get in-depth information on `schema.graphql` file.

## 3. Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

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

Whenever you create a new SubQuery Project, first, you must run it locally on your computer and test it and using Docker is the easiest and quickest way to do this.

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
The final code of this project can be found [here](https://github.com/subquery/subql-example-arbitrum-winr-rewards).
:::

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
