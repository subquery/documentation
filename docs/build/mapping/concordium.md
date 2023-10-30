# Concordium Mapping

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we have previously defined in the `schema.graphql` file.

- Mappings are defined in the `src/mappings` directory and are exported as a function.
- These mappings are also exported in `src/index.ts`.
- The mappings files are reference in `project.ts` under the mapping handlers.

There are different classes of mappings functions for Concordium: [Block handlers](#block-handler), [Transaction Handlers](#transaction-handler), [Transaction Event Handlers](#transaction-event-handler) and [Special Event Handlers](#special-event-handler).

## Block Handler

You can use block handlers to capture information each time a new block is attached to the chain, e.g. block number. To achieve this, a defined BlockHandler will be called once for every block.

**Using block handlers slows your project down as they can be executed with each and every block - only use if you need to.**

```ts
import { ConcordiumBlock } from "@subql/types-concordium";

export async function handleBlock(block: ConcordiumBlock): Promise<void> {
  const record = BlockEntity.create({
    id: block.blockHash,
    field1: block.blockHeight,
    field2: "block",
  });
  await record.save();
}
```

## Transaction Handler

You can use transaction handlers to capture information about each of the transactions in a block. To achieve this, a defined TransactionHandler will be called once for every transaction. You should use [Mapping Filters](../manifest/concordium.md#mapping-handlers-and-filters) in your manifest to filter transactions to reduce the time it takes to index data and improve mapping performance.

```ts
import { ConcordiumTransaction } from "@subql/types-concordium";

export async function handleTransaction(
  tx: ConcordiumTransaction
): Promise<void> {
  const record = TransactionEntity.create({
    id: tx.hash,
    field1: tx.type,
    field2: "tx",
  });
  await record.save();
}
```

## Transaction Event Handler

You can use transaction event handlers to capture information about each of the transaction events in a block. To achieve this, a defined TransactionEventHandler will be called once for every transaction event. You should use [Mapping Filters](../manifest/concordium.md#mapping-handlers-and-filters) in your manifest to filter transactions events to reduce the time it takes to index data and improve mapping performance.

```ts
import { ConcordiumTransactionEvent } from "@subql/types-concordium";

export async function handleTransactionEvent(
  txEvent: ConcordiumTransactionEvent
): Promise<void> {
  const record = TransactionEventEntity.create({
    id: txEvent.id,
    field1: txEvent.tag,
    field2: "txEvent",
  });
  await record.save();
}
```

## Special Event Handler

You can use special event handlers to capture information about each of the special events in a block. To achieve this, a defined SpecialEventHandler will be called once for every special event. You should use [Mapping Filters](../manifest/concordium.md#mapping-handlers-and-filters) in your manifest to filter special events to reduce the time it takes to index data and improve mapping performance.

```ts
import { ConcordiumSpecialEvent } from "@subql/types-concordium";

export async function handleSpecialEvent(
  specialEvent: ConcordiumSpecialEvent
): Promise<void> {
  const record = SpecialEventEntity.create({
    id: specialEvent.id,
    field1: specialEvent.tag,
    field2: "specialEvent",
  });
  await record.save();
}
```


## Third-party Library Support - the Sandbox

SubQuery is deterministic by design, that means that each SubQuery project is guaranteed to index the same data set. This is a critical factor that is required to decentralise SubQuery in the SubQuery Network. This limitation means that in default configuration, the indexer is by default run in a strict virtual machine, with access to a strict number of third party libraries.

**You can easily bypass this limitation however, allowing you to retrieve data from external API endpoints, non historical RPC calls, and import your own external libraries into your projects.** In order to do to, you must run your project in `unsafe` mode, you can read more about this in the [references](../../run_publish/references.md#unsafe-node-service). An easy way to do this while developing (and running in Docker) is to add the following line to your `docker-compose.yml`:

```yml
subquery-node:
  image: onfinality/subql-node-concordium:latest
  ...
  command:
    - -f=/app
    - --db-schema=app
    - --unsafe
  ...
```

When run in `unsafe` mode, you can import any custom libraries into your project and make external API calls using tools like node-fetch. A simple example is given below:

```ts
import { ConcordiumTransaction } from "@subql/types-concordium";
import fetch from "node-fetch";

export async function handleTransaction(
  tx: ConcordiumTransaction
): Promise<void> {
  const httpData = await fetch("https://api.github.com/users/github");
  logger.info(`httpData: ${JSON.stringify(httpData.body)}`);
  // Do something with this data
}
```

By default (when in safe mode), the [VM2](https://www.npmjs.com/package/vm2) sandbox only allows the following:

- only some certain built-in modules, e.g. `assert`, `buffer`, `crypto`,`util` and `path`
- third-party libraries written by _CommonJS_.
- external `HTTP` and `WebSocket` connections are forbidden

## Modules and Libraries

To improve SubQuery's data processing capabilities, we have allowed some of the NodeJS's built-in modules for running mapping functions in the [sandbox](#third-party-library-support---the-sandbox), and have allowed users to call third-party libraries.

Please note this is an **experimental feature** and you may encounter bugs or issues that may negatively impact your mapping functions. Please report any bugs you find by creating an issue in [GitHub](https://github.com/subquery/subql).

### Built-in modules

Currently, we allow the following NodeJS modules: `assert`, `buffer`, `crypto`, `util`, and `path`.

Rather than importing the whole module, we recommend only importing the required method(s) that you need. Some methods in these modules may have dependencies that are unsupported and will fail on import.

```ts
import { hashMessage } from "ethers/lib/utils"; // Good way
import { utils } from "ethers"; // Bad way
```
