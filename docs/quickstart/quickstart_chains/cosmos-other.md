# Other Supported Cosmos Zones

Although we only list quick start guides for [Juno](./cosmos-juno.md), [Cronos](./cosmos-cronos.md), and [Thorchain](./cosmos-thorchain.md) - SubQuery has been tested to support all the following Cosmos zones and you can quickly initialise a new project in any of them using the `subql init` command:

CosmWasm Projects:

- [Axelar](https://github.com/subquery/cosmos-subql-starter/tree/main/Axelar/axelar-starter)
- [COMDEX](https://github.com/subquery/cosmos-subql-starter/tree/main/Comdex/comdex-starter)
- [CosmosHub](https://github.com/subquery/cosmos-subql-starter/tree/main/CosmosHub/cosmoshub-starter)
- [Fetch.ai](https://github.com/subquery/cosmos-subql-starter/tree/main/Fetch.ai/fetchhub-starter)
- [Injective](https://github.com/subquery/cosmos-subql-starter/tree/main/Injective/injective-starter)
- [Juno](https://github.com/subquery/cosmos-subql-starter/tree/main/Juno/juno-starter)
- [Kava](https://github.com/subquery/cosmos-subql-starter/tree/main/Kava/kava-starter)
- [Osmosis](https://github.com/subquery/cosmos-subql-starter/tree/main/Osmosis/osmosis-starter)
- [Persistence](https://github.com/subquery/cosmos-subql-starter/tree/main/Persistence/persistence-starter)
- [Stargaze](https://github.com/subquery/cosmos-subql-starter/tree/main/Stargaze/stargaze-starter)
- [Thorchain](https://github.com/subquery/cosmos-subql-starter/tree/main/Thorchain/thorchain-starter)

Ethermint Projects:

- [Cronos](https://github.com/subquery/cosmos-subql-starter/tree/main/Cronos)
  (view the [quick start guide](./cosmos-cronos.md))
- [OKC Chain (by OKX)](https://github.com/subquery/cosmos-subql-starter/tree/main/OKX/okx-starter)

View the full list of tested projects in [the cosmos-subql-starter repository](https://github.com/subquery/cosmos-subql-starter).

## Can SubQuery Support your Cosmos Zone

::: tip SubQuery Supports most Cosmos Zones

**We're confident that SubQuery can support all CosmWasm or Ethermint based Cosmos Zones!**

If your (or anyone else's Cosmos zone) needs indexing support, we're pretty confident that SubQuery will work off the shelf with it! Reach out to us on Discord or at [hello@subquery.network](hello@subquery.network) and we can help out, or continue with the steps below.
:::

**Before you start, you will need:**

- Access to a full archive node to index from
- Any protobuf files that are required for the network (these end in `.proto`). For example, you can find Osmosis' protobuf definitions [here](https://buf.build/osmosis-labs/osmosis/tree/main:osmosis)
- It's helpful to have a block explorer to see what you are trying to index first, [Mintscan](https://www.mintscan.io/cosmos) is a popular Cosmos explorer.

**1. Clone an existing starter project**

Clone a project from: [https://github.com/subquery/cosmos-subql-starter](https://github.com/subquery/cosmos-subql-starter) to start with some standard boilerplate (it might be easiest to just fork that repo and copy an existing one that is most like your chain).

**2. Update project.yaml & package.json file**

In the `package.json`, you will want to update the `name` and `description`.

The majority of changes occur in the project manifest (`project.yaml`). This include the following:

- `name`
- `description`
- `network.chainId`: This will be the network identifier of the Cosmos Zone
  chainId. You can often search for this in https://github.com/cosmos/chain-registry.
- `network.endpoint`: This defines the (HTTP or WSS) endpoint of the blockchain to be indexed - **this must be a full archive node**. This property can be a string or an array of strings (e.g. `endpoint: ['rpc1.endpoint.com', 'rpc2.endpoint.com']`). Read more in [Network Spec](../../build/manifest/cosmos.md#network-spec).
- `network.dictionary`: Unless you have already created a [dictionary](../../academy/tutorials_examples/dictionary.md), please comment out or remove this.
- `network.chainTypes`: Please see the docs under [Chain Types](../../build/manifest/cosmos.md#chain-types).

We suggest adding one or two chain types that relate to the events or messages that you are trying to index, and recursively add more after running it and observing errors from missing protobuf definitionns

**3. Update Readme**

Update the README file with a description and a sample GraphQL query of your project

**4. Contribute back to our starter projects**

Please contribute your new chain back to our starter projects by making a PR back to [https://github.com/subquery/cosmos-subql-starter](https://github.com/subquery/cosmos-subql-starter).

We really appreciate it, and will absolutely give you a shout out for your effort on social media to our community!

## What’s Next?

Congratulations! You have now a locally running Cosmos SubQuery project that accepts GraphQL API requests.

::: tip Tip

Find out how to build a performant SubQuery project and avoid common mistakes in [Project Optimisation](../../build/optimisation.md).

:::

Click [here](../../quickstart/whats-next.md) to learn what should be your **next step** in your SubQuery journey.
