# Algorand
Additional handlers for Algorand.

## Algorand Atomic Transfers (Grouped Transactions)

[Atomic Transfers](https://developer.algorand.org/articles/algorand-atomic-transfers/) are irreducible batch transactions that allow groups of transactions to be submitted at one time. If any of the transactions fail, then all the transactions will fail. That is, an Atomic Transfer guarantees the simultaneous execution of multiple transfers of all kinds of assets.

You can get groups of transactions from within your mapping functions with the `AlgorandBlock.getTransactionsByGroup(group)` function. For example:

```ts
// tx.block.getTransactionsByGroup(string groupID): AlgorandTransaction[]
const txGroup: AlgorandTransaction[] = tx.block.getTransactionsByGroup(
  tx.group!,
);
```
