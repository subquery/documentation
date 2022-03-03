# Eseguire la Subquery localmente

Questa guida spiega come eseguire un nodo locale di SubQuery sulla tua infrastruttura, che include sia l'indicizzatore che il servizio di query. Non vuoi preoccuparti di gestire la tua infrastruttura SubQuery? SubQuery fornisce un [servizio gestito in hosting](https://explorer.subquery.network) alla comunità gratuitamente. [Segui la nostra guida alla pubblicazione](../run_publish/publish.md) per vedere come puoi caricare il tuo progetto su [SubQuery Projects](https://project.subquery.network).

## Usando Docker

Una soluzione alternativa è quella di eseguire un <strong>Docker Container</strong> definito dal `docker-compose.yml` file. Per un nuovo progetto che è stato appena inizializzato non avrete bisogno di cambiare nulla qui.

Sotto la directory del progetto eseguite il seguente comando:

```shell
docker-compose pull && docker-compose up
```

Potrebbe volerci del tempo per scaricare i pacchetti richiesti ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), e Postgres) per la prima volta, ma presto si vedrà un nodo SubQuery in esecuzione.

## Eseguire un indicizzatore (subql/node)

Requisiti:

- [Postgres](https://www.postgresql.org/) database (versione 12 o superiore). Mentre il [SubQuery node](#start-a-local-subquery-node) indicizza la blockchain, i dati estratti vengono memorizzati in un'istanza di database esterno.

Un nodo SubQuery è un'implementazione che estrae i dati della blockchain basati sul substrato secondo il progetto SubQuery e li salva in un database Postgres.

### Installazione

```shell
# NPM
npm install -g @subql/node
```

Si prega di notare che **NON** incoraggiamo l'uso di `yarn global` a causa della sua scarsa gestione delle dipendenze che può portare a un errore lungo la linea.

Una volta installato, potete avviare un nodo con il seguente comando:

```shell
subql-node <command>
```

### Comandi chiave

I seguenti comandi ti aiuteranno a completare la configurazione di un nodo SubQuery e a iniziare l'indicizzazione. Per saperne di più, puoi sempre eseguire `--help`.

#### Punta al percorso locale del progetto

```
subql-node -f your-project-path
```

#### Usare un dizionario

L'utilizzo di un dizionario a catena completo può accelerare drasticamente l'elaborazione di un progetto SubQuery durante i test o durante il vostro primo indice. In alcuni casi, abbiamo visto un aumento delle prestazioni di indicizzazione fino a 10 volte.

Un dizionario completo della catena pre-indicizza la posizione di tutti gli eventi e le estrinsecazioni all'interno della catena specifica e permette al tuo servizio di nodi di saltare alle posizioni rilevanti durante l'indicizzazione piuttosto che ispezionare ogni blocco.

Puoi aggiungere l'endpoint del dizionario nel tuo `project.yaml` file (vedere [Manifest File](../create/manifest.md)), o specificarlo in fase di esecuzione usando il seguente comando:

```
subql-node --network-dictionary=https://api.subquery.network/sq/subquery/dictionary-polkadot
```

[Leggi di più su come funziona un dizionario SubQuery](../academy/tutorials_examples/dictionary.md).

#### Connettersi al database

```
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
subql-node -f your-project-path
```

A seconda della configurazione del tuo database Postgres (ad esempio una password diversa per il database), assicurati anche che sia l'indicizzatore (`subql/node`) che il servizio di query (`subql/query`) possano stabilire una connessione ad esso.

#### Specificare un file di configurazione

```
subql-node -c your-project-config.yml
```

Questo punterà il nodo di query a un file di configurazione che può essere in formato YAML o JSON. Guarda l'esempio qui sotto.

```yaml
subquery: ../../../../subql-example/extrinsics
subqueryName: extrinsics
batchSize:100
localMode:true
```

#### Cambiare la dimensione del lotto di recupero dei blocchi

```
subql-node -f your-project-path --batch-size 200

Result:
[IndexerManager] fetch block [203, 402]
[IndexerManager] fetch block [403, 602]
```

Quando l'indicizzatore indicizza per la prima volta la catena, il recupero di singoli blocchi diminuisce significativamente le prestazioni. Aumentando la dimensione del batch per regolare il numero di blocchi recuperati si riduce il tempo complessivo di elaborazione. L'attuale dimensione predefinita del lotto è 100.

#### Eseguire in modalità locale

```
subql-node -f your-project-path --local
```

Per scopi di debug, gli utenti possono eseguire il nodo in modalità locale. Passare al modello locale creerà tabelle Postgres nello schema predefinito `public`.

Se non si usa la modalità locale, verrà creato un nuovo schema Postgres con l'iniziale `subquery_` e le corrispondenti tabelle del progetto.

#### Controlla la salute del tuo nodo

Ci sono 2 endpoint che puoi usare per controllare e monitorare la salute di un nodo SubQuery in esecuzione.

- Endpoint di verifica dello stato di salute che restituisce una semplice risposta 200
- Endpoint metadati che include ulteriori analisi del tuo nodo SubQuery in esecuzione

Aggiungilo all'URL di base del tuo nodo SubQuery. Eg `http://localhost:3000/meta` tornerà:

```bash
{
    "currentProcessingHeight": 1000699,
    "currentProcessingTimestamp": 1631517883547,
    "targetHeight": 6807295,
    "bestHeight": 6807298,
    "indexerNodeVersion": "0.19.1",
    "lastProcessedHeight": 1000699,
    "lastProcessedTimestamp": 1631517883555,
    "uptime": 41.151789063,
    "polkadotSdkVersion": "5.4.1",
    "apiConnected": true,
    "injectedApiConnected": true,
    "usingDictionary": false,
    "chain": "Polkadot",
    "specName": "polkadot",
    "genesisHash": "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3",
    "blockTime": 6000
}
```

`http://localhost:3000/health` restituirà HTTP 200 se ha successo.

Verrà restituito un errore 500 se l'indicizzatore non è sano. Questo può essere visto spesso quando il nodo si sta avviando.

```shell
{
    "status": 500,
    "error": "Indexer is not healthy"
}
```

Se viene utilizzato un URL errato, verrà restituito un errore 404 not found.

```shell
{
"statusCode": 404,
"message": "Cannot GET /healthy",
"error": "Not Found"
}
```

#### Debug del tuo progetto

Usate il [node inspector](https://nodejs.org/en/docs/guides/debugging-getting-started/) per eseguire il seguente comando.

```shell
node --inspect-brk <path to subql-node> -f <path to subQuery project>
```

Esempio:

```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Debugger listening on ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
Per aiuto, vedere: https://nodejs.org/en/docs/inspector
Debugger allegato.
```

Poi aprite gli strumenti di sviluppo di Chrome, andate su Source > Filesystem e aggiungi il tuo progetto all'area di lavoro e inizia il debug. Per ulteriori informazioni, controlla [How to debug a SubQuery project](https://doc.subquery.network/academy/tutorials_examples/debug-projects/)

## Eseguire un servizio di query (subql/query)

### Installazione

```shell
# NPM
npm install -g @subql/query
```

Si prega di notare che noi **NON** incoraggiamo l'uso di `yarn global` a causa della sua scarsa gestione delle dipendenze che può portare a un errore lungo la linea.

### Eseguire il servizio Query

``` export DB_HOST=localhost subql-query --name <project_name> --playground ````

Assicurati che il nome del progetto sia lo stesso di quando [inizializzi il progetto](../quickstart/quickstart.md#initialise-the-starter-subquery-project). Inoltre, controllate che le variabili d'ambiente siano corrette.

Dopo aver eseguito con successo il servizio subql-query, apri il tuo browser e vai a `http://localhost:3000`. Dovresti vedere un campo da gioco GraphQL nell'Explorer e lo schema pronto per essere interrogato.
