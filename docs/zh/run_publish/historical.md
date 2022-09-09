# 自动化历史状态跟踪

## 背景

SubQuery 允许您从 Substrate, Avalance 和其他网络索引您想要的数据。 目前，SubQuery是一个可变的数据存储，您可以在那里附加、更新、删除， 或以其他方式更改在 SubQuery 索引的数据集中已保存的实体。 由于SubQuery索引每个区块，每个实体的状态可以根据您的项目逻辑更新或删除。

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

## 查询历史状态

GraphQL实体过滤器上有一个特殊(可选)属性，名为 `blockheight`。 如果您省略了此属性，SubQuery将查询当前区块高度的实体状态。

请查看我们的一个示例项目： [RMRK NFT](https://explorer.subquery.network/subquery/subquery/rmrk-nft-historical)。

要在方块高度500,000,000,000时查询RMRK NFT的所有者，请添加如下方块高度参数：

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

要查询这些RMRK NFT集合的所有者在最晚的区块高度时，省略下面显示的区块高度参数。

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