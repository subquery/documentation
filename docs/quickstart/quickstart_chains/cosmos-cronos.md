# Cronos Quick Start

## Goals

The goal of this quick start guide is to adapt the standard starter project in the Cronos Network and then begin indexing all transfers of [Cro Crow Token](https://www.crocrow.com/).

<br/>
<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/FafUBwzTK5U" frameborder="0" allowfullscreen="true"></iframe>
</figure>

::: warning Important
Cronos is an EVM compatible (Ethermint) chain, as such there are two options for indexing Cronos data. You can index chain data via the standard Cosmos RPC interface, or via Ethereum APIs. For Cronos, we provide a starter project for each.

Before we begin, make sure that you have initialised your project using the provided steps in the **[Start Here](../quickstart.md)** section. You must complete the suggested [4 steps](https://github.com/subquery/cosmos-subql-starter#readme) for Cosmos users.
:::

Now, let's move ahead in the process and update these configurations.

Previously, in the [1. Create a New Project](../quickstart.md) section, you must have noted [3 key files](../quickstart.md#_3-make-changes-to-your-project). Let's begin updating them one by one.

::: tip
The final code of this project can be found [here](https://github.com/deverka/cronos_crow_token_transfers).
:::

## 1. Your Project Manifest File

The Project Manifest (`project.yaml`) file is an entry point to your project. It defines most of the details on how SubQuery will index and transform the chain data. For Cosmos chains, there are four types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every transaction, run a mapping function
- [MessageHandlers](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every message that matches optional filter criteria, run a mapping function
- [EventHanders](../../build/manifest/cosmos.md#mapping-handlers-and-filters): On each and every event that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to change the datasource handlers. This section lists the triggers that look for on the blockchain to start indexing.

::: warning Important
There are two versions of this file depending on your choice to index data via the ETH or Cosmos RPC
:::

::: code-tabs
@tab ETH

```yml
dataSources:
  - kind: ethereum/Runtime
    startBlock: 5120574 #NoteCro Crow Token started at 946
    options:
      abi: erc20
      address: "0xE4ab77ED89528d90E6bcf0E1Ac99C58Da24e79d5" #Cro Crow Token
    assets:
      erc20:
        file: ./cro-crow.abi.json #ABI interface file specific for Cro Crow Token
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleTransfer
          kind: ethereum/LogHandler
          filter:
            topics:
              - "Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
              - null
              - null
              - null
```

@tab Cosmos RPC

```yml
dataSources:
  - kind: cosmos/EthermintEvm
    startBlock: 5120574 #NoteCro Crow Token started at 946
    processor:
      file: ./node_modules/@subql/ethermint-evm-processor/dist/bundle.js
      options:
        abi: erc20
        address: "0xE4ab77ED89528d90E6bcf0E1Ac99C58Da24e79d5" #Cro Crow Token
    assets:
      erc20:
        file: ./cro-crow.abi.json #ABI interface file specific for Cro Crow Token
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleTransfer
          kind: cosmos/EthermintEvmEvent
          filter:
            topics:
              - "Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
              - null
              - null
              - null
```

:::

The above code defines that you will be running a `handleTransfer` mapping function whenever there is an event emitted with the `transfer` method. Check out our [Manifest File](../../build/manifest/cosmos.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

::: tip Note
Please note that Cro Crow token requires a specific ABI interface. You need to:

- Get the [Cro Crow contract ABI](https://cronoscan.com/address/0xe4ab77ed89528d90e6bcf0e1ac99c58da24e79d5#code).
  You can compare with the [interface file](https://github.com/deverka/cronos_crow_token_transfers/blob/e067a87b69168aa6c05e9095b55d15483dd1bff9/cro-crow.abi.json) from this Quick Start final repo.
- Create a file `cro-crow.abi.json` in the main project's directory.
- Link this file as an erc20 asset in the manifest file.
  :::

## 2. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of the data that you are using SubQuery to index, hence it's a great place to start. The shape of your data is defined in a GraphQL Schema file with various [GraphQL entities](../../build/graphql.md).

Update the `schema.graphql` file as follows. The aim is to index all transfers of [Cro Crow Token](https://www.crocrow.com/).

```graphql
type Transfer @entity {
  id: ID! # Transfer hash
  from: String!
  to: String!
  tokenId: BigInt!
}
```

::: warning Important
When you make any changes to the schema file, do not forget to regenerate your types directory.
:::

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

You will find the generated models in the `/src/types/models` directory.

If you're creating as an CosmWasm based project, this command will also generate types for your listed protobufs and save them into `src/types` directory, providing you with more typesafety. Read about how this is done in [Cosmos Codegen from CosmWasm Protobufs](../../build/introduction.md#cosmos-codegen-from-cosmwasm-protobufs).

If you're creating as an EVM based project, this command will also generate ABI types and save them into `src/types` using the `npx typechain --target=ethers-v5` command, allowing you to bind these contracts to specific addresses in the mappings and call read-only contract methods against the block being processed.

It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. Read about how this is done in [EVM Codegen from ABIs](../../build/introduction.md#evm-codegen-from-abis).

Check out our [GraphQL Schema](../../build/graphql.md) documentation to get more information on `schema.graphql` file.

Now that you have made essential changes to the GraphQL Schema file, let’s go ahead with the next configuration.

## 3. Add a Mapping Function

Mapping functions determine how chain data is transformed into the optimised GraphQL entities that you previously defined in the `schema.graphql` file.

Navigate to the default mapping function in the `src/mappings` directory. You will see setup types for ABI `TransferEventArgs` and `ApproveCallArgs`. Delete those for approvals. You will also see two exported functions: `handleEthermintEvmEvent` & `handleEthermintEvmCall` or `handleLog` & `handleTransaction`. Delete them as well.

::: warning Important
There are two versions of this file depending on your choice to index data via the ETH or Cosmos RPC
:::

Update your mapping files to match the following (**note the additional imports**):

::: code-tabs
@tab ETH

```ts
import { Transfer } from "../types";
import { EthereumLog } from "@subql/types-ethereum";
import { BigNumber } from "@ethersproject/bignumber";

// Setup types from ABI
type TransferEventArgs = [string, string, BigNumber] & {
  from: string;
  to: string;
  tokenId: BigNumber;
};

// Save all transfers
export async function handleTransfer(
  log: EthereumLog<TransferEventArgs>
): Promise<void> {
  const transfer = Transfer.create({
    id: log.transactionHash,
    from: log.args.from,
    to: log.args.to,
    tokenId: log.args.tokenId.toBigInt(),
  });

  await transfer.save();
}
```

@tab Cosmos RPC

```ts
import { Transfer } from "../types";
import { EthermintEvmEvent } from "@subql/ethermint-evm-processor";
import { BigNumber } from "ethers";

// Setup types from ABI
type TransferEventArgs = [string, string, BigNumber] & {
  from: string;
  to: string;
  tokenId: BigNumber;
};

// Save all transfers
export async function handleTransfer(
  event: EthermintEvmEvent<TransferEventArgs>
): Promise<void> {
  const transfer = Transfer.create({
    id: event.transactionHash,
    from: event.args.from,
    to: event.args.to,
    tokenId: event.args.tokenId.toBigInt(),
  });

  await transfer.save();
}
```

:::

Let’s understand how the above code works. Here, the function receives an `EthereumLog` or `EthermintEvmEvent` which includes data on the payload. We extract this data and then create a new `Transfer` entity defined earlier in the `schema.graphql` file. After that we use the `.save()` function to save the new entity (SubQuery will automatically save this to the database). Check out our [Mappings](../../build/mapping/cosmos.md) documentation and get information on the mapping functions in detail.

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

Whenever you create a new SubQuery Project, never forget to run it locally on your computer and test it. And using Docker is the most hassle-free way to do this.

`docker-compose.yml` file defines all the configurations that control how a SubQuery node runs. For a new project, which you have just initialised, no major changes are needed.

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
{
  query {
    transfers(first: 5) {
      nodes {
        id
        to
        from
        tokenId
      }
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "transfers": {
      "nodes": [
        {
          "id": "0xff2bcbf7445c48f95b9e9bb770076e1562db2b58881338ea65c8c60aae1f4d20",
          "from": "0xe40E86209bf7A563B23dc5625ea968F9DD9269fA",
          "to": "0x281c2b2a0d5a3db358356537Fb4E1ac6Df9715f0",
          "tokenId": "1160"
        },
        {
          "id": "0xfbc0594cde0776813f02804e816ecd153f0a3e201523479f93f85b5423e5e1c6",
          "from": "0x9B94F48372f5ED14f860B86f606ffb61D908E4dC",
          "to": "0x05d6889ea1593b6e58B3366A95Ac923FC00A37AA",
          "tokenId": "4921"
        },
        {
          "id": "0xc601f604b5c3a6c78257b0e946429d7085c7a9f04b4c985d499c1118465bc30f",
          "from": "0x00779809C0089d269C719F5953F7528E4dcE1Bdc",
          "to": "0x45DfaDC5e74f8Fb62Be7893aA7c1f34db7C26D8d",
          "tokenId": "7085"
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/deverka/cronos_crow_token_transfers).
:::

## What’s Next?

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transferring data from bLuna.

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
