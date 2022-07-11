# 聚集函数

## 分组依据

SubQuery 支持高级的总函数，以便您在查询期间能够对一组值进行计算。

聚合函数通常与组一起使用。在您的查询中使用按函数。

Groupby 允许您在一个查询中快速获取一个从SubQuery 集中的不同值。

![Graphql Groupby](/assets/img/graphql_合计.png)

## 高级聚合函数

在不安全模式下，SubQuery 提供以下汇总功能：

- `sum` (适用于像数字一样的字段) - 将所有值一起添加到一起的结果
- `distCount` (适用于所有字段) - 不同值的数量
- `min` (适用于类似数字的字段) - 最小值
- `max` (适用于类似数字的字段) - 最大值
- `average` (适用于类似数字的字段) - 平均值 (计算值)
- `stddev示例` (适用于类似数字的字段) - 示例标准偏差
- `stddevPopulation` (适用于类似数字的字段) - 示例标准偏差
- `varianceSample` (适用于类似数字的字段) - 值的样本变化量
- `variancePopulation` (适用于类似数字的字段) - 值的人口变化量

SubQuery对总函数的实现基于 [pg-aggregates](https://github.com/graphile/pg-aggregates)，您可以在那里找到更多的信息

**请注意，您必须在查询服务上启用 `--safe` 标志才能使用这些函数。 [Read more](./references.md#unsafe-2). Note that the `--unsafe` command will prevent your project from being run in the SubQuery Network, and you must contact support if you want this command to be run with your project in [SubQuery's managed service](https://project.subquery.network))**
