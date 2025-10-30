# Osmosis Quick Start

[Osmosis](https://osmosis.zone/) is a DEX built on the Cosmos ecosystem. It is designed to allow users to trade tokens from different blockchains that are part of the Cosmos ecosystem. Osmosis uses the IBC protocol to enable the transfer of assets between different blockchains, including [Cosmos Hub](https://github.com/subquery/cosmos-subql-starter/tree/main/CosmosHub/cosmoshub-starter), [Akash](./cosmos-akash.md), and others.

This guide acts as your entrance to a detailed tutorial for configuring a SubQuery indexer that is specifically designed to index swaps occurring on Osmosis. Upon completing this guide, you will possess a solid understanding of the process for indexing data related to a complex DEX such as Osmosis.

<!-- @include: ../snippets/cosmos-quickstart-reference.md -->

::: tip
The final code of this project can be found [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Osmosis/osmosis-starter). We also offer a [pre-recorded workshop](https://www.youtube.com/watch?v=Rp4d4NbVzo4) for this sample project, simplifying the process of keeping up with it.
:::

#### Check out how to get the Cosmos Osmosis starter project running

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/W9nriCvgQvM" frameborder="0" allowfullscreen="true"></iframe>
</figure>

<!-- @include: ../snippets/cosmos-manifest-intro.md#level2 -->

```ts
dataSources: [
  {
    kind: CosmosDatasourceKind.Runtime,
    startBlock: 11253914,
    mapping: {
      file: "./dist/index.js",
      handlers: [
        {
          handler: "handleMessage",
          kind: CosmosHandlerKind.Message,
          filter: {
            type: "/osmosis.gamm.v1beta1.MsgSwapExactAmountIn",
          },
        },
      ],
    },
  },
];
```

Within the provided code snippet, we've established a single handler `handleMessage`, which will execute every time a message of the `MsgSwapExactAmountIn` type is detected. This handler is sufficient to monitor and record swaps within Osmosis. Check out our [Manifest File](../../build/manifest/chain-specific/cosmos.md) documentation to get more information about the Project Manifest (`project.ts`) file.

<!-- @include: ../snippets/cosmos-manifest-note.md -->

<!-- @include: ../snippets/schema-intro.md#level2 -->

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

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/cosmos-codegen.md -->

You will find the generated models in the `/src/types/models` directory. You can conveniently import all these entities from the following directory:

```ts
// Import entity types generated from the GraphQL schema
import { Pool, Swap, SwapRoute } from "../types";
```

As you're creating a new CosmWasm based project, this command will also generate types for your listed protobufs and save them into `src/types` directory, providing you with more typesafety. For example, you can find Osmosis' protobuf definitions in the [official documentation](https://docs.osmosis.zone/apis/grpc#grpcurl). Read about how this is done in [Cosmos Codegen from CosmWasm Protobufs](../../build/introduction.md#cosmos-codegen-from-cosmwasm-protobufs) and [Cosmos Manifest File Configuration](../../build/manifest/chain-specific/cosmos.md#chain-types). The following chain types are used in this example project:

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

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro.md#level2 -->

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
  msg: MsgSwapExactAmountInMessage,
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

<!-- @include: ../snippets/cosmos-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

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

<!-- @include: ../snippets/whats-next.md -->
