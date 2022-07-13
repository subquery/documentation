# Añadir funciones

## Agrupar por

SubQuery soporta funciones avanzadas de agregación para permitirle realizar un cálculo de un conjunto de valores durante su consulta.

Las funciones agregadas se usan normalmente con la función GroupBy en su consulta.

GroupBy le permite obtener rápidamente distintos valores en un conjunto de SubQuery en una sola consulta.

![Graphql Groupby](/assets/img/graphql_aggregation.png)

## Funciones avanzadas de agregación

SubQuery proporciona las siguientes funciones de agregación cuando está en modo inseguro:

- `suma` (se aplica a campos tipo número) - el resultado de agregar todos los valores juntos
- `distinctCount` (se aplica a todos los campos) - el recuento del número de valores distintos
- `min` (se aplica a campos tipo número) - el valor más pequeño
- `max` (se aplica a campos tipo número) - el mayor valor
- `promedio` (se aplica a campos tipo número) - el valor promedio (media aritmética)
- `stddevSample` (se aplica a campos tipo número) - la desviación estándar de la muestra de los valores
- `stddevPopulation` (se aplica a campos tipo número) - la desviación estándar de la población de los valores
- `varianceSample` (se aplica a campos tipo número) - variación de la muestra de los valores
- `variancePopulation` (aplica a campos tipo número) - la variación poblacional de los valores

SubQuery's implementation of aggregate functions is based on [pg-aggregates](https://github.com/graphile/pg-aggregates), you can find more information there.

**Please note that you must enable the `--unsafe` flag on the query service in order to use these functions. [Read more](./references.md#unsafe-2). Note that the `--unsafe` command will prevent your project from being run in the SubQuery Network, and you must contact support if you want this command to be run with your project in [SubQuery's managed service](https://project.subquery.network))**.
