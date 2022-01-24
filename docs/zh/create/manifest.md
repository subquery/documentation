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

By default the CLI will generate SubQuery projects for spec verison v0.2.0. This behaviour can be overridden by running `subql init --specVersion 0.0.1 PROJECT_NAME`, although this is not recommended as the project will not be supported by the SubQuery hosted service in the future

`subql migrate` 可以在一个现有的项目中运行，将项目清单迁移到最新版本。

USAGE $ subql init [PROJECTNAME]

ARGUMENTS PROJECTNAME  Give the starter project name

| 选项                      | Description                                                                  |
| ----------------------- | ---------------------------------------------------------------------------- |
| -f, --force             |                                                                              |
| -l, --location=location | local folder to create the project in                                        |
| --install-dependencies  | Install dependencies as well                                                 |
| --npm                   | Force using NPM instead of yarn, only works with `install-dependencies` flag |
| --specVersion=0.0.1     | 0.2.0  [default: 0.2.0] | The spec version to be used by the project         |

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

### Schema 说明

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

Defines the data that will be filtered and extracted and the location of the mapping function handler for the data transformation to be applied.
| Field          | v0.0.1                                                    | v0.2.0                                                                           | Description                                                                                                                                                                           |
| -------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name**       | String                                                    | String                                                                           | Name of the data source                                                                                                                                                               |
| **kind**       | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | We supports data type from default substrate runtime such as block, event and extrinsic(call). <br /> From v0.2.0, we support data from custom runtime, such as smart contract. |
| **startBlock** | Integer                                                   | Integer                                                                          | This changes your indexing start block, set this higher to skip initial blocks with less data                                                                                         |
| **mapping**    | Mapping Spec                                              | Mapping Spec                                                                     |                                                                                                                                                                                       |
| **filter**     | [network-filters](./manifest/#network-filters)            | String                                                                           | Filter the data source to execute by the network endpoint spec name                                                                                                                   |

### Mapping Spec

| Field                  | v0.0.1                                                           | v0.2.0                                                                                        | Description                                                                                                                |
| ---------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **file**               | String                                                           | String                                                                                        | 映射条目路径                                                                                                                     |
| **handlers & filters** | [Default handlers and filters](./manifest/#mapping-hand-filters) | Default handlers and filters, <br />[Custom handlers and filters](#custom-data-sources) | 列出所有 [映射函数](./mapping.md) 及其相应的处理类型，并添加附加映射筛选器。 <br /><br /> 对于自定义运行时映射处理程序，请查看 [自定义数据源](#custom-data-sources) |

## 数据来源和映射

In this section, we will talk about the default substrate runtime and its mapping. Here is an example:

```yaml
dataSources:
  - kind: substrate/Runtime # Indicates that this is default runtime
    startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data
    mapping:
      file: dist/index.js # Entry path for this mapping
```

### 映射处理器和过滤器

The following table explains filters supported by different handlers.

**Your SubQuery project will be much more efficient when you only use event and call handlers with appropriate mapping filters**

| 处理程序                                       | 支持的过滤器：                      |
| ------------------------------------------ | ---------------------------- |
| [BlockHandler](./mapping.md#block-handler) | `specVersion`                |
| [EventHandler](./mapping.md#event-handler) | `module`,`method`            |
| [CallHandler](./mapping.md#call-handler)   | `module`,`method` ,`success` |

Default runtime mapping filters are an extremely useful feature to decide what block, event, or extrinsic will trigger a mapping handler.

Only incoming data that satisfy the filter conditions will be processed by the mapping functions. Mapping filters are optional but are highly recommended as they significantly reduce the amount of data processed by your SubQuery project and will improve indexing performance.

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

When connecting to a different Polkadot parachain or even a custom substrate chain, you'll need to edit the [Network Spec](#network-spec) section of this manifest.

The `genesisHash` must always be the hash of the first block of the custom network. You can retireve this easily by going to [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) and looking for the hash on **block 0** (see the image below).

![Genesis Hash](/assets/img/genesis-hash.jpg)

Additionally you will need to update the `endpoint`. This defines the wss endpoint of the blockchain to be indexed - **This must be a full archive node**. 您可以免费从 [Onfinality](https://app.onfinality.io) 检索所有传送端点的终点

### Chain 类型

You can index data from custom chains by also including chain types in the manifest.

We support the additional types used by substrate runtime modules, `typesAlias`, `typesBundle`, `typesChain`, and `typesSpec` are also supported.

In the v0.2.0 example below, the `network.chaintypes` are pointing to a file that has all the custom types included, This is a standard chainspec file that declares the specific types supported by this blockchain in either `.json`, `.yaml` or `.js` format.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # The relative filepath to where custom types are stored ... ``` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> ``` yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter:  #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true ``` </CodeGroupItem> </CodeGroup>

To use typescript for your chain types file include it in the `src` folder (e.g. `./src/types.ts`), run `yarn build` and then point to the generated js file located in the `dist` folder.

```yml
network:
  chainpypes:
    file: ./dist/types.js # 将在 yarn 运行后生成
...
```

Things to note about using the chain types file with extension `.ts` or `.js`:

- 您的版本必须是 v0.2.0 或以上。
- 获取方块时， [polkadot api](https://polkadot.js.org/docs/api/start/types.extend/) 只会包含默认导出。

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
