# Multichain Quick Start - Plasma Bridge

This page explains how to create an multi-chain indexer to index the bridge transfer that are coming from Polygon to Ethereum via the Polygon Plasma Bridge. After reading this guide, you'll understand how to match the events across several networks and learn how to set up a SubQuery indexer to monitor, track and aggregate those events from different EVM blockchains within a single entity.

There are two types of bridge on Polygon for asset transfer, the Proof of Stake (PoS) Bridge and the Plasma Bridge. The PoS Bridge, as the name suggests, adopts the Proof of Stake (PoS) consensus algorithm to secure its network. Deposits on the PoS Bridge are completed almost instantly, but withdrawals may take a while to confirm. On the other hand, the Plasma Bridge supports the transfer of Polygon's native token `MATIC` and certain Ethereum tokens (`ETH`, ERC-20, and ERC-721). It uses the Ethereum Plasma scaling solution to offer increased security.

<!-- @include: ../snippets/multi-chain-quickstart-reference.md -->

Plasma bridge contracts have been deployed on both networks. In order to establish an indexer, we will need to asynchronously align the events from both of those smart contracts.

<!-- @include: ../snippets/evm-quickstart-reference.md -->

::: tip Note
Check the final code repository [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Multi-Chain/polygon-plasma-bridge) to observe the integration of all previously mentioned configurations into a unified codebase.
:::

<!-- @include: ../snippets/multi-chain-evm-manifest-intro.md#level2 -->

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

<!-- @include: ../snippets/ethereum-manifest-note.md -->

Next, change the name of the file mentioned above to `polygon.yaml` to indicate that this file holds the Ethereum configuration.

<!-- @include: ../snippets/multi-chain-creation.md -->

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

<!-- @include: ../snippets/multi-chain-network-origin-note.md -->

<!-- @include: ../snippets/schema-intro.md#level2 -->

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

<!-- @include: ../snippets/evm-codegen.md -->

```ts
import {
  DepositOnEthereum,
  User,
  DepositOnPolygon,
  BridgeTransaction,
} from "../types";
import { TokenDepositedLog } from "../types/abi-interfaces/PlasmaAbi";
import { NewDepositBlockLog } from "../types/abi-interfaces/PlasmaEthAbi";
```

<!-- @include: ../snippets/evm-mapping-intro.md#level2 -->

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

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

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

<!-- @include: ../snippets/whats-next.md -->
