# Publishing your Subgraph project to the SubQuery Network

We're building the most open, performant, reliable, and scalable data service for dApp developers. The SubQuery Network indexes and services data to the global community in an incentivised and verifiable way. After publishing your project to the SubQuery Network, anyone can index and host it - providing data to users around the world faster and reliably.

## Why you should publish your Subgraph project to SubQuery's Decentralised Network

The SubQuery Network is the future of web3 infrastructure, it allows you to completely decentralise your infrastructure stack. This provides the following benefits:

- Decentralise Everything - From SubQuery Indexed Data to RPC services and now Subgraphs, decentralise your whole infrastructure stack with a single network
- Unstoppable infrastructure - With almost 100 decentralised and geographically isolated Indexers providing data to your dApps, sleep safe knowing your infra will never go down.
- Superior performance - Since Indexers are all around the world, they're closer to your users. Lower latency and faster requests creates a better user experience for your users.
- Infinitely scalable - As your user base grows, more indexers will serve you data allowing you to infinitely scale without interruption.
- Seamless transition - We're here to help you migrate, and we've made it easy to integrate in your dApps with our network client SDKs.

**With the SubQuery Network, you can now go to your community and say with confidence _"our dApp is truly decentralised"._**

## Prerequisites for your Subgraph project running on the Network

1. The SubQuery Network does not support GraphQL subscriptions
2. Your project can generate stable proof of indexing results. Node Operator’s proof of indexing will be kept private
3. Your Subgraph deployment is published to IPFS

## Deploying your Subgraph Project

The SubQuery Network is a public permission-less network, anyone can deploy their project freely. To do so, head to the SubQuery Explorer and click "Publish New Project".

![Explorer - Publish Button](/assets/img/network/architect_publish.png)

You will need to publish your Subgraph project to IPFS first. Please enter the project CID and give your project a nice name.

![Publish - Enter CID and Name](/assets/img/network/architect_publish_subgraph.png)

On the next page you are asked to enter a project description, and also populate information about the project that Consumers or Node Operators might find interesting. This includes:

- a logo or image
- categories that the project can be classified by
- a website address for the project
- a link to where the source code can be found
- for the deployment
  - a version number, we recommend it follows [semantic versioning rules](https://semver.org/)
  - the deployment description, which might include additional information for Node Operators about migration steps or breaking changes in this version

Once entered, click "Publish" to publish your project, you will then be taken to a page to manage your project.

::: info How to encourage Node Operators to sync your project

At this stage you should reach out to Node Operators in our Discord to encourage them to start syncing it, once they do you will be able to create plans and start querying this data. You might also want to consider [boosting your project](../consumers/boosting.md) to incentivise Node Operators to do so, and in return receive free queries to it.

:::

## Managing Your Project

You can easily make changes to your project or deploy a new version by accessing the Managed Project page.

![Manage Existing Project](/assets/img/network/architect_manage_subgraph_project.png)

Firstly, you can publish a new version by clicking "Deploy New Version". This will let Node Operators know and allow them to upgrade to the new version of your Project. For the deployment you should provide:

- the deployment CID
- a version number, we recommend it follows [semantic versioning rules](https://semver.org/)
- check the box if you want to make this version recommended, this means that you are recommending Node Operators to immediately update to it. Don't check this if it's a test build or if it has major breaking changes
- the deployment description, which might include additional information for Node Operators about migration steps or breaking changes in this version

![Manage Existing Project - Deploy New Version](/assets/img/network/architect_manage_subgraph_project_deploy.png)

## Connect your dApp

To get started, create a Flex Plan and get your GraphQL endpoint [follow the guide here](../../consumers/plan.md)
