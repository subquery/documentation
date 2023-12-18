# Cronos Quick Start

The goal of this quick start guide is to adapt the standard starter project in the Cronos Network and then begin indexing all transfers of [Cro Crow Token](https://www.crocrow.com/).

<br/>
<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/FafUBwzTK5U" frameborder="0" allowfullscreen="true"></iframe>
</figure>

::: warning Important
Cronos is an EVM compatible (Ethermint) chain, as such there are two options for indexing Cronos data. You can index chain data via the standard Cosmos RPC interface, or via Ethereum APIs. For Cronos, we provide a starter project for each.
:::

<!-- @include: ../snippets/cosmos-quickstart-reference.md -->

::: tip
The final code of this project can be found [here](https://github.com/deverka/cronos_crow_token_transfers).
:::

<!-- @include: ../snippets/cosmos-manifest-intro.md#level2 -->

::: warning Important
There are two versions of this file depending on your choice to index data via the ETH or Cosmos RPC
:::

::: code-tabs
@tab ETH

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      // Contract creation of Pangolin Token https://snowtrace.io/tx/0xfab84552e997848a43f05e440998617d641788d355e3195b6882e9006996d8f9
      startBlock: 446,
      options: {
        // Must be a key of assets
        abi: "erc20",
        address: "0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23",
        // Wrapped CRO https://cronos.org/explorer/address/0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23
      },
      assets: new Map([["erc20", { file: "./erc20.abi.json" }]]),
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
              function: "approve(address guy, uint256 wad)",
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
              topics: ["Transfer(address src, address dst, uint256 wad)"],
            },
          },
        ],
      },
    },
  ],
}
```

@tab Cosmos RPC

```ts
{
  dataSources: [
    {
      kind: "cosmos/EthermintEvm",
      startBlock: 446,
      processor: {
        file: "./node_modules/@subql/ethermint-evm-processor/dist/bundle.js",
        options: {
          abi: "erc20",
          address: "0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23", // Wrapped CRO
        },
      },
      assets: new Map([["erc20", { file: "./erc20.abi.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleEthermintEvmCall",
            kind: "cosmos/EthermintEvmCall",
            filter: {
              // Either Function Signature strings or the function `sighash` to filter the function called on the contract
              // https://docs.ethers.io/v5/api/utils/abi/fragments/#FunctionFragment
              method: "approve(address guy, uint256 wad)",
            },
          },
          {
            handler: "handleEthermintEvmEvent",
            kind: "cosmos/EthermintEvmEvent",
            filter: {
              // The topics filter follows the Ethereum JSON-PRC log filters
              // https://docs.ethers.io/v5/concepts/events
              // Example valid values:
              // - '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
              // - Transfer(address,address,u256)
              topics: ["Transfer(address src, address dst, uint256 wad)"],
            },
          },
        ],
      },
    },
  ],
}
```

:::

The above code defines that you will be running a `handleTransfer` mapping function whenever there is an event emitted with the `transfer` method. Check out our [Manifest File](../../build/manifest/cosmos.md) documentation to get more information about the Project Manifest (`project.ts`) file.

::: tip Note
Please note that Cro Crow token requires a specific ABI interface. You need to:

- Get the [Cro Crow contract ABI](https://cronoscan.com/address/0xe4ab77ed89528d90e6bcf0e1ac99c58da24e79d5#code).
  You can compare with the [interface file](https://github.com/deverka/cronos_crow_token_transfers/blob/e067a87b69168aa6c05e9095b55d15483dd1bff9/cro-crow.abi.json) from this Quick Start final repo.
- Create a file `cro-crow.abi.json` in the main project's directory.
- Link this file as an erc20 asset in the manifest file.
  :::

<!-- @include: ../snippets/cosmos-manifest-note.md -->

<!-- @include: ../snippets/schema-intro-level2.md -->

Update the `schema.graphql` file as follows. The aim is to index all transfers of [Cro Crow Token](https://www.crocrow.com/).

```graphql
type Transfer @entity {
  id: ID! # Transfer hash
  from: String!
  to: String!
  tokenId: BigInt!
}
```

<!-- @include: ../snippets/note-on-entity-relationships.md -->

<!-- @include: ../snippets/cosmos-codegen.md -->

If you're creating as an CosmWasm based project, this command will also generate types for your listed protobufs and save them into `src/types` directory, providing you with more typesafety. Read about how this is done in [Cosmos Codegen from CosmWasm Protobufs](../../build/introduction.md#cosmos-codegen-from-cosmwasm-protobufs).

If you're creating as an EVM based project, this command will also generate ABI types and save them into `src/types` using the `npx typechain --target=ethers-v5` command, allowing you to bind these contracts to specific addresses in the mappings and call read-only contract methods against the block being processed.

It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. Read about how this is done in [EVM Codegen from ABIs](../../build/introduction.md#evm-codegen-from-abis).

<!-- @include: ../snippets/schema-note.md -->

<!-- @include: ../snippets/mapping-intro-level2.md -->

Navigate to the default mapping function in the `src/mappings` directory. You will see setup types for ABI `TransferEventArgs` and `ApproveCallArgs`. Delete those for approvals. You will also see two exported functions: `handleEthermintEvmEvent` & `handleEthermintEvmCall` or `handleLog` & `handleTransaction`. Delete them as well.

::: warning Important
There are two versions of this file depending on your choice to index data via the ETH or Cosmos RPC
:::

Update your mapping files to match the following (**note the additional imports**):

::: code-tabs
@tab ETH

```ts
import { Transfer } from "../types";
import { EthereumLog } from "@subql/types-ethereum";
import { BigNumber } from "@ethersproject/bignumber";

// Setup types from ABI
type TransferEventArgs = [string, string, BigNumber] & {
  from: string;
  to: string;
  tokenId: BigNumber;
};

// Save all transfers
export async function handleTransfer(
  log: EthereumLog<TransferEventArgs>
): Promise<void> {
  const transfer = Transfer.create({
    id: log.transactionHash,
    from: log.args.from,
    to: log.args.to,
    tokenId: log.args.tokenId.toBigInt(),
  });

  await transfer.save();
}
```

@tab Cosmos RPC

```ts
import { Transfer } from "../types";
import { EthermintEvmEvent } from "@subql/ethermint-evm-processor";
import { BigNumber } from "ethers";

// Setup types from ABI
type TransferEventArgs = [string, string, BigNumber] & {
  from: string;
  to: string;
  tokenId: BigNumber;
};

// Save all transfers
export async function handleTransfer(
  event: EthermintEvmEvent<TransferEventArgs>
): Promise<void> {
  const transfer = Transfer.create({
    id: event.transactionHash,
    from: event.args.from,
    to: event.args.to,
    tokenId: event.args.tokenId.toBigInt(),
  });

  await transfer.save();
}
```

:::

<!-- @include: ../snippets/cosmos-mapping-note.md -->

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
{
  query {
    transfers(first: 5) {
      nodes {
        id
        to
        from
        tokenId
      }
    }
  }
}
```

You will see the result similar to below:

```json
{
  "data": {
    "transfers": {
      "nodes": [
        {
          "id": "0xff2bcbf7445c48f95b9e9bb770076e1562db2b58881338ea65c8c60aae1f4d20",
          "from": "0xe40E86209bf7A563B23dc5625ea968F9DD9269fA",
          "to": "0x281c2b2a0d5a3db358356537Fb4E1ac6Df9715f0",
          "tokenId": "1160"
        },
        {
          "id": "0xfbc0594cde0776813f02804e816ecd153f0a3e201523479f93f85b5423e5e1c6",
          "from": "0x9B94F48372f5ED14f860B86f606ffb61D908E4dC",
          "to": "0x05d6889ea1593b6e58B3366A95Ac923FC00A37AA",
          "tokenId": "4921"
        },
        {
          "id": "0xc601f604b5c3a6c78257b0e946429d7085c7a9f04b4c985d499c1118465bc30f",
          "from": "0x00779809C0089d269C719F5953F7528E4dcE1Bdc",
          "to": "0x45DfaDC5e74f8Fb62Be7893aA7c1f34db7C26D8d",
          "tokenId": "7085"
        }
      ]
    }
  }
}
```

::: tip Note
The final code of this project can be found [here](https://github.com/deverka/cronos_crow_token_transfers).
:::

<!-- @include: ../snippets/whats-next.md -->
