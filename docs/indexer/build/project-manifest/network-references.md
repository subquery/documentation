# Network References

This section provides comprehensive reference information for all supported blockchain networks, including network-specific configurations, endpoints, and chain identifiers.

## EVM Networks

All EVM-compatible networks use the same manifest structure and `@subql/node-ethereum` runner since they are EVM-compatible.

### Ethereum
- **Chain ID**: `1` (mainnet), `11155111` (Sepolia)
- **Runner**: `@subql/node-ethereum`
- **Types**: `@subql/types-ethereum`
- **Sample Endpoint**: `https://ethereum.rpc.subquery.network/public`
- **Dictionary**: `https://gx.api.subquery.network/sq/subquery/eth-dictionary`

### Polygon
- **Chain ID**: `137` (mainnet), `80001` (Mumbai testnet)
- **Runner**: `@subql/node-ethereum`
- **Types**: `@subql/types-ethereum`

### BNB Smart Chain (BSC)
- **Chain ID**: `56` (mainnet), `97` (testnet)
- **Runner**: `@subql/node-ethereum`
- **Types**: `@subql/types-ethereum`

### Arbitrum
- **Chain ID**: `42161` (One), `421614` (Sepolia)
- **Runner**: `@subql/node-ethereum`
- **Types**: `@subql/types-ethereum`

### Optimism
- **Chain ID**: `10` (mainnet), `11155420` (Sepolia)
- **Runner**: `@subql/node-ethereum`
- **Types**: `@subql/types-ethereum`

### Avalanche
- **Chain ID**: `43114` (C-Chain)
- **Runner**: `@subql/node-ethereum`
- **Types**: `@subql/types-ethereum`
- **Note**: The legacy `@subql/node-avalanche` is deprecated. Use `@subql/node-ethereum` for better performance.

### Base
- **Chain ID**: `8453` (mainnet), `84532` (Sepolia)
- **Runner**: `@subql/node-ethereum`
- **Types**: `@subql/types-ethereum`

### Gnosis
- **Runner**: `@subql/node-ethereum`
- **Types**: `@subql/types-ethereum`

### Flare
- **Runner**: `@subql/node-ethereum`
- **Types**: `@subql/types-ethereum`

## Cosmos Networks

### Cosmos Hub
- **Chain ID**: `cosmoshub-4`
- **Runner**: `@subql/node-cosmos`
- **Types**: `@subql/types-cosmos`

### Osmosis
- **Chain ID**: `osmosis-1`
- **Runner**: `@subql/node-cosmos`
- **Types**: `@subql/types-cosmos`

### Juno
- **Chain ID**: `juno-1`
- **Runner**: `@subql/node-cosmos`
- **Types**: `@subql/types-cosmos`

### Akash
- **Chain ID**: `akashnet-2`
- **Runner**: `@subql/node-cosmos`
- **Types**: `@subql/types-cosmos`

### Archway
- **Chain ID**: `archway-1`
- **Runner**: `@subql/node-cosmos`
- **Types**: `@subql/types-cosmos`

### Neutron
- **Chain ID**: `neutron-1`
- **Runner**: `@subql/node-cosmos`
- **Types**: `@subql/types-cosmos`

### Sei
- **Chain ID**: `sei-1`
- **Runner**: `@subql/node-cosmos`
- **Types**: `@subql/types-cosmos`

### Dymension
- **Chain ID**: `dymension_1100-1`
- **Runner**: `@subql/node-cosmos`
- **Types**: `@subql/types-cosmos`

## Polkadot/Substrate Networks

### Polkadot
- **Runner**: `@subql/node-substrate`
- **Types**: `@subql/types`
- **Network**: Use genesis hash as network identifier

### Kusama
- **Runner**: `@subql/node-substrate`
- **Types**: `@subql/types`

### Astar
- **Runner**: `@subql/node-substrate`
- **Types**: `@subql/types`

### Moonbeam/Moonriver
- **Runner**: `@subql/node-substrate` (for Substrate functionality) or `@subql/node-ethereum` (for EVM functionality)
- **Types**: `@subql/types` or `@subql/types-ethereum`

### Humanode
- **Runner**: `@subql/node-substrate`
- **Types**: `@subql/types`

## Other Networks

### Solana
- **Network ID**: `mainnet-beta`, `testnet`, `devnet`
- **Runner**: `@subql/node-solana`
- **Types**: `@subql/types-solana`

### Near
- **Network ID**: `mainnet`, `testnet`
- **Runner**: `@subql/node-near`
- **Types**: `@subql/types-near`

### Algorand
- **Runner**: `@subql/node-algorand`
- **Types**: `@subql/types-algorand`

### Starknet
- **Runner**: `@subql/node-starknet`
- **Types**: `@subql/types-starknet`

### Stellar & Soroban
- **Runner**: `@subql/node-stellar`
- **Types**: `@subql/types-stellar`

### Concordium
- **Runner**: `@subql/node-concordium`
- **Types**: `@subql/types-concordium`

## Chain ID Reference

For EVM networks, you can find a complete list of chain IDs at [chainlist.org](https://chainlist.org/).

For Cosmos networks, chain IDs are typically found in the network's genesis file.

For other networks, consult the specific network's documentation for the correct network identifier format.

## Network-Specific Considerations

### EVM Networks
- All EVM networks support the same handler types: Block, Transaction, and Log handlers
- Use the same ABI format across all EVM networks
- Contract addresses are consistent across networks if deployed deterministically

### Cosmos Networks
- Support Block, Transaction, Event, and Message handlers
- Each network may have different modules and event types
- Use the `includeFailedTx` filter to include failed transactions

### Polkadot/Substrate Networks
- Support Block, Event, and Call handlers
- Each parachain may have different runtime modules
- Use runtime version for handling runtime upgrades

### Solana
- Support Block, Transaction, and Instruction handlers
- Uses different address format (base58)
- Programs (smart contracts) use different deployment model

### Near
- Support Block, Transaction, and Action handlers
- Uses account-based model with human-readable account names
- Different function call structure compared to EVM