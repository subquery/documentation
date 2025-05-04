# Flare Mapping

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we have previously defined in the `schema.graphql` file.

- Mappings are defined in the `src/mappings` directory and are exported as a function.
- These mappings are also exported in `src/index.ts`.
- The mappings files are reference in `project.ts` under the mapping handlers.
- The mappings are run from within a [Sandbox](./sandbox.md)

There are different classes of mappings functions for Flare; [Block handlers](#block-handler), [Transaction Handlers](#transaction-handler), and [Log Handlers](#log-handler).

## Block Handler

You can use block handlers to capture information each time a new block is attached to the chain, e.g. block number. To achieve this, a defined BlockHandler will be called once for every block.

**Using block handlers slows your project down as they can be executed with each and every block - only use if you need to.**

```ts
import { EthereumBlock } from "@subql/types-ethereum";

export async function handleBlock(block: EthereumBlock): Promise<void> {
  // Create a new BlockEntity with the block hash as it's ID
  const record = new BlockEntity(block.blockHash);
  record.height = BigInt(block.blockNumber);
  await record.save();
}
```

## Transaction Handler

You can use transaction handlers to capture information about each of the transactions in a block. To achieve this, a defined TransactionHandler will be called once for every transaction. You should use [Mapping Filters](../manifest/flare.md#mapping-handlers-and-filters) in your manifest to filter transactions to reduce the time it takes to index data and improve mapping performance.

```ts
import { SubmitHash } from "../types";
import { SubmitHashTransaction } from "../types/abi-interfaces/Erc20Abi";

// Setup types from ABI
type SubmitHashCallArgs = [BigNumber, string] & {
  epochId: BigNumber;
  hash: string;
};

export async function handleTransaction(
  transaction: SubmitHashTransaction,
): Promise<void> {
  const approval = SubmitHash.create({
    id: transaction.hash,
    epochId: JSON.parse(transaction.args[0].toString()),
    hash: transaction.args[1],
    contractAddress: transaction.to,
  });

  await approval.save();
}
```

## Log Handler

You can use log handlers to capture information when certain logs are included on transactions. During the processing, the log handler will receive a log as an argument with the log's typed inputs and outputs. Any type of event will trigger the mapping, allowing activity with the data source to be captured. You should use [Mapping Filters](../manifest/flare.md#mapping-handlers-and-filters) in your manifest to filter events to reduce the time it takes to index data and improve mapping performance.

```ts
import { HashSubmittedEvent } from "../types";
import { SubmitHashEvent } from "../types/abi-interfaces/Erc20Abi";

export async function handleLog(log: SubmitHashEvent): Promise<void> {
  const transaction = HashSubmittedEvent.create({
    id: log.transactionHash,
    submitter: log.args.submitter,
    epochId: log.args.epochId.toBigInt(),
    hash: log.args.hash,
    timestamp: log.args.timestamp.toBigInt(),
    contractAddress: log.address,
  });

  await transaction.save();
}
```

## Querying Contracts

We globally provide an `api` object that implements an [Ethers.js Provider](https://docs.ethers.io/v5/api/providers/provider/). This will allow querying contract state at the current block height being indexed. The easiest way to use the `api` is with [Typechain](https://github.com/dethcrypto/TypeChain), with this you can generate typescript interfaces that are compatible with this `api` that make it much easier to query your contracts.

You can then query contract state at the right block height. For example to query the token balance of a user at the current indexed block height (please note the two underscores in `Erc20__factory`):

```ts
// Create an instance of the contract, you can get the contract address from the Transaction or Log
// Note the two underscores __ in `Erc20__factory`
const erc20 = Erc20__factory.connect(contractAddress, api);

// Query the balance of an address
const balance = await erc20.balanceOf(address);
```

The above example assumes that the user has an ABI file named `erc20.json`, so that TypeChain generates `ERC20__factory` class for them. Check out [this example](https://github.com/dethcrypto/TypeChain/tree/master/examples/ethers-v5) to see how to generate factory code around your contract ABI using TypeChain.

