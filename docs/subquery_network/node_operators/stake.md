# Staking and Allocating SQT

:::tip New for Mainnet - Please read

One key difference between Kepler and the mainnet is that now Node Operators must actively manage their staking allocation to each project deployment.

:::

In order to register and become a Node Operator, a minimum amount of SQT is required to stake in the staking contract.

If a Node Operator is caught misbehaving (such as by providing invalid, incomplete, or incorrect data), they are liable to have a portion of their staked SQT (on the particular reward pool) reallocated to the SubQuery Foundation Treasury, diminishing their staked SQT in the network and therefore reducing their potential rewards.

## Managing Staking Allocation

Node Operators can always see their current own stake, total delegation, and any unallocated stake in the Indexer > My Projects menu.

![indexer stake manage screen](/assets/img/network/indexer_stake_manage.png)

At the top of the page shows the current staking amount (and the amount that is estimated for the next Era).

- Own Stake: This is the total current amount of SQT that you as the Node Operator has staked. Remember, you must meet a minimum ratio here to delegated stake - see [how much SQT should you stake](#how-much-sqt-should-you-stake).
- Total Delegation: This is the total amount of delegated SQT to you as an Node Operator.
- Unallocated Stake: This is the amount of stake that is not allocated to any project deployment. **You should always try to minimise this to as close to 0**. See how to [allocate stake](#allocating-stake).
- Over Allocated Stake: **This is really bad** - please immediately see [over allocated stake](#over-allocated-stake).

You can add or remove Own Stake by clicking on the "Stake More" or "Unstake" buttons shown below.

![indexer stake add screen](/assets/img/network/indexer_stake_add.png)

### Allocating Stake

:::warning

When your stake is unallocated, it's not being applied to the stake of any particular project, and is not doing any productive work for that project deployment - in short, it's wasted.

:::

You can add or remove allocation for a particular project deployment by clicking "Add Allocation" or "Remove Allocation" next to each project deployment.

![indexer stake manage screen](/assets/img/network/indexer_stake_manage_add.png)

Remember, both network inflation rewards and query rewards (for Flex plans) distribution is affected by the allocated stake to the project deployment ([read more here](./rewards.md#how-are-node-operators-rewarded)). This means that you should allocate a larger proportion of stake to project to which you derive more rewards in these two areas. For example:

- If a project deployment is highly boosted, allocating more stake means you receive a higher proportion of its rewards compared to other project deployments
- If a project deployment gets a lot of flex plan queries, allocating more stake means you receive a higher proportion of its rewards compared to other project deployments
- If a project deployment is highly competitive, you might want to allocate more stake to it to receive more rewards compared to non-competitive project deployments

## Over Allocated Stake

:::danger

This is really bad. When your stake is overallocated, your receive 0 rewards for that the period of time that it is over allocated - immediately fix this!

:::

When the Current Total Stake bar turns red, you are over allocated. You must immediately "Remove Allocation" for one or more project deployments to bring your total allocated stake amount to be less that your Own Stake + Delegated Stake.

![indexer stake over allocated](/assets/img/network/indexer_stake_manage_over_allocated.png)

You can use the estimate of the Own Stake and Total Delegated for the next Era on this page to avoid situations where departing delegators might result in you over allocating.

## How much SQT should you Stake

There are multiple reasons why Node Operators should consider staking more SQT or attracting more Delegation.

- There is a maximum allowed delegation amount based on the size of the Node Operator's self stake, this ensures the Node Operator has sufficient skin in the game. Increasing self stake can mean delegators are able to delegate more to you.
- More total stake means more SQT to allocate on different deployments the Node Operator runs and more Network Inflation Rewards to earn.
- It provides an advantage over other Node Operators when payment method is flex plan (PAYG) due to the way the [Cobb-Douglas function](../introduction/reward-distribution.md#cobb-douglas-production-function) works.

In order to become an Node Operator on the SubQuery Network, you must stake a minimum number of SQT. In addition, you will want to attract delegators to [increase the rewards that you receive](./rewards.md).
