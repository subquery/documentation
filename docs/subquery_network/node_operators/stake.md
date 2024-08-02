# Staking and Allocating SQT

:::info 

Node Operators must actively manage their staking allocation to each project deployment to maximise their rewards. We also highly recommend that you enable [Auto Reduce Over Allocation](#automatically-reduce-over-allocation) to prevent being [over allocated](#over-allocated-stake).

:::

In order to register and become a Node Operator, a minimum amount of SQT is required to stake in the staking contract - see [how much SQT should you stake](#how-much-sqt-should-you-stake).

If a Node Operator is caught misbehaving (such as by providing invalid, incomplete, or incorrect data), they are liable to have a portion of their staked SQT (on the particular reward pool) slashed or reallocated to the SubQuery Foundation Treasury, diminishing their staked SQT in the network and therefore reducing their potential rewards.

## Managing Staking Allocation

Node Operators can always see their current own stake, total delegation, and any unallocated stake in the Indexer > My Projects menu.

![indexer stake manage screen](/assets/img/network/indexer_stake_manage.png)

At the top of the page shows the current staking amount (and the amount that is estimated for the next Era).

- Own Stake: This is the total current amount of SQT that you as the Node Operator has staked. Remember, you must meet a minimum ratio here to delegated stake - see [how much SQT should you stake](#how-much-sqt-should-you-stake).
- Total Delegation: This is the total amount of delegated SQT to you as a Node Operator.
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

### How should I allocate my stake amongst my projects for best rewards?

You should allocate stake to projects which have the highest stake APY. Note that project stake APY (annualised yeild per SQT staked) reduces as more stake is allocated to a project. Allocating all your stake to your highest performing project could reduce its APY and make it no longer the best choice for allocation. Regularly review and adjust the stake across your projects to find the right balance.

## Over Allocated Stake

:::danger

This is really bad. When your stake is over-allocated, your receive 0 rewards for that the period of time that it is over allocated - immediately fix this!

:::

When the Current Total Stake bar turns red, you are over allocated. You must immediately "Remove Allocation" for one or more project deployments to bring your total allocated stake amount to be less that your Own Stake + Delegated Stake.

![indexer stake over allocated](/assets/img/network/indexer_stake_manage_over_allocated.png)

You can use the estimate of the Own Stake and Total Delegated for the next Era on this page to avoid situations where departing delegators might result in you over allocating.

## Automatically Reduce Over Allocation

:::info 

We highly recommend that you enable this feature

:::

In your Node Operator Admin App and in the Config section there is a setting called "Auto Reduce Over Allocation", we highly recommend that you enable it.

If enabled, in the event of when you are overallocated, then your allocaton will automaticaly evenly reduce across all of your projects until you are no longer over allocated
- Allocation reduction will be by an even percent. For example, each project will decrease by 10% of it's initial allocation.
- Allocation will not be reduced below 1 SQT on any single project
- If you have 0 projects then it will un-allocate all SQT

It runs immediately at the start of the next era when delegation changes take effect.

![Enabling Node Operator Auto Reduce Allocation](/assets/img/network/indexer_auto_allocation.png)

## How much SQT should you Stake

There are multiple reasons why Node Operators should consider staking more SQT or attracting more Delegation.

- All Node Operators must stake a minimum amount of SQT to become a Node Operator. The current amount can be found in [network parameters](../parameters.md)
- There is a maximum allowed delegation capacity based on the size of the Node Operator's own stake. This ensures the Node Operator has sufficient skin in the game. Increasing one's own stake mean Delegators are able to delegate more to you. The current multiple for delegation capacity can be found on our [network parameters](../parameters.md) page.
- More total stake means more SQT to allocate on different deployments the Node Operator runs and more stake rewards that can be earnt.
- More total stake provides an advantage over other Node Operators when the payment method is flex plan (PAYG) due to the way the [Cobb-Douglas function](../introduction/reward-distribution.md#cobb-douglas-production-function) works.

In order to become a Node Operator on the SubQuery Network, you must stake a minimum number of SQT. In addition, you will want to attract delegators to [increase the rewards that you receive](./rewards.md).
