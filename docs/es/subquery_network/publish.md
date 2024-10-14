# Publishing your Project to the SubQuery Network

:::warning

This guide is outdated as we have now moved to the mainnet. We will update it shortly with instructions on how anyone can submit a new project deployment to the SubQuery network.

:::

We're building the most open, performant, reliable, and scalable data service for dApp developers. The SubQuery Network indexes and services data to the global community in an incentivised and verifiable way. After publishing your project to the SubQuery Network, anyone can index and host it - providing data to users around the world faster and reliably.

The final phase before launching the SubQuery Network is deploying the Kepler Network. You can think of Kepler as a pre-mainnet, a controlled phase that will help us bootstrap the mainnet with participants and activity.

**Kepler is [already running today](https://kepler.subquery.network/) with a diverse set of Indexers from around the world. It powers many of our internal dictionary projects, as well as powering the Kepler application that participants use when engaging with the network. It has been production tested, and it's ready for your dApp.**

## Benefits of moving your project to SubQuery's Decentralised Network

The SubQuery Network is the future of web3 infrastructure, it allows you to completely decentralise your infrastructure stack. This provides the following benefits:

- Unstoppable infrastructure - With almost 100 decentralised and geographically isolated Indexers providing data to your dApps, sleep safe knowing your infra will never go down.
- Superior performance - Since Indexers are all around the world, they're closer to your users. Lower latency and faster requests creates a better user experience for your users.
- Infinitely scalable - As your user base grows, more indexers will serve you data allowing you to infinitely scale without interruption.
- Seamless transition - We're here to help you migrate, and we've made it easy to integrate in your dApps with our network client SDKs.

**With the SubQuery Kepler Network, you can now go to your community and say with confidence _"our dApp is truly decentralised"._**

## Prerequisites for your project running on Kepler

1.  Kepler does not support GraphQL subscriptions, so you can't enable the `--subscription` [command line argument](../run_publish/query/subscription.md)
2.  Your client application (the one that will query data from Kepler) must be able to run a JS library
3.  Your project can generate stable proof of indexing results. This means you should avoid:
    1.  Random ordered DB operations, e.g. avoid using `Promise.all()` in your mapping functions.
    2.  Introducing external data dependent on runtime, e.g. initialising a new current date using `new Date()`.

## Changes to your DApp

Your client application (the one that will query data from Kepler) will need to use [Apollo Client](https://www.apollographql.com/docs/react/) as it's primary GraphQL Client. Apollo Client is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL. Use it to fetch, cache, and modify application data, all while automatically updating your UI.

Apollo Client helps you structure code in an economical, predictable, and declarative way that's consistent with modern development practices. The core `@apollo/client` library provides built-in integration with React, and the larger Apollo community maintains [integrations for other popular view layers](https://www.apollographql.com/docs/react/#community-integrations).

SubQuery builds and publishes an additional library called [ApolloLink](https://github.com/subquery/network-clients/tree/main/packages/apollo-links). This client will be used to instantiate the connection via Indexers and perform authentication with our SubQuery Kepler network services. Please follow [usage](https://github.com/subquery/network-clients/tree/main/packages/apollo-links) and view [test cases](https://github.com/subquery/network-clients/blob/main/test/authLink.test.ts) in the repository.

```ts
import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { authHttpLink } from "@subql/apollo-links";
import fetch from "cross-fetch"; // Can be any HTTP library

const options = {
  authUrl: `http://example-url.com/token`,
  sk: "<insert secret key here>",
  indexer: "<insert indexer address here>",
  consumer: "<insert consumer address here>",
  chainId: 1287,
  deploymentId: "<insert deployment id here>",
  agreement: "<insert agreement id here>",
};

const link = await authHttpLink(options);
const client = new ApolloClient({
  cache: new InMemoryCache({ resultCaching: true }),
  link: from([authLink, new HttpLink({ uri, fetch })]),
});

const metadataQuery = gql`
  query Metadata {
    _metadata {
      indexerHealthy
      indexerNodeVersion
    }
  }
`;

await client.query({ query: metadataQuery });
```

## Cost

For the duration of the SubQuery Kepler Network, the SubQuery Foundation will charge 50% of the list price of the [SubQuery Managed Serivce](https://managedservice.subquery.network/pricing) for all customer projects hosted on the decentralised SubQuery Network.

The SubQuery Foundation will manage all kSQT token exchanges and distribute rewards to indexers and delegators.

## What's Next

If you're interested in moving your SubQuery project to the Kepler Decentralised Network please reach out to your SubQuery contact, or email [start@subquery.network](mailto:start@subquery.network).
