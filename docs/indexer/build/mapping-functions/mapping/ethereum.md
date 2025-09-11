# EVM Mapping

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we have previously defined in the `schema.graphql` file.

::: info EVM Compatibility
This documentation applies to all EVM-compatible networks supported by SubQuery, including:
- **Ethereum** (Layer 1)
- **Layer 2 Solutions**: Arbitrum, Optimism, Polygon, Base
- **Sidechains**: BNB Smart Chain (BSC), Avalanche C-Chain
- **Other EVM Networks**: Gnosis, Flare, and other EVM-compatible chains

All these networks use the same `@subql/types-ethereum` types and `@subql/node-ethereum` indexer since they are EVM-compatible.
:::

- Mappings are defined in the `src/mappings` directory and are exported as a function.
- These mappings are also exported in `src/index.ts`.
- The mappings files are reference in `project.ts` under the mapping handlers.
- The mappings are run from within a [Sandbox](./sandbox.md)

There are different classes of mappings functions for EVM networks; [Block handlers](#block-handler), [Transaction Handlers](#transaction-handler), and [Log Handlers](#log-handler).

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

You can use transaction handlers to capture information about each of the transactions in a block. To achieve this, a defined TransactionHandler will be called once for every transaction. You should use [Mapping Filters](../manifest/ethereum.md#mapping-handlers-and-filters) in your manifest to filter transactions to reduce the time it takes to index data and improve mapping performance.

```ts
import { Approval } from "../types";
import { ApproveTransaction } from "../types/abi-interfaces/Erc20Abi";

export async function handleTransaction(tx: ApproveTransaction): Promise<void> {
  logger.info(`New Approval transaction at block ${tx.blockNumber}`);
  const approval = Approval.create({
    id: tx.hash,
    owner: tx.from,
    spender: await tx.args[0],
    value: BigInt(await tx.args[1].toString()),
    contractAddress: tx.to,
  });

  await approval.save();
}
```

## Log Handler

You can use log handlers to capture information when certain logs are included on transactions. During the processing, the log handler will receive a log as an argument with the log's typed inputs and outputs. Any type of event will trigger the mapping, allowing activity with the data source to be captured. You should use [Mapping Filters](../manifest/ethereum.md#mapping-handlers-and-filters) in your manifest to filter events to reduce the time it takes to index data and improve mapping performance.

```ts
import { Transaction } from "../types";
import { TransferLog } from "../types/abi-interfaces/Erc20Abi";

export async function handleLog(log: TransferLog): Promise<void> {
  logger.info(`New transfer transaction log at block ${log.blockNumber}`);
  const transaction = Transaction.create({
    id: log.transactionHash,
    value: log.args.value.toBigInt(),
    from: log.args.from,
    to: log.args.to,
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
