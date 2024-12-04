# Run your SubQuery Project

SubQuery is open-source and designed to be easy to run, meaning you have the freedom to run it a variety of ways.

In short, you will want reliable production ready hosting of your SubQuery project. Typically this means running three services in a stable way:

- A NodeJS indexer service (known as `subql-node`).
- A PostgreSQL database.
- A NodeJS query service (known as `subql-query` or our [subgraph compatible variant](./query/subgraph.md))

There are four key options for how you might run your SubQuery project

## Locally (Run it yourself)

Locally on your own computer (or a cloud provider of your choosing). There are two ways to run a project locally, using Docker or running the individual components using NodeJS services. [Read more](./run.md).

## Using the SubQuery Network

We're building the most open, performant, reliable, and scalable data service for dApp developers. The SubQuery Network indexes and services data to the global community in an incentivised and verifiable way. After publishing your project to the SubQuery Network, anyone can index and host it - providing data to users around the world faster and reliably. [Read more](../../subquery_network/architects/publish.md).

## Using SubQuery's Centralised Hosted Service

:::info SubQuery Managed Service is becoming the OnFinality Indexer Service

At SubQuery, our mission has always been to lead the way in decentralising the future. To remain focused on this mission, we’re excited to announce that OnFinality, a leader in blockchain infrastructure management, will be taking over the day-to-day operations of the SubQuery Managed Service.

Read more about this change and how it might affect you [https://documentation.onfinality.io/support/subquery-managed-service-rebrand](https://documentation.onfinality.io/support/subquery-managed-service-rebrand)

:::

The biggest dApps depend on SubQuery's enterprise level Managed Service. With 100's of millions of daily requests and hundreds of active projects, SubQuery's Managed Service provides industry leading hosting for our customers.

By publishing it to our enterprise-level [Managed Service](https://managedservice.subquery.network), where we'll host your SubQuery project in production ready services for mission critical data with zero-downtime blue/green deployments. We even have a generous free tier. [Read more](./publish.md).

## Other Hosting Providers in the SubQuery Community

### Traceye

Traceye is another hosting option for SubQuery’s powerful data indexing solutions for many custom appchains & L2/L3 rollups. Traceye (built by ZEEVE) means developers now have more options for where to host their SubQuery project, while still taking advantage of SubQuery’s ultrafast indexing to keep their applications’ data current and responsive. Traceye offers high availability and 99.99% uptime, so you can trust that your data is always accessible, ensuring smooth operations without interruptions.

[Vist Traceye](https://traceye.io) or [read the docs](https://docs.zeeve.io/traceye/shared-indexing/hosted-subquery).
