# NEAR Manifest File

The Manifest `project.ts` file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data. This is the specific details for NEAR, please refer to the [top level manifest documentation](../introduction.md) for more general details.

Below is a standard example of a basic Near `project.ts`.

```ts
import {
  NearDatasourceKind,
  NearHandlerKind,
  NearProject,
} from "@subql/types-near";

const project: NearProject = {
  // This project can be use as a starting point for developing your new NEAR SubQuery project
  specVersion: "1.0.0",
  name: "near-subql-starter",
  version: "0.0.1",
  runner: {
    node: {
      name: "@subql/node-near",
      version: "*",
    },
    query: {
      name: "@subql/query",
      version: "*",
    },
  },
  description:
    "This project can be use as a starting point for developing your new NEAR SubQuery project",
  repository: "https://github.com/subquery/near-subql-starter",
  schema: {
    // This endpoint must be a public non-pruned archive node
    // We recommend providing more than one endpoint for improved reliability, performance, and uptime
    // Public nodes may be rate limited, which can affect indexing speed
    // When developing your project we suggest getting a private API key from a commercial provider
    file: "./schema.graphql",
  },
  network: {
    chainId: "mainnet",
    endpoint: ["https://archival-rpc.mainnet.near.org"],
    // Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing
    dictionary: "https://api.subquery.network/sq/subquery/near-dictionary",
    // This is a missing block from the NEAR mainnet chain that we are skipping
    bypassBlocks: [81003306],
  },
  dataSources: [
    {
      kind: NearDatasourceKind.Runtime,
      // You can set any start block you want here. This block was when the sweat_welcome.near address was created
      startBlock: 80980000,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          // Using block handlers slows your project down as they can be executed with each and every block. Only use if you need to
          // {
          //   handler: "handleBlock",
          //   kind: "near/BlockHandler",
          //   filter: {
          //     modulo: 10,
          //   },
          // },
          {
            handler: "handleTransaction",
            kind: NearHandlerKind.Transaction,
            filter: {
              sender: "sweat_welcome.near",
              receiver: "token.sweat",
            },
          },
          {
            handler: "handleAction",
            kind: NearHandlerKind.Action,
            filter: {
              type: "FunctionCall",
              methodName: "storage_deposit",
              receiver: "token.sweat",
            },
          },
          // Some other filter examples
          // {
          //   handler: "handleAction",
          //   kind: NearHandlerKind.Action,
          //   filter: {
          //     type: "DeleteAccount",
          //     beneficiaryId: "",
          //   },
          // },
          // {
          //   handler: "handleAction",
          //   kind: NearHandlerKind.Action,
          //   filter: {
          //     type: "AddKey",
          //     publicKey: "",
          //     accessKey: "",
          //   },
          // },
          // {
          //   handler: "handleAction",
          //   kind: NearHandlerKind.Action,
          //   filter: {
          //     type: "DeleteKey",
          //     publicKey: "",
          //   },
          // },
          // {
          //   handler: "handleAction",
          //   kind: NearHandlerKind.Action,
          //   filter: {
          //     type: "Stake",
          //     publicKey: "",
          //   },
          // },
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

### Mapping Spec

| Field                  | Type                         | Description                                                                                                                  |
| ---------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **handlers & filters** | Default handlers and filters | List all the [mapping functions](../../mapping/near) and their corresponding handler types, with additional mapping filters. |

## Data Sources and Mapping

In this section, we will talk about the default NEAR runtime and its mapping. Here is an example:

```ts
{
  ...
  dataSources: [
    {
      kind: NearDataSourceKind.Runtime, // Indicates that this is default runtime
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

**Your SubQuery project will be much more efficient when you only use `TransactionHandler` or `ActionHandler` handlers with appropriate mapping filters (e.g. NOT a `BlockHandler`).**

| Handler                                                           | Supported filter                                                                              |
| ----------------------------------------------------------------- |-----------------------------------------------------------------------------------------------|
| [near/BlockHandler](../../mapping/near#block-handler)             | `modulo`, `timestamp`                                                                         |
| [near/TransactionHandler](../../mapping/near#transaction-handler) | `sender`, `receiver`                                                                          |
| [near/ReceiptHandler](../../mapping/near#receipt-handler)          | `sender`, `receiver`, `signer`                                                                |
| [near/ActionHandler](../../mapping/near#message-handler)          | `type`, `sender`, `receiver`, `methodName`, `args`, `publicKey`, `accessKey`, `beneficiaryId` |

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

`modulo` and `timestamp` are common block filters and are described in the [overview](../introduction#block-filters)

::: info Simplifying your Project Manifest for a large number contract addresses

If your project has the same handlers for multiple versions of the same type of contract your project manifest can get quite repetitive. e.g you want to index the transfers for many similar ERC20 contracts, there are [ways to better handle a large static list of contract addresses](../../optimisation.md#simplifying-the-project-manifest).

Note that there is also [dynamic datasources](../../dynamic-datasources.md) for when your list of addresses is dynamic (e.g. you use a factory contract).

:::

### Action Types

There are several types of actions as defined [here](https://github.com/subquery/subql-near/blob/main/packages/types/src/interfaces.ts#L91)

## Bypass Blocks

Bypass Blocks allow you to skip the stated blocks, this is useful when there are erroneous blocks in the chain or when a chain skips a block after an outage or a hard fork. It accepts both a `range` or single `integer` entry in the array.

When declaring a `range` use an string in the format of `"start - end"`. Both start and end are inclusive, e.g. a range of `"100-102"` will skip blocks `100`, `101`, and `102`.

```ts
{
  network: {
    bypassBlocks: [1, 2, 3, "105-200", 290];
  }
}
```
