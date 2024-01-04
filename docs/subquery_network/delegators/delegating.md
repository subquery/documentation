# Delegating to a Node Operator

:::info Kepler

In Kepler, you can only delegate to Indexers. When mainnet launches we will rename this section to Node Operators

:::

## How to delegate to an Indexer

After you have [selected what indexer to delegate to](./rewards.md#how-to-select-what-node-operators-to-delegate-to), to delegate to an Indexer of your choice, navigate to `Delegator` -> `Indexers`(on the left sidebar). Then select `Delegate` in the last column next to your desired Indexer.

![Delegate Indexer List](/assets/img/network/delegate_indexers.png)

Select your source for the delegation (it can be your wallet, or from an existing delegation amount) and enter an amount. Click on `Delegate`. You will be asked to confirm your transaction with Metamask. Please wait for a while after confirming the transaction.

![Delegate to an Indexer part 2](/assets/img/network/delegate_action.png)

Note that some Indexers cannot be delegated to, until they collect all the early era's rewards. You will have to contact the Indexer to resolve the issue.

![Cannot delegate](/assets/img/network/delegate_cannot.png)

## How to undelegate from an Indexer

::: info You can redelegate without waiting for the unlocking period

If you want to switch your delegation from one indexer to another, you can avoid the undelegation lock period by instead redelegating. When you initially delegate to an Indexer, you can instead select another Indexer's delegation as the source of funds to redelegate.

:::

To undelegate from an Indexer, navigate to `Delegator` -> `Delegating`.

![Undelegate from an Indexer](/assets/img/network/delegate_status.png)

Click on `Undelegate` and enter the amount of SQT you want to undelegate. Then click `Confirm Undelegation`. You will be asked to confirm your transaction with Metamask. Confirm it and wait for a few seconds.

![Confirm undelegate](/assets/img/network/delegate_undelegate.png)

You can notice the change in the Delegation Amount under the `Your DELEGATION AMOUNT` column (note the unlocking period on funds).

## How to withdraw undelegated tokens

When you undelegate from an Indexer, the tokens are locked for a specific period before they can be withdrawn. You can see pending unlocks and execute withdrawls in the `My profile` -> `Withdrawls`. When the tokens are unlocked, the `Withdraw` button will be available. Alternatively you can cancel the withdrawl here and redelegate your tokens.

![Withdraw delegated tokens](/assets/img/network/profile_withdrawls.png)
