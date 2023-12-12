# Thorchain Quick Start

The goal of this quick start guide is to indexing all deposit messages of Thorchain.

::: warning Important
Thorchain is an chain based on the Cosmos SDK. You can index chain data via the standard Cosmos RPC interface but there is no smart contract layer on Thorchain yet.

Before we begin, make sure that you have initialised your project using the provided steps in the **[Start Here](../quickstart.md)** section. You must complete the suggested [4 steps](https://github.com/subquery/cosmos-subql-starter#readme) for Cosmos users.
:::

Now, let's move ahead in the process and update these configurations.

Previously, in the [1. Create a New Project](../quickstart.md) section, you must have noted [3 key files](../quickstart.md#_3-make-changes-to-your-project). Let's begin updating them one by one.

::: tip
The final code of this project can be found [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Thorchain/thorchain-starter).
:::

## 1. Update Your Project Manifest File

The Project Manifest (`project.ts`) file is an entry point to your project. It defines most of the details on how SubQuery will index and transform the chain data. For Cosmos chains, there are four types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every transaction, run a mapping function
- [MessageHandlers](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every message that matches optional filter criteria, run a mapping function
- [EventHanders](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every event that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to change the datasource handlers. This section lists the triggers that look for on the blockchain to start indexing.

```ts
{
  dataSources: [
    {
      kind: CosmosDatasourceKind.Runtime,
      startBlock: 7960001,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleMessage",
            kind: CosmosHandlerKind.Message,
            filter: {
              type: "/types.MsgDeposit",
            },
          },
        ],
      },
    },
  ],
}
```

The above code defines that you will be running a `handleMessage` mapping function whenever there is an message emitted with the `/types.MsgDeposit` type. Check out our [Manifest File](../../build/manifest/cosmos.md) documentation to get more information about the Project Manifest (`project.ts`) file.

## 2. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of the data that you are using SubQuery to index, hence it's a great place to start. The shape of your data is defined in a GraphQL Schema file with various [GraphQL entities](../../build/graphql.md).

Update the `schema.graphql` file as follows. The aim is to index all deposit messages. Since each deposit can include multiple tokens, we need to define a [many-to-many relationship](../../build/graphql.md#man) between the Deposit and Coin - we use the DepositCoin entity to link these two entities.

```graphql
type Deposit @entity {
  id: ID!
  memo: String!
  signer: String!
  blockHeight: BigInt!
  txHash: String!
}

type DepositCoin @entity {
  id: ID!
  deposit: Deposit! # foreign key
  coin: Coin! # foreign key
  amount: BigInt!
}

type Coin @entity {
  id: ID! # concat of chain-symbol
  chain: String!
  symbol: String!
  ticker: String!
  synth: Boolean
}
```

::: warning Important
When you make any changes to the schema file, do not forget to regenerate your types directory.
:::

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

You will find the generated models in the `/src/types/models` directory.

As you're creating a new CosmWasm based project, this command will also generate types for your listed protobufs and save them into `src/types` directory, providing you with more typesafety. Read about how this is done in [Cosmos Codegen from CosmWasm Protobufs](../../build/introduction.md#cosmos-codegen-from-cosmwasm-protobufs).

Check out our [GraphQL Schema](../../build/graphql.md) documentation to get more information on `schema.graphql` file.

Now that you have made essential changes to the GraphQL Schema file, let’s go ahead with the next configuration.

## 3. Add a Mapping Function

Mapping functions determine how chain data is transformed into the optimised GraphQL entities that you previously defined in the `schema.graphql` file.

Navigate to the default mapping function in the `src/mappings` directory and update your mapping files to match the following (**note the additional imports**):

```ts
import { CosmosMessage } from "@subql/types-cosmos";
import { Coin, Deposit, DepositCoin } from "../types";
import { MsgDeposit } from "../types/proto-interfaces/thorchain/v1/x/thorchain/types/msg_deposit";

export async function handleMessage(
  msg: CosmosMessage<MsgDeposit>
): Promise<void> {
  // Create Deposit record
  const depositEntity = Deposit.create({
    id: `${msg.tx.hash}-${msg.idx}`,
    blockHeight: BigInt(msg.block.block.header.height),
    txHash: msg.tx.hash,
    signer: msg.msg.decodedMsg.signer.toString(),
    memo: msg.msg.decodedMsg.memo,
  });
  await depositEntity.save();

  // Iterate through coins
  for (let coin of msg.msg.decodedMsg.coins) {
    // Check if the coin exists
    let coinEntity = await Coin.get(`${coin.asset.chain}-${coin.asset.symbol}`);
    if (!coinEntity) {
      // Does not exist, create
      coinEntity = Coin.create({
        id: `${coin.asset.chain}-${coin.asset.symbol}`,
        chain: coin.asset.chain,
        symbol: coin.asset.symbol,
        ticker: coin.asset.ticker,
        synth: coin.asset.synth,
      });
      await coinEntity.save();
    }

    // Create Deposit Coin link
    await DepositCoin.create({
      id: `${msg.tx.hash}-${msg.idx}-${coin.asset.chain}-${coin.asset.symbol}`,
      depositId: depositEntity.id,
      coinId: coinEntity.id,
      amount: BigInt(coin.amount),
    }).save();
  }
}
```

Let’s understand how the above code works. Here, the function receives an `CosmosMessage` which includes data on the payload that we decode using the supplied `<DepositMethod>` type definition. We extract this data and then create a new `Deposit` entity defined earlier in the `schema.graphql` file. For each `coin` in the deposit message, we then check if the coin is known, and then link it to the `Deposit` entity using a `DepositCoin`. After that we use the `.save()` function to save the new entity (SubQuery will automatically save this to the database). Check out our [Mappings](../../build/mapping/cosmos.md) documentation and get information on the mapping functions in detail.

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

Whenever you create a new SubQuery Project, never forget to run it locally on your computer and test it. And using Docker is the most hassle-free way to do this.

`docker-compose.yml` file defines all the configurations that control how a SubQuery node runs. For a new project, which you have just initialised, no major changes are needed.

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

::: tip
It may take a few minutes to download the required images and start the various nodes and Postgres databases.
:::

## 6. Query your Project

Next, let's query our project. Follow these three simple steps to query your SubQuery project:

1. Open your browser and head to `http://localhost:3000`.

2. You will see a GraphQL playground in the browser and the schemas which are ready to query.

3. Find the _Docs_ tab on the right side of the playground which should open a documentation drawer. This documentation is automatically generated and it helps you find what entities and methods you can query.

Try the following queries to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/query.md).

```graphql
query {
  deposits(first: 5) {
    totalCount
    nodes {
      id
      depositCoins(first: 5) {
        nodes {
          amount
          coin {
            id
            chain
            symbol
            ticker
          }
        }
      }
    }
  }
}
```

```graphql
query {
  coins(first: 5, orderBy: DEPOSIT_COINS_SUM_AMOUNT_DESC) {
    totalCount
    nodes {
      chain
      symbol
      ticker
      depositCoins(first: 5, orderBy: AMOUNT_DESC) {
        totalCount
        nodes {
          amount
        }
      }
    }
  }
}
```

You will see the result in JSON

::: tip
The final code of this project can be found [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Thorchain/thorchain-starter).
:::

## What’s Next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data from bLuna.

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
