# Cosmos Ethermint (EVM) Support

We provide a custom data source processor for [Cosmos's Ethermint EVM](https://github.com/cosmos/ethermint). This offers a simple way to filter and index both EVM and Cosmos activity on many Cosmos networks within a single SubQuery project.

::: tip Note
Ethermint chains (e.g. Cronos) are usually fully EVM compatible, which means that you can use two options for indexing Ethermint data. You can index Ethermint contract data via the standard Cosmos RPC interface, or via Ethereum APIs. For Cronos, we provide a [starter project for each](https://github.com/subquery/cosmos-subql-starter/tree/main/Cronos) and you can compare the two different options in the [Cronos quick start guide](../quickstart/quickstart_chains/cosmos-cronos.md).

This document goes into detail about how to use the Ethermint Cosmos RPCs (rather than the Ethereum API)
:::

**You can also refer to the basic [Cronos EVM Example Project](https://github.com/subquery/cosmos-subql-starter/tree/main/Cronos/cronos-evm-starter-via-rpc) with an event and call handler.**

## Getting started

1. Add the custom datasource as a dependency:

- Create a new project from an EVM template though `subql init` OR
- For existing projects, `yarn add @subql/ethermint-evm-processor` or `npm i @subql/ethermint-evm-processor`.

2. Add a custom data source as described below.
3. Add handlers for the custom data source to your code.

## Data Source Spec

| Field             | Type                                                             | Required | Description                                |
| ----------------- | ---------------------------------------------------------------- | -------- | ------------------------------------------ |
| kind              | `cosmos/EthermintEvm`                                            | Yes      | Type of the datasource                     |
| processor.file    | `"./node_modules/@subql/ethermint-evm-processor/dist/bundle.js"` | Yes      | File reference to the data processor code  |
| processor.options | [ProcessorOptions](#processor-options)                           | No       | Options specific to the Frontier Processor |
| assets            | `{ [key: String]: { file: String }}`                             | No       | An object of external asset files          |

### Processor Options

| Field   | Type             | Required | Description                                                                                                |
| ------- | ---------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| abi     | String           | No       | The ABI that is used by the processor to parse arguments. MUST be a key of `assets`                        |
| address | String or `null` | No       | A contract address where the event is from or call is made to. `null` will capture contract creation calls |

## Call Handlers

| Field  | Type                         | Required | Description                                 |
| ------ | ---------------------------- | -------- | ------------------------------------------- |
| kind   | `cosmos/EthermintEvmCall`    | Yes      | Specifies that this is an Call type handler |
| filter | [Call Filter](#call-filters) | No       | Filter the data source to execute           |

### Call Filters

| Field    | Type   | Example(s)                                    | Description                                                                                                                                                                      |
| -------- | ------ | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| function | String | 0x095ea7b3, approve(address to,uint256 value) | Either [Function Signature](https://docs.ethers.io/v5/api/utils/abi/fragments/#FunctionFragment) strings or the function `sighash` to filter the function called on the contract |
| from     | String | 0x6bd193ee6d2104f14f94e2ca6efefae561a4334b    | An Ethereum address that sent the transaction                                                                                                                                    |

### Handler Functions

Unlike a normal handler you will not get a `CosmosMessage` as the parameter, instead you will get a `EthermintEvmCall` which is based on Ethers [TransactionResponse](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse) type.

Changes from the `TransactionResponse` type:

- It doesn't have `wait` and `confirmations` properties.
- A `success` property is added to know if the transaction was a success.
- `args` is added if the `abi` field is provided and the arguments can be successfully parsed. You can add a generic parameter like so to type `args`: `EthermintEvmCall<{ from: string, to: string, value: BigNumber }>`.

## Event Handlers

| Field  | Type                           | Required | Description                                  |
| ------ | ------------------------------ | -------- | -------------------------------------------- |
| kind   | `substrate/EthermintEvmEvent`  | Yes      | Specifies that this is an Event type handler |
| filter | [Event Filter](#event-filters) | No       | Filter the data source to execute            |

### Event Filters

| Field  | Type         | Example(s)                                                        | Description                                                                                                                                      |
| ------ | ------------ | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| topics | String array | `Transfer(address indexed from,address indexed to,uint256 value)` | The topics filter follows the Ethereum JSON-PRC log filters, more documentation can be found [here](https://docs.ethers.io/v5/concepts/events/). |

**Note on topics:**

There are a couple of improvements from basic log filters:

- Topics don't need to be 0 padded.
- [Event Fragment](https://docs.ethers.io/v5/api/utils/abi/fragments/#EventFragment) strings can be provided and automatically converted to their id.

### Handler Functions

Unlike a normal handler you will not get a `CosmosEvent` as the parameter, instead you will get a `EthermintEvmEvent` or `EthermintEvmCall` which is based on Ethers [Log](https://docs.ethers.io/v5/api/providers/types/#providers-Log) type.

Changes from the `Log` type:

- `args` is added if the `abi` field is provided and the arguments can be successfully parsed. You can add a generic parameter like so to type `args`: `FrontierEvmEvent<{ from: string, to: string, value: BigNumber }>`.

```ts
import { Approval, Transaction } from "../types";
import {
  EthermintEvmEvent,
  EthermintEvmCall,
} from "@subql/ethermint-evm-processor";
import { BigNumber } from "ethers";

// Setup types from ABI
type TransferEventArgs = [string, string, BigNumber] & {
  from: string;
  to: string;
  value: BigNumber;
};

type ApproveCallArgs = [string, BigNumber] & {
  _spender: string;
  _value: BigNumber;
};

export async function handleEthermintEvmEvent(
  event: EthermintEvmEvent<TransferEventArgs>,
): Promise<void> {
  const transaction = new Transaction(event.transactionHash);

  transaction.value = event.args[2].toBigInt();
  transaction.from = event.args[0];
  transaction.to = event.args[1];
  transaction.contractAddress = event.address;

  await transaction.save();
}

export async function handleEthermintEvmCall(
  event: EthermintEvmCall<ApproveCallArgs>,
): Promise<void> {
  const approval = new Approval(event.hash);
  approval.owner = event.from;
  approval.value = event.args[1].toBigInt();
  approval.spender = event.args[0];
  approval.contractAddress = event.to;

  await approval.save();
}
```

## Data Source Example

This is an extract from the `project.ts` manifest file.

```ts
{
  dataSources: [
    {
      kind: "cosmos/EthermintEvm",
      startBlock: 446,
      processor: {
        file: "./node_modules/@subql/ethermint-evm-processor/dist/bundle.js",
        options: {
          abi: "erc20",
          address: "0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23", // Wrapped CRO
        },
      },
      assets: new Map([["erc20", { file: "./erc20.abi.json" }]]),
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleEthermintEvmCall",
            kind: "cosmos/EthermintEvmCall",
            filter: {
              // Either Function Signature strings or the function `sighash` to filter the function called on the contract
              // https://docs.ethers.io/v5/api/utils/abi/fragments/#FunctionFragment
              method: "approve(address guy, uint256 wad)",
            },
          },
          {
            handler: "handleEthermintEvmEvent",
            kind: "cosmos/EthermintEvmEvent",
            filter: {
              // The topics filter follows the Ethereum JSON-PRC log filters
              // https://docs.ethers.io/v5/concepts/events
              // Example valid values:
              // - '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
              // - Transfer(address,address,u256)
              topics: ["Transfer(address src, address dst, uint256 wad)"],
            },
          },
        ],
      },
    },
  ],
}
```

## Known Limitations

- There is no way to get the transaction receipts with call handlers.
- `blockHash` properties are currently left undefined, the `blockNumber` property can be used instead.

## Extra info

- The source code for these processors can be found in our datasource-processors [repo](https://github.com/subquery/datasource-processors).
