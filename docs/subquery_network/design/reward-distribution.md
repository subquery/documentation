# How Rewards are Distributed

In order to earn rewards from query revenue as a Node Operator, Node Operators must stake SQT against a particular SubQuery Project or RPC endpoint that they are providing the service to. The Cobb-Douglas production function will be used to determine the rewards distributed to each Node Operator.

There may be multiple reward pools simultaneously active for a given Node Operator. The Node Operator's job is to allocate their staked and delegated SQT amongst these pools (in terms of a percentage of their total SQT). There will be a reward pool for each data indexer project or RPC endpoint that the Node Operator accepts [Flex Plans](./payment-methods.md#flex-plans-pay-as-you-go--payg), and a reward pool for each Market Agreement that the Node Operator is a party of. For a [Closed Agreement](./payment-methods.md#closed-plans-and-agreements), the Cobb-Douglas production is not used to allocate rewards to Node Operators.

![Reward Pools](/assets/img/network/reward_pools.png)

## Cobb-Douglas Production Function

![Cobb Douglas production Function](/assets/img/network/cobb_douglas.png)

The query fee revenue that Node Operator (**_i_** ) can receive for the reward pool (**_p_**) is defined by the Cobb-Douglas production function. Where **_Reward~p~_** is the total SQT in the reward pool **_p_**, **_σ~ip~_** is the number of requests provided by Node Operator **_i_** for the reward pool **_p_**, **_σ~p~_** is the number of requests for reward pool **_p_**, **_θ~ip~_** is the staked amount for Node Operator **_i_** for reward pool **_p_**, **_θ~p~_** the total staked amount for the reward pool **_p_** across all participating Node Operators. **_α_** is a constant that changes the weight of these two parameters and how they affect total rewards.

This approach was championed by the 0x team, and in simple terms, means that revenue is allocated to competing Node Operators as a proportion of both requests answered and revenues staked.

## Minimum Staking Requirements

The beauty of the Cobb Douglas equation (above) is that a rational Node Operator must maintain a stable level of staked SQT relative to the work they do in order in each reward pool in order to receive optimal revenue. As a result, the SubQuery Network does not need to enforce arbitrary staking requirements because Node Operators are incentivised to self-manage and maintain a stake or skin in the game.

SubQuery does require Node Operator must stake a minimum amount of SQT on the relevant reward pool to be able to participate in its matching Open Agreement. They must also stake a minimum amount on an equivalent staking contract for any Closed Agreements in the same fashion. This Node Operator staked minimum value must be a certain percentage of the Agreement's per Era reward value, which means in order to renew the Agreement to higher volumes, the Node Operator must also increase their stake. When an Node Operator's stake decreases beneath this minimum amount, they will be unable to renew the Agreement at the existing price.

:::warning

Delegated SQT to a Node Operator do not count towards the Node Operators minimum staking requirements

:::

If an Node Operator is caught misbehaving (such as by providing invalid, incomplete, or incorrect data), they are liable to have a portion of their staked SQT (on the particular reward pool ip) reallocated to the SubQuery Foundation Treasury, diminishing their holdings of staked SQT in the network and therefore their potential reward. Since the Node Operator's allocated stake is determined by a percentage of their total SQT, this will have a flow on effect to all other reward pools that the Node Operator is party to.
