# Starknet Manifest File

The Manifest `project.ts` file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data. This is the specific details for Algorand, please refer to the [top level manifest documentation](../introduction.md) for more general details.

Below is a standard example of a basic Starknet `project.ts`.

```ts
import {
  StarknetProject,
  StarknetDatasourceKind,
  StarknetHandlerKind,
} from "@subql/types-starknet";

// Can expand the Datasource processor types via the generic param
const project: StarknetProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "starknet-starter",
  description:
    "This project can be use as a starting point for developing your new Starknet SubQuery project",
  runner: {
    node: {
      name: "@subql/node-starknet",
      version: "*",
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
     * chainId is the Chain ID, for Starknet mainnet this is 0x534e5f4d41494e
     * https://github.com/starknet-io/starknet.js/blob/main/src/constants.ts#L42
     */
    chainId: "0x534e5f4d41494e",
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * If you use a rate limited endpoint, adjust the --batch-size and --workers parameters
     * These settings can be found in your docker-compose.yaml, they will slow indexing but prevent your project being rate limited
     */
    endpoint: ["https://starknet-mainnet.public.blastapi.io/rpc/v0_7"],
  },
  dataSources: [
    {
      kind: StarknetDatasourceKind.Runtime,
      startBlock: 995339,

      options: {
        // Must be a key of assets
        abi: "zkLend",
        // # this is the contract address for zkLend market https://starkscan.co/contract/0x04c0a5193d58f74fbace4b74dcf65481e734ed1714121bdc571da345540efa05
        address:
          "0x04c0a5193d58f74fbace4b74dcf65481e734ed1714121bdc571da345540efa05",
      },
      assets: new Map([["zkLend", { file: "./abis/zkLend.abi.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: StarknetHandlerKind.Call,
            handler: "handleTransaction",
            filter: {
              to: "0x04c0a5193d58f74fbace4b74dcf65481e734ed1714121bdc571da345540efa05",
              type: "INVOKE",
              /**
               * The function can either be the function fragment or signature
               * function: 'withdraw'
               * function: '0x015511cc3694f64379908437d6d64458dc76d02482052bfb8a5b33a72c054c77'
               */
              function: "withdraw",
            },
          },
          {
            kind: StarknetHandlerKind.Event,
            handler: "handleLog",
            filter: {
              /**
               * Follows standard log filters for Starknet
               * zkLend address: "0x04c0a5193d58f74fbace4b74dcf65481e734ed1714121bdc571da345540efa05"
               */
              topics: [
                "Deposit", //0x9149d2123147c5f43d258257fef0b7b969db78269369ebcf5ebb9eef8592f2
              ],
            },
          },
        ],
      },
    },
  ],
  repository: "https://github.com/subquery/starknet-subql-starter",
};

// Must set default to the project instance
export default project;
```

Below is a standard example of the legacy YAML version (`project.yaml`).

:::details Legacy YAML Manifest

```yml
specVersion: 1.0.0
version: 0.0.1
name: starknet-starter
description: >-
  This project can be use as a starting point for developing your new Starknet
  SubQuery project
runner:
  node:
    name: "@subql/node-starknet"
    version: "*"
  query:
    name: "@subql/query"
    version: "*"
schema:
  file: ./schema.graphql
network:
  chainId: "0x534e5f4d41494e"
  endpoint:
    - https://starknet-mainnet.public.blastapi.io/rpc/v0_7
dataSources:
  - kind: starknet/Runtime
    startBlock: 995339
    options:
      abi: zkLend
      address: "0x04c0a5193d58f74fbace4b74dcf65481e734ed1714121bdc571da345540efa05"
    assets:
      zkLend:
        file: ./abis/zkLend.abi.json
    mapping:
      file: ./dist/index.js
      handlers:
        - kind: starknet/TransactionHandler
          handler: handleTransaction
          filter:
            to: "0x04c0a5193d58f74fbace4b74dcf65481e734ed1714121bdc571da345540efa05"
            type: INVOKE
            function: withdraw
repository: https://github.com/subquery/starknet-subql-starter
```

:::

## Overview

### Datasource Spec

Defines the data that will be filtered and extracted and the location of the mapping function handler for the data transformation to be applied.

| Field          | Type         | Description                                                                                                                                                                                                                                                                                                                                                                    |
| -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **kind**       | string       | [starknet/Runtime](#data-sources-and-mapping)                                                                                                                                                                                                                                                                                                                                  |
| **startBlock** | Integer      | This changes your indexing start block for this datasource, set this as high as possible to skip initial blocks with no relevant data                                                                                                                                                                                                                                          |
| **endBlock**   | Integer      | This sets a end block for processing on the datasource. After this block is processed, this datasource will no longer index your data. <br><br>Useful when your contracts change at a certain block height, or when you want to insert data at genesis. For example, setting both the `startBlock` and `endBlock` to 320, will mean this datasource only operates on block 320 |
| **mapping**    | Mapping Spec |                                                                                                                                                                                                                                                                                                                                                                                |
| **options**    | { abi: string; address: string; } | The name of the abi in assets to use for decoding data and an address for the contract to filter |
| **assets**     | Map<string, { file: string }>     | A map of contract names to abi file paths                                                        |
## Data Sources and Mapping

In this section, we will talk about the default Starknet runtime and its mapping. Here is an example:

```ts
{
  dataSources: [
    {
      kind: StarknetDatasourceKind.Runtime, // Indicates that this is default runtime
      startBlock: 1, // This changes your indexing start block, set this higher to skip initial blocks with less data
      options: {
        // Must be a Record of assets
        abi: "zkLend",
        // # this is the contract address for your target contract
        address:
          "0x04c0a5193d58f74fbace4b74dcf65481e734ed1714121bdc571da345540efa05",
      },
      assets: new Map([["zkLend", { file: "./abis/zkLend.abi.json" }]]),
      mapping: {
        file: "./dist/index.js", // Entry path for this mapping
        handlers: [
          /* Enter handers here */
        ],
      },
    },
  ];
}
```

### Mapping Handlers and Filters

The following table explains filters supported by different handlers.

**Your SubQuery project will be much more efficient when you only use `TransactionHandler` or `LogHandler` handlers with appropriate mapping filters (e.g. NOT a `BlockHandler`).**

| Handler                                                                   | Supported filter                                                                                                                            |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [starknet/BlockHandler](../../mapping/starknet#block-handler)             | `modulo`, `timestamp`                                                                                                                       |
| [starknet/TransactionHandler](../../mapping/starknet#transaction-handler) | `function` filters (either be the function fragment or signature), `from` (address), `to` (address),`type`(transaction type, like `INVOKE`) |
| [starknet/LogHandler](../../mapping/starknet#log-handler)                 | `topics` filters, and `address`                                                                                                             |

Default runtime mapping filters are an extremely useful feature to decide what block, event, or extrinsic will trigger a mapping handler.

Only incoming data that satisfies the filter conditions will be processed by the mapping functions. Mapping filters are optional but are highly recommended as they significantly reduce the amount of data processed by your SubQuery project and will improve indexing performance.

`modulo` and `timestamp` are common block filters and are described in the [overview](../introduction#block-filters)

::: info Note
When executing `subql codegen`, it will check if topics and functions are valid.
:::

## Real-time indexing (Block Confirmations)

As indexers are an additional layer in your data processing pipeline, they can introduce a massive delay between when an on-chain event occurs and when the data is processed and able to be queried from the indexer.

SubQuery provides real time indexing of unconfirmed data directly from the RPC endpoint that solves this problem. SubQuery takes the most probabilistic data before it is confirmed to provide to the app. In the unlikely event that the data isn’t confirmed and a reorg occurs, SubQuery will automatically roll back and correct its mistakes quickly and efficiently - resulting in an insanely quick user experience for your customers.

To control this feature, please adjust the [--block-confirmations](../../../run_publish/references#block-confirmations) command to fine tune your project and also ensure that [historic indexing](../../../run_publish/references#disable-historical) is enabled (enabled by default). The default block confirmations for SubQuery projects is currently 200 blocks.
