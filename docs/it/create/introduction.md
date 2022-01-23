# Creare un progetto SubQuery

Nella guida [avvio rapido](/quickstart/quickstart.md), abbiamo eseguito molto velocemente un esempio per darvi un assaggio di cosa sia la SubQuery e come funzioni. Qui daremo un'occhiata più da vicino al flusso di lavoro durante la creazione del tuo progetto e ai file chiave con cui lavorerai.

## Esempi di Subquery

Alcuni degli esempi seguenti presuppongono che tu abbia inizializzato con successo lo starter package nella sezione [Inizio rapido](../quickstart/quickstart.md). Da questo pacchetto di partenza, cammineremo attraverso il processo standard per personalizzare e implementare il tuo progetto SubQuery.

1. Inizializza il tuo progetto usando `subql init --specVersion 0.2.0 PROJECT_NAME`. in alternativa potete usare la vecchia versione delle specifiche `subql init PROJECT_NAME`
2. Aggiorna il file Manifest (`project.yaml`) per includere informazioni sulla tua blockchain e le entità che mapperai - vedi [Manifest File](./manifest.md)
3. Crea entità GraphQL nel tuo schema (`schema.graphql`) che definiscono la forma dei dati che estrarrai e persisterai per l'interrogazione - vedi [GraphQL Schema](./graphql.md)
4. Aggiungi tutte le funzioni di mappatura (ad esempio `mappingHandlers.ts`) che desideri invocare per trasformare i dati della catena nelle entità GraphQL che hai definito - vedi [Mapping](./mapping.md)
5. Genera, costruisci e pubblica il tuo codice nei progetti SubQuery (o eseguilo nel tuo nodo locale) - vedi [Eseguire e interrogare il tuo progetto iniziale](./quickstart.md#running-and-querying-your-starter-project) nella nostra guida rapida.

## Struttura dell'elenco

The following map provides an overview of the directory structure of a SubQuery project when the `init` command is run.

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

Example

![SubQuery directory structure](/assets/img/subQuery_directory_stucture.png)

## Code Generation

Whenever you change your GraphQL entities, you must regenerate your types directory with the following command.

```
yarn codegen
```

This will create a new directory (or update the existing) `src/types` which contain generated entity classes for each type you have defined previously in `schema.graphql`. These classes provide type-safe entity loading, read and write access to entity fields - see more about this process in [the GraphQL Schema](./graphql.md).

## Build

In order to run your SubQuery Project on a locally hosted SubQuery Node, you need to first build your work.

Run the build command from the project's root directory.

<CodeGroup> The `console.log` method is **no longer supported**. Instead, a `logger` module has been injected in the types, which means we can support a logger that can accept various logging levels.

```typescript
logger.info('Info level message');
logger.debug('Debugger level message');
logger.warn('Warning level message');
```

To use `logger.info` or `logger.warn`, just place the line into your mapping file.

![logging.info](/assets/img/logging_info.png)

To use `logger.debug`, an additional step is required. Add `--log-level=debug` to your command line.

If you are running a docker container, add this line to your `docker-compose.yaml` file.

![logging.debug](/assets/img/logging_debug.png)

You should now see the new logging in the terminal screen.

![logging.debug](/assets/img/subquery_logging.png)
