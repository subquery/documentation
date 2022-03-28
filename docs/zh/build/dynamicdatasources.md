# 动态数据源

在某些情况下，当项目启动时，您不知道数据源的所有参数。 这方面的一个例子是合约工厂，它将在以后创建新的合同实例。 无法事先知道合约地址是什么。 这就是能够动态创建新数据源的原因。

## ` templates ` 字段

要使用动态数据源，您需要至少有 `0.2.1` 的规范版本。 如果您在 `0.2.0` 上，您需要做的只是更改规范版本。 如果您处于较低版本，那么您应该先使用`subql migrate`更新到 `0.2.0`

规范版本 `0.2.1` 引入了一个新的 `templates` 字段。 模板与数据源相同，但有几个不同之处。

* 他们需要 `name` 来识别模板
* `startBlock` 已不再是必要字段。 这将被设置为数据源创建的区块
* 在自定义数据源的情况下，`processor.options`字段也可以部分填充，其余选项将在数据源实例化时提供。

## 示例项目

展示如何使用动态数据源的最佳方法就是展示一个例子。

下面的例子是一个去中心化交易平台，该平台拥有一个工厂合约，在添加新的交易对时部署一个新的合约。 当项目运行时，不可能知道已经创建或将要创建的所有交易对合约的地址。 数据源可以由映射处理程序从模板动态创建，以便为新创建的交易对建立索引。


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
 
Text
Xpath: /pre/code
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


## 查看一个项目动态数据源

动态数据源存储在项目元数据中。 如果您需要看到您可以像以下示例一样查询详细信息：

```gql
{
  _metadata {
    dynamicDatasources
  }
}
```

结果
```
{
  "data": {
    "_metadata": {
      "dynamicDatasources": "[{\"templateName\":\"TradingPair\",\"args\":{\"address\":\"0x0000000000000000000000000000000000000000\"},\"startBlock\":1358833}]"
    }
  }
}
```

