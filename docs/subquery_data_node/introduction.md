# Introduction

The performance limitations of data indexers and many other decentralised applications have long been limited by the RPC endpoint. Developers have long focussed on building nodes to ensure efficient validation to ensure the safety of the network. As a result of this sacrifice, RPCs are extremely costly and they’re not at all optimised for querying.

This is compounded by the rise of L2 chains where, with higher throughput, the query performance and cost are major outstanding issues to address. With limited querying capabilities, many don’t support complex querying languages or operations, making it inefficient to retrieve specific data.

**The SubQuery Data Node solves this**, its an enhanced RPC node that is perfectly optimised for querying, especially on endpoints like `eth_getLog`, and provides the ability to filter transactions in a single API call. The Data Node will be open source, allowing people to contribute, extend, or fork the implementation in any way. It will support leading layer-2s and other EVM networks initially, and they will be optimised to run on the SubQuery Network in a decentralised way.

Working together, the SubQuery Indexer and SubQuery Data Node will provide the most performant indexing performance possible and in a completely decentralised way thanks to the SubQuery Network. Our node runners will be able to run these data nodes on the network, bringing powerful and cost-effective RPC access to all, cementing SubQuery’s position as the fastest decentralised data indexer in web3.

## Networks Supported

SubQuery currently provides these Data Nodes:

- [geth](https://github.com/subquery/go-ethereum) (forked from [ethereum/go-ethereum](https://github.com/ethereum/go-ethereum))
  - Ethereum and testnets
- [op-geth](https://github.com/subquery/op-geth) (forked from [ethereum-optimism/op-geth](https://github.com/ethereum-optimism/op-geth))
  - Optimism and testnets
  - Base and testnets

### Releases

We aim to make releases in line with the official releases. These releases include linux binaries on the releases page for each repo as well as docker images. If you wish to run these on other platforms please checkout the source code and build for yourself.

## Differences from the original nodes

### Additional Data

In order to efficiently query transactions data the nodes will now build bloom filters for each block. This bloom data is based on transaction `to`, `from` and the first 4 bytes of `input`. On top of this there is also a bloombits indexer to increase the lookup performance of the bloom filters. This is effectively the same approach as what is used to filter logs but applied to transactions.

::: note

To give an indication of the amount of extra data this will store. At [Sepolia Block 4909273](https://sepolia.etherscan.io/block/0x52b5a4e702041b63d8e0b5ab9377bb6372921bd530825991dfc82e23c2af98bf) the ancients data added an additional 1.2Gb of storage for the bloom filters.

:::

### New RPCs

In order to make use of the new transaction data, new RPC methods have also been added. These allow querying transaction data as well as a combination of transaction and logs. [Learn more about new RPCs](./rpc.md).

### Differences while running the Data Node

Running SubQuery data nodes is the same as running the unforked nodes but there is an additional option for exposing the new RPCS. [Read more here](./run.md)

## Roadmap

### Sharded Data Nodes

Later, SubQuery will work to democratise RPCs (and [solve EIP-4444](https://blog.subquery.network/using-the-subquery-sharded-data-node-to-solve-eip-4444/?lng=en)) in the process by delivering the Sharded Data Node, which will make RPCs cheaper to run and operate by node providers. EIP-4444 focuses on the sheer size of the node - an Ethereum archive requires about ~12 TB on Geth. SubQuery believes that in order to drive decentralisation of RPCs, you need to be able to make running these nodes easier and more accessible to everyday users.

SubQuery will extend its Data Node to support sharding, that is making each Data Node smaller by splitting up block ranges between node operators. Since SubQuery’s Data Node only runs within the boundaries of a specific block range, it does not need to constantly sync new data, allowing it to optimise further for query performance rather than validation and verification.

Besides the standard RPC interface a normal RPC node and Data Node supports, A Sharded Data Node will also extend the Data Node to add endpoints that expose the block range of data/state it maintains. Significantly, the Sharded Data Node need not encompass historical chain state when functioning as a full node. This article, however, will exclusively discuss the Sharded Data Node in the context of an archive node.
