# Concordium Manifest File

The Manifest `project.ts` file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data. This is the specific details for Algorand, please refer to the [top level manifest documentation](../introduction.md) for more general details.

Below is a standard example of a basic Concordium `project.ts`.


```ts
import {
  TransactionEventTag,
  TransactionSummaryType,
} from "@concordium/node-sdk";
import {
  ConcordiumDatasourceKind,
  ConcordiumHandlerKind,
  ConcordiumProject,
} from "@subql/types-concordium";

const project: ConcordiumProject = {
  specVersion: "1.0.0",
  name: "concordium-testnet-starter",
  version: "0.0.1",
  runner: {
    node: {
      name: "@subql/node-concordium",
      version: "*",
    },
    query: {
      name: "@subql/query",
      version: "*",
    },
  },
  description:
    "This project can be use as a starting point for developing your new Concordium SubQuery project",
  repository: "https://github.com/subquery/concordium-subql-starter",
  schema: {
    file: "./schema.graphql",
  },
  network: {
    /**
     * chainId is the network identifier of the blockchain
     * In Concordium it is always the genesis hash of the network (hash of the first block)
     */
    chainId: "4221332d34e1694168c2a0c0b3fd0f273809612cb13d000d5c2e00e85f50f796",
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     */
    endpoint: ["node.testnet.concordium.com:20000"],
  },
  dataSources: [
    {
      kind: ConcordiumDatasourceKind.Runtime,
      startBlock: 490000,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          /**
           * Avoid using block handlers where possible as they slow the indexing speed of your project
          {
            handler: "handleBlock",
            kind: ConcordiumHandlerKind.Block,
          },
           */
          {
            handler: "handleTransaction",
            kind: ConcordiumHandlerKind.Transaction,
            filter: {
              type: TransactionSummaryType.AccountTransaction,
              values: {
                transactionType: "transfer",
              },
            },
          },
          {
            handler: "handleTransactionEvent",
            kind: ConcordiumHandlerKind.TransactionEvent,
            filter: {
              type: TransactionEventTag.Updated,
            },
          },
          {
            handler: "handleSpecialEvent",
            kind: ConcordiumHandlerKind.SpecialEvent,
            filter: {
              type: "blockAccrueReward",
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

## Overview

## Data Sources and Mapping

In this section, we will talk about the default Concordium runtime and its mapping. Here is an example:

```ts
{
  ...
  dataSources: [
    {
      kind: ConcordiumDataSourceKind.Runtime, // Indicates that this is default runtime
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

**Your SubQuery project will be much more efficient when you only use `ConcordiumHandlerKind.Transaction`, `ConcordiumHandlerKind.TransactionEvent`, or `ConcordiumHandlerKind.SpecialEvent` with appropriate mapping filters (e.g. NOT a `ConcordiumHandlerKind.Block`).**

| Handler                                                                                      | Supported filter |
| -------------------------------------------------------------------------------------------- | ---------------- |
| [ConcordiumHandlerKind.Block](../../mapping/concordium#block-handler)                        | `modulo`, `timestamp`         |
| [ConcordiumHandlerKind.Transaction](../../mapping/concordium#transaction-handler)            | `type`, `values` |
| [ConcordiumHandlerKind.TransactionEvent](../../mapping/concordium#transaction-event-handler) | `type`, `values` |
| [ConcordiumHandlerKind.SpecialEvent](../../mapping/concordium#special-event-handler)         | `type`, `values` |

`type` is type of transaction, transaction event, or special event to filter by (case sensitive). The `values` filter is a map where the keys correspond to the keys found in a transaction, transaction event, or special event. This filter allows you to search for transactions or events that have specific values for these keys. The `values` filter matches the keys in the filter against the keys in the data object. If a match is found, the corresponding transaction, event, or special event is included in the query result. For example:

```ts
import { TransactionSummaryType } from "@concordium/node-sdk";

{
  handler: "handleTransaction",
  kind: ConcordiumHandlerKind.Transaction,
  filter: {
    type: TransactionSummaryType.AccountTransaction,
    values: {
      transactionType: "transfer",
    },
  },
},
```

Or to filter transactions by their sender:

```ts
import { TransactionSummaryType } from "@concordium/node-sdk";

{
  handler: "handleTransaction",
  kind: ConcordiumHandlerKind.Transaction,
  filter: {
    type: TransactionSummaryType.AccountTransaction,
    values: {
      sender: '4AuT5RRmBwcdkLMA6iVjxTDb1FQmxwAh3wHBS22mggWL8xH6s3',
    },
  },
},
```

Or to filter events by instigator for a specific contract address:

```ts
import { TransactionEventTag } from "@concordium/node-sdk";

{
  handler: "handleTransaction",
  kind: ConcordiumHandlerKind.Transaction,
  filter: {
    type: TransactionEventTag.Updated,
    values: {
      instigator: '4AuT5RRmBwcdkLMA6iVjxTDb1FQmxwAh3wHBS22mggWL8xH6s3',
      address: '6536',
      amount: '0',
    },
  },
},
```

Default runtime mapping filters are an extremely useful feature to decide what block, transaction, transaction event, or special events will trigger a mapping handler.

Only incoming data that satisfies the filter conditions will be processed by the mapping functions. Mapping filters are optional but are highly recommended as they significantly reduce the amount of data processed by your SubQuery project and will improve indexing performance.

`modulo` and `timestamp` are common block filters and are described in the [overview](../introduction#block-filters)

::: info Simplifying your Project Manifest for a large number contract addresses

If your project has the same handlers for multiple versions of the same type of contract your project manifest can get quite repetitive. e.g you want to index the transfers for many similar ERC20 contracts, there are [ways to better handle a large static list of contract addresses](../../optimisation.md#simplifying-the-project-manifest).

Note that there is also [dynamic datasources](../../dynamic-datasources.md) for when your list of addresses is dynamic (e.g. you use a factory contract).

:::
