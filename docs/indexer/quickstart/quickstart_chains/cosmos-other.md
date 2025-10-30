# Other Supported Cosmos Zones

Although we only list quick start guides for select Cosmos zones - SubQuery has been tested to support most zones that that use CosmWasm, Tendermint, or Ethermint. You can quickly initialise a new project in any [supported network](https://subquery.network/networks) using the `npx @subql/cli init` command:

CosmWasm Projects:

- [Axelar](https://github.com/subquery/cosmos-subql-starter/tree/main/Axelar/axelar-starter)
- [COMDEX](https://github.com/subquery/cosmos-subql-starter/tree/main/Comdex/comdex-starter) ([Quick start video](https://www.youtube.com/watch?v=uAhE4SxcbGk))
- [CosmosHub](https://github.com/subquery/cosmos-subql-starter/tree/main/CosmosHub/cosmoshub-starter)
- [Evmos](https://github.com/subquery/cosmos-subql-starter/tree/main/Evmos/evmos-starter) ([Quick start video](https://www.youtube.com/watch?v=tfB8hi0cHy4))
- [Fetch.ai](https://github.com/subquery/cosmos-subql-starter/tree/main/Fetch.ai/fetchhub-starter) ([Quick start video](https://www.youtube.com/watch?v=lqU0Ivpn3Ww))
- [Injective](https://github.com/subquery/cosmos-subql-starter/tree/main/Injective/injective-starter) ([Quick start video](https://www.youtube.com/watch?v=Z9TSJaiHS70))
- [Juno](https://github.com/subquery/cosmos-subql-starter/tree/main/Juno/juno-starter)
- [Kava](https://github.com/subquery/cosmos-subql-starter/tree/main/Kava/kava-starter) ([Quick start video](https://www.youtube.com/watch?v=B9DUS0brLoI))
- [Osmosis](https://github.com/subquery/cosmos-subql-starter/tree/main/Osmosis/osmosis-starter) ([Quick start video](https://www.youtube.com/watch?v=W9nriCvgQvM))
- [Persistence](https://github.com/subquery/cosmos-subql-starter/tree/main/Persistence/persistence-starter) ([Quick start video](https://www.youtube.com/watch?v=pgSlo41LW84))
- [Stargaze](https://github.com/subquery/cosmos-subql-starter/tree/main/Stargaze/stargaze-starter)
- [Thorchain](https://github.com/subquery/cosmos-subql-starter/tree/main/Thorchain/thorchain-starter)
- [And more...](https://github.com/subquery/cosmos-subql-starter)

Ethermint Projects:

- [Cronos](https://github.com/subquery/cosmos-subql-starter/tree/main/Cronos)
  (view the [quick start guide](./cosmos-cronos.md))
- [OKC Chain (by OKX)](https://github.com/subquery/cosmos-subql-starter/tree/main/OKX/okx-starter)
- [And more...](https://github.com/subquery/cosmos-subql-starter)

View the full list of tested projects in [the cosmos-subql-starter repository](https://github.com/subquery/cosmos-subql-starter).

## Can SubQuery Support your Cosmos Zone

::: tip SubQuery Supports most Cosmos Zones

**We're confident that SubQuery can support all CosmWasm or Ethermint based Cosmos Zones!**

If your (or anyone else's Cosmos zone) needs indexing support, we're pretty confident that SubQuery will work off the shelf with it! Reach out to us on Discord or at [hello@subquery.network](hello@subquery.network) and we can help out, or continue with the steps below.
:::

**Before you start, you will need:**

- Access to a RPC node to index from
- Any protobuf files that are required for the network (these end in `.proto`). For example, you can find Osmosis' protobuf definitions [here](https://buf.build/osmosis-labs/osmosis/tree/main:osmosis)
- It's helpful to have a block explorer to see what you are trying to index first, [Mintscan](https://www.mintscan.io/cosmos) is a popular Cosmos explorer.

**1. Clone an existing starter project**

Clone a project from: [https://github.com/subquery/cosmos-subql-starter](https://github.com/subquery/cosmos-subql-starter) to start with some standard boilerplate (it might be easiest to just fork that repo and copy an existing one that is most like your chain).

**2. Update project.ts & package.json file**

In the `package.json`, you will want to update the `name` and `description`.

The majority of changes occur in the project manifest (`project.ts`). This include the following:

- `name`
- `description`
- `network.chainId`: This will be the network identifier of the Cosmos Zone
  chainId. You can often search for this in https://github.com/cosmos/chain-registry.
- `network.endpoint`: This defines the (HTTP or WSS) endpoint of the blockchain to be indexed - **this must be a full archive node**. This property can be a string or an array of strings (e.g. `endpoint: ['rpc1.endpoint.com', 'rpc2.endpoint.com']`). Read more in [Network Spec](../../build/manifest/chain-specific/cosmos.md#network-spec).
- `network.dictionary`: Unless you have already created a [dictionary](../../academy/tutorials_examples/dictionary.md), please comment out or remove this.
- `network.chainTypes`: Please see the docs under [Chain Types](../../build/manifest/chain-specific/cosmos.md#chain-types).

We suggest adding one or two chain types that relate to the events or messages that you are trying to index, and recursively add more after running it and observing errors from missing protobuf definitions

**3. Update Readme**

Update the README file with a description and a sample GraphQL query of your project

**4. Contribute back to our starter projects**

Please contribute your new chain back to our example projects by making a PR back to [https://github.com/subquery/cosmos-subql-starter](https://github.com/subquery/cosmos-subql-starter).

We really appreciate it, and will absolutely give you a shout out for your effort on social media to our community!

<!-- @include: ../snippets/whats-next.md -->
