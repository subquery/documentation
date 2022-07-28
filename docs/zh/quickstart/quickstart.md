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
  - For Terra - _“https://terra-columbus-5.beta.api.onfinality.io”_ and likewise for other networks. <br/>
- **Git repository**: Provide a Git URL to a repo that this SubQuery project will be hosted in (when hosted in SubQuery Explorer) or accept the provided default.
- **Authors**: Enter the owner of this SubQuery project here (e.g. your name!) or accept the provided default.
- **Description**: Provide a short paragraph about your project that describes what data it contains and what users can do with it, or accept the provided default.
- **Version**: Enter a custom version number or use the default (`1.0.0`).
- **License**: Provide the software license for this project or accept the default (`MIT`).

Let’s look at an example:

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

After you complete the initialisation process, you will see a folder with your project name created inside the directory. Please note that the contents of this directory should be identical to what's listed in the [Directory Structure](../build/introduction.md#directory-structure).

Finally, run the following command to install the new project’s dependencies from within the new project's directory.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

You have now initialised your first SubQuery project with just a few simple steps. Let’s now customise the standard template project for a specific blockchain of interest.

You may want to refer to the [command line arguments](../run_publish/references.md) used in SubQuery. It will help you understand the commands better.

## 3. Make Changes to Your Project

There are 3 important files that need to be modified. These are:

1. The GraphQL Schema in `schema.graphql`.
2. The Project Manifest in `project.yaml`.
3. The Mapping functions in `src/mappings/` directory.

SubQuery supports various blockchain networks and provides you with a dedicated guide for each of them.

Pick up your preferred network and proceed ahead to make the modifications required, and move an inch closer to finishing your first ever project:

- **[Polkadot/Substrate](../quickstart/quickstart_chains/polkadot.md)**

- **[Avalanche](../quickstart/quickstart_chains/avalanche.md)**

- **[Cosmos](../quickstart/quickstart_chains/cosmos.md)**

- **[Terra](../quickstart/quickstart_chains/terra.md)**
