# The Basic Workflow

In the [quick start](../quickstart/quickstart.md) guide, we very quickly ran through an example to give you a taste of what SubQuery is and how it works. Here we'll take a closer look at the workflow when creating your project and the key files you'll be working with.

Some of the following examples will assume you have successfully initialized the starter package in the [Quick start](../quickstart/quickstart.md) section. From that starter package, we'll walk through the standard process to customise and implement your SubQuery project.

1. Initialise your project using `subql init PROJECT_NAME`.
2. Update the Manifest file (`project.yaml`) to include information about your blockchain, and the entities that you will map - see [Manifest File](./manifest/polkadot.md).
3. Create GraphQL entities in your schema (`schema.graphql`) that defines the shape of the data that you will extract and persist for querying - see [GraphQL Schema](./graphql.md).
4. Add all the mapping functions (eg `mappingHandlers.ts`) you wish to invoke to transform chain data to the GraphQL entities that you have defined - see [Mapping](./mapping/polkadot.md).
5. Generate, build, and publish your code to SubQuery Projects (or run in your own local node) - see how to [Run](../run_publish/run.md) and [Publish](../run_publish/publish.md) your Starter Project in our quick start guide.

## Directory Structure

The following map provides an overview of the directory structure of a SubQuery project when the `init` command is run.

```
- project-name
  L .github
  L docker
  L src
    L mappings
      L mappingHandlers.ts
    L index.ts
  L .gitignore
  L docker-compose.yml
  L LICENSE
  L package.json
  L project.yaml
  L README.md
  L schema.graphql
  L tsconfig.json

```

For example:

![SubQuery directory structure](/assets/img/subQuery_directory_stucture.png)

## Working with the Manifest File

The Manifest `project.yaml` file acts as the entry point for your project. It holds crucial information about how SubQuery will index and transform the chain data. It specifies where the data is being indexed from, and what on-chain events are being subscribed to.

The Manifest can be in either YAML or JSON format. In all [our examples](./manifest), we use YAML. Here is an [example](./manifest/ethereum.md) of what it looks like:

```yml
specVersion: 1.0.0
name: subquery-starter
version: 0.0.1
runner:
  node:
    name: "@subql/node"
    version: "*"
  query:
    name: "@subql/query"
    version: "*"
description: "This project can be used as a starting point for developing your Polkadot based SubQuery project"
repository: https://github.com/subquery/subql-starter
schema:
  file: ./schema.graphql
network:
  chainId: "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3"
  endpoint: ["wss://polkadot.api.onfinality.io/public-ws"]
  dictionary: "https://api.subquery.network/sq/subquery/polkadot-dictionary"
  bypassBlocks: [1, 2, 100, "200-500"]
dataSources:
  - kind: substrate/Runtime
    startBlock: 1 # Block to start indexing from
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleBlock
          kind: substrate/BlockHandler
        - handler: handleEvent
          kind: substrate/EventHandler
          filter:
            module: balances
            method: Deposit
        - handler: handleCall
          kind: substrate/CallHandler
```

The project.yaml file holds the majority of the configuration settings for your SubQuery project. It includes details such as the data sources your project will be connecting to, the starting block for indexing, the specific handlers that will be used for different events, and more.

When setting up your own SubQuery project, you will need to update this file to match your specific requirements.

For more information, please check the full documentation about [Manifest File](./manifest).

## Setting up the GraphQL Schema

The `schema.graphql` file outlines the various GraphQL schemas. The structure of this file essentially dictates the shape of your data from SubQuery. If you're new to writing in GraphQL schema language, consider exploring resources like [Schemas and Types](https://graphql.org/learn/schema/). Here are a few elements to take into consideration when setting up your GraphQL Schema:

1. [Defining Entities](./graphql.md#defining-entities): In SubQuery, each entity should define a required `id` field with the type of `ID!`, serving as the unique primary key.
2. [Supported Scalars and Types](./graphql.md#supported-scalars-and-types): SubQuery supports various scalar types like `ID`, `Int`, `String`, `BigInt`, `Float`, `Date`, `Boolean`, `<EntityName>`, `JSON`, and `<EnumName>`.
3. [Entity Relationships](./graphql.md#entity-relationships): An entity often has nested relationships with other entities. Setting the field value to another entity name will define a relationship between these two entities.
4. [Indexing](./graphql.md#indexing-by-non-primary-key-field): Enhance query performance by implementing the @index annotation on a non-primary-key field.

Here's an example of what your GraphQL Here is an example of a schema which implements all of these recomendations, as well a relationship of many-to-many:

::: tip

The comments put in the GraphQL schema are automatically converted into sentences included in the docs of your GraphQL playground.

:::

```graphql
"""
User entity: Stores basic user data.
"""
type User @entity {
  id: ID!
  # To define a simple user type with a uniqueness constraint on the username, you simply add the @unique directive to the username field.
  name: String! @index(unique: true)
  email: String @index
  createdDate: Date
  isActive: Boolean
  profile: UserProfile
}

"""
UserProfile entity: Stores detailed user data.
"""
type UserProfile @entity {
  id: ID!
  bio: String
  avatarUrl: String
}

"""
Post entity: Represents user posts.
"""
type Post @entity {
  id: ID!
  title: String!
  content: String
  publishedDate: Date
  author: User @index
}
```

## Code Generation

SubQuery makes it easy and type-safe to work with your GraphQL entities, as well as smart contracts, events, transactions, and logs. SubQuery CLI will generate types from your project's GraphQL schema and any contract ABIs included in the data sources.

**Whenever you change your GraphQL entities, you must regenerate your types directory with the following command:**

::: code-tabs
@tab:active yarn

```shell
yarn codegen
```

@tab npm

```bash
npm run-script codegen
```

:::

This will create a new directory (or update the existing) `src/types` which contain generated entity classes for each type you have defined previously in `schema.graphql`. These classes provide type-safe entity loading, read and write access to entity fields - see more about this process in [the GraphQL Schema](../build/graphql.md). All entites can be imported from the following directory:

```ts
import { GraphQLEntity1, GraphQLEntity2 } from "../types";
```

If you're creating a new Ethereum based project (including Ethereum, Avalanche, and Substrate's Frontier EVM & Acala EVM+), this command will also generate ABI types and save them into `src/types` using the `npx typechain --target=ethers-v5` command, allowing you to bind these contracts to specific addresses in the mappings and call read-only contract methods against the block being processed. It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. All of these types are written to `src/typs/abi-interfaces` and `src/typs/contracts` directories. In the example [Gravatar SubQuery project](../quickstart/quickstart_chains/ethereum-gravatar.md), you would import these types like so.

```ts
import { GraphQLEntity1, GraphQLEntity2 } from "../types";
```

**ABI Codegen is not yet supported for Cosmos Ethermint EVM ([track progress here](https://github.com/subquery/subql-cosmos/issues/102)) or Substrate WASM**

## Mapping

Mapping functions are crucial to the transformation of chain data into GraphQL entities defined in the schema file (schema.graphql). The process includes defining these mappings in the `src/mappings` directory and exporting them as a function. They are also exported in `src/index.ts` and referenced in `project.yaml` under the mapping handlers.

In general (but depending on the network that you are planning to index), there are three primary types of mapping functions:

1. [Block Handlers](mapping/ethereum.md#block-handler): These capture information each time a new block is added to the chain. They are executed for every block and are primarily used when block-specific data is needed.
2. [Transaction Handlers](mapping/ethereum.md#transaction-handler): These are used to capture information on certain transactions, generally when specific, predefined operations are performed on the chain.
3. [Log Handlers](mapping/ethereum.md#log-handler): These are used to capture information when certain transaction logs occur in a new block, often as the output of a transaction. These events may trigger the mapping, allowing data source activity to be captured.

Remember to use Mapping Filters in your manifest to filter events and calls. This improves indexing speed and mapping performance.

Here's an example of how to use a transaction handler and log handler:

```ts
import { Approval, Transaction } from "../types";
import {
  ApproveTransaction,
  TransferLog,
} from "../types/abi-interfaces/Erc20Abi";

export async function handleTransaction(tx: ApproveTransaction): Promise<void> {
  logger.info(`New Approval transaction at block ${tx.blockNumber}`);
  const approval = Approval.create({
    id: tx.hash,
    owner: tx.from,
    spender: await tx.args[0],
    value: BigInt(await tx.args[1].toString()),
    contractAddress: tx.to,
  });

  await approval.save();
}

export async function handleLog(log: TransferLog): Promise<void> {
  logger.info(`New transfer transaction log at block ${log.blockNumber}`);
  const transaction = Transaction.create({
    id: log.transactionHash,
    value: log.args.value.toBigInt(),
    from: log.args.from,
    to: log.args.to,
    contractAddress: log.address,
  });

  await transaction.save();
}
```

Remember, different types of handlers are suited to different purposes. Choose the ones that best fit your specific project requirements. We do recommend to avoid using Block handlers in all cases however for performance reasons.

::: tip

The `console.log` method is **not supported**. Instead, a `logger` module has been injected in the types, which means we support a logger that can accept various logging levels. We recommend using Loggers as part of your testing and debugging strategy. For more information on Loggers, check [here](./testing.md#logging).

:::

## Build

In order to run your SubQuery Project on a locally hosted SubQuery Node, you need to first build your work.

Run the build command from the project's root directory.

::: code-tabs
@tab:active yarn

```shell
yarn build
```

@tab npm

```bash
npm run-script build
```

:::

### Alternative build options

We support additional build options for SubQuery projects using `subql build`.

With this you can define additional entry points to build using the exports field in `package.json`.

```json
"name": "project-name",
"version": "1.0.0",
...
"exports": {
  "entry_one": "./src/entry_one.ts",
  "entry_renamed": "./src/entry_two.ts"
},
```

Then by running `subql build` it will generate a dist folder with the following structure:

```
- project-name
  L dist
    L entry_one.js
    L entry_renamed.js
    L index.js
```

Note that it will build `index.ts` whether or not it is specified in the exports field.

For more information on using this including flags, see [cli reference](../run_publish/references.md).
