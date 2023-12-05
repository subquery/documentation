# Ethereum Quick Start - Opensea (Medium)

## Goals

Welcome to our comprehensive step-by-step guide dedicated to constructing a SubQuery indexer tailored for the OpenSea marketplace. OpenSea has emerged as a global epicenter for NFTs, establishing itself as a vibrant ecosystem for creators, collectors, and traders alike.

**This guide is designed to seamlessly lead you through the steps of configuring your personal OpenSea SubQuery indexer.**

It's important to note that the indexing process discussed here is designed specifically for the Opensea protocol known as **Seaport**. Seaport represents a groundbreaking web3 marketplace protocol engineered for the secure and efficient buying and selling of NFTs. It's essential to recognize that this protocol extends its utility not solely to OpenSea but to all NFT builders, creators, and collectors. Its core smart contract adheres to open-source principles and operates with inherent decentralization.

## Setting Up the Indexer

In this Seaport indexing project, our main goal is to set up the indexer to only collect information from one smart contract: `0x00000000006c3852cbef3e08e8df289169ede581`, the [SeaportExchange contract](https://etherscan.io/address/0x00000000006c3852cbef3e08e8df289169ede581).

For a more comprehensive understanding of how these fundamental protocol mechanisms operate, you can consult the official [Seaport documentation](https://docs.opensea.io/reference/seaport-overview).

<!-- @include: ./snippets/gravatar-note.md -->

In the earlier section titled "Create a New Project" (refer to [quickstart.md](../quickstart.md)), you should have taken note of three crucial files. To initiate the setup of a project from scratch, you can proceed to follow the steps outlined in the [initialization description](../quickstart.md#2-initialise-a-new-subquery-project). As a prerequisite, you will need to generate types from the ABI files of each smart contract. You can obtain these ABI files by searching for the ABIs of the mentioned smart contract addresses on Etherscan. For instance, you can locate the ABI for the main Seaport smart contract at the bottom of [this page](https://etherscan.io/address/0x00000000006c3852cbef3e08e8df289169ede581#code). Additionally, you can kickstart your project by using the EVM Scaffolding approach (detailed [here](../quickstart.md#evm-project-scaffolding)). You'll find all the relevant events to be scaffolded in the documentation for each type of smart contract.

::: tip Note
The code snippets provided further have been simplified for clarity. You can find the full and detailed code [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Ethereum/ethereum-opensea) to see all the intricate details.
:::

### 1.Configuring the Manifest File

You only need to set up one handler to index a specific type of log from this contract, which is the `OrderFulfilled` log. Update your manifest file to look like this:

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 14946474,

      options: {
        // Must be a key of assets
        abi: "SeaportExchange",
        address: "0x00000000006c3852cbef3e08e8df289169ede581",
      },
      assets: new Map([
        ["SeaportExchange", { file: "./abis/SeaportExchange.abi.json" }],
        ["ERC165", { file: "./abis/ERC165.json" }],
        ["NftMetadata", { file: "./abis/NftMetadata.json" }],
      ]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleOrderFulfilled",
            filter: {
              topics: [
                "OrderFulfilled(bytes32,address,address,address,(uint8,address,uint256,uint256)[],(uint8,address,uint256,uint256,address)[])\n",
              ],
            },
          },
        ],
      },
    },
  ],
}
```

::: tip Note
Check out our [Manifest File](../../build/manifest/ethereum.md) documentation to get more information about the Project Manifest (`project.ts`) file.
:::

### 2. Updating the GraphQL Schema File

Now, let's think about what information we can get from this smart contract for later searching.

```graphql
type Marketplace @entity {
  " Smart contract address of the protocol's main contract (Factory, Registry, etc) "
  id: ID!
  " Number of collections listed on the marketplace. "
  collectionCount: Int!
  ...
  " Sum of marketplaceRevenueETH and creatorRevenueETH. "
  totalRevenueETH: Float!
  " Cumulative unique traders "
  cumulativeUniqueTraders: Int!
}

type Collection @entity {
  " Contract address. "
  id: ID!
  " Collection name, mirrored from the smart contract. Leave null if not available. "
  name: String
  " Collection symbol, mirrored from the smart contract. Leave null if not available. "
  symbol: String
  ...
  " Buyer count. "
  buyerCount: Int!
  " Seller count. "
  sellerCount: Int!
  " Trades of the collection. "
  trades: [Trade!]! @derivedFrom(field: "collection")
}

" Trades exist such as a combination of taker/order and bid/ask. "
type Trade @entity {
  " { Transaction hash }-{ Log index }-{ (optional) ID within bundle } "
  id: ID!
  " Event transaction hash. "
  transactionHash: String!
  ...
  " Collection involved "
  collection: Collection!
  " Stretegy that the trade is executed. "
  strategy: SaleStrategy!
  " Seller account address "
  seller: String!
}

type MarketplaceDailySnapshot @entity {
  " { Contract address }-{# of days since Unix epoch time} "
  id: ID!
  " The marketplace that this snapshot belongs to. "
  marketplace: Marketplace!
  ...
  " Number of traded collections of the day "
  dailyTradedCollectionCount: Int!
  " Number of traded items of the day "
  dailyTradedItemCount: Int!
}

type CollectionDailySnapshot @entity {
  " { Contract address }-{# of days since epoch unix time } "
  id: ID!
  " The collection that this snapshot belongs to. "
  collection: Collection!
  " Block number where the snapshot is taken. "
  blockNumber: BigInt!
  ...
  " Number of traded items of the day "
  dailyTradedItemCount: Int!
}

" A helper entity that maps a trade's order fulfillment method"
type _OrderFulfillment @entity {
  id: ID!
  " The trade being fulfilled"
  trade: Trade!
  " The order filfillment method"
  orderFulfillmentMethod: String
}

" A helper utility entity that works as a set for deduplication purpose. "
type _Item @entity {
  id: ID!
}
```

From the single log we're working with, there's a wealth of information to extract. Notably, there's the `Trade` entity, which signifies the buying and selling activities within a protocol. This entity, as shown in the schema, serves as a link to other entities like `Collection` and `SaleStrategy`. Furthermore, we've included statistical entities, such as `CollectionDailySnapshot` and `MarketplaceDailySnapshot`, to streamline the overall analysis of the protocol's economic dynamics.

::: tip Note
Importantly, these relationships not only establish one-to-many connections but also extend to include many-to-many associations. To delve deeper into entity relationships, you can refer to [this section](../../build/graphql.md#entity-relationships). If you prefer a more example-based approach, our dedicated [Hero Course Module](../../academy/herocourse/module3.md) can provide further insights.
:::

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
// Import entity types generated from the GraphQL schema
import {
  Collection,
  CollectionDailySnapshot,
  Marketplace,
  MarketplaceDailySnapshot,
  _OrderFulfillment,
  Trade,
  _Item,
  _OrderFulfillmentMethod,
  NftStandard,
} from "../types";
```

It will also generate a class for every contract event, offering convenient access to event parameters, as well as information about the block and transaction from which the event originated. You can find detailed information on how this is achieved in the [EVM Codegen from ABIs](../../build/introduction.md#evm-codegen-from-abis) section. All of these types are stored in the `src/types/abi-interfaces` and `src/types/contracts` directories.

```ts
// Import a smart contract event class generated from provided ABIs
import { OrderFulfilledLog } from "../types/abi-interfaces/SeaportExchangeAbi";
```

### 3. Writing the Mappings

Mapping functions define how blockchain data is transformed into the optimized GraphQL entities that we previously defined in the `schema.graphql` file.

::: tip Note
For more information on mapping functions, please refer to our [Mappings](../../build/mapping/ethereum.md) documentation.
:::

Writing mappings for this smart contract is a straightforward process. To provide better context, we've included this handler in a separate file `mapping.ts` within the `src/mappings` directory. Let's start by importing the necessary modules.

```ts
import { OrderFulfilledLog } from "../types/abi-interfaces/SeaportExchangeAbi";
import {
  Collection,
  CollectionDailySnapshot,
  Marketplace,
  MarketplaceDailySnapshot,
  _OrderFulfillment,
  Trade,
  _Item,
  _OrderFulfillmentMethod,
  NftStandard,
} from "../types";
import {
  SpentItemStructOutput,
  ReceivedItemStructOutput,
} from "../types/contracts/SeaportExchange";
import { ERC165__factory } from "../types/contracts/factories/ERC165__factory";
```

`Trade`, `Collection` and other models were created in a [previous step](#2-updating-graphql-schema-file). On the other hand, `OrderFulfilledLog` is a TypeScript model automatically generated by the SubQuery SDK to make it easier to work with events.

As a reminder from the configuration step outlined in the [Manifest File](#1configuring-manifest-file), we have a single handler called `handleOrderFulfilled`. In the context of Seaport indexing, the following code segment illustrates how trade events are handled:

```ts
export async function handleOrderFulfilled(
  event: OrderFulfilledLog
): Promise<void> {
  // Assert event parameters
  assert(event.args);

  // Extract relevant event data
  const offerer = event.args.offerer;
  const recipient = event.args.recipient;
  const offer = event.args.offer;
  const consideration = event.args.consideration;

  // Attempt to retrieve trade details
  const saleResult = tryGetSale(
    event,
    offerer,
    recipient,
    offer,
    consideration
  );
  if (!saleResult) {
    return;
  }

  // Calculate trade-related values
  const isBundle = saleResult.nfts.tokenIds.length > 1;
  const collectionAddr = saleResult.nfts.collection.toString();
  const collection = await getOrCreateCollection(collectionAddr);
  const buyer = saleResult.buyer.toString();
  const seller = saleResult.seller.toString();
  const royaltyFee =
    (saleResult.fees.creatorRevenue / saleResult.money.amount) *
    BIGDECIMAL_HUNDRED;
  const totalNftAmount = saleResult.nfts.amounts.reduce(
    (acc, curr) => acc + BigInt(curr.toString()),
    BIGINT_ZERO
  );
  const volumeETH = saleResult.money.amount / MANTISSA_FACTOR;
  const priceETH = volumeETH / Number(totalNftAmount);

  // Process each trade within the event
  const nNewTrade = saleResult.nfts.tokenIds.length;
  for (let i = 0; i < nNewTrade; i++) {
    const tradeID = isBundle
      ? event.transaction.hash
          .toString()
          .concat("-")
          .concat(event.logIndex.toString())
          .concat("-")
          .concat(i.toString())
      : event.transaction.hash
          .toString()
          .concat("-")
          .concat(event.logIndex.toString());

    // Create a 'Trade' entity for each trade
    const trade = Trade.create({
      // ... Trade details ...
    });
    trade.save();

    // Save trade fulfillment details
    const orderFulfillment = _OrderFulfillment.create({
      // ... Order fulfillment details ...
    });
    orderFulfillment.save();
  }

  // Update collection and marketplace entities
  collection.tradeCount += nNewTrade;
  collection.royaltyFee = royaltyFee;

  // ... (Additional collection and marketplace updates) ...

  // Prepare for updating daily traded item counts
  let newDailyTradedItem = 0;
  for (let i = 0; i < nNewTrade; i++) {
    // ... Create and save daily traded item entities ...
    newDailyTradedItem++;
  }

  // Take collection and marketplace snapshots
  const collectionSnapshot = await getOrCreateCollectionDailySnapshot(
    collectionAddr,
    event.block.timestamp
  );

  // ... (Additional snapshot updates) ...

  const marketplaceSnapshot = await getOrCreateMarketplaceDailySnapshot(
    event.block.timestamp
  );

  // ... (Additional snapshot updates) ...
}
```

This code snippet demonstrates how trade events within the Seaport marketplace are processed and indexed. It covers data extraction, calculation, entity creation, and updates to both collection and marketplace entities. This indexing process is essential for tracking and analyzing trade activity within the Seaport protocol.

🎉 At this stage, we have successfully incorporated all the desired entities that can be retrieved from Seaport smart contracts. For each of these entities, we've a single mapping handler to structure and store the data in a queryable format.

::: tip Note
Check the final code repository [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Ethereum/ethereum-opensea) to observe the integration of all previously mentioned configurations into a unified codebase.
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

::: details Trades

#### Request

```graphql
query {
  trades {
    nodes {
      id
      priceETH
      collectionId
      tokenId
      amount
      buyer
      seller
      logIndex
      transactionHash
      strategy
      timestamp
    }
  }
}
```

#### Response

```json
{
  "data": {
    "trades": {
      "nodes": [
        {
          "id": "0x7f828a396d0a0e20c51b0447866170c7d95a6e19201287966c1ddbe267e618b2-279",
          "priceETH": 0.8,
          "collectionId": "0x75e46bdc52d4A2064dc8850EE0f52EE93BFe337c",
          "tokenId": "5403",
          "amount": "1",
          "buyer": "0x9f62Cb344c26847A28193DA9b78D356330b08Fa1",
          "seller": "0xd14018Ce9Ebe0D66607aa7D0B27748A68AdED64D",
          "logIndex": 279,
          "transactionHash": "0x7f828a396d0a0e20c51b0447866170c7d95a6e19201287966c1ddbe267e618b2",
          "strategy": "STANDARD_SALE",
          "timestamp": "1695861647"
        }
      ]
    }
  }
}
```

:::

::: details Collections

#### Request

```graphql
query {
  collections {
    nodes {
      id
      name
      nftStandard
      tradeCount
      totalSupply
      totalRevenueETH
      royaltyFee
      tradeCount
      cumulativeTradeVolumeETH
    }
  }
}
```

#### Response

```json
{
  "data": {
    "collections": {
      "nodes": [
        {
          "id": "0x75e46bdc52d4A2064dc8850EE0f52EE93BFe337c",
          "name": "QUADHASH : Lion",
          "nftStandard": "ERC721",
          "tradeCount": 1,
          "totalSupply": 8725,
          "totalRevenueETH": 0.02,
          "royaltyFee": 2.5,
          "cumulativeTradeVolumeETH": 0.8
        }
      ]
    }
  }
}
```

:::

## What's next?

Congratulations! You have now a locally running SubQuery project that indexes the major Opensea Seaport entities and accepts GraphQL API requests for transferring data.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
