# Multichain Quick Start - Plasma Bridge

This page explains how to create an multi-chain indexer to index the bridge transfer that are coming from Polygon to Ethereum via the Polygon Plasma Bridge. After reading this guide, you'll understand how to match the events across several networks and learn how to set up a SubQuery indexer to monitor, track and aggregate those events from different EVM blockchains within a single entity.

There are two types of bridge on Polygon for asset transfer, the Proof of Stake (PoS) Bridge and the Plasma Bridge. The PoS Bridge, as the name suggests, adopts the Proof of Stake (PoS) consensus algorithm to secure its network. Deposits on the PoS Bridge are completed almost instantly, but withdrawals may take a while to confirm. On the other hand, the Plasma Bridge supports the transfer of Polygon's native token `MATIC` and certain Ethereum tokens (`ETH`, ERC-20, and ERC-721). It uses the Ethereum Plasma scaling solution to offer increased security.

## Setting Up the Indexer

Plasma bridge contracts have been deployed on both networks. In order to establish an indexer, we will need to asynchronously align the events from both of those smart contracts.

::: warning Important
**This project operates across multiple chains, making it more complex than other single chain examples.**

If you are new to SubQuery, we recommend starting your learning journey with single-chain examples, such as the [Polygon Plasma Bridge Deposits](../quickstart_chains/polygon), where we handle the same event, from Polygon, but don't proceed with its matching on the Ethereum side. After understanding the fundamentals, you can then advance to exploring the multi-chain examples.
:::

Before we begin, make sure that you have initialised your project using the provided steps in the [Start Here](../quickstart.md) section. **Please initialise a Ethereum project**. Previously, in the [1. Create a New Project](../quickstart.md) section, you must have noted [3 key files](../quickstart.md#_3-make-changes-to-your-project). Let's begin updating them one by one.

As a prerequisite, you will need to generate types from the ABI files of each smart contract. You can obtain these ABI files by searching for the ABIs of the mentioned smart contract addresses on blockchain scanners. For instance, you can locate the ABI for the Plasma Ethereum smart contract at the bottom of [this page](https://etherscan.io/address/0x401F6c983eA34274ec46f84D70b31C151321188b#code). Additionally, you can kickstart your project by using the EVM Scaffolding approach (detailed [here](../quickstart.md#evm-project-scaffolding)). You'll find all the relevant events to be scaffolded in the documentation for each type of smart contract.

::: tip Note
Check the final code repository [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Multi-Chain/polygon-plasma-bridge) to observe the integration of all previously mentioned configurations into a unified codebase.
:::

In this Plasma indexing project, our main focus is on configuring the indexer to exclusively capture a two logs generated in both Plasma smart contracts:

### 1. Configuring the Manifest Files

To begin, we will establish an Polygon indexer manifest file since we are discussing a case for transfers that are initiated on the Polygon side:

::: code-tabs

@tab project.yaml

```yaml
dataSources:
  - kind: ethereum/Runtime # We use ethereum runtime since Polygon is a layer-2 that is compatible
    startBlock: 49174752
    options:
      # Must be a key of assets
      abi: plasma
      address: "0xd9c7c4ed4b66858301d0cb28cc88bf655fe34861" # Plasma contract
    assets:
      plasma:
        file: "./abis/plasma.abi.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handlePolygonDeposit
          kind: ethereum/LogHandler # We use ethereum handlers since Polygon is a layer-2 that is compatible
          filter:
            topics:
              ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
              - TokenDeposited (address,address,address,uint256,uint256)
```

:::

As you can see, we are only looking for a signle log - `TokenDeposited`. Data from this log will consequently be compared with the one emited in Ethereum network.

::: tip Note
Check out our [Manifest File](../../build/manifest/ethereum.md) documentation to get more information about the Project Manifest file.
:::

Next, change the name of the file mentioned above to `polygon.yaml` to indicate that this file holds the Ethereum configuration.

Then, create a [multi-chain manifest file](../../build/multi-chain#1-create-a-multi-chain-manifest-file). After, following the steps outlined [here](../../build/multi-chain#3-add-a-new-network-to-the-multi-chain-manifest), start adding the new networks. After you successfuly apply the correct entities for each chain, you will end up with a single `subquery-multichain.yaml` file that we'll map to the individual chain manifest files. This multi-chain manifest file will look something like this:

::: code-tabs

@tab subquery-multichain.yaml

```yaml
specVersion: 1.0.0
query:
  name: "@subql/query"
  version: "*"
projects:
  - polygon.yaml
  - ethereum.yaml
```

:::

Now, we have to find the contract and the event on the Polygon network, which data will be matched with Ethereum's smart contract data. The manifest file for Polygon will have the following look:

::: code-tabs

@tab ethereum.yaml

```yaml
dataSources:
  - kind: ethereum/Runtime # We use ethereum runtime since Polygon is a layer-2 that is compatible
    startBlock: 18434359
    options:
      # Must be a key of assets
      abi: plasma-eth
      address: "0x401F6c983eA34274ec46f84D70b31C151321188b"
    assets:
      plasma-eth:
        file: "./abis/plasma-eth.abi.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleEthereumDepositBlock
          kind: ethereum/LogHandler # We use ethereum handlers since Polygon is a layer-2 that is compatible
          filter:
            topics:
              ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
              - NewDepositBlock (address,address,uint256,uint256)
```

:::

Here, again we are relying to the data of the single log, `NewDepositBlock`. Both logs will be processed asynchronously, without a specific order, and will be matched according to their data.

### 2. Updating the GraphQL Schema File

From the aforementioned logs the following entities can be derived:

- `DepositOnPolygon`: Represents deposits on the Polygon side of the bridge.
- `DepositOnEthereum`: Represents withdrawals (Ethereum deposits).
- `BridgeTransaction`: Connects Polygon deposits and Ethereum withdrawals.
- `User`: Represents user data, including wallet address and total deposits.

```graphql
type DepositOnPolygon @entity {
  id: ID! # Deposit Count Index
  rootToken: String!
  childToken: String!
  user: User! # Foreign Key
  amount: BigInt!
  tx: String!
}

type DepositOnEthereum @entity {
  id: ID! # Withdrawl Count Index
  token: String!
  user: User! # Foreign Key
  amount: BigInt!
  tx: String!
}

type BridgeTransaction @entity {
  id: ID!
  depositOnPolygon: DepositOnPolygon
  depositOnEthereum: DepositOnEthereum
}

type User @entity {
  id: ID! # Wallet Address
  totalDeposits: BigInt!
}
```

These types help organise and query information about deposits, transactions, and users within SubQuery bridge indexer.

SubQuery simplifies and ensures type-safety when working with GraphQL entities, smart contracts, events, transactions, and logs. The SubQuery CLI will generate types based on your project's GraphQL schema and any contract ABIs included in the data sources.

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

This action will generate a new directory (or update the existing one) named `src/types`. Inside this directory, you will find automatically generated entity classes corresponding to each type defined in your `schema.graphql`. These classes facilitate type-safe operations for loading, reading, and writing entity fields. You can learn more about this process in [the GraphQL Schema section](../../build/graphql.md).

You can conveniently import all these entities from the following directory:

```ts
import {
  DepositOnEthereum,
  User,
  DepositOnPolygon,
  BridgeTransaction,
} from "../types";
```

It will also generate a class for every contract event, offering convenient access to event parameters, as well as information about the block and transaction from which the event originated. You can find detailed information on how this is achieved in the [EVM Codegen from ABIs](../../build/introduction.md#evm-codegen-from-abis) section. All of these types are stored in the `src/types/abi-interfaces` and `src/types/contracts` directories.

```ts
import { TokenDepositedLog } from "../types/abi-interfaces/PlasmaAbi";
import { NewDepositBlockLog } from "../types/abi-interfaces/PlasmaEthAbi";
```

### 3. Writing the Mappings

Mapping functions define how blockchain data is transformed into the optimized GraphQL entities that we previously defined in the `schema.graphql` file.

::: tip Note
For more information on mapping functions, please refer to our [Mappings](../../build/mapping/ethereum.md) documentation.
:::

Setting up mappings for this smart contract is straightforward. In this instance, the mappings are stored within the `src/mappings` directory, with the sole mapping file being `mappingHandlers.ts`. Now, let's take a closer look at it:

```ts
import assert from "assert";
import {
  DepositOnEthereum,
  User,
  DepositOnPolygon,
  BridgeTransaction,
} from "../types";
import { TokenDepositedLog } from "../types/abi-interfaces/PlasmaAbi";
import { NewDepositBlockLog } from "../types/abi-interfaces/PlasmaEthAbi";

async function checkGetUser(user: string): Promise<User> {
  let userRecord = await User.get(user.toLowerCase());
  if (!userRecord) {
    userRecord = User.create({
      id: user.toLowerCase(),
      totalDeposits: BigInt(0),
    });
    await userRecord.save();
  }
  return userRecord;
}

export async function handlePolygonDeposit(
  deposit: TokenDepositedLog
): Promise<void> {
  assert(deposit.args, "No args on deposit");
  const userId = deposit.args[2].toLowerCase();
  const userRecord = await checkGetUser(userId);

  const depositRecord = DepositOnPolygon.create({
    id: deposit.args[4].toString(),
    rootToken: deposit.args[0],
    childToken: deposit.args[1],
    userId: userId,
    amount: deposit.args[3].toBigInt(),
    tx: deposit.transactionHash,
  });
  await depositRecord.save();

  userRecord.totalDeposits += depositRecord.amount;
  await userRecord.save();

  let bridgeTransactionRecord = await BridgeTransaction.get(
    deposit.args.depositCount.toString()
  );
  if (!bridgeTransactionRecord) {
    bridgeTransactionRecord = BridgeTransaction.create({
      id: deposit.args.depositCount.toString(),
    });
  }
  bridgeTransactionRecord.depositOnPolygonId =
    deposit.args.depositCount.toString();
  await bridgeTransactionRecord.save();
}

export async function handleEthereumDepositBlock(
  deposit: NewDepositBlockLog
): Promise<void> {
  assert(deposit.args, "No args on deposit");
  const userId = deposit.args.owner.toLocaleLowerCase();
  const userRecord = await checkGetUser(userId);

  const depositRecord = DepositOnEthereum.create({
    id: deposit.args.depositBlockId.toString(),
    token: deposit.args.token,
    userId: userId,
    amount: deposit.args.amountOrNFTId.toBigInt(),
    tx: deposit.transactionHash,
  });
  await depositRecord.save();

  userRecord.totalDeposits += depositRecord.amount;
  await userRecord.save();

  let bridgeTransactionRecord = await BridgeTransaction.get(
    deposit.args.depositBlockId.toString()
  );
  if (!bridgeTransactionRecord) {
    bridgeTransactionRecord = BridgeTransaction.create({
      id: deposit.args.depositBlockId.toString(),
    });
  }
  bridgeTransactionRecord.depositOnEthereumId =
    deposit.args.depositBlockId.toString();
  await bridgeTransactionRecord.save();
}
```

Here's a brief explanation of what this code does. There are two main functions defined:

- `handlePolygonDeposit`: This function processes deposits made on the Polygon side of the bridge. It does the following:

  - Checks if the deposit log contains arguments.
  - Retrieves or creates a user record using `checkGetUser`.
  - Creates a deposit record for the Polygon deposit and saves it to the database.
  - Updates the total deposits for the user.
  - Creates or retrieves a bridge transaction record and associates it with the Polygon deposit.

- `handleEthereumDepositBlock`: This function processes deposit blocks on the Ethereum side of the bridge. It performs similar actions as `handlePolygonDeposit` but for Ethereum deposits.

The `checkGetUser` function is defined to retrieve a user's record from a database. If the user record doesn't exist, it creates one with an initial total deposit value of 0.

🎉 At this stage, we have successfully incorporated all the desired entities that can be retrieved from Plasma Bridge smart contracts. Additionally, we've created mapping handlers is designed to handle and store deposit-related information from both sides of the bridge, update user records, and maintain transaction records for deposits.

::: tip Note
Check the final code repository [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Multi-Chain/polygon-plasma-bridge) to observe the integration of all previously mentioned configurations into a unified codebase.
:::

## Build Your Project

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

## Run Your Project Locally with Docker

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

## Query your Project

Next, let's query our project. Follow these three simple steps to query your SubQuery project:

1. Open your browser and head to `http://localhost:3000`.

2. You will see a GraphQL playground in the browser and the schemas which are ready to query.

3. Find the _Docs_ tab on the right side of the playground which should open a documentation drawer. This documentation is automatically generated and it helps you find what entities and methods you can query.

Try the following queries to understand how it works for your new SubQuery starter project. Don’t forget to learn more about the [GraphQL Query language](../../run_publish/query.md).

::: details Bridge Transactions

#### Request

```graphql
{
  query {
    bridgeTransactions {
      nodes {
        id
        depositOnEthereum {
          id
          user {
            id
          }
          token
          amount
          tx
        }
        depositOnPolygon {
          id
          user {
            id
          }
          rootToken
          amount
          tx
        }
      }
    }
  }
}
```

#### Response

```json
{
  "data": {
    "query": {
      "bridgeTransactions": {
        "nodes": [
          {
            "id": "529040001",
            "depositOnEthereum": {
              "id": "529040001",
              "user": {
                "id": "0xc163034e49f0ee158de7dd0aa37e665d560de40f"
              },
              "token": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
              "amount": "3113988835221724970000",
              "tx": "0x8a082796ee2d846e3e064c34e08ae4510051896612e793f8e5b7a5314fcd1eb9"
            },
            "depositOnPolygon": {
              "id": "529040001",
              "user": {
                "id": "0xc163034e49f0ee158de7dd0aa37e665d560de40f"
              },
              "token": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
              "amount": "3113988835221724970000",
              "tx": "0x0b8a99dfea351f3f2dc7d8e114b2408df528660bfb9008d097c951fe87fa7a01"
            }
          }
        ]
      }
    }
  }
}
```

:::

::: details Network Metadatas

#### Request

```graphql
{
  _metadatas {
    totalCount
    nodes {
      chain
      lastProcessedHeight
    }
  }
}
```

#### Response

```json
{
  "data": {
    "_metadatas": {
      "totalCount": 3,
      "nodes": [
        {
          "chain": "137",
          "lastProcessedHeight": 45222964
        },
        {
          "chain": "1",
          "lastProcessedHeight": 14312934
        }
      ]
    }
  }
}
```

:::

::: tip Note
Check the final code repository [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Multi-Chain/polygon-plasma-bridge).
:::

## What's next?

Well done! You've successfully set up a SubQuery project that's locally running. This project indexes the Plasma Bridge smart contracts. What's even more impressive is that it accomplishes this from multiple blockchains and allows GraphQL API requests to be made from a single endpoint.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
