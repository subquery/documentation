# Frequently Asked Questions

## General

### What is blockchain data indexing?

Blockchain indexing is simply the process of trying to access data on the blockchain in a very fast and efficient manner. Blockchain indexers scan the blockchain for only the relevant data required by an application and then stores this in a database. This makes retrieval of blockchain data orders of magnitude faster because firstly only a subset of the blockchain data is processed and secondly, traditional database indexing techniques are applied.

[101 indexing video](https://www.youtube.com/watch?v=eOYaDDIL3Yg)

### What is SubQuery Indexer SDK?

SubQuery Indexer SDK is an open source flexible data indexing framework to take any data from a blockchain network, process it, and save it to a postgres database.

### What is the best way to get started with SubQuery SDK?

The best way to get started with SubQuery is to follow our [quick start guides](../quickstart/quickstart.md) for your chosen network. They give you a good run through of how SubQuery works, and how you can get started.

You can also find ready-made quickstart guides and starter projects on the dedicated [supported network page](https://subquery.network/networks).

### How can I contribute to SubQuery?

We love contributions and feedback from the community. To contribute the code, fork the repository of your interest and make your changes. Then submit a PR or Pull Request. Don't forget to test as well. Also check out our [contributions guidelines](../miscellaneous/contributing.html).

### How can I run my SubQuery Indexer Project

SubQuery is open-source, meaning you have the freedom to run it in the following three ways:

- Locally on your own computer (or a cloud provider of your choosing), [view the instructions on how to run SubQuery Locally](../run_publish/run.md)
- By publishing it to our enterprise-level [Managed Service](https://managedservice.subquery.network), where we'll host your SubQuery project in production ready services for mission critical data with zero-downtime blue/green deployments. We even have a generous free tier. [Find out how](../run_publish/publish.md)
- By publishing it to the decentralised [SubQuery Network](https://subquery.network/network), the most open, performant, reliable, and scalable data service for dApp developers. The SubQuery Network indexes and services data to the global community in an incentivised and verifiable way. [Read more](../../subquery_network/architects/publish.md)

### Do you support Bitcoin?

We don't (yet) support Bitcoin. The supported networks are listed [here](https://subquery.network/networks).

### Why SubQuery instead of the Graph?

See [Graph Migration](./graph-migration.md). Building with SubQuery is a similar developer experience, while providing up to 3.9x indexing speeds, multi-chain indexing, wider chain support, and more flexibility with mapping functions. It is so similar, you can easily migrate your existing subgraphs.

# Migrating to version 3.0 of the SubQuery SDK

Version 3.0 adds some major improvements to SubQuery's SDK that have been requested and developed in partnership with key customers in the SubQuery ecosystem.

### Changes to tsConfig

Firstly, we have moved some components to a new `subql-core` library (`logger` and others). You will need to update your `tsconfig.json` to look like the following:

**Note, replace `node_modules/@subql/types-ethereum/dist/global.d.ts` with whatever chain you are indexing, e.g. `types-ethereum`, `types-cosmos`, `types-algorand` `types-near` etc. For Polkadot, we use just `types` (not `types-polkadot`)**

```json
  ...
  "include": [
    "src/**/*",
    "node_modules/@subql/types-core/dist/global.d.ts",
    "node_modules/@subql/types-ethereum/dist/global.d.ts"
  ],
```

### Typescript Manifest

With the number of new features we are adding to SubQuery, and the slight differences between each chain that mostly occur in the manifest, we looked for a way to make it easier for developers to understand, try out new features and push the boundaries of what they index. Rather than a complex `yaml` file that is easy to make errors in, we’ve decided to embrace the safety of Typescript.

The manifest from version 3 is now written in Typescript by default, which includes better type safety, more advanced settings, and documentation to make it easier for developers to update and edit without having to consult our documentation. This step makes the development experience easier for developers of SubQuery, and also improves the discovery and documentation of new features and configuration options, it’s a relatively major change to our SDK that is surprisingly easy to make to your projects. For example, with typescript in your favourite code editor, you can see documentation and types for each field as you code your manifest file - easy!

You can see examples of the new manifest in the Build > Manifest section of this documentation, for example; [Ethereum](../build/manifest/ethereum.md), [Cosmos](../build/manifest/cosmos.md), and [Polkadot](../build/manifest/polkadot.md).

For Cosmos projects, in the new Typescript manifest, `chainTypes` have been renamed to `chaintypes`.

## Indexing

### Inserting Seed Data at Project Initiation

Some customers would like to insert specific data into the store, or initiate the database state correctly, when they start their project and begin indexing for the first time.

The best way to do this is use a combination of `startBlock`, `endBlock`, and a block handler like as follows in your project manifest. In the below example, the `initiateStoreAndDatabase` mapping function will be run once and once only on block 320 (this could be the block that your contract was deployed on):

```ts
{
  dataSources: [
    {
      // Project initiation/genesis datasource
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 320, // Set this and the endBlock to whatever block you want it to be run on
      endBlock: 320,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Block,
            handler: "initiateStoreAndDatabase",
          }
        ],
      },
    },
    // Add other handlers for regular indexing after this
    {
      ...
    }
  ],
}
```

### How can I optimise my project to speed it up?

Performance is a crucial factor in each project. Fortunately, there are several things you can do to improve indexing speed and query speed.

You can find our indexing speed recommendations in the [Project Optimisation](../build/optimisation.md) and recommendations for better query performance in [Running High Performance SubQuery Infrastructure](../run_publish/optimisation.md).

### Is it possible to create entity based on number of blocks since the last snapshot OR based on amount of time passed since the last snapshot?

Index data based on a number of blocks since an event is hard since there is no specific event at that point in time to index from. The only way to do something like this is when the event occurs, make a note of it at the block height, and then periodically using the block handler (e.g. once every 100 blocks), query for all notes that happened and then process them there. Make sure you use the modulo filter to avoid checking this at every block since that will slow down your project.

### Is it possible to trigger a mapping function on every N blocks?

There is a modulo indexer on our [block handlers](../build/manifest/ethereum.md#mapping-handlers-and-filters) that can be used to trigger a mapping function on every n blocks, or on any cron expression - if you are looking to have constantly refreshed prices after every 10 blocks for all known pools.

### Can I easily fetch all of any entity and iterate over to update many records?

See [Store](../build/mapping/store.md)

### Can I create/update multiple records in a single place?

See [Store](../build/mapping/store.md), which enables parallelised store operations, or `Promise.all(xx, yy)` that makes sense for performance

### What library do you use to query blockchain?

Our SDK is written in node.js, so we use the JS Libary to interact with the chain via the RPC endpoints

### How can I subscribe to a particular event?

See our docs on [subscriptions](../run_publish/query/subscription.md)

### Can SubQuery support off-chain/external data?

SubQuery has two different modes: safe and unsafe mode.

If you enable the [unsafe flag](../run_publish/references.md#--unsafe-query-service) then you can do just about anything, meaning you can add external/third party data if you like. Unsafe mode cannot be accommodated in the SubQuery Network (our decentralised network) because we want it to be deterministic i.e. two indexers get the exact same results which we can’t ensure with third party data.

### How do I get started with building my project?

We suggest starting with the starter project (i.e. [EVM](https://github.com/subquery/ethereum-subql-starter/), [Cosmos](https://github.com/subquery/cosmos-subql-starter/)), this will serve as a base for your project.

Then create your final data models using the `schema.graphql` files

Then write your address mapping handlers in `project.ts`

And finally convert your data types in each mapping function

### Is there a way to skip a block?

Refer to the [Bypass Block](../build/manifest/ethereum.md#bypass-blocks) configuration, such as for EVM. This feature is also available for all other supported architectures.

### What does an unhealthy indexer mean?

This could be for a number of reasons, we mark it unhealthy when the block number stops increasing. Feel free to share your project and we can take a look.

### What would be the process to add a new type and reindex past blocks?

If data for the new entity would need to be added from a certain block height, and this entity wouldn't have any relationship with other entities, and the project would have [historical state tracking](../run_publish/historical.md) enabled, then you could reindex to that height and simply update the deployment following the guide [Project Upgrades & Schema Migrations](../build/project-upgrades.md). Otherwise, you would have to index the new deployment from the start.

### Does SubQuery support integration with CloudFlare D1 database?

Not directly. but yes! SubQuery utilises Postgres databases for storing indexed data, but it can export the data in a format compatible with CloudFlare D1, specifically CSV. A helpful resource for BigQuery, another tool that utilizes CSV data - [Querying Data with BigQuery](../run_publish/query/other_tools/bigquery.md).

### Are there any other settings I should consider to improve the stability and repairability of this deployment?

You might find the following articles helpful:

- [Project Optimisation](../build/optimisation.md)
- [Running High Performance SubQuery Infrastructure](../run_publish/optimisation.md)

### Do you have any advice on building a large indexer? Should we break it down into smaller indexers and then merge them using ETL tools, or should we migrate and update the existing one?

SubQuery don’t yet support indexer composability, but it’s something the team is currently considering.

### Is reverse indexing supported, allowing me to start indexing from the later blocks back to the earlier ones?

No, this feature is not currently supported.

### Is it possible to subscribe to a query endpoint?

Yes, take a look at the [GraphQL Subsciption](./query/subscription.md) article for more information.

### What if I plan to index a blockchain that consists of multiple architecture layers, such as EVM and Substrate?

You can seamlessly index both layers by using the [Multi-chain indexing](../build/multi-chain.md) functionality.

### `atob is undefined` error

Be sure to add the following to `src/index.ts` before everything else is imported:

```js
import { atob } from "abab";
global.atob = atob;
```

### `Cannot find module 'http'` error

If you're encountering this issue, it's likely because you're trying to fetch external data in your mapping. Refer to the section on Third Party support ([Ethereum example](../build/mapping/ethereum.md#third-party-library-support---the-sandbox)) in the architecture mapping configuration guide, and make sure to enable the [`--unsafe`](../run_publish/references.md#--unsafe-node-service) flag.

### Do multi-chain projects support [upgrades](../build/project-upgrades.md)?

Yes, they do.

### `relation "public.subqueries" does not exist at character 23` error

Run `rm -rf .data` to clear out your local db and try again

## Managed Service

### Where can I find more inforrmation about Managed Services?

You can find information about Pricing and FAQs by following [this link](https://managedservice.subquery.network/pricing). Additional FAQs are listed below.

### How can I change the batch size in Managed Services?

In `managedservice.subquery.network` you can click on your project then on your deployment. Under advanced options you can change your batch size.

### In Managed Services do I need to reindex my project if I move it to dedicated database?

If we move your indexer projects to a dedicated database then you will need to reindex the projects - you can do this in the staging slot and then promote to prod once it’s ready to avoid any interruption.

### Do you offer SLA agreements?

SubQuery can offer SLAs for managed hosting across one or multiple projects over a specified period.

### Are you assisting with the migration from Managed Services to your own infrastructure or a decentralised network?

Yes, migration between all available deployment options is possible.
