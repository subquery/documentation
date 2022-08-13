# Avalanche Mapping

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we have previously defined in the `schema.graphql` file.

- Mappings are defined in the `src/mappings` directory and are exported as a function.
- These mappings are also exported in `src/index.ts`.
- The mappings files are reference in `project.yaml` under the mapping handlers.

There are different classes of mappings functions for Avalanche; [Block handlers](mapping.md#block-handler), [Transaction Handlers](mapping.md#transaction-handler), and [Log Handlers](mapping.md#log-handler).

## Block Handler

You can use block handlers to capture information each time a new block is attached to the chain, e.g. block number. To achieve this, a defined BlockHandler will be called once for every block.

```ts
import { AvalancheBlock } from "@subql/types-avalanche";

export async function handleBlock(block: AvalancheBlock): Promise<void> {
  // Create a new BlockEntity with the block hash as it's ID
  const record = new BlockEntity(block.hash);
  record.height = BigInt(block.number);
  await record.save();
}
```

An `AvalancheBlock` encapsulates all transactions and events in the block.

## Transaction Handler

You can use transaction handlers (Avalanche and Terra only) to capture information about each of the transactions in a block. To achieve this, a defined TransactionHandler will be called once for every transaction. You should use [Mapping Filters](../build/manifest.md#mapping-handlers-and-filters) in your manifest to filter transactions to reduce the time it takes to index data and improve mapping performance.

```ts
import { AvalancheTransaction } from "@subql/types";

export async function handleTransaction(
  tx: AvalancheTransaction
): Promise<void> {
  const record = new TransactionEntity(
    `${transaction.blockHash}-${transaction.hash}`
  );
  record.blockHeight = BigInt(tx.blockNumber);
  record.from = tx.from;
  record.to = tx.to;
  record.value = tx.value;
  await record.save();
}
```

The `AvalancheTransaction` encapsulates `TxInfo` and the corresponding block information in which the transaction occured.

## Log Handler

You can use log handlers to capture information when certain logs are included on transactions. During the processing, the log handler will receive a log as an argument with the log's typed inputs and outputs. Any type of event will trigger the mapping, allowing activity with the data source to be captured. You should use [Mapping Filters](../build/manifest.md#mapping-handlers-and-filters) in your manifest to filter events to reduce the time it takes to index data and improve mapping performance.

```ts
import { AvalancheLog } from "@subql/types-avalanche";

export async function handleLog(event: AvalancheLog): Promise<void> {
  const record = new EventEntity(`${event.blockHash}-${event.logIndex}`);
  record.blockHeight = BigInt(event.blockNumber);
  record.topics = event.topics; // Array of strings
  record.data = event.data;
  await record.save();
}
```

## The Sandbox

SubQuery is deterministic by design, that means that each SubQuery project is guranteed to index the same data set. This is a critical factor that is required to decentralise SubQuery in the SubQuery Network. This limitation means that the indexer is by default run in a strict virtual machine, with access to a strict number of third party libraries.

**You can bypass this limitation, allowing you to index and retrieve information from third party data sources like HTTP endpoints, non historical RPC calls, and more.** In order to do to, you must run your project in `unsafe-mode`, you can read more about this in the [references](../run_publish/references.md#unsafe). An easy way to do this while developing (and running in Docker) is to add the following line to your `docker-compose.yml`:

```yml
subquery-node:
  image: onfinality/subql-node-avalanche:latest
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
- hybrid libraries like `@polkadot/*` that uses ESM as default. However, if any other libraries depend on any modules in _ESM_ format, the virtual machine will _NOT_ compile and return an error.
- Historical/safe queries, see [RPC Calls](mapping.md#rpc-calls).
- Note `HTTP` and `WebSocket` connections are forbidden

## Modules and Libraries

To improve SubQuery's data processing capabilities, we have allowed some of the NodeJS's built-in modules for running mapping functions in the [sandbox](mapping.md#the-sandbox), and have allowed users to call third-party libraries.

Please note this is an **experimental feature** and you may encounter bugs or issues that may negatively impact your mapping functions. Please report any bugs you find by creating an issue in [GitHub](https://github.com/subquery/subql).

### Built-in modules

Currently, we allow the following NodeJS modules: `assert`, `buffer`, `crypto`, `util`, and `path`.

Rather than importing the whole module, we recommend only importing the required method(s) that you need. Some methods in these modules may have dependencies that are unsupported and will fail on import.

```ts
import { hashMessage } from "ethers/lib/utils"; //Good way
import { utils } from "ethers"; //Bad way

export async function handleLog(event: AvalancheLog): Promise<void> {
  const record = new EventEntity(`${event.blockHash}-${event.logIndex}`);
  record.field1 = hashMessage("Hello");
  await record.save();
}
```
