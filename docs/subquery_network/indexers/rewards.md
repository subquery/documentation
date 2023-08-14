# Indexer Rewards

## How are Indexers rewarded?

Indexers are rewarded in SQT in two ways:

- Rewards from SQT reward pools based on distribution defined by the Cobb-Douglas Production Function.
- Direct SQT query fee rewards from Closed Agreements that an indexer is party to.

Indexers are rewarded the fees that Consumers pay for providing blockchain data that the Consumer has reqested. An Indexer will receive all the fees from a Closed Agreement. Otherwise, the fees are split based on the amount of work performed (requests served) and the amount of delegated SQT - this split is determined by applying the Cobb-Douglas Production Function.

There may be multiple reward pools simultaneously active for a given Indexer. The indexer’s job is to allocate their staked and delegated SQT amongst these pools (in terms of a percentage of their total SQT). There will be a reward pool for each project that the Indexer accepts PAYG, and a reward pool for each Market Agreement that the Indexer is a party of.

## Indexer Staking

In order to earn rewards from query revenue as an Indexer it is proposed that Indexers must stake SQT against a particular SubQuery Project that they are providing the service to. The Cobb-Douglas production function will be used to determine the rewards distributed to each Indexer.

SubQuery plans to add a constraint to the network where an indexer must stake a minimum amount of SQT on the relevant reward pool to be able to participate in its matching Open Agreement. They must also stake a minimum amount on an equivalent staking contract for any Closed Agreements in the same fashion. This indexer staked minimum value must be a certain percentage of the Agreement’s per Era reward value, which means in order to renew the Agreement to higher volumes, the indexer must also increase their stake. When an indexer’s stake decreases beneath this minimum amount, they will be unable to renew the Agreement at the existing price.

If an Indexer is caught misbehaving (such as by providing invalid, incomplete, or incorrect data), they are liable to have a portion of their staked SQT (on the particular reward pool ip) reallocated to the SubQuery Foundation Treasury, diminishing their holdings of staked SQT in the network and therefore their potential reward. Since the indexer’s allocated stake is determined by a percentage of their total SQT, this will have a flow on effect to all other reward pools that the indexer is party to.

## How to attract Delegators?

**Indexers can increase the potential rewards that they receive by attracting Delegators.**

Delegators are SQT token holders who can delegate their tokens to Indexers for additional rewards. Indexers use these additional tokens to increase the amount they allocate to projects of their choice. This allows Indexers to increase their earnings as they will have a larger total stake.

You should read more about how Delegators will pick Indexers [here](../delegators/rewards.md#how-to-select-what-indexers-to-delegate-to)

The main two aspects of how Delegators will pick indexers is the [Indexer Score from the Indexer Leaderboard](https://kepler.subquery.network/delegator/indexers/top), and the Indexer Commission Rate (ICR). The Indexer’s Commission Rate (ICR) is the percentage Indexers earn. The remaining is then shared amongst the Indexer and all Delegators propotionally by staked/delegated amount. Therefore, Indexers need to decide on the proportion of rewards an Indexer wishes to retain versus the amount to share with their Delegators. A lower ICR will be more attractive for Delegators.

You can [change this rate at any time](./become-an-indexer.md#6-configure-an-indexer-commission-rate-icr).

## Security & Performance considerations

Security and performance considerations are as follows.

### Operator Wallets

Secure storage of an Indexer’s wallet recovery seed phrase is highly recommended.

### Firewalls

Indexers need to keep security front of mind. Infrastructure security, in particular firewalls, should be implemented to prevent public exposure to personal ports.

Secure passwords should be used by default and password rotation policies should be considered.

### Indexer’s Performance

In order to generate desirable performances, Indexers need to consider various factors such as:

- the balance between their own stake and that of Delegators.
- the type of contract being served. The Indexer will receive all the query fees if it is a closed contract. If it is open, then an Indexer’s reward will depend on how many other Indexers there are.
- fulfilling of the Service Level Agreement (SLA) specifications (to avoid slashing penalties).
- the accuracy of the data being served to avoid slashing penalties.

## Selecting SubQuery Projects to Index

There are several indicators that an Indexer needs to consider when selecting a SubQuery project to index.

### Query Fee Opportunities

Some projects will have open or closed plans advertised by consumers.

When a Consumer advertises an open or closed plan for a project, they ultimately specify how much they are willing to pay for a set volume of requests. The more a Consumer is willing to pay, the more attractive the project will be for an Indexer. It also provides confidence that there will likely be recurring revenue from this SubQuery project.

### Project complexity

Projects will vary in computation requirements. Simple projects will only index a few parameters whereas more complicated projects will require more computation resources and more bandwidth. Indexers need to understand the complexity of the project and its hardware capabilities.

### Indexer Competition

Popular projects offering a high query volume that attract a large number of Indexers. This also implies that the rewards will be shared amongst more people. A single Indexer’s share may be less than a less popular project with a slightly lower query fee but with far fewer Indexers.

### Pricing Strategy

Indexers need to be aware of their operation cost and expected incomes to understand their break-even point. Some considerations are:

- How should Indexers set their plan prices?
- At what price can Indexers accept a service agreement or not?

### Advertisements

Indexers need to advertise themselves to Delegators as well as Consumers. Indexers may do this from their own website, in the Subquery forums or any other places deemed necessary. Some examples of the information to provide are:

- The background and experience of the Indexer or Indexer’s team.
- The hardware approach and why it provides superior performance.
- The customer support policy or SLA.
- Evidence of historical performances.

### Customer support

Indexers are highly encouraged to provide a communication method for its customers to report inavailability and also to provide feedback.

## Claiming Rewards from a Plan Agreement

Note, you need to wait for the Era completes before the rewards can be claimed. So if you receive rewards during Era 1, you can only claim them after Era 2 starts. This gives consumers sufficient time to lodge any disputes.

To claim your rewards, head to `Rewards` under your profile. Then click `Claim`.

![Claim Reward](/assets/img/claim_rewards.png)

Then confirm the transaction with MetaMask as asked.

![Confirm Claim Rewards](/assets/img/confirm_claim_rewrads.png)

Wait for a few seconds and you will see the status as `claimed` under the `Action` column.

![Reward Claimed](/assets/img/reward_confirmed.png)
