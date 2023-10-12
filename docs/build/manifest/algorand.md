# Algorand Manifest File

The Manifest `project.ts` file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data. It clearly indicates where we are indexing data from, and to what on chain events we are subscribing to.

The Manifest can be in either Typescript, Yaml, or JSON format.

With the number of new features we are adding to SubQuery, and the slight differences between each chain that mostly occur in the manifest, the project manifest is now written by default in Typescript. This means that you get a fully typed project manifest with documentation and examples provided your code editor.

Below is a standard example of a basic `project.ts`.

```ts
import {
  AlgorandDataSourceKind,
  AlgorandHandlerKind,
  AlgorandProject,
} from "@subql/types-algorand";

// Can expand the Datasource processor types via the genreic param
const project: AlgorandProject = {
  specVersion: "1.0.0",
  name: "algorand-subql-starter",
  version: "1.0.0",
  runner: {
    node: {
      name: "@subql/node-algorand",
      version: ">=1.0.0",
    },
    query: {
      name: "@subql/query",
      version: "*",
    },
  },
  description:
    "This project can be used as a starting point for developing your Algorand SubQuery project",
  repository: "https://github.com/subquery/algorand-subql-starter",
  schema: {
    file: "./schema.graphql",
  },
  network: {
    // For the testnet use the following
    // chainId: "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI="
    chainId: "wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=",
    // This endpoint must be a public non-pruned archive node
    // We recommend providing more than one endpoint for improved reliability, performance, and uptime
    // Public nodes may be rate limited, which can affect indexing speed
    // When developing your project we suggest getting a private API key
    // You can get them from OnFinality for free https://app.onfinality.io
    // https://documentation.onfinality.io/support/the-enhanced-api-service
    endpoint: ["https://mainnet-idx.algonode.cloud"],
    // Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing
    dictionary: "https://api.subquery.network/sq/subquery/Algorand-Dictionary",
  },
  dataSources: [
    {
      kind: AlgorandDataSourceKind.Runtime,
      startBlock: 8712119,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          // {
          //   block handlers are slow and we are best to avoid them if possible
          //   handler: handleBlock,
          //   kind: AlgorandHandlerKind.Block
          // }
          {
            handler: "handleTransaction",
            kind: AlgorandHandlerKind.Transaction,
            filter: {
              txType: "axfer", // From the application TransactionType enum https://github.com/algorand/js-algorand-sdk/blob/5eb7b4ffe5fcb46812785fdc79e8a7edb78b084f/src/types/transactions/base.ts#L6
              assetId: 27165954, // Planet watch asset
              sender:
                "ZW3ISEHZUHPO7OZGMKLKIIMKVICOUDRCERI454I3DB2BH52HGLSO67W754",
              // applicationId: 1
              // receiver: "XXXXX"
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
name: algorand-subql-starter
version: 1.0.0
runner:
  node:
    name: "@subql/node-algorand"
    version: ">=1.0.0"
  query:
    name: "@subql/query"
    version: "*"
description: >-
  This project can be used as a starting point for developing your Algorand SubQuery project
repository: "https://github.com/subquery/algorand-subql-starter"
schema:
  file: ./schema.graphql
network:
  # For the testnet use the following
  # chainId: "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI="
  chainId: "wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8="
  # This endpoint must be a public non-pruned archive node
  # We recommend providing more than one endpoint for improved reliability, performance, and uptime
  # Public nodes may be rate limited, which can affect indexing speed
  # When developing your project we suggest getting a private API key
  # You can get them from OnFinality for free https://app.onfinality.io
  # https://documentation.onfinality.io/support/the-enhanced-api-service
  endpoint: ["https://mainnet-idx.algonode.cloud"]
  # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing
  dictionary: https://api.subquery.network/sq/subquery/Algorand-Dictionary

dataSources:
  - kind: algorand/Runtime
    startBlock: 50000 # Block to start indexing from
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleBlock
          kind: algorand/BlockHandler
        - handler: handleTransaction
          kind: algorand/TransactionHandler
          filter:
            txType: pay # From the application TransactionType enum https://github.com/algorand/js-algorand-sdk/blob/5eb7b4ffe5fcb46812785fdc79e8a7edb78b084f/src/types/transactions/base.ts#L6
            sender: "ZW3ISEHZUHPO7OZGMKLKIIMKVICOUDRCERI454I3DB2BH52HGLSO67W754"
            receiver: "ZW3ISEHZUHPO7OZGMKLKIIMKVICOUDRCERI454I3DB2BH52HGLSO67W754"
        - handler: handleTransaction
          kind: algorand/TransactionHandler
          filter:
            txType: acfg # From the application TransactionType enum https://github.com/algorand/js-algorand-sdk/blob/5eb7b4ffe5fcb46812785fdc79e8a7edb78b084f/src/types/transactions/base.ts#L6
            applicationId: 1
```

:::

## Overview

### Top Level Spec

| Field           | Type                                       | Description                                         |
| --------------- | ------------------------------------------ | --------------------------------------------------- |
| **specVersion** | String                                     | The spec version of the manifest file               |
| **name**        | String                                     | Name of your project                                |
| **version**     | String                                     | Version of your project                             |
| **description** | String                                     | Discription of your project                         |
| **repository**  | String                                     | Git repository address of your project              |
| **schema**      | [Schema Spec](#schema-spec)                | The location of your GraphQL schema file            |
| **network**     | [Network Spec](#network-spec)              | Detail of the network to be indexed                 |
| **dataSources** | [DataSource Spec](#datasource-spec)        | The datasource to your project                      |
| **templates**   | [Templates Spec](../dynamicdatasources.md) | Allows creating new datasources from this templates |
| **runner**      | [Runner Spec](#runner-spec)                | Runner specs info                                   |

### Schema Spec

| Field    | Type   | Description                              |
| -------- | ------ | ---------------------------------------- |
| **file** | String | The location of your GraphQL schema file |

### Network Spec

If you start your project by using the `subql init` command, you'll generally receive a starter project with the correct network settings. If you are changing the target chain of an existing project, you'll need to edit the [Network Spec](#network-spec) section of this manifest.

The `chainId` is the network identifier of the blockchain. In Algorand it is always the genesis hash of the network (hash of the first block).

Additionally you will need to update the `endpoint`. This defines the (HTTP or WSS) endpoint of the blockchain to be indexed - **this must be a full archive node**. This property can be a string or an array of strings (e.g. `endpoint: ['rpc1.endpoint.com', 'rpc2.endpoint.com']`). We suggest providing an array of endpoints as it has the following benefits:

- Increased speed - When enabled with [worker threads](../../run_publish/references.md#w---workers), RPC calls are distributed and parallelised among RPC providers. Historically, RPC latency is often the limiting factor with SubQuery.
- Increased reliability - If an endpoint goes offline, SubQuery will automatically switch to other RPC providers to continue indexing without interruption.
- Reduced load on RPC providers - Indexing is a computationally expensive process on RPC providers, by distributing requests among RPC providers you are lowering the chance that your project will be rate limited.

Public nodes may be rate limited which can affect indexing speed, when developing your project we suggest getting a private API key from a professional RPC provider.

| Field            | Type   | Description                                                                                                                                                                              |
| ---------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **chainId**      | String | A network identifier for the blockchain                                                                                                                                                  |
| **endpoint**     | String | Defines the wss or ws endpoint of the blockchain to be indexed - **This must be a full archive node**.                                                                                   |
| **port**         | Number | Optional port number on the `endpoint` to connect to                                                                                                                                     |
| **dictionary**   | String | It is suggested to provide the HTTP endpoint of a full chain dictionary to speed up processing - read [how a SubQuery Dictionary works](../../academy/tutorials_examples/dictionary.md). |
| **bypassBlocks** | Array  | Bypasses stated block numbers, the values can be a `range`(e.g. `"10- 50"`) or `integer`, see [Bypass Blocks](#bypass-blocks)                                                            |

### Runner Spec

| Field     | Type                                    | Description                                |
| --------- | --------------------------------------- | ------------------------------------------ |
| **node**  | [Runner node spec](#runner-node-spec)   | Describe the node service use for indexing |
| **query** | [Runner query spec](#runner-query-spec) | Describe the query service                 |

### Runner Node Spec

| Field       | Type                                        | Description                                                                                                                                                                                                          |
| ----------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name**    | String                                      | `@subql/node-algorand`                                                                                                                                                                                               |
| **version** | String                                      | Version of the indexer Node service, it must follow the [SEMVER](https://semver.org/) rules or `latest`, you can also find available versions in subquery SDK [releases](https://github.com/subquery/subql/releases) |
| **options** | [Runner Node Options](#runner-node-options) | Runner specific options for how to run your project. These will have an impact on the data your project produces. CLI flags can be used to override these.                                                           |

### Runner Query Spec

| Field       | Type   | Description                                                                                                                                                                                      |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **name**    | String | We currently support `@subql/query`                                                                                                                                                              |
| **version** | String | Version of the Query service, available versions can be found [here](https://github.com/subquery/subql/blob/main/packages/query/CHANGELOG.md), it also must follow the SEMVER rules or `latest`. |

### Runner Node Options

| Field                 | v1.0.0 (default) | Description                                                                                                                                                                            |
| --------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **historical**        | Boolean (true)   | Historical indexing allows you to query the state at a specific block height. e.g A users balance in the past.                                                                         |
| **unfinalizedBlocks** | Boolean (false)  | If enabled unfinalized blocks will be indexed, when a fork is detected the project will be reindexed from the fork. Requires historical.                                               |
| **unsafe**            | Boolean (false)  | Removes all sandbox restrictions and allows access to all inbuilt node packages as well as being able to make network requests. WARNING: this can make your project non-deterministic. |

### Datasource Spec

Defines the data that will be filtered and extracted and the location of the mapping function handler for the data transformation to be applied.
| Field | Type | Description
| --------------- |-------------|-------------|
| **kind** | String | [algorand/Runtime](#data-sources-and-mapping) |
| **startBlock** | Integer | This changes your indexing start block, set this higher to skip initial blocks with less data|  
| **mapping** | Mapping Spec | |

### Mapping Spec

| Field                  | Type                         | Description                                                                                                                      |
| ---------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **handlers & filters** | Default handlers and filters | List all the [mapping functions](../mapping/algorand.md) and their corresponding handler types, with additional mapping filters. |

## Data Sources and Mapping

In this section, we will talk about the default Algorand runtime and its mapping. Here is an example:

```ts
{
  ...
  dataSources: [
    {
      kind: AlgorandDataSourceKind.Runtime, // Indicates that this is default runtime
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

**Your SubQuery project will be much more efficient when you only use `TransactionHandler` with appropriate mapping filters (e.g. NOT a `BlockHandler`).**

| Handler                                                                   | Supported filter                                                                                                            |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| [algorand/BlockHandler](../mapping/algorand.md#block-handler)             | `modulo`                                                                                                                    |
| [algorand/TransactionHandler](../mapping/algorand.md#transaction-handler) | `txType`,`sender`, `receiver`, `applicationId`, `applicationArgs`, `nonParticipant`, `assetId`, `newFreezeStatus` `address` |

`txType` is the enum for the type of transaction. You can see a [list of valid enum values here](https://github.com/algorand/js-algorand-sdk/blob/5eb7b4ffe5fcb46812785fdc79e8a7edb78b084f/src/types/transactions/base.ts#L6).

`applicationArgs` are not currently implemented with the dictionary. You can still use the dictionary and the filter will work, but it will not improve indexing speed like other filters.

Default runtime mapping filters are an extremely useful feature to decide what block, event, or extrinsic will trigger a mapping handler.

Only incoming data that satisfies the filter conditions will be processed by the mapping functions. Mapping filters are optional but are highly recommended as they significantly reduce the amount of data processed by your SubQuery project and will improve indexing performance.

The `modulo` filter allows handling every N blocks, which is useful if you want to group or calculate data at a set interval. The following example shows how to use this filter.

```yml
filter:
  modulo: 50 # Index every 50 blocks: 0, 50, 100, 150....
```

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

## Validating

You can validate your project manifest by running `subql validate`. This will check that it has the correct structure, valid values where possible and provide useful feedback as to where any fixes should be made.
