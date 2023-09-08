# Boba BNB Quick Start

## Goals

Boba is a multichain Layer-2 network that has two blockchains currently; Boba Mainnet (ie Boba ETH), and Boba BNB Chain (ie Boba BNB). This guide will focus on [Boba BNB](https://chainlist.org/chain/56288). For [Boba ETH](https://chainlist.org/chain/288), please refer to [Boba ETH Quick Start](./boba-eth.md).

The goal of this quick start guide is to index all transfers and approval events from the [Wrapped BOBA](https://bobascan.com/token/0xC58aaD327D6D58D979882601ba8DDa0685B505eA?chainid=56288) on [Boba BNB](https://bobascan.com/) Network .

::: warning
Before we begin, **make sure that you have initialised your project** using the provided steps in the [Start Here](../quickstart.md) section. Please initialise an a Boba BNB project.
:::

In every SubQuery project, there are [3 key files](../quickstart.md#_3-make-changes-to-your-project) to update. Let's begin updating them one by one.

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/blob/main/Boba/boba-bnb-starter).

We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for Boba BNB. Since Boba BNB is an EVM-compatible layer-2 scaling solution, we can use the core Ethereum framework to index it.
:::

## 1. Your Project Manifest File

The Project Manifest (`project.yaml`) file works as an entry point to your Boba BNB project. It defines most of the details on how SubQuery will index and transform the chain data. For Poltgon zkEVM, there are three types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every transaction that matches optional filter criteria, run a mapping function
- [LogHanders](../../build/manifest/ethereum.md#mapping-handlers-and-filters): On each and every log that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to import the correct contract definitions and update the datasource handlers.

As we are indexing all transfers and approvals from the Wrapped BOBA contract on boba BNB network, the first step is to import the contract abi definition which can be obtained from from any standard [ERC-20 contract](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/). Copy the entire contract ABI and save it as a file called `erc20.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```yaml
dataSources:
  - kind: ethereum/Runtime # We use ethereum runtime since Boba BNB is EVM-compatible
    startBlock: 20756087 # This is usually the block that the contract was deployed on https://bobascan.com/token/0xC58aaD327D6D58D979882601ba8DDa0685B505eA?chainid=56288
    options:
      # Must be a key of assets
      abi: erc20
      address: "0xC58aaD327D6D58D979882601ba8DDa0685B505eA" # This is the contract address for Wrapped BOBA https://bobascan.com/token/0xC58aaD327D6D58D979882601ba8DDa0685B505eA?chainid=56288
    assets:
      erc20:
        file: "./abis/erc20.abi.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleTransaction
          kind: ethereum/TransactionHandler # We use ethereum handlers since Boba BNB is EVM-compatible
          filter:
            ## The function can either be the function fragment or signature
            # function: '0x095ea7b3'
            # function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
            function: approve(address spender, uint256 amount)
        - handler: handleLog
          kind: ethereum/LogHandler # We use ethereum handlers since Boba BNB  is EVM-compatible
          filter:
            topics:
              ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
              - Transfer(address indexed from, address indexed to, uint256
                amount)
              # address: "0x60781C2586D68229fde47564546784ab3fACA982"
```

The above code indicates that you will be running a `handleTransaction` mapping function whenever there is a `approve` method being called on any transaction from the [WBOBA contract](https://bobascan.com/token/0xC58aaD327D6D58D979882601ba8DDa0685B505eA?chainid=56288).

The code also indicates that you will be running a `handleLog` mapping function whenever there is a `Transfer` event being emitted from the [WBOBA contract](https://bobascan.com/token/0xC58aaD327D6D58D979882601ba8DDa0685B505eA?chainid=56288).

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
import { Approval, Transfer } from "../types";
import {
  ApproveTransaction,
  TransferLog,
} from "../types/abi-interfaces/Erc20Abi";
import assert from "assert";

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
        "totalCount": 901,
        "nodes": [
          {
            "id": "0x11c3519a07d48ca7e9b3d77c9c288919e8786dfffaad76bdfd6ae554d2481a13",
            "blockHeight": "3072",
            "from": "0xC6c893a0dCf31b5766Ac5c103AF9e9805A6d0774",
            "to": "0xd8E1E7009802c914b0d39B31Fc1759A865b727B1",
            "value": "4390819482026157205",
            "contractAddress": "0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9"
          },
          {
            "id": "0x8d2eed830280b0e35165560f7234da3ccd02f9dc526434e874ccb0e5a464c4f6",
            "blockHeight": "936",
            "from": "0xd8E1E7009802c914b0d39B31Fc1759A865b727B1",
            "to": "0x267816F8789a28463cE10acD50ffeDDE57F318Ee",
            "value": "3499686336793644484",
            "contractAddress": "0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9"
          },
          {
            "id": "0x818086a329ca6cecfaf55ac6f3c5a34b985a97ef5439c15bb66f094b4e76a8e5",
            "blockHeight": "2841",
            "from": "0xd8E1E7009802c914b0d39B31Fc1759A865b727B1",
            "to": "0xC6c893a0dCf31b5766Ac5c103AF9e9805A6d0774",
            "value": "3300395407835132030",
            "contractAddress": "0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9"
          },
          {
            "id": "0x08e395f3058c05141ab656e08fba91d47d52c9bc954e26f378e4edd3f4ef9d8d",
            "blockHeight": "2435",
            "from": "0x4b8f52c68594554DdF13aff5E2d8d788bC56Ca8c",
            "to": "0xd8E1E7009802c914b0d39B31Fc1759A865b727B1",
            "value": "1794066117854317399",
            "contractAddress": "0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9"
          },
          {
            "id": "0x0ac0c00fd9c3bb4ee921e82fe32e658846497697447d9dadffaaec64b2c5ff4a",
            "blockHeight": "2998",
            "from": "0x7D9195077671B08F442B2A1b310858bDB1C4abcc",
            "to": "0xd8E1E7009802c914b0d39B31Fc1759A865b727B1",
            "value": "1430946047728089377",
            "contractAddress": "0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9"
          }
        ]
      }
    },
    "approvals": {
      "nodes": [
        {
          "id": "0xccec6946012d52a27fcae9790ade5a5e7314f934170483fecf2896e3448604bd",
          "blockHeight": null,
          "owner": "0x12680Ad2f3D80b162344Ba3FF3978daB7A565675",
          "spender": "0xd8E1E7009802c914b0d39B31Fc1759A865b727B1",
          "value": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
          "contractAddress": "0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9"
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/blob/main/Boba/boba-bnb-starter/).
:::

## What's next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
