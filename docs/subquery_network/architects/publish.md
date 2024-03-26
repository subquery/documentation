# Publishing your Project to the SubQuery Network

We're building the most open, performant, reliable, and scalable data service for dApp developers. The SubQuery Network indexes and services data to the global community in an incentivised and verifiable way. After publishing your project to the SubQuery Network, anyone can index and host it - providing data to users around the world faster and reliably.

## Why you should publish your project to SubQuery's Decentralised Network

The SubQuery Network is the future of web3 infrastructure, it allows you to completely decentralise your infrastructure stack. This provides the following benefits:

- Unstoppable infrastructure - With almost 100 decentralised and geographically isolated Indexers providing data to your dApps, sleep safe knowing your infra will never go down.
- Superior performance - Since Indexers are all around the world, they're closer to your users. Lower latency and faster requests creates a better user experience for your users.
- Infinitely scalable - As your user base grows, more indexers will serve you data allowing you to infinitely scale without interruption.
- Seamless transition - We're here to help you migrate, and we've made it easy to integrate in your dApps with our network client SDKs.

**With the SubQuery Network, you can now go to your community and say with confidence _"our dApp is truly decentralised"._**

## Prerequisites for your project running on the Network

1.  The SubQuery Network does not support GraphQL subscriptions, so you can't enable the `--subscription` [command line argument](../../run_publish/query/subscription.md)
2.  Your client application (the one that will query data) must be able to run a JS library
3.  Your project can generate stable proof of indexing results. This means you should avoid:
    1.  Random ordered DB operations, e.g. avoid using `Promise.all()` in your mapping functions.
    2.  Introducing external data dependent on runtime, e.g. initialising a new current date using `new Date()`.
4.  Your project is published to IPFS, [follow the guide here](../../run_publish/publish.md#publish-your-subquery-project-to-ipfs).

## Deploying your Project

The SubQuery Network is a public permissionless network, anyone can deploy their project freely. To do so, head to the SubQuery Explorer and click "Publish New Project".

![Explorer - Publish Button](/assets/img/network/architect_publish.png)

You will need to publish your project to IPFS first, [follow the guide here](../../run_publish/publish.md#publish-your-subquery-project-to-ipfs). Please enter the project CID and give your project a nice name.

![Publish - Enter CID](/assets/img/network/architect_publish_ipfs.png)

On the next page you are asked to enter a project description, and also populate information about the project that Consumers or Node Operators might find interesting. This includes:

- a logo or image
- categories that the project can be classified by
- a website address for the project
- a link to where the source code can be found
- for the deployment
  - a version number, we recommend it follows [semantic versioning rules](https://semver.org/)
  - the deployment description, which might include additional information for Node Operators about migration steps or breaking changes in this version

Once entered, click "Publish" to publish your project. You will then be taken to a page to manage your project.

## Managing Your Project

You can easily make changes to your project or deploy a new version by accessing the Managed Project page.

![Manage Existing Project](/assets/img/network/architect_manage_project.png)

Firstly, you can publish a new verison by clicking "Deploy New Version". This will let Node Operators know and allow them to upgrade to the new version of your Project. For the deployment you shoud provide:

- the deployment CID, you will need to publish your project to IPFS first, [follow the guide here](../../run_publish/publish.md#publish-your-subquery-project-to-ipfs)
- a version number, we recommend it follows [semantic versioning rules](https://semver.org/)
- check the box if you want to make this version recommended, this means that you are reccommending Node Operators to immediately update to it. Don't check this if it's a test build or if it has major breaking changes
- the deployment description, which might include additional information for Node Operators about migration steps or breaking changes in this version

![Manage Existing Project - Deploy New Version](/assets/img/network/architect_manage_project_deploy.png)

## Changes to your DApp

Your client application (the one that will query data from the Network) will need to use [Apollo Client](https://www.apollographql.com/docs/react/) as it's primary GraphQL Client. Apollo Client is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL. Use it to fetch, cache, and modify application data, all while automatically updating your UI.

Apollo Client helps you structure code in an economical, predictable, and declarative way that's consistent with modern development practices. The core `@apollo/client` library provides built-in integration with React, and the larger Apollo community maintains [integrations for other popular view layers](https://www.apollographql.com/docs/react/#community-integrations).

SubQuery builds and publishes an additional library called [ApolloLink](https://github.com/subquery/network-clients/tree/main/packages/apollo-links). This client will be used to instantiate the connection via Indexers and perform authentication with our SubQuery Network services. Please follow [usage](https://github.com/subquery/network-clients/tree/main/packages/apollo-links) and view [test cases](https://github.com/subquery/network-clients/blob/main/test/authLink.test.ts) in the repository.

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
