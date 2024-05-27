# Botanix Testnet Quick Start

The goal of this quick start guide is to index all transfers and approval events from the [Wrapped BTC](`0x23a62E7A0b8541b6C217A5a1E750CDb01E954807`) on Botanix Testnet.

<!-- @include: ../snippets/evm-quickstart-reference.md -->

::: warning Important
We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for Botanix Testnet. Since Botanix Testnet is an EVM-compatible, we can use the core Ethereum framework to index it.
:::

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

As we are indexing all transfers and approvals from the Wrapped BTC contract, the first step is to import the contract abi definition which can be obtained from from any standard [ERC-20 contract](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/). Copy the entire contract ABI and save it as a file called `erc20.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```ts
dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 4092,
      options: {
        abi: "erc20",
        // This is the contract address for Wrapped BTC
        address: "0x23a62E7A0b8541b6C217A5a1E750CDb01E954807",
      },
      assets: new Map([["erc20", { file: "./abis/erc20.abi.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Call, // We use ethereum handlers since Botanix Testnet is EVM-compatible
            handler: "handleTransaction",
            filter: {
              /**
               * The function can either be the function fragment or signature
               * function: '0x095ea7b3'
               * function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
               */
              function: "approve(address spender, uint256 amount)",
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

The above code indicates that you will be running a `handleTransaction` mapping function whenever there is a `approve` method being called on any transaction from the [Wrapped BTC contract](https://blockscout.botanixlabs.dev/address/0x23a62E7A0b8541b6C217A5a1E750CDb01E954807). The code also indicates that you will be running a `handleLog` mapping function whenever there is a `Transfer` event being emitted from the contract.

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
        "totalCount": 686,
        "nodes": [
          {
            "id": "0xc1b046793f22a8897fc7b4d593fe3faacb79f377fff7b128278ddf6ee55071b1",
            "blockHeight": "9213",
            "from": "0xA4B4cDeC4fE2839d3D3a49Ad5E20c21c01A31091",
            "to": "0x22335542E21A5ed8F2B2BbffE922Ce89B293d83a",
            "value": "163583946842105263",
            "contractAddress": "0x23a62E7A0b8541b6C217A5a1E750CDb01E954807"
          },
          {
            "id": "0x422873df15bf431ee61811b220920d186c7eac7a11cb5013f8f40549543bbef0",
            "blockHeight": "9146",
            "from": "0xA4B4cDeC4fE2839d3D3a49Ad5E20c21c01A31091",
            "to": "0x22335542E21A5ed8F2B2BbffE922Ce89B293d83a",
            "value": "100000000000000000",
            "contractAddress": "0x23a62E7A0b8541b6C217A5a1E750CDb01E954807"
          },
          {
            "id": "0x8fe9d1843488a43c56c89f5fffb655c75472cabbf5017d593b28abc077eff72b",
            "blockHeight": "12937",
            "from": "0xA4B4cDeC4fE2839d3D3a49Ad5E20c21c01A31091",
            "to": "0xFeB6E805424dBe4815bE71AC65C0C65A34b284d8",
            "value": "45218093867054106",
            "contractAddress": "0x23a62E7A0b8541b6C217A5a1E750CDb01E954807"
          },
          {
            "id": "0x4f80855ff3f4f065251ca93fcdffe4cb5f25e902c361672acb9f20472da781fa",
            "blockHeight": "9395",
            "from": "0xA4B4cDeC4fE2839d3D3a49Ad5E20c21c01A31091",
            "to": "0x22335542E21A5ed8F2B2BbffE922Ce89B293d83a",
            "value": "30000000000000000",
            "contractAddress": "0x23a62E7A0b8541b6C217A5a1E750CDb01E954807"
          },
          {
            "id": "0xdbea23dfda25345cf6f96980cb17706d8e6cc6bb59bb5c6e6adccbf7a4e55edb",
            "blockHeight": "9403",
            "from": "0x22335542E21A5ed8F2B2BbffE922Ce89B293d83a",
            "to": "0xA4B4cDeC4fE2839d3D3a49Ad5E20c21c01A31091",
            "value": "29892321863886585",
            "contractAddress": "0x23a62E7A0b8541b6C217A5a1E750CDb01E954807"
          }
        ]
      }
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Botanix/botanix-testnet-starter).
:::

<!-- @include: ../snippets/whats-next.md -->
