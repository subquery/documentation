# Динамични източници на данни

Съществуват случаи, в които няма как да знаете всички параметри относно източника на данни при стартиране на проекта си. Пример за това е фабрика за контракти, която създава нови екземпляри на контрактите на един по-късен етап. Невъзможно е да се знае предварително какви ще бъдат адресите на контрактите. Тук идва възможността за динамично създаване на нови източници на данни.

## Поле `templates`

За да използвате опцията за динамични източници на данни, трябва да притежавате версия на спецификацията `0.2.1`. Ако използвате версията `0.2.0` всичко, което трябва да направите, е да смените specVersion. Ако използвате по-ниска версия, първо трябва да я актуализирате до `0.2.0` с помощта на `subql migrate`.

Версия на спецификацията `0.2.1` ще генерира ново поле `templates`. Шаблоните (Templates) са подобни като при източниците на данни с няколко разлики.

* Необходима е команда `name` за идентифициране на шаблона
* `startBlock` повече не необходим. Той ще бъде зададен в блока, в който е създаден източникът на данни
* В случай на персонализиран източник на данни, полето `processor.options` може да бъде частично попълнено, останалите опции ще бъдат предоставени при самото създаване на екземпляра на източника за данни.

## Пример на проект

Най-добрият начин за демонстриране на използването на динамичните източници на данни е с помощта на пример.

Примерът по-долу е за децентрализирана борса, която има фабричен контракт, който внедрява нов контракт, в случай на добавяне на двойка за търговия. При стартиране на един проект, не е възможно да се знаят адресите на всички контракти за търговски двойки, които вече са създадени или предстоят да бъдат създадени. Източниците на данни могат да бъдат динамично създадени програмно чрез съпоставяне с шаблон, за индексация на новосъздадените контракти за търговските двойки.


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
// Тази функция се определя с помощта на командата cli  `subql codegen` 
import { createTradingPairDatasource } from '../types';
import {MoonbeamEvent} from '@subql/contract-processors/dist/moonbeam';

async function handleNewTradingPair(event: MoonbeamEvent): Promise<void> {
  const { exchange, token1, token2 } = event.args;

  // Създайте нов източник на данни, като предоставите адреса на контракта за обмен на търговската двойка
  await createTradingPairDatasource({ address: exchange });
}

async function handleLiquidityAdded(event: MoonbeamEvent): Promise<void> {
  /* mapping fuction implementation here */
}
```


## Преглед на проектите от Динамични източници на данни

Динамичните източници на данни се съхраняват като част от метаданните. Ако искате да разгледате някой детайли, може да ги изискате както е показано долу:

```gql
{
  _metadata {
    dynamicDatasources
  }
}
```

Резултат
```
{
  "data": {
    "_metadata": {
      "dynamicDatasources": "[{\"templateName\":\"TradingPair\",\"args\":{\"address\":\"0x0000000000000000000000000000000000000000\"},\"startBlock\":1358833}]"
    }
  }
}
```

