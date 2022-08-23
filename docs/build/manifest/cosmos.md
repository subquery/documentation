# Cosmos Manifest File

The Manifest `project.yaml` file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data. It clearly indicates where we are indexing data from, and to what on chain events we are subscribing to.

The Manifest can be in either YAML or JSON format. In this document, we will use YAML in all the examples.

Below is a standard example of a basic `project.yaml`.

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
  # Must be a non-pruned archive node
  endpoint: https://rpc.juno-1.api.onfinality.io
  # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing
  dictionary: https://api.subquery.network/sq/subquery/cosmos-juno-1-dictionary
dataSources:
  - kind: cosmos/Runtime
    startBlock: 3062001 # first block on juno-1
    #chainTypes: # This is a beta feature that allows support for any Cosmos chain by importing the correct protobuf messages
    #  cosmos.slashing.v1beta1:
    #    file: "./proto/cosmos/slashing/v1beta1/tx.proto"
    #    messages:
    #     - "MsgUnjail"
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

### Tested and Supported networks

We expect that SubQuery will work with all Cosmos chains with the import of the correct protobuf definitions. We've tested this with the following chains, and feel free to make a PR to not support for other chains when you are able to test and confirm them.

| Network Name   | Endpoint | Dictionary Endpoint | Protobufs |
| -------------- | -------------------------------------------------- | ----------------------------------------------------------------------- | --- |
| Juno       | `rpc.juno-1.api.onfinality.io`       | `https://api.subquery.network/sq/subquery/cosmos-juno-dictionary` | None |
| Stargaze      | `http://nodes.stargaze-1.publicawesome.dev:26657/`      | `https://api.subquery.network/sq/subquery/cosmos-stargaze-dictionary`         | [Example](https://github.com/subquery/cosmos-subql-starter/blob/stargaze-1/project.yaml#L23) |
| Cosmos Hub | `https://rpc.cosmos.network` | `https://api.subquery.network/sq/subquery/cosmos-hub-dictionary`    | [Example](https://github.com/subquery/cosmos-subql-starter/blob/cosmoshub-4/project.yaml#L22) |
| Fetch Hub          | `https://rpc-fetchhub.fetch.ai`          | `https://api.subquery.network/sq/subquery/cosmos-fetch-ai-dictionary`  | [Example](https://github.com/subquery/cosmos-subql-starter/blob/fetchhub-4/project.yaml) |

## Overview

### Top Level Spec

| Field           | Type                                                        | Description                                         |
| --------------- | ----------------------------------------------------------- | --------------------------------------------------- |
| **specVersion** | String                                                      | The spec version of the manifest file               |
| **name**        | String                                                      | Name of your project                                |
| **version**     | String                                                      | Version of your project                             |
| **description** | String                                                      | Discription of your project                         |
| **repository**  | String                                                      | Git repository address of your project              |
| **schema**      | [Schema Spec](manifest.md#schema-spec)                      | The location of your GraphQL schema file            |
| **network**     | [Network Spec](manifest.md#network-spec)                    | Detail of the network to be indexed                 |
| **dataSources** | [DataSource Spec](manifest.md#datasource-spec)              | The datasource to your project                      |
| **templates**   | [Templates Spec](dynamicdatasources.md#the-templates-field) | Allows creating new datasources from this templates |
| **runner**      | [Runner Spec](manifest.md#runner-spec)                      | Runner specs info                                   |

### Schema Spec

| Field    | Type   | Description                              |
| -------- | ------ | ---------------------------------------- |
| **file** | String | The location of your GraphQL schema file |

### Network Spec

If you start your project by using the `subql init` command, you'll generally receive a starter project with the correct network settings. If you are changing the target chain of an existing project, you'll need to edit the [Network Spec](manifest.md#network-spec) section of this manifest.

The `chainId` is the network identifier of the blockchain. Examples in Cosmos might be `juno-1`.

Additionally you will need to update the `endpoint`. This defines the wss endpoint of the blockchain to be indexed - **this must be a full archive node**. You can retrieve endpoints for all parachains for free from [OnFinality](https://app.onfinality.io)

| Field          | Type   | Description                                                                                                                                                                                                |
| -------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **chainId**    | String | A network identifier for the blockchain                                                                                                                                                                    |
| **endpoint**   | String | Defines the wss or ws endpoint of the blockchain to be indexed - **This must be a full archive node**. You can retrieve endpoints for all parachains for free from [OnFinality](https://app.onfinality.io) |
| **port**       | Number | Optional port number on the `endpoint` to connect to                                                                                                                                                       |
| **dictionary** | String | It is suggested to provide the HTTP endpoint of a full chain dictionary to speed up processing - read [how a SubQuery Dictionary works](../academy/tutorials_examples/dictionary.md).                      |

### Runner Spec

| Field     | Type                                               | Description                                |
| --------- | -------------------------------------------------- | ------------------------------------------ |
| **node**  | [Runner node spec](manifest.md#runner-node-spec)   | Describe the node service use for indexing |
| **query** | [Runner query spec](manifest.md#runner-query-spec) | Describe the query service                 |

### Runner Node Spec

| Field       | Type   | Description                                                                                                                                                                                                          |
| ----------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name**    | String | `@subql/node-cosmos`                                                                                                                                                                                                 |
| **version** | String | Version of the indexer Node service, it must follow the [SEMVER](https://semver.org/) rules or `latest`, you can also find available versions in subquery SDK [releases](https://github.com/subquery/subql/releases) |

### Runner Query Spec

| Field       | Type   | Description                                                                                                                                                                                      |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **name**    | String | We currently support `@subql/query`                                                                                                                                                              |
| **version** | String | Version of the Query service, available versions can be found [here](https://github.com/subquery/subql/blob/main/packages/query/CHANGELOG.md), it also must follow the SEMVER rules or `latest`. |

### Datasource Spec

Defines the data that will be filtered and extracted and the location of the mapping function handler for the data transformation to be applied.

| Field          | Type         | Description                                                                                   |
| -------------- | ------------ | --------------------------------------------------------------------------------------------- |
| **kind**       | String       | [cosmos/Runtime](#data-sources-and-mapping)                                                   |
| **startBlock** | Integer      | This changes your indexing start block, set this higher to skip initial blocks with less data |
| **mapping**    | Mapping Spec |                                                                                               |

### Mapping Spec

| Field                  | Type                                                                              | Description                                                                                                            |
| ---------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **handlers & filters** | Default handlers and filters, <br />[Custom handlers and filters](#custom-chains) | List all the [mapping functions](./mapping/polkadot.md) and their corresponding handler types, with additional mapping filters. |

## Data Sources and Mapping

In this section, we will talk about the default Cosmos runtime and its mapping. Here is an example:

```yml
dataSources:
  - kind: cosmos/Runtime # Indicates that this is default runtime
    startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data
    mapping:
      file: dist/index.js # Entry path for this mapping
```

### Mapping handlers and Filters

The following table explains filters supported by different handlers.

**Your SubQuery project will be much more efficient when you only use `TransactionHandler`, `MessageHandler`, or `EventHandler` handlers with appropriate mapping filters (e.g. NOT a `BlockHandler`).**

| Handler                                                       | Supported filter          |
| ------------------------------------------------------------- | ------------------------- |
| [cosmos/BlockHandler](./mapping/polkadot.md#block-handler)             | `modulo`                  |
| [cosmos/TransactionHandler](./mapping/polkadot.md#transaction-handler) | No filters                |
| [cosmos/MessageHandler](./mapping/polkadot.md#message-handler)         | `type`, `values`\*        |
| [cosmos/EventHandler](./mapping/polkadot.md#event-handler)             | `type`, `messageFilter`\* |

Default runtime mapping filters are an extremely useful feature to decide what block, event, or extrinsic will trigger a mapping handler.

Only incoming data that satisfy the filter conditions will be processed by the mapping functions. Mapping filters are optional but are highly recommended as they significantly reduce the amount of data processed by your SubQuery project and will improve indexing performance.

```yml
# Example filter from EventHandler
filter:
  type: execute
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
  values: # A set of key/value pairs that are present in the message data
    contract: "juno1v99ehkuetkpf0yxdry8ce92yeqaeaa7lyxr2aagkesrw67wcsn8qxpxay0"
```

The `modulo` filter allows handling every N blocks, which is useful if you want to group or calculate data at a set interval. The following example shows how to use this filter.

```yml
filter:
  modulo: 50 # Index every 50 blocks: 0, 50, 100, 150....
```

## Custom Chains

We can load protobuf message definitions to allow support for specific to Cosmos chains under `network.chaintypes`. If most are just using Wasm this should be already included.

You can reference a chaintypes file for Cosmos like so (this is for Stargaze):

```yml
chainTypes: # This is a beta feature that allows support for any Cosmos chain by importing the correct protobuf messages
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

Our [starter repo has chaintypes for popular Cosmos chains](https://github.com/subquery/cosmos-subql-starter/blob/stargaze-1/project.yaml#L23) already added under a branch for each chain. Additionally see [Tested and Supported networks](#tested-and-supported-networks).

## Validating

You can validate your project manifest by running `subql validate`. This will check that it has the correct structure, valid values where possible and provide useful feedback as to where any fixes should be made.
