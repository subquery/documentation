# Polygon Manifest File

::: warning Important
We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Handler`) for Polygon. Since Polygon is an EVM-Compatible blockchain, we can use the core Ethereum framework to index it.
:::

<!-- @include: ./snippets/intro.md#part1 -->

```ts
import {
  EthereumProject,
  EthereumDatasourceKind,
  EthereumHandlerKind,
} from "@subql/types-ethereum";

// Can expand the Datasource processor types via the generic param
const project: EthereumProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "polygon-subql-starter",
  description:
    "This project can be use as a starting point for developing your new polygon SubQuery project",
  runner: {
    node: {
      name: "@subql/node-ethereum",
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
    /**
     * chainId is the EVM Chain ID, for Polygon this is 137
     * https://chainlist.org/chain/137
     */
    chainId: "137",
    /**
     * These endpoint(s) should be non-pruned archive nodes
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     # We suggest providing an array of endpoints for increased speed and reliability
     */
    endpoint: ["https://polygon.api.onfinality.io/public"],
    // Recommended to provide the HTTP endpoint of a full chain dictionary to speed up processing
    dictionary:
      "https://gx.api.subquery.network/sq/subquery/polygon-dictionary",
  },
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 3678215, // This is the block that the contract was deployed on
      options: {
        // Must be a key of assets
        abi: "erc20",
        // This is the contract address for wrapped ether https://polygonscan.com/address/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619
        address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      },
      assets: new Map([["erc20", { file: "./abis/erc20.abi.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Call,
            handler: "handleTransaction",
            filter: {
              /**
               * The function can either be the function fragment or signature
               * function: '0x095ea7b3'
               * function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
               */
              function: "approve(address spender, uint256 rawAmount)",
            },
          },
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
          },
        ],
      },
    },
  ],
  repository: "https://github.com/subquery/ethereum-subql-starter",
};

// Must set default to the project instance
export default project;
```

<!-- @include: ./snippets/intro.md#part2 -->

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

:::

<!-- @include: ./snippets/overview.md#part1 -->

The `chainId` is the network identifier of the blockchain. Examples in Polygon is `137` for Polygon mainnet and `8001` for Polygon Mumbai. See https://chainlist.org/chain/137

<!-- @include: ./snippets/overview.md#part2 -->

Public nodes may be rate limited which can affect indexing speed, when developing your project we suggest getting a private API key from a professional RPC provider like [OnFinality](https://onfinality.io/networks/polygon).

<!-- @include: ./snippets/overview.md#part3 -->

### Mapping Spec

| Field                  | Type                         | Description                                                                                                                     |
| ---------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **handlers & filters** | Default handlers and filters | List all the [mapping functions](../mapping/polygon.md) and their corresponding handler types, with additional mapping filters. |

## Data Sources and Mapping

In this section, we will talk about the default Polygon runtime and its mapping. Here is an example:

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
          /* Enter handers here */
        ],
      },
    },
  ];
}
```

<!-- @include: ./snippets/overview.md#part4 -->

| Handler                                                                  | Supported filter                                                                                    |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| [ethereum/BlockHandler](../mapping/polygon.md#block-handler)             | `modulo`, `timestamp`                                                                               |
| [ethereum/TransactionHandler](../mapping/polygon.md#transaction-handler) | `function` filters (either be the function fragment or signature), `from` (address), `to` (address) |
| [ethereum/LogHandler](../mapping/polygon.md#log-handler)                 | `topics` filters, and `address`                                                                     |

<!-- @include: ./snippets/overview.md#part4 -->

<!-- @include: ./snippets/real-time-indexing -->

<!-- @include: ./snippets/bypass-blocks -->
