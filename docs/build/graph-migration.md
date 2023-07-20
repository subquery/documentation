# The Graph Migration

SubQuery provides a superior developer experience to The Graph, while maintaining a similar development workflow that makes migration quick and easy. Migrating to SubQuery brings the following benefits:

- **Performance improvements** - SubQuery is up to 1.85x faster for common projects over The Graph (e.g the standard Ethereum Name Service project) thanks to multi-threading and a store cache layer
- **More flexibility** - SubQuery's mapping functions are written in TypeScript, and so you can import additional libraries, make external API calls, or do anything you want in order to retrieve and process your data.
- **Wider chain support** - SubQuery supports all EVM networks, as well as many other non-EVM networks, like Cosmos, Polkadot, Algorand, NEAR, and more
- **Lightweight** - SubQuery is designed to connect to external public RPC endpoints, you don't need to run an archive node locally when developing
- **Multi-chain indexing support** - allows you to index data from across different layer-1 networks into the same database, this allows you to query a single endpoint to get data for all supported networks. [Read more](../build/multi-chain.md).
- **More control** - A large library of [command line parameters](../run_publish/references.md) to all you to run, monitor, and optimise your locally hosted project
- **Managed Service hosting** - We have no plans to sunset our [Managed Service](https://managedservice.subquery.network), which provides enterprise-level infrastructure hosting and handles over hundreds of millions of requests each day
- **A decentralised network supporting all chains** - Our [decentralised network](https://kepler.subquery.network) supports all chains that SubQuery support, there is no _second-class_ chain support in the SubQuery ecosystem

![Competitor Comparison](/assets/img/competitor_comparison.jpg)

The migration from a SubGraph to a SubQuery Project is (by design) easy and quick. It may take you an hour or two to complete the migration, depending on the complexity of your SubGraph.

::: tip Tip

**Want Support During Migration?**

Reach out to our team at [sales@subquery.network](mailto:sales@subquery.network) and get a professional service to manage the migration for you.

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

The manifest file contains the largest set of differences, but once you understand those they can be easily overcome. Most of these changes are due to the layout of this file, you can see the [full documentation of this file here](./manifest/ethereum.md).

**Notable differences include:**

- SubQuery has a section in the manifest for the `network:`. This is where you define what network your SubQuery project indexes, and the RPC endpoints (non-pruned archive nodes) that it connects to in order to retrieve the data. Make sure to include the `dictionary:` endpoint in this section as it will speed up the indexing speed of your SubQuery project.
- Both SubGraphs and SubQuery projects use the `dataSources:` section to list the mapping files.
- Similarly, you can define the contract ABI information for the smart contract that you are indexing.
  - In SubQuery, this is under the `options:` property rather than `source:`.
  - In both, SubQuery and SubGraph, you import a custom ABI spec that is used by the processor to parse arguments. For SubGraphs, this is done within the `mapping:` section under `abis:`. For a SubQuery project, this is at the same level of `options:` under `assets:` and the key is the name of the ABI.
- In a SubQuery project, you can document both block handlers, call handlers, and event handlers in the same `mapping:` object.
- In a SubQuery project, you do not list all mapping entities in the project manifest.
- Handlers and Filters - Each mapping function is defined slightly differently in a SubQuery project:
  - Instead of listing the blocks/events/calls as the key and then denoting the handler that processes it. In SubQuery, you define the handler as the key and then what follows is the description of how this handler is triggered.
  - In a SubQuery project, you can document both block handlers, call handlers, and event handlers in the same `mapping:` object, the `kind:` property notes what type we are using.
  - SubQuery supports advanced filtering on the handler. The format of the supported filter varies amongst block/events/calls/transactions, and between the different blockchain networks. You should refer to the [documentation for a detailed description of each filter](./manifest/ethereum.md#mapping-handlers-and-filters).

::: code-tabs

@tab SubGraph

```yaml
# ******* SubGraph *******
specVersion: 0.0.2

description: Gravatar for Ethereum
repository: https://github.com/graphprotocol/example-subgraph
schema:
  file: ./schema.graphql

dataSources:
  - kind: ethereum/contract
    name: Gravity
    network: mainnet
    source:
      address: "0x2E645469f354BB4F5c8a05B3b30A929361cf77eC"
      abi: Gravity
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.5
      language: wasm/assemblyscript
      entities:
        - Gravatar
      abis:
        - name: Gravity
          file: ./abis/Gravity.json
      eventHandlers:
        - event: NewGravatar(uint256,address,string,string)
          handler: handleNewGravatar
        - event: UpdatedGravatar(uint256,address,string,string)
          handler: handleUpdatedGravatar
      file: ./src/mapping.ts
```

@tab:active SubQuery

```yaml
# ******* SubQuery *******
specVersion: 1.0.0

name: "subquery-example-gravatar"
version: "0.0.1"
runner:
  node:
    name: "@subql/node-ethereum"
    version: "*"
  query:
    name: "@subql/query"
    version: "*"
description: "This project can be use as a starting point for developing your new Ethereum SubQuery project, it indexes all Gravatars on Ethereum"
repository: "https://github.com/subquery/eth-gravatar"

schema:
  file: "./schema.graphql"

network:
  chainId: "1"
  endpoint: "https://eth.api.onfinality.io/public"
  dictionary: "https://api.subquery.network/sq/subquery/ethereum-dictionary"

dataSources:
  - kind: ethereum/Runtime
    startBlock: 6175243 # This is when the Gravatar contract was deployed
    options:
      abi: gravity
      address: "0x2E645469f354BB4F5c8a05B3b30A929361cf77eC" # The contract address of the Gravatar on Ethereum
    assets:
      gravity:
        file: "./abis/Gravity.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleNewGravatar
          kind: ethereum/LogHandler
          filter:
            topics:
              - NewGravatar(uint256,address,string,string)
        - handler: handleUpdatedGravatar
          kind: ethereum/LogHandler
          filter:
            topics:
              - UpdatedGravatar(uint256,address,string,string)
```

:::

## Codegen

The `codegen` command is also intentionally similar between SubQuery and SubGraphs

All GraphQL entities will have generated entity classes that provide type-safe entity loading, read and write access to entity fields - see more about this process in [the GraphQL Schema](../build/graphql.md). All entites can be imported from the following directory:

```ts
import { Gravatar } from "../types";
```

For ABI's registered in the `project.yaml`, similar type safe entities will be generated using `npx typechain --target=ethers-v5` command, allowing you to bind these contracts to specific addresses in the mappings and call read-only contract methods against the block being processed. It will also generate a class for every contract event to provide easy access to event parameters, as well as the block and transaction the event originated from. All of these types are written to `src/types` directory. In the example [Gravatar SubQuery project](../quickstart/quickstart_chains/ethereum-gravatar.md), you would import these types like so.

```ts
import {
  NewGravatarLog,
  UpdatedGravatarLog,
} from "../types/abi-interfaces/Gravity";
```

## Mapping

Mapping files are also quite identical to an intentionally equivalent set of commands, which are used to access the Graph Node store and the SubQuery Project store.

In SubQuery, all mapping handlers receive a typed parameter that depends on the chain handler that calls it. For example, an `ethereum/LogHandler` will receive a parameter of type `EthereumLog` and `avalanche/LogHandler` will receive a parameter of type `AvalancheLog`.

The functions are defined the same way. Moreover, entities can be instantiated, retrieved, saved, and deleted from the SubQuery store in a similar way as well. The main difference is that SubQuery store operations are asynchronous.

::: code-tabs

@tab SubGraph

```ts
// ******* SubGraph *******
import { NewGravatar, UpdatedGravatar } from "../generated/Gravity/Gravity";
import { Gravatar } from "../generated/schema";

export function handleNewGravatar(event: NewGravatar): void {
  let gravatar = new Gravatar(event.params.id.toHex());
  gravatar.owner = event.params.owner;
  gravatar.displayName = event.params.displayName;
  gravatar.imageUrl = event.params.imageUrl;
  gravatar.save();
}

export function handleUpdatedGravatar(event: UpdatedGravatar): void {
  let id = event.params.id.toHex();
  let gravatar = Gravatar.load(id);
  if (gravatar == null) {
    gravatar = new Gravatar(id);
  }
  gravatar.owner = event.params.owner;
  gravatar.displayName = event.params.displayName;
  gravatar.imageUrl = event.params.imageUrl;
  gravatar.save();
}
```

@tab:active SubQuery

```ts
// ******* SubQuery *******
import {
  NewGravatarLog,
  UpdatedGravatarLog,
} from "../types/abi-interfaces/Gravity";
import { Gravatar } from "../types";

export async function handleNewGravatar(event: NewGravatarLog): Promise<void> {
  let gravatar = new Gravatar(event.args.id.toHexString());
  gravatar.owner = event.args.owner;
  gravatar.displayName = event.args.displayName;
  gravatar.imageUrl = event.args.imageUrl;
  await gravatar.save();
}

export async function handleUpdatedGravatar(
  event: UpdatedGravatarLog
): Promise<void> {
  let id = event.args.id.toHexString();
  let gravatar = await Gravatar.get(id);
  if (gravatar == null || gravatar == undefined) {
    gravatar = new Gravatar(id);
  }
  gravatar.owner = event.args.owner;
  gravatar.displayName = event.args.displayName;
  gravatar.imageUrl = event.args.imageUrl;
  await gravatar.save();
}
```

:::

## Querying Contracts

We globally provide an `api` object that implements an [Ethers.js Provider](https://docs.ethers.io/v5/api/providers/provider/). This will allow querying contract state at the current block height being indexed. The easiest way to use the `api` is with [Typechain](https://github.com/dethcrypto/TypeChain), with this you can generate typescript interfaces that are compatible with this `api` that make it much easier to query your contracts.

You can then query contract state at the right block height. For example to query the token balance of a user at the current indexed block height (please note the two underscores in `Erc20__factory`):

```ts
// Create an instance of the contract, you can get the contract address from the Transaction or Log
// Note the two underscores __ in `Erc20__factory`
const erc20 = Erc20__factory.connect(contractAddress, api);

// Query the balance of an address
const balance = await erc20.balanceOf(address);
```

The above example assumes that the user has an ABI file named `erc20.json`, so that TypeChain generates `ERC20__factory` class for them. Check out [this example](https://github.com/dethcrypto/TypeChain/tree/master/examples/ethers-v5) to see how to generate factory code around your contract ABI using TypeChain

## GraphQL Query Differences

There are minor differences between the default GraphQL query service for SubQuery, and that of the Graph.

### Query format

Note the additional nesting of entity properties under the `nodes` syntax.

::: code-tabs

@tab SubGraph

```graphql
{
  exampleEntities {
    field1
    field2
  }
}
```

@tab:active SubQuery

```graphql
{
  exampleEntities {
    nodes {
      field1
      field2
    }
  }
}
```

:::

### Filters

Instead of `where`, SubQuery uses `filter`. The Graph also uses a list of suffixes on the end of the entity field for filtering, when using SubQuery, you will need to add an extra layer on the GraphQL to specify the operator for the filters.

::: code-tabs

@tab SubGraph

```graphql
{
  exampleEntities(where: { field1_is: "<value>" }) {
    field1
    field2
  }
}
```

@tab:active SubQuery

```graphql
{
  exampleEntities(filter: { field1: { equalTo: "<value>" } }) {
    nodes {
      field1
      field2
    }
  }
}
```

:::

### Sorting

Instead of using `orderBy` and `orderDirection`, SubQuery creates directional values for the `orderBy` property (e.g. `CREATED_AT_ASC` and `CREATED_AT_DSC`)

::: code-tabs

@tab SubGraph

```graphql
{
  exampleEntities(orderBy: "<field>", orderDirection: asc) {
    field1
    field2
  }
}
```

@tab:active SubQuery

```graphql
{
  exampleEntities(orderBy: "FIELD_1_ASC") {
    nodes {
      field1
      field2
    }
  }
}
```

:::

### Historical queries

There is no difference when querying [historical data](../run_publish/historical.md).

::: code-tabs

@tab SubGraph

```graphql
{
  exampleEntities(block: { number: 123 }) {
    field1
    field2
  }
}
```

@tab:active SubQuery

```graphql
{
  exampleEntities(block: { number: 123 }) {
    nodes {
      field1
      field2
    }
  }
}
```

:::

### Metadata

Subquery does not support historical metadata querying. However `deployments` will still show the deployments with their heights and other key metrics

::: code-tabs

@tab SubGraph

```graphql
{
  _meta(block: {number: <blockNumber>}) {
    block {
      hash
      timestamp
    }
    deployment
    hasIndexingErrors
  }
}
```

@tab:active SubQuery

```graphql
{
  _metadata {
    deployments
    indexerHealthy
  }
}
```

:::

#### Other changes

- SubQuery has a larger support for query pagination. You have the options of using `first` and `offset`, or `cursors` on `edges`.
- SubQuery supports [advanced aggregate functions](../../run_publish/aggregate.md) to allow you to perform a calculation on a set of values during your query.

## What's Next?

Now that you have a clear understanding of how to build a basic SubQuery project, what are the next steps of your journey?

Now, you can easily publish your project. SubQuery provides a free Managed Service where you can deploy your new project. You can deploy it to [SubQuery Managed Service](https://managedservice.subquery.network) and query it using our [Explorer](https://explorer.subquery.network). Read this complete guide on how to [publish your new project to SubQuery Projects](../run_publish/publish.md).

To dive deeper into the developer documentation, jump to the [Build ](../build/introduction.md) section and learn more about the three key files: **the manifest file, the GraphQL schema, and the mappings file.**

If you want to practice with more real examples, then head to our [Courses](../academy/academy.md) section and learn important concepts with related exercises and lab workbooks. Get access to readily available and open-source projects, and get a hands-on experience with SubQuery projects.

In the end, if you want to explore more ways to run and publish your project, refer to [Run & Publish section](../run_publish/run.md). Get complete information about all the ways to run your SubQuery project, along with advanced GraphQL aggregation and subscription features.

## Summary

As you can clearly see, it's only a small amount of work to migrate your SubGraphs to SubQuery. Once completed, you can take advantage of SubQuery's absolute performance. Now, start iterating and delivering faster with quicker sync times and indexing optimisations to ensure that you always have fresh data.

Moreover, SubQuery is multi-chain by design. Hence, the same project can be easily extended across chains and the SubQuery Network supports them all. Indexing across different chains is incredibly easy with SubQuery's unified design.

Finally, be assured that we're right behind you. Thousands of supporters and builders on our [Discord server](https://discord.com/invite/subquery) can provide you with the technical support that you need. Additionally, please reach out via support@subquery.network, we'd love to chat, hear what you're building, and work with you to make your migration easier.
