# Network Configuration

The network configuration defines which blockchain network your SubQuery project will index data from. This section of the manifest specifies the essential network parameters and connection details.

## Network Spec

If you start your project by using the `npx @subql/cli init` command, you'll generally receive a starter project with the correct network settings. If you are changing the target chain of an existing project, you'll need to edit the Network Spec section of this manifest.

| Field            | Type                                                    | Description                                                                                                                                                                                                 |
| ---------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **chainId**      | String                                                  | A network identifier for the blockchain                                                                                                                                                                     |
| **endpoint**     | String or String[] or Record\<String, IEndpointConfig\> | Defines the endpoint of the blockchain to be indexed, this can be a string, an array of endpoints, or a record of endpoints to [endpoint configs](#endpoint-config) - **This must be a full archive node**. |
| **dictionary**   | String                                                  | It is suggested to provide the HTTP endpoint of a full chain dictionary to speed up processing - read [how a SubQuery Dictionary works](../../academy/tutorials_examples/dictionary.md).                    |
| **bypassBlocks** | Array                                                   | Bypasses stated block numbers, the values can be a `range`(e.g. `"10- 50"`) or `integer`, see [Bypass Blocks](#bypass-blocks)                                                                               |

## Chain IDs by Network

### EVM Networks
- **Ethereum**: `1` (mainnet), `11155111` (Sepolia)
- **Polygon**: `137` (mainnet), `80001` (Mumbai testnet)
- **BNB Smart Chain**: `56` (mainnet), `97` (testnet)
- **Arbitrum**: `42161` (One), `421614` (Sepolia)
- **Optimism**: `10` (mainnet), `11155420` (Sepolia)
- **Avalanche**: `43114` (C-Chain)
- **Base**: `8453` (mainnet), `84532` (Sepolia)

For a complete list of chain IDs, see https://chainlist.org/

### Non-EVM Networks
- **Cosmos**: Use chain-id from genesis (e.g., `cosmoshub-4`, `osmosis-1`)
- **Polkadot**: Use genesis hash or network identifier
- **Solana**: `mainnet-beta`, `testnet`, `devnet`
- **Near**: `mainnet`, `testnet`

## Endpoint Configuration

Additionally you will need to update the `endpoint`. This defines the (HTTP or WSS) endpoint of the blockchain to be indexed - **this must be a full archive node**. This property can be a string or an array of strings (e.g. `endpoint: ['rpc1.endpoint.com', 'rpc2.endpoint.com']`). We suggest providing an array of endpoints as it has the following benefits:

- Increased speed - When enabled with [worker threads](../../run_publish/references.md#w---workers), RPC calls are distributed and parallelised among RPC providers. Historically, RPC latency is often the limiting factor with SubQuery.
- Increased reliability - If an endpoint goes offline, SubQuery will automatically switch to other RPC providers to continue indexing without interruption.
- Reduced load on RPC providers - Indexing is a computationally expensive process on RPC providers, by distributing requests among RPC providers you are lowering the chance that your project will be rate limited.

Public nodes may be rate limited which can affect indexing speed, when developing your project we suggest getting a private API key from a professional RPC provider.

## Endpoint Config

This allows you to set specific options relevant to each specific RPC endpoint that you are indexing from. This is very useful when endpoints have unique authentication requirements, or they operate with different rate limits.

Here is an example of how to set an API key in the header of RPC requests in your endpoint config.

```ts
{
  network: {
    endpoint: {
      "https://ethereum.rpc.subquery.network/public": {
        headers: {
          "x-api-key": "your-api-key",
        },
        // NOTE: setting this to 0 will not use batch requests
        batchSize: 5
      }
    }
  }
}
```

## Bypass Blocks

Bypass Blocks allows you to skip the stated blocks, this is useful when there are erroneous blocks in the chain or when a chain skips a block after an outage or a hard fork. It accepts both a `range` or single `integer` entry in the array.

When declaring a `range` use an string in the format of `"start - end"`. Both start and end are inclusive, e.g. a range of `"100-102"` will skip blocks `100`, `101`, and `102`.

```ts
{
  network: {
    bypassBlocks: [1, 2, 3, "105-200", 290];
  }
}
```

## Real-time indexing (Block Confirmations)

As indexers are an additional layer in your data processing pipeline, they can introduce a massive delay between when an on-chain event occurs and when the data is processed and able to be queried from the indexer.

SubQuery provides real time indexing of unconfirmed data directly from the RPC endpoint that solves this problem. SubQuery takes the most probabilistic data before it is confirmed to provide to the app. In the unlikely event that the data isn't confirmed and a reorg occurs, SubQuery will automatically roll back and correct its mistakes quickly and efficiently - resulting in an insanely quick user experience for your customers.

To control this feature, please adjust the [--block-confirmations](../../run_publish/references.md#block-confirmations) command to fine tune your project and also ensure that [historic indexing](../../run_publish/references.md#disable-historical) is enabled (enabled by default). The default block confirmations for SubQuery projects is currently 200 blocks.