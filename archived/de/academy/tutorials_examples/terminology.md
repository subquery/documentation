# Terminologie

- SubQuery-Projekt (_wo die Magie passiert_): Eine Definition ([`@subql/cli`](https://www.npmjs.com/package/@subql/cli)), wie eine SubQuery-Node ein Projektnetzwerk durchlaufen und aggregieren soll und wie die Daten transformiert und gespeichert werden sollen, um nützliche GraphQL-Abfragen zu ermöglichen
- SubQuery-Node (_wo die Arbeit erledigt wird_): Ein Paket ([`@subql/node`](https://www.npmjs.com/package/@subql/node)), das eine SubQuery-Projektdefinition akzeptiert und eine ausführte Node, die ein verbundenes Netzwerk ständig mit einer Datenbank indiziert
- SubQuery-Abfragedienst (_woher wir die Daten beziehen_): Ein Paket ([`@subql/query`](https://www.npmjs.com/package/@subql/query)), das mit der GraphQL-API eines bereitgestellten SubQuery-Node zum Abfragen und Anzeigen der indizierten Daten
- GraphQL (_wie wir die Daten abfragen_): Eine Abfragesprache für APIs, die speziell für flexible graphbasierte Daten geeignet ist – siehe [graphql.org](https://graphql.org/learn/)
