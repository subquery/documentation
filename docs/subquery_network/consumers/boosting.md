# Consumer Boosting

The idea behind Consumer boosting is to allow Consumers an alternative way of identifying common good projects that they would like to be run across the network. It’s specifically to allow projects to be free to Consumers, while still ensuring that Indexers are best matching supply of indexing compute with demand from Consumers. The end result is:

- The SubQuery market is efficiently matching supply with demand for common-good projects (where the market does not operate as expected).
- Consumers can receive heavily discounted access to these projects that they boost.

Consumer boosting is tightly integrated with our [network inflation reward system](../introduction/reward-distribution.md#network-inflation-rewards), in fact, Consumer boosting is the key aspect that controls what project deployments that the network inflation is allocated to.

## How does it work

Consumer Boosting is similar to delegating, where Consumers (individuals or teams that would like to access and query data from Node Operators on the network), boost a specific data indexer project or RPC endpoint (i.e. project deployment) by staking tokens against it.

The difference between boosting and delegating, is that in return, boosters receive free request units each Era and they attract more Node Operators to a project by allowing them to receive a higher cut of rewards from [network inflation](../introduction/reward-distribution.md#network-inflation-rewards).

## How are boosters rewarded

In the SubQuery Network, the inflation rate is expected to be `1.2%`. The majority of these rewards acts as network inflation rewards (`1%`), while the remainder is allocated to the SubQuery Treasury to fund various network enhancement programmes and grants.

These rewards are distributed to each project deployment based on the proportion of boosted tokens each project deployment is allocated at the end of each Era.

This reward pool is then split into two groups:

- Allocation rewards are rewards provided to Node Operators (and their Delegators) based off their staking proportion on that project deployment, this encourages more Node Operators to run infrastructure for this project deployment, as they get a larger set of rewards into their reward pool.
- Query rewards are rewards that are granted back to those that boosted the project deployment, they are granted in the form of free request units to that project deployment.

## When might you boost a project deployment

- Anyone can boost a project deployment to encourage Indexers to run common good projects like dictionaries.
- Architects (Project Creators) may boost to encourage Indexers to run their project so the market can observe their data.
- Indexers could boost projects they are profitable in to potentially receive more rewards for that project from network inflation (especially when they are already constrained by their staking limits).

Note that since boosting rewards for the Booster are in free query units, rather than in SQT, if an individual is looking to maximise rewards and yield from their spare SQT, they should instead look to [delegate](../delegators/introduction.md), rather than boost.

- Consumers receive no direct SQT reward for boosting a project, and there is no corresponding risk to boosted tokens as well. The rewards that you receive are in a higher likelihood of more node operators serving the project deployment, and free query units each Era.
- There is no withdrawal lockup period, and Consumers will receive exactly the same amount of SQT that was originally locked to boost the project.
- There is no penalty or lockup period to shift your boosted tokens to a different project/deployment
