# Solana

<!-- @include: ./snippets/intro.md -->

There are different classes of mappings functions for Solana; [Block handlers](#block-handler), [Transaction Handlers](#transaction-handler), [Instruction Handlers](#instruction-handler), and [Log Handlers](#log-handler).

## Block Handler

<!-- @include: ./snippets/block-handler.md -->

```ts
import { SolanaBlock } from "@subql/types-solana";

export async function handleBlock(block: SolanaBlock): Promise<void> {
  // Create a new BlockEntity with the block hash as it's ID
  const record = new BlockEntity(block.blockHash);
  record.height = BigInt(block.blockNumber);
  await record.save();
}
```

<!-- @include: ./snippets/transaction-handler.md -->

You should use [Mapping Filters](../manifest/solana.md#mapping-handlers-and-filters) in your manifest to filter transactions to reduce the time it takes to index data and improve mapping performance.

```ts
import { Transaction } from "../types";

export async function handleTransaction(tx: SolanaTransaction): Promise<void> {
  logger.info(`New transaction at block ${tx.blockNumber}`);
  const txRecord = Transaction.create({
    id: tx.transaction.signatures[0],
    owner: tx.from,
    spender: await tx.args[0],
    value: BigInt(await tx.args[1].toString()),
    contractAddress: tx.to,
  });

  await txRecord.save();
}
```

## Instruction Handler

You can use instruction handlers to capture information about each of the instructions in a block. To achieve this, a defined InstructionHandler will be called once for every instruction. You should use [Mapping Filters](../manifest/solana.md#mapping-handlers-and-filters) in your manifest to filter instructions to reduce the time it takes to index data and improve mapping performance.

```ts
import { Transfer } from "../types";
import { TransferCheckedInstruction } from '../types/handler-inputs/TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';

export async function handleInstruction(inst: TransferCheckedInstruction): Promise<void> {
  logger.info(`New Transfer instruction at block ${inst.blockNumber}`);

  const source = getAccountByIndex(inst, inst.accounts[0]);
  const mint = getAccountByIndex(inst, inst.accounts[1]);
  const dest = getAccountByIndex(inst, inst.accounts[2]);

  const decoded = await inst.decodedData;
  assert(decoded, "Expected decoded value");

  const transferRecord = Transfer.create({
    id: `${inst.transaction.transaction.signatures[0]}-${inst.index.join('.')}`,
    amount: BigInt(decoded.data.amount),
    from: source,
    to: dest,
    blockNumber: inst.block.blockHeight,
    transactionHash: inst.transaction.transaction.signatures[0],
    date: new Date(Number(inst.block.blockTime) * 1000),
  });

  await transferRecord.save();
}
```

## Log Handler

You can use log handlers to capture information when certain logs are included on transactions. During the processing, the log handler will receive a log as an argument with the log's typed inputs and outputs. Any type of event will trigger the mapping, allowing activity with the data source to be captured. You should use [Mapping Filters](../manifest/solana.md#mapping-handlers-and-filters) in your manifest to filter events to reduce the time it takes to index data and improve mapping performance.

```ts
import { Log } from "../types";

export async function handleLog(log: SolanaLogMessage): Promise<void> {
  logger.info(`New log at block ${log.blockNumber}`);
  const logRecord = Log.create({
    id: log.transactionHash,
    value: log.args.value.toBigInt(),
    from: log.args.from,
    to: log.args.to,
    contractAddress: log.address,
  });

  await logRecord.save();
}
```