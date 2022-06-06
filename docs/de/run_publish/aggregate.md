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

**Bitte beachten Sie, dass Sie das Flag `--unsafe` im Abfragedienst aktivieren müssen, um diese Funktionen nutzen zu können. [Lesen Sie mehr](./references.md#unsafe-2). Beachten Sie, dass der Befehl `--unsafe` verhindert, dass Ihr Projekt im SubQuery-Netzwerk ausgeführt wird, und Sie müssen sich an den Support wenden, wenn Sie möchten, dass dieser Befehl mit Ihrem Projekt im verwalteten Dienst von SubQuery ausgeführt wird ([project.subquery.network](https://project.subquery.network))**
