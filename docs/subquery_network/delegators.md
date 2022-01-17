# Delegators

## What is a Delegator?

A Delegator is a non-technical network role in the SubQuery network and is a great way to start contributing to the SubQuery network. This role enables all delegation participants (Delegators) to “delegate” their SQT to one or more Indexers. Delegators benefit by having their SQT earn a “commission reward” for their efforts. On the other hand, Indexers benefit by acquiring more SQT to stake towards their projects of interest, thereby increasing their earning potential. 

Without Delegators, Indexers will likely earn fewer rewards because they will have less SQT to allocate. Therefore, Indexers compete to attract Delegators by offering a competitive “Delegator’s Commission Rate” (DCR), which in effect is a share of an Indexer’s revenue.

Delegators select potential Indexers based on a “Reputation Index” or RI. This RI takes into account an Indexer’s uptime, ICR, slashing events, and Indexer parameter change frequency. 

# Requirements to be a Delegator

One of the best things about being a Delegator is that you don’t need any powerful computer configuration and specific technical requirements. Any computer with a connection to the internet is all that is required to become a Delegator.

## How Delegators are rewarded?

To attract Delegators to support their activities, Indexers offer potential Delegators a share of the rewards they earn. The primary goal of an Indexer is to earn fees for the Indexing service they provide. Delegators help Indexers to effectively achieve these goals. With a purpose to attract Delegators, an Indexer advertises the portion of revenue that the Indexer will share with the Delegator. That portion is called the Delegator’s Commission Rate. 

# Benefits of being a Delegator
There are several benefits of becoming a Delegator.
* Easy to get started - Requiring little technical knowledge, Delegators only need to acquire SQT tokens and then learn the process of delegating the tokens to their preferred Indexer(s). 
* Contribute to the network - Indexers serve blockchain data to their customers. Delegating to Indexers is a way to support an Indexer’s initiative. In return, Delegators are rewarded.
* To earn rewards - Delegators can put their SQT to work by delegating their SQT to Indexers and earn a share of the reward pool. 
* No minimum limit - There is no minimum limit to be a Delegator. This means that anyone can join no matter how many SQT one has. 


## Risks of Being a Delegator

Even though it is not considered a risky role, being a Delegator includes a few risks to be aware of. 
* Market  volatility risk:  The constant fluctuations in the market is a risk that affects  not just SQT, but all tokens in the general cryptocurrency marketplace. Taking a long term approach can reduce this type of risk.  
* Constant adjustments of staking parameters by Indexers and delegation fees can increase the risk to a Delegator. For example, a Delegator might miss a change in staking parameters resulting in a less than expected return. To reduce this risk, when Indexers decrease their stake parameters, it will only take effect after the next full Era has been completed. 
* Indexer poor performance : It is possible that Delegators can select Indexers that perform poorly and therefore provide a substandard return on investment to Delegators. Delegators are therefore encouraged to do Indexer due diligence on potential Indexers. A Reputation Index is also available to help Delegators compare Indexers to each other. 


## Delegation fee

The protocol charges a delegation fee of 0.5% for every delegation of tokens to an Indexer.

## Non-reward period

Besides the period when Delegators can effectively earn money, a non-reward period also occurs. Delegators receive revenue for staking eras that they were a part of for the entire period (28 days). For example, if they join a staking era in the middle of the relevant period of 28 days, they will not earn any Query Fee revenue for that particular era. Additionally, if a Delegator decides to undelegate his SQT, a 28 day thawing period starts. The tokens cannot be moved during this period, no fees can be accrued or a reward acquired.

## Indexer Due Diligence for Delegators

Once the preferred Indexer is found, due Diligence should be performed in order to check his reputation and reliability. Assessment could be performed to evaluate if the Indexer is active in a community, is he helping other members, is it possible to get in touch with him, does he provide value to the community, and is he up-to-date with the protocols' updates. 

# How to delegate and undelegate

In order to perform a delegation process, a few steps should be performed in the correct order. First, to add the tokens to the wallet, a user must connect to a compatible crypto wallet (MetaMask, for example) and add a related QRT token address to the account. The following steps are to connect the wallet to the network and choose the Indexer to delegate tokens to. By delegating tokens, they are locked for at least 28 days. Every delegation includes performing two contract interactions, where the first one is to allow the Graph Network to spend the selected amount of tokens.
On the other side, undelegation of staked amounts can be performed at any time in three steps. First of all, it is required to connect a crypto wallet to the network. Then, it should select the number of tokens a user wants to undelegate. And finally, when the transaction is confirmed, the delegation process is stopped and finished. Finally, once the undelegation is activated, any rewards earned within the staking era will be forfeit.

## Steps for delegation

Delegator bonds (deposit into) their SQT into a global staking contract. 
Delegator can then decide how much to stake to each Indexer of their choice. 
Delegator can un-stake tokens (lock period not applicable). This then becomes “available”. This can be re-staked at any time. The token is still within the global staking contract. This is known as re-balancing and will trigger a withdraw claim event due to ratios changing
Delegator can un-bond “available” tokens. Action performed by Delegator. When this action is executed, tokens enter a 28 day unlocking period. 
After unlocking period has completed, tokens become available for withdraw/claim. 

Example
Delegator A:

Total stake: 1000 SQT
Bonded: 800 SQT 
300: stake to Indexer A
300: stake to Indexer B
200: available to bond
Un-bonding: 200 SQT
100: unbonded at block 2000, withdrawable at block x(28 days)
100: unbonded at block 2500, withdrawable at block y(28 days)

# Delegators Terminology

* Bonding = the act of depositing SQT into a global staking contract. 
* Staking = assigning SQT to an Indexer. Tokens can be unstaked, but still bonded
* Un-bonding =  the act of withdrawing SQT from the global staking contract
* Lock in period (x days) only applies to un-bonding a token. 
* Indexers cannot delegate to another Indexer (ie Indexers cannot be a Delegator with their stake)
* In the lock period, when in the unbonded state, tokens do not receive any rewards.
    * If this was not true, Delegators could bond and immediately unbond and continue receiving rewards.
    * 