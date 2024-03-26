# Creating Plans and Making Requests

Consumers can easily create plans to start quering data from their chosen indexed project via our decentralised netowrk of Node Operators.

Our Flex plan creation process is as strealined as possible and is similar to any centralised alternative, it only takes a few minutes before you have a API key and a single production endpoint that you can query through.

## Plan Options

Currently we only allow Consumers to purchase [Flex plans](../introduction/payment-methods.md#flex-plans-pay-as-you-go--payg) for selected Project deployments for their favourite Node Operators. Flex plans are pay-as-you-go plans where you pay a specified rate per thousand request. At the end of a Flex plan you receive a API endpoint with your own API key to protect it can be renewed whenever they expire.

Some Project deployments also have a free public endpoint sponsored by the customer, where available you will see this. By accessing public RPC endpoints, you agree to the SubQuery Foundation [Free Public RPC terms of service](https://subquery.foundation/public-rpc-terms).

## Creating a Flex Plan

To create a new Flex Plan, the first place to start should be finding your selected Project Deployment on the [SubQuery Network Explorer](https://app.subquery.network/explorer/home). On each project deployment, you will see a button called "Get Endpoint".

You may be asked to chose between the different options for a plan for this Project Deployment. Select Flex Plan to continue, or otherwise consider using a public endpoint.

![Consumer Get Endpoint Step 1](/assets/img/network/consumer_get_endpoint_1.png)

### Setting your Flex Plan Pricing

When creating a Flex Plan, SubQuery will automatically select qualified Node Operators for your Flex Plan endpoint based on price and performance. However you do need to set a price limit, the maximum price that you are willing to pay per thousand requests.

We recommend you pick between our suggested options, which are automatically calculated based off the prices of all the existing Node Operators for this Project Deployment. Alternatively advanced users can enter a custom price limit. Please note that if you set a price limit too low, few Node Operators may be able to serve requests, and your performance and reliability might suffer as a result.

![Consumer Get Endpoint Step 2](/assets/img/network/consumer_get_endpoint_2.png)

### Depositing Funds into your Billing Account

Every SubQuery account has a billing account where SQT can be deposited in and where you authorise SubQuery to deduct funds to pay for Flex plans. If your billing account runs out of SQT, Flex plans will automatically cancel and your endpoint will stop working.

SQT that is currently in a billing account can easily be withdrawn at any time with no delay, so we recommend that you ensure that there is sufficient SQT in the billing account to cover for a longer period of the Flex Plan running (you don't want it to run out while you sleep!).

When creating a Flex plan, you must deposit funds into your billing account, or you can optionally top up an existing billing account with additional funds.

![Consumer Get Endpoint Step 3](/assets/img/network/consumer_get_endpoint_3.png)

### Approve and sign necessary transactions

You will be prompted to sign and approve a number of transactions. Please follow the steps shown on the page to do so using your connected wallet.

### View and Access Endpoint and API key

You can view your personalised endpoint and API key on the final step. This allows you to connect to the endpoint and make queries through SubQuerys Gateway. You can get the endpoint in the future by also navigating to Consumer > My Flex Plans.

This endpoint acts like any other endpoint that you would use for API or RPC calls. In many cases we even show an example query right there for you to copy into your terminal window to try out. API keys can either be sent as a query parameter (`https:://your.endpoint.url/?apikey=<APIKEY>`) or as a request header (`'apikey': '<APIKEY>'`).

::: warning API keys are private

Never share your API key with anyone, they give access to make queries through your own billing acccount. When using them, keep them private as environment variables and avoid publishing them in public git repositories or on public websites.

:::

![Consumer Get Endpoint Step 4](/assets/img/network/consumer_get_endpoint_4.png)

## Managing Billing Account Balances

Every SubQuery account has a billing account where SQT can be deposited in and where you authorise SubQuery to deduct funds to pay for Flex plans. If your billing account runs out of SQT, Flex plans will automatically cancel and your endpoint will stop working.

SQT that is currently in a billing account can easily be withdrawn at any time with no delay, so we recommend that you ensure that there is sufficient SQT in the billing account (you don't want it to run out while you sleep!).

You can always check your billing account balance on Consumer > My Flex Plan menu.

![Consumer Flex Plan Menu](/assets/img/network/consumer_flex_plan.png)

At any time you can withdraw or deposit more SQT into your billing account by clicking on the relevant action next to the billing account action.

![Consumer Billing Account Action](/assets/img/network/consumer_billing_account_action.png)

![Consumer Billing Account](/assets/img/network/consumer_billing_account.png)
