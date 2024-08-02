# Introduction to RPC Providers

## What is an RPC Provider?

An RPC Provider is a SubQuery network participant who is responsible for serving RPC queries for blockchain data to their customers.

RPC Providers play a very important role within the SubQuery network, they act as the main interface between dApps, indexers, and other consumers to the underlying data on the blockchain, and are also responsible for submitting transactions.

Running RPCs is also very easy if you are already familiar with them or already running one. You can quickly connect an existing RPC endpoint to the SubQuery Network if you are already running an RPC for another usecase (the RPC node does not need to be dedicated to the SubQuery Network).

## Requirements to be an RPC Provider

To become an RPC Provider on the SubQuery Network, the RPC Provider must possess the necessary hardware, run the required SubQuery services, have a publicly accessible network via a static IP or a domain name, and register as an RPC Provider.

### RPC Provider skillset

In general, an RPC Provider should be a technically proficient computer user. However, the simplicity of the SubQuery network and proposed frameworks allows even a junior developer to successfully participate.

A basic user should be familiar with provisioning and managing servers, installing the SubQuery Node Operator tools, RPC Node management, and basic networking. More experienced users may run nodes in a clustered environment, incorporate monitoring and alerts and also more advanced networking management.

Finally, interested parties should be prepared to invest time in maintaining their RPC nodes and infrastructure.

### Staking requirements

RPC Providers are expected to stake and maintain a minimum amount of tokens. This is to ensure that RPC Providers have some skin in the game and are committed to supporting the network. SubQuery is yet to determine this but it is one of our [design philosophies](../../introduction/design-philosophy.md) that this be as low and as accessible as possible.

Should an RPC Provider experience a slashable event and their staked SQT balance fall below the minimum required, they will have to top up their staked SQT in order to continue to earn rewards from their work.

### Hardware requirements

RPC Providers can either invest in their own infrastructure hardware or rent infrastructure from the likes of AWS, Google Cloud, Digital Ocean, Microsoft Azure etc.

### Maintenance/operational requirements

Here are some of the maintenance and/or operational requirements RPC Providers should expect:

- Always upgrade to the latest SubQuery software version.
- Identify and take advantage of new indexing opportunities.
- Update project version to latest and reindex where necessary.
- Infrastructure maintenance:
  - Constantly monitoring and upsizing disk.
  - Right size query and indexing compute based on traffic.
  - Increase query services for increasing ingress traffic.

### Infrastructure

The minimum infrastructure requirement includes:

- At least one computational node to run the following services:
  - RPC Node (this is different for each network).
  - RPC Coordinator Service.

More detailed information will come soon.

## Risk of being an RPC Provider

There are a few risks of being an RPC Provider.

- Infrastructure investment risk. An RPC Provider needs to invest in hardware infrastructure which is an upfront cost. However, many infrastructure provides such as AWS provide monthly payments, as opposed to yearly contracts, and the ability to scale servers up and down based on demand. This significantly reduces the risk for an RPC Provider.
- Lack of customers. This risk is inherent in any business opportunity and the traditional risk mitigation methods apply here. RPC Providers can adjust their price to be competitive, advertise their services, and build a solid reputation within the community by contributing to forums and helping others.
