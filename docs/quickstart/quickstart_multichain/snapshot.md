# Multichain Quick Start - Snapshot

The objective of this article is to provide a comprehensive, step-by-step manual for establishing a multi-chain indexer compatible with [Snapshot](https://docs.snapshot.org/), a voting platform that facilitates effortless and gas-free voting for DAOs, DeFi protocols, and NFT communities.

An integral component of this platform is the concept of delegations, which allows users to entrust their voting authority to another wallet. Unlike other actions within Snapshot, the act of delegation occurs directly on the blockchain.

By the conclusion of this guide, you will gain the insights into Snapshot, understand the intricacies of delegation, and acquire the knowledge necessary to configure a SubQuery indexer capable of monitoring and indexing delegation-related events across multiple blockchains.

## Setting Up the Indexer

Snapshot has been implemented across multiple blockchain networks, occasionally with distinct contract addresses. However, because the identical smart contract was employed, each instance maintains an identical set of methods and events.

::: warning Important
**This project operates across multiple chains, making it more complex than other single chain examples.**

If you are new to SubQuery, we recommend starting your learning journey with single-chain examples, such as the [Ethereum Gravatar example](../quickstart_chains/ethereum-gravatar.md). After understanding the fundamentals, you can then advance to exploring the multi-chain examples.
:::

Before we begin, make sure that you have initialised your project using the provided steps in the [Start Here](../quickstart.md) section. **Please initialise a Ethereum project**. Previously, in the [1. Create a New Project](../quickstart.md) section, you must have noted [3 key files](../quickstart.md#_3-make-changes-to-your-project). Let's begin updating them one by one.

As a prerequisite, you will need to generate types from the ABI files of each smart contract. You can obtain these ABI files by searching for the ABIs of the mentioned smart contract addresses on blockchain scanners. For instance, you can locate the ABI for the Snapshot Ethereum smart contract at the bottom of [this page](https://etherscan.io/address/0x469788fE6E9E9681C6ebF3bF78e7Fd26Fc015446#code). Additionally, you can kickstart your project by using the EVM Scaffolding approach (detailed [here](../quickstart.md#evm-project-scaffolding)). You'll find all the relevant events to be scaffolded in the documentation for each type of smart contract.

::: tip Note
Check the final code repository [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Multi-Chain/snapshot) to observe the integration of all previously mentioned configurations into a unified codebase.
:::

### 1.Configuring the Manifest Files

Let's start by setting up an Ethereum indexer that we can later use for different chains. To do this, you only need to configure two handlers to index specific logs from the contract, namely the `SetDelegate` and `ClearDelegate` logs. Update your manifest file as shown below:

::: code-tabs

@tab project.yaml

```yaml
dataSources:
  - kind: ethereum/Runtime
    startBlock: 11225329
    options:
      abi: DelegateRegistry
      address: "0x469788fE6E9E9681C6ebF3bF78e7Fd26Fc015446"
    assets:
      DelegateRegistry:
        file: ./abis/DelegateRegistry.json
    mapping:
      file: ./dist/index.js
      handlers:
        - kind: ethereum/LogHandler
          handler: handleEthereumSetDelegateEvent
          filter:
            topics:
              - SetDelegate(address,bytes32,address)
        - kind: ethereum/LogHandler
          handler: handleEthereumClearDelegateEvent
          filter:
            topics:
              - ClearDelegate(address,bytes32,address)
```

:::

::: tip Note
Check out our [Manifest File](../../build/manifest/ethereum.md) documentation to get more information about the Project Manifest file.
:::

Next, change the name of the file mentioned above to `ethereum.yaml` to indicate that this file holds the Ethereum configuration.

Then, create a [multi-chain manifest file](../../build/multi-chain#1-create-a-multi-chain-manifest-file). After, following the steps outlined [here](../../build/multi-chain#3-add-a-new-network-to-the-multi-chain-manifest), start adding the new networks. After you Successfuly apply the correct entities for each chain, you will end up with a single `subquery-multichain.yaml` file that we'll map to the individual chain manifest files. This multi-chain manifest file will look something like this:

::: code-tabs

@tab subquery-multichain.yaml

```yaml
specVersion: 1.0.0
query:
  name: "@subql/query"
  version: "*"
projects:
  - ethereum.yaml
  - bsc.yaml
  - arbitrum.yaml
  - fantom.yaml
  - gnosis.yaml
  - goerli.yaml
  - matic.yaml
  - op.yaml
```

:::

Also, you will end up with the individual chains' manifest files like those:

::: code-tabs

@tab arbitrum.yaml

```yaml
specVersion: 1.0.0
version: 0.0.1
name: ethereum-snapshot
description: This project indexes the Snapshot Protocol delegation data from various chains
runner:
  node:
    name: "@subql/node-ethereum"
    version: ">=3.0.0"
  query:
    name: "@subql/query"
    version: "*"
schema:
  file: ./schema.graphql
network:
  chainId: "42161"
  endpoint:
    - https://arbitrum.llamarpc.com
  dictionary: https://dict-tyk.subquery.network/query/arbitrum
dataSources:
  - kind: ethereum/Runtime
    startBlock: 22531440
    options:
      abi: DelegateRegistry
      address: "0x469788fE6E9E9681C6ebF3bF78e7Fd26Fc015446"
    assets:
      DelegateRegistry:
        file: ./abis/DelegateRegistry.json
    mapping:
      file: ./dist/index.js
      handlers:
        - kind: ethereum/LogHandler
          handler: handleArbitrumSetDelegateEvent
          filter:
            topics:
              - SetDelegate(address,bytes32,address)
        - kind: ethereum/LogHandler
          handler: handleArbitrumClearDelegateEvent
          filter:
            topics:
              - ClearDelegate(address,bytes32,address)
repository: https://github.com/subquery/ethereum-subql-starter
```

@tab bsc.yaml

```yaml
specVersion: 1.0.0
version: 0.0.1
name: ethereum-snapshot
description: This project indexes the Snapshot Protocol delegation data from various chains
runner:
  node:
    name: "@subql/node-ethereum"
    version: ">=3.0.0"
  query:
    name: "@subql/query"
    version: "*"
schema:
  file: ./schema.graphql
network:
  chainId: "56"
  endpoint:
    - https://binance.llamarpc.com
  dictionary: https://dict-tyk.subquery.network/query/binance
dataSources:
  - kind: ethereum/Runtime
    startBlock: 7407807
    options:
      abi: DelegateRegistry
      address: "0x469788fE6E9E9681C6ebF3bF78e7Fd26Fc015446"
    assets:
      DelegateRegistry:
        file: ./abis/DelegateRegistry.json
    mapping:
      file: ./dist/index.js
      handlers:
        - kind: ethereum/LogHandler
          handler: handleBSCSetDelegateEvent
          filter:
            topics:
              - SetDelegate(address,bytes32,address)
        - kind: ethereum/LogHandler
          handler: handleBSCClearDelegateEvent
          filter:
            topics:
              - ClearDelegate(address,bytes32,address)
repository: https://github.com/subquery/ethereum-subql-starter
```

@tab ethereum.yaml

```yaml
specVersion: 1.0.0
version: 0.0.1
name: ethereum-snapshot
description: This project indexes the Snapshot Protocol delegation data from various chains
runner:
  node:
    name: "@subql/node-ethereum"
    version: ">=3.0.0"
  query:
    name: "@subql/query"
    version: "*"
schema:
  file: ./schema.graphql
network:
  chainId: "1"
  endpoint:
    - https://eth.llamarpc.com
  dictionary: https://gx.api.subquery.network/sq/subquery/eth-dictionary
dataSources:
  - kind: ethereum/Runtime
    startBlock: 11225329
    options:
      abi: DelegateRegistry
      address: "0x469788fE6E9E9681C6ebF3bF78e7Fd26Fc015446"
    assets:
      DelegateRegistry:
        file: ./abis/DelegateRegistry.json
    mapping:
      file: ./dist/index.js
      handlers:
        - kind: ethereum/LogHandler
          handler: handleEthereumSetDelegateEvent
          filter:
            topics:
              - SetDelegate(address,bytes32,address)
        - kind: ethereum/LogHandler
          handler: handleEthereumClearDelegateEvent
          filter:
            topics:
              - ClearDelegate(address,bytes32,address)
repository: https://github.com/subquery/ethereum-subql-starter
```

:::

As evident from the examples above, we employ various handlers for different chains, while keeping the indexed event logs the same. This approach is adopted to facilitate the identification of the originating network for each specific event (refer to this [tip](../../build/multi-chain#handling-network-specific-logic)). This strategy will prove beneficial later, as it allows us to incorporate a `network` field into the entities. This will simplify the execution of filtering, aggregation, and other data manipulation tasks.

### 2. Updating the GraphQL Schema File

For the sake of simplicity, the schema will consist of just one object, which will appear as follows.

```graphql
type Delegation @entity {
  id: ID!
  delegator: String!
  space: String!
  delegate: String!
  timestamp: BigInt!
  network: String!
}
```

This single object is `Delegation`, containing several parameters to be filled from on-chain data. Additionally, it will include a `network` attribute explicitly provided through mapping logic.

SubQuery simplifies and ensures type-safety when working with GraphQL entities, smart contracts, events, transactions, and logs. The SubQuery CLI will generate types based on your project's GraphQL schema and any contract ABIs included in the data sources.

::: code-tabs
@tab:active yarn

```shell
yarn codegen
```

@tab npm

```shell
npm run-script codegen
```

:::

This action will generate a new directory (or update the existing one) named `src/types`. Inside this directory, you will find automatically generated entity classes corresponding to each type defined in your `schema.graphql`. These classes facilitate type-safe operations for loading, reading, and writing entity fields. You can learn more about this process in [the GraphQL Schema section](../../build/graphql.md).

You can conveniently import all these entities from the following directory:

```ts
import { Delegation } from "../types";
```

It will also generate a class for every contract event, offering convenient access to event parameters, as well as information about the block and transaction from which the event originated. You can find detailed information on how this is achieved in the [EVM Codegen from ABIs](../../build/introduction.md#evm-codegen-from-abis) section. All of these types are stored in the `src/types/abi-interfaces` and `src/types/contracts` directories.

```ts
// Import a smart contract event class generated from provided ABIs
import { SetDelegateLog } from "../types/abi-interfaces/DelegateRegistry";
```

### 3. Writing the Mappings

Mapping functions define how blockchain data is transformed into the optimized GraphQL entities that we previously defined in the `schema.graphql` file.

::: tip Note
For more information on mapping functions, please refer to our [Mappings](../../build/mapping/ethereum.md) documentation.
:::

Creating mappings for this smart contract is a simple procedure. For added clarity, we have organised individual files for each event in the `src/mappings` directory, specifically `clearDelegate.ts` and `setDelegate.ts`. Let's examine them individually.

**setDelegate.ts**

The following TypeScript code is contained within this file:

```ts
import assert from "assert";
import { Delegation } from "../types";
import { SetDelegateLog } from "../types/abi-interfaces/DelegateRegistry";

export async function handleEthereumSetDelegateEvent(
  event: SetDelegateLog
): Promise<void> {
  await handleSetDelegate(event, "ethereum");
}

export async function handleBSCSetDelegateEvent(
  event: SetDelegateLog
): Promise<void> {
  await handleSetDelegate(event, "bsc");
}

export async function handleArbitrumSetDelegateEvent(
  event: SetDelegateLog
): Promise<void> {
  await handleSetDelegate(event, "arbitrum");
}

export async function handleFantomSetDelegateEvent(
  event: SetDelegateLog
): Promise<void> {
  await handleSetDelegate(event, "fantom");
}

export async function handleGnosisSetDelegateEvent(
  event: SetDelegateLog
): Promise<void> {
  await handleSetDelegate(event, "gnosis");
}

export async function handleGoerliSetDelegateEvent(
  event: SetDelegateLog
): Promise<void> {
  await handleSetDelegate(event, "goerli");
}

export async function handleMaticSetDelegateEvent(
  event: SetDelegateLog
): Promise<void> {
  await handleSetDelegate(event, "matic");
}

export async function handleOPSetDelegateEvent(
  event: SetDelegateLog
): Promise<void> {
  await handleSetDelegate(event, "op");
}

export async function handleSetDelegate(
  event: SetDelegateLog,
  network: string
): Promise<void> {
  assert(event.args, "No logs in args");
  logger.warn(
    `Handling SetDelegateLog from ${network.toString()}; txhash: ${
      event.transactionHash
    }`
  );

  let delegator = event.args.delegator;
  let space = event.args.id;
  let delegate = event.args.delegate;
  let id = delegator
    .concat("-")
    .concat(space.toString())
    .concat("-")
    .concat(delegate);
  let delegation = Delegation.create({
    id: id,
    delegator: delegator,
    space: space,
    delegate: delegate,
    timestamp: BigInt(event.block.timestamp),
    network: network.toString(),
  });
  delegation.save();
}
```

This code handles Ethereum and other chains' `setDelegate` events by routing them to the `handleSetDelegate` function, each with a specified network name. The `handleSetDelegate` function first checks for logs in the event's arguments, logs a warning with transaction details, and then constructs a unique `id` by concatenating the delegator's address, space ID, and delegate's address. After that, it creates a `Delegation` object, populating it with the required information and saves it.

This code essentially centralises the handling of SetDelegate events for various networks and ensures that they are correctly recorded in the `Delegation` object with network-specific attributes, facilitating data tracking and analysis for each network.

**clearDelegrate.ts**

The following TypeScript code is contained within this file:

```ts
import { ClearDelegateLog } from "../types/abi-interfaces/DelegateRegistry";
import assert from "assert";

export async function handleEthereumClearDelegateEvent(
  event: ClearDelegateLog
): Promise<void> {
  await handleClearDelegate(event, "ethereum");
}

export async function handleBSCClearDelegateEvent(
  event: ClearDelegateLog
): Promise<void> {
  await handleClearDelegate(event, "bsc");
}

export async function handleArbitrumClearDelegateEvent(
  event: ClearDelegateLog
): Promise<void> {
  await handleClearDelegate(event, "arbitrum");
}

export async function handleFantomClearDelegateEvent(
  event: ClearDelegateLog
): Promise<void> {
  await handleClearDelegate(event, "fantom");
}

export async function handleGnosisClearDelegateEvent(
  event: ClearDelegateLog
): Promise<void> {
  await handleClearDelegate(event, "gnosis");
}

export async function handleGoerliClearDelegateEvent(
  event: ClearDelegateLog
): Promise<void> {
  await handleClearDelegate(event, "goerli");
}

export async function handleMaticClearDelegateEvent(
  event: ClearDelegateLog
): Promise<void> {
  await handleClearDelegate(event, "matic");
}

export async function handleOPClearDelegateEvent(
  event: ClearDelegateLog
): Promise<void> {
  await handleClearDelegate(event, "op");
}

export async function handleClearDelegate(
  event: ClearDelegateLog,
  network: string
): Promise<void> {
  assert(event.args, "No logs in args");
  logger.warn(
    `Handling ClearDelegateLog from ${network.toString()}; txhash: ${
      event.transactionHash
    }`
  );
  let delegator = event.args.delegator;
  let space = event.args.id;
  let delegate = event.args.delegate;
  let id = delegator
    .concat("-")
    .concat(space.toString())
    .concat("-")
    .concat(delegate);
  store.remove("Delegation", id);
}
```

Similar to the approach taken in the [`setDelegate.ts`](#setdelegratets) file, this code centralises the management of `clearDelegate` events. However, the key difference here is that the code removes the corresponding Delegation object from storage using `store.remove`. This ensures that when a `clearDelegate` event occurs, the associated Delegation data is deleted, reflecting the change in the delegation status.

🎉 At this stage, we have successfully incorporated all the desired entities and mappings that can be retrieved from Snapshot smart contracts. For each of these entities, we've a single mapping handler to structure and store the data in a queryable format.

::: tip Note
Check the final code repository [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Multi-Chain/snapshot) to observe the integration of all previously mentioned configurations into a unified codebase.
:::

## Build Your Project

Next, build your work to run your new SubQuery project. Run the build command from the project's root directory as given here:

::: code-tabs
@tab:active yarn

```shell
yarn build
```

@tab npm

```shell
npm run-script build
```

:::

::: warning Important
Whenever you make changes to your mapping functions, you must rebuild your project.
:::

Now, you are ready to run your first SubQuery project. Let’s check out the process of running your project in detail.

## Run Your Project Locally with Docker

Whenever you create a new SubQuery Project, first, you must run it locally on your computer and test it and using Docker is the easiest and quickiest way to do this.

The `docker-compose.yml` file defines all the configurations that control how a SubQuery node runs. For a new project, which you have just initialised, you won't need to change anything.

However, visit the [Running SubQuery Locally](../../run_publish/run.md) to get more information on the file and the settings.

Run the following command under the project directory:

::: code-tabs
@tab:active yarn

```shell
yarn start:docker
```

@tab npm

```shell
npm run-script start:docker
```

:::

::: tip Note
It may take a few minutes to download the required images and start the various nodes and Postgres databases.
:::

## Query your Project

Next, let's query our project. Follow these three simple steps to query your SubQuery project:

1. Open your browser and head to `http://localhost:3000`.

2. You will see a GraphQL playground in the browser and the schemas which are ready to query.

3. Find the _Docs_ tab on the right side of the playground which should open a documentation drawer. This documentation is automatically generated and it helps you find what entities and methods you can query.

Try the following queries to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/query.md).

::: details Delegations

#### Request

```graphql
{
  query {
    delegations(first: 3) {
      nodes {
        id
        delegate
        delegator
        space
        network
        timestamp
      }
    }
  }
}
```

#### Response

```json
{
  "data": {
    "query": {
      "delegations": {
        "nodes": [
          {
            "id": "0x096F35fdD2F560bbBc39f5DC709d26c7f7D39389-0x0000000000000000000000000000000000000000000000000000000000000000-0x54aCf9E0702f8AB74A366636704BD66F79283078",
            "delegate": "0x54aCf9E0702f8AB74A366636704BD66F79283078",
            "delegator": "0x096F35fdD2F560bbBc39f5DC709d26c7f7D39389",
            "space": "0x0000000000000000000000000000000000000000000000000000000000000000",
            "network": "gnosis",
            "timestamp": "1646504420"
          },
          {
            "id": "0x0F08eA74C5ade3c7293b9a1f767f3C4f2761f9e8-0x73746764616f2e65746800000000000000000000000000000000000000000000-0xDDb120d096F6cBd6d59B7dA5B5d59429e6EdFda3",
            "delegate": "0xDDb120d096F6cBd6d59B7dA5B5d59429e6EdFda3",
            "delegator": "0x0F08eA74C5ade3c7293b9a1f767f3C4f2761f9e8",
            "space": "0x73746764616f2e65746800000000000000000000000000000000000000000000",
            "network": "bsc",
            "timestamp": "1697607339"
          },
          {
            "id": "0x214d8E3Fa774Ab9ca655f846bCF1F1eBCB181967-0x67616c2e65746800000000000000000000000000000000000000000000000000-0x5068A38569172137ad9E6DDd600b605e099be865",
            "delegate": "0x5068A38569172137ad9E6DDd600b605e099be865",
            "delegator": "0x214d8E3Fa774Ab9ca655f846bCF1F1eBCB181967",
            "space": "0x67616c2e65746800000000000000000000000000000000000000000000000000",
            "network": "bsc",
            "timestamp": "1697459435"
          }
        ]
      }
    }
  }
}
```

:::

::: details Network Metadatas

#### Request

```graphql
{
  _metadatas {
    totalCount
    nodes {
      chain
      lastProcessedHeight
    }
  }
}
```

#### Response

```json
{
  "data": {
    "_metadatas": {
      "totalCount": 8,
      "nodes": [
        {
          "chain": "42161",
          "lastProcessedHeight": 140435164
        },
        {
          "chain": "1",
          "lastProcessedHeight": 18364074
        },
        {
          "chain": "137",
          "lastProcessedHeight": 7408178
        },
        {
          "chain": "250",
          "lastProcessedHeight": 31141312
        },
        {
          "chain": "56",
          "lastProcessedHeight": 32705207
        },
        {
          "chain": "10",
          "lastProcessedHeight": 19677402
        },
        {
          "chain": "5",
          "lastProcessedHeight": 7383850
        },
        {
          "chain": "100",
          "lastProcessedHeight": 21351684
        }
      ]
    }
  }
}
```

:::

## What's next?

Congratulations! You have now a locally running SubQuery project that indexes the Snapshot delegation entitiy from multiple blockchains and accepts GraphQL API requests.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
