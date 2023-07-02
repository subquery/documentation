# Delegators

:::info Delegators in Kepler

To read more specifically about being an Delegator in SubQuery's Kepler Network, please head to [Kepler - Delegators](./kepler/delegators.md)

:::

## What is a Delegator?

A Delegator is a non-technical network role in the SubQuery Network and is a great way to start participating in the SubQuery Network. This role enables Delegators to “delegate” their SQT to one or more Indexers and earn rewards (similar to staking).

Without Delegators, Indexers will likely earn fewer rewards because they will have less SQT to allocate. Therefore, Indexers compete to attract Delegators by offering a competitive share of an Indexer’s rewards.

## Requirements to be a Delegator

One of the best things about being a Delegator is that you don’t need any devops, coding, or technical experience. Basic understanding of the SubQuery Network is all that is required to become a Delegator.

## Benefits of being a Delegator

There are several benefits of becoming a Delegator:

- **Easy to get started**: Requiring little technical knowledge, Delegators only need to acquire SQT tokens and then learn the process of delegating the tokens to their preferred Indexer(s).
- **Contribute to the network**: Delegating to Indexers is a way to support an Indexer’s work service requests to consumers. In return, Delegators are rewarded with SQT.
- **Earn rewards**: Delegators can put their SQT to work by delegating their SQT to Indexers and earning a share of the reward pool.
- **No minimum delegation amount**: There is no minimum required delegation to be a Delegator. This means that anyone can join no matter how much SQT one has.

## How Delegators are rewarded?

To attract Delegators to support their work, Indexers offer Delegators a share of the rewards they earn. The Indexer will advertise an Indexer Commission Rate, where the remaining revenue will then be shared within the total delegation/staking pool proportionally to the individual delegated/staked value in the pool.

_Indexer’s Commission Rate_: This is a percentage share of the fees earned from serving requests to Consumers. Indexers are free to set this rate to any value they desire. A higher percentage indicates that Indexers keep more of the profits. A lower percentage indicates that the Indexers share more of their profits with their Delegators.

Delegators will only receive revenue for staking Eras that they were a part of for the entire period. For example, if they join a staking Era in the middle of the relevant period, then they will not earn any Query Fee revenue for that particular Era.

If an Indexer wishes to increase the Indexer Commission Rate that they offer to their Delegators, they must advertise this for an entire staking Era . The Indexer will be able to decrease their Indexer Commission Rate at any point to raise more delegated SQT for staking in the short term. Delegators can withdraw or undelegate their staked amount at any time, but they will forfeit any rewards earned within the staking Era (as they were not part of the delegation pool for the entire duration of the staking Era).

## How to select Indexers?

You need to assess a few things when deciding on what Indexer to choose.

Indexers set an Indexer’s Commission Rate (ICR) which is the percentage Indexers earn. The remaining is then shared amongst the Indexer and all Delegators propotionally by staked/delegated amount. Therefore, a lower ICR will be more attractive for Delegators as a larger percentage of rewards is shared between Delegators.

For example, Indexer A has set an ICR of 80% and has received SQT from 8 Delegators. This means that the 8 Delegators plus the Indexer itself, will be rewarded a share of the remaining 20% of what the Indexer has earned. The share will be split proportionally between them based on the amount staked/delegated. Alternatively, if Indexer A had an ICR of 30%, then the 8 delegators and indexer would share propotionally rewwards from the remaining 70% of rewards. In short, the lower the ICR - the better it is for Delegators.

Note that Delegators must have delegated their tokens for the entire Era to be eligible for these rewards (note [Non-reward period](#non-reward-period)).

Additionally, we've made it easier for you to see other data about all indexers in our app. Navigate to `Delegator` > `Indexers` and view the [leaderboard](https://kepler.subquery.network/delegator/indexers/top) which shows various scores and details that we think are important to you when deciding what indexer to choose. The Indexer Score takes into account an Indexer’s uptime, slashing events, and other parameters.

## Non-reward period

Besides the period when Delegators can effectively earn money, a non-reward period also occurs. Delegators receive rewards for staking Eras that they were a part of for the entire duration. For example, if a Delegator joins a staking era halfway through, they will not earn any rewards for that particular era.

Delegators can change the indexer that their SQT is delegated to (called redelegating), this change will be queued to happen automatically at the end of the the Era and no thawing period will occur.

If a Delegator decides to undelegate their SQT, a 28 day thawing period starts. The tokens cannot be used during this period, no fees can be accrued or any reward gained.

## Delegation Lifecycle

Delegators delegate (deposit) SQT into an Indexer’s contract.

Delegators can then decide how much to redelegate to each Indexer of their choice.

Delegator can undelegate (withdraw) tokens back to their wallet. This will trigger a lock period of 28 days.

After the unlocking period has been completed, tokens become available for withdrawal/claim.

## Risks of being a Delegator

Even though it is not considered a risky role, being a Delegator includes a few risks to be aware of.

1. Market volatility risk: The constant fluctuations in the market is a risk that affects not just SQT, but all tokens in the general cryptocurrency marketplace. Taking a long term approach can reduce this type of risk.
2. Constant adjustments of staking parameters by Indexers and delegation fees can increase the risk to a Delegator. For example, a Delegator might miss a change in staking parameters resulting in a less than expected return. To reduce this risk, when Indexers decrease their stake parameters, it will only take effect after the next full Era has been completed, giving time for delegators to assess and make any changes.
3. Indexer poor performance: It is possible that Delegators can select Indexers that perform poorly and therefore provide a substandard return on investment to Delegators. Delegators are therefore encouraged to do Indexer due diligence on potential Indexers. A Reputation Index is also available to help Delegators compare Indexers to each other.

Once a preferred Indexer(s) is found, due diligence should be performed to check an Indexer’s reputation and reliability. Assessments could be performed to evaluate if the Indexer is active in the community, if the Indexer helps other members, if it is possible to get in touch with the Indexer, and if the Indexer is up-to-date with protocol and project updates. The aforementioned Reputation Index can also serve as a primary selection indicator.
