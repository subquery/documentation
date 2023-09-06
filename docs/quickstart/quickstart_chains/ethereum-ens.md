# Ethereum Quick Start - ENS (Complex)

## Goals

This project can be use as a starting point for developing your new Ethereum SubQuery project, it indexes all ENS Records in the ENS registry

::: warning
We suggest starting with the Ethereum Gravatar example. The ENS project is a lot more complicated and introduces some more advanced concepts
:::

Now, let's move forward and fork the example code for this project from [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Ethereum/ethereum-ens)

## 1. Your Project Manifest File

The Project Manifest (`project.yaml`) file works as an entry point to your Ethereum project. It defines most of the details on how SubQuery will index and transform the chain data. For Ethereum, there are three types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every transaction that matches optional filter criteria, run a mapping function
- [LogHanders](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every log that matches optional filter criteria, run a mapping function

The main concepts in this ENS project is that it only indexes logs from ENS' various smart contracts, LogHandlers are the most common type of handlers for Ethereum, and it shows here in this example project. There are a total of 31 different log handlers in this project.

Secondly, note that there are 7 different ABIs imported into this project. We give each different ABI it's own section under datasources since they all have their own unique smart contract address.

```yaml
dataSources:
  # ENSRegistry
  - kind: ethereum/Runtime
    startBlock: 9380380
    options:
      abi: EnsRegistry
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
    assets:
      EnsRegistry:
        file: "./abis/Registry.json"
    mapping:
      ...
  # ENSRegistryOld
  - kind: ethereum/Runtime
    startBlock: 3327417
    options:
      abi: EnsRegistry
      address: "0x314159265dd8dbb310642f98f50c066173c1259b"
    assets:
      EnsRegistry:
        file: "./abis/Registry.json"
    mapping:
      ...
  # Resolver
  - kind: ethereum/Runtime
    startBlock: 3327417 #seems no transaction before this
    options:
      abi: Resolver
    assets:
      Resolver:
        file: "./abis/PublicResolver.json"
    mapping:
      ...
  ...
```

Check out our [Manifest File](../../build/manifest/ethereum.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

## 2. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal right at the start.

You'll see that there are 33 GraphQL entities in the ENS project with many foreign key relationships between them. Take for example the `Domain` and `DomainEvent` entities. There is a one to many relationship between `Domain` and `DomainEvent`, and there is also a one to many relationship that `Domain` has with itself (via the `parent` property), we've event created a virtual `subdomains` field that can be used to navigate via the GraphQL entities.

```graphql
type Domain @entity {
  id: ID! # The namehash of the name
  name: String # The human readable name, if known. Unknown portions replaced with hash in square brackets (eg, foo.[1234].eth)
  parent: Domain # The namehash (id) of the parent name
  subdomains: [Domain] @derivedFrom(field: "parent") # Can count domains from length of array
  events: [DomainEvent] @derivedFrom(field: "domain")
  ...
}

type DomainEvent @entity {
  id: ID!
  domain: Domain!
  ...
}
```

::: warning Important
When you make any changes to the schema file, please ensure that you regenerate your types directory.
:::

SubQuery makes it easy and type-safe to work with your GraphQL entities, as well as smart contracts, events, transactions, and logs. SubQuery CLI will generate types from your project's GraphQL schema and any contract ABIs included in the data sources.

::: code-tabs
@tab:active yarn

```shell
yarn codegen
```

@tab npm

```shell
npm run-script codegen
```

:::

This will create a new directory (or update the existing) `src/types` which contain generated entity classes for each type you have defined previously in `schema.graphql`. These classes provide type-safe entity loading, read and write access to entity fields - see more about this process in [the GraphQL Schema](../../build/graphql.md). All entites can be imported from the following directory:

```ts
// Import entity types generated from the GraphQL schema
import {
  Account,
  Domain,
  Resolver,
  NewOwner,
  Transfer,
  NewResolver,
  NewTTL,
} from "../types";
```

As you're creating a new Etheruem based project, this command will also generate ABI types and save them into `src/types` using the `npx typechain --target=ethers-v5` command, allowing you to bind these contracts to specific addresses in the mappings and call read-only contract methods against the block being processed.

It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. Read about how this is done in [EVM Codegen from ABIs](../../build/introduction.md#evm-codegen-from-abis).

All of these types are written to `src/typs/abi-interfaces` and `src/typs/contracts` directories. In the example Gravatar SubQuery project, you would import these types like so.

```ts
// Import event types from the registry contract ABI
import {
  NewOwnerEvent,
  TransferEvent,
  NewResolverEvent,
  NewTTLEvent,
} from "../types/contracts/Registry";
```

Check out the [GraphQL Schema](../../build/graphql.md) documentation to get in-depth information on `schema.graphql` file.

## 3. Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

They operate in a similar way to SubGraphs, and you can see wiht ENS that they are contained in 4 different files with the addition of a helper `utils.ts`.

Check out our [Mappings](../../build/mapping/ethereum.md) documentation to get more information on mapping functions.

## 4. Build Your Project

Next, build your work to run your new SubQuery project. Run the build command from the project's root directory as given here:

::: code-tabs
@tab:active yarn

```shell
yarn build
```

@tab npm

```shell
npm run-script build
```

:::

::: warning Important
Whenever you make changes to your mapping functions, you must rebuild your project.
:::

Now, you are ready to run your first SubQuery project. Let’s check out the process of running your project in detail.

## 5. Run Your Project Locally with Docker

Whenever you create a new SubQuery Project, first, you must run it locally on your computer and test it and using Docker is the easiest and quickiest way to do this.

The `docker-compose.yml` file defines all the configurations that control how a SubQuery node runs. For a new project, which you have just initialised, you won't need to change anything.

However, visit the [Running SubQuery Locally](../../run_publish/run.md) to get more information on the file and the settings.

Run the following command under the project directory:

::: code-tabs
@tab:active yarn

```shell
yarn start:docker
```

@tab npm

```shell
npm run-script start:docker
```

:::

::: tip Note
It may take a few minutes to download the required images and start the various nodes and Postgres databases.
:::

## 6. Query your Project

Next, let's query our project. Follow these three simple steps to query your SubQuery project:

1. Open your browser and head to `http://localhost:3000`.

2. You will see a GraphQL playground in the browser and the schemas which are ready to query.

3. Find the _Docs_ tab on the right side of the playground which should open a documentation drawer. This documentation is automatically generated and it helps you find what entities and methods you can query.

Try the following query to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/query.md).

```graphql
query {
  domains(first: 5, orderBy: SUBDOMAIN_COUNT_DESC) {
    nodes {
      id
      name
      labelName
      subdomains(first: 5) {
        totalCount
        nodes {
          id
          name
          labelName
        }
      }
    }
  }
}
```

```json
{
  "data": {
    "domains": {
      "nodes": [
        {
          "id": "0x0000000000000000000000000000000000000000000000000000000000000000",
          "name": null,
          "labelName": null,
          "subdomains": {
            "totalCount": 2,
            "nodes": [
              {
                "id": "0x825726c8cd4176035fe52b95bc1aef3c27e841545bd3a431079f38641c7ba88c",
                "name": "0xdec08c9dbbdd0890e300eb5062089b2d4b1c40e3673bbccb5423f7b37dcf9a9c",
                "labelName": "0xdec08c9dbbdd0890e300eb5062089b2d4b1c40e3673bbccb5423f7b37dcf9a9c"
              },
              {
                "id": "0xd1b0e2eec983ad6a7fb21f6fc706af8717b12b8814d2596016750ea73e00b57f",
                "name": "0x4f5b812789fc606be1b3b16908db13fc7a9adf7ca72641f84d75b47069d3d7f0",
                "labelName": "0x4f5b812789fc606be1b3b16908db13fc7a9adf7ca72641f84d75b47069d3d7f0"
              }
            ]
          }
        },
        {
          "id": "0x352b3a53b6861a6c39477ba530d607cc922b3469121b1b1cb533c2b66805007c",
          "name": null,
          "labelName": "0xe5e14487b78f85faa6e1808e89246cf57dd34831548ff2e6097380d98db2504a",
          "subdomains": {
            "totalCount": 0,
            "nodes": []
          }
        },
        {
          "id": "0x79700a4bad07bddf30b55c0c41297f727c853ae7ac64667e009df49a9ab68dfd",
          "name": null,
          "labelName": "0xc384f2a2b2ac833e2abf795bf38a38f0865833233b8f67cecd7598bd108a2859",
          "subdomains": {
            "totalCount": 0,
            "nodes": []
          }
        },
        {
          "id": "0x825726c8cd4176035fe52b95bc1aef3c27e841545bd3a431079f38641c7ba88c",
          "name": "0xdec08c9dbbdd0890e300eb5062089b2d4b1c40e3673bbccb5423f7b37dcf9a9c",
          "labelName": "0xdec08c9dbbdd0890e300eb5062089b2d4b1c40e3673bbccb5423f7b37dcf9a9c",
          "subdomains": {
            "totalCount": 0,
            "nodes": []
          }
        },
        {
          "id": "0xd1b0e2eec983ad6a7fb21f6fc706af8717b12b8814d2596016750ea73e00b57f",
          "name": "0x4f5b812789fc606be1b3b16908db13fc7a9adf7ca72641f84d75b47069d3d7f0",
          "labelName": "0x4f5b812789fc606be1b3b16908db13fc7a9adf7ca72641f84d75b47069d3d7f0",
          "subdomains": {
            "totalCount": 0,
            "nodes": []
          }
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Ethereum/ethereum-ens).
:::

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
