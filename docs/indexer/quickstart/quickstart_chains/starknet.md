# Starknet Quick Start

The goal of this quick start guide is to index all withdrawls and deposits on the zkLend protocol on Starknet Mainnet. It's an excellent starting point to help understand how to use SubQuery to index data on Starknet.

<!-- @include: ../snippets/quickstart-reference.md -->

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/starknet-subql-starter/tree/main/starknet-starter).
:::

## 1. Update Your GraphQL Schema File

The `schema.graphql` file determines the shape of the data that you are using SubQuery to index, hence it's a great place to start. The shape of your data is defined in a GraphQL Schema file with various [GraphQL entities](../../build/graphql.md).

Update the `schema.graphql` file as follows. In this project, you can see we are indexing all withdrawl or deposit actions on the zkLend protocol. Each entity has a number of properties, including id, created (date), createdBlock, token, and address. Address is actually a foreign key to a different table, and you can see how this [one-to-many relationship](../../build/graphql.md#one-to-many-relationships) is defined with `address: Address!`

```graphql
type Deposit @entity {
  id: ID! # Transaction hash
  address: Address!
  token: String!
  amount: BigInt!
  created: Date!
  createdBlock: BigInt!
}

type Withdraw @entity {
  id: ID! # Transaction hash
  address: Address!
  token: String!
  amount: BigInt!
  created: Date!
  createdBlock: BigInt!
}

type Address @entity {
  id: ID! # Address
  deposits: [Deposit!]! @derivedFrom(field: "address")
  withdraws: [Withdraw!]! @derivedFrom(field: "address")
}
```

::: warning Important
When you make any changes to the schema file, please ensure that you regenerate your types directory.
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

Check out the [GraphQL Schema](../../build/graphql.md) documentation to get in-depth information on `schema.graphql` file.

Now that you have made essential changes to the GraphQL Schema file, let’s move forward to the next file.

## 2. Update Your Project Manifest File

The Project Manifest (`project.ts`) file works as an entry point to your Starknet project. It defines most of the details on how SubQuery will index and transform the chain data. For Starknet, there are three types of mapping handlers (and you can have more than one in each project):

- [BlockHanders](../../build/manifest/starknet.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [TransactionHandlers](../../build/manifest/starknet.md#mapping-handlers-and-filters): On each and every transaction that matches an optional filter, run a mapping function
- [LogHanders](../../build/manifest/starknet.md#mapping-handlers-and-filters): On each and every log that matches optional filter criteria, run a mapping function

Note that the manifest file has already been set up correctly and doesn’t require significant changes, but you need to change the datasource handlers. This section lists the triggers that look for on the blockchain to start indexing.

```ts
{
  dataSources: [
    {
      kind: StarknetDatasourceKind.Runtime,
      startBlock: 995339,
      options: {
        // Must be a key of assets
        abi: "zkLend",
        // # this is the contract address for zkLend market https://starkscan.co/contract/0x04c0a5193d58f74fbace4b74dcf65481e734ed1714121bdc571da345540efa05
        address:
          "0x04c0a5193d58f74fbace4b74dcf65481e734ed1714121bdc571da345540efa05",
      },
      assets: new Map([["zkLend", { file: "./abis/zkLend.abi.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: StarknetHandlerKind.Call,
            handler: "handleTransaction",
            filter: {
              to: "0x04c0a5193d58f74fbace4b74dcf65481e734ed1714121bdc571da345540efa05",
              type: "INVOKE",
              /**
               * The function can either be the function fragment or signature
               * function: 'withdraw'
               * function: '0x015511cc3694f64379908437d6d64458dc76d02482052bfb8a5b33a72c054c77'
               */
              function: "withdraw",
            },
          },
          {
            kind: StarknetHandlerKind.Event,
            handler: "handleLog",
            filter: {
              /**
               * Follows standard log filters for Starknet
               * zkLend address: "0x04c0a5193d58f74fbace4b74dcf65481e734ed1714121bdc571da345540efa05"
               */
              topics: [
                "Deposit", //0x9149d2123147c5f43d258257fef0b7b969db78269369ebcf5ebb9eef8592f2
              ],
            },
          },
        ],
      },
    },
  ],
}
```

The above code indicates that you will be running a `handleTransaction` mapping function whenever there is an Starknet Transaction that is a transaction type `INVOKE`, and is to the contract `0x04c0a5193d58f74fbace4b74dcf65481e734ed1714121bdc571da345540efa05` and invokes the `withdraw` function. Additionally the `handleLog` mapping function will run whenever there is a Starknet Log emitted from the `0x04c0a5193d58f74fbace4b74dcf65481e734ed1714121bdc571da345540efa05` contact that includes the `Deposit` topic.

Check out our [Manifest File](../../build/manifest/starknet.md) documentation to get more information about the Project Manifest (`project.ts`) file.

Next, let’s proceed ahead with the Mapping Function’s configuration.

## 3. Add the Mapping Functions

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we previously defined in the `schema.graphql` file.

Navigate to the default mapping function in the `src/mappings` directory.

There are two mapping functions we need to implement in our project, a `handleTransaction` and a `handleLog`

### 3.1 HandleTransaction for Withdrawls

The `handleTransaction` function receives event data whenever an transaction matches the filters, which you specified previously in the `project.ts`. Let’s make changes to it, process withdrawl transactions, and save them to the GraphQL entities created earlier.

Update the `handleTransaction` function as follows (**note the additional imports**):

```ts
import assert from "assert";
import { StarknetTransaction } from "@subql/types-starknet";
import { Address, Withdraw } from "../types/models";
import { BigNumber, BigNumberish } from "ethers";

type WithdrawTransaction = StarknetTransaction;

// Custom method replace "num.toHexString", due to sandbox TextEncoder issue
//  at utf8ToBytes (webpack://stark-starter/./node_modules/@scure/starknet/node_modules/@noble/hashes/utils.js:109:31)
function convertBigNumberish(bigNumberish: BigNumberish): string {
  const bigNumber = BigNumber.from(bigNumberish);
  const hexValue = bigNumber.toHexString();
  return hexValue;
}

async function checkGetAddress(addressString: string): Promise<Address> {
  let address = await Address.get(addressString.toLowerCase());
  if (!address) {
    address = Address.create({
      id: addressString.toLowerCase(),
    });
    await address.save();
  }
  return address;
}

export async function handleTransaction(
  tx: WithdrawTransaction
): Promise<void> {
  logger.info(`New Withdraw transaction at block ${tx.blockNumber}`);
  assert(tx.decodedCalls, "No tx decodedCalls");

  // Get Address
  const addressString = convertBigNumberish(tx.from);
  const address = await checkGetAddress(addressString);

  for (let i = 0; i < tx.decodedCalls.length; i++) {
    const call = tx.decodedCalls[i];
    // Because the entire invoke transaction is returned, so we need to filter out the calls with filter here again
    // This should not have major impact on performance
    if (
      call.selector ===
        "0x015511cc3694f64379908437d6d64458dc76d02482052bfb8a5b33a72c054c77" ||
      call.selector ===
        "0x15511cc3694f64379908437d6d64458dc76d02482052bfb8a5b33a72c054c77"
    ) {
      if (!call.decodedArgs) {
        throw new Error(
          `Expect decodedArgs in withdraw tx ${tx.hash}, call #${i}`
        );
      }

      const withdraw = Withdraw.create({
        id: `${tx.hash}_${i}`,
        addressId: address.id,
        token: convertBigNumberish(call.decodedArgs.token),
        amount: BigInt(call.decodedArgs.amount),
        created: new Date(tx.blockTimestamp * 1000),
        createdBlock: BigInt(tx.blockNumber),
      });
      await withdraw.save();
    }
  }
}
```

Let’s understand how the above code works.

Here, the function receives a `StarknetTransaction` which includes all transaction data on the payload. We first extract the address of the user making this transaction by converting the string representation to hexstring using a custom `convertBigNumberish` function, and then verify if there is an existing Address entity saved for this wallet address using the `checkGetAddress`.

We store the decoded calls in the transaction object, so you can easily access the decoded calls and their args in the transaction object. To distinguish between different calls types, we use the `selector` field in the decoded call object to get the right decoded arguments.

We extract this data and then instantiate a new `Withdraw` entity, using all required properties defined earlier in the `schema.graphql` file. After that, we use the `.save()` function to save the new entity (SubQuery will automatically save this to the database).

Check out our [Mappings](../../build/mapping/starknet.md) documentation to get more information on mapping functions.

### 3.2 HandleLog for Deposits

The `handleLog` function receives event data whenever an log matches the filters, which you specified previously in the `project.ts`. Let’s make changes to it, process deposit transaction logs, and save them to the GraphQL entities created earlier.

Update the `handleLog` function as follows (**note the additional imports**):

```ts
import assert from "assert";
import { StarknetLog } from "@subql/types-starknet";
import { Address, Deposit } from "../types/models";
import { BigNumber, BigNumberish } from "ethers";

type DespositEvent = {
  user: BigNumberish;
  token: BigNumberish;
  face_amount: string;
};
type DespositArgs = {
  "zklend::market::Market::Deposit": DespositEvent;
  block_hash: string;
  block_number: number;
  transaction_hash: string;
};

type DepositLog = StarknetLog<DespositArgs>;

// Custom method replace "num.toHexString", due to sandbox TextEncoder issue
//  at utf8ToBytes (webpack://stark-starter/./node_modules/@scure/starknet/node_modules/@noble/hashes/utils.js:109:31)
function convertBigNumberish(bigNumberish: BigNumberish): string {
  const bigNumber = BigNumber.from(bigNumberish);
  const hexValue = bigNumber.toHexString();
  return hexValue;
}

async function checkGetAddress(addressString: string): Promise<Address> {
  let address = await Address.get(addressString.toLowerCase());
  if (!address) {
    address = Address.create({
      id: addressString.toLowerCase(),
    });
    await address.save();
  }
  return address;
}

export async function handleLog(log: DepositLog): Promise<void> {
  logger.info(`New deposit event at block ${log.blockNumber}`);
  assert(log.args, `No log.args, check tx ${log.transactionHash}`);
  const event = log.args["zklend::market::Market::Deposit"];
  const token = convertBigNumberish(event.token);

  // Get Address
  const addressString = convertBigNumberish(event.user);
  const address = await checkGetAddress(addressString);

  const deposit = Deposit.create({
    id: `${log.transactionHash}_${address.id}`,
    token: token,
    amount: BigInt(event.face_amount),
    addressId: address.id,
    createdBlock: BigInt(log.blockNumber),
    created: new Date(log.transaction.blockTimestamp * 1000),
  });
  await deposit.save();
}
```

Let’s understand how the above code works.

Here, the function receives a `DepositLog` which is an extended `StarknetLog<DespositArgs>` with additional DepositArgs for type safety. We store the decoded data in the log args object, which is named based on the log type (in this case `const event = log.args["zklend::market::Market::Deposit"];`).

We first extract the address of the user making this transaction by converting the string representation to hexstring using a custom `convertBigNumberish` function, and then verify if there is an existing Address entity saved for this wallet address using the `checkGetAddress`.

We extract this data and then instantiate a new `Deposit` entity, using all required properties defined earlier in the `schema.graphql` file. After that, we use the `.save()` function to save the new entity (SubQuery will automatically save this to the database).

Check out our [Mappings](../../build/mapping/starknet.md) documentation to get more information on mapping functions.

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
query {
  deposits(first: 5, orderBy: AMOUNT_DESC) {
    nodes {
      id
      nodeId
      token
      addressId
      amount
      created
      createdBlock
    }
  }
  withdraws(
    first: 5
    orderBy: CREATED_DESC
    filter: {
      token: {
        likeInsensitive: "0x05574eb6b8789a91466f902c380d978e472db68170ff82a5b650b95a58ddf4ad"
      }
    }
  ) {
    nodes {
      id
      amount
      created
      createdBlock
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
          "id": "0x2f205ef06e167a4f4a0347ef66f5d12c5eafe1d4a5b742273034f1e4cb90148_0x01302bb647d1b14b492760cefb6ea6d2031d1a591793ea85461778dc52e6c2ae",
          "nodeId": "WyJkZXBvc2l0cyIsImYyMTkwOGFlLWMwNjEtNGEwOC1hZjYxLTNmZDRiOWVjMWQ2MSJd",
          "token": "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
          "addressId": "0x01302bb647d1b14b492760cefb6ea6d2031d1a591793ea85461778dc52e6c2ae",
          "amount": "22000000000000000000000",
          "created": "2024-12-19T10:08:54",
          "createdBlock": "995748"
        },
        {
          "id": "0x3fa2ef03f9496d84f796a329d10450681828ff44ce937e6057d3e5d032ea608_0x01302bb647d1b14b492760cefb6ea6d2031d1a591793ea85461778dc52e6c2ae",
          "nodeId": "WyJkZXBvc2l0cyIsIjhhMTM3N2ViLWQ1ODctNGY0My1iOWVlLTg5ODRiZDUxMmU0MCJd",
          "token": "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
          "addressId": "0x01302bb647d1b14b492760cefb6ea6d2031d1a591793ea85461778dc52e6c2ae",
          "amount": "15000000000000000000000",
          "created": "2024-12-19T10:05:49",
          "createdBlock": "995742"
        },
        {
          "id": "0x3aa05882969fb73405119e18c41ba2969659b702a51a1ec755d2c02c27eb6ad_0x06daa54211fe782b22239e4dc062ba9b46c14913a6cd688489bb3cf5689f757b",
          "nodeId": "WyJkZXBvc2l0cyIsIjZmMGU0ZWEyLTIzMDctNDRhOC1hMzI4LTNkZWZmYzBhYmQzMCJd",
          "token": "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
          "addressId": "0x06daa54211fe782b22239e4dc062ba9b46c14913a6cd688489bb3cf5689f757b",
          "amount": "6000000000000000000000",
          "created": "2024-12-19T10:24:45",
          "createdBlock": "995779"
        },
        {
          "id": "0x47efd92bcda385f23b859f86fa45d32fa1b59227d624bb3769678b1e34e61ff_0x02e9345794efe74b2a251b35145275996b7bc2ac2d71898b35ab739aec1c3796",
          "nodeId": "WyJkZXBvc2l0cyIsImZjNmIxZWEwLWM2ZTMtNDQ1OC05NDBiLWM4NjUwOGY5Y2Q1YSJd",
          "token": "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
          "addressId": "0x02e9345794efe74b2a251b35145275996b7bc2ac2d71898b35ab739aec1c3796",
          "amount": "5000000000000000000000",
          "created": "2024-12-19T08:21:20",
          "createdBlock": "995529"
        },
        {
          "id": "0x151af225c4fbfcdc72cb95787bc903eef14fc80c8b0f250eb767cca6460b384_0x02e9345794efe74b2a251b35145275996b7bc2ac2d71898b35ab739aec1c3796",
          "nodeId": "WyJkZXBvc2l0cyIsImIwN2MxMjM5LTdiY2QtNDNmMi05MWI5LTgyYzgyMjk4YjMxOSJd",
          "token": "0x05574eb6b8789a91466f902c380d978e472db68170ff82a5b650b95a58ddf4ad",
          "addressId": "0x02e9345794efe74b2a251b35145275996b7bc2ac2d71898b35ab739aec1c3796",
          "amount": "3000000000000000000000",
          "created": "2024-12-19T08:11:05",
          "createdBlock": "995509"
        }
      ]
    },
    "withdraws": {
      "nodes": [
        {
          "id": "0x422026e80279270e748dde55642215c2f86ab8d0928d840c7a94bc2d6d1590b_0",
          "amount": "2000000000000000000000",
          "created": "2024-12-19T09:40:24",
          "createdBlock": "995685"
        },
        {
          "id": "0x261505d066183812dcb1d34aa72e583128239eb9bb6060e974ef0ec24b01c7c_0",
          "amount": "781000000000000000000",
          "created": "2024-12-19T08:43:40",
          "createdBlock": "995577"
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/starknet-subql-starter/tree/main/starknet-starter).
:::

<!-- @include: ../snippets/whats-next.md -->
