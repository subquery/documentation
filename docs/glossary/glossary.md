# Glossary

# Network

![terminology](/assets/img/terminology.png)

## **Service Agreements**

A Service Agreement is a mutual agreement between the Consumers and Indexers on how the transactions will take place and how the services will be delivered.

The Service Agreement ensures transparency between both parties. It includes details as given below:

- Project Name and the Network Name
- Version - Deployment Id of the project
- The id of the Consumer
- The id of the Indexer
- When the project expires
- Query URL
- The price that the consumer will pay to the indexer for delivering the service(rewards will be in SQT)

Read more about the two types of Service Agreements(Closed and Open Market) [here](../subquery_network/design/payment-methods.md)

## **Allocating**

Act of an Indexer assigning SQT to a given project.

### **Reallocating**

A combined operation of removing staked tokens from one project and immediately associating that with another project (comes into effect at the end of the next Era). This is represented/expressed as a percentage of the indexer’s bonded SQT.

## **Bonding**

Act of depositing SQT into a global staking contract performed by either an Indexer or a Delegator.

### **Unbonding**

Act of an Indexer or a Delegator withdrawing SQT from the global staking contract.

This is effectively a transfer of SQT from the global staking contract to the Indexer’s or Delegator’s wallet. In other words, this can be thought of as the Indexer or Delegator withdrawing part or all of their stake. Note that a lock period applies when tokens are unbonded.

## **Delegating**

Act of a Delegator assigning SQT into the global staking contract and then assigning SQT to an Indexer. Note that delegating and bonding are atomic operations.

## **Undelegating**

Act of withdrawing SQT from an Indexer at the end of an Era and then withdrawing that SQT from the global staking contract to a wallet address. This is subject to a lock period.

## **Redelegating**

Act of a Delegator reassigning SQT from one Indexer to another Indexer. Redelegating does not require tokens to be undelegated and is queued to take effect at the end of the Era.

## **Staking**

Act of an Indexer assigning tokens in a global staking contract and into the Indexer’s own contract.

## **Unstaking**

Act of an Indexer withdrawing their SQT. This triggers a 28 day “lock period”. Indexer can restake to cancel this process and return their lock period tokens to the staking contract.

## **Restaking**

Act of Indexer restaking SQT during the lock period to return locked period tokens to the staking contract.

---

## **Contract Ratio**

The sum of daily contracts value (defined as contract value/period) can not exceed a ratio with their total stake (indexer + delegator).

## **Era**

A period or duration of time where configurations and settings remain constant and calculations take place. For example, during an Era:

- the Indexer Commission Rate cannot be changed during an Era.

## **Indexer Delegation Ratio**

The amount an Indexer can “borrow” or leverage from Delegators. This ratio is yet to be determined.

## **Lock period**

A period where tokens are unbonded awaiting withdrawal. During this period, tokens do not earn any rewards. Currently, the lock period is defined as 28 days.
