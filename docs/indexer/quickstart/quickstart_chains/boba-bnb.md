# Boba BNB Quick Start

Boba is a multichain Layer-2 network that has two blockchains currently; Boba Mainnet (ie Boba ETH), and Boba BNB Chain (ie Boba BNB). This guide will focus on [Boba BNB](https://chainlist.org/chain/56288). For [Boba ETH](https://chainlist.org/chain/288), please refer to [Boba ETH Quick Start](./boba-eth.md).

The goal of this quick start guide is to index all transfers and approval events from the [Wrapped BOBA](https://bobascan.com/token/0xC58aaD327D6D58D979882601ba8DDa0685B505eA?chainid=56288) on [Boba BNB](https://bobascan.com/) Network .

<!-- @include: ../snippets/evm-quickstart-reference.md -->

We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for Boba BNB. Since Boba BNB is an EVM-compatible layer-2 scaling solution, we can use the core Ethereum framework to index it.
:::

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

As we are indexing all transfers and approvals from the Wrapped BOBA contract on boba BNB network, the first step is to import the contract abi definition which can be obtained from from any standard [ERC-20 contract](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/). Copy the entire contract ABI and save it as a file called `erc20.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 30738048,

      options: {
        // Must be a key of assets
        abi: "erc20",
        // This is the contract address for Wrapped BOBA https://bobascan.com/token/0xC58aaD327D6D58D979882601ba8DDa0685B505eA?chainid=56288
        address: "0xC58aaD327D6D58D979882601ba8DDa0685B505eA",
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

The above code indicates that you will be running a `handleTransaction` mapping function whenever there is a `approve` method being called on any transaction from the [WBOBA contract](https://bobascan.com/token/0xC58aaD327D6D58D979882601ba8DDa0685B505eA?chainid=56288).

The code also indicates that you will be running a `handleLog` mapping function whenever there is a `Transfer` event being emitted from the [WBOBA contract](https://bobascan.com/token/0xC58aaD327D6D58D979882601ba8DDa0685B505eA?chainid=56288).

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
            "id": "0xfb026bf808bc7b4806335f052397d369f93b6290cb5ff2f75699949fac64be9c",
            "blockHeight": "20756087",
            "from": "0xfC6B4edA3d786bc7ad5DfbAE38e0dfe8F7243392",
            "to": "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
            "value": "70054988156905858095",
            "contractAddress": "0xC58aaD327D6D58D979882601ba8DDa0685B505eA"
          },
          {
            "id": "0x903c73e86c70be0acefaf9af9e7f2d90f9e64db8a1a2a1258de1af0389cba5de",
            "blockHeight": "20757345",
            "from": "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
            "to": "0xfC6B4edA3d786bc7ad5DfbAE38e0dfe8F7243392",
            "value": "65000000000000000000",
            "contractAddress": "0xC58aaD327D6D58D979882601ba8DDa0685B505eA"
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
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/blob/main/Boba/boba-bnb-starter/).
:::

<!-- @include: ../snippets/whats-next.md -->
