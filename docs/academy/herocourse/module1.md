## Module 1: Getting started

## Introduction

In this module, you will become familiar with SubQuery and get some hands-on experience by creating a simple Hello World SubQuery project. This project will use the **subql CLI** to create an empty project shell. Then a code will be provided to query the Polkadot mainnet for the blockheight. Note that a Docker environment will be used to simplify the running process.


## Reference

* [Hello World PDF workbook](/assets/pdf/Hello_World_Lab.pdf)
* [Subql Starter Github](https://github.com/subquery/subql-starter)

## Pre-Requisites

You will require the following:

* NPM package manager.
* SubQuery CLI (@subql/cli).
* Docker.

### NPM Package Manager

First, you must check whether you have installed the latest version of node or not. 

Run this command:

`node -v`

It should return a result with the latest version of npm, if you have it installed. For eg:

`v18.2.0`

::: info Note 
Node v12 or higher is required. 
::: 

If you haven't installed the npm, please run the following command in your terminal and install the latest version of node. 

```
brew update
brew install node
node -v
```
You will get the latest npm version as the output in the end.

### SubQuery CLI

- First, run the following command. It installs the `subql cli`.

```
npm install -g @subql/cli
```

- Then check the `subql cli` version by running the given below command:

```
subql -v
```

You will get an output similar to this:
`@subql/cli/1.0.1 darwin-x64 node-v18.2.0`


### Docker

Please visit [Docker's official site](https://docs.docker.com/get-docker/) for instructions on how to install Docker for your specific operating system.

## Exercise 1: Hello World

### Overview of Steps Involved

1. Initialise a project.
2. Update your mappings.
3. Update your manifest file.
4. Update your graphql schema file.
5. Generate your code.
6. Build your code.
7. Deploy your code in Docker.

### Detailed Steps

#### Step 1: Initialise Your Project

The first step to create a SubQuery project with the following command:


```
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

Note that any text in the square brackets are the default values, which will be used if nothing is provided.

This creates a framework and the following directory structure, saving your time. 

#### Step 2: Update the Mappings File

The initialisation command pre-creates a sample mappings file with 3 functions: `handleBlock, handleEvent and handleCall`. We will focus on the first function called `handleBlock` for this excerise. Hence, delete the remaining functions. 

- The `mappingHandler.ts` file should look like this:


```
import {SubstrateExtrinsic,SubstrateEvent,SubstrateBlock} from "@subql/types";
import {StarterEntity} from "../types";
import {Balance} from "@polkadot/types/interfaces";

export async function handleBlock(block: SubstrateBlock): Promise<void> {
    //Create a new starterEntity with ID using block hash
    let record = new StarterEntity(block.block.header.hash.toString());
    //Record block number
    record.field1 = block.block.header.number.toNumber();
    await record.save();
}
```

#### Step 3: Update the Manifest File (aka project.yaml)

The initialisation command also pre-creates a sample manifest file and defines 3 handlers. Since you have removed `handleEvent` and `handleCall` from the mappings file, you have to remove them from the manifest file as well. 

- The ***updated*** part of the manifest file should look like this:


```

dataSources:
  - kind: substrate/Runtime
    startBlock: 1
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleBlock
          kind: substrate/BlockHandler
```



#### Step 4: Update the Graphql Schema

The default `schema.graphql` file will contain 5 fields. We can remove the fields from 2 to 5, because the `handleBlock` function in the mappings file only uses “field1”. 

::: info Note
Rename field1 to something more meaningful. Eg blockHeight. Note that if you do this, don’t forget to update the reference to field1 in the mappings file appropriately. 
:::

The schema file should look like this:

```
type StarterEntity @entity {
  id: ID! #id is a required field
  blockHeight: Int!
}
```

#### Step 5: Install the Dependencies

Install the node dependencies by running the following commands:


<CodeGroup>
  <CodeGroupItem title="YARN" active>

  ```shell
  yarn install
  ```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

  ```bash
  npm install
  ```

  </CodeGroupItem>
</CodeGroup>

#### Step 6: Generate the Associated Typescript

Next, we will generate the associated typescript with the following command:

<CodeGroup>
  <CodeGroupItem title="YARN" active>

  ```shell
  yarn codegen
  ```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

  ```bash
  npm run-script codegen
  ```

  </CodeGroupItem>
</CodeGroup>

You should see a new folder appear with 2 new files.

#### Step 7: Build the Project

The next step is to build the project with the following command:

<CodeGroup>
  <CodeGroupItem title="YARN" active>

  ```shell
  yarn build
  ```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

  ```bash
  npm run-script build
  ```

  </CodeGroupItem>
</CodeGroup>

This bundles the app into static files for production.


#### Step 8: Start the Docker Container

Run the docker command to pull the images and to start the container.


```
docker-compose pull && docker-compose up
```

::: warning Important
You need to have Docker installed as noted in the prerequisite. 
:::


#### Step 9: Run a Query

Once the docker container is up and running, which could take a few minutes, open up your browser, and navigate to `www.localhost:3000`.

This will open up a “playground” where you can create your query. Copy the example below. 


```
{
  query{
    starterEntities(last:10, orderBy: FIELD1_ASC){
      nodes{
        field1
      }
    }
  }
}
```

::: info Note
If you renamed field1 something else, modify this query appropriately. 
:::