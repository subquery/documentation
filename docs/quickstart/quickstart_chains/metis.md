# Metis Quick Start

## Goals

The goal of this quick start guide is to index all transfers and approval events from the [METIS Token](https://andromeda-explorer.metis.io/token/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000/token-transfers) on [Metis](https://metis.io/) Network.

::: warning
Before we begin, **make sure that you have initialised your project** using the provided steps in the [Start Here](../quickstart.md) section. Please initialise an a Metis project.
:::

In every SubQuery project, there are [3 key files](../quickstart.md#_3-make-changes-to-your-project) to update. Let's begin updating them one by one.

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/blob/main/Metis/metis-starter).

We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for Metis. Since Metis is an EVM-compatible layer-2 scaling solution, we can use the core Ethereum framework to index it.
:::

## 1. Your Project Manifest File

The Project Manifest (`project.ts`) file works as an entry point to your Metis project. It defines most of the details on how SubQuery will index and transform the chain data. For Poltgon zkEVM, there are three types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every transaction that matches optional filter criteria, run a mapping function
- [LogHanders](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every log that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to import the correct contract definitions and update the datasource handlers.

As we are indexing all transfers and approvals from the Wrapped ETH contract on Metis network, the first step is to import the contract abi definition which can be obtained from from any standard [ERC-20 contract](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/). Copy the entire contract ABI and save it as a file called `erc20.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 41279094, // This is the block that the contract was deployed on
      options: {
        // Must be a key of assets
        abi: "erc20",
        // This is the contract address for Metis Token https://andromeda-explorer.metis.io/token/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000/token-transfers
        address: "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000",
      },
      assets: new Map([["erc20", { file: "./abis/erc20.abi.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Call,
            handler: "handleTransaction",
            filter: {
              /**
               * The function can either be the function fragment or signature
               * function: '0x095ea7b3'
               * function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
               */
              function: "approve(address spender, uint256 rawAmount)",
            },
          },
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleLog",
            filter: {
              /**
               * Follows standard log filters https://docs.ethers.io/v5/concepts/events/
               * address: "0x60781C2586D68229fde47564546784ab3fACA982"
               */
              topics: [
                "Transfer(address indexed from, address indexed to, uint256 amount)",
              ],
            },
          },
        ],
      },
    },
  ],
}
```

The above code indicates that you will be running a `handleTransaction` mapping function whenever there is a `approve` method being called on any transaction from the [METIS token contract](https://andromeda-explorer.metis.io/token/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000/token-transfers).

The code also indicates that you will be running a `handleLog` mapping function whenever there is a `Transfer` event being emitted from the [METIS Token contract](https://andromeda-explorer.metis.io/token/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000/token-transfers).

Check out our [Manifest File](../../build/manifest/ethereum.md) documentation to get more information about the Project Manifest (`project.ts`) file.

## 2. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal right at the start.

Remove all existing entities and update the `schema.graphql` file as follows. Here you can see we are indexing block information such as the id, blockHeight, transfer receiver and transfer sender along with an approvals and all of the attributes related to them (such as owner and spender etc.).

```graphql
type Transfer @entity {
  id: ID! # Transaction hash
  blockHeight: BigInt
  to: String!
  from: String!
  value: BigInt!
  contractAddress: String!
}

type Approval @entity {
  id: ID! # Transaction hash
  blockHeight: BigInt
  owner: String!
  spender: String!
  value: BigInt!
  contractAddress: String!
}
```

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

This will create a new directory (or update the existing one) `src/types` which contains generated entity classes for each type you have defined previously in `schema.graphql`. These classes provide type-safe entity loading, and read and write access to entity fields - see more about this process in [the GraphQL Schema](../../build/graphql.md). All entities can be imported from the following directory:

```ts
import { Approval, Transfer } from "../types";
```

As you're creating a new EVM based project, this command will also generate ABI types and save them into `src/types` using the `npx typechain --target=ethers-v5` command, allowing you to bind these contracts to specific addresses in the mappings and call read-only contract methods against the block being processed.

It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. Read about how this is done in [EVM Codegen from ABIs](../../build/introduction.md#evm-codegen-from-abis).

In this example SubQuery project, you would import these types like so.

```ts
import {
  ApproveTransaction,
  TransferLog,
} from "../types/abi-interfaces/Erc20Abi";
```

::: warning Important
When you make any changes to the schema file, please ensure that you regenerate your types directory using the SubQuery CLI prompt `yarn codegen` or `npm run-script codegen`.
:::

Check out the [GraphQL Schema](../../build/graphql.md) documentation to get in-depth information on `schema.graphql` file.

## 3. Add a Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see two exported functions `handleLog` and `handleTransaction`:

```ts
export async function handleLog(log: TransferLog): Promise<void> {
  logger.info(`New transfer transaction log at block ${log.blockNumber}`);
  assert(log.args, "No log.args");

  const transaction = Transfer.create({
    id: log.transactionHash,
    blockHeight: BigInt(log.blockNumber),
    to: log.args.to,
    from: log.args.from,
    value: log.args.value.toBigInt(),
    contractAddress: log.address,
  });

  await transaction.save();
}

export async function handleTransaction(tx: ApproveTransaction): Promise<void> {
  logger.info(`New Approval transaction at block ${tx.blockNumber}`);
  assert(tx.args, "No tx.args");

  const approval = Approval.create({
    id: tx.hash,
    owner: tx.from,
    spender: await tx.args[0],
    value: BigInt(await tx.args[1].toString()),
    contractAddress: tx.to,
  });

  await approval.save();
}
```

The `handleLog` function receives a `log` parameter of type `TransferLog` which includes log data in the payload. We extract this data and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

The `handleTransaction` function receives a `tx` parameter of type `ApproveTransaction` which includes transaction data in the payload. We extract this data and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

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

Whenever you create a new SubQuery Project, first, you must run it locally on your computer and test it and using Docker is the easiest and quickest way to do this.

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
# Write your query or mutation here
{
  query {
    transfers(first: 5, orderBy: VALUE_DESC) {
      totalCount
      nodes {
        id
        blockHeight
        from
        to
        value
        contractAddress
      }
    }
  }
  approvals(first: 5, orderBy: BLOCK_HEIGHT_DESC) {
    nodes {
      id
      blockHeight
      owner
      spender
      value
      contractAddress
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "query": {
      "transfers": {
        "totalCount": 165,
        "nodes": [
          {
            "id": "0x648205a34608e574a2de7bed21364c2a14709835e2d875194e45b43fb887c2dc",
            "blockHeight": "8408065",
            "from": "0x4A51Cb0A8fb5c45a7F2DDfB95CF3B8d58E9dAa67",
            "to": "0x4DF37CC3C48eC3EB689c8Bf0D91249cE2506f73B",
            "value": "201635067077558703872",
            "contractAddress": "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"
          },
          {
            "id": "0xf468387e997af19aae847614c3b2fed43fa0d4ec0787b3374a327496c87a80a8",
            "blockHeight": "8408085",
            "from": "0x4DF37CC3C48eC3EB689c8Bf0D91249cE2506f73B",
            "to": "0x4A51Cb0A8fb5c45a7F2DDfB95CF3B8d58E9dAa67",
            "value": "199999999117730942120",
            "contractAddress": "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"
          },
          {
            "id": "0x113c5cbf0c99a8e69068ed37a17d40e07242be9d6758b7a7c5746bf92ea2e6c4",
            "blockHeight": "8407056",
            "from": "0x81b9FA50D5f5155Ee17817C21702C3AE4780AD09",
            "to": "0xc9b290FF37fA53272e9D71A0B13a444010aF4497",
            "value": "198693041920000000000",
            "contractAddress": "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"
          },
          {
            "id": "0xd90361778969de6a3a730c2148d839de6da92a0e39b90ef52ac6242714cc20c0",
            "blockHeight": "8407168",
            "from": "0xf7906a45Be80aAd89399c3aB1e95a516B297f8c9",
            "to": "0x4A51Cb0A8fb5c45a7F2DDfB95CF3B8d58E9dAa67",
            "value": "131154997018739080801",
            "contractAddress": "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"
          },
          {
            "id": "0x702fcdf7c4fe1001929c29ace3cd410c9a26d3bbe78683f61643cd445088971f",
            "blockHeight": "8406674",
            "from": "0xa7F01B3B836d5028AB1F5Ce930876E7e2dda1dF8",
            "to": "0xAf7063edA3A026e27963287FCbbb5cFDBc4ea7DE",
            "value": "93257374246577228433",
            "contractAddress": "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"
          }
        ]
      }
    },
    "approvals": {
      "nodes": [
        {
          "id": "0x788a80ec21535d6c7ff916e179e1c54daddf6ba5ff9bbb0470af0065210adb2d",
          "blockHeight": null,
          "owner": "0x90811C6839f1a792104B9eD1c54290ba1dD60D98",
          "spender": "0x2d4F788fDb262a25161Aa6D6e8e1f18458da8441",
          "value": "1290726706608877427",
          "contractAddress": "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"
        },
        {
          "id": "0x80116e7301b06b918ab7c88ed5018db3fc01399468a0eca7c34b5f691aa7057d",
          "blockHeight": null,
          "owner": "0x76C743184eD8F8b07762f1Af98B1EdaD953cdE6c",
          "spender": "0x1fc37a909cB3997f96cE395B3Ee9ac268C9bCcdb",
          "value": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
          "contractAddress": "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"
        },
        {
          "id": "0x73940df7a0af12de0e2a2ec27e6461bed1b7a6330db159938b965fefa56c6398",
          "blockHeight": null,
          "owner": "0xe9030089F4617d4Aa6eE75b5fcA8685543F0e1A0",
          "spender": "0x1fc37a909cB3997f96cE395B3Ee9ac268C9bCcdb",
          "value": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
          "contractAddress": "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"
        },
        {
          "id": "0x1ca0df7ee186db823b2fecb80b6fe21936dc2cdeaec3dab54ff33f145d87d58b",
          "blockHeight": null,
          "owner": "0x1F1e4e3B02268d87d3b6f9043f3B4D96aB244e34",
          "spender": "0x1fc37a909cB3997f96cE395B3Ee9ac268C9bCcdb",
          "value": "697763915137477220",
          "contractAddress": "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"
        },
        {
          "id": "0x81386da3bc1960b7e78ca9853d9141fddea6878fbf7aabb3c9324cff092b07be",
          "blockHeight": null,
          "owner": "0x90811C6839f1a792104B9eD1c54290ba1dD60D98",
          "spender": "0x2d4F788fDb262a25161Aa6D6e8e1f18458da8441",
          "value": "1301646906396793218",
          "contractAddress": "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/blob/main/Metis/metis-starter/).
:::

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
