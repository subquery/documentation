# Динамические источники данных

Бывают случаи, когда вы не знаете всех параметров источника данных при запуске проекта. Примером этого является фабрика контрактов, которая позже создаст новые экземпляры контрактов. В этом случае узнать заранее какие будут адреса контракта невозможно. Именно здесь появляется возможность динамически создавать новые источники данных.

## Поле `templates`

Чтобы использовать динамические источники данных, у вас должна быть версия спецификации не ниже `0.2.1`. Если вы используете `0.2.0`, все, что вам нужно сделать, это изменить specVersion. Если вы используете более раннюю версию, вам следует сначала обновить ее до `0.2.0` с помощью `subql migrate`.

Версия спецификации `0.2.1` предоставит новое поле `templates`. Шаблоны (templates) аналогичны источникам данных с несколькими отличиями.

* Им нужно `name`, чтобы идентифицировать шаблон
* `startBlock` больше не нужен. Это будет установлено в блоке, в котором создается источник данных
* В случае пользовательского источника данных поле `processor.options` также может быть частично заполнено, остальные параметры будут предоставлены при создании экземпляра источника данных.

## Пример проекта

Лучший способ показать, как использовать динамический источник данных, с помощью примера.

Приведенный ниже пример относится к децентрализованной бирже с фабрикой контрактов, которая развертывает новый контракт при добавлении торговой пары. Когда проект запущен, невозможно узнать адреса всех контрактов торговых пар, которые были созданы или будут созданы. Источники данных могут быть динамически созданы обработчиком сопоставления из шаблона для индексации вновь созданных контрактов торговых пар.


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
//Эта функция определяется с помощью команды cli `subql codegen`
import { createTradingPairDatasource } from '../types';
import {MoonbeamEvent} from '@subql/contract-processors/dist/moonbeam';

async function handleNewTradingPair(event: MoonbeamEvent): Promise<void> {
  const { exchange, token1, token2 } = event.args;

  // Создайте новый источник данных, указав адрес контракта на обмен торговой пары.
  await createTradingPairDatasource({ address: exchange });
}

async function handleLiquidityAdded(event: MoonbeamEvent): Promise<void> {
  /* mapping fuction implementation here */
}
```


## Просмотр проектов Динамические источники данных

Динамические источники данных хранятся в метаданных проектов. Если вам нужно увидеть детали, вы можете запросить их как показано ниже:

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

