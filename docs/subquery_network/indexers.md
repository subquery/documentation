# Indexers

## What is an Indexer?

An Indexer is a SubQuery network participant who is responsible for indexing blockchain data and providing this data to their customers.

Indexers play a very important role within the SubQuery network. As a part of a data-as-a-service business, an Indexer turns computational and networking power into profits.

## Indexer Staking

In order to earn rewards from query revenue as an Indexer it is proposed that Indexers must stake SQT against a particular SubQuery Project that they are providing the service to. The Cobb-Douglas production function will be used to determine the rewards distributed to each Indexer.

SubQuery plans to add a constraint to the network where an indexer must stake a minimum amount of SQT on the relevant reward pool to be able to participate in its matching Open Agreement. They must also stake a minimum amount on an equivalent staking contract for any Closed Agreements in the same fashion. This indexer staked minimum value must be a certain percentage of the Agreement’s per Era reward value, which means in order to renew the Agreement to higher volumes, the indexer must also increase their stake. When an indexer’s stake decreases beneath this minimum amount, they will be unable to renew the Agreement at the existing price.

If an Indexer is caught misbehaving (such as by providing invalid, incomplete, or incorrect data), they are liable to have a portion of their staked SQT (on the particular reward pool ip) reallocated to the SubQuery Foundation Treasury, diminishing their holdings of staked SQT in the network and therefore their potential reward. Since the indexer’s allocated stake is determined by a percentage of their total SQT, this will have a flow on effect to all other reward pools that the indexer is party to.

## How are Indexers rewarded?

Indexers are rewarded in SQT in two ways:
- Rewards from SQT reward pools based on distribution defined by the Cobb-Douglas Production Function
- Direct SQT query fee rewards from Closed Agreements that an indexer is party to

Indexers are rewarded the fees that Consumers pay for providing blockchain data that the Consumer has reqested. An Indexer will receive all the fees from a Closed Agreement. Otherwise, the fees are split based on the amount of work performed (requests served) and the amount of delegated SQT - this split is determined by applying the Cobb-Douglas Production Function.

There may be multiple reward pools simultaneously active for a given Indexer. The indexer’s job is to allocate their staked and delegated SQT amongst these pools (in terms of a percentage of their total SQT). There will be a reward pool for each project that the Indexer accepts PAYG, and a reward pool for each Market Agreement that the Indexer is a party of.

## Attracting Delegators

Indexers can increase their earning potential by attracting Delegators. Delegators are SQT token holders who can delegate their tokens to Indexers for additional rewards. Indexers use these additional tokens to increase the amount they allocate to projects of their choice. This allows Indexers to increase their earnings.

Indexers set an Indexer’s Commission Rate (ICR) which is the percentage Indexers earn. The remaining is then shared amongst the Indexer and all Delegators propotionally by staked/delegated amount. Therefore, Indexers need to decide on the proportion of profits an Indexer wishes to retain versus the amount to share with their Delegators. A lower ICR will be more attractive for Delegators.

For example, Indexer A has set an ICR of 80% and has received SQT from 8 Delegators. This means that the 8 Delegators plus the Indexer itself, will be rewarded a share of the remaining 20% of what the Indexer has earned. The share will be split proportionally between them. Note that Delegators must have delegated their tokens for the entire Era to be eligible for these rewards. For more information on Delegators rewards, see [Delegators](./delegators.md).

## Becoming an Indexer

To become an Indexer on the SubQuery Network, the Indexer must possess the necessary hardware, run the required SubQuery services, have a publicly accessible network via a static IP or a domain name, and register as an Indexer.

### Indexer skillset

In general, an Indexer should be a technically proficient computer user. However, the simplicity of the SubQuery network and proposed frameworks allows even a junior developer to successfully participate.

A basic user should be familiar with provisioning and managing servers, installing the SubQuery CLI tools, database management, and basic networking. More experienced users may run nodes in a clustered environment, incorporate monitoring and alerts and also more advanced networking management.

Finally, interested parties should be prepared to invest time in maintaining their indexing nodes and infrastructure.

### Staking requirements

Indexers are expected to stake and maintain a minimum amount of tokens. This is to ensure that Indexers have some skin in the game and are committed to supporting the network. SubQuery is yet to determine this but it is one of our [design philosophies](./design-philosophy.md) that this be as low and as accessible as possible.

Should an Indexer experience a slashable event and their staked SQT balance fall below the minimum required, they will have to top up their staked SQT in order to continue to earn rewards from their work.

### Hardware requirements

Indexers can either invest in their own infrastructure hardware or rent infrastructure from the likes of AWS, Google Cloud, Digital Ocean, Microsoft Azure etc.

### Maintenance/operational requirements

Here are some of the maintenance and/or operational requirements Indexers should expect:

- Always upgrade to the latest Subquery software version
- Identify and take advantage of new indexing opportunities
- Update project version to latest and reindex where necessary
- Infrastructure maintenance
  - Constantly monitoring and upsizing disk
  - Right size query and indexing compute based on traffic
  - Increase query services for increasing ingress traffic

### Infrastructure

The minimum infrastructure requirement includes:

- At least one computational node to run the following services:
  - [Node (indexing) Service](https://www.npmjs.com/package/@subql/node)
  - [Query Service](https://www.npmjs.com/package/@subql/query) 
  - [Indexer Coordinator Service](https://www.npmjs.com/package/@subql/indexer-coordinator)
- One database node to run Postgresql db (v12 and above).

More detailed information will come soon.

## Indexer Setup - TestNet

### Backgrounds
To operate a professional infrastructure is a sophisticated work, like what we did in our subquery hosted service.
But if it is just to run one or two projects, it is still manageable work for individuals. We provide a single node setup for small indexers,
that only requires a ec2 instance from aws.

### Launch AWS EC2 Instance
[see here](./testnet/aws-setup)

### Install Subquery Indexer Services
[click to check details](./testnet/install-subquery-services) Skip if SubQuery Indexer AMI is used



## Security & Performance considerations

Security and performance considerations are as follows.

### Operator Wallets

Secure storage of an Indexer’s wallet recovery seed phrase is highly recommended.

### Firewalls

Indexers need to keep security front of mind. Infrastructure security, in particular firewalls, should be implemented to prevent public exposure to personal ports.

Secure passwords should be used by default and password rotation policies should be considered.

### Indexer’s Performance

In order to generate desirable performances, Indexers need to consider various factors such as:

- the balance between their own stake and that of Delegators.
- the type of contract being served. The Indexer will receive all the query fees if it is a closed contract. If it is open, then an Indexer’s reward will depend on how many other Indexers there are.
- fulfilling of the Service Level Agreement (SLA) specifications (to avoid slashing penalties)
- the accuracy of the data being served to avoid slashing penalties

## Selecting SubQuery Projects to Index

There are several indicators that an Indexer needs to consider when selecting a SubQuery project to index.

### Query Fee Opportunities

Some projects will have open or closed plans advertised by consumers.

When a Consumer advertises an open or closed plan for a project, they ultimately specify how much they are willing to pay for a set volume of requests. The more a Consumer is willing to pay, the more attractive the project will be for an Indexer. It also provides confidence that there will likely be recurring revenue from this SubQuery project.

### Project complexity

Projects will vary in computation requirements. Simple projects will only index a few parameters whereas more complicated projects will require more computation resources and more bandwidth. Indexers need to understand the complexity of the project and its hardware capabilities.

### Indexer Competition

Popular projects offering a high query volume that attract a large number of Indexers. This also implies that the rewards will be shared amongst more people. A single Indexer’s share may be less than a less popular project with a slightly lower query fee but with far fewer Indexers.

### Pricing Strategy

Indexers need to be aware of their operation cost and expected incomes to understand their break-even point. Some considerations are:

- How should Indexers set their plan prices?
- At what price can Indexers accept a service agreement or not?

### Advertisements

Indexers need to advertise themselves to Delegators as well as Consumers. Indexers may do this from their own website, in the Subquery forums or any other places deemed necessary. Some examples of the information to provide are:

- The background and experience of the Indexer or Indexer’s team
- The hardware approach and why it provides superior performance
- The customer support policy or SLA
- Evidence of historical performances

### Customer support

Indexers are highly encouraged to provide a communication method for its customers to report inavailability and also to provide feedback.
