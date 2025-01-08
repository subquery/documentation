# How Rewards are Distributed

## Reward Sources

- [Reward for productive work](#rewards-for-product-work): This is the existing reward structures with the project with the various payment methods that we have pioneered, e.g. serving requests in valid service agreements or flex plans.
- [Network inflation rewards](#network-inflation-rewards): This is allocated to all Indexers for successfully running projects and serving requests.

In our vision, as the network matures, rewards for productive work will dominate Node Operator rewards. However, we understand that in the early days, we will leverage Network Inflation rewards to help bootstrap the network as applications get deployed and the end user base scales.

![Token economic flow](/assets/img/network/token_economy.png)

## Rewards for Product Work

In order to earn rewards from query revenue as a Node Operator, Node Operators only need to send an on-chain transaction to switch their service status on and stake a minimum amount of SQT. The Cobb-Douglas production function will be used to determine the rewards distributed to each Node Operator and to encourage a higher total stake.

There is a reward pool for each deployments Node Operator runs where the adjustment applies, then it goes to the Node Operator's final rewards pool, where all rewards like Close Agreement Reward, PAYG Reward and Allocation Reward eventually go to. At the moment, the total stake of Node Operator is used for all these pools. Note, for a [Closed Agreement](./payment-methods.md#closed-plans-and-agreements), the Cobb-Douglas production is not used to allocate rewards to Node Operators.

![Reward Pools](/assets/img/network/reward_pools.png)

## Stake Rewards

Some projects in our network are considered “Public Good” projects, for example; network dictionaries and the various SubQuery projects that the [official Network app](https://app.subquery.network) runs on. In these cases, we need to ensure Node Operators will run and host them, but generally there will be no single customer that will take the lead in financing these requests

Additionally, for Node Operators, running projects incurs significant costs. Without clear demand, Node Operators might not want to risk the time and resources to setup a new project.

The solution to this comes from network inflation as a reward source for Stake Rewards, in addition to rewards for productive work. We allow Consumers to use [Boosting](../consumers/boosting.md) to direct Stake Rewards, which distributed to Node Operators proportionally based on the total boosted SQT on their projects.

In order to receive Stake Rewards, Node Operators must be running a project that has a non-zero amount of consumer boosting, and be online/available to the public with a sync progress of 100%. Node Operators will not receive all of the Stake Rewards, some rewards are distributed to the Consumers that boosted the project, as described in [Consumer Boosting](../consumers/boosting.md#how-are-boosters-rewarded).

Stake Rewards are allocated to all project types supported by the SubQuery Network, e.g data indexing projects and RPC endpoints. The split of network inflation rewards between the Consumer that boosted the project, and the Node Operator may vary by project type.

The current inflation rate on the SubQuery Network can be found on our [network parameters page](../parameters.md). The majority of network inflation acts as Stake Rewards, while the remainder is allocated to the SubQuery Treasury to fund various programmes.

## Minimum Staking Requirements

The beauty of the Cobb Douglas equation (above) is that a rational Node Operator must maintain a stable level of staked SQT relative to the work they do in order in each reward pool in order to receive optimal rewards from either of the reward sources. As a result, the SubQuery Network does not need to enforce many arbitrary staking requirements because Node Operators are incentivised to self-manage and maintain a stake or skin in the game (we do enforce a [minimum Node Operator Stake however](../node_operators/stake.md#how-much-sqt-should-you-stake)).

SubQuery does require Node Operator must allocate their staked and delegated SQT on the deployment they run, so they can earn Allocation Rewards. When a Node Operator's stake decreases beneath the amount they have allocated, they will stop earning Allocation Rewards until they either increase their stake or reduce the allocated SQT to recover from this status.

:::warning

Delegated SQT to a Node Operator do not count towards the Node Operators minimum staking requirements

:::

If a Node Operator is caught misbehaving (such as by providing invalid, incomplete, or incorrect data), they are liable to have a portion of their staked SQT (on the particular reward pool ip) reallocated to the SubQuery Foundation Treasury, diminishing their holdings of staked SQT in the network and therefore their potential reward. Since the Node Operator's allocated stake is determined by a percentage of their total SQT, this will have a flow on effect to all other reward pools that the Node Operator is party to.
