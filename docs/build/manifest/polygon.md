# Polygon Manifest File

::: warning Important
We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Handler`) for Polygon. Since Polygon is a layer-2 scaling solution, we can use the core Ethereum framework to index it.
:::

The Manifest `project.yaml` file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data. It clearly indicates where we are indexing data from, and to what on chain events we are subscribing to.

The Manifest can be in either YAML or JSON format. In this document, we will use YAML in all the examples.

Below is a standard example of a basic Polygon `project.yaml`.

```yml
specVersion: "1.0.0"

name: "polygon-subql-starter"
version: "0.0.1"
runner:
  node:
    name: "@subql/node-ethereum"
    version: "*"
  query:
    name: "@subql/query"
    version: "*"
description: "This project can be use as a starting point for developing your new Polygon SubQuery project"
repository: "https://github.com/subquery/ethereum-subql-starter"

schema:
  file: "./schema.graphql"

network:
  # chainId is the EVM Chain ID, for Polygon this is 137
  # https://chainlist.org/chain/137
  chainId: "137"
  # This endpoint must be a public non-pruned archive node
  # We recommend providing more than one endpoint for improved reliability, performance, and uptime
  # Public nodes may be rate limited, which can affect indexing speed
  # When developing your project we suggest getting a private API key
  # You can get them from OnFinality for free https://app.onfinality.io
  # https://documentation.onfinality.io/support/the-enhanced-api-service
  endpoint: ["https://polygon.api.onfinality.io/public"]
  # Recommended to provide the HTTP endpoint of a full chain dictionary to speed up processing
  dictionary: "https://gx.api.subquery.network/sq/subquery/polygon-dictionary"

dataSources:
  - kind: ethereum/Runtime # We use ethereum runtime since Polygon is a layer-2 that is compatible
    startBlock: 3678215 # This is the block that the contract was deployed on
    options:
      # Must be a key of assets
      abi: erc20
      address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619" # This is the contract address for wrapped ether https://polygonscan.com/address/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619
    assets:
      erc20:
        file: "erc20.abi.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleTransaction
          kind: ethereum/TransactionHandler # We use ethereum handlers since Polygon is a layer-2 that is compatible
          filter:
            ## The function can either be the function fragment or signature
            # function: '0x095ea7b3'
            # function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
            function: approve(address spender, uint256 rawAmount)
        - handler: handleLog
          kind: ethereum/LogHandler # We use ethereum handlers since Polygon is a layer-2 that is compatible
          filter:
            topics:
              ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
              - Transfer(address indexed from, address indexed to, uint256 amount)
              # address: "0x60781C2586D68229fde47564546784ab3fACA982"
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

The `chainId` is the network identifier of the blockchain. Examples in Polygon is `137` for Polygon mainnet and `8001` for Polygon Mumbai. See https://chainlist.org/chain/137

Additionally you will need to update the `endpoint`. This defines the wss endpoint of the blockchain to be indexed - **this must be a full archive node**. This property can be a string or an array of strings (e.g. `endpoint: ['rpc1.endpoint.com', 'rpc2.endpoint.com']`). We suggest providing an array of endpoints as it has the following benefits:

- Increased speed - When enabled with [worker threads](../../run_publish/references.md#w---workers), RPC calls are distributed and parallelised among RPC providers. Historically, RPC latency is often the limiting factor with SubQuery.
- Increased reliability - If an endpoint goes offline, SubQuery will automatically switch to other RPC providers to continue indexing without interruption.
- Reduced load on RPC providers - Indexing is a computationally expensive process on RPC providers, by distributing requests among RPC providers you are lowering the chance that your project will be rate limited.

Public nodes may be rate limited which can affect indexing speed, when developing your project we suggest getting a private API key from a professional RPC provider like [OnFinality](https://onfinality.io/networks/polygon).

| Field            | Type   | Description                                                                                                                                                                              |
| ---------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **chainId**      | String | A network identifier for the blockchain                                                                                                                                                  |
| **endpoint**     | String | Defines the endpoint of the blockchain to be indexed - **This must be a full archive node**.                                                                                             |
| **port**         | Number | Optional port number on the `endpoint` to connect to                                                                                                                                     |
| **dictionary**   | String | It is suggested to provide the HTTP endpoint of a full chain dictionary to speed up processing - read [how a SubQuery Dictionary works](../../academy/tutorials_examples/dictionary.md). |
| **bypassBlocks** | Array  | Bypasses stated block numbers, the values can be a `range`(e.g. `"10- 50"`) or `integer`, see [Bypass Blocks](#bypass-blocks)                                                            |

### Runner Spec

| Field     | Type                                    | Description                                |
| --------- | --------------------------------------- | ------------------------------------------ |
| **node**  | [Runner node spec](#runner-node-spec)   | Describe the node service use for indexing |
| **query** | [Runner query spec](#runner-query-spec) | Describe the query service                 |

### Runner Node Spec

| Field       | Type   | Description                                                                                                                                                                                                          |
| ----------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name**    | String | `@subql/node-ethereum` _We use the Ethereum node package for Polygon since it is compatible with the Ethereum framework_                                                                                             |
| **version** | String | Version of the indexer Node service, it must follow the [SEMVER](https://semver.org/) rules or `latest`, you can also find available versions in subquery SDK [releases](https://github.com/subquery/subql/releases) |

### Runner Query Spec

| Field       | Type   | Description                                                                                                                                                                                      |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **name**    | String | `@subql/query`                                                                                                                                                                                   |
| **version** | String | Version of the Query service, available versions can be found [here](https://github.com/subquery/subql/blob/main/packages/query/CHANGELOG.md), it also must follow the SEMVER rules or `latest`. |

### Datasource Spec

Defines the data that will be filtered and extracted and the location of the mapping function handler for the data transformation to be applied.

| Field          | Type         | Description                                                                                                                                |
| -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **kind**       | string       | [ethereum/Runtime](#data-sources-and-mapping) _We use the Ethereum runtime for Polygon since it is compatible with the Ethereum framework_ |
| **startBlock** | Integer      | This changes your indexing start block, set this higher to skip initial blocks with less data                                              |
| **mapping**    | Mapping Spec |                                                                                                                                            |

### Mapping Spec

| Field                  | Type                         | Description                                                                                                                     |
| ---------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **handlers & filters** | Default handlers and filters | List all the [mapping functions](../mapping/polygon.md) and their corresponding handler types, with additional mapping filters. |

## Data Sources and Mapping

In this section, we will talk about the default Polygon runtime and its mapping. Here is an example:

```yml
dataSources:
  - kind: ethereum/Runtime # We use ethereum runtime since Polygon is a layer-2 that is compatible
    startBlock: 3678215 # This is the block that the contract was deployed on
    options:
      # Must be a key of assets
      abi: erc20
      address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619" # This is the contract address for wrapped ether https://polygonscan.com/address/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619
    assets:
      erc20:
        file: "erc20.abi.json"
    mapping:
      file: "./dist/index.js"
      handlers:
      ...
```

### Mapping Handlers and Filters

The following table explains filters supported by different handlers.

**Your SubQuery project will be much more efficient when you only use `TransactionHandler` or `LogHandler` handlers with appropriate mapping filters (e.g. NOT a `BlockHandler`).**

| Handler                                                                  | Supported filter                                                                                    |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| [ethereum/BlockHandler](../mapping/polygon.md#block-handler)             | `modulo`, `timestamp`                                                                               |
| [ethereum/TransactionHandler](../mapping/polygon.md#transaction-handler) | `function` filters (either be the function fragment or signature), `from` (address), `to` (address) |
| [ethereum/LogHandler](../mapping/polygon.md#log-handler)                 | `topics` filters, and `address`                                                                     |

Default runtime mapping filters are an extremely useful feature to decide what block, event, or extrinsic will trigger a mapping handler.

Only incoming data that satisfies the filter conditions will be processed by the mapping functions. Mapping filters are optional but are highly recommended as they significantly reduce the amount of data processed by your SubQuery project and will improve indexing performance.

The `modulo` filter allows handling every N blocks, which is useful if you want to group or calculate data at a set interval. The following example shows how to use this filter.

```yml
filter:
  modulo: 50 # Index every 50 blocks: 0, 50, 100, 150....
```

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
