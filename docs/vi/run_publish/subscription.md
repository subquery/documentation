# Các đăng ký

## Đăng ký GraphQL là gì

SubQuery hiện đang hỗ trợ Các Đăng ký Graphql. Giống như truy vấn, các đăng ký cho phép bạn lấy dữ liệu. Không giống như truy vấn, đăng ký hoạt động lâu dài, có thể thay đổi kết quả của chúng theo thời gian.

Subscriptions are very useful when you want your client application to change data or show some new data as soon as that change occurs or the new data is available. Subscriptions allow you to *subscribe* to your SubQuery project for changes.

[Đọc thêm về các đăng ký tại đây](https://www.apollographql.com/docs/react/data/subscriptions/)

## Làm thế nào để đăng ký một thực thể

The basic example of a GraphQL subscription is to be notified when any new entities are created. In the following example, we subscribe to the `Transfer` entity and receive an update when there are any changes to this table.

You can create the subscription by querying the GraphQL endpoint as follows. Your connection will then subscribe to any changes made to the `Transfer` entity table.

```graphql
subscription {
  transfer {
    id
    mutation_type
    _entity
  }
}
```

The body of the entity in your query indicates what data you want to recieve via your subscription when the `Transfer` table is updated:
- `id`: Trả về ID của thực thể đã thay đổi
- `mutation_type`: Hành động đã được thực hiện đối với thực thể này. Các kiểu đột biến có thể là `INSERT`, `UPDATE` hoặc `DELETE`
- `_entity`: giá trị của thực thể đó ở định dạng JSON.

## Filtering

We also support filter on subscriptions, which means a client should only receive updated subscription data if that data or mutation meets certain criteria.

There are two types of filters we are supporting:

- `id` : Filter to only return changes that affect a specific entity (designated by the ID).
- `mutation_type`: Only the same mutation type been made will return an update.

Assume we have an entity `Balances`, and it records the balance of each account.

```graphql
type Balances {
  id: ID! # someone's account , eg. 15rb4HVycC1KLHsdaSdV1x2TJAmUkD7PhubmhL3PnGv7RiGY
  amount: Int! # the balance of this account
}
```

If we want to subscribe to any balance updates that affect a specific account, we can specify the subscription filter as follows:

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

Note that the `mutation` filter can be one of `INSERT`, `UPDATE` or `DELETE`

**Please note that you must enable the `--unsafe` flag on both the node and query service in order to use these functions. [Đọc thêm](./references.md#unsafe-2). Lưu ý rằng lệnh `--unsafe` sẽ ngăn dự án của bạn được chạy trong SubQuery Network, và bạn phải liên hệ với bộ phận hỗ trợ nếu bạn muốn lệnh này được chạy với dự án của mình trong dịch vụ được quản lý của SubQuery ([project.subquery.network](https://project.subquery.network))**
