# Non-EVM Mappings

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we have previously defined in the `schema.graphql` file.

- Mappings are defined in the `src/mappings` directory and are exported as a function.
- These mappings are also exported in `src/index.ts`.
- The mappings files are reference in `project.ts` under the mapping handlers.
- The mappings are run from within a [Sandbox](./sandbox.md)

There are different classes of mappings functions for various non-evm chains. They are:

 :::code-tabs
@tab:active algorand
```ts
Block Handlers
Transaction Handlers
```

@tab concordium
```ts
Block Handlers
Transaction Handlers
Transaction Event Handlers
Special Event Handlers
```

@tab cosmos
```ts
Block Handlers
Transaction Handlers
Event Handlers
Message Handlers
```

@tab near
```ts
Block Handlers
Transaction Handlers
Action Handlers
```

@tab polkadot
```ts
Block Handlers
Event Handlers
Call Handlers
```

@tab solana
```ts
Block Handlers
Transaction Handlers
Instruction Handlers
Log Handlers
```

@tab starknet
```ts
Block Handlers
Transaction Handlers
Log Handlers
```

@tab stellar/soroban
```ts
Block Handlers
Transaction Handlers
Effect Handles
Log Handlers
Operation Handler
```

:::

## Block Handler

You can use block handlers to capture information each time a new block is attached to the chain, e.g. block number. To achieve this, a defined BlockHandler will be called once for every block.

**Using block handlers slows your project down as they can be executed with each and every block - only use if you need to.**

:::code-tabs

@tab:active algorand

```ts
import { AlgorandBlock } from "@subql/types-algorand";

export async function handleBlock(block: AlgorandBlock): Promise<void> {
  const record = BlockEntity.create({
    id: block.round.toString(),
    field1: block.round,
    field2: "block",
  });
  await record.save();
}
```
@tab concordium
```ts
import { ConcordiumBlock } from "@subql/types-concordium";

export async function handleBlock(block: ConcordiumBlock): Promise<void> {
  const record = BlockEntity.create({
    id: block.blockHash,
    field1: block.blockHeight,
    field2: "block",
  });
  await record.save();
}
```

@tab cosmos
```ts
import { CosmosBlock } from "@subql/types-cosmos";

export async function handleBlock(block: CosmosBlock): Promise<void> {
  // Create a new BlockEntity with the block hash as it's ID
  const record = new BlockEntity(block.block.block_id.hash);
  record.height = BigInt(block.block.block.header.height);
  await record.save();
}
```

@tab near
```ts
import { NearBlock } from "@subql/types-near";

export async function handleBlock(block: NearBlock): Promise<void> {
  logger.info(`Handling block ${block.header.height}`);

  const blockRecord = NearBlockEntity.create({
    id: block.header.height.toString(),
    hash: block.header.hash,
    author: block.author,
    timestamp: BigInt(block.header.timestamp),
  });

  await blockRecord.save();
}
// The NearTransaction encapsulates transaction info, result, the 
// corresponding block details and the list of NearAction entities that 
// occured in the specific transaction.

```

@tab substrate
```ts
import { SubstrateBlock } from "@subql/types";

export async function handleBlock(block: SubstrateBlock): Promise<void> {
  // Create a new BlockEntity with the block hash as it's ID
  const record = new BlockEntity(block.block.header.hash.toString());
  record.field1 = block.block.header.number.toNumber();
  await record.save();
}
// A `SubstrateBlock` is an extended interface type of 
// [signedBlock](https://polkadot.js.org/docs/api/cookbook/blocks/), 
// but also includes the `specVersion` and `timestamp`.
```

@tab solana
```ts
import { SolanaBlock } from "@subql/types-solana";

export async function handleBlock(block: SolanaBlock): Promise<void> {
  // Create a new BlockEntity with the block hash as it's ID
  const record = new BlockEntity(block.blockHash);
  record.height = BigInt(block.blockNumber);
  await record.save();
}
```

@tab starknet
```ts
import { StarknetBlock } from "@subql/types-starknet";

export async function handleBlock(block: StarknetBlock): Promise<void> {
  // Create a new BlockEntity with the block hash as it's ID
  const record = new BlockEntity(block.blockHash);
  record.height = BigInt(block.blockNumber);
  await record.save();
}
```

@tab stella
```ts
import { StellarBlock } from "@subql/types-stellar";

export async function handleBlock(block: StellarBlock): Promise<void> {
  // Create a new BlockEntity with the block hash as it's ID
  const record = new BlockEntity(block.hash);
  record.height = BigInt(block.sequence);
  await record.save();
}
```



:::


## Transaction Handler

You can use transaction handlers to capture information about each of the transactions in a block. To achieve this, a defined TransactionHandler will be called once for every transaction. You should use [Transaction Filters](../manifest/near.md#mapping-handlers-and-filters) in your manifest to filter transactions to reduce the time it takes to index data and improve mapping performance.

:::code-tabs
@tab:active algorand
```ts
import { AlgorandTransaction } from "@subql/types-algorand";

export async function handleTransaction(
  tx: AlgorandTransaction,
): Promise<void> {
  const record = TransactionEntity.create({
    id: tx.id,
    field1: tx.roundTime,
    field2: "tx",
  });
  await record.save();
}
```

@tab concordium
```ts
import { ConcordiumTransaction } from "@subql/types-concordium";

export async function handleTransaction(
  tx: ConcordiumTransaction,
): Promise<void> {
  logger.info(
    `Handling transaction at block ${tx.block.blockHeight.toString()}`,
  );
  const record = TransactionEntity.create({
    id: tx.hash,
    field1: tx.type,
    field2: "tx",
  });
  await record.save();
}
```

@tab cosmos
```ts
import { CosmosTransaction } from "@subql/types-cosmos";

export async function handleTransaction(tx: CosmosTransaction): Promise<void> {
  const record = new TransactionEntity(tx.tx.txhash);
  record.blockHeight = BigInt(tx.block.block.block.header.height);
  record.timestamp = tx.block.block.header.time;
  await record.save();
}
// The `CosmosTransaction` encapsulates TxInfo and the corresponding `CosmosBlock` in which the transaction occured.
```


@tab near
```ts
import { NearTransaction } from "@subql/types-near";

export async function handleTransaction(
  transaction: NearTransaction,
): Promise<void> {
  logger.info(`Handling transaction at ${transaction.block_height}`);

  const transactionRecord = NearTxEntity.create({
    id: `${transaction.block_hash}-${transaction.result.id}`,
    signer: transaction.signer_id,
    receiver: transaction.receiver_id,
  });

  await transactionRecord.save();
}

// The `NearTransaction` encapsulates transaction info, result, the corresponding block details and the list of `NearAction` entities that occured in the specific transaction.

```

@tab solana
```ts
import { Transaction } from "../types";

export async function handleTransaction(tx: SolanaTransaction): Promise<void> {
  logger.info(`New transaction at block ${tx.blockNumber}`);
  const txRecord = Transaction.create({
    id: tx.transaction.signatures[0],
    owner: tx.from,
    spender: await tx.args[0],
    value: BigInt(await tx.args[1].toString()),
    contractAddress: tx.to,
  });

  await txRecord.save();
}
```

@tab starknet
```ts
import { StarknetTransaction } from "@subql/types-starknet";

export async function handleTransaction(
  tx: WithdrawTransaction,
): Promise<void> {
  logger.info(`New Withdraw transaction at block ${tx.blockNumber}`);
  assert(tx.decodedCalls, "No tx decodedCalls");

  for (let i = 0; i < tx.decodedCalls.length; i++) {
    const call = tx.decodedCalls[i];
    // Notice all invoke calls are returned in the decodedCalls, we need to filter out the calls we are interested in
    if (
      call.selector ===
        "0x015511cc3694f64379908437d6d64458dc76d02482052bfb8a5b33a72c054c77" ||
      call.selector ===
        "0x15511cc3694f64379908437d6d64458dc76d02482052bfb8a5b33a72c054c77"
    ) {
      const withdraw = Withdraw.create({
        id: `${tx.hash}_${i}`,
        user: tx.from,
        // Convert the BigNumberish to Hex
        token: convertBigNumberish(call.decodedArgs.token),
        amount: BigInt(call.decodedArgs.amount),
      });
      logger.info(`withdraw at ${withdraw.id}`);
      await withdraw.save();
    }
  }
}
// We store the decoded calls in the transaction object, so you can 
// easily access the decoded calls and their args in the transaction object.
// To distinguish between different calls types, you can use the `selector` 
// field in the decoded call object.
```
```ts
import { StellarTransaction } from "@subql/types-stellar";

export async function handleTransaction(
  transaction: StellarTransaction,
): Promise<void> {
  const record = new TransactionEntity(transaction.id);
  record.height = BigInt(transaction.ledger.sequence);
  record.transactionHash = transaction.hash;
  record.sourceAccount = transaction.source_account;
  await record.save();
}
// Soroban transactions are transactions that call a Soroban contract.
// They are passed through to the mapping functions as a `StellarTransaction` type.
```

:::


## Chain Specific Handlers

Here are additional specific chain handlers to include.

## Algorand

### Algorand Atomic Transfers (Grouped Transactions)

[Atomic Transfers](https://developer.algorand.org/articles/algorand-atomic-transfers/) are irreducible batch transactions that allow groups of transactions to be submitted at one time. If any of the transactions fail, then all the transactions will fail. That is, an Atomic Transfer guarantees the simultaneous execution of multiple transfers of all kinds of assets.

You can get groups of transactions from within your mapping functions with the `AlgorandBlock.getTransactionsByGroup(group)` function. For example:

```ts
// tx.block.getTransactionsByGroup(string groupID): AlgorandTransaction[]
const txGroup: AlgorandTransaction[] = tx.block.getTransactionsByGroup(
  tx.group!,
);
```

## Concordium
### Transaction Event Handler

You can use transaction event handlers to capture information about each of the transaction events in a block. To achieve this, a defined TransactionEventHandler will be called once for every transaction event. You should use [Mapping Filters](../manifest/concordium.md#mapping-handlers-and-filters) in your manifest to filter transactions events to reduce the time it takes to index data and improve mapping performance.

```ts
import { ConcordiumTransactionEvent } from "@subql/types-concordium";

export async function handleTransactionEvent(
  txEvent: ConcordiumTransactionEvent,
): Promise<void> {
  logger.info(
    `Handling event at block ${txEvent.block.blockHeight.toString()}`,
  );
  const record = TransactionEventEntity.create({
    id: txEvent.id,
    field1: txEvent.tag,
    field2: "txEvent",
  });
  await record.save();
}
```

### Special Event Handler

You can use special event handlers to capture information about each of the special events in a block. To achieve this, a defined SpecialEventHandler will be called once for every special event. You should use [Mapping Filters](../manifest/concordium.md#mapping-handlers-and-filters) in your manifest to filter special events to reduce the time it takes to index data and improve mapping performance.

```ts
import { ConcordiumSpecialEvent } from "@subql/types-concordium";

export async function handleSpecialEvent(
  specialEvent: ConcordiumSpecialEvent,
): Promise<void> {
  logger.info(
    `Handling special event at block ${specialEvent.block.blockHeight.toString()}`,
  );
  const record = SpecialEventEntity.create({
    id: specialEvent.id,
    field1: specialEvent.tag,
    field2: "specialEvent",
  });
  await record.save();
}
```

## Cosmos

### Event Handler

You can use event handlers to capture information when certain events are included on a new block. The events that are part of the default runtime and a block may contain multiple events.

During the processing, the event handler will receive an event as an argument with the event's typed inputs and outputs. Any type of event will trigger the mapping, allowing activity with the data source to be captured. You should use [Mapping Filters](../manifest/cosmos.md#mapping-handlers-and-filters) in your manifest to filter events to reduce the time it takes to index data and improve mapping performance.

```ts
import { CosmosEvent } from "@subql/types-cosmos";

export async function handleEvent(event: CosmosEvent): Promise<void> {
  const record = new EventEntity(
    `${event.tx.tx.txhash}-${event.msg.idx}-${event.idx}`,
  );
  record.blockHeight = BigInt(event.block.block.block.header.height);
  record.txHash = event.tx.tx.txhash;
  await record.save();
}
```

A `CosmosEvent` encapsulates Event data and `TxLog` corresponding to the event. It also contains `CosmosMessage` data of the message connected to the event. Also, it includes the `CosmosBlock` and `CosmosTransaction` data of the block and transaction from which the event was emitted.

### Message Handler

You can use message handlers to capture information from each message in a transaction. To achieve this, a defined MessageHandler will be called once for every message. You should use [Mapping Filters](../manifest/cosmos.md#mapping-handlers-and-filters) in your manifest to filter messages to reduce the time it takes to index data and improve mapping performance.

[Cosmos Codegen from CosmWasm Protobufs](../introduction.md#cosmos-codegen-from-cosmwasm-protobufs) provides typesafe types for all CosmWasm contracts. You should consider adding these to the `CosmosMessage<T>` in your mapping handlers like so.

```ts
import { CosmosMessage } from "@subql/types-cosmos";
import { Coin, Deposit, DepositCoin } from "../types";
import { MsgDeposit } from "../types/proto-interfaces/thorchain/v1/x/thorchain/types/msg_deposit";

export async function handleMessage(
  msg: CosmosMessage<MsgDeposit>,
): Promise<void> {
  // Create Deposit record
  const depositEntity = Deposit.create({
    id: `${msg.tx.hash}-${msg.idx}`,
    blockHeight: BigInt(msg.block.block.header.height),
    txHash: msg.tx.hash,
    signer: msg.msg.decodedMsg.signer.toString(),
    memo: msg.msg.decodedMsg.memo,
  });
  await depositEntity.save();
}
```

`CosmosMessage` encapsulates the `msg.decodedMsg` object containing the decoded message data, the `CosmosTransaction` in which the message occured in and also the `CosmosBlock` in which the transaction occured in.

### Third-party Library Support - the Sandbox

SubQuery is deterministic by design, that means that each SubQuery project is guaranteed to index the same data set. This is a critical factor that is makes it possible to verify data in the decentralised SubQuery Network. This limitation means that in default configuration, the indexer is by default run in a strict virtual machine, with access to a strict number of third party libraries.

**You can easily bypass this limitation however, allowing you to retrieve data from external API endpoints, non historical RPC calls, and import your own external libraries into your projects.** In order to do to, you must run your project in `unsafe` mode, you can read more about this in the [references](../../run_publish/references.md#unsafe-node-service). An easy way to do this while developing (and running in Docker) is to add the following line to your `docker-compose.yml`:

```yml
subquery-node:
  image: onfinality/subql-node-cosmos:latest
  ...
  command:
    - -f=/app
    - --db-schema=app
    - --unsafe
  ...
```

When run in `unsafe` mode, you can import any custom libraries into your project and make external API calls using tools like node-fetch. A simple example is given below:

```ts
import { CosmosTransaction } from "@subql/types-cosmos";
import fetch from "node-fetch";

export async function handleTransaction(tx: CosmosTransaction): Promise<void> {
  const httpData = await fetch("https://api.github.com/users/github");
  logger.info(`httpData: ${JSON.stringify(httpData.body)}`);
  // Do something with this data
}
```

By default (when in safe mode), the [VM2](https://www.npmjs.com/package/vm2) sandbox only allows the following:

- only some certain built-in modules, e.g. `assert`, `buffer`, `crypto`,`util` and `path`
- third-party libraries written by _CommonJS_.
- Historical/safe queries, see [RPC Calls](#rpc-calls).
- external `HTTP` and `WebSocket` connections are forbidden

### Modules and Libraries

To improve SubQuery's data processing capabilities, we have allowed some of the NodeJS's built-in modules for running mapping functions in the [sandbox](#third-party-library-support---the-sandbox), and have allowed users to call third-party libraries.

Please note this is an **experimental feature** and you may encounter bugs or issues that may negatively impact your mapping functions. Please report any bugs you find by creating an issue in [GitHub](https://github.com/subquery/subql).

#### Built-in modules

Currently, we allow the following NodeJS modules: `assert`, `buffer`, `crypto`, `util`, and `path`.

Rather than importing the whole module, we recommend only importing the required method(s) that you need. Some methods in these modules may have dependencies that are unsupported and will fail on import.

```ts
import { hashMessage } from "ethers/lib/utils"; // Good way
import { utils } from "ethers"; // Bad way
```

### RPC Calls

We also support some [API RPC methods here](https://github.com/subquery/subql-cosmos/blob/main/packages/types/src/global.ts#L11) that are remote calls that allow the mapping function to interact with the actual node and chain state.

Documents in [CosmWasm Stargate Client](https://cosmos.github.io/cosmjs/latest/cosmwasm-stargate/modules.html) provide some methods.

::: warning Important
One caveat is that when you query, it will currently query state at the latest block height not at the height being indexed. We have been unable to find a way to query at a specific height, please reach out if you know of a way how!
:::

### Chain Type Registries

Some decoded message data from Cosmos Chains has nested message types that don't get decoded.

We inject the [`registry`](https://cosmos.github.io/cosmjs/latest/proto-signing/classes/Registry.html) globally into the sandbox so that users can decode more messages as they need.

```ts
import { MsgUpdateClient } from "cosmjs-types/ibc/core/client/v1/tx";

registry.register("/ibc.core.client.v1.MsgUpdateClient", MsgUpdateClient);
```

## NEAR

### Action Handler

You can use action handlers to capture information from each action in a transaction. To achieve this, a defined ActionHandler will be called once for every action. You should use [Mapping Filters](../manifest/near.md#mapping-handlers-and-filters) in your manifest to filter actions to reduce the time it takes to index data and improve mapping performance.

```ts
import { NearAction, Transfer } from "@subql/types-near";

export async function handleAction(
  action: NearAction<Transfer>,
): Promise<void> {
  // An Action can belong to either a transaction or a receipt
  // To check which one, we can check if action.transaction is null
  // If it is null, then it belongs to a receipt
  logger.info(
    `Handling action at ${
      action.transaction
        ? action.transaction.block_height
        : action.receipt.block_height
    }`,
  );

  const id = action.transaction
    ? `${action.transaction.block_height}-${action.transaction.result.id}-${action.id}`
    : `${action.receipt.block_height}-${action.receipt.id}-${action.id}`;
  const sender = action.transaction
    ? action.transaction.signer_id
    : action.receipt.predecessor_id;
  const receiver = action.transaction
    ? action.transaction.receiver_id
    : action.receipt.receiver_id;

  const actionRecord = NearActionEntity.create({
    id: id,
    sender: sender,
    receiver: receiver,
    amount: BigInt((action.action as Transfer).deposit.toString()),
    payloadString: JSON.stringify(action.action.args.toJson()),
  });

  await actionRecord.save();
}
```

`NearAction` encapsulates the `action` object containing the action data and the `NearTransaction` or `NearReceipt` in which the action occured in. The payload of the action is stored on the `args`. In many cases, `args` are base64 encoded and JSON formatted, in this case you can use `action.action.args.toJson();` to decode the arguments.

### RPC Calls

We also support some [API RPC methods here](https://github.com/subquery/subql-near/blob/main/packages/types/src/global.ts) that are remote calls that allow the mapping function to interact with the actual node and chain state.

Documents in [NEAR `JsonRpcProvider`](https://docs.near.org/tools/near-api-js/reference/classes/providers_json_rpc_provider.JsonRpcProvider.html) provide some methods to interact with the NEAR RPC API.

## Substrate

### Event Handler

You can use event handlers to capture information when certain events are included on a new block. The events that are part of the default runtime and a block may contain multiple events.

During the processing, the event handler will receive an event as an argument with the event's typed inputs and outputs. Any type of event will trigger the mapping, allowing activity with the data source to be captured. You should use [Mapping Filters](../manifest/polkadot.md#mapping-handlers-and-filters) in your manifest to filter events to reduce the time it takes to index data and improve mapping performance.

```ts
import { SubstrateEvent } from "@subql/types";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [account, balance],
    },
  } = event;
  const record = new EventEntity(
    event.extrinsic.block.block.header.hash.toString(),
  );
  record.field2 = account.toString();
  record.field3 = (balance as Balance).toBigInt();
  await record.save();
}
```

A `SubstrateEvent` is an extended interface type of the [EventRecord](https://github.com/polkadot-js/api/blob/f0ce53f5a5e1e5a77cc01bf7f9ddb7fcf8546d11/packages/types/src/interfaces/system/types.ts#L149). Besides the event data, it also includes an `id` (the block to which this event belongs) and the extrinsic inside of this block.

::: tip Note
From `@subql/types` version `X.X.X` onwards `SubstrateEvent` is now generic. This can provide you with higher type safety when developing your project.

```ts
async function handleEvmLog(event: SubstrateEvent<[EvmLog]>): Promise<void> {
  // `eventData` will be of type `EvmLog` before it would have been `Codec`
  const [eventData] = original.event.data;
}
```

:::

### Call Handler

Call handlers are used when you want to capture information on certain substrate extrinsics. You should use [Mapping Filters](../manifest/polkadot.md#mapping-handlers-and-filters) in your manifest to filter calls to reduce the time it takes to index data and improve mapping performance.

```ts
export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
  const record = new CallEntity(extrinsic.block.block.header.hash.toString());
  record.field4 = extrinsic.block.timestamp;
  await record.save();
}
```

The [SubstrateExtrinsic](https://github.com/OnFinality-io/subql/blob/a5ab06526dcffe5912206973583669c7f5b9fdc9/packages/types/src/interfaces.ts#L21) extends [GenericExtrinsic](https://github.com/polkadot-js/api/blob/a9c9fb5769dec7ada8612d6068cf69de04aa15ed/packages/types/src/extrinsic/Extrinsic.ts#L170). It is assigned an `id` (the block to which this extrinsic belongs) and provides an extrinsic property that extends the events among this block. Additionally, it records the success status of this extrinsic.

::: tip Note
From `@subql/types` version `X.X.X` onwards `SubstrateExtrinsic` is now generic. This can provide you with higher type safety when developing your project.

```ts
async function handleEvmCall(
  call: SubstrateExtrinsic<[TransactionV2 | EthTransaction]>,
): Promise<void> {
  // `tx` will be of type `TransactionV2 | EthTransaction` before it would have been `Codec`
  const [tx] = original.extrinsic.method.args;
}
```

:::


### Query States

Our goal is to cover all data sources for users for mapping handlers (more than just the three interface event types above). Therefore, we have exposed some of the @polkadot/api interfaces to increase capabilities.

These are the interfaces we currently support:

- [api.query.&lt;module&gt;.&lt;method&gt;()](https://polkadot.js.org/docs/api/start/api.query) will query the **current** block.
- [api.query.&lt;module&gt;.&lt;method&gt;.multi()](https://polkadot.js.org/docs/api/start/api.query.multi/#multi-queries-same-type) will make multiple queries of the **same** type at the current block.
- [api.queryMulti()](https://polkadot.js.org/docs/api/start/api.query.multi/#multi-queries-distinct-types) will make multiple queries of **different** types at the current block.

These are the interfaces we do **NOT** support currently:

- ~~api.tx.\*~~
- ~~api.derive.\*~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.at~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.entriesAt~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.entriesPaged~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.hash~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.keysAt~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.keysPaged~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.range~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.sizeAt~~

See an example of using this API in our [validator-threshold](https://github.com/subquery/tutorials-validator-threshold) example use case.

### RPC calls

We also support some API RPC methods that are remote calls that allow the mapping function to interact with the actual node, query, and submission.

Documents in [JSON-RPC](https://polkadot.js.org/docs/substrate/rpc/#rpc) provide some methods that take `BlockHash` as an input parameter (e.g. `at?: BlockHash`), which are now permitted.
We have also modified these methods to take the current indexing block hash by default.

```ts
// Let's say we are currently indexing a block with this hash number
const blockhash = `0x844047c4cf1719ba6d54891e92c071a41e3dfe789d064871148e9d41ef086f6a`;

// Original method has an optional input is block hash
const b1 = await api.rpc.chain.getBlock(blockhash);

// It will use the current block has by default like so
const b2 = await api.rpc.chain.getBlock();
```

- For [Custom Substrate Chains](#custom-substrate-chains) RPC calls, see [usage](#usage).

### Custom Substrate Chains

SubQuery can be used on any Substrate-based chain, not just Polkadot or Kusama.

You can use a custom Substrate-based chain and we provide tools to import types, interfaces, and additional methods automatically using [@polkadot/typegen](https://polkadot.js.org/docs/api/examples/promise/typegen/).

In the following sections, we use our [kitty example](https://github.com/subquery/tutorials-kitty-chain) to explain the integration process.

#### Preparation

Create a new directory `api-interfaces` under the project `src` folder to store all required and generated files. We also create an `api-interfaces/kitties` directory as we want to add decoration in the API from the `kitties` module.

**Metadata**

We need metadata to generate the actual API endpoints. In the kitty example, we use an endpoint from a local testnet, and it provides additional types.
Follow the steps in [PolkadotJS metadata setup](https://polkadot.js.org/docs/api/examples/promise/typegen#metadata-setup) to retrieve a node's metadata from its **HTTP** endpoint.

```shell
curl -H "Content-Type: application/json" -d '{"id":"1", "jsonrpc":"2.0", "method": "state_getMetadata", "params":[]}' http://localhost:9933
```

or from its **websocket** endpoint with help from [`websocat`](https://github.com/vi/websocat):

```shell
//Install the websocat
brew install websocat

//Get metadata
echo state_getMetadata | websocat 'ws://127.0.0.1:9944' --jsonrpc
```

Next, copy and paste the output to a JSON file. In our [kitty example](https://github.com/subquery/tutorials-kitty-chain), we have created `api-interface/kitty.json`.

**Type definitions**

We assume that the user knows the specific types and RPC support from the chain, and it is defined in the [Manifest](../manifest/polkadot.md#custom-chains).

Following [types setup](https://polkadot.js.org/docs/api/examples/promise/typegen#metadata-setup), we create :

- `src/api-interfaces/definitions.ts` - this exports all the sub-folder definitions

```ts
export { default as kitties } from "./kitties/definitions";
```

- `src/api-interfaces/kitties/definitions.ts` - type definitions for the kitties module

```ts
export default {
  // custom types
  types: {
    Address: "AccountId",
    LookupSource: "AccountId",
    KittyIndex: "u32",
    Kitty: "[u8; 16]",
  },
  // custom rpc : api.rpc.kitties.getKittyPrice
  rpc: {
    getKittyPrice: {
      description: "Get Kitty price",
      params: [
        {
          name: "at",
          type: "BlockHash",
          isHistoric: true,
          isOptional: false,
        },
        {
          name: "kittyIndex",
          type: "KittyIndex",
          isOptional: false,
        },
      ],
      type: "Balance",
    },
  },
};
```

**Packages**

- In the `package.json` file, make sure to add `@polkadot/typegen` as a development dependency and `@polkadot/api` as a regular dependency (ideally the same version). We also need `ts-node` as a development dependency to help us run the scripts.
- We add scripts to run both types; `generate:defs` and metadata `generate:meta` generators (in that order, so metadata can use the types).

Here is a simplified version of `package.json`. Make sure in the **scripts** section the package name is correct and the directories are valid.

```json
{
  "name": "kitty-birthinfo",
  "scripts": {
    "generate:defs": "ts-node --skip-project node_modules/.bin/polkadot-types-from-defs --package kitty-birthinfo/api-interfaces --input ./src/api-interfaces",
    "generate:meta": "ts-node --skip-project node_modules/.bin/polkadot-types-from-chain --package kitty-birthinfo/api-interfaces --endpoint ./src/api-interfaces/kitty.json --output ./src/api-interfaces --strict"
  },
  "dependencies": {
    "@polkadot/api": "^4.9.2"
  },
  "devDependencies": {
    "typescript": "^4.1.3",
    "@polkadot/typegen": "^4.9.2",
    "ts-node": "^8.6.2"
  }
}
```

#### Type generation

Now that preparation is completed, we are ready to generate types and metadata. Run the commands below:

```shell
# Yarn to install new dependencies
yarn

# Generate types
yarn generate:defs
```

In each modules folder (eg `/kitties`), there should now be a generated `types.ts` that defines all interfaces from this modules' definitions, also a file `index.ts` that exports them all.

```shell
# Generate metadata
yarn generate:meta
```

This command will generate the metadata and a new api-augment for the APIs. As we don't want to use the built-in API, we will need to replace them by adding an explicit override in our `tsconfig.json`.
After the updates, the paths in the config will look like this (without the comments):

```json
{
  "compilerOptions": {
    // this is the package name we use (in the interface imports, --package for generators) */
    "kitty-birthinfo/*": ["src/*"],
    // here we replace the @polkadot/api augmentation with our own, generated from chain
    "@polkadot/api/augment": ["src/interfaces/augment-api.ts"],
    // replace the augmented types with our own, as generated from definitions
    "@polkadot/types/augment": ["src/interfaces/augment-types.ts"]
  }
}
```

#### Usage

Now in the mapping function, we can show how the metadata and types actually decorate the API. The RPC endpoint will support the modules and methods we declared above.
And to use custom rpc call, please see section [Custom chain rpc calls](#custom-chain-rpc-calls)

```ts
export async function kittyApiHandler(): Promise<void> {
  //return the KittyIndex type
  const nextKittyId = await api.query.kitties.nextKittyId();
  // return the Kitty type, input parameters types are AccountId and KittyIndex
  const allKitties = await api.query.kitties.kitties("xxxxxxxxx", 123);
  logger.info(`Next kitty id ${nextKittyId}`);
  //Custom rpc, set undefined to blockhash
  const kittyPrice = await api.rpc.kitties.getKittyPrice(
    undefined,
    nextKittyId,
  );
}
```

**If you wish to publish this project to our explorer, please include the generated files in `src/api-interfaces`.**

#### Custom Chain RPC calls

To support customised chain RPC calls, we must manually inject RPC definitions for `typesBundle`, allowing per-spec configuration.
You can define the `typesBundle` in the `project.yml`. And please remember only `isHistoric` type of calls are supported.

```ts
...
  types: {
    "KittyIndex": "u32",
    "Kitty": "[u8; 16]",
  }
  typesBundle: {
    spec: {
      chainname: {
        rpc: {
          kitties: {
            getKittyPrice:{
                description: string,
                params: [
                  {
                    name: 'at',
                    type: 'BlockHash',
                    isHistoric: true,
                    isOptional: false
                  },
                  {
                    name: 'kittyIndex',
                    type: 'KittyIndex',
                    isOptional: false
                  }
                ],
                type: "Balance",
            }
          }
        }
      }
    }
  }
```

## Solana

### Instruction Handler

You can use instruction handlers to capture information about each of the instructions in a block. To achieve this, a defined InstructionHandler will be called once for every instruction. You should use [Mapping Filters](../manifest/solana.md#mapping-handlers-and-filters) in your manifest to filter instructions to reduce the time it takes to index data and improve mapping performance.

```ts
import { Transfer } from "../types";
import { TransferCheckedInstruction } from '../types/handler-inputs/TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';

export async function handleInstruction(inst: TransferCheckedInstruction): Promise<void> {
  logger.info(`New Transfer instruction at block ${inst.blockNumber}`);

  const source = getAccountByIndex(inst, inst.accounts[0]);
  const mint = getAccountByIndex(inst, inst.accounts[1]);
  const dest = getAccountByIndex(inst, inst.accounts[2]);

  const decoded = await inst.decodedData;
  assert(decoded, "Expected decoded value");

  const transferRecord = Transfer.create({
    id: `${inst.transaction.transaction.signatures[0]}-${inst.index.join('.')}`,
    amount: BigInt(decoded.data.amount),
    from: source,
    to: dest,
    blockNumber: inst.block.blockHeight,
    transactionHash: inst.transaction.transaction.signatures[0],
    date: new Date(Number(inst.block.blockTime) * 1000),
  });

  await transferRecord.save();
}
```

### Log Handler

You can use log handlers to capture information when certain logs are included on transactions. During the processing, the log handler will receive a log as an argument with the log's typed inputs and outputs. Any type of event will trigger the mapping, allowing activity with the data source to be captured. You should use [Mapping Filters](../manifest/solana.md#mapping-handlers-and-filters) in your manifest to filter events to reduce the time it takes to index data and improve mapping performance.

```ts
import { Log } from "../types";

export async function handleLog(log: SolanaLogMessage): Promise<void> {
  logger.info(`New log at block ${log.blockNumber}`);
  const logRecord = Log.create({
    id: log.transactionHash,
    value: log.args.value.toBigInt(),
    from: log.args.from,
    to: log.args.to,
    contractAddress: log.address,
  });

  await logRecord.save();
}
```

## Starknet

### Log Handler

You can use log handlers to capture information when certain logs are included on transactions. During the processing, the log handler will receive a log as an argument with the log's typed inputs and outputs. Any type of event will trigger the mapping, allowing activity with the data source to be captured. You should use [Mapping Filters](../manifest/starknet.md#mapping-handlers-and-filters) in your manifest to filter events to reduce the time it takes to index data and improve mapping performance.

```ts
import { StarknetLog } from "@subql/types-starknet";

type DespositEvent = {
  user: BigNumberish;
  token: BigNumberish;
  face_amount: string;
};
type DespositArgs = {
  "zklend::market::Market::Deposit": DespositEvent;
  block_hash: string;
  block_number: number;
  transaction_hash: string;
};
type DepositLog = StarknetLog<DespositArgs>;

export async function handleLog(log: DepositLog): Promise<void> {
  logger.info(`New deposit event at block ${log.blockNumber}`);
  assert(log.args, "No log.args");
  const event = log.args["zklend::market::Market::Deposit"];
  const user = convertBigNumberish(event.user);
  const token = convertBigNumberish(event.token);
  const deposit = Deposit.create({
    id: `${log.transactionHash}_${user}`,
    token: token,
    amount: BigInt(event.face_amount),
    user: user,
  });
  logger.info(`deposit ${deposit.id}`);
  logger.info(`token ${token}, amount ${deposit.amount}`);
  await deposit.save();
}
```

### Querying Contracts

We globally provide an `api` object that implements an [starknet.js Provider](https://starknetjs.com/docs/guides/connect_network#mainnet). This will allow querying contract state at the current block height being indexed.

You can then query contract state at the right block height. For example to query the token balance of a user at the current indexed block height:

```ts
// Create an instance of the contract, you can get the contract address from the Transaction or Log
// initialize deployed contract
const testAddress =
  "0x7667469b8e93faa642573078b6bf8c790d3a6184b2a1bb39c5c923a732862e1";
const compiledTest = json.parse(
  fs.readFileSync("./compiledContracts/test.json").toString("ascii"),
);

// connect the contract
const myTestContract = new Contract(compiledTest.abi, testAddress, provider);

// Query the balance of an address

const bal1 = await myTestContract.get_balance();
logger.info(`Initial balance: ${bal1.toString()}`); // Cairo 1 contract
```

## Soroban

### Operation Handler

Operation handlers can be used to capture information about specific operations that occur on the chain. You should use [Mapping Filters](../manifest/stellar.md#mapping-handlers-and-filters) in your manifest to filter transactions to reduce the time it takes to index data and improve mapping performance.

```ts
export async function handleOperation(
  op: StellarOperation<Horizon.PaymentOperationResponse>,
): Promise<void> {
  logger.info(`Indexing operation ${op.id}, type: ${op.type}`);

  const _op = Payment.create({
    id: op.id,
    from: op.from,
    to: op.to,
    txHash: op.transaction_hash,
    amount: op.amount,
  });

  await _op.save();
}
```

### Effect Handler

Effect handlers can be used to capture information about the effects of operations that occur on the chain. You should use [Mapping Filters](../manifest/stellar.md#mapping-handlers-and-filters) in your manifest to filter transactions to reduce the time it takes to index data and improve mapping performance.

```ts
export async function handleCredit(
  effect: StellarEffect<AccountCredited>,
): Promise<void> {
  logger.info(`Indexing effect ${effect.id}, type: ${effect.type}`);

  const _effect = Credit.create({
    id: effect.id,
    account: effect.account,
    amount: effect.amount,
  });

  await _effect.save();
}
```

### Event Handler

You can use event handlers to capture information when certain events are included on transactions. You should use [Mapping Filters](../manifest/stellar.md#mapping-handlers-and-filters) in your manifest to filter transactions to reduce the time it takes to index data and improve mapping performance.

During processing, the event handler will receive a event as an argument with the event's typed inputs and outputs. Any type of event will trigger the mapping, allowing activity with the data source to be captured. You should use [Mapping Filters](../manifest/stellar.md#mapping-handlers-and-filters) in your manifest to filter events to reduce the time it takes to index data and improve mapping performance.

```ts
import { TransferEvent } from "../types";
import { SorobanEvent } from "@subql/types-stellar";

export async function handleEvent(event: SorobanEvent): Promise<void> {
  logger.info(`New event at block ${event.ledger.sequence}`);

  // Get data from the event
  // The transfer event has the following payload \[env, from, to\]
  // logger.info(JSON.stringify(event));
  const {
    topic: [env, from, to],
  } = event;

  // Create the new transfer entity
  const transfer = Transfer.create({
    id: event.id,
    ledger: ledgerNumber,
    date: new Date(event.ledgerClosedAt),
    contract: event.contractId,
    fromId: from,
    toId: to,
    value: BigInt(event.value.decoded!),
  });

  await transfer.save();
}
```
