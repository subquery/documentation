# Cosmos Quick Start

In this Quick start guide, we're going to start with a simple Cosmos starter project in the Juno Network and then finish by indexing some actual real data. 这是开发您自己的 SubQuery 项目的良好基础。

**如果您正在寻找Terra指南，您可以阅读 [Terra特定的快速启动指南](./quickstart-polkadot)。**

在本指南的最后，您将拥有一个在 SubQuery 节点上运行的可工作 的 SubQuery 项目，该节点具有一个可以从中查询数据的 GraphQL 端点。

如果您还没有准备好进一步学习，我们建议您熟悉SubQuery中所使用的 [terminology](../#terminology)。

**The goal of this quick start guide is to adapt the standard starter project to begin indexing all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2) (which also contributed to SubQuery) from Cosmos, it should only take 10-15 minutes**

You can see the final code of this project here at https://github.com/jamesbayly/juno-terra-developer-fund-votes

## 准备

### 本地开发环境

- [Node](https://nodejs.org/en/): 一个现代（如LTS版本）的Node安装。
- [Docker](https://docker.com/): 本教程将使用需要Docker的程序。

### 安装 SubQuery CLI

使用 NPM 在终端上全局安装 SubQuery CLI：

```shell
# NPM
npm install -g @subql/cli
```

请注意，我们**不**鼓励使用`yarn global`来安装`@subql/cli`，因为它的依赖性管理不好，可能会导致下一步的错误。

然后，您可以运行帮助以查看 CLI 提供的可用命令和用法。

```shell
subql help
```

## 初始化 Starter SubQuery 项目

Cosmos is not yet supported in SubQuery's CLI (`subql`), to start with Juno clone or fork the [starter project](https://github.com/subquery/juno-subql-starter).

在初始化过程完成后，您应该看到目录内创建了一个项目名称的文件夹。 此目录的内容应该与 [Directory Structure](../create/introduction.md#directory-structure) 中列出的内容完全相同。

最后，在项目目录下，运行以下命令来安装新项目的依赖关系。

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## 正在对您的项目进行更改

在您刚刚初始化的启动包， 我们为您的新项目提供了标准配置。 您将主要处理下列文件：

1. 在 `schema.graphql`中的 GraphQL Schema
2. `project.yaml` 中的项目清单
3. `src/mappings/` 目录中的映射函数

本快速入门指南的目的是调整标准的启动项目，以开始对Polkadot的所有转移进行索引。

### 更新你的GraphQL Schema文件

`schema.graphql` 文件定义了各种GraphQL 模式。 遵循GraphQL查询语言的工作方式，模式文件基本上决定了您从 SubQuery 获取数据的格式。 这是一个很好的开始，因为它允许你在前面定义你的最终目标。

We're going to update the `schema.graphql` file to read as follows so we can index all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2).

```graphql
type Vote @entity {
  id: ID! # id field is always required and must look like this
  blockHeight: BigInt!
  voter: String! # The address that voted
  proposalID: BigInt! # The proposal ID
  vote: Boolean! # If they voted to support or reject the proposal
}
```

**重要提示：当您对模式文件做任何更改时， 请确保使用命令yarn codegen来重新生成你的类型目录。 现在就做。**

<CodeGroup> cd PROJECT_NAME # Yarn yarn install # NPM npm install 您将主要处理以下文件：

- 在 `project.yaml`. 欲了解更多关于 
`schema.graphql` 文件的信息，请参阅 [Build/GraphQL Schema](../build/graphql.md)</p>

### 更新Project Manifest 文件

Projet Manifest（`project.yaml`）文件可以被看作是你项目的入口，它定义了SubQuery如何索引和转换链数据的大部分细节。

我们不会对清单文件做许多更改，因为它已经正确设置了，但我们需要更改处理程序。 Remember we are planning to index all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2). This means that we we will look at messages that use the `vote` contract call, we need to update the `datasources` section to read the following.

```yml
dataSources:
  - kind: cosmos/Runtime
    startBlock: 3082705 # The block when this contract was created
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleTerraDeveloperFund
          kind: cosmos/MessageHandler
          filter:
            type: "/cosmwasm.wasm.v1.MsgExecuteContract"
            # Filter to only messages with the vote function call
            contractCall: "vote" # The name of the contract function that was called
            values: # This is the specific smart contract that we are subscribing to
              contract: "juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2"
```

This means we'll run a `handleTerraDeveloperFund` mapping function each and every time there is a `vote` message from the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2) smart contract.

关于Project Manifest（`project.yaml`）文件的更多信息，请查看我们在[Build/Manifest File](../build/manifest.md)下的文档。

### 添加Mapping Function

Mapping functions定义了如何将链式数据转化为我们之前在`schema.graphql`文件中定义的优化的GraphQL实体。

导航到`src/mappings`目录下的默认映射函数。 You'll see four exported functions, `handleBlock`, `handleEvent`, `handleMessage`, and `handleTransaction`. Since we are dealing only with messages, you can delete everything other than the `handleMessage` function.

The `handleMessage` function recieved event data whenever event matches the filters that we specify previously in our `project.yaml`. We are going to update it to process all `vote` messages and save them to the GraphQL entity that we created earlier.

You can update the `handleMessage` function to the following (note the additional imports and renaming the function):

```ts
import { Vote } from "../types";
import { CosmosMessage } from "@subql/types-cosmos";

export async function handleTerraDeveloperFund(
  message: CosmosMessage
): Promise<void> {
  // logger.info(JSON.stringify(message));
  // Example vote https://www.mintscan.io/juno/txs/EAA2CC113B3EC79AE5C280C04BE851B82414B108273F0D6464A379D7917600A4

  const voteRecord = new Vote(`${message.tx.hash}-${message.idx}`);
  voteRecord.blockHeight = BigInt(message.block.block.header.height);
  voteRecord.voter = message.msg.sender;
  voteRecord.proposalID = message.msg.msg.vote.proposal_id;
  voteRecord.vote = message.msg.msg.vote.vote === "yes";

  await voteRecord.save();
}
```

What this is doing is receiving a CosmosMessage which includes message data on the payload. We extract this data and then instantiate a new `Vote` entity that we defined earlier in the `schema.graphql` file. 我们添加额外的信息，然后使用`.save()`函数来保存新的实体（SubQuery将自动将其保存到数据库）。

关于映射函数的更多信息，请查看我们在[Build/Mappings](../build/mapping.md)下的文档。

### 生成项目

为了运行您的新的SubQuery项目，我们首先需要建立我们的工作。 从项目的根目录运行构建命令。

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**重要的是：每当你对你的映射函数进行修改时，你就需要重建你的项目**。

## 运行和查询你的项目</6

### 用Docker运行你的项目</7

当你创建一个新的SubQuery项目时，你应该总是在你的计算机上运行它，首先测试它。 最简单的方法是使用 Docker。

控制SubQuery节点运行方式的所有配置都在这个`docker-compose.yml`文件中定义。 对于一个刚刚启动的新项目，你不需要改变这里的任何东西，但你可以在我们的[运行项目部分](../run_publish/run.md)阅读更多关于文件和设置的信息。

在项目目录下运行以下命令：

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

下载所需软件包可能需要一些时间([`@subql/节点`](https://www.npmjs.com/package/@subql/node), [`@subql/quiry`](https://www.npmjs.com/package/@subql/query), and Postgress) 首次，但很快你会看到一个运行中的 SubQuery 节点。 请耐心等待。

### 查询您的项目

打开浏览器并前往 [http://localhost:3000](http://localhost:3000)。

您应该会看到 GraphQL playground 显示在资源管理器中，其模式是准备查询。 在 Playground 的右上角，您会找到一个_Docs_按钮，该按钮将打开文档绘图。 该文档是自动生成的，可帮助您查找实体和方法。

对于一个新的 SubQuery 入门项目，您可以尝试以下查询以了解其工作原理，或者 [了解更多关于 GraphQL 查询语言](../run_publish/graphql.md)的信息。

```graphql
query {
    votes(
    first: 5
    orderBy: BLOCK_HEIGHT_DESC
    filter: {proposalID: {equalTo: "4"}}
  ) {
    nodes {
      id
      blockHeight
      voter
      vote
    }
  }
}
```

You can see the final code of this project here at https://github.com/jamesbayly/juno-terra-developer-fund-votes

### 发布您的 SubQuery 项目

当您可以部署新项目时，SubQuery提供免费管理服务。 您可以将其部署到 [SubQuery 项目](https://project.subquery.network) 并使用我们的 [Explorer](https://explorer.subquery.network) 进行查询。

[阅读向SubQuery 项目发布您的新项目](../run_publish/publish.md)

## 后续步骤

恭喜，您现在有一个本地运行的 SubQuery 项目，该项目接受 GraphQL API 对示例数据的请求。

现在你已经深入了解了如何建立一个基本的SubQuery项目，问题是要从哪里开始？ 如果你感到有信心，你可以跳到更多关于三个关键文件的学习。 这些文档的 [构建部分下的清单文件，GraphQL schema 和映射文件](../build/introduction.md)。

不然的话，继续我们的 [学院部分](../academy/academy.md) ，因为那里有更多的深度讲习班、教程和示例。 我们将在这里查看更高级的修改，我们将通过运行随时可用和开源项目来深入细致地运行 SubQuery 项目。

最后，如果你正在寻找更多的方法来运行和发布你的项目，我们的 [Run & Publish section](../run_publish/run.md)提供了关于运行你的SubQuery项目和其他高级GraphQL聚合和订阅功能的所有方法的详细信息。
