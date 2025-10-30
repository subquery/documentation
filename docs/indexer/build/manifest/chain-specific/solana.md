# Solana Manifest File

The Manifest `project.ts` file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data. This is the specific details for Solana, please refer to the [top level manifest documentation](../introduction.md) for more general details.

Below is a standard example of a basic Solana `project.ts`.

```ts
import {
  SolanaDataSourceKind,
  SolanaHandlerKind,
  SolanaProject,
} from "@subql/types-solana";

// Can expand the Datasource processor types via the generic param
const project: SolanaProject = {
  specVersion: "1.0.0",
  name: "solana-subql-starter",
  version: "1.0.0",
  runner: {
    node: {
      name: "@subql/node-solana",
      version: ">=1.0.0",
    },
    query: {
      name: "@subql/query",
      version: "*",
    },
  },
  description:
    "This project can be used as a starting point for developing your Solana SubQuery project",
  repository: "https://github.com/subquery/solana-subql-starter",
  schema: {
    file: "./schema.graphql",
  },
  network: {
    chainId: "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d=",
    // This endpoint must be a public non-pruned archive node
    // We recommend providing more than one endpoint for improved reliability, performance, and uptime
    // Public nodes may be rate limited, which can affect indexing speed
    // When developing your project we suggest getting a private API key
    // You can get them from OnFinality for free https://app.onfinality.io
    // https://documentation.onfinality.io/support/the-enhanced-api-service
    endpoint: ["https://solana.rpc.subquery.network/public", "https://api.mainnet-beta.solana.com"],
  },
  dataSources: [
    {
      kind: SolanaDataSourceKind.Runtime,
      startBlock: 336382792,
      assets: new Map([["TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA", { file: "./idls/tokenprogram.idl.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          // {
          //   block handlers are slow and we are best to avoid them if possible
          //   handler: handleBlock,
          //   kind: SolanaHandlerKind.Block
          // }
          {
            kind: SolanaHandlerKind.Instruction,
            handler: "handleCheckedTransfer",
            filter: {
              programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
              discriminator: "transferChecked",
              accounts: [
                null,
                ['rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof'],
              ]
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
name: solana-subql-starter
version: 1.0.0
runner:
  node:
    name: "@subql/node-solana"
    version: ">=1.0.0"
  query:
    name: "@subql/query"
    version: "*"
description: >-
  This project can be used as a starting point for developing your Solana SubQuery project
repository: "https://github.com/subquery/solana-subql-starter"
schema:
  file: ./schema.graphql
network:
  chainId: "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d="
  # This endpoint must be a public non-pruned archive node
  # We recommend providing more than one endpoint for improved reliability, performance, and uptime
  # Public nodes may be rate limited, which can affect indexing speed
  # When developing your project we suggest getting a private API key
  # You can get them from OnFinality for free https://app.onfinality.io
  # https://documentation.onfinality.io/support/the-enhanced-api-service
  endpoint:
    - "https://solana.rpc.subquery.network/public"
    - "https://api.mainnet-beta.solana.com"

dataSources:
  - kind: solana/Runtime
    startBlock: 50000 # Block to start indexing from
    assets:
      TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA:
        file:  "./idls/tokenprogram.idl.json"
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleCheckedTransfer
          kind: solana/InstructionHandler
          filter:
            programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            discriminator: "transferChecked"
            accounts:
              - null
              -
                - 'rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof'
```

:::

## Overview

### Datasource Spec

Defines the data that will be filtered and extracted and the location of the mapping function handler for the data transformation to be applied.

Solana datasources also contain references to contract IDLs that are used for filtering and decoding data.

| Field | Type | Description
| --------------- |-------------|-------------|
| **kind** | String | [solana/Runtime](#data-sources-and-mapping) |
| **startBlock** | Integer | This changes your indexing start block for this datasource, set this as high as possible to skip initial blocks with no relevant data |
| **endBlock** | Integer | This sets a end block for processing on the datasource. After this block is processed, this datasource will no longer index your data. <br><br>Useful when your contracts change at a certain block height, or when you want to insert data at genesis. For example, setting both the `startBlock` and `endBlock` to 320, will mean this datasource only operates on block 320 |
| **assets** | Object | This is a set of IDL file references that are used to decode instruction data and convert discriminator function names to their byte representation |
| **mapping** | Mapping Spec | |

## Data Sources and Mapping

In this section, we will talk about the default Solana runtime and its mapping. Here is an example:

```ts
{
  ...
  dataSources: [
    {
      kind: SolanaDataSourceKind.Runtime, // Indicates that this is default runtime
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

| Handler                                                                   | Supported filter                                          |
| ------------------------------------------------------------------------- | --------------------------------------------------------- |
| [solana/BlockHandler](../../mapping/solana#block-handler)                 | `modulo`, `timestamp`                                     |
| [solana/TransactionHandler](../../mapping/solana#transaction-handler)     | `signerAccountKey`                                        |
| [solana/InstructionHandler](../../mapping/solana#instruction-handler)     | `programId`, `discriminator`, `accounts`, `includeFailed` |
| [solana/LogHandler](../../mapping/solana#log-handler)                     | `programId`                                               |

Default runtime mapping filters are an extremely useful feature to decide what block, event, or extrinsic will trigger a mapping handler.

Only incoming data that satisfies the filter conditions will be processed by the mapping functions. Mapping filters are optional but are highly recommended as they significantly reduce the amount of data processed by your SubQuery project and will improve indexing performance.

`modulo` and `timestamp` are common block filters and are described in the [overview](../introduction#block-filters)

::: info Simplifying your Project Manifest for a large number contract addresses

If your project has the same handlers for multiple versions of the same type of contract your project manifest can get quite repetitive. e.g you want to index the transfers for many similar ERC20 contracts, there are [ways to better handle a large static list of contract addresses](../../optimisation#simplifying-the-project-manifest).

Note that there is also [dynamic datasources](../../dynamic-datasources.md) for when your list of addresses is dynamic (e.g. you use a factory contract).
