# Avalanche Quick Start

# Develop Your First SubQuery Avalanche Project 

The goal of this quick start guide is to index all Pangolin token _Approve_ logs. 

You must have completed the installation of the required software support and initialised your first Avalanche Project. But, that’s not over there. 

Now, the next step is making changes to your files and running the project. 

**Important:** Before we begin, let’s ensure that you have initialised your project using the provided steps in the [Beginners' Quick Guide](../quickstart/quickstart.md). You might have an output similar to as follows:

```shell
$ subql init 
Project name [subql-starter]: avalanche-starter 
? Select a network family Avalanche
? Select a network Avalanche
? Select a template project avalanche-subql-starter     Starter project for Avalanche
RPC endpoint: [http://avalanche.api.onfinality.io:9650]: 
Git repository [https://github.com/subquery/avalanche-subql-starter]: 
Author [SubQuery Team]: 
Description [This project can be use as a starting po...]: 
Version [0.0.1]: 
License [MIT]: 
Preparing project... done 
avalanche-starter is ready
```

Now, let's move ahead and start making changes to your project.

# 1. Make Changes to Your Project

Previously, in the [Beginner's Quick Guide](../quickstart/quickstart.md), you got clear information on the three standard configurations of the project. Let's begin updating them one by one.  

## 1.1 Update Your GraphQL Schema File

The `schema.graphql` file defines the shape of your data from SubQuery due to the GraphQL query language’s mechanism. Hence, updating the GraphQL Schema file is the perfect beginning. It lets you set your end goal beforehand.

Update the `schema.graphql` file as follows and remove all existing entities:

```graphql
type PangolinApproval @entity {
  id: ID!
  transactionHash: String!
  blockNumber: String!
  blockHash: String!
  addressFrom: String
  addressTo: String
  amount: String
}
```
**Important: When you make any changes to the schema file, do not forget to regenerate your types directory.”**

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

Check out [Build/GraphQL](../build/graphql.md) Schema documentation to get in-depth information on `schema.graphql` file.

Now, you have made key changes to the GraphQL Schema file. Let’s move ahead with the next configuration. 

## 1.2 Update Your Project Manifest File

The Project Manifest (`project.yaml`) file works as an entry point to your Avalanche project. It defines most of the details on how SubQuery will index and transform the chain data.

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to change the handlers. **Since you are going to index all Pangolin approval logs, you need to update the `datasources` section as follows:**


```yaml
dataSources:
  - kind: avalanche/Runtime
    startBlock: 57360 # Block when the Pangolin contract was created
    options:
      # Must be a key of assets
      abi: erc20
      ## Pangolin token https://snowtrace.io/token/0x60781c2586d68229fde47564546784ab3faca982
      address: "0x60781C2586D68229fde47564546784ab3fACA982"
    assets:
      erc20:
        file: "./node_modules/@pangolindex/exchange-contracts/artifacts/contracts/pangolin-core/interfaces/IPangolinERC20.sol/IPangolinERC20.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleLog
          kind: avalanche/LogHandler
          filter:
            ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
            function: Approve(address spender, uint256 rawAmount)
            # address: "0x60781C2586D68229fde47564546784ab3fACA982"
```

The above code explains that you will be running a `handleLog` mapping function whenever there is a `approve` log on any transaction from the [Pangolin contract](https://snowtrace.io/txs?a=0x60781C2586D68229fde47564546784ab3fACA982&p=1).

Check out our [Build/Manifest File](../build/manifest.md) documentation to get more information about the Project Manifest (`project.yaml`) file. 

Now, let’s walk you through the next step, which is changing the Mapping Function’s configuration. 

## 1.3 Add a Mapping Function


Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Follow these steps to add a mapping function: 

- Navigate to the default mapping function in the `src/mappings` directory. You will be able to see three exported functions:  *`handleBlock`*, *`handleLog`*, and *`handleTransaction`*. Delete both the `handleBlock` and `handleTransactionl` functions as you will only deal with the `handleLog` function.

- The `handleLog` function receives event data whenever an event matches the filters, which you specified previously in the `project.yaml`. Let’s make changes to it, process all `approval` transaction logs, and save them to the GraphQL entities created earlier.

Update the `handleLog` function as given below(**note the additional imports**):


```ts
import { PangolinApproval } from "../types";
import { AvalancheLog } from "@subql/types-avalanche";

export async function handleLog(event: AvalancheLog): Promise<void> {
  const pangolinApprovalRecord = new PangolinApproval(
    `${event.blockHash}-${event.logIndex}`
  );

  pangolinApprovalRecord.transactionHash = event.transactionHash;
  pangolinApprovalRecord.blockHash = event.blockHash;
  pangolinApprovalRecord.blockNumber = event.blockNumber;
  # topics store data as an array
  pangolinApprovalRecord.addressFrom = event.topics[0];
  pangolinApprovalRecord.addressTo = event.topics[1];
  pangolinApprovalRecord.amount = event.topics[2];

  await pangolinApprovalRecord.save();
}
```
Let’s understand how the above code works. 

The function here receives an Avalanche Log which includes transaction log data in the payload. We extract this data and then instantiate a new `PangolinApproval` entity defined earlier in the `schema.graphql` file. After that, we add additional information and then use the `.save()` function to save the new entity (*Note that SubQuery will automatically save this to the database*).

Check out our [Build/Mappings](../build/mapping.md) documentation to get detailed information on mapping functions.

You are about to finish and create your first project. But, there is still an additional step required to run your SubQuery Project. Let’s explore it further. 

## 1.4 Build Your Project

First, you need to build your work to run your new SubQuery project. Run the build command from the project's root directory as given here:


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


# 2. Run and Query Your Project

## 2.1 Run Your Project with Docker

Whenever you create a new SubQuery Project, you must not forget to run it locally on your computer and test it. Using Docker is the easiest way to do this. 

`docker-compose.yml` file defines all the configurations that control how a SubQuery node runs. For a new project, which you have just initialised, you won't need to change anything.

However, you must visit the [Run a Project](../run_publish/run.md) section and get a detailed explanation of the file and the settings. 

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

**Note:** You have to keep patience here. It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time, but soon you will see a running SubQuery node. 


Let’s move forward to the next step of querying your project. 

## 2.2 Query your Project

Open your browser and head to [http://localhost:3000](http://localhost:3000).

For a new SubQuery starter project, you can try the following query to get a taste of how it works or [learn more about the GraphQL Query language](../run_publish/graphql.md).

–
Follow these three simple steps to query your SubQuery project:

1. Open your browser and head to [http://localhost:3000](http://localhost:3000).

2. You must see a GraphQL playground in the browser and the schemas which are ready to query. 

3. Navigate to the top right corner of the playground and find a *Docs* button over ther, which should open a documentation draw. This documentation is automatically generated and it helps you find what entities and methods you can query.

Try the following query to figure out how it works for your new SubQuery starter project. Don’t forget to check out the [GraphQL Query language](../run_publish/graphql.md) and dig out more important information. 

```graphql
query {
  pangolinApprovals(first: 5) {
    nodes {
      id
      blockNumber
      blockHash
      transactionHash
      addressFrom
      addressTo
      amount
    }
  }
}
```

It’s almost done and you are just one step away from creating your first SubQuery Avalanche project. So, let’s find out what you need to do to publish your project. 


## 2.3 Publish Your SubQuery Project

SubQuery provides a free managed service where you can deploy your new project. You can deploy it to [SubQuery Projects](https://project.subquery.network) and query it using our [Explorer](https://explorer.subquery.network).

Read the guide to [publish your new project to SubQuery Projects](../run_publish/publish.md). 

**Important: You must deploy it via IPFS**.

If you get stuck in the process, read this complete guide on how to [publish your new project to SubQuery Projects](../run_publish/publish.md). 

**Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data from _bLuna_.**

# What’s Next?

You have done a great job so far. Now that you have a clear understanding of how to build a basic SubQuery project, what should be your next step? Let us guide you through your following journey. 

Since you have finished publishing your first project and if you feel confident, then jump to [Build section of these docs](../build/introduction.md) and learn more about the three key files: **the manifest file, the GraphQL schema, and the mappings file.**

If you are looking for practising with more real examples and diving deeper, then head to the  [Academy section](../academy/academy.md). You will get access to readily available and open-source projects. 

Get ready to find in-depth workshops, tutorials, and example projects, work on advanced modifications, and become a master at running SubQuery projects. 

In the end, if you want to explore more ways to run and publish your project, refer to [Run & Publish section](../run_publish/run.md). Get complete information about all the ways to run your SubQuery project, along with advanced GraphQL aggregation and subscription features.
