# Cosmos Mapping

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we have previously defined in the `schema.graphql` file.

- Mappings are defined in the `src/mappings` directory and are exported as a function.
- These mappings are also exported in `src/index.ts`.
- The mappings files are reference in `project.yaml` under the mapping handlers.

There are different classes of mappings functions for Cosmos; [Block handlers](#block-handler), [Event Handlers](#event-handler), [Transaction Handlers](#transaction-handler), and [Message Handlers](#message-handler).

## Block Handler

You can use block handlers to capture information each time a new block is attached to the chain, e.g. block number. To achieve this, a defined BlockHandler will be called once for every block.

```ts
import { CosmosBlock } from "@subql/types-cosmos";

export async function handleBlock(block: CosmosBlock): Promise<void> {
  // Create a new BlockEntity with the block hash as it's ID
  const record = new BlockEntity(block.block.block_id.hash);
  record.height = BigInt(block.block.block.header.height);
  await record.save();
}
```

## Event Handler

You can use event handlers to capture information when certain events are included on a new block. The events that are part of the default runtime and a block may contain multiple events.

During the processing, the event handler will receive an event as an argument with the event's typed inputs and outputs. Any type of event will trigger the mapping, allowing activity with the data source to be captured. You should use [Mapping Filters](../manifest/cosmos.md#mapping-handlers-and-filters) in your manifest to filter events to reduce the time it takes to index data and improve mapping performance.

```ts
import { CosmosEvent } from "@subql/types-cosmos";

export async function handleEvent(event: CosmosEvent): Promise<void> {
  const record = new EventEntity(
    `${event.tx.tx.txhash}-${event.msg.idx}-${event.idx}`
  );
  record.blockHeight = BigInt(event.block.block.block.header.height);
  record.txHash = event.tx.tx.txhash;
  await record.save();
}
```

A `CosmosEvent` encapsulates Event data and `TxLog` corresponding to the event. It also contains `CosmosMessage` data of the message connected to the event. Also, it includes the `CosmosBlock` and `CosmosTransaction` data of the block and transaction from which the event was emitted.

## Transaction Handler

You can use transaction handlers to capture information about each of the transactions in a block. To achieve this, a defined TransactionHandler will be called once for every transaction. You should use [Mapping Filters](../manifest/cosmos.md#mapping-handlers-and-filters) in your manifest to filter transactions to reduce the time it takes to index data and improve mapping performance.

```ts
import { CosmosTransaction } from "@subql/types-cosmos";

export async function handleTransaction(tx: CosmosTransaction): Promise<void> {
  const record = new TransactionEntity(tx.tx.txhash);
  record.blockHeight = BigInt(tx.block.block.block.header.height);
  record.timestamp = tx.block.block.header.time;
  await record.save();
}
```

The `CosmosTransaction` encapsulates TxInfo and the corresponding `CosmosBlock` in which the transaction occured.

## Message Handler

You can use message handlers to capture information from each message in a transaction. To achieve this, a defined MessageHandler will be called once for every message. You should use [Mapping Filters](../manifest/cosmos.md#mapping-handlers-and-filters) in your manifest to filter messages to reduce the time it takes to index data and improve mapping performance.

```ts
import { CosmosMessage } from "@subql/types-cosmos";

export async function handleMessage(msg: CosmosMessage): Promise<void> {
  const record = new MessageEntity(`${msg.tx.tx.hash}-${msg.idx}`);
  record.blockHeight = BigInt(msg.block.block.header.height);
  record.txHash = msg.tx.txhash;
  record.contract = msg.msg.contract;
  record.sender = msg.msg.sender;
  await record.save();
}
```

`CosmosMessage` encapsulates the `msg` object containing the message data, the `CosmosTransaction` in which the message occured in and also the `CosmosBlock` in which the transaction occured in.

## The Sandbox

SubQuery is deterministic by design, that means that each SubQuery project is guranteed to index the same data set. This is a critical factor that is required to decentralise SubQuery in the SubQuery Network. This limitation means that the indexer is by default run in a strict virtual machine, with access to a strict number of third party libraries.

**You can bypass this limitation, allowing you to index and retrieve information from third party data sources like HTTP endpoints, non historical RPC calls, and more.** In order to do to, you must run your project in `unsafe-mode`, you can read more about this in the [references](../../run_publish/references.md#unsafe-node-service). An easy way to do this while developing (and running in Docker) is to add the following line to your `docker-compose.yml`:

```yml
subquery-node:
  image: onfinality/subql-node-cosmos:latest
  ...
  command:
    - -f=/app
    - --db-schema=app
    - --unsafe
  ...
```

By default, the [VM2](https://www.npmjs.com/package/vm2) sandbox only allows the folling:

- only some certain built-in modules, e.g. `assert`, `buffer`, `crypto`,`util` and `path`
- third-party libraries written by _CommonJS_.
- Historical/safe queries, see [RPC Calls](#rpc-calls).
- Note `HTTP` and `WebSocket` connections are forbidden

## Modules and Libraries

To improve SubQuery's data processing capabilities, we have allowed some of the NodeJS's built-in modules for running mapping functions in the [sandbox](#the-sandbox), and have allowed users to call third-party libraries.

Please note this is an **experimental feature** and you may encounter bugs or issues that may negatively impact your mapping functions. Please report any bugs you find by creating an issue in [GitHub](https://github.com/subquery/subql).

### Built-in modules

Currently, we allow the following NodeJS modules: `assert`, `buffer`, `crypto`, `util`, and `path`.

Rather than importing the whole module, we recommend only importing the required method(s) that you need. Some methods in these modules may have dependencies that are unsupported and will fail on import.

```ts
import { hashMessage } from "ethers/lib/utils"; // Good way
import { utils } from "ethers"; // Bad way
```

## RPC Calls

We also support some [API RPC methods here](https://github.com/subquery/subql-cosmos/blob/main/packages/types/src/global.ts#L11) that are remote calls that allow the mapping function to interact with the actual node and chain state.

Documents in [CosmWasm Stargate Client](https://cosmos.github.io/cosmjs/latest/cosmwasm-stargate/modules.html) provide some methods.

::: warning Important
One caveat is that when you query, it will currently query state at the latest block height not at the height being indexed. We have been unable to find a way to query at a specific height, please reach out if you know of a way how!
:::

## Chain Type Registries

Some decoded message data from Cosmos Chains has nested message types that don't get decoded.

We inject the [`registry`](https://cosmos.github.io/cosmjs/latest/proto-signing/classes/Registry.html) globally into the sandbox so that users can decode more messages as they need.

```typescript
import { MsgUpdateClient } from "cosmjs-types/ibc/core/client/v1/tx";

registry.register("/ibc.core.client.v1.MsgUpdateClient", MsgUpdateClient);
```
