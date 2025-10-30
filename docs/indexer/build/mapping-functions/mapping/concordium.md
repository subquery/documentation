# Concordium Mapping

This is the Concordium specific section of the Mapping Functions documentation. If you are looking for the general Mapping Functions documentation, see [here](../).

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

You can use transaction handlers to capture information about each of the transactions in a block. To achieve this, a defined TransactionHandler will be called once for every transaction. You should use [Mapping Filters](../manifest/chain-specific/concordium#mapping-handlers-and-filters) in your manifest to filter transactions to reduce the time it takes to index data and improve mapping performance.

```ts
import { ConcordiumTransaction } from "@subql/types-concordium";

export async function handleTransaction(
  tx: ConcordiumTransaction,
): Promise<void> {
  logger.info(
    `Handling transaction at block ${tx.block.blockHeight.toString()}`,
  );
  const record = TransactionEntity.create({
    id: tx.hash,
    field1: tx.type,
    field2: "tx",
  });
  await record.save();
}
```

## Transaction Event Handler

You can use transaction event handlers to capture information about each of the transaction events in a block. To achieve this, a defined TransactionEventHandler will be called once for every transaction event. You should use [Mapping Filters](../manifest/chain-specific/concordium#mapping-handlers-and-filters) in your manifest to filter transactions events to reduce the time it takes to index data and improve mapping performance.

```ts
import { ConcordiumTransactionEvent } from "@subql/types-concordium";

export async function handleTransactionEvent(
  txEvent: ConcordiumTransactionEvent,
): Promise<void> {
  logger.info(
    `Handling event at block ${txEvent.block.blockHeight.toString()}`,
  );
  const record = TransactionEventEntity.create({
    id: txEvent.id,
    field1: txEvent.tag,
    field2: "txEvent",
  });
  await record.save();
}
```

## Special Event Handler

You can use special event handlers to capture information about each of the special events in a block. To achieve this, a defined SpecialEventHandler will be called once for every special event. You should use [Mapping Filters](../manifest/chain-specific/concordium#mapping-handlers-and-filters) in your manifest to filter special events to reduce the time it takes to index data and improve mapping performance.

```ts
import { ConcordiumSpecialEvent } from "@subql/types-concordium";

export async function handleSpecialEvent(
  specialEvent: ConcordiumSpecialEvent,
): Promise<void> {
  logger.info(
    `Handling special event at block ${specialEvent.block.blockHeight.toString()}`,
  );
  const record = SpecialEventEntity.create({
    id: specialEvent.id,
    field1: specialEvent.tag,
    field2: "specialEvent",
  });
  await record.save();
}
```
