# 订阅

## 什么是 GraphQL 订阅

SubQuery 现在已支持 Graphql 订阅。 像查询一样，订阅可以让您获取数据。 与查询不同的是，订阅是长期操作，可以随着时间的推移改变其结果。

当您想要您的客户端应用程序更改数据或在发生更改或有新数据时显示一些新数据时，订阅非常有用。 订阅允许您 *订阅* SubQuery项目进行修改。

[在此阅读更多关于订阅的信息](https://www.apollographql.com/docs/react/data/subscriptions/)

## 如何订阅

GraphQL订阅的基本例子是在创建任何新项目时发出通知。 在下面的示例中，我们订阅 `Transfer` 选项，并在此表有任何更改时收到更新。

您可以通过查询以下的 GraphQL 端点来创建订阅。 然后您的连接将订阅对 `Transfer` 项目表所作的任何更改。

```graphql
subscription {
  transfer {
    id
    mutation_type
    _entity
  }
}
```

The body of the entity in your query indicates what data you want to receive via your subscription when the `Transfer` table is updated:
- `id`: 返回已更改的项目的 ID
- `mutation_type`: 已经对这个选项进行了操作。 类型可以是 `INSERT`, `UPDATE` 或 `DELETE`
- `_entity`: 项目本身的值为 JSON 格式。

## 筛选

我们还支持对订阅进行过滤，这意味着客户端只有在数据或突变符合某些标准时才能收到更新的订阅数据。

我们支持的过滤器有两种类型：

- `id` : 过滤器仅返回影响到特定选项的更改(由ID指定)。
- `类型`: 只有相同的改动类型将返回一个更新。

假定我们有一个选项 `Balances`, 并且它记录每个账户的余额。

```graphql
type Balances {
  id: ID! # someone's account , eg. 15rb4HVycC1KLHsdaSdV1x2TJAmUkD7PhubmhL3PnGv7RiGY
  amount: Int! # the balance of this account
}
```

如果我们想订阅任何影响到特定帐户的余额更新，我们可以指定订阅筛选器如下：

```graphql
subscription {
  balances(
    id: "15rb4HVycC1KLHsdaSdV1x2TJAmUkD7PhubmhL3PnGv7RiGY"
    mutation: UPDATE
  ) {
    id
    mutation_type
    _entity
  }
}
```

请注意， `mutation` 过滤器可以是 `INSERT`, `UPDATE` 或 `DELETE`

**Please note that you must enable the `--subscription` flag on both the node and query service in order to use these functions.**

The subcription feature works on SubQuery's managed service when you directly call the listed GraphQL endpoint. It will not work within the in-browser GraphQL playground.
