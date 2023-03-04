# Avalanche

## Goals

The goal of this quick start guide is to index all Pangolin token _RewardPaid_ logs.

::: warning Important
Before we begin, make sure that you have initialised your project using the provided steps in the [Start Here](../quickstart.md) section.
:::

Previously, in the [1. Create a New Project](../quickstart.md) section, you must have noted [3 key files](../quickstart.md#_3-make-changes-to-your-project). Let's begin updating them one by one.

::: tip Note
The final code of this project can be found [here](https://github.com/jamesbayly/pangolin-rewards-tutorial).
:::

## 1. Update Your GraphQL Schema File

::: warning Important
Please refer to [this](home.md#_1-update-the-schemagraphql-file) before proceeding
:::

Remove all existing entities and update the `schema.graphql` file as shown below. Here, we are indexing all rewards in Pangolin.

```graphql
type PangolinRewards @entity {
  id: ID! # Id is required and made up of block has and log index
  transactionHash: String!
  blockNumber: BigInt!
  blockHash: String!
  receiver: String
  amount: BigInt
}
```

## 2. Update Your Project Manifest File

::: warning Important
Please read [this](home.md#_2-update-the-project-manifest-file) first before proceeding.
:::

For Avalanche, there are three types of mapping handlers.

- [BlockHanders](../../build/manifest/avalanche.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/avalanche.md#mapping-handlers-and-filters): On each and every transaction that matches optional filter criteria, run a mapping function
- [LogHanders](../../build/manifest/avalanche.md#mapping-handlers-and-filters): On each and every log that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but the datasource handlers needs to be updated. Update the `datasources` section as follows:

```yaml
dataSources:
  - kind: avalanche/Runtime
    startBlock: 7906490 # Block when the first reward is made
    options:
      # Must be a key of assets
      abi: erc20
      ## Pangolin reward contract https://snowtrace.io/token/0x88afdae1a9f58da3e68584421937e5f564a0135b
      address: "0x88afdae1a9f58da3e68584421937e5f564a0135b"
    assets:
      erc20:
        file: "./node_modules/@pangolindex/exchange-contracts/artifacts/contracts/staking-rewards/StakingRewards.sol/StakingRewards.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleLog
          kind: avalanche/LogHandler
          filter:
            ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
            topics:
              - RewardPaid(address user, uint256 reward)
```

The above code indicates that you will be running a `handleLog` mapping function whenever there is an `RewardPaid` log on any transaction from the [Pangolin reward contract](https://snowtrace.io/txs?a=0x60781C2586D68229fde47564546784ab3fACA982&p=1).

Check out our [Manifest File](../../build/manifest/avalanche.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

## 3. Add a Mapping Function

::: warning Important
Please read [this](home.md#_3-update-the-mapping-functions) first before proceeding.
:::

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see three exported functions: `handleBlock`, `handleLog`, and `handleTransaction`. Delete both the `handleBlock` and `handleTransaction` functions as you will only deal with the `handleLog` function.

The `handleLog` function receives event data whenever an event matches the filters, which you specified previously in the `project.yaml`. Let’s make changes to it, process all `RewardPaid` transaction logs, and save them to the GraphQL entities created earlier.

Update the `handleLog` function as follows (**note the additional imports**):

```ts
import { PangolinRewards } from "../types";
import { AvalancheLog } from "@subql/types-avalanche";

export async function handleLog(event: AvalancheLog): Promise<void> {
  const { args } = event;
  if (args) {
    const pangolinRewardRecord = new PangolinRewards(
      `${event.blockHash}-${event.logIndex}`
    );

    pangolinRewardRecord.transactionHash = event.transactionHash;
    pangolinRewardRecord.blockHash = event.blockHash;
    pangolinRewardRecord.blockNumber = BigInt(event.blockNumber);

    pangolinRewardRecord.receiver = args.user;
    pangolinRewardRecord.amount = BigInt(args.reward.toString());

    await pangolinRewardRecord.save();
  }
}
```

The function here receives an `AvalancheLog` which includes transaction log data in the payload. We extract this data and then instantiate a new `PangolinRewards` entity defined earlier in the `schema.graphql` file. After that, we add additional information and then use the `.save()` function to save the new entity (_Note that SubQuery will automatically save this to the database_).

Check out our [Mappings](../../build/mapping/avalanche.md) documentation to get more information on mapping functions.

## 4. Build Your Project

::: warning Important
Please refer to [this](home.md#_4-build-your-project).
:::

## 5. Run Your Project Locally with Docker

::: warning Important
Please refer to [this](home.md#_5-run-your-project-locally-with-docker).
:::

## 6. Query your Project

::: warning Important
Please refer to [this](home.md#_6-query-your-project) before proceeding
:::

Try the following query to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/graphql.md).

```graphql
query {
  pangolinRewards(first: 1) {
    nodes {
      id
      receiver
      amount
      blockNumber
      blockHash
      transactionHash
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "pangolinRewards": {
      "nodes": [
        {
          "id": "0x39b4d0a98192d1509c15543caa70cad7e067a08d98f9b4e335ab92c87585cf54-60",
          "receiver": "0x3F8D6e7bA3A842642Fd362C7122BE8d17DC82555",
          "amount": "48537775882115127788",
          "blockNumber": "7906491",
          "blockHash": "0x39b4d0a98192d1509c15543caa70cad7e067a08d98f9b4e335ab92c87585cf54",
          "transactionHash": "0x202891b2c5c62467b08f04816dfe8ecbaf40e967e1926127318ebcb85c76a46d"
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/jamesbayly/pangolin-rewards-tutorial).
:::

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
