# Creare un progetto SubQuery

Nella guida [avvio rapido](/quickstart/quickstart.md), abbiamo eseguito molto velocemente un esempio per darvi un assaggio di cosa sia la SubQuery e come funzioni. Qui daremo un'occhiata più da vicino al flusso di lavoro durante la creazione del tuo progetto e ai file chiave con cui lavorerai.

## Esempi di Subquery

Alcuni degli esempi seguenti presuppongono che tu abbia inizializzato con successo lo starter package nella sezione [Inizio rapido](../quickstart/quickstart.md). Da questo pacchetto di partenza, cammineremo attraverso il processo standard per personalizzare e implementare il tuo progetto SubQuery.

1. Initialise your project using `subql init PROJECT_NAME`.
2. Aggiorna il file Manifest (`project.yaml`) per includere informazioni sulla tua blockchain e le entità che mapperai - vedi [Manifest File](./manifest.md)
3. Crea entità GraphQL nel tuo schema (`schema.graphql`) che definiscono la forma dei dati che estrarrai e persisterai per l'interrogazione - vedi [GraphQL Schema](./graphql.md)
4. Aggiungi tutte le funzioni di mappatura (ad esempio `mappingHandlers.ts`) che desideri invocare per trasformare i dati della catena nelle entità GraphQL che hai definito - vedi [Mapping](./mapping.md)
5. Genera, costruisci e pubblica il tuo codice nei progetti SubQuery (o eseguilo nel tuo nodo locale) - vedi [Eseguire e interrogare il tuo progetto iniziale](./quickstart.md#running-and-querying-your-starter-project) nella nostra guida rapida.

## Struttura dell'elenco

La mappa seguente fornisce una panoramica della struttura delle directory di un progetto SubQuery quando viene eseguito il comando `init`.

```
- project-name
  L package.json
  L project. aml
  L README.md
  L schema.graphql
  L tsconfig. son
  L docker-compose.yml
  L src
    L index. s
    Mappature L
      L mappingHandlers.ts
  L .gitignore
```

Example

![Struttura della directory SubQuery](/assets/img/subQuery_directory_stucture.png)

## Generazione del codice

Ogni volta che cambiate le vostre entità GraphQL, dovete rigenerare la vostra directory dei tipi con il seguente comando.

```
yarn codegen
```

Questo creerà una nuova directory (o aggiornerà quella esistente) `src/types` che contiene le classi entità generate per ogni tipo che hai definito precedentemente in `schema.graphql`. Queste classi forniscono il caricamento sicuro delle entità, l'accesso in lettura e scrittura ai campi delle entità - vedi di più su questo processo in [the GraphQL Schema](./graphql.md).

## Build

Per eseguire il tuo progetto SubQuery su un SubQuery Node ospitato localmente, devi prima costruire il tuo lavoro.

Eseguite il comando di compilazione dalla directory principale del progetto.

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
