# Archway Quick Start

## Goals

The goal of this quick start guide is to index all [Archway contract metadata](https://docs.archway.io/developers/rewards/managing-rewards#contract-metadata) as well as all rewards paid out to contract developers.

::: info
Archway is a chain based on the Cosmos SDK. Therefore you can index chain data via the standard Cosmos RPC interface.

Before we begin, make sure that you have initialised your project using the provided steps in the **[Create a New Project](../quickstart.md)** section.
:::

In every SubQuery project, there are 3 key files to update. Let's begin updating them one by one.

::: tip
The final code of this project can be found [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Archway/archway-starter).
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
      startBlock: 1338,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleRewardsWithdrawEvent",
            kind: CosmosHandlerKind.Event,
            filter: {
              type: "archway.rewards.v1.RewardsWithdrawEvent",
              messageFilter: {
                type: "/archway.rewards.v1.MsgWithdrawRewards",
              },
              /*
                contractCall field can be specified here too
                values: # A set of key/value pairs that are present in the message data
                contract: "juno1v99ehkuetkpf0yxdry8ce92yeqaeaa7lyxr2aagkesrw67wcsn8qxpxay0"
              */
            },
          },
          {
            handler: "handleSetContractMetadata",
            kind: CosmosHandlerKind.Message,
            filter: {
              /*
                Filter to only messages with the MsgSetContractMetadata function call
                e.g. https://archway.explorers.guru/transaction/EBEE24728FCDA79EF167625D66F438236ED17579CAA7229A562C5AB84608B5A4
              */
              type: "/archway.rewards.v1.MsgSetContractMetadata",
            },
          },
        ],
      },
    },
  ],
}
```

The above code defines that you will be running two handlers. A `handleRewardsWithdrawEvent` handler which will be triggered when a `RewardsWithdrawEvent` type is encountered on a `MsgWithdrawRewards` messageFilter type and a `handleSetContractMetadata` handler which will be triggered when a `MsgSetContractMetadata` type is encountered.

Check out our [Manifest File](../../build/manifest/cosmos.md) documentation to get more information about the Project Manifest (`project.ts`) file.

## 2. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of the data that you are using SubQuery to index, hence it's a great place to start. The shape of your data is defined in a GraphQL Schema file with various [GraphQL entities](../../build/graphql.md).

Update the `schema.graphql` file as follows. In this project, since we are indexing all [Archway's contract metadata](https://docs.archway.io/developers/rewards/managing-rewards#contract-metadata) as well as all rewards paid to contract developers, we define one entity for each to record each instance of this. Each entity has a number of properties, including id, blockheight, transaction hash and the timestamp, we are also indexing contract, owner and reward addresses.

```graphql
type ContractMetadata @entity {
  id: ID! # contractAddress
  createdBlockHeight: BigInt!
  createdDate: Date!
  createdTxHash: String!
  contractAddress: String!
  ownerAddress: String!
  rewardsAddress: String!
}

type RewardWithdrawl @entity {
  id: ID!
  blockHeight: BigInt!
  date: Date!
  txHash: String!
  rewardAddress: String!
  denom: String!
  amount: BigInt!
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
import { CosmosEvent, CosmosMessage } from "@subql/types-cosmos";
import { ContractMetadata, RewardWithdrawl } from "../types";
import { MsgSetContractMetadata } from "../types/proto-interfaces/archway/rewards/v1/tx";

export async function handleSetContractMetadata(
  msg: CosmosMessage<MsgSetContractMetadata>
): Promise<void> {
  // Example https://archway.explorers.guru/transaction/485EC908712CCDC0D65918F0E8E90E291D32720F2D0C691CCC055544B98C14A1
  logger.info(
    `New Set contract metadata at block ${msg.block.header.height.toString()}`
  );

  // contract metadata can be set and updated on the same contract call
  let contractMetadataRecord = await ContractMetadata.get(
    msg.msg.decodedMsg.metadata.contractAddress
  );
  if (!contractMetadataRecord) {
    // we are creating a new one
    contractMetadataRecord = ContractMetadata.create({
      id: msg.msg.decodedMsg.metadata.contractAddress,
      createdBlockHeight: BigInt(msg.block.block.header.height),
      createdDate: new Date(msg.block.header.time.toISOString()),
      createdTxHash: msg.tx.hash,
      contractAddress: msg.msg.decodedMsg.metadata.contractAddress,
      ownerAddress:
        msg.msg.decodedMsg.metadata.ownerAddress ||
        msg.msg.decodedMsg.senderAddress,
      rewardsAddress: msg.msg.decodedMsg.metadata.rewardsAddress,
    });
  } else {
    // we are updating
    contractMetadataRecord.contractAddress =
      msg.msg.decodedMsg.metadata.contractAddress;
    contractMetadataRecord.ownerAddress =
      msg.msg.decodedMsg.metadata.ownerAddress;
    contractMetadataRecord.rewardsAddress =
      msg.msg.decodedMsg.metadata.rewardsAddress;
  }
  // Save the data
  await contractMetadataRecord.save();
}

export async function handleRewardsWithdrawEvent(
  event: CosmosEvent
): Promise<void> {
  // Example https://archway.explorers.guru/transaction/CB3AF6F8F38A6628A22E45CAD178D435D42D5A1CAAC431D16CBE64557F2CBEC3
  logger.info(
    `New Reward Withdraw event at block ${event.block.header.height.toString()}`
  );

  // Attributes are stored as key value pairs
  const rewardAddress = event.event.attributes.find(
    (a) => a.key === "reward_address"
  )?.value;
  const rewardsString = event.event.attributes.find(
    (a) => a.key === "rewards"
  )?.value;

  if (rewardAddress && rewardsString) {
    const rewards: { denom: string; amount: string }[] =
      JSON.parse(rewardsString);

    rewards.forEach(async (reward, index) => {
      const rewardWithdrawlEvent = RewardWithdrawl.create({
        id: `${event.tx.hash}-${event.msg.idx}-${event.idx}-${index}`,
        blockHeight: BigInt(event.block.block.header.height),
        date: new Date(event.block.header.time.toISOString()),
        txHash: event.tx.hash,
        rewardAddress,
        denom: reward.denom,
        amount: BigInt(reward.amount),
      });

      await rewardWithdrawlEvent.save();
    });
  }
}
```

Here we have two functions, `handleSetContractMetadata` and `handleRewardsWithdrawEvent` handler functions which were defined in the manifest file.

`handleSetContractMetadata` receives a message of type `CosmosMessage<MsgSetContractMetadataMessage>`
, logs the blockheight of the message to the console for debugging purposes and then attempts to obtain the various metadata such as the contractAddress, ownerAddress and rewardsAddress from the `msg` parameter that was passed into the function. Note that the contract address is used as a unique id.

The `handleRewardsWithdrawEvent` function works in a similar way where the event of type `CosmosEvent` is passed into this function and then we look for certain event attributes to index by searching through the attribute keys. Finally, the fields of the `RewardWithdrawl` entity are populated appropriately.

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
query {
  contractMetadata(first: 5) {
    nodes {
      id
      ownerAddress
      rewardsAddress
      contractAddress
    }
  }
  rewardWithdrawls(first: 5, orderBy: AMOUNT_DESC) {
    nodes {
      id
      date
      amount
      denom
      rewardAddress
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "contractMetadata": {
      "totalCount": 2,
      "nodes": [
        {
          "id": "archway1275jwjpktae4y4y0cdq274a2m0jnpekhttnfuljm6n59wnpyd62qppqxq0",
          "ownerAddress": "archway1n7d4c52knwqqkw9j975ranknkp4fn3we0unrp6",
          "rewardsAddress": "archway1n7d4c52knwqqkw9j975ranknkp4fn3we0unrp6",
          "contractAddress": "archway1275jwjpktae4y4y0cdq274a2m0jnpekhttnfuljm6n59wnpyd62qppqxq0"
        },
        {
          "id": "archway1cf5rq0amcl5m2flqrtl4gw2mdl3zdec9vlp5hfa9hgxlwnmrlazsdycu4l",
          "ownerAddress": "archway1n7d4c52knwqqkw9j975ranknkp4fn3we0unrp6",
          "rewardsAddress": "archway1n7d4c52knwqqkw9j975ranknkp4fn3we0unrp6",
          "contractAddress": "archway1cf5rq0amcl5m2flqrtl4gw2mdl3zdec9vlp5hfa9hgxlwnmrlazsdycu4l"
        }
      ]
    },
    "rewardWithdrawls": {
      "nodes": []
    }
  }
}
```

## What’s Next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for indexing Archway contract metadata and the rewards paid to contract developers.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
