# Installierung von SubQuery

Beim Erstellen eines SubQuery-Projekts sind verschiedene Komponenten erforderlich. Das Tool [@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) wird verwendet, um SubQuery-Projekte zu erstellen. Die Komponente [@subql/node](https://github.com/subquery/subql/tree/docs-new-section/packages/node) ist zum Ausführen eines Indexers erforderlich. Die Bibliothek [@subql/query](https://github.com/subquery/subql/tree/docs-new-section/packages/query) ist zum Generieren von Abfragen erforderlich.

## Installieren Sie bitte @subql/cli

Das Tool [@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) hilft beim Erstellen eines Projektrahmens oder -gerüsts, sodass Sie nicht bei Null anfangen müssen.

Installieren Sie SubQuery CLI global auf Ihrem Terminal, indem Sie Yarn oder NPM verwenden:

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/cli ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/cli ``` </CodeGroupItem> </CodeGroup>

Sie können dann help ausführen, um die verfügbaren Befehle und die Nutzung anzuzeigen, die von der CLI bereitgestellt werden:

```shell
subql help
```
## Installieren Sie bitte @subql/node

Eine SubQuery-Node ist eine Implementierung, die substratbasierte Blockchain-Daten pro SubQuery-Projekt extrahiert und in einer Postgres-Datenbank speichert.

Installieren Sie die SubQuery-Node global auf Ihrem Terminal, indem Sie Yarn oder NPM verwenden:

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/node ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/node ``` </CodeGroupItem> </CodeGroup>

Nach der Installation können Sie eine Node starten mit:

```shell
subql-node <command>
```
> Hinweis: Wenn Sie Docker verwenden oder Ihr Projekt in SubQuery-Projekten hosten, können Sie diesen Schritt überspringen. Dies liegt daran, dass die SubQuery-Node bereits im Docker-Container und der Hosting-Infrastruktur bereitgestellt wird.

## Installieren Sie bitte @subql/query

Die SubQuery-Abfragebibliothek stellt einen Dienst bereit, mit dem Sie Ihr Projekt in einer "Spielplatz"-Umgebung über Ihren Browser abfragen können.

Installieren Sie die SubQuery-Abfrage global auf Ihrem Terminal, indem Sie Yarn oder NPM verwenden:

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/query ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/query ``` </CodeGroupItem> </CodeGroup>

> Hinweis: Wenn Sie Docker verwenden oder Ihr Projekt in SubQuery-Projekten hosten, können Sie diesen Schritt auch überspringen. Dies liegt daran, dass die SubQuery-Node bereits im Docker-Container und der Hosting-Infrastruktur bereitgestellt wird. 