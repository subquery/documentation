# Payment Methods

Three different payment methods are planned for the SubQuery Network, this provides all participants with various flexible ways to transact SQT. Both Node Operators and Consumers will come together on the Plan Marketplace to advertise their pricing and supported payment methods.

## Flex Plans (Pay-As-You-Go / PAYG)

The first, and a standard amongst the web3 industry, is pay-as-you-go (we call it Flex Plans). This is the baseline payment method and a fallback for others. Each Node Operator will advertise their PAYG prices when registering their ability to serve requests for specific SubQuery projects or RPC endpoint.

Consumers making requests will have to lock the tokens necessary to make that request in a state channel, and at the end of an [Era](./era.md), these tokens will be distributed to the Node Operators based on the [Cobb-Douglas production function](./reward-distribution.md).

## Closed Plans and Agreements

Closed Agreements represent an agreement between only one Node Operator and one Consumer. It’s a direct relationship where all payment flows between the two parties for the work that is done.

Closed Agreements are designed to give Node Operators confidence that there is a market and ROI for data from a particular SubQuery Project, and essentially signal to them which Projects should be indexed.

Closed Plans can also be placed on existing SubQuery Projects to attract additional Node Operators to that SubQuery Project. This may be useful in situations where the existing monopolistic Node Operator may be charging an unreasonable amount for the data or there is a lack of competition to drive prices to equilibrium.

## Open Service Agreement

Open Market Service Agreements are similar to Closed Market Service Agreements, but allow multiple Node Operators to join and compete to provide data to the Consumer. An Open Market Service Agreement may start as a contract between 1 Consumer and 1 Node Operator, but more parties may join the contract resulting in _n_ Consumers and _n_ Node Operators.

Each Open Market Service Agreement results in a new reward pool being created for that contract, and SQT is distributed amongst participating Node Operators by the [Cobb-Douglas production function](./reward-distribution.md#cobb-douglas-production-function).

Open Agreements provide favourable terms for both Node Operators and Consumers, but enable better performance and reliability for Consumers by attracting more Node Operators to compete and serve the same data. If Consumers are running large scale applications with users around the world, then Open Agreements are ideal.

## Comparison of Payment Methods

SubQuery is intended to function as a marketplace where both Consumers and Node Operators can meet to exchange data for SQT tokens. However, there are a lot of up-front costs that an Node Operators must incur before they are able to sell data from a new SubQuery Project or act as an RPC provider.

Closed and Open Agreements are designed to give Node Operators confidence that there is a market for data from a particular SubQuery Project or network, and essentially signal to them which Indexer Projects or RPC endpoints should be indexed. Plans can also be placed on existing Indexer Projects or RPC endpoints to attract additional Node Operators to that Indexer Projects or RPC endpoints. This may be useful in situations where the existing monopolistic Node Operator may be charging an unreasonable amount for the data or there is a lack of competition to drive prices to equilibrium.

When a Consumer exceeds the limitations of the Open or Closed Agreement that they have in place, then all subsequent requests that do not come under the Open or Closed Agreement’s terms may automatically occur under a Flex Plan. This can be used to prevent service interruptions after usage exceeds the prescribed daily limit.

| Comparison                                 | Pay as you Go     | Open Agreement    | Closed Agreement |
| ------------------------------------------ | ----------------- | ----------------- | ---------------- |
| **Favours who?**                           | Both              | Indexers          | Consumers        |
| **Reward Distribution**                    | Cobb-Douglas Pool | Cobb-Douglas Pool | Direct           |
| **Number of Node Operators per agreement** | >=1               | >=1               | 1                |
| **Number of Consumers per agreement**      | >=1               | >=1               | 1                |

## SubQuery’s Innovation in Payment Methods

Today, we generally pay with subscription-based payments for the music we listen to, the TV shows we watch, and the applications that we use. In pioneering web3 service applications, we’ve instead adopted a pay-as-you-go model, where each atomic transaction has an exact cost in the network.

We think subscription based or recurring payment methods are here to stay. Service providers like them because they represent predictable revenue, similarly on the other side consumers like them because they are a known and easily quantified cost. There’s also a psychological factor where once you subscribe, most consumers will feel obligated to consume as much if not all of it, increasing the demand for the service and allowing economies of scale to kick in.

The combination of the above three payment options for Node Operators provides several advanced subscription based options for Consumers and Node Operators. Some parties may benefit from the certainty of rewards provided by Closed Agreements and the predictability of recurring costs. Equally, others may instead prefer to hunt out the most affordable data by going for high volume recurring agreements or low spot prices on the Pay-As-You-Go market.
