# Moonbeam (EVM) Quick Start

## Goals
This quick start guide introduces SubQuery's Substrate EVM support by using an example project in Moonbeam Network. The example project indexes all Transfers from the [Moonbeam EVM FRAX ERC-20 contract](https://moonscan.io/token/0x322e86852e492a7ee17f28a78c663da38fb33bfb), as well as Collators joining and leaving events from [Moonbeam's Staking functions](https://docs.moonbeam.network/builders/pallets-precompiles/pallets/staking/) functions.

This project is unique, as it indexes data from both Moonbeam's Substrate execution layer (native Moonbeam pallets and runtime), with smart contract data from Astar's EVM smart contract layer, within the same SubQuery project and into the same dataset. A very similar approach was taken with [indexing Astar's WASM layer too](https://academy.subquery.network/quickstart/quickstart_chains/polkadot-astar.html).

Previously, in the [1. Create a New Project](../quickstart.md) section, [3 key files](../quickstart.md#_3-make-changes-to-your-project) were mentioned. Let's take a closer look at these files.


## 1. GraphQL Schema File

The `schema.graphql` file determines the shape of your data from SubQuery due to the mechanism of the GraphQL query language. Hence, updating the GraphQL Schema file is the perfect place to start. It allows you to define your end goal right at the start.

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

::: warning Important
When you make any changes to the schema file, please ensure that you regenerate your types directory.
:::

::: code-tabs
@tab:active yarn

```shell
yarn codegen
```

@tab npm

```shell
npm run-script codegen
```

:::

You will find the generated models in the `/src/types/models` directory.

Check out the [GraphQL Schema](../../build/graphql.md) documentation to get in-depth information on `schema.graphql` file.

## 2. The Project Manifest File

The Project Manifest (`project.yaml`) file works as an entry point to your project. It defines most of the details on how SubQuery will index and transform the chain data. For Substrate/Polkadot chains, there are three types of mapping handlers:

- [BlockHanders](../../build/manifest/polkadot.md#mapping-handlers-and-filters): On each and every block, run a mapping function
- [EventHandlers](../../build/manifest/polkadot.md#mapping-handlers-and-filters): On each and every Event that matches optional filter criteria, run a mapping function
- [CallHanders](../../build/manifest/polkadot.md#mapping-handlers-and-filters): On each and every extrinsic call that matches optional filter criteria, run a mapping function

For [EVM](../../build/substrate-evm.md) and [WASM](../../build/substrate-wasm.md) data processors on Substrate/Polkadot chains, there are only two types of mapping handlers:

- [EventHandlers](../../build/substrate-wasm.html#event-handlers): On each and every Event that matches optional filter criteria, run a mapping function
- [CallHanders](../../build/substrate-wasm.html#call-handlers): On each and every extrinsic call that matches optional filter criteria, run a mapping function

### Substrate Manifest section

**Since we are planning to index all Polkadot transfers, we need to update the `datasources` section as follows:**

```yaml
dataSources:
  - kind: substrate/Runtime
    # This is the datasource for Moonbeam's Native Substrate processor
    startBlock: 1
    mapping:
      file: ./dist/index.js
      handlers:
       - handler: handleCollatorJoined
          kind: substrate/CallHandler
          filter:
            module: staking
            method: joinCandidates
        - handler: handleCollatorLeft
          kind: substrate/CallHandler
          filter:
            module: staking
            method: executeLeaveCandidates
```

This indicates that you will be running a `handleCollatorJoined` mapping function whenever the method `joinCandidates` is called on the `staking` pallet. Similarly, we will run `handleCollatorLeft`whenever the method `executeLeaveCandidates` is called on the staking pallet. This covers the most basic actions that Collators can do (requesting to join the candidates pool & leaving the candidates pool). For more information about other methods possible under the pallet `staking`in Moonbeam, the Moonbeam documentation provides a [list of possible functions to call](https://docs.moonbeam.network/builders/pallets-precompiles/pallets/staking/).

Check out our [Manifest File](../../build/manifest/polkadot.md) documentation to get more information about the Project Manifest (`project.yaml`) file.

### EVM Manifest Section

If you're not using the [EVM-Substrate starter template](https://github.com/subquery/subql-starter/tree/main/Moonbeam/moonbeam-evm-substrate-starter) then please add the frontier EVM Datasource as a dependency using `yarn add @subql/frontier-evm-processor`.

We are indexing all transfers and approve contract call events from the $FRAX contract `0x322E86852e492a7Ee17f28a78c663da38FB33bfb`. First, you will need to import the contract ABI defintion. You can copy the entire JSON and save it as a file `./erc20.abi.json` in the root directory.

This section in the Project Manifest now imports all the correct definitions and lists the triggers that we look for on the blockchain when indexing. We add another section the datasource beneath the above [substrate manifest section](#substrate-manifest-section).

```yaml
dataSources:
  - kind: substrate/Runtime
    # This is the datasource for Moonbeam's Native Substrate processor
    ...
  - kind: substrate/Wasm
    # This is the datasource for Moonbeam's EVM processor
    startBlock: 3281780
    processor:
      file: ./node_modules/@subql/frontier-evm-processor/dist/bundle.js
      options:
        abi: erc20
        contract: "0x322E86852e492a7Ee17f28a78c663da38FB33bfb" # Mainnet
    assets:
      erc20:
        file: ./erc20.abi.json
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleErc20Transfer
          kind: substrate/MoonbeamEvent
          filter:
            topics:
              - Transfer(address indexed from,address indexed to,uint256 value)

```

The above code indicates that you will be running a `handleErc20Transfer` mapping function whenever there is an `Transfer` event on any transaction from the Moonbeam $FRAX contract.

Check out our [Substrate EVM](../../build/substrate-evm.md) documentation to get more information about the Project Manifest (`project.yaml`) file for Substrate EVM contracts.


## 3. Mapping Functions



## 4. Build Your Project



## 5. Run Your Project Locally with Docker



## 6. Query Your Project



## What's next?

