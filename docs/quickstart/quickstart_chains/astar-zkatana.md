# Astar zKatana Testnet Quick Start

The goal of this quick start guide is to index all transfers and approval events from the [GACHA Token](https://zkatana.blockscout.com/token/0x28687c2A4638149745A0999D523f813f63b4786F) on Astar's zKatana Test Network.

<!-- @include: ../snippets/evm-quickstart-reference.md -->

We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for Astar zKatana. Since Astar zKatana is an EVM-compatible layer-2 scaling solution, we can use the core Ethereum framework to index it.

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

As we are indexing all transfers and approvals from the GACHA contract on Astar zKatana test network, the first step is to import the contract abi definition which can be obtained from from any standard [ERC-20 contract](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/). Copy the entire contract ABI and save it as a file called `erc20.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 53, // This is the block that the contract was deployed on https://zkatana.blockscout.com/tx/0x625fd9f365a1601486c4176bc34cf0fdf04bf06b2393fd5dd43e8dd7a62d9ec5
      options: {
        // Must be a key of assets
        abi: "erc20",
        // This is the contract address for GACHA Token https://zkatana.blockscout.com/token/0x28687c2A4638149745A0999D523f813f63b4786F
        address: "0x28687c2A4638149745A0999D523f813f63b4786F",
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

The above code indicates that you will be running a `handleTransaction` mapping function whenever there is a `approve` method being called on any transaction from the [GACHA Token](https://zkatana.blockscout.com/token/0x28687c2A4638149745A0999D523f813f63b4786F) on Astar's zKatana Test Network.

The code also indicates that you will be running a `handleLog` mapping function whenever there is a `Transfer` event being emitted from the [GACHA Token](https://zkatana.blockscout.com/token/0x28687c2A4638149745A0999D523f813f63b4786F) on Astar's zKatana Test Network.

<!-- @include: ../snippets/ethereum-manifest-note.md -->

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
}
```

You will see the result similar to below:

```json
{
  "data": {
    "query": {
      "transfers": {
        "totalCount": 5,
        "nodes": [
          {
            "id": "0x625fd9f365a1601486c4176bc34cf0fdf04bf06b2393fd5dd43e8dd7a62d9ec5",
            "blockHeight": "53",
            "from": "0x0000000000000000000000000000000000000000",
            "to": "0xb680c8F33f058163185AB6121F7582BAb57Ef8a7",
            "value": "1000000000000000000000000",
            "contractAddress": "0x28687c2A4638149745A0999D523f813f63b4786F"
          },
          {
            "id": "0x32057c64d795a7f919925082b9cdc885e307e3a4590377154d746beadc557d3e",
            "blockHeight": "62",
            "from": "0xb680c8F33f058163185AB6121F7582BAb57Ef8a7",
            "to": "0xCa8c45FE7FEDc3922266A1964cD8B8D29946A6A7",
            "value": "300000000000000000000",
            "contractAddress": "0x28687c2A4638149745A0999D523f813f63b4786F"
          },
          {
            "id": "0xc591997f3217f6dfb6d4dad244126ad4ce245234fe452339b5ba8ad4d4264bdc",
            "blockHeight": "66",
            "from": "0xCa8c45FE7FEDc3922266A1964cD8B8D29946A6A7",
            "to": "0xb21aBf688A6bE0975134a41e73bf2c8Da111fF0d",
            "value": "50000000000000000000",
            "contractAddress": "0x28687c2A4638149745A0999D523f813f63b4786F"
          },
          {
            "id": "0x1e29daac0434ad4936391e7ba439146ecd9ff9d65869436d466a8e48963e420a",
            "blockHeight": "67",
            "from": "0xCa8c45FE7FEDc3922266A1964cD8B8D29946A6A7",
            "to": "0xe42A2ADF3BEe1c195f4D72410421ad7908388A6a",
            "value": "50000000000000000000",
            "contractAddress": "0x28687c2A4638149745A0999D523f813f63b4786F"
          },
          {
            "id": "0x73e95b32fe50daf7d0480a7dbd3005fcf22007ebff82fc6fa06a0c606783a0e3",
            "blockHeight": "68",
            "from": "0xe42A2ADF3BEe1c195f4D72410421ad7908388A6a",
            "to": "0x6F715c294Dd78BB11aeB0817B44E2a0b06e3A0B4",
            "value": "1000000000000000000",
            "contractAddress": "0x28687c2A4638149745A0999D523f813f63b4786F"
          }
        ]
      }
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Astar/astar-zkevm-testnet-starter).
:::

<!-- @include: ../snippets/whats-next.md -->
