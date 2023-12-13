# Ethereum Quick Start - Chainlink (Medium)

[Chainlink](https://chain.link/) is a groundbreaking decentralized oracle network that empowers smart contracts to interact with real-world data seamlessly. At the heart of Chainlink's capabilities lies its [Data Feeds](https://chain.link/data-feeds), an essential component that bridges the gap between blockchain and external data sources.

This guide serves as your gateway to a comprehensive guide on setting up a SubQuery indexer specifically tailored to index data from Chainlink Data Feeds. Our mission is to provide you with a detailed, step-by-step journey through the indexer setup process. We'll delve deep into the necessary configurations and explore the intricacies of the underlying logic. By the end of this guide, you'll have a clear understanding of how to index data for a complex oracle network like Chainlink.

This project is an excellent example of [SubQuery's Dynamic Data sources](../../build/dynamicdatasources.md). Chainlink has a `ChainlinkFeedRegistry`, a factory contract that creates other chainlink aggregator contracts. It also gives a real life example of how you can use SubQuery's contract type-generation to access contract functions on the ABI smart contracts.

## Setting Up the Indexer

In this ChainLink indexing project, our primary focus centers on configuring the indexer to exclusively capture logs originating from two specific categories of Chainlink smart contracts:

1. `ChainlinkFeedRegistry` (contract address: `0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf`): This contract empowers you to retrieve Chainlink data feeds directly from asset addresses, eliminating the need to be aware of the feed contract addresses. Essentially, it functions as a smart contract that maps all data feeds.

2. Data Feed Aggregator Contracts: These contracts represent individual data feeds.

For a more comprehensive understanding of how these fundamental mechanisms operate, you can consult the official [Chainlink documentation](https://docs.chain.link/data-feeds/feed-registry).

<!-- @include: ./snippets/gravatar-note.md -->

<!-- @include: ./snippets/quickstart-reference.md -->

For instance, you can locate the ABI for **ChainlinkFeedRegistry** at the bottom of [this page](https://etherscan.io/address/0x47fb2585d2c56fe188d0e6ec628a38b74fceeedf#code). Additionally, you can kickstart your project by using the EVM Scaffolding approach (detailed [here](../quickstart.md#evm-project-scaffolding)). You'll find all the relevant events to be scaffolded in the documentation for each type of smart contract.

::: tip Note
The code snippets provided further have been simplified for clarity. You can find the full and detailed code [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Ethereum/ethereum-chainlink) to see all the intricate details.
:::

### ChainlinkFeedRegistry

Consider the registry smart contract as a dictionary that comprehensively maps all the available feeds. When a new feed is added, this smart contract triggers an event, from which you can extract the address of the respective feed's smart contract.

<!-- @include: ../snippets/evm-manifest-intro.md#level4 -->

In plain language, you only need to set up one handler to index a specific type of log from this contract, which is the `FeedConfirmed` log. Update your manifest file to look like this:

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 12864088,

      options: {
        // Must be a key of assets
        abi: "FeedRegistry",
        address: "0x47fb2585d2c56fe188d0e6ec628a38b74fceeedf",
      },
      assets: new Map([
        ["FeedRegistry", { file: "./abis/FeedRegistry.json" }],
        [
          "AccessControlledOffchainAggregator",
          { file: "./abis/AccessControlledOffchainAggregator.json" },
        ],
      ]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleFeedConfirmed",
            filter: {
              topics: [
                "FeedConfirmed(address,address,address,address,uint16,address)",
              ],
            },
          },
        ],
      },
    },
  ],
}
```

<!-- @include: ../snippets/ethereum-manifest-note.md -->

<!-- @include: ../snippets/schema-intro-level4.md -->

Now, let's think about what information we can get from this smart contract for later searching. The only piece of information we can obtain is the 'DataFeed':

```graphql
type DataFeed @entity {
  id: ID!
  name: String
  asset: String
  assetAddress: String!
  denomination: String
  denominationAddress: String!
  decimals: Int
  live: Boolean!
  phaseId: Int!
  timeCreated: BigInt!
  timeLastPrice: BigInt
  timeDeprecated: BigInt
  prices: [DataPoint!] @derivedFrom(field: "feed")
}
```

As you look into these features, you'll see that there's only one connection mentioned, which is in the `prices` part, and it links to another thing called `DataPoint`. We'll talk about this entity in the [next section](#data-feed-aggregator-contracts).

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/evm-codegen.md -->

```ts
// Import entity types generated from the GraphQL schema
import { DataFeed } from "./types";
import { FeedConfirmedEvent } from "./types/contracts/FeedRegistry";
```

<!-- @include: ../snippets/mapping-intro-level4.md -->

<!-- @include: ../snippets/ethereum-mapping-note.md -->

Writing mappings for this smart contract is a straightforward process. To provide better context, we've included this handler in a separate file `feed-registry.ts` within the `src/mappings` directory. Let's start by importing the necessary modules.

```ts
import { FeedConfirmedEvent } from "./types/contracts/FeedRegistry";
import { DataFeed } from "./types";
import { EthereumLog } from "@subql/types-ethereum";
```

`DataFeed` is a model that we created in a [previous step](#2-updating-graphql-schema-file). On the other hand, `FeedConfirmedEvent` is a TypeScript model automatically generated by the SubQuery SDK to make it easier to work with events.

As a reminder from the configuration step outlined in the [Manifest File](#1configuring-manifest-file), we have a single handler called `handleFeedConfirmed`. Now, let's proceed with its implementation:

```ts
export async function handleFeedConfirmed(
  event: EthereumLog<FeedConfirmedEvent["args"]>
): Promise<void> {
  assert(event.args);
  // Feed Confirmed event is emitted when a feed is added, updated, or removed
  let prevFeed = await DataFeed.get(event.args.previousAggregator);
  // if we haven't since this previous feed before, or the next feed is not the zero address, then this is a new feed and we need to create it
  if (prevFeed == null || event.args.latestAggregator != ZERO_ADDRESS) {
    let dataFeed = DataFeed.create({
      id: event.args.latestAggregator,
      assetAddress: event.args.asset,
      denominationAddress: event.args.denomination,
      timeCreated: event.block.timestamp,
      phaseId: event.args.nextPhaseId,
      live: true,
    });
    await dataFeed.save();
  } else if (prevFeed != null) {
    prevFeed.live = event.args.latestAggregator == ZERO_ADDRESS ? false : true;
    if (prevFeed.live == false) {
      prevFeed.timeDeprecated = event.block.timestamp;
    }
    prevFeed.save();
  }
}
```

Explaining the code provided above, the `handleFeedConfirmed` function accepts an Ethereum event object as its input. This function serves the purpose of capturing essential information when a new feed is confirmed on the blockchain.

It first retrieves the previous data feed using the address provided in the event. Then, it checks if the previous data feed is null (meaning it doesn't exist) or if the latest aggregator address in the event is not a zero address. If either condition is true, it creates a new data feed with various attributes and saves it to the database. If the previous data feed exists and the latest aggregator address is not a zero address, it updates the live status of the previous data feed and, if it's set to false, records the deprecation time.

🎉 Now, you've effectively developed the handling logic for the data feed registry smart contract and populated queryable entity `DataFeed`. This means you're ready to move on to the [build phase](#build-your-project) to test the indexer's functionality thus far.

### Data Feed Aggregator Contracts

As mentioned in the introduction to [Indexer Configuration](#setting-up-the-indexer), a fresh contract is linked to the [feed registry smart contract](#chainlinkfeedregistry) whenever a new feed is confirmed. We use SubQuery's [Dynamic Data Sources](../../build/dynamicdatasources.md) to create a new listener for each new price feed using the following template.

<!-- @include: ../snippets/evm-manifest-intro.md#level4 -->

The feed registry smart contract establishes a connection with a data feed contract for each new data feed. Consequently, we utilize [dynamic data sources](../../build/dynamicdatasources.md) to generate indexers for each new contract:

```ts
{
  templates: [
    {
      kind: EthereumDatasourceKind.Runtime,
      name: "DataFeed",
      options: {
        // Must be a key of assets
        abi: "AccessControlledOffchainAggregator",
      },
      assets: new Map([
        [
          "AccessControlledOffchainAggregator",
          { file: "./abis/AccessControlledOffchainAggregator.json" },
        ],
      ]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleAnswerUpdated",
            filter: {
              topics: ["AnswerUpdated(int256,uint256,uint256)"],
            },
          },
        ],
      },
    },
  ],
}
```

<!-- @include: ../snippets/schema-intro-level4.md -->

Once more, from each newly linked smart contract, we will extract a single entity known as a `DataPoint`. You can expand the `schema.graphql` file to include it in the following way:

```graphql
type DataPoint @entity {
  id: ID!
  feed: DataFeed!
  price: BigInt!
  roundId: BigInt!
  blockNumber: BigInt!
  blockTimestamp: BigInt!
}
```

In addition to the core attributes, we can observe the connection to the entity established in the [previous step](#chainlinkfeedregistry), which is `DataFeed`. As evident, there exists only one data feed for each data point, while multiple data points are associated with a single data feed.

<!-- @include: ./snippets/evm-codegen.md -->

```ts
import { AnswerUpdatedEvent } from "./types/contracts/AccessControlledOffchainAggregator";
import { DataFeed, DataPoint } from "./types";
```

<!-- @include: ../snippets/mapping-intro-level4.md -->

In this scenario, the mapping process involves two substeps:

##### Enabling Handling of Newly Created Smart Contracts

To ensure that the events mentioned earlier are managed for any newly linked data feed smart contract, you'll need to make a small modification to the code in the `feed-registry.ts` file under [feed registry contract mapping](#3-writing-the-mappings). After running `subql codegen`, you can incorporate the following import into that file:

```ts
import { createDataFeedDatasource } from "./types";
```

Then, within `handlePoolCreated` you will have to add the following:

```ts
await createDataFeedDatasource({
  address: event.args.latestAggregator,
});
```

After adding the above code to the handler of feed registry smart contract, you can be sure that the manifested events of all the smart contracts that it is associated with will be handled.

##### Writing Pool Smart Contracts Handlers

As evident from the manifest file, the sole handler that should be included is `handleAnswerUpdated`. Now, let's examine how it is implemented:

```ts
export async function handleAnswerUpdated(
  event: EthereumLog<AnswerUpdatedEvent["args"]>
): Promise<void> {
  assert(event.args);
  const datasource = FeedRegistry__factory.connect(event.address, api);
  let dataFeed = await DataFeed.get(datasource.address);
  if (dataFeed) {
    // if info exists and name is null, then this is the first price for this feed so we can add the information.
    if (dataFeed.name == null && dataFeed.id !== ZERO_ADDRESS) {
      let contract = AccessControlledOffchainAggregator__factory.connect(
        event.address,
        api
      );
      let description = await contract.description();
      if (description) {
        dataFeed.name = description;
        let splitDescription = description.split("/");
        dataFeed.asset = splitDescription[0].trim();
        dataFeed.denomination = splitDescription[1].trim();
      }
      let decimals = await contract.decimals();
      if (decimals) {
        dataFeed.decimals = decimals;
      }
      dataFeed.timeLastPrice = event.block.timestamp;
      dataFeed.save();
    }
    let dataPointId = event.transaction.hash;
    let dataPoint = DataPoint.create({
      id: dataPointId,
      feedId: dataFeed.id,
      price: BigInt(event.args.current.toString()),
      roundId: BigInt(event.args.roundId.toString()),
      blockNumber: BigInt(event.block.number.toString()),
      blockTimestamp: BigInt(event.args.updatedAt.toString()),
    });
    dataPoint.save();
  }
}
```

This code defines a function, `handleAnswerUpdated`, which handles events related to updated answers in the context of a data feed. It retrieves information from the blockchain, such as the data feed's name, asset, denomination, and updates the data feed's attributes accordingly. Additionally, it creates data points associated with the data feed, capturing details like the price, round ID, block number, and block timestamp. This function ensures that data feeds are updated and data points are recorded accurately in response to relevant events.

🎉 At this stage, we have successfully incorporated all the desired entities that can be retrieved from various smart contracts. For each of these entities, we've created mapping handlers to structure and store the data in a queryable format.

::: tip Note
Check the final code repository [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Ethereum/ethereum-chainlink) to observe the integration of all previously mentioned configurations into a unified codebase.
:::

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

::: details Query `dataFeeds`

You can retrieve information from the indexed data feeds using the following GraphQL request:

#### Request

```graphql
{
  dataFeeds(first: 3) {
    nodes {
      id
      name
      asset
      assetAddress
      decimals
      denomination
      denominationAddress
      live
      nodeId
      phaseId
      timeCreated
      timeDeprecated
      timeLastPrice
    }
  }
}
```

#### Response

```json
{
  "data": {
    "dataFeeds": {
      "nodes": [
        {
          "id": "0x145f040dbCDFf4cBe8dEBBd58861296012fCB269",
          "name": "CRVUSD / USD",
          "asset": "CRVUSD",
          "assetAddress": "0xf939E0A03FB07F59A73314E73794Be0E57ac1b4E",
          "decimals": 8,
          "denomination": "USD",
          "denominationAddress": "0x0000000000000000000000000000000000000348",
          "live": true,
          "nodeId": "WyJkYXRhX2ZlZWRzIiwiYmZiMWIzOTYtNTU4OC00MWZiLWI1ZmYtOGJkMTliOWI5ZjY1Il0=",
          "phaseId": 1,
          "timeCreated": "1692975599",
          "timeDeprecated": null,
          "timeLastPrice": "1694517035"
        },
        {
          "id": "0x0000000000000000000000000000000000000000",
          "name": null,
          "asset": null,
          "assetAddress": "0xBC19712FEB3a26080eBf6f2F7849b417FdD792CA",
          "decimals": null,
          "denomination": null,
          "denominationAddress": "0x0000000000000000000000000000000000000348",
          "live": true,
          "nodeId": "WyJkYXRhX2ZlZWRzIiwiY2I0NWNjNTEtYTg5MS00NzY0LWFkNjUtYmU0YWExOTEyNWNlIl0=",
          "phaseId": 2,
          "timeCreated": "1694465231",
          "timeDeprecated": null,
          "timeLastPrice": null
        },
        {
          "id": "0x74263dB73076C1389d12e5F8ff0E6a72AE86CA24",
          "name": "ALCX / ETH",
          "asset": "ALCX",
          "assetAddress": "0xdBdb4d16EdA451D0503b854CF79D55697F90c8DF",
          "decimals": 18,
          "denomination": "ETH",
          "denominationAddress": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
          "live": true,
          "nodeId": "WyJkYXRhX2ZlZWRzIiwiZDgwMGYyMjktNDVmNy00NjM5LWI5OGUtMDI3OTRiMjZjZTJhIl0=",
          "phaseId": 2,
          "timeCreated": "1692975599",
          "timeDeprecated": null,
          "timeLastPrice": "1694543603"
        }
      ]
    }
  }
}
```

In the following example query, we'll focus on the indexed "ALCX / ETH" feed to fetch its data points.

:::

::: details Extract the latest `dataPoints` of a specific `dataFeed`

To obtain the most recent data point for the "ALCX / ETH" data feed, you should run the following query.

#### Request

```graphql
{
  dataFeeds(filter: { name: { equalTo: "ALCX / ETH" } }) {
    nodes {
      id
      name
      asset
      assetAddress
      decimals
      denomination
      denominationAddress
      live
      nodeId
      phaseId
      timeCreated
      timeDeprecated
      timeLastPrice
      prices(orderBy: BLOCK_TIMESTAMP_DESC, first: 1) {
        nodes {
          blockNumber
          blockTimestamp
          id
          nodeId
          price
          roundId
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
    "dataFeeds": {
      "nodes": [
        {
          "id": "0x74263dB73076C1389d12e5F8ff0E6a72AE86CA24",
          "name": "ALCX / ETH",
          "asset": "ALCX",
          "assetAddress": "0xdBdb4d16EdA451D0503b854CF79D55697F90c8DF",
          "decimals": 18,
          "denomination": "ETH",
          "denominationAddress": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
          "live": true,
          "nodeId": "WyJkYXRhX2ZlZWRzIiwiZDgwMGYyMjktNDVmNy00NjM5LWI5OGUtMDI3OTRiMjZjZTJhIl0=",
          "phaseId": 2,
          "timeCreated": "1692975599",
          "timeDeprecated": null,
          "timeLastPrice": "1694543603",
          "prices": {
            "nodes": [
              {
                "blockNumber": "18211436",
                "blockTimestamp": "1695628403",
                "id": "0xa8e02dfde62b4ede0047012d93b91eb9c74b48397a988bc7ad6fe0b037545d73",
                "nodeId": "WyJkYXRhX3BvaW50cyIsImM3MGY0M2EzLWY1NzgtNDU1ZC1iMmM5LTVmYjJiNTE3NmI0MCJd",
                "price": "7892989279954464",
                "roundId": "289"
              }
            ]
          }
        }
      ]
    }
  }
}
```

If you take the value listed under `price` and divide it by 10 to the power of the `decimal` value, you will obtain the precise number displayed on the official Chainlink Data Feeds [webpage](https://data.chain.link/ethereum/mainnet/crypto-eth/alcx-eth).

:::

<!-- @include: ../snippets/whats-next.md -->
