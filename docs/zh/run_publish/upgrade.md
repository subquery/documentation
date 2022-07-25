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

## 升级到最新索引和查询服务

如果只想升级到最新的索引器（[`@subql/node`](https://www.npmjs.com/package/@subql/node)）或查询服务（

`@subql/query`</ 2>) 要利用我们常规的性能和稳定性改进，只需选择更新版本的软件包并保存即可。 当运行您的项目的服务重新启动时，这只会导致几分钟的停用。</p> 



## 下一步 - 连接到您的项目

一旦您的部署成功完成并且我们的节点已经从该链中为您的数据编制了索引， 您可以通过显示的 GraphQL 查询端点连接到您的项目。

![正在部署和同步的项目](/assets/img/projects-deploy-sync.png)

您也可以点击项目标题旁边的三个小点图标，从而在 SubQuery 浏览器上查看项目， 在这里您可以使用我们的区块链浏览器开始—— [阅读更多关于如何在这里使用](../query/query.md) 的信息。 在这里您可以使用我们的区块链浏览器开始—— [阅读更多关于如何在这里使用](../run_publish/query.md) 的信息。
