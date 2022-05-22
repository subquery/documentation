# Polkadot 快速启动

In this quick start guide, we're going to start with a simple Substrate/Polkadot starter project and then finish by indexing some actual real data. 这是开发您自己的 SubQuery 项目的良好基础。

在本指南的最后，您将拥有一个在 SubQuery 节点上运行的可工作 的 SubQuery 项目，该节点具有一个可以从中查询数据的 GraphQL 端点。

如果您还没有准备好进一步学习，我们建议您熟悉SubQuery中所使用的 [terminology](../#terminology)。

**The goal of this quick start guide is to adapt the standard starter project to begin indexing all transfers from Polkadot, it should only take 10-15 minutes**

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

Please note that we **DO NOT** encourage the use of `yarn global` for installing `@subql/cli` due to its poor dependency management which may lead to errors down the line.

You can then run help to see available commands and usage provided by the CLI:

```shell
subql help
```

## 初始化 Starter SubQuery 项目

在你想创建SubQuery项目的目录中，只需运行以下命令就可以开始了。

```shell
subql init
```

在初始化 SubQuery project 时，您会被问到一些问题：

- Project name: A project name for your SubQuery project
- Network family: The layer-1 blockchain network family that this SubQuery project will be developed to index. Use the arrow keys to select from the available options. For this guide, we will use *"Substrate"*
- Network: The specific network that this SubQuery project will be developed to index. Use the arrow keys to select from the available options. For this guide, we will use *"Polkadot"*
- Template project: Select a SubQuery template project that will provide a starting point to begin development. We suggest selecting the *"subql-starter"* project.
- RPC endpoint: Provide an HTTPS URL to a running RPC endpoint that will be used by default for this project. You can quickly access public endpoints for different Polkadot networks, create your own private dedicated node using [OnFinality](https://app.onfinality.io) or just use the default Polkadot endpoint. 此 RPC 节点必须是归档节点 (具有完整链状态)。 For this guide, we will use the default value *"https://polkadot.api.onfinality.io"*
- Git repository: Provide a Git URL to a repo that this SubQuery project will be hosted in (when hosted in SubQuery Explorer) or accept the provided default.
- Authors: Enter the owner of this SubQuery project here (e.g. your name!) or accept the provided default.
- Description: Provide a short paragraph about your project that describes what data it contains and what users can do with it or accept the provided default.
- Version: Enter a custom version number or use the default (`1.0.0`)
- License: Provide the software license for this project or accept the default (`MIT`)

After the initialisation process is complete, you should see that a folder with your project name has been created inside the directory. The contents of this directory should be identical to what's listed in the [Directory Structure](../create/introduction.md#directory-structure).

Last, under the project directory, run the following command to install the new project's dependencies.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Making Changes to your Project

In the starter package that was just initialised, a standard configuration has been provided. These are:

1. The GraphQL Schema in `schema.graphql`
2. `project.yaml` 中的项目清单
3. `src/mappings/` 目录中的映射函数

The goal of this quick start guide is to adapt the standard starter project to begin indexing all transfers from Polkadot.

### 更新你的GraphQL Schema文件

`schema.graphql` 文件定义了各种GraphQL 模式。 遵循GraphQL查询语言的工作方式，模式文件基本上决定了您从 SubQuery 获取数据的格式。 It's a great place to start because it allows you to define your end goal upfront.

Update the `schema.graphql` file to read as follows:

```graphql
type Transfer @entity {
  id: ID! # id field is always required and must look like this
  amount: BigInt # Amount that is transferred
  blockNumber: BigInt # The block height of the transfer
  from: String! # The account that transfers are made from
  to: String! # The account that transfers are made to
}
```

**重要提示：当您对模式文件做任何更改时， 请确保使用命令yarn codegen来重新生成你的类型目录。**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

You'll find the generated models in the `/src/types/models` directory. 欲了解更多关于 `schema.graphql` 文件的信息，请参阅 [Build/GraphQL Schema](../build/graphql.md)

### 更新Project Manifest 文件

The Project Manifest (`project.yaml`) file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data.

The manifest file has already been set up correctly, but we need to change our handlers. As we are planning to index all Polkadot transfers, we need to update the `datasources` section as follows:

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

This means we'll run a `handleEvent` mapping function each and every time there is a `balances.Transfer` event.

关于Project Manifest（`project.yaml`）文件的更多信息，请查看我们在[Build/Manifest File](../build/manifest.md)下的文档。

### 添加Mapping Function

Mapping functions定义了如何将链式数据转化为我们之前在`schema.graphql`文件中定义的优化的GraphQL实体。

导航到`src/mappings`目录下的默认映射函数。 你会看到三个导出的函数, `handleBlock`, `handleEvent`, 和 `handleCall`。 Delete both the `handleBlock` and `handleCall` functions as we will only deal with the `handleEvent` function.

The `handleEvent` function receives event data whenever an event matches the filters that we specified previously in our `project.yaml`. We will update it to process all `balances.Transfer` events and save them to the GraphQL entities that we created earlier.

你可以将`handleEvent`函数更新为以下内容（注意额外的导入）。

```ts
import { SubstrateEvent } from "@subql/types";
import { Transfer } from "../types";
import { Balance } from "@polkadot/types/interfaces";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    // Get data from the event
    // The balances.transfer event has the following payload \[from, to, value\]
    // logger.info(JSON.stringify(event));
    const from = event.event.data[0];
    const to = event.event.data[1];
    const amount = event.event.data[2];

    // Create the new transfer entity
    const transfer = new Transfer(
        `${event.block.block.header.number.toNumber()}-${event.idx}`,
    );
    transfer.blockNumber = event.block.block.header.number.toBigInt();
    transfer.from = from.toString();
    transfer.to = to.toString();
    transfer.amount = (amount as Balance).toBigInt();
    await transfer.save();
}
```

What this is doing is receiving a SubstrateEvent which includes transfer data in the payload. 我们提取这些数据，然后实例化一个新的`Transfer`实体，我们之前在`schema.graphql`文件中定义了这个实体。 我们添加额外的信息，然后使用`.save()`函数来保存新的实体（SubQuery将自动将其保存到数据库）。

关于映射函数的更多信息，请查看我们在[Build/Mappings](../build/mapping.md)下的文档。

### 生成项目

In order to run your new SubQuery Project we first need to build our work. 从项目的根目录运行构建命令。

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Important: Whenever you make changes to your mapping functions, you will need to rebuild your project**

## Running and Querying your Project

### Run your Project with Docker

Whenever you create a new SubQuery Project, you should always run it locally on your computer to test it first. 最简单的方法是使用 Docker。

All configuration that controls how a SubQuery node is run is defined in the `docker-compose.yml` file. For a new project that has been just initialised you won't need to change anything, but you can read more about the file and the settings in our [Run a Project](../run_publish/run.md) section.

Under the project directory, run the following command:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you should see a running SubQuery node in the terminal screen.

### 查询您的项目

打开浏览器并前往 [http://localhost:3000](http://localhost:3000)。

You should see a GraphQL playground in the browser and the schemas that are ready to query. 在 Playground 的右上角，您会找到一个_Docs_按钮，该按钮将打开文档绘图。 该文档是自动生成的，可帮助您查找实体和方法。

For a new SubQuery starter project, try the following query to understand how it works or learn more about the [GraphQL Query language](../run_publish/graphql.md).

```graphql
{
  query {
    transfers(
      first: 10,
      orderBy: AMOUNT_DESC
    ) {
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

SubQuery provides a free managed service where you can deploy your new project to. 您可以将其部署到 [SubQuery 项目](https://project.subquery.network) 并使用我们的 [Explorer](https://explorer.subquery.network) 进行查询。

Read the guide to [publish your new project to SubQuery Projects](../run_publish/publish.md)

## 后续步骤

Congratulations, you now have a locally running SubQuery project that accepts GraphQL API requests for transfers data.

现在你已经深入了解了如何建立一个基本的SubQuery项目，问题是要从哪里开始？ 如果你感到有信心，你可以跳到更多关于三个关键文件的学习。 The manifest file, the GraphQL schema, and the mappings file are under the [Build section of these docs](../build/introduction.md).

Otherwise, continue to our [Academy section](../academy/academy.md) where we have more in-depth workshops, tutorials, and example projects. 我们将在这里查看更高级的修改，我们将通过运行随时可用和开源项目来深入细致地运行 SubQuery 项目。

Finally, if you're looking for more ways to run and publish your project, our [Run & Publish section](../run_publish/run.md) provides detailed information about all the ways to run your SubQuery project and other advanced GraphQL aggregation and subscription features.
