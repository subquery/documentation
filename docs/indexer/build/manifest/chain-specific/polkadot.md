# Polkadot/Substrate Manifest File

The Manifest `project.ts` file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data. This is the specific details for Algorand, please refer to the [top level manifest documentation](../introduction.md) for more general details.

Below is a standard example of a basic Polkadot `project.ts`.

```ts
import {
  SubstrateDatasourceKind,
  SubstrateHandlerKind,
  SubstrateProject,
} from "@subql/types";

// Can expand the Datasource processor types via the genreic param
const project: SubstrateProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "polkadot-starter",
  description:
    "This project can be used as a starting point for developing your SubQuery project",
  runner: {
    node: {
      name: "@subql/node",
      version: ">=3.0.1",
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
    /* The genesis hash of the network (hash of block 0) */
    chainId:
      "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3",
    /**
     * This endpoint must be a public non-pruned archive node
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     */
    endpoint: "https://polkadot.rpc.subquery.network/public",
  },
  dataSources: [
    {
      kind: SubstrateDatasourceKind.Runtime,
      startBlock: 1,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          /*{
            kind: SubstrateHandlerKind.Block,
            handler: "handleBlock",
            filter: {
              modulo: 100,
            },
          },*/
          /*{
            kind: SubstrateHandlerKind.Call,
            handler: "handleCall",
            filter: {
              module: "balances",
            },
          },*/
          {
            kind: SubstrateHandlerKind.Event,
            handler: "handleEvent",
            filter: {
              module: "balances",
              method: "Deposit",
            },
          },
        ],
      },
    },
  ],
};

// Must set default to the project instance
export default project;
```

Below is a standard example of the legacy YAML version (`project.yaml`).

:::details Legacy YAML Manifest

```yml
specVersion: 1.0.0
name: subquery-starter
version: 0.0.1
runner:
  node:
    name: "@subql/node"
    version: "*"
  query:
    name: "@subql/query"
    version: "*"
description: "This project can be use as a starting point for developing your Polkadot based SubQuery project"
repository: https://github.com/subquery/subql-starter
schema:
  file: ./schema.graphql
network:
  chainId: "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3"
  # This endpoint must be a public non-pruned archive node
  # We recommend providing more than one endpoint for improved reliability, performance, and uptime
  # Public nodes may be rate limited, which can affect indexing speed
  # When developing your project we suggest getting a private API key
  endpoint: ["https://polkadot.rpc.subquery.network/public"]
  # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing
  dictionary: "https://api.subquery.network/sq/subquery/polkadot-dictionary"
  # Optionally provide a list of blocks that you wish to bypass
  bypassBlocks: [1, 2, 100, "200-500"]
dataSources:
  - kind: substrate/Runtime
    startBlock: 1 # Block to start indexing from
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleBlock
          kind: substrate/BlockHandler
        - handler: handleEvent
          kind: substrate/EventHandler
          filter:
            module: balances
            method: Deposit
        - handler: handleCall
          kind: substrate/CallHandler
```

:::

## Overview

### Network Spec

Polkadot follows the same network spec as other SubQuery projects but there is also a `chainTypes` field. This is for importing chain specific types that are used for decoding data.

| Field            | v1.0.0                                                  | Description                                                                                                                                                                                                 |
| ---------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **chainId**      | String                                                  | A network identifier for the blockchain (`genesisHash` in Substrate)                                                                                                                                        |
| **endpoint**     | String or String[] or Record\<String, IEndpointConfig\> | Defines the endpoint of the blockchain to be indexed, this can be a string, an array of endpoints, or a record of endpoints to [endpoint configs](#endpoint-config) - **This must be a full archive node**. |
| **dictionary**   | String                                                  | It is suggested to provide the HTTP endpoint of a full chain dictionary to speed up processing - read [how a SubQuery Dictionary works](../../academy/tutorials_examples/dictionary.md).                    |
| **chaintypes**   | {file:String}                                           | Path to chain types file, accept `.json` or `.yaml` format                                                                                                                                                  |
| **bypassBlocks** | Array                                                   | Bypasses stated block numbers, the values can be a `range`(e.g. `"10- 50"`) or `integer`, see [Bypass Blocks](#bypass-blocks)                                                                               |

## Data Sources and Mapping

In this section, we will talk about the default Substrate runtime and its mapping. Here is an example:

```ts
{
  ...
  dataSources: [
    {
      kind: SubstrateDataSourceKind.Runtime, // Indicates that this is default runtime
      startBlock: 1, // This changes your indexing start block, set this higher to skip initial blocks with less data
      mapping: {
        file: "./dist/index.js", // Entry path for this mapping
        handlers: [
          /* Enter handers here */
        ],
      }
    }
  ]
}
```

### Mapping Handlers and Filters

The following table explains filters supported by different handlers.

**Your SubQuery project will be much more efficient when you only use event and call handlers with appropriate mapping filters.**

| Handler                                                        | Supported filter                         |
| -------------------------------------------------------------- | ---------------------------------------- |
| [substrate/BlockHandler](../../mapping/polkadot#block-handler) | `specVersion`, `modulo`, `timestamp`     |
| [substrate/EventHandler](../../mapping/polkadot#event-handler) | `module`,`method`                        |
| [substrate/CallHandler](../../mapping/polkadot#call-handler)   | `module`,`method` ,`success`, `isSigned` |

Default runtime mapping filters are an extremely useful feature to decide what block, event, or extrinsic will trigger a mapping handler.

Only incoming data that satisfies the filter conditions will be processed by the mapping functions. Mapping filters are optional but are highly recommended as they significantly reduce the amount of data processed by your SubQuery project and will improve indexing performance.

```yml
# Example filter from Substrate callHandler
filter:
  module: balances
  method: Deposit
  success: true
  isSigned: true
```

The `specVersion` filter specifies the spec version range for a Substrate block. The following examples describe how to set version ranges.

```yml
filter:
  specVersion: [23, 24]   # Index block with specVersion in between 23 and 24 (inclusive).
  specVersion: [100]      # Index block with specVersion greater than or equal 100.
  specVersion: [null, 23] # Index block with specVersion less than or equal 23.
```

`modulo` and `timestamp` are common block filters and are described in the [overview](../introduction#block-filters)

::: info Simplifying your Project Manifest for a large number contract addresses

If your project has the same handlers for multiple versions of the same type of contract your project manifest can get quite repetitive. e.g you want to index the transfers for many similar ERC20 contracts, there are [ways to better handle a large static list of contract addresses](../optimisation#simplifying-the-project-manifest).

Note that there is also [dynamic datasources](../../dynamic-datasources.md) for when your list of addresses is dynamic (e.g. you use a factory contract).

:::

## Custom Chains

You can index data from custom Substrate chains by also including chain types in the manifest.

We support the additional types used by Substrate runtime modules, `typesAlias`, `typesBundle`, `typesChain`, and `typesSpec` are also supported.

In the example below, the `network.chaintypes` are pointing to a file that has all the custom types included, This is a standard chainspec file that declares the specific types supported by this blockchain in either `.json`, `.yaml` or `.js` format.

```yml
network:
  genesisHash: "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3"
  endpoint: "ws://host.kittychain.io/public-ws"
  chaintypes:
    file: ./types.json # The relative filepath to where custom types are stored
```

To use typescript for your chain types file include it in the `src` folder (e.g. `./src/types.ts`), run `yarn build` and then point to the generated js file located in the `dist` folder.

```yml
network:
  chaintypes:
    file: ./dist/types.js # Will be generated after yarn run build
```

Things to note about using the chain types file with extension `.ts` or `.js`:

- Your manifest version must be v0.2.0 or above.
- Only the default export will be included in the [polkadot api](https://polkadot.js.org/docs/api/start/types.extend/) when fetching blocks.

Here is an example of a `.ts` chain types file:

```ts
import { typesBundleDeprecated } from "moonbeam-types-bundle";
export default { typesBundle: typesBundleDeprecated };
```

#### Working Example

You can see the suggested method for connecting and retrieving custom chain types in [SubQuery's Official Dictionary repository](https://github.com/subquery/subql-dictionary). Here you will find a dictionary project for each network with all the chain types correct inserted. We retrieve these definitions from the [official Polkadot.js repo](https://github.com/polkadot-js/apps/tree/master/packages/apps-config/src/api/spec), where each network lists their their chaintypes.

For example, Acala publish an [offical chain type definition to NPM](https://www.npmjs.com/package/@acala-network/type-definitions). This is imported in your project's `package.json` like so:

```json
{
  ...
  "devDependencies": {
    ...
    "@acala-network/type-definitions": "latest"
  },
  ...
}
```

The under `/src/chaintypes.ts` we define a custom export for Acala's types bundle from this package.

```ts
import { typesBundleForPolkadot } from "@acala-network/type-definitions";

export default { typesBundle: typesBundleForPolkadot };
```

This is then exported in the `package.json` like so:

```json
{
  ...
  "devDependencies": {
    ...
    "@acala-network/type-definitions": "latest"
  },
  "exports": {
    "chaintypes": "src/chaintypes.ts"
  }
  ...
}
```

Finally, in the `project.ts` manifest, we can import this official types bundle as per standard:

```ts
{
  network: {
    chainId:
      "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3",
    endpoint: [
      "wss://acala-polkadot.api.onfinality.io/public-ws",
      "wss://acala-rpc-0.aca-api.network",
    ],
    dictionary: "https://api.subquery.network/sq/subquery/acala-dictionary",
    chaintypes: {
      file: "./dist/chaintypes.js",
    },
  },
}
```

## Real-time indexing (Unfinalised Blocks)

As indexers are an additional layer in your data processing pipeline, they can introduce a massive delay between when an on-chain event occurs and when the data is processed and able to be queried from the indexer.

SubQuery provides real time indexing of unfinalised data directly from the RPC endpoint that solves this problem. SubQuery takes the most probabilistic data before it is finalised to provide to the app. In the unlikely event that the data isn’t finalised, SubQuery will automatically roll back and correct its mistakes quickly and efficiently - resulting in an insanely quick user experience for your customers.

To enable this feature, you must ensure that your project has the [--unfinalized-blocks](../../run_publish/references#unfinalized-blocks) command enabled as well as [historic indexing](../../run_publish/references#disable-historical) (enabled by default)


## Custom Data Sources

Custom Data Sources provide network specific functionality that makes dealing with data easier. They act as a middleware that can provide extra filtering and data transformation.

A good example of this is EVM support, having a custom data source processor for EVM means that you can filter at the EVM level (e.g. filter contract methods or logs) and data is transformed into structures farmiliar to the Ethereum ecosystem as well as parsing parameters with ABIs.

Custom Data Sources can be used with normal data sources.

Here is a list of supported custom datasources:

| Kind                                         | Supported Handlers                                                                                                               | Filters                         | Description                                                                                                                                           |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [substrate/FrontierEvm](../../datasource-processors/substrate-evm.md) | [substrate/FrontierEvmEvent](../../datasource-processors/substrate-evm#event-handlers), [substrate/FrontierEvmCall](../../dataspirce-processors/substrate-evm#call-handlers) | See filters under each handlers | Provides easy interaction with EVM transactions and events on the Frontier EVM (widely used across Polkadot including in Moonbeam and Astar networks) |
