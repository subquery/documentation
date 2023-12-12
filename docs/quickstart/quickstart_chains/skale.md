# Skale Europa Quick Start

The goal of this quick start guide is to index all transfers and approval events from the [SKL Token](https://elated-tan-skat.explorer.mainnet.skalenodes.com/token/0x871Bb56655376622A367ece74332C449e5bAc433) on [Skale Europa](https://skale.space/) Network.

Please initialise an a Skale project.

<!-- @include: ../snippets/evm-quickstart-reference.md -->

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/blob/main/Skale/skale-starter).

We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for Skale. Since Skale Europa is an EVM-compatible layer-2 scaling solution, we can use the core Ethereum framework to index it.
:::

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

As we are indexing all transfers and approvals from the SKL Token contract on Skale network, the first step is to import the contract abi definition which can be obtained from from any standard [ERC-20 contract](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/). Copy the entire contract ABI and save it as a file called `erc20.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 3238500, // This is the block that the contract was deployed on https://elated-tan-skat.explorer.mainnet.skalenodes.com/token/0x871Bb56655376622A367ece74332C449e5bAc433

      options: {
        // Must be a key of assets
        abi: "erc20",
        // This is the contract address for SKL Token https://elated-tan-skat.explorer.mainnet.skalenodes.com/token/0x871Bb56655376622A367ece74332C449e5bAc433
        address: "0x871bb56655376622a367ece74332c449e5bac433",
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

The above code indicates that you will be running a `handleTransaction` mapping function whenever there is a `approve` method being called on any transaction from the [SKL Token](https://elated-tan-skat.explorer.mainnet.skalenodes.com/token/0x871Bb56655376622A367ece74332C449e5bAc433).

The code also indicates that you will be running a `handleLog` mapping function whenever there is a `Transfer` event being emitted from the [SKL Token](https://elated-tan-skat.explorer.mainnet.skalenodes.com/token/0x871Bb56655376622A367ece74332C449e5bAc433).

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
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/blob/main/Skale/skale-starter/).
:::

<!-- @include: ../snippets/whats-next.md -->
