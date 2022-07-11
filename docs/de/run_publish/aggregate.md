# Aggregatfunktionen

## Gruppiere nach

SubQuery unterstützt erweiterte Aggregatfunktionen, damit Sie während Ihrer Abfrage eine Berechnung für eine Reihe von Werten durchführen können.

Aggregatfunktionen werden normalerweise mit der GroupBy-Funktion in Ihrer Abfrage verwendet.

Mit GroupBy können Sie in einer einzigen Abfrage schnell unterschiedliche Werte in einem Satz aus SubQuery abrufen.

![Graphql Groupby](/assets/img/graphql_aggregation.png)

## Erweiterte Aggregatfunktionen

SubQuery bietet im unsicheren Modus die folgenden Aggregatfunktionen:

- `sum` (gilt für zahlenähnliche Felder) – das Ergebnis der Addition aller Werte
- `distinctCount` (gilt für alle Felder) - die Anzahl der unterschiedlichen Werte
- `min` (gilt für zahlenähnliche Felder) - der kleinste Wert
- `max` (gilt für zahlenähnliche Felder) - der größte Wert
- `average` (gilt für zahlenähnliche Felder) - der durchschnittliche (arithmetische Mittelwert).
- `stddevSample` (gilt für zahlenähnliche Felder) - die Stichproben-Standardabweichung der Werte
- `stddevPopulation` (gilt für zahlenähnliche Felder) - die Grundgesamtheits-Standardabweichung der Werte
- `varianceSample` (gilt für zahlenähnliche Felder) - die Stichprobenvarianz der Werte
- `variancePopulation` (gilt für zahlenähnliche Felder) - die Populationsvarianz der Werte

Die Implementierung von Aggregatfunktionen in SubQuery basiert auf [pg-aggregates](https://github.com/graphile/pg-aggregates), weitere Info finden Sie dort

**Bitte beachten Sie, dass Sie das Flag `--unsafe` im Abfragedienst aktivieren müssen, um diese Funktionen nutzen zu können. [Read more](./references.md#unsafe-2). Note that the `--unsafe` command will prevent your project from being run in the SubQuery Network, and you must contact support if you want this command to be run with your project in [SubQuery's managed service](https://project.subquery.network))**
