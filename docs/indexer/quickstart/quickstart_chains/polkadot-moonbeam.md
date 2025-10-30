# Moonbeam (EVM) Quick Start

This quick start guide introduces SubQuery's Substrate EVM support by using an example project in Moonbeam Network. The example project indexes all Transfers from the [Moonbeam EVM FRAX ERC-20 contract](https://moonscan.io/token/0x322e86852e492a7ee17f28a78c663da38fb33bfb), as well as Collators joining and leaving events from [Moonbeam's Staking functions](https://docs.moonbeam.network/builders/pallets-precompiles/pallets/staking/).

This project is unique, as it indexes data from both Moonbeam's Substrate execution layer (native Moonbeam pallets and runtime), with smart contract data from Moonbeam's EVM smart contract layer, within the same SubQuery project and into the same dataset. A very similar approach was taken with [indexing Astar's WASM layer too](https://academy.subquery.network/quickstart/quickstart_chains/polkadot-astar.html).

<!-- @include: ../snippets/quickstart-reference.md -->

<!-- @include: ../snippets/schema-intro.md#level2 -->

The Moonbeam-evm-substrate-starter project has two entities. An Erc20Transfer and Collator. These two entities index ERC-20 transfers related to [the $FRAX contract](https://moonscan.io/token/0x322e86852e492a7ee17f28a78c663da38fb33bfb), as well as any [collators joining or leaving](https://docs.moonbeam.network/node-operators/networks/collators/activities/) the Moonbeam Parachain.

```graphql
type Erc20Transfer @entity {
  id: ID! #id is a required field
  from: String!
  to: String!
  contractAddress: String!
  amount: BigInt!
}

type Collator @entity {
  id: ID! #collator address
  joinedDate: Date!
}
```

<!-- @include: ../snippets/codegen.md -->

You will find the generated models in the `/src/types/models` directory.

<!-- @include: ../snippets/schema-note.md -->

## The Project Manifest File

The Project Manifest (`project.ts`) file works as an entry point to your project. It defines most of the details on how SubQuery will index and transform the chain data. For Substrate/Polkadot chains, there are three types of mapping handlers:

- [BlockHandlers](../../build/manifest/chain-specific/polkadot.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [EventHandlers](../../build/manifest/chain-specific/polkadot.md#mapping-handlers-and-filters): On each and every Event that matches optional filter criteria, run a mapping function
- [CallHanders](../../build/manifest/chain-specific/polkadot.md#mapping-handlers-and-filters): On each and every extrinsic call that matches optional filter criteria, run a mapping function

For [EVM](../../build/datasource-processors/substrate-evm.md) and [WASM](../../build/datasource-processors/substrate-wasm.md) data processors on Substrate/Polkadot chains, there are only two types of mapping handlers:

- [EventHandlers](../../build/datasource-processors/substrate-evm.md#event-handlers): On each and every Event that matches optional filter criteria, run a mapping function
- [CallHanders](../../build/datasource-processors/substrate-evm.md#call-handlers): On each and every extrinsic call that matches optional filter criteria, run a mapping function

### Substrate Manifest section

**Since we are planning to index all Polkadot transfers, we need to update the `datasources` section as follows:**

```ts
{
  dataSources: [
    {
      kind: SubstrateDatasourceKind.Runtime,
      startBlock: 1,
      mapping: {
        file: './dist/index.js',
        handlers: [
          {
            handler: 'handleCollatorJoined',
            kind: SubstrateHandlerKind.Call,
            filter: {
              module: 'staking',
              method: 'joinCandidates'
            }
          },
          {
            handler: 'handleCollatorLeft',
            kind: SubstrateHandlerKind.Call,
            filter: {
              module: 'staking',
              method: 'executeLeaveCandidates'
            }
          }
        ]
      }
    },
  ],
}
```

This indicates that you will be running a `handleCollatorJoined` mapping function whenever the method `joinCandidates` is called on the `staking` pallet. Similarly, we will run `handleCollatorLeft` whenever the method `executeLeaveCandidates` is called on the staking pallet. This covers the most basic actions that Collators can do (requesting to join the candidates pool & leaving the candidates pool). For more information about other methods possible under the pallet `staking`in Moonbeam, the Moonbeam documentation provides a [list of possible functions to call](https://docs.moonbeam.network/builders/pallets-precompiles/pallets/staking/).

<!-- @include: ../snippets/polkadot-manifest-note.md -->

### EVM Manifest Section

If you're not using the [EVM-Substrate starter template](https://github.com/subquery/subql-starter/tree/main/Moonbeam/moonbeam-evm-substrate-starter) then please add the frontier EVM Datasource as a dependency using `yarn add @subql/frontier-evm-processor`.

We are indexing all transfers and approve contract call events from the $FRAX contract `0x322E86852e492a7Ee17f28a78c663da38FB33bfb`. First, you will need to import the contract ABI defintion. You can copy the entire JSON and save it as a file `./erc20.abi.json` in the root directory.

This section in the Project Manifest now imports all the correct definitions and lists the triggers that we look for on the blockchain when indexing. We add another section the datasource beneath the above [substrate manifest section](#substrate-manifest-section).

```ts
{
  dataSources: [
    {
      kind: 'substrate/FrontierEvm',
      startBlock: 189831,
      processor: {
        file: './node_modules/@subql/frontier-evm-processor/dist/bundle.js',
        options: {
          abi: 'erc20',
          // Contract address of $FRAX
          address: '0x322E86852e492a7Ee17f28a78c663da38FB33bfb'
        }
      },
      assets: new Map([['erc20', { file: './erc20.abi.json' }]]),
      mapping: {
        file: './dist/index.js',
        handlers: [
          {
            handler: 'handleErc20Transfer',
            kind: 'substrate/FrontierEvmEvent',
            filter: {
              topics: [
                'Transfer(address indexed from,address indexed to,uint256 value)'
              ]
            }
          },
        ]
      },
    },
  ],
}
```

The above code indicates that you will be running a `handleErc20Transfer` mapping function whenever there is an `Transfer` event on any transaction from the Moonbeam $FRAX contract.

Check out our [Substrate EVM](../../build/datasource-processors/substrate-evm.md) documentation to get more information about the Project Manifest (`project.ts`) file for Substrate EVM contracts.

<!-- @include: ../snippets/mapping-intro.md#level2 -->

Navigate to the default mapping function in the `src/mappings` directory. There are the exported functions `handleCollatorJoined`, `handleCollatorLeft` and `handleErc20Transfer`.

```ts
export async function handleCollatorJoined(
  call: SubstrateExtrinsic,
): Promise<void> {
  //We added a logger to the top of this function, in order to see the block number of the event we are processing.
  logger.info(`Processing SubstrateEvent at ${call.block.block.header.number}`);

  const address = call.extrinsic.signer.toString();

  const collator = Collator.create({
    id: address,
    joinedDate: call.block.timestamp,
  });

  await collator.save();
}

export async function handleCollatorLeft(
  call: SubstrateExtrinsic,
): Promise<void> {
  //We added a logger to the top of this function, in order to see the block number of the event we are processing.
  logger.info(`Processing SubstrateCall at ${call.block.block.header.number}`);

  const address = call.extrinsic.signer.toString();
  await Collator.remove(address);
}
```

The `handleCollatorJoined` and `handleCollatorLeft` functions receives Substrate event/call data from the native Substrate environment whenever an event/call matches the filters that were specified previously in the `project.ts`. It extracts the various data from the event/call payload, then checks if an existing Collator record exists. If none exists (e.g. it's a new collator), then it instantiates a new one and then updates the total stake to reflect the new collators. Then the `.save()` function is used to save the new/updated entity (_SubQuery will automatically save this to the database_).

```ts
export async function erc20Transfer(
  event: MoonbeamEvent<
    [string, string, BigNumber] & { from: string; to: string; value: BigNumber }
  >,
): Promise<void> {
  //We added a logger to the top of this function, in order to see the block number of the event we are processing.
  logger.info(`Processing MoonbeamEvent at ${event.blockNumber.toString()}`);
  const transfer = Erc20Transfer.create({
    id: event.transactionHash,
    from: event.args.from,
    to: event.args.to,
    amount: event.args.value.toBigInt(),
    contractAddress: event.address,
  });

  await transfer.save();
}
```

The `handleErc20Transfer` function receives event data from the EVM execution environment whenever an event matches the filters that was specified previously in the `project.ts`. It instantiates a new `Transfer` entity and populates the fields with data from the EVM Call payload. Then the `.save()` function is used to save the new entity (_SubQuery will automatically save this to the database_).

Check out our mappings documentation for [Substrate](../../build/mapping-functions/mapping/polkadot.md) and the [Substrate Frontier EVM data processor](../../build/datasource-processors/substrate-evm.md) to get detailed information on mapping functions for each type.

<!-- @include: ../snippets/build.md -->

<!-- @include: ../snippets/run-locally.md -->

<!-- @include: ../snippets/query-intro.md -->

```graphql
query {
  erc20Transfers(first: 3, orderBy: BLOCK_HEIGHT_ASC) {
    nodes {
      id
      from
      to
      contractAddress
      amount
    }
  }
}
```

::: tip
There is a _Docs_ tab on the right side of the playground which should open a documentation drawer. This documentation is automatically generated and helps you find what entities and methods you can query. To learn more about the GraphQL Query language [here](../../run_publish/query/graphql.md).
:::

You should see results similar to below:

```json
{
  "data": {
    "erc20Transfers": {
      "nodes": [
        {
          "id": "0x6eadc6336e57c95012a0b3fe0bbfdfe4b05870db45f54022f6f0fae99094389e",
          "from": "0xB213A825552FBC78DcA987824F74c8a870696ede",
          "to": "0xd3bE0E32147ae91378F035fF96f3e2cAb96aC48b",
          "contractAddress": "0x322e86852e492a7ee17f28a78c663da38fb33bfb",
          "amount": "421311117864349454574"
        },
        {
          "id": "0x042e355370899571f0a8828e943ac794554b48c3d042a0a26cfd64e3b1107de5",
          "from": "0xd3bE0E32147ae91378F035fF96f3e2cAb96aC48b",
          "to": "0x1d3286A3348Fa99852d147C57A79045B41c4f713",
          "contractAddress": "0x322e86852e492a7ee17f28a78c663da38fb33bfb",
          "amount": "180233014368657600639"
        },
        {
          "id": "0x1fcc93ee0879ade7df0bfbaaaff32b0aef31698865ede29290b5616b59683f5e",
          "from": "0x5f68e72bF781d3927a59Ff74030b87A0F628EB91",
          "to": "0x054Fb7D6c1E3d7771B128Eb6FA63864745284Fc5",
          "contractAddress": "0x322e86852e492a7ee17f28a78c663da38fb33bfb",
          "amount": "24614491694707430571"
        },
        {
          "id": "0x50eecab0be3c46ff1d1aa8effcd1166bbdcb9f28582c2a5f53fd35b25b8cd021",
          "from": "0x2974A0D3e70FDe22d44c188F770beE964205aCad",
          "to": "0xa7A3Cb7d3f9Cf963012fdd54E6de3562A3A5f140",
          "contractAddress": "0x322e86852e492a7ee17f28a78c663da38fb33bfb",
          "amount": "380739794849478795472"
        }
      ]
    }
  }
}
```

Congratulations! You have now a locally running SubQuery project that accepts GraphQL API requests for transfer events from the $FRAX smart contract at [`0x322E86852e492a7Ee17f28a78c663da38FB33bfb`](https://moonscan.io/token/0x322e86852e492a7ee17f28a78c663da38fb33bfb).

<!-- @include: ../snippets/whats-next.md -->
