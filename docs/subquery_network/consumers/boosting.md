# Consumer Boosting

The idea behind Consumer boosting is to allow Consumers an alternative way of bootstraping projects that they would like to be run across the network. It’s specifically to allow projects to be free to Consumers, while still ensuring that Indexers are best matching supply of indexing compute with demand from Consumers. The end result is:

- The SubQuery market is efficiently matching supply with demand for Consumers' projects.
- Consumers can receive heavily discounted (or even free) access to these projects that they boost.

Consumer boosting is tightly integrated with our [network inflation reward system](../introduction/reward-distribution.md#network-inflation-rewards), in fact, Consumer boosting is the key aspect that controls what project deployments that the network inflation is allocated to.

## How To Boost an Project

Consumer Boosting is similar to delegating, where Consumers (individuals or teams that would like to access and query data from Node Operators on the network), boost a specific data indexer project or RPC endpoint (i.e. project deployment) by locking tokens against it.

The difference between boosting and delegating, is that in return, boosters receive free request units over the time and they attract more Node Operators to a project by allowing them to receive a higher cut of rewards from [network inflation](../introduction/reward-distribution.md#network-inflation-rewards).

To boost a project, find the project in the [SubQuery Network explorer](https://app.subquery.network/explorer/home), and click "Boost Project". You can see below that I'm boosting a new project that I've made, and that does not yet have any Node Operators and only a tiny amount of boost on it already.

![How to Boost a project 1](/assets/img/network/consumer_boosting_1.png)

You can now add or remove existing boost from this project, since this is the first time I am boosting this project, I can only add Boost.

Note there is a minimum boost amount that must be boosted against a project deployment in order for the project deployment to start receiving booster rewards, and in turn, for Consumers to receive boost rewards. You can see the current value in [network parameters](../parameters.md).

![How to Boost a project 2](/assets/img/network/consumer_boosting_2.png)

Once you confirm the relevant transactions via your wallet, and wait for a few seconds for transactions to process, you will see an updated boost amount on the Project details screen. You can also view an estimate of the query rewards that you might receive from boosting this project. Node Operators can also see that there is an estimated `377.30 SQT per era` of boost rewards per Era on this project and might be attracted to index it as a result.

![How to Boost a project 3](/assets/img/network/consumer_boosting_3.png)

## Manage Existing Boost

You can easily view all existing projects that you have boosed under the Consumer > My Boosted Projects menu. Here you can view total query rewards, as well as add or remove boost from each project.

![Manage boost](/assets/img/network/consumer_boosting_manage.png)

## How are Boosters rewarded

In the SubQuery Network, the majority of network inflation ([see exact amount here](../parameters.md)) is distributed to each project deployment based on the proportion of boosted tokens each project deployment is allocated over the time.

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
