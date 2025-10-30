Check out our [EVM Manifest File](../../build/manifest/chain-specific/ethereum.md) documentation to get more information about the Project Manifest (`project.ts`) file.

::: warning Flare Configuration Required
When configuring your Flare project, you must replace the example Ethereum values with Flare-specific configuration:

- **Chain ID**: Use Flare's chain ID (`14` for mainnet, `114` for coston2 testnet)
- **RPC Endpoints**: Use Flare RPC endpoints instead of Ethereum endpoints
- **Network**: Set the network configuration to match Flare's specifications

Example Flare configuration in your `project.ts`:
```ts
network: {
  chainId: "14", // Flare mainnet
  endpoint: "https://flare-api.flare.network/ext/C/rpc",
  // or use other supported RPC endpoints
}
```

For the most up-to-date Flare RPC endpoints and network information, refer to the [official Flare documentation](https://docs.flare.network/reference/flare-rpc-endpoints/).
:::
