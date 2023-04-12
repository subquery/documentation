# Polygon Quick Start

## Goals

The goal of this quick start guide is to index all token deposits from the Polygon Plasma Bridge.

::: warning
Before we begin, make sure that you have initialised your project using the provided steps in the [Start Here](../quickstart.md) section. **Please initialise a Polygon project**
:::

Now, let's move forward and update these configurations.

Previously, in the [1. Create a New Project](../quickstart.md) section, you must have noted [3 key files](../quickstart.md#_3-make-changes-to-your-project). Let's begin updating them one by one.

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/subquery-example-polygon-plasma-bridge).
:::

## 1. Update Your Project Manifest File

::: warning Important
We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Handler`) for Polygon. Since Polygon is a layer-2 scaling solution, we can use the core Ethereum framework to index it.
:::

The Project Manifest (`project.yaml`) file works as an entry point to your Polygon project. It defines most of the details on how SubQuery will index and transform the chain data. For Polygon, there are three types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/polygon.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/polygon.md#mapping-handlers-and-filters): On each and every transaction that matches optional filter criteria, run a mapping function
- [LogHanders](../../build/manifest/polygon.md#mapping-handlers-and-filters): On each and every log that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to import the correct contract definitions and update the datasource handlers.

We are indexing actions from the Plasma bridge contract, first you will need to import the contract abi defintion from https://polygonscan.com/tx/0x88e3ab569326b52e9dd8a5f72545d89d8426bbf536f3bfaf31e023fb459ca373. You can copy the entire JSON and save as a file `plasma.abi.json` in the root directory.

This section in the Project Manifest now imports all the correct definitions and lists the triggers that we look for on the blockchain when indexing.

**Since you are going to index all Plasma Deposits and Withdrawls, you need to update the `datasources` section as follows:**

```yaml
dataSources:
  - kind: ethereum/Runtime # We use ethereum runtime since Polygon is a layer-2 that is compatible
    startBlock: 849 # This is the block that the contract was deployed on https://polygonscan.com/tx/0x88e3ab569326b52e9dd8a5f72545d89d8426bbf536f3bfaf31e023fb459ca373
    options:
      # Must be a key of assets
      abi: plasma
      address: "0xD9c7C4ED4B66858301D0cb28Cc88bf655Fe34861" # Plasma contract
    assets:
      plasma:
        file: "plasma.abi.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleDeposit
          kind: ethereum/LogHandler # We use ethereum handlers since Polygon is a layer-2 that is compatible
          filter:
            topics:
              ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
              - TokenDeposited (address indexed rootToken, address indexed childToken, address indexed user, uint256 amount, uint256 depositCount)
        - handler: handleWithdrawl
          kind: ethereum/LogHandler # We use ethereum handlers since Polygon is a layer-2 that is compatible
          filter:
            topics:
              ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
              - TokenWithdrawn (address indexed rootToken, address indexed childToken, address indexed user, uint256 amount, uint256 withrawCount)
```

The above code indicates that you will be running a `handleDeposit` mapping function whenever there is an `TokenDeposited` log on any transaction from the [Plasma Bridge contract](https://polygonscan.com/tx/0x88e3ab569326b52e9dd8a5f72545d89d8426bbf536f3bfaf31e023fb459ca373). Simarly, you'll be running a `handleWithdrawl` mapping function whenever there is an `TokenWithdrawn` logs.

Check out our [Manifest File](../../build/manifest/polygon.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

## 2. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal right at the start.

Remove all existing entities and update the `schema.graphql` file as follows. Here you can see we are indexing three entities, a `Deposit` and a `Withdrawl` each with a [foreign key relationship](../../build/graphql.md#entity-relationships) to the `User`.

```graphql
type Deposit @entity {
  id: ID! # Deposit Count Index
  rootToken: String!
  childToken: String!
  user: User! # Foreign Key
  amount: BigInt!
  amountFriendly: BigInt!
}

type Withdrawl @entity {
  id: ID! # Withdrawl Count Index
  rootToken: String!
  childToken: String!
  user: User! # Foreign Key
  amount: BigInt!
  amountFriendly: BigInt!
}

type User @entity {
  id: ID! # Wallet Address
  totalDeposits: BigInt!
  totalWithdrawls: BigInt!
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
import { Deposit, User, Withdrawl } from "../types";
```

If you're creating a new Etheruem based project, this command will also generate ABI types and save them into `src/types` using the `npx typechain --target=ethers-v5` command, allowing you to bind these contracts to specific addresses in the mappings and call read-only contract methods against the block being processed. It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. All of these types are written to `src/typs/abi-interfaces` and `src/typs/contracts` directories. In the example Polygon SubQuery project, you would import these types like so.

```ts
import {
  TokenWithdrawnLog,
  TokenDepositedLog,
} from "../types/abi-interfaces/PlasmaAbi";
```

Check out the [GraphQL Schema](../../build/graphql.md) documentation to get in-depth information on `schema.graphql` file.

Now that you have made essential changes to the GraphQL Schema file, let’s proceed ahead with the Mapping Function’s configuration.

## 3. Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Follow these steps to add a mapping function:

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see three exported functions: `handleBlock`, `handleLog`, and `handleTransaction`. Replace these functions with the following code (**note the additional imports**):

```ts
import { Deposit, User, Withdrawl } from "../types";
import {
  TokenWithdrawnLog,
  TokenDepositedLog,
} from "../types/abi-interfaces/PlasmaAbi";

async function checkGetUser(user: string): Promise<User> {
  let userRecord = await User.get(user.toLowerCase());
  if (!userRecord) {
    userRecord = User.create({
      id: user.toLowerCase(),
      totalDeposits: BigInt(0),
      totalWithdrawls: BigInt(0),
    });
    await userRecord.save();
  }
  return userRecord;
}

export async function handleDeposit(deposit: TokenDepositedLog): Promise<void> {
  logger.info(`New deposit transaction log at block ${deposit.blockNumber}`);
  const userId = deposit.args[2].toLowerCase();
  const userRecord = await checkGetUser(userId);

  const depositRecord = Deposit.create({
    id: deposit.args[4].toString(),
    rootToken: deposit.args[0],
    childToken: deposit.args[1],
    userId,
    amount: deposit.args[3].toBigInt(),
    amountFriendly: deposit.args[3].toBigInt(),
  });
  await depositRecord.save();

  userRecord.totalDeposits += depositRecord.amount;
  await userRecord.save();
}

export async function handleWithdrawl(
  withdrawl: TokenWithdrawnLog
): Promise<void> {
  logger.info(
    `New Withdrawl transaction log at block ${withdrawl.blockNumber}`
  );
  const userId = withdrawl.args[2].toLowerCase();
  const userRecord = await checkGetUser(userId);

  const withdrawlRecord = Withdrawl.create({
    id: withdrawl.args[4].toString(),
    rootToken: withdrawl.args[0],
    childToken: withdrawl.args[1],
    userId,
    amount: withdrawl.args[3].toBigInt(),
    amountFriendly: withdrawl.args[3].toBigInt(),
  });
  await withdrawlRecord.save();

  userRecord.totalDeposits += withdrawlRecord.amount;
  await userRecord.save();
}
```

Let’s understand how the above code works.

For `handleDeposit`, the function here receives an `TokenDepositedLog` which includes transaction log data in the payload. We extract this data and first confirm if we have a `User` record via `checkGetUser`. We then create a new `Deposit` entity that we defined in our `schema.graphql` and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

For `handleWithdrawl`, the function here receives an `TokenWithdrawnLog` which includes transaction log data in the payload. We extract this data and first confirm if we have a `User` record via `checkGetUser`. We then create a new `Withdrawl` entity that we defined in our `schema.graphql` and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

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

Try the following query to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/graphql.md).

```graphql
query {
  deposits(first: 5, orderBy: AMOUNT_DESC) {
    nodes {
      id
      rootToken
      childToken
      userId
      amount
      amountFriendly
    }
  }
  users(first: 5, orderBy: TOTAL_DEPOSITS_DESC) {
    nodes {
      id
      totalDeposits
      deposits(first: 5, orderBy: AMOUNT_DESC) {
        totalCount
        nodes {
          id
          rootToken
          childToken
          amount
          amountFriendly
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
    "deposits": {
      "nodes": [
        {
          "id": "86050001",
          "rootToken": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
          "childToken": "0x0000000000000000000000000000000000001010",
          "userId": "0xa0ec2cc2f5966601284a4971205412cb0d396947",
          "amount": "436178234282070000000000",
          "amountFriendly": "436178234282070000000000"
        },
        {
          "id": "85970002",
          "rootToken": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
          "childToken": "0x0000000000000000000000000000000000001010",
          "userId": "0x3a542300159d084382e228ec8f54a402451e5a67",
          "amount": "306601000000000000000000",
          "amountFriendly": "306601000000000000000000"
        },
        {
          "id": "86170001",
          "rootToken": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
          "childToken": "0x0000000000000000000000000000000000001010",
          "userId": "0x0ccf5b43857ca33df612a4f1cb671d67383bf31e",
          "amount": "150887763821350281472596",
          "amountFriendly": "150887763821350281472596"
        },
        {
          "id": "85970001",
          "rootToken": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
          "childToken": "0x0000000000000000000000000000000000001010",
          "userId": "0x0a5ccb582c0b08c8e7704311383c2ea698840e7b",
          "amount": "129292331999990000000000",
          "amountFriendly": "129292331999990000000000"
        },
        {
          "id": "86490001",
          "rootToken": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
          "childToken": "0x0000000000000000000000000000000000001010",
          "userId": "0x93beca36d5bcdc7be0f9ca38b1b5f5f5292aa859",
          "amount": "109399000000000000000000",
          "amountFriendly": "109399000000000000000000"
        }
      ]
    },
    "users": {
      "nodes": [
        {
          "id": "0xa0ec2cc2f5966601284a4971205412cb0d396947",
          "totalDeposits": "436178234282070000000000",
          "deposits": {
            "totalCount": 1,
            "nodes": [
              {
                "id": "86050001",
                "rootToken": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
                "childToken": "0x0000000000000000000000000000000000001010",
                "amount": "436178234282070000000000",
                "amountFriendly": "436178234282070000000000"
              }
            ]
          }
        },
        {
          "id": "0x3a542300159d084382e228ec8f54a402451e5a67",
          "totalDeposits": "306601000000000000000000",
          "deposits": {
            "totalCount": 1,
            "nodes": [
              {
                "id": "85970002",
                "rootToken": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
                "childToken": "0x0000000000000000000000000000000000001010",
                "amount": "306601000000000000000000",
                "amountFriendly": "306601000000000000000000"
              }
            ]
          }
        },
        {
          "id": "0x0ccf5b43857ca33df612a4f1cb671d67383bf31e",
          "totalDeposits": "150887763821350281472596",
          "deposits": {
            "totalCount": 1,
            "nodes": [
              {
                "id": "86170001",
                "rootToken": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
                "childToken": "0x0000000000000000000000000000000000001010",
                "amount": "150887763821350281472596",
                "amountFriendly": "150887763821350281472596"
              }
            ]
          }
        },
        {
          "id": "0x0a5ccb582c0b08c8e7704311383c2ea698840e7b",
          "totalDeposits": "129292331999990000000000",
          "deposits": {
            "totalCount": 1,
            "nodes": [
              {
                "id": "85970001",
                "rootToken": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
                "childToken": "0x0000000000000000000000000000000000001010",
                "amount": "129292331999990000000000",
                "amountFriendly": "129292331999990000000000"
              }
            ]
          }
        },
        {
          "id": "0x93beca36d5bcdc7be0f9ca38b1b5f5f5292aa859",
          "totalDeposits": "109399000000000000000000",
          "deposits": {
            "totalCount": 1,
            "nodes": [
              {
                "id": "86490001",
                "rootToken": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
                "childToken": "0x0000000000000000000000000000000000001010",
                "amount": "109399000000000000000000",
                "amountFriendly": "109399000000000000000000"
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
The final code of this project can be found [here](https://github.com/subquery/subquery-example-polygon-plasma-bridge).
:::

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
