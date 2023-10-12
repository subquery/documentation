# Ethereum Quick Start - Chainlink (Medium)

[Chainlink](https://chain.link/) is a groundbreaking decentralized oracle network that empowers smart contracts to interact with real-world data seamlessly. At the heart of Chainlink's capabilities lies its [Data Feeds](https://chain.link/data-feeds), an essential component that bridges the gap between blockchain and external data sources.

## Goals

This guide serves as your gateway to a comprehensive guide on setting up a SubQuery indexer specifically tailored to index data from Chainlink Data Feeds. Our mission is to provide you with a detailed, step-by-step journey through the indexer setup process. We'll delve deep into the necessary configurations and explore the intricacies of the underlying logic. By the end of this guide, you'll have a clear understanding of how to index data for a complex oracle network like Chainlink.

This project is an excellent example of [SubQuery's Dynamic Data sources](../../build/dynamicdatasources.md). Chainlink has a `ChainlinkFeedRegistry`, a factory contract that creates other chainlink aggregator contracts. It also gives a real life example of how you can use SubQuery's contract type-generation to access contract functions on the ABI smart contracts.

## Setting Up the Indexer

In this ChainLink indexing project, our primary focus centers on configuring the indexer to exclusively capture logs originating from two specific categories of Chainlink smart contracts:

1. `ChainlinkFeedRegistry` (contract address: `0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf`): This contract empowers you to retrieve Chainlink data feeds directly from asset addresses, eliminating the need to be aware of the feed contract addresses. Essentially, it functions as a smart contract that maps all data feeds.

2. Data Feed Aggregator Contracts: These contracts represent individual data feeds.

For a more comprehensive understanding of how these fundamental mechanisms operate, you can consult the official [Chainlink documentation](https://docs.chain.link/data-feeds/feed-registry).

::: warning Important
We suggest starting with the [Ethereum Gravatar example](./ethereum-gravatar). The Ethereum Chainlink Data Feeds project is a bit more complicated and introduces some more advanced concepts
:::

In the earlier section titled "Create a New Project" (refer to [quickstart.md](../quickstart.md)), you should have taken note of three crucial files. To initiate the setup of a project from scratch, you can proceed to follow the steps outlined in the [initialization description](../quickstart.md#2-initialise-a-new-subquery-project). As a prerequisite, you will need to generate types from the ABI files of each smart contract. You can obtain these ABI files by searching for the ABIs of the mentioned smart contract addresses on Etherscan. For instance, you can locate the ABI for **ChainlinkFeedRegistry** at the bottom of [this page](https://etherscan.io/address/0x47fb2585d2c56fe188d0e6ec628a38b74fceeedf#code). Additionally, you can kickstart your project by using the EVM Scaffolding approach (detailed [here](../quickstart.md#evm-project-scaffolding)). You'll find all the relevant events to be scaffolded in the documentation for each type of smart contract.

::: tip Note
The code snippets provided further have been simplified for clarity. You can find the full and detailed code [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Ethereum/ethereum-chainlink) to see all the intricate details.
:::

### ChainlinkFeedRegistry

Consider the registry smart contract as a dictionary that comprehensively maps all the available feeds. When a new feed is added, this smart contract triggers an event, from which you can extract the address of the respective feed's smart contract.

#### 1.Configuring the Manifest File

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

::: tip Note
Check out our [Manifest File](../../build/manifest/ethereum.md) documentation to get more information about the Project Manifest (`project.ts`) file.
:::

#### 2. Updating the GraphQL Schema File

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
import { DataFeed } from "./types";
```

It will also generate a class for every contract event, offering convenient access to event parameters, as well as information about the block and transaction from which the event originated. You can find detailed information on how this is achieved in the [EVM Codegen from ABIs](../../build/introduction.md#evm-codegen-from-abis) section. All of these types are stored in the `src/types/abi-interfaces` and `src/types/contracts` directories.

```ts
// Import a smart contract event class generated from provided ABIs
import { FeedConfirmedEvent } from "./types/contracts/FeedRegistry";
```

#### 3. Writing the Mappings

Mapping functions define how blockchain data is transformed into the optimized GraphQL entities that we previously defined in the `schema.graphql` file.

::: tip Note
For more information on mapping functions, please refer to our [Mappings](../../build/mapping/ethereum.md) documentation.
:::

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

🎉 Now, you've effectively developed the handling logic for the data feed registry smart contract and populated queryable entity `DataFeed`. This means you're ready to move on to the [construction phase](#build-your-project) to test the indexer's functionality thus far.

### Data Feed Aggregator Contracts

As mentioned in the introduction to [Indexer Configuration](#setting-up-the-indexer), a fresh contract is linked to the [feed registry smart contract](#chainlinkfeedregistry) whenever a new feed is confirmed. We use SubQuery's [Dynamic Data Sources](../../build/dynamicdatasources.md) to create a new listener for each new price feed using the following template.

#### 1. Configuring the Manifest File

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

#### 2. Updating the GraphQL Schema File

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

Now, the next step involves instructing the SubQuery CLI to generate types based on your project's updated GraphQL schema:

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

This will create update the existing `src/types` directory. All new entites can now be imported from the following directory:

```ts
import { AnswerUpdatedEvent } from "./types/contracts/AccessControlledOffchainAggregator";
import { DataFeed, DataPoint } from "./types";
```

#### 3. Writing the Mappings

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

## What's next?

Congratulations! You have now a locally running SubQuery project that indexes the major Chainlink Data Feeds entities and accepts GraphQL API requests for transferring data.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
