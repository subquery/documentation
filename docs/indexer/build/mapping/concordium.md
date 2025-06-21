# Concordium

<!-- @include: ./snippets/intro.md -->

There are different classes of mappings functions for Concordium: [Block handlers](#block-handler), [Transaction Handlers](#transaction-handler), [Transaction Event Handlers](#transaction-event-handler) and [Special Event Handlers](#special-event-handler).

<!-- @include: ./snippets/block-handler.md -->

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

<!-- @include: ./snippets/transaction-handler.md -->

You should use [Mapping Filters](../manifest/concordium.md#mapping-handlers-and-filters) in your manifest to filter transactions events to reduce the time it takes to index data and improve mapping performance.

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

You can use special event handlers to capture information about each of the special events in a block. To achieve this, a defined SpecialEventHandler will be called once for every special event. You should use [Mapping Filters](../manifest/concordium.md#mapping-handlers-and-filters) in your manifest to filter special events to reduce the time it takes to index data and improve mapping performance.

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