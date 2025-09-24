# Algorand Mapping

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we have previously defined in the `schema.graphql` file.

- Mappings are defined in the `src/mappings` directory and are exported as a function.
- These mappings are also exported in `src/index.ts`.
- The mappings files are reference in `project.ts` under the mapping handlers.
- The mappings are run from within a [Sandbox](../sandbox)

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

You can use transaction handlers to capture information about each of the transactions in a block. To achieve this, a defined TransactionHandler will be called once for every transaction. You should use [Mapping Filters](../manifest/chain-specific/algorand#mapping-handlers-and-filters) in your manifest to filter transactions to reduce the time it takes to index data and improve mapping performance.

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
