# Subscriptions

### What is a subscription
SubQuery now also supports Graphql Subscriptions. Like queries, subscriptions enable you to fetch data. Unlike queries, subscriptions are long-lasting operations that can change their result over time.
[subscription](https://www.apollographql.com/docs/react/data/subscriptions/)


### How to subscribe to an entity

#### Example

For example, when need to subscribe an entity `Transfer` to get update when new balance transfer happened.
Create a subscription as following, and it will start listen any changes been made to this entity table.
```graphql
subscription{
  transfer{
    id,
    mutation_type
    _entity
  }
}

```
- id: an entity with `id` has made some mutation actions
- mutation_type: types of actions been made to this entity, the entity can be either `INSERT`, `UPDATE` and `DELETE`
- _entity: the entity itself in JSON format.

### Apply filter

We also support filter on subscriptions, which means a client should only receive updated subscription data if that data meets certain criteria.

There are two types of filters we are supporting:

- `id` : Filter the entity with its id, only records with the same id will return an update.
- `mutation_type`: only the same mutation type been made will return an update.

#### Example

Assume we have an entity `Balances`, and it records someone's account balances.

```graphql

type Balances{
    id:ID! # someone's account , eg. 15rb4HVycC1KLHsdaSdV1x2TJAmUkD7PhubmhL3PnGv7RiGY 
    amount: Int! # the balance of this account
}
```
Then if this account has already been created (`INSERT`), and it will never be removed (`DELETE`), but we want to get an update (`UPDATE`) of its balances changes.
```graphql
subscription{
    balances (id: "15rb4HVycC1KLHsdaSdV1x2TJAmUkD7PhubmhL3PnGv7RiGY", mutation: UPDATE){
        id,
        mutation_type
        _entity
    }
}
```

