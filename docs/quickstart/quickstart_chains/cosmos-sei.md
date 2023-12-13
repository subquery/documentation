# Sei Quick Start

The goal of this quick start guide is to index all ETH-USD exchange rates provided to [Levana’s Sei DEX protocol](https://blog.levana.finance/levana-perpetual-swap-beta-now-live-on-sei-networks-testnet-a-new-era-for-decentralized-crypto-fc0930ea4b9) by the Pyth price oracle.

<!-- @include: ../snippets/cosmos-quickstart-reference.md -->

::: tip
The final code of this project can be found [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Sei/sei-starter).
:::

<!-- @include: ../snippets/cosmos-manifest-intro.md#level2 -->

```ts
{
  dataSources: [
    {
      kind: CosmosDatasourceKind.Runtime,
      startBlock: 24596905,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleFundingRateChangeEvent",
            kind: CosmosHandlerKind.Event,
            filter: {
              // https://sei.explorers.guru/transaction/9A5D1FB99CDFB03282459355E4C7221D93D9971160AE79E201FA2B2895952878
              type: "wasm-funding-rate-change",
              messageFilter: {
                type: "/cosmwasm.wasm.v1.MsgExecuteContract",
              },
            },
          },
          {
            handler: "handleSpotPriceEvent",
            kind: CosmosHandlerKind.Event,
            filter: {
              type: "wasm-spot-price",
              messageFilter: {
                type: "/cosmwasm.wasm.v1.MsgExecuteContract",
              },
            },
          },
        ],
      },
    },
  ],
}
```

The above code defines that you will be running two handlers. A `handleFundingRateChangeEvent` handler which will be triggered when a `wasm-funding-rate-change` type is encountered on a `MsgExecuteContract` type and a `handleSpotPriceEvent` handler which will be triggered when a `wasm-spot-price` type is encountered on a `MsgExecuteContract` type.

<!-- @include: ../snippets/cosmos-manifest-note.md -->

<!-- @include: ../snippets/schema-intro-level2.md -->

Update the `schema.graphql` file as follows. In this project, since we are indexing all ETH-USD exchange rates provided to [Levana’s Sei DEX protocol](https://blog.levana.finance/levana-perpetual-swap-beta-now-live-on-sei-networks-testnet-a-new-era-for-decentralized-crypto-fc0930ea4b9) by the Pyth price oracle, we have a `ExchangeRate` entity that includes a number of properties, including exchange rate data such as the notional and USD price, the long and short rate and also contract details.

Daily aggregated price data such as open, close, low and high prices are also captured in a seperate `DailyAggregation` entity.

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

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/cosmos-codegen.md -->

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro-level2.md -->

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

`handleFundingRateChangeEvent` receives an event of type CosmosEvent, logs a message to the console for debugging purposes and then attempts to obtain the contract address from the `event.event.attributes` (Cosmos events code attributes as an array of key value pairs). This contract address, along with the block height is used as a unique id.

An exchange rate object is then created, provided that it hasn't been created already, and then we look for certain event attributes to index by searching through the attribute keys.

The `handleSpotPriceEvent` handler function works in the same way.

The `updateDailyAggregation` function is called by the previous two functions to determine the highest and lowest price of the day along with the opening and closing price of the day. It is called when each new exhanged rate object is created or update.

<!-- @include: ../snippets/cosmos-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

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

<!-- @include: ../snippets/whats-next.md -->
