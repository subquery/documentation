# Thorchain

## Goals

The goal of this quick start guide is to indexing all deposit messages of Thorchain.

::: warning Important
Thorchain is an chain based on the Cosmos SDK. You can index chain data via the standard Cosmos RPC interface but there is no smart contract layer on Thorchain yet.

Before we begin, make sure that you have initialised your project using the provided steps in the **[Start Here](../quickstart.md)** section. You must complete the suggested [4 steps](https://github.com/subquery/cosmos-subql-starter#readme) for Cosmos users.
:::

Previously, in the [1. Create a New Project](../quickstart.md) section, you must have noted [3 key files](../quickstart.md#_3-make-changes-to-your-project). Let's begin updating them one by one.

::: tip
The final code of this project can be found [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Thorchain/thorchain-starter).
:::

## 1. Update Your GraphQL Schema File

::: warning Important
Please refer to [this](home.md#_1-update-the-schemagraphql-file) before proceeding
:::

Remove all existing entities and update the `schema.graphql` file as shown below. The aim is to index all deposit messages. Since each deposit can include mulitple tokens, we need to define a [many-to-many relationship](../../build/graphql.md#man) between the Deposit and Coin - we use the DepositCoin entity to link these two entities.

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

## 2. Update Your Manifest File

::: warning Important
Please read [this](home.md#_2-update-the-project-manifest-file) first before proceeding.
:::

For Cosmos chains, there are four types of mapping handlers.

- [BlockHanders](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every transaction, run a mapping function
- [MessageHandlers](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every message that matches optional filter criteria, run a mapping function
- [EventHanders](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every event that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but the datasource handlers needs to be updated. Update the `datasources` section as follows:

```yml
dataSources:
  - kind: cosmos/Runtime
    startBlock: 7960001 # This is the lowest height on the current version of Thorchain
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleMessage
          kind: cosmos/MessageHandler
          filter:
            type: /types.MsgDeposit
```

The above code defines that you will be running a `handleMessage` mapping function whenever there is an message emitted with the `/types.MsgDeposit` type. Check out our [Manifest File](../../build/manifest/cosmos.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

## 3. Add a Mapping Function

::: warning Important
Please read [this](home.md#_3-update-the-mapping-functions) first before proceeding.
:::

Navigate to the default mapping function in the `src/mappings` directory and update your mapping files to match the following (**note the additional imports**):

```ts
import { Coin, Deposit, DepositCoin } from "../types";
import { CosmosMessage } from "@subql/types-cosmos";

type DepositMessage = {
  coins: {
    asset: {
      chain: string;
      symbol: string;
      ticker: string;
      synth: boolean;
    };
    amount: string;
  }[];
  memo: string;
  signer: any;
};

export async function handleMessage(
  msg: CosmosMessage<DepositMessage>
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

Here, the function receives an `CosmosMessage` which includes data on the payload that we decode using the supplied `<DepositMethod>` type definition. We extract this data and then create a new `Deposit` entity defined earlier in the `schema.graphql` file. For each `coin` in the deposit message, we then check if the coin is known, and then link it to the `Deposit` entity using a `DepositCoin`. After that we use the `.save()` function to save the new entity (SubQuery will automatically save this to the database). Check out our [Mappings](../../build/mapping/cosmos.md) documentation and get information on the mapping functions in detail.

## 4. Build Your Project

::: warning Important
Please refer to [this](home.md#_4-build-your-project).
:::

## 5. Run Your Project Locally with Docker

::: warning Important
Please refer to [this](home.md#_5-run-your-project-locally-with-docker).
:::

## 6. Query your Project

::: warning Important
Please refer to [this](home.md#_6-query-your-project) before proceeding
:::

Try the following queries to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/graphql.md).

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
