# Delegator Rewards

## How Delegators are rewarded?

To attract Delegators to support their work, Indexers offer Delegators a share of the rewards they earn.

:::info Indexer Commission Rate (ICR)

_Indexer’s Commission Rate (ICR)_: This is a percentage share of the rewards received by Indexers from serving requests to Consumers. After deducting the ICR from total rewards, the remaining rewards will be shared within the total delegation/staking pool proportionally to the individual delegated/staked value in the pool.

Indexers are free to set this rate to any value they desire. A higher ICR indicates that Indexers keep more of the rewards. A lower ICR indicates that the Indexers share more of their rewards with their Delegators.

:::

Delegators will only receive revenue for staking Eras that they were a part of for the entire period. For example, if they join a staking Era in the middle of the relevant period, then they will not earn any Query Fee revenue for that particular Era.

If an Indexer wishes to increase the Indexer Commission Rate that they offer to their Delegators, they must advertise this for an entire staking Era. The Indexer will be able to decrease their Indexer Commission Rate at any point to raise more delegated SQT for staking in the short term. Delegators can withdraw or undelegate their staked amount at any time, but they will forfeit any rewards earned within the staking Era (as they were not part of the delegation pool for the entire duration of the staking Era).

## How to select what indexers to delegate to

You need to assess a few things when deciding on what Indexer to choose.

Indexers set an Indexer’s Commission Rate (ICR) which is the percentage Indexers earn. Therefore, a lower ICR will be more attractive for Delegators as a larger percentage of rewards is shared between Delegators.

For example, Indexer A has set an ICR of 80% and has received SQT from 8 Delegators. This means that the 8 Delegators plus the Indexer itself, will be rewarded a share of the remaining 20% of what the Indexer has earned. The share will be split proportionally between them based on the amount staked/delegated. Alternatively, if Indexer A had an ICR of 30%, then the 8 delegators and indexer would share proportionally rewards from the remaining 70% of rewards. In short, the lower the ICR - the better it is for Delegators.

Note that Delegators must have delegated their tokens for the entire Era to be eligible for these rewards (note [Non-reward period](#non-reward-period)).

Additionally, we've made it easier for you to see other data about all indexers in our app. Navigate to `Delegator` > `Indexers` and view the [leaderboard](https://kepler.subquery.network/delegator/indexers/top) which shows various scores and details that we think are important to you when deciding what indexer to choose. The Indexer Score takes into account an Indexer’s uptime, slashing events, and other parameters.

## Non-reward period

Besides the period when Delegators can effectively earn money, a non-reward period also occurs. Delegators receive rewards for staking Eras that they were a part of for the entire duration. For example, if a Delegator joins a staking era halfway through, they will not earn any rewards for that particular era.

Delegators can change the indexer that their SQT is delegated to (called redelegating), this change will be queued to happen automatically at the end of the Era and no thawing period will occur.

If a Delegator decides to undelegate their SQT, a 28 day thawing period starts. The tokens cannot be used during this period, no fees can be accrued or any reward gained.

## Delegation Lifecycle

Delegators delegate (deposit) SQT into an Indexer’s contract.

Delegators can then decide how much to redelegate to each Indexer of their choice.

Delegator can undelegate (withdraw) tokens back to their wallet. This will trigger a lock period of 28 days.

After the unlocking period has been completed, tokens become available for withdrawal/claim.

## How to claim your rewards

To claim rewards, head to `Stake & Delegate` -> `My Profile`. Then select `Claim` in the last column.

![Claim Reward](/assets/img/claim_rewards.png)

You will be asked to confirm the transaction with MetaMask.

![Confirm Claim Rewards](/assets/img/confirm_claim_rewrads.png)

Wait for a few seconds and you will see the status as `claimed` under the `Action` column.

![Reward Claimed](/assets/img/reward_confirmed.png)
