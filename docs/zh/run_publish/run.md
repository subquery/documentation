# 本地运行 SubQuery

本指南通过如何在您的基础设施上运行本地的 SubQuery 节点，其中包括索引器和查询服务。 不用担心在运行自己的SubQuery基础架构中所出现的问题。 SubQuery 向社区免费提供 [管理的托管服务](https://explorer.subquery.network)。 [Follow our publishing guide](../run_publish/publish.md) to see how you can upload your project to [SubQuery Projects](https://project.subquery.network).

## 使用 Docker

其中一种解决方案是运行<strong>Docker容器</strong>，它是由`Docker-component.yml`文件所定义的。 对于刚刚初始化的新项目，您将不需要在此更改任何内容。

在项目目录下运行以下命令：

```shell
docker-compose pull && docker-compose up
```

第一次下载所需软件包可能需要一些时间([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/quiry`](https://www.npmjs.com/package/@subql/query), and Postgress) ，但很快你就会看到一个运行中的 SubQuery 节点。

## 运行Indexer (subql/node)

需求：

- [Postgres](https://www.postgresql.org/) database (version 12 or higher). [Postgres](https://www.postgresql.org/) 数据库 (版本12或更高). 当[SubQuery node](#start-a-local-subquery-node)  对区块链进行索引时，提取的数据将会存储在外部数据库实例中。

A SubQuery node is an implementation that extracts Substrate/Polkadot-based blockchain data per the SubQuery project and saves it into a Postgres database.

### 安装

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

``` shell
# NPM
npm install -g @subql/node
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

``` shell
# NPM
npm install -g @subql/node-terra
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

``` shell
# NPM
npm install -g @subql/node-avalanche
````

</CodeGroupItem>
</CodeGroup>

Please note that we **DO NOT** encourage the use of `yarn global` due to its poor dependency management which may lead to an errors down the line.

安装完毕后，您可以使用以下命令来启动节点：


<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node <command>
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra <command>
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche <command> 
```

</CodeGroupItem>
</CodeGroup>

### Key Commands

The following commands will assist you to complete the configuration of a SubQuery node and begin indexing. 要了解更多信息，您可以运行 `--help`。

#### 指向本地项目路径

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node -f your-project-path
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra -f your-project-path
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -f your-project-path
```

</CodeGroupItem>
</CodeGroup>

#### Use a Dictionary

Using a full chain dictionary can dramatically speed up the processing of a SubQuery project during testing or during your first index. In some cases, we've seen indexing performance increases of up to 10x.

A full chain dictionary pre-indexes the location of all events and extrinsics within the specific chain and allows your node service to skip to relevant locations when indexing rather than inspecting each block.

You can add the dictionary endpoint in your `project.yaml` file (see [Manifest File](../create/manifest.md)), or specify it at run time using the following command:

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot/Polkadot'>

```shell
subql-node --network-dictionary=https://api.subquery.network/sq/subquery/dictionary-polkadot
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra --network-dictionary=https://api.subquery.network/sq/subquery/terra-columbus-5-dictionary
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche --network-dictionary=https://api.subquery.network/sq/subquery/avalanche-dictionary
```

</CodeGroupItem>
</CodeGroup>

[Read more about how a SubQuery Dictionary works](../academy/tutorials_examples/dictionary.md).

#### Connect to database

```shell
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
subql-node -f your-project-path
```

Depending on the configuration of your Postgres database (e.g. a different database password), please ensure also that both the indexer (`subql/node`) and the query service (`subql/query`) can establish a connection to it.

#### Specify a configuration file

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node -c your-project-config.yml
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra -c your-project-config.yml
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -c your-project-config.yml
```

</CodeGroupItem>
</CodeGroup>

This will point the query node to a configuration file which can be in YAML or JSON format. Check out the example below.

```yaml
subquery: ../../../../subql-example/extrinsics
subqueryName: extrinsics
batchSize:100
localMode:true
```

#### 更改获取批大小的块

```shell
subql-node -f your-project-path --batch-size 200

Result:
[IndexerManager] fetch block [203, 402]
[IndexerManager] fetch block [403, 602]
```

索引器首次对链进行索引时，获取单个块将显著降低性能。 增加批量处理的规模以调整获取的区块数量，这将会减少整个处理时间。 默认的批处理大小为100。

#### 在本地模式下运行

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node -f your-project-path --local
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra -f your-project-path --local
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -f your-project-path --local
```

</CodeGroupItem>
</CodeGroup>

For debugging purposes, users can run the node in local mode. 切换到本地模式后将在默认架构 `public` 中创建 Postgres 表。

如果未使用本地模式，则使用初始的Postgres 模式，并将创建初始的 `subquery_` 和与其相对应的项目表。

#### 检查节点运行状况。

有两个端口可用来检查和监视所运行的 SubQuery 节点的健康状况。

- 健康检查端点，返回一个简单的200响应
- 元数据端点，包括正在运行的 SubQuery 节点的附加分析

将其附加到您的 SubQuery 节点的基本URL。 例如：`http://localhost:3000/meta` 将会返回

```bash
{
    "currentProcessingHeight": 1000699,
    "currentProcessingTimestamp": 1631517883547,
    "targetHeight": 6807295,
    "bestHeight": 6807298,
    "indexerNodeVersion": "0.19.1",
    "lastProcessedHeight": 1000699,
    "lastProcessedTimestamp": 1631517883555,
    "uptime": 41.151789063,
    "polkadotSdkVersion": "5.4.1",
    "apiConnected": true,
    "injectedApiConnected": true,
    "usingDictionary": false,
    "chain": "Polkadot",
    "specName": "polkadot",
    "genesisHash": "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3",
    "blockTime": 6000
}
```

`http://localhost:3000/health` 如果成功将返回 HTTP 200。

如果索引器出现错误，将返回500错误。 这通常可以在节点启动时看到。

```shell
{
    "status": 500,
    "error": "Indexer is not healthy"
}
```

如果使用了错误的URL，将返回404 not found错误。

```shell
{
"statusCode": 404,
"message": "Cannot GET /healthy",
"error": "Not Found"
}
```

#### 调试您的项目

使用 [node inspector](https://nodejs.org/en/docs/guides/debugging-getting-started/) 来运行以下命令。

```shell
node --inspect-brk <path to subql-node> -f <path to subQuery project>
```

示例

```shell
node --expect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-Helloworld/
Debugger 监听ws:127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
关于帮助，请参阅：https://nodejs.org/en/docs/spector
Debugger 已附后。
```

然后打开Chrome开发工具，进入Source>Filesystem，将项目添加到工作区并开始调试。 For more information, check out [How to debug a SubQuery project](https://doc.subquery.network/academy/tutorials_examples/debug-projects/)

## 运行Query服务(subql/query)

### 安装

```shell
# NPM
npm install -g @subql/query
```

请注意我们不推荐使用 `yarn global` ，因为它的依赖管理性能不佳，可能导致在运行中出现错误。

### 运行Query服务

```
export DB_HOST=localhost
subql-query --name <project_name> --playground
```

Make sure the project name is the same as the project name when you [initialize the project](../quickstart/quickstart-polkadot.md#initialise-the-starter-subquery-project). 此外，请检查环境变量是否配置正确。

成功运行subql查询服务后，打开浏览器并转到`http://localhost:3000`. 您应该看到在 Explorer 中显示的 GraphQL 播放地和准备查询的模式。 您应该看到在 Explorer 中显示的 GraphQL 播放地和准备查询的模式。
