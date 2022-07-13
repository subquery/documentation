# Агрегатные функции

## Группировка

SubQuery поддерживает расширенные агрегатные функции, позволяющие выполнять вычисления для набора значений во время запроса.

Агрегатные функции обычно используются вместе с функцией GroupBy в запросе.

GroupBy позволяет быстро получить различные значения в наборе от SubQuery в одном запросе.

![Graphql Groupby](/assets/img/graphql_aggregation.png)

## Расширенные агрегатные функции

SubQuery предоставляет следующие агрегатные функции в небезопасном режиме:

- ` sum ` (применяется к полям, подобным числам) - результат сложения всех значений вместе
- `distinctCount` (применяется ко всем полям) - подсчет количества отдельных значений
- `min` (применяется к полям, подобным числам) - наименьшее значение
- `max` (применяется к полям, подобным числам) - наибольшее значение
- ` average ` (применяется к полям типа числа) - среднее (среднеарифметическое) значение
- `stddevSample` (применяется к полям, подобным числам) - выборочное стандартное отклонение значений
- `stddevPopulation` (применяется к полям, подобным числам) - популяционное стандартное отклонение значений
- `varianceSample` (применяется к полям, подобным числам) - выборочная дисперсия значений
- `variancePopulation` (применяется к полям, подобным числам) - дисперсия популяции значений

SubQuery's implementation of aggregate functions is based on [pg-aggregates](https://github.com/graphile/pg-aggregates), you can find more information there.

**Please note that you must enable the `--unsafe` flag on the query service in order to use these functions. [Read more](./references.md#unsafe-2). Note that the `--unsafe` command will prevent your project from being run in the SubQuery Network, and you must contact support if you want this command to be run with your project in [SubQuery's managed service](https://project.subquery.network))**.
