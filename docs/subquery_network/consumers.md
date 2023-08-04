# Consumers

## What is a Consumer?

A Consumer is a participant in the SubQuery network and is either an individual or organisation that pays for processed and organised blockchain data from the SubQuery Network. Consumers effectively make requests to the SubQuery Network for specific data and pay an agreed amount of SQT in return.

Consumers are typically dApp (decentralised application) developers, data analytic companies, blockchain networks, middleware developers, or even web aggregating companies that need access to blockchain data to provide services to their end-users.

## Requirements to be a Consumer

There are no requirements as such to become a SubQuery Consumer. However, Consumers will need to understand how to obtain SQT, how to advertise their data requirements and how to consume the JSON data returned.

Consumers may also need to understand how to create SubQuery projects to be Indexed or contract this work out in order to get the data in the format they need.

## Benefits of being a Consumer

There are numerous benefits of being a Consumer.

- Easy access to blockchain data. There is no need to learn about the intricacies of a blockchain. Just get access to the exact data you need to run your applications.
- Focus on developing your appplication, not on time consuming blockchain integration.
- Cost effective. Combining the two points from above, consuming data from SubQuery results in a very cost effective way to power your applications.

## Service Cost

The cost of querying data on the blockchain will be based on supply and demand and will be comparable to other similar services currently available. The advantage of an open and transparent network and ecosystem is that competition is encouraged to provide the best service to the Consumer.

## Payment options for Consumers?

For flexibility, Consumers have 3 payment options to pay for blockchain data. They are:

- Pay As You Go (PAYG)
- Closed Service Agreement
- Open Service Agreement

You can read more about the different payment methods, how they work, and the advantages/disadvantages on the [Payment Methods article](./payment-methods.md).

## FAQ

### As a Consumer, do I select 1 Indexer or multiple Indexers?

Unless a Closed Service Agreement is being used, there will be one or more Indexers indexing a SubQuery project. Consumers have the choice when deciding which Indexer to read data from. Typically Consumers would select the most reliable and lowest latency Indexer. Consumers could also incorporate automatic failover and read data from another Indexer if the first one times out or is not responsive.

### What happens if an Indexer goes offline?

Unless a Closed Service Agreement is being used, and if there is more than one Indexer indexing your SubQuery project, it would simply be a matter of switching to another Indexer. The ideal scenario would be include strategies like alert monitoring to be notified of potential issues and intelligent routing and caching.
