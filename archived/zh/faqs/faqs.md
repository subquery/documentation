# 常见问题解答

## 什么是 SubQuery？

SubQuery 是一个开放源码区块链数据索引器，为开发者提供快速、灵活、可靠和分散的 API，为多链应用提供动力。

我们的目标是通过消除建立自己的索引解决方案的需要来节省开发者的时间和金钱。 现在，它们可以充分注重开发其应用。 我们的使命是帮助开发者创建去中心化的产品。

<br/>
<figure class="video_container">
<iframe src="https://www.youtube.com/embed/gCpVz_mkWdo" title="介绍SubQuery网络：" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscree="true"></iframe>
</figure>

**SubQuery 管理服务**

SubQuery 还为开发者提供免费的生产级托管项目。 我们的管理服务取消了管理基础设施的责任感，以便开发者能够做他们最好的事情——建造。 在这里了解更多 [](/run_publish/publish.md)

**关于 Subuery Network**

SubQuery 网络允许开发者完全分散他们的基础设施堆栈。 我们正在为 dApp 开发者构建最开放的、运行最可靠的、可扩展的数据服务。 SubQuery 网络以一种激励和可验证的方式为全球社区提供数据索引的服务。 将项目发布到 SubQuery 网络后，任何人都可以对其进行索引和托管，从而可以更快、更可靠地向世界各地的用户提供数据。

更多信息 [在这里](/subquery_network/introduction.md)。

## 从 SubQuery 开始的最佳方式是什么？

开始使用 SubQuery 的最好方法是尝试我们的 [Hello World 教程](/assets/pdf/Hello_World_Lab.pdf)。 这是简单的 5 分钟步行练习。 下载启动模板，构建项目，使用 Docker 在您的 localhost 上运行一个节点，并运行一个简单的查询。

## 我如何向 SubQuer 贡献或反馈？

我们热爱社区的贡献和反馈。 若要贡献代码，请分派感兴趣的仓库并做出更改。 然后提交 PR 或 Pull 请求。 哦，不要忘记测试！ 同时查看我们的 [贡献指南](../miscellaneous/contributing.md。

要提供反馈，请通过 hello@subquery.network联系我们，或进入我们的 [Discord 频道](https://discord.com/invite/78zg8aBSMG).

## 在 SubQuery 项目中托管我的项目需要多少费用？

此服务正在免费提供给社区！ 您可以完全免费地托管您的头两个子查询项目！”

## 什么是部署插槽？

部署位置是 [SubQuery 项目](https://managedservice.subquery.network) 中的一个功能，相当于一个开发环境。 例如，在任何软件组织中，通常都有一种最起码的开发环境和生产环境(无视本地环境)。 在典型的软件产品开发中，根据具体软件开发需求的要求，包括了其他环境，例如灰度环境、生产环境和测试环境等。

SubQuery 目前有两个可用的位置。 一个中转插槽和一个生产插槽。 这使得开发人员可以将他们的 SubQuery 部署到模拟环境中，并且在点击按钮时“发布到生产环境”。

## 中转插槽的优点是什么？

使用中转插槽的主要好处是，它允许您准备新版本的 SubQuery 项目而不公开。 您可以等待中转插槽重新设置所有数据而不影响您的生产环境应用程序。

中转插槽不会在 [Explorer](https://explorer.subquery.network/) 中向公众展示，而且有一个唯一的 URL，只有您可以看到。 当然，这个单独的环境允许您在不影响生产的情况下测试您的新代码。

## Polkadot 的附加组件是什么？

如果你已经熟悉区块链基本概念，你可以将外部状态理解为区块链中的交易。 但更加正式的理解是，外部状态是一种来自链外并被包含在一个区块中的信息。 外部状态的类别包含 3 种， 分别为：inherents、signed transactions、unsigned transactions。

Inherent 外部状态是指未经签名且仅由区块作者插入区块的信息。

Signed transaction 外部状态是指包含签发交易账户签名的交易。 该类型将支付一笔费用，以使得将该交易上链。

Unsigned transactions 外部状态是指不包含交易账户签名的交易。 使用未签名交易的外部事务时应该小心，因为没有人支付费用，因为它们没有签名。 因此，该类型下交易队列缺乏防止欺骗的经济逻辑。

想了解更多信息，请点击 [这里](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics)。

## Kusama 网络端点是什么？

Kusama 网络端点的介绍 `wss://kusama.api.onfinality.io/publicws`。

## Polkadot 主网的端点是什么？

Polkadot 网络端点的介绍 `wss://polkadot.api.onfinality.io/publicws`。

## 如何编辑项目计划？

开发一个更改项目方案的已知问题是，当放松您的子查询节点进行测试时。 此前索引的块将与您的新方案不兼容。 为了反复开发方案，数据库中储存的索引方块必须清除， 这可以通过使用 `--force-clear` 标志启动您的节点来实现。 示例

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

请注意，建议在项目清单中更改 `startBlock` 时使用 `--force-clear` 。`项目。 aml`) 以开始从已配置的方块进行重新索引。 如果 `startBlock` 在没有 `--force-clean` 的情况下被更改，那么索引器将继续使用先前配置的 `startBlock` 索引。

## 我如何优化我的项目以加快速度？

业绩是每个项目的一个关键因素。 幸运的是，你们可以做几件事来加以改进。 以下是一些建议的列表：

- 尽可能避免使用区块处理程序。
- 只查询必要的字段。
- 尝试使用过滤条件来减少响应大小。 创建尽可能具体的过滤器，以避免查询不必要的数据。
- 对于大型数据表，避免查询 `总计计数` 而不添加条件。
- 为查询性能添加索引到实体字段中，这对历史项目特别重要。
- 设置合同初始化时的起始模块。
- 总是使用 [字典](../tutorials_examples/dictionary.html#how-does-a-subquery-dictionary-work) (我们可以帮助为您的新网络创建一个字典)。
- 优化您的架构设计，使其尽可能简单。
  - 尝试减少不必要的字段和列。
  - 根据需要创建索引。
- 尽可能频繁地使用并行/批量处理。
  - 使用 `api.queryMulti()` 来优化在映射函数内的 Polkadot API 调用并并行查询它们。 这是一个比循环更快的方式。
  - 使用 `Promise.all()`. 在多个异步函数的情况下，最好执行它们并并行解决。
  - 如果您想要在单个处理程序中创建很多实体，您可以使用 `store.bulkCreate(entityname: string, entity: Entity[])`。 您可以同时创建它们，无需单独创建。
- 让 API 调用查询状态可能很慢。 您可以尽量减少通话，并使用 `扩展/交易/事件` 数据。
- 使用 `工作线程` 将区块提取和区块处理移动到自己的工作线程。 它可以加快索引速度，最多可达 4 倍(视具体项目而定)。 您可以轻松地使用 `-workers=<number>` 标志启用它。 请注意，可用的 CPU 核心数严格限制了工人线程的使用。 现在，它只供 Substrate and Cosmos 使用，很快将会被集成到 Avalanche。
- 注意 `JSONstringify` 不支持原生 `BigInts`。 如果你试图记录一个目标，我们的日志库将会在内部做这件事。 我们正在研究如何解决这一问题。
- 使用方便的 `模块` 过滤器来运行一个处理程序到一个特定的区块。 此过滤器允许处理任何给定的块数，这对于按设定的时间间隔分组和计算数据极为有用。 例如，如果模块设置为 50，块处理程序将在每 50 个模块上运行。 它提供了更多的对开发者索引数据的控制，并且可以在下面的项目清单中实现这一点。
