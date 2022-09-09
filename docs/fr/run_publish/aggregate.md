# Fonctions d'agrégation

## Grouper par

SubQuery prend en charge des fonctions d'agrégation avancées qui vous permettent d'effectuer un calcul sur un ensemble de valeurs pendant votre requête.

Les fonctions d'agrégation sont généralement utilisées avec la fonction GroupBy dans votre requête.

La fonction GroupBy vous permet d'obtenir rapidement des valeurs distinctes dans un ensemble de SubQuery en une seule requête.

![Graphql Groupby](/assets/img/graphql_aggregation.png)

## Fonctions d'agrégation avancées

SubQuery fournit les fonctions d'agrégation suivantes lorsqu'il est en mode non sécurisé :

- `sum` (s'applique aux champs de type nombre) - le résultat de l'addition de toutes les valeurs.
- `distinctCount` (s'applique à tous les champs) - le compte du nombre de valeurs distinctes.
- `min` (s'applique aux champs de type nombre) - la plus petite valeur
- `max` (s'applique aux champs de type nombre) - la plus grande valeur
- `average` (s'applique aux champs de type nombre) - la valeur moyenne (moyenne arithmétique)
- `stddevSample` (s'applique aux champs de type nombre) - l'écart type de l'échantillon des valeurs.
- `stddevPopulation` (s'applique aux champs de type numérique) - l'écart type de la population des valeurs.
- `varianceSample` (s'applique aux champs de type numérique) - la variance de l'échantillon des valeurs.
- `variancePopulation` (s'applique aux champs de type nombre) - la variance de la population des valeurs.

SubQuery's implementation of aggregate functions is based on [pg-aggregates](https://github.com/graphile/pg-aggregates), you can find more information there.

::: warning Important Please note that you must enable the `--unsafe` flag on the query service in order to use these functions. [Read more](./references.md#unsafe-2).

Also, note that the `--unsafe` command will prevent your project from being run in the SubQuery Network, and you must contact support if you want this command to be run with your project in [SubQuery's managed service](https://project.subquery.network). :::
