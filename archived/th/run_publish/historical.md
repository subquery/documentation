# Automated Historical State Tracking

## Background

SubQuery allows you to index any data that you want from Substrate, Avalanche, and other networks. Currently, SubQuery operates as a mutable data store, where you can append, update, delete, or otherwise change existing saved entities in the dataset that is indexed by SubQuery. As SubQuery indexes each block, the state of each entity may be updated or deleted based on your project's logic.

A basic SubQuery project that indexes account balances might have an entity that looks like the following.

```graphql
type Account @entity {
  id: ID! # Alice's account address
  balance: BigInt
  transfers: [Transfer]
}
```

![Historic Indexing](/assets/img/historic_indexing.png)

In the above example, Alice's DOT balance constantly changes, and as we index the data, the `balance` property on the `Account` entity will change. A basic SubQuery project that indexes account balances will lose this historical data and will only store the state of the current indexing block height. For example, if we currently index to block 100, the data in the database can only represent the state of Alice's account at block 100.

Then we are faced with a problem. Assuming the data has changed when indexing to block 200, how can we query the state of the data at block 100?

## Automated Historical State Tracking

SubQuery now automates the historical state tracking of entities for all new projects. You can automatically query the state of your SubQuery project at any block height. This means that you can build applications that allow users to go back in time, or show how the state of your data changes over time.

In short, when you create, update, or delete any SubQuery entity, we store the previous state with the block range that it was valid for. You can then query data from a specific block height using the same GraphQL endpoints and API.

## Enabling This

This feature is enabled by default for all new projects started with at least `@subql/node@1.1.1` and `@subql/query1.1.0`. If you want to add it to your existing project, update `@subql/node` and `@subql/query` and then reindex your project with a clean database.

If you want to disable this feature for any reason, you can set the `--disable-historical=true` parameter on `subql-node`.

On startup, the current status of this feature is printed to the console (`Historical state is enabled`).

If you are running your project locally using `subql-node` or `subql-node-<network>`, make sure you enable the pg_extension `btree_gist`

You can run the following SQL query:

```shell
CREATE EXTENSION IF NOT EXISTS btree_gist;
```

## Querying Historical State

There is a special (optional) property on the GraphQL entity filter called `blockHeight`. If you omit this property, SubQuery will query the entity state at the current block height.

Please see one of our example projects: [RMRK NFT](https://explorer.subquery.network/subquery/subquery/rmrk-nft-historical).

To query the owners of RMRK NFTs at block height 5,000,000, add the blockHeight parameter as shown below:

```graphql
query {
  nFTEntities(first: 5, blockHeight: "5000000") {
    nodes {
      name
      currentOwner
    }
  }
}
```

To query the owners of those RMRK NFTs collections at the latest block height, omit the blockHeight parameter as shown below.

```graphql
query {
  nFTEntities(first: 5) {
    nodes {
      name
      currentOwner
    }
  }
}
```

## Reindexing with Historical Data

When you enable Automated Historical State Tracking, you can benefit from on demand partial reindexing from certain block heights. ยกตัวอย่างเช่น:

- You can subscribe to new events, transactions, or assets in your manifest file, then backtrack to when they were deployed and start reindexing from that block
- You could update your mapping files to add new logic to deal with a runtime change, and then backtrack to the block where the runtime change was deployed.
- _Coming Soon:_ You can update your schema and reindex from a certain block height to reflect those changes

You should see the new [-- reindex command in Command Line Flags](./references.md#reindex) to learn more about how to use this new feature.
