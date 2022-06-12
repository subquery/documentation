# Polkadot Quick Start

In this quick start guide, we're going to start with a simple Substrate/Polkadot starter project and then finish by indexing some actual real data. This is an excellent basis to start with when developing your own Substrate/Polkadot SubQuery Project.

At the end of this guide, you'll have a working SubQuery project running on a SubQuery node with a GraphQL endpoint that you can query data from.

If you haven't already, we suggest that you familiarise yourself with the [terminology](../#terminology) used in SubQuery.

**The goal of this quick start guide is to adapt the standard starter project to begin indexing all transfers from Polkadot, it should only take 10-15 minutes**

## Preparation

### Local Development Environment

- [Node](https://nodejs.org/en/): A modern (e.g. the LTS version) installation of Node.
- [Docker](https://docker.com/): This tutorial will use require Docker

### Install the SubQuery CLI

Install SubQuery CLI globally on your terminal by using NPM:

```shell
# NPM
npm install -g @subql/cli
```

Please note that we **DO NOT** encourage the use of `yarn global` for installing `@subql/cli` due to its poor dependency management which may lead to errors down the line.

You can then run help to see available commands and usage provided by the CLI:

```shell
subql help
```

## Initialise the SubQuery Starter Project

Inside the directory in which you want to create a SubQuery project, simply run the following command to get started.

```shell
subql init
```

You'll be asked certain questions as the SubQuery project is initalised:

- Project name: A project name for your SubQuery project
- Network family: The layer-1 blockchain network family that this SubQuery project will be developed to index. Use the arrow keys to select from the available options. For this guide, we will use *"Substrate"*
- Network: The specific network that this SubQuery project will be developed to index. Use the arrow keys to select from the available options. For this guide, we will use *"Polkadot"*
- Template project: Select a SubQuery template project that will provide a starting point to begin development. We suggest selecting the *"subql-starter"* project.
- RPC endpoint: Provide an HTTPS URL to a running RPC endpoint that will be used by default for this project. You can quickly access public endpoints for different Polkadot networks, create your own private dedicated node using [OnFinality](https://app.onfinality.io) or just use the default Polkadot endpoint. This RPC node must be an archive node (have the full chain state). For this guide, we will use the default value *"https://polkadot.api.onfinality.io"*
- Git repository: Provide a Git URL to a repo that this SubQuery project will be hosted in (when hosted in SubQuery Explorer) or accept the provided default.
- Authors: Enter the owner of this SubQuery project here (e.g. your name!) or accept the provided default.
- Description: Provide a short paragraph about your project that describes what data it contains and what users can do with it or accept the provided default.
- Version: Enter a custom version number or use the default (`1.0.0`)
- License: Provide the software license for this project or accept the default (`MIT`)

After the initialisation process is complete, you should see that a folder with your project name has been created inside the directory. The contents of this directory should be identical to what's listed in the [Directory Structure](../create/introduction.md#directory-structure).

Last, under the project directory, run the following command to install the new project's dependencies.

<CodeGroup>
  <CodeGroupItem title="YARN" active>

  ```shell
  cd PROJECT_NAME
  yarn install
  ```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

  ```shell
  cd PROJECT_NAME
  npm install
  ```

  </CodeGroupItem>
</CodeGroup>

## Making Changes to your Project

In the starter package that was just initialised, a standard configuration has been provided. These are:

1. The GraphQL Schema in `schema.graphql`
2. The Project Manifest in `project.yaml`
3. The Mapping functions in `src/mappings/` directory

The goal of this quick start guide is to adapt the standard starter project to begin indexing all transfers from Polkadot.

### Updating your GraphQL Schema File

The `schema.graphql` file defines the various GraphQL schemas. Due to the way that the GraphQL query language works, the schema file essentially dictates the shape of your data from SubQuery. It's a great place to start because it allows you to define your end goal upfront.

Update the `schema.graphql` file to read as follows:

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

You'll find the generated models in the `/src/types/models` directory. For more information about the `schema.graphql` file, check out our documentation under [Build/GraphQL Schema](../build/graphql.md)

### Updating the Project Manifest File

The Project Manifest (`project.yaml`) file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data.

The manifest file has already been set up correctly, but we need to change our handlers. As we are planning to index all Polkadot transfers, we need to update the `datasources` section as follows:

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

This means we'll run a `handleEvent` mapping function each and every time there is a `balances.Transfer` event.

For more information about the Project Manifest (`project.yaml`) file, check out our documentation under [Build/Manifest File](../build/manifest.md)

### Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we have previously defined in the `schema.graphql` file.

Navigate to the default mapping function in the `src/mappings` directory. You'll see three exported functions, `handleBlock`, `handleEvent`, and `handleCall`. Delete both the `handleBlock` and `handleCall` functions as we will only deal with the `handleEvent` function.

The `handleEvent` function receives event data whenever an event matches the filters that we specified previously in our `project.yaml`. We will update it to process all `balances.Transfer` events and save them to the GraphQL entities that we created earlier.

You can update the `handleEvent` function to the following (note the additional imports):

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

What this is doing is receiving a SubstrateEvent which includes transfer data in the payload. We extract this data and then instantiate a new `Transfer` entity that we defined earlier in the `schema.graphql` file. We add additional information and then use the `.save()` function to save the new entity (SubQuery will automatically save this to the database).

For more information about mapping functions, check out our documentation under [Build/Mappings](../build/mapping.md)

### Build the Project

In order to run your new SubQuery Project we first need to build our work. Run the build command from the project's root directory.

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

**Important: Whenever you make changes to your mapping functions, you will need to rebuild your project**

## Running and Querying your Project

### Run your Project with Docker

Whenever you create a new SubQuery Project, you should always run it locally on your computer to test it first. The easiest way to do this is by using Docker. 

All configuration that controls how a SubQuery node is run is defined in the `docker-compose.yml` file. For a new project that has been just initialised you won't need to change anything, but you can read more about the file and the settings in our [Run a Project](../run_publish/run.md) section.

Under the project directory, run the following command:

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

It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you should see a running SubQuery node in the terminal screen. 

### Query your Project

Open your browser and head to [http://localhost:3000](http://localhost:3000).

You should see a GraphQL playground in the browser and the schemas that are ready to query. On the top right of the playground, you'll find a _Docs_ button that will open a documentation draw. This documentation is automatically generated and helps you find what entities and methods you can query.

For a new SubQuery starter project, try the following query to understand how it works or learn more about the [GraphQL Query language](../run_publish/graphql.md).

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

### Publish your SubQuery Project

SubQuery provides a free managed service where you can deploy your new project to. You can deploy it to [SubQuery Projects](https://project.subquery.network) and query it using our [Explorer](https://explorer.subquery.network).

Read the guide to [publish your new project to SubQuery Projects](../run_publish/publish.md)

## Next Steps

Congratulations, you now have a locally running SubQuery project that accepts GraphQL API requests for transfers data.

Now that you've had an insight into how to build a basic SubQuery project, the question is where to from here? If you are feeling confident, you can jump into learning more about the three key files. The manifest file, the GraphQL schema, and the mappings file are under the [Build section of these docs](../build/introduction.md).

Otherwise, continue to our [Academy section](../academy/academy.md) where we have more in-depth workshops, tutorials, and example projects. There we'll look at more advanced modifications, and we'll take a deeper dive at running SubQuery projects by running readily available and open source projects.

Finally, if you're looking for more ways to run and publish your project, our [Run & Publish section](../run_publish/run.md) provides detailed information about all the ways to run your SubQuery project and other advanced GraphQL aggregation and subscription features.
