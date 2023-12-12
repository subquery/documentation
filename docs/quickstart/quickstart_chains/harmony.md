# Harmony Quick Start

The goal of this quick start guide is to index all transfers and approval events from the [Wrapped Eth](https://explorer.harmony.one/tx/0xd611c8cf745d85527348218ccd793e5126a5ebecd4340802b8540ee992e3d3bb) on [Harmony](https://explorer.harmony.one/) Network .

<!-- @include: ../snippets/evm-quickstart-reference.md -->

Please initialise an a Harmony project.

We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for Harmony. Since Harmony is an EVM-compatible layer-1, we can use the core Ethereum framework to index it.
:::

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

As we are indexing all transfers and approvals from the Wrapped ETH contract on Harmony's Network, the first step is to import the contract abi definition which can be obtained from from any standard [ERC-20 contract](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/). Copy the entire contract ABI and save it as a file called `erc20.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 42793429,
      options: {
        // Must be a key of assets
        abi: "erc20",
        // This is the contract address for Wrapped Ether https://explorer.harmony.one/address/0x6983d1e6def3690c4d616b13597a09e6193ea013
        address: "0x6983d1e6def3690c4d616b13597a09e6193ea013",
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

The above code indicates that you will be running a `handleTransaction` mapping function whenever there is a `approve` method being called on any transaction from the [WETH contract](https://explorer.harmony.one/address/0x6983d1e6def3690c4d616b13597a09e6193ea013).

The code also indicates that you will be running a `handleLog` mapping function whenever there is a `Transfer` event being emitted from the [WETH contract](https://explorer.harmony.one/address/0x6983d1e6def3690c4d616b13597a09e6193ea013).

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
        "totalCount": 143,
        "nodes": [
          {
            "id": "0x726c97aef8f42f1c7eedd9762e105c426d0b216be73d8360811df475f624c3e2",
            "blockHeight": "10926",
            "from": "0xAED47A51AeFa6f95A388aDA3c459d94FF46fC4BB",
            "to": "0x7739E567B9626ca241bdC5528343F92F7e59Af37",
            "value": "179900000000000000000",
            "contractAddress": "0x5300000000000000000000000000000000000004"
          },
          {
            "id": "0x71305b1bfd3b5aa1b0236c1ae7ce137aff7757cf1a4a38ace9a22235e5d0b4bf",
            "blockHeight": "11064",
            "from": "0xAED47A51AeFa6f95A388aDA3c459d94FF46fC4BB",
            "to": "0x7739E567B9626ca241bdC5528343F92F7e59Af37",
            "value": "122000000000000000000",
            "contractAddress": "0x5300000000000000000000000000000000000004"
          },
          {
            "id": "0xe5305b8b35c72b4752d152fa7ade7e065759483432965cc90a3703fda3d8a8a5",
            "blockHeight": "11083",
            "from": "0xAED47A51AeFa6f95A388aDA3c459d94FF46fC4BB",
            "to": "0x7739E567B9626ca241bdC5528343F92F7e59Af37",
            "value": "102000000000000000000",
            "contractAddress": "0x5300000000000000000000000000000000000004"
          },
          {
            "id": "0x2d00a4d8fc20f26694ecbdf0c5da285a78212169978b114b06981039d843d36a",
            "blockHeight": "11246",
            "from": "0xAED47A51AeFa6f95A388aDA3c459d94FF46fC4BB",
            "to": "0x7739E567B9626ca241bdC5528343F92F7e59Af37",
            "value": "100000000000000000000",
            "contractAddress": "0x5300000000000000000000000000000000000004"
          },
          {
            "id": "0xbb7ecb71c3e1cf6727b3761ca21a7199a0ee93ad4862e53058ad3bdd6cc7cce9",
            "blockHeight": "11036",
            "from": "0xAED47A51AeFa6f95A388aDA3c459d94FF46fC4BB",
            "to": "0x7739E567B9626ca241bdC5528343F92F7e59Af37",
            "value": "100000000000000000000",
            "contractAddress": "0x5300000000000000000000000000000000000004"
          }
        ]
      }
    },
    "approvals": {
      "nodes": [
        {
          "id": "0xfb1590aa76ef5ea8a12c4e3a1c988fd5fabf9dd65f77a5ec1ff7f27868bf3086",
          "blockHeight": null,
          "owner": "0x7C563F9423C93Fed57c6aC2cC562b0DE0956abB0",
          "spender": "0xbbAd0e891922A8A4a7e9c39d4cc0559117016fec",
          "value": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
          "contractAddress": "0x5300000000000000000000000000000000000004"
        },
        {
          "id": "0x997f7c27dd9812e84f3dd8859fe8ac7dfc957a9778efe54cf2d8ff7c655f7bef",
          "blockHeight": null,
          "owner": "0x7C563F9423C93Fed57c6aC2cC562b0DE0956abB0",
          "spender": "0xbbAd0e891922A8A4a7e9c39d4cc0559117016fec",
          "value": "1000000000000000000000000",
          "contractAddress": "0x5300000000000000000000000000000000000004"
        },
        {
          "id": "0xfdf276d97f2fe1148ecce71d261aed8fd38d59283389d51b9b76d413acc5a3ed",
          "blockHeight": null,
          "owner": "0x7C563F9423C93Fed57c6aC2cC562b0DE0956abB0",
          "spender": "0xbbAd0e891922A8A4a7e9c39d4cc0559117016fec",
          "value": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
          "contractAddress": "0x5300000000000000000000000000000000000004"
        },
        {
          "id": "0xcccc7e065b119588e7278169b8e6e017e9fa0d0209af28047bbb39ef7e0db9ee",
          "blockHeight": null,
          "owner": "0x2cFe53AaD05F1156FDcED046690749cCb774CfDD",
          "spender": "0xbbAd0e891922A8A4a7e9c39d4cc0559117016fec",
          "value": "1000000000000000000",
          "contractAddress": "0x5300000000000000000000000000000000000004"
        },
        {
          "id": "0xf3d60b7016e35e3a865ceb7df16e5e440a80bdae5f9fbe73996245e6c7d65482",
          "blockHeight": null,
          "owner": "0xCa266224613396A0e8D4C2497DBc4F33dD6CDEFf",
          "spender": "0x481B20A927206aF7A754dB8b904B052e2781ea27",
          "value": "19600000000000000",
          "contractAddress": "0x5300000000000000000000000000000000000004"
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/Harmony/harmony-starter).
:::

<!-- @include: ../snippets/whats-next.md -->
