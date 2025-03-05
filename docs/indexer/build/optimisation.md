# Project Optimisation

Performance is a crucial factor in each project. So, how to optimise your SubQuery project to speed it up?

Fortunately, there are several things you can do to improve indexing and query speed.

::: info Optimisation for Production Hosting

If you're looking for advice on how to run high performance SubQuery infrastructure in a production environment, please read [Running High Performance SubQuery Infrastructure](../run_publish/optimisation.md).

:::

## Common Issues and Top Suggestions

- Avoid using `blockHandlers` where possible. Using block handlers slows your project down as they can be executed with each and every block. Use them only if you need to and [consider adjusting project architecture](#review-project-architecture).
  - If you must use a block handler, ensure that you carefully optimise every code path called by it. As it will be executed on each block the total time that it might take will increase linearly as the chain grows.
  - Use a convenient `modulo` filter to run a handler only once to a specific block. This filter allows handling any given number of blocks, which is extremely useful for grouping and calculating data at a set interval. For instance, if modulo is set to 50, the block handler will run on every 50 blocks. It provides even more control over indexing data to developers.
- For all major chains we already [provide valid SubQuery dictionaries](https://github.com/subquery/templates/blob/main/dist/dictionary.json), but if you’re indexing a custom chain, you may want to implement your own [dictionary](../academy/tutorials_examples/dictionary.html#how-does-a-subquery-dictionary-work) project to speed up your indexer (we can help create one for your new network). You can see examples of how to create a dictionary in the [dictionary repository](https://github.com/subquery/subql-dictionary).
- Use the strictest possible filter conditions in your mapping handlers (within the project manifest) to reduce the number of events/transactions that need to be processed. Create filters as specific as possible to avoid querying unnecessary data.
- If your project contains only event/log handlers and you don't need the transactions data, you can use the `skipTransactions` flag which will skip fetching the transactions. (Only supported with Ethereum and Substrate SDKs).
- Set the start block in your project manifest to when the contract was initialised or, better yet, when the first event/transaction occurs.
- Use `node worker threads` to move block fetching and block processing into its own worker thread. It could speed up indexing by up to 4 times (depending on the particular project). You can easily enable it using the `-workers=<number>` flag. Note that the number of available CPU cores strictly limits the usage of worker threads. [Read more here](../run_publish/references.html#w-workers).

## Other Improvements

Here is the list of further suggestions for improvements of query and indexing performance.

### Indexing Performance Advice

- Add indexes to entity fields that you plan to filter or sort by for query performance, this is especially important for historical projects. Add the `@index` or `@index(unique: true)` annotation after any non-key field. Read more [here](../build/graphql.html#indexing-by-non-primary-key-field).

```shell
type Transaction @entity {
  id: ID! # Transaction hash
  value: BigInt!
  to: Account! # Foreign key field
  from: Account! # Foreign key field
  contractAddress: String! @index
}
```

- Use parallel/batch processing as often as possible.
  - Use `Promise.all()`. In case of multiple async functions, it is better to execute them and resolve in parallel.
  - If you want to create a lot of entities within a single handler, you can use `store.bulkCreate(entityName: string, entities: Entity[])`. You can create them in parallel, no need to do this one by one (see example below). Read more in our [advanced access to the store documentation](../build/mapping/store.html).
    - Use `api.queryMulti()` to optimise Polkadot API calls inside mapping functions and query them in parallel. This is a faster way than a loop.

```shell
  await Promise.all([
    store.bulkCreate("Event", events),
    store.bulkCreate("Extrinsic", calls),
  ]);
```

- Making API calls to query state or to third party APIs can be slow. You could try to minimise calls where possible and to use `extrinsic/transaction/event` data, or persist data in the store and only update it occasionally.

- We always recommend enabling a reverse lookup on an entity to a related entity. Attach `@derivedFrom` annotation to the field and point to its reverse lookup field of another entity. Read more [here](../build/graphql.html#reverse-lookups).

```shell
type Account @entity {
  id: ID!
  publicAddress: String!
  sentTransfers: [Transfer] @derivedFrom(field: "from")
  receivedTransfers: [Transfer] @derivedFrom(field: "to")
}

type Transfer @entity {
  id: ID!
  amount: BigInt
  from: Account!
  to: Account!
}
```

- Optimise your schema design, keep it as simple as possible.

  - Try to reduce unnecessary fields and columns.
  - Create indexes and reverse lookups as needed.

- Note that `JSON.stringify` doesn’t support native `BigInts`. Our logging library will do this internally if you attempt to log an object. We are looking at a workaround for this.

### Query Performance Advice

- [Cursor-based pagination](https://graphql.org/learn/pagination/#pagination-and-edges) is far more efficient compared to `first`/`offset`/`after` pagination
- Query only necessary fields from GraphQL.
- For large data tables, avoid querying `totalCount` without adding conditions.
- See also [restrict query complexity](../run_publish/run.md#restrict-query-complexity)

## Running High Performance SubQuery Infrastructure

There is more information focussed on the DevOps and configuration of [running high performance SubQuery projects here](../run_publish/optimisation.md).

## Review Project Architecture

If your project requires indexing all the blocks, transactions alongside more specific data, consider dividing it into separate SubQuery projects responsible for different data sources. If such separation is possible it can provide better development experience and efficient workflow. This decision can be compared to a design decision between micro-services and monolith project architecture.

We recommend this approach, because it takes time to index all the blocks and it can slow down your project significantly. If you want to apply some changes to your filters or entities shape you may need to remove your database and reindex the whole project from the beginning.

A common example is creating a large project that indexes everything so you can perform internal analysis on your contracts, and then much smaller and optimised project for indexing the key data for your dApp. The larger project that indexes everything might never change and so you can avoid costly reindexing, while the smaller optimised project will change as your dApp matures and can be reindexed much faster.

## Simplifying the Project Manifest

If your project has the same handlers for multiple versions of the same type of contract your project manifest can get quite repetitive. e.g you want to index the transfers for many ERC20 contracts.

Note that there is also [dynamic datasources](./dynamicdatasources.md) for when your list of addresses is dynamic (e.g. you use a factory contract).

In cases where there are a large number of contract addresses, but the list is static, you can simplify the manifest a couple of ways depending on whether you're using typescript or yaml. With typescript you can use functions as you would with any other typescript file. With yaml you can use [anchors](https://www.howtogeek.com/devops/how-to-simplify-docker-compose-files-with-yaml-anchors-and-extensions/).

::: code-tabs
@tab project.ts

```ts

const erc20Addresses = [
  "0x09395a2a58db45db0da254c7eaa5ac469d8bdc85",
  // Other contract addresses go here
];

const project: EthereumProject = {
  // ...The rest of your project manifest
  dataSources: [
    ...addresses.map(address => ({
      {
        kind: EthereumDatasourceKind.Runtime,
        startBlock: 1,

        options: {
          abi: "erc20",
          address,
        },
        assets: new Map([["erc20", { file: "./abis/erc20.abi.json" }]]),
        mapping: {
          file: "./dist/index.js",
          handlers: [
            {
              kind: EthereumHandlerKind.Event,
              handler: "handleLog",
              filter: {
                topics: [
                  "Transfer(address indexed from, address indexed to, uint256 amount)",
                ],
              },
            },
          ],
        },
      }
    }))
    // Other data sources here
  ],
};

```

@tab project.yml

```yml
# The rest or your project yaml

x-erc20: &erc20
  kind: ethereum/Runtime
  startBlock: 10512216
  assets:
    erc20:
      file: ./abis/erc20.abi.json
  options:
    abi: erc20
  mapping:
    file: ./dist/index.js
    handlers:
      - handler: handleLog
        kind: ethereum/LogHandler
        filter:
          topics:
            - Transfer(address indexed from, address indexed to, uint256 amount)

dataSources:
  # Repeat this with different addresses
  - <<: *erc20
    options:
      abi: erc20
      address: "0x09395a2a58db45db0da254c7eaa5ac469d8bdc85"
  # Other datasources here
```

:::
