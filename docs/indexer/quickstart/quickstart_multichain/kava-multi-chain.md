# Multichain Quick Start - Kava (EVM & Cosmos)

This page explains how to create an multi-chain indexer for [Kava](https://www.kava.io/), the first Layer-1 blockchain to combine the speed and scalability of the Cosmos SDK with the developer support of Ethereum, empowering developers to build for Web3 and next-gen blockchain technologies through its unique co-chain architecture.

<!-- @include: ./snippets/multi-chain-quickstart-reference.md -->

After finishing this guide, you'll get the ability to connect event data efficiently across various diverse networks. Additionally, you'll obtain the know-how to set up a SubQuery indexer that enables monitoring, tracking, and aggregating events within a single unified system.

<!-- @include: ../snippets/quickstart-reference.md -->

<!-- @include: ../snippets/evm-quickstart-reference-abi-scaffold.md -->

For instance, you can locate the ABI for USDT on Kava EVM smart contract at the bottom of [this page](https://kavascan.com/address/0x919C1c267BC06a7039e03fcc2eF738525769109c/contracts#address-tabs).

To prepare for the Cosmos segment, generating types from the proto files is a necessary step. You can get these types from the officially published Cosmos sources, available [here](https://github.com/cosmos/cosmos-sdk/tree/main/proto).

<!-- @include: ../snippets/quickstart-reference.md -->

::: tip Note
Check the final code repository [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Multi-Chain/kava-evm-cosmos-multi-chain) to observe the integration of all previously mentioned configurations into a unified codebase.
:::

<!-- @include: ../snippets/manifest-intro.md#level2 -->

To begin, we will establish an EVM indexer. In this illustration, we introduce specific a smart contract along with its respective methods and logs:

::: code-tabs

@tab project.yaml

```yaml
dataSources:
  - kind: ethereum/Runtime
    startBlock: 5391456
    options:
      abi: erc20
      address: "0x919C1c267BC06a7039e03fcc2eF738525769109c"
    assets:
      erc20:
        file: ./abis/erc20.abi.json
    mapping:
      file: ./dist/index.js
      handlers:
        - kind: ethereum/LogHandler
          handler: handleEVMLog
          filter:
            topics:
              - Transfer(address from, address to, uint256 value)
```

:::

In the provided snippet, we're managing an individual log named `Transfer`. This log is set to be sent as an argument to a handling function known as `handleEVMLog`.

<!-- @include: ../snippets/ethereum-manifest-note.md -->

Next, change the name of the file mentioned above to `kava-evm.yaml` to indicate that this file holds the Ethereum configuration.

<!-- @include: ./snippets/multi-chain-creation.md -->

::: code-tabs

@tab subquery-multichain.yaml

```yaml
specVersion: 1.0.0
query:
  name: "@subql/query"
  version: "*"
projects:
  - kava-cosmos.yaml
  - kava-evm.yaml
```

:::

Also, you will end up with the individual chains' manifest files like those:

::: code-tabs

@tab kava-evm.yaml

```yaml
specVersion: 1.0.0
version: 0.0.1
name: kava-evm-starter
description: >-
  In this manifest file, we set up the SubQuery indexer to fetch all USDT transactions on the Kava EVM Network
runner:
  node:
    name: "@subql/node-ethereum"
    version: ">=3.0.0"
  query:
    name: "@subql/query"
    version: "*"
schema:
  file: ./schema.graphql
network:
  chainId: "2222"
  endpoint:
    - https://evm.kava.io
    - https://evm.data.kava.io
    - https://evm.data.kava.chainstacklabs.com
dataSources:
  - kind: ethereum/Runtime
    startBlock: 5391456
    options:
      abi: erc20
      address: "0x919C1c267BC06a7039e03fcc2eF738525769109c"
    assets:
      erc20:
        file: ./abis/erc20.abi.json
    mapping:
      file: ./dist/index.js
      handlers:
        - kind: ethereum/LogHandler
          handler: handleEVMLog
          filter:
            topics:
              - Transfer(address from, address to, uint256 value)
repository: https://github.com/subquery/ethereum-subql-starter
```

@tab kava-cosmos.yaml

```yaml
specVersion: 1.0.0
version: 0.0.1
name: kava-cosmos-starter
description: >-
  In this manifest file, we set up the SubQuery indexer to fetch all transfers sent on Kava Cosmos Co-chain
runner:
  node:
    name: "@subql/node-cosmos"
    version: ">=3.0.0"
  query:
    name: "@subql/query"
    version: "*"
schema:
  file: ./schema.graphql
network:
  chainId: kava_2222-10
  endpoint:
    - https://kava-rpc.ibs.team
  chaintypes:
    cosmos.bank.v1beta1.MsgSend:
      file: ./proto/cosmos/bank/v1beta1/tx.proto
      messages:
        - MsgSend
    cosmos.base.v1beta1.Coin:
      file: ./proto/cosmos/base/v1beta1/coin.proto
      messages:
        - Coin
dataSources:
  - kind: cosmos/Runtime
    startBlock: 5397233
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleCosmosEvent
          kind: cosmos/EventHandler
          filter:
            type: coin_spent
            messageFilter:
              type: /cosmos.bank.v1beta1.MsgSend
```

:::

<!-- @include: ./snippets/multi-chain-network-origin-note.md -->

<!-- @include: ../snippets/schema-intro.md#level2 -->

```graphql
type CosmosTransfers @entity {
  id: ID!
  blockHeight: BigInt
  txHash: String
  fromAddress: Address!
  toAddress: Address!
  amount: String
  denomination: String
}

type EVMTransfers @entity {
  id: ID! # Transaction hash
  value: BigInt!
  to: Address!
  from: Address!
  contractAddress: Address!
}

type Address @entity {
  id: ID!
  cosmosAddress: String!
  evmAddress: String!
}
```

This schema defines three types of transfers: `CosmosTransfers`, representing transfers within the Cosmos network; `EVMTransfers`, representing transfers within EVM; and `Address`, which links both Cosmos and EVM addresses.

`CosmosTransfers` holds details like block height, transaction hash, sender and receiver addresses, transferred amount, and denomination.
`EVMTransfers` stores transaction hash, transferred value, sender, receiver, and contract address.
`Address` links IDs with respective Cosmos and EVM addresses through their unique identifiers.

SubQuery simplifies and ensures type-safety when working with GraphQL entities, smart contracts, events, cosmos messages, and etc. The SubQuery CLI will generate types based on your project's GraphQL schema and any contract ABIs included in the data sources.

<!-- @include: ../snippets/codegen.md -->

It will also generate a class for every contract event, offering convenient access to event parameters, as well as information about the block and transaction from which the event originated. You can find detailed information on how this is achieved in the [EVM Codegen from ABIs](../../build/introduction.md#evm-codegen-from-abis) section. All of these types are stored in the `src/types/abi-interfaces` and `src/types/contracts` directories.

Also if you've expressed a preference to employ the Cosmos message based on the provided proto files, this command will also generate types for your listed protobufs and save them into `src/types` directory, providing you with more typesafety. For example, you can find Osmosis' protobuf definitions in the [official documentation](https://docs.osmosis.zone/apis/grpc#grpcurl). Read about how this is done in [Cosmos Codegen from CosmWasm Protobufs](../../build/introduction.md#cosmos-codegen-from-cosmwasm-protobufs) and [Cosmos Manifest File Configuration](../../build/manifest/cosmos.md#chain-types).

You can conveniently import all these types:

```ts
import { EVMTransfers, CosmosTransfers, Address } from "../types";
import { CosmosEvent } from "@subql/types-cosmos";
import {
  ApproveTransaction,
  TransferLog,
} from "../types/abi-interfaces/Erc20Abi";
```

<!-- @include: ../snippets/mapping-intro.md#level2 -->

Setting up mappings contract is straightforward. In this instance, the mappings are stored within the `src/mappings` directory, with the sole mapping file being `mappingHandlers.ts`. Now, let's take a closer look at it:

```ts
function kavaToEthAddress(kavaAddress: string) {
  return ethers.utils.getAddress(
    ethers.utils.hexlify(bech32.fromWords(bech32.decode(kavaAddress).words))
  );
}

function ethToKavaAddress(ethereumAddress: string) {
  return bech32.encode(
    "kava",
    bech32.toWords(
      ethers.utils.arrayify(ethers.utils.getAddress(ethereumAddress))
    )
  );
}

async function checkGetUserAddress(
  cosmosAddress: string,
  evmAddress: string
): Promise<Address> {
  let addressId = `${cosmosAddress}-${evmAddress}`;
  let userRecord = await Address.get(addressId);
  if (!userRecord) {
    userRecord = Address.create({
      id: addressId,
      cosmosAddress: cosmosAddress,
      evmAddress: evmAddress,
    });
    await userRecord.save();
  }
  return userRecord;
}

export async function handleEVMLog(transferLog: TransferLog): Promise<void> {
  logger.info("transaction: " + transferLog.transactionHash);
  let from = transferLog.transaction.from.toString();
  let to = transferLog.transaction.to.toString();
  let contractAddress = transferLog.address;
  assert(transferLog.args, "Expected args to exist");
  const transaction = EVMTransfers.create({
    id: transferLog.transactionHash,
    value: transferLog.args.value.toBigInt(),
    fromId: (
      await checkGetUserAddress(ethToKavaAddress(from), from)
    ).id.toString(),
    toId: (await checkGetUserAddress(ethToKavaAddress(to), to)).id.toString(),
    contractAddressId: (
      await checkGetUserAddress(
        ethToKavaAddress(contractAddress),
        contractAddress
      )
    ).id.toString(),
  });

  await transaction.save();
}

export async function handleCosmosEvent(event: CosmosEvent): Promise<void> {
  logger.info(`New transfer event at block ${event.block.block.header.height}`);
  let from = event.msg.msg.decodedMsg.fromAddress;
  let to = event.msg.msg.decodedMsg.toAddress;
  const newTransfers = CosmosTransfers.create({
    id: `${event.tx.hash}-${event.msg.idx}-${event.idx}`,
    blockHeight: BigInt(event.block.block.header.height),
    txHash: event.tx.hash,
    fromAddressId: (
      await checkGetUserAddress(from, kavaToEthAddress(from))
    ).id.toString(),
    toAddressId: (
      await checkGetUserAddress(to, kavaToEthAddress(to))
    ).id.toString(),
    amount: event.msg.msg.decodedMsg.amount[0].amount,
    denomination: event.msg.msg.decodedMsg.amount[0].denom,
  });

  await newTransfers.save();
}
```

The `handleEVMLog` function processes Ethereum Virtual Machine (EVM) transfer logs, extracting relevant information such as transaction details, addresses involved, and amounts transferred. It creates and saves corresponding `EVMTransfers` records.

Similarly, the `handleCosmosEvent` function deals with Cosmos transfer events, extracting details like block height, transaction hash, addresses, amount, and denomination before creating and storing `CosmosTransfers` records.

Both handlers use the util functions to convert addresses from Kava (a blockchain platform) to Ethereum and vice versa (`kavaToEthAddress` and `ethToKavaAddress` respectively). The `checkGetUserAddress` function checks if a user's address exists, creating a new record if not.

🎉 At this stage, we have successfully incorporated all the desired entities and mappings that can be retrieved from networks. For each of these entities, we've a single mapping handler to structure and store the data in a queryable format.

::: tip Note
Check the final code repository [here](https://github.com/subquery/cosmos-subql-starter/tree/main/Multi-Chain/kava-evm-cosmos-multi-chain) to observe the integration of all previously mentioned configurations into a unified codebase.
:::

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
query {
  cosmosTransfers(first: 1) {
    nodes {
      id
      blockHeight
      txHash
      fromAddressId
      toAddressId
      amount
      denomination
    }
  }
  eVMTransfers(first: 1) {
    nodes {
      id
      value
      fromId
      contractAddressId
    }
  }
  addresses(first: 1) {
    nodes {
      id
      cosmosAddress
      evmAddress
    }
  }
}
```

The responce will be the following:

```json
{
  "data": {
    "cosmosTransfers": {
      "nodes": [
        {
          "id": "009A7E670FB2EF68A17EEB2E198E0B85C35A6DDE8E95CCEC4DD64021B6E90476-0-1078",
          "blockHeight": "8039327",
          "txHash": "009A7E670FB2EF68A17EEB2E198E0B85C35A6DDE8E95CCEC4DD64021B6E90476",
          "fromAddressId": "kava1m6x4n93x0axf2hh057z26wug8gklkw8zs7750k-0xDE8D5996267f4c955eeFA784Ad3b883A2DFB38e2",
          "toAddressId": "kava1wndgd4hzpmhlnvfekcvfrhy29uayq3wqt8665c-0x74dA86d6e20EEff9B139b61891DC8A2F3a4045C0",
          "amount": "109889000",
          "denomination": "ukava"
        }
      ]
    },
    "eVMTransfers": {
      "nodes": [
        {
          "id": "0x0130a657ee77972d4617864ac4c5d8caf0c429c949df4afad1ecf8d66a743018",
          "value": "316477976",
          "fromId": "kava1aymgtuam5qcpdupt6xpghtwkr9vc3k2s8xa3ez-0xe93685f3bBA03016F02bD1828BaDD6195988D950",
          "contractAddressId": "kava1jxwpcfnmcp48qw0q8lxzaaec2ftkjyyukk965k-0x919C1c267BC06a7039e03fcc2eF738525769109c"
        }
      ]
    },
    "addresses": {
      "nodes": [
        {
          "id": "kava107cchp25ly68yydyzvauprnwlr60739e3z7kem-0x7FB18B8554f9347211A4133BC08e6eF8F4FF44B9",
          "cosmosAddress": "kava107cchp25ly68yydyzvauprnwlr60739e3z7kem",
          "evmAddress": "0x7FB18B8554f9347211A4133BC08e6eF8F4FF44B9"
        }
      ]
    }
  }
}
```

<!-- @include: ../snippets/whats-next.md -->
