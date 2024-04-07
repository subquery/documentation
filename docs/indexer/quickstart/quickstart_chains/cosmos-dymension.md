# Dymension Quick Start

Dymension works like a big web system. Users use RollApps (front-end), the Dymension Hub (back-end) manages everything, and data networks (database) store information. RollApps are like interactive apps in Dymension.

The goal of this quick start guide is to index all transfer events and messages on the [Dymension network](https://dymension.network/).

<!-- @include: ../snippets/cosmos-quickstart-reference.md -->

::: tip
The final code of this project can be found [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Dymension/dymension-starter).
:::

<!-- @include: ../snippets/cosmos-manifest-intro.md -->

::: code-tabs

@tab `project.ts`

```ts
dataSources: [
  {
    kind: CosmosDatasourceKind.Runtime,
    startBlock: 1326903,
    mapping: {
      file: "./dist/index.js",
      handlers: [
        {
          handler: "handleEvent",
          kind: CosmosHandlerKind.Event,
          filter: {
            type: "transfer",
            messageFilter: {
              type: "/cosmos.bank.v1beta1.MsgSend",
            },
          },
        },
      ],
    },
  },
];
```

:::

Here we are in search of a single type of – namely, `transfer` representing the transfers.

<!-- @include: ../snippets/cosmos-manifest-note.md -->

<!-- @include: ../snippets/schema-intro.md -->

```graphql
type Transfer @entity {
  id: ID!
  blockHeight: BigInt
  txHash: String
  fromAddress: String
  toAddress: String
  amount: String
}
```

The single enity is the `Transfer`.

<!-- @include: ../snippets/cosmos-codegen.md -->

<!-- @include: ../snippets/cosmos-mapping-intro.md -->

::: code-tabs
@tab:active `mappingHandlers.ts`

```ts
import { Transfer } from "../types";
import { CosmosEvent } from "@subql/types-cosmos";

export async function handleEvent(event: CosmosEvent): Promise<void> {
  const eventRecord = Transfer.create({
    id: `${event.tx.hash}-${event.msg.idx}-${event.idx}`,
    blockHeight: BigInt(event.block.block.header.height),
    txHash: event.tx.hash,
    toAddress: "",
    amount: "",
    fromAddress: "",
  });
  for (const attr of event.event.attributes) {
    switch (attr.key) {
      case "recipient":
        eventRecord.toAddress = attr.value;
        break;
      case "amount":
        eventRecord.amount = attr.value;
        break;
      case "sender":
        eventRecord.fromAddress = attr.value;
        break;
      default:
        break;
    }
  }
  await eventRecord.save();
}
```

:::

In the Dymension SubQuery project, we have two a single function, namely `handleEvent`. The `handleEvent` function is also triggered when a `/cosmos.bank.v1beta1.MsgSend` type message is detected for a transfer. It receives an event of type `CosmosEvent`, and then it also extracts blockHeight, transaction hash, from, to and amount from the `event` object.

<!-- @include: ../snippets/cosmos-mapping-note.md -->

::: tip
The final code of this project can be found [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Dymension/dymension-starter).
:::

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

#### Request

```graphql
{
  query {
    transfers(first: 5) {
      nodes {
        id
        blockHeight
        txHash
        recipient
        sender
        amount
      }
    }
  }
}
```

#### Response

```json
{
  "data": {
    "query": {
      "transfers": {
        "nodes": [
          {
            "id": "56C9A9D33C8C222A25D16AFF1C032561703F765D3DB1DD2B217B07DDB394A24C-0-0",
            "blockHeight": "1651519",
            "txHash": "56C9A9D33C8C222A25D16AFF1C032561703F765D3DB1DD2B217B07DDB394A24C",
            "fromAddress": "dym1g8sf7w4cz5gtupa6y62h3q6a4gjv37pgefnpt5",
            "toAddress": "dym1a4gqlkq2qu8fnncxfv9wdt67zthcfyqwx92g0g",
            "amount": "200000000000000000000udym"
          }
        ]
      }
    }
  }
}
```

<!-- @include: ../snippets/whats-next.md -->
