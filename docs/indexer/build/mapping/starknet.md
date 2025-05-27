# Starknet

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