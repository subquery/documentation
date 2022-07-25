# 本地运行 SubQuery

本指南通过如何在您的基础设施上运行本地的 SubQuery 节点，其中包括索引器和查询服务。 不用担心在运行自己的SubQuery基础架构中所出现的问题。 SubQuery 向社区免费提供 [管理的托管服务](https://explorer.subquery.network)。 [按照我们所发布的指南](../run_publish/publish.md) 查看您如何将项目部署到 [SubQuery 项目](https://project.subquery.network)。

## 使用 Docker

其中一种解决方案是运行<strong>Docker容器</strong>，它是由`Docker-component.yml`文件所定义的。 对于刚刚初始化的新项目，您无需在此处进行任何更改。

在项目目录下运行以下命令：

```shell
docker-compose pull && docker-compose up
```

第一次下载所需软件包可能需要一些时间([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/quiry`](https://www.npmjs.com/package/@subql/query), and Postgress) ，但很快你就会看到一个运行中的 SubQuery 节点。 :::

## 运行Indexer (subql/node)

需求：

- [Postgres](https://www.postgresql.org/) 数据库（版本 12 或更高版本）。 当 [SubQuery 节点](run.md#start-a-local-subquery-node) 索引区块链时，提取的数据存储在外部数据库实例中。

SubQuery 节点需要一个加载的过程，它能够从 SubQuery 项目中提取基于子区块链的数据，并将其保存到 Postgres 数据库。

### 安装

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

出于调试的目的，用户可以以本地方式运行该节点。 :::

安装完毕后，您可以使用以下命令来启动节点：


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

出于调试的目的，用户可以以本地方式运行该节点。 要了解更多信息，您可以运行 `--help`。

#### 指向本地项目路径

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

出于调试的目的，用户可以以本地方式运行该节点。 在某些情况下，我们看到索引性能增加最多10x。

完整的链词典预索引特定链中所有事件和外观的位置，并允许您的节点服务在索引时跳到相关位置，而不是检查每个方块。

您可以在您的 `项目中添加字典终点。 aml` 文件(见 [清单文件](../create/manifest.md))，或在运行时使用以下命令指定它：

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

[阅读更多关于SubQuery Dictionary如何工作的信息](../academy/tutorials_examples/dictionary.md).

#### 连接到数据库

```shell
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
subql-node -f your-project-path
```
 :::</p>

#### 连接到数据库

```shell
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
subql-node -f your-project-path
```

根据您的 Postgres 数据库的配置（例如不同的数据库密码），请同时确保索引器 (`subql/node`) 和查询服务 (`subql/query` ) 可以建立到它的连接。

#### 指定一个配置文件

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

出于调试的目的，用户可以以本地方式运行该节点。 查看下面的示例.

```yaml
subquery: ../../../../subql-example/extrinsics
subqueryName: extrinsics
batchSize:100
localMode:true
```

#### 更改区块获取批量大小

```shell
subql-node -f your-project-path --batch-size 200

Result:
[IndexerManager] fetch block [203, 402]
[IndexerManager] fetch block [403, 602]
```

索引器首次对链进行索引时，获取单个区块将显著降低性能。 增加批量大小以调整获取的区块数将减少整体处理时间。 当前的默认批量大小为 100。

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

出于调试的目的，用户可以以本地方式运行该节点。 切换到本地模型将在默认架构 `public` 中创建 Postgres 表。

如果不使用本地模式，将创建具有初始 `subquery_` 和相应项目表的新 Postgres 模式。

#### 检查您的节点健康状况

有两个端口可用来检查和监视所运行的 SubQuery 节点的健康状况。

- 健康检查端点，返回一个简单的 200 个响应。
- 元数据端点，包括您正在运行的 SubQuery 节点的附加分析。

将此附加到您的 SubQuery 节点的基本 URL。 例如：`http://localhost:3000/meta` 将会返回

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

`http://localhost:3000/health` 如果成功，将返回 HTTP 200。

如果索引器不正常，将返回 500 错误。 这通常可以在节点启动时看到。

```shell
{
    "status": 500,
    "error": "Indexer is not healthy"
}
```

如果使用了不正确的 URL，将返回 404 not found 错误。

```shell
{
"statusCode": 404,
"message": "Cannot GET /healthy",
"error": "Not Found"
}
```

#### 调试您的项目

使用 [节点检查器](https://nodejs.org/en/docs/guides/debugging-getting-started/) 运行以下命令。

```shell
node --inspect-brk <path to subql-node> -f <path to subQuery project>
```

例如：

```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Debugger listening on ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
```

然后打开Chrome开发工具，进入Source>Filesystem，将项目添加到工作区并开始调试。 查看更多信息[如何调试SubQuery项目](../academy/tutorials_examples/debug-projects.md).

## 运行Query服务(subql/query)

### 安装

```shell
# NPM
npm install -g @subql/query
```

：：： 危险 请注意，我们**不**鼓励使用 `yarn global`，因为它糟糕的依赖管理可能会导致错误。 :::

### 运行Query服务

```
export DB_HOST=localhost
subql-query --name <project_name> --playground
```

Make sure the project name is the same as the project name when you [initialize the project](../quickstart/quickstart.md#_2-initialise-the-subquery-starter-project). Also, check the environment variables are correct.

After running the subql-query service successfully, open your browser and head to `http://localhost:3000`. You should see a GraphQL playground showing in the Explorer and the schema that is ready to query.
