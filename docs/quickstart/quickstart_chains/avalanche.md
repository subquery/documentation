# Avalanche Quick Start - Pangolin Rewards

## Goals

The goal of this quick start guide is to index all token deposits and transfers from the Avalanche's [Pangolin token](https://snowtrace.io/address/0x88afdae1a9f58da3e68584421937e5f564a0135b).

::: warning
Before we begin, make sure that you have initialised your project using the provided steps in the [Start Here](../quickstart.md) section. **Please initialise a Avalanche project**
:::

Now, let's move forward and update these configurations.

Previously, in the [1. Create a New Project](../quickstart.md) section, you must have noted [3 key files](../quickstart.md#_3-make-changes-to-your-project). Let's begin updating them one by one.

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Avalanche/pangolin-rewards-tutorial).
:::

## 1. Update Your Project Manifest File

::: warning Important
We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Handler`) for Avalanche. Since Avalanche's C-chain is built on Ethereum's EVM, we can use the core Ethereum framework to index it.
:::

The Project Manifest (`project.yaml`) file works as an entry point to your Avalanche project. It defines most of the details on how SubQuery will index and transform the chain data. For Avalanche, there are three types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/avalanche.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/avalanche.md#mapping-handlers-and-filters): On each and every transaction that matches optional filter criteria, run a mapping function
- [LogHanders](../../build/manifest/avalanche.md#mapping-handlers-and-filters): On each and every log that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to import the correct contract definitions and update the datasource handlers.

We are indexing actions from the Pangolin Rewards contract, first you will need to import the contract abi defintion from [here](https://snowtrace.io/token/0x88afdae1a9f58da3e68584421937e5f564a0135b). You can copy the entire JSON and save as a file `./abis/PangolinRewards.json` in the root directory.

This section in the Project Manifest now imports all the correct definitions and lists the triggers that we look for on the blockchain when indexing.

**Since you are going to index all Pangolin Rewards, you need to update the `datasources` section as follows:**

```yaml
dataSources:
  - kind: ethereum/Runtime # We use ethereum runtime since Avalanche C-Chain is EVM compatible
    startBlock: 7906490 # Block when the first reward is made
    options:
      # Must be a key of assets
      abi: erc20
      ## Pangolin reward contract https://snowtrace.io/token/0x88afdae1a9f58da3e68584421937e5f564a0135b
      address: "0x88afdae1a9f58da3e68584421937e5f564a0135b"
    assets:
      erc20:
        file: "./abis/PangolinRewards.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleLog
          kind: ethereum/LogHandler # We use ethereum handlers since Avalanche C-Chain is EVM compatible
          filter:
            ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
            topics:
              - RewardPaid(address user, uint256 reward)
```

The above code indicates that you will be running a `handleLog` mapping function whenever there is an `RewardPaid` log on any transaction from the [Pangolin Rewards contract](https://snowtrace.io/token/0x88afdae1a9f58da3e68584421937e5f564a0135b).

Check out our [Manifest File](../../build/manifest/avalanche.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

## 2. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal right at the start.

Remove all existing entities and update the `schema.graphql` file as follows. Here you can see we are indexing two entities, `PangolineRewards` and `Users` where receiver is of type `User` and rewards contains a reverse look up to the receiver field.

```graphql
type PangolinRewards @entity {
  id: ID! # Id is required and made up of block has and log index
  transactionHash: String!
  blockNumber: BigInt!
  blockHash: String!
  receiver: User!
  amount: BigInt!
}

type User @entity {
  id: ID! # Wallet address
  totalRewards: BigInt!
  rewards: [PangolinRewards]! @derivedFrom(field: "receiver") #This is virtual field
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
import { PangolinRewards, User } from "../types";
```

As you're creating a new EVM based project, this command will also generate ABI types and save them into `src/types` using the `npx typechain --target=ethers-v5` command, allowing you to bind these contracts to specific addresses in the mappings and call read-only contract methods against the block being processed.

It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. Read about how this is done in [EVM Codegen from ABIs](../../build/introduction.md#evm-codegen-from-abis).

In this example Avalanche SubQuery project, you would import these types like so.

```ts
import { RewardPaidLog } from "../types/abi-interfaces/PangolinRewards";
```

Check out the [GraphQL Schema](../../build/graphql.md) documentation to get in-depth information on `schema.graphql` file.

Now that you have made essential changes to the GraphQL Schema file, let’s proceed ahead with the Mapping Function’s configuration.

## 3. Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Follow these steps to add a mapping function:

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see three exported functions: `handleBlock`, `handleLog`, and `handleTransaction`. Replace these functions with the following code (**note the additional imports**):

```ts
import { PangolinRewards, User } from "../types";
import { RewardPaidLog } from "../types/abi-interfaces/PangolinRewards";

async function checkGetUser(id: string): Promise<User> {
  let user = await User.get(id.toLowerCase());
  if (!user) {
    // does not exist, create a new user
    user = User.create({
      id: id.toLowerCase(),
      totalRewards: BigInt(0),
    });
  }
  return user;
}

export async function handleLog(event: RewardPaidLog): Promise<void> {
  logger.info(`New Reward Paid at block ${event.blockNumber}`);
  const { args } = event;
  if (args) {
    const user = await checkGetUser(args.user);

    const pangolinRewardRecord = new PangolinRewards(
      `${event.blockHash}-${event.logIndex}`
    );

    pangolinRewardRecord.transactionHash = event.transactionHash;
    pangolinRewardRecord.blockHash = event.blockHash;
    pangolinRewardRecord.blockNumber = BigInt(event.blockNumber);
    pangolinRewardRecord.receiverId = user.id;
    pangolinRewardRecord.amount = BigInt(args.reward.toString());

    user.totalRewards += pangolinRewardRecord.amount;
    await user.save();
    await pangolinRewardRecord.save();
  }
}
```

Let’s understand how the above code works.

The mapping function here receives an `RewardPaidLog` which includes transaction log data in the payload. We extract this data and first read and confirm that we have a `User` record via `checkGetUser`. We then create a new `PangolinRewards` entity that we defined in our `schema.graphql` and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

Check out our [Mappings](../../build/mapping/avalanche.md) documentation to get more information on mapping functions.

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
  pangolinRewards(first: 5) {
    nodes {
      id
      amount
    }
  }
  users(first: 5, orderBy: TOTAL_REWARDS_DESC) {
    nodes {
      id
      totalRewards
      rewards(first: 5) {
        totalCount
      }
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "pangolinRewards": {
      "nodes": [
        {
          "id": "0xa0759b9929d68bc88ad01832484ecc24fd0abbcaf19a92a69a1a8fc1f2f23a71-20",
          "amount": "750406183852"
        },
        {
          "id": "0xf4b8a0948afc4264b876b4431da01a7a96a11f1ce24d73a2a0a71f9a8228b3c9-121",
          "amount": "31106152923645074116"
        },
        {
          "id": "0x8f348fcc2eb78e91e6d212a045356983f4f46ba1843e5e0f763e1e75a1ae8582-33",
          "amount": "612972344478229813"
        },
        {
          "id": "0xbb588aa14c97bad75d34ccbae332af03eab1390678516df01badf4b4f1886d4e-56",
          "amount": "3588963063129"
        },
        {
          "id": "0x477c12a0a4a5642378e58569743b24af200d36f7952d2e6bc4cfd9fa8e96592f-74",
          "amount": "30987822664812021072"
        }
      ]
    },
    "users": {
      "nodes": [
        {
          "id": "0x5da33bcd38fbc3e9632f9f6a198f4f0ef13746b6",
          "totalRewards": "4883581127128396302822",
          "rewards": {
            "totalCount": 2
          }
        },
        {
          "id": "0x79dcf1ef9786255c0f00f506c785bbd878ec184a",
          "totalRewards": "2282547055289881964699",
          "rewards": {
            "totalCount": 1
          }
        },
        {
          "id": "0x695b71dbd30a9f30c1958644086900ac9cd33c85",
          "totalRewards": "1620206587081566430579",
          "rewards": {
            "totalCount": 1
          }
        },
        {
          "id": "0xfd94d62683d8962055b661c4e64e762ed41e5489",
          "totalRewards": "1149590592806652626951",
          "rewards": {
            "totalCount": 1
          }
        },
        {
          "id": "0xab7901b09b67ee05b016456289cf74d362bd6d8c",
          "totalRewards": "882873704607946614381",
          "rewards": {
            "totalCount": 1
          }
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Avalanche/pangolin-rewards-tutorial).
:::

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
