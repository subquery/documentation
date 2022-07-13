# Агрегираща функция

## Групиране по

SubQuery поддържа разширени агрегатни функции, които ви позволяват да извършвате изчисление на набор от стойности по време на вашата заявка.

Агрегатните функции обикновено се използват с функцията GroupBy във вашата заявка.

GroupBy ви позволява бързо да получите набор от различни стойности от SubQuery в една заявка.

![Graphql Groupby](/assets/img/graphql_aggregation.png)

## Разширени агрегатни функции

SubQuery предоставя следните агретатни функции, когато е в небезопасен режим:

- `sum` (отнася се за полета, подобни на числа) - резултат от събирането на всички стойности заедно
- `distinctCount` (прилага се за всички полета) - броят на различни стойности
- `min` (отнася се за полета, подобни на числа) - най-малката стойност
- `max` (отнася се за полета, подобни на числа) - най-голямата стойност
- `average` (отнася се за полета, подобни на числа) - средната (средноаритметична) стойност
- `stddevSample` (отнася се за полета, подобни на числа) - стандартното отклонение на извадката на стойностите
- `stddevPopulation` (прилага се за полета, подобни на числа) - стандартното отклонение на популацията на стойностите
- `varianceSample` (отнася се за полета, подобни на числа) - примерната дисперсия на стойностите
- `variancePopulation` (отнася се за полета, подобни на числа) - дисперсията на населението на стойността

Внедряването на агрегатните функции на SubQuery се основава на [pg-aggregates](https://github.com/graphile/pg-aggregates), можете да намерите повече информация там.

::: warning Important Please note that you must enable the `--unsafe` flag on the query service in order to use these functions. [Прочетете още](./references.md#unsafe-2).

Also, note that the `--unsafe` command will prevent your project from being run in the SubQuery Network, and you must contact support if you want this command to be run with your project in [SubQuery's managed service](https://project.subquery.network). :::
