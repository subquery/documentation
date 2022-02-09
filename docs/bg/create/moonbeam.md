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

### Опции на процесора

| Поле  | Тип            | Задължително | Описание                                                                                                                          |
| ----- | -------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| abi   | Низ            | Не           | ABI, който се използва от процесора за анализиране на аргументи. ТРЯБВА да бъде ключ от `актив`                                   |
| адрес | Низ или `null` | Не           | Адрес на договора, откъдето е събитието или на който е направено обаждането. `null` ще улови обажданията за създаване на контракт |

## MoonbeamCall

Работи по същия начин като [substrate/CallHandler](../create/mapping/#call-handler), освен с различен аргумент на манипулатора и незначителни промени във филтрирането.

| Поле   | Тип                                   | Задължително | Описание                                       |
| ------ | ------------------------------------- | ------------ | ---------------------------------------------- |
| вид    | 'substrate/MoonbeamCall'              | Да           | Указва, че това е манипулатор на тип повикване |
| филтър | [Филтър за повиквания](#call-filters) | Не           | Филтрирайте източника на данни за изпълнение   |

### Филтър за повиквания

| Поле    | Тип | Пример (и)                                    | Описание                                                                                                                                                                       |
| ------- | --- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| функция | Низ | 0x095ea7b3, approve(address to,uint256 value) | Или низове [Function Signature](https://docs.ethers.io/v5/api/utils/abi/fragments/#FunctionFragment), или функцията `sighash` за филтриране на функцията, извикана в контракта |
| от      | Низ | 0x6bd193ee6d2104f14f94e2ca6efefae561a4334b    | Адрес на Ethereum, който е изпратил транзакцията                                                                                                                               |

### Манипулатори

За разлика от нормалния манипулатор, вие няма да получите `SubstrateExtrinsic` като параметър, вместо това ще получите `MoonbeamCall` който е базиран на Ethers [TransactionResponse](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse) тип.

Промени от типа `TransactionResponse`:

- Той няма свойства `wait` и `confirmations`
- Добавя се свойство `success`, за да се знае дали транзакцията е била успешна
- `args` се добавя, ако е предоставено полето `abi` и аргументите могат да бъдат успешно анализирани

## MoonbeamEvent

Работи по същия начин като [substrate/EventHandler](../create/mapping/#event-handler), освен с различен аргумент на манипулатора и незначителни промени във филтрирането.

| Поле   | Тип                                 | Задължително | Описание                                     |
| ------ | ----------------------------------- | ------------ | -------------------------------------------- |
| вид    | 'substrate/MoonbeamEvent'           | Да           | Указва, че това е манипулатор на тип събитие |
| филтър | [Филтри за събитие](#event-filters) | Не           | Филтрирайте източника на данни за изпълнение |

### Филтри за събитие

| Поле | Тип             | Пример (и)                                                      | Описание                                                                                                                                                                   |
| ---- | --------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| теми | Масив на низове | Transfer(address indexed from,address indexed to,uint256 value) | Филтърът за теми следва филтрите за регистрационни файлове на Ethereum JSON-PRC, повече документация можете да намерите [тук](https://docs.ethers.io/v5/concepts/events/). |

<b>Бележка по теми:</b>
Има няколко подобрения от основните филтри за регистрационни файлове:

- Темите не трябва да са подплатени с 0
- Могат да се предоставят низове на [Event Fragment](https://docs.ethers.io/v5/api/utils/abi/fragments/#EventFragment) и автоматично да се преобразуват в техния идентификатор

### Манипулатори

За разлика от нормалния манипулатор, вие няма да получите `SubstrateEvent` като параметър, вместо това ще получите `MoonbeamEvent`, който е базиран на етерски тип[лог](https://docs.ethers.io/v5/api/providers/types/#providers-Log).

Промени от типа `Лог`:

- `args` се добавя, ако е предоставено полето `abi` и аргументите могат да бъдат успешно анализирани

## Пример за източник на данни

Това е извлечение от `project.yaml` манифест файл.

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

## Известни ограничения

- Понастоящем няма начин за запитване на състоянието на EVM в манипулатор
- Няма начин да получите разписки за транзакциите с манипулатори на повиквания
- Свойствата на `blockHash` в момента са оставени недефинирани, вместо това може да се използва свойството `blockNumber`
