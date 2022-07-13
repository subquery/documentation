# Migrating from The Graph

When we set out to build SubQuery, we always planned to make the developer experience as close as possible to other indexing solutions out there in the market, including The Graph.

The migration from a SubGraph to a SubQuery Project is (by design) easy and quick. It may take you an hour or two to complete the migration, depending on the complexity of your SubGraph.

::: tip Tip

**Want Support During Migration?**

Reach out to our team at sales@subquery.network and get professional service to manage the migration for you.

:::

## Migration Overview

- Both SubGraph and SubQuery use the same `schema.graphql` file to define schema entities. In addition, both have similar sets of supported scalars and entity relationships (SubQuery adds support for JSON types though).
- The manifest file shows the most differences but you can easily overcome these differences once you understand them. 
- In addition, Mapping files are also quite similar with an intentionally equivalent set of commands, which are used to access the Graph Node store and the SubQuery Project store.


## GraphQL Schema

Both SubGraphs and SubQuery projects use the same `schema.graphql` to define entities. 

Visit this [full documentation for `schema.graphql`](./graphql.md). **You can copy this file from your SubGraph to your SubQuery project in most cases.**


Notable differences include:

- SubQuery does not have support for `Bytes` (use `String` instead) and `BigDecimal` (use `Float` instead).
- SubQuery has the additional scalar types of `Float`, `Date`, and `JSON` (see [JSON type](./graphql.md#json-type)).
- Comments are added to SubQuery Project GraphQL files using hashes (`#`).
- SubQuery does not yet support full-text search.

## Manifest File

The manifest file contains the largest set of differences, but once you understand those they can be easily overcome. Most of these changes are due to the layout of this file, you can see the [full documentation of this file here](./manifest.md).


**Notable differences include:**

- SubQuery has a section in the manifest for the `network:`. This is where you define what network your SubQuery project indexes, and the RPC endpoints (non-pruned archive nodes) that it connects to in order to retrieve the data. Make sure to include the `dictionary:` endpoint in this section as it will speed up the indexing speed of your SubQuery project.

![Difference between a SubGraph and a SubQuery project](/assets/img/subgraph-manifest-1.png)

- Both SubGraphs and SubQuery projects use the `dataSources:` section to list the mapping files.
- Similarly, you can define the contract ABI information for the smart contract that you are indexing.
  - In SubQuery, this is under the `options:` property rather than `source:`.
  - In both, SubQuery and SubGraph, you import a custom ABI spec that is used by the processor to parse arguments. For SubGraphs, this is done within the `mapping:` section under `abis:`. For a SubQuery project, this is at the same level of `options:` under `assets:` and the key is the name of the ABI.
![Difference between a SubGraph and a SubQuery project](/assets/img/subgraph-manifest-2.png)

- In a SubQuery project, you can document both block handlers, call handlers, and event handlers in the same `mapping:` object.
- In a SubQuery project, you do not list all mapping entities in the project manifest.
- Handlers and Filters - Each mapping function is defined slightly differently in a SubQuery project:
  - Instead of listing the blocks/events/calls as the key and then denoting the handler that processes it. In SubQuery, you define the handler as the key and then what follows is the description of how this handler is triggered.

  - In a SubQuery project, you can document both block handlers, call handlers, and event handlers in the same `mapping:` object, the `kind:` property notes what type we are using.
  - SubQuery supports advanced filtering on the handler. The format of the supported filter varies amongst block/events/calls/transactions, and between the different blockchain networks. You should refer to the [documentation for a detailed description of each filter](./manifest.md#mapping-handlers-and-filters).

![Difference between a SubGraph and a SubQuery project](/assets/img/subgraph-manifest-3.png)

:::: code-group

::: code-group-item SubGraph

```yaml
# ******* SubGraph *******
specVersion: 0.0.2

schema:
  file: ./schema.graphql

dataSources:
  - kind: ethereum
    name: Expedition
    network: herotestnet

    # Section relating to ABIs, also note abis: in mapping
    source:
      address: "0x31DcbBc450DEAe74E73dF8988F5a8AdbE6dBaC93"
      abi: Expedition

    mapping:
      file: "./src/mapping.ts"
      kind: ethereum/events
      apiVersion: 0.0.5
      language: wasm/assemblyscript
      entities:
        - ReinforceAttack
        - ReinforceDefense
        - UnlockAttackNFTs
      abis:
        - name: Expedition
          file: ./abis/Expedition.json
      # handlers are split up depending on type
      eventHandlers:
        - event: ReinforceAttack(address,uint256,uint256,uint256)
          handler: handleReinforceAttack
        - event: ReinforceDefense(address,uint256,uint256,uint256)
          handler: handleReinforceDefense
        - event: UnlockAttackNFTs(address,uint256)
          handler: handleUnlockAttackNFTs
```

:::

::: code-group-item SubQuery

```yaml
# ******* SubQuery *******
specVersion: "1.0.0"

name: "avalanche-subql-starter"
version: "0.0.1"
runner:
  node:
    name: "@subql/node-avalanche"
    version: "*"
  query:
    name: "@subql/query"
    version: "*"
description: "This project can be used as a starting point for developing your new Avalanche SubQuery project"
repository: "https://github.com/subquery/avalanche-subql-starter"

schema:
  file: "./schema.graphql"

# Network endpoint definition
network:
  endpoint: "http://avalanche.api.onfinality.io"
  chainId: "mainnet"
  subnet: "C"

dataSources:
  - kind: avalanche/Runtime
    startBlock: 5888150

    # Section relating to ABIs
    options:
      address: "0x31DcbBc450DEAe74E73dF8988F5a8AdbE6dBaC93"
      abi: Expedition
    assets:
      Expedition:
        file: "./abis/Expedition.json"

    mapping:
      file: "./dist/index.js"
      # handlers are all listed in one place
      handlers:
        - handler: handleReinforceAttack
          kind: avalanche/LogHandler
          filter:
            topics:
              - ReinforceAttack(address,uint256,uint256,uint256)
        - handler: handleReinforceDefense
          kind: avalanche/LogHandler
          filter:
            topics:
              - ReinforceDefense(address,uint256,uint256,uint256)
        - handler: handleUnlockAttackNFTs
          kind: avalanche/LogHandler
          filter:
            topics:
              - UnlockAttackNFTs(address,uint256)
```

:::

::::

## Mapping

Mapping files are also quite identical to an intentionally equivalent set of commands, which are used to access the Graph Node store and the SubQuery Project store.

In SubQuery, all mapping handlers receive a typed parameter that depends on the handler that calls it. For example, an `avalanche/LogHandler` will receive a parameter of type `AvalancheLog` and `substrate/EventHandler` will receive a parameter of type `SubstrateEvent`.

The functions are defined the same way. Moreover, entities can be instantiated, retrieved, saved, and deleted from the SubQuery store in a similar way as well.


![Difference between a SubGraph and a SubQuery project](/assets/img/subgraph-mapping.png)

:::: code-group

::: code-group-item SubGraph

```ts
// ******* SubGraph *******
export function handleUnlockAttackNFTs(event: UnlockAttackNFTs): void {
  // Load campaign record
  let campaign = Campaign.load(event.params._id.toString());

  // If the campaign does not exist create it with the campaign id
  if (!campaign) {
    campaign = new Campaign(event.params._id.toString());
  }

  // Set is claimed for the ambusher
  campaign.isClaimedAmbusher = true;

  campaign.save();
}
```

:::

::: code-group-item SubQuery

```ts
// ******* SubQuery *******
export async function handleUnlockAttackNFTs(
  event: AvalancheLog<UnlockAttackNFTsEvent["args"]>
): Promise<void> {
  // Load campaign record
  let campaign = await Campaign.get(event.args._id.toHexString());

  // If the campaign does not exist create it with the campaign id
  if (!campaign) {
    // This will cause issues as there is missing required params
    campaign = new Campaign(event.args._id.toHexString());
  }

  // Set is claimed for the ambusher
  campaign.isClaimedAmbusher = true;

  await campaign.save();
}
```

:::

::::

## Querying Contracts

We globally provide an `api` object that implements an [Ethers.js Provider](https://docs.ethers.io/v5/api/providers/provider/). This will allow querying contract state at the current block height being indexed. The easiest way to use the `api` is with [Typechain](https://github.com/dethcrypto/TypeChain), with this you can generate typescript interfaces that are compatible with this `api` that make it much easier to query your contracts.

You can then query contract state at the right block height. For example to query the token balance of a user at the current indexed block height:

```ts
// Create an instance of the contract, you can get the contract address from the Transaction or Log
const erc20 = Erc20__factory.connect(contractAddress, api);

// Query the balance of an address
const balance = await erc20.balanceOf(address);
```

## What's Next?

Now that you have a clear understanding of how to build a basic SubQuery project, what are the next steps of your journey?

Now, you can easily publish your project. SubQuery provides a free managed service where you can deploy your new project. You can deploy it to [SubQuery Projects](https://project.subquery.network) and query it using our [Explorer](https://explorer.subquery.network). Read this complete guide on how to [publish your new project to SubQuery Projects](../../run_publish/publish.md).

To dive deeper into the developer documentation, jump to the [Build ](../../build/introduction.md) section and learn more about the three key files: **the manifest file, the GraphQL schema, and the mappings file.**

If you want to practice with more real examples, then head to our [Courses](../academy/academy.md) section and learn important concepts with related exercises and lab workbooks. Get access to readily available and open-source projects, and get a hands-on experience with SubQuery projects.

In the end, if you want to explore more ways to run and publish your project, refer to [Run & Publish section](../../run_publish/run.md). Get complete information about all the ways to run your SubQuery project, along with advanced GraphQL aggregation and subscription features.

## Summary

As you can clearly see, it's only a small amount of work to migrate your SubGraphs to SubQuery. Once completed, you can take advantage of SubQuery's absolute performance. Now, start iterating and delivering faster with quicker sync times and indexing optimisations to ensure that you always have fresh data.

Moreover, SubQuery is multi-chain by design. Hence, the same project can be easily extended across chains and the SubQuery Network supports them all. Indexing across different chains is incredibly easy with SubQuery's unified design.

Finally, be assured that we're right behind you. Thousands of supporters and builders on our [Discord server](https://discord.com/invite/subquery) can provide you with the technical support that you need. Additionally, please reach out via support@subquery.network, we'd love to chat, hear what you're building, and work with you to make your migration easier.
