# Season 3 Challenges

- If you are an Indexer, jump to [Indexers Challenges Section](../season3-challenges/season3.html#indexer-challenges)
- If you are a Delegator, jump to [Delegator Challenges Section](../season3-challenges/season3.html#delegator-challenges)
- If you are a Consumer, jump to [Consumers Challenges Section](../season3-challenges/season3.html#consumer-challenges)

<br /><br />

## Indexer Challenges

### 1. Index a Single Project

To index a single project, please follow the instructions **[here](../../testnet/indexers/index-project.html).**

### 2. Index all Projects 

To index all project, please follow the instructions **[here](../../testnet/indexers/index-project.html).**

### 3. Maintain Daily Availability 

Ensure that your indexer is all set and available at all times. Your indexer will be pinged to check connectivity.


### 4. Obtain Your First Delegator 

Reach out and ask for a Delegator to delegate to your indexer. Alternatively, set up another account and delegator to your indexer. 

### 5. Create a Default Plan 

- To create a default plan, navigate to `Plan & Offer` -> `My Plans`. Then select `Create a Plan`. <br />

![Create plan](/assets/img/create_default_plan.png) <br />

- After that, select a template for the plan. <br />

![Select plan template](/assets/img/select_plan_template.png) <br />

- Select `Set a price for this plan` but DO NOT select a specific deployment ID. Then click `Create`. <br />

![Set plan parameters](/assets/img/set_default_plan_parameters.png) <br />

- You will see a pop up to confirm your transaction with Metamask. Click on `Confirm` and wait for a few seconds. <br />

<!--![Confirm Price for the Plan](/assets/img/confirm_price_of_plan.png) <br />

![Contract Information Confirmed](/assets/img/contract_info_confirmed.png) <br />

![Transaction Saved on Dashboard](/assets/img/transaction_saved_on_dashboard.png) <br />
-->
- Then you will see a default plan created in the `Default` tab. <br />

![Default plan created](/assets/img/default_plan_created.png) <br />

### 6. Create a Deployment Specific Plan 

To create a deployment specific plan, navigate to `Plan & Offer` -> `My Plans`. Then select `Create a Plan` just like you did while creating a default plan. ***However, also select a specific deployment Id.*** <br />

![Create specific plan](/assets/img/set_specific_plan_parameters.png)

- The remaining steps(for confirming the transaction) are similar to [create a default plan](../season3-challenges/season3.html#_5-create-a-default-plan).

- The plan will appear in the `Specific` tab. <br />

![Specific plan created](/assets/img/specific_plan_created.png)

### 7. Request a Consumer to Purchase Your Plan 

- Reach out and ask a Consumer to purchase your plan. Alternatively, set up another account and purchase your own plan. 

- Once this is done, the purchased plan will appear in  `Plan & Offer` -> `My Service Agreements`. The example here shows Consumer 0xB559... purchasing a plan from Indexer 0x5F36... aka `Sean Indexer 27Jun`. <br />

![Plan purchased](/assets/img/plan_purchased.png) <br />

### 8. (TBA) Claim Your Reward 

<!-- need to wait for at least an era before rewards can be claimed. -->

- To claim rewards, head to `Stake & Delegate` -> `My Profile`. Then select `Claim` in the last colmun. <br />

![Claim Reward](/assets/img/claim_reward.png) <br />

- Then confirm the transaction with MetaMask as asked.

- Wait for a few seconds and you will see the status as `claimed` under the `Action` column. 


### 9. (TBA) Withdraw Unstaked Amount 
Here, an Indexer withdraws an unstaked amount from the staking contract back to an Indexer's wallet. 

- To withdraw the unstaked amount, navigate to `Stake & Delegate` -> `My profile`. Then select the `Locked` tab. <br />

- When the tokens are unlocked, the `Withdraw` button will be available.  <br />

![Withdraw delegated tokens](/assets/img/withdraw_delegated_tokens.png) <br />
 
- Click on `Withdraw` and then confirm the withdraw. <br />

![Confirm withdraw](/assets/img/confirm_withdraw.png) <br />


### 10. Request Undelegation from a Delegator

Reach out and ask a Delegator to undelegate their tokens from your Indexer. 


### 11. (FIX) Accept an Offer in the Offer Marketplace 

- To accept an offer in the offer marketplace, navigate to `Plan & Offer` -> `Offer Marketplace`. Then select `Accept` in the last column. <br />

![Accept offer](/assets/img/accept_offer.png) <br />

- Ensure that you have passed the 3 criteria. Then click `Accept` and sign the Metamask transaction.

![Accept offer screen](/assets/img/accept_offer_screen.png) <br />

### 12. (TBA) Update Controller Account


### 13. (TBA) Unregister Your Indexer


<hr />

## Delegator Challenges


### 1. (TBA) Claim Rewards

- To claim rewards, head to `Stake & Delegate` -> `My Profile`. Then select `Claim` in the last colmun. <br />

![Claim Reward](/assets/img/claim_reward.png) <br />

- Then confirm the transaction with MetaMask as asked.

- Wait for a few seconds and you will see the status as `claimed` under the `Action` column. 


### 2. Delegate to an Indexer

- To delegate to an Indexer of your choice, navigate to `Stake & Delegate` -> `Indexers`. Then select `Delegate`. <br />

![Delegate to an Indexer](/assets/img/delegate_to_indexer_a.png) <br />

- You will be asked to confirm your transaction with Metamask. Please wait for a while after confirming the transaction. 

- Then select your wallet and your delegation amount. Click on `Delegate`. <br />

![Delegate to an Indexer part 2](/assets/img/delegate_to_indexer_b.png) <br />

Note that some Indexers cannot be delegated to, until they collect all the early era's rewards. You will have to contact the indexer to resolve the issue. <br />

![Cannot delegate](/assets/img/cannot_delegate.png) <br />

### 3. Undelegate from an Indexer

- To undelegate from an Indexer, navigate to `Stake & Delegate` -> `My profile`. Then select the `Delegating` tab. <br />

![Undelegate from an Indexer](/assets/img/undelegate_from_indexer_a.png) <br />

- Click on `Undelegate` and enter the amount of SQT you want to undelegate. Then click `Confirm Undelegation`. You will be asked to confirm your transaction with Metamask. Confirm it and wait for a few seconds. <br />

![Confirm undelegate](/assets/img/undelegate_from_indexer_b.png) <br />

- You can see the change in the Delegation Amount in the `Your DELEGATION AMOUNT` column. 


### 4. Withdraw Undelegated Amount from an Indexer

- When you undelegate from an Indexer, the tokens are locked for a specific period before they can be withdrawed. This period is indicated by the `START AT` and `END AT` columns. 

- To withdraw the undelegated amount from an Indexer, navigate to `Stake & Delegate` -> `My profile`. Then select the `Locked` tab. <br />

- When the tokens are unlocked, the `Withdraw` button will be available.  <br />

![Withdraw delegated tokens](/assets/img/withdraw_delegated_tokens.png) <br />
 
- Click on `Withdraw` and then confirm the withdraw. <br />

![Confirm withdraw](/assets/img/confirm_withdraw.png) <br /> <br />

<hr />

## Consumer Challenges

### 1. Create a Purchase Offer

- To create a purchase offer, navigate to `Plan & Offer` -> `Manage My Offers`. Then select `Create an Offer`. <br />

![Create purchase offer](/assets/img/create_purchase_offer.png) <br />

- `Confirm Approval` for "the SubQuery Network to use your SQT". <br />

![Confirm approval](/assets/img/confirm_approval.png) <br />

- In step 1, find the SubQuery project deployment ID for this offer. <br />

![Create purchase offer](/assets/img/create_purchase_offer_steps.png) <br />

- Choose a template for this offer. <br />

![Create purchase offer](/assets/img/create_purchase_offer_2.png) <br />

Set the details of your offer. 
- Indexer cap: the maximum number of Indexers desired to index your project.
- Required deposit: Calculated automatically based on reward per Indexer x Indexer cap. 
- Minimum indexed height: The blockheight the Indexer should starting indexing from.
- Expiration time: How long the offer will be valid for. <br />

![Create purchase offer](/assets/img/create_purchase_offer_3.png) <br />

- Confirm the details of your purchase offer and then sign the transaction with Metamask.

![Create purchase offer](/assets/img/create_purchase_offer_4.png) <br />

- The newly created purchase offer will appear in the `Open` tab.

![Purchase offer created](/assets/img/purchase_offer_created.png) <br />

### 2. Get a Service Agreement from an Indexer 

Reach out and ask an Indexer to purchase your offer.  

### 3. (TBA) Cancel an Offer Before It Expires

- Head to `Plan & Offer` -> `Manage My Offers`. 

- In the `Open` tab, select an offer and click on `Remove`. <br />

![Cancel Offer](/assets/img/cancel_order.png) <br />

- You will be asked to confirm the offer cancellation. In this screen, you can see your balance details as below: 
    - Unspent Balance: 
    - Cancellation Fee:
    - You will receive: 

<br />

![Confirm Cancellation of Offer](/assets/img/cancel_order_confirmation.png) <br />

- Now, click on `Confirm Cancellation`. Further, you will be asked to confirm the transaction with MetaMask. 

- Confirm it and wait for a few seconds. Your offer will be cancelled soon.  <br />

### 4. (TBA) Withdraw SQT locked in an Offer After It Expires

- When an offer expires, the unspent tokens are locked for a specific period before they can be withdrawed. This period is indicated by the `START AT` and `END AT` columns. 

- To withdraw the amount, navigate to `Stake & Delegate` -> `My profile`. Then select the `Locked` tab. <br />

- When the tokens are unlocked, the `Withdraw` button will be available.  <br />

![Withdraw delegated tokens](/assets/img/withdraw_delegated_tokens.png) <br />
 
- Click on `Withdraw` and then confirm the withdraw. <br />

![Confirm withdraw](/assets/img/confirm_withdraw.png) <br /> 


### 5. Purchase a Plan from an Indexer

- To create a purchase a plan from an Indexer, navigate to `Explorer` and select a project of your choice. <br />

![Explorer](/assets/img/explorer.png) <br />

- Then click on `Indexers` tab, and expand the plan of your preferred Indexer. <br />

Here, you will see some information to help you make your choice: <br />

Price: <br />
Period: <br />
Daily Request Cap: <br />
Rate Limt: <br /> 

- Select `Purchase` under the Action column . <br />

![Purchase plan](/assets/img/purchase_plan.png) <br />

- Then you will see a screen showing the details of the plan you have chosen. Click on `Purchase`. <br />

![Purchase plan](/assets/img/purchase_a_plan_details.png) <br />

- You will be asked for the confirmation. Hit `Confirm Approval`. 

![Confirm Purchase Plan](/assets/img/confirm_approval_purchase_plan.png) <br />

- You will then see a pop up to confirm your transaction with MetaMask. Click `Confirm` over there. 
