# Джерела динамічних даних

Існують випадки, коли ви не знаєте всіх параметрів для джерела даних під час запуску проекту. Приклад цього - контрагентний завод, який створить нові випадки контрактів у більш пізній даті. Неможливо знати, якими будуть контрактні адреси, протягом цього часу. Тут і виникають нові джерела даних, які динамічно надходять.

## Поле шаблонів

Для використання динамічних джерел даних вам необхідно мати версію специфікації принаймні `0.2.1`. Якщо ви використовуєте `0.2.0` все, що вам потрібно - це змінити версію. Якщо у вас встановлена нижча версія, слід спочатку оновити `0.2.0` на початку `subql migrate`.

Версія Spec `0.2.1` представляє нове поле `шаблонів`. Шаблони є такими ж, як джерела даних з кількома відмінностями.

* Їм потрібне `ім'я` для того, щоб визначити шаблон
* `стартовий блок` більше не є необхідним. Це буде встановлено в блоці, з якого створено джерело даних
* У разі джерела даних користувачем `процесор. ptions` поле також може бути частково заповнене варіантами, інші параметри будуть надані коли джерело даних встановлено.

## Приклади проектів

Найкращий спосіб показати, як використовувати динамічні джерела даних є приклад.

Наведеним прикладом є децентралізований обмін, у якому є заводський контракт, який розгортає новий контракт коли додаються торгівельні пари. Коли проект запущено, неможливо знати адреси всіх пов'язаних з ним пар контрактів, які були створені або будуть створені. Джерела даних можуть бути динамічно створені обробником даних з шаблону, щоб індексувати нещодавно створені торгові контракти.


### `project.yaml`
```yaml
specVersion: 0.2.1
name: example-project
version: 1.0.0
description: ''
repository: ''
schema:
  file: ./schema.graphql
network:
  genesisHash: '0x91bc6e169807aaa54802737e1c504b2577d4fafedd5a02c10293b1cd60e39527'
  chaintypes:
    file: "./types.yaml"
dataSources:
  - kind: substrate/Moonbeam
    startBlock: 1358833
    processor:
      file: './node_modules/@subql/contract-processors/dist/moonbeam.js'
      options:
        abi: exchangeFactory
        address: '0x0000000000000000000000000000000000000000'
    assets:
      exchangeFactory:
        file: ./src/exchangeFactory.abi.json
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleNewTradingPair
          kind: substrate/MoonbeamEvent
          filter:
            topics:
              - newTradingPair(address exchange, address token1, address token2)

templates:
  - name: TradingPair
    kind: substrate/Moonbeam
    processor:
      file: './node_modules/@subql/contract-processors/dist/moonbeam.js'
      options:
        abi: tradingPair
        # we do not know the address at this point, it will be provided when instantiated
    assets:
      tradingPair:
        file: ./src/tradingPair.abi.json
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleLiquidityAdded
          kind: substrate/MoonbeamEvent
          filter:
            topics:
              - liquidityAdded(address provider, uint256 amount1, uint256 amount2)
```

### `mappingHandlers.ts`

```ts
// This function is defined using `subql codegen` cli command
import { createTradingPairDatasource } from '../types';
import {MoonbeamEvent} from '@subql/contract-processors/dist/moonbeam';

async function handleNewTradingPair(event: MoonbeamEvent): Promise<void> {
  const { exchange, token1, token2 } = event.args;

  // Create a new datasource providing the address of the trading pair exchange contract
  await createTradingPairDatasource({ address: exchange });
}

async function handleLiquidityAdded(event: MoonbeamEvent): Promise<void> {
  /* mapping fuction implementation here */
}
```


## Перевірка динамічних даних проектів

Динамічні джерела даних зберігаються в метаданих проекту. Якщо вам потрібно дізнатися, які деталі, ви можете подати запит нижче:

```gql
{
  _metadata {
    dynamicDatasources
  }
}
```

Результат
```
{
  "data": {
    "_metadata": {
      "dynamicDatasources": "[{\"templateName\":\"TradingPair\",\"args\":{\"address\":\"0x0000000000000000000000000000000000000000\"},\"startBlock\":1358833}]"
    }
  }
}
```

