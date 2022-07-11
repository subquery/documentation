# Polkadot Quick Start

## Goals

The goal of this quick guide is to adapt the standard starter project and start indexing all transfers from Polkadot.

**Important:** Before we begin, make sure that you have initialised your project using the provided steps in the [Start Here](../quickstart.md) section.

Now, let's move forward and update these configurations.

Previously, in the [1. Create a New Project](../quickstart.md) section, you must have noted [3 key files](../quickstart.md#_3-make-changes-to-your-project). Let's begin updating them one by one.

## 1. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal beforehand.

Remove all existing entities and update the `schema.graphql` file as follows:

```graphql
type Transfer @entity {
  id: ID! # id field is always required and must look like this
  amount: BigInt # Amount that is transferred
  blockNumber: BigInt # The block height of the transfer
  from: String! # The account that transfers are made from
  to: String! # The account that transfers are made to
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

Now that you have made essential changes to the GraphQL Schema file, let’s move forward to the next file.

## 2. Update Your Project Manifest File

The Project Manifest (`project.yaml`) file works as an entry point to your project. It defines most of the details on how SubQuery will index and transform the chain data.

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to change the handlers.

**Since we are planning to index all Polkadot transfers, we need to update the `datasources` section as follows:**

```yaml
dataSources:
  - kind: substrate/Runtime
    startBlock: 1
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleEvent
          kind: substrate/EventHandler
          filter:
            module: balances
            method: Transfer
```

This indicates that you will be running a `handleEvent` mapping function whenever there is a `balances.Transfer` event.

Check out our [Manifest File](../../build/manifest.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

Next, let’s proceed ahead with the Mapping Function’s configuration.

## 3. Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Follow these steps to add a mapping function:

- Navigate to the default mapping function in the `src/mappings` directory. You will see three exported functions: `handleBlock`, `handleEvent`, and `handleCall`. Delete both the `handleBlock` and `handleCall` functions as you will only deal with the `handleEvent` function.

- The `handleEvent` function receives event data whenever an event matches the filters that you specified previously in the `project.yaml`. Let’s update it to process all `balances.Transfer` events and save them to the GraphQL entities created earlier.

Update the `handleEvent` function as follows(**note the additional imports**):

```ts
import { SubstrateEvent } from "@subql/types";
import { Transfer } from "../types";
import { Balance } from "@polkadot/types/interfaces";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  // Get data from the event
  // The balances.transfer event has the following payload \[from, to, value\]
  // logger.info(JSON.stringify(event));
  const from = event.event.data[0];
  const to = event.event.data[1];
  const amount = event.event.data[2];

  // Create the new transfer entity
  const transfer = new Transfer(
    `${event.block.block.header.number.toNumber()}-${event.idx}`
  );
  transfer.blockNumber = event.block.block.header.number.toBigInt();
  transfer.from = from.toString();
  transfer.to = to.toString();
  transfer.amount = (amount as Balance).toBigInt();
  await transfer.save();
}
```

Let’s understand how the above code works.

The function here receives a `SubstrateEvent` which includes transfer data in the payload. We extract this data and then instantiate a new `Transfer` entity defined earlier in the `schema.graphql` file. After that, we add additional information and then use the `.save()` function to save the new entity (_SubQuery will automatically save this to the database_).

Check out our [Mappings](../../build/mapping.md) documentation to get detailed information on mapping functions.

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

**Important: Whenever you make changes to your mapping functions, make sure to rebuild your project.**

Now, you are all set to run your first SubQuery project. Let’s dig out the process of running the project in detail.

## 5. Run Your Project Locally with Docker

Whenever you create a new SubQuery Project, first, you must run it locally on your computer and test it. Using Docker is the easiest and quickiest way to do this.

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

## 6. Query Your Project

Next, let's query our project. Follow these three simple steps to query your SubQuery project:

1. Open your browser and head to `http://localhost:3000`.

2. You will see a GraphQL playground in the browser and the schemas which are ready to query.

3. Find the _Docs_ tab on the right side of the playground which should open a documentation drawer. This documentation is automatically generated and it helps you find what entities and methods you can query.

Try the following query to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/graphql.md).

```graphql
{
  query {
    transfers(first: 5, orderBy: AMOUNT_DESC) {
      nodes {
        id
        amount
        blockNumber
        from
        to
      }
    }
  }
}
```

You will see the result similar to below:

```
{
  "data": {
    "query": {
      "transfers": {
        "nodes": [
          {
            "id": "303284-59",
            "amount": "90000000000000000",
            "blockNumber": "303284",
            "from": "15j4dg5GzsL1bw2U2AWgeyAk6QTxq43V7ZPbXdAmbVLjvDCK",
            "to": "1vTfju3zruADh7sbBznxWCpircNp9ErzJaPQZKyrUknApRu"
          },
          {
            "id": "303284-65",
            "amount": "85936000000000000",
            "blockNumber": "303284",
            "from": "15j4dg5GzsL1bw2U2AWgeyAk6QTxq43V7ZPbXdAmbVLjvDCK",
            "to": "14Xs22PogFVE4nfPmsRFhmnqX3RqdrUANZRaVJU7Hik8DArR"
          },
          {
            "id": "303284-71",
            "amount": "80000000000000000",
            "blockNumber": "303284",
            "from": "15j4dg5GzsL1bw2U2AWgeyAk6QTxq43V7ZPbXdAmbVLjvDCK",
            "to": "14AoK8VSrHFxZijXhZGSUipHzZbUgo2AkmEaviD9yxTb1ScX"
          },
          {
            "id": "303284-77",
            "amount": "80000000000000000",
            "blockNumber": "303284",
            "from": "15j4dg5GzsL1bw2U2AWgeyAk6QTxq43V7ZPbXdAmbVLjvDCK",
            "to": "14UpRGUeAfsSZHFN63t4ojJrLNupPApUiLgovXtm7ZiAHUDA"
          },
          {
            "id": "303284-83",
            "amount": "80000000000000000",
            "blockNumber": "303284",
            "from": "15j4dg5GzsL1bw2U2AWgeyAk6QTxq43V7ZPbXdAmbVLjvDCK",
            "to": "11Q7ismkHUbbUexpQc4DgTvedfsh8jKMDV7jZZoQwv57NLS"
          }
        ]
      }
    }
  }
}
```

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
