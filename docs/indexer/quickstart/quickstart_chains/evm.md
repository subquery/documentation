# Other EVM Networks

Although we only list quick start guides for select EVM based networks - SubQuery has been tested to support all standard EVM implementations. You can quickly initialise a new project in any [supported network](https://subquery.network/networks) using the `subql init` command:

View the full list of tested EVM projects in [the ethereum-subql-starter repository](https://github.com/subquery/ethereum-subql-starter).

## Can SubQuery Support your EVM Network

::: tip SubQuery supports all pure EVM implementations

**We're confident that SubQuery supports all pure EVM implementations!**

If your (or anyone else's EVM network) needs indexing support, we're pretty confident that SubQuery will work off the shelf with it! Reach out to us on Discord or at [hello@subquery.network](hello@subquery.network) and we can help out, or continue with the steps below.
:::

**Before you start, you will need:**

- Access to a RPC node to index from
- The chain ID of the network
- It's helpful to have a block explorer to see what you are trying to index first, [Blockscout](https://www.blockscout.com/) is a popular EVM explorer.

**1. Clone an existing starter project**

Clone a project from: [https://github.com/subquery/ethereum-subql-starter](https://github.com/subquery/ethereum-subql-starter) to start with some standard boilerplate (it might be easiest to just fork that repo and copy an existing one that is most like your chain).

**2. Update project.ts & package.json file**

In the `package.json`, you will want to update the `name` and `description`.

The majority of changes occur in the project manifest (`project.ts`). This include the following:

- `name`
- `description`
- `network.chainId`: This will be the ethereum chain ID, for example [Ethereum is `1`](https://chainlist.org/chain/1), [Optimism is `10`](https://chainlist.org/chain/10), [Polygon is `137`](https://chainlist.org/chain/137).
- `network.endpoint`: This defines the (HTTP or WSS) RPC endpoint of the blockchain to be indexed. This property can be a string or an array of strings (e.g. `endpoint: ['rpc1.endpoint.com', 'rpc2.endpoint.com']`). Read more in [Network Spec](../../build/manifest/ethereum.md#network-spec).

**3. Update Readme**

Update the README file with a description and a sample GraphQL query of your project

**4. Contribute back to our starter projects**

Please contribute your new chain back to our example projects by making a PR back to [https://github.com/subquery/ethereum-subql-starter](https://github.com/subquery/ethereum-subql-starter).

We really appreciate it, and will absolutely give you a shout out for your effort on social media to our community!

## What’s Next?

Congratulations! You have now a locally running EVM SubQuery project that accepts GraphQL API requests.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
