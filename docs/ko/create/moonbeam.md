# Moonbeam EVM Support

We provide a custom data source processor for Moonbeam's and Moonriver's EVM. This offers a simple way to filter and index both EVM and Substrate activity on Moonbeam's networks within a single SubQuery project.

Supported networks:

| Network Name   | Websocket Endpoint                                 | Dictionary Endpoint                                                  |
| -------------- | -------------------------------------------------- | -------------------------------------------------------------------- |
| Moonbeam       | _Coming soon_                                      | _Coming soon_                                                        |
| Moonriver      | `wss://moonriver.api.onfinality.io/public-ws`      | `https://api.subquery.network/sq/subquery/moonriver-dictionary`      |
| Moonbase Alpha | `wss://moonbeam-alpha.api.onfinality.io/public-ws` | `https://api.subquery.network/sq/subquery/moonbase-alpha-dictionary` |

**You can also refer to the [basic Moonriver EVM example project](https://github.com/subquery/tutorials-moonriver-evm-starter) with an event and call handler.** This project is also hosted live in the SubQuery Explorer [here](https://explorer.subquery.network/subquery/subquery/moonriver-evm-starter-project).

## 시작하기

1. Add the custom data source as a dependency `yarn add @subql/contract-processors`
2. Add a custom data source as described below
3. Add handlers for the custom data source to your code

## 데이터 소스 사양

| 필드                | 타입                                                             | 요구사항 | 설명                                         |
| ----------------- | -------------------------------------------------------------- | ---- | ------------------------------------------ |
| processor.file    | `'./node_modules/@subql/contract-processors/dist/moonbeam.js'` | 네    | File reference to the data processor code  |
| processor.options | [ProcessorOptions](#processor-options)                         | 아니오  | Options specific to the Moonbeam Processor |
| assets            | `{ [key: String]: { file: String }}`                           | 아니오  | An object of external asset files          |

### 프로세서 옵션

| 필드      | 타입               | 요구사항 | 설명                                                                |
| ------- | ---------------- | ---- | ----------------------------------------------------------------- |
| abi     | String           | 아니오  | ABI는 프로세서가 변수 분석을 위해 사용. MUST be a key of `assets`                |
| address | String 또는 `null` | 아니오  | 이벤트 또는 콜이 만들어진 거래 주소. `null` will capture contract creation calls |

## MoonbeamCall

Works in the same way as [substrate/CallHandler](../create/mapping/#call-handler) except with a different handler argument and minor filtering changes.

| 필드     | 타입                           | 요구사항 | 설명                                          |
| ------ | ---------------------------- | ---- | ------------------------------------------- |
| kind   | 'substrate/MoonbeamCall'     | 네    | Specifies that this is an Call type handler |
| filter | [Call Filter](#call-filters) | 아니오  | Filter the data source to execute           |

### Call Filters

| 필드       | 타입     | Example(s)                                    | 설명                                                                                                                                                                               |
| -------- | ------ | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| function | String | 0x095ea7b3, approve(address to,uint256 value) | Either [Function Signature](https://docs.ethers.io/v5/api/utils/abi/fragments/#FunctionFragment) strings or the function `sighash` to filter the function called on the contract |
| from     | String | 0x6bd193ee6d2104f14f94e2ca6efefae561a4334b    | An Ethereum address that sent the transaction                                                                                                                                    |

### Handlers

Unlike a normal handler you will not get a `SubstrateExtrinsic` as the parameter, instead you will get a `MoonbeamCall` which is based on Ethers [TransactionResponse](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse) type.

`TransactionResponse` 타입과의 차이:

- `wait` 및 `confirmations` 특성을 갖지 않습니다.
- A `success` property is added to know if the transaction was a success
- `args` is added if the `abi` field is provided and the arguments can be successfully parsed

## MoonbeamEvent

Works in the same way as [substrate/EventHandler](../create/mapping/#event-handler) except with a different handler argument and minor filtering changes.

| 필드     | 타입                             | 요구사항 | Description                                  |
| ------ | ------------------------------ | ---- | -------------------------------------------- |
| kind   | 'substrate/MoonbeamEvent'      | 네    | Specifies that this is an Event type handler |
| filter | [Event Filter](#event-filters) | 아니오  | Filter the data source to execute            |

### 이벤트 필터

| Field  | 타입           | Example(s)                                                      | Description                                                                                                                                      |
| ------ | ------------ | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| topics | String array | Transfer(address indexed from,address indexed to,uint256 value) | The topics filter follows the Ethereum JSON-PRC log filters, more documentation can be found [here](https://docs.ethers.io/v5/concepts/events/). |

<b>Note on topics:</b>
There are a couple of improvements from basic log filters:

- Topics don't need to be 0 padded
- [Event Fragment](https://docs.ethers.io/v5/api/utils/abi/fragments/#EventFragment) strings can be provided and automatically converted to their id

### Handlers

Unlike a normal handler you will not get a `SubstrateEvent` as the parameter, instead you will get a `MoonbeamEvent` which is based on Ethers [Log](https://docs.ethers.io/v5/api/providers/types/#providers-Log) type.

Changes from the `Log` type:

- `args` is added if the `abi` field is provided and the arguments can be successfully parsed

## 데이터 소스 예제

본 예제는 `project.yaml` 매니페스트 파일에서 추출하였습니다.

```yaml
dataSources:
  - kind: substrate/Moonbeam
    startBlock: 752073
    processor:
      file: './node_modules/@subql/contract-processors/dist/moonbeam.js'
      options:
        # Must be a key of assets
        abi: erc20
        # Contract address (or recipient if transfer) to filter, if `null` should be for contract creation
        address: '0x6bd193ee6d2104f14f94e2ca6efefae561a4334b'
    assets:
      erc20:
        file: './erc20.abi.json'
    mapping:
      file: './dist/index.js'
      handlers:
        - handler: handleMoonriverEvent
          kind: substrate/MoonbeamEvent
          filter:
            topics:
              - Transfer(address indexed from,address indexed to,uint256 value)
        - handler: handleMoonriverCall
          kind: substrate/MoonbeamCall
          filter:
            ## The function can either be the function fragment or signature
            # function: '0x095ea7b3'
            # function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
            # function: approve(address,uint256)
            function: approve(address to,uint256 value)
            from: '0x6bd193ee6d2104f14f94e2ca6efefae561a4334b'
```

## 알려진 제약사항

- 현재 핸들러 내부에서 EVM 스테이트의 쿼리는 지원하지 않습니다.
- There is no way to get the transaction receipts with call handlers
- `blockHash` properties are currently left undefined, the `blockNumber` property can be used instead
