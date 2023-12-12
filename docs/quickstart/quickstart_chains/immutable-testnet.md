# Immutable (Testnet) Quick Start

The goal of this quick start guide is to index all transfers and approval events from the Immutable Testnet [Gas Token](https://immutable-testnet.blockscout.com/token/0x0000000000000000000000000000000000001010) on [Immutable Testnet](https://immutable-testnet.blockscout.com) .

<!-- @include: ../snippets/evm-quickstart-reference.md -->

Please initialise an Immutable Testnet project.

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/blob/main/Immutable/immutable-testnet-starter/).

We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for Immutable Testnet. Since Immutable Testnet is an EVM-compatible layer-2 scaling solution, we can use the core Ethereum framework to index it.
:::

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

As we are indexing all transfers and approvals from the Gas Token contract on Immutable Testnet, the first step is to import the contract abi definition which can be obtained from from any standard [ERC-20 contract](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/). Copy the entire contract ABI and save it as a file called `erc20.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 1,
      options: {
        // Must be a key of assets
        abi: "erc20",
        address: "0x0000000000000000000000000000000000001010",
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

The above code indicates that you will be running a `handleTransaction` mapping function whenever there is a `approve` method being called on any transaction from the Immutable [Gas Token](https://immutable-testnet.blockscout.com/token/0x0000000000000000000000000000000000001010).

The code also indicates that you will be running a `handleLog` mapping function whenever there is a `Transfer` event being emitted from the Immutable [Gas Token](https://immutable-testnet.blockscout.com/token/0x0000000000000000000000000000000000001010).

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
        "totalCount": 80,
        "nodes": [
          {
            "id": "0x2ce31921ed8795bed3fc36265c1690d8a639f99d0c440d123679d3873ccf8846",
            "blockHeight": "852",
            "from": "0x0000000000000000000000000000000000000000",
            "to": "0xd9275Eb8276E14b9e28d5f9B12e90dDAAF3586Ef",
            "value": "100000000000000000000",
            "contractAddress": "0x0000000000000000000000000000000000001010"
          },
          {
            "id": "0xe91b3a54f04fda04c65da1179a400d5985d8cdc40256b76361e0438713764490",
            "blockHeight": "1116",
            "from": "0x0000000000000000000000000000000000000000",
            "to": "0xfb991F97d27Cf95975754130c1b6EF789557ebB0",
            "value": "1000000000000000000",
            "contractAddress": "0x0000000000000000000000000000000000001010"
          },
          {
            "id": "0x794b1f49768949a00e851f9107f39dd2e830165b26466a60fcf0d4745b943884",
            "blockHeight": "2522",
            "from": "0x0000000000000000000000000000000000000000",
            "to": "0x8318a871CC140d9f77a1999f84875AC36EeCC04E",
            "value": "1000000000000000000",
            "contractAddress": "0x0000000000000000000000000000000000001010"
          },
          {
            "id": "0x094d66b3b1a2591374360179861faf488ee383f31d0670e57147a8900c75dfe6",
            "blockHeight": "2622",
            "from": "0x0000000000000000000000000000000000000000",
            "to": "0xEefE391EfAD59117ffabC024D298046129465244",
            "value": "1000000000000000000",
            "contractAddress": "0x0000000000000000000000000000000000001010"
          },
          {
            "id": "0x6a720788810181430aeb232ea51555a627e725f1b088a6c3e32bfb85db35d574",
            "blockHeight": "2431",
            "from": "0x0000000000000000000000000000000000000000",
            "to": "0x9391ABF34d268C3C3b07c0B8f036486DEF14c784",
            "value": "1000000000000000000",
            "contractAddress": "0x0000000000000000000000000000000000001010"
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
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/blob/main/Immutable).
:::

<!-- @include: ../snippets/whats-next.md -->
