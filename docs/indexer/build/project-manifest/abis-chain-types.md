# ABIs and Chain Types

This section covers how to work with Application Binary Interfaces (ABIs) and chain-specific data types in your SubQuery project manifests and mappings.

## ABIs (Application Binary Interfaces)

ABIs define the interface between your application and smart contracts, enabling SubQuery to understand and decode contract data.

### EVM Networks

For EVM-compatible networks, ABIs are JSON files that describe contract interfaces.

#### Including ABIs in Your Project

ABIs are referenced in the manifest under the `assets` field:

```ts
{
  dataSources: [
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 1,
      options: {
        abi: "erc20", // Reference to the ABI name
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      },
      assets: new Map([
        ["erc20", { file: "./abis/erc20.abi.json" }] // ABI file mapping
      ]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          // handlers here
        ],
      },
    },
  ]
}
```

#### ABI File Structure

ABI files are standard Ethereum ABI JSON format:

```json
[
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  }
]
```

#### TypeChain Integration

SubQuery works seamlessly with [TypeChain](https://github.com/dethcrypto/TypeChain) to generate typescript interfaces from your ABI files:

```bash
# Generate types from ABI
npx typechain --target=ethers-v5 './abis/*.json' --out-dir src/types/contracts
```

This generates strongly-typed contract interfaces you can use in your mappings:

```ts
import { Erc20__factory } from '../types/contracts'

// Create an instance of the contract
const erc20 = Erc20__factory.connect(contractAddress, api);

// Query the balance with full type safety
const balance = await erc20.balanceOf(address);
```

### Cosmos Networks

Cosmos networks don't use ABIs in the same way as EVM networks, but you can define message types and event structures.

### Polkadot/Substrate Networks

Substrate networks use runtime metadata instead of ABIs. The runtime metadata is automatically fetched and used to decode extrinsics and events.

### Solana Networks

Solana programs use IDL (Interface Description Language) files instead of ABIs:

```json
{
  "version": "0.1.0",
  "name": "my_program",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "data",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "value",
          "type": "u64"
        }
      ]
    }
  ]
}
```

## Chain-Specific Data Types

Different blockchain networks use different data types and structures.

### EVM Networks

EVM networks use standard Ethereum data types:

- **Addresses**: 20-byte hex strings (e.g., `0x742d35cc6634c0532925a3b8d0ce6db64ae9e21`)
- **Block Numbers**: `BigInt` or `number`
- **Transaction Hashes**: 32-byte hex strings
- **Wei Values**: `BigInt` for precise arithmetic
- **Gas**: `BigInt` for gas amounts

#### Common EVM Types

```ts
import { EthereumBlock, EthereumTransaction, EthereumLog } from "@subql/types-ethereum";

// Block data structure
interface EthereumBlock {
  blockNumber: number;
  blockHash: string;
  parentHash: string;
  timestamp: Date;
  // ... other fields
}

// Transaction data structure
interface EthereumTransaction {
  hash: string;
  from: string;
  to?: string;
  value: bigint;
  gasLimit: bigint;
  gasPrice: bigint;
  // ... other fields
}

// Log/Event data structure
interface EthereumLog {
  address: string;
  topics: string[];
  data: string;
  blockNumber: number;
  transactionHash: string;
  // ... other fields
}
```

### Cosmos Networks

Cosmos networks use different data structures:

```ts
import { CosmosBlock, CosmosTransaction, CosmosEvent, CosmosMessage } from "@subql/types-cosmos";

// Cosmos addresses use bech32 format
const cosmosAddress = "cosmos1abc123...";

// Block structure
interface CosmosBlock {
  block: {
    header: {
      height: string;
      time: string;
      chainId: string;
    };
  };
}
```

### Polkadot/Substrate Networks

Substrate networks have their own type system:

```ts
import { SubstrateBlock, SubstrateExtrinsic, SubstrateEvent } from "@subql/types";

// Substrate addresses can be in various formats
const substrateAddress = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"; // SS58 format
```

### Solana Networks

Solana has its own data structures:

```ts
import { SolanaBlock, SolanaTransaction } from "@subql/types-solana";

// Solana addresses are base58 encoded
const solanaAddress = "11111111111111111111111111111112";

// Solana uses different account model
interface SolanaTransaction {
  signatures: string[];
  message: {
    accountKeys: string[];
    instructions: Instruction[];
  };
}
```

### Near Networks

Near uses account-based addressing:

```ts
import { NearBlock, NearTransaction } from "@subql/types-near";

// Near addresses can be human-readable
const nearAddress = "alice.near";
const implicitAddress = "abc123..."; // hex format for implicit accounts
```

## Working with Multiple Chain Types

When building multi-chain projects, you may need to handle different data types:

```ts
// Helper function to normalize addresses across chains
function normalizeAddress(address: string, chainType: 'evm' | 'cosmos' | 'substrate'): string {
  switch (chainType) {
    case 'evm':
      return address.toLowerCase(); // EVM addresses are case-insensitive
    case 'cosmos':
      return address; // Cosmos addresses are bech32, case-sensitive
    case 'substrate':
      return address; // Substrate addresses vary by network
  }
}

// Helper function to handle different numeric types
function normalizeBigInt(value: string | number | bigint): bigint {
  return BigInt(value.toString());
}
```

## Best Practices

### ABI Management
1. **Version Control**: Keep ABI files in version control
2. **Organization**: Store ABIs in a dedicated `/abis` directory
3. **Naming**: Use descriptive names for ABI references
4. **Verification**: Ensure ABIs match deployed contracts

### Type Safety
1. **Use TypeChain**: Generate typed contracts for better development experience
2. **Validate Data**: Always validate data from chain before processing
3. **Handle Nulls**: Check for null/undefined values in chain data
4. **BigInt Arithmetic**: Use BigInt for all token amounts and large numbers

### Multi-Chain Considerations
1. **Abstract Common Types**: Create common interfaces for cross-chain data
2. **Chain-Specific Logic**: Isolate chain-specific code in separate modules
3. **Address Validation**: Implement chain-specific address validation
4. **Number Handling**: Be consistent with number type handling across chains