# Cosmos Ethermint (EVM) Support

We provide a custom data source processor for [Cosmos's Ethermint EVM](https://github.com/cosmos/ethermint). This offers a simple way to filter and index both EVM and Cosmos activity on many Cosmos networks within a single SubQuery project.

**You can also refer to the basic [Cronos EVM](https://github.com/subquery/tutorials-frontier-evm-starter/tree/moonriver) example project with an event and call handler.**

## Getting started

1. Add the custom datasource as a dependency:

- Create a new project from an EVM template though `subql init` OR
- For existing projects, `yarn add @subql/ethermint-evm-processor` or `yarn add @subql/ethermint-evm-processor`.

2. Add a custom data source as described below.
3. Add handlers for the custom data source to your code.

## Data Source Spec

| Field             | Type                                                            | Required | Description                                |
| ----------------- | --------------------------------------------------------------- | -------- | ------------------------------------------ |
| processor.file    | `'./node_modules/@subql/ethermint-evm-processor/dist/index.js'` | Yes      | File reference to the data processor code  |
| processor.options | [ProcessorOptions](#processor-options)                          | No       | Options specific to the Frontier Processor |
| assets            | `{ [key: String]: { file: String }}`                            | No       | An object of external asset files          |

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

<b>Note on topics:</b>
There are a couple of improvements from basic log filters:

- Topics don't need to be 0 padded.
- [Event Fragment](https://docs.ethers.io/v5/api/utils/abi/fragments/#EventFragment) strings can be provided and automatically converted to their id.

### Handler Functions

Unlike a normal handler you will not get a `CosmosEvent` as the parameter, instead you will get a `EthermintEvmEvent` or `EthermintEvmEvent` which is based on Ethers [Log](https://docs.ethers.io/v5/api/providers/types/#providers-Log) type.

Changes from the `Log` type:

- `args` is added if the `abi` field is provided and the arguments can be successfully parsed. You can add a generic parameter like so to type `args`: `FrontierEvmEvent<{ from: string, to: string, value: BigNumber }>`.

```ts
import { Approval, Transaction } from "../types";
import {
  FrontierEvmEvent,
  FrontierEvmCall,
} from "@subql/frontier-evm-processor";
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

export async function handleFrontierEvmEvent(
  event: FrontierEvmEvent<TransferEventArgs>
): Promise<void> {
  const transaction = new Transaction(event.transactionHash);

  transaction.value = event.args.value.toBigInt();
  transaction.from = event.args.from;
  transaction.to = event.args.to;
  transaction.contractAddress = event.address;

  await transaction.save();
}

export async function handleFrontierEvmCall(
  event: FrontierEvmCall<ApproveCallArgs>
): Promise<void> {
  const approval = new Approval(event.hash);

  approval.owner = event.from;
  approval.value = event.args._value.toBigInt();
  approval.spender = event.args._spender;
  approval.contractAddress = event.to;

  await approval.save();
}
```

## Data Source Example

This is an extract from the `project.yaml` manifest file.

```yaml
dataSources:
  - kind: substrate/FrontierEvm
    startBlock: 752073
    processor:
      file: "./node_modules/@subql/contract-processors/dist/frontierEvm.js"
      options:
        # Must be a key of assets
        abi: erc20
        # Contract address (or recipient if transfer) to filter, if `null` should be for contract creation
        address: "0x6bd193ee6d2104f14f94e2ca6efefae561a4334b"
    assets:
      erc20:
        file: "./erc20.abi.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleFrontierEvmEvent
          kind: substrate/FrontierEvmEvent
          filter:
            topics:
              - Transfer(address indexed from,address indexed to,uint256 value)
        - handler: handleFrontierEvmCall
          kind: substrate/FrontierEvmCall
          filter:
            ## The function can either be the function fragment or signature
            # function: '0x095ea7b3'
            # function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
            # function: approve(address,uint256)
            function: approve(address to,uint256 value)
            from: "0x6bd193ee6d2104f14f94e2ca6efefae561a4334b"
```

## Known Limitations

- There is no way to get the transaction receipts with call handlers.
- `blockHash` properties are currently left undefined, the `blockNumber` property can be used instead.

## Extra info

- The source code for these processors can be found in our datasource-processors [repo](https://github.com/subquery/datasource-processors).
