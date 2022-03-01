# Añadir funciones

## Agrupar por

SubQuery soporta funciones avanzadas de agregación para permitirle realizar un cálculo de un conjunto de valores durante su consulta.

Las funciones agregadas se usan normalmente con la función GroupBy en su consulta.

GroupBy le permite obtener rápidamente distintos valores en un conjunto de SubQuery en una sola consulta.

![Grupo Graphql](/assets/img/graphql_aggregation.png)

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

La implementación de funciones agregadas de SubQuery se basa en [pg-aggregates](https://github.com/graphile/pg-aggregates), puedes encontrar más información allí

**Tenga en cuenta que debe habilitar la bandera `--unsafe` en el servicio de consultas para poder usar estas funciones. [Leer más](../references/references.md#unsafe-2). Ten en cuenta que el comando `--unsafe` evitará que tu proyecto se ejecute en SubQuery Network, y debe ponerse en contacto con el soporte técnico si desea que este comando se ejecute con su proyecto en el servicio administrado de SubQuery ([proyecto. ubquery.network](https://project.subquery.network))**
