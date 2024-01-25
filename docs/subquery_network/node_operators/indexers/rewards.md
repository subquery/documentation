# Node Operator Rewards

## How are Node Operator rewarded?

Node Operator are rewarded in SQT in two ways:

- For running a project, it is known as Allocation Rewards.
- For serving requests for a project, it can either via Closed Agreement or PAYG.

Check out [reward distribution](../../introduction/reward-distribution.md) for more details.

## Staking

In order to register and become a Node Operator, a minimum SQT is required to stake in the staking contract. If a Node Operator is caught misbehaving (such as by providing invalid, incomplete, or incorrect data), they are liable to have a portion of their staked SQT (on the particular reward pool ip) reallocated to the SubQuery Foundation Treasury, diminishing their holdings of staked SQT in the network and therefore their potential reward.

There are multiple reasons why Node Operators should consider stake more SQT or attract more Delegation.

- The maximum allowed delegation is decided by self stake. So only increasing self stake can increase the total possible stake.
- More total stake means more SQT to allocate on different deployments the Node Operator runs and more Allocation Rewards to earn.
- Have advantage over other Node Operators when payment method is flex plan (PAYG)

## How to attract Delegators?

**Node Operator can increase the potential rewards that they receive by attracting Delegators.**

Delegators are SQT token holders who can delegate their tokens to Node Operator for a fair share of their rewards.

Although reputation, service quality, total self stake are all important factors in Delegators' decision, eventually it all reflects to ROI. Node Operator should be alert to where Consumer's demands, the rewards is usually larger when there is less competition from other Node Operators. Node Operator should also set the commission rate properly to raise the ROI of his delegators.

You should read more about how Delegators will pick Node Operator [here](../../delegators/rewards.md#how-to-select-what-indexers-to-delegate-to)

Note, you can [change this rate at any time](./become-an-indexer.md#6-configure-an-indexer-commission-rate-icr), but it takes an entire [Era](../../introduction/era.md) for the new value to take effect.

## Security & Performance considerations

Security and performance considerations are as follows.

### Operator Wallets

Secure storage of the wallet recovery seed phrase is highly recommended.

### Firewalls

Node Operator need to keep security front of mind. Infrastructure security, in particular firewalls, should be implemented to prevent public exposure to personal ports.

Secure passwords should be used by default and password rotation policies should be considered.

### Node Operator’s Performance

In order to generate desirable performances, Node Operator need to consider various factors such as:

- the balance between their own stake and that of Delegators, using tool like commission for adjustments.
- the infra cost and infra use rate.
- act quick and index projects quick
- quick response to consumers support questions on discord

## Selecting Deployments to Work on

There are several indicators that needs to consider when selecting a project to work on.

### Boosted SQT and Booster Rewards

When a deployment has larger Boosted SQT, it means larger Booster Rewards for all Node Operators running this deployment, and higher allocation usage rate. Allocation rewards is usually the largest source of rewards in early stage of the network.

### Query Fee Opportunities

Some projects will have agreement offers advertised by consumers.

When a Consumer advertises an agreement offer for a project, they ultimately specify how much they are willing to pay for a set volume of requests. The more a Consumer is willing to pay, the more attractive the project will be for an Indexer. It also provides confidence that there will likely be recurring revenue from this SubQuery project.

### Deployment complexity (SubQuery Project or Subgraphs)

Deployments will vary in computation requirements. Simple projects will only index a few parameters whereas more complicated projects will require more computation resources and more bandwidth. Node Operator need to understand the complexity of the project and its hardware capabilities.

### Node Operator Competition

Popular projects offering a high query volume that attract a large number of Node Operator. This also implies that the rewards will be shared amongst more people. A single Node Operator’s share may be less than a less popular project with a slightly lower query fee but with far fewer Node Operator.

### Pricing Strategy

Node Operator need to be aware of their operation cost and expected incomes to understand their break-even point. Some considerations are:

- How should Node Operator set their plan prices?
- What is the cost of running the project? Which price is the price can make profit.
- What is the price of competitors'?

### Advertisements

Node Operator need to advertise themselves to Delegators as well as Consumers. Node Operator may do this from their own website, in the SubQuery forums or any other places deemed necessary. Some examples of the information to provide are:

- The background and experience of the Node Operator or the team.
- The hardware approach and why it provides superior performance.
- The customer support policy or SLA.
- Evidence of historical performances.

### Customer support

Node Operator are highly encouraged to provide a communication method for its customers to report inavailability and also to provide feedback.

## Claiming Rewards by Eras

Note, you need to wait for the [Era](../../introduction/era.md) completes before the rewards can be claimed. So if you receive rewards during Era 1, you can only claim them after Era 2 starts. This gives consumers sufficient time to lodge any disputes.

To claim your rewards, head to `Rewards` under your profile. Then click `Claim`.

![Claim Reward](/assets/img/network/profile_rewards.png)

Wait for a few seconds and you will see the status as `claimed` under the `Action` column.
