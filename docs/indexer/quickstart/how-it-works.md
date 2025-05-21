# 2. How it works

The SubQuery CLI creates a working template project as a launch pad for your own custom project. From this template, there are only 3 important files you need to familiarise yourself with.
These are:

1. [The project.ts file](#the-projectts-file)
2. [The GraphQL Schema file](#the-graphql-schema-file)
3. [The Mapping functions (in src/mappings/ directory)](#the-mapping-functions)

## The project.ts file

The project.ts file can be seen as an entry point of your project as it defines most of the details on how SubQuery will index and transform the chain data. It indicates where we are indexing data from, and to what on chain data we are subscribing to.

This file imports various libraries and configurations along with defining the name, version and description of the project. In the network section, it specifies the chainID, the RPC endpoint, and also the startBlock. It also specifies the ABI contract address.

:::details project.ts snippet
```
.
.
.
 specVersion: "1.0.0",
  version: "0.0.1",
  name: "ethereum-starter",
  description:
    "This project can be use as a starting point for developing your new Ethereum SubQuery project",
  runner: {
    node: {
      name: "@subql/node-ethereum",
      version: ">=3.0.0",
    },
    query: {
      name: "@subql/query",
      version: "*",
    },
  },
  schema: {
    file: "./schema.graphql",
  },
  network: {
    /**
     * chainId is the EVM Chain ID, for Ethereum this is 1
     * https://chainlist.org/chain/1
     */
    chainId: process.env.CHAIN_ID!,
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * If you use a rate limited endpoint, adjust the --batch-size and --workers parameters
     * These settings can be found in your docker-compose.yaml, they will slow indexing but prevent your project being rate limited
     */
    endpoint: process.env.ENDPOINT!?.split(',') as string[] | string,
  },
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 4719568,

      options: {
        // Must be a key of assets
        abi: "erc20",
        // # this is the contract address for wrapped ether https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      },
      .
      .
      .
```
:::

Finally, there are three types of mapping handlers (you can have more than one in each project):

* BlockHandlers: On each and every block, run a mapping function
* TransactionHandlers: On each and every transaction that matches optional filter criteria, run a mapping function
* LogHandlers: On each and every log that matches optional filter criteria, run a mapping function

The hello-world project has a transaction handler called "handleTransaction" and a LogHandler called "handleLog". When a filter condition is met, the associated handler is called. 

:::details handlers
```
handlers: [
          {
            kind: EthereumHandlerKind.Call,
            handler: "handleTransaction",
            filter: {
              /**
               * The function can either be the function fragment or signature
               * function: '0x095ea7b3'
               * function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
               */
              function: "approve(address spender, uint256 rawAmount)",
            },
          },
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleLog",
            filter: {
              /**
               * Follows standard log filters https://docs.ethers.io/v5/concepts/events/
               * address: "0x60781C2586D68229fde47564546784ab3fACA982"
               */
              topics: [
                "Transfer(address indexed from, address indexed to, uint256 amount)",
              ],
            },
          },
        ],
```
:::

## The GraphQL schema file

The schema.graphql file outlines the various GraphQL schemas being used. The structure of this file essentially dictates the shape of your data from SubQuery. For more information, click [here](../build/graphql.md)

The hello-world project has two entities. A Transfer entity and an Approval entity. Both these entities contain six fields with their associated type such as string or bigint. An exclamation mark indicates that the field is mandatory.

## The mapping functions

Mapping functions, located in the `src/mappings/` directory, defines how chain data is transformed into the optimised GraphQL entities that we have previously defined in the schema.graphql file.

The hello-world project contains two functions. `handleLog` and `handleTransaction`. `handleLog` accepts one argument called `log` of type `TransferLog` and accesses various properties such as log.blockNumber, log.args.to, log.args.from etc on the `log` object in order to create a `Transfer` entity before it is saved.

```
export async function handleLog(log: TransferLog): Promise<void> {
  logger.info(`New transfer transaction log at block ${log.blockNumber}`);
  assert(log.args, "No log.args");

  const transaction = Transfer.create({
    id: log.transactionHash,
    blockHeight: BigInt(log.blockNumber),
    to: log.args.to,
    from: log.args.from,
    value: log.args.value.toBigInt(),
    contractAddress: log.address,
  });

  await transaction.save();
}
```

`handleTransaction` works in a similar fashion receiving one argument called `tx` of type `ApproveTransaction` from which various methods can be called on this object such as tx.blockNumber and tx.hash.

```
export async function handleTransaction(tx: ApproveTransaction): Promise<void> {
  logger.info(`New Approval transaction at block ${tx.blockNumber}`);
  assert(tx.args, "No tx.args");

  const approval = Approval.create({
    id: tx.hash,
    owner: tx.from,
    spender: await tx.args[0],
    value: BigInt(await tx.args[1].toString()),
    contractAddress: tx.to || "",
  });

  await approval.save();
}

```