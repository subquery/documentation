# Concordium
## Transaction Event Handler

You can use transaction event handlers to capture information about each of the transaction events in a block. To achieve this, a defined TransactionEventHandler will be called once for every transaction event. You should use [Mapping Filters](../manifest/concordium.md#mapping-handlers-and-filters) in your manifest to filter transactions events to reduce the time it takes to index data and improve mapping performance.

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