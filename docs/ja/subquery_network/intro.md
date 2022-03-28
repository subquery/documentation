# Introduction

SubQuery’s mission is to make the world’s decentralised data more accessible. SubQuery is a leading data indexer that aggregates and organises data from Polkadot and other layer 1 networks, serving up structured data for developers to use for a wide array of projects. Operating between layer-1 blockchains and decentralised apps (dApp), the SubQuery service allows developers to focus on their core use case and front-end, without needing to spend unnecessary time on building a custom backend for data processing.

SubQuery proposes to enable every blockchain developer to process and query their data in a completely decentralised way. 

## Motivation

A core weakness of blockchain data (and decentralised data in general) is the relatively poor and inefficient performance of processing and querying the data. Due to the way that decentralised data is stored (imagine a chain of pages in a book with some data, each pointing to the next page), answering common questions like how many tokens are in a given wallet is notoriously difficult. You either must traverse through every transaction since the genesis block,  or you need to index and transform the data. 

To build increasingly complex and intuitive applications, developers need more powerful tools to process and query their data faster. Enter SubQuery. SubQuery is an open-source project that allows developers to index, transform, and query Substrate chain data (and eventually multi-chain data) to power their applications.

## Network Participants

The SubQuery network contains three main network participants

Consumers: Consumers make requests to the SubQuery network for specific data and pay an advertised amount of SQT.

Indexers: Indexers host SubQuery Projects in their own infrastructure, running both the node and query service to index data and answer GraphQL requests.

Delegators: Delegators participate in the network by supporting their favourite Indexers to earn rewards.