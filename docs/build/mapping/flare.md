# Flare Mapping

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we have previously defined in the `schema.graphql` file.

- Mappings are defined in the `src/mappings` directory and are exported as a function.
- These mappings are also exported in `src/index.ts`.
- The mappings files are reference in `project.ts` under the mapping handlers.

There are different classes of mappings functions for Flare; [Block handlers](#block-handler), [Transaction Handlers](#transaction-handler), and [Log Handlers](#log-handler).

## Block Handler

You can use block handlers to capture information each time a new block is attached to the chain, e.g. block number. To achieve this, a defined BlockHandler will be called once for every block.

**Using block handlers slows your project down as they can be executed with each and every block - only use if you need to.**

```ts
import { FlareBlock } from "@subql/types-flare";

export async function handleBlock(block: FlareBlock): Promise<void> {
  // Create a new BlockEntity with the block hash as it's ID
  const record = new BlockEntity(block.blockHash);
  record.height = BigInt(block.blockNumber);
  await record.save();
}
```

## Transaction Handler

You can use transaction handlers to capture information about each of the transactions in a block. To achieve this, a defined TransactionHandler will be called once for every transaction. You should use [Mapping Filters](../manifest/flare.md#mapping-handlers-and-filters) in your manifest to filter transactions to reduce the time it takes to index data and improve mapping performance.

```ts
import { FlareTransaction } from "@subql/types-flare";

// Setup types from ABI
type SubmitHashCallArgs = [BigNumber, string] & {
  epochId: BigNumber;
  hash: string;
};

export async function handleTransaction(
  transaction: FlareTransaction<SubmitHashCallArgs>,
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
import { FlareLog } from "@subql/types-flare";

// Setup types from ABI
type HashSubmittedEventArgs = [string, BigNumber, string, BigNumber] & {
  submitter: string;
  epochId: BigNumber;
  hash: string;
  timestamp: BigNumber;
};

export async function handleLog(
  log: FlareLog<HashSubmittedEventArgs>,
): Promise<void> {
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

## Third-party Library Support - the Sandbox

SubQuery is deterministic by design, that means that each SubQuery project is guaranteed to index the same data set. This is a critical factor that is makes it possible to verify data in the decentralised SubQuery Network. This limitation means that in default configuration, the indexer is by default run in a strict virtual machine, with access to a strict number of third party libraries.

**You can easily bypass this limitation however, allowing you to retrieve data from external API endpoints, non historical RPC calls, and import your own external libraries into your projects.** In order to do to, you must run your project in `unsafe` mode, you can read more about this in the [references](../../run_publish/references.md#unsafe-node-service). An easy way to do this while developing (and running in Docker) is to add the following line to your `docker-compose.yml`:

```yml
subquery-node:
  image: onfinality/subql-node-flare:latest
  ...
  command:
    - -f=/app
    - --db-schema=app
    - --unsafe
  ...
```

When run in `unsafe` mode, you can import any custom libraries into your project and make external API calls using tools like node-fetch. A simple example is given below:

```ts
import { FlareTransaction } from "@subql/types-flare";
import fetch from "node-fetch";

export async function handleTransaction(tx: FlareTransaction): Promise<void> {
  const httpData = await fetch("https://api.github.com/users/github");
  logger.info(`httpData: ${JSON.stringify(httpData.body)}`);
  // Do something with this data
}
```

By default (when in safe mode), the [VM2](https://www.npmjs.com/package/vm2) sandbox only allows the following:

- only some certain built-in modules, e.g. `assert`, `buffer`, `crypto`,`util` and `path`
- third-party libraries written by _CommonJS_.
- external `HTTP` and `WebSocket` connections are forbidden

## Modules and Libraries

To improve SubQuery's data processing capabilities, we have allowed some of the NodeJS's built-in modules for running mapping functions in the [sandbox](#third-party-library-support---the-sandbox), and have allowed users to call third-party libraries.

Please note this is an **experimental feature** and you may encounter bugs or issues that may negatively impact your mapping functions. Please report any bugs you find by creating an issue in [GitHub](https://github.com/subquery/subql).

### Built-in modules

Currently, we allow the following NodeJS modules: `assert`, `buffer`, `crypto`, `util`, and `path`.

Rather than importing the whole module, we recommend only importing the required method(s) that you need. Some methods in these modules may have dependencies that are unsupported and will fail on import.

```ts
import { hashMessage } from "ethers/lib/utils"; // Good way
import { utils } from "ethers"; // Bad way
```
