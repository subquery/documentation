# Algorand Mapping

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we have previously defined in the `schema.graphql` file.

- Mappings are defined in the `src/mappings` directory and are exported as a function.
- These mappings are also exported in `src/index.ts`.
- The mappings files are reference in `project.ts` under the mapping handlers.

There are different classes of mappings functions for Algorand: [Block handlers](#block-handler), and [Transaction Handlers](#transaction-handler).

## Block Handler

You can use block handlers to capture information each time a new block is attached to the chain, e.g. block number. To achieve this, a defined BlockHandler will be called once for every block.

**Using block handlers slows your project down as they can be executed with each and every block - only use if you need to.**

```ts
import { AlgorandBlock } from "@subql/types-algorand";

export async function handleBlock(block: AlgorandBlock): Promise<void> {
  const record = BlockEntity.create({
    id: block.round.toString(),
    field1: block.round,
    field2: "block",
  });
  await record.save();
}
```

## Transaction Handler

You can use transaction handlers to capture information about each of the transactions in a block. To achieve this, a defined TransactionHandler will be called once for every transaction. You should use [Mapping Filters](../manifest/algorand.md#mapping-handlers-and-filters) in your manifest to filter transactions to reduce the time it takes to index data and improve mapping performance.

```ts
import { AlgorandTransaction } from "@subql/types-algorand";

export async function handleTransaction(
  tx: AlgorandTransaction,
): Promise<void> {
  const record = TransactionEntity.create({
    id: tx.id,
    field1: tx.roundTime,
    field2: "tx",
  });
  await record.save();
}
```

### Algorand Atomic Transfers (Grouped Transactions)

[Atomic Transfers](https://developer.algorand.org/articles/algorand-atomic-transfers/) are irreducible batch transactions that allow groups of transactions to be submitted at one time. If any of the transactions fail, then all the transactions will fail. That is, an Atomic Transfer guarantees the simultaneous execution of multiple transfers of all kinds of assets.

You can get groups of transactions from within your mapping functions with the `AlgorandBlock.getTransactionsByGroup(group)` function. For example:

```ts
// tx.block.getTransactionsByGroup(string groupID): AlgorandTransaction[]
const txGroup: AlgorandTransaction[] = tx.block.getTransactionsByGroup(
  tx.group!,
);
```

## Third-party Library Support - the Sandbox

SubQuery is deterministic by design, that means that each SubQuery project is guaranteed to index the same data set. This is a critical factor that is makes it possible to verify data in the decentralised SubQuery Network. This limitation means that in default configuration, the indexer is by default run in a strict virtual machine, with access to a strict number of third party libraries.

**You can easily bypass this limitation however, allowing you to retrieve data from external API endpoints, non historical RPC calls, and import your own external libraries into your projects.** In order to do to, you must run your project in `unsafe` mode, you can read more about this in the [references](../../run_publish/references.md#unsafe-node-service). An easy way to do this while developing (and running in Docker) is to add the following line to your `docker-compose.yml`:

```yml
subquery-node:
  image: onfinality/subql-node-algorand:latest
  ...
  command:
    - -f=/app
    - --db-schema=app
    - --unsafe
  ...
```

When run in `unsafe` mode, you can import any custom libraries into your project and make external API calls using tools like node-fetch. A simple example is given below:

```ts
import { AlgorandTransaction } from "@subql/types-algorand";
import fetch from "node-fetch";

export async function handleTransaction(
  tx: AlgorandTransaction,
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
