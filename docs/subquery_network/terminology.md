# Terminology

## Delegators 

* Bonding = the act of depositing SQT into a global staking contract. 
* Delegate = allocating SQT to an Indexer. Tokens can be undelegated, but still bonded
* Un-bonding =  the act of withdrawing SQT from the global staking contract
* Lock in period (x days) only applies to un-bonding a token. 
* Indexers cannot delegate to another Indexer (ie Indexers cannot be a Delegator with their stake)
* In the lock period, when in the unbonded state, tokens do not receive any rewards.
    * If this was not true, Delegators could bond and immediately unbond and continue receiving rewards.