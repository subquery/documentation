# Ethereum Quick Start - Uniswap (Medium)

## Goals

This project serves as an excellent foundation for initiating your Ethereum SubQuery project. It meticulously indexes various Uniswap entities, including Swaps, Pool operations, Price ticks, Positions, and additionally computes statistical metrics.

::: warning
We suggest starting with the [Ethereum Gravatar example](./ethereum-gravatar). The Uniswap project is a lot more complicated and introduces some more advanced concepts.
:::

Now, let's move forward and fork the example code for this project from [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Ethereum/ethereum-uniswap-v3)

## 1. Your Project Manifest File

The Project Manifest (`project.yaml`) file works as an entry point to your Ethereum project. It defines most of the details on how SubQuery will index and transform the chain data. For Ethereum, there are three types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every transaction that matches optional filter criteria, run a mapping function
- [LogHanders](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every log that matches optional filter criteria, run a mapping function

In this Uniswap project, the primary focus is on indexing logs exclusively from two Uniswap smart contracts. LogHandlers, which are the prevalent type of Ethereum handlers, are showcased in this example project, totaling 10 distinct log handlers.

Additionally, it's important to highlight that this project incorporates six different ABIs. Furthermore, to accommodate scenarios where a contract factory generates new contract instances, [dynamic data sources](../../build/dynamicdatasources.md) are employed.

```yaml
dataSources:
  - kind: ethereum/Runtime
    startBlock: 12369621
    options:
      # Must be a key of assets
      abi: Factory
      address: "0x1F98431c8aD98523631AE4a59f267346ea31F984"
    assets:
      Factory:
        file: "./abis/Factory.json"
      ERC20:
        file: "./abis/ERC20.json"
      ERC20SymbolBytes:
        file: "./abis/ERC20SymbolBytes.json"
      ERC20NameBytes:
        file: "./abis/ERC20NameBytes.json"
      Pool:
        file: "./abis/pool.json"
    mapping: ...
    # ethereum/contract
  - kind: ethereum/Runtime
    startBlock: 12369651
    options:
      abi: NonfungiblePositionManager
      address: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88"
    assets:
      NonfungiblePositionManager:
        file: ./abis/NonfungiblePositionManager.json
      Pool:
        file: ./abis/pool.json
      Factory:
        file: ./abis/factory.json
      ERC20:
        file: ./abis/ERC20.json
    mapping: ...
templates:
  - name: Pool
    kind: ethereum/Runtime
    options:
      abi: Pool
    assets:
      Pool:
        file: "./abis/pool.json"
      Factory:
        file: "./abis/factory.json"
      ERC20:
        file: "./abis/ERC20.json"
    mapping: ...
```

Check out our [Manifest File](../../build/manifest/ethereum.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

## 2. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal right at the start.

Within this project, you will observe the presence of 22 GraphQL entities, each interconnected through numerous foreign key relationships. Consider, for instance, the relationship between the `Pool` and `Token` entities. Importantly, these relationships encompass not only one-to-many connections but also extend to encompass many-to-many associations.

```graphql
type Pool @entity {
  id: ID!
  ...
  swaps: [Swap!]! @derivedFrom(field: "pool")
  ...
}

type Swap @entity {
  id: ID!
  ...
  pool: Pool!
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
import { Bundle, Burn, Factory, Mint, Pool, Swap, Tick, Token } from "../types";
```

As you're creating a new Etheruem based project, this command will also generate ABI types and save them into `src/types` using the `npx typechain --target=ethers-v5` command, allowing you to bind these contracts to specific addresses in the mappings and call read-only contract methods against the block being processed.

It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. Read about how this is done in [EVM Codegen from ABIs](../../build/introduction.md#evm-codegen-from-abis).

All of these types are written to `src/typs/abi-interfaces` and `src/typs/contracts` directories. In the example Gravatar SubQuery project, you would import these types like so.

```ts
// Import event types from the registry contract ABI
import {
  InitializeEvent,
  MintEvent,
  BurnEvent,
  SwapEvent,
  FlashEvent,
} from "../types/contracts/Pool";
```

Check out the [GraphQL Schema](../../build/graphql.md) documentation to get in-depth information on `schema.graphql` file.

## 3. Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

They function in a manner akin to SubGraphs, and you can observe in this Uniswap project that they are distributed across three distinct files, along with the inclusion of various utility files.

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
  positions {
    nodes {
      id
      owner
      poolId
      liquidity
      pool {
        id
        token0Id
        token1Id
      }
    }
  }
  swaps {
    nodes {
      id
      token0Id
      token1Id
      amount0
      amount1
    }
  }
}
```

<!-- TODO add a response example -->

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Ethereum/ethereum-uniswap-v3).
:::

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
