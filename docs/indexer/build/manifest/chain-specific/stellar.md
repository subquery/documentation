# Stellar & Soroban Manifest File

The Manifest `project.ts` file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data. These details are for Stellar & Soroban, please refer to the [top-level manifest documentation](../introduction.md) for more general details.

Below is a standard example of a basic Stellar `project.ts`.

```ts
import {
  StellarDatasourceKind,
  StellarHandlerKind,
  StellarProject,
} from "@subql/types-stellar";
import { Horizon } from "stellar-sdk";

/* This is your project configuration */
const project: StellarProject = {
  specVersion: "1.0.0",
  name: "soroban-testnet-starter",
  version: "0.0.1",
  runner: {
    node: {
      name: "@subql/node-stellar",
      version: "*",
    },
    query: {
      name: "@subql/query",
      version: "*",
    },
  },
  description:
    "This project can be use as a starting point for developing your new Stellar SubQuery project (testnet)",
  repository: "https://github.com/subquery/stellar-subql-starter",
  schema: {
    file: "./schema.graphql",
  },
  network: {
    /* Stellar and Soroban uses the network passphrase as the chainId
      'Test SDF Network ; September 2015' for testnet
      'Public Global Stellar Network ; September 2015' for mainnet
      'Test SDF Future Network ; October 2022' for Future Network */
    chainId: "Test SDF Network ; September 2015",
    /* This Stellar endpoint must be a public non-pruned archive node
      We recommend providing more than one endpoint for improved reliability, performance, and uptime
      Public nodes may be rate limited, which can affect indexing speed
      When developing your project we suggest getting a private API key */
    endpoint: ["https://horizon-testnet.stellar.org"],
    /* This is a specific Soroban endpoint
      It is only required when you are using a soroban/EventHandler */
    sorobanEndpoint: "https://soroban-testnet.stellar.org",
    /* Recommended to provide the HTTP endpoint of a full chain dictionary to speed up processing
      dictionary: "https://gx.api.subquery.network/sq/subquery/eth-dictionary" */
  },
  dataSources: [
    {
      kind: StellarDatasourceKind.Runtime,
      /* Set this as a logical start block, it might be block 1 (genesis) or when your contract was deployed */
      startBlock: 1700000,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleOperation",
            kind: StellarHandlerKind.Operation,
            filter: {
              type: Horizon.OperationResponseType.payment,
            },
          },
          {
            handler: "handleCredit",
            kind: StellarHandlerKind.Effects,
            filter: {
              type: "account_credited",
            },
          },
          {
            handler: "handleDebit",
            kind: StellarHandlerKind.Effects,
            filter: {
              type: "account_debited",
            },
          },
          {
            handler: "handleEvent",
            kind: StellarHandlerKind.Event,
            filter: {
              /* You can optionally specify a smart contract address here
                contractId: "" */
              topics: [
                "transfer", // Topic signature(s) for the events, there can be up to 4
              ],
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

:::

## Overview

### Network Spec

In addition to there being an endpoint, Stellar also has a `sorobanEndpoint`. This is the standard RPC while the `endpoint` is the Horizon API.

| Field               | Type               | Description                                                                                                                                                                             |
| ------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **chainId**         | String             | A network identifier for the blockchain, [Stellar and Soroban uses the network passphrase](https://developers.stellar.org/docs/encyclopedia/network-passphrases)                        |
| **endpoint**        | String or String[] | Defines the endpoint of the blockchain to be indexed - **you will want archive nodes with high rate limits if you want to index large amounts of historical data**.                     |
| **sorobanEndpoint** | String             | Defines the soroban RPC endpoint - **you will want archive nodes with high rate limits if you want to index large amounts of historical data**.                                         |
| **dictionary**      | String             | It is suggested to provide the HTTP endpoint of a full chain dictionary to speed up processing - read [how a SubQuery Dictionary works](../../../academy/tutorials_examples/dictionary.md). |
| **bypassBlocks**    | Array              | Bypasses stated block numbers, the values can be a `range`(e.g. `"10- 50"`) or `integer`, see [Bypass Blocks](#bypass-blocks)                                                           |

## Data Sources and Mapping

In this section, we will talk about the default Stellar runtime and its mapping. Here is an example:

```ts
{
  ...
  dataSources: [
    {
      kind: StellarDataSourceKind.Runtime, // Indicates that this is default runtime
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

| Handler                                                                 | Supported filter                                                                               |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [stellar/BlockHandler](../../mapping/stellar#block-handler)             | `modulo` and `timestamp`                                                                       |
| [stellar/TransactionHandler](../../mapping/stellar#transaction-handler) | `account` (address from)                                                                       |
| [soroban/TransactionHandler](../../mapping/stellar#transaction-handler) | `account` (address from)                                                                       |
| [stellar/OperationHandler](../../mapping/stellar#operation-handler)     | `type`, `sourceAccount`                                                                        |
| [stellar/EffectHandler](../../mapping/stellar#effect-handler)           | `type`, `account` (address from)                                                               |
| [soroban/EventHandler](../../mapping/stellar#event-handler)             | `contractId` and/or up to 4 `topics` filters applied as an array, and an optional `contractId` |

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

`modulo` and `timestamp` are common block filters and are described in the [overview](../introduction#block-filters)

::: info Simplifying your Project Manifest for a large number contract addresses

If your project has the same handlers for multiple versions of the same type of contract your project manifest can get quite repetitive. e.g you want to index the transfers for many similar ERC20 contracts, there are [ways to better handle a large static list of contract addresses](../../optimisation#simplifying-the-project-manifest).

Note that there is also [dynamic datasources](../../dynamic-datasources.md) for when your list of addresses is dynamic (e.g. you use a factory contract).

:::

## Real-time indexing (Block Confirmations)

As indexers are an additional layer in your data processing pipeline, they can introduce a massive delay between when an on-chain event occurs and when the data is processed and able to be queried from the indexer.

SubQuery provides real time indexing of unconfirmed data directly from the RPC endpoint that solves this problem. SubQuery takes the most probabilistic data before it is confirmed to provide to the app. In the unlikely event that the data isn’t confirmed and a reorg occurs, SubQuery will automatically roll back and correct its mistakes quickly and efficiently - resulting in an insanely quick user experience for your customers.

To control this feature, please adjust the [--block-confirmations](../../../run_publish/references#block-confirmations) command to fine tune your project and also ensure that [historic indexing](../../../run_publish/references#disable-historical) is enabled (enabled by default)

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
