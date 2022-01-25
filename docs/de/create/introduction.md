# Die Erstellung eines SubQuery-Projekts

In der [Kurzanleitung](/quickstart/quickstart.md) haben wir sehr schnell ein Beispiel durchgespielt, um Ihnen einen Eindruck davon zu geben, was SubQuery ist und wie es funktioniert. Hier sehen wir uns den Workflow bei der Erstellung Ihres Projektes und die Schlüsseldateien, mit denen Sie arbeiten, genauer an.

## Der grundlegende Arbeitsablauf

Einige der folgenden Beispiele gehen davon aus, dass Sie das Startpaket im Abschnitt [Schnellstart](../quickstart/quickstart.md) erfolgreich initialisiert haben. Von diesem Startpaket aus durchlaufen wir den Standardprozess zum Anpassen und der Implementierung Ihres SubQuery-Projektes.

1. Initialise your project using `subql init PROJECT_NAME`.
2. Aktualisieren Sie die Manifestdatei (`project.yaml`), um Informationen über Ihre Blockchain und die zuzuordnenden Entitäten aufzunehmen – siehe [Manifestdatei](./manifest.md)
3. Erstellen Sie GraphQL-Entitäten in Ihrem Schema (`schema.graphql`), die die Form der Daten definieren, die Sie extrahieren und für die Abfrage beibehalten – siehe [GraphQL-Schema](./graphql.md)
4. Fügen Sie alle Mapping-Funktionen (zB `mappingHandlers.ts`) hinzu, die Sie aufrufen möchten, um Chain-daten in die von Ihnen definierten GraphQL-Entitäten umzuwandeln - siehe [Mapping](./mapping.md)
5. Generieren, erstellen und veröffentlichen Sie Ihren Code in SubQuery-Projekten (oder führen Sie ihn in Ihrem eigenen lokalen Knoten aus) - siehe [Starterprojekt ausführen und abfragen](./quickstart.md#running-and-querying-your-starter-project) in unserer Kurzanleitung.

## Verzeichnisaufbau

Die folgende Übersicht bietet einen Überblick über die Verzeichnisstruktur eines SubQuery-Projekts, wenn der Befehl `init` ausgeführt wird.

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

Dadurch wird ein neues Verzeichnis erstellt (oder das vorhandene aktualisiert) `src/types`, das generierte Entitätsklassen für jeden Typ enthält, den Sie zuvor in `schema.graphql` definiert haben. Diese Klassen bieten typsicheres Laden von Entitäten sowie Lese- und Schreibzugriff auf Entitätsfelder. Weitere Informationen zu diesem Prozess finden Sie im [GraphQL-Schema](./graphql.md).

## Build

Um Ihr SubQuery-Projekt auf einem lokal gehosteten SubQuery-Knoten auszuführen, müssen Sie zuerst Ihre Arbeit erstellen.

Führen Sie den Build-Befehl aus dem Stammverzeichnis des Projekts aus.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

### Alternative build options

We support additional build options for subquery projects using `subql build`.

With this you can define additional entry points to build using the exports field in package.json.

```json
"name": "project-name",
"version": "1.0.0",
...
"exports": {
  "entry_one": "./src/entry_one.ts",
  "entry_renamed": "./src/entry_two.ts"
},
```

Then by running `subql build` it will generate a dist folder with the following structure:

```
- project-name
  L dist
    L entry_one.js
    L entry_renamed.js
    L index.js 
```

Note that it will build `index.ts` whether or not it is specified in the exports field.

For more information on using this including flags, see [cli reference](https://doc.subquery.network/references/references/#build).

## Logging

The `console.log` method is **no longer supported**. Instead, a `logger` module has been injected in the types, which means we can support a logger that can accept various logging levels.

```typescript
logger.info('Info level message');
logger.debug('Debugger level message');
logger.warn('Warning level message');
```

To use `logger.info` or `logger.warn`, just place the line into your mapping file.

![logging.info](/assets/img/logging_info.png)

To use `logger.debug`, an additional flag is required. Add `--log-level=debug` to your command line.

If you are running a docker container, add this line to your `docker-compose.yaml` file.

![logging.debug](/assets/img/logging_debug.png)

You should now see the new logging in the terminal screen.

![logging.debug](/assets/img/subquery_logging.png)
