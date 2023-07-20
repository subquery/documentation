# 教程 & 案例

这里我们将列出我们的教程，并探索各种示例来帮助你以最简单和最快的方式熟悉和运行。

## SubQuery 示例

## SubQuery 示例项目

| 例子                                                                               | 描述                                                             | 主题                                                                                       |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [外部已完成区块](https://github.com/subquery/tutorials-extrinsic-finalised-blocks) | 索引外部区块，可以通过其 Hash 值进行查询                         | 带有 **block handler** 函数的最简单示例                                                    |
| [区块时间戳](https://github.com/subquery/tutorials-block-timestamp)                | 索引每个最终区块的时间戳                                         | 另一个简单的 **call handler** 函数                                                         |
| [验证阀值](https://github.com/subquery/tutorials-validator-threshold)              | 索引选择验证者所需的最低 Staking 数量。                          | 更复杂的 **block handler** 函数让 **external calls** 到 `@polkadot/api` 获取更多链上的数据 |
| [合计奖励](https://github.com/subquery/tutorials-sum-reward)                       | 从最后区块的事件中，索引 Staking 的保证金、 奖励和处罚           | 更复杂的 **event handlers** 带有 **one-to-many** 的关系                                    |
| [财产关系](https://github.com/subquery/tutorials-entity-relations)                 | 索引帐户间的余额转移，同时索引实用的批处理，以查找外在调用的内容 | **One-to-many** 和 **many-to-many** 的关系和复杂 **extrinsic handling**                    |
| [kitty](https://github.com/subquery/tutorials-kitty-chain)                         | 索引 kitty 的出生信息。                                          | 复杂的 **call handlers** 和 **event handlers**, 数据索引来自 **custom chain**              |
