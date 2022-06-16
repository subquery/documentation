# Polkadot Quick Start

## Develop Your First SubQuery SubStrate/Polkadot Project 

The goal of this quick guide is to adapt the standard starter project and start indexing all transfers from Polkadot. 

You must have completed the installation of the required software support and initialised your first Polkadot Project. 

Now, the next step is making changes to your files and running the project. 

**Important:** Before we begin, make sure that you have initialised your project using the provided steps in the [Beginners' Quick Guide](../quickstart.md). You must have got an output similar to as follows:

```shell
$ subql init
Project name [subql-starter]: HelloWorld
? Select a network family Substrate
? Select a network Polkadot
? Select a template project subql-starter     Starter project for subquery
RPC endpoint: [wss://polkadot.api.onfinality.io/public-ws]: 
Git repository [https://github.com/subquery/subql-starter]: 
Fetching network genesis hash... done
Author [Ian He & Jay Ji]: Sean
Description [This project can be use as a starting po...]: 
Version [1.0.0]: 
License [MIT]: 
Preparing project... done
HelloWorld is ready
```

Now, let's take you ahead and update these configurations one by one. 

## 1. Make Changes to Your Project

Previously, in the [Beginner's Quick Guide](../quickstart.md), you got clear information on the three standard configurations of the project. Let's begin updating them one by one. 

### 1.1 Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect start. It allows you to define your end goal beforehand.

Update the `schema.graphql` file as follows:

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

Check out our [Build/GraphQL](../../build/graphql.md) Schema documentation to get more information on `schema.graphql` file.

Now that you have made essential changes to the GraphQL Schema file, let’s move forward to the next configuration. 

### 1.2 Update Your Project Manifest File

The Project Manifest (`project.yaml`) file works as an entry point to your project. It defines most of the details on how SubQuery will index and transform the chain data.

Note that the manifest file has already been set up correctly but we need to change our handlers. *Since we are planning to index all Polkadot transfers, we need to update the `datasources` section as follows:*

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

Check out our [Build/Manifest File](../../build/manifest.md) documentation to get more information about the Project Manifest (`project.yaml`) file. 

Next, let’s proceed ahead with the Mapping Function’s configuration. 

### 1.3 Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Follow these steps to add a mapping function: 

- Navigate to the default mapping function in the `src/mappings` directory. You will see three exported functions:  `handleBlock`, `handleEvent`, and `handleCall`. Delete both the `handleBlock` and `handleCall` functions as you will only deal with the `handleEvent` function.

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
        `${event.block.block.header.number.toNumber()}-${event.idx}`,
    );
    transfer.blockNumber = event.block.block.header.number.toBigInt();
    transfer.from = from.toString();
    transfer.to = to.toString();
    transfer.amount = (amount as Balance).toBigInt();
    await transfer.save();
}
```

Let’s understand how the above code works. 

The function here receives a `SubstrateEvent` which includes transfer data in the payload. We extract this data and then instantiate a new `Transfer` entity defined earlier in the `schema.graphql` file. After that, we add additional information and then use the `.save()` function to save the new entity (*SubQuery will automatically save this to the database*).

Check out our [Build/Mappings](../../build/mapping.md) documentation to get detailed information on mapping functions.

You are about to finish and create your first project. However, there is still an additional and necessary step required to run your SubQuery Project. Take a look further. 


### 1.4 Build Your Project

You need to build your work first, in order to run your new SubQuery project. Run the build command from the project's root directory as follows:


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

## 2. Run and Query Your Project

### 2.1 Run Your Project with Docker

Whenever you create a new SubQuery Project, first, you must run it locally on your computer and test it. And using Docker is the easiest way to do this. 

`docker-compose.yml` file defines all the configurations that control how a SubQuery node runs. For a new project, which you have just initialised, you won't need to change anything.

However, you must visit the [Run a Project](../../run_publish/run.md) section and get detailed information on the file and the settings. 

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

**Note**: It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time, but soon you will see a running SubQuery node on the terminal screen. 

Now, move on further and query your project by following the guided steps. 

### 2.2 Query Your Project

Follow these three simple steps to query your SubQuery project:

1. Open your browser and head to [http://localhost:3000](http://localhost:3000).

2. You will see a GraphQL playground in the browser and the schemas which are ready to query. 

3. Find a *Docs* button on the top right corner of the playground which should open a documentation draw. This documentation is automatically generated and it helps you find what entities and methods you can query.

Try the following query to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/graphql.md). 


```graphql
{
  query {
    transfers(
      first: 10,
      orderBy: AMOUNT_DESC
    ) {
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
You are just one step away from creating your first SubQuery project. Keep reading further to find out how to publish it.

### 2.3 Publish Your SubQuery Project

SubQuery provides a free managed service where you can deploy your new project. You can deploy it to [SubQuery Projects](https://project.subquery.network) and query it using our [Explorer](https://explorer.subquery.network).


If you get stuck in the process, read this complete guide on how to [publish your new project to SubQuery Projects](../../run_publish/publish.md). 

**Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.**

## What’s Next?

You have done a great job so far. Now that you have a clear understanding of how to build a basic SubQuery project, what should be your next step? Let us guide you through your following journey. 

Since you have finished publishing your first project and if you feel confident, then jump to [Build section of these docs](../../build/introduction.md) and learn more about the three key files: **the manifest file, the GraphQL schema, and the mappings file.**

If you are looking for practising with more real examples and diving deeper, then head to the  [Academy section](../../academy/academy.md). You will get access to readily available and open-source projects. 

Get ready to find in-depth workshops, tutorials, and example projects, work on advanced modifications, and become a master at running SubQuery projects. 

In the end, if you want to explore more ways to run and publish your project, refer to [Run & Publish section](../../run_publish/run.md). Get complete information about all the ways to run your SubQuery project, along with advanced GraphQL aggregation and subscription features.
