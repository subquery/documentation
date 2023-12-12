# Agoric Quick Start

The goal of this quick start guide is to index all transfer events and messages on the [Agoric network](https://agoric.com/).

::: info
The Agoric network is a chain based on the Cosmos SDK, which means you can index chain data via the standard Cosmos RPC interface.

Before we begin, make sure that you have initialised your project using the provided steps in the **[Start Here](../quickstart.md)** section. You must complete the suggested [4 steps](https://github.com/subquery/cosmos-subql-starter#readme) for Cosmos users.
:::

In every SubQuery project, there are 3 key files to update. Let's begin updating them one by one.

::: tip
The final code of this project can be found [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Agoric/agoric-starter).
:::

## 1. Your Project Manifest File

The Project Manifest (`project.ts`) file is an entry point to your project. It defines most of the details on how SubQuery will index and transform the chain data. For Cosmos chains, there are four types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every transaction, run a mapping function
- [MessageHandlers](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every message that matches optional filter criteria, run a mapping function
- [EventHanders](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every event that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to change the datasource handlers. This section lists the triggers that the manifest file looks for on the blockchain to start indexing.

```ts
{
  dataSources: [
    {
      kind: CosmosDatasourceKind.Runtime,
      startBlock: 11628269,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleEvent",
            kind: CosmosHandlerKind.Event,
            filter: {
              type: "transfer",
              messageFilter: {
                type: "/cosmos.bank.v1beta1.MsgSend",
              },
            },
          },
          {
            handler: "handleMessage",
            kind: CosmosHandlerKind.Message,
            filter: {
              type: "/cosmos.bank.v1beta1.MsgSend",
            },
          },
        ],
      },
    },
  ],
}
```

In the code above we have defined two handlers. `handleEvent` will be executed whenever a `transfer` type is detected within a message filter of `/cosmos.bank.v1beta1.MsgSend` type. `handleMessage` is the other handler that will be triggered when a `/cosmos.bank.v1beta1.MsgSend` filter type is triggered. These handlers ared used to track the transfers and messages within the Agoric network.

Check out our [Manifest File](../../build/manifest/cosmos.md) documentation to get more information about the Project Manifest (`project.ts`) file.

## 2. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of the data that you are using SubQuery to index, hence it's a great place to start. The shape of your data is defined in a GraphQL Schema file with various [GraphQL entities](../../build/graphql.md).

index all transfer events and messages

For this project, you'll need to modify your schema.graphql file as follows. Since we're indexing all [transfer events & messages](https://agoric.explorers.guru/transaction/69D296C6E643621429959A5B25D2F3DE1F1A67A5481FC1B7986322DBEA61BF8D) on the Agoric network, we have a TransferEvent and Message entity that contain a number of fields, including blockHeight, recipient/to, sender/from, and amount

```graphql
type TransferEvent @entity {
  id: ID!
  blockHeight: BigInt!
  txHash: String!
  recipient: String!
  sender: String!
  amount: String!
}

type Message @entity {
  id: ID!
  blockHeight: BigInt!
  txHash: String!
  from: String!
  to: String!
  amount: String!
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

As you're creating a new CosmWasm based project, this command will also generate types for your listed protobufs and save them into `src/types` directory, providing you with more typesafety. Read about how this is done in [Cosmos Codegen from CosmWasm Protobufs](../../build/introduction.md#cosmos-codegen-from-cosmwasm-protobufs).

Check out our [GraphQL Schema](../../build/graphql.md) documentation to get more information on `schema.graphql` file.

Now that you have made essential changes to the GraphQL Schema file, let’s go ahead with the next configuration.

## 3. Add a Mapping Function

Mapping functions determine how chain data is transformed into the optimised GraphQL entities that you previously defined in the `schema.graphql` file.

Navigate to the default mapping function in the `src/mappings` directory and update your mapping files to match the following (**note the additional imports**):

```ts
import { TransferEvent, Message } from "../types";
import {
  CosmosEvent,
  CosmosBlock,
  CosmosMessage,
  CosmosTransaction,
} from "@subql/types-cosmos";

export async function handleMessage(msg: CosmosMessage): Promise<void> {
  const messageRecord = Message.create({
    id: `${msg.tx.hash}-${msg.idx}`,
    blockHeight: BigInt(msg.block.block.header.height),
    txHash: msg.tx.hash,
    from: msg.msg.decodedMsg.fromAddress,
    to: msg.msg.decodedMsg.toAddress,
    amount: JSON.stringify(msg.msg.decodedMsg.amount),
  });
  await messageRecord.save();
}

export async function handleEvent(event: CosmosEvent): Promise<void> {
  const eventRecord = TransferEvent.create({
    id: `${event.tx.hash}-${event.msg.idx}-${event.idx}`,
    blockHeight: BigInt(event.block.block.header.height),
    txHash: event.tx.hash,
    recipient: "",
    amount: "",
    sender: "",
  });
  for (const attr of event.event.attributes) {
    switch (attr.key) {
      case "recipient":
        eventRecord.recipient = attr.value;
        break;
      case "amount":
        eventRecord.amount = attr.value;
        break;
      case "sender":
        eventRecord.sender = attr.value;
        break;
      default:
        break;
    }
  }
  await eventRecord.save();
}
```

In the Agoric SubQuery project, we have two main functions, namely `handleMessage` and `handleEvent`, that were defined in the `src/mappings/mappingHandlers.ts` file.

The `handleMessage` function is triggered when a `/cosmos.bank.v1beta1.MsgSend` type message is detected. It receives a message of type `CosmosMessage`, and then extracts key data points such as blockHeight, transaction hash, from, to and amount from the `msg` object.

The `handleEvent` function is also triggered when a `/cosmos.bank.v1beta1.MsgSend` type message is detected for a transfer. It receives an event of type `CosmosEvent`, and then it also extracts blockHeight, transaction hash, from, to and amount from the `event` object.

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

Try the following queries to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/query.md).

```graphql
{
  query {
    transferEvents(first: 2) {
      nodes {
        id
        blockHeight
        txHash
        recipient
        sender
        amount
      }
    }
    messages(first: 2) {
      nodes {
        id
        blockHeight
        txHash
        from
        to
        amount
      }
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "query": {
      "transferEvents": {
        "nodes": [
          {
            "id": "69D296C6E643621429959A5B25D2F3DE1F1A67A5481FC1B7986322DBEA61BF8D-0-217",
            "blockHeight": "12310659",
            "txHash": "69D296C6E643621429959A5B25D2F3DE1F1A67A5481FC1B7986322DBEA61BF8D",
            "recipient": "agoric14nnv35u887jjf2sy24cfvmh2dq3h58c7lv5sxk",
            "sender": "agoric1xa6pnqj4jpw06n3ffdrtgc5644rgd79hfzq7mc",
            "amount": "69979701ubld"
          },
          {
            "id": "B35A81D98AAE07FB638064FD1CA2F06D72CF877B18F55A285BC162F321A2FF16-0-218",
            "blockHeight": "12308513",
            "txHash": "B35A81D98AAE07FB638064FD1CA2F06D72CF877B18F55A285BC162F321A2FF16",
            "recipient": "agoric153xw08gz7emm4y28tekzgy3ewmgdykdz6csznj",
            "sender": "agoric142sgu52x5d9w79yzp5c43z0z5n4dstvxp7lajw",
            "amount": "974720000ubld"
          }
        ]
      },
      "messages": {
        "nodes": [
          {
            "id": "B35A81D98AAE07FB638064FD1CA2F06D72CF877B18F55A285BC162F321A2FF16-0",
            "blockHeight": "12308513",
            "txHash": "B35A81D98AAE07FB638064FD1CA2F06D72CF877B18F55A285BC162F321A2FF16",
            "from": "agoric142sgu52x5d9w79yzp5c43z0z5n4dstvxp7lajw",
            "to": "agoric153xw08gz7emm4y28tekzgy3ewmgdykdz6csznj",
            "amount": "[{\"denom\":\"ubld\",\"amount\":\"974720000\"}]"
          },
          {
            "id": "627DFE0E4C1188D66FCE63D37ABE40907F9157F5FEC6BB7C98888629E12AFDAE-0",
            "blockHeight": "12309508",
            "txHash": "627DFE0E4C1188D66FCE63D37ABE40907F9157F5FEC6BB7C98888629E12AFDAE",
            "from": "agoric142sgu52x5d9w79yzp5c43z0z5n4dstvxp7lajw",
            "to": "agoric1nrtnwnu8930dm8sjlghpjxzykl4jy0dazrlxxc",
            "amount": "[{\"denom\":\"ubld\",\"amount\":\"1178914251\"}]"
          }
        ]
      }
    }
  }
}
```

::: tip
The final code of this project can be found [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Agoric/agoric-starter).
:::

## What’s Next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for indexing Agoric transfer events.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
