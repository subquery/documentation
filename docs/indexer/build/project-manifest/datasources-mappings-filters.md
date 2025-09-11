# Datasources, Mappings, and Filters

Datasources define the data that will be filtered and extracted and the location of the mapping function handler for the data transformation to be applied. This section covers how to configure datasources, their associated mappings, and the powerful filtering capabilities that help optimize your SubQuery project's performance.

## Datasource Spec

| Field          | Type         | Description                                                                                                                                                                                                                                                                                                                                                                    |
| -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **kind**       | string       | The runtime kind (e.g., `ethereum/Runtime`, `cosmos/Runtime`)                                                                                                                                                                                                                                                                                                                  |
| **startBlock** | Integer      | This changes your indexing start block for this datasource, set this as high as possible to skip initial blocks with no relevant data                                                                                                                                                                                                                                          |
| **endBlock**   | Integer      | This sets a end block for processing on the datasource. After this block is processed, this datasource will no longer index your data. <br><br>Useful when your contracts change at a certain block height, or when you want to insert data at genesis. For example, setting both the `startBlock` and `endBlock` to 320, will mean this datasource only operates on block 320 |
| **mapping**    | Mapping Spec | Contains the mapping handlers and their configuration                                                                                                                                                                                                                                                                                                                           |

### Mapping Spec

| Field                  | Type                         | Description                                                                                                                      |
| ---------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **handlers & filters** | Default handlers and filters | List all the [mapping functions](../code/high-level/handler-functions.md) and their corresponding handler types, with additional mapping filters. |

## Data Sources and Mapping

Here is an example of a typical datasource configuration:

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime, // Indicates that this is default runtime
      startBlock: 1, // This changes your indexing start block, set this higher to skip initial blocks with less data
      options: {
        // Must be a Record of assets
        abi: "erc20",
        // # this is the contract address for your target contract
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      },
      assets: new Map([["erc20", { file: "./abis/erc20.abi.json" }]]),
      mapping: {
        file: "./dist/index.js", // Entry path for this mapping
        handlers: [
          /* Enter handlers here */
        ],
      },
    },
  ];
}
```

## Mapping Handlers and Filters

The following table explains filters supported by different handlers across different network types.

**Your SubQuery project will be much more efficient when you only use specific handlers with appropriate mapping filters (e.g. avoid `BlockHandler` when possible).**

### EVM Networks (Ethereum, Polygon, BSC, Arbitrum, etc.)

| Handler                                                                   | Supported filter                                                                                    |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [ethereum/BlockHandler](../code/high-level/handler-functions.md#block-handler)             | `modulo`, `timestamp`                                                                               |
| [ethereum/TransactionHandler](../code/high-level/handler-functions.md#transaction-handler)| `function` filters (either be the function fragment or signature), `from` (address), `to` (address), `type` ("0x0" for legacy, "0x1" for access type lists, "0x2" for dynamic fees and "0x3" for blob transactions)  |
| [ethereum/LogHandler](../code/high-level/handler-functions.md#log-handler)                 | `topics` filters, and `address`                                                                     |

### Cosmos Networks

| Handler                     | Supported filter                                    |
| --------------------------- | --------------------------------------------------- |
| cosmos/BlockHandler         | `modulo`, `timestamp`                               |
| cosmos/TransactionHandler   | `includeFailedTx`                                   |
| cosmos/EventHandler         | `type`, `messageFilter`                             |
| cosmos/MessageHandler       | `type`, `values`                                    |

### Polkadot/Substrate Networks

| Handler                     | Supported filter                                    |
| --------------------------- | --------------------------------------------------- |
| substrate/BlockHandler      | `modulo`, `timestamp`                               |
| substrate/CallHandler       | `module`, `method`, `success`                       |
| substrate/EventHandler      | `module`, `method`                                  |

## Filter Types and Examples

Default runtime mapping filters are an extremely useful feature to decide what block, event, or extrinsic will trigger a mapping handler.

Only incoming data that satisfies the filter conditions will be processed by the mapping functions. Mapping filters are optional but are highly recommended as they significantly reduce the amount of data processed by your SubQuery project and will improve indexing performance.

### Modulo Filter

The `modulo` filter allows handling every N blocks, which is useful if you want to group or calculate data at a set interval. The following example shows how to use this filter.

```yml
filter:
  modulo: 50 # Index every 50 blocks: 0, 50, 100, 150....
```

### Timestamp Filter

The `timestamp` filter is very useful when indexing block data with specific time intervals between them. It can be used in cases where you are aggregating data on a hourly/daily basis. It can be also used to set a delay between calls to `blockHandler` functions to reduce the computational costs of this handler.

The `timestamp` filter accepts a valid cron expression and runs on schedule against the timestamps of the blocks being indexed. Times are considered on UTC dates and times. The block handler will run on the first block that is after the next iteration of the cron expression.

```yml
filter:
  # This cron expression will index blocks with at least 5 minutes interval
  # between their timestamps starting at startBlock given under the datasource.
  timestamp: "*/5 * * * *"
```

::: tip Note
We use the [cron-converter](https://github.com/roccivic/cron-converter) package to generate unix timestamps for iterations out of the given cron expression. So, make sure the format of the cron expression given in the `timestamp` filter is compatible with the package.
:::

Some common examples:

```yml
  # Every minute
  timestamp: "* * * * *"
  # Every hour on the hour (UTC)
  timestamp: "0 * * * *"
  # Every day at 1am UTC
  timestamp: "0 1 * * *"
  # Every Sunday (weekly) at 0:00 UTC
  timestamp: "0 0 * * 0"
```

### Function Filters (EVM)

For EVM networks, you can filter transactions by specific contract functions:

```ts
{
  kind: EthereumHandlerKind.Call,
  handler: "handleTransaction",
  filter: {
    /**
     * The function can either be the function fragment or signature
     * function: '0x095ea7b3'
     * function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
     * function: null - this will filter for native transfers that have no contract calls
     */
    function: "approve(address spender, uint256 rawAmount)",
  },
}
```

### Topic Filters (EVM)

For EVM log events, you can filter by event topics:

```ts
{
  kind: EthereumHandlerKind.Event,
  handler: "handleLog",
  filter: {
    /**
     * Follows standard log filters https://docs.ethers.io/v5/concepts/events/
     * address: "0x60781C2586D68229fde47564546784ab3fACA982"
     */
    topics: [
      "Transfer(address indexed from, address indexed to, uint256 amount)",
    ],
  },
}
```

::: info Note
When executing `subql codegen`, it will check if topics and functions are valid.
:::

::: info Simplifying your Project Manifest for a large number contract addresses

If your project has the same handlers for multiple versions of the same type of contract your project manifest can get quite repetitive. e.g you want to index the transfers for many similar ERC20 contracts, there are [ways to better handle a large static list of contract addresses](../optimising.md#simplifying-the-project-manifest).

Note that there is also [dynamic datasources](../code/dynamic-datasources.md) for when your list of addresses is dynamic (e.g. you use a factory contract).

:::