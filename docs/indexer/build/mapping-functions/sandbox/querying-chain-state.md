# Querying Chain State

SubQuery provides powerful capabilities for querying blockchain state directly from your mapping functions. This allows you to read contract state, account balances, and other on-chain data at the current indexed block height.

## Overview

Chain state querying enables you to:
- Read smart contract state variables
- Query account balances and token holdings
- Call contract view/pure functions
- Access blockchain metadata and parameters
- Retrieve historical state at specific block heights

## EVM Networks - Contract Queries

For EVM-compatible networks, SubQuery provides a global `api` object that implements an [Ethers.js Provider](https://docs.ethers.io/v5/api/providers/provider/).

### Basic Contract Queries

```ts
import { EthereumLog } from "@subql/types-ethereum";
import { Erc20__factory } from "../types/contracts";

export async function handleTransfer(log: TransferLog): Promise<void> {
  // Create contract instance at current block height
  const erc20 = Erc20__factory.connect(log.address, api);
  
  // Query contract state
  const tokenName = await erc20.name();
  const tokenSymbol = await erc20.symbol();
  const decimals = await erc20.decimals();
  const totalSupply = await erc20.totalSupply();
  
  // Query user balances
  const fromBalance = await erc20.balanceOf(log.args.from);
  const toBalance = await erc20.balanceOf(log.args.to);
  
  logger.info(`Token: ${tokenName} (${tokenSymbol})`);
  logger.info(`From balance: ${fromBalance.toString()}`);
  logger.info(`To balance: ${toBalance.toString()}`);
  
  // Create entity with enriched data
  const transfer = Transfer.create({
    id: log.transactionHash,
    tokenAddress: log.address,
    tokenName,
    tokenSymbol,
    decimals,
    from: log.args.from,
    to: log.args.to,
    value: log.args.value.toBigInt(),
    fromBalance: fromBalance.toBigInt(),
    toBalance: toBalance.toBigInt(),
  });
  
  await transfer.save();
}
```

### Advanced Contract Queries

```ts
export async function handleSwap(log: SwapLog): Promise<void> {
  // Connect to Uniswap V2 pair contract
  const pair = UniswapV2Pair__factory.connect(log.address, api);
  
  // Query pair reserves
  const reserves = await pair.getReserves();
  const token0 = await pair.token0();
  const token1 = await pair.token1();
  
  // Query token information
  const token0Contract = Erc20__factory.connect(token0, api);
  const token1Contract = Erc20__factory.connect(token1, api);
  
  const [token0Symbol, token1Symbol, token0Decimals, token1Decimals] = await Promise.all([
    token0Contract.symbol(),
    token1Contract.symbol(),
    token0Contract.decimals(),
    token1Contract.decimals(),
  ]);
  
  // Calculate prices
  const token0Reserve = reserves.reserve0;
  const token1Reserve = reserves.reserve1;
  const price0 = token1Reserve.mul(10 ** token0Decimals).div(token0Reserve);
  const price1 = token0Reserve.mul(10 ** token1Decimals).div(token1Reserve);
  
  const swap = Swap.create({
    id: log.transactionHash,
    pairAddress: log.address,
    token0Address: token0,
    token1Address: token1,
    token0Symbol,
    token1Symbol,
    token0Reserve: token0Reserve.toBigInt(),
    token1Reserve: token1Reserve.toBigInt(),
    token0Price: price0.toBigInt(),
    token1Price: price1.toBigInt(),
    // ... other swap data
  });
  
  await swap.save();
}
```

### Querying at Specific Block Heights

```ts
export async function handleLog(log: EthereumLog): Promise<void> {
  const contract = MyContract__factory.connect(contractAddress, api);
  
  // Query at current block (default)
  const currentValue = await contract.getValue();
  
  // Query at specific block height
  const pastValue = await contract.getValue({
    blockTag: log.blockNumber - 100 // 100 blocks ago
  });
  
  // Query at block hash
  const valueAtBlock = await contract.getValue({
    blockTag: log.blockHash
  });
  
  logger.info(`Current: ${currentValue}, Past: ${pastValue}, At block: ${valueAtBlock}`);
}
```

### Error Handling for Contract Calls

```ts
export async function handleLog(log: EthereumLog): Promise<void> {
  const contract = Erc20__factory.connect(log.address, api);
  
  try {
    const balance = await contract.balanceOf(log.args.owner);
    
    const entity = MyEntity.create({
      id: log.transactionHash,
      balance: balance.toBigInt(),
    });
    await entity.save();
    
  } catch (error) {
    if (error.code === 'CALL_EXCEPTION') {
      logger.warn(`Contract call failed: ${error.reason}`);
      // Handle the error gracefully - maybe set balance to 0
      const entity = MyEntity.create({
        id: log.transactionHash,
        balance: BigInt(0),
      });
      await entity.save();
    } else {
      logger.error(`Unexpected error: ${error.message}`);
      // Re-throw for other types of errors
      throw error;
    }
  }
}
```

## Native Balance Queries (EVM)

Query native token balances (ETH, MATIC, BNB, etc.):

```ts
export async function handleTransaction(tx: EthereumTransaction): Promise<void> {
  // Query ETH balance
  const balance = await api.getBalance(tx.from, tx.blockNumber);
  
  // Query balance at current block
  const currentBalance = await api.getBalance(tx.from);
  
  logger.info(`Balance at block ${tx.blockNumber}: ${balance.toString()}`);
  logger.info(`Current balance: ${currentBalance.toString()}`);
  
  const account = Account.create({
    id: tx.from,
    balance: balance.toBigInt(),
    lastUpdatedBlock: BigInt(tx.blockNumber),
  });
  
  await account.save();
}
```

## Cosmos Networks - State Queries

For Cosmos networks, you can query state using the Cosmos SDK query interface:

```ts
import { CosmosEvent } from "@subql/types-cosmos";

export async function handleEvent(event: CosmosEvent): Promise<void> {
  // Query bank module for account balance
  try {
    const balanceQuery = await api.query.bank.balance(
      event.event.attributes.find(attr => attr.key === 'recipient')?.value,
      'uatom'
    );
    
    logger.info(`Account balance: ${balanceQuery.amount}`);
    
  } catch (error) {
    logger.error(`Failed to query balance: ${error.message}`);
  }
}
```

## Polkadot/Substrate Networks - Runtime Queries

For Substrate networks, query runtime state:

```ts
import { SubstrateEvent } from "@subql/types";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  // Query account balance
  const accountId = event.event.data[0].toString();
  
  try {
    const accountInfo = await api.query.system.account(accountId);
    const balance = accountInfo.data.free.toBigInt();
    
    logger.info(`Account ${accountId} balance: ${balance}`);
    
    const account = Account.create({
      id: accountId,
      freeBalance: balance,
      blockNumber: BigInt(event.block.block.header.number.toNumber()),
    });
    
    await account.save();
    
  } catch (error) {
    logger.error(`Failed to query account: ${error.message}`);
  }
}
```

### Querying Substrate Storage

```ts
export async function handleEvent(event: SubstrateEvent): Promise<void> {
  // Query staking module
  const era = await api.query.staking.currentEra();
  const validators = await api.query.staking.validators.entries();
  
  logger.info(`Current era: ${era.toString()}`);
  logger.info(`Active validators: ${validators.length}`);
  
  // Query specific validator
  const validatorId = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";
  const validatorPrefs = await api.query.staking.validators(validatorId);
  
  if (validatorPrefs.isSome) {
    const prefs = validatorPrefs.unwrap();
    logger.info(`Validator commission: ${prefs.commission.toNumber()}`);
  }
}
```

## Solana Networks - Account Queries

For Solana networks, query account and program state:

```ts
import { SolanaTransaction } from "@subql/types-solana";

export async function handleTransaction(tx: SolanaTransaction): Promise<void> {
  const connection = api; // Solana connection object
  
  // Query account balance
  const accountKey = tx.transaction.message.accountKeys[0];
  const balance = await connection.getBalance(accountKey.toBase58());
  
  logger.info(`Account ${accountKey.toBase58()} balance: ${balance} lamports`);
  
  // Query token account
  try {
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      accountKey,
      { programId: TOKEN_PROGRAM_ID }
    );
    
    logger.info(`Token accounts: ${tokenAccounts.value.length}`);
    
  } catch (error) {
    logger.error(`Failed to query token accounts: ${error.message}`);
  }
}
```

## Near Networks - View Calls

For Near networks, make view calls to contracts:

```ts
import { NearTransaction } from "@subql/types-near";

export async function handleTransaction(tx: NearTransaction): Promise<void> {
  // Make view call to contract
  try {
    const result = await api.call({
      contractId: 'token.near',
      methodName: 'ft_balance_of',
      args: { account_id: tx.signer_id },
      blockId: tx.blockHeight,
    });
    
    const balance = JSON.parse(Buffer.from(result.result).toString());
    logger.info(`Token balance: ${balance}`);
    
  } catch (error) {
    logger.error(`View call failed: ${error.message}`);
  }
}
```

## Performance Optimization

### Caching Queries

```ts
import LRU from 'lru-cache';

// Cache contract metadata
const contractCache = new LRU<string, any>({ max: 1000 });

export async function handleLog(log: EthereumLog): Promise<void> {
  const cacheKey = `contract-${log.address}`;
  let contractInfo = contractCache.get(cacheKey);
  
  if (!contractInfo) {
    const contract = Erc20__factory.connect(log.address, api);
    contractInfo = {
      name: await contract.name(),
      symbol: await contract.symbol(),
      decimals: await contract.decimals(),
    };
    contractCache.set(cacheKey, contractInfo);
  }
  
  // Use cached contract info...
}
```

### Batching Queries

```ts
export async function handleLog(log: EthereumLog): Promise<void> {
  const contract = Erc20__factory.connect(log.address, api);
  
  // Batch multiple queries for better performance
  const [name, symbol, decimals, totalSupply] = await Promise.all([
    contract.name(),
    contract.symbol(),
    contract.decimals(),
    contract.totalSupply(),
  ]);
  
  // Use all results together...
}
```

### Query at Block Height

Always specify block height for consistent results:

```ts
export async function handleLog(log: EthereumLog): Promise<void> {
  const contract = Erc20__factory.connect(log.address, api);
  
  // Good: Query at specific block height
  const balance = await contract.balanceOf(log.args.owner, {
    blockTag: log.blockNumber
  });
  
  // Avoid: Query at latest block (may be inconsistent)
  // const balance = await contract.balanceOf(log.args.owner);
}
```

## Best Practices

### 1. Handle RPC Failures

```ts
async function safeContractCall<T>(
  contractCall: () => Promise<T>,
  fallbackValue: T,
  retries = 3
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await contractCall();
    } catch (error) {
      logger.warn(`Contract call failed (attempt ${i + 1}): ${error.message}`);
      if (i === retries - 1) {
        logger.error(`All retries failed, using fallback value`);
        return fallbackValue;
      }
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  return fallbackValue;
}

export async function handleLog(log: EthereumLog): Promise<void> {
  const contract = Erc20__factory.connect(log.address, api);
  
  const balance = await safeContractCall(
    () => contract.balanceOf(log.args.owner),
    BigInt(0),
    3
  );
  
  // Use balance...
}
```

### 2. Rate Limiting

```ts
import pLimit from 'p-limit';

const limit = pLimit(10); // Limit concurrent queries

export async function handleLog(log: EthereumLog): Promise<void> {
  const queryBalance = () => limit(async () => {
    const contract = Erc20__factory.connect(log.address, api);
    return contract.balanceOf(log.args.owner);
  });
  
  const balance = await queryBalance();
  // Use balance...
}
```

### 3. Error Classification

```ts
export async function handleLog(log: EthereumLog): Promise<void> {
  const contract = Erc20__factory.connect(log.address, api);
  
  try {
    const result = await contract.someMethod();
    // Process result...
    
  } catch (error) {
    if (error.code === 'NETWORK_ERROR') {
      // Temporary network issue - might retry
      logger.warn(`Network error, will retry: ${error.message}`);
      throw error; // Let indexer retry
    } else if (error.code === 'CALL_EXCEPTION') {
      // Contract call failed - permanent failure
      logger.warn(`Contract call exception: ${error.reason}`);
      // Handle gracefully, don't retry
      return;
    } else {
      // Unknown error
      logger.error(`Unknown error: ${error.message}`);
      throw error;
    }
  }
}
```

### 4. Resource Management

```ts
export async function handleLog(log: EthereumLog): Promise<void> {
  // Create contract instance once
  const contract = Erc20__factory.connect(log.address, api);
  
  try {
    // Make queries
    const balance = await contract.balanceOf(log.args.owner);
    
    // Process data
    const entity = MyEntity.create({
      id: log.transactionHash,
      balance: balance.toBigInt(),
    });
    
    await entity.save();
    
  } finally {
    // Clean up if needed (usually not required for ethers contracts)
  }
}
```