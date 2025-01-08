# Cosmos Manifest File

The Manifest `project.ts` file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data. It clearly indicates where we are indexing data from, and to what on chain events we are subscribing to.

The Manifest can be in either Typescript, Yaml, or JSON format.

With the number of new features we are adding to SubQuery, and the slight differences between each chain that mostly occur in the manifest, the project manifest is now written by default in Typescript. This means that you get a fully typed project manifest with documentation and examples provided your code editor.

Below is a standard example of a basic `project.ts`.

```ts
import {
  CosmosDatasourceKind,
  CosmosHandlerKind,
  CosmosProject,
} from "@subql/types-cosmos";

// Can expand the Datasource processor types via the genreic param
const project: CosmosProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "juno-starter",
  description:
    "This project can be use as a starting point for developing your Cosmos juno based SubQuery project",
  runner: {
    node: {
      name: "@subql/node-cosmos",
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
    /* The unique chainID of the Cosmos Zone */
    chainId: "juno-1",
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * If you use a rate limited endpoint, adjust the --batch-size and --workers parameters
     * These settings can be found in your docker-compose.yaml, they will slow indexing but prevent your project being rate limited
     */
    endpoint: ["https://rpc-juno.whispernode.com"],
  },
  dataSources: [
    {
      kind: CosmosDatasourceKind.Runtime,
      startBlock: 9700000,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleEvent",
            kind: CosmosHandlerKind.Event,
            filter: {
              type: "execute",
              messageFilter: {
                type: "/cosmwasm.wasm.v1.MsgExecuteContract",
              },
            },
          },
          {
            handler: "handleMessage",
            kind: CosmosHandlerKind.Message,
            filter: {
              type: "/cosmwasm.wasm.v1.MsgExecuteContract",
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
name: cosmos-juno-subql-starter
version: 0.0.1
runner:
  node:
    name: "@subql/node-cosmos"
    version: latest
  query:
    name: "@subql/query"
    version: latest
description: "This project can be use as a starting point for developing your Cosmos (CosmWasm) based SubQuery project using an example from Juno"
repository: https://github.com/subquery/cosmos-subql-starter
schema:
  file: ./schema.graphql
network:
  chainId: juno-1
  # This endpoint must be a public non-pruned archive node
  # We recommend providing more than one endpoint for improved reliability, performance, and uptime
  # Public nodes may be rate limited, which can affect indexing speed
  # When developing your project we suggest getting a private API key
  # You can get them from OnFinality for free https://app.onfinality.io
  # https://documentation.onfinality.io/support/the-enhanced-api-service
  endpoint: ["https://juno.api.onfinality.io/public"]
  # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing
  dictionary: "https://api.subquery.network/sq/subquery/cosmos-juno-dictionary"
  # chainTypes: # This is a beta feature that allows support for any Cosmos chain by importing the correct protobuf messages
  #  cosmos.slashing.v1beta1:
  #    file: "./proto/cosmos/slashing/v1beta1/tx.proto"
  #    messages:
  #     - "MsgUnjail"

dataSources:
  - kind: cosmos/Runtime
    startBlock: 4415041 # first block on the fourth iteration of juno
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleBlock
          kind: cosmos/BlockHandler
        - handler: handleTransaction
          kind: cosmos/TransactionHandler
        - handler: handleEvent
          kind: cosmos/EventHandler
          filter:
            type: execute
            messageFilter:
              type: "/cosmwasm.wasm.v1.MsgExecuteContract"
              # contractCall field can be specified here too
              #values: # A set of key/value pairs that are present in the message data
              #contract: "juno1v99ehkuetkpf0yxdry8ce92yeqaeaa7lyxr2aagkesrw67wcsn8qxpxay0"
        - handler: handleMessage
          kind: cosmos/MessageHandler
          filter:
            type: "/cosmwasm.wasm.v1.MsgExecuteContract"
            # Filter to only messages with the provide_liquidity function call
            #contractCall: "provide_liquidity" # The name of the contract function that was called
            #values: # A set of key/value pairs that are present in the message data
            #contract: "juno1v99ehkuetkpf0yxdry8ce92yeqaeaa7lyxr2aagkesrw67wcsn8qxpxay0"
```

:::

### Tested and Supported networks

We expect that SubQuery will work with all Ethermint and CosmWasm Cosmos chains with the import of the correct protobuf definitions. We have tested this with the [chains in the cosmos-subql-starter repository](https://github.com/subquery/cosmos-subql-starter). However, please feel free to make a pull request to non-supported chains when you are able to test and confirm them.

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

The `chainId` is the network identifier of the Cosmos Zone. Examples in Cosmos might be `juno-1`. You can often search for this in https://github.com/cosmos/chain-registry.

Additionally you will need to update the `endpoint`. This defines the (HTTP or WSS) endpoint of the blockchain to be indexed - **this must be a full archive node**. This property can be a string or an array of strings (e.g. `endpoint: ['rpc1.endpoint.com', 'rpc2.endpoint.com']`). We suggest providing an array of endpoints as it has the following benefits:

- Increased speed - When enabled with [worker threads](../../run_publish/references.md#w---workers), RPC calls are distributed and parallelised among RPC providers. Historically, RPC latency is often the limiting factor with SubQuery.
- Increased reliability - If an endpoint goes offline, SubQuery will automatically switch to other RPC providers to continue indexing without interruption.
- Reduced load on RPC providers - Indexing is a computationally expensive process on RPC providers, by distributing requests among RPC providers you are lowering the chance that your project will be rate limited.

Public nodes may be rate limited which can affect indexing speed, when developing your project we suggest getting a private API key from a professional RPC provider like [OnFinality](https://onfinality.io/networks).

| Field            | Type                                               | Description                                                                                                                                                                              |
| ---------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **chainId**      | String                                             | A network identifier for the blockchain                                                                                                                                                  |
| **endpoint**     | String or String[]                                 | Defines the endpoint of the blockchain to be indexed, this can be a string or an array of endpoints - **This must be a full archive node**.                                              |
| **dictionary**   | String                                             | It is suggested to provide the HTTP endpoint of a full chain dictionary to speed up processing - read [how a SubQuery Dictionary works](../../academy/tutorials_examples/dictionary.md). |
| **bypassBlocks** | Array                                              | Bypasses stated block numbers, the values can be a `range`(e.g. `"10- 50"`) or `integer`, see [Bypass Blocks](#bypass-blocks)                                                            |
| **chaintypes**   | Map\<String, { file: String, messages: String[] \> | References to protobuf files that are used to decode block content, this should include protobufs for any messages or events that you wish to decode, see [ChainTypes](#chain-types)     |

### Runner Spec

| Field     | Type                                    | Description                                |
| --------- | --------------------------------------- | ------------------------------------------ |
| **node**  | [Runner node spec](#runner-node-spec)   | Describe the node service use for indexing |
| **query** | [Runner query spec](#runner-query-spec) | Describe the query service                 |

### Runner Node Spec

| Field       | Type                                        | Description                                                                                                                                                                                                          |
| ----------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name**    | String                                      | `@subql/node-cosmos`                                                                                                                                                                                                 |
| **version** | String                                      | Version of the indexer Node service, it must follow the [SEMVER](https://semver.org/) rules or `latest`, you can also find available versions in subquery SDK [releases](https://github.com/subquery/subql/releases) |
| **options** | [Runner Node Options](#runner-node-options) | Runner specific options for how to run your project. These will have an impact on the data your project produces. CLI flags can be used to override these.                                                           |

### Runner Query Spec

| Field       | Type   | Description                                                                                                                                                                                                                                                                                             |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name**    | String | `@subql/query` and `@subql/query-subgraph`                                                                                                                                                                                                                                                              |
| **version** | String | Version of the Query service, available `@subql/query` [versions](https://github.com/subquery/subql/blob/main/packages/query/CHANGELOG.md) and `@subql/query-subgraph` [versions](https://github.com/subquery/query-subgraph/blob/main/CHANGELOG.md), it also must follow the SEMVER rules or `latest`. |

### Runner Node Options

| Field                 | v1.0.0 (default) | Description                                                                                                                                                                            |
| --------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **historical**        | Boolean (true)   | Historical indexing allows you to query the state at a specific block height. e.g A users balance in the past.                                                                         |
| **unfinalizedBlocks** | Boolean (false)  | If enabled unfinalized blocks will be indexed, when a fork is detected the project will be reindexed from the fork. Requires historical.                                               |
| **unsafe**            | Boolean (false)  | Removes all sandbox restrictions and allows access to all inbuilt node packages as well as being able to make network requests. WARNING: this can make your project non-deterministic. |

### Datasource Spec

Defines the data that will be filtered and extracted and the location of the mapping function handler for the data transformation to be applied.

| Field          | Type         | Description                                                                                                                                                                                                                                                                                                                                                                    |
| -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **kind**       | String       | [cosmos/Runtime](#data-sources-and-mapping)                                                                                                                                                                                                                                                                                                                                    |
| **startBlock** | Integer      | This changes your indexing start block for this datasource, set this as high as possible to skip initial blocks with no relevant data                                                                                                                                                                                                                                          |
| **endBlock**   | Integer      | This sets a end block for processing on the datasource. After this block is processed, this datasource will no longer index your data. <br><br>Useful when your contracts change at a certain block height, or when you want to insert data at genesis. For example, setting both the `startBlock` and `endBlock` to 320, will mean this datasource only operates on block 320 |
| **mapping**    | Mapping Spec |                                                                                                                                                                                                                                                                                                                                                                                |

### Mapping Spec

| Field                  | Type                                                                            | Description                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **handlers & filters** | Default handlers and filters, <br />[Custom handlers and filters](#chain-types) | List all the [mapping functions](../mapping/cosmos.md) and their corresponding handler types, with additional mapping filters. |

## Data Sources and Mapping

In this section, we will talk about the default Cosmos runtime and its mapping. Here is an example:

```ts
{
  ...
  dataSources: [
    {
      kind: CosmosDataSourceKind.Runtime, // Indicates that this is default runtime
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

**Your SubQuery project will be much more efficient when you only use `TransactionHandler`, `MessageHandler`, or `EventHandler` handlers with appropriate mapping filters (e.g. NOT a `BlockHandler`).**

| Handler                                                               | Supported filter                      |
| --------------------------------------------------------------------- | ------------------------------------- |
| [cosmos/BlockHandler](../mapping/cosmos.md#block-handler)             | `modulo`                              |
| [cosmos/TransactionHandler](../mapping/cosmos.md#transaction-handler) | `includeFailedTx`                     |
| [cosmos/MessageHandler](../mapping/cosmos.md#message-handler)         | `includeFailedTx`, `type`, `values`   |
| [cosmos/EventHandler](../mapping/cosmos.md#event-handler)             | `type`, `messageFilter`, `attributes` |

Default runtime mapping filters are an extremely useful feature to decide what block, event, or extrinsic will trigger a mapping handler.

Only incoming data that satisfies the filter conditions will be processed by the mapping functions. Mapping filters are optional but are highly recommended as they significantly reduce the amount of data processed by your SubQuery project and will improve indexing performance.

```yml
# Example filter from EventHandler
filter:
  type: execute
  # Attributes can be filtered upon by providing matching key/values
  attributes:
    _contract_address: "juno1m7qmz49a9g6zeyzl032aj3rnsu856893cwryx8c4v2gf2s0ewv8qvtcsmx"
  messageFilter:
    type: "/cosmwasm.wasm.v1.MsgExecuteContract"
    # contractCall field can be specified here too
    values: # A set of key/value pairs that are present in the message data
      contract: "juno1v99ehkuetkpf0yxdry8ce92yeqaeaa7lyxr2aagkesrw67wcsn8qxpxay0"

# Example filter from MessageHandler
filter:
  type: "/cosmwasm.wasm.v1.MsgExecuteContract"
  # Filter to only messages with the provide_liquidity function call
  contractCall: "provide_liquidity" # The name of the contract function that was called
  # Include messages that were in a failed transaction (false by default)
  includeFailedTx: true
  values: # A set of key/value pairs that are present in the message data
    contract: "juno1v99ehkuetkpf0yxdry8ce92yeqaeaa7lyxr2aagkesrw67wcsn8qxpxay0"

# Example filter from TransactionHandler:
filter:
  # Include messages that were in a failed transaction (false by default)
  includeFailedTx: true
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

::: info Simplifying your Project Manifest for a large number contract addresses

If your project has the same handlers for multiple versions of the same type of contract your project manifest can get quite repetitive. e.g you want to index the transfers for many similar ERC20 contracts, there are [ways to better handle a large static list of contract addresses](../optimisation.md#simplifying-the-project-manifest).

Note that there is also [dynamic datasources](../dynamicdatasources.md) for when your list of addresses is dynamic (e.g. you use a factory contract).

:::

## Chain Types

We can load protobuf message definitions to allow support for specific Cosmos zones under `network.chaintypes`. Any protobuf files that are required for the network (these end in `.proto`) should be imported. For example, you can find Osmosis' protobuf definitions [here](https://buf.build/osmosis-labs/osmosis/tree/main:osmosis)

You can reference a chaintypes file for Cosmos like so (this is for Stargaze):

```ts
{
  network: {
    ...,
    chaintypes: new Map([
      [
        "cosmos.slashing.v1beta1",
        {
          file: "./proto/cosmos/slashing/v1beta1/tx.proto",
          messages: ["MsgUnjail"],
        },
      ],
      [
        "cosmos.gov.v1beta1",
        {
          file: "./proto/cosmos/gov/v1beta1/tx.proto",
          messages: ["MsgVoteWeighted"],
        },
      ],
      [
        "cosmos.gov.v1beta1.gov",
        {
          file: "./proto/cosmos/gov/v1beta1/gov.proto",
          messages: ["WeightedVoteOption"],
        },
      ],
      [
        "publicawesome.stargaze.claim.v1beta1",
        {
          file: "./proto/stargaze/claim/v1beta1/tx.proto",
          messages: ["MsgInitialClaim"],
        },
      ],
    ]),
  }
}
```

:::details Legacy YAML Chain types

```yml
network:
  ...
  chainTypes: # This is a beta feature that allows support for any Cosmos zone by importing the correct protobuf messages
    cosmos.slashing.v1beta1:
      file: "./proto/cosmos/slashing/v1beta1/tx.proto"
      messages:
        - "MsgUnjail"
    cosmos.gov.v1beta1:
      file: "./proto/cosmos/gov/v1beta1/tx.proto"
      messages:
        - "MsgVoteWeighted"
    cosmos.gov.v1beta1.gov: # Key is not used, it matches the one above and is inferred from the file
      file: "./proto/cosmos/gov/v1beta1/gov.proto"
      messages:
        - "WeightedVoteOption"
    publicawesome.stargaze.claim.v1beta1: # Key is not used, it matches the one above and is inferred from the file
      file: "./proto/stargaze/claim/v1beta1/tx.proto"
      messages:
        - "MsgInitialClaim"
```

:::

::: info If you have more than one file with the same namespace you can use a different key. The key is only used as a fallback if the proto file doesn't specify a namespace.
:::

Our [starter repo has chaintypes for popular Cosmos chains](https://github.com/subquery/cosmos-subql-starter/blob/stargaze-1/project.yaml#L23) already added under a branch for each chain. Additionally see [Tested and Supported networks](#tested-and-supported-networks).

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

::: tip Indexing chains that have skipped blocks
Some Cosmos chains, like Juno, have hard forks that intentionally skip blocks. To handle this situation, you should use the bypass blocks feature and connect to different RPC endpoints as required. For example, on Juno, block 2578098 represents a hard fork, if you want to index data before this block:

1. Find a RPC endpoint that provides archival data for blocks before 2578098
2. Set bypass blocks to `bypassBlocks: []`
3. Index data up to block 2578098, you'll notice SubQuery will stop there because most RPC endpoints only have one set of data
4. Without clearing the database, change the RPC endpoint to a new endpoint that has blocks after 2578098
5. Continue indexing

:::
