# How to Become an Indexer

## Introduction

Welcome to the **Service Guide of Running an Indexer**. This guide includes all the necessary steps to set up an Indexer and start indexing a project.

Let's take an overview of the basic steps involved in the process:

## Table of Content and Process Flow

| Steps | Process Flow                                                                                                                                                                                                               | Additional References                          |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| 1     | Set Up & Start Indexing (3 Methods)<ul><li>[Locally](../indexers/install-indexer-locally.md)</li><li>Or [On Linux](../indexers/install-indexer-linux.md)</li><li>Or [On AWS](../indexers/install-indexer-aws.md)</li></ul> | [How to SSH on AWS](../indexers/ssh-in-aws.md) |
| 2     | [Connect to MetaMask](../metamask/connect-metamask.md)                                                                                                                                                                     | -                                              |
| 3     | [Obtain Kepler Tokens](#3-obtain-ksqt-tokens)                                                                                                                                                                     | -                                              |
| 4     | [How to index a project](#4-how-to-index-a-project)                                                                                                                                                                   | -                                              |
| 5     | [Troubleshooting](../indexers/troubleshooting-indexers.md)                                                                                                                                                                 | -                                              |
| 6     | [FAQs](../indexers/faqs-indexers.md)                                                                                                                                                                                       | -                                              |

### 1. Select an environment 

For those who are **new to SubQuery**, it is recommended to try running the Indexing Service on your local machine first. For **intermediate to advanced users**, it is recommended to set up a VM on AWS (or similar) to host your indexing service.

### - Install Docker

Note that you may or may not need to install Docker. If you use the SubQuery community image in AWS, it comes with everything you need to set up and run quickly. If you have your own customised VM, you will need to install Docker and some command tools, and then obtain the docker-compose.yml file.

`Important:`
After installing your Indexer, you must SSH to your EC2 instance to check your indexer version. (Visit [How to SSH into your AWS instance](../indexers/ssh-in-aws.md)).


1. Run cd subquery-indexer
2. Run the follow cmd to download the latest `docker-compose.yml`:

```sh
curl https://raw.githubusercontent.com/subquery/indexer-services/main/docker-compose.yml -o docker-compose.yml
```

Make sure the indexer service versions are correct:

| onfinality/subql-coordinator   | v0.3.11 |
| :----------------------------- | :----- |
| onfinality/subql-indexer-proxy | v0.2.0 |

::: warning Important
Please change the default PostgreSQL password in the `POSTGRES_PASSWORD` field and in the coordinator-service's `postgres-password` field. Replace it with your own one. 
:::


### 2. Connect to MetaMask

Once your Indexing Service is all set and running successfully, [connect to your MetaMask wallet](../metamask/connect-metamask.md) 

### 3. Obtain kSQT tokens 

TBA

### 4. How to index a project

To index a project, please follow the instructions **[here](../indexers/index-project.md).**


## Additional Notes

- Visit [Troubleshooting](../indexers/troubleshooting-indexers.md) or [FAQs](../indexers/faqs-indexers.md) if you run into technical issues.


### How to create a default plan

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

### How to create a deployment-specific plan

To create a deployment-specific plan, navigate to `Plan & Offer` -> `My Plans`. Then select `Create a Plan` just like you did while creating a default plan. **_However, also select a specific deployment Id._**

![Create specific plan](/assets/img/set_specific_plan_parameters.png)

- The remaining steps(for confirming the transaction) are similar to [creating a default plan](#how-to-create-a-default-plan).

- This plan will appear in the `Specific` tab.

![Specific plan created](/assets/img/specific_plan_created.png)

### How to claim your reward

<!-- need to wait for at least an era before rewards can be claimed. -->

- To claim your rewards, head to `Stake & Delegate` -> `My Profile`. Then select `Claim` in the last column.

![Claim Reward](/assets/img/claim_rewards.png)

- Then confirm the transaction with MetaMask as asked.

![Confirm Claim Rewards](/assets/img/confirm_claim_rewrads.png)

- Wait for a few seconds and you will see the status as `claimed` under the `Action` column.

![Reward Claimed](/assets/img/reward_confirmed.png)

### How to withdraw an unstaked amount

Here, an Indexer withdraws the unstaked amount. The amount is withdrawn from the staking contract back to the Indexer's wallet.

When an amount is unstaked, the tokens are locked for a specific period before they can be withdrawn. This period is indicated by the `START AT` and `END AT` columns.

- To withdraw the unstaked amount, navigate to `Stake & Delegate` -> `My profile`. Then select the `Locked` tab.

- When the tokens are unlocked, the `Withdraw` button will be available.

![Withdraw Unstaked tokens](/assets/img/withdraw_tokens.png)

- Click on `Withdraw` and then confirm the withdrawal. You will be asked to confirm the transaction with MetaMask as well.

![Confirm withdraw](/assets/img/confirm_withdrawal.png)

- Confirm the transaction.

### How to accept an offer in the offer marketplace

- To accept an offer in the "Offer Marketplace", navigate to `Plan & Offer` -> `Offer Marketplace`. 
Then select `Accept` in the last column.

![Accept offer](/assets/img/accept_offer.png)

- Ensure that you have passed the 3 criteria. Then click `Accept` and confirm the Metamask transaction as well. You will be notified about the successful transaction within a few seconds.

![Accept offer and confirm MetaMask Transaction](/assets/img/accept_offer_criteria_and_confirmation.png)

- Once your offer has been accepted, you can note the change under the `Accepted` column.

![Offer Accepted](/assets/img/offer_accepted.png)

### How to update your controller account

- On the `Account` page, click on `Manage Controllers` button to visit the `Controller Management` page. 

- Next, click on `Create an Account` button to create a new controller account. 

![Controller Management](/assets/img/manage-controllers-page.png) 

- Then you will see your new account on the screen. Click on the `Active` button as shown in the screen.  
![Create new controller](/assets/img/create-new-controller-account.png) 

- You will be asked to send the transaction on MetaMask. Hit `Send Transaction`. Confirm the transaction with Metamask as well. 

![Active controller](/assets/img/send-tx-to-update-controller.png) 

- After the transaction has been processed, you would be able to see the new controller the top of the list. Note the `Active` label. 

![Controller updated](/assets/img/controller-page-controller-updated.png) 
