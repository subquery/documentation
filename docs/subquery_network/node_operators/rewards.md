# Node Operator Rewards

## How are Node Operators Rewarded?

Node Operators are rewarded in SQT in two ways:

- For simply running a project, these come from [network inflation](../introduction/reward-distribution.md#network-inflation-rewards) and are affected by [Consumer boosting](../consumers/boosting.md).
- For serving requests for a project, it can be via either Closed Agreement or Flex Plans (PAYG).

Check out [reward distribution](../introduction/reward-distribution.md) for more details.

## Staking

In order to register and become a Node Operator, a minimum amount of SQT is required to stake in the staking contract. If a Node Operator is caught misbehaving (such as by providing invalid, incomplete, or incorrect data), they are liable to have a portion of their staked SQT (on the particular reward pool) reallocated to the SubQuery Foundation Treasury, diminishing their staked SQT in the network and therefore reducing their potential rewards.

[Learn more about staking and allocating existing stake here](./stake.md).

## How to attract Delegators

**Node Operators can increase the potential rewards that they receive by attracting Delegators.**

Delegators are SQT token holders who delegate their tokens to Node Operators for a fair share of their rewards.

Although reputation, service quality and total self stake are all important factors in a Delegator's decision process, eventually it all relates to ROI. Node Operators should be alert to Consumer demand, the rewards are usually larger when there is less competition from other Node Operators. Node Operators should also set their commission rate appropriately to raise the ROI of their Delegators.

You can read more about how Delegators may pick Node Operators [here](../delegators/rewards.md#how-to-select-what-indexers-to-delegate-to)

Note, a Node Operator can [change the commission rate at any time](./setup/becoming-a-node-operator.md#6-configure-an-node-operator-commission-rate-nocr), but it takes an entire [Era](../introduction/era.md) for the new value to take effect.

## Security Considerations

Security considerations for Node Operators are as follows - see [the security guide](./setup/security-guide.md).

- **Indexer Admin**: Avoid exposing Indexer Admin access to public. Unsecured node runner may lose reward qualification
- **Operator Wallets**: Secure storage of the wallet recovery seed phrase is highly recommended.
- **Firewalls**: Node Operators need to keep security front of mind. Infrastructure security, in particular firewalls, should be implemented to prevent public exposure to personal ports.
- **Passwords**: Secure passwords should be used by default and password rotation policies should be considered.

## Node Operator’s Performance Considerations

In order to maintain desirable performance, Node Operators need to consider various factors such as:

- The balance between their own stake and that of Delegators, using a tool such as commission rate for adjustments.
- Their infrastructure cost and utilisation rate.
- Act quickly and index projects in response to market demand.
- Quickly respond to Consumer support questions on Discord.

## Selecting Deployments to Work on

There are several indicators that need to be considered when selecting a project to work on.

### Boosted SQT and Booster Rewards

When a deployment has a large amout of [Boosted SQT](../consumers/boosting.md) allocated to it, it means a potential larger share of [network inflation rewards](../introduction/reward-distribution.md#network-inflation-rewards) for all Node Operators running this deployment. Network Inflation rewards will likely be the largest source of rewards in the early stage of the SubQuery network as it bootstraps.

### Query Fee Opportunities

Some projects will have agreement offers advertised by Consumers.

When a Consumer advertises an agreement offer for a project, they ultimately specify how much they are willing to pay for a set volume of requests. The more a Consumer is willing to pay, the more attractive the project will be for an Indexer. It also provides confidence that there will likely be recurring revenue from this SubQuery project.

### Project Complexity

Project deployments will vary in computation requirements. Simple projects will only index a few parameters whereas more complicated projects will require more computation resources and more bandwidth. Node Operators need to understand the complexity of the project in relation to their hardware capabilities.

### Node Operator Competition

Popular projects offering a high query volume will attract a large number of Node Operators. This also implies that the rewards will be shared amongst more people. A single Node Operator’s share may be less than a less popular project with a slightly lower query fee but with far fewer Node Operators.

### Pricing Strategy

Node Operators need to be aware of their operational costs and expected incomes to understand their break-even point. Some considerations are:

- How they should set their plan prices.
- The cost of running the project.
- At what price-point they make profit.
- Competitor pricing.
- Offer model (flex/agreement).

### Advertisements

Node Operators need to advertise themselves to Delegators as well as Consumers. A Node Operator may do this from their own website, in the SubQuery forums or any other places deemed necessary. Some examples of the information to provide are:

- Background and experience.
- Hardware approach and why it provides superior performance.
- Customer support policy or SLA.
- Evidence of historical performance.

### Customer Support

Node Operators are highly encouraged to provide a communication method for their customers to report unavailability and also to provide feedback.

## Claiming Rewards by Eras

Note, you need to wait for an [Era](../introduction/era.md) to complete before the rewards earned in it can be claimed. So if you receive rewards during Era 1, you can only claim them after Era 2 starts. This gives Consumers sufficient time to lodge any disputes.

To claim your rewards, head to `Rewards` under your profile. Then click `Claim`.

![Claim Reward](/assets/img/network/profile_rewards.png)

Wait for a few seconds and you will see the status as `Claimed` under the `Action` column.
