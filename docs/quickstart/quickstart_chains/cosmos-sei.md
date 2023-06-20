# Sei Quick Start

## Goals

The goal of this quick start guide is to index all eth-usd prices provided to the Levana Dex protocol by the Pyth price oracle.

::: info
Sei Network is a chain based on the Cosmos SDK. Therefore you can index chain data via the standard Cosmos RPC interface. 

Before we begin, make sure that you have initialised your project using the provided steps in the **[Start Here](../quickstart.md)** section. You must complete the suggested [4 steps](https://github.com/subquery/cosmos-subql-starter#readme) for Cosmos users.
:::

In every SubQuery project, there are 3 key files to update. Let's begin updating them one by one.

::: tip
The final code of this project can be found [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Sei/sei-starter).
:::

## 1. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect start. It allows you to define your end goal right at the start.

Update the `schema.graphql` file as follows. Here we are indexing not only standard block data such as the id, blockheight, transaction hash and the timestamp, we are also indexing exchange rate data such as the notional and USD price, the long and short rate and also contract details. 

Daily aggregated price data such as open, close, low and high prices are also captured

```graphql
type ExchangeRate @entity {
  id: ID! # Blockheight-contractaddress
  blockHeight: BigInt!
  timestamp: Date!
  txHash: String!
  contractAddress: String!
  priceNotional: Float
  priceUSD: Float
  longRate: Float
  shortRate: Float
  contractName: String
  contractVersion: String
}

type DailyAggregation @entity {
  id: ID! # 2023-03-05
  openPriceUSD: Float!
  closePriceUSD: Float!
  highPriceUSD: Float!
  lowPriceUSD: Float!
}
```

::: warning Important
When you make any changes to the schema file, do not forget to regenerate your types directory.
:::

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

You will find the generated models in the `/src/types/models` directory.

Check out our [GraphQL Schema](../../build/graphql.md) documentation to get more information on `schema.graphql` file.

Now that you have made essential changes to the GraphQL Schema file, let’s go ahead with the next configuration.

## 2. Update Your Manifest File

The Project Manifest (`project.yaml`) file is an entry point to your project. It defines most of the details on how SubQuery will index and transform the chain data. For Cosmos chains, there are four types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every transaction, run a mapping function
- [MessageHandlers](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every message that matches optional filter criteria, run a mapping function
- [EventHanders](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every event that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to change the datasource handlers. This section lists the triggers that the manifest file looks for on the blockchain to start indexing.

```yml
dataSources:
  - kind: cosmos/Runtime
    startBlock: 15613354
    mapping:
      file: ./dist/index.js
      handlers:
        # Using block handlers slows your project down as they can be executed with each and every block. Only use if you need to
        # - handler: handleBlock
        #   kind: cosmos/BlockHandler
        # Using transaction handlers without filters slows your project down as they can be executed with each and every block
        # - handler: handleTransaction
        #   kind: cosmos/TransactionHandler
        - handler: handleFundingRateChangeEvent
          kind: cosmos/EventHandler
          # https://sei.explorers.guru/transaction/9A5D1FB99CDFB03282459355E4C7221D93D9971160AE79E201FA2B2895952878
          filter:
            type: wasm-funding-rate-change
            messageFilter:
              type: "/cosmwasm.wasm.v1.MsgExecuteContract"
        - handler: handleSpotPriceEvent
          kind: cosmos/EventHandler
          filter:
            type: wasm-spot-price
            messageFilter:
              type: "/cosmwasm.wasm.v1.MsgExecuteContract"
```

The above code defines that you will be running two handlers. A `handleFundingRateChangeEvent` handler which will be triggered when a `wasm-funding-rate-change` type is encountered on a `MsgExecuteContract` type and a `handleSpotPriceEvent` handler which will be triggered when a `wasm-spot-price` type is encountered on a `MsgExecuteContract` type.

Check out our [Manifest File](../../build/manifest/cosmos.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

## 3. Add a Mapping Function

Mapping functions determine how chain data is transformed into the optimised GraphQL entities that you previously defined in the `schema.graphql` file.

Navigate to the default mapping function in the `src/mappings` directory and update your mapping files to match the following (**note the additional imports**):

```ts
import { CosmosEvent } from "@subql/types-cosmos";
import { ExchangeRate, DailyAggregation } from "../types";

async function updateDailyAggregation(date: Date,priceUSD: number): <void> {
  const id = date.toISOString().slice(0, 10);
  let aggregation = await DailyAggregation.get(id);
  if (!aggregation) {
    aggregation = DailyAggregation.create({
      id,
      openPriceUSD: priceUSD,
      highPriceUSD: priceUSD,
      lowPriceUSD: priceUSD,
      closePriceUSD: priceUSD,
    });
  }

  if (priceUSD > aggregation.highPriceUSD) aggregation.highPriceUSD = priceUSD;
  if (priceUSD < aggregation.lowPriceUSD) aggregation.lowPriceUSD = priceUSD;
  aggregation.closePriceUSD = priceUSD;

  await aggregation.save();
}

export async function handleFundingRateChangeEvent(event: CosmosEvent): <void> {
  // We create a new entity using the transaction hash and message index as a unique ID
  logger.info(`New funding rate change at block ${event.block.block.header.height}`);

  const contractAddress: string | undefined = event.event.attributes.find((a) => a.key === "_contract_address")?.value;

  if (contractAddress) {
    const id = `${event.block.header.height}-${contractAddress}`;

    let exchangeRate = await ExchangeRate.get(id);
    if (!exchangeRate) {
      exchangeRate = ExchangeRate.create({
        id,
        blockHeight: BigInt(event.block.header.height),
        timestamp: new Date(event.block.header.time.toISOString()),
        txHash: event.tx.hash,
        contractAddress,
      });
    }

    // Cosmos events code attributes as an array of key value pairs, we're looking for to extract a few things
    // Example https://sei.explorers.guru/transaction/9A5D1FB99CDFB03282459355E4C7221D93D9971160AE79E201FA2B2895952878
    for (const attr of event.event.attributes) {
      if (attr.key === "time") {
        // encoded as seconds
        exchangeRate.timestamp = new Date(parseFloat(attr.value) * 1000);
      } else if (attr.key === "long-rate") {
        exchangeRate.longRate = parseFloat(attr.value);
      } else if (attr.key === "short-rate") {
        exchangeRate.shortRate = parseFloat(attr.value);
      } else if (attr.key === "contract_version") {
        exchangeRate.contractVersion = attr.value;
      } else if (attr.key === "contract_name") {
        exchangeRate.contractName = attr.value;
      }
    }
    await exchangeRate.save();

    if (exchangeRate.priceUSD) {
      await updateDailyAggregation(
        exchangeRate.timestamp,
        exchangeRate.priceUSD
      );
    }
  }
}

export async function handleSpotPriceEvent(event: CosmosEvent): Promise<void> {
  // We create a new entity using the transaction hash and message index as a unique ID
  logger.info(`New spot price change at block ${event.block.block.header.height}`);
  const contractAddress: string | undefined = event.event.attributes.find((a) => a.key === "_contract_address")?.value;

  if (contractAddress) {
    const id = `${event.block.header.height}-${contractAddress}`;

    let exchangeRate = await ExchangeRate.get(id);
    if (!exchangeRate) {
      exchangeRate = ExchangeRate.create({
        id,
        blockHeight: BigInt(event.block.header.height),
        timestamp: new Date(event.block.header.time.toISOString()),
        txHash: event.tx.hash,
        contractAddress,
      });
    }

    // Cosmos events code attributes as an array of key value pairs, we're looking for to extract a few things
    // Example https://sei.explorers.guru/transaction/9A5D1FB99CDFB03282459355E4C7221D93D9971160AE79E201FA2B2895952878
    for (const attr of event.event.attributes) {
      if (attr.key === "time") {
        // encoded as seconds
        exchangeRate.timestamp = new Date(parseFloat(attr.value) * 1000);
      } else if (attr.key === "price-notional") {
        exchangeRate.priceNotional = parseFloat(attr.value);
      } else if (attr.key === "price-base") {
        exchangeRate.priceUSD = parseFloat(attr.value);
      } else if (attr.key === "contract_version") {
        exchangeRate.contractVersion = attr.value;
      } else if (attr.key === "contract_name") {
        exchangeRate.contractName = attr.value;
      }
    }
    await exchangeRate.save();

    if (exchangeRate.priceUSD) {
      await updateDailyAggregation(
        exchangeRate.timestamp,
        exchangeRate.priceUSD
      );
    }
  }
}

```

Here we have three functions. Our `handleFundingRateChangeEvent` and `handleSpotPriceEvent` handler functions which were defined in the manifest file along with an extra function called `updateDailyAggregation`. 

`handleFundingRateChangeEvent` receives an event of type CosmosEvent, logs a message to the console for debugging purposes and then attempts to obtain the contract address from the event.event.attribute. This contract address, along with the blockheight is used as a unique id. 

An exchange rate object is then created, provided that it hasn't been created already, and then we look for certain event attributes to index by searching through the attribute keys. 

The `handleSpotPriceEvent` handler function works in the same way. 

The `updateDailyAggregation` function is called by the previous two functions to determine the highest and lowest price of the day along with the opening and closing price of the day.

 Check out our [Mappings](../../build/mapping/cosmos.md) documentation and get information on the mapping functions in detail.

## 4. Build Your Project

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

## 5. Run Your Project Locally with Docker

Whenever you create a new SubQuery Project, first, you must run it locally on your computer and test it and using Docker is the easiest and quickest way to do this.

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

## 6. Query your Project

Next, let's query our project. Follow these three simple steps to query your SubQuery project:

1. Open your browser and head to `http://localhost:3000`.

2. You will see a GraphQL playground in the browser and the schemas which are ready to query.

3. Find the _Docs_ tab on the right side of the playground which should open a documentation drawer. This documentation is automatically generated and it helps you find what entities and methods you can query.

Try the following queries to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/graphql.md).

```graphql
query {
  exchangeRates(first: 5, orderBy: BLOCK_HEIGHT_DESC) {
    totalCount
    nodes {
      id
      blockHeight
      timestamp
      txHash
      contractName
      contractAddress
      contractVersion
      longRate
      shortRate
      priceNotional
      priceUSD
    }
  }
  dailyAggregations(first: 5, orderBy: ID_DESC) {
    nodes {
      id
      openPriceUSD
      lowPriceUSD
      highPriceUSD
      closePriceUSD
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "exchangeRates": {
      "totalCount": 23,
      "nodes": [
        {
          "id": "15613515-sei1xg9nz66lw2u6esc036tcjug35s06wljenjfn9qntzv6pcee3782q8hyx28",
          "blockHeight": "15613515",
          "timestamp": "2023-06-16T06:59:29.321",
          "txHash": "3BCCD70CCA957630D33E059EA9F74882A53B74603FCFAED0EFB5A4F8DB761153",
          "contractName": "levana.finance:market",
          "contractAddress": "sei1xg9nz66lw2u6esc036tcjug35s06wljenjfn9qntzv6pcee3782q8hyx28",
          "contractVersion": "0.1.0-beta.15",
          "longRate": -0.11993339988124402,
          "shortRate": 0.11803523598915301,
          "priceNotional": 0.000598617598372426,
          "priceUSD": 1670.515539000002
        },
        {
          "id": "15613506-sei1xg9nz66lw2u6esc036tcjug35s06wljenjfn9qntzv6pcee3782q8hyx28",
          "blockHeight": "15613506",
          "timestamp": "2023-06-16T06:59:25.818",
          "txHash": "EB1839610D908D1D3DF71E89EB0CE7C10582FC85EE4A8070298E859AADC03B51",
          "contractName": "levana.finance:market",
          "contractAddress": "sei1xg9nz66lw2u6esc036tcjug35s06wljenjfn9qntzv6pcee3782q8hyx28",
          "contractVersion": "0.1.0-beta.15",
          "longRate": -0.11993339988124402,
          "shortRate": 0.11803523598915301,
          "priceNotional": 0.000598619969003707,
          "priceUSD": 1670.5089234900004
        }
      ]
    },
    "dailyAggregations": {
      "nodes": [
        {
          "id": "2023-06-16",
          "openPriceUSD": 1670.76,
          "lowPriceUSD": 1670.508887540001,
          "highPriceUSD": 1670.8,
          "closePriceUSD": 1670.515539000002
        }
      ]
    }
  }
}
```

## What’s Next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data from bLuna.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
