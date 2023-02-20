# 本地运行 SubQuery

本指南通过如何在您的基础设施上运行本地的 SubQuery 节点，其中包括索引器和查询服务。 不用担心在运行自己的SubQuery基础架构中所出现的问题。 SubQuery provides a [Managed Service](https://explorer.subquery.network) to the community for free. [Follow our publishing guide](../run_publish/publish.md) to see how you can upload your project to [SubQuery Managed Service](https://managedservice.subquery.network).

**There are two ways to run a project locally, [using Docker](#using-docker) or running the individual components using NodeJS ([indexer node service](#running-an-indexer-subqlnode) and [query service](#running-the-query-service)).**

## 使用 Docker

An alternative solution is to run a **Docker Container**, defined by the `docker-compose.yml` file. 对于刚刚初始化的新项目，您无需在此处进行任何更改。

在项目目录下运行以下命令：

```shell
docker-compose pull && docker-compose up
```

::: tip Note It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you'll see a running SubQuery node. :::

## 运行Indexer (subql/node)

需求：

- [Postgres](https://www.postgresql.org/) 数据库（版本 12 或更高版本）。 当 [SubQuery 节点](run.md#start-a-local-subquery-node) 索引区块链时，提取的数据存储在外部数据库实例中。

SubQuery 节点需要一个加载的过程，它能够从 SubQuery 项目中提取基于子区块链的数据，并将其保存到 Postgres 数据库。

If you are running your project locally using `subql-node` or `subql-node-<network>`, make sure you enable the pg_extension `btree_gist`

You can run the following SQL query:

```shell
CREATE EXTENSION IF NOT EXISTS btree_gist;
```

### 安装

::: code-tabs @tab Substrate/Polkadot

```shell
# NPM
npm install -g @subql/node
```

@tab Terra

```shell
# NPM
npm install -g @subql/node-terra
```

@tab Avalanche

```shell
# NPM
npm install -g @subql/node-avalanche
```

@tab Cosmos

```shell
# NPM
npm install -g @subql/node-cosmos
```

@tab Algorand

```shell
# NPM
npm install -g @subql/node-algorand
```

:::

：：： 危险 请注意，我们**不**鼓励使用 `yarn global`，因为它糟糕的依赖管理可能会导致错误。 :::

安装完毕后，您可以使用以下命令来启动节点：

::: code-tabs @tab Substrate/Polkadot

```shell
subql-node <command>
```

@tab Terra

```shell
subql-node-terra <command>
```

@tab Avalanche

```shell
subql-node-avalanche <command>
```

@tab Cosmos

```shell
subql-node-cosmos <command>
```

@tab Algorand

```shell
subql-node-algorand <command>
```

:::

### Key Commands

The following commands will assist you to complete the configuration of a SubQuery node and begin indexing. 要了解更多信息，您可以运行 `--help`。

#### 指向本地项目路径

::: code-tabs @tab Substrate/Polkadot

```shell
subql-node -f your-project-path
```

@tab Terra

```shell
subql-node-terra -f your-project-path
```

@tab Avalanche

```shell
subql-node-avalanche -f your-project-path
```

@tab Cosmos

```shell
subql-node-cosmos -f your-project-path
```

@tab Algorand

```shell
subql-node-algorand -f your-project-path
```

:::

#### Connect to database

```shell
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
subql-node -f your-project-path
```

根据您的 Postgres 数据库的配置（例如不同的数据库密码），请同时确保索引器 (`subql/node`) 和查询服务 (`subql/query` ) 可以建立到它的连接。

If your database is using SSL, you can use the following command to add the server certificate to it:

```shell
subql-node -f your-project-path --pg-ca /path/to/ca.pem
```

If your database is using SSL and requires a client certificate, you can use the following command to connect to it:

```shell
subql-node -f your-project-path --pg-ca /path/to/ca.pem --pg-cert /path/to/client-cert.pem --pg-key /path/to/client-key.key
```

````shell

#### Specify a configuration file

::: code-tabs
@tab Substrate/Polkadot

```shell
subql-node -c your-project-config.yml
````

@tab Terra

```shell
subql-node-terra -c your-project-config.yml
```

@tab Avalanche

```shell
subql-node-avalanche -c your-project-config.yml
```

@tab Cosmos

```shell
subql-node-cosmos -c your-project-config.yml
```

@tab Algorand

```shell
subql-node-algorand -c your-project-config.yml
```

:::

This will point the query node to a manifest file which can be in YAML or JSON format.

#### Change the block fetching batch size

```shell
subql-node -f your-project-path --batch-size 200

Result:
[IndexerManager] fetch block [203, 402]
[IndexerManager] fetch block [403, 602]
```

索引器首次对链进行索引时，获取单个区块将显著降低性能。 增加批量大小以调整获取的区块数将减少整体处理时间。 当前的默认批量大小为 100。

#### 在本地模式下运行

::: code-tabs @tab Substrate/Polkadot

```shell
subql-node -f your-project-path --local
```

@tab Terra

```shell
subql-node-terra -f your-project-path --local
```

@tab Avalanche

```shell
subql-node-avalanche -f your-project-path --local
```

@tab Cosmos

```shell
subql-node-cosmos -f your-project-path --local
```

@tab Algorand

```shell
subql-node-algorand -f your-project-path --local
```

:::

For debugging purposes, users can run the node in local mode. 切换到本地模型将在默认架构 `public` 中创建 Postgres 表。

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

确保项目名称与[初始化项目](../quickstart/quickstart.md#_2-initialise-the-subquery-starter-project)时的项目名称相同。 另外，请检查环境变量是否正确。

成功运行subql查询服务后，打开浏览器并转到`http://localhost:3000`. 您应该看到在 Explorer 中显示的 GraphQL 播放地和准备查询的模式。 您应该看到在 Explorer 中显示的 GraphQL 播放器和准备查询的模式。

## Running High Performance SubQuery Infrastructure

SubQuery is designed to provide reliable and performant indexing to production applications, we use the services that we build to run SubQuery in our own managed service which serves millions of requests each day to hundreds of customers. As such, we've added some commands that you will find useful to get the most performance out of your project and mitigate against any DDOS attacks.

### DDOS Mitigation

SubQuery runs well behind a API gateway or a DDOS mitigation service. For any public project that is run in a production configuration, setting up a gateway, web application firewall, or some other protected endpoint is recommended.

### Request Caching

Although @subql/node does not natively provide any default reqeust level caching, one of the easiest way to increase performance when the number of users hitting your SubQuery project increases is by adding a cache in front of the GraphQL endpoint with a basic TTL of a few seconds (depending on how stale you want to allow your data). Most cloud providers offer simple to setup and manage caching solutions (e.g. Redis) that will work well with the GraphQL api endpoints that we provide. If you're worried about stale data affecting your user's experience, by leveraging [GraphQl subscriptions](./subscription.md) you can ensure that the most recent data is never affected by the cache while older, slower data is mostly from the cache. Additionally, consider different TTLs for each different entity.

### Database Configuration

In our own managed service, we've been able to run a number of SubQuery projects in the same Postgres database - you do not need to run each project in a different database for suficient performance. When the I/O on the database becomes a problem, the simpliest solution is to first consider if any more [indexes can be added to your project](../build/optimisation.md#indexing-performance-advice).

The next step our team will usually carry out is split the database into a read-write replica architecture. One database instance is the writer (that the @subql/node service connects to), while the other is the reader (that the @subql/query service connects to). We will do this before splitting up projects into different databases as it generally makes a huge improvement to database I/O.

### Run Multiple Query Services

SubQuery is designed that you can run mulitple query services behind a load balancer for redundancy and performance. Just note that unless you have multiple read replicas of the database, you're performance will quickly become db constrained.

### Restrict Query Complexity

GraphQL is extremely powerful, but one of the downsides is that it allows users to make somewhat unrestricted calls that result in complex SQL that can really affect performance for other users. We provide two controls for this:

- `--query-complexity` is a flag that controls the level of query complexity that this service will accept expressed as a positive integer, [read more here](./references.md#query-complexity).
- `--query-timeout` is a flag that will restrict the time each query will be allowed to run for, [read more here](./references.md#query-timeout).
- `--max-connection` is a flag that will restrict the number of simulteneous connections to the query endpoint, [read more here](./references.md#max-connection).
- `--query-limit` is a flag that allows you to limit the number of results returned by any query and enforce pagination, [read more here](./references.md#query-limit).
- `--unsafe` is a flag that enables some advanced features like [GraphQL aggregations](./aggregate.md), these may have performance impacts, [read more here](./references.md#unsafe-query-service)
