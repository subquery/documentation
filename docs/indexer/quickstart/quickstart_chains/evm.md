# Other EVM Networks

Although we only list quick start guides for select EVM based networks - SubQuery has been tested to support all standard EVM implementations. You can quickly initialise a new project in any [supported network](https://subquery.network/networks) using the `subql init` command:

View the full list of tested EVM projects in [the ethereum-subql-starter repository](https://github.com/subquery/ethereum-subql-starter).

## Can SubQuery Support your EVM Network

::: tip SubQuery supports all pure EVM implementations

**We're confident that SubQuery supports all pure EVM implementations!**

If your (or anyone else's EVM network) needs indexing support, we're pretty confident that SubQuery will work off the shelf with it! Reach out to us on Discord or at [hello@subquery.network](hello@subquery.network) and we can help out, or continue with the steps below.
:::

**Before you start, you will need:**

- Access to a public RPC node to index from
- The chain ID of the network
- An example ERC20 token to test indexing against (It's helpful to have a block explorer to see details about it, [Blockscout](https://www.blockscout.com/) is a popular EVM explorer)

**Fill out the Automated EVM Support Form**

This issue template triggers an automated action to add support for your EVM network. It's takes only a few seconds to complete, and automates the setup and testing of your network.

Fill out the [New Chain Support Request form](https://github.com/subquery/ethereum-subql-starter/issues/new?assignees=&labels=CHAIN_SUPPORT&projects=&template=chain-support.yml&title=Adding+chain+support+for+...), just like we have in the example below.

![Example new chain support request](/assets/img/new-evm-chain-support.png)

This will create a new [issue like so](https://github.com/subquery/ethereum-subql-starter/issues/100), and then trigger an automated GitHub pipeline to generate a custom example for your chain and save it as a PR. You can then download or clone this branch to start developing.

Our team will review your PR, and add it to the offical examples repository in a few days. We really appreciate it, and will absolutely give you a shout out for your effort on social media to our community! Reach out to us at [hello@subquery.network](mailto:hello@subquery.network) so we can work together on making sure the community knows about SubQuery's support for your EVM network.

## What’s Next?

Congratulations! You have now a locally running EVM SubQuery project that accepts GraphQL API requests.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
