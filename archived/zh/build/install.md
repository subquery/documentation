# 关于 SubQuery 的安装

创建 SubQuery 项目需要多个组件。 [@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) 工具用于创建 SubQuery 项目。 [@subql/node](https://github.com/subquery/subql/tree/docs-new-section/packages/node) 组件是运行索引器所必需的。 [@subql/query](https://github.com/subquery/subql/tree/docs-new-section/packages/query) 库是生成查询所必需的。

## 安装@subql/cli 节点

[@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) 工具有助于快速创建一个项目架构，您不必从头开始的手动创建项目。

使用 Yarn 或 NPM 在您的电脑上全局安装 SubQuery CLI ：

::: code-tabs @tab npm `bash npm install -g @subql/cli `
@tab:active yarn `shell yarn global add @subql/cli ` :::

You can then run help to see available commands and usage provide by CLI:

```shell
subql help
```

## 安装@subql/cli 节点

SubQuery 节点能够从 SubQuery 项目提取基于底层的区块链数据并将其保存到 Postgres 数据库。

使用 Yarn 或 NPM 在您的终端上全局安装 SubQuery 节点：

::: code-tabs @tab npm `bash npm install -g @subql/node `
@tab:active yarn `shell yarn global add @subql/node ` :::

Once installed, you can can start a node with:

```shell
subql-node <command>
```

> 注意：如果使用 Docker 或托管您的项目，您可以跳过这一步。 这是因为 SubQuery 节点已经提供在 Docker 容器和主机基础设施中。

## 安装 @subql/query

SubQuery 查询库提供了一个服务，允许您通过浏览器在“playground”环境中查询您的项目。

使用 Yarn 或 NPM 在您的终端上全局安装 subql/query：

::: code-tabs @tab npm `bash npm install -g @subql/query `
@tab:active yarn `shell yarn global add @subql/query ` :::

> 注意：如果使用 Docker 或托管您的项目，您可以跳过这一步。 这是因为 SubQuery 节点已经在 Docker 容器和主机基础设施中提供。
