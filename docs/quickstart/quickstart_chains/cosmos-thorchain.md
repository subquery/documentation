# Thorchain Quick Start

The goal of this quick start guide is to indexing all deposit messages of Thorchain.

<!-- @include: ../snippets/cosmos-quickstart-reference.md -->

Previously, in the [1. Create a New Project](../quickstart.md) section, you must have noted [3 key files](../quickstart.md#_3-make-changes-to-your-project). Let's begin updating them one by one.

::: tip
The final code of this project can be found [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Thorchain/thorchain-starter).
:::

<!-- @include: ../snippets/cosmos-manifest-intro.md#level2 -->

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

<!-- @include: ../snippets/cosmos-manifest-note.md -->

<!-- @include: ../snippets/schema-intro.md#level2 -->

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

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/cosmos-codegen.md -->

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro.md#level2 -->

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

<!-- @include: ../snippets/cosmos-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

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

<!-- @include: ../snippets/whats-next.md -->
