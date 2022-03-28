# Consumers

## What is a Consumer?

A Consumer is a customer in the SubQuery network and is either an individual or organisation that pays for curated blockchain data. Consumers effectively make requests to the SubQuery network for specific data and pay an agreed amount of SQT.

Consumers are typically app developers, dApp (decentralised application) developers, data analytic companies, middleware developers, or even web aggregating companies that need access to blockchain data to provide services to their end-users. 


## Consumer Requirements

There are no requirements as such to become a SubQuery Consumer. However, Consumers will need to understand how to obtain SQT, how to advertise their data requirements and how to consume the JSON data returned. 

Consumers may also need to understand how to create SubQuery projects to be Indexed or contract this work out. 


## Service Cost

The cost of querying data on the blockchain will be based on supply and demand and will be comparable to other similar services currently available. The advantage of an open and transparent network and ecosystem is that competition is encouraged to provide the best service to the Consumer. 


## Payment options for Consumers?

For flexibility, Consumers have 3 payment options to pay for blockchain data. They are: 



* Pay As You Go (PAYG)
* Closed Service Agreement
* Open Service Agreement


### PAYG

This is the baseline payment method and a fallback for others. Each Indexer will advertise their PAYG prices when registering their ability to serve requests for specific SubQuery Projects. 

Consumers making requests will have to lock the tokens necessary to make that request, and at the end of an Era, these tokens will be distributed to the Indexers based on the Cobb-Douglas production function.


### Closed Service Agreement

Closed Market Service Agreements represent an agreement between only 1 indexer and 1 consumer. It’s a direct relationship where all payment flows between the two parties for the work that is done. Closed Service Agreements allow Indexers to have confidence in the ROI when choosing to index a new SubQuery project, and allow consumers to quickly attract a new indexer to a new project.


### Open Service Agreement

Open Market Service Agreements are similar to Closed Market Service Agreements, but allow multiple Indexers to join and compete to provide data to the Consumer. An Open Market Service Agreement may start as a contract between 1 Consumer and 1 Indexer, but more parties may join the contract resulting in _n_ consumer and _n_ indexers. Each Open Market Service Agreement results in a new reward pool being created for that contract, and SQT is distributed amongst participating indexers by the Cobb-Douglas production function.


## SubQuery’s point of difference

SubQuery is different from other indexing providers in several ways. 

Simplicity: We focus on simplicity so we have less network participants making things easier to understand. 

Flexibility: We have a flexible payment system for Consumers who can choose an option to suit their needs. 


## FAQ


### As a Consumer, do I select 1 Indexer or multiple Indexers?

Unless a Closed Service Agreement is being used, there will be one or more Indexers indexing a SubQuery project. Consumers have the choice when deciding which Indexer to read data from. Typically Consumers would select the most reliable and lowest latency Indexer. Consumers could also incorporate automatic failover and read data from another Indexer if the first one times out or is not responsive. 


### What happens if an Indexer goes off line? 

Unless a Closed Service Agreement is being used, and if there is more than one Indexer indexing your SubQuery project, it would simply be a matter of switching to another Indexer. The ideal scenario would be include strategies like alert monitoring to be notified of potential issues and intelligent routing and caching 