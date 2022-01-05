# 配置文件

`project.yaml`清单文件可以看作是项目的入口点，它定义了关于SubQuery 如何索引和转换链数据的大部分细节。

该清单文件可以是YAML或JSON格式。 在本文档中，我们将在所有示例中使用YAML格式。 下面是`project.yaml`文件的标准示例。

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml specVersion: 0.2.0 name: example-project # Provide the project name version: 1.0.0  # Project version description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: file: ./schema.graphql # The location of your GraphQL schema file network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' # Genesis hash of the network endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: file: "./dist/index.js" handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> <CodeGroupItem title="v0.0.1"> ``` yml specVersion: "0.0.1" description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: ./schema.graphql # The location of your GraphQL schema file network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - name: main kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional but suggested to speed up event processing module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> </CodeGroup>

## 从v0.0.1迁移到v0.2.0

**如果你有一个specVersion v0.0.1的项目，你可以使用`subql migrate`来快速迁移。 [查看这里](#cli-options) 了解更多信息**

在 `网络` 中：

- 需要新的 **** `基因哈希` 字段有助于识别正在使用的链。
- 对于v0.2.0 及以上，如果您正在引用自定义链，您可以引用外部 [chainype 文件](#custom-chains)。

在 `数据源` 下：

- 可以直接链接映射处理器的 `index.js` 条目。 默认情况下，此 `index.js` 将从 `索引生成。 ts` 在构建过程中。
- 数据源现在可以是常规运行时的数据源或 [自定义数据源](#custom-data-sources)。

### CLI 选项

v0.2。 spec 版本处于测试阶段，您需要在项目初始化过程中运行 `subql init --specversion 0来明确定义它。 .0 PROJECT_NAME`

`subql migrate` 可以在一个现有的项目中运行，将项目清单迁移到最新版本。

| 选项             | Description                    |
| -------------- | ------------------------------ |
| -f, --force    |                                |
| -l, --location | 要运行迁移的本地文件夹 (必须包含 project.yml) |
| --file=文件      | 指定要迁移的 project.yaml            |

## 概述

### 顶级视图

| Field           | v0.0.1                              | v0.2.0                      | Description                       |
| --------------- | ----------------------------------- | --------------------------- | --------------------------------- |
| **specVersion** | String                              | String                      | `0.0.1` 或 `0.2.0` - 清单文件的 spec 版本 |
| **name**        | String                              | String                      | 项目名称                              |
| **version**     | String                              | String                      | 项目版本                              |
| **description** | String                              | String                      | 项目描述                              |
| **repository**  | String                              | String                      | 项目的 Git 仓库地址                      |
| **schema**      | String                              | [Schema Spec](#schema-spec) | GraphQL schema文件的位置               |
| **network**     | [Network Spec](#network Spec)       | Network Spec                | 要索引的网络详情                          |
| **dataSources** | [DataSource Spec](#dataSource Spec) | DataSource Spec             |                                   |

### Schema Spec

| Field    | v0.0.1 | v0.2.0 | Description         |
| -------- | ------ | ------ | ------------------- |
| **file** | String | String | GraphQL schema文件的位置 |

### Network Spec

| Field           | v0.0.1 | v0.2.0        | Description                                                                                                     |
| --------------- | ------ | ------------- | --------------------------------------------------------------------------------------------------------------- |
| **genesisHash** | String | String        | 网络起源哈希值                                                                                                         |
| **endpoint**    | String | String        | `network.endpoint`定义要索引的区块链的wss或ws端点-**必须是完整的存档节点**。 您可以免费从 [Onfinality](https://app.onfinality.io) 检索所有传送端点的终点 |
| **dictionary**  | String | String        | `network.dictionary`可选地提供全链字典的HTTP端点以加快处理-[了解SubQuery字典的工作方式](../tutorials_examples/dictionary.md)。             |
| **chaintypes**  | String | {file:String} | 链式文件路径，接受 `.json` 或 `.yaml` 格式                                                                                  |

### Datasource 说明

DataSources定义要过滤和提取的数据以及要应用的数据转换的映射函数处理程序的位置。
| Field          | v0.0.1                                            | v0.2.0                                                                           | Description                                                                  |
| -------------- | ------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **name**       | String                                            | String                                                                           | 数据源名称                                                                        |
| **kind**       | [substrate/Runtime](./manifest/#data-sources-map) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | 我们支持默认底层运行时间的数据类型，如块、事件和额外(调用)。 <br /> 从 v0.2.0，我们支持自定义运行时间的数据，例如智能合约。 |
| **startBlock** | Integer                                           | Integer                                                                          | 这将更改您的索引开始块，设置此更高以跳过最初的块，减少数据                                                |
| **mapping**    | Mapping Spec                                      | Mapping Spec                                                                     |                                                                              |
| **filter**     | [network-filters](./manifest/#network-filters)    | String                                                                           | 通过网络端点速度名称筛选要执行的数据源                                                          |

### Mapping Spec

| Field                  | v0.0.1                                                           | v0.2.0                                                                                        | Description                                                                                                                |
| ---------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **file**               | String                                                           | String                                                                                        | 映射条目路径                                                                                                                     |
| **handlers & filters** | [Default handlers and filters](./manifest/#mapping-hand-filters) | Default handlers and filters, <br />[Custom handlers and filters](#custom-data-sources) | 列出所有 [映射函数](./mapping.md) 及其相应的处理类型，并添加附加映射筛选器。 <br /><br /> 对于自定义运行时映射处理程序，请查看 [自定义数据源](#custom-data-sources) |

## 数据来源和映射

在本节中，我们将谈论默认的底层运行时间及其映射。 下面是一个示例：

```yaml
dataSources:
  - kind: substrate/Runtime # Indicates that this is default runtime
    startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data
    mapping:
      file: dist/index.js # Entry path for this mapping
```

### 映射处理器和过滤器

下表将说明不同处理程序支持的筛选器。

**当您只使用具有适当映射过滤器的事件和呼叫处理程序时，您的子查询项目将会更加有效。**

| 处理程序                                       | 支持的过滤器：                      |
| ------------------------------------------ | ---------------------------- |
| [BlockHandler](./mapping.md#block-handler) | `specVersion`                |
| [EventHandler](./mapping.md#event-handler) | `module`,`method`            |
| [CallHandler](./mapping.md#call-handler)   | `module`,`method` ,`success` |

过滤器映射是一个非常有用的选项，是用决定哪些块、事件或外部程序将触发映射的过滤器。

映射函数只处理满足筛选条件的传入数据。 映射筛选的选项是可选状态，但我们推荐使用，因为它可以显著减少SubQuery项目处理的数据量，并提高索引性能。

```yaml
# Example filter from callHandler
filter:
  module: balances
  method: Deposit
  success: true
```

- 模块和方法过滤器支持所有基于SubQery的平行链。
- 过滤器的`成功运行`需要一个布尔值，用于根据外部对象的成功状态进行过滤。
- `specVersion`过滤器指定板块的规格版本范围。 以下示例将描述如何设置版本范围。

```yaml
filter:
  specVersion: [23, 24]   # Index block with specVersion in between 23 and 24 (inclusive).
  specVersion: [100]      # Index block with specVersion greater than or equal 100.
  filter:
  specVersion: [23, 24]   # Index block with specVersion in between 23 and 24 (inclusive).
  specVersion: [100]      # Index block with specVersion greater than or equal 100.
  specVersion: [null, 23] # Index block with specVersion less than or equal 23.
```

## 自定义链

### Network Spec

当连接到不同的 Polkadot parachain，甚至一个自定义的底层链时， 您需要编辑此清单的 [网络Spec](#network-spec) 部分。

`genesisHash` 必须始终是自定义网络第一个块的哈希。 您可以通过到 [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) 并在 **block 0** 中寻找散列(见下面的图像)来轻松地退出。

![Genesis Hash](/assets/img/genesis-hash.jpg)

此外，您将需要更新 `个端点`。 `network.endpoint`定义要索引的区块链的wss或ws端点-**必须是完整的存档节点**。 您可以免费从 [Onfinality](https://app.onfinality.io) 检索所有传送端点的终点

### Chain 类型

你可以通过在中添加链类型来索引自定义链中的数据。

我们支持Substrate 运行模式所使用的额外类型， `类型别名`， `类型Bundle`, `类型链`, 和 `类型Spec` 也被支持。

In the v0.2.0 example below, the `network.chaintypes` are pointing to a file that has all the custom types included, This is a standard chainspec file that declares the specific types supported by this blockchain in either `.json`, `.yaml` or `.js` format.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # The relative filepath to where custom types are stored ... ``` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> ``` yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter:  #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true ``` </CodeGroupItem> </CodeGroup>

To use typescript for your chain types file include it in the `src` folder (e.g. `./src/types.ts`), run `yarn build` and then point to the generated js file located in the `dist` folder.

```yml
network:
  chaintypes:
    file: ./dist/types.js # Will be generated after yarn run build
...
```

Things to note about using the chain types file with extension `.ts` or `.js`:

- Your manifest version must be v0.2.0 or above.
- Only the default export will be included in the [polkadot api](https://polkadot.js.org/docs/api/start/types.extend/) when fetching blocks.

Here is an example of a `.ts` chain types file:

<CodeGroup> <CodeGroupItem title="types.ts"> ```ts
import { typesBundleDeprecated } from "moonbeam-types-bundle"
export default { typesBundle: typesBundleDeprecated }; ``` </CodeGroupItem> </CodeGroup>

## Custom Data Sources

Custom Data Sources provide network specific functionality that makes dealing with data easier. They act as a middleware that can provide extra filtering and data transformation.

A good example of this is EVM support, having a custom data source processor for EVM means that you can filter at the EVM level (e.g. filter contract methods or logs) and data is transformed into structures farmiliar to the Ethereum ecosystem as well as parsing parameters with ABIs.

Custom Data Sources can be used with normal data sources.

Here is a list of supported custom datasources:

| Kind                                                  | Supported Handlers                                                                                       | Filters                         | Description                                                                      |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------- |
| [substrate/Moonbeam](./moonbeam/#data-source-example) | [substrate/MoonbeamEvent](./moonbeam/#moonbeamevent), [substrate/MoonbeamCall](./moonbeam/#moonbeamcall) | See filters under each handlers | Provides easy interaction with EVM transactions and events on Moonbeams networks |

## Network Filters

**Network filters only applies to manifest spec v0.0.1**.

Usually the user will create a SubQuery and expect to reuse it for both their testnet and mainnet environments (e.g Polkadot and Kusama). Between networks, various options are likely to be different (e.g. index start block). Therefore, we allow users to define different details for each data source which means that one SubQuery project can still be used across multiple networks.

Users can add a `filter` on `dataSources` to decide which data source to run on each network.

Below is an example that shows different data sources for both the Polkadot and Kusama networks.

<CodeGroup> <CodeGroupItem title="v0.0.1"> ```yaml --- network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' #Create a template to avoid redundancy definitions: mapping: &mymapping handlers: - handler: handleBlock kind: substrate/BlockHandler dataSources: - name: polkadotRuntime kind: substrate/Runtime filter: #Optional specName: polkadot startBlock: 1000 mapping: *mymapping #use template here - name: kusamaRuntime kind: substrate/Runtime filter: specName: kusama startBlock: 12000 mapping: *mymapping # can reuse or change ``` </CodeGroupItem>

</CodeGroup>
