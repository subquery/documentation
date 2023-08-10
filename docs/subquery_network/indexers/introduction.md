# Introduction to Indexers

## What is an Indexer?

An Indexer is a SubQuery network participant who is responsible for indexing blockchain data and providing this data to their customers.

Indexers play a very important role within the SubQuery network. As a part of a data-as-a-service business, an Indexer turns computational and networking power into profits.

## Requirements to be an Indexer

To become an Indexer on the SubQuery Network, the Indexer must possess the necessary hardware, run the required SubQuery services, have a publicly accessible network via a static IP or a domain name, and register as an Indexer.

### Indexer skillset

In general, an Indexer should be a technically proficient computer user. However, the simplicity of the SubQuery network and proposed frameworks allows even a junior developer to successfully participate.

A basic user should be familiar with provisioning and managing servers, installing the SubQuery CLI tools, database management, and basic networking. More experienced users may run nodes in a clustered environment, incorporate monitoring and alerts and also more advanced networking management.

Finally, interested parties should be prepared to invest time in maintaining their indexing nodes and infrastructure.

### Staking requirements

Indexers are expected to stake and maintain a minimum amount of tokens. This is to ensure that Indexers have some skin in the game and are committed to supporting the network. SubQuery is yet to determine this but it is one of our [design philosophies](../design/design-philosophy.md) that this be as low and as accessible as possible.

Should an Indexer experience a slashable event and their staked SQT balance fall below the minimum required, they will have to top up their staked SQT in order to continue to earn rewards from their work.

### Hardware requirements

Indexers can either invest in their own infrastructure hardware or rent infrastructure from the likes of AWS, Google Cloud, Digital Ocean, Microsoft Azure etc.

### Maintenance/operational requirements

Here are some of the maintenance and/or operational requirements Indexers should expect:

- Always upgrade to the latest Subquery software version.
- Identify and take advantage of new indexing opportunities.
- Update project version to latest and reindex where necessary.
- Infrastructure maintenance:
  - Constantly monitoring and upsizing disk.
  - Right size query and indexing compute based on traffic.
  - Increase query services for increasing ingress traffic.

### Infrastructure

The minimum infrastructure requirement includes:

- At least one computational node to run the following services:
  - [Node (indexing) Service](https://www.npmjs.com/package/@subql/node).
  - [Query Service](https://www.npmjs.com/package/@subql/query).
  - [Indexer Coordinator Service](https://www.npmjs.com/package/@subql/indexer-coordinator).
- One database node to run Postgresql db (v12 and above).

More detailed information will come soon.

## Risk of being an Indexer

There are a few risks of being an Indexer.

- Infrastructure investment risk. An Indexer needs to invest in hardware infrastructure which is an upfront cost. However, many infrastructure provides such as AWS provide monthly payments, as opposed to yearly contracts, and the ability to scale servers up and down based on demand. This significantly reduces the risk for an Indexer.
- Lack of customers. This risk is inherent in any business opportunity and the traditional risk mitigation methods apply here. Indexers can adjust their price to be competitive, advertise their services, and build a solid reputation within the community by contributing to forums and helping others.
