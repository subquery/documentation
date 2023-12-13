# Multichain Quick Start - Galxe

The purpose of this article is to present a comprehensive, step-by-step guide on how to establish a multi-chain indexer that is compatible with [Galxe](https://galxe.com/), a prominent platform for creating web3 communities.

By the end of this guide, you will gain a deep understanding of Galxe NFTs, grasp the intricacies of the protocol, and acquire the knowledge required to configure a SubQuery indexer capable of monitoring and indexing Galxe campaigns and their NFT-related events across multiple blockchains.

A vital aspect of the Galxe platform revolves around the concept of campaigns. These campaigns serve as a collaborative credential infrastructure, enabling brands to enhance their web3 communities and products. What Galxe essentially does is utilise both on-chain and off-chain credentials to assist brands and protocols in their growth hacking campaigns. Users who complete campaign tasks receive on-chain proof of their accomplishments, which allows them to mint a Galxe NFT OAT (On-Chain Achievement Token).

## Setting Up the Indexer

Galxe has been deployed on different blockchain networks, sometimes with different contract addresses. But because the same smart contract code was used, each one has the same methods and events.

::: warning Important
**This project operates across multiple chains, making it more complex than other single chain examples.**

If you are new to SubQuery, we recommend starting your learning journey with single-chain examples, such as the [Ethereum Gravatar example](../quickstart_chains/ethereum-gravatar.md). After understanding the fundamentals, you can then advance to exploring the multi-chain examples.
:::

Before we begin, make sure that you have initialised your project using the provided steps in the [Start Here](../quickstart.md) section. **Please initialise a Ethereum project**. Previously, in the [1. Create a New Project](../quickstart.md) section, you must have noted [3 key files](../quickstart.md#_3-make-changes-to-your-project). Let's begin updating them one by one.

As a prerequisite, you will need to generate types from the ABI files of each smart contract. You can obtain these ABI files by searching for the ABIs of the mentioned smart contract addresses on blockchain scanners.

For instance, you can locate the ABI for the Galxy Ethereum SpaceStationV2 smart contract at the bottom of [this page](https://etherscan.io/address/0x75cdA57917E9F73705dc8BCF8A6B2f99AdBdc5a5#code). Additionally, you can kickstart your project by using the EVM Scaffolding approach (detailed [here](../quickstart.md#evm-project-scaffolding)). You'll find all the relevant events to be scaffolded in the documentation for each type of smart contract.

::: tip Note
The configuration code snippets shared below have been made simpler to improve clarity and will focus exclusively on the NFT claim handling logic.

Check the final code repository [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Multi-Chain/galxe) to observe the integration of all previously mentioned configurations into a unified codebase.
:::

### 1.Configuring the Manifest Files

Let's start by setting up an Ethereum indexer that we can later use for different chains. To do this, you need to configure handlers to index specific logs from the contracts.

Because there are numerous handlers with various configurations for each network, involving differences in available smart contracts, their addresses, start blocks, and protocol versions, the manifest files will be quite extensive. As a solution, we've developed a script that can generate the manifest files with the correct configurations automatically. You can find the steps to do this [here](https://github.com/subquery/ethereum-subql-starter/blob/main/Multi-Chain/galxe/README.md#add-your-chain).

By running `yarn run prepare:ethereum`, you will generate a file named `ethereum.yaml` which will contain the following configuration details regarding NFT claims:

::: code-tabs

@tab ethereum.yaml

```yaml
dataSources:
  - kind: ethereum/Runtime
    name: SpaceStationV1
    startBlock: 15767178
    options:
      abi: SpaceStationV1
      address: "0xc92EDE6aC9865111356B8f51fBD7ee8D261D9637"
    assets:
      SpaceStationV1:
        file: ./abis/SpaceStationV1.json
    mapping:
      file: ./dist/index.js
      handlers:
        - kind: ethereum/LogHandler
          handler: handleEventClaimEthereum
          filter:
            topics:
              - EventClaim(uint256,uint256,uint256,address)
        - kind: ethereum/LogHandler
          handler: handleEventClaimBatchEthereum
          filter:
            topics:
              - EventClaimBatch(uint256,uint256[],uint256[],address)
        - kind: ethereum/LogHandler
          handler: handleEventForgeEthereum
          filter:
            topics:
              - EventForge(uint256,uint256,uint256,address)
  - kind: ethereum/Runtime
    startBlock: 15767178
    name: SpaceStationV1_1
    options:
      abi: SpaceStationV1
      address: "0x5bD25d2f4f26Bc82A34dE016D34612A28A0Cd492"
    assets:
      SpaceStationV1:
        file: ./abis/SpaceStationV1.json
    mapping:
      file: ./dist/index.js
      handlers:
        - kind: ethereum/LogHandler
          handler: handleEventClaimEthereum
          filter:
            topics:
              - EventClaim(uint256,uint256,uint256,address)
        - kind: ethereum/LogHandler
          handler: handleEventClaimBatchEthereum
          filter:
            topics:
              - EventClaimBatch(uint256,uint256[],uint256[],address)
        - kind: ethereum/LogHandler
          handler: handleEventForgeEthereum
          filter:
            topics:
              - EventForge(uint256,uint256,uint256,address)
  - kind: ethereum/Runtime
    startBlock: 15767178
    name: SpaceStationV1_2
    options:
      abi: SpaceStationV1
      address: "0x987fb80B5E8646A2DC4C276881484BD442d645F3"
    assets:
      SpaceStationV1:
        file: ./abis/SpaceStationV1.json
    mapping:
      file: ./dist/index.js
      handlers:
        - kind: ethereum/LogHandler
          handler: handleEventClaimEthereum
          filter:
            topics:
              - EventClaim(uint256,uint256,uint256,address)
        - kind: ethereum/LogHandler
          handler: handleEventClaimBatchEthereum
          filter:
            topics:
              - EventClaimBatch(uint256,uint256[],uint256[],address)
        - kind: ethereum/LogHandler
          handler: handleEventForgeEthereum
          filter:
            topics:
              - EventForge(uint256,uint256,uint256,address)
  - kind: ethereum/Runtime
    startBlock: 15767178
    name: SpaceStationV1_3
    options:
      abi: SpaceStationV1
      address: "0xaae9f9d4fb8748feba405cE25856DC57C91BbB92"
    assets:
      SpaceStationV1:
        file: ./abis/SpaceStationV1.json
    mapping:
      file: ./dist/index.js
      handlers:
        - kind: ethereum/LogHandler
          handler: handleEventClaimEthereum
          filter:
            topics:
              - EventClaim(uint256,uint256,uint256,address)
        - kind: ethereum/LogHandler
          handler: handleEventClaimBatchEthereum
          filter:
            topics:
              - EventClaimBatch(uint256,uint256[],uint256[],address)
        - kind: ethereum/LogHandler
          handler: handleEventForgeEthereum
          filter:
            topics:
              - EventForge(uint256,uint256,uint256,address)
  - kind: ethereum/Runtime
    startBlock: 15767178
    name: SpaceStationV2
    options:
      abi: SpaceStationV2
      address: "0x75cdA57917E9F73705dc8BCF8A6B2f99AdBdc5a5"
    assets:
      SpaceStationV2:
        file: ./abis/SpaceStationV2.json
    mapping:
      file: ./dist/index.js
      handlers:
        - kind: ethereum/LogHandler
          handler: handleEventClaimV2Ethereum
          filter:
            topics:
              - EventClaim(uint256,uint256,uint256,address,address)
        - kind: ethereum/LogHandler
          handler: handleEventClaimBatchV2Ethereum
          filter:
            topics:
              - EventClaimBatch(uint256,uint256[],uint256[],address,address)
        - kind: ethereum/LogHandler
          handler: handleEventClaimBatchCappedV2Ethereum
          filter:
            topics:
              - EventClaimBatchCapped(uint256,uint256[],uint256[],address,address,uint256,uint256)
        - kind: ethereum/LogHandler
          handler: handleEventClaimCappedV2Ethereum
          filter:
            topics:
              - EventClaimCapped(uint256,uint256,uint256,address,address,uint256,uint256)
        - kind: ethereum/LogHandler
          handler: handleEventForgeV2Ethereum
          filter:
            topics:
              - EventForge(uint256,uint256,uint256,address,address)
```

:::

::: tip Note
Check out our [Manifest File](../../build/manifest/ethereum.md) documentation to get more information about the Project Manifest file.
:::

Then, create a [multi-chain manifest file](../../build/multi-chain#1-create-a-multi-chain-manifest-file). By following the steps outlined [here](../../build/multi-chain#3-add-a-new-network-to-the-multi-chain-manifest) (using the `subql multi-chain:add` command), start adding the new networks. After you successfuly apply the correct entities for each chain, you will end up with a single `subquery-multichain.yaml` file that we'll map to the individual chain manifest files. This multi-chain manifest file will look something like this:

::: code-tabs

@tab subquery-multichain.yaml

```yaml
specVersion: 1.0.0
query:
  name: "@subql/query"
  version: "*"
projects:
  - ethereum.yaml
  - arbitrum.yaml
  - polygon.yaml
```

:::

Also, you will end up with the individual chains' manifest files like those:

::: details Configurations in Multiple Manifest Files

::: code-tabs

@tab arbitrum.yaml

```yaml
dataSources:
  - kind: ethereum/Runtime
    name: SpaceStationV1
    startBlock: 9919488
    options:
      abi: SpaceStationV1
      address: "0x1ae981A0a3AE5F9cDc059d9478D2C37E8eB442eB"
    assets:
      SpaceStationV1:
        file: ./abis/SpaceStationV1.json
    mapping:
      file: ./dist/index.js
      handlers:
        - kind: ethereum/LogHandler
          handler: handleEventClaim
          filter:
            topics:
              - EventClaim(uint256,uint256,uint256,address)
        - kind: ethereum/LogHandler
          handler: handleEventClaimBatch
          filter:
            topics:
              - EventClaimBatch(uint256,uint256[],uint256[],address)
        - kind: ethereum/LogHandler
          handler: handleEventForge
          filter:
            topics:
              - EventForge(uint256,uint256,uint256,address)
  - kind: ethereum/Runtime
    startBlock: 11015643
    name: SpaceStationV2
    options:
      abi: SpaceStationV2
      address: "0x9e6eF7F75ad88D4Edb4C9925C94B769C5b0d6281"
    assets:
      SpaceStationV2:
        file: ./abis/SpaceStationV2.json
    mapping:
      file: ./dist/index.js
      handlers:
        - kind: ethereum/LogHandler
          handler: handleEventClaimV2Arbitrum
          filter:
            topics:
              - EventClaim(uint256,uint256,uint256,address,address)
        - kind: ethereum/LogHandler
          handler: handleEventClaimBatchV2Arbitrum
          filter:
            topics:
              - EventClaimBatch(uint256,uint256[],uint256[],address,address)
        - kind: ethereum/LogHandler
          handler: handleEventClaimBatchCappedV2Arbitrum
          filter:
            topics:
              - EventClaimBatchCapped(uint256,uint256[],uint256[],address,address,uint256,uint256)
        - kind: ethereum/LogHandler
          handler: handleEventClaimCappedV2Arbitrum
          filter:
            topics:
              - EventClaimCapped(uint256,uint256,uint256,address,address,uint256,uint256)
        - kind: ethereum/LogHandler
          handler: handleEventForgeV2Arbitrum
          filter:
            topics:
              - EventForge(uint256,uint256,uint256,address,address)
```

@tab polygon.yaml

```yaml
dataSources:
  - kind: ethereum/Runtime
    name: SpaceStationV1
    startBlock: 17607438
    options:
      abi: SpaceStationV1
      address: "0xdeb1F826c512EEE2FA9398225A3401A0Dd5311E2"
    assets:
      SpaceStationV1:
        file: ./abis/SpaceStationV1.json
    mapping:
      file: ./dist/index.js
      handlers:
        - kind: ethereum/LogHandler
          handler: handleEventClaimPolygon
          filter:
            topics:
              - EventClaim(uint256,uint256,uint256,address)
        - kind: ethereum/LogHandler
          handler: handleEventClaimBatchPolygon
          filter:
            topics:
              - EventClaimBatch(uint256,uint256[],uint256[],address)
        - kind: ethereum/LogHandler
          handler: handleEventForgePolygon
          filter:
            topics:
              - EventForge(uint256,uint256,uint256,address)
  - kind: ethereum/Runtime
    name: SpaceStationV1_1
    startBlock: 22544793
    options:
      abi: SpaceStationV1
      address: "0x6e7801d5b07dA1A82F6D1930685731a50645B182"
    assets:
      SpaceStationV1:
        file: ./abis/SpaceStationV1.json
    mapping:
      file: ./dist/index.js
      handlers:
        - kind: ethereum/LogHandler
          handler: handleEventClaimPolygon
          filter:
            topics:
              - EventClaim(uint256,uint256,uint256,address)
        - kind: ethereum/LogHandler
          handler: handleEventClaimBatchPolygon
          filter:
            topics:
              - EventClaimBatch(uint256,uint256[],uint256[],address)
        - kind: ethereum/LogHandler
          handler: handleEventForgePolygon
          filter:
            topics:
              - EventForge(uint256,uint256,uint256,address)
  - kind: ethereum/Runtime
    name: SpaceStationV1_2
    startBlock: 22777900
    options:
      abi: SpaceStationV1
      address: "0x44D2a93948B70DC0568020AaD2efc6FE7d146404"
    assets:
      SpaceStationV1:
        file: ./abis/SpaceStationV1.json
    mapping:
      file: ./dist/index.js
      handlers:
        - kind: ethereum/LogHandler
          handler: handleEventClaimPolygon
          filter:
            topics:
              - EventClaim(uint256,uint256,uint256,address)
        - kind: ethereum/LogHandler
          handler: handleEventClaimBatchPolygon
          filter:
            topics:
              - EventClaimBatch(uint256,uint256[],uint256[],address)
        - kind: ethereum/LogHandler
          handler: handleEventForgePolygon
          filter:
            topics:
              - EventForge(uint256,uint256,uint256,address)
  - kind: ethereum/Runtime
    name: SpaceStationV1_3
    startBlock: 23101101
    options:
      abi: SpaceStationV1
      address: "0x6cad6e1abc83068ea98924aef37e996ed02abf1c"
    assets:
      SpaceStationV1:
        file: ./abis/SpaceStationV1.json
    mapping:
      file: ./dist/index.js
      handlers:
        - kind: ethereum/LogHandler
          handler: handleEventClaimPolygon
          filter:
            topics:
              - EventClaim(uint256,uint256,uint256,address)
        - kind: ethereum/LogHandler
          handler: handleEventClaimBatchPolygon
          filter:
            topics:
              - EventClaimBatch(uint256,uint256[],uint256[],address)
        - kind: ethereum/LogHandler
          handler: handleEventForgePolygon
          filter:
            topics:
              - EventForge(uint256,uint256,uint256,address)
  - kind: ethereum/Runtime
    startBlock: 27825430
    name: SpaceStationV2
    options:
      abi: SpaceStationV2
      address: "0xf6D1B85af155229AcD7B523601148585A1ff67C6"
    assets:
      SpaceStationV2:
        file: ./abis/SpaceStationV2.json
    mapping:
      file: ./dist/index.js
      handlers:
        - kind: ethereum/LogHandler
          handler: handleEventClaimV2Polygon
          filter:
            topics:
              - EventClaim(uint256,uint256,uint256,address,address)
        - kind: ethereum/LogHandler
          handler: handleEventClaimBatchV2Polygon
          filter:
            topics:
              - EventClaimBatch(uint256,uint256[],uint256[],address,address)
        - kind: ethereum/LogHandler
          handler: handleEventClaimBatchCappedV2Polygon
          filter:
            topics:
              - EventClaimBatchCapped(uint256,uint256[],uint256[],address,address,uint256,uint256)
        - kind: ethereum/LogHandler
          handler: handleEventClaimCappedV2Polygon
          filter:
            topics:
              - EventClaimCapped(uint256,uint256,uint256,address,address,uint256,uint256)
        - kind: ethereum/LogHandler
          handler: handleEventForgeV2Polygon
          filter:
            topics:
              - EventForge(uint256,uint256,uint256,address,address)
```

@tab ethereum.yaml

```yaml
dataSources:
  - kind: ethereum/Runtime
    name: SpaceStationV1
    startBlock: 15767178
    options:
      abi: SpaceStationV1
      address: "0xc92EDE6aC9865111356B8f51fBD7ee8D261D9637"
    assets:
      SpaceStationV1:
        file: ./abis/SpaceStationV1.json
    mapping:
      file: ./dist/index.js
      handlers:
        - kind: ethereum/LogHandler
          handler: handleEventClaimEthereum
          filter:
            topics:
              - EventClaim(uint256,uint256,uint256,address)
        - kind: ethereum/LogHandler
          handler: handleEventClaimBatchEthereum
          filter:
            topics:
              - EventClaimBatch(uint256,uint256[],uint256[],address)
        - kind: ethereum/LogHandler
          handler: handleEventForgeEthereum
          filter:
            topics:
              - EventForge(uint256,uint256,uint256,address)
  - kind: ethereum/Runtime
    startBlock: 15767178
    name: SpaceStationV1_1
    options:
      abi: SpaceStationV1
      address: "0x5bD25d2f4f26Bc82A34dE016D34612A28A0Cd492"
    assets:
      SpaceStationV1:
        file: ./abis/SpaceStationV1.json
    mapping:
      file: ./dist/index.js
      handlers:
        - kind: ethereum/LogHandler
          handler: handleEventClaimEthereum
          filter:
            topics:
              - EventClaim(uint256,uint256,uint256,address)
        - kind: ethereum/LogHandler
          handler: handleEventClaimBatchEthereum
          filter:
            topics:
              - EventClaimBatch(uint256,uint256[],uint256[],address)
        - kind: ethereum/LogHandler
          handler: handleEventForgeEthereum
          filter:
            topics:
              - EventForge(uint256,uint256,uint256,address)
  - kind: ethereum/Runtime
    startBlock: 15767178
    name: SpaceStationV1_2
    options:
      abi: SpaceStationV1
      address: "0x987fb80B5E8646A2DC4C276881484BD442d645F3"
    assets:
      SpaceStationV1:
        file: ./abis/SpaceStationV1.json
    mapping:
      file: ./dist/index.js
      handlers:
        - kind: ethereum/LogHandler
          handler: handleEventClaimEthereum
          filter:
            topics:
              - EventClaim(uint256,uint256,uint256,address)
        - kind: ethereum/LogHandler
          handler: handleEventClaimBatchEthereum
          filter:
            topics:
              - EventClaimBatch(uint256,uint256[],uint256[],address)
        - kind: ethereum/LogHandler
          handler: handleEventForgeEthereum
          filter:
            topics:
              - EventForge(uint256,uint256,uint256,address)
  - kind: ethereum/Runtime
    startBlock: 15767178
    name: SpaceStationV1_3
    options:
      abi: SpaceStationV1
      address: "0xaae9f9d4fb8748feba405cE25856DC57C91BbB92"
    assets:
      SpaceStationV1:
        file: ./abis/SpaceStationV1.json
    mapping:
      file: ./dist/index.js
      handlers:
        - kind: ethereum/LogHandler
          handler: handleEventClaimEthereum
          filter:
            topics:
              - EventClaim(uint256,uint256,uint256,address)
        - kind: ethereum/LogHandler
          handler: handleEventClaimBatchEthereum
          filter:
            topics:
              - EventClaimBatch(uint256,uint256[],uint256[],address)
        - kind: ethereum/LogHandler
          handler: handleEventForgeEthereum
          filter:
            topics:
              - EventForge(uint256,uint256,uint256,address)
  - kind: ethereum/Runtime
    startBlock: 15767178
    name: SpaceStationV2
    options:
      abi: SpaceStationV2
      address: "0x75cdA57917E9F73705dc8BCF8A6B2f99AdBdc5a5"
    assets:
      SpaceStationV2:
        file: ./abis/SpaceStationV2.json
    mapping:
      file: ./dist/index.js
      handlers:
        - kind: ethereum/LogHandler
          handler: handleEventClaimV2Ethereum
          filter:
            topics:
              - EventClaim(uint256,uint256,uint256,address,address)
        - kind: ethereum/LogHandler
          handler: handleEventClaimBatchV2Ethereum
          filter:
            topics:
              - EventClaimBatch(uint256,uint256[],uint256[],address,address)
        - kind: ethereum/LogHandler
          handler: handleEventClaimBatchCappedV2Ethereum
          filter:
            topics:
              - EventClaimBatchCapped(uint256,uint256[],uint256[],address,address,uint256,uint256)
        - kind: ethereum/LogHandler
          handler: handleEventClaimCappedV2Ethereum
          filter:
            topics:
              - EventClaimCapped(uint256,uint256,uint256,address,address,uint256,uint256)
        - kind: ethereum/LogHandler
          handler: handleEventForgeV2Ethereum
          filter:
            topics:
              - EventForge(uint256,uint256,uint256,address,address)
```

:::

As evident from the examples above, we employ various handlers for different chains, while keeping the indexed event logs the same. This approach is adopted to facilitate the identification of the originating network for each specific event (refer to this [tip](../../build/multi-chain#handling-network-specific-logic)). This strategy will prove beneficial later, as it allows us to incorporate a `network` field into the entities. This will simplify the execution of filtering, aggregation, and other data manipulation tasks.

### 2. Updating the GraphQL Schema File

The schema will consist of several objects, which will appear as follows:

```graphql
type SpaceStation @entity {
  id: ID!
  version: BigInt! # 1 is spacestationv1, 2 is spacestationv2
  claim: [ClaimRecord!]! @derivedFrom(field: "spacestation")
  network: String!
}

type StarNFT @entity {
  id: ID!
  nfts: [NFT!]! @derivedFrom(field: "starNFT")
  network: String!
}

type NFT @entity {
  id: ID! # contract-id
  number: BigInt!
  starNFT: StarNFT!
  owner: String!
  campaign: Campaign!
  network: String!
}

type Campaign @entity {
  id: ID!
  nfts: [NFT!]! @derivedFrom(field: "campaign")
  network: String!
}

type ClaimRecord @entity {
  id: ID!
  nft: NFT!
  spacestation: SpaceStation!
  verifyID: BigInt!
  cid: BigInt!
  user: String!
  tx: String!
  block: BigInt!
  timestamp: BigInt!
  network: String!
}

type NFTMintTransaction @entity {
  id: ID! # transaction id
  nftContract: String!
  nftID: BigInt!
  from: String!
  to: String!
  block: BigInt!
  network: String!
}
```

The configuration defines several types for managing space stations, star NFTs, NFTs, campaigns, claim records, and NFT mint transactions. These types include fields like ID, version, claim, network, number, owner, campaign, verifyID, CID, user, transaction, block, timestamp, and more, all of which are used to organise and store information related to NFTs, their ownership, and related transactions on a blockchain network.

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
import { StarNFT, NFT, ClaimRecord } from "../types";
```

It will also generate a class for every contract event, offering convenient access to event parameters, as well as information about the block and transaction from which the event originated. You can find detailed information on how this is achieved in the [EVM Codegen from ABIs](../../build/introduction.md#evm-codegen-from-abis) section. All of these types are stored in the `src/types/abi-interfaces` and `src/types/contracts` directories.

```ts
// Import a smart contract event class generated from provided ABIs
import {
  EventClaimLog,
  EventClaimBatchLog,
  EventClaimBatchCappedLog,
  EventClaimCappedLog,
  EventForgeLog,
} from "../types/abi-interfaces/SpaceStationV2";
```

### 3. Writing the Mappings

Mapping functions define how blockchain data is transformed into the optimized GraphQL entities that we previously defined in the `schema.graphql` file.

::: tip Note
For more information on mapping functions, please refer to our [Mappings](../../build/mapping/ethereum.md) documentation.
:::

Creating mappings for this smart contract is a simple procedure. For added clarity, we have organised individual files for each protocol version in the `src/mappings` directory, specifically `spacestationv2.ts` and `spacestationv1.ts`. In essence, these files are not fundamentally different; they primarily vary in how they manage on-chain data. Let's analyse them separately, beginning with `spacestationv2.ts` since the second version is more pertinent.

**spacestationv2.ts**

The following TypeScript code is contained within this file:

::: details `spacestationv2.ts` code

```ts
import {
  EventClaimLog,
  EventClaimBatchLog,
  EventClaimBatchCappedLog,
  EventClaimCappedLog,
  EventForgeLog,
} from "../types/abi-interfaces/SpaceStationV2";
import { createStarNFTDatasource } from "../types";
import { StarNFT, NFT, ClaimRecord } from "../types";
import {
  TWO_BI,
  ZERO_BI,
  EventModel,
  NFTModel,
  createSpaceStation,
  createCampaign,
} from "./helper";
import assert from "assert";

// handleClaimV2

async function handleClaimV2(
  event: EventModel,
  claim_nft: NFTModel,
  network: string
): Promise<void> {
  logger.info("Handling handleClaimV2");
  let campaign_id = claim_nft.campaignID;
  let user = claim_nft.user;
  let nft_contract = claim_nft.nftContract;
  logger.info(nft_contract);

  // logger.debug("campaign_id:, user: ", user);

  let starNFT = await StarNFT.get(nft_contract);
  logger.info("Checking starNFT");
  if (!starNFT) {
    // create template
    logger.info("Creating a template");
    logger.info(`nft_contract = ${nft_contract}`);
    createStarNFTDatasource({ nft_contract });
    starNFT = StarNFT.create({ id: nft_contract, network: network });
    starNFT.save();
  }
  logger.info(`StartNFT id - ${starNFT.id}`);
  assert(starNFT, "NFT not found");

  let spaceStation = await createSpaceStation(
    event.spaceStationAddr,
    TWO_BI,
    network
  );
  let campaign = await createCampaign(campaign_id.toString(), network);
  logger.info("Iterating through array");
  for (let i = 0; i < claim_nft.nftIDs.length; i++) {
    let nft_id = claim_nft.nftIDs[i];
    logger.info(`Iteration ${i}; nft_id ${nft_id}`);
    let verify_id = claim_nft.verifyIDs[i];
    logger.info(`Iteration ${i}; verify_id ${verify_id}`);
    let nft_model_id = nft_contract.concat("-").concat(nft_id.toString());
    logger.info(`Iteration ${i}; nft_model_id ${nft_model_id}`);
    // nft
    let nft = NFT.create({
      id: nft_model_id,
      number: BigInt(nft_id.toString()),
      starNFTId: starNFT.id,
      owner: user,
      campaignId: campaign.id,
      network: network,
    });

    nft.save();
    logger.info(`Saved NFT entity`);

    // claim record
    let claim = ClaimRecord.create({
      id: verify_id.toString(),
      spacestationId: spaceStation.id,
      verifyID: verify_id,
      cid: BigInt(campaign.id),
      user: user,
      tx: event.txHash,
      block: event.block,
      timestamp: event.timestamp,
      nftId: nft.id,
      network: network,
    });
    claim.save();
  }
}

// handleEventClaimV2

export async function handleEventClaimV2(
  event: EventClaimLog,
  network: string
): Promise<void> {
  logger.info("Handling EventClaimLogV2");
  let em = new EventModel();
  em.spaceStationAddr = event.address;
  em.block = BigInt(event.block.number);
  em.txHash = event.transaction.hash;
  em.logIndex = BigInt(event.logIndex);
  em.timestamp = event.block.timestamp;

  let nm = new NFTModel();
  assert(event.args, "No args in log");
  nm.campaignID = event.args._cid.toBigInt();
  nm.user = event.args._sender;
  nm.verifyIDs = [event.args._dummyId.toBigInt()];
  nm.nftIDs = [event.args._nftID.toBigInt()];
  nm.nftContract = event.args._starNFT;

  logger.info("--> V2 Claim {}", [event.address]);

  handleClaimV2(em, nm, network);
}

export async function handleEventClaimV2Ethereum(
  event: EventClaimLog
): Promise<void> {
  logger.info("Handling handleEventClaimV2Ethereum");
  await handleEventClaimV2(event, "ethereum");
}

export async function handleEventClaimV2Arbitrum(
  event: EventClaimLog
): Promise<void> {
  logger.info("Handling handleEventClaimV2Arbitrum");
  await handleEventClaimV2(event, "arbitrum");
}

export async function handleEventClaimV2Polygon(
  event: EventClaimLog
): Promise<void> {
  logger.info("Handling handleEventClaimV2Polygon");
  await handleEventClaimV2(event, "polygon");
}

// handleEventClaimBatchV2

export async function handleEventClaimBatchV2(
  event: EventClaimBatchLog,
  network: string
): Promise<void> {
  logger.info("Handling handleEventClaimBatchV2");
  let em = new EventModel();
  em.spaceStationAddr = event.address;
  em.block = BigInt(event.block.number);
  em.txHash = event.transaction.hash;
  em.logIndex = BigInt(event.logIndex);
  em.timestamp = event.block.timestamp;

  let nm = new NFTModel();
  assert(event.args, "No args in log");
  nm.campaignID = event.args._cid.toBigInt();
  nm.user = event.args._sender;
  nm.verifyIDs = event.args._dummyIdArr.map((bigNumber) =>
    BigInt(bigNumber.toString())
  );
  nm.nftIDs = event.args._nftIDArr.map((bigNumber) =>
    BigInt(bigNumber.toString())
  );
  nm.nftContract = event.args._starNFT;

  logger.info("--> V2 ClaimBatch {}", [event.address]);

  handleClaimV2(em, nm, network);
}

export async function handleEventClaimBatchV2Ethereum(
  event: EventClaimBatchLog
): Promise<void> {
  logger.info("Handling handleEventClaimBatchV2Ethereum");
  await handleEventClaimBatchV2(event, "ethereum");
}

export async function handleEventClaimBatchV2Arbitrum(
  event: EventClaimBatchLog
): Promise<void> {
  logger.info("Handling handleEventClaimBatchV2Arbitrum");
  await handleEventClaimBatchV2(event, "arbitrum");
}

export async function handleEventClaimBatchV2Polygon(
  event: EventClaimBatchLog
): Promise<void> {
  logger.info("Handling handleEventClaimBatchV2Polygon");
  await handleEventClaimBatchV2(event, "polygon");
}

// handleEventClaimBatchCappedV2

export async function handleEventClaimBatchCappedV2(
  event: EventClaimBatchCappedLog,
  network: string
): Promise<void> {
  logger.info("Hanling EventClaimBatchCappedLogV2");
  let em = new EventModel();
  em.spaceStationAddr = event.address;
  em.block = BigInt(event.block.number);
  em.txHash = event.transaction.hash;
  em.logIndex = BigInt(event.logIndex);
  em.timestamp = event.block.timestamp;

  let nm = new NFTModel();
  assert(event.args, "No args in log");
  nm.campaignID = event.args._cid.toBigInt();
  nm.user = event.args._sender;
  nm.verifyIDs = event.args._dummyIdArr.map((bigNumber) =>
    BigInt(bigNumber.toString())
  );
  nm.nftIDs = event.args._nftIDArr.map((bigNumber) =>
    BigInt(bigNumber.toString())
  );
  nm.nftContract = event.args._starNFT;

  logger.info("--> V2 ClaimBatchCapped {}", [event.address]);

  handleClaimV2(em, nm, network);
}

export async function handleEventClaimBatchCappedV2Ethereum(
  event: EventClaimBatchCappedLog
): Promise<void> {
  logger.info("Handling handleEventClaimBatchCappedV2Ethereum");
  await handleEventClaimBatchCappedV2(event, "ethereum");
}

export async function handleEventClaimBatchCappedV2Arbitrum(
  event: EventClaimBatchCappedLog
): Promise<void> {
  logger.info("Handling handleEventClaimBatchCappedV2Arbitrum");
  await handleEventClaimBatchCappedV2(event, "arbitrum");
}

export async function handleEventClaimBatchCappedV2Polygon(
  event: EventClaimBatchCappedLog
): Promise<void> {
  logger.info("Handling handleEventClaimBatchCappedV2Polygon");
  await handleEventClaimBatchCappedV2(event, "polygon");
}

// handleEventClaimCappedV2

export async function handleEventClaimCappedV2(
  event: EventClaimCappedLog,
  network: string
): Promise<void> {
  logger.info("Hanling EventClaimCappedLogV2");
  let em = new EventModel();
  em.spaceStationAddr = event.address;
  em.block = BigInt(event.block.number);
  em.txHash = event.transaction.hash;
  em.logIndex = BigInt(event.logIndex);
  em.timestamp = event.block.timestamp;

  let nm = new NFTModel();
  assert(event.args, "No args in log");
  nm.campaignID = event.args._cid.toBigInt();
  nm.user = event.args._sender;
  nm.verifyIDs = [event.args._dummyId.toBigInt()];
  nm.nftIDs = [event.args._nftID.toBigInt()];
  nm.nftContract = event.args._starNFT;

  logger.info("--> V2 ClaimCapped {}", [event.address]);

  handleClaimV2(em, nm, network);
}

export async function handleEventClaimCappedV2Ethereum(
  event: EventClaimCappedLog
): Promise<void> {
  logger.info("Handling handleEventClaimCappedV2Ethereum");
  await handleEventClaimCappedV2(event, "ethereum");
}

export async function handleEventClaimCappedV2Arbitrum(
  event: EventClaimCappedLog
): Promise<void> {
  logger.info("Handling handleEventClaimCappedV2Arbitrum");
  await handleEventClaimCappedV2(event, "arbitrum");
}

export async function handleEventClaimCappedV2Polygon(
  event: EventClaimCappedLog
): Promise<void> {
  logger.info("Handling handleEventClaimCappedV2Polygon");
  await handleEventClaimCappedV2(event, "polygon");
}

// handleEventForgeV2

export async function handleEventForgeV2(
  event: EventForgeLog,
  network: string
): Promise<void> {
  logger.info("Handling EventForgeLogV2");
  let em = new EventModel();
  em.spaceStationAddr = event.address;
  em.block = BigInt(event.block.number);
  em.txHash = event.transaction.hash;
  em.logIndex = BigInt(event.logIndex);
  em.timestamp = event.block.timestamp;

  let nm = new NFTModel();
  assert(event.args, "No args in log");
  nm.campaignID = event.args._cid.toBigInt();
  nm.user = event.args._sender;
  nm.verifyIDs = [event.args._dummyId.toBigInt()];
  nm.nftIDs = [event.args._nftID.toBigInt()];
  nm.nftContract = event.args._starNFT;

  logger.info("--> V2 Forge {}", [event.address]);

  handleClaimV2(em, nm, network);
}

export async function handleEventForgeV2Ethereum(
  event: EventForgeLog
): Promise<void> {
  logger.info("Handling handleEventForgeV2Ethereum");
  await handleEventForgeV2(event, "ethereum");
}

export async function handleEventForgeV2Arbitrum(
  event: EventForgeLog
): Promise<void> {
  logger.info("Handling handleEventForgeV2Arbitrum");
  await handleEventForgeV2(event, "arbitrum");
}

export async function handleEventForgeV2Polygon(
  event: EventForgeLog
): Promise<void> {
  logger.info("Handling handleEventForgeV2Polygon");
  await handleEventForgeV2(event, "polygon");
}
```

:::

The code imports various TypeScript modules and interfaces prepared by SubQuery SDK. Thpse are necessary for handling events, including contract-related information and data models.

The `handleClaimV2` function is used to handle NFT claim events of version 2. It takes as input an event model, an NFT model, and a network parameter. It then creates and manages data related to NFT claims and NFT ownership.

`handleEventClaimV2` function handles a specific type of event (`EventClaimLog`) and calls `handleClaimV2` with the relevant data. It logs information and invokes the handling process for version 2 NFT claims.

As this is a multi-chain project, the code incorporates various network-specific event handlers: there are several functions (e.g., `handleEventClaimV2Ethereum`, `handleEventClaimV2Arbitrum`) that handle NFT claim events on specific blockchain networks. They utilise `handleEventClaimV2` and pass the network type as a parameter.

Similar to `handleEventClaimV2`, there are functions for handling batch, capped, and forge events, each adapted to work with different network types (e.g., Ethereum, Arbitrum, Polygon).

This code essentially centralises the handling of NFT claim events events for various networks and ensures that they are correctly recorded in the relevant objects with network-specific attributes, facilitating data tracking and analysis for each network.

**spacestationv1.ts**

This code is in the file for the first version of the protocol:

::: details `spacestationv1.ts` code

```ts
import {
  EventClaimLog,
  EventClaimBatchLog,
  EventForgeLog,
} from "../types/abi-interfaces/SpaceStationV1";

import { createStarNFTDatasource } from "../types";

// import { StarNFT as StarNFTTemplate } from "../generated/templates";
import { StarNFT, NFT, NFTMintTransaction, ClaimRecord } from "../types";
import {
  ONE_BI,
  ZERO_BI,
  EventModel,
  NFTModel,
  createSpaceStation,
  createCampaign,
} from "./helper";
import assert from "assert";

async function handleClaim(
  event: EventModel,
  claim_nft: NFTModel,
  network: string
): Promise<void> {
  logger.info("Handling Claim");
  let campaign_id = claim_nft.campaignID;
  let user = claim_nft.user;

  let mintTx = await NFTMintTransaction.get(event.txHash);
  if (!mintTx) {
    logger.info("MintTx Not Found campaign: {} user: {} tx: {}", [
      campaign_id.toString(),
      user,
      event.txHash,
    ]);
    return;
  }
  let nft_contract = mintTx.nftContract;

  let starNFT = await StarNFT.get(nft_contract);
  if (!starNFT) {
    // create template
    createStarNFTDatasource({ nft_contract });
    starNFT = StarNFT.create({ id: nft_contract, network: network });
    starNFT.save();
  }
  assert(starNFT, "starNFT is null");
  let spaceStation = createSpaceStation(
    event.spaceStationAddr,
    ONE_BI,
    network
  );
  let campaign = await createCampaign(campaign_id.toString(), network);

  for (let i = 0; i < claim_nft.nftIDs.length; i++) {
    let nft_id = claim_nft.nftIDs[i];
    let verify_id = claim_nft.verifyIDs[i];
    let nft_model_id = nft_contract.concat("-").concat(nft_id.toString());
    // nft
    let nft = NFT.create({
      id: nft_model_id,
      number: BigInt(nft_id.toString()),
      starNFTId: starNFT?.id.toString(),
      owner: user,
      campaignId: campaign.id,
      network: network,
    });

    nft.save();

    // claim record
    let claim = ClaimRecord.create({
      id: verify_id.toString(),
      nftId: nft.id,
      spacestationId: (await spaceStation).id,
      verifyID: BigInt(verify_id.toString()),
      cid: BigInt(campaign_id.toString()),
      user: user,
      tx: event.txHash,
      block: event.block,
      timestamp: event.timestamp,
      network: network,
    });
    claim.save();
  }
}

// handleEventClaim

export async function handleEventClaim(
  event: EventClaimLog,
  network: string
): Promise<void> {
  logger.info("Handling EventClaimLog");
  let em = new EventModel();
  em.spaceStationAddr = event.address;
  em.block = BigInt(event.block.number);
  em.txHash = event.transaction.hash;
  em.logIndex = BigInt(event.logIndex);
  em.timestamp = event.block.timestamp;

  let nm = new NFTModel();
  assert(event.args, "No args in log");
  nm.campaignID = event.args._cid.toBigInt();
  nm.user = event.args._sender;
  nm.verifyIDs = [event.args._dummyId.toBigInt()];
  nm.nftIDs = [event.args._nftID.toBigInt()];

  logger.info("--> V1 Claim {}", [event.address]);

  handleClaim(em, nm, network);
}

export async function handleEventClaimEthereum(
  event: EventClaimLog
): Promise<void> {
  logger.info("Handling handleEventClaimEthereum");
  await handleEventClaim(event, "ethereum");
}

export async function handleEventClaimArbitrum(
  event: EventClaimLog
): Promise<void> {
  logger.info("Handling handleEventClaimArbitrum");
  await handleEventClaim(event, "arbitrum");
}

export async function handleEventClaimPolygon(
  event: EventClaimLog
): Promise<void> {
  logger.info("Handling handleEventClaimPolygon");
  await handleEventClaim(event, "polygon");
}

// handleEventClaimBatch

export async function handleEventClaimBatch(
  event: EventClaimBatchLog,
  network: string
): Promise<void> {
  logger.info("Handling EventClaimBatchLog");
  let em = new EventModel();
  em.spaceStationAddr = event.address;
  em.block = BigInt(event.block.number);
  em.txHash = event.transaction.hash;
  em.logIndex = BigInt(event.logIndex);
  em.timestamp = event.block.timestamp;

  let nm = new NFTModel();
  assert(event.args, "No args in log");
  nm.campaignID = event.args._cid.toBigInt();
  nm.user = event.args._sender;
  nm.verifyIDs = event.args._dummyIdArr.map((bigNumber) =>
    BigInt(bigNumber.toString())
  );
  nm.nftIDs = event.args._nftIDArr.map((bigNumber) =>
    BigInt(bigNumber.toString())
  );

  logger.info("--> V1 ClaimBatch {}", [event.address]);

  handleClaim(em, nm, network);
}

export async function handleEventClaimBatchEthereum(
  event: EventClaimBatchLog
): Promise<void> {
  logger.info("Handling handleEventClaimBatchEthereum");
  await handleEventClaimBatch(event, "ethereum");
}

export async function handleEventClaimBatchArbitrum(
  event: EventClaimBatchLog
): Promise<void> {
  logger.info("Handling handleEventClaimBatchArbitrum");
  await handleEventClaimBatch(event, "arbitrum");
}

export async function handleEventClaimBatchPolygon(
  event: EventClaimBatchLog
): Promise<void> {
  logger.info("Handling handleEventClaimBatchPolygon");
  await handleEventClaimBatch(event, "polygon");
}

// handleEventForge

export async function handleEventForge(
  event: EventForgeLog,
  network: string
): Promise<void> {
  logger.info("Handling EventForgeLog");
  let em = new EventModel();
  em.spaceStationAddr = event.address;
  em.block = BigInt(event.block.number);
  em.txHash = event.transaction.hash;
  em.logIndex = BigInt(event.logIndex);
  em.timestamp = event.block.timestamp;

  let nm = new NFTModel();
  assert(event.args, "No args in log");
  nm.campaignID = event.args._cid.toBigInt();
  nm.user = event.args._sender;
  nm.verifyIDs = [event.args._dummyId.toBigInt()];
  nm.nftIDs = [event.args._nftID.toBigInt()];

  logger.info("--> V1 Forge {}", [event.address]);

  handleClaim(em, nm, network);
}

export async function handleEventForgeEthereum(
  event: EventForgeLog
): Promise<void> {
  logger.info("Handling handleEventForgeEthereum");
  await handleEventForge(event, "ethereum");
}

export async function handleEventForgeArbitrum(
  event: EventForgeLog
): Promise<void> {
  logger.info("Handling handleEventForgeArbitrum");
  await handleEventForge(event, "arbitrum");
}

export async function handleEventForgePolygon(
  event: EventForgeLog
): Promise<void> {
  logger.info("Handling handleEventForgePolygon");
  await handleEventForge(event, "polygon");
}
```

:::

The code you provided is similar to the code for the second version of the protocol, but it is adapted to work with the first version of the protocol. The adapted functions include event handling functions like `handleEventClaim`, `handleEventClaimBatch`, and `handleEventForge`, which are specific to the first version.

🎉 At this stage, we have successfully incorporated all the desired entities and mappings that can be retrieved from Galxe smart contracts. For each of these entities, we've a single mapping handler to structure and store the data in a queryable format.

::: tip Note
Check the final code repository [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Multi-Chain/galxe) to observe the integration of all previously mentioned configurations into a unified codebase.
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
      "totalCount": 3,
      "nodes": [
        {
          "chain": "42161",
          "lastProcessedHeight": 11414074
        },
        {
          "chain": "1",
          "lastProcessedHeight": 15767323
        },
        {
          "chain": "137",
          "lastProcessedHeight": 17608503
        }
      ]
    }
  }
}
```

:::

::: details Interconnected Entities

#### Request

```graphql
{
  query {
    spaceStations(first: 1) {
      nodes {
        id
        version
        network
        claim(first: 1) {
          nodes {
            id
            nft {
              id
              owner
              campaign {
                id
              }
            }
          }
        }
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
      "spaceStations": {
        "nodes": [
          {
            "id": "0x75cdA57917E9F73705dc8BCF8A6B2f99AdBdc5a5",
            "version": "2",
            "network": "ethereum",
            "claim": {
              "nodes": [
                {
                  "id": "63420295",
                  "nft": {
                    "id": "0x7A556cE75729a5E6692BA1d16b1eac49b24586a3-28650",
                    "owner": "0x8f9fACE7B62d2Ab3c7625b7A4Fb3B54131C98843",
                    "campaign": {
                      "id": "6747"
                    }
                  }
                }
              ]
            }
          }
        ]
      }
    }
  }
}
```

:::

::: details Claim Records

#### Request

```graphql
{
  query {
    claimRecords(first: 1) {
      nodes {
        id
        nftId
        spacestationId
        verifyID
        cid
        user
        tx
        block
        timestamp
        network
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
      "claimRecords": {
        "nodes": [
          {
            "id": "63420295",
            "nftId": "0x7A556cE75729a5E6692BA1d16b1eac49b24586a3-28650",
            "spacestationId": "0x75cdA57917E9F73705dc8BCF8A6B2f99AdBdc5a5",
            "verifyID": "63420295",
            "cid": "6747",
            "user": "0x8f9fACE7B62d2Ab3c7625b7A4Fb3B54131C98843",
            "tx": "0x8fef9d511963336ff66f910751aa55dacff5d6e9848027b205ccf65b2b45a3b9",
            "block": "15767192",
            "timestamp": "1666002071",
            "network": "ethereum"
          }
        ]
      }
    }
  }
}
```

:::

::: tip Note
Check the final code repository [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Multi-Chain/galxe).
:::

## What's next?

Congratulations! You have now a locally running SubQuery project that indexes the Galxe NFTs from multiple blockchains and accepts GraphQL API requests.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
