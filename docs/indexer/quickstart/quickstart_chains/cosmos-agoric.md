# Agoric Quick Start

The goal of this quick start guide is to index all transfer events and messages on the [Agoric network](https://agoric.com/).

<!-- @include: ../snippets/cosmos-quickstart-reference.md -->

In every SubQuery project, there are 3 key files to update. Let's begin updating them one by one.

::: tip
The final code of this project can be found [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Agoric/agoric-starter).
:::

<!-- @include: ../snippets/cosmos-manifest-intro.md#level2 -->

```ts
{
  dataSources: [
    {
      kind: CosmosDatasourceKind.Runtime,
      startBlock: 11628269,
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
          {
            handler: "handleMessage",
            kind: CosmosHandlerKind.Message,
            filter: {
              type: "/cosmos.bank.v1beta1.MsgSend",
            },
          },
        ],
      },
    },
  ],
}
```

In the code above we have defined two handlers. `handleEvent` will be executed whenever a `transfer` type is detected within a message filter of `/cosmos.bank.v1beta1.MsgSend` type. `handleMessage` is the other handler that will be triggered when a `/cosmos.bank.v1beta1.MsgSend` filter type is triggered. These handlers ared used to track the transfers and messages within the Agoric network.

<!-- @include: ../snippets/cosmos-manifest-note.md -->

<!-- @include: ../snippets/schema-intro.md#level2 -->

For this project, you'll need to modify your schema.graphql file as follows. Since we're indexing all [transfer events & messages](https://agoric.explorers.guru/transaction/69D296C6E643621429959A5B25D2F3DE1F1A67A5481FC1B7986322DBEA61BF8D) on the Agoric network, we have a TransferEvent and Message entity that contain a number of fields, including blockHeight, recipient/to, sender/from, and amount

```graphql
type TransferEvent @entity {
  id: ID!
  blockHeight: BigInt!
  txHash: String!
  recipient: String!
  sender: String!
  amount: String!
}

type Message @entity {
  id: ID!
  blockHeight: BigInt!
  txHash: String!
  from: String!
  to: String!
  amount: String!
}
```

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/cosmos-codegen.md -->

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro.md#level2 -->

Navigate to the default mapping function in the `src/mappings` directory and update your mapping files to match the following (**note the additional imports**):

```ts
import { TransferEvent, Message } from "../types";
import {
  CosmosEvent,
  CosmosBlock,
  CosmosMessage,
  CosmosTransaction,
} from "@subql/types-cosmos";

export async function handleMessage(msg: CosmosMessage): Promise<void> {
  const messageRecord = Message.create({
    id: `${msg.tx.hash}-${msg.idx}`,
    blockHeight: BigInt(msg.block.block.header.height),
    txHash: msg.tx.hash,
    from: msg.msg.decodedMsg.fromAddress,
    to: msg.msg.decodedMsg.toAddress,
    amount: JSON.stringify(msg.msg.decodedMsg.amount),
  });
  await messageRecord.save();
}

export async function handleEvent(event: CosmosEvent): Promise<void> {
  const eventRecord = TransferEvent.create({
    id: `${event.tx.hash}-${event.msg.idx}-${event.idx}`,
    blockHeight: BigInt(event.block.block.header.height),
    txHash: event.tx.hash,
    recipient: "",
    amount: "",
    sender: "",
  });
  for (const attr of event.event.attributes) {
    switch (attr.key) {
      case "recipient":
        eventRecord.recipient = attr.value;
        break;
      case "amount":
        eventRecord.amount = attr.value;
        break;
      case "sender":
        eventRecord.sender = attr.value;
        break;
      default:
        break;
    }
  }
  await eventRecord.save();
}
```

In the Agoric SubQuery project, we have two main functions, namely `handleMessage` and `handleEvent`, that were defined in the `src/mappings/mappingHandlers.ts` file.

The `handleMessage` function is triggered when a `/cosmos.bank.v1beta1.MsgSend` type message is detected. It receives a message of type `CosmosMessage`, and then extracts key data points such as blockHeight, transaction hash, from, to and amount from the `msg` object.

The `handleEvent` function is also triggered when a `/cosmos.bank.v1beta1.MsgSend` type message is detected for a transfer. It receives an event of type `CosmosEvent`, and then it also extracts blockHeight, transaction hash, from, to and amount from the `event` object.

<!-- @include: ../snippets/cosmos-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
{
  query {
    transferEvents(first: 2) {
      nodes {
        id
        blockHeight
        txHash
        recipient
        sender
        amount
      }
    }
    messages(first: 2) {
      nodes {
        id
        blockHeight
        txHash
        from
        to
        amount
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
      "transferEvents": {
        "nodes": [
          {
            "id": "69D296C6E643621429959A5B25D2F3DE1F1A67A5481FC1B7986322DBEA61BF8D-0-217",
            "blockHeight": "12310659",
            "txHash": "69D296C6E643621429959A5B25D2F3DE1F1A67A5481FC1B7986322DBEA61BF8D",
            "recipient": "agoric14nnv35u887jjf2sy24cfvmh2dq3h58c7lv5sxk",
            "sender": "agoric1xa6pnqj4jpw06n3ffdrtgc5644rgd79hfzq7mc",
            "amount": "69979701ubld"
          },
          {
            "id": "B35A81D98AAE07FB638064FD1CA2F06D72CF877B18F55A285BC162F321A2FF16-0-218",
            "blockHeight": "12308513",
            "txHash": "B35A81D98AAE07FB638064FD1CA2F06D72CF877B18F55A285BC162F321A2FF16",
            "recipient": "agoric153xw08gz7emm4y28tekzgy3ewmgdykdz6csznj",
            "sender": "agoric142sgu52x5d9w79yzp5c43z0z5n4dstvxp7lajw",
            "amount": "974720000ubld"
          }
        ]
      },
      "messages": {
        "nodes": [
          {
            "id": "B35A81D98AAE07FB638064FD1CA2F06D72CF877B18F55A285BC162F321A2FF16-0",
            "blockHeight": "12308513",
            "txHash": "B35A81D98AAE07FB638064FD1CA2F06D72CF877B18F55A285BC162F321A2FF16",
            "from": "agoric142sgu52x5d9w79yzp5c43z0z5n4dstvxp7lajw",
            "to": "agoric153xw08gz7emm4y28tekzgy3ewmgdykdz6csznj",
            "amount": "[{\"denom\":\"ubld\",\"amount\":\"974720000\"}]"
          },
          {
            "id": "627DFE0E4C1188D66FCE63D37ABE40907F9157F5FEC6BB7C98888629E12AFDAE-0",
            "blockHeight": "12309508",
            "txHash": "627DFE0E4C1188D66FCE63D37ABE40907F9157F5FEC6BB7C98888629E12AFDAE",
            "from": "agoric142sgu52x5d9w79yzp5c43z0z5n4dstvxp7lajw",
            "to": "agoric1nrtnwnu8930dm8sjlghpjxzykl4jy0dazrlxxc",
            "amount": "[{\"denom\":\"ubld\",\"amount\":\"1178914251\"}]"
          }
        ]
      }
    }
  }
}
```

::: tip
The final code of this project can be found [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Agoric/agoric-starter).
:::

<!-- @include: ../snippets/whats-next.md -->
