# Introduction

SubQuery Data Nodes are the next piece of the SubQuery ecosystem. These nodes have additional features to make data more accessible by adding new RPCs for finding data. This includes being able to filter transactions as well as a unified way of filtering block data and selecting the data relevant to your use case.


## Networks Supported

SubQuery currently provides these Data Nodes:

* [geth](https://github.com/subquery/go-ethereum) (forked from [ethereum/go-ethereum](https://github.com/ethereum/go-ethereum))
  * Ethereum and testnets
* [op-geth](https://github.com/subquery/op-geth). (forked from [ethereum-optimism/op-geth](https://github.com/ethereum-optimism/op-geth))
  * Optimism and testnets
  * Base and testnets

## Differences from the original nodes

### Additional Data

In order to efficiently query transactions data the nodes will now build bloom filters for each block. This bloom data is based on transaction `to`, `from` and the first 4 bytes of `input`. On top of this there is also a bloombits indexer to increase the lookup performance of the bloom filters. This is effectively the same approach as what is used to filter logs but applied to transactions.


::: note

To give an indication of the amount of extra data this will store. At [Sepolia Block 4909273](https://sepolia.etherscan.io/block/0x52b5a4e702041b63d8e0b5ab9377bb6372921bd530825991dfc82e23c2af98bf) the ancients data added an additional 1.2Gb of storage for the bloom filters.

:::

### New RPCs

In order to make use of the new transaction data, new RPC methods have also been added. These allow querying transaction data as well as a combination of transaction and logs. Learn more about [New RPCs](./rpc.md).

## Running

Running SubQuery data nodes is the same as running the unforked nodes but there is an additional option for exposing the new RPCS. You can find the documentation for [Geth](https://geth.ethereum.org/docs/getting-started) and [OP-Geth](https://docs.optimism.io/builders/node-operators/overview)

These nodes need to be run as [archive nodes](https://geth.ethereum.org/docs/fundamentals/sync-modes#archive-nodes) to ensure the appropriate data is available. This means `--syncmode full --gcmode archive` flags need to be set. <!-- The node will throw an error if these are not set, and you should use the unforked versions of these nodes if you don't wish to have these settings. (TODO this error isn't currently thrown) -->

To enable the new RPCs, add the "subql" namespace to `--http.api` and `--ws.api` flags or in your toml config to enable these RPCs. E.g `--http.api="eth,net,web3,subql" --ws.api="eth,net,web3,subql"`



