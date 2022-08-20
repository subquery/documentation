# Cosmos Ethermint (EVM) Support

We provide a custom data source processor for [Cosmos's Ethermint EVM](https://github.com/cosmos/ethermint). This offers a simple way to filter and index both EVM and Cosmos activity on many Cosmos networks within a single SubQuery project.

**You can also refer to the basic [Cronos EVM](https://github.com/DeveloperInProgress/ethermint-evm-starter) example project with an event and call handler.**

## Getting started

1. Add the custom datasource as a dependency:

- Create a new project from an EVM template though `subql init` OR
- For existing projects, `yarn add @subql/ethermint-evm-processor` or `npm i @subql/ethermint-evm-processor`.

2. Add exports to your `package.json` like below in order for IPFS deployments to work

```json
  ...
  "exports": {
    "ethermintEVM": "./node_modules/@subql/ethermint-evm-processor/dist/index.js"
  }
```

3. Add a custom data source as described below.
4. Add handlers for the custom data source to your code.

## Data Source Spec

| Field             | Type                                   | Required | Description                                |
| ----------------- | -------------------------------------- | -------- | ------------------------------------------ |
| kind              | `cosmos/EthermintEvm`                  | Yes      | Type of the datasource                     |
| processor.file    | `'./dist/ethermintEvm.js'`             | Yes      | File reference to the data processor code  |
| processor.options | [ProcessorOptions](#processor-options) | No       | Options specific to the Frontier Processor |
| assets            | `{ [key: String]: { file: String }}`   | No       | An object of external asset files          |

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
/*
type TransferEventArgs = [string, string, BigNumber] & {
  from: string;
  to: string;
  value: BigNumber;
};
*/
/*
type ApproveCallArgs = [string, BigNumber] & {
  _spender: string;
  _value: BigNumber;
};
*/

export async function handleEthermintEvmEvent(
  event: EthermintEvmEvent
): Promise<void> {
  const transaction = new Transaction(event.transactionHash);

  transaction.value = JSON.parse(event.args[2]);
  transaction.from = event.args[0];
  transaction.to = event.args[1];
  transaction.contractAddress = event.address;

  await transaction.save();
}

export async function handleEthermintEvmCall(
  event: EthermintEvmCall
): Promise<void> {
  const approval = new Approval(event.hash);
  approval.owner = event.from;
  approval.value = JSON.parse(event.args[1]);
  approval.spender = event.args[0];
  approval.contractAddress = event.to;

  await approval.save();
}
```

## Data Source Example

This is an extract from the `project.yaml` manifest file.

```yaml
dataSources:
  - kind: cosmos/EthermintEvm
    startBlock: 1474211
    processor:
      file: "./node_modules/@subql/ethermint-evm-processor/dist/index.js"
      options:
        abi: erc20
        address: "0xD4949664cD82660AaE99bEdc034a0deA8A0bd517" # wevmos
    assets:
      erc20:
        file: "./erc20.abi.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleEthermintEvmEvent
          kind: cosmos/EthermintEvmEvent
          filter:
            topics:
              ## Example valid values:
              # - '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
              # - Transfer(address,address,u256)
              # - Transfer(address from,address to,uint256 value)
              - Transfer(address indexed src, address indexed dst, uint256 wad)
              - null
              - null
              - null
        #- handler: handleEthermintEvmCall
        #  kind: cosmos/EthermintEvmCall
        #  filter:
        #    method: approve(address guy, uint256 wad)
        ## The transaction sender
        # from: "0x86ed94fb8fffe265caf38cbefb0431d2fbf862c1"
```

## Known Limitations

- There is no way to get the transaction receipts with call handlers.
- `blockHash` properties are currently left undefined, the `blockNumber` property can be used instead.

## Extra info

- The source code for these processors can be found in our datasource-processors [repo](https://github.com/subquery/datasource-processors).
