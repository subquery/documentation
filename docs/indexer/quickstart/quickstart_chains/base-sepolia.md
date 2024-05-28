# Base Sepolia Quick Start

The goal of this quick start guide is to index all transfers and approval events from the [Wrapped ETH](https://sepolia.basescan.org/token/0xe377517b4d95555052346c789e5b2b1cf8e4189e) on Base Sepolia.

<!-- @include: ../snippets/evm-quickstart-reference.md -->

::: warning Important
We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for Base Sepolia. Since Base Sepolia is an EVM-compatible, we can use the core Ethereum framework to index it.
:::

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

As we are indexing all transfers and approvals from the Wrapped ETH contract, the first step is to import the contract abi definition which can be obtained from from any standard [ERC-20 contract](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/). Copy the entire contract ABI and save it as a file called `erc20.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```ts
dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 6958775,

      options: {
        // Must be a key of assets
        abi: "erc20",
        // This is the block that the contract was deployed on https://sepolia.basescan.org/token/0xe377517b4d95555052346c789e5b2b1cf8e4189e
        address: "0xE377517b4D95555052346C789E5b2b1CF8E4189e",
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
```

The above code indicates that you will be running a `handleTransaction` mapping function whenever there is a `approve` method being called on any transaction from the [Wrapped ETH contract](https://sepolia.basescan.org/token/0xe377517b4d95555052346c789e5b2b1cf8e4189e). The code also indicates that you will be running a `handleLog` mapping function whenever there is a `Transfer` event being emitted from the contract.

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
}
```

You will see the result similar to below:

```json
{
  "data": {
    "query": {
      "transfers": {
        "totalCount": 182,
        "nodes": [
          {
            "id": "0xdd94e1fb88e72d1c3e9b473548ac4ff2cb40c3b8c931219480f930d397c542e3",
            "blockHeight": "6969377",
            "from": "0x67bF7951cdDCF57177D282C901160c7156CcC252",
            "to": "0xeB4bF56d8331b2c89C42949eA0A60F400CD84684",
            "value": "20000000000000000000",
            "contractAddress": "0xE377517b4D95555052346C789E5b2b1CF8E4189e"
          },
          {
            "id": "0x0220fad99d9f1e78757a2688bc922a3252ec7ebf527a461b76be3bae34082bfd",
            "blockHeight": "6969399",
            "from": "0x67bF7951cdDCF57177D282C901160c7156CcC252",
            "to": "0xeB4bF56d8331b2c89C42949eA0A60F400CD84684",
            "value": "15000000000000000000",
            "contractAddress": "0xE377517b4D95555052346C789E5b2b1CF8E4189e"
          },
          {
            "id": "0x392c0905e97bc39a95b7096026d7f9554ff6293b95e4a55387e34e1a448ec9f1",
            "blockHeight": "6970882",
            "from": "0x67bF7951cdDCF57177D282C901160c7156CcC252",
            "to": "0xeB4bF56d8331b2c89C42949eA0A60F400CD84684",
            "value": "9177390000000000000",
            "contractAddress": "0xE377517b4D95555052346C789E5b2b1CF8E4189e"
          },
          {
            "id": "0x02c4eb0063fb19904c7f7bb5b250424ed8a7fec332ea69eb2c1ab0ab2f754ec7",
            "blockHeight": "6978543",
            "from": "0x67bF7951cdDCF57177D282C901160c7156CcC252",
            "to": "0xeB4bF56d8331b2c89C42949eA0A60F400CD84684",
            "value": "6900000000000000000",
            "contractAddress": "0xE377517b4D95555052346C789E5b2b1CF8E4189e"
          },
          {
            "id": "0x9b38bcee8fbda2e18ff4d5b339ea626f65a61b5b840a97fc88ac6cf3b7fac367",
            "blockHeight": "6969893",
            "from": "0xeB4bF56d8331b2c89C42949eA0A60F400CD84684",
            "to": "0x67bF7951cdDCF57177D282C901160c7156CcC252",
            "value": "6457009580745085126",
            "contractAddress": "0xE377517b4D95555052346C789E5b2b1CF8E4189e"
          }
        ]
      }
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Base/base-sepolia-starter).
:::

<!-- @include: ../snippets/whats-next.md -->
