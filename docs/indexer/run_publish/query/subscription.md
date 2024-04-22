# GraphQL Subscriptions

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


## Server-side Implementation with Apollo Server
First, let's set up the server-side. This includes defining the subscription type, event type, setting up a publish/subscribe mechanism (using `PubSub` from `graphql-subscriptions`), and adding a resolver for the subscription.

Below is the basic, minimal example in Node.js. Refer to the official documentation for other supported technologies (for example, [Kotlin](https://www.apollographql.com/docs/kotlin/essentials/subscriptions) or [Swift](https://www.apollographql.com/docs/ios/tutorial/tutorial-subscriptions/))

```javascript
const { ApolloServer, gql, PubSub } = require('apollo-server');
const pubsub = new PubSub();

// GraphQL type definitions
const typeDefs = gql`
  type Balances {
    id: ID!
    amount: Int!
  }

  type BalanceUpdate {
    id: ID!
    mutation_type: String!
    _entity: String!
    amount: Int!
  }

  type Subscription {
    balances(id: ID!, mutation: String!): BalanceUpdate
  }
`;

// Resolvers define the technique for fetching the types defined in the schema
const resolvers = {
  Subscription: {
    balances: {
      subscribe: (_, { id, mutation }) => {
        const channel = `${mutation}_${id}`;
        return pubsub.asyncIterator(channel);
      },
    },
  },
};

// Create the Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
```

You would need to have the logic to publish events to this subscription, typically in your mutation resolvers or anywhere the balance changes.

Example publishing event:

```javascript

// Somewhere in your balance update business logic...
pubsub.publish(`UPDATE_${accountId}`, {
  balances: {
    id: accountId,
    mutation_type: 'UPDATE',
    _entity: 'Balances',
    amount: newBalance,  // assume newBalance is the updated balance
  }
});
```

Note that this example does not include error handling or authentication/authorization, which are essential for production applications.

### Client-side Implementation with React and Apollo Client

Now, let's move on to the client side where we will be using React and Apollo Client. We'll create a component that subscribes to the balance updates for a specific account.

First, ensure your project has the required dependencies: 

```bash
npm install @apollo/client graphql
```

Then, you can create a React component like this:

```javascript
import React, { useEffect } from 'react';
import { useSubscription, gql } from '@apollo/client';

const BALANCES_SUBSCRIPTION = gql`
  subscription BalancesSubscription($id: ID!, $mutation: String!) {
    balances(id: $id, mutation: $mutation) {
      id
      mutation_type
      _entity
      amount
    }
  }
`;

const BalanceUpdates = ({ accountId }) => {
  const { data, loading, error } = useSubscription(BALANCES_SUBSCRIPTION, {
    variables: { id: accountId, mutation: "UPDATE" },
  });

  useEffect(() => {
    if (data) {
      console.log('Received data:', data);
    }
  }, [data]);

  if (loading) return <p>Subscription is loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h4>Got balance update for wallet {accountId}</h4>
      {data && <p>New balance: {JSON.stringify(data.balances.amount)}</p>}
    </div>
  );
};

export default BalanceUpdates;
```

This React component uses `useSubscription` from Apollo Client to subscribe to the balance updates. Make sure your Apollo Client is properly configured to connect to your GraphQL server, and it supports WebSocket for subscriptions.

To connect to the server, typically, you would set up `ApolloClient` with something like this:

```javascript
import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: 'http://your-server.com/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'ws://your-server.com/graphql',
  options: {
    reconnect: true
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

```

This setup uses HTTP for queries and mutations, and WebSocket for subscriptions, switching automatically based on the operation type. For production readiness, consider adding logic in the client component to handle unsubscription or cleanup when the component unmounts or when the user navigates away.

::: warning Important
Please note that you must enable the `--subscription` flag on both the node and query service in order to use these functions.
:::

## Using in the Managed Service

The managed service supports subscriptions for paid plans, you must enable subscription support when deploying your project in our service under "Advanced Settings"

::: warning Important
The subscription feature works on SubQuery's Managed Service when you directly call the listed GraphQL endpoint. It will not work within the in-browser GraphQL playground.
:::
