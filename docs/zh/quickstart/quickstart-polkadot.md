# Polkadot 快速启动

在这个快速入门指南中，我们将从一个简单的启动项目开始，然后通过索引一些实际数据来完成。 这是开发您自己的 SubQuery 项目的良好基础。

在本指南的最后，您将拥有一个在 SubQuery 节点上运行的可工作 的 SubQuery 项目，该节点具有一个可以从中查询数据的 GraphQL 端点。

如果您还没有准备好进一步学习，我们建议您熟悉 SubQuery 中所使用的 [terminology](../#terminology)。

**这个快速入门指南的目的是调整标准的启动项目，开始对 Polkadot 的所有转移进行索引，它应该只需要 10-15 分钟**

## 准备

### 本地开发环境

- [Node](https://nodejs.org/en/): 一个现代（如 LTS 版本）的 Node 安装。
- [Docker](https://docker.com/): 本教程将使用需要 Docker 的程序。

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

在你想创建 SubQuery 项目的目录中，只需运行以下命令就可以开始了。

```shell
subql init
```

在初始化 SubQuery project 时，您会被问到一些问题：

- 项目名称：您的 SubQuery 项目的项目名称
- 网络：将开发一个 SubQuery 项目以索引的 blockchain 网络. 使用箭头键从可用选项中选择。 对于本指南，我们将使用 _"Substrate"_
- 网络：将开发一个 SubQuery 项目以索引的 blockchain 网络. 使用箭头键从可用选项中选择。 对于本指南，我们将使用 _"Substrate"_
- 模板：选择一个子查询项目模板，它将为开始开发提供起始点. 我们建议选择 _"subql-starter"_ 项目。
- RPC 端点（需要）。提供一个运行中的 RPC 端点的 HTTPS URL，该端点将被默认用于该项目。 您可以快速访问不同的 Polkadot 网络的公共端点，甚至可以使用 [OnFinality](https://app.onfinality.io) 或仅使用默认的 Polkadot 端点创建您自己的专用节点。 此 RPC 节点必须是归档节点 (具有完整链状态)。 在本指南中，我们将使用默认值*"https://polkadot.api.onfinality.io"*。
- Git 存储库（可选）：提供指向此 SubQuery 项目的，并将在其中托管的存储库的 Git URL（当托管在 SubQuery Explorer 中时）
- 作者：在此输入此 SubQuery 项目的所有者(例如您的名字!)或接受所提供的默认值。
- 描述：提供一个关于您项目的简短段落，描述项目包含哪些数据，用户可以做什么或接受提供的默认值。
- 版本 (必填)：输入一个自定义版本号或使用默认版本(`1.0.0`)
- 许可证(必填)：提供此项目的软件许可或接受默认设置(`Apache-`)

在初始化过程完成后，您应该看到目录内创建了一个项目名称的文件夹。 此目录的内容应该与 [Directory Structure](../create/introduction.md#directory-structure) 中列出的内容完全相同。

最后，在项目目录下，运行以下命令来安装新项目的依赖关系。

::: code-tabs @tab:active yarn `shell cd PROJECT_NAME yarn install `
@tab npm `shell cd PROJECT_NAME npm install ` :::

## 正在对您的项目进行更改

在您刚刚初始化的启动包， 我们为您的新项目提供了标准配置。 您将主要处理下列文件：

1. 在 `schema.graphql`中的 GraphQL Schema
2. `project.yaml` 中的项目清单
3. `src/mappings/` 目录中的映射函数

本快速入门指南的目的是调整标准的启动项目，以开始对 Polkadot 的所有转移进行索引。

### 更新你的 GraphQL Schema 文件

`schema.graphql` 文件定义了各种 GraphQL 模式。 遵循 GraphQL 查询语言的工作方式，模式文件基本上决定了您从 SubQuery 获取数据的格式。 这是一个很好的开始，因为它允许你在前面定义你的最终目标。

我们将更新 `schema.graphql` 文件如下所示：:

```graphql
type Transfer @entity {
  id: ID! # id field is always required and must look like this
  amount: BigInt # Amount that is transferred
  blockNumber: BigInt # The block height of the transfer
  from: Account! # The account that transfers are made from
  to: Account! # The account that transfers are made to
}
```

**重要提示：当您对模式文件做任何更改时， 请确保使用命令 yarn codegen 来重新生成你的类型目录。**

::: code-tabs @tab:active yarn `shell yarn codegen `
@tab npm `shell npm run-script codegen ` :::

你会在 `/src/types/model` 目录中找到生成的模型。 欲了解更多关于 `schema.graphql` 文件的信息，请参阅 [Build/GraphQL Schema](../build/graphql.md)

### 更新 Project Manifest 文件

Projet Manifest（`project.yaml`）文件可以被看作是你项目的入口，它定义了 SubQuery 如何索引和转换链数据的大部分细节。

清单文件已经正确设置，但我们需要更改处理程序。 请记住，我们正计划对所有 Polkadot 传输进行索引，因此，我们需要更新`datasources`部分，使之成为以下内容。

```yaml
dataSources:
  - kind: substrate/Runtime
    startBlock: 1
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleEvent
          kind: substrate/EventHandler
          filter:
            module: balances
            method: Transfer
```

这意味着我们将在每次出现`handleEvent`事件时运行一个`balances.Transfer`映射函数。

关于 Project Manifest（`project.yaml`）文件的更多信息，请查看我们在[Build/Manifest File](../build/manifest/polkadot.md)下的文档。

### 添加 Mapping Function

Mapping functions 定义了如何将链式数据转化为我们之前在`schema.graphql`文件中定义的优化的 GraphQL 实体。

导航到`src/mappings`目录下的默认映射函数。 你会看到三个导出的函数, `handleBlock`, `handleEvent`, 和 `handleCall`。 你可以同时删除`handleBlock`和`handleCall`函数，我们只处理`handleEvent`函数。

`handleEvent`函数接收事件数据，只要事件符合我们之前在`project.yaml`中指定的过滤器。 我们将更新它以处理所有`balances.Transfer`事件，并将它们保存到我们先前创建的 GraphQL 实体中。

你可以将`handleEvent`函数更新为以下内容（注意额外的导入）。

```ts
import { SubstrateEvent } from "@subql/types";
import { Transfer } from "../types";
import { Balance } from "@polkadot/types/interfaces";

export async function handleTransfer(event: SubstrateEvent): Promise<void> {
  // Get data from the event
  // The balances.transfer event has the following payload \[from, to, value\]
  // logger.info(JSON.stringify(event));
  const from = event.event.data[0];
  const to = event.event.data[1];
  const amount = event.event.data[2];

  // Create the new transfer entity
  const transfer = new Transfer(
    `${event.block.block.header.number.toNumber()}-${event.idx}`
  );
  transfer.blockNumber = event.block.block.header.number.toBigInt();
  transfer.from = from.toString();
  transfer.to = to.toString();
  transfer.amount = (amount as Balance).toBigInt();
  await transfer.save();
}
```

这正在做的是接收一个 SubstrateEvent，其中包括有效载荷的传输数据。 我们提取这些数据，然后实例化一个新的`Transfer`实体，我们之前在`schema.graphql`文件中定义了这个实体。 我们添加额外的信息，然后使用`.save()`函数来保存新的实体（SubQuery 将自动将其保存到数据库）。

关于映射函数的更多信息，请查看我们在[Build/Mappings](../build/mapping/polkadot.md)下的文档。

### 生成项目

为了运行您的新的 SubQuery 项目，我们首先需要建立我们的工作。 从项目的根目录运行构建命令。

::: code-tabs @tab:active yarn `shell yarn build ` @tab npm `shell npm run-script build ` :::

**重要的是：每当你对你的映射函数进行修改时，你就需要重建你的项目**。

## 运行和查询你的项目</6

### 用 Docker 运行你的项目</7

当你创建一个新的 SubQuery 项目时，你应该总是在你的计算机上运行它，首先测试它。 最简单的方法是使用 Docker。

控制 SubQuery 节点运行方式的所有配置都在这个`docker-compose.yml`文件中定义。 对于一个刚刚启动的新项目，你不需要改变这里的任何东西，但你可以在我们的[运行项目部分](../run_publish/run.md)阅读更多关于文件和设置的信息。

在项目目录下运行以下命令：

::: code-tabs @tab:active yarn `shell yarn start:docker ` @tab npm `shell npm run-script start:docker ` :::

下载所需软件包可能需要一些时间([`@subql/节点`](https://www.npmjs.com/package/@subql/node), [`@subql/quiry`](https://www.npmjs.com/package/@subql/query), and Postgress) 首次，但很快你会看到一个运行中的 SubQuery 节点。

### 查询您的项目

打开浏览器并前往 [http://localhost:3000](http://localhost:3000)。

您应该会看到 GraphQL playground 显示在资源管理器中，其模式是准备查询。 在 Playground 的右上角，您会找到一个*Docs*按钮，该按钮将打开文档绘图。 该文档是自动生成的，可帮助您查找实体和方法。

对于一个新的 SubQuery 启动器项目 尝试以下查询以了解它如何工作或了解更多关于 [GraphQL 查询语言](../run_publish/graphql.md) 的信息。

```graphql
{
  query {
    transfers(first: 10, orderBy: AMOUNT_DESC) {
      nodes {
        id
        amount
        blockNumber
        from
        to
      }
    }
  }
}
```

### 发布您的 SubQuery 项目

当您可以部署新项目时，SubQuery 提供免费管理服务。 您可以将其部署到 [SubQuery 项目](https://project.subquery.network) 并使用我们的 [Explorer](https://explorer.subquery.network) 进行查询。

阅读 [的指南向 SubQuery 项目发布您的新项目](../run_publish/publish.md)

## 后续步骤

恭喜，您现在有一个本地运行的 SubQuery 项目，该项目接受 GraphQL API 对示例数据的请求。

现在你已经深入了解了如何建立一个基本的 SubQuery 项目，问题是要从哪里开始？ 如果你感到有信心，你可以跳到更多关于三个关键文件的学习。 这些文档的 [构建部分下的清单文件，GraphQL schema 和映射文件](../build/introduction.md)。

不然的话，继续我们的 [学院部分](../academy/academy.md) ，因为那里有更多的深度讲习班、教程和示例。 我们将在这里查看更高级的修改，我们将通过运行随时可用和开源项目来深入细致地运行 SubQuery 项目。

最后，如果你正在寻找更多的方法来运行和发布你的项目，我们的 [Run & Publish section](../run_publish/run.md)提供了关于运行你的 SubQuery 项目和其他高级 GraphQL 聚合和订阅功能的所有方法的详细信息。
