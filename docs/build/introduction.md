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
  L abis
  L docker
  L src
    L mappings
      L mappingHandlers.ts
    L test
    L index.ts
  L .gitignore
  L LICENSE
  L README.md
  L docker-compose.yml
  L package.json
  L project.yaml
  L schema.graphql
  L tsconfig.json
```

For example:

![SubQuery directory structure](/assets/img/subQuery_directory_stucture.png)

## EVM and Cosmos Project Scaffolding

Scaffolding saves time during SubQuery project creation by automatically generating typescript facades for EVM transactions, logs, and types.

### When Initialising New SubQuery Projects

When you are initalising a new project using the `subql init` command, SubQuery will give you the option to set up a scaffolded SubQuery project based on your JSON ABI.

If you have select an compatiable network type (EVM), it will prompt

```shell
? Do you want to generate scaffolding with an existing abi contract?
```

Followed by prompt on the path to your ABI file (absolute or relative to your current working directory). This must be in a JSON format.

```shell
? Path to ABI ../../../hello/world/abis/erc721.abi.json
```

So for example, If I wanted to create the [Ethereum Gravatar indexer](./quickstart_chains/ethereum-gravatar.md), I would download the Gravity ABI contract JSON from [Etherscan](https://etherscan.io/address/0x2e645469f354bb4f5c8a05b3b30a929361cf77ec#code), save it as `Gravity.json`, and then run the following.

![Project Scaffolding EVM](/assets/img/project-scaffold-evm.png)

You will then be prompted to select what `events` and/or `functions` that you want to index from the provided ABI.

### For an Existing SubQuery Project

You can also generate additional scaffolded code new new contracts and append this code to your existing `project.yaml`. This is done using the `subql codegen:generate` command from within your project workspace.

```shell
subql codegen:generate \
-f <root path of your project> \ # Assumes current location if not provided
--abiPath <path of your abi file> \ # path is from project root - this is required
--startBlock <start block> # Required
--address <address> \ # Contract address
--events '*' \  # accepted formats: 'transfers, approval'
--functions '*' # accepted formats: 'transferFrom, approve'
```

This will attempt to read the provided ABI file, and generate a list of events & functions in accordance. If `--events` or `--functions` are not provided, all available events\functions will be prompted, if `'*'` is provided, all events/functions will be selected. For example:

```shell
subql codegen:generate \
-f './example-project' \
--abiPath './abis/erc721.json' \ (required)
--startBlock 1 \ (required)
--address '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D' \
--events '*' \
--functions '*'
```

### What is Scaffolded?

Once completed, you will have a scaffolded project structure from your chosen ABI `functions`/`events`.

In the previous example for the [Ethereum Gravatar indexer](./quickstart_chains/ethereum-gravatar.md), I have selected the events `NewGravatar` and `UpdatedGravatar` to scaffold.

It initialises the correct manifest with Log Handlers included, as well a new typescript file `<abiName>Handler.ts` containing mapping functions and imports with the appropriate typing..

:::details Manifest

```yaml
dataSources:
  - kind: ethereum/Runtime
    startBlock: 6175243
    options:
      abi: Gravity
      address: "0x2E645469f354BB4F5c8a05B3b30A929361cf77eC"
    assets:
      Gravity:
        file: ./abis/Gravity.json
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleNewGravatarGravityLog
          kind: ethereum/LogHandler
          filter:
            topics:
              - NewGravatar(uint256,address,string,string)
        - handler: handleUpdatedGravatarGravityLog
          kind: ethereum/LogHandler
          filter:
            topics:
              - UpdatedGravatar(uint256,address,string,string)
```

:::

:::details Mapping

```ts
import {
  NewGravatarLog,
  UpdatedGravatarLog,
} from "../types/abi-interfaces/Gravity";

export async function handleNewGravatarGravityLog(
  log: NewGravatarLog
): Promise<void> {
  // Place your code logic here
}

export async function handleUpdatedGravatarGravityLog(
  log: UpdatedGravatarLog
): Promise<void> {
  // Place your code logic here
}
```

:::

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

SubQuery makes it easy and type-safe to work with your GraphQL entities, as well as smart contracts, events, transactions, and logs. SubQuery CLI will generate types from your project's GraphQL schema and any contracts (defined by JSON ABIs or Cosmos Protobufs) included in the data sources.

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

### EVM Codegen from ABIs

If you're creating a new Ethereum based project (including Ethereum EVM, Cosmos Ethermint, Avalanche, and Substrate's Frontier EVM & Acala EVM+), the `codegen` command will also generate types and save them into `src/types` using the `npx typechain --target=ethers-v5` command, allowing you to bind these contracts to specific addresses in the mappings and call read-only contract methods against the block being processed.

It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. All of these types are written to `src/typs/abi-interfaces` and `src/typs/contracts` directories.

In the example [Gravatar SubQuery project](../quickstart/quickstart_chains/ethereum-gravatar.md), you would import these types like so.

```ts
import { GraphQLEntity1, GraphQLEntity2 } from "../types";
```

### Cosmos Codegen from CosmWasm Protobufs

Codegen will also generate wrapper types for Cosmos Protobufs, the `codegen` command will also generate types and save them into `src/types` directory, providing you with more typesafety specifically for Cosmos Message Handers.

It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. All of these types are written to the `src/typs/proto-interfaces` directory.

**Note**: The protobuf types you wish to generate must be kept in the `proto` directory (at the root of your project) and you must also ensure the structure of the protobufs are in accordance with the provided protobuf. For example `osmosis.gamm.v1beta1` would have the file structure of `<project-root>/proto/osmosis/gamm/v1beta1/<file>.proto`

You will also need to include this in the project configuration file (`project.yaml`)

```yaml
network:
  chainTypes:
    osmosis.gamm.v1beta1:
      file: "./proto/osmosis/gamm/v1beta1/tx.proto"
      messages:
        - MsgSwapExactAmountIn
```

Once `codegen` is executed you will find the message types under `src/types/CosmosMessageTypes.ts`. If you wish to add more message types from the same proto, you will need to include them under the `messages` array.

```yaml
network:
  chainTypes:
    osmosis.gamm.v1beta1:
      file: "./proto/osmosis/gamm/v1beta1/tx.proto"
      messages:
        - MsgSwapExactAmountIn
        - MsgSwapExactAmountOut
```

If you are uncertain of the available messages, you can always check the generated proto interfaces udner `src/types/proto-interfaces/`. You import them into your message handlers like so:

```ts
import { CosmosMessage } from "@subql/types-cosmos";
import { MsgSwapExactAmountIn } from "../types/proto-interfaces/osmosis/gamm/v1beta1/tx";

export async function handleMessage(
  msg: CosmosMessage<MsgSwapExactAmountIn>
): Promise<void> {
  // Do something with typed event
  const messagePayload: MsgSwapExactAmountIn = msg.msg.decodedMsg;
}
```

### Cosmos Codegen from CosmWasm Contract ABIs

Codegen will also generate wrapper types from CosmWasm contract abi, the `codegen` command will also generate types and save them into `src/types` directory, providing you with more typesafety specifically for Cosmos Message Handers.

Similar to Ethereum ABI codegen, you will need to include the path and name for the contract ABI in this format. `project.yaml` configuration:
```yaml
dataSources:
  - kind: cosmos/Runtime
    startBlock: 6000000
    options:
      abi: baseMinter
    assets:
      baseMinter:
        file: './cosmwasm/base-minter/schema/base-minter.json'
```

All generated files could be found under `src/typs/cosmwasm-interfaces` and `src/typs/cosmwasm-interface-wrappers` directories.

**Note**: For contract ABIs you wish to generate, you must ensure that each ABI is in its own directory. For example `<project-root>/abis/baseMinter/base-minter.json` and `<project-root>/abis/cw20/cw20.json`.

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
