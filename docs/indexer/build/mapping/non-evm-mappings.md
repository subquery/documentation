# Non-EVM Mappings

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we have previously defined in the `schema.graphql` file.

- Mappings are defined in the `src/mappings` directory and are exported as a function.
- These mappings are also exported in `src/index.ts`.
- The mappings files are reference in `project.ts` under the mapping handlers.
- The mappings are run from within a [Sandbox](./sandbox.md)

There are different classes of mappings functions for various non-evm chains. They are:

 :::code-tabs
@tab:active algorand
```ts
Block Handlers
Transaction Handlers
```

@tab concordium
```ts
Block Handlers
Transaction Handlers
Transaction Event Handlers
Special Event Handlers
```

@tab cosmos
```ts
Block Handlers
Transaction Handlers
Event Handlers
Message Handlers
```

@tab near
```ts
Block Handlers
Transaction Handlers
Action Handlers
```

@tab polkadot
```ts
Block Handlers
Event Handlers
Call Handlers
```

@tab solana
```ts
Block Handlers
Transaction Handlers
Instruction Handlers
Log Handlers
```

@tab starknet
```ts
Block Handlers
Transaction Handlers
Log Handlers
```

@tab stellar/soroban
```ts
Block Handlers
Transaction Handlers
Effect Handles
Log Handlers
Operation Handler
```

:::

## Block Handler

You can use block handlers to capture information each time a new block is attached to the chain, e.g. block number. To achieve this, a defined BlockHandler will be called once for every block.

**Using block handlers slows your project down as they can be executed with each and every block - only use if you need to.**

:::code-tabs

@tab:active algorand

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
@tab concordium
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

@tab cosmos
```ts
import { CosmosBlock } from "@subql/types-cosmos";

export async function handleBlock(block: CosmosBlock): Promise<void> {
  // Create a new BlockEntity with the block hash as it's ID
  const record = new BlockEntity(block.block.block_id.hash);
  record.height = BigInt(block.block.block.header.height);
  await record.save();
}
```

@tab near
```ts
import { NearBlock } from "@subql/types-near";

export async function handleBlock(block: NearBlock): Promise<void> {
  logger.info(`Handling block ${block.header.height}`);

  const blockRecord = NearBlockEntity.create({
    id: block.header.height.toString(),
    hash: block.header.hash,
    author: block.author,
    timestamp: BigInt(block.header.timestamp),
  });

  await blockRecord.save();
}
// The NearTransaction encapsulates transaction info, result, the 
// corresponding block details and the list of NearAction entities that 
// occured in the specific transaction.

```

@tab substrate
```ts
import { SubstrateBlock } from "@subql/types";

export async function handleBlock(block: SubstrateBlock): Promise<void> {
  // Create a new BlockEntity with the block hash as it's ID
  const record = new BlockEntity(block.block.header.hash.toString());
  record.field1 = block.block.header.number.toNumber();
  await record.save();
}
// A `SubstrateBlock` is an extended interface type of 
// [signedBlock](https://polkadot.js.org/docs/api/cookbook/blocks/), 
// but also includes the `specVersion` and `timestamp`.
```

@tab solana
```ts
import { SolanaBlock } from "@subql/types-solana";

export async function handleBlock(block: SolanaBlock): Promise<void> {
  // Create a new BlockEntity with the block hash as it's ID
  const record = new BlockEntity(block.blockHash);
  record.height = BigInt(block.blockNumber);
  await record.save();
}
```

@tab starknet
```ts
import { StarknetBlock } from "@subql/types-starknet";

export async function handleBlock(block: StarknetBlock): Promise<void> {
  // Create a new BlockEntity with the block hash as it's ID
  const record = new BlockEntity(block.blockHash);
  record.height = BigInt(block.blockNumber);
  await record.save();
}
```

@tab stella
```ts
import { StellarBlock } from "@subql/types-stellar";

export async function handleBlock(block: StellarBlock): Promise<void> {
  // Create a new BlockEntity with the block hash as it's ID
  const record = new BlockEntity(block.hash);
  record.height = BigInt(block.sequence);
  await record.save();
}
```



:::


## Transaction Handler

You can use transaction handlers to capture information about each of the transactions in a block. To achieve this, a defined TransactionHandler will be called once for every transaction. You should use [Transaction Filters](../manifest/near.md#mapping-handlers-and-filters) in your manifest to filter transactions to reduce the time it takes to index data and improve mapping performance.

:::code-tabs
@tab:active algorand
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

@tab concordium
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

@tab cosmos
```ts
import { CosmosTransaction } from "@subql/types-cosmos";

export async function handleTransaction(tx: CosmosTransaction): Promise<void> {
  const record = new TransactionEntity(tx.tx.txhash);
  record.blockHeight = BigInt(tx.block.block.block.header.height);
  record.timestamp = tx.block.block.header.time;
  await record.save();
}
// The `CosmosTransaction` encapsulates TxInfo and the corresponding `CosmosBlock` in which the transaction occured.
```


@tab near
```ts
import { NearTransaction } from "@subql/types-near";

export async function handleTransaction(
  transaction: NearTransaction,
): Promise<void> {
  logger.info(`Handling transaction at ${transaction.block_height}`);

  const transactionRecord = NearTxEntity.create({
    id: `${transaction.block_hash}-${transaction.result.id}`,
    signer: transaction.signer_id,
    receiver: transaction.receiver_id,
  });

  await transactionRecord.save();
}

// The `NearTransaction` encapsulates transaction info, result, the corresponding block details and the list of `NearAction` entities that occured in the specific transaction.

```

@tab solana
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

@tab starknet
```ts
import { StarknetTransaction } from "@subql/types-starknet";

export async function handleTransaction(
  tx: WithdrawTransaction,
): Promise<void> {
  logger.info(`New Withdraw transaction at block ${tx.blockNumber}`);
  assert(tx.decodedCalls, "No tx decodedCalls");

  for (let i = 0; i < tx.decodedCalls.length; i++) {
    const call = tx.decodedCalls[i];
    // Notice all invoke calls are returned in the decodedCalls, we need to filter out the calls we are interested in
    if (
      call.selector ===
        "0x015511cc3694f64379908437d6d64458dc76d02482052bfb8a5b33a72c054c77" ||
      call.selector ===
        "0x15511cc3694f64379908437d6d64458dc76d02482052bfb8a5b33a72c054c77"
    ) {
      const withdraw = Withdraw.create({
        id: `${tx.hash}_${i}`,
        user: tx.from,
        // Convert the BigNumberish to Hex
        token: convertBigNumberish(call.decodedArgs.token),
        amount: BigInt(call.decodedArgs.amount),
      });
      logger.info(`withdraw at ${withdraw.id}`);
      await withdraw.save();
    }
  }
}
// We store the decoded calls in the transaction object, so you can 
// easily access the decoded calls and their args in the transaction object.
// To distinguish between different calls types, you can use the `selector` 
// field in the decoded call object.
```
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
// Soroban transactions are transactions that call a Soroban contract.
// They are passed through to the mapping functions as a `StellarTransaction` type.
```

:::


## Chain Specific Handlers

In addition to the block and transaction handlers detailed above, some chains have additional handlers as well which can be found [here](./algorand.md)
