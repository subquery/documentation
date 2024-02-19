# Polygon Quick Start

The goal of this quick start guide is to index all token deposits from the Polygon Plasma Bridge.

<!-- @include: ../snippets/evm-quickstart-reference.md -->

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Polygon/polygon-plasma-bridge).
:::

#### Check out how to get the Polygon starter project running

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/1qN7KeCtg6U" frameborder="0" allowfullscreen="true"></iframe>
</figure>

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

::: warning Important
We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Handler`) for Polygon. Since Polygon is a layer-2 scaling solution, we can use the core Ethereum framework to index it.
:::

We are indexing actions from the Plasma bridge contract, first you will need to import the contract abi defintion from https://polygonscan.com/tx/0x88e3ab569326b52e9dd8a5f72545d89d8426bbf536f3bfaf31e023fb459ca373. You can copy the entire JSON and save as a file `plasma.abi.json` in the root directory.

This section in the Project Manifest now imports all the correct definitions and lists the triggers that we look for on the blockchain when indexing.

**Since you are going to index all Plasma Deposits and Withdrawls, you need to update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 8323392,
      options: {
        // Must be a key of assets
        abi: "plasma",
        // Plasma contract
        address: "0xd9c7c4ed4b66858301d0cb28cc88bf655fe34861",
      },
      assets: new Map([["plasma", { file: "./abis/plasma.abi.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleDeposit",
            filter: {
              topics: [
                "TokenDeposited (address indexed rootToken, address indexed childToken, address indexed user, uint256 amount, uint256 depositCount)",
              ],
            },
          },
          {
            kind: EthereumHandlerKind.Event,
            handler: "handleDeposit",
            filter: {
              topics: [
                "TokenWithdrawn (address indexed rootToken, address indexed childToken, address indexed user, uint256 amount, uint256 withrawCount)",
              ],
            },
          },
        ],
      },
    },
  ],
}
```

The above code indicates that you will be running a `handleDeposit` mapping function whenever there is an `TokenDeposited` log on any transaction from the [Plasma Bridge contract](https://polygonscan.com/tx/0x88e3ab569326b52e9dd8a5f72545d89d8426bbf536f3bfaf31e023fb459ca373). Simarly, you'll be running a `handleWithdrawl` mapping function whenever there is an `TokenWithdrawn` logs.

<!-- @include: ../snippets/polygon-manifest-note.md -->

<!-- @include: ../snippets/schema-intro.md#level2 -->

Remove all existing entities and update the `schema.graphql` file as follows. Here you can see we are indexing three entities, a `Deposit` and a `Withdrawl` each with a [foreign key relationship](../../build/graphql.md#entity-relationships) to the `User`.

```graphql
type Deposit @entity {
  id: ID! # Deposit Count Index
  rootToken: String!
  childToken: String!
  user: User! # Foreign Key
  amount: BigInt!
  amountFriendly: BigInt!
}

type Withdrawl @entity {
  id: ID! # Withdrawl Count Index
  rootToken: String!
  childToken: String!
  user: User! # Foreign Key
  amount: BigInt!
  amountFriendly: BigInt!
}

type User @entity {
  id: ID! # Wallet Address
  totalDeposits: BigInt!
  totalWithdrawls: BigInt!
}
```

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/evm-codegen.md -->

```ts
import { Deposit, User, Withdrawl } from "../types";
import {
  TokenWithdrawnLog,
  TokenDepositedLog,
} from "../types/abi-interfaces/PlasmaAbi";
```

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro.md#level2 -->

Follow these steps to add a mapping function:

Navigate to the default mapping function in the `src/mappings` directory. You will be able to see three exported functions: `handleBlock`, `handleLog`, and `handleTransaction`. Replace these functions with the following code (**note the additional imports**):

```ts
import { Deposit, User, Withdrawl } from "../types";
import {
  TokenWithdrawnLog,
  TokenDepositedLog,
} from "../types/abi-interfaces/PlasmaAbi";

async function checkGetUser(user: string): Promise<User> {
  let userRecord = await User.get(user.toLowerCase());
  if (!userRecord) {
    userRecord = User.create({
      id: user.toLowerCase(),
      totalDeposits: BigInt(0),
      totalWithdrawls: BigInt(0),
    });
    await userRecord.save();
  }
  return userRecord;
}

export async function handleDeposit(deposit: TokenDepositedLog): Promise<void> {
  logger.info(`New deposit transaction log at block ${deposit.blockNumber}`);
  const userId = deposit.args[2].toLowerCase();
  const userRecord = await checkGetUser(userId);

  const depositRecord = Deposit.create({
    id: deposit.args[4].toString(),
    rootToken: deposit.args[0],
    childToken: deposit.args[1],
    userId,
    amount: deposit.args[3].toBigInt(),
    amountFriendly: deposit.args[3].toBigInt(),
  });
  await depositRecord.save();

  userRecord.totalDeposits += depositRecord.amount;
  await userRecord.save();
}

export async function handleWithdrawl(
  withdrawl: TokenWithdrawnLog,
): Promise<void> {
  logger.info(
    `New Withdrawl transaction log at block ${withdrawl.blockNumber}`,
  );
  const userId = withdrawl.args[2].toLowerCase();
  const userRecord = await checkGetUser(userId);

  const withdrawlRecord = Withdrawl.create({
    id: withdrawl.args[4].toString(),
    rootToken: withdrawl.args[0],
    childToken: withdrawl.args[1],
    userId,
    amount: withdrawl.args[3].toBigInt(),
    amountFriendly: withdrawl.args[3].toBigInt(),
  });
  await withdrawlRecord.save();

  userRecord.totalDeposits += withdrawlRecord.amount;
  await userRecord.save();
}
```

Let’s understand how the above code works.

For `handleDeposit`, the function here receives an `TokenDepositedLog` which includes transaction log data in the payload. We extract this data and first confirm if we have a `User` record via `checkGetUser`. We then create a new `Deposit` entity that we defined in our `schema.graphql` and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

For `handleWithdrawl`, the function here receives an `TokenWithdrawnLog` which includes transaction log data in the payload. We extract this data and first confirm if we have a `User` record via `checkGetUser`. We then create a new `Withdrawl` entity that we defined in our `schema.graphql` and then save this to the store using the `.save()` function (_Note that SubQuery will automatically save this to the database_).

<!-- @include: ../snippets/polygon-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
query {
  deposits(first: 5, orderBy: AMOUNT_DESC) {
    nodes {
      id
      rootToken
      childToken
      userId
      amount
      amountFriendly
    }
  }
  users(first: 5, orderBy: TOTAL_DEPOSITS_DESC) {
    nodes {
      id
      totalDeposits
      deposits(first: 5, orderBy: AMOUNT_DESC) {
        totalCount
        nodes {
          id
          rootToken
          childToken
          amount
          amountFriendly
        }
      }
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "deposits": {
      "nodes": [
        {
          "id": "86050001",
          "rootToken": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
          "childToken": "0x0000000000000000000000000000000000001010",
          "userId": "0xa0ec2cc2f5966601284a4971205412cb0d396947",
          "amount": "436178234282070000000000",
          "amountFriendly": "436178234282070000000000"
        },
        {
          "id": "85970002",
          "rootToken": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
          "childToken": "0x0000000000000000000000000000000000001010",
          "userId": "0x3a542300159d084382e228ec8f54a402451e5a67",
          "amount": "306601000000000000000000",
          "amountFriendly": "306601000000000000000000"
        },
        {
          "id": "86170001",
          "rootToken": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
          "childToken": "0x0000000000000000000000000000000000001010",
          "userId": "0x0ccf5b43857ca33df612a4f1cb671d67383bf31e",
          "amount": "150887763821350281472596",
          "amountFriendly": "150887763821350281472596"
        },
        {
          "id": "85970001",
          "rootToken": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
          "childToken": "0x0000000000000000000000000000000000001010",
          "userId": "0x0a5ccb582c0b08c8e7704311383c2ea698840e7b",
          "amount": "129292331999990000000000",
          "amountFriendly": "129292331999990000000000"
        },
        {
          "id": "86490001",
          "rootToken": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
          "childToken": "0x0000000000000000000000000000000000001010",
          "userId": "0x93beca36d5bcdc7be0f9ca38b1b5f5f5292aa859",
          "amount": "109399000000000000000000",
          "amountFriendly": "109399000000000000000000"
        }
      ]
    },
    "users": {
      "nodes": [
        {
          "id": "0xa0ec2cc2f5966601284a4971205412cb0d396947",
          "totalDeposits": "436178234282070000000000",
          "deposits": {
            "totalCount": 1,
            "nodes": [
              {
                "id": "86050001",
                "rootToken": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
                "childToken": "0x0000000000000000000000000000000000001010",
                "amount": "436178234282070000000000",
                "amountFriendly": "436178234282070000000000"
              }
            ]
          }
        },
        {
          "id": "0x3a542300159d084382e228ec8f54a402451e5a67",
          "totalDeposits": "306601000000000000000000",
          "deposits": {
            "totalCount": 1,
            "nodes": [
              {
                "id": "85970002",
                "rootToken": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
                "childToken": "0x0000000000000000000000000000000000001010",
                "amount": "306601000000000000000000",
                "amountFriendly": "306601000000000000000000"
              }
            ]
          }
        },
        {
          "id": "0x0ccf5b43857ca33df612a4f1cb671d67383bf31e",
          "totalDeposits": "150887763821350281472596",
          "deposits": {
            "totalCount": 1,
            "nodes": [
              {
                "id": "86170001",
                "rootToken": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
                "childToken": "0x0000000000000000000000000000000000001010",
                "amount": "150887763821350281472596",
                "amountFriendly": "150887763821350281472596"
              }
            ]
          }
        },
        {
          "id": "0x0a5ccb582c0b08c8e7704311383c2ea698840e7b",
          "totalDeposits": "129292331999990000000000",
          "deposits": {
            "totalCount": 1,
            "nodes": [
              {
                "id": "85970001",
                "rootToken": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
                "childToken": "0x0000000000000000000000000000000000001010",
                "amount": "129292331999990000000000",
                "amountFriendly": "129292331999990000000000"
              }
            ]
          }
        },
        {
          "id": "0x93beca36d5bcdc7be0f9ca38b1b5f5f5292aa859",
          "totalDeposits": "109399000000000000000000",
          "deposits": {
            "totalCount": 1,
            "nodes": [
              {
                "id": "86490001",
                "rootToken": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
                "childToken": "0x0000000000000000000000000000000000001010",
                "amount": "109399000000000000000000",
                "amountFriendly": "109399000000000000000000"
              }
            ]
          }
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Polygon/polygon-plasma-bridge).
:::

<!-- @include: ../snippets/whats-next.md -->
