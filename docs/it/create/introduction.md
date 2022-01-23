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

<CodeGroup> The `console.log` method is **no longer supported**. Invece, un modulo `logger` è stato iniettato nei tipi, il che significa che possiamo supportare un logger che può accettare vari livelli di registrazione.

```typescript
logger.info('Info level message');
logger.debug('Debugger level message');
logger.warn('Warning level message');
```

Per utilizzare `logger.info` o `logger.warn`, basta posizionare la riga nel file di mappatura.

![logging.info](/assets/img/logging_info.png)

Per usare `logger.debug`, è necessario un ulteriore passo. Aggiungi `--log-level=debug` alla riga di comando.

Se stai eseguendo un contenitore docker, aggiungi questa linea al tuo file `docker-compose.yaml`.

![logging.debug](/assets/img/logging_debug.png)

Ora dovresti vedere il nuovo log nella schermata del terminale.

![logging.debug](/assets/img/subquery_logging.png)
