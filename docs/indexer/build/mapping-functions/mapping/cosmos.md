# Cosmos Mapping

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we have previously defined in the `schema.graphql` file.

- Mappings are defined in the `src/mappings` directory and are exported as a function.
- These mappings are also exported in `src/index.ts`.
- The mappings files are reference in `project.ts` under the mapping handlers.

There are different classes of mappings functions for Cosmos; [Block handlers](#block-handler), [Event Handlers](#event-handler), [Transaction Handlers](#transaction-handler), and [Message Handlers](#message-handler).

## Block Handler

You can use block handlers to capture information each time a new block is attached to the chain, e.g. block number. To achieve this, a defined BlockHandler will be called once for every block.

**Using block handlers slows your project down as they can be executed with each and every block - only use if you need to.**

```ts
import { CosmosBlock } from "@subql/types-cosmos";

export async function handleBlock(block: CosmosBlock): Promise<void> {
  // Create a new BlockEntity with the block hash as it's ID
  const record = BlockEntity.create({
    id: block.block.block_id.hash,
    height: BigInt(block.block.block.header.height),
  });
  await record.save();
}
```

## Event Handler

You can use event handlers to capture information when certain events are included on a new block. The events that are part of the default runtime and a block may contain multiple events.

During the processing, the event handler will receive an event as an argument with the event's typed inputs and outputs. Any type of event will trigger the mapping, allowing activity with the data source to be captured. You should use [Mapping Filters](../manifest/chain-specific/cosmos#mapping-handlers-and-filters) in your manifest to filter events to reduce the time it takes to index data and improve mapping performance.

```ts
import { CosmosEvent } from "@subql/types-cosmos";

export async function handleEvent(event: CosmosEvent): Promise<void> {
  const record = EventEntity.create({
    id: `${event.tx.tx.txhash}-${event.msg.idx}-${event.idx}`,
    blockHeight: BigInt(event.block.block.block.header.height),
    txHash: event.tx.tx.txhash,
  });
  await record.save();
}
```

A `CosmosEvent` encapsulates Event data and `TxLog` corresponding to the event. It also contains `CosmosMessage` data of the message connected to the event. Also, it includes the `CosmosBlock` and `CosmosTransaction` data of the block and transaction from which the event was emitted.

## Transaction Handler

You can use transaction handlers to capture information about each of the transactions in a block. To achieve this, a defined TransactionHandler will be called once for every transaction. You should use [Mapping Filters](../manifest/chain-specific/cosmos#mapping-handlers-and-filters) in your manifest to filter transactions to reduce the time it takes to index data and improve mapping performance.

```ts
import { CosmosTransaction } from "@subql/types-cosmos";

export async function handleTransaction(tx: CosmosTransaction): Promise<void> {
  const record = TransactionEntity.create({
    id: tx.tx.txhash,
    blockHeight: BigInt(tx.block.block.block.header.height),
    timestamp: tx.block.block.header.time,
  });
  await record.save();
}
```

The `CosmosTransaction` encapsulates TxInfo and the corresponding `CosmosBlock` in which the transaction occured.

## Message Handler

You can use message handlers to capture information from each message in a transaction. To achieve this, a defined MessageHandler will be called once for every message. You should use [Mapping Filters](../manifest/chain-specific/cosmos#mapping-handlers-and-filters) in your manifest to filter messages to reduce the time it takes to index data and improve mapping performance.

[Cosmos Codegen from CosmWasm Protobufs](../introduction.md#cosmos-codegen-from-cosmwasm-protobufs) provides typesafe types for all CosmWasm contracts. You should consider adding these to the `CosmosMessage<T>` in your mapping handlers like so.

```ts
import { CosmosMessage } from "@subql/types-cosmos";
import { Coin, Deposit, DepositCoin } from "../types";
import { MsgDeposit } from "../types/proto-interfaces/thorchain/v1/x/thorchain/types/msg_deposit";

export async function handleMessage(
  msg: CosmosMessage<MsgDeposit>,
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
}
```

`CosmosMessage` encapsulates the `msg.decodedMsg` object containing the decoded message data, the `CosmosTransaction` in which the message occured in and also the `CosmosBlock` in which the transaction occured in.

## RPC Calls

We also support some [API RPC methods here](https://github.com/subquery/subql-cosmos/blob/main/packages/types/src/global.ts#L11) that are remote calls that allow the mapping function to interact with the actual node and chain state.

Documents in [CosmWasm Stargate Client](https://cosmos.github.io/cosmjs/latest/cosmwasm-stargate/modules.html) provide some methods.

::: warning Important
One caveat is that when you query, it will currently query state at the latest block height not at the height being indexed. We have been unable to find a way to query at a specific height, please reach out if you know of a way how!
:::

## Chain Type Registries

Some decoded message data from Cosmos Chains has nested message types that don't get decoded.

We inject the [`registry`](https://cosmos.github.io/cosmjs/latest/proto-signing/classes/Registry.html) globally into the sandbox so that users can decode more messages as they need.

```ts
import { MsgUpdateClient } from "cosmjs-types/ibc/core/client/v1/tx";

registry.register("/ibc.core.client.v1.MsgUpdateClient", MsgUpdateClient);
```
