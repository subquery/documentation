# Frequently Asked Questions

## As a Consumer, do I select 1 Indexer or multiple Indexers?

Unless a Closed Service Agreement is being used, there will be one or more Indexers indexing a SubQuery project. Consumers have the choice when deciding which Indexer to read data from. Typically Consumers would select the most reliable and lowest latency Indexer. Consumers could also incorporate automatic failover and read data from another Indexer if the first one times out or is not responsive.

## What happens if an Indexer goes offline?

Unless a Closed Service Agreement is being used, and if there is more than one Indexer indexing your SubQuery project, it would simply be a matter of switching to another Indexer. The ideal scenario would be include strategies like alert monitoring to be notified of potential issues and intelligent routing and caching.
