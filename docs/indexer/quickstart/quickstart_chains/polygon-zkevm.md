# Polygon zkEVM Quick Start

The goal of this quick start guide is to index all transfers and approval events from the [Wrapped Eth](https://zkevm.polygonscan.com/token/0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9) on [Polygon zkEVM](https://zkevm.polygonscan.com) Network .

Please initialise an a Polygon zkEVM project.

<!-- @include: ../snippets/evm-quickstart-reference.md -->

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/blob/main/Polygon/polygon-zkevm-starter).

We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for Polygon zkEVM. Since Polygon zkEVM is an EVM-compatible layer-2 scaling solution, we can use the core Ethereum framework to index it.
:::

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

As we are indexing all transfers and approvals from the Wrapped ETH contract on Polygon zkEVM network, the first step is to import the contract abi definition which can be obtained from from any standard [ERC-20 contract](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/). Copy the entire contract ABI and save it as a file called `erc20.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 1, // This is the block that the contract was deployed on https://zkevm.polygonscan.com/token/0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9
      options: {
        // Must be a key of assets
        abi: "erc20",
        // This is the contract address for Wrapped Ether https://zkevm.polygonscan.com/token/0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9
        address: "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",
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

The above code indicates that you will be running a `handleTransaction` mapping function whenever there is a `approve` method being called on any transaction from the [WETH contract](https://zkevm.polygonscan.com/token/0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9).

The code also indicates that you will be running a `handleLog` mapping function whenever there is a `Transfer` event being emitted from the [WETH contract](https://zkevm.polygonscan.com/token/0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9).

<!-- @include: ../snippets/polygon-manifest-note.md -->

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

<!-- @include: ../snippets/polygon-mapping-note.md -->

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
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/blob/main/Polygon/polygon-zkevm-starter/).
:::

<!-- @include: ../snippets/whats-next.md -->
