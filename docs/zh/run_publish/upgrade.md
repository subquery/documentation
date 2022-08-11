# 部署您的 SubQuery 项目的新版本

## 创作指南

尽管您可以随时升级和部署您的 SubQuery 项目的新版本， 但如果您的 SubQuery 项目已经是面向公众公开了，请在升级与部署时谨慎些。 需要注意的一些要点如下：

- 如果你的升级是一次重大更新，或者创建一个新的项目(例如) `我的 SubQuery 项目 V2`，建议通过您社交媒体如推特、电报等给您的社区足够的事前告知与注意事项提醒。
- 部署一个新的 SubQuery 项目版本将会导致一些停机时间，因为新版本会从初始区块链中索引整个链。

## 部署变更

There are three methods to deploy a new version of your project to the SubQuery Managed Service: you can use the UI, create it directly via the `subql` cli tool, or use an automated GitHub action.

### 使用用户界面

登录到 SubQuery 项目并选择你想要部署一个新版本的项目。 您可以选择部署到生产或暂存槽。 这两个插槽是各自独立的环境，各自都有自己的数据库并独立地同步进行。

我们建议仅在最终阶段测试或需要重新同步项目数据时部署到暂存槽。 然后，您可以在零停机时间的情况下将其推广到生产环境。 您会发现[在本地运行项目](../run_publish/run.md)时测试更快，因为您可以更[更轻松地调试问题](../academy/tutorials_examples/debug-projects.md)。

暂存槽非常适合：

- 在独立的环境中最后验证您的 SubQuery 项目的更改。 中转插槽有一个不同的用于生产的URL，可以在dApps中使用它。
- 为更新的 SubQuery 项目预热和索引数据，以消除 dApp 中的停机时间。
- 为您的SubQuery Project准备一个新版本，而不公开它。 中转插槽不会在Explorer中显示给公众，它有一个唯一的URL，仅对您可见。

![暂存槽位](/assets/img/staging_slot.png)

在 GitHub 中填写您想要部署的 SubQuery 项目代码库版本的 SubQuery 哈希(复制完整的提交哈希)。 这将导致更长的停机时间，取决于索引当前链所需的时间。 您可以一直在这里报告进度。

### 使用CLI

您还可以使用 `@subql/cli` 为您的项目创建新的部署到我们的托管服务。 这需要：

- `@subql/cli` 版本 1.1.0 或以上.
- 有效的 [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) 就绪。

```shell
// You can directly set your Indexer and Query versions
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// OR you can use the interface, it will validate your IPFS CID and render a list of image versions that matches your manifest file `project.yaml`

$ subql deployment:deploy
```

### Using GitHub actions

With the introduction of the deployment feature for the CLI, we've added a **Default Action Workflow** to [the starter project in GitHub](https://github.com/subquery/subql-starter/blob/v1.0.0/.github/workflows/cli-deploy.yml) that will allow you to publish and deploy your changes automatically:

- 第 1 步：将您的项目推送到 GitHub 后，在 GitHub 上创建 `DEPLOYMENT` 环境，并添加秘钥 [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token)
- Step 2: If you haven't already, create a project on [SubQuery Projects](https://project.subquery.network). This can be done using the the [UI](#using-the-ui) or [CLI](#using-the-cli).
- Step 3: Once your project is created, navigate to the GitHub Actions page of your project, and select the workflow `CLI deploy`.
- Step 4: You'll see an input field where you can enter the unique code of your project created on SubQuery Projects. You can get the code from the URL in SubQuery Projects [SubQuery Projects](https://project.subquery.network). 代码基于您项目的名称, 其中空格被连线替换 `-`。 e.g. `my project name` becomes `my-project-name`.

::: tips Tip
Once the workflow is complete, you should be able to see your project deployed to our Managed Service.
:::

A common approach is to extend the default GitHub Action to automatically deploy changes to our Managed Service when code is merged into the main branch. 以下对 GitHub 行动流程的更改做到这一点：

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

If you just want to upgrade to the latest indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) or query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) to take advantage of our regular performance and stability improvements, just select a newer versions of our packages and save. This will cause only a few minutes of downtime as the services running your project are restarted.

## 下一步 - 连接到您的项目

一旦您的部署成功完成并且我们的节点已经从该链中为您的数据编制了索引， 您可以通过显示的 GraphQL 查询端点连接到您的项目。

![正在部署和同步的项目](/assets/img/projects-deploy-sync.png)

您也可以点击项目标题旁边的三个小点图标，从而在 SubQuery 浏览器上查看项目， 在这里您可以使用我们的区块链浏览器开始—— [阅读更多关于如何在这里使用](../query/query.md) 的信息。 There you can use the in browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).
