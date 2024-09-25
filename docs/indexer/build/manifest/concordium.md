# Concordium Manifest File

The Manifest `project.ts` file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data. It clearly indicates where we are indexing data from, and to what on chain events we are subscribing to.

The Manifest can be in either Typescript, Yaml, or JSON format.

With the number of new features we are adding to SubQuery, and the slight differences between each chain that mostly occur in the manifest, the project manifest is now written by default in Typescript. This means that you get a fully typed project manifest with documentation and examples provided your code editor.

Below is a standard example of a basic `project.ts`.

```ts
import {
  TransactionEventTag,
  TransactionSummaryType,
} from "@concordium/node-sdk";
import {
  ConcordiumDatasourceKind,
  ConcordiumHandlerKind,
  ConcordiumProject,
} from "@subql/types-concordium";

const project: ConcordiumProject = {
  specVersion: "1.0.0",
  name: "concordium-testnet-starter",
  version: "0.0.1",
  runner: {
    node: {
      name: "@subql/node-concordium",
      version: "*",
    },
    query: {
      name: "@subql/query",
      version: "*",
    },
  },
  description:
    "This project can be use as a starting point for developing your new Concordium SubQuery project",
  repository: "https://github.com/subquery/concordium-subql-starter",
  schema: {
    file: "./schema.graphql",
  },
  network: {
    /**
     * chainId is the network identifier of the blockchain
     * In Concordium it is always the genesis hash of the network (hash of the first block)
     */
    chainId: "4221332d34e1694168c2a0c0b3fd0f273809612cb13d000d5c2e00e85f50f796",
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     */
    endpoint: ["node.testnet.concordium.com:20000"],
  },
  dataSources: [
    {
      kind: ConcordiumDatasourceKind.Runtime,
      startBlock: 490000,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          /**
           * Avoid using block handlers where possible as they slow the indexing speed of your project
          {
            handler: "handleBlock",
            kind: ConcordiumHandlerKind.Block,
          },
           */
          {
            handler: "handleTransaction",
            kind: ConcordiumHandlerKind.Transaction,
            filter: {
              type: TransactionSummaryType.AccountTransaction,
              values: {
                transactionType: "transfer",
              },
            },
          },
          {
            handler: "handleTransactionEvent",
            kind: ConcordiumHandlerKind.TransactionEvent,
            filter: {
              type: TransactionEventTag.Updated,
            },
          },
          {
            handler: "handleSpecialEvent",
            kind: ConcordiumHandlerKind.SpecialEvent,
            filter: {
              type: "blockAccrueReward",
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

The `chainId` is the network identifier of the blockchain. In Concordium it is always the genesis hash of the network (hash of the first block). This is `4221332d34e1694168c2a0c0b3fd0f273809612cb13d000d5c2e00e85f50f796` for testnet.

You will need to update the `endpoint`. This defines the HTTP RPC endpoint of the blockchain to be indexed - **you will want archive nodes with high rate limits if you want to index large amounts of historical data**. This property can be a string or an array of strings (e.g. `endpoint: ['rpc1.endpoint.com', 'rpc2.endpoint.com']`). We suggest providing an array of endpoints as it has the following benefits:

- Increased speed - When enabled with [worker threads](../../run_publish/references.md#w---workers), RPC calls are distributed and parallelised among RPC providers. Historically, RPC latency is often the limiting factor with SubQuery.
- Increased reliability - If an endpoint goes offline, SubQuery will automatically switch to other RPC providers to continue indexing without interruption.
- Reduced load on RPC providers - Indexing is a computationally expensive process on RPC providers, by distributing requests among RPC providers you are lowering the chance that your project will be rate limited.

Public nodes may be rate limited which can affect indexing speed, when developing your project we suggest getting a private API key from a professional RPC provider.

| Field            | Type               | Description                                                                                                                                                                              |
| ---------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **chainId**      | String             | A network identifier for the blockchain                                                                                                                                                  |
| **endpoint**     | String or String[] | Defines the endpoint of the blockchain to be indexed, this can be a string or an array of endpoints - **This must be a full archive node**.                                              |
| **dictionary**   | String             | It is suggested to provide the HTTP endpoint of a full chain dictionary to speed up processing - read [how a SubQuery Dictionary works](../../academy/tutorials_examples/dictionary.md). |
| **bypassBlocks** | Array              | Bypasses stated block numbers, the values can be a `range`(e.g. `"10- 50"`) or `integer`, see [Bypass Blocks](#bypass-blocks)                                                            |

### Runner Spec

| Field     | Type                                    | Description                                |
| --------- | --------------------------------------- | ------------------------------------------ |
| **node**  | [Runner node spec](#runner-node-spec)   | Describe the node service use for indexing |
| **query** | [Runner query spec](#runner-query-spec) | Describe the query service                 |

### Runner Node Spec

| Field       | Type                                        | Description                                                                                                                                                                                                          |
| ----------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name**    | String                                      | `@subql/node-concordium`                                                                                                                                                                                             |
| **version** | String                                      | Version of the indexer Node service, it must follow the [SEMVER](https://semver.org/) rules or `latest`, you can also find available versions in subquery SDK [releases](https://github.com/subquery/subql/releases) |
| **options** | [Runner Node Options](#runner-node-options) | Runner specific options for how to run your project. These will have an impact on the data your project produces. CLI flags can be used to override these.                                                           |

### Runner Query Spec

| Field       | Type   | Description                                                                                                                                                                                      |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **name**    | String | `@subql/query` and `@subql/query-subgraph`                                                                                                                                                              |
| **version** | String | Version of the Query service, available `@subql/query` [versions](https://github.com/subquery/subql/blob/main/packages/query/CHANGELOG.md) and `@subql/query-subgraph` [versions](https://github.com/subquery/query-subgraph/blob/main/CHANGELOG.md), it also must follow the SEMVER rules or `latest`. |

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
| **kind** | String | [ConcordiumDatasourceKind.Runtime](#data-sources-and-mapping) |
| **startBlock** | Integer | This changes your indexing start block for this datasource, set this as high as possible to skip initial blocks with no relevant data |
| **endBlock** | Integer | This sets a end block for processing on the datasource. After this block is processed, this datasource will no longer index your data. <br><br>Useful when your contracts change at a certain block height, or when you want to insert data at genesis. For example, setting both the `startBlock` and `endBlock` to 320, will mean this datasource only operates on block 320 |
| **mapping** | Mapping Spec | |

### Mapping Spec

| Field                  | Type                         | Description                                                                                                                        |
| ---------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **handlers & filters** | Default handlers and filters | List all the [mapping functions](../mapping/concordium.md) and their corresponding handler types, with additional mapping filters. |

## Data Sources and Mapping

In this section, we will talk about the default Concordium runtime and its mapping. Here is an example:

```ts
{
  ...
  dataSources: [
    {
      kind: ConcordiumDataSourceKind.Runtime, // Indicates that this is default runtime
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

**Your SubQuery project will be much more efficient when you only use `ConcordiumHandlerKind.Transaction`, `ConcordiumHandlerKind.TransactionEvent`, or `ConcordiumHandlerKind.SpecialEvent` with appropriate mapping filters (e.g. NOT a `ConcordiumHandlerKind.Block`).**

| Handler                                                                                      | Supported filter |
| -------------------------------------------------------------------------------------------- | ---------------- |
| [ConcordiumHandlerKind.Block](../mapping/concordium.md#block-handler)                        | `modulo`         |
| [ConcordiumHandlerKind.Transaction](../mapping/concordium.md#transaction-handler)            | `type`, `values` |
| [ConcordiumHandlerKind.TransactionEvent](../mapping/concordium.md#transaction-event-handler) | `type`, `values` |
| [ConcordiumHandlerKind.SpecialEvent](../mapping/concordium.md#special-event-handler)         | `type`, `values` |

`type` is type of transaction, transaction event, or special event to filter by (case sensitive). The `values` filter is a map where the keys correspond to the keys found in a transaction, transaction event, or special event. This filter allows you to search for transactions or events that have specific values for these keys. The `values` filter matches the keys in the filter against the keys in the data object. If a match is found, the corresponding transaction, event, or special event is included in the query result. For example:

```ts
import { TransactionSummaryType } from "@concordium/node-sdk";

{
  handler: "handleTransaction",
  kind: ConcordiumHandlerKind.Transaction,
  filter: {
    type: TransactionSummaryType.AccountTransaction,
    values: {
      transactionType: "transfer",
    },
  },
},
```

Or to filter transactions by their sender:

```ts
import { TransactionSummaryType } from "@concordium/node-sdk";

{
  handler: "handleTransaction",
  kind: ConcordiumHandlerKind.Transaction,
  filter: {
    type: TransactionSummaryType.AccountTransaction,
    values: {
      sender: '4AuT5RRmBwcdkLMA6iVjxTDb1FQmxwAh3wHBS22mggWL8xH6s3',
    },
  },
},
```

Or to filter events by instigator for a specific contract address:

```ts
import { TransactionEventTag } from "@concordium/node-sdk";

{
  handler: "handleTransaction",
  kind: ConcordiumHandlerKind.Transaction,
  filter: {
    type: TransactionEventTag.Updated,
    values: {
      instigator: '4AuT5RRmBwcdkLMA6iVjxTDb1FQmxwAh3wHBS22mggWL8xH6s3',
      address: '6536',
      amount: '0',
    },
  },
},
```

Default runtime mapping filters are an extremely useful feature to decide what block, transaction, transaction event, or special events will trigger a mapping handler.

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
