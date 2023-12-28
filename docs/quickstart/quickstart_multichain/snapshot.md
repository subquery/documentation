# Multichain Quick Start - Snapshot

The objective of this article is to provide a comprehensive, step-by-step manual for establishing a multi-chain indexer compatible with [Snapshot](https://docs.snapshot.org/), a voting platform that facilitates effortless and gas-free voting for DAOs, DeFi protocols, and NFT communities.

An integral component of this platform is the concept of delegations, which allows users to entrust their voting authority to another wallet. Unlike other actions within Snapshot, the act of delegation occurs directly on the blockchain.

By the conclusion of this guide, you will gain the insights into Snapshot, understand the intricacies of delegation, and acquire the knowledge necessary to configure a SubQuery indexer capable of monitoring and indexing delegation-related events across multiple blockchains.

<!-- @include: ../snippets/multi-chain-quickstart-reference.md -->

Snapshot has been implemented across multiple blockchain networks, occasionally with distinct contract addresses. However, because the identical smart contract was employed, each instance maintains an identical set of methods and events.

<!-- @include: ../snippets/evm-quickstart-reference.md -->

::: tip Note
Check the final code repository [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Multi-Chain/snapshot) to observe the integration of all previously mentioned configurations into a unified codebase.
:::

<!-- @include: ../snippets/multi-chain-evm-manifest-intro.md#level2 -->

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

<!-- @include: ../snippets/ethereum-manifest-note.md -->

Next, change the name of the file mentioned above to `ethereum.yaml` to indicate that this file holds the Ethereum configuration.

<!-- @include: ../snippets/multi-chain-creation.md -->

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

<!-- @include: ../snippets/multi-chain-network-origin-note.md -->

<!-- @include: ../snippets/schema-intro.md#level2 -->

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

<!-- @include: ../snippets/evm-codegen.md -->

```ts
import { Delegation } from "../types";
// Import a smart contract event class generated from provided ABIs
import { SetDelegateLog } from "../types/abi-interfaces/DelegateRegistry";
```

<!-- @include: ../snippets/evm-mapping-intro.md#level2 -->

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

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

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

<!-- @include: ../snippets/whats-next.md -->
