# Coreum Quick Start

The goal of this quick start guide is to index all transfer events and messages on the [Coreum network](https://www.coreum.com/).

<!-- @include: ../snippets/cosmos-quickstart-reference.md -->

In every SubQuery project, there are 3 key files to update. Let's begin updating them one by one.

::: tip
The final code of this project can be found [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Coreum/coreum-starter).
:::

<!-- @include: ../snippets/cosmos-manifest-intro.md#level2 -->

```ts
dataSources: [
    {
      kind: CosmosDatasourceKind.Runtime,
      startBlock: 14731000,
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
        ]
```

In the code above we have defined two handlers. `handleEvent` will be executed whenever a `transfer` type is detected within a message filter of `/cosmos.bank.v1beta1.MsgSend` type. `handleMessage` is the other handler that will be triggered when a `/cosmos.bank.v1beta1.MsgSend` filter type is triggered. These handlers ared used to track the transfers and messages within the Coreum network.

<!-- @include: ../snippets/cosmos-manifest-note.md -->

<!-- @include: ../snippets/schema-intro.md#level2 -->

For this project, you'll need to modify your schema.graphql file as follows. Since we're indexing all transfer events & messages on the Coreum network, we have a TransferEvent and Message entity that contain a number of fields, including blockHeight, recipient/to, sender/from, and amount:

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
import { MsgSend } from "../types/proto-interfaces/cosmos/bank/v1beta1/tx";

export async function handleMessage(
  msg: CosmosMessage<MsgSend>
): Promise<void> {
  logger.info(`Messsage found at ${msg.block.blockId}`);
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
  logger.info(`Event found at ${event.block.blockId}`);
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

In the Coreum SubQuery project, we have two main functions, namely `handleMessage` and `handleEvent`, that were defined in the `src/mappings/mappingHandlers.ts` file.

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

::: tip
The final code of this project can be found [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Coreum/coreum-starter).
:::

<!-- @include: ../snippets/whats-next.md -->
