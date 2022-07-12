# Substrate EVM Support

We provide a custom data source processor for [Parity's Frontier EVM](https://github.com/paritytech/frontier) and [Acala's EVM+](https://wiki.acala.network/learn/acala-evm/why-acala-evm). This offers a simple way to filter and index both EVM and Substrate activity on many Polkadot networks within a single SubQuery project.

**Tested and Supported networks**

| Network Name   | Websocket Endpoint                                 | Dictionary Endpoint                                                     |
| -------------- | -------------------------------------------------- | ----------------------------------------------------------------------- |
| Moonbeam       | `wss://moonbeam.api.onfinality.io/public-ws`       | `https://api.subquery.network/sq/subquery/moonbeam-dictionary`          |
| Moonriver      | `wss://moonriver.api.onfinality.io/public-ws`      | `https://api.subquery.network/sq/subquery/moonriver-dictionary`         |
| Moonbase Alpha | `wss://moonbeam-alpha.api.onfinality.io/public-ws` | `https://api.subquery.network/sq/subquery/moonbase-alpha-dictionary`    |
| Astar          | `wss://astar.api.onfinality.io/public-ws`          | `https://explorer.subquery.network/subquery/subquery/astar-dictionary`  |
| Shiden         | `wss://shiden.api.onfinality.io/public-ws`         | `https://explorer.subquery.network/subquery/subquery/shiden-dictionary` |
| Acala          | `wss://acala-polkadot.api.onfinality.io/public-ws` | `https://explorer.subquery.network/subquery/subquery/acala-dictionary`  |
| Karura         | `wss://karura.api.onfinality.io/public-ws`         | `https://explorer.subquery.network/subquery/subquery/karura-dictionary` |

Theoretically the following networks should also be supported since they implement Parity's Frontier EVM. Please let us know if you verify this and we can add them to the known support:

- Automata
- Bitcountry
- Clover
- Darwinia
- Edgeware
- Gamepower
- Human
- InVarch
- T3rn
- PAID
- Manta
- Parastate
- Polkafoundry
- ChainX
- Gaia
- Thales
- Unique

**You can also refer to the basic [Moonriver EVM](https://github.com/subquery/tutorials-frontier-evm-starter/tree/moonriver) or [Acala EVM+](https://github.com/subquery/acala-evm-starter) example projects with an event and call handler.** This project is also hosted live in the SubQuery Explorer [here](https://explorer.subquery.network/subquery/subquery/moonriver-evm-starter-project).

## Getting started

1. Add the custom datasource as a dependency:

- Create a new project from an EVM template though `subql init` OR
- For existing projects, `yarn add @subql/frontier-evm-processor` or `yarn add @subql/acala-evm-processor`.

2. Add a custom data source as described below.
3. Add handlers for the custom data source to your code.

## Data Source Spec

| Field             | Type                                                           | Required | Description                                |
| ----------------- | -------------------------------------------------------------- | -------- | ------------------------------------------ |
| processor.file    | `'./node_modules/@subql/frontier-evm-processor/dist/index.js'` | Yes      | File reference to the data processor code  |
| processor.options | [ProcessorOptions](#processor-options)                         | No       | Options specific to the Frontier Processor |
| assets            | `{ [key: String]: { file: String }}`                           | No       | An object of external asset files          |

### Processor Options

| Field   | Type             | Required | Description                                                                                                |
| ------- | ---------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| abi     | String           | No       | The ABI that is used by the processor to parse arguments. MUST be a key of `assets`                        |
| address | String or `null` | No       | A contract address where the event is from or call is made to. `null` will capture contract creation calls |

## Call Handlers

Works in the same way as [substrate/CallHandler](../build/mapping.md#call-handler) except with a different handler argument and minor filtering changes.

| Field  | Type                                                    | Required | Description                                 |
| ------ | ------------------------------------------------------- | -------- | ------------------------------------------- |
| kind   | `substrate/FrontierEvmCall` or `substrate/AcalaEvmCall` | Yes      | Specifies that this is an Call type handler |
| filter | [Call Filter](#call-filters)                            | No       | Filter the data source to execute           |

### Call Filters

| Field    | Type   | Example(s)                                    | Description                                                                                                                                                                      |
| -------- | ------ | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| function | String | 0x095ea7b3, approve(address to,uint256 value) | Either [Function Signature](https://docs.ethers.io/v5/api/utils/abi/fragments/#FunctionFragment) strings or the function `sighash` to filter the function called on the contract |
| from     | String | 0x6bd193ee6d2104f14f94e2ca6efefae561a4334b    | An Ethereum address that sent the transaction                                                                                                                                    |

### Handler Functions

Unlike a normal handler you will not get a `SubstrateExtrinsic` as the parameter, instead you will get a `FrontierEvmCall` or `AcalaEvmCall` which is based on Ethers [TransactionResponse](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse) type.

Changes from the `TransactionResponse` type:

- It doesn't have `wait` and `confirmations` properties.
- A `success` property is added to know if the transaction was a success.
- `args` is added if the `abi` field is provided and the arguments can be successfully parsed. You can add a generic parameter like so to type `args`: `FrontierEvmCall<{ from: string, to: string, value: BigNumber }>`.

## Event Handlers

Works in the same way as [substrate/EventHandler](../create/mapping/#event-handler) except with a different handler argument and minor filtering changes.

| Field  | Type                                                      | Required | Description                                  |
| ------ | --------------------------------------------------------- | -------- | -------------------------------------------- |
| kind   | `substrate/FrontierEvmEvent` or `substrate/AcalaEvmEvent` | Yes      | Specifies that this is an Event type handler |
| filter | [Event Filter](#event-filters)                            | No       | Filter the data source to execute            |

### Event Filters

| Field  | Type         | Example(s)                                                      | Description                                                                                                                                      |
| ------ | ------------ | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| topics | String array | Transfer(address indexed from,address indexed to,uint256 value) | The topics filter follows the Ethereum JSON-PRC log filters, more documentation can be found [here](https://docs.ethers.io/v5/concepts/events/). |

<b>Note on topics:</b>
There are a couple of improvements from basic log filters:

- Topics don't need to be 0 padded.
- [Event Fragment](https://docs.ethers.io/v5/api/utils/abi/fragments/#EventFragment) strings can be provided and automatically converted to their id.

### Handler Functions

Unlike a normal handler you will not get a `SubstrateEvent` as the parameter, instead you will get a `FrontierEvmEvent` or `AcalaEvmEvent` which is based on Ethers [Log](https://docs.ethers.io/v5/api/providers/types/#providers-Log) type.

Changes from the `Log` type:

- `args` is added if the `abi` field is provided and the arguments can be successfully parsed. You can add a generic parameter like so to type `args`: `FrontierEvmEvent<{ from: string, to: string, value: BigNumber }>`.

<CodeGroup>
<CodeGroupItem title="Frontier EVM" active>

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

</CodeGroupItem>
<CodeGroupItem title="Acala EVM+">

```ts
import { Approval, Transaction } from "../types";
import { AcalaEvmEvent, AcalaEvmCall } from "@subql/acala-evm-processor";
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

export async function handleAcalaEvmEvent(
  event: AcalaEvmEvent<TransferEventArgs>
): Promise<void> {
  const transaction = new Transaction(event.transactionHash);

  transaction.value = event.args.value.toBigInt();
  transaction.from = event.args.from;
  transaction.to = event.args.to;
  transaction.contractAddress = event.address;

  await transaction.save();
}

export async function handleAcalaEvmCall(
  event: AcalaEvmCall<ApproveCallArgs>
): Promise<void> {
  const approval = new Approval(event.hash);

  approval.owner = event.from;
  approval.value = event.args._value.toBigInt();
  approval.spender = event.args._spender;
  approval.contractAddress = event.to;

  await approval.save();
}
```

</CodeGroupItem>
</CodeGroup>

## Data Source Example

This is an extract from the `project.yaml` manifest file.

<CodeGroup>
<CodeGroupItem title="Frontier EVM" active>

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

</CodeGroupItem>
<CodeGroupItem title="Acala EVM+">

```yaml
dataSources:
  - kind: substrate/AcalaEvm
    startBlock: 752073
    processor:
      file: "./node_modules/@subql/contract-processors/dist/acalaEvm.js"
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
        - handler: handleAcalaEvmEvent
          kind: substrate/AcalaEvmEvent
          filter:
            topics:
              - Transfer(address indexed from,address indexed to,uint256 value)
        - handler: handleAcalaEvmCall
          kind: substrate/AcalaEvmCall
          filter:
            ## The function can either be the function fragment or signature
            # function: '0x095ea7b3'
            # function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
            # function: approve(address,uint256)
            function: approve(address to,uint256 value)
            from: "0x6bd193ee6d2104f14f94e2ca6efefae561a4334b"
```

</CodeGroupItem>
</CodeGroup>

## Querying contracts

`@subql/frontier-evm-provider` is the only package that currently allows this. It provides [FrontierEthProvider](https://github.com/subquery/datasource-processors/blob/697d63f5a9c978f3e231e0bb4975f05213077d23/packages/frontier-evm/src/frontierEthProvider.ts#L75) which implements an [Ethers Provider](https://docs.ethers.io/v5/api/providers/provider/), this implementation is restricted to only support methods for the current height. You can pass it to a contract instance in order to query contract state at the hight currently being indexed.

## Known Limitations

- There is no way to get the transaction receipts with call handlers.
- `blockHash` properties are currently left undefined, the `blockNumber` property can be used instead.

## Extra info

- There is also a `@subql/moonbeam-evm-processor` which is an alias for `@subql/frontier-evm-processor`.
- The source code for these processors can be found in our datasource-processors [repo](https://github.com/subquery/datasource-processors).
