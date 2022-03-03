# Indexers

## What is an Indexer?

An Indexer is a SubQuery network participant who is responsible for indexing blockchain data and providing this data to their customers.

Indexers play a very important role within the SubQuery network. As a part of a data-as-a-service business, an Indexer turns computational and networking power into profits.

## How are Indexers rewarded?

Indexers are rewarded from query fees as well as from an Indexer’s Reward pool. 

### Query Fees

Indexers are rewarded the fees from Consumers for providing blockchain data that the Consumer has specified. An Indexer will receive all the fees if they are the only Indexer for a SubQuery project. Otherwise, the fees are split based on the amount of work performed (requests served) and the amount of delegation received. This split is determined by applying the Cobb-Douglas algorithm. 

### Indexer’s Reward Pool

This is a pool that is created from inflation that is allocated to the Treasure and managed by the Foundation. This pool will be used to help bootstrap the network until a critical mass of Consumers is reached. 

## Attracting Delegators

Indexers can increase their earning potential by attracting Delegators. Delegators are SQT token holders who can delegate their tokens to Indexers for additional rewards. Indexers use these additional tokens to increase the amount they allocate to projects of their choice. This allows Indexers to increase their earnings. 

Indexers set an Indexer’s Commission Rate (ICR) which is the percentage Indexers earn. The remaining is then shared amongst the Delegators. Therefore, Indexers need to decide on the proportion of profits an Indexer wishes to retain versus the amount to share with their Delegators. A lower ICR will be more attractive for Delegators. 

For example, Indexer A has set an ICR of 80% and has received SQT from 8 Delegators. This means that the 8 Delegators plus the Indexer itself, will be rewarded a share of the remaining 20% of what the Indexer has earned. The share will be split proportionally between them. Note that Delegators must have delegated their tokens for the entire Era to be eligible for these rewards. For more information on Delegators rewards, see xxxx

## Becoming an Indexer

To become an Indexer on the SubQuery Network, the Indexer must possess the necessary hardware, run the required SubQuery services, have a publicly accessible network via a static IP or a domain name, and register as an Indexer.

### Indexer skillset 

In general, an Indexer should be a technically proficient computer user. However, the simplicity of the SubQuery network and proposed frameworks allows even a junior developer to successfully participate. 

A basic user should be familiar with provisioning and managing servers, installing the SubQuery CLI tools, database management, and basic networking. More experienced users may run nodes in a clustered environment, incorporate monitoring and alerts and also more advanced networking management. 

Finally, interested parties should be prepared to invest time in maintaining their Indexing nodes and infrastructure.

### Staking requirements

Indexers are expected to stake and maintain a minimum amount of tokens that is soon to be announced.  This is to ensure that Indexers have some skin in the game and are committed to supporting the network.

Should an Indexer experience a slashable event and their staking balance fall below the minimum required, they will have to top up their balance in order to continue indexing. 

### Hardware requirements

Indexers can either invest in their own infrastructure hardware or rent from the likes of AWS, Google Cloud, Digital Ocean, Microsoft Azure etc. 

### Maintenance/operational requirements 

Here are some of the maintenance and/or operational requirements Indexers should expect:
* Always upgrade to the latest Subquery software version
* Database maintenance
    * Upsize disk
    * Upgrade nodes to higher spec
    * Increase reader nodes for increasing ingress traffics

### Infrastructure 
The minimum infrastructure requirement includes:
* One computational node to run subquery indexer coordinator services as well as subql core software to index and provide query service for one or more subquery projects
* One database node to run postgresql db.

More precise details will follow.

## Security & Performance considerations

Security and performance considerations are as follows.

### Operator Wallets

Secure storage of an Indexer’s wallet recovery seed phrase is highly recommended.

### Firewalls

Indexers need to keep security front of mind. Infrastructure security, in particular firewalls, should be implemented to prevent public exposure to personal ports. 

Secure passwords should be used by default and password rotations policies should be considered. 

### Indexer’s Performance

In order to generate desirable performances, Indexers need to consider various factors such as:

* the balance between their own stake and that of Delegators. 
* the type of contract being served. The Indexer will receive all the query fees if it is a closed contract. If it is open, then an Indexer’s reward will depend on how many other Indexers there are. 
* fulfilling of the Service Level Agreement (SLA) specifications (to avoid slashing penalties)
* the accuracy of the data being served to avoid slashing penalties

## Selecting SubQuery Projects

There are several indicators that an Indexer needs to consider when selecting a project to index.

### Query Fee

When a Consumer advertises a project, they ultimately specify how much they are willing to pay for a set volume of requests. The more a Consumer is willing to pay, the more attractive the project will be for an Indexer. 

### Staked Tokens

The amount of SQT staked to a project also serves as an indication of the popularity of a project. The more tokens staked to a project, the more popular it is perceived to be. 

### Project complexity

Projects will vary in computation requirements. Simple projects will only index a few parameters whereas more complicated projects will require more computation resources and more bandwidth. Indexers need to understand the complexity of the project and its hardware capabilities. 

### Other Indexers

Popular projects offering a high query fee that attract a large number of Indexers also implies that the rewards will be shared amongst more people. This means that a single Indexer’s share may be less than a less popular project with a slightly lower query fee but with far fewer Indexers. 

### Pricing Strategy

Indexers need to be aware of their operation cost and expected incomes to understand their break-even point. Some considerations are:
* How should Indexers set their plan prices? 
* At what price can Indexers accept a service agreement or not?

### Advertisements

Indexers need to advertise themselves to Delegators as well as Consumers. Indexers may do this from their own website, in the Subquery forums or any other places deemed necessary. Some examples of the information to provide are:
The background and experience of the Indexer or Indexer’s team
The hardware specification and current usage and why it provides superior performance
The customer support policy or SLA
Evidence of historical performances 

### Customer support

Indexers are highly encouraged to provide a communication method for its customers to report inavailability and also to provide feedback.