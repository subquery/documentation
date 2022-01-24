# 快速入门指南

在本快速入门指南中，我们将创建一个简单的入门项目，您可以将其用作开发您自己的 SubQuery 项目的框架。

在本指南的最后，您将拥有一个在 SubQuery 节点上运行的可工作 的 SubQuery 项目，该节点具有一个可以从中查询数据的 GraphQL 端点。

如果您还没有准备好，我们建议您熟悉SubQuery中所使用的 [术语](../#terminology)。

## 准备工作

### 本地开发环境

- 编译项目和定义类型需要用到[Typescript](https://www.typescriptlang.org/) 。
- SubQuery CLI 和生成的项目都有依赖关系，并且需要一个现代版本 [Node](https://nodejs.org/en/)。
- SubQuery节点需要 Docker

### 安装 SubQuery CLI

使用 NPM 在终端上全局安装 SubQuery CLI：

```shell
# NPM
npm install -g @subql/cli
```

请注意我们不鼓励使用 `yarn global` ，因为它的依赖性管理很差，这可能会导致错误。

然后，您可以运行帮助以查看 CLI 提供的可用命令和用法。

```shell
subql help
```

## 初始化 Starter SubQuery 项目

在您要创建 SubQuery 项目的目录中，只需将`PROJECT_NAME` 替换为您自己的项目名称并运行命令：

```shell
subql init PROJECT_NAME
```

在初始化 SubQuery project 时，您会被问到一些问题：

- Network: A blockchain network that this SubQuery project will be developed to index
- Template: Select a SubQuery project template that will provide a starting point to begin development
- Git repository (Optional): Provide a Git URL to a repo that this SubQuery project will be hosted in (when hosted in SubQuery Explorer)
- RPC endpoint (Required): Provide a websocket (wss) URL to a running RPC endpoint that will be used by default for this project. You can quickly access public endpoints for different Polkadot networks or even create your own private dedicated node using [OnFinality](https://app.onfinality.io) or just use the default Polkadot endpoint. This RPC node must be an archive node (have the full chain state).
- Authors (Required): Enter the owner of this SubQuery project here
- Description (Optional): You can provide a short paragraph about your project that describe what data it contains and what users can do with it
- Version (Required): Enter a custom version number or use the default (`1.0.0`)
- License (Required): Provide the software license for this project or accept the default (`Apache-2.0`)

在初始化过程完成后，您应该看到目录内创建了一个项目名称的文件夹。 此目录的内容应该与 [Directory Structure](../create/introduction.md#directory-structure) 中列出的内容完全相同。

最后，在项目目录下，运行以下命令来安装新项目的依赖关系。

<CodeGroup> cd PROJECT_NAME # Yarn yarn install # NPM npm install 您将主要处理以下文件：

- 在 `project.yaml`
- `schema.graphql`中的 GraphQL 架构
- `src/mappings/` 目录中的映射函数

关于如何编写您自己的子查询的更多信息，请查阅 [Create a Project](../create/introduction.md) 下的我们的文档

### GraphQL 模型生成

为了 [索引](../run/run.md) 您的 SubQuery 项目，您必须首先生成您在 GraphQL Schema 文件中定义的 GraphQL 模型(`Schema)。 在项目目录的根目录中运行此命令。

<CodeGroup> cd PROJECT_NAME # Yarn yarn install # NPM npm install 您将主要处理以下文件：

- 在 `project.yaml`</p>

## 构建项目

将您的新项目发布到 SubQuery Projects 。

从项目的根目录运行构建命令。

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

## 运行和查询您的启动项目

尽管您可以快速发布您的新项目到 [SubQuery 项目](https://project.subquery.network) 并通过我们的 [Explorer](https://explorer.subquery.network)进行查询， 本地运行 SubQuery 节点的最简单方法是 Docker 容器， 如果你没有停靠栏，你可以从 [停靠栏安装它。 om](https://docs.docker.com/get-docker/)

__ 跳过这个项目并将您的新项目发布到 SubQuery 项目_</a></p> 



### 运行您的 SubQuery 项目

所有控制在此 `docker-compose 如何定义SubQuery 节点的配置. ml` 文件。 对于刚刚初始化的新项目，您无需在此处更改任何内容，但您可以在我们的 [Run a Project section](../run/run.md)部分阅读有关文件和设置的更多信息。

在项目目录下运行以下命令：



```shell
docker-compose pull && docker-compose up
```


下载所需软件包可能需要一些时间([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/quiry`](https://www.npmjs.com/package/@subql/query), and Postgress) ，但很快你会看到一个运行中的 SubQuery 节点。



### 查询您的项目

打开浏览器并前往 [http://localhost:3000](http://localhost:3000)。

您应该会看到 GraphQL playground 显示在资源管理器中，其模式是准备查询。 在 Playground 的右上角，您会找到一个_Docs_按钮，该按钮将打开文档绘图。 该文档是自动生成的，可帮助您查找实体和方法。

对于一个新的 SubQuery 入门项目，您可以尝试以下查询以了解其工作原理，或者 [了解更多关于 GraphQL 查询语言](../query/graphql.md)的信息。



```graphql
{
  query {
    starterEntities(first: 10) {
      nodes {
        field1
        field2
        field3
      }
    }
  }
}
```




## 下一步

恭喜，您现在有一个本地运行的 SubQuery 项目，该项目接受 GraphQL API 对示例数据的请求。 在下一个指南中， 我们会向您展示如何发布您的新项目到

[将您的新项目发布到 SubQuery Projects 。](../publish/publish.md)
