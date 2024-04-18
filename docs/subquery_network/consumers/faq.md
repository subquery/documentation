# Frequently Asked Questions

## As a Consumer, can I select 1 Indexer or multiple Indexers?

Depending on demand, there will often be multiple Indexers indexing a given SubQuery project and multiple RPC providers for each network. Consumers have the choice when deciding which Node Operator to make agreements with. Typically Consumers would select Node Operators from a combination of cost, reliability, and latency. Consumers could also incorporate automatic failover and read data from another Node Operator if the first one times out or is not responsive.

## What happens if a Node Operator goes offline?

Unless a Closed Service Agreement is being used, and if there is more than one Data Indexer/RPC provider serving your SubQuery project, it would simply be a matter of switching to another Node Operator. The ideal scenario would be include strategies like alert monitoring to be notified of potential issues and intelligent routing and caching.
