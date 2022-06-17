# Cosmos Quick Start

## Develop Your First SubQuery Cosmos Project 

The goal of this quick start guide is to adapt the standard starter project in the Juno Network. And then begin indexing all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2) (which also contributed to SubQuery) from Cosmos. 

You must have finished the installation process and initialised your first Cosmos Project. 

Now, the next step is making changes to your files and running the project. 

**Important:** Before we begin, make sure that you have initialised your project using the provided steps in the [Beginners' Quick Guide](../quickstart.md). You must complete the suggested [4 steps](https://github.com/subquery/juno-subql-starter#readme) for Cosmos users. 

You can see the final code of this project on [visiting this link.](https://github.com/jamesbayly/juno-terra-developer-fund-votes)


Now, let's move ahead in the process and edit the files and configurations.

## 1. Make Changes to Your Project

Previously, in the [Beginner's Quick Guide](../quickstart.md), you got clear information on the three standard configurations of the project. Let's begin updating them one by one. 

### 1.1 Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect start. It allows you to define your end goal beforehand.

Update the `schema.graphql` file as follows. The aim is to index all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2). 


```graphql
type Vote @entity {
  id: ID! # id field is always required and must look like this
  blockHeight: BigInt!
  voter: String! # The address that voted
  proposalID: BigInt! # The proposal ID
  vote: Boolean! # If they voted to support or reject the proposal
}
```

**Important: When you make any changes to the schema file, do not forget to regenerate your types directory.**

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

Now that you have made essential changes to the GraphQL Schema file, let’s go ahead with the next configuration. 

### 1.2 Update Your Manifest File

The Project Manifest (`project.yaml`) file is an entry point to your project. It defines most of the details on how SubQuery will index and transform the chain data.

Note that the manifest file has already been set up correctly. But we have to change our handlers. 

*Since we are going to index all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2), we will look at messages that use the `vote` contract call. And following to that, we need to update the `datasources` section as follows:


```yml
dataSources:
  - kind: cosmos/Runtime
    startBlock: 3246370 # The block when the first proposal in this fund was created
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleTerraDeveloperFund
          kind: cosmos/MessageHandler
          filter:
            type: "/cosmwasm.wasm.v1.MsgExecuteContract"
            # Filter to only messages with the vote function call
            contractCall: "vote" # The name of the contract function that was called
            values: # This is the specific smart contract that we are subscribing to
              contract: "juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2"
```

The above code defines that you will be running a `handleTerraDeveloperFund` mapping function whenever there is a `vote` message from the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2) smart contract.

Check out our [Build/Manifest File](../../build/manifest.md) documentation to get more information about the Project Manifest (`project.yaml`) file. 

Next, let’s dig further into Mapping Function’s configuration. 

### 1.3 Add a Mapping Function

Mapping functions determine how chain data is transformed into the optimised GraphQL entities that you previously defined in the `schema.graphql` file.

Follow these steps to add a mapping function: 

- Navigate to the default mapping function in the `src/mappings` directory. You will see four exported functions:  `handleBlock`, `handleEvent`, `handleMessage`, `handleTransaction`. Delete `handleBlock`, `handleEvent`, and `handleTransaction` functions as you will only deal with the `handleMessage` function.

- The `handleMessage` function receives event data whenever an event matches the filters that you specified previously in the `project.yaml`. Let’s update it to process all `vote` messages and save them to the GraphQL entity created earlier.

Update the `handleMessage` function as follows(**note the additional imports**):

```ts
import { Vote } from "../types";
import { CosmosMessage } from "@subql/types-cosmos";

export async function handleTerraDeveloperFund(
  message: CosmosMessage
): Promise<void> {
  // logger.info(JSON.stringify(message));
  // Example vote https://www.mintscan.io/juno/txs/EAA2CC113B3EC79AE5C280C04BE851B82414B108273F0D6464A379D7917600A4

  const voteRecord = new Vote(`${message.tx.hash}-${message.idx}`);
  voteRecord.blockHeight = BigInt(message.block.block.header.height);
  voteRecord.voter = message.msg.sender;
  voteRecord.proposalID = message.msg.msg.vote.proposal_id;
  voteRecord.vote = message.msg.msg.vote.vote === "yes";

  await voteRecord.save();
}
```

Let’s understand how the above code works. 

Here, the function receives a CosmosMessage which includes message data on the payload. We extract this data and then instantiate a new `Vote` entity defined earlier in the `schema.graphql` file. After that, we add additional information and then use the `.save()` function to save the new entity (SubQuery will automatically save this to the database).

Check out our [Build/Mappings](../../build/mapping.md) documentation and get information on the mapping functions in detail. 

You are closer to creating your first SubQuery project. However, there is still an additional step required to run your SubQuery Project. Let’s find out more. 

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

**Important: Each and every time you make changes to your mapping functions, never forget to rebuild your project.** 

Next, gear up for running your first SubQuery Cosmos project. Let’s explore the process step by step. 

## 2. Run and Query Your Project

### 2.1 Run Your Project with Docker

Whenever you create a new SubQuery Project, never forget to run it locally on your computer and test it. And using Docker is the most hassle-free way to do this. 

`docker-compose.yml` file defines all the configurations that control how a SubQuery node runs. For a new project, which you have just initialised, no major changes are needed. 

However, you must visit the [Run a Project](../../run_publish/run.md) section and check out the file and the settings in detail. 

Now, run the following command under the project directory:

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

You have successfully run the project locally. Now, let’s have a look at how to query your project with guided steps.  


### 2.2 Query your Project

Follow these three simple steps to query your SubQuery project:

1. Open your browser and head to [http://localhost:3000](http://localhost:3000).

2. You will see a GraphQL playground in the browser and the schemas which are ready to query. 

3. Find a *Docs* button on the top right corner of the playground which will open a documentation draw. This documentation is automatically generated and it helps you find the entities and methods that you can query.

Try the following query to understand how it works for your new SubQuery starter project. 

Don’t skip to learn more about the [GraphQL Query language](../../run_publish/graphql.md). 


```graphql
query {
	votes(
    first: 5
    orderBy: BLOCK_HEIGHT_DESC
    # filter: {proposalID: {equalTo: "4"}}
  ) {
    nodes {
      id
      blockHeight
      voter
      vote
    }
  }
}
```

**Note:  Have a look at the final code of this project [here](https://github.com/jamesbayly/juno-terra-developer-fund-votes](https://github.com/jamesbayly/juno-terra-developer-fund-votes), and explore all the in-and-out of it. 

You are about to finish creating your first SubQuery project. Keep reading further to find out how to publish it.


### 2.3 Publish your SubQuery Project

SubQuery provides a free managed service where you can deploy your new project. You can deploy it to [SubQuery Projects](https://project.subquery.network) and query it using our [Explorer](https://explorer.subquery.network).

If you get stuck in the process, read this complete guide on how to [publish your new project to SubQuery Projects](../../run_publish/publish.md). 


**Congratulations! You have now a locally running SubQuery Cosmos project that accepts GraphQL API requests for transferring data from bLuna.** 


## What’s Next?

You have done a great job so far. Now that you have a clear understanding of how to build a basic SubQuery project, what should be your next step? Let us guide you through your following journey. 

Since you have finished publishing your first project and if you feel confident, then jump to [Build section of these docs](../../build//introduction.md) and learn more about the three key files: **the manifest file, the GraphQL schema, and the mappings file.**

If you are looking for practising with more real examples and diving deeper, then head to the  [Academy section](../../academy/academy.md). You will get access to readily available and open-source projects. 

Get ready to find in-depth workshops, tutorials, and example projects, work on advanced modifications, and become a master at running SubQuery projects. 

In the end, if you want to explore more ways to run and publish your project, refer to [Run & Publish section](../../run_publish/run.md). Get complete information about all the ways to run your SubQuery project, along with advanced GraphQL aggregation and subscription features.