# XDC Apothem Quick Start

The goal of this quick start guide is to index all transfers and approval events for the [FXD Token](https://explorer.apothem.network/tokens/xdcdf29cb40cb92a1b8e8337f542e3846e185deff96#token-transfer)(`xdcdf29cb40cb92a1b8e8337f542e3846e185deff96`) on XDC Apothem.

<!-- @include: ../snippets/evm-quickstart-reference.md -->

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/XDC/xdc-apothem-starter).

We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for XDC Apothem. Since XDC Apothem is an EVM-compatible chain, we can use the core Ethereum framework to index it.
:::

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

As we are indexing all transfers and approvals from the FXD Token contract on XDC Apothem network, the first step is to import the contract abi definition which can be obtained from from any standard [ERC-20 contract](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/). Copy the entire contract ABI and save it as a file called `erc20.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```ts
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 1,
      options: {
        // Must be a key of assets
        abi: "erc20",
        // This is the contract address for FXD Token https://explorer.apothem.network/tokens/xdcdf29cb40cb92a1b8e8337f542e3846e185deff96#token-transfer
        address: "0xdf29cb40cb92a1b8e8337f542e3846e185deff96",
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
              function: "approve(address,uint256)",
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
              topics: ["Transfer(address,address,uint256)"],
            },
          },
        ],
      },
    },
  ],
```

The above code indicates that you will be running a `handleTransaction` mapping function whenever there is a `approve` method being called on any transaction from the [FXD contract](https://explorer.apothem.network/tokens/xdcdf29cb40cb92a1b8e8337f542e3846e185deff96#token-transfer). The code also indicates that you will be running a `handleLog` mapping function whenever there is a `Transfer` event being emitted.

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
        "nodes": [
          {
            "id": "0x8e7d31973a40198b90e6f1db74e9df26781e08164690881f59d70b7c93acf7fd",
            "blockHeight": "61691366",
            "value": "56390977000000000000",
            "contractAddress": "0xDf29cB40Cb92a1b8E8337F542E3846E185DefF96"
          },
          {
            "id": "0x6418c70a7f6a1f667e568a47f4392d23d5b614fcc68da37735e66a3037e54ca4",
            "blockHeight": "61691342",
            "value": "56390977000000000000",
            "contractAddress": "0xDf29cB40Cb92a1b8E8337F542E3846E185DefF96"
          },
          {
            "id": "0xd02c7c38c07796dd714123a5cbfee4325a353ae754724f72d49589b4aabba5bb",
            "blockHeight": "61691606",
            "value": "50000000000000000000",
            "contractAddress": "0xDf29cB40Cb92a1b8E8337F542E3846E185DefF96"
          },
          {
            "id": "0xf0571a351070e0928d6bcb1290918abb87f581f7705bc76e91ba5f63fea968c0",
            "blockHeight": "61691584",
            "value": "50000000000000000000",
            "contractAddress": "0xDf29cB40Cb92a1b8E8337F542E3846E185DefF96"
          },
          {
            "id": "0x136b974c3b5fca5325d3f182d0e902397082cfd2ea5eb129287222648d22a772",
            "blockHeight": "61692200",
            "value": "11000001096073406109",
            "contractAddress": "0xDf29cB40Cb92a1b8E8337F542E3846E185DefF96"
          }
        ]
      }
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/XDC/xdc-apothem-starter).
:::

<!-- @include: ../snippets/whats-next.md -->
