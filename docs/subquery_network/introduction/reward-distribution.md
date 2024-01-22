# How Rewards are Distributed

## Reward Sources

- [Reward for productive work](#rewards-for-product-work): This is the existing reward structures with the project with the various payment methods that we have pioneered, e.g. serving requests in valid service agreements or flex plans.
- [Network inflation rewards](#network-inflation-rewards): This is allocated to all Indexers for successfully running projects and serving requests.

In our vision, as the network matures, rewards for productive work will dominate Indexer rewards. However, we understand that in the early days, we will leverage Network Inflation rewards to help bootstrap the network as applications get deployed and the end user base scales.

![Token economic flow](/assets/img/network/token_economy.png)

## Rewards for Product Work

In order to earn rewards from query revenue as a Node Operator, Node Operators must stake SQT against a particular SubQuery Project or RPC endpoint that they are providing the service to. The Cobb-Douglas production function will be used to determine the rewards distributed to each Node Operator.

There may be multiple reward pools simultaneously active for a given Node Operator. The Node Operator's job is to allocate their staked and delegated SQT amongst these pools (in terms of a percentage of their total SQT). There will be a reward pool for each data Indexer project or RPC endpoint that the Node Operator accepts [Flex Plans](./payment-methods.md#flex-plans-pay-as-you-go--payg), and a reward pool for each Market Agreement that the Node Operator is a party of. For a [Closed Agreement](./payment-methods.md#closed-plans-and-agreements), the Cobb-Douglas production is not used to allocate rewards to Node Operators.

![Reward Pools](/assets/img/network/reward_pools.png)

## Network Inflation Rewards

Some projects in our network are considered “Public Good” projects, for example; network dictionaries and the various SubQuery projects that the [official Network app](https://kepler.subquery.network) runs on. In these cases, we need to ensure Indexers will run and host them, but generally there will be no single customer that will take the lead in financing these requests

Previously, we’ve used a combination of [closed plans and agreements](./payment-methods.md#closed-plans-and-agreements) + [sponsored flex plans (PAYG)](./payment-methods.md#flex-plans-pay-as-you-go--payg) to reward Indexers. However, it’s hard to strike the correct balance of financial sustainability when many Indexers compete to serve these projects and where we can only give our minimum reward to each.

We have found the efficiency of the budget spending is a problem when there is low traffic and therefore low budget. Sometimes we even have 30+ Indexers, but due to budget constraints, only some of them can earn rewards.

The solution to this comes from network inflation as a reward source for Indexer rewards, in addition to rewards for productive work.

In the SubQuery Network, the inflation rate is expected to be `1.2%`. The majority of these rewards acts as network inflation rewards (`1%`), while the remainder is allocated to the SubQuery Treasury to fund various programmes.

## Cobb-Douglas Production Function

![Cobb Douglas production Function](/assets/img/network/cobb_douglas.png)

The query fee revenue that Node Operator (**_i_** ) can receive for the reward pool (**_p_**) is defined by the Cobb-Douglas production function. Where **_Reward~p~_** is the total SQT in the reward pool **_p_**, **_σ~ip~_** is the number of requests provided by Node Operator **_i_** for the reward pool **_p_**, **_σ~p~_** is the number of requests for reward pool **_p_**, **_θ~ip~_** is the staked amount for Node Operator **_i_** for reward pool **_p_**, **_θ~p~_** the total staked amount for the reward pool **_p_** across all participating Node Operators. **_α_** is a constant that changes the weight of these two parameters and how they affect total rewards.

This approach was championed by the 0x team, and in simple terms, means that revenue is allocated to competing Node Operators as a proportion of both requests answered and revenues staked.

## Minimum Staking Requirements

The beauty of the Cobb Douglas equation (above) is that a rational Node Operator must maintain a stable level of staked SQT relative to the work they do in order in each reward pool in order to receive optimal rewards from either of the reward sources. As a result, the SubQuery Network does not need to enforce arbitrary staking requirements because Node Operators are incentivised to self-manage and maintain a stake or skin in the game.

SubQuery does require Node Operator must stake a minimum amount of SQT on the relevant reward pool to be able to participate in its matching Open Agreement. They must also stake a minimum amount on an equivalent staking contract for any Closed Agreements in the same fashion. This Node Operator staked minimum value must be a certain percentage of the Agreement's per Era reward value, which means in order to renew the Agreement to higher volumes, the Node Operator must also increase their stake. When an Node Operator's stake decreases beneath this minimum amount, they will be unable to renew the Agreement at the existing price.

:::warning

Delegated SQT to a Node Operator do not count towards the Node Operators minimum staking requirements

:::

If an Node Operator is caught misbehaving (such as by providing invalid, incomplete, or incorrect data), they are liable to have a portion of their staked SQT (on the particular reward pool ip) reallocated to the SubQuery Foundation Treasury, diminishing their holdings of staked SQT in the network and therefore their potential reward. Since the Node Operator's allocated stake is determined by a percentage of their total SQT, this will have a flow on effect to all other reward pools that the Node Operator is party to.
