# Redefining Web3: SubQuery Network’s Bold Infrastructure Evolution

Back in December 2023, we announced the evolution of SubQuery, in which we aim to transition from simply indexing web3 data to pioneering a complete web3 infrastructure revolution.

Over the last year, as we’ve been building out our data indexing service and network, we realised our network is in a prime position to address broader centralisation issues throughout the web3 infrastructure landscape.

Our mission has expanded, and so has the opportunity space we’re going to be working in.

Read on to learn about the challenges we’re taking on and the next steps we’re taking to play a bigger role in decentralising the future.

### The Web3 Infrastructure Landscape

Web3 middleware services like indexers, RPCs, oracles and storage services are pivotal in blockchain dApp development. In fact, the utilisation of these middleware services is what sets apart successful, large-scale, production dApps - they accelerate performance and can scale to thousands of users, while providing a superior developer experience to bring in more users, TVL, and value. Indexers and RPCs shoulder the heavy lifting, standing as mission-critical services that underpin the functionality and efficiency of web3 applications.

![](https://lh7-us.googleusercontent.com/2lbQyLR4fxrgV2dTqljyFV6bECXrfq3anA2k_qM6gJuWdSN01dHrVjIFU6OZeFXXJv57dwaXNQ6_lKdGtLK9YDWr0EdS7yDDv0BwZfFXT_j6aw-iu7bDxIS5ZkgliPD2mY_l5kbJXGKEqI6OWuZIEwk)

**The current segregated web3 infrastructure landscape**

Data indexers (like SubQuery) speed up data retrieval, enhancing performance and response times for users. They also simplify data by transforming raw blockchain information into more digestible formats, facilitating efficient development and a smooth user experience.

Meanwhile, RPCs are pivotal for communication between blockchain nodes and external entities, facilitating data retrieval, smart contract interactions, and transaction submissions. Under the hood of your favourite dApp, tens of requests are passing through RPC providers to query and submit transactions to the network.

While these middleware services are integral to a successful dApp, there is a significant issue that needs to be addressed.

### Web3’s Dirty Little Secret

There is a hidden truth behind the mask of “decentralisation” most of these middleware services wear. The reality is that many leading dApps have a significant reliance on centralised middleware components. This centralisation poses a substantial threat to the envisioned unstoppability of a web3 future, at any given moment, a single entity can undermine supposedly decentralised applications.

Nowhere is this more apparent with RPC providers, and to a lesser extent, data indexers. These crucial services distinguish the scalable, reliable, and polished dApps from rudimentary applications that go without. But due to historical challenges in the process of decentralisation, for a long time, this has been a compromise most apps have accepted.

The call for decentralised alternatives to these pivotal middleware services is essential for the foundation of the next generation of dApps to build upon. We need to decentralise these services, without compromise.

### SubQuery Network Evolution Revealed

At the start we set out to create a viable decentralised solution to the data indexing problem.

Web3 developers face great difficulties aggregating and organising data to power dApps, and SubQuery has helped thousands of developers building the world's best and biggest networks, dApps, and analytics tools by providing fast and performant data indexing.

In 2022 we launched Kepler Network, a pre-mainnet release that enabled us to bootstrap the network sustainably by bringing onboard proficient indexers and projects. The success of Kepler lead to the realisation that the ecosystem we’ve built could bring benefits for more than just decentralised data indexing, but for middleware infrastructure as a whole. The key components of the network we have built and deployed - reward and pricing rails, service verification tools, and dispute resolution processes - are valuable for others verticals.

Knowing that the SubQuery Network could give our existing community of top node runners a solution to trustlessly receive rewards for running data indexing infrastructure, why couldn’t it work for those other services, for other parts of the dApp tech stack?

We realised the full potential of the SubQuery Network mainnet should not be limited to just data indexing; its fundamental contracts, tools, and reward flows enable it to be so much more. By harnessing the power of the existing participants and mechanisms, the SubQuery Network is ready to extend to various infrastructure verticals. It dawned on us that there is a massive opportunity ahead of us when we think holistically about the entire developer experience.

> With the launch of mainnet, the SubQuery Network will emerge as a solution to *decentralise everything*, revolutionising the entire developer experience in web3.

![](https://lh7-us.googleusercontent.com/fXK85pf2n1zTFAsbxyhYKk4I_negGP3mNvXP_vE-_k-ppDlNQeCUPc-iKG7b2HjaeBaisWhkdDqPL8SoQb0QHW6eHI4-5Bra1GK7hrfIhzx9SW1SWgVJ9Nces5Vfza3fwYNug_nduW_8HJ-XB8eZwig)

**The vision for SubQuery Network to encompass key web3 infrastructure components in a completely decentralised manner**

### Starting with RPCs

Our next step that we have completed is to decentralise the biggest infrastructure component for dApps - *Remote Procedure Call* or RPC services.

RPC services are still the main interface to the blockchain, under the hood of your favourite dApp, dozens of requests are passing through RPC providers to query and submit transactions to the network. They are the most critical part of the ecosystem, when one has an outage, [the effects reverberate across the industry](https://decrypt.co/47846/ethereum-backbone-infura-suffers-major-damage?ref=blog.subquery.network).

Since SubQuery relies on performant and scalable RPCs to maximise our indexing speed, we already work extremely closely with RPC providers. On our quest to index over [115+ chains and counting](https://subquery.network/networks?ref=blog.subquery.network), we’ve discovered that the RPC ecosystem is very fractured: some ecosystems have excellent support, and some don’t, and that makes delivering an excellent indexing experience across all chains difficult.

Across many smaller emergent networks, amateur RPC services operate to provide RPCs to various developers building on the network. These RPCs are usually run (at a loss) by the core network foundation team, and perhaps a collection of validators (for staking advertising purposes). Unfortunately for cost reasons, these RPCs are usually heavily pruned and rate limited, and have no upsell options for unrestricted access. As a result, dApp developers will often run a private RPC endpoint for their own use. This is expensive, frustrating, poses high barriers to entry, and results in no redundancy for dApp developers.

For more established networks, one or more commercial providers may come and offer a freemium service, where there is a free plan/public endpoint, and a paid upsell to higher scale access. This serves dApp developers well, but the law of economies of scale dictate that networks tend towards a small number of hyperscale RPC providers who centralise the network and cause major outages that affect thousands of dApps when they go offline. They also extract huge economic value from a network and send that directly to big private cloud companies and VCs.

We have built an alternative to these two dangerous equilibriums, and help decentralise everything. The SubQuery Network provides an open market for both data indexers and RPC providers and their consumers that:

- Maintains low barriers of entry: Any node operator can join as a provider for any service on any network.
- Incentivises performance and cost: Node operators are automatically rewarded with requests based on these metrics, driving these values across the network.
- Encourages constant expansion to new chains: Node operators are free to onboard new chains and projects for first mover advantage, constantly expanding the network.

### Enhancing RPCs - SubQuery’s Data Node

The performance limitations of data indexers and many other applications have long been limited by the RPC endpoint. Developers have long focussed on building nodes to ensure efficient validation to ensure the safety of the network. As a result of this sacrifice, RPCs are extremely costly and they’re not at all optimised for querying.

This is compounded by the rise of L2 chains where, with higher throughput, the query performance and cost are major outstanding issues to address. With limited querying capabilities, many don’t support complex querying languages or operations, making it inefficient to retrieve specific data.

We have delivered the SubQuery Data Node, an enhanced and heavily-forked RPC node that is perfectly optimised for querying, especially on endpoints like `eth_getLog`, and the ability to filter transactions in a single API call.

The Data Node is open source, allowing people to contribute, extend, or fork the implementation in any way. It supports leading layer-2s and other EVM networks initially, and they are optimised to run on the SubQuery Network in a decentralised way.

Working together, the SubQuery Indexer and SubQuery Data Node provides the most performant indexing performance possible and in a completely decentralised way thanks to the SubQuery Network.

Our node runners are able to run these data nodes on the network, bringing powerful and cost-effective RPC access to all, cementing SubQuery’s position as the fastest decentralised data indexer in web3.

### Democratising RPCs - SubQuery’s Sharded Data Node

In the final stage of our RPC journey, SubQuery will work to democratise RPCs (and solve [EIP-4444](https://eips.ethereum.org/EIPS/eip-4444?ref=blog.subquery.network)) in the process by delivering the Sharded Data Node, which will make RPCs cheaper to run and operate by node providers.

In the last few months we’ve spoken with many RPC providers in the ecosystem. In many networks (in particular Cosmos), small scale RPC services operate to provide RPCs to various developers building on the network. Unfortunately for cost reasons, these RPCs are usually heavily pruned and rate limited and have no upsell options for unrestricted access.

One of the key reasons for this is the sheer size of the node - an Ethereum archive requires about ~12 TB on Geth, an Osmosis archive is at least the same. This is an incredible cost that limits these nodes to large centralised infrastructure providers.

SubQuery recognises that in order to decentralised RPCs correctly, you need to be able to make running these nodes easier and more accessible to everyday users. Currently the storage is made smaller by “pruning” data, which is intentionally discarding older information while cryptographically confirming that the recent data that is valid. This works fine for writing transactions, but means that indexers and other services are unable to query old data.

SubQuery will extend its Data Node to support sharding, that is making each Data Node smaller by splitting up block ranges between node operators. Since SubQuery’s Data Node only runs within the boundaries of a specific block range, it does not need to constantly sync new data, allowing it to optimise further for query performance rather than validation and verification.

The SubQuery Sharded node won’t just shard historical data, but also shard the historical state within the node. By itself, this won’t change much, but these sharded nodes will be optimised to run on the network, and the network will be designed to combine all these shards to expose a single unified endpoint that appears to cover the entire historical state of the chain. Developers will benefit from the entire historical state of the given network, and node operators will benefit from significantly lower running costs, creating a more cost efficient network.

This is a revolutionary step forward for the RPC industry, and a potential solution to one of the great challenges facing older and larger blockchains with their state bloat size. This solution has the potential to help scale Ethereum, solve [EIP-4444](https://eips.ethereum.org/EIPS/eip-4444?ref=blog.subquery.network), and greatly support proliferation of Layer-2’s and rollups, while further democratising and decentralising the SubQuery Network.

### Summary

The future of SubQuery is not simply indexing web3 data, but pioneering a complete web3 infrastructure revolution. web3 middleware services like indexers and RPC providers are pivotal in blockchain dApp development, but there is a hidden truth behind the mask of “decentralisation” most of these middleware services wear. The reality is a significant reliance on centralised middleware components, which poses a substantial threat to the envisioned unstoppability of a web3 future.

Our mission has expanded, and so has the opportunity space we’re going to be working in. We need to decentralise these services, without compromise. We’ve already delivered breakthroughs in decentralised data indexing, but our next steps will focus on enhancing the performance of RPCs with the SubQuery Data Node, and then to bring RPCs to the masses, with SubQuery’s Sharded Data Nodes. These steps together, will help unlock the next level of performance increases in web3.

No other team today is better equipped at working to provide a holistic approach to solving this problem. In summary, our vision goes beyond data indexing; it's about revolutionising how data and infrastructure services are organised and accessed.

Pioneering fast, flexible, and scalable decentralised infrastructure, we will help power web3's transition to an open, efficient and user-centric future. Join us in this journey. With SubQuery, it's not just about building for today, but architecting a decentralised, inclusive future.

_Let's shape the future of web3, together._
