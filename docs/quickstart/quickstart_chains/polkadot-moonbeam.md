# Moonbeam (EVM) Quick Start

## Goals
This quick start guide introduces SubQuery's Substrate EVM support by using an example project in Moonbeam Network. The example project indexes all Transfers from the [Moonbeam EVM FRAX ERC-20 contract](https://moonscan.io/token/0x322e86852e492a7ee17f28a78c663da38fb33bfb), as well as Collators joining and leaving events from [Moonbeam's Staking functions](https://docs.moonbeam.network/builders/pallets-precompiles/pallets/staking/) functions.

This project is unique, as it indexes data from both Moonbeam's Substrate execution layer (native Moonbeam pallets and runtime), with smart contract data from Astar's EVM smart contract layer, within the same SubQuery project and into the same dataset. A very similar approach was taken with [indexing Astar's WASM layer too](https://academy.subquery.network/quickstart/quickstart_chains/polkadot-astar.html).

Previously, in the [1. Create a New Project](../quickstart.md) section, [3 key files](../quickstart.md#_3-make-changes-to-your-project) were mentioned. Let's take a closer look at these files.


## 1. GraphQL Schema File



## 2. The Project Manifest File



### Substrate Manifest section



### Frontier-EVM Manifest Section



## 3. Mapping Functions



## 4. Build Your Project



## 5. Run Your Project Locally with Docker



## 6. Query Your Project



## What's next?

