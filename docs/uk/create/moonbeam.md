# Підтримка Moonbeam EVM

Ми надаємо спеціальний процесор джерела даних для EVM Moonbeam та Moonriver Це пропонує простий спосіб фільтрації та індексації як EVM, так і Substrate активності в мережах Moonbeam в рамках одного проекту SubQuery.

Підтримувані мережі:

| Назва мережі   | Websocket кінцева точка                            | Кінцева точка словника                                               |
| -------------- | -------------------------------------------------- | -------------------------------------------------------------------- |
| Moonbeam       | _Найближчим часом_                                 | _Найближчим часом_                                                   |
| Moonriver      | `wss://moonriver.api.onfinality.io/public-ws`      | `https://api.subquery.network/sq/subquery/moonriver-dictionary`      |
| Moonbase Alpha | `wss://moonbeam-alpha.api.onfinality.io/public-ws` | `https://api.subquery.network/sq/subquery/moonbase-alpha-dictionary` |

** Ви також можете звернутися до [ базового прикладу EVM Moonriver ](https://github.com/subquery/tutorials-moonriver-evm-starter) з обробником подій та викликів.** Цей проект також розміщений у прямому ефірі в Провіднику SubQuery [ тут ](https://explorer.subquery.network/subquery/subquery/moonriver-evm-starter-project).

## Початок роботи

1. Додати джерело даних в якості залежності `yarn add @subql/contract-processors`
2. Додати джерело даних, як описано нижче
3. Додайте обробники для джерела даних для вашого коду

## Специфікація ресурсу даних

| поле              | Тип                                                            | Обов’язково | Описання                                 |
| ----------------- | -------------------------------------------------------------- | ----------- | ---------------------------------------- |
| processor.file    | `'./node_modules/@subql/contract-processors/dist/moonbeam.js'` | Так         | Посилання на код обробки даних           |
| processor.options | [Параметри процесора](#processor-options)                      | Ні          | Опції, характерні для Процесора Moonbeam |
| assets            | `{ [key: String]: { file: String }}`                           | Ні          | Об'єкт зовнішніх медіафайлів             |

### Параметри процесора

| поле    | Тип              | Обов’язково | Описання                                                                                                     |
| ------- | ---------------- | ----------- | ------------------------------------------------------------------------------------------------------------ |
| abi     | String           | Ні          | Процесор ABI використовується для аналізу аргументів. ПОВИНЕН бути ключем ` assets `                         |
| Address | String or `null` | Ні          | Адреса контракту, з якої здійснюється подія або дзвінок. `null` буде захоплювати виклики створення контракту |

## Виклик Moonbeam

Працює так само, як [ substrate / CallHandler ](../create/mapping/#call-handler), за винятком іншого аргументу обробника та незначних змін фільтрації.

| поле   | Тип                              | Обов’язково | Описання                            |
| ------ | -------------------------------- | ----------- | ----------------------------------- |
| вид    | 'substrate/MoonbeamCall'         | Так         | Вказує, що це обробник типу виклику |
| Фільтр | [Фільтр викликів](#call-filters) | Ні          | Фільтр джерела даних для виконання  |

### Фільтр викликів

| поле    | Тип    | Приклади                                            | Описання                                                                                                                                                                   |
| ------- | ------ | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Функція | String | 0x095ea7b3, затвердити (адресу на,uint256 значення) | Або [ Function Signature ](https://docs.ethers.io/v5/api/utils/abi/fragments/#FunctionFragment), або функція ` sighash ` для фільтрації функції, що викликається договором |
| від     | String | 0x6bd193ee6d2104f14f94e2ca6efefae561a4334b          | Ethereum адреса, яка надіслала транзакцію                                                                                                                                  |

### Обробники

На відміну від звичайного обробника, ви не отримаєте параметр ` SubstrateExtrinsic `, натомість ви отримаєте тип ` MoonbeamCall `, який базується на Ethers [ TransactionResponse ](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse).

Зміни від `типу TransactionResponse`:

- Він не має ` wait ` та ` confirmations ` властивостей
- Властивість ` success ` додається щоб знати, якщо транзакція була успішною
- ` args ` додається, якщо поле ` abi ` надано і аргументи можна успішно проаналізувати

## Подія Moonbeam

Працює так само, як [ substrate / EventHandler ](../create/mapping/#event-handler), за винятком іншого аргументу обробника та незначних змін фільтрації.

| поле   | Тип                            | Обов’язково | Описання                           |
| ------ | ------------------------------ | ----------- | ---------------------------------- |
| вид    | 'substrate/MoonbeamEvent'      | Так         | Вказує, що це обробник типу події  |
| Фільтр | [Event Filter](#event-filters) | Ні          | Фільтр джерела даних для виконання |

### Фільтри події

| поле | Тип           | Приклади                                                             | Описання                                                                                                                                           |
| ---- | ------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| теми | Масиви рядків | Transfer(адреса, індексована адреса, індексована в,uint256 значення) | Фільтр тем слідкує за фільтрами журналів Ethereum JSON-PRC, більше документації можна знайти [ here ](https://docs.ethers.io/v5/concepts/events/). |

<b> Примітка до тем: </b>
Є кілька вдосконалень від основних фільтрів журналів:

- Теми не потрібно 0 підкладати
- [ Рядки фрагмента події ](https://docs.ethers.io/v5/api/utils/abi/fragments/#EventFragment) можна надати та автоматично перетворити на їх ідентифікатор

### Обробники

На відміну від звичайного обробника, ви не отримаєте параметр ` SubstrateEvent `, натомість ви отримаєте ` MoonbeamEvent `, який базується на Ethers [ Log ](https://docs.ethers.io/v5/api/providers/types/#providers-Log).

Зміни з ` Log `:

- ` args ` додається, якщо поле ` abi ` надано і аргументи можна успішно проаналізувати

## Приклад джерела даних

Це витяг з файлу маніфесту `project.yaml`.

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

## Відомі обмеження

- Наразі немає можливості запитувати стан EVM у обробнику
- Немає можливості отримати квитанції про транзакції з обробниками дзвінків
- Властивості ` blockHash ` в даний час залишаються невизначеними, натомість можна використовувати властивість ` blockNumber `
