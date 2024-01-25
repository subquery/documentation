# How Rewards are Distributed

## Reward Sources

- [Reward for productive work](#rewards-for-product-work): This is the existing reward structures with the project with the various payment methods that we have pioneered, e.g. serving requests in valid service agreements or flex plans.
- [Network inflation rewards](#network-inflation-rewards): This is allocated to all Indexers for successfully running projects and serving requests.

In our vision, as the network matures, rewards for productive work will dominate Node Operator rewards. However, we understand that in the early days, we will leverage Network Inflation rewards to help bootstrap the network as applications get deployed and the end user base scales.

![Token economic flow](/assets/img/network/token_economy.png)

## Rewards for Product Work

In order to earn rewards from query revenue as a Node Operator, Node Operators only need to send an on-chain tx to switch their service status on. The Cobb-Douglas production function will be used to adjust the rewards distributed to each Node Operator to encourage higher total stake.

There is a reward pool for each deployments Node Operator runs where the adjustment applies, then it goes to the Node Operator's final rewards pool, where all rewards like Close Agreement Reward, PAYG Reward and Allocation Reward eventually go to. At the moment, the total stake of Node Operator is used for all these pools. Note, for a [Closed Agreement](./payment-methods.md#closed-plans-and-agreements), the Cobb-Douglas production is not used to allocate rewards to Node Operators.

![Reward Pools](/assets/img/network/reward_pools.png)

## Deployment Booster Rewards

As Node Operator, running projects occurs costs. Without secure the Consumer, there are risks that the time and resources can be wasted. In order to address this challenge and offer Consumers a way to bootstrap a deployment, we now enable Deployment Booster Rewards, which will accumulate rewards for a deployment based on the total boosted SQT on it, the rewards then will be shared by Node Operators and people who boost the deployment. The former one is known as Allocation Rewards, the later one Booster Query Rewards.

In the following cases, Node Operators can earn allocation rewards.

1. There are boosted SQT for the deployment so that it can accumulate rewards.
2. Node Operator start their service of this deployment by sending a tx.
3. Node Operator allocate SQT to the deployment.
4. Node Operator is online and available to public, the progress is 100%.
5. Node Operator is not under over-allocated status.

For people who boosted the deployment, let's assume they are Consumers. For them, they are rewarded with Booster Query Rewards which they can spend on any state channel they have with Node Operators for this deployment. Do note, Booster Query Rewards can only be spent but not withdraw.

As network operator, we will act as a normal Consumer now, boost SQT to projects which are identified as “Public Good” projects, for example; network dictionaries and the various SubQuery projects that the [official Network app](https://kepler.subquery.network) runs on. In these cases, we need to ensure Node Operators will run and host them, but generally there will be no single customer that will take the lead in financing these requests Utilizing Deployment Booster Rewards is considered more efficient in the sense of management efforts and budget spending.

This rewards type is available for all project types supported by Subquery Network, e.g SubQuery Projects, Rpc Projects, SubGraphs. But there is a difference amongst them. The ratio of allocation rewards and booster query rewards varies by project types. It makes sense for rpc projects that booster query rewards has larger proportion than allocation rewards.

In the SubQuery Network, the inflation rate is expected to be `1.2%`. The majority of these rewards acts as deployment booster rewards (`1%`), while the remainder is allocated to the SubQuery Treasury to fund projects in other payment methods.

## Cobb-Douglas Production Function

![Cobb Douglas production Function](/assets/img/network/cobb_douglas.png)

The query fee revenue that Node Operator (**_i_** ) can receive for the PAYG reward pool (**_p_**) is defined by the Cobb-Douglas production function. Where **_Reward~p~_** is the total SQT in the reward pool, **_p_**, **_σ~ip~_** is the number of requests provided by Node Operator **_i_** for the reward pool, **_p_**, **_θ~ip~_** is the total stake of the Node Operator **_i_**, **_p_**, **_θ~p~_** the total staked amount for the reward pool **_p_** across all participating Node Operators. **_α_** is a constant that changes the weight of these two parameters and how they affect total rewards.

This approach was championed by the 0x team, and in simple terms, means that revenue is allocated to competing Node Operators as a proportion of both requests answered and revenues staked.

## Minimum Staking Requirements

The beauty of the Cobb Douglas equation (above) is that a rational Node Operator must maintain a stable level of staked SQT relative to the work they do in order in each reward pool in order to receive optimal rewards from either of the reward sources. As a result, the SubQuery Network does not need to enforce arbitrary staking requirements because Node Operators are incentivised to self-manage and maintain a stake or skin in the game.

SubQuery does require Node Operator must allocate SQT on the deployment they run, so they can earn Allocation Rewards. a. When a Node Operator's stake decreases beneath the amount they have allocated, they will stop earning Allocation Rewards until they either increase their stake or reduce the allocated SQT to recover from this status.

:::warning

Delegated SQT to a Node Operator do not count towards the Node Operators minimum staking requirements

:::

If an Node Operator is caught misbehaving (such as by providing invalid, incomplete, or incorrect data), they are liable to have a portion of their staked SQT (on the particular reward pool ip) reallocated to the SubQuery Foundation Treasury, diminishing their holdings of staked SQT in the network and therefore their potential reward. Since the Node Operator's allocated stake is determined by a percentage of their total SQT, this will have a flow on effect to all other reward pools that the Node Operator is party to.
