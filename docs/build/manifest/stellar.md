# Stellar & Soroban Manifest File [Beta]

The Manifest `project.yaml` file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data. It clearly indicates where we are indexing data from, and to what on chain events we are subscribing to.

The Manifest can be in either YAML or JSON format. In this document, we will use YAML in all the examples.

Below is a standard example of a basic Optimism `project.yaml`.

```yml
specVersion: "1.0.0"

name: "soroban-subql-starter"
version: "0.0.1"
runner:
  node:
    name: "@subql/node-stellar"
    version: "*"
  query:
    name: "@subql/query"
    version: "*"
description: "This project can be use as a starting point for developing your new Stellar Soroban Future Network SubQuery project"
repository: "https://github.com/subquery/stellar-subql-starter"

schema:
  file: "./schema.graphql"

network:
  # Stellar and Soroban uses the network passphrase as the chainId
  # 'Public Global Stellar Network ; September 2015' for mainnet
  # 'Test SDF Future Network ; October 2022' for Future Network
  chainId: "Test SDF Future Network ; October 2022"
  # This endpoint must be a public non-pruned archive node
  # We recommend providing more than one endpoint for improved reliability, performance, and uptime
  # Public nodes may be rate limited, which can affect indexing speed
  endpoint: ["https://horizon-futurenet.stellar.org:443"]
  sorobanEndpoint: "https://rpc-futurenet.stellar.org"
  # Recommended to provide the HTTP endpoint of a full chain dictionary to speed up processing
  # dictionary: "https://gx.api.subquery.network/sq/subquery/eth-dictionary"

dataSources:
  - kind: stellar/Runtime
    startBlock: 270000 # This is the start block from which you begin indexing
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleTransaction
          kind: soroban/TransactionHandler
           filter:
            account: "GAKNXHJ5PCZYFIBNBWB4RCQHH6GDEO7Z334N74BOQUQCHKOURQEPMXCH"
        - handler: handleOperation
          kind: stellar/OperationHandler
          filter:
            type: "payment"
        - handler: handleCredit
          kind: stellar/EffectHandler
          filter:
            type: "account_credited"
        - handler: handleEvent
          kind: stellar/EventHandler
          filter:
            # contractId: "" # You can optionally specify a smart contract address here
            topics:
              - "transfer" # Topic signature(s) for the events, there can be up to 4
```

## Overview

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

If you start your project by using the `subql init` command, you'll generally receive a starter project with the correct network settings. If you are changing the target chain of an existing project, you'll need to edit the [Network Spec](#network-spec) section of this manifest.

The `chainId` is the network identifier of the blockchain, [Stellar and Soroban uses the network passphrase](https://developers.stellar.org/docs/encyclopedia/network-passphrases). Examples in Stellar are `Public Global Stellar Network ; September 2015` for mainnet and `Test SDF Future Network ; October 2022` for Future Network.

A unique aspect of Stellar's Soroban network is that there is an additional seperate RPC for the Soroban smart contract layer. If you are indexing using the `soroban/TransactionHandler` or `soroban/EventHandler`, you will need to provide an HTTP RPC Soroban endpoint under the `sorobanEndpoint` property - **you will want archive nodes with high rate limits if you want to index large amounts of historical data**. This only accepts a single endpoint.

You will need to update the `endpoint`. This defines the HTTP RPC endpoint of the blockchain to be indexed - **you will want archive nodes with high rate limits if you want to index large amounts of historical data**. This property can be a string or an array of strings (e.g. `endpoint: ['rpc1.endpoint.com', 'rpc2.endpoint.com']`). We suggest providing an array of endpoints as it has the following benefits:

- Increased speed - When enabled with [worker threads](../../run_publish/references.md#w---workers), RPC calls are distributed and parallelised among RPC providers. Historically, RPC latency is often the limiting factor with SubQuery.
- Increased reliability - If an endpoint goes offline, SubQuery will automatically switch to other RPC providers to continue indexing without interruption.
- Reduced load on RPC providers - Indexing is a computationally expensive process on RPC providers, by distributing requests among RPC providers you are lowering the chance that your project will be rate limited.

Public nodes may be rate limited which can affect indexing speed, when developing your project we suggest getting a private API key from a professional RPC provider.

| Field               | Type               | Description                                                                                                                                                                              |
| ------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **chainId**         | String             | A network identifier for the blockchain, [Stellar and Soroban uses the network passphrase](https://developers.stellar.org/docs/encyclopedia/network-passphrases)                         |
| **endpoint**        | String or String[] | Defines the endpoint of the blockchain to be indexed - **you will want archive nodes with high rate limits if you want to index large amounts of historical datae**.                     |
| **sorobanEndpoint** | String             | Defines the soroban RPC endpoint - **you will want archive nodes with high rate limits if you want to index large amounts of historical data**.                                          |
| **port**            | Number             | Optional port number on the `endpoint` to connect to                                                                                                                                     |
| **dictionary**      | String             | It is suggested to provide the HTTP endpoint of a full chain dictionary to speed up processing - read [how a SubQuery Dictionary works](../../academy/tutorials_examples/dictionary.md). |
| **bypassBlocks**    | Array              | Bypasses stated block numbers, the values can be a `range`(e.g. `"10- 50"`) or `integer`, see [Bypass Blocks](#bypass-blocks)                                                            |

### Runner Spec

| Field     | Type                                    | Description                                |
| --------- | --------------------------------------- | ------------------------------------------ |
| **node**  | [Runner node spec](#runner-node-spec)   | Describe the node service use for indexing |
| **query** | [Runner query spec](#runner-query-spec) | Describe the query service                 |

### Runner Node Spec

| Field       | Type                                        | Description                                                                                                                                                                                                          |
| ----------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name**    | String                                      | `@subql/node-stellar`                                                                                                                                                                                                |
| **version** | String                                      | Version of the indexer Node service, it must follow the [SEMVER](https://semver.org/) rules or `latest`, you can also find available versions in subquery SDK [releases](https://github.com/subquery/subql/releases) |
| **options** | [Runner Node Options](#runner-node-options) | Runner specific options for how to run your project. These will have an impact on the data your project produces. CLI flags can be used to override these.                                                           |

### Runner Query Spec

| Field       | Type   | Description                                                                                                                                                                                      |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **name**    | String | `@subql/query`                                                                                                                                                                                   |
| **version** | String | Version of the Query service, available versions can be found [here](https://github.com/subquery/subql/blob/main/packages/query/CHANGELOG.md), it also must follow the SEMVER rules or `latest`. |

### Runner Node Options

| Field                 | v1.0.0 (default) | Description                                                                                                                                                                            |
| --------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **historical**        | Boolean (true)   | Historical indexing allows you to query the state at a specific block height. e.g A users balance in the past.                                                                         |
| **unfinalizedBlocks** | Boolean (false)  | If enabled unfinalized blocks will be indexed, when a fork is detected the project will be reindexed from the fork. Requires historical.                                               |
| **unsafe**            | Boolean (false)  | Removes all sandbox restrictions and allows access to all inbuilt node packages as well as being able to make network requests. WARNING: this can make your project non-deterministic. |

### Datasource Spec

Defines the data that will be filtered and extracted and the location of the mapping function handler for the data transformation to be applied.

| Field          | Type         | Description                                                                                                                               |
| -------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **kind**       | string       | [stellar/Runtime](#data-sources-and-mapping)                                                                                              |
| **startBlock** | Integer      | This changes your indexing start block (called a Ledger on Stellar), set this higher to skip initial blocks/ledgers with no relevant data |
| **mapping**    | Mapping Spec |                                                                                                                                           |

### Mapping Spec

| Field                  | Type                         | Description                                                                                                                     |
| ---------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **handlers & filters** | Default handlers and filters | List all the [mapping functions](../mapping/stellar.md) and their corresponding handler types, with additional mapping filters. |

## Data Sources and Mapping

In this section, we will talk about the default Stellar runtime and its mapping. Here is an example:

```yml
dataSources:
  - kind: stellar/Runtime
    startBlock: 270000 # This is the start block from which you begin indexing
    mapping:
      file: "./dist/index.js"
      handlers:
      ...
```

### Mapping Handlers and Filters

The following table explains filters supported by different handlers.

| Handler                                                                 | Supported filter                                                                               |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [stellar/BlockHandler](../mapping/stellar.md#block-handler)             | `modulo` and `timestamp`                                                                       |
| [stellar/TransactionHandler](../mapping/stellar.md#transaction-handler) | `account` (address from)                                                                       |
| [soroban/TransactionHandler](../mapping/stellar.md#transaction-handler) | `account` (address from)                                                                       |
| [stellar/OperationHandler](../mapping/stellar.md#operation-handler)     | `type`, `sourceAccount`                                                                        |
| [stellar/EffectHandler](../mapping/stellar.md#effect-handler)           | `type`, `account` (address from)                                                               |
| [soroban/EventHandler](../mapping/stellar.md#event-handler)             | `contractId` and/or up to 4 `topics` filters applied as an array, and an optional `contractId` |

```yml
handlers:
  - handler: handleBlock
    kind: soroban/BlockHandler
  - handler: handleTransaction
    kind: soroban/TransactionHandler
    filter:
      account: "GAKNXHJ5PCZYFIBNBWB4RCQHH6GDEO7Z334N74BOQUQCHKOURQEPMXCH"
  - handler: handleOperation
    kind: stellar/OperationHandler
    filter:
      type: "payment"
  - handler: handleEffect
    kind: stellar/EffectHandler
    filter:
      type: "account_credited"
  - handler: handleEvent
    kind: soroban/EventHandler
    filter:
      # contractId: "" # You can optionally specify a smart contract address here
      topics:
        - "transfer" # Topic signature(s) for the events, there can be up to 4
```

Default runtime mapping filters are an extremely useful feature to decide what event will trigger a mapping handler.

Only incoming data that satisfies the filter conditions will be processed by the mapping functions. Mapping filters are optional but are highly recommended as they significantly reduce the amount of data processed by your SubQuery project and will improve indexing performance.

## Real-time indexing (Block Confirmations)

As indexers are an additional layer in your data processing pipeline, they can introduce a massive delay between when an on-chain event occurs and when the data is processed and able to be queried from the indexer.

SubQuery provides real time indexing of unconfirmed data directly from the RPC endpoint that solves this problem. SubQuery takes the most probabilistic data before it is confirmed to provide to the app. In the unlikely event that the data isn’t confirmed and a reorg occurs, SubQuery will automatically roll back and correct its mistakes quickly and efficiently - resulting in an insanely quick user experience for your customers.

To control this feature, please adjust the [--block-confirmations](../../run_publish/references.md#block-confirmations) command to fine tune your project and also ensure that [historic indexing](../../run_publish/references.md#disable-historical) is enabled (enabled by default)

## Bypass Blocks

Bypass Blocks allows you to skip the stated blocks, this is useful when there are erroneous blocks in the chain or when a chain skips a block after an outage or a hard fork. It accepts both a `range` or single `integer` entry in the array.

When declaring a `range` use an string in the format of `"start - end"`. Both start and end are inclusive, e.g. a range of `"100-102"` will skip blocks `100`, `101`, and `102`.

```yaml
network:
  chainId: "1"
  endpoint: "https://eth.api.onfinality.io/public"
  bypassBlocks: [1, 2, 3, "105-200", 290]
```

## Validating

You can validate your project manifest by running `subql validate`. This will check that it has the correct structure, valid values where possible and provide useful feedback as to where any fixes should be made.
