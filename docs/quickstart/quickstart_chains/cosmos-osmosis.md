# Osmosis Quick Start

[Osmosis](https://osmosis.zone/) is a DEX built on the Cosmos ecosystem. It is designed to allow users to trade tokens from different blockchains that are part of the Cosmos ecosystem. Osmosis uses the IBC protocol to enable the transfer of assets between different blockchains, including [Cosmos Hub](https://github.com/subquery/cosmos-subql-starter/tree/main/CosmosHub/cosmoshub-starter), [Akash](./cosmos-akash.md), and others.

## Goals

This guide acts as your entrance to a detailed tutorial for configuring a SubQuery indexer that is specifically designed to index swaps occurring on Osmosis. Upon completing this guide, you will possess a solid understanding of the process for indexing data related to a complex DEX such as Osmosis.

::: info
Osmosis based on the Cosmos SDK, which means you can index chain data via the standard Cosmos RPC interface.

Before we begin, make sure that you have initialised your project using the provided steps in the **[Start Here](../quickstart.md)** section. You must complete the suggested [4 steps](https://github.com/subquery/cosmos-subql-starter#readme) for Cosmos users.
:::

In every SubQuery project, there are 3 key files to update. Let's begin updating them one by one.

::: tip
The final code of this project can be found [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Osmosis/osmosis-starter).
:::

## 1. Your Project Manifest File

The Project Manifest (`project.yaml`) file is an entry point to your project. It defines most of the details on how SubQuery will index and transform the chain data. For Cosmos chains, there are four types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every transaction, run a mapping function
- [MessageHandlers](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every message that matches optional filter criteria, run a mapping function
- [EventHanders](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every event that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to change the datasource handlers. This section lists the triggers that the manifest file looks for on the blockchain to start indexing.

```ts
dataSources: [
  {
    kind: SubqlCosmosDatasourceKind.Runtime,
    startBlock: 11253914,
    mapping: {
      file: "./dist/index.js",
      handlers: [
        {
          handler: "handleMessage",
          kind: SubqlCosmosHandlerKind.Message,
          filter: {
            type: "/osmosis.gamm.v1beta1.MsgSwapExactAmountIn",
          },
        },
      ],
    },
  },
];
```

Within the provided code snippet, we've established a single handler `handleMessage`, which will execute every time a message of the `MsgSwapExactAmountIn` type is detected. This handler is sufficient to monitor and record swaps within Osmosis. Check out our [Manifest File](../../build/manifest/cosmos.md) documentation to get more information about the Project Manifest (`project.ts`) file.

## 2. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of the data that you are using SubQuery to index, hence it's a great place to start. The shape of your data is defined in a GraphQL Schema file with various [GraphQL entities](../../build/graphql.md).

For this project, you'll need to modify your `schema.graphql` file as follows.

```graphql
type Swap @entity {
  id: ID!
  sender: String!
  txHash: String!
  blockHeight: BigInt!
  tokenInDenom: String
  tokenInAmount: BigInt
  tokenOutMin: BigInt!
  swapRoutes: [SwapRoute] @derivedFrom(field: "swap") #This is virtual field
}

type SwapRoute @entity {
  id: ID!
  pool: Pool!
  swap: Swap!
  tokenInDenom: String
  tokenOutDenom: String!
}

type Pool @entity {
  id: ID!
  swapRoutes: [SwapRoute] @derivedFrom(field: "pool") #This is virtual field
}
```

Since we're indexing all swaps, we have a Swap entity that comprises a number of properties, including the sender, ammounts, swapRoutes, and so forth. We also deriving `SwapRoute` as a separate entity as it carries important business information. Finally, we also declaring a `Pool` entity and connnect it to `SwapRoute` so that we can get all the routes that a particular pool take place it.

::: tip Note
Importantly, these relationships not only establish one-to-many connections but also extend to include many-to-many associations. To delve deeper into entity relationships, you can refer to [this section](../../build/graphql.md#entity-relationships). If you prefer a more example-based approach, our dedicated [Hero Course Module](../../academy/herocourse/module3.md) can provide further insights.
:::

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

You will find the generated models in the `/src/types/models` directory. You can conveniently import all these entities from the following directory:

```ts
// Import entity types generated from the GraphQL schema
import { Pool, Swap, SwapRoute } from "../types";
```

As you're creating a new CosmWasm based project, this command will also generate types for your listed protobufs and save them into `src/types` directory, providing you with more typesafety. For example, you can find Osmosis' protobuf definitions in the [official documentation](https://docs.osmosis.zone/apis/grpc#grpcurl). Read about how this is done in [Cosmos Codegen from CosmWasm Protobufs](../../build/introduction.md#cosmos-codegen-from-cosmwasm-protobufs) and [Cosmos Manifest File Configuration](../../build/manifest/cosmos.md#chain-types). The following chain types are used in this example project:

```ts
    chaintypes: new Map([
      [
        "osmosis.gamm.v1beta1",
        {
          file: "./proto/osmosis/gamm/v1beta1/tx.proto",
          messages: ["MsgSwapExactAmountIn"],
        },
      ],
      [
        " osmosis.poolmanager.v1beta1",
        {
          // needed by MsgSwapExactAmountIn
          file: "./proto/osmosis/poolmanager/v1beta1/swap_route.proto",
          messages: ["SwapAmountInRoute"],
        },
      ],
      [
        "cosmos.base.v1beta1",
        {
          // needed by MsgSwapExactAmountIn
          file: "./proto/cosmos/base/v1beta1/coin.proto",
          messages: ["Coin"],
        },
      ],
    ]),
```

The relevant types can be imported from the directory with the newly generated code:

```ts
// Import a smart contract event class generated from provided ABIs
import { MsgSwapExactAmountInMessage } from "../types/CosmosMessageTypes";
```

Check out our [GraphQL Schema](../../build/graphql.md) documentation to get more information on `schema.graphql` file.

Now that you have made essential changes to the GraphQL Schema file, let’s go ahead with the next configuration.

## 3. Add a Mapping Function

Mapping functions determine how chain data is transformed into the optimised GraphQL entities that you previously defined in the `schema.graphql` file.

Navigate to the default mapping function in the `src/mappings` directory and update your mapping files to match the following (**note the additional imports**):

```ts
import { MsgSwapExactAmountInMessage } from "../types/CosmosMessageTypes";
import { Pool, Swap, SwapRoute } from "../types";

async function checkGetPool(id: string): Promise<Pool> {
  // Check that the pool exists and create new ones if now
  let pool = await Pool.get(id);
  if (!pool) {
    pool = new Pool(id);
    await pool.save();
  }
  return pool;
}

export async function handleMessage(
  msg: MsgSwapExactAmountInMessage
): Promise<void> {
  // You can see an example record here https://www.mintscan.io/osmosis/txs/6A22C6C978A96D99FCB08826807C6EB1DCBDCEC6044C35105B624A81A1CB6E24?height=9798771
  logger.info(`New Swap Message received at block ${msg.block.header.height}`);
  logger.info(msg.tx.hash.toString());
  // logger.info(JSON.stringify(msg.tx.tx.events)); // You can use this to preview the data

  // We first create a new swap record
  const swap = Swap.create({
    id: `${msg.tx.hash}-${msg.idx}`,
    txHash: msg.tx.hash,
    blockHeight: BigInt(msg.block.block.header.height),
    sender: msg.msg.decodedMsg.sender,
    tokenInDenom: msg.msg.decodedMsg.tokenIn?.denom,
    tokenInAmount: msg.msg.decodedMsg.tokenIn
      ? BigInt(msg.msg.decodedMsg.tokenIn.amount)
      : undefined,
    tokenOutMin: BigInt(msg.msg.decodedMsg.tokenOutMinAmount),
  });

  // Save this to the DB
  await swap.save();

  // Create swap routes from the array on the message
  let lastTokenOutDenom = swap.tokenInDenom;
  for (const route of msg.msg.decodedMsg.routes) {
    const index = msg.msg.decodedMsg.routes.indexOf(route);
    // Check that the pool aready exists
    const pool = await checkGetPool(route.poolId.toString());

    const swapRoute = SwapRoute.create({
      id: `${msg.tx.hash}-${msg.idx}-${index}`,
      poolId: pool.id,
      swapId: swap.id,
      tokenInDenom: lastTokenOutDenom,
      tokenOutDenom: route.tokenOutDenom,
    });
    lastTokenOutDenom = route.tokenOutDenom;
    await swapRoute.save();
  }
}
```

The provided code has a single handler `handleMessage` - the main function responsible for handling swap messages. It takes a `MsgSwapExactAmountInMessage` as input, which represents a message related to a swap. Then, it creates a new `Swap` record based on arguments derived from message data, and this record is then saved to a database. It also iterates through the routes specified in the message, creating `SwapRoute` records for each route. These records are associated with the corresponding `Pool` and `Swap`, and they are also saved to the database. To check if a pool with a given `id` exists, the handler uses `checkGetPool` function. If a pool doesn't exist, a new pool is created and saved.

🎉 Now, you've effectively developed the handling logic for the Osmosis swaps and populated queryable entities, such as `Swap`, `Pool` and `SwapRoute`. This means you're ready to move on to the [construction phase](#build-your-project) to test the indexer's functionality thus far.

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

Try the following query to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/query.md).

:::details Swaps, Routes and Pools

### Request

```graphql
{
  swaps(first: 1) {
    nodes {
      id
      sender
      tokenInAmount
      tokenInDenom
      tokenOutMin
      txHash
      blockHeight
      swapRoutes {
        nodes {
          id
          poolId
          pool {
            id
          }
          swapId
          tokenInDenom
          tokenOutDenom
        }
      }
    }
  }
}
```

### Response

```json
{
  "data": {
    "swaps": {
      "nodes": [
        {
          "id": "02CB82FD9D669300D7454A25398568C763F839E61D6F5E3195474857B2B67C38-0",
          "sender": "osmo12ndfvm5pmpl0w9gpz7qep5q44exfkz8ulywz4a",
          "tokenInAmount": "294778916",
          "tokenInDenom": "ibc/1480B8FD20AD5FCAE81EA87584D269547DD4D436843C1D20F15E00EB64743EF4",
          "tokenOutMin": "296218304",
          "txHash": "02CB82FD9D669300D7454A25398568C763F839E61D6F5E3195474857B2B67C38",
          "blockHeight": "11253952",
          "swapRoutes": {
            "nodes": [
              {
                "id": "02CB82FD9D669300D7454A25398568C763F839E61D6F5E3195474857B2B67C38-0-0",
                "poolId": "3",
                "pool": {
                  "id": "3"
                },
                "swapId": "02CB82FD9D669300D7454A25398568C763F839E61D6F5E3195474857B2B67C38-0",
                "tokenInDenom": "ibc/1480B8FD20AD5FCAE81EA87584D269547DD4D436843C1D20F15E00EB64743EF4",
                "tokenOutDenom": "uosmo"
              },
              {
                "id": "02CB82FD9D669300D7454A25398568C763F839E61D6F5E3195474857B2B67C38-0-1",
                "poolId": "678",
                "pool": {
                  "id": "678"
                },
                "swapId": "02CB82FD9D669300D7454A25398568C763F839E61D6F5E3195474857B2B67C38-0",
                "tokenInDenom": "uosmo",
                "tokenOutDenom": "ibc/D189335C6E4A68B513C10AB227BF1C1D38C746766278BA3EEB4FB14124F1D858"
              }
            ]
          }
        }
      ]
    }
  }
}
```

:::

## What’s Next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for indexing Osmosis swaps.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
