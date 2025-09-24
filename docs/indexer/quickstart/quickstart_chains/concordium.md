# Concordium Quick Start

The goal of this quick start guide is to give a quick intro to all features of our Concordium indexer. This SubQuery project indexes all transfer transactions, updated transaction events, and block rewards on the Concordium Test Network - it's a great way to quickly learn how SubQuery works on a real world hands-on example.

::: warning Important
Before we begin, make sure that you have initialised your project using the provided steps in the [Start Here](../quickstart.md) section. **Please initialise a Concordium Testnet project**
:::

Now, let's move forward and update these configurations.

Previously, in the [1. Create a New Project](../quickstart.md) section, you must have noted [3 key files](../quickstart.md#_3-make-changes-to-your-project). Let's begin updating them one by one.

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/concordium-subql-starter/tree/main/Concordium/concordium-testnet-starter).
:::

## 1. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of the data that you are using SubQuery to index, hence it's a great place to start. The shape of your data is defined in a GraphQL Schema file with various [GraphQL entities](../../build/graphql).

Remove all existing entities and update the `schema.graphql` file as follows, here you can see we are indexing a variety of datapoints, including accounts, transfers, credit, debits, and payments.

```graphql
type Transfer @entity {
  id: ID! # A unique ID
  block: BigInt!
  date: Date!
  from: String!
  to: String!
  value: BigInt!
}

type Updated @entity {
  id: ID!
  block: BigInt!
  txHash: String!
  address: String!
  instigator: String!
}

type BlockAccrueReward @entity {
  id: ID!
  block: BigInt!
  baker: BigInt!
  bakerReward: BigInt!
}
```

::: warning Important
When you make any changes to the schema file, please ensure that you regenerate your types directory.
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

Check out the [GraphQL Schema](../../build/graphql) documentation to get in-depth information on `schema.graphql` file.

Now that you have made essential changes to the GraphQL Schema file, let’s move forward to the next file.

## 2. Update Your Project Manifest File

The Project Manifest (`project.ts`) file works as an entry point to your Concordium projects. It defines most of the details on how SubQuery will index and transform the chain data. For Concordium, there are three types of mapping handlers (and you can have more than one in each project):

- [Block handler](../../build/manifest/chain-specific/concordium.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [Transaction handlers](../../build/manifest/chain-specific/concordium.md#mapping-handlers-and-filters): On each and every Concordium transaction that matches optional filter criteria, run a mapping function
- [TransactionEvent handler](../../build/manifest/chain-specific/concordium.md#mapping-handlers-and-filters): On each and every event related to a specific Concordium transaction that matches optional filter criteria, run a mapping function
- [SpecialEvent handler](../../build/manifest/chain-specific/concordium.md#mapping-handlers-and-filters): On each and every Concordium special event that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but we can walk through the different handlers.

```ts
{
  dataSources: [
    {
      kind: ConcordiumDatasourceKind.Runtime,
      startBlock: 490000,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          /**
           * Avoid using block handlers where possible as they slow the indexing speed of your project
          {
            handler: "handleBlock",
            kind: ConcordiumHandlerKind.Block,
          },
           */
          {
            handler: "handleTransaction",
            kind: ConcordiumHandlerKind.Transaction,
            filter: {
              type: TransactionSummaryType.AccountTransaction,
              values: {
                transactionType: "transfer",
              },
            },
          },
          {
            handler: "handleTransactionEvent",
            kind: ConcordiumHandlerKind.TransactionEvent,
            filter: {
              type: TransactionEventTag.Updated,
            },
          },
          {
            handler: "handleSpecialEvent",
            kind: ConcordiumHandlerKind.SpecialEvent,
            filter: {
              type: "blockAccrueReward",
            },
          },
        ],
      },
    },
  ],
}
```

The above code indicates that you will be running a `handleTransaction` mapping function whenever there is a Concordium transaction of type `TransactionSummaryType.AccountTransaction` wiht the type `transfer`. Additionally we run the `handleTransactionEvent` mapping function whenever there is any event on any transaction with the `TransactionEventTag.Updated` type. Finally, we have a `handleSpecialEvent` function which runs whenever there is a SpecialEvent of type `blockAccrueReward`.

Check out our [Manifest File](../../build/manifest/chain-specific/concordium.md) documentation to get more information about the Project Manifest (`project.ts`) file.

Next, let’s proceed ahead with the Mapping Function’s configuration.

## 3. Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Follow these steps to add a mapping function:

Navigate to the default mapping function in the `src/mappings` directory.

There are four different classes of mapping functions for Concordium; [Block handlers](../../build/mapping-functions/mapping/concordium.md#block-handler), [Transaction Handlers](../../build/mapping-functions/mapping/concordium.md#transaction-handler), [Transaction Event Handlers](../../build/mapping-functions/mapping/concordium.md#transaction-event-handler), and [Special Event Handlers](../../build/mapping-functions/mapping/concordium.md#special-event-handler).

Update the `mappingHandler.ts` file as follows (**note the additional imports**):

```ts
import {
  AccountTransactionSummary,
  BlockSpecialEventBlockAccrueReward,
  TransferSummary,
  UpdatedEvent,
} from "@concordium/node-sdk";
import { Transfer, Updated, BlockAccrueReward } from "../types";
import {
  ConcordiumTransaction,
  ConcordiumTransactionEvent,
  ConcordiumSpecialEvent,
} from "@subql/types-concordium";

export async function handleTransaction(tx: ConcordiumTransaction) {
  logger.info(
    `Handling Transaction at block ${tx.block.blockHeight.toString()}`,
  );
  const record = Transfer.create({
    id: `${tx.block.blockHeight}-${tx.hash}`,
    block: tx.block.blockHeight,
    date: tx.block.blockReceiveTime,
    from: (tx as AccountTransactionSummary).sender,
    to: (tx as TransferSummary).transfer.to,
    value: (tx as TransferSummary).transfer.amount,
  });

  await record.save();
}

export async function handleTransactionEvent(
  txEvent: ConcordiumTransactionEvent,
) {
  logger.info(
    `Handling Transaction Event at block ${txEvent.block.blockHeight.toString()}`,
  );
  const record = Updated.create({
    id: `${txEvent.transaction.hash}-${txEvent.id}`,
    block: txEvent.block.blockHeight,
    txHash: txEvent.transaction.hash,
    address: `${(txEvent as UpdatedEvent).address.subindex}-${
      (txEvent as UpdatedEvent).address.subindex
    }`,
    instigator: (txEvent as UpdatedEvent).instigator.address.toString(),
  });

  await record.save();
}

export async function handleSpecialEvent(specialEvent: ConcordiumSpecialEvent) {
  logger.info(
    `Handling special event at block ${specialEvent.block.blockHeight.toString()}`,
  );
  const record = BlockAccrueReward.create({
    id: `${specialEvent.block.blockHeight}-${specialEvent.id}`,
    block: specialEvent.block.blockHeight,
    baker: (specialEvent as BlockSpecialEventBlockAccrueReward).baker,
    bakerReward: (specialEvent as BlockSpecialEventBlockAccrueReward)
      .bakerReward,
  });

  await record.save();
}
```

Let’s understand how the above code works.

For the `handleTransaction` mapping function, the function receives a new `ConcordiumTransaction` payload to which parse and save into the store as a new `Transfer` entity.

For the `handleTransactionEvent` mapping function, the functions receives a new `ConcordiumTransactionEvent` payload to which it processes. Finally, the `handleSpecialEvent` mapping function is for `ConcordiumSpecialEvent`s.

Check out our [Mappings](../../build/mapping-functions/mapping/concordium.md) documentation to get more information on mapping functions.

<!-- @include: ../snippets/ethereum-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
{
  query {
    transfers(first: 5, orderBy: VALUE_DESC) {
      nodes {
        id
        block
        date
        from
        to
        value
      }
    }
    blockAccrueRewards(first: 5, orderBy: BLOCK_DESC) {
      nodes {
        id
        block
        baker
        bakerReward
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
      "transfers": {
        "nodes": [
          {
            "id": "491566-af551174c69a1cb2714912763a5244a6447a9cb224a60092aeb8f25a9bb3d9a0",
            "block": "491566",
            "date": "2022-08-09T14:58:11.042",
            "from": "3kBx2h5Y2veb4hZgAJWPrr8RyQESKm5TjzF3ti1QQ4VSYLwK1G",
            "to": "3SUYtqy9g9JtkhDydnNsLp6H7vDHaqE7TZ3BhagMoEMf5HakYg",
            "value": "50000000000"
          },
          {
            "id": "498659-03d998f2606cb4b3a25fe53e6d17eb3f0a619b959257527ac0ec6ae5cbba6eb0",
            "block": "498659",
            "date": "2022-08-10T11:16:09.367",
            "from": "3v1JUB1R1JLFtcKvHqD9QFqe2NXeBF53tp69FLPHYipTjNgLrV",
            "to": "4aQYVWgohNvz1JNKQfSearaBR6a8vRfzkukigPhbPC4vn58TH8",
            "value": "2000000000"
          },
          {
            "id": "496754-54e003c546505786e628664dd4db095a6124bba245bc601c560c8529d152d968",
            "block": "496754",
            "date": "2022-08-10T05:45:13.564",
            "from": "3v1JUB1R1JLFtcKvHqD9QFqe2NXeBF53tp69FLPHYipTjNgLrV",
            "to": "3HyjqhNMxNtjytLWCSF6HdHtA62azb7wiQjz3yLsaTtqmTrDhT",
            "value": "2000000000"
          },
          {
            "id": "498634-e3f234b85b02cb9bb0942b5f14573b842733dbf2b5d1cfa11ab2f770952e0648",
            "block": "498634",
            "date": "2022-08-10T11:12:47.17",
            "from": "3v1JUB1R1JLFtcKvHqD9QFqe2NXeBF53tp69FLPHYipTjNgLrV",
            "to": "2xzR9ftc3phmgT14K9ge9rgxNnuS43iiEXpmJvkB6TQAKBG69C",
            "value": "2000000000"
          },
          {
            "id": "496752-2cd084f0acae30433b3618aa16117aeaaf4cb8876661bb36577dd72286f39933",
            "block": "496752",
            "date": "2022-08-10T05:44:38.569",
            "from": "3v1JUB1R1JLFtcKvHqD9QFqe2NXeBF53tp69FLPHYipTjNgLrV",
            "to": "3yikEbXmdM5cWP2DUAPfYT9FVg9gaJ3F93dwhRRn8hsxWFX27L",
            "value": "2000000000"
          }
        ]
      },
      "blockAccrueRewards": {
        "nodes": [
          {
            "id": "499254-0",
            "block": "499254",
            "baker": "7",
            "bakerReward": "0"
          },
          {
            "id": "499253-0",
            "block": "499253",
            "baker": "9",
            "bakerReward": "0"
          },
          {
            "id": "499252-0",
            "block": "499252",
            "baker": "8",
            "bakerReward": "0"
          },
          {
            "id": "499251-0",
            "block": "499251",
            "baker": "3",
            "bakerReward": "0"
          },
          {
            "id": "499250-0",
            "block": "499250",
            "baker": "2",
            "bakerReward": "0"
          }
        ]
      }
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/concordium-subql-starter/tree/main/Concordium/concordium-testnet-starter).
:::

<!-- @include: ../snippets/whats-next.md -->
