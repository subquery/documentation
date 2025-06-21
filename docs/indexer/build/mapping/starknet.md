# Starknet

<!-- @include: ./snippets/intro.md -->

There are different classes of mappings functions for Starknet; [Block handlers](#block-handler), [Transaction Handlers](#transaction-handler), and [Log Handlers](#log-handler).

<!-- @include: ./snippets/block-handler.md -->

```ts
import { StarknetBlock } from "@subql/types-starknet";

export async function handleBlock(block: StarknetBlock): Promise<void> {
  // Create a new BlockEntity with the block hash as it's ID
  const record = new BlockEntity(block.blockHash);
  record.height = BigInt(block.blockNumber);
  await record.save();
}
```

<!-- @include: ./snippets/transaction-handler.md -->

You should use [Mapping Filters](../manifest/starknet.md#mapping-handlers-and-filters) in your manifest to filter transactions to reduce the time it takes to index data and improve mapping performance.

We store the decoded calls in the transaction object, so you can easily access the decoded calls and their args in the transaction object.
To distinguish between different calls types, you can use the `selector` field in the decoded call object.

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
```

## Log Handler

You can use log handlers to capture information when certain logs are included on transactions. During the processing, the log handler will receive a log as an argument with the log's typed inputs and outputs. Any type of event will trigger the mapping, allowing activity with the data source to be captured. You should use [Mapping Filters](../manifest/starknet.md#mapping-handlers-and-filters) in your manifest to filter events to reduce the time it takes to index data and improve mapping performance.

```ts
import { StarknetLog } from "@subql/types-starknet";

type DespositEvent = {
  user: BigNumberish;
  token: BigNumberish;
  face_amount: string;
};
type DespositArgs = {
  "zklend::market::Market::Deposit": DespositEvent;
  block_hash: string;
  block_number: number;
  transaction_hash: string;
};
type DepositLog = StarknetLog<DespositArgs>;

export async function handleLog(log: DepositLog): Promise<void> {
  logger.info(`New deposit event at block ${log.blockNumber}`);
  assert(log.args, "No log.args");
  const event = log.args["zklend::market::Market::Deposit"];
  const user = convertBigNumberish(event.user);
  const token = convertBigNumberish(event.token);
  const deposit = Deposit.create({
    id: `${log.transactionHash}_${user}`,
    token: token,
    amount: BigInt(event.face_amount),
    user: user,
  });
  logger.info(`deposit ${deposit.id}`);
  logger.info(`token ${token}, amount ${deposit.amount}`);
  await deposit.save();
}
```

## Querying Contracts

We globally provide an `api` object that implements an [starknet.js Provider](https://starknetjs.com/docs/guides/connect_network#mainnet). This will allow querying contract state at the current block height being indexed.

You can then query contract state at the right block height. For example to query the token balance of a user at the current indexed block height:

```ts
// Create an instance of the contract, you can get the contract address from the Transaction or Log
// initialize deployed contract
const testAddress =
  "0x7667469b8e93faa642573078b6bf8c790d3a6184b2a1bb39c5c923a732862e1";
const compiledTest = json.parse(
  fs.readFileSync("./compiledContracts/test.json").toString("ascii"),
);

// connect the contract
const myTestContract = new Contract(compiledTest.abi, testAddress, provider);

// Query the balance of an address

const bal1 = await myTestContract.get_balance();
logger.info(`Initial balance: ${bal1.toString()}`); // Cairo 1 contract
```