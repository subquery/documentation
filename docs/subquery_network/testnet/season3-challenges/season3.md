# Season 3 Challenges

Visit [Frontier](https://frontier.subquery.network/explorer) before you begin your season 3 challenges and make sure your MetaMask is connected properly.

Now,

- If you are an Indexer, jump to [Indexers Challenges Section](../season3-challenges/season3.html#indexer-challenges)
- If you are a Delegator, jump to [Delegator Challenges Section](../season3-challenges/season3.html#delegator-challenges)
- If you are a Consumer, jump to [Consumers Challenges Section](../season3-challenges/season3.html#consumer-challenges)

## Indexer Challenges

### 1. Index a Single Project

To index a single project, please follow the instructions **[here](../indexers/index-project.md).**

### 2. Index all Projects

To index all projects, please follow the instructions **[here](../indexers/index-project.md).**

### 3. Maintain Daily Availability

Ensure that your indexer is all set and available at all times. Your indexer will be pinged to check connectivity.

### 4. Obtain Your First Delegator

Reach out to a Delegator and ask them to delegate to your indexer. Alternatively, set up another account and delegate to your own indexer.

### 5. Create a Default Plan

- To create a default plan, navigate to `Plan & Offer` -> `My Plans`. Then select `Create a Plan`.

![Create plan](/assets/img/create_default_plan.png)

- After that, select a template for the plan.

![Select plan template](/assets/img/select_plan_template.png)

- Select `Set a price for this plan` but DO NOT select a specific deployment ID. Then click `Create`.

![Set plan parameters](/assets/img/set_default_plan_parameters.png)

- You will see a pop-up to confirm your transaction with Metamask. Click on `Confirm` and wait for a few seconds.

![Confirm the Plan with MetaMask](/assets/img/createplan_metamask_confirmation.png)

- Then you will see a default plan created in the `Default` tab.

![Default plan created](/assets/img/default_plan_created.png)

### 6. Create a Deployment-Specific Plan

To create a deployment-specific plan, navigate to `Plan & Offer` -> `My Plans`. Then select `Create a Plan` just like you did while creating a default plan. **_However, also select a specific deployment Id._**

![Create specific plan](/assets/img/set_specific_plan_parameters.png)

- The remaining steps(for confirming the transaction) are similar to [create a default plan](../season3-challenges/season3.html#_5-create-a-default-plan).

- This plan will appear in the `Specific` tab.

![Specific plan created](/assets/img/specific_plan_created.png)

### 7. Request a Consumer to Purchase Your Plan

- Reach out to a Consumer and request them to purchase your plan. Alternatively, set up another account and purchase your own plan.

- Once this is done, the purchased plan will appear in `Plan & Offer` -> `My Service Agreements`.

- The example here shows Consumer 0xB559... purchasing a plan from Indexer 0x5F36... aka `Sean Indexer 27Jun`.

![Plan purchased](/assets/img/plan_purchased.png)

### 8. Claim Your Reward

<!-- need to wait for at least an era before rewards can be claimed. -->

- To claim your rewards, head to `Stake & Delegate` -> `My Profile`. Then select `Claim` in the last column.

![Claim Reward](/assets/img/claim_rewards.png)

- Then confirm the transaction with MetaMask as asked.

![Confirm Claim Rewards](/assets/img/confirm_claim_rewrads.png)

- Wait for a few seconds and you will see the status as `claimed` under the `Action` column.

![Reward Claimed](/assets/img/reward_confirmed.png)

### 9. Withdraw Unstaked Amount

Here, an Indexer withdraws the unstaked amount. The amount is withdrawn from the staking contract back to the Indexer's wallet.

When an amount is unstaked, the tokens are locked for a specific period before they can be withdrawn. This period is indicated by the `START AT` and `END AT` columns.

- To withdraw the unstaked amount, navigate to `Stake & Delegate` -> `My profile`. Then select the `Locked` tab.

- When the tokens are unlocked, the `Withdraw` button will be available.

![Withdraw Unstaked tokens](/assets/img/withdraw_tokens.png)

- Click on `Withdraw` and then confirm the withdrawal. You will be asked to confirm the transaction with MetaMask as well.

![Confirm withdraw](/assets/img/confirm_withdrawal.png)

- Confirm the transaction.

### 10. Request Undelegation from a Delegator

Reach out and ask a Delegator to undelegate their tokens from your Indexer.

### 11. Accept an Offer in the Offer Marketplace

- To accept an offer in the "Offer Marketplace", navigate to `Plan & Offer` -> `Offer Marketplace`. Then select `Accept` in the last column.

![Accept offer](/assets/img/accept_offer.png)

- Ensure that you have passed the 3 criteria. Then click `Accept` and confirm the Metamask transaction as well.
  You will be notified about the successful transaction within a few seconds.

![Accept offer and confirm MetaMask Transaction](/assets/img/accept_offer_criteria_and_confirmation.png)

- Once your offer has been accepted, you can note the change under the `Accepted` column.

![Offer Accepted](/assets/img/offer_accepted.png)

### 12. (TBA) Update Controller Account

### 13. (TBA) Unregister Your Indexer

## Delegator Challenges

### 1. Claim Rewards

- To claim rewards, head to `Stake & Delegate` -> `My Profile`. Then select `Claim` in the last column.

![Claim Reward](/assets/img/claim_rewards.png)

- You will be asked to confirm the transaction with MetaMask.

![Confirm Claim Rewards](/assets/img/confirm_claim_rewrads.png)

- Wait for a few seconds and you will see the status as `claimed` under the `Action` column.

![Reward Claimed](/assets/img/reward_confirmed.png)

### 2. Delegate to an Indexer

- To delegate to an Indexer of your choice, navigate to `Stake & Delegate` -> `Indexers`(on the left sidebar).

- Then select `Delegate` in the last column `Action`.

![Delegate to an Indexer](/assets/img/delegate_to_indexer_a.png)

- Now, select your wallet and your delegation amount. Click on `Delegate`.

![Delegate to an Indexer part 2](/assets/img/delegate_to_indexer_with_amount.png)

- You will be asked to confirm your transaction with Metamask. Please wait for a while after confirming the transaction.

Note that some Indexers cannot be delegated to, until they collect all the early era's rewards. You will have to contact the indexer to resolve the issue.

![Cannot delegate](/assets/img/cannot_delegate.png)

### 3. Undelegate from an Indexer

- To undelegate from an Indexer, navigate to `Stake & Delegate` -> `My profile`. Then select the `Delegating` tab.

![Undelegate from an Indexer](/assets/img/undelegate_from_indexer_a.png)

- Click on `Undelegate` and enter the amount of SQT you want to undelegate. Then click `Confirm Undelegation`. You will be asked to confirm your transaction with Metamask. Confirm it and wait for a few seconds.

![Confirm undelegate](/assets/img/confirm_undelegation_amount_and_metamask.png)

- You can notice the change in the Delegation Amount under the `Your DELEGATION AMOUNT` column.

### 4. Withdraw Undelegated Amount from an Indexer

- When you undelegate from an Indexer, the tokens are locked for a specific period before they can be withdrawn. This period is indicated by the `START AT` and `END AT` columns.

- To withdraw the undelegated amount from an Indexer, navigate to `Stake & Delegate` -> `My profile`. Then select the `Locked` tab.

- When the tokens are unlocked, the `Withdraw` button will be available.

![Withdraw delegated tokens](/assets/img/withdraw_tokens.png)

- Hit the `Withdraw` button and confirm the withdrawal. You will be asked to confirm the transaction with MetaMask as well.

![Confirm withdraw](/assets/img/confirm_withdrawal.png)

- Confirm the transaction.

<hr />

## Consumer Challenges

### 1. Create a Purchase Offer

- To create a purchase offer, navigate to `Plan & Offer` -> `Manage My Offers`. Then select `Create an Offer`.

![Create purchase offer](/assets/img/create_purchase_offer.png)

- Hit `Confirm Approval` to allow the SubQuery Network to use your SQT. Confirm the transaction with MetaMask as well.

![Confirm approval for purchase offer](/assets/img/confirm_approval.png)

- In step 1, you need to enter the SubQuery project deployment ID for the offer.

Note: You can find the link in the `Explorer` Tab.

![Explore Deploy Id of the Project](/assets/img/project_deploy_id_explorer.png)

![Copy Deploy Id of the Project](/assets/img/copy_deploy_id_polkadot_season3.png)

![Create purchase offer](/assets/img/create_purchase_offer_steps.png)

- Choose a template for this offer and click on `Next`.

![Choose a Template to Create Purchase Offer](/assets/img/create_purchase_offer_2.png)

- Now, set the details of your offer:
  - Indexer cap: the maximum number of Indexers desired to index your project.
  - Required deposit: Calculated automatically based on (reward per Indexer x Indexer cap).
  - Minimum indexed height: The blockheight the Indexer should start indexing from.
  - Expiration time: How long the offer will be valid.

![Set Details to Create Purchase Offer](/assets/img/create_purchase_offer_3.png)

- Confirm the details of your purchase offer. Then you will see a pop-up of MetaMask. Confirm the transaction with MetaMask as well.

![Confirm purchase offer](/assets/img/create_purchase_offer_4.png)

- The newly created purchase offer will appear in the `Open` tab.

![Purchase offer created](/assets/img/purchase_offer_created.png)

### 2. Get a Service Agreement from an Indexer

Reach out and ask an Indexer to purchase your offer.

### 3. Cancel an Offer Before It Expires

- Head to `Plan & Offer` -> `Manage My Offers`.

- In the `Open` tab, select an offer and click on `Remove`.

![Cancel Offer](/assets/img/cancel_order.png)

- You will be asked to confirm the offer cancellation. On this screen, you can see your balance details as below:
  - Unspent Balance:
  - Cancellation Fee:
  - You will receive:

![Confirm Cancellation of Offer](/assets/img/cancel_order_confirmation.png)

- Now, click on `Confirm Cancellation`. Further, you will be asked to confirm the transaction with MetaMask.

- Confirm it and wait for a few seconds. Your offer will be cancelled soon.

### 4. Withdraw SQT locked in an Offer After It Expires

- When an offer expires, the unspent tokens are locked for a specific period before they can be withdrawn. This period is indicated by the `START AT` and `END AT` columns.

- To withdraw the amount, navigate to `Stake & Delegate` -> `My profile`. Then select the `Locked` tab.

- Note that the `Withdraw` button will be available, once the tokens are unlocked .

![Withdraw SQT After an Offer Expires](/assets/img/withdraw_tokens.png)

- Click on the `Withdraw` button and confirm the withdrawal. You will be asked to confirm the transaction with MetaMask as well.

![Confirm withdraw](/assets/img/confirm_withdrawal.png)

- Now, confirm the transaction.

### 5. Purchase a Plan from an Indexer

- To create a purchase plan from an Indexer, navigate to `Explorer` and select a project of your choice.

![Explorer](/assets/img/explorer.png)

- Then click on the `Indexers` tab, and expand the plan of your preferred Indexer.

Here, you will see some information to help you make your choice:

Price:
Period:
Daily Request Cap:
Rate Limt:

- Select `Purchase` under the Action column .

![Purchase plan](/assets/img/purchase_plan.png)

- Then you will see a screen showing the details of the plan you have chosen. Click on `Purchase`.

![Purchase plan](/assets/img/purchase_a_plan_details.png)

- You will be asked for the confirmation. Hit `Confirm Approval`.

![Confirm Purchase Plan](/assets/img/confirm_approval_purchase_plan.png)

- You will then see a pop-up to confirm your transaction with MetaMask. Click `Confirm` over there.
