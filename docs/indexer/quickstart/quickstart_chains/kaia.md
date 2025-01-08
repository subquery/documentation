# Kaia Quick Start

The goal of this quick start guide is to index all transfers and approval events from the [Orbit ETH](https://kaiascan.io/token/0x34d21b1e550d73cee41151c77f3c73359527a396) on [Kaia](https://kaiascan.io) Network .

<!-- @include: ../snippets/evm-quickstart-reference.md -->

Please initialise a Kaia project.

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/blob/main/Klaytn/klaytn-starter).

We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for Kaia Network. Since Kaia is an EVM-compatible layer-1, we can use the core Ethereum framework to index it.
:::

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

As we are indexing all transfers and approvals from the Orbit ETH contract on Kaia network, the first step is to import the contract abi definition which can be obtained from from any standard [ERC-20 contract](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/). Copy the entire contract ABI and save it as a file called `erc20.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 131206820,
      // This is the block that the contract was deployed on https://kaiascan.io/token/0x34d21b1e550d73cee41151c77f3c73359527a396
      options: {
        // Must be a key of assets
        abi: "erc20",
        // This is the contract address for Orbit Ether https://kaiascan.io/token/0x34d21b1e550d73cee41151c77f3c73359527a396
        address: "0x34d21b1e550d73cee41151c77f3c73359527a396",
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

The above code indicates that you will be running a `handleTransaction` mapping function whenever there is a `approve` method being called on any transaction from the [Orbit ETH contract](https://kaiascan.io/token/0x34d21b1e550d73cee41151c77f3c73359527a396).

The code also indicates that you will be running a `handleLog` mapping function whenever there is a `Transfer` event being emitted from the [Orbit ETH](https://kaiascan.io/token/0x34d21b1e550d73cee41151c77f3c73359527a396).

<!-- @include: ../snippets/ethereum-manifest-note.md -->

<!-- @include: ../snippets/schema-intro.md#level2 -->

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

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/evm-codegen.md -->

```ts
import { Approval, Transfer } from "../types";
import {
  ApproveTransaction,
  TransferLog,
} from "../types/abi-interfaces/Erc20Abi";
```

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro.md#level2 -->

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

<!-- @include: ../snippets/ethereum-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

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

<!-- @include: ../snippets/whats-next.md -->
