# Avalanche Quick Start

## Goals

The goal of this quick start guide is to index all Pangolin token _RewardPaid_ logs.

**Important:** Before we begin, make sure that you have initialised your project using the provided steps in the [Start Here](../quickstart.md) section.

Now, let's move forward and update these configurations.

Previously, in the [1. Create a New Project](../quickstart.md) section, you must have noted [3 key files](../quickstart.html#_3-make-changes-to-your-project). Let's begin updating them one by one.

**Note: The final code of this project can be found [here](https://github.com/jamesbayly/pangolin-rewards-tutorial).**

## 1. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal beforehand.

Remove all existing entities and update the `schema.graphql` file as follows:

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

**Important: When you make any changes to the schema file, please ensure that you regenerate your types directory.**

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```shell
yarn codegen
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```shell
npm run-script codegen
```

  </CodeGroupItem>
</CodeGroup>

You will find the generated models in the `/src/types/models` directory.

Check out the [GraphQL Schema](../../build/graphql.md) documentation to get in-depth information on `schema.graphql` file.

Now that you have made essential changes to the GraphQL Schema file, let’s move forward to the next file

## 2. Update Your Project Manifest File

The Project Manifest (`project.yaml`) file works as an entry point to your Avalanche project. It defines most of the details on how SubQuery will index and transform the chain data.

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to change the handlers.

**Since you are going to index all Pangolin approval logs, you need to update the `datasources` section as follows:**

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

Check out our [Manifest File](../../build/manifest.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

Next, let’s proceed ahead with the Mapping Function’s configuration.

## 3. Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Follow these steps to add a mapping function:

- Navigate to the default mapping function in the `src/mappings` directory. You will be able to see three exported functions: _`handleBlock`_, _`handleLog`_, and _`handleTransaction`_. Delete both the `handleBlock` and `handleTransactionl` functions as you will only deal with the `handleLog` function.

- The `handleLog` function receives event data whenever an event matches the filters, which you specified previously in the `project.yaml`. Let’s make changes to it, process all `RewardPaid` transaction logs, and save them to the GraphQL entities created earlier.

Update the `handleLog` function as follows(**note the additional imports**):

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

Let’s understand how the above code works.

The function here receives an Avalanche Log which includes transaction log data in the payload. We extract this data and then instantiate a new `PangolinRewards` entity defined earlier in the `schema.graphql` file. After that, we add additional information and then use the `.save()` function to save the new entity (_Note that SubQuery will automatically save this to the database_).

Check out our [Mappings](../../build/mapping.md) documentation to get more information on mapping functions.

## 4. Build Your Project

Next, build your work to run your new SubQuery project. Run the build command from the project's root directory as given here:

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```shell
yarn build
```

  </CodeGroupItem>
  <CodeGroupItem title="NPM">

```shell
npm run-script build
```

  </CodeGroupItem>
</CodeGroup>

**Important: Whenever you make changes to your mapping functions, you must rebuild your project.**

Now, you are ready to run your first SubQuery project. Let’s check out the process of running your project in detail.

## 5. Run Your Project Locally with Docker

Whenever you create a new SubQuery Project, first, you must run it locally on your computer and test it and using Docker is the easiest and quickiest way to do this.

The `docker-compose.yml` file defines all the configurations that control how a SubQuery node runs. For a new project, which you have just initialised, you won't need to change anything.

However, visit the [Running SubQuery Locally](../../run_publish/run.md) to get more information on the file and the settings.

Run the following command under the project directory:

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```shell
yarn start:docker
```

  </CodeGroupItem>
  <CodeGroupItem title="NPM">

```shell
npm run-script start:docker
```

  </CodeGroupItem>
</CodeGroup>

**Note:** It may take a few minutes to download the required images and start the various nodes and Postgres databases.

## 6. Query your Project

Next, let's query our project. Follow these three simple steps to query your SubQuery project:

1. Open your browser and head to [http://localhost:3000](http://localhost:3000).

2. You will see a GraphQL playground in the browser and the schemas which are ready to query.

3. Find the _Docs_ tab on the right side of the playground which should open a documentation drawer. This documentation is automatically generated and it helps you find what entities and methods you can query.

Try the following query to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/graphql.md).

```graphql
query {
  pangolinRewards(first: 5) {
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

**Note: The final code of this project can be found [here](https://github.com/jamesbayly/pangolin-rewards-tutorial).**

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
