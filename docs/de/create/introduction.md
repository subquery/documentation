# Die Erstellung eines SubQuery-Projekts

In der [Kurzanleitung](/quickstart/quickstart.md) haben wir sehr schnell ein Beispiel durchgespielt, um Ihnen einen Vorgeschmack darauf zu geben, was SubQuery ist und wie es funktioniert. Hier sehen wir uns den Workflow bei der Erstellung Ihres Projektes und die Schlüsseldateien, mit denen Sie arbeiten, genauer an.

## Der grundlegende Arbeitsablauf

Bei einigen der folgenden Beispiele wird davon ausgegangen, dass Sie das Startpaket im Abschnitt [Schnellstart](../quickstart/quickstart.md) erfolgreich initialisiert haben. Von diesem Startpaket aus durchlaufen wir den Standardprozess zum Anpassen und der Implementierung Ihres SubQuery-Projektes.

1. Initialisieren Sie Ihr Projekt mit `subql init PROJECT_NAME`.
2. Aktualisieren Sie die Manifestdatei (`project.yaml`), um Informationen über Ihre Blockchain und die Entitäten aufzunehmen, die Sie zuordnen werden – siehe [Manifestdatei](./manifest.md)
3. Erstellen Sie GraphQL-Entitäten in Ihrem Schema (`schema.graphql`), die die Form der Daten definieren, die Sie extrahieren und für Abfragen beibehalten – siehe [GraphQL-Schema](./graphql.md)
4. Fügen Sie alle Mapping-Funktionen (zB `mappingHandlers.ts`) hinzu, die Sie aufrufen möchten, um Chain-daten in die von Ihnen definierten GraphQL-Entitäten umzuwandeln - siehe [Mapping](./mapping.md)
5. Generieren, erstellen und veröffentlichen Sie Ihren Code in SubQuery-Projekten (oder führen Sie ihn in Ihrem eigenen lokalen Knoten aus) – siehe [Starterprojekt ausführen und abfragen](./quickstart.md#running-and-querying-your-starter-project) in unserer Kurzanleitung.

## Verzeichnisaufbau

Die folgende Karte bietet einen Überblick über die Verzeichnisstruktur eines SubQuery-Projekts, wenn der Befehl `init` ausgeführt wird.

```
- project-name
  L package.json
  L project.yaml
  L README.md
  L schema.graphql
  L tsconfig.json
  L docker-compose.yml
  L src
    L index.ts
    L mappings
      L mappingHandlers.ts
  L .gitignore
```

Zum Beispiel:

![SubQuery-Verzeichnisstruktur](/assets/img/subQuery_directory_stucture.png)

## Codegenerierung

Immer wenn Sie Ihre GraphQL-Entitäten ändern, müssen Sie Ihr Typenverzeichnis mit dem folgenden Befehl neu generieren.

```
yarn codegen
```

Dadurch wird ein neues Verzeichnis `src/types` erstellt (oder das vorhandene aktualisiert), das generierte Entitätsklassen für jeden Typ enthält, den Sie zuvor in `schema.graphql` definiert haben. Diese Klassen bieten typsicheres Laden von Entitäten sowie Lese- und Schreibzugriff auf Entitätsfelder – mehr über diesen Prozess erfahren Sie im [GraphQL-Schema](./graphql.md).

## Build

Um Ihr SubQuery-Projekt auf einer lokal gehosteten SubQuery-Node auszuführen, müssen Sie zuerst Ihre Arbeit erstellen.

Führen Sie den Build-Befehl im Stammverzeichnis des Projekts aus.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

### Alternative Build-Optionen

Wir unterstützen zusätzliche Erstellungsoptionen für SubQuery-Projekte mit `subql build`.

Damit können Sie zusätzliche Einstiegspunkte definieren, die mithilfe des Felds exports in package.json erstellt werden sollen.

```json
"name": "project-name",
"version": "1.0.0",
...
"exports": {
  "entry_one": "./src/entry_one.ts",
  "entry_renamed": "./src/entry_two.ts"
},
```

Durch Ausführen von `subql build` wird dann ein Dist-Ordner mit der folgenden Struktur generiert:

```
- project-name
  L dist
    L entry_one.js
    L entry_renamed.js
    L index.js 
```

Beachten Sie, dass `index.ts` erstellt wird, unabhängig davon, ob dies im Exportfeld angegeben ist oder nicht.

Weitere Informationen zur Verwendung einschließlich Flags finden Sie unter [CLI-Referenz](https://doc.subquery.network/references/references/#build).

## Logging

Die Methode `console.log` wird **nicht mehr unterstützt**. Stattdessen wurde ein `Logger`-Modul in die Typen eingefügt, was bedeutet, dass wir einen Logger unterstützen können, der verschiedene Protokollierungsebenen akzeptieren kann.

```typescript
logger.info('Info level message');
logger.debug('Debugger level message');
logger.warn('Warning level message');
```

Um `logger.info` oder `logger.warn` zu verwenden, platzieren Sie einfach die Zeile in Ihrer Zuordnungsdatei.

![logging.info](/assets/img/logging_info.png)

Um `logger.debug` zu verwenden, ist ein zusätzliches Flag erforderlich. Fügen Sie Ihrer Befehlszeile `--log-level=debug` hinzu.

Wenn Sie einen Docker-Container ausführen, fügen Sie diese Zeile zu Ihrer Datei `docker-compose.yaml` hinzu.

![logging.debug](/assets/img/logging_debug.png)

Sie sollten jetzt die neue Protokollierung auf dem Terminalbildschirm sehen.

![logging.debug](/assets/img/subquery_logging.png)
