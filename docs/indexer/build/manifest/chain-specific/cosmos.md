# Cosmos Manifest File

The manifest project.ts file is the entry point of your project and defines how SubQuery will index and transform chain data. For Cosmos-specific details, please refer to the [top level manifest documentation](../introduction.md) for more general information.

Below is a standard example of a basic Cosmos `project.ts`.

```ts
import {
  CosmosDatasourceKind,
  CosmosHandlerKind,
  CosmosProject,
} from "@subql/types-cosmos";

// Can expand the Datasource processor types via the generic param
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

## Tested and Supported networks

We expect that SubQuery will work with all Ethermint and CosmWasm Cosmos chains with the import of the correct protobuf definitions. We have tested this with the [chains in the cosmos-subql-starter repository](https://github.com/subquery/cosmos-subql-starter). However, please feel free to make a pull request to non-supported chains when you are able to test and confirm them.

## Overview

### Network Spec

Cosmos follows the same network spec as other SubQuery projects but there is also a `chainTypes` field. This is for importing protobuf definitions to allow support for specific Cosmos zones. See [Chain Types](#chain-types) for more details.

| Field            | Type                                               | Description                                                                                                                                                                              |
| ---------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **chainId**      | String                                             | A network identifier for the blockchain                                                                                                                                                  |
| **endpoint**     | String or String[]                                 | Defines the endpoint of the blockchain to be indexed, this can be a string or an array of endpoints - **This must be a full archive node**.                                              |
| **dictionary**   | String                                             | It is suggested to provide the HTTP endpoint of a full chain dictionary to speed up processing - read [how a SubQuery Dictionary works](../../../academy/tutorials_examples/dictionary.md). |
| **bypassBlocks** | Array                                              | Bypasses stated block numbers, the values can be a `range`(e.g. `"10- 50"`) or `integer`, see [Bypass Blocks](#bypass-blocks)                                                            |
| **chainTypes**   | Map\<String, { file: String, messages: String[] \> | References to protobuf files that are used to decode block content, this should include protobufs for any messages or events that you wish to decode, see [ChainTypes](#chain-types)     |

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
| [cosmos/BlockHandler](../../mapping/cosmos#block-handler)             | `modulo`                              |
| [cosmos/TransactionHandler](../../mapping/cosmos#transaction-handler) | `includeFailedTx`                     |
| [cosmos/MessageHandler](../../mapping/cosmos#message-handler)         | `includeFailedTx`, `type`, `values`   |
| [cosmos/EventHandler](../../mapping/cosmos#event-handler)             | `type`, `messageFilter`, `attributes` |

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

`modulo` and `timestamp` are common block filters and are described in the [overview](../introduction#block-filters)

::: info Simplifying your Project Manifest for a large number contract addresses

If your project has the same handlers for multiple versions of the same type of contract your project manifest can get quite repetitive. e.g you want to index the transfers for many similar ERC20 contracts, there are [ways to better handle a large static list of contract addresses](../../optimisation.md#simplifying-the-project-manifest).

Note that there is also [dynamic datasources](../../dynamic-datasources.md) for when your list of addresses is dynamic (e.g. you use a factory contract).

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
