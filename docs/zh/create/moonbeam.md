# SubQuery 支持 Moonbeam EVM

我们为Moonbeam和Moonriver的EVM提供了一个自定义数据源处理器。 这为单一的 SubQuery 项目中提供了一种简单的方法来筛选和索引Moonbeam的网络上的 EVM 和 底层活动。

支持的网络：

| 网络名称           | Websocket 终端                                       | Dictionary 终端                                                        |
| -------------- | -------------------------------------------------- | -------------------------------------------------------------------- |
| Moonbeam       | _即将上线_                                             | _即将上线_                                                               |
| Moonriver      | `wss://moonriver.api.onfinality.io/public-ws`      | `https://api.subquery.network/sq/subquery/moonriver-dictionary`      |
| Moonbase Alpha | `wss://moonbeam-alpha.api.onfinality.io/public-ws` | `https://api.subquery.network/sq/subquery/moonbase-alpha-dictionary` |

**您也可以通过事件和调用处理程序来参考 [基本Moonrier EVM 示例项目](https://github.com/subquery/tutorials-moonriver-evm-starter)** 这个项目也存在于 [ SubQuery Explorer](https://explorer.subquery.network/subquery/subquery/moonriver-evm-starter-project) 中。

## 快速入门

1. 添加自定义数据源作为依赖项 `yarn add @subql/contract-processors`
2. 添加自定义数据源，如下文所述。
3. 将自定义数据源的处理程序添加到您的代码

## 数据源说明

| 属性                | 类型                                                             | 必填  | 描述                                |
| ----------------- | -------------------------------------------------------------- | --- | --------------------------------- |
| processor.file    | `'./node_modules/@subql/contract-processors/dist/moonbeam.js'` | Yes | 数据处理器代码的文件引用                      |
| processor.options | [ProcessorOptions](#processor-options)                         | No  | 月光束处理器特有的选项                       |
| assets            | `{ [key: String]: { file: String }}`                           | No  | An object of external asset files |

### 处理器选项：

| 属性      | 类型               | 必填 | 描述                                   |
| ------- | ---------------- | -- | ------------------------------------ |
| abi     | String           | No | 处理器使用的 ABI 解析参数。 MUST 是 `asset的一个密钥` |
| address | String or `null` | No | 事件发生或打电话的合同地址。 `null` 将捕获合同创建调用      |

## MoonbeamCall

使用 [Substrate/CallHandler](../create/mapping/#call-handler) 的同样方式，区别是不同的处理程序参数和较小的过滤更改。

| 属性     | 类型:                          | 必填  | 描述             |
| ------ | ---------------------------- | --- | -------------- |
| kind   | 'substrate/MoonbeamCall'     | Yes | 指定这是一个通话类型处理程序 |
| filter | [Call Filter](#call-filters) | No  | 筛选要执行的数据源      |

### 调用过滤器

| 属性       | 类型:    | 示例                                            | 描述                                                                                                |
| -------- | ------ | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| function | String | 0x095ea7b3, approve(address to,uint256 value) | [函数签名](https://docs.ethers.io/v5/api/utils/abi/fragments/#FunctionFragment) 字符串或函数 `视野` 过滤被调用的函数。 |
| from     | String | 0x6bd193ee6d2104f14f94e2ca6efefae561a4334b    | 发送交易的以太坊地址                                                                                        |

### 处理程序

与正常处理程序不同的是，你不会获得一个 `SubstrateExtrinsic` 作为参数， 相反，您将得到一个 `MoonbeamCall` 基于Ethers [交易响应](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse) 类型。

从 `TransactionResponse` 类型的更改：

- 它没有 `等待` 和 `确认` 属性
- 如果交易成功将会添加一个 `成功` 属性
- 在 `abi` 字段提供参数使其可以成功分析时将会添加`args` 字段

## Moonbeam 事件

使用 [Substrate/CallHandler](../create/mapping/#event-handler) 的同样方式，区别是不同的处理程序参数和较小的过滤更改。

| 属性     | 类型                             | 必填  | 描述             |
| ------ | ------------------------------ | --- | -------------- |
| kind   | 'substrate/MoonbeamEvent'      | Yes | 指定这是一个通话类型处理程序 |
| filter | [Event Filter](#event-filters) | No  | 筛选要执行的数据源      |

### Event 过滤器

| 属性     | 类型           | 示例                                                              | 描述                                                                                        |
| ------ | ------------ | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| topics | String array | Transfer(address indexed from,address indexed to,uint256 value) | 主题筛选器遵循Etherum JSON-PRC 日志过滤器，在这里可以找到更多文档 [](https://docs.ethers.io/v5/concepts/events/)。 |

<b>关于主题的说明：</b>
基本日志过滤器有一些改进：

- 主题不需要为 0 padded
- [事件片段](https://docs.ethers.io/v5/api/utils/abi/fragments/#EventFragment) 字符串可以提供并自动转换为他们的 id

### 处理程序

与正常处理程序不同的是，你不会获得一个 `SubstrateExtrinsic` 作为参数， 相反，您将得到一个 `MoonbeamEvent` 基于Ethers [Log](https://docs.ethers.io/v5/api/providers/types/#providers-Log) 类型。

来自 `Log` 类型的更改：

- 在 `abi` 字段提供参数使其可以成功分析时将会添加`args` 字段

## 数据源示例

这是从 `project.yaml` 清单文件中提取出的。

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

## 已知问题

- 目前无法在处理程序中查询 EVM 状态
- 无法通过调用处理程序来获取交易收据信息
- `blockHash` 属性当前未定义。 `blockNumber` 属性可以改为使用
