# X Layer Testnet Quick Start

The goal of this quick start guide is to index all transfers and approval events for the [Wrapped Ether Token](https://www.okx.com/explorer/xlayer-test/address/0xbec7859bc3d0603bec454f7194173e36bf2aa5c8)(`0xbec7859bc3d0603bec454f7194173e36bf2aa5c8`) on X Layer Testnet.

X Layer is a ZK-powered layer 2 network that connects the OKX and Ethereum communities to allow anyone to take part in a truly global on-chain ecosystem. Using OKB as the X Layer native token, users can move value seamlessly between OKX and X Layer

Please initialise an a X Layer project.

<!-- @include: ../snippets/evm-quickstart-reference.md -->

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/XLayer/xlayer-testnet-starter).

We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for X Layer. Since X Layer is an EVM-compatible layer-2 scaling solution, we can use the core Ethereum framework to index it.
:::

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

As we are indexing all transfers and approvals from the Wrapped Ether Token contract on Skale network, the first step is to import the contract abi definition which can be obtained from from any standard [ERC-20 contract](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/). Copy the entire contract ABI and save it as a file called `erc20.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```ts
{
dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 5462000,
      // Usually you would set this to the block that the contract was deployed on
      // However on this RPC, they prune all logs older than the most recent 10000 blocks
      // When running, either use an archival node that has no pruning, or update this value to be within the last 10000 blocks
      options: {
        // Must be a key of assets
        abi: "erc20",
        // this is the contract address for wrapped ether https://www.okx.com/explorer/xlayer-test/address/0xbec7859bc3d0603bec454f7194173e36bf2aa5c8
        address: "0xbec7859bc3d0603bec454f7194173e36bf2aa5c8",
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
}
```

The above code indicates that you will be running a `handleTransaction` mapping function whenever there is a `approve` method being called on any transaction from the [Wrapped Ether Token](https://www.okx.com/explorer/xlayer-test/address/0xbec7859bc3d0603bec454f7194173e36bf2aa5c8).

The code also indicates that you will be running a `handleLog` mapping function whenever there is a `Transfer` event being emitted from the [Wrapped Ether Token](https://www.okx.com/explorer/xlayer-test/address/0xbec7859bc3d0603bec454f7194173e36bf2aa5c8).

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
        "totalCount": 2,
        "nodes": [
          {
            "id": "0x16893fed2e2039962210d32c09f23e695be2abe6830992108746531150c9a8f3",
            "blockHeight": "3238561",
            "from": "0x762446eea81874C7CAC10dda5854E1d13BD25e54",
            "to": "0x8a8514e4b0D96Ef66Df57421d9cc64eecA349287",
            "value": "1000000000000000000",
            "contractAddress": "0x871Bb56655376622A367ece74332C449e5bAc433"
          },
          {
            "id": "0x66929d3ff88d0effb04f6f7728408cb8c6809d43fb3aee9c96b77dc02107e960",
            "blockHeight": "3238506",
            "from": "0x762446eea81874C7CAC10dda5854E1d13BD25e54",
            "to": "0x8a8514e4b0D96Ef66Df57421d9cc64eecA349287",
            "value": "1000000000000000000",
            "contractAddress": "0x871Bb56655376622A367ece74332C449e5bAc433"
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
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/tree/main/XLayer/xlayer-testnet-starter).
:::

<!-- @include: ../snippets/whats-next.md -->
