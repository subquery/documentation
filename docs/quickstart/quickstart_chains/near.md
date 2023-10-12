# NEAR Quick Start

## Goals

The goal of this quick start guide is to index all price submissions from priceoracle.near on NEAR's mainnet - it's a great way to quickly learn how SubQuery works on a real world hands-on example.

::: warning Important
Before we begin, make sure that you have initialised your project using the provided steps in the [Start Here](../quickstart.md) section. **Please initialise a NEAR Network project**
:::

Now, let's move forward and update these configurations.

Previously, in the [1. Create a New Project](../quickstart.md) section, you must have noted [3 key files](../quickstart.md#_3-make-changes-to-your-project). Let's begin updating them one by one.

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/near-subql-starter/tree/main/Near/near-priceoracle-example).
:::

## 1. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of the data that you are using SubQuery to index, hence it's a great place to start. The shape of your data is defined in a GraphQL Schema file with various [GraphQL entities](../../build/graphql.md).

Remove all existing entities and update the `schema.graphql` file as follows, here you can see we are indexing all oracles that submit prices on the chain, as well as each individual price submission made to NEAR's price oracle:

```graphql
type Oracle @entity {
  id: ID! # We'll use the account_id of the oracle as the ID
  creator: String!
  blockHeight: BigInt!
  timestamp: BigInt!
}

type Price @entity {
  id: ID!
  oracle: Oracle! # The oracle that reported this price
  assetID: String!
  price: Int!
  decimals: Int!
  blockHeight: BigInt!
  timestamp: BigInt!
}
```

Since we have a [one-to-many relationship](../../build/graphql.md#one-to-many-relationships), we define a foreign key using `oracle: Oracle! # The oracle that reported this price` in the `Price` entity.

::: warning Important
When you make any changes to the schema file, please ensure that you regenerate your types directory.
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

Check out the [GraphQL Schema](../../build/graphql.md) documentation to get in-depth information on `schema.graphql` file.

Now that you have made essential changes to the GraphQL Schema file, let’s move forward to the next file.

## 2. Update Your Project Manifest File

The Project Manifest (`project.ts`) file works as an entry point to your NEAR project. It defines most of the details on how SubQuery will index and transform the chain data. For NEAR, there are three types of mapping handlers (and you can have more than one in each project):

- [BlockHandler](../../build/manifest/near.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/near.md#mapping-handlers-and-filters): On each and every transaction that matches optional filter criteria, run a mapping function
- [ActionHandlers](../../build/manifest/near.md#mapping-handlers-and-filters): On each and every transaction action that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to update the datasource handlers.

We are indexing all transactions sent to the `priceoracle.near` address.

This section in the Project Manifest now imports all the correct definitions and lists the triggers that we look for on the blockchain when indexing.

**Since you are going to index all `priceoracle.near` transactions, you need to update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: NearDatasourceKind.Runtime,
      // You can set any start block you want here. This block was when app.nearcrowd.near was created https://nearblocks.io/txns/6rq4BNMpr8RwxKjfGYbruHhrL1ETbNzeFwcppGwZoQBY
      startBlock: 84662303,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleNewOracle",
            kind: NearHandlerKind.Action,
            filter: {
              type: "FunctionCall",
              methodName: "add_oracle",
              receiver: "priceoracle.near",
            },
          },
          {
            handler: "handleNewPrice",
            kind: NearHandlerKind.Action,
            filter: {
              type: "FunctionCall",
              methodName: "report_prices",
              receiver: "priceoracle.near",
            },
          },
        ],
      },
    },
  ],
}
```

The above code indicates that you will be running a `handleNewPrice` mapping function whenever there is transaction made to the `priceoracle.near` address that includes an action with the method name `report_prices`. Additionally we run the `handleNewOracle` mapping function whenever there is transaction made to the `priceoracle.near` address that includes an action with the method name `add_oracle`.

Check out our [Manifest File](../../build/manifest/near.md) documentation to get more information about the Project Manifest (`project.ts`) file.

Next, let’s proceed ahead with the Mapping Function’s configuration.

## 3. Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Follow these steps to add a mapping function:

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see three exported functions: `handleBlock`, `handleAction`, and `handleAction`. Delete both the `handleBlock` and `handleAction` functions as you will only deal with the `handleAction` function.

The `handleAction` function receives event data whenever an event matches the filters, which you specified previously in the `project.ts`. Let’s make changes to it, process the relevant transaction action, and save them to the GraphQL entities created earlier.

Update the `handleAction` function as follows (**note the additional imports and renaming of functions to `handleNewOracle` and `handleNewPrice`**):

```ts
import { FunctionCall, NearAction, NearTransaction } from "@subql/types-near";
import { Oracle, Price } from "../types";

type NewOracle = {
  account_id: string;
};

type NewPrices = {
  prices: {
    asset_id: string;
    price: {
      multiplier: string;
      decimals: number;
    };
  }[];
};

export async function handleNewOracle(action: NearAction): Promise<void> {
  // Data is encoded in base64 in the args, so we first decode it and parse into the correct type
  const payload: NewOracle = action.action.args.toJson();
  if (payload.account_id && action.transaction) {
    logger.info(
      `Handling new oracle ${payload.account_id} at ${action.transaction.block_height}`
    );
    await checkAndCreateOracle(payload.account_id, action.transaction);
  }
}

export async function handleNewPrice(action: NearAction): Promise<void> {
  // Data is encoded in base64 in the args, so we first decode it and parse into the correct type
  const payload: NewPrices = action.action.args.toJson();
  if (action.transaction) {
    logger.info(
      `Handling new price action at ${action.transaction.block_height}`
    );
    await checkAndCreateOracle(
      action.transaction.signer_id,
      action.transaction
    );
    payload.prices.map(async (p, index) => {
      await Price.create({
        id: `${action.transaction.result.id}-${action.id}-${index}`,
        oracleId: action.transaction.signer_id.toLowerCase(),
        assetID: p.asset_id,
        price: parseInt(p.price.multiplier),
        decimals: p.price.decimals,
        blockHeight: BigInt(action.transaction.block_height),
        timestamp: BigInt(action.transaction.timestamp),
      }).save();
    });
  }
}

async function checkAndCreateOracle(
  account_id: string,
  transaction: NearTransaction
): Promise<void> {
  const oracle = await Oracle.get(account_id.toLowerCase());
  if (!oracle) {
    // We need to create a new one
    await Oracle.create({
      id: account_id.toLowerCase(),
      creator: transaction.signer_id,
      blockHeight: BigInt(transaction.block_height),
      timestamp: BigInt(transaction.timestamp),
    }).save();
  }
}
```

Let’s understand how the above code works.

For the `handleNewOracle` mapping function, the function receives a new `NearAction` payload. The data on this is a JSON payload, so we parse into the correct `NewOracle` type via JSON. We then run the `checkAndCreateOracle` to ensure that we create the oracle if we don't already have it (it checks if it already exists before creating a new `Oracle` entity).

For the `handleNewPrice` mapping function, the function receives a new `NearAction` payload. The data on this is a JSON payload, so we parse into the correct `NewPrices` type via JSON. We then run the `checkAndCreateOracle` to ensure that the oracle we are listing this price for is already known since it's a foreign key (it checks if it already exists before creating a new `Oracle` entity). Finally, for each price submission in the array, we create the price and save it to the store (_Note that SubQuery will automatically save this to the database_).

Check out our [Mappings](../../build/mapping/near.md) documentation to get more information on mapping functions.

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

## 6. Query your Project

Next, let's query our project. Follow these three simple steps to query your SubQuery project:

1. Open your browser and head to `http://localhost:3000`.

2. You will see a GraphQL playground in the browser and the schemas which are ready to query.

3. Find the _Docs_ tab on the right side of the playground which should open a documentation drawer. This documentation is automatically generated and it helps you find what entities and methods you can query.

Try the following query to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/query.md). The query shows a list of the most recent prices, and the most active oracles(by number of prices submitted).

```graphql
query {
  prices(first: 50, orderBy: BLOCK_HEIGHT_DESC) {
    nodes {
      id
      assetID
      price
      decimals
      oracleId
      oracle {
        id
      }
    }
  }
  oracles(first: 50, orderBy: PRICES_COUNT_DESC) {
    nodes {
      id
      creator
      blockHeight
      timestamp
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "prices": {
      "nodes": [
        {
          "id": "FkMfPrritmGbi7dboMHwscDTQFaA2w64E2BMTv2A9V6-0-2",
          "assetID": "dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near",
          "price": 10006,
          "decimals": 10,
          "oracleId": "npo-aurora.near",
          "oracle": {
            "id": "npo-aurora.near"
          }
        },
        {
          "id": "FkMfPrritmGbi7dboMHwscDTQFaA2w64E2BMTv2A9V6-0-1",
          "assetID": "aurora",
          "price": 163242,
          "decimals": 20,
          "oracleId": "npo-aurora.near",
          "oracle": {
            "id": "npo-aurora.near"
          }
        },
        {
          "id": "FkMfPrritmGbi7dboMHwscDTQFaA2w64E2BMTv2A9V6-0-3",
          "assetID": "a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near",
          "price": 9999,
          "decimals": 10,
          "oracleId": "npo-aurora.near",
          "oracle": {
            "id": "npo-aurora.near"
          }
        }
      ]
    },
    "oracles": {
      "nodes": [
        {
          "id": "zerkalo.near",
          "creator": "zerkalo.near",
          "blockHeight": "83600017",
          "timestamp": "1674465246692488448"
        },
        {
          "id": "gloriafoster.near",
          "creator": "gloriafoster.near",
          "blockHeight": "83600014",
          "timestamp": "1674465243614499584"
        },
        {
          "id": "pythia.near",
          "creator": "pythia.near",
          "blockHeight": "83600024",
          "timestamp": "1674465254364237568"
        },
        {
          "id": "npo-aurora.near",
          "creator": "npo-aurora.near",
          "blockHeight": "83600043",
          "timestamp": "1674465275463554048"
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/near-subql-starter/tree/main/Near/near-priceoracle-example).
:::

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
