# Substrate WASM Support

We provide a custom data source processor for [Substrate WASM contract](https://ink.substrate.io/why-webassembly-for-smart-contracts). This offers a simple way to filter and index both WASM and Substrate activity on many Polkadot networks within a single SubQuery project.

**Tested and Supported networks**

| Network Name   | Websocket Endpoint                         | Dictionary Endpoint                                           |
|----------------|--------------------------------------------|---------------------------------------------------------------|
| Shiden         | `wss://shiden.api.onfinality.io/public-ws` | `https://api.subquery.network/sq/subquery/shiden-dictionary`  |
| Shibuya        |                                            | `https://api.subquery.network/sq/subquery/shibuya-dictionary` |


**You can also refer to the basic [Substrate WASM](https://github.com/subquery/substrate-wasm-starter) example projects with an event and call handler.** This project is also hosted live in the SubQuery Explorer [here](https://explorer.subquery.network/subquery/subquery/tutorial-substrate-wasm-starter).

## Getting started

1. Add the custom datasource as a dependency:

- Create a new project from an WASM starter template though `subql init` OR
- For existing projects, `yarn add @subql/substrate-wasm-processor`.

2. Import processor file to your `project.yaml` like below

```yaml
  ...
  dataSources:
    - kind: substrate/Wasm
      startBlock: 970733
      processor:
        file: ./node_modules/@subql/substrate-wasm-processor/dist/bundle.js
```

3. Add a custom data source as described below.
4. Add handlers for the custom data source to your code.

## Data Source Spec

| Field             | Type                                                             | Required | Description                               |
| ----------------- |------------------------------------------------------------------|----------|-------------------------------------------|
| kind              | `substrate/Wasm`                                                 | Yes      | Type of the datasource                    |
| processor.file    | `'./node_modules/@subql/substrate-wasm-processor/dist/bundle.js` | Yes      | File reference to the data processor code |
| processor.options | [ProcessorOptions](substrate-substrate.md#processor-options)     | No       | Options specific to the WASM Processor    |
| assets            | `{ [key: String]: { file: String }}`                             | No       | An object of external asset files         |

### Processor Options

| Field    | Type             | Required | Description                                                                                                |
|----------| ---------------- | -------- |------------------------------------------------------------------------------------------------------------|
| abi      | String           | No       | The ABI/Metadata that is used by the processor to parse arguments. MUST be a key of `assets`               |
| contract | String or `null` | No       | A contract address where the event is from or call is made to. `null` will capture contract creation calls |

## Call Handlers

Works in the same way as [substrate/CallHandler](../build/mapping/polkadot.md#call-handler) except with a different handler argument and minor filtering changes.

| Field  | Type                                          | Required | Description                                 |
| ------ |-----------------------------------------------| -------- | ------------------------------------------- |
| kind   | `substrate/WasmCall`                          | Yes      | Specifies that this is an Call type handler |
| filter | [Call Filter](substrate-wasm.md#call-filters) | No       | Filter the data source to execute           |

### Call Filters

| Field    | Type   | Example(s)                                   | Description                                                                         |
|----------| ------ |----------------------------------------------|-------------------------------------------------------------------------------------|
| selector | String | `0x681266a0`                                 | [Selector](https://ink.substrate.io/macros-attributes/selector/) identifies a method |
| method   | String | `approve`                                    | The label for the message, same as the function called on the contract              |
| from     | String | `0x6bd193ee6d2104f14f94e2ca6efefae561a4334b` | The sender, a Substrate Account that submitted the transaction                      |

### Handler Functions

Unlike a normal handler you will not get a `SubstrateExtrinsic` as the parameter, instead you will use `substrate/WasmCall` and receive `WasmCall` as the parameter. 

The `WasmCall` includes these useful information:
```
  from: Address; // An Substrate Account that submitted the transaction  
  dest: Address; // The contract address been called
  gasLimit: Weight; // Gas limit for this contract
  storageDepositLimit: Option<Compact<u128>>;
  data: {args: T; message: AbiMessage} | string; // The data passed from this contract, with its arguments and message body
  selector: string; // Contract selector, identifies the method been called
  success: boolean; // Success state
  value: BalanceOf;  
  // ... and more
```

## Event Handlers

Works in the same way as [substrate/EventHandler](../build/mapping/polkadot.md#event-handler) except with a different handler argument and minor filtering changes.

| Field  | Type                           | Required | Description                                  |
| ------ |--------------------------------| -------- | -------------------------------------------- |
| kind   | `substrate/WasmEvent`          | Yes      | Specifies that this is an Event type handler |
| filter | [Event Filter](#event-filters) | No       | Filter the data source to execute            |

### Event Filters

| Field      | Type      | Example(s)                                          | Description                                                          |
|------------|-----------|-----------------------------------------------------|----------------------------------------------------------------------|
| from       | String    | `YeuN6quBhpFnd5DyWNCrwGvpyBgq51Q3nbVMSsQJ6toPXSf`   | The sender of the contract call which trigger this contract event    |
| contract   | String    | `a6Yrf6jAPUwjoi5YvvoTE4ES5vYAMpV55ZCsFHtwMFPDx7H`   | A contract address where the event is from                           |
| identifier | String    | `Transfer`                                          | The label of the event, it identifies the event type in the contract |


### Handler Functions

Unlike a normal handler you will not get a `SubstrateEvent` as the parameter, instead you will get a `substrate/WasmEvent` with `WasmEvent` as its parameter.

```
  from: string; // An Substrate Account that triggered this event  
  contract: AccountId; // A contract address where the event is from     
  eventIndex: number; // The event index in its Abi
  identifier?: string | undefined; // The label of the event
  args?: T | undefined; // The argument of the events, contains data to extract in mapping
  transactionHash: string; // Transaction hash of this event
  // ... and more
```

<CodeGroup>
<CodeGroupItem title="Substrate WASM" active>

```ts

import { Approval, Transaction } from "../types";
import {
    WasmEvent,
    WasmCall,
} from "@subql/substrate-wasm-processor";
import {Balance,AccountId} from '@polkadot/types/interfaces/runtime'
import { Option } from '@polkadot/types-codec';

// Setup types from ABI
type TransferEventArgs = [Option<AccountId>, Option<AccountId>, Balance]
type ApproveCallArgs = [AccountId, Balance]

export async function handleSubstrateWasmEvent(
    event: WasmEvent<TransferEventArgs>
): Promise<void> {
    const [from,to,value] = event.args;
    const transaction = new Transaction(`${event.blockNumber}-${event.eventIndex}`);
    transaction.transactionHash = event.transactionHash;
    transaction.value = value.toBigInt();;
    transaction.from = from.toString();
    transaction.to = to.toString();
    transaction.contractAddress = event.contract.toString();
    await transaction.save();
}

export async function handleSubstrateCall(
    call: WasmCall<ApproveCallArgs>
): Promise<void> {
    const approval = new Approval(`${call.blockNumber}-${call.idx}`);
    approval.hash = call.hash
    approval.owner = call.from.toString();
    if(typeof call.data!=='string'){
        const [spender,value] = call.data.args;
        approval.spender = spender.toString();
        approval.value = value.toBigInt();
    }else{
        logger.info(`Decode call failed ${call.hash}`)
    }
    approval.contractAddress = call.dest.toString();
    await approval.save();
}
```

</CodeGroupItem>
</CodeGroup>


## Data Source Example

This is an extract from the `project.yaml` manifest file.

<CodeGroup>
<CodeGroupItem title="Frontier WASM" active>

```yaml
dataSources:
  - kind: substrate/Wasm
    startBlock: 970733
    processor:
      file: ./node_modules/@subql/substrate-wasm-processor/dist/bundle.js
      options:
        abi: erc20
        contract: 'a6Yrf6jAPUwjoi5YvvoTE4ES5vYAMpV55ZCsFHtwMFPDx7H'
    assets:
      erc20:
        file: ./erc20Metadata.json
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleSubstrateWasmEvent
          kind: substrate/WasmEvent
          filter:
            # from: 'xxxx'
            contract: 'a6Yrf6jAPUwjoi5YvvoTE4ES5vYAMpV55ZCsFHtwMFPDx7H'
            identifier: 'Transfer'
        - handler: handleSubstrateCall
          kind: substrate/WasmCall
          filter:
            selector: '0x681266a0'
            method: 'approve'
```

</CodeGroupItem>
</CodeGroup>


## Querying contracts

[SubstrateWasmProvider](https://github.com/subquery/datasource-processors/blob/main/packages/substrate-wasm/src/substrateWasmProvider.ts) provide contract query method like `getStorage` and `call`.

## Known Limitations
- Not support dynamic datasource at the moment, which means we are unable to import and handle contract dynamically.

