# Akash Quick Start

## Goals

The goal of this quick start guide is to index all [reward transactions](https://www.mintscan.io/akash/txs/808FED7F3FE680EEF8E005EC1927C0CF00D2975E4B26CEE7A098D5DA7DEA8217?height=11797219) for delegators in the [Akash network](https://akash.network/).

::: info
The Akash network is a chain based on the Cosmos SDK, which means you can index chain data via the standard Cosmos RPC interface.

Before we begin, make sure that you have initialised your project using the provided steps in the **[Start Here](../quickstart.md)** section. You must complete the suggested [4 steps](https://github.com/subquery/cosmos-subql-starter#readme) for Cosmos users.
:::

In every SubQuery project, there are 3 key files to update. Let's begin updating them one by one.

::: tip
The final code of this project can be found [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Akash/akash-starter).
:::

## 1. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of the data that you are using SubQuery to index, hence it's a great place to start. The shape of your data is defined in a GraphQL Schema file with various [GraphQL entities](../../build/graphql.md).

For this project, you'll need to modify your schema.graphql file as follows. Since we're indexing all [reward transactions](https://www.mintscan.io/akash/txs/808FED7F3FE680EEF8E005EC1927C0CF00D2975E4B26CEE7A098D5DA7DEA8217?height=11797219) for delegators in the Akash network, we have a DelegatorReward entity that comprises a number of properties, including reward amount, delegator information, validator's address, and so forth.
We also have a Delegator entity, which keeps track of the total rewards of each delegator.

```graphql
type DelegatorReward @entity {
  id: ID!
  blockHeight: BigInt
  txHash: String
  feeDenomination: String
  feeAmount: BigInt
  rewardAmount: BigInt!
  delegator: Delegator!
  validatorAddress: String
}

type Delegator @entity {
  id: ID!
  totalRewards: BigInt!
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
    startBlock: 11364001
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleReward
          kind: cosmos/EventHandler
          filter:
            type: withdraw_rewards
            messageFilter:
              type: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward"
```

In the code above, we have defined a single handler, `handleReward`, that will be executed whenever a `withdraw_rewards` type is detected within a `MsgWithdrawDelegatorReward` type message. This handler is used to track the rewards transactions of delegators in the Akash network.

Check out our [Manifest File](../../build/manifest/cosmos.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

## 3. Add a Mapping Function

Mapping functions determine how chain data is transformed into the optimised GraphQL entities that you previously defined in the `schema.graphql` file.

Navigate to the default mapping function in the `src/mappings` directory and update your mapping files to match the following (**note the additional imports**):

```ts
import assert from "assert";
import { DelegatorReward, Delegator } from "../types";
import {
  CosmosEvent,
  CosmosBlock,
  CosmosMessage,
  CosmosTransaction,
} from "@subql/types-cosmos";

export async function handleReward(event: CosmosEvent): Promise<void> {
  logger.info(
    `New Reward Withdraw event at block ${event.block.header.height.toString()}`
  );

  const recordAmountString = event.event.attributes.find(
    (a) => a.key === "amount"
  )?.value;
  const validatorAddress = event.event.attributes.find(
    (a) => a.key === "validator"
  )?.value;
  const delegatorAddress = event.tx.tx.events
    .find((e) => e.type === "coins_received")
    ?.attributes.find((a) => a.key === "receiver")?.value;

  var rewardBigInt = BigInt(0);
  if (recordAmountString && Array.from(recordAmountString)[0] != "0") {
    rewardBigInt = BigInt(recordAmountString.split("u")[0]);
  }

  // Confirm we have all required values
  assert(
    rewardBigInt && validatorAddress && delegatorAddress,
    "No reward or no msg found"
  );

  const rewardRecord = DelegatorReward.create({
    id: event.tx.hash,
    blockHeight: BigInt(event.block.block.header.height),
    txHash: event.tx.hash,
    feeDenomination: event.tx.decodedTx.authInfo.fee?.amount[0].denom,
    feeAmount: event.tx.decodedTx.authInfo.fee?.amount[0].amount
      ? BigInt(event.tx.decodedTx.authInfo.fee?.amount[0].amount)
      : undefined,
    rewardAmount: rewardBigInt,
    delegatorId: delegatorAddress,
    validatorAddress: validatorAddress,
  });

  await handleDelegator(rewardRecord.rewardAmount, rewardRecord.delegatorId);
  await rewardRecord.save();
}

async function handleDelegator(reward: bigint, delegatorAddress: string) {
  let delegatorRecord = await Delegator.get(delegatorAddress);

  if (!delegatorRecord) {
    // Create new Delegator record
    delegatorRecord = Delegator.create({
      id: delegatorAddress,
      totalRewards: reward,
    });
    logger.info(
      "New delegator" + delegatorAddress + "with reward" + reward.toString()
    );
  } else {
    // Update delegators total
    delegatorRecord.totalRewards = delegatorRecord.totalRewards + reward;
  }
  await delegatorRecord.save();
}
```

In the Akash SubQuery project, we have two main functions, namely `handleReward` and `handleDelegator`, that were defined in the `src/mappings/mappingHandlers.ts` file.

The `handleReward` function is triggered when a `withdraw_rewards` type event is detected. It receives an event of type `CosmosEvent`, logs a message to the console for debugging purposes, and then tries to extract key data points such as the reward amount, validator address, and delegator address from the `event.event.attributes` (Cosmos events code attributes as an array of key-value pairs).

It then uses these attributes to create a `DelegatorReward` object, recording the reward amount and validator address associated with each reward withdrawal event. This object is subsequently saved in the GraphQL entities that we previously defined in the `schema.graphql` file.

The `handleDelegator` function is invoked within the `handleReward` function. This function is responsible for managing the `Delegator` entity. If a delegator does not already exist in the GraphQL entities, a new one is created with the reward from the current transaction. If the delegator already exists, the total rewards for the delegator are updated by adding the current reward.

This way, we're able to track all delegator rewards on the Akash network, along with the validator from whom the reward came. It's crucial to note that the `handleDelegator` function handles the Delegator entity creation and updates, whilst the `handleReward` function creates the DelegatorReward entity.

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
    delegatorReward(first: 1) {
      nodes {
        id
        delegatorAddress
        validatorAddress
        rewardAmount
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
      "delegatorRewards": {
        "totalCount": 1,
        "nodes": [
          {
            "id": "808FED7F3FE680EEF8E005EC1927C0CF00D2975E4B26CEE7A098D5DA7DEA8217",
            "delegatorAddress": "akash1ckc4z334rfpdcqdz5a85mdtaktt2dtkm58783c5",
            "validatorAddress": "akashvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0uzn073",
            "rewardAmount": "1440293uakt"
          }
        ]
      }
    }
  }
}
```

## What’s Next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for indexing Akash delegator rewards.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
