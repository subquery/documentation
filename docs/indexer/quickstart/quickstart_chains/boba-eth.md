# Boba ETH Quick Start

Boba is a multichain Layer-2 network that has two blockchains currently; Boba Mainnet (ie Boba ETH), and Boba BNB Chain (ie Boba BNB). This guide will focus on [Boba ETH](https://chainlist.org/chain/288). For [Boba BNB](https://chainlist.org/chain/56288), please refer to [Boba BNB Quick Start](./boba-bnb.md).

The goal of this quick start guide is to index all transfers and approval events from the [Wrapped Eth](https://bobascan.com/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) on [Boba Mainnet](https://bobascan.com/) Network.

<!-- @include: ../snippets/evm-quickstart-reference.md -->

We use Ethereum packages, runtimes, and handlers (e.g. `@subql/node-ethereum`, `ethereum/Runtime`, and `ethereum/*Hander`) for Boba ETH. Since Boba ETH is an EVM-compatible layer-2 scaling solution, we can use the core Ethereum framework to index it.
:::

<!-- @include: ../snippets/evm-manifest-intro.md#level2 -->

As we are indexing all transfers and approvals from the Wrapped ETH contract on Boba ETH network, the first step is to import the contract abi definition which can be obtained from from any standard [ERC-20 contract](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/). Copy the entire contract ABI and save it as a file called `erc20.abi.json` in the `/abis` directory.

**Update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 1049330,

      options: {
        // Must be a key of assets
        abi: "erc20",
        // This is the contract address for Wrapped Ether https://bobascan.com/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000
        address: "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000",
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

The above code indicates that you will be running a `handleTransaction` mapping function whenever there is a `approve` method being called on any transaction from the [WETH contract](https://bobascan.com/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

The code also indicates that you will be running a `handleLog` mapping function whenever there is a `Transfer` event being emitted from the [WETH contract](https://bobascan.com/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000).

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
        "totalCount": 21,
        "nodes": [
          {
            "id": "0xffe50d2e3e50c7bfa09500d36ca7ae75de1891c929ce408e2c75c261504f6da4",
            "blockHeight": "1049554",
            "from": "0x547b227A77813Ea70Aacf01212B39Db7b560fa1c",
            "to": "0x17C83E2B96ACfb5190d63F5E46d93c107eC0b514",
            "value": "479864790439106520",
            "contractAddress": "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"
          },
          {
            "id": "0x4bd23400942cf728b59996067cd2d62bbad238337829699968aeebf7a560f087",
            "blockHeight": "1049572",
            "from": "0x92E1ABD0688f2DaD6bAeF1bA550B3DB8496C6bf0",
            "to": "0x4F059F8d45230Cd5B37544E87eeBba033A5f1b17",
            "value": "182699882986823721",
            "contractAddress": "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"
          },
          {
            "id": "0xf0f62948ba7019fc8566c13ca1d7d0b40e2d4a7969313005b282c56f30ee33ca",
            "blockHeight": "1049659",
            "from": "0x92E1ABD0688f2DaD6bAeF1bA550B3DB8496C6bf0",
            "to": "0x4F059F8d45230Cd5B37544E87eeBba033A5f1b17",
            "value": "182107694671145841",
            "contractAddress": "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"
          },
          {
            "id": "0x28d3b1dc6c033eb7d34c833845dc942d3039c404f56df0a3dacfed27c43052bd",
            "blockHeight": "1049564",
            "from": "0x247442181b8bAA03b3c7DC0D8e971bD4686db27c",
            "to": "0x4F059F8d45230Cd5B37544E87eeBba033A5f1b17",
            "value": "146018112402773964",
            "contractAddress": "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"
          },
          {
            "id": "0x2d4fb3b93b06c3ecf957fab960c4d491bac4d16a3d24c969c98ed8d200652b19",
            "blockHeight": "1049555",
            "from": "0x0000000000d854E9Db5fDE8955F123283C41B489",
            "to": "0x547b227A77813Ea70Aacf01212B39Db7b560fa1c",
            "value": "133418544049988760",
            "contractAddress": "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"
          }
        ]
      }
    },
    "approvals": {
      "nodes": [
        {
          "id": "0x5457b8e60bf56db8fb6cbca09407a6156fda5fcc5775e3bc13c4af12b46bdcc7",
          "blockHeight": null,
          "owner": "0x71A1B05506CAf8596b21f21Ac64E4818b8464867",
          "spender": "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000",
          "value": "18043891388642118",
          "contractAddress": "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"
        },
        {
          "id": "0xcbb77916b8aba6cf3df541c436ce14e71346f5a80c73e66c081dfe1e6dcce264",
          "blockHeight": null,
          "owner": "0x71A1B05506CAf8596b21f21Ac64E4818b8464867",
          "spender": "0xAdB2d3b711Bb8d8Ea92ff70292c466140432c278",
          "value": "18043891388642118",
          "contractAddress": "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/subquery/ethereum-subql-starter/blob/main/Boba/boba-eth-starter/).
:::

<!-- @include: ../snippets/whats-next.md -->
