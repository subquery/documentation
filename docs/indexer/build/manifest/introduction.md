# Introduction

The Manifest `project.ts` file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data. It clearly indicates where we are indexing data from, and to what on chain events we are subscribing to.

The Manifest can be in either Typescript, Yaml, or JSON format.

With the number of new features we are adding to SubQuery, and the slight differences between each chain that mostly occur in the manifest, the project manifest is now written by default in Typescript. This means that you get a fully typed project manifest with documentation and examples provided your code editor.

Below is a standard example of a basic ethereum `project.ts`.

```ts
import {
  EthereumProject,
  EthereumDatasourceKind,
  EthereumHandlerKind,
} from "@subql/types-ethereum";

// Can expand the Datasource processor types via the generic param
const project: EthereumProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "ethereum-subql-starter",
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
    chainId: "1",
    /**
     * These endpoint(s) should be non-pruned archive nodes
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     # We suggest providing an array of endpoints for increased speed and reliability
     */
    endpoint: ["https://ethereum.rpc.subquery.network/public"],
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
      assets: new Map([["erc20", { file: "./abis/erc20.abi.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Call,
            handler: "handleTransaction",
            filter: {
              /**
               * The function can either be the function fragment or signature
               * function: '0x095ea7b3'
               * function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
               * function: null - this will filter for native transfers that have no contract calls
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
      },
    },
  ],
  repository: "https://github.com/subquery/ethereum-subql-starter",
};

// Must set default to the project instance
export default project;
```

## Structure Overview

For all networks the manifest contains the same basic structure. It includes some meta information, details on what network the project is for, references to specific files like the graphql schema and the datasources of what on chain data to collect.

The main differences between different networks is in the `dataSources` and the `network` sections. The `dataSources` largely differ based on handler types and the filters available to them, there are also some differences when it comes to contract definitions and some other minor configurations.

## Overview

This is the manifest definitions that apply to all projects on all networks

### Top Level Spec

| Field           | Type                                       | Description                                         |
| --------------- | ------------------------------------------ | --------------------------------------------------- |
| **specVersion** | String                                     | The spec version of the manifest file               |
| **name**        | String                                     | Name of your project                                |
| **version**     | String                                     | Version of your project                             |
| **description** | String                                     | Description of your project                         |
| **runner**      | [Runner Spec](#runner-spec)                | Runner specs info                                   |
| **repository**  | String                                     | Git repository address of your project              |
| **schema**      | [Schema Spec](#schema-spec)                | The location of your GraphQL schema file            |
| **network**     | [Network Spec](#network-spec)              | Detail of the network to be indexed                 |
| **dataSources** | [DataSource Spec](#datasource-spec)        | The datasource to your project                      |
| **templates**   | [Templates Spec](../dynamicdatasources.md) | Allows creating new datasources from this templates |

### Schema Spec

| Field    | Type   | Description                              |
| -------- | ------ | ---------------------------------------- |
| **file** | String | The location of your GraphQL schema file |

### Network Spec

If you start your project by using the `npx @subql/cli init` command, you'll generally receive a starter project with the correct network settings. If you are changing the target chain of an existing project, you'll need to edit the [Network Spec](#network-spec) section of this manifest.

| Field            | Type                                                    | Description                                                                                                                                                                                                 |
| ---------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **chainId**      | String                                                  | A network identifier for the blockchain                                                                                                                                                                     |
| **endpoint**     | String or String[] or Record\<String, IEndpointConfig\> | Defines the endpoint of the blockchain to be indexed, this can be a string, an array of endpoints, or a record of endpoints to [endpoint configs](#endpoint-config) - **This must be a full archive node**. |
| **dictionary**   | String                                                  | This should be automatically set from our registry but if you have your own dictiionary you can set it here - read [how a SubQuery Dictionary works](../../academy/tutorials_examples/dictionary.md).                    |
| **bypassBlocks** | Array                                                   | Bypasses stated block numbers, the values can be a `range`(e.g. `"10- 50"`) or `integer`, see [Bypass Blocks](#bypass-blocks)


#### Endpoint
You will need to update the `endpoint`. This defines the (HTTP or WSS) endpoint of the blockchain to be indexed - **this must be a full archive node**. This property can be a string or an array of strings (e.g. `endpoint: ['rpc1.endpoint.com', 'rpc2.endpoint.com']`). We suggest providing an array of endpoints as it has the following benefits:

- Increased speed - When enabled with [worker threads](../../run_publish/references.md#w---workers), RPC calls are distributed and parallelised among RPC providers. Historically, RPC latency is often the limiting factor with SubQuery.
- Increased reliability - If an endpoint goes offline, SubQuery will automatically switch to other RPC providers to continue indexing without interruption.
- Reduced load on RPC providers - Indexing is a computationally expensive process on RPC providers, by distributing requests among RPC providers you are lowering the chance that your project will be rate limited.
- You can also configure headers for each endpoint using the [Endpoint Config](#endpoint-config) section below.
- When you publish your project the endpoint wont be included, this will need to be set in the node configuration.

Public nodes may be rate limited which can affect indexing speed, when developing your project we suggest getting a private API key from a professional RPC provider.


::: note
Some networks have additional properties or different names. Please seethe specific network documentation for more details.
:::

### Runner Spec

| Field     | Type                                    | Description                                |
| --------- | --------------------------------------- | ------------------------------------------ |
| **node**  | [Runner node spec](#runner-node-spec)   | Describe the node service use for indexing |
| **query** | [Runner query spec](#runner-query-spec) | Describe the query service                 |

### Runner Node Spec

| Field       | Type                                        | Description                                                                                                                                                                                                          |
| ----------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name**    | String                                      | `@subql/node-ethereum`                                                                                                                                                                                               |
| **version** | String                                      | Version of the indexer Node service, it must follow the [SEMVER](https://semver.org/) rules or `latest`, you can also find available versions in subquery SDK [releases](https://github.com/subquery/subql/releases) |
| **options** | [Runner Node Options](#runner-node-options) | Runner specific options for how to run your project. These will have an impact on the data your project produces. CLI flags can be used to override these.                                                           |

### Runner Query Spec

| Field       | Type   | Description                                                                                                                                                                                                                                                                                             |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name**    | String | `@subql/query` and `@subql/query-subgraph`                                                                                                                                                                                                                                                              |
| **version** | String | Version of the Query service, available `@subql/query` [versions](https://github.com/subquery/subql/blob/main/packages/query/CHANGELOG.md) and `@subql/query-subgraph` [versions](https://github.com/subquery/query-subgraph/blob/main/CHANGELOG.md), it also must follow the SEMVER rules or `latest`. |

### Runner Node Options

| Field                 | v1.0.0 (default) | Description                                                                                                                                                                                                                                                                               |
| --------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **historical**        | Boolean (true)   | Historical indexing allows you to query the state at a specific block height. e.g A users balance in the past.                                                                                                                                                                            |
| **unfinalizedBlocks** | Boolean (false)  | If enabled unfinalized blocks will be indexed, when a fork is detected the project will be reindexed from the fork. Requires historical.                                                                                                                                                  |
| **unsafe**            | Boolean (false)  | Removes all sandbox restrictions and allows access to all inbuilt node packages as well as being able to make network requests. WARNING: this can make your project non-deterministic.                                                                                                    |
| **skipTransactions**  | Boolean (false)  | If your project contains only event handlers and you don't access any other block data except for the block header you can speed your project up. Handlers should be updated to use `LightEthereumLog` instead of `EthereumLog` to ensure you are not accessing data that is unavailable. |


### Datasource Spec

Defines the data that will be filtered and extracted and the location of the mapping function handler for the data transformation to be applied.

| Field          | Type         | Description                                                                                                                                                                                                                                                                                                                                                                    |
| -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **kind**       | string       | This is almost always using the default runtime kind unless a datasource processor is used. e.g `ethereum/Runtime`                                                                                                                                                                                                                                                                                                                                  |
| **startBlock** | Integer      | This changes your indexing start block for this datasource, set this as high as possible to skip initial blocks with no relevant data                                                                                                                                                                                                                                          |
| **endBlock**   | Integer      | This sets a end block for processing on the datasource. After this block is processed, this datasource will no longer index your data. <br><br>Useful when your contracts change at a certain block height, or when you want to insert data at genesis. For example, setting both the `startBlock` and `endBlock` to 320, will mean this datasource only operates on block 320 |
| **mapping**    | Mapping Spec |


### Mapping Spec

| Field                  | Type                         | Description                                                                                                                      |
| ---------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **file**               | string                       | This should generally be `"./dist/index.js"` unless you're using your own build process.                                         |
| **handlers**           | Default handlers and filters | List all the mapping functions and their corresponding handler types, with additional mapping filters.                           |

This is specific to each network, please see the specific network documentation for more details. Default runtime mapping filters are an extremely useful feature to decide what block, or transaction will trigger a mapping handler.

Only incoming data that satisfies the filter conditions will be processed by the mapping functions. Mapping filters are optional but are highly recommended as they significantly reduce the amount of data processed by your SubQuery project and will improve indexing performance.


## Bypass Blocks

Bypass Blocks allows you to skip the stated blocks, this is useful when there are erroneous blocks in the chain or when a chain skips a block after an outage or a hard fork. It accepts both a `range` or single `integer` entry in the array.

When declaring a `range` use an string in the format of `"start - end"`. Both start and end are inclusive, e.g. a range of `"100-102"` will skip blocks `100`, `101`, and `102`.

```ts
{
  network: {
    bypassBlocks: [1, 2, 3, "105-200", 290];
  }
}
```

::: info Simplifying your Project Manifest for a large number contract addresses

If your project has the same handlers for multiple versions of the same type of contract your project manifest can get quite repetitive. e.g you want to index the transfers for many similar ERC20 contracts, there are [ways to better handle a large static list of contract addresses](../optimisation.md#simplifying-the-project-manifest).

Note that there is also [dynamic datasources](../dynamicdatasources.md) for when your list of addresses is dynamic (e.g. you use a factory contract).

:::

## Endpoint Config

This allows you to set specific options relevant to each specific RPC endpoint that you are indexing from. This is very useful when endpoints have unique authentication requirements, or they operate with different rate limits.

Here is an example of how to set an API key in the header of RPC requests in your endpoint config.

```ts
{
  network: {
    endpoint: {
      "https://ethereum.rpc.subquery.network/public": {
        headers: {
          "x-api-key": "your-api-key",
        },
      }
    }
  }
}
```

## Block Filters

All networks support the same `modulo` and `timestamp` filters for block handlers.

`modulo` and `timestamp` are common block filters and are described in the [overview](../introduction#block-filters)
