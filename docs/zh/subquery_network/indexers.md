# 索引者

## 什么是索引者？

索引者是 SubQuery 网络参与者，负责索引区块链数据并向客户提供这种数据。

索引者在SubQuery网络中发挥着非常重要的作用。 作为数据服务业务的一部分，索引者将计算和联网功率转变为利润。

## 索引者权益质押

为了从作为索引器的查询收入中获得回报，建议索引者必须在他们提供服务的特定的 SubQuery 项目中订购SQT 。 Cobb-Douglas生产功能将用于确定分配给每个索引者的奖励。

SubQuery 计划为网络添加一个约束，即索引者必须在相关奖励池中拥有最低数量的 SQT 才能参加匹配的开放协议。 它们还必须以同样方式在任何封闭协定的同等风险合同上承担最低数额。 这个指数化的最低值必须是协议每个时代奖励值的特定百分比。 这意味着要将协定延长到更高的卷宗，索引者还必须增加它们的利害关系。 当索引者的质押低于这个最低金额时，它们将无法以现有价格续延协定。

如果索引者被发现错误(例如提供无效、不完整或不正确的数据)， 他们有责任将他们的Staked SQT（关于特定奖励池）的一部分重新分配给SubQuery基金会财务处。 减少他们在网络中所持的 SQT ，因而减少他们的潜在奖励。 因为索引者分配的股份是由他们SQT总额的百分比决定的， 这将对索引者所加入的所有其他奖励池产生影响。

## 索引者如何获取奖励?

索引者以两种方式在 SQT 中获得奖励：
- 基于 Cobb-Douglas 生产功能定义的分布，来自SQT 奖励池的奖励。
- 索引者从封闭协议中直接获得SQT查询费奖励。

索引者会被奖励消费者因提供消费者要求的区块链数据而支付的费用。 索引者将从封闭协议中收取所有费用。 Otherwise, the fees are split based on the amount of work performed (requests served) and the amount of delegated SQT - this split is determined by applying the Cobb-Douglas Production Function.

给定索引者可能同时激活多个奖励池。 索引者的工作是在这些池中分配他们的分级和委派的 SQT (占其总SQT的百分比)。 索引者接受PAYG的每个项目都有奖励池。 并为索引者所缔结的每一项市场协定提供奖励库。

## 吸引委托者

指数化可以通过吸引委托者来增加他们的收入潜力。 委托者成员是 SQT 代币持有者，可以将其代币分配给索引者以获得额外奖励。 索引者使用这些额外的代币来增加分配给他们选择的项目的金额。 这使索引者能够增加收入。

索引者设置索引者的佣金率 (ICR) 是索引者赚取的百分比。 其余部分随后由索引者和所有代表按预定/授权数额分摊。 因此，索引者需要决定索引者希望保留的利润相对于与代表分享的数额的比例。 较低的ICR对委托方更有吸引力。

For example, Indexer A has set an ICR of 80% and has received SQT from 8 Delegators. This means that the 8 Delegators plus the Indexer itself, will be rewarded a share of the remaining 20% of what the Indexer has earned. The share will be split proportionally between them. Note that Delegators must have delegated their tokens for the entire Era to be eligible for these rewards. For more information on Delegators rewards, see [Delegators](./delegators.md).

## Becoming an Indexer

To become an Indexer on the SubQuery Network, the Indexer must possess the necessary hardware, run the required SubQuery services, have a publicly accessible network via a static IP or a domain name, and register as an Indexer.

### Indexer skillset

In general, an Indexer should be a technically proficient computer user. However, the simplicity of the SubQuery network and proposed frameworks allows even a junior developer to successfully participate.

A basic user should be familiar with provisioning and managing servers, installing the SubQuery CLI tools, database management, and basic networking. More experienced users may run nodes in a clustered environment, incorporate monitoring and alerts and also more advanced networking management.

Finally, interested parties should be prepared to invest time in maintaining their indexing nodes and infrastructure.

### Staking requirements

Indexers are expected to stake and maintain a minimum amount of tokens. This is to ensure that Indexers have some skin in the game and are committed to supporting the network. SubQuery is yet to determine this but it is one of our [design philosophies](./design-philosophy.md) that this be as low and as accessible as possible.

Should an Indexer experience a slashable event and their staked SQT balance fall below the minimum required, they will have to top up their staked SQT in order to continue to earn rewards from their work.

### Hardware requirements

Indexers can either invest in their own infrastructure hardware or rent infrastructure from the likes of AWS, Google Cloud, Digital Ocean, Microsoft Azure etc.

### Maintenance/operational requirements

Here are some of the maintenance and/or operational requirements Indexers should expect:

- Always upgrade to the latest Subquery software version.
- Identify and take advantage of new indexing opportunities.
- Update project version to latest and reindex where necessary.
- Infrastructure maintenance:
  - Constantly monitoring and upsizing disk.
  - Right size query and indexing compute based on traffic.
  - Increase query services for increasing ingress traffic.

### Infrastructure

The minimum infrastructure requirement includes:

- At least one computational node to run the following services:
  - [Node (indexing) Service](https://www.npmjs.com/package/@subql/node).
  - [Query Service](https://www.npmjs.com/package/@subql/query).
  - [Indexer Coordinator Service](https://www.npmjs.com/package/@subql/indexer-coordinator).
- One database node to run Postgresql db (v12 and above).

More detailed information will come soon.

## Security & Performance considerations

Security and performance considerations are as follows.

### Operator Wallets

Secure storage of an Indexer’s wallet recovery seed phrase is highly recommended.

### Firewalls

Indexers need to keep security front of mind. Infrastructure security, in particular firewalls, should be implemented to prevent public exposure to personal ports.

Secure passwords should be used by default and password rotation policies should be considered.

### Indexer’s Performance

In order to generate desirable performances, Indexers need to consider various factors such as:

- the balance between their own stake and that of Delegators.
- the type of contract being served. The Indexer will receive all the query fees if it is a closed contract. If it is open, then an Indexer’s reward will depend on how many other Indexers there are.
- fulfilling of the Service Level Agreement (SLA) specifications (to avoid slashing penalties).
- the accuracy of the data being served to avoid slashing penalties.

## 选择SubQuery项目到索引

索引者在选择要索引的SubQuery项目时需要考虑若干指标。

### 查询费用的商机

有些项目将有消费者公布的开放或封闭计划。

当一个消费者为一个项目发布一个开放或关闭的计划时， 它们最终具体说明它们愿意为一定数量的请求付款的程度。 消费者越愿意支付，项目就越吸引力越大。 它还使人相信，这个SubQuery项目很可能会有经常性的收入。

### 项目的复杂性

项目在计算要求方面会有差异。 简单的项目只能索引几个参数，而较复杂的项目则需要更多的计算资源和更多的带宽。 索引者需要了解项目的复杂性及其硬件能力。

### 索引者比赛

最受欢迎的项目提供了一个高查询量，吸引了大量索引者。 这也意味着奖励将由更多的人分享。 单个索引者的份额可能低于较不受欢迎的项目，但查询费略低，但索引者却少得多。

### 价格策略

索引者需要了解他们的操作成本和预期收入，以了解他们的突破点。 以下是一些考虑因素：

- 索引者应如何确定其计划价格？
- 索引者能以何种价格接受一项服务协议？

### 广告

索引员需要将自己广告给代表和消费者。 索引者可以从自己的网站、SubQuery论坛或被认为必要的任何其他地方这样做。 提供资料的一些例子包括：

- 索引者或索引者团队的背景和经验。
- 硬件方法和为什么它提供了优秀的性能。
- 客户支持政策或服务级协议。
- 历史优秀成绩的证据。

### 客户支持

非常鼓励索引员向客户提供一种沟通方法，让他们报告不存在的情况，并提供反馈。
