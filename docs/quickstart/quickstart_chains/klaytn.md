# Klaytn Quick Start

## Goals

The goal of this quick start guide is to index all transfers and approval events from the [Orbit ETH](https://scope.klaytn.com/token/0x34d21b1e550d73cee41151c77f3c73359527a396) on [Klaytn](https://scope.klaytn.com) Network .

::: warning
Before we begin, **make sure that you have initialised your project** using the provided steps in the [Start Here](../quickstart.md) section. Please initialise an a Klaytn project.
:::

In every SubQuery project, there are [3 key files](../quickstart.md#_3-make-changes-to-your-project) to update. Let's begin updating them one by one.

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/blob/main/Klaytn/klaytn-starter).

We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for Klaytn Network. Since Klaytn is an EVM-compatible layer-1, we can use the core Ethereum framework to index it.
:::

## 1. Your Project Manifest File

The Project Manifest (`project.yaml`) file works as an entry point to your Klaytn project. It defines most of the details on how SubQuery will index and transform the chain data. For Klaytn, there are three types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every transaction that matches optional filter criteria, run a mapping function
- [LogHanders](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every log that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to import the correct contract definitions and update the datasource handlers.

As we are indexing all transfers and approvals from the Orbit ETH contract on Klaytn network, the first step is to import the contract abi definition which can be obtained from from any standard [ERC-20 contract](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/). Copy the entire contract ABI and save it as a file called `erc20.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```yaml
dataSources:
  - kind: ethereum/Runtime # We use ethereum runtime since Klaytn is EVM-compatible
    startBlock: 131206820 # This is the block that the contract was deployed on https://scope.klaytn.com/token/0x34d21b1e550d73cee41151c77f3c73359527a396
    options:
      # Must be a key of assets
      abi: erc20
      address: "0x34d21b1e550d73cee41151c77f3c73359527a396" # This is the contract address for Orbit Ether https://scope.klaytn.com/token/0x34d21b1e550d73cee41151c77f3c73359527a396
    assets:
      erc20:
        file: "./abis/erc20.abi.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleTransaction
          kind: ethereum/TransactionHandler # We use ethereum handlers since Klaytn is EVM-compatible
          filter:
            ## The function can either be the function fragment or signature
            # function: '0x095ea7b3'
            # function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
            function: approve(address spender, uint256 amount)
        - handler: handleLog
          kind: ethereum/LogHandler # We use ethereum handlers since Klaytn  is EVM-compatible
          filter:
            topics:
              ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
              - Transfer(address indexed from, address indexed to, uint256
                amount)
              # address: "0x60781C2586D68229fde47564546784ab3fACA982"
```

The above code indicates that you will be running a `handleTransaction` mapping function whenever there is a `approve` method being called on any transaction from the [Orbit ETH contract](https://scope.klaytn.com/token/0x34d21b1e550d73cee41151c77f3c73359527a396).

The code also indicates that you will be running a `handleLog` mapping function whenever there is a `Transfer` event being emitted from the [Orbit ETH](https://scope.klaytn.com/token/0x34d21b1e550d73cee41151c77f3c73359527a396).

Check out our [Manifest File](../../build/manifest/ethereum.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

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

If you're creating a new EVM-based project, this command will also generate ABI types and save them into `src/types` using the `npx typechain --target=ethers-v5` command, allowing you to bind these contracts to specific addresses in the mappings and call read-only contract methods against the block being processed. It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. All of these types are written to `src/types/abi-interfaces` and `src/types/contracts` directories. In this example SubQuery project, you would import these types like so.

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
        "totalCount": 8,
        "nodes": [
          {
            "id": "0x19a332808b2642af38d84951bbe17c044b021be6e587a2f8799ff90419279672",
            "blockHeight": "131207180",
            "from": "0xd3e2Fd9dB41Acea03f0E0c22d85D3076186f4f24",
            "to": "0xa03990511B6ee8BDb24C1693f9f8BD90DDfFd19D",
            "value": "1813529233975307",
            "contractAddress": "0x34d21b1e550D73cee41151c77F3c73359527a396"
          },
          {
            "id": "0x12581a3f5dcb67a4d5017fa877c1971f130539ceb81949478cf3710f27802c44",
            "blockHeight": "131207054",
            "from": "0x6B0177E96C3623B6F6940dA18378d52f78CeA12D",
            "to": "0x88Fe4fB118c954c11A359AbcE9dc887F7399bE1c",
            "value": "1731405454880983",
            "contractAddress": "0x34d21b1e550D73cee41151c77F3c73359527a396"
          },
          {
            "id": "0x8df838f5f6e0710c43a15512c353c62ca7ef90b19e77db72f832835d2eab76b1",
            "blockHeight": "131207096",
            "from": "0xc3DA629c518404860c8893a66cE3Bb2e16bea6eC",
            "to": "0xd3e2Fd9dB41Acea03f0E0c22d85D3076186f4f24",
            "value": "160321797378530",
            "contractAddress": "0x34d21b1e550D73cee41151c77F3c73359527a396"
          },
          {
            "id": "0xc4f94437900be853cc03e0fae2c18650fdde00bd8a26cd080d45dd9051edad42",
            "blockHeight": "131206820",
            "from": "0x6B0177E96C3623B6F6940dA18378d52f78CeA12D",
            "to": "0x71B59e4bC2995B57aA03437ed645AdA7Dd5B1890",
            "value": "18574153690448",
            "contractAddress": "0x34d21b1e550D73cee41151c77F3c73359527a396"
          },
          {
            "id": "0x6e4c46dad80fa9c55f4d1e6048317f12614b7405321ce36ed7bec8b0e624dffb",
            "blockHeight": "131207283",
            "from": "0xAebFAe557F3948B91c9cb25fc650A26F728C5C9d",
            "to": "0x09267e3E96925C76DfcC2CE39479559A2AB9B8a2",
            "value": "2000000000000",
            "contractAddress": "0x34d21b1e550D73cee41151c77F3c73359527a396"
          }
        ]
      }
    },
    "approvals": {
      "nodes": [
        {
          "id": "0x61e162fa7e5bbc5edfb462627eaf6d96aaf240ccde102bb0a04ef868bab54c07",
          "blockHeight": null,
          "owner": "0x88Fe4fB118c954c11A359AbcE9dc887F7399bE1c",
          "spender": "0x51D233B5aE7820030A29c75d6788403B8B5d317B",
          "value": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
          "contractAddress": "0x34d21b1e550D73cee41151c77F3c73359527a396"
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/blob/main/Klaytn/klaytn-starter).
:::

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
