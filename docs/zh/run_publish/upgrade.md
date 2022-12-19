# 部署您的 SubQuery 项目的新版本

## 创作指南

尽管您可以随时升级和部署您的 SubQuery 项目的新版本， 但如果您的 SubQuery 项目已经是面向公众公开了，请在升级与部署时谨慎些。 需要注意的一些要点如下：

- 如果你的升级是一次重大更新，或者创建一个新的项目(例如) `我的 SubQuery 项目 V2`，建议通过您社交媒体如推特、电报等给您的社区足够的事前告知与注意事项提醒。
- 部署一个新的 SubQuery 项目版本将会导致一些停机时间，因为新版本会从初始区块链中索引整个链。

## 部署变更

有两种方法可以在 SubQuery 管理服务中部署新版本的项目。 您可以使用界面或直接通过 `subql` cli 工具。

### 使用用户界面

登录到 SubQuery 项目并选择你想要部署一个新版本的项目。 您可以选择部署到生产或暂存槽。 这两个插槽是各自独立的环境，各自都有自己的数据库并独立地同步进行。

我们建议仅在最终阶段测试或需要重新同步项目数据时部署到暂存槽。 然后，您可以在零停机时间的情况下将其推广到生产环境。 您会发现[在本地运行项目](../run_publish/run.md)时测试更快，因为您可以更[更轻松地调试问题](../academy/tutorials_examples/debug-projects.md)。

暂存槽非常适合：

- 在独立的环境中最后验证您的 SubQuery 项目的更改。 中转插槽有一个不同的用于生产的 URL，可以在 dApps 中使用它。
- 为更新的 SubQuery 项目预热和索引数据，以消除 dApp 中的停机时间。
- 为您的 SubQuery Project 准备一个新版本，而不公开它。 中转插槽不会在 Explorer 中显示给公众，它有一个唯一的 URL，仅对您可见。

![暂存槽位](/assets/img/staging_slot.png)

Fill in the IPFS CID of the new version of your SubQuery project codebase that you want deployed (see the documetation to publish to IPFS [here](./publish.md). 这将导致更长的停机时间，取决于索引当前链所需的时间。 您可以一直在这里报告进度。

### 使用 CLI

You can also use `@subql/cli` to create a new deployment of your project to our Managed Service. 这需要：

- `@subql/cli` 版本 1.1.0 或以上.
- 有效的 [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) 就绪。

```shell
// You can directly set your Indexer and Query versions
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// OR you can use the interface, it will validate your IPFS CID and render a list of image versions that matches your manifest file `project.yaml`

$ subql deployment:deploy
```

### 使用 GitHub Actions

随着国家排雷行动中心的部署功能的引入， 我们在 GitHub 中添加了一个 **默认动作流程** 到

启动器项目，它将允许您自动发布并部署您的更改

- 第 1 步：将您的项目推送到 GitHub 后，在 GitHub 上创建 `DEPLOYMENT` 环境，并添加秘钥 [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token)
- 第 2 步: 如果你还没有准备好，请在 [SubQuery 项目](https://project.subquery.network) 上创建一个项目。 这可以使用 [UI](#using-the-ui) 或 [CLI](#using-the-cli) 来完成。
- 第 3 步：一旦您的项目被创建，导航到您项目的 GitHub 动作页面，并选择工作流程 `CLI 部署`。
- 第 4 步：您将看到一个输入字段，您可以在这里输入在 SubQuery 项目上创建的项目的唯一代码。 你可以从 SubQuery 项目 [SubQuery 项目](https://project.subquery.network) 中获取代码。 代码基于您项目的名称, 其中空格被连线替换 `-`。 例如： `我的项目名称` 变成 `我的项目名称`。

::: 提示
一旦工作流完成，你应该能够看到你的项目部署到我们的管理服务。
:::

一个常见的方法是扩展默认的 GitHub 动作，以便在代码合并到主页时自动对我们的管理服务进行更改。 以下对 GitHub 行动流程的更改做到这一点：

```yml
on:
  push:
    branches:
      - main
jobs:
  deploy:
    name: CLI Deploy
    ...
```

## 升级到最新索引和查询服务

如果只想升级到最新的索引器（[`@subql/node`](https://www.npmjs.com/package/@subql/node)）或查询服务（`@subql/query`</ 2>) 要利用我们常规的性能和稳定性改进，只需选择更新版本的软件包并保存即可。 当运行您的项目的服务重新启动时，这只会导致几分钟的停用

## 下一步 - 连接到您的项目

一旦您的部署成功完成并且我们的节点已经从该链中为您的数据编制了索引， 您可以通过显示的 GraphQL 查询端点连接到您的项目。

![正在部署和同步的项目](/assets/img/projects_deploy_sync.png)

您也可以点击项目标题旁边的三个小点图标，从而在 SubQuery 浏览器上查看项目， 在这里您可以使用我们的区块链浏览器开始—— [阅读更多关于如何在这里使用](../query/query.md) 的信息。 在这里您可以使用我们的区块链浏览器开始—— [阅读更多关于如何在这里使用](../run_publish/query.md) 的信息。

![SubQuery Explorer 中的项目](/assets/img/projects_explorer.png)

::: 信息注释 了解更多关于 [GraphQL 查询语言。](./graphql.md) :::
