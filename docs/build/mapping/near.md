# NEAR Mapping

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we have previously defined in the `schema.graphql` file.

- Mappings are defined in the `src/mappings` directory and are exported as a function.
- These mappings are also exported in `src/index.ts`.
- The mappings files are reference in `project.yaml` under the mapping handlers.

There are different classes of mappings functions for Near; [Block handlers](#block-handler), [Transaction Handlers](#transaction-handler), and [Action Handlers](#action-handler).

## Block Handler

You can use block handlers to capture information each time a new block is attached to the chain, e.g. block number. To achieve this, a defined BlockHandler will be called once for every block.

```ts
import { NearBlock } from "@subql/types-near";

export async function handleBlock(block: NearBlock): Promise<void> {
  logger.info(`Handling block ${block.header.height}`);
  const blockRecord = new NearBlockEntity(block.header.height.toString());

  blockRecord.hash = block.header.hash;
  blockRecord.author = block.author;
  blockRecord.timestamp = BigInt(block.header.timestamp);
  await blockRecord.save();
}
```

## Transaction Handler

You can use transaction handlers to capture information about each of the transactions in a block. To achieve this, a defined TransactionHandler will be called once for every transaction. You should use [Transaction Filters](../manifest/near.md#mapping-handlers-and-filters) in your manifest to filter transactions to reduce the time it takes to index data and improve mapping performance.

```ts
import { NearTransaction } from "@subql/types-near";

export async function handleTransaction(
  transaction: NearTransaction
): Promise<void> {
  const transactionRecord = new NearTxEntity(
    `${transaction.block_hash}-${transaction.result.id}`
  );
  
  transactionRecord.signer = transaction.signer_id;
  transactionRecord.receiver = transaction.receiver_id;
  await transactionRecord.save();
}
```

The `NearTransaction` encapsulates transaction info, result, the corresponding block details and the list of `NearAction` that occured in the transaction.

## Action Handler

You can use action handlers to capture information from each action in a transaction. To achieve this, a defined ActionHandler will be called once for every action. You should use [Mapping Filters](../manifest/near.md#mapping-handlers-and-filters) in your manifest to filter actions to reduce the time it takes to index data and improve mapping performance.

```ts
import { NearAction, Transfer } from "@subql/types-near";

export async function handleAction(
  action: NearAction
): Promise<void> {
  action = action as NearAction<Transfer>;

  const actionRecord = new NearActionEntity(
    `${action.transaction.result.id}-${action.id}`
  )

  actionRecord.sender = action.transaction.signer_id;
  actionRecord.receiver = action.transaction.receiver_id;
  actionRecord.amount = BigInt((action.action as Transfer).deposit.toString());

  await actionRecord.save();
}
```

`NearAction` encapsulates the `action` object containing the action data, the `NearTransaction` in which the action occured in.

## The Sandbox

SubQuery is deterministic by design, that means that each SubQuery project is guranteed to index the same data set. This is a critical factor that is required to decentralise SubQuery in the SubQuery Network. This limitation means that the indexer is by default run in a strict virtual machine, with access to a strict number of third party libraries.

**You can bypass this limitation, allowing you to index and retrieve information from third party data sources like HTTP endpoints, non historical RPC calls, and more.** In order to do to, you must run your project in `unsafe-mode`, you can read more about this in the [references](../../run_publish/references.md#unsafe-node-service). An easy way to do this while developing (and running in Docker) is to add the following line to your `docker-compose.yml`:

```yml
subquery-node:
  image: onfinality/subql-node-near:latest
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

We also support some [API RPC methods here](https://github.com/subquery/subql-near/blob/9494b2110af756d1147ecceba99fdf3c493c5762/packages/types/src/global.ts#L11) that are remote calls that allow the mapping function to interact with the actual node and chain state.

Documents in [Near JsonRpcProvider](https://docs.near.org/tools/near-api-js/reference/classes/providers_json_rpc_provider.JsonRpcProvider.html) provide some methods.
