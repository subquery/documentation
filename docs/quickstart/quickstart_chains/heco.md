Heco Chain Quick Start

The goal of this quick start guide is to index all transfers and approval events from the [Wrapped HT](https://www.hecoinfo.com/en-us/token/0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f) on [Heco](https://www.hecoinfo.com) Network .

Please initialise an a Heco Chain project.

<!-- @include: ../snippets/evm-quickstart-reference.md -->

We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for Heco Chain. Since Heco Chain is an EVM-compatible layer-2 scaling solution, we can use the core Ethereum framework to index it.
:::

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

As we are indexing all transfers and approvals from the Wrapped HT contract on Heco Chain network, the first step is to import the contract abi definition which can be obtained from from any standard [ERC-20 contract](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/). Copy the entire contract ABI and save it as a file called `erc20.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 29205957, // The start block the contract was deployed on https://www.hecoinfo.com/en-us/token/0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f
      options: {
        // Must be a key of assets
        abi: "erc20",
        // This is the contract address for Wrapped HT https://www.hecoinfo.com/en-us/token/0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f
        address: "0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f",
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

The above code indicates that you will be running a `handleTransaction` mapping function whenever there is a `approve` method being called on any transaction from the [Wrapped HT contract](https://www.hecoinfo.com/en-us/token/0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f).

The code also indicates that you will be running a `handleLog` mapping function whenever there is a `Transfer` event being emitted from the [Wrapped HT contract](https://www.hecoinfo.com/en-us/token/0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f).

<!-- @include: ../snippets/evm-manifest-note.md -->

<!-- @include: ../snippets/schema-intro-level2.md -->

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

<!-- @include: ../snippets/mapping-intro-level2.md -->

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

<!-- @include: ../snippets/evm-mapping-note.md -->

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
        "totalCount": 138,
        "nodes": [
          {
            "id": "0x4ef0ea30dcc53c2f572f35b8564d1f212619b112f15a54d3a057940f1ac903db",
            "blockHeight": "29208127",
            "from": "0x499B6E03749B4bAF95F9E70EeD5355b138EA6C31",
            "to": "0x0f1c2D1FDD202768A4bDa7A38EB0377BD58d278E",
            "value": "59360876484123090118",
            "contractAddress": "0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F"
          },
          {
            "id": "0xdd60a53bef195624123e6a20974f3a3443bdebc235d9134dcb7aacceb07d4dcd",
            "blockHeight": "29206031",
            "from": "0x86f5C8EB736c95dd687182779edd792FEF0fA674",
            "to": "0xFf8376a18Db1889aBDf325CD28F37A12D2685b86",
            "value": "36215012000000000000",
            "contractAddress": "0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F"
          },
          {
            "id": "0xf50a0293b8d365c5c165e28f2c0308a69b088ebfcb9eff5ff05dac0801251261",
            "blockHeight": "29206116",
            "from": "0x1d3286A3348Fa99852d147C57A79045B41c4f713",
            "to": "0x6Dd2993B50b365c707718b0807fC4e344c072eC2",
            "value": "21420615200068545968",
            "contractAddress": "0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F"
          },
          {
            "id": "0x8c62b0dad95328fbc6054712750dcda1cccd5af6b47b2ad2a5de6c583c5a5bc2",
            "blockHeight": "29205970",
            "from": "0x1d3286A3348Fa99852d147C57A79045B41c4f713",
            "to": "0x53E458aD1CFEB9582736db6BdE9aF89948e3bc3d",
            "value": "12877194488560758895",
            "contractAddress": "0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F"
          },
          {
            "id": "0xaf3b5af348f016641fad64c73f72e886287197e2cd66fe7533dbba562e9f772e",
            "blockHeight": "29205977",
            "from": "0x1d3286A3348Fa99852d147C57A79045B41c4f713",
            "to": "0x53E458aD1CFEB9582736db6BdE9aF89948e3bc3d",
            "value": "12863942535019199884",
            "contractAddress": "0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F"
          }
        ]
      }
    },
    "approvals": {
      "nodes": []
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/blob/main/Heco/heco-starter/).
:::

<!-- @include: ../snippets/whats-next.md -->
