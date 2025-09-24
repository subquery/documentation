# Algorand Manifest File

The Manifest `project.ts` file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data. This is the specific details for Algorand, please refer to the [top level manifest documentation](../introduction.md) for more general details.

Below is a standard example of a basic Algorand `project.ts`.

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
| [algorand/BlockHandler](../../mapping-functions/mapping/algorand.md#block-handler)             | `modulo`, `timestamp`                                                                                                       |
| [algorand/TransactionHandler](../../mapping-functions/mapping/algorand.md#transaction-handler) | `txType`,`sender`, `receiver`, `applicationId`, `applicationArgs`, `nonParticipant`, `assetId`, `newFreezeStatus` `address` |

Default runtime mapping filters are an extremely useful feature to decide what block, event, or transaction will trigger a mapping handler.

Only incoming data that satisfies the filter conditions will be processed by the mapping functions. Mapping filters are optional but are highly recommended as they significantly reduce the amount of data processed by your SubQuery project and will improve indexing performance.


`txType` is the enum for the type of transaction. You can see a [list of valid enum values here](https://github.com/algorand/js-algorand-sdk/blob/5eb7b4ffe5fcb46812785fdc79e8a7edb78b084f/src/types/transactions/base.ts#L6).

`applicationArgs` are not currently implemented with the dictionary. You can still use the dictionary and the filter will work, but it will not improve indexing speed like other filters.

`modulo` and `timestamp` are common block filters and are described in the [overview](../introduction#block-filters)

::: info Simplifying your Project Manifest for a large number contract addresses

If your project has the same handlers for multiple versions of the same type of contract your project manifest can get quite repetitive. e.g you want to index the transfers for many similar ERC20 contracts, there are [ways to better handle a large static list of contract addresses](../../optimisation.md#simplifying-the-project-manifest).

Note that there is also [dynamic datasources](../../dynamic-datasources.md) for when your list of addresses is dynamic (e.g. you use a factory contract).

:::
