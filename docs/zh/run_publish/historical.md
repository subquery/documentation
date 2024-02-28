# 自动化历史状态跟踪

## 背景

SubQuery allows you to index any data that you want from Substrate, Avalanche, and other networks. 目前，SubQuery是一个可变的数据存储，您可以在那里附加、更新、删除， 或以其他方式更改在 SubQuery 索引的数据集中已保存的实体。 由于SubQuery索引每个区块，每个实体的状态可以根据您的项目逻辑更新或删除。

用于索引账户余额的基本SubQuery项目可能有一个看起来像以下的实体。

```graphql
type Person @entity {
  id: ID!
  type Person @entity {
  id: ID!
  accounts: [Account] 
}

type Account @entity {
  id: ID!
  publicAddress: String!
}
  publicAddress: String!
} # Alice's account address
  balance: BigInt
  transfers: [Transfer]
}
```

![历史索引](/assets/img/historic_indexing.png)

在上述示例中，Alice的DOT 平衡不断变化，并随着我们索引数据而变化。 `账户` 实体将更改 `余额` 属性。 一个基本的 SubQuery 项目，将帐户余额索引将丢失这个历史数据，并且只能存储当前索引块高度的状态。 例如，如果我们目前正在索引区块100，数据库中的数据只能代表Alice在第100区块上的帐户状态。

然后我们面临一个问题。 假定将数据索引到第200项时发生变化，我们如何查询第100项数据的状态？

## 自动化历史状态跟踪

SubQuery 现在实现所有新项目的历史状态跟踪自动化。 您可以在任何区块高度自动查询您的 SubQuery 项目的状态。 这意味着您可以建立允许用户返回的应用程序。 或显示您的数据状态如何随着时间的推移而变化。

简而言之，当您创建、更新或删除任何SubQuery实体时，我们将先前的状态存储在它有效的区块范围。 然后您可以使用相同的 GraphQL 端点和 API 从特定区块高度查询数据。

## 启用这个

对于至少以 `@subql/node@1.1.1` 和 `@subql/query1.1.0` 开始的所有新项目，此功能默认启用。 如果您想要将其添加到您现有的项目中， 更新 `@subql/node` and `@subql/quy` 然后用一个干净的数据库重建你的项目。

如果您想要出于任何原因禁用此功能，您可以在 `subql-node` 设置 `--disable-historical=true` 参数。

启动时，此功能的当前状态将被打印到控制台(`历史状态已启用`)。

If you are running your project locally using `subql-node` or `subql-node-<network>`, make sure you enable the pg_extension `btree_gist`

You can run the following SQL query:

```shell
CREATE EXTENSION IF NOT EXISTS btree_gist;
```

## 查询历史状态

GraphQL实体过滤器上有一个特殊(可选)属性，名为 `blockheight`。 如果您省略了此属性，SubQuery将查询当前区块高度的实体状态。

Please see one of our example projects: [RMRK NFT](https://github.com/subquery/tutorial-rmrk-nft).

要在方块高度500,000,000,000时查询RMRK NFT的所有者，请添加如下方块高度参数：

```graphql
query {
  nFTEntities(first: 5, blockHeight: "5000000") {
    nodes {
      id
      name
      currentOwner
    }
  }
}
```

要查询这些RMRK NFT集合的所有者在最晚的区块高度时，省略下面显示的区块高度参数。

```graphql
query {
  nFTEntities(first: 5) {
    nodes {
      id
      name
      currentOwner
    }
  }
}
```

## Reindexing with Historical Data

When you enable Automated Historical State Tracking, you can benefit from on demand partial reindexing from certain block heights. Например:

- You can subscribe to new events, transactions, or assets in your manifest file, then backtrack to when they were deployed and start reindexing from that block
- You could update your mapping files to add new logic to deal with a runtime change, and then backtrack to the block where the runtime change was deployed.
- _Coming Soon:_ You can update your schema and reindex from a certain block height to reflect those changes

You should see the new [-- reindex command in Command Line Flags](./references.md#reindex) to learn more about how to use this new feature.

You can also use the reindex feature in the [SubQuery Managed Service](https://managedservice.subquery.network).

## DB Schema

When the Automated Historical State Tracking is enabled, we make some key underlying changes to the DB tables to manage this for you automatically.

The below example shows the table of the `Account` entity provided before

```graphql
type Person @entity {
  id: ID!
  type Person @entity {
  id: ID!
  accounts: [Account] 
}

type Account @entity {
  id: ID!
  publicAddress: String!
}
  publicAddress: String!
} # Alice's account address
  balance: BigInt
  transfers: [Transfer]
}
```

| `id`      | `_id`                                  | `_block_range` | `balance` |
| --------- | -------------------------------------- | -------------- | --------- |
| `alice`   | `0e6a444d-cc33-415b-9bfc-44b5ee64d3f4` | `[0,1000)`     | `5`       |
| `alice`   | `943c3191-ea96-452c-926e-db31ab5b95c7` | `[1000,2000)`  | `15`      |
| `alice`   | `b43ef216-967f-4192-975c-b14a0c5cef4b` | `[2000,)`      | `25`      |
| `bob`     | `4876a354-bd75-4370-9621-24ce1a5b9606` | `[0,)`         | `15`      |
| `charlie` | `6e319240-ef14-4fd9-86e9-c788ff5de152` | `[1000,)`      | `100`     |
| ...       | ...                                    | ...            | ...       |

When the historical feature is enabled, the `id` field is no longer used as primary key for the database table, instead we automatically generate an unique GUID key `_id` for this row within the DB table.

The `_block_range` indicates the start to end block for this record using Postgres' [range type](https://www.postgresql.org/docs/current/rangetypes.html). For example, between block 0 to 999, `alice`'s `balance` is 5. Then from block 1000 to 1999, `alice`'s `balance` is 15.

`_id` and `_block_range` are not visible to end users via the query service (GraphQL API), they are internal datatypes automatically generated and handled by the query service.
