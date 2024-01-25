# Consumer Boosting

The idea behind Consumer boosting is to allow Consumers an alternative way of bootstraping projects that they would like to be run across the network. It’s specifically to allow projects to be free to Consumers, while still ensuring that Indexers are best matching supply of indexing compute with demand from Consumers. The end result is:

- The SubQuery market is efficiently matching supply with demand for Consumers' projects.
- Consumers can receive heavily discounted (or even free) access to these projects that they boost.

Consumer boosting is tightly integrated with our [network inflation reward system](../introduction/reward-distribution.md#network-inflation-rewards), in fact, Consumer boosting is the key aspect that controls what project deployments that the network inflation is allocated to.

## How does it work

Consumer Boosting is similar to delegating, where Consumers (individuals or teams that would like to access and query data from Node Operators on the network), boost a specific data indexer project or RPC endpoint (i.e. project deployment) by locking tokens against it.

The difference between boosting and delegating, is that in return, boosters receive free request units over the time and they attract more Node Operators to a project by allowing them to receive a higher cut of rewards from [network inflation](../introduction/reward-distribution.md#network-inflation-rewards).

## How are boosters rewarded

In the SubQuery Network, the inflation rate is expected to be `1.2%`. The majority of these rewards acts as network inflation rewards (`1%`), while the remainder is allocated to the SubQuery Treasury to fund various network enhancement programmes and grants.

These rewards are distributed to each project deployment based on the proportion of boosted tokens each project deployment is allocated over the time.

This reward pool is then split into two groups:

- Allocation rewards are rewards provided to Node Operators (and their Delegators) based off their staking proportion on that project deployment, this encourages more Node Operators to run infrastructure for this project deployment, as they get a larger set of rewards into their reward pool. These rewards are distributed the end of each Era and shared between Node Operator and their delegators following the same rule as other Node Operator rewards.
- Query rewards are rewards that are granted back to those that boosted the project deployment, they are granted when they open a state channel with that project deployment - you can only use query rewards within state channels for the given project deployment that you boosted.

## When might you boost a project deployment

- Anyone can boost a project deployments when they want to receive free query units.
- Architects (Project Creators) may boost to encourage Node Operators to run their project so the market can observe their data.
- Node Operators could boost projects they are profitable in to potentially receive more rewards for that project from network inflation, though this is discouraged and may be treated as misbehaviour.

Note that since query rewards for the Booster can only be redeemed for queries for the given project deployment that you boosted, if an individual is looking to maximise rewards and yield from their spare SQT, they should instead look to [delegate](../delegators/introduction.md), rather than boost.

- Consumers receive no direct SQT reward for boosting a project, and there is no corresponding risk to boosted tokens as well. The rewards that you receive are in a higher likelihood of more node operators serving the project deployment, and free query units.
- There is no withdrawal lockup period, and Consumers will receive exactly the same amount of SQT that was originally locked to boost the project.
- There is no penalty or lockup period to shift your boosted tokens to a different project/deployment
