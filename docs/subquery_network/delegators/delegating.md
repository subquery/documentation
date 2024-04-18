# Delegating to a Node Operator

## How to delegate to a Node Operator

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/7GKWO5wEdtc" frameborder="0" allowfullscreen="true"></iframe>
</figure>

After you have [selected what Node Operator to delegate to](./rewards.md#how-to-select-what-node-operators-to-delegate-to), navigate to `Delegator` -> `Node Operators`(on the left sidebar). Then select `Delegate` in the last column next to your desired Node Operator.

::: warning

Ensure you have ether for gas fees. Ether needs to be on the Base network. More information can be found [here](../token/claim.html#how-to-obtain-ether-on-base)

:::

![Delegate Node Operator List](/assets/img/network/delegate_indexers.png)

Select your source for the delegation (it can be your wallet, or from an existing delegation amount) and enter an amount. Click on `Delegate`. You will be asked to confirm your transaction with your wallet. Please wait for a while after confirming the transaction.

![Delegate to a Node Operator part 2](/assets/img/network/delegate_action.png)

Note that some Node Operators cannot be delegated to, until they collect all the early era's rewards. You will have to contact the Node Operator to resolve the issue.

![Cannot delegate](/assets/img/network/delegate_cannot.png)

## How to undelegate from a Node Operator

::: info You can redelegate without waiting for the unlocking period

If you want to switch your delegation from one Node Operator to another, you can avoid the undelegation lock period by instead redelegating. When you initially delegate to a Node Operator, you can instead select another Node Operator's delegation as the source of funds to redelegate.

:::

To undelegate from a Node Operator, navigate to `Delegator` -> `Delegating`.

![Undelegate from a Node Operator](/assets/img/network/delegate_status.png)

Click on `Undelegate` and enter the amount of SQT you want to undelegate. Then click `Confirm Undelegation`. You will be asked to confirm your transaction with your wallet. Confirm it and wait for a few seconds.

![Confirm undelegate](/assets/img/network/delegate_undelegate.png)

You can notice the change in the Delegation Amount under the `Your DELEGATION AMOUNT` column (note the unlocking period on funds).

## How to withdraw undelegated tokens

When you undelegate from a Node Operator, the tokens are locked for a specific period before they can be withdrawn. You can see pending unlocks and execute withdrawls in the `My profile` -> `Withdrawls`. When the tokens are unlocked, the `Withdraw` button will be available. Alternatively you can cancel the withdrawl here and redelegate your tokens.

![Withdraw delegated tokens](/assets/img/network/profile_withdrawls.png)
