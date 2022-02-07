# Aggregatfunktionen

## Gruppiere nach

SubQuery unterstützt erweiterte Aggregatfunktionen, damit Sie während Ihrer Abfrage eine Berechnung für eine Reihe von Werten durchführen können.

Aggregatfunktionen werden normalerweise mit der GroupBy-Funktion in Ihrer Abfrage verwendet.

Mit GroupBy können Sie in einer einzigen Abfrage schnell unterschiedliche Werte in einem Satz aus SubQuery abrufen.

![Graphql Groupby](/assets/img/graphql_aggregation.png)

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

SubQuery's implementation of aggregate functions is based on [pg-aggregates](https://github.com/graphile/pg-aggregates), you can find more information there

**Please note that you must enable the `--unsafe` flag on the query service in order to use these functions. [Read more](../references/references.md#unsafe-2). Note that the `--unsafe` command will prevent your project from being run in the SubQuery Network, and you must contact support if you want this command to be run with your project in SubQuery's managed service ([project.subquery.network](https://project.subquery.network))**
