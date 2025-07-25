# Other Supported Polkadot/Substrate Chains

Although we only list quick start guides for select Polkadot networks - SubQuery has been tested to support most Polkadot parachains and standalone Substrate chains and you can quickly initialise a new project in any [supported network](https://subquery.network/networks) using the `npx @subql/cli init` command.

View the full list of tested projects in [the subql-starter repository](https://github.com/subquery/subql-starter).

## Can SubQuery Support your Substrate Chain

::: tip SubQuery Supports most Substrate Chains and Polkadot Parachains

**We're confident that SubQuery can support all Substrate-based chains**

If your (or anyone else's Substrate chain) needs indexing support, we're pretty confident that SubQuery will work off the shelf with it! Reach out to us on Discord or at [hello@subquery.network](hello@subquery.network) and we can help out, or continue with the steps below.
:::

**Before you start, you will need:**

- Access to a full archive node to index from
- Any chain definition files. We usually retrieve these definitions from the [official Polkadot.js repo](https://github.com/polkadot-js/apps/tree/master/packages/apps-config/src/api/spec), where each network lists their their chaintypes.
- It's helpful to have a block explorer to see what you are trying to index first, [Subscan](https://www.subscan.io/) is a popular Substrate chain explorer.

**1. Clone an existing starter project**

Clone a project from: [https://github.com/subquery/subql-starter](https://github.com/subquery/subql-starter) to start with some standard boilerplate (it might be easiest to just fork that repo and copy an existing one that is most like your chain).

**2. Update project.ts & package.json file**

In the `package.json`, you will want to update the `name` and `description`.

The majority of changes occur in the project manifest (`project.ts`). This include the following:

- `name`
- `description`
- `network.chainId`: This will be the network identifier of the Substrate chain. In Substrate it is always the genesis hash of the network (hash of the first block). You can retrieve this easily by going to [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) and looking for the hash on **block 0** - e.g. for Kusama it is `0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe`.
- `network.endpoint`: This defines the (HTTP or WSS) endpoint of the blockchain to be indexed - **this must be a full archive node**. This property can be a string or an array of strings (e.g. `endpoint: ['rpc1.endpoint.com', 'rpc2.endpoint.com']`). Read more in [Network Spec](../../build/manifest/polkadot.md#network-spec).
- `network.dictionary`: Unless you have already created a [dictionary](../../academy/tutorials_examples/dictionary.md), please comment out or remove this.
- `network.chainTypes`: Please see the docs under [Custom Chains - Working Example](../../build/manifest/polkadot.md#working-example).

**3. Update Readme**

Update the README file with a description and a sample GraphQL query of your project

**4. Contribute back to our starter projects**

Please contribute your new chain back to our example projects by making a PR back to [https://github.com/subquery/subql-starter](https://github.com/subquery/subql-starter).

We really appreciate it, and will absolutely give you a shout out for your effort on social media to our community!

## What’s Next?

Congratulations! You have now a locally running Substrate/Polkadot SubQuery project that accepts GraphQL API requests.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
