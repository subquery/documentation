# Algorand

<!-- @include: ./snippets/intro.md -->

There are different classes of mappings functions for Algorand: [Block handlers](#block-handler), and [Transaction Handlers](#transaction-handler). 

<!-- @include: ./snippets/block-handler.md -->

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

<!-- @include: ./snippets/transaction-handler.md -->

You should use [Mapping Filters](../manifest/algorand.md#mapping-handlers-and-filters) in your manifest to filter transactions to reduce the time it takes to index data and improve mapping performance. 

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
