# Indexers

## What is an Indexer?

An Indexer is a SubQuery network participant who is responsible for indexing blockchain data and providing this data to their customers.

Indexers play a very important role within the SubQuery network. As a part of a data-as-a-service business, an Indexer turns computational and networking power into profits.

## How are Indexers rewarded

Indexers are rewarded from query fees as well as from an Indexer’s Reward pool. 

### Query Fees
Indexers are rewarded the fees from Consumers for providing blockchain data that the Consumer has specified. An Indexer will receive all the fees if they are the only Indexer for a SubQuery project. Otherwise, the fees are split based on the amount of work performed (requests served) and the amount of delegation received. This split is determined by applying the Cobb-Douglas algorithm. 

### Indexer’s Reward Pool
This is a pool that is created from inflation that is allocated to the Treasure and managed by the Foundation. This pool will be used to help bootstrap the network until a critical mass of Consumers is reached. 

## Slashing (TBA)


## Purpose of Delegations in the Indexing process

The importance of delegated tokens in the SubQuery network and the Indexing process is great. The number of Delegators involved in the work of the network speaks about the reliability and capacity of the network. Delegations directly give an insight into how many people believe in that network and how many of them are ready to invest in the network's Indexers and contribute to the system. The more extensive the network of active Delegators, the larger the fund of delegated tokens and invested funds, indirectly increasing the stability of the network. Once an Indexer accepts delegations, the delegated tokens can be used to earn indexing rewards and query fees, which are split between the Indexer and the Delegators.

## Attracting Delegators
Indexers can increase their earning potential by attracting Delegators. Delegators are SQT token holders who can delegate their tokens to Indexers for additional rewards. Indexers use these additional tokens to increase the amount they stake on projects of their choice. This allows Indexers to increase their earnings. 

Indexers set an Indexer’s Commission Rate (ICR) which is the percentage Indexers earn. The remaining is then shared amongst the Delegators. Therefore, Indexers need to decide on the proportion of profits an Indexer wishes to retain versus the amount to share with their Delegators. A lower ICR will be more attractive for Delegators. 

For example, Indexer A has set an ICR of 80% and has received SQT from 8 Delegators. This means that the 8 Delegators will be rewarded a share of the remaining 20% of what the Indexer has earned. The share will be split proportionally between all 8 Delegators. Note that Delegators must have delegated their tokens for the entire Era to be eligible for these rewards. For more information on Delegators rewards, see xxxx

# Becoming an Indexer

## Who is suitable to become an Indexer?  
In general, an Indexer should be a technically proficient computer user. However, the simplicity of the SubQuery network and proposed frameworks allows even a junior developer to successfully participate. 

A basic user should be familiar with provisioning and managing servers, installing the SubQuery CLI tools, database management, and basic networking. More experienced users may run nodes in a clustered environment, incorporate monitoring and alerts and also more advanced networking management. 

Finally, interested parties should be prepared to invest time maintaining their Indexing nodes and infrastructure.

## Selecting SubQuery Projects
There are several indicators that an Indexer needs to consider when selecting a project to index.

### Query Fee
When a Consumer advertises a project, they ultimately specify how much they are willing to pay for a set volume of requests. The more a Consumer is willing to pay, the more attractive the project will be for an Indexer. 

### Staked Tokens
The amount of SQT staked to a project also serves as an indication of the popularity of a project. The more tokens staked to a project, the more popular it is perceived to be. 

### Project complexity
Projects will vary in computation requirements. Simple projects will only index a few parameters whereas more complicated projects will require more computation resources and more bandwidth. Indexers need to understand the complexity of the project and their hardware capabilities. 

### Other Indexers
Popular projects offering a high query fee that attract a large number of Indexers also implies that the rewards will be shared amongst more people. This means that a single Indexer’s share may be less than a less popular project with a slightly lower query fee but with far fewer Indexers. 
