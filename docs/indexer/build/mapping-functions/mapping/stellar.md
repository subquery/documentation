# Stellar & Soroban Mapping

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we have previously defined in the `schema.graphql` file.

- Mappings are defined in the `src/mappings` directory and are exported as a function.
- These mappings are also exported in `src/index.ts`.
- The mappings files are reference in `project.ts` under the mapping handlers.
- The mappings are run from within a [Sandbox](./sandbox.md)

There are different classes of mapping functions for Stellar; [Block handlers](#block-handler), [Operation Handlers](#operation-handler), and [Effect Handlers](#effect-handler).

Soroban has two classes of mapping functions; [Transaction Handlers](#transaction-handler), and [Event Handlers](#event-handler).

## Block Handler

You can use block handlers to capture information each time a new block is attached to the chain, e.g. block number. To achieve this, a defined BlockHandler will be called once for every block.

**Using block handlers slows your project down as they can be executed with each and every block - only use if you need to.**

```ts
import { StellarBlock } from "@subql/types-stellar";

export async function handleBlock(block: StellarBlock): Promise<void> {
  // Create a new BlockEntity with the block hash as it's ID
  const record = new BlockEntity(block.hash);
  record.height = BigInt(block.sequence);
  await record.save();
}
```

## Transaction Handler

Transaction handlers can be used to capture information about transactions that occur on the chain. You should use [Mapping Filters](../manifest/stellar.md#mapping-handlers-and-filters) in your manifest to filter transactions to reduce the time it takes to index data and improve mapping performance.

::: info Soroban Transactions

Soroban transactions are transactions that call a Soroban contract, they are passed through to the mapping functions as a `StellarTransaction` type.

:::

```ts
import { StellarTransaction } from "@subql/types-stellar";

export async function handleTransaction(
  transaction: StellarTransaction,
): Promise<void> {
  const record = new TransactionEntity(transaction.id);
  record.height = BigInt(transaction.ledger.sequence);
  record.transactionHash = transaction.hash;
  record.sourceAccount = transaction.source_account;
  await record.save();
}
```

## Operation Handler

Operation handlers can be used to capture information about specific operations that occur on the chain. You should use [Mapping Filters](../manifest/stellar.md#mapping-handlers-and-filters) in your manifest to filter transactions to reduce the time it takes to index data and improve mapping performance.

```ts
export async function handleOperation(
  op: StellarOperation<Horizon.PaymentOperationResponse>,
): Promise<void> {
  logger.info(`Indexing operation ${op.id}, type: ${op.type}`);

  const _op = Payment.create({
    id: op.id,
    from: op.from,
    to: op.to,
    txHash: op.transaction_hash,
    amount: op.amount,
  });

  await _op.save();
}
```

## Effect Handler

Effect handlers can be used to capture information about the effects of operations that occur on the chain. You should use [Mapping Filters](../manifest/stellar.md#mapping-handlers-and-filters) in your manifest to filter transactions to reduce the time it takes to index data and improve mapping performance.

```ts
export async function handleCredit(
  effect: StellarEffect<AccountCredited>,
): Promise<void> {
  logger.info(`Indexing effect ${effect.id}, type: ${effect.type}`);

  const _effect = Credit.create({
    id: effect.id,
    account: effect.account,
    amount: effect.amount,
  });

  await _effect.save();
}
```

## Event Handler

You can use event handlers to capture information when certain events are included on transactions. You should use [Mapping Filters](../manifest/stellar.md#mapping-handlers-and-filters) in your manifest to filter transactions to reduce the time it takes to index data and improve mapping performance.

During processing, the event handler will receive a event as an argument with the event's typed inputs and outputs. Any type of event will trigger the mapping, allowing activity with the data source to be captured. You should use [Mapping Filters](../manifest/stellar.md#mapping-handlers-and-filters) in your manifest to filter events to reduce the time it takes to index data and improve mapping performance.

```ts
import { TransferEvent } from "../types";
import { SorobanEvent } from "@subql/types-stellar";

export async function handleEvent(event: SorobanEvent): Promise<void> {
  logger.info(`New event at block ${event.ledger.sequence}`);

  // Get data from the event
  // The transfer event has the following payload \[env, from, to\]
  // logger.info(JSON.stringify(event));
  const {
    topic: [env, from, to],
  } = event;

  // Create the new transfer entity
  const transfer = Transfer.create({
    id: event.id,
    ledger: ledgerNumber,
    date: new Date(event.ledgerClosedAt),
    contract: event.contractId,
    fromId: from,
    toId: to,
    value: BigInt(event.value.decoded!),
  });

  await transfer.save();
}
```
