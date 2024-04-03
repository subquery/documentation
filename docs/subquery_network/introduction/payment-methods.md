# Payment Methods

Three different payment methods are planned for the SubQuery Network, this provides all participants with various flexible ways to transact SQT. Both Node Operators and Consumers will come together on the Plan Marketplace to advertise their pricing and supported payment methods.

## Flex Plans (Pay-As-You-Go / PAYG)

The first, and a standard amongst the web3 industry, is pay-as-you-go (we call it Flex Plans). This is the baseline payment method and a fallback for others. Each Node Operator will advertise their PAYG prices when registering their ability to serve requests for specific SubQuery projects or RPC endpoint.

Consumers making requests will have to lock the tokens necessary to make that request in a state channel, and at the end of an [Era](./era.md), these tokens will be distributed to the Node Operators based on the [Cobb-Douglas production function](./reward-distribution.md).

When Consumers lock their SQT to boost a deployment, they not only incentivise Node Operators to work on the project, but also allow them to earn network rewards which they can spend on state channel to pay Node Operators. This makes PAYG the best option for most Consumers to use. With enough SQT to boost the deployment, they may not need extra SQT in querying the data from Node Operators.

Operating a state channel requires off-chain communication between the consumer and node operator, and local states management. Even though we open-sourced the software for whoever wants to run on their own environment, we also offer a gateway and consumer host service so we can manage the state channel on user's behalf at the cost of some fees.

[Find out how to create a Flex plan here](../consumers/plan.md).

## Closed Agreements and Agreement Offer

Closed Agreements represent an agreement between only one Node Operator and one Consumer. It’s a direct relationship where all payment flows between the two parties for the work that is done.

Closed Agreements are designed to offer a similar experience for consumers like what they can find in web2 world. It gives Node Operators confidence that there is a market and ROI for data from a particular SubQuery Network Project, and a long term expectation so that they are willing to offer a lower average price.

Agreement Offer can be placed on existing SubQuery Projects to attract additional Node Operators to that SubQuery Project. This may be useful in situations where the existing monopolistic Node Operator may be charging an unreasonable amount for the data or there is a lack of competition to drive prices to equilibrium.

There is an unsaid access threshold though, it requires certain level of trust from consumer that the Node Operator is professional and can offer the service as he stated according to the agreement terms.

## Comparison of Payment Methods

SubQuery Network is intended to function as a marketplace where both Consumers and Node Operators can meet to exchange data for SQT tokens. However, there are a lot of up-front costs that a Node Operators must incur before they are able to sell data from a new SubQuery Project or act as an RPC provider.

We want to build a platform where professional Node Operators are rewarded for their skills as well as the hardware resources they devote to run the service. With the time that proofs their professional and quality of service, some of the runners can have stable customers and stable rewards flow.

A combination of close agreement and PAYG can be the best solution reconcile both cost efficiency and service stability and scalability.

| Comparison              | Pay as you Go                 | Closed Agreement     |
| ----------------------- | ----------------------------- | -------------------- |
| **Cost Per Request**    | relatively high               | lower at high volume |
| **Reward Distribution** | Cobb-Douglas Pool             | Direct               |
| **Source of Funds**     | From wallet or Booster Reward | From wallet          |

## SubQuery’s Innovation in Payment Methods

Today, we generally pay with subscription-based payments for the music we listen to, the TV shows we watch, and the applications that we use. In pioneering web3 service applications, we’ve instead adopted a pay-as-you-go model, where each atomic transaction has an exact cost in the network.

We think subscription based or recurring payment methods are here to stay. Service providers like them because they represent predictable revenue, similarly on the other side consumers like them because they are a known and easily quantified cost. There’s also a psychological factor where once you subscribe, most consumers will feel obligated to consume as much if not all of it, increasing the demand for the service and allowing economies of scale to kick in.

The combination of the above three payment options for Node Operators provides several advanced subscription based options for Consumers and Node Operators. Some parties may benefit from the certainty of rewards provided by Closed Agreements and the predictability of recurring costs. Equally, others may instead prefer to hunt out the most affordable data by going for high volume recurring agreements or low spot prices on the Pay-As-You-Go market.
