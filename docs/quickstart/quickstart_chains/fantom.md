# Fantom Opera Quick Start

The goal of this quick start guide is to index all transfers and approval events from the [Wrapped FTM](https://ftmscan.com/token/0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83) on [Fantom Opera](https://ftmscan.com/) Network .

::: warning
Before we begin, **make sure that you have initialised your project** using the provided steps in the [Start Here](../quickstart.md) section. Please initialise an a Fantom project.
:::

<!-- @include: ../snippets/evm-quickstart-reference.md -->

We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for Fantom Opera. Since Fantom is an EVM-compatible layer-1, we can use the core Ethereum framework to index it.
:::

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

As we are indexing all transfers and approvals from the Wrapped FTM contract on Fantom Opera network, the first step is to import the contract abi definition which can be obtained from from any standard [ERC-20 contract](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/). Copy the entire contract ABI and save it as a file called `erc20.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      //This is the block that the contract was deployed on https://ftmscan.com/token/0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83
      startBlock: 67295175,
      options: {
        // Must be a key of assets
        abi: "erc20",
        // This is the contract address for Wrapped FTM https://ftmscan.com/token/0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83
        address: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
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

The above code indicates that you will be running a `handleTransaction` mapping function whenever there is a `approve` method being called on any transaction from the [WFTM contract](https://ftmscan.com/token/0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83).

The code also indicates that you will be running a `handleLog` mapping function whenever there is a `Transfer` event being emitted from the [WFTM contract](https://ftmscan.com/token/0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83).

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
        "totalCount": 459,
        "nodes": [
          {
            "id": "0x57b54d4bf53caca4c60772761f4949e4dc02d92f62a02b180d5b382d50b7787d",
            "blockHeight": "67295406",
            "from": "0x31F63A33141fFee63D4B26755430a390ACdD8a4d",
            "to": "0x0000000000000000000000000000000000000000",
            "value": "176970961833699983570796",
            "contractAddress": "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"
          },
          {
            "id": "0x128198372b0080d144f01041bdeb97e39155981010337abc8dc18878727af227",
            "blockHeight": "67295494",
            "from": "0x31F63A33141fFee63D4B26755430a390ACdD8a4d",
            "to": "0x4EE115137ac73A3e5F99598564905465C101b11F",
            "value": "160977046912584985744989",
            "contractAddress": "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"
          },
          {
            "id": "0xaca3354ec2d60bc8816590e32c755a87269a07d1eef7c7a49f808d9d6aee9f18",
            "blockHeight": "67296279",
            "from": "0x38C2853E569125Fc9Af310Ab145FCEfB2A07A322",
            "to": "0x0000000000000000000000000000000000000000",
            "value": "10000000000000000000000",
            "contractAddress": "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"
          },
          {
            "id": "0x5f549d1546f590146b87091c9bdfde18ff1f3d33b6ed852fc454af810a4c0e32",
            "blockHeight": "67296232",
            "from": "0x5BAB9d61f84630A76fA9e2f67739f2da694B5402",
            "to": "0x245cD6d33578de9aF75a3C0c636c726b1A8cbdAa",
            "value": "6996500000000000000000",
            "contractAddress": "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"
          },
          {
            "id": "0x6158b4cc15013f08e89c91cef0d1610cd37d7d303126299900689790ecb8124e",
            "blockHeight": "67295446",
            "from": "0x31F63A33141fFee63D4B26755430a390ACdD8a4d",
            "to": "0x0000000000000000000000000000000000000000",
            "value": "6844335953031983950296",
            "contractAddress": "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"
          }
        ]
      }
    },
    "approvals": {
      "nodes": [
        {
          "id": "0x7e08e7e27996561ba385b9ffc6a9a02d51ad17a22a9bbb9e79a6ad059f269720",
          "blockHeight": null,
          "owner": "0xDEc89FC2ECfF1F2197204126EaAc55043155153b",
          "spender": "0x1111111254EEB25477B68fb85Ed929f73A960582",
          "value": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
          "contractAddress": "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"
        },
        {
          "id": "0xa00b913d56a1e91a6fdc52e05f56db54e518a1fbbd81e94ccc4b0d3521c72c53",
          "blockHeight": null,
          "owner": "0xDEc89FC2ECfF1F2197204126EaAc55043155153b",
          "spender": "0x1111111254EEB25477B68fb85Ed929f73A960582",
          "value": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
          "contractAddress": "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83"
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/blob/main/Fantom/fantom-starter).
:::

<!-- @include: ../snippets/whats-next.md -->
