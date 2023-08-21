# Subscriptions

## What is a GraphQL Subscription

SubQuery now also supports Graphql Subscriptions. Like queries, subscriptions enable you to fetch data. Unlike queries, subscriptions are long-lasting operations that can change their result over time.

Subscriptions are very useful when you want your client application to change data or show some new data as soon as that change occurs or the new data is available. Subscriptions allow you to _subscribe_ to your SubQuery project for changes.

::: tip Note
Read more about [Subscriptions](https://www.apollographql.com/docs/react/data/subscriptions/).
:::

## How to Subscribe to an Entity

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

The body of the entity in your query indicates what data you want to receive via your subscription when the `Transfer` table is updated:

- `id`: Returns the ID of the entity that has changed.
- `mutation_type`: The action that has been made to this entity. Mutation types can be either `INSERT`, `UPDATE` or `DELETE`.
- `_entity`: the value of the entity itself in JSON format.

## Filtering

We also support filter on subscriptions, which means a client should only receive updated subscription data if that data or mutation meets certain criteria.

There are two types of filters we are supporting:

- `id` : Filter to only return changes that affect a specific entity (designated by the ID).
- `mutation_type`: Only the same mutation type been made will return an update.

Assume we have an entity `Balances`, and it records the balance of each account.

```graphql
type Balances {
  id: ID! # someone's account, eg. 15rb4HVycC1KLHsdaSdV1x2TJAmUkD7PhubmhL3PnGv7RiGY
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

Note that the `mutation` filter can be one of `INSERT`, `UPDATE` or `DELETE`.

::: warning Important
Please note that you must enable the `--subscription` flag on both the node and query service in order to use these functions.
:::

## Using in the Managed Service

The managed service supports subscriptions for paid plans, you must enable subscription support when deploying your project in our service under "Advanced Settings"

::: warning Important
The subscription feature works on SubQuery's Managed Service when you directly call the listed GraphQL endpoint. It will not work within the in-browser GraphQL playground.
:::
