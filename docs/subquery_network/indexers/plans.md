# Managing Plans and Agreements

For the initial stages of Kepler, the SubQuery Council will recommend various plan configurations for some projects, and for others recommend some PAYG settings. For plan configuration, the SubQuery Council will set some default plan templates to make plan management and creation easier, and speed up the testing and analysis of various parameters of the network. As a result, plan creation is very easy and just requires to you enter a price.

## Creating a Fixed Price Plan

All plans will be orientated around the length of an Era, which is currently one week but may be increased to a fortnight (two weeks). Towards the end of each era, we will release the suggested plan templates, recommended pricing, an and other instructions for the start of the next period.

**We strongly recommend not exceeding our recommended pricing when setting your price, otherwise you might not be picked for the next era**

To create a default plan, on the Indexer Admin App, navigate to `Plan & Offer` -> `My Plans`. Then select `Create a Plan`.

![Create plan](/assets/img/plan_empty.png)

After that, select a template for the plan.

![Select plan template](/assets/img/plan_template_select.png)

Enter a price (in kSQT) and the Deployment ID that you want to create the plan for. Then click `Create`.

![Set plan parameters](/assets/img/plan_price.png)

You will see a pop-up to confirm your transaction with Metamask. Click on `Confirm` and wait for a few seconds. Then you will see a default plan created in the `Default` tab.

![Default plan created](/assets/img/plans.png)

:::info Kepler will automatically select your plan

Note, for the Kepler network, the SubQuery council will automatically select and create agreements from the best indexers based off your plans. You don't need to do anything else here to be selected apart from performing your key role as an indexer.

[Learn more about how we select indexers for agreements here](./become-an-indexer.md#understanding-how-kepler-will-operate-for-indexers).

:::

## Creating a Flex Plan (Pay as you Go / PAYG)

Flex plans are pay as you go prices that indexes will list per thousand requests, it provides a more flexible pricing model that requires no up front commitment.

To create or view your existing Flex plans, on the Indexer Admin App, navigate to the project detail page and view the Flex Plan tab.

![Flex Plan Tab](/assets/img/flex-plan.png)

Click `Enable Flex Plan` to enable flex plan pricing for this particular project. You can then enter the following settings

- The price per 1,000 requests. A good starting place is 1 kSQT or SQT per 1,000 requests
- A validity period. This is for how long the pricing will be valid for consumers that take this up. E.g. if a new consumer opens a state channel with your Flex plan, they are garanteed this price for this many days once that channel is opened. A longer number of days gives greater price certainty, but reduces the indexers ability to adjust prices to match costs. A good starting place is 7 days.

![Flex Plan Create](/assets/img/flex-plan-create.png)

You can view the number of consumers that have open and ongoing Flex plans with you.

You can also update your existing flex plans just the same way. Note that consumers that already have a state channel with your Flex plan will continue to receive the old price that they opened the state channel at until the validity period expires for them.

![Flex Plan Update](/assets/img/flex-plan-update.png)

## Claiming Rewards from a Plan Agreement

Read more at [claiming rewards from a plan agreement](./rewards.md#claiming-rewards-from-a-plan-agreement).
