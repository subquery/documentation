# Aggregate Functions

:::warning Not supported in Subgraph Query Service

This feature is only supported in the SubQuery Native query service, not the Subgraph query service.

:::

## Group By

SubQuery supports advanced aggregate functions to allow you to perform a calculation on a set of values during your query.

Aggregate functions are usually used with the GroupBy function in your query.

GroupBy allows you to quickly get distinct values in a set from SubQuery in a single query.

![GraphQL Groupby](/assets/img/run_publish/graphql_aggregation.png)

## Advanced Aggregate Functions

SubQuery provides the following aggregate functions when in unsafe mode:

- `sum` (applies to number-like fields) - the result of adding all the values together
- `distinctCount` (applies to all fields) - the count of the number of distinct values
- `min` (applies to number-like fields) - the smallest value
- `max` (applies to number-like fields) - the greatest value
- `average` (applies to number-like fields) - the average (arithmetic mean) value
- `stddevSample` (applies to number-like fields) - the sample standard deviation of the values
- `stddevPopulation` (applies to number-like fields) - the population standard deviation of the values
- `varianceSample` (applies to number-like fields) - the sample variance of the values
- `variancePopulation` (applies to number-like fields) - the population variance of the values

SubQuery's implementation of aggregate functions is based on [pg-aggregates](https://github.com/graphile/pg-aggregates), you can find more information there.

::: warning Important
Please note that you must enable the `--unsafe` flag on the query service in order to use these functions. [Read more](../references.md#unsafe-query-service).

:::
