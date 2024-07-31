# Delegator Rewards

## How Delegators are rewarded?

To attract Delegators to support their work, Node Operators (Data Indexers or RPC providers) offer Delegators a share of the rewards they earn.

:::info Node Operator Commission Rate (NOCR)

_Node Operator's Commission Rate (NOCR)_: This is a percentage share of the rewards received by Node Operators from serving requests to Consumers. After deducting the NOCR from total rewards, the remaining rewards will be shared within the total delegation/staking pool proportionally to the individual delegated/staked value in the pool.

Node Operators are free to [set this rate to any value they desire](../node_operators/setup/becoming-a-node-operator.md#6-configure-an-node-operator-commission-rate-nocr). A higher NOCR indicates that Node Operators keep more of the rewards. A lower NOCR indicates that the Node Operators share more of their rewards with their Delegators.

:::

Delegators will only receive revenue for staking [Eras](../introduction/era.md) that they were a part of for the entire period. For example, if they join a staking Era in the middle of the relevant period, then they will not earn any Query Fee revenue for that particular Era.

If a Node Operator wishes to increase the Node Operator Commission Rate that they offer to their Delegators, they must advertise this for an entire staking [Era](../introduction/era.md). The Node Operator will be able to decrease their Node Operator Commission Rate at any point to raise more delegated SQT for staking in the short term. Delegators can withdraw or undelegate their staked amount at any time, but they will forfeit any rewards earned within the staking Era (as they were not part of the delegation pool for the entire duration of the staking Era).

![Token economic flow](/assets/img/network/token_economy.png)

## How to select what Node Operators to delegate to?

You need to assess a few things when deciding on what Node Operator to choose. For instance:
- Having SSL enabled
- Having an ENS. (aka social credibility is enabled)
- Having a frequent Era Reward Collection period
- Being active in the Discord community
- Having a high NOCR (Node Operator Commission Rate)

Node Operators set a Node Operator’s Commission Rate (NOCR) which is the percentage Node Operators earn. Therefore, a lower NOCR will be more attractive for Delegators as a larger percentage of rewards is shared between Delegators.

For example, Node Operator A has set an NOCR of 30% and has received SQT from 8 Delegators. This means that the 8 Delegators plus the Node Operator itself, will be rewarded a share of the remaining 70% of what the Node Operator has earned. The share will be split proportionally between them based on the amount staked/delegated. Alternatively, if Node Operator A had an NOCR of 20%, then the 8 delegators and Node Operator would share proportionally rewards from the remaining 80% of rewards. In short, the lower the NOCR - the better it is for Delegators.

Note that Delegators must have delegated their tokens for the entire [Era](../introduction/era.md) to be eligible for these rewards (note [Non-reward period](#non-reward-period)).

Node Operators also have a maximum delegation capacity based on the size of the Node Operator's own stake, this ensures the Node Operator has sufficient skin in the game. The current multiple for delegation capacity can be found on our [network parameters](../parameters.md) page.

For Data Indexers, we've made it easier for you to see other data about all Data Indexers in our app. Navigate to `Delegator` > `Indexers` and view the [Node Operator List](https://app.subquery.network/delegator/node_operators/indexers/all) which shows various scores and details that we think are important to you when deciding what Data Indexer to choose. The Data Indexers Score takes into account a Data Indexer’s uptime, slashing events, and other parameters.

![Delegate Node Operator List](/assets/img/network/delegate_indexers.png)

## Non-reward period

Besides the period when Delegators can effectively earn money, a non-reward period also occurs. Delegators receive rewards for staking [Eras](../introduction/era.md) that they were a part of for the entire duration. For example, if a Delegator joins a staking Era halfway through, they will not earn any rewards for that particular Era.

Delegators can change the Node Operator that their SQT is delegated to (called redelegating), this change will be queued to happen automatically at the end of the Era and no lock period will occur.

If a Delegator decides to undelegate their SQT, a lock period starts ([see length here](../parameters.md)). The tokens cannot be used during this period, no fees can be accrued, and no rewards will be gained.

## Delegation Lifecycle

Delegators delegate (deposit) SQT into a Node Operator’s contract.

Delegators can then decide how much to redelegate to each Node Operator of their choice.

Delegator can undelegate (withdraw) tokens back to their wallet. This will trigger a [lock period](../parameters.md).

After the unlocking period has been completed, tokens become available for withdrawal/claim.

::: info You can redelegate without waiting for the unlocking period

If you want to switch your delegation from one Node Operator to another, you can avoid the undelegation lock period by instead redelegating. When you initially delegate to a Node Operator, you can instead select another Node Operator's delegation as the source of funds to redelegate.

:::

## How to claim your rewards

To claim rewards, head to `My Profile` -> `Rewards`. Then select `Claim` in the last column.

![Reward Claimed](/assets/img/network/profile_rewards.png)

Wait for a few seconds and you will see the status as `claimed` under the `Action` column.
