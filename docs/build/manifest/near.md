# NEAR Manifest File

The Manifest `project.yaml` file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data. It clearly indicates where we are indexing data from, and to what on chain events we are subscribing to.

The Manifest can be in either YAML or JSON format. In this document, we will use YAML in all the examples.

Below is a standard example of the legacy YAML version (`project.yaml`).

:::details Legacy YAML Manifest

```yml
specVersion: 1.0.0

name: near-subql-starter
version: 0.0.1
runner:
  node:
    name: "@subql/node-near"
    version: "*"
  query:
    name: "@subql/query"
    version: "*"
description: "This project can be use as a starting point for developing your new NEAR SubQuery project"
repository: "https://github.com/subquery/near-subql-starter"

schema:
  file: ./schema.graphql

network:
  chainId: mainnet
  # This endpoint must be a public non-pruned archive node
  # We recommend providing more than one endpoint for improved reliability, performance, and uptime
  # Public nodes may be rate limited, which can affect indexing speed
  # When developing your project we suggest getting a private API key from a commercial provider
  endpoint: ["https://archival-rpc.mainnet.near.org"]
  # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing
  dictionary: https://api.subquery.network/sq/subquery/near-dictionary
  bypassBlocks: [81003306] # This is a missing block from the NEAR mainnet chain that we are skipping
dataSources:
  - kind: near/Runtime
    startBlock: 80980000 # You can set any start block you want here. This block was when the sweat_welcome.near address was created
    mapping:
      file: "./dist/index.js"
      handlers:
        # Using block handlers slows your project down as they can be executed with each and every block. Only use if you need to
        # - handler: handleBlock
        #   kind: near/BlockHandler
        #   filter:
        #     modulo: 10
        - handler: handleTransaction
          kind: near/TransactionHandler
          filter:
            sender: sweat_welcome.near
            receiver: token.sweat
        - handler: handleAction
          kind: near/ActionHandler
          filter:
            type: FunctionCall
            methodName: storage_deposit
            receiver: token.sweat
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

The `chainId` is the network identifier of the blockchain. In NEAR, it's either `mainnet` or `testnet`.

Additionally you will need to update the `endpoint`. This defines the (HTTP or WSS) endpoint of the blockchain to be indexed - **this must be a full archive node**. This property can be a string or an array of strings (e.g. `endpoint: ['rpc1.endpoint.com', 'rpc2.endpoint.com']`). We suggest providing an array of endpoints as it has the following benefits:

- Increased speed - When enabled with [worker threads](../../run_publish/references.md#w---workers), RPC calls are distributed and parallelised among RPC providers. Historically, RPC latency is often the limiting factor with SubQuery.
- Increased reliability - If an endpoint goes offline, SubQuery will automatically switch to other RPC providers to continue indexing without interruption.
- Reduced load on RPC providers - Indexing is a computationally expensive process on RPC providers, by distributing requests among RPC providers you are lowering the chance that your project will be rate limited.

Public nodes may be rate limited which can affect indexing speed, when developing your project we suggest getting a private API key from a professional RPC provider.

| Field            | Type   | Description                                                                                                                                                                                                                                                            |
| ---------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **chainId**      | String | A network identifier for the blockchain                                                                                                                                                                                                                                |
| **endpoint**     | String | Defines the RPC endpoint of the blockchain to be indexed - **This must be a full archive node**. You can retrieve endpoints for all parachains for free from [OnFinality](https://app.onfinality.io)                                                                   |
| **port**         | Number | Optional port number on the `endpoint` to connect to                                                                                                                                                                                                                   |
| **dictionary**   | String | It is suggested to provide the HTTP endpoint of a full chain dictionary to speed up processing - read [how a SubQuery Dictionary works](../../academy/tutorials_examples/dictionary.md). For NEAR mainnet this is provided (we don't run a dictionary for the testnet) |
| **bypassBlocks** | Array  | Bypasses stated block numbers, the values can be a `range`(e.g. `"10- 50"`) or `integer`, see [Bypass Blocks](#bypass-blocks)                                                                                                                                          |

### Runner Spec

| Field     | Type                                    | Description                                |
| --------- | --------------------------------------- | ------------------------------------------ |
| **node**  | [Runner node spec](#runner-node-spec)   | Describe the node service use for indexing |
| **query** | [Runner query spec](#runner-query-spec) | Describe the query service                 |

### Runner Node Spec

| Field       | Type                                        | Description                                                                                                                                                                                                          |
| ----------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name**    | String                                      | `@subql/node-near`                                                                                                                                                                                                   |
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

| Field          | Type         | Description                                                                                   |
| -------------- | ------------ | --------------------------------------------------------------------------------------------- |
| **kind**       | String       | [near/Runtime](#data-sources-and-mapping)                                                     |
| **startBlock** | Integer      | This changes your indexing start block, set this higher to skip initial blocks with less data |
| **mapping**    | Mapping Spec |                                                                                               |

### Mapping Spec

| Field                  | Type                         | Description                                                                                                                  |
| ---------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **handlers & filters** | Default handlers and filters | List all the [mapping functions](../mapping/near.md) and their corresponding handler types, with additional mapping filters. |

## Data Sources and Mapping

In this section, we will talk about the default NEAR runtime and its mapping. Here is an example:

```yml
dataSources:
  - kind: near/Runtime # Indicates that this is default runtime
    startBlock: 9820210 # This changes your indexing start block, set this higher to skip initial blocks with less data
    mapping:
      file: dist/index.js # Entry path for this mapping
```

### Mapping Handlers and Filters

The following table explains filters supported by different handlers.

**Your SubQuery project will be much more efficient when you only use `TransactionHandler` or `ActionHandler` handlers with appropriate mapping filters (e.g. NOT a `BlockHandler`).**

| Handler                                                           | Supported filter                                                                              |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [near/BlockHandler](../mapping/near.md#block-handler)             | `modulo`, `timestamp`                                                                         |
| [near/TransactionHandler](../mapping/near.md#transaction-handler) | `sender`, `reciever`                                                                          |
| [near/ActionHandler](../mapping/near.md#message-handler)          | `type`, `sender`, `receiver`, `methodName`, 'args', 'publicKey', 'accessKey', 'beneficiaryId' |

Default runtime mapping filters are an extremely useful feature to decide what block, transaction, or action will trigger a mapping handler.

Only incoming data that satisfy the filter conditions will be processed by the mapping functions. Mapping filters are optional but are highly recommended as they significantly reduce the amount of data processed by your SubQuery project and will improve indexing performance.

```yml
# Example filter from TransactionHandler
filter:
  sender: sweat_welcome.near
  receiver: token.sweat

# Example filter from ActionHandler:
filter:
  type: FunctionCall
  methodName: 'storage_deposit'
```

The `modulo` filter allows handling every N blocks, which is useful if you want to group or calculate data at a set interval. The following example shows how to use this filter.

```yml
filter:
  modulo: 50 # Index every 50 blocks: 0, 50, 100, 150....
```

### Action Types

There are several types of actions as defined [here](https://github.com/subquery/subql-near/blob/main/packages/types/src/interfaces.ts#L91)

## Bypass Blocks

Bypass Blocks allow you to skip the stated blocks, this is useful when there are erroneous blocks in the chain or when a chain skips a block after an outage or a hard fork. It accepts both a `range` or single `integer` entry in the array.

When declaring a `range` use an string in the format of `"start - end"`. Both start and end are inclusive, e.g. a range of `"100-102"` will skip blocks `100`, `101`, and `102`.

```yaml
network:
  chainId: mainnet
  endpoint: https://archival-rpc.mainnet.near.org
  dictionary: https://api.subquery.network/sq/subquery/near-dictionary
  bypassBlocks: [1, 2, 3, "105-200", 290]
```

## Validating

You can validate your project manifest by running `subql validate`. This will check that it has the correct structure, valid values where possible and provide useful feedback as to where any fixes should be made.
