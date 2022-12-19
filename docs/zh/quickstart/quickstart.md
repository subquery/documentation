# 1. 创建一个新项目

此快速启动指南的目标是为您提供完整的开发设置和引导步骤来创建您的第一个SubQuery区块链项目。 它针对的是那些刚刚开始他们的 blockchain 旅程的有经验的开发者。

这个快速启动指南将需要10-15分钟左右。

完成这个快速启动指南后，您将有一个工作的 SubQuery 项目，运行在 SubQuery 节点上。 您将能够从您最喜欢的区块链网络（如Polkadot、Avalanche、Cosmos等）调整标准启动器项目和索引传输。

让我们开始创建您的第一个SubQuery区块链项目的过程。

## 前提条件

在开始使用 SubQuery 创建您的第一个区块链项目之前，请确保您已经安装了所需的支持软件应用程序。 分别是：

- [Node](https://nodejs.org/en/): 一个现代（如LTS版本）的Node安装。
- [Docker](https://docker.com/): 本教程将使用Docker的程序。

现在，您即将开始第一步，即安装SubQuery CLI。

## 1. 安装 SubQuery CLI

使用 NPM 在终端上全局安装 SubQuery CLI：

```shell
# NPM
npm install -g @subql/cli
```

请注意，我们**不**鼓励使用`yarn global`来安装`@subql/cli`，因为它的依赖性管理不好，可能会导致下一步的错误。 这可能导致多个错误。 :::

查看所有可用的命令及其使用情况。 运行下面的 CLI 命令：

```shell
subql help
```

## 2. 初始化 Starter SubQuery 项目

在你想要创建subquery项目的目录中运行以下命令：

```shell
subql init
```

::: 警告

**适合Cosmos用户**

SubQuery的 CLI 尚不支持Cosmos(`subql`)。 因此，如果你正在使用Cosmos，你必须从Juno克隆开始或fork这个 [起点项目](https://github.com/subquery/cosmos-subql-starter)。

要使用Cosmos初始化您的项目，请参考此 [链接](https://github.com/subquery/juno-subql-starter#readme) 中显示的这4个步骤。 一旦你完成这4个步骤，**跳转**到[对你的项目进行修改](../quickstart/quickstart.md#_3-make-changes-to-your-project)部分。 :::

当你继续前进时，你会遇到一些问题：

- **Project name**: 您的 SubQuery 项目的项目名称。
- **Network family**: 此SubQuery 项目将索引的图层1 区块链网络类。 使用箭头键从可用选项中选择。 例如，Polkadot、Avalanche、Cosmos或任何其他支持的网络。
- **Network**: 此SubQuery 项目将索引的特定网络。 使用箭头键从可用选项中选择。 例如，Polkadot, Avalanche, 或任何其他支持的网络。
- **Template project**：选择一个SubQuery 项目模板，它将为开始开发提供起始点. 我们建议选择 _"subql-starter"_ 项目。
- **RPC endpoint**(必填)：提供一个 wss URL给一个正在运行的 RPC 端点，该端点将默认用于此项目。 您可以快速访问不同的 Polkadot 网络的公共端点，甚至可以使用 [OnFinality](https://app.onfinality.io) 或仅使用默认的 Polkadot 端点创建您自己的专用节点。 此 RPC 节点必须是归档节点 (具有完整链状态)。 我们将使用本指南的默认值。 基于您选择的网络，默认值可以是：
  - 对于Polkadot - _"https://polkadot.api.onfinality.io"_,
  - 对于Avalanche - _"https://avalanche.apionfinality.io"_,
  - 对于 Terra - _“https://terra-columbus-5.beta.api.onfinality.io”_ 等于其他网络。 <br/>
- **Git repository（可选）**：提供指向此 SubQuery 项目的，并将在其中托管的存储库的 Git URL（当托管在 SubQuery Explorer 中时）
- **Authors**：在此输入此SubQuery项目的所有者(例如您的名字!)或接受所提供的默认值。
- **Description**：提供一个关于您项目的简短段落，描述项目包含哪些数据，用户可以做什么或接受提供的默认值。
- **Version (必填)**：输入一个自定义版本号或使用默认版本(`1.0.0`).
- License（必填)：提供此项目的软件许可或接受默认设置(`Apache-`).

让我们看看一个例子：

```shell
$ subql init
Project name [subql-starter]: HelloWorld
? Select a network family Substrate
? Select a network Polkadot
? Select a template project subql-starter     Starter project for subquery
RPC endpoint: [wss://polkadot.api.onfinality.io/public-ws]:
Git repository [https://github.com/subquery/subql-starter]:
Fetching network genesis hash... done
Author [Ian He & Jay Ji]: Sean
Description [This project can be used as a starting po...]:
Version [1.0.0]:
License [MIT]:
Preparing project... done
HelloWorld is ready
```

在初始化过程完成后，您应该看到目录内创建了一个项目名称的文件夹。 此目录的内容应该与 [Directory Structure](../build/introduction.md#directory-structure) 中列出的内容完全相同。

最后，运行以下命令从新项目目录中安装新项目的依赖关系。

::: code-tabs @tab:active yarn

```shell
cd PROJECT_NAME
yarn install
```

@tab npm

```shell
cd PROJECT_NAME
npm install
```

:::

You have now initialised your first SubQuery project with just a few simple steps. Let’s now customise the standard template project for a specific blockchain of interest.

You may want to refer to the [command line arguments](../run_publish/references.md) used in SubQuery. It will help you understand the commands better.

## 3. Make Changes to Your Project

There are 3 important files that need to be modified. 分别是：

1. The GraphQL Schema in `schema.graphql`.
2. The Project Manifest in `project.yaml`.
3. The Mapping functions in `src/mappings/` directory.

SubQuery supports various blockchain networks and provides a dedicated guide for each of them. Select your preferred blockchain under 2. Specific Chains and continue the quick start guide.
