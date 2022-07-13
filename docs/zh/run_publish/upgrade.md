# 部署您的 SubQuery 项目的新版本

## 创作指南

尽管您可以随时升级和部署您的 SubQuery 项目的新版本， 但如果您的 SubQuery 项目已经是面向公众公开了，请在升级与部署时谨慎些。 需要注意的一些要点如下：

- 如果你的升级是一次重大更新，或者创建一个新的项目(例如) `我的 SubQuery 项目 V2`，建议通过您社交媒体如推特、电报等给您的社区足够的事前告知与注意事项提醒。
- 部署一个新的 SubQuery 项目版本将会导致一些停机时间，因为新版本会从初始区块链中索引整个链。

## 部署变更

There are two methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

### Using the UI

Log into SubQuery Project and select the project you want to deploy a new version of. You can choose to either deploy to the production or staging slot. These two slots are isolated environments and each has their own databases and synchronise independently.

We recommend deploying to your staging slot only for final staging testing or when you need to resync your project data. You can then promote it to production with zero downtime. You will find testing is faster when [running a project locally](../run_publish/run.md) as you can more [easily debug issues](../academy/tutorials_examples/debug-projects.md).

The staging slot is perfect for:

- 在独立的环境中最后验证您的 SubQuery 项目的更改。 中转插槽有一个不同的用于生产的URL，可以在dApps中使用它。
- Warming up and indexing data for an updated SubQuery project to eliminate downtime in your dApp.
- 为您的SubQuery Project准备一个新版本，而不公开它。 中转插槽不会在Explorer中显示给公众，它有一个唯一的URL，仅对您可见。

![Staging slot](/assets/img/staging_slot.png)

在 GitHub 中填写您想要部署的 SubQuery 项目代码库版本的 SubQuery 哈希(复制完整的提交哈希)。 这将导致更长的停机时间，取决于索引当前链所需的时间。 您可以一直在这里报告进度。

### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our managed service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ready.

```shell
// You can directly set your Indexer and Query versions
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// OR you can use the interface, it will validate your IPFS CID and render a list of image versions that matches your manifest file `project.yaml`

$ subql deployment:deploy
```

## Upgrade to the Latest Indexer and Query Service

If you just want to upgrade to the latest indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) or query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) to take advantage of our regular performance and stability improvements, just select a newer versions of our packages and save. This will cause only a few minutes of downtime as the services running your project are restarted.

## 下一步 - 连接到您的项目

一旦您的部署成功完成并且我们的节点已经从该链中为您的数据编制了索引， 您可以通过显示的 GraphQL 查询端点连接到您的项目。

![正在部署和同步的项目](/assets/img/projects-deploy-sync.png)

您也可以点击项目标题旁边的三个小点图标，从而在 SubQuery 浏览器上查看项目， 在这里您可以使用我们的区块链浏览器开始—— [阅读更多关于如何在这里使用](../query/query.md) 的信息。 There you can use the in browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).
