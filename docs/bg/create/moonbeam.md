# Поддръжка на Moonbeam EVM

Ние предлагаме персонализиран процесор за източник на данни за EVM на Moonbeam и Moonriver. Това предлага лесен начин за филтриране и индексиране както на EVM, така и на Substrate активността в мрежите на Moonbeam в рамките на един SubQuery проект.

Поддържани мрежи:

| Име на мрежата | Ендпойнт на уеб сокет                              | Ендпойнт в Dictionary                                                |
| -------------- | -------------------------------------------------- | -------------------------------------------------------------------- |
| Moonbeam       | _Очаквайте скоро_                                  | _Очаквайте скоро_                                                    |
| Moonriver      | `wss://moonriver.api.onfinality.io/public-ws`      | `https://api.subquery.network/sq/subquery/moonriver-dictionary`      |
| Moonbase Alpha | `wss://moonbeam-alpha.api.onfinality.io/public-ws` | `https://api.subquery.network/sq/subquery/moonbase-alpha-dictionary` |

**Можете също да се обърнете към [основен примерен проект на Moonriver EVM](https://github.com/subquery/tutorials-moonriver-evm-starter) с манипулатор на събитие и повикване. ** Този проект също се хоства на живо в SubQuery Explorer [тук](https://explorer.subquery.network/subquery/subquery/moonriver-evm-starter-project).

## Начални стъпки

1. Добавете персонализирания източник на данни като зависимост `yarn add @subql/contract-processors`
2. Добавете персонализиран източник на данни, както е описано по-долу
3. Добавете манипулатори за персонализирания източник на данни към вашия код

## Спец. източник на данни

| Поле              | Тип                                                            | Задължително | Описание                                           |
| ----------------- | -------------------------------------------------------------- | ------------ | -------------------------------------------------- |
| processor.file    | `'./node_modules/@subql/contract-processors/dist/moonbeam.js'` | Да           | Препратка към файла към кода на процесора на данни |
| processor.options | [Опции на процесора](#processor-options)                       | Не           | Опции, специфични за процесора Moonbeam            |
| актив             | `{ [key: String]: { file: String }}`                           | Не           | Обект на външни файлове с активи                   |

### Processor Options

| Field   | Тип              | Задължително | Description                                                                                                |
| ------- | ---------------- | ------------ | ---------------------------------------------------------------------------------------------------------- |
| abi     | String           | Не           | The ABI that is used by the processor to parse arguments. MUST be a key of `assets`                        |
| address | String or `null` | Не           | A contract address where the event is from or call is made to. `null` will capture contract creation calls |

## MoonbeamCall

Works in the same way as [substrate/CallHandler](../create/mapping/#call-handler) except with a different handler argument and minor filtering changes.

| Field  | Тип                          | Задължително | Description                                 |
| ------ | ---------------------------- | ------------ | ------------------------------------------- |
| kind   | 'substrate/MoonbeamCall'     | Да           | Specifies that this is an Call type handler |
| filter | [Call Filter](#call-filters) | Не           | Filter the data source to execute           |

### Call Filters

| Field    | Тип    | Example(s)                                    | Description                                                                                                                                                                      |
| -------- | ------ | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| function | String | 0x095ea7b3, approve(address to,uint256 value) | Either [Function Signature](https://docs.ethers.io/v5/api/utils/abi/fragments/#FunctionFragment) strings or the function `sighash` to filter the function called on the contract |
| from     | String | 0x6bd193ee6d2104f14f94e2ca6efefae561a4334b    | An Ethereum address that sent the transaction                                                                                                                                    |

### Handlers

Unlike a normal handler you will not get a `SubstrateExtrinsic` as the parameter, instead you will get a `MoonbeamCall` which is based on Ethers [TransactionResponse](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse) type.

Changes from the `TransactionResponse` type:

- It doesn't have `wait` and `confirmations` properties
- A `success` property is added to know if the transaction was a success
- `args` is added if the `abi` field is provided and the arguments can be successfully parsed

## MoonbeamEvent

Works in the same way as [substrate/EventHandler](../create/mapping/#event-handler) except with a different handler argument and minor filtering changes.

| Field  | Тип                            | Задължително | Description                                  |
| ------ | ------------------------------ | ------------ | -------------------------------------------- |
| kind   | 'substrate/MoonbeamEvent'      | Да           | Specifies that this is an Event type handler |
| filter | [Event Filter](#event-filters) | Не           | Filter the data source to execute            |

### Event Filters

| Field  | Тип          | Example(s)                                                      | Description                                                                                                                                      |
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

## Data Source Example

This is an extract from the `project.yaml` manifest file.

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

## Known Limitations

- There is currently no way to query EVM state within a handler
- There is no way to get the transaction receipts with call handlers
- `blockHash` properties are currently left undefined, the `blockNumber` property can be used instead
