# Polkadot/Substrate Manifest File

The Manifest `project.yaml` file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data. It clearly indicates where we are indexing data from, and to what on chain events we are subscribing to.

The Manifest can be in either YAML or JSON format. In this document, we will use YAML in all the examples.

Below is a standard example of a basic `project.yaml`.

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
  # You can get them from OnFinality for free https://app.onfinality.io
  # https://documentation.onfinality.io/support/the-enhanced-api-service
  endpoint: ["wss://polkadot.api.onfinality.io/public-ws"]
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

## Migrating to v1.0.0 <Badge text="upgrade" type="warning"/>

**If you have a project with specVersion below v1.0.0 you can use `subql migrate` to quickly upgrade. [See the CLI documentation](#cli-options) for more information.**

### Change Log for v1.0.0

**Under `runner`:**

- Now that SubQuery supports multiple layer 1 networks, you must provide runner information for various services.
- `runner.node` specify the node image that is used to run the current project [`@subql/node` or `@subql/node-avalanche`].
- `runner.query` specify the query service image associate with the project database - use `@subql/query`.
- `version` specifies the version of these service, they should follow the [SEMVER](https://semver.org/) rules and match a published version on our [package repository](https://www.npmjs.com/package/@subql/node). `Latest` and `Dev` are not supported.

**Under `templates`:**

Template are introduced from manifest v0.2.1, it allows creating datasources dynamically from these templates.
This is useful when you don't know certain specific details when creating your project.
A good example of this is when you know a contract will be deployed at a later stage but you don't know what the address will be.

For a more detailed explanation head [here](../dynamicdatasources.md).

### Change log for v0.2.0

**Under `network`:**

- There is a new **required** `genesisHash` field which helps to identify the chain being used.
- For v0.2.0 and above, you are able to reference an external [chaintype file](#custom-chains) if you are referencing a custom chain.

**Under `dataSources`:**

- Can directly link an `index.js` entry point for mapping handlers. By default this `index.js` will be generated from `index.ts` during the build process.
- Data sources can now be either a regular runtime data source or [custom data source](#custom-data-sources).

### Migrating from v0.2.0 to v0.3.0 <Badge text="upgrade" type="warning"/>

If you have a project with specVersion v0.2.0, The only change is a new **required** `chainId` field which helps to identify the chain being used.

### CLI Options

`subql migrate` can be run in an existing project to migrate the project manifest to the latest version.

## Overview

### Top Level Spec

| Field           | v1.0.0                                     | v0.2.0                                     | Description                                         |
| --------------- | ------------------------------------------ | ------------------------------------------ | --------------------------------------------------- |
| **specVersion** | String                                     | String                                     | The spec version of the manifest file               |
| **name**        | String                                     | String                                     | Name of your project                                |
| **version**     | String                                     | String                                     | Version of your project                             |
| **description** | String                                     | String                                     | Discription of your project                         |
| **repository**  | String                                     | String                                     | Git repository address of your project              |
| **schema**      | [Schema Spec](#schema-spec)                | [Schema Spec](#schema-spec)                | The location of your GraphQL schema file            |
| **network**     | [Network Spec](#network-spec)              | [Network Spec](#network-spec)              | Detail of the network to be indexed                 |
| **dataSources** | [DataSource Spec](#datasource-spec)        | [DataSource Spec](#datasource-spec)        | The datasource to your project                      |
| **templates**   | [Templates Spec](../dynamicdatasources.md) | [Templates Spec](../dynamicdatasources.md) | Allows creating new datasources from this templates |
| **runner**      | [Runner Spec](#runner-spec)                | [Runner Spec](#runner-spec)                | Runner specs info                                   |

### Schema Spec

| Field    | Type   | Description                              |
| -------- | ------ | ---------------------------------------- |
| **file** | String | The location of your GraphQL schema file |

### Network Spec

If you start your project by using the `subql init` command, you'll generally receive a starter project with the correct network settings. If you are changing the target chain of an existing project, you'll need to edit the [Network Spec](#network-spec) section of this manifest.

The `chainId` or `genesisHash` is the network identifier of the blockchain. In Substrate it is always the genesis hash of the network (hash of the first block). You can retrieve this easily by going to [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) and looking for the hash on **block 0** (see the image below).

![Genesis Hash](/assets/img/genesis-hash.jpg)

Additionally you will need to update the `endpoint`. This defines the (HTTP or WSS) endpoint of the blockchain to be indexed - **this must be a full archive node**. This property can be a string or an array of strings (e.g. `endpoint: ['rpc1.endpoint.com', 'rpc2.endpoint.com']`). We suggest providing an array of endpoints as it has the following benefits:

- Increased speed - When enabled with [worker threads](../../run_publish/references.md#w---workers), RPC calls are distributed and parallelised among RPC providers. Historically, RPC latency is often the limiting factor with SubQuery.
- Increased reliability - If an endpoint goes offline, SubQuery will automatically switch to other RPC providers to continue indexing without interruption.
- Reduced load on RPC providers - Indexing is a computationally expensive process on RPC providers, by distributing requests among RPC providers you are lowering the chance that your project will be rate limited.

Public nodes may be rate limited which can affect indexing speed, when developing your project we suggest getting a private API key from a professional RPC provider like [OnFinality](https://onfinality.io/networks/eth).

| Field            | v1.0.0        | v0.2.0        | Description                                                                                                                                                                                                |
| ---------------- | ------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **chainId**      | String        | x             | A network identifier for the blockchain (`genesisHash` in Substrate)                                                                                                                                       |
| **genesisHash**  | String        | String        | The genesis hash of the network (from v1.0.0 this is an alias for `chainId` and not necessary)                                                                                                             |
| **endpoint**     | String        | String        | Defines the wss or ws endpoint of the blockchain to be indexed - **This must be a full archive node**. You can retrieve endpoints for all parachains for free from [OnFinality](https://app.onfinality.io) |
| **port**         | Number        | Number        | Optional port number on the `endpoint` to connect to                                                                                                                                                       |
| **dictionary**   | String        | String        | It is suggested to provide the HTTP endpoint of a full chain dictionary to speed up processing - read [how a SubQuery Dictionary works](../../academy/tutorials_examples/dictionary.md).                   |
| **chaintypes**   | {file:String} | {file:String} | Path to chain types file, accept `.json` or `.yaml` format                                                                                                                                                 |
| **bypassBlocks** | Array         | x             | Bypasses stated block numbers, the values can be a `range`(e.g. `"10- 50"`) or `integer`, see [Bypass Blocks](#bypass-blocks)                                                                              |

### Runner Spec

| Field     | v1.0.0                                  | Description                                |
| --------- | --------------------------------------- | ------------------------------------------ |
| **node**  | [Runner node spec](#runner-node-spec)   | Describe the node service use for indexing |
| **query** | [Runner query spec](#runner-query-spec) | Describe the query service                 |

### Runner Node Spec

| Field       | v1.0.0 | Description                                                                                                                                                                                                          |
| ----------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name**    | String | We currently support `@subql/node`                                                                                                                                                                                   |
| **version** | String | Version of the indexer Node service, it must follow the [SEMVER](https://semver.org/) rules or `latest`, you can also find available versions in subquery SDK [releases](https://github.com/subquery/subql/releases) |

### Runner Query Spec

| Field       | All manifest versions | Description                                                                                                                                                                                      |
| ----------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **name**    | String                | We currently support `@subql/query`                                                                                                                                                              |
| **version** | String                | Version of the Query service, available versions can be found [here](https://github.com/subquery/subql/blob/main/packages/query/CHANGELOG.md), it also must follow the SEMVER rules or `latest`. |

### Datasource Spec

Defines the data that will be filtered and extracted and the location of the mapping function handler for the data transformation to be applied.

| Field          | Type         | Description                                                                                   |
| -------------- | ------------ | --------------------------------------------------------------------------------------------- |
| **kind**       | String       | [substrate/Runtime](#data-sources-and-mapping)                                                |
| **startBlock** | Integer      | This changes your indexing start block, set this higher to skip initial blocks with less data |
| **mapping**    | Mapping Spec |                                                                                               |

### Mapping Spec

| Field                  | All manifest versions                                                                   | Description                                                                                                                                                                                                                                |
| ---------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **handlers & filters** | Default handlers and filters, <br />[Custom handlers and filters](#custom-data-sources) | List all the [mapping functions](../mapping/polkadot.md) and their corresponding handler types, with additional mapping filters. <br /><br /> For custom runtimes mapping handlers please view [Custom data sources](#custom-data-sources) |

## Data Sources and Mapping

In this section, we will talk about the default Substrate runtime and its mapping. Here is an example:

```yml
dataSources:
  - kind: substrate/Runtime # Indicates that this is default runtime
    startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data
    mapping:
      file: dist/index.js # Entry path for this mapping
```

### Mapping Handlers and Filters

The following table explains filters supported by different handlers.

**Your SubQuery project will be much more efficient when you only use event and call handlers with appropriate mapping filters.**

| Handler                                                        | Supported filter                         |
| -------------------------------------------------------------- | ---------------------------------------- |
| [substrate/BlockHandler](../mapping/polkadot.md#block-handler) | `specVersion`, `modulo`, `timestamp`     |
| [substrate/EventHandler](../mapping/polkadot.md#event-handler) | `module`,`method`                        |
| [substrate/CallHandler](../mapping/polkadot.md#call-handler)   | `module`,`method` ,`success`, `isSigned` |

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

The `modulo` filter allows handling every N blocks, which is useful if you want to group or calculate data at a set interval. The following example shows how to use this filter.

```yml
filter:
  modulo: 50 # Index every 50 blocks: 0, 50, 100, 150....
```

The `timestamp` filter is very useful when indexing block data with specific time intervals between them. It can be used in cases where you are aggregating data on a hourly/daily basis. It can be also used to set a delay between calls to `blockHandler` functions to reduce the computational costs of this handler.

The `timestamp` filter accepts a valid cron expression and runs on schedule against the timestamps of the blocks being indexed. Times are considered on UTC dates and times. The block handler will run on the first block that is after the next iteration of the cron expression.

```yml
filter:
  # This cron expression will index blocks with at least 5 minutes interval
  # between their timestamps starting at startBlock given under the datasource.
  timestamp: "*/5 * * * *"
```

::: tip Note
We use the [cron-converter](https://github.com/roccivic/cron-converter) package to generate unix timestamps for iterations out of the given cron expression. So, make sure the format of the cron expression given in the `timestamp` filter is compatible with the package.
:::

Some common examples

```yml
  # Every minute
  timestamp: "* * * * *"
  # Every hour on the hour (UTC)
  timestamp: "0 * * * *"
  # Every day at 1am UTC
  timestamp: "0 1 * * *"
  # Every Sunday (weekly) at 0:00 UTC
  timestamp: "0 0 * * 0"
```

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

Finally, in the `project.yaml` manifest, we can import this official types bundle as per standard:

```yaml
network:
  genesisHash: "0xfc41b9bd8ef8fe53d58c7ea67c794c7ec9a73daf05e6d54b14ff6342c99ba64c"
  endpoint: wss://acala-polkadot.api.onfinality.io/public-ws
  chaintypes:
    file: ./dist/chaintypes.js
```

## Real-time indexing (Unfinalised Blocks)

As indexers are an additional layer in your data processing pipeline, they can introduce a massive delay between when an on-chain event occurs and when the data is processed and able to be queried from the indexer.

SubQuery provides real time indexing of unfinalised data directly from the RPC endpoint that solves this problem. SubQuery takes the most probabilistic data before it is finalised to provide to the app. In the unlikely event that the data isn’t finalised, SubQuery will automatically roll back and correct its mistakes quickly and efficiently - resulting in an insanely quick user experience for your customers.

To enable this feature, you must ensure that your project has the [--unfinalized-blocks](../../run_publish/references.md#unfinalized-blocks) command enabled as well as [historic indexing](../../run_publish/references.md#disable-historical) (enabled by default)

## Bypass Blocks

Bypass Blocks allows you to skip the stated blocks, this is useful when there are erroneous blocks in the chain or when a chain skips a block after an outage or a hard fork. It accepts both a `range` or single `integer` entry in the array.

When declaring a `range` use an string in the format of `"start - end"`. Both start and end are inclusive, e.g. a range of `"100-102"` will skip blocks `100`, `101`, and `102`.

```yaml
network:
  chainId: "0xfc41b9bd8ef8fe53d58c7ea67c794c7ec9a73daf05e6d54b14ff6342c99ba64c"
  endpoint: wss://acala-polkadot.api.onfinality.io/public-ws
  bypassBlocks: [1, 2, 3, "105-200", 290]
```

## Custom Data Sources

Custom Data Sources provide network specific functionality that makes dealing with data easier. They act as a middleware that can provide extra filtering and data transformation.

A good example of this is EVM support, having a custom data source processor for EVM means that you can filter at the EVM level (e.g. filter contract methods or logs) and data is transformed into structures farmiliar to the Ethereum ecosystem as well as parsing parameters with ABIs.

Custom Data Sources can be used with normal data sources.

Here is a list of supported custom datasources:

| Kind                                         | Supported Handlers                                                                                                               | Filters                         | Description                                                                                                                                           |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [substrate/FrontierEvm](../substrate-evm.md) | [substrate/FrontierEvmEvent](../substrate-evm.md#event-handlers), [substrate/FrontierEvmCall](../substrate-evm.md#call-handlers) | See filters under each handlers | Provides easy interaction with EVM transactions and events on the Frontier EVM (widely used across Polkadot including in Moonbeam and Astar networks) |

## Validating

You can validate your project manifest by running `subql validate`. This will check that it has the correct structure, valid values where possible and provide useful feedback as to where any fixes should be made.
