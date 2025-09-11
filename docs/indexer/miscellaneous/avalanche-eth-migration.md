# Avalanche SDK Migration

:::info TLDR
We are no longer supporting `@subql/node-avalanche` and all Avalanche users should migrate their projects to use `@subql/node-ethereum` to receive the latest updates.

The new `@subql/node-ethereum` is feature equivalent, and provides some massive performance improvements and support for new features.

The migration effort is easy and should only take a few minutes.
:::

## What has changed

We are no longer supporting `@subql/node-avalanche` and replacing it with `@subql/node-ethereum`. The SDKs were largely identical and we are reducing the number of packages that we support in order to deliver new features to you faster.

The new package is largely the same, with the following main changes:

- Runtime has changed from `kind: avalanche/Runtime` to `kind: ethereum/Runtime`
- Handlers have changed from `avalanche/*` to `ethereum/*`:
  - `avalanche/BlockHandler` to `ethereum/BlockHandler`
  - `avalanche/TransactionHandler` to `ethereum/TransactionHandler`
  - `avalanche/LogHandler` to `ethereum/LogHandler`
- Handler functions now receive `EthereumBlock`, `EthereumTransaction`, or `EthereumLog` instead of `AvalancheBlock`, `AvalancheTransaction`, or `AvalancheLog`

## Migrating

Firstly, you should use the up to date [Avalanche Starter repository](https://github.com/subquery/ethereum-subql-starter/tree/main/Avalanche/avalanche-starter) as a reference point. This is kept up to date with any new changes.

### Update package to latest dependencies

You will want to update your package versions to the latest, please take a look in the [package.json](https://github.com/subquery/ethereum-subql-starter/blob/main/Avalanche/avalanche-starter/package.json). Make sure you remove `@subql/node-avalanche` and `@subql/types-avalanche` and replace them with Ethereum

```json
...
  "dependencies": {
    "@subql/common": "latest",
    "@subql/types-ethereum": "latest",
    "@subql/validator": "latest",
    "assert": "^2.0.0"
  },
  "devDependencies": {
    "@subql/cli": "latest",
    "@subql/types": "latest",
    "@subql/testing": "latest",
    "@subql/node-ethereum": "latest",
    "ethers": "^5.7.2",
    "typescript": "4.5.5"
  }
  ...
```

### Update Docker Configuration

Since you started your project, you might need to update your Docker Configuration.

You must update the `subquery-node` in your [docker-compose.yml](https://github.com/subquery/ethereum-subql-starter/blob/main/Avalanche/avalanche-starter/docker-compose.yml) to use `image: onfinality/subql-node-ethereum:latest` instead of `image: onfinality/subql-node-avalanche:latest`. It might be easier to copy the entire file to give you a fresh start and use the latest configuration.

```yml
version: "3"

services:
  ...
  subquery-node:
    image: onfinality/subql-node-ethereum:latest
    ...
```

You may also need to copy the latest contents from the `/docker` directory into the [root of your project](https://github.com/subquery/ethereum-subql-starter/tree/main/Avalanche/avalanche-starter/docker).

### Update your Project Manifest

There are a few differences in this file that you should look at

::: code-tabs

@tab Before

```yaml
# ******* Before *******
specVersion: "1.0.0"
name: "avalanche-subql-starter"
version: "0.0.1"
runner:
  node:
    name: "@subql/node-avalanche" # Changed
    version: "*"
  query:
    name: "@subql/query"
    version: "*"
description: "This project can be use as a starting point for developing your new Avalanche SubQuery project"
repository: "https://github.com/subquery/avalanche-subql-starter"
schema:
  file: "./schema.graphql"
network:
  chainId: "mainnet" # Changed
  subnet: "C" # Changed
  endpoint: ["https://avalanche.api.onfinality.io/public"] # Changed
  dictionary: https://api.subquery.network/sq/subquery/avalanche-dictionary
dataSources:
  - kind: avalanche/Runtime # Changed
    startBlock: 57360
    options:
      abi: erc20
      address: "0x60781C2586D68229fde47564546784ab3fACA982"
    assets:
      erc20:
        file: "./abis/PangolinERC20.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        # - handler: handleBlock
        #   kind: avalanche/BlockHandler # Changed
        - handler: handleTransaction
          kind: avalanche/TransactionHandler # Changed
          filter:
            function: deposit(uint256 amount)
        - handler: handleLog
          kind: avalanche/LogHandler # Changed
          filter:
            topics:
              - Transfer(address indexed from, address indexed to, uint256 amount)
```

@tab:active After

```yaml
# ******* After *******
specVersion: "1.0.0"
name: "avalanche-subql-starter"
version: "0.0.1"
runner:
  node:
    name: "@subql/node-ethereum" # Changed
    version: "*"
  query:
    name: "@subql/query"
    version: "*"
description: "This project can be use as a starting point for developing your new Avalanche C-Chain SubQuery project"
repository: "https://github.com/subquery/ethereum-subql-starter"
schema:
  file: "./schema.graphql"
network:
  # chainId is the EVM Chain ID, for Avalanche-C chain is 43114
  chainId: "43114" # Changed
  endpoint: ["https://avalanche.api.onfinality.io/public/ext/bc/C/rpc"]
  dictionary: "https://api.subquery.network/sq/subquery/avalanche-dictionary"
dataSources:
  - kind: ethereum/Runtime # Changed
    startBlock: 57360
    options:
      abi: erc20
      address: "0x60781C2586D68229fde47564546784ab3fACA982"
    assets:
      erc20:
        file: "./abis/PangolinERC20.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        # - handler: handleBlock
        #   kind: ethereum/BlockHandler # Changed
        - handler: handleTransaction
          kind: ethereum/TransactionHandler # Changed
          filter:
            function: deposit(uint256 amount)
        - handler: handleLog
          kind: ethereum/LogHandler # Changed
          filter:
            topics:
              - Transfer(address indexed from, address indexed to, uint256 amount)
```

:::

You can see in the above comparison that it is limited to the following:

- The `runner.node.name` changes from `@subql/node-avalanche` to `@subql/node-ethereum`
- The `network.chainId` changes from `mainnet` to the [EVM chain ID](https://chainlist.org/chain/43114) (`43114`)
- We can remove `network.subnet`
- The `dataSources.kind` changes from `avalanche/Runtime` to `ethereum/Runtime`
- In your handlers, any handlers of `kind: avalanche/BlockHandler` change to `kind: ethereum/BlockHandler` (the [filters](../build/manifest/ethereum.md#mapping-handlers-and-filters) remain the same)
- In your handlers, any handlers of `kind: avalanche/TransactionHandler` change to `kind: ethereum/TransactionHandler` (the [filters](../build/manifest/ethereum.md#mapping-handlers-and-filters) remain the same)
- In your handlers, any handlers of `kind: avalanche/LogHandler` change to `kind: ethereum/LogHandler` (the [filters](../build/manifest/ethereum.md#mapping-handlers-and-filters) remain the same)

### Update your Project Mapping Files

There are minimal type changes here, but before we dive in, you should be familiar with our [updated code generation](../build/introduction.md#code-generation). SubQuery makes it easy and type-safe to work with your GraphQL entities, as well as smart contracts, events, transactions, and logs. SubQuery CLI will generate types from your project's GraphQL schema and any contract ABIs included in the data sources.

If you're creating a new Etheruem based project (including Avalanche), this command will also generate ABI types and save them into `src/types` using the `npx typechain --target=ethers-v5` command, allowing you to bind these contracts to specific addresses in the mappings and call read-only contract methods against the block being processed.

It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. All of these types are written to `src/types/abi-interfaces` and `src/types/contracts` directories. In the [Avalanche Quick Start](https://github.com/subquery/ethereum-subql-starter/blob/main/Avalanche/avalanche-starter/src/mappings/mappingHandlers.ts#L5), you would import these types like so.

```ts
import { Approval, Transaction } from "../types";
import {
  ApproveTransaction,
  TransferLog,
} from "../types/abi-interfaces/PangolinERC20";
```

In the past you might have imported types like the following for your mapping functions:

```ts
import { AvalancheBlock, AvalancheTransaction, AvalancheLog } from "@subql/types-ethereum";

export async function handleBlock(block: AvalancheBlock): Promise<void> { ... }

export async function handleTransaction(tx: AvalancheTransaction): Promise<void> { ... }

export async function handleLog(log: AvalancheLog): Promise<void> { ... }
```

We suggest using the new codegen process to import type safe contract files from your abis. In the [Avalanche Quick Start](https://github.com/subquery/ethereum-subql-starter/blob/main/Avalanche/avalanche-starter/src/mappings/mappingHandlers.ts#L5), this would map to imports like so.

```ts
import { EthereumBlock } from "@subql/types-ethereum"; // We use ethereum types since Avalanche is compatible
import { Approval, Transaction } from "../types";
import {
  ApproveTransaction,
  TransferLog,
} from "../types/abi-interfaces/PangolinERC20";

export async function handleBlock(block: EtheruemBlock): Promise<void> { ... }

export async function handleTransaction(tx: ApproveTransaction): Promise<void> { ... }

export async function handleLog(log: TransferLog): Promise<void> { ... }
```

Although you can also import `EthereumBlock`, `EthereumTransaction`, or `EthereumLog`, like so

```ts
import {
  EthereumBlock,
  EthereumTransaction,
  EthereumLog,
} from "@subql/types-ethereum"; // We use ethereum types since Avalanche is compatible

export async function handleBlock(block: EthereumBlock): Promise<void> { ... }

export async function handleTransaction(tx: EthereumTransaction): Promise<void> { ... }

export async function handleLog(log: EthereumLog): Promise<void> { ... }
```

### Summary

Once you have completed the above steps, your project should complete without fault. You might also want to review the following new features that the new Ethereum SDK support for Avalanche brings to Avalanche projects

- [Real-time indexing (Block Confirmations)](../build/manifest/ethereum.md#real-time-indexing-block-confirmations) resulting in an insanely quick user experience for your customers.
- [Contract query support](../build/mapping/ethereum.md#querying-contracts) allowing querying contract state
- [Third-party Library Support](../build/mapping/ethereum.md#third-party-library-support---the-sandbox) allowing you to retrieve data from external API endpoints, non historical RPC calls, and import your own external libraries into your projects
- [Testing Framework](../build/testing.md) providing an easy way to test the behaviour of mapping handlers and validate the data being indexed in an automated way.
- [Multi-chain indexing support](../build/multi-chain.md) to index data from across different networks (e.g. Ethereum and Avalanche) into the same database, this allows you to query a single endpoint to get data for all supported networks.
- [Dynamic data sources](../build/dynamicdatasources.md) to index factory contracts that create other contracts (e.g. a DEX)
