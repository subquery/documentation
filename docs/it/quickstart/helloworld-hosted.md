# Ciao mondo (SubQuery hosted)

Lo scopo di questo avvio rapido è mostrare come si può ottenere il progetto di avvio predefinito in esecuzione in SubQuery Projects (il nostro servizio gestito) in pochi semplici passi.

Prenderemo il semplice progetto iniziale (e tutto ciò che abbiamo imparato finora) ma invece di eseguirlo localmente in Docker, approfitteremo dell'infrastruttura di hosting gestito di SubQuery. In altre parole, lasciamo che SubQuery faccia tutto il lavoro pesante, eseguendo e gestendo l'infrastruttura di produzione.

## Obiettivi di apprendimento

Alla fine di questo inizio rapido, dovreste:

- capire i pre-requisiti richiesti
- essere in grado di ospitare un progetto in [Progetti SubQuery](https://project.subquery.network/)
- eseguire una semplice query per ottenere l'altezza del blocco della mainnet Polkadot utilizzando il parco giochi
- eseguire una semplice query GET per ottenere l'altezza del blocco della mainnet Polkadot usando cURL

## Pubblico interessato

Questa guida è orientata ai nuovi sviluppatori che hanno qualche esperienza di sviluppo e sono interessati a saperne di più su SubQuery.

## Video guida

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/b-ba8-zPOoo" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Prerequisiti

Avrete bisogno di:

- un account GitHub

## 1. Crea il tuo progetto

Let's create a project called subqlHelloWorld by running `subql init` and selecting to build the project with the `Polkadot` network and initialize the project with the `subql-starter` template. We must run the obligatory install, codegen and build with your favourite package manager.

```shell
> subql init subqlHelloWorld
yarn install
yarn codegen
yarn build
```

NON eseguire i comandi docker però.

## 2. Creare un repo GitHub

Create a GitHub repo. Fornisci un nome e imposta la tua visibilità su pubblico. Qui, tutto è mantenuto come predefinito per ora.

![creare repo github](/assets/img/github_create_new_repo.png)

Prendi nota del tuo URL GitHub, questo deve essere pubblico perché SubQuery possa accedervi.

![creare repo github](/assets/img/github_repo_url.png)

## 3. Spingi su GitHub

Di nuovo nella directory del vostro progetto, inizializzatelo come una directory git. Altrimenti, potresti ottenere l'errore "fatal: not a git repository (or any of the parent directories): .git"

```shell
git init
```

Poi aggiungi un repository remoto con il comando:

```shell
git remote add origin https://github.com/seandotau/subqlHelloWorld.git
```

Questo fondamentalmente imposta il tuo repository remoto su "https://github.com/seandotau/subqlHelloWorld.git" e gli dà il nome "origin" che è la nomenclatura standard per un repository remoto in GitHub.

Poi aggiungiamo il codice al nostro repo con i seguenti comandi:

```shell
> git add .
> git commit -m "First commit"
[master (root-commit) a999d88] First commit
10 files changed, 3512 insertions(+)
create mode 100644 .gitignore
create mode 100644 README.md
create mode 100644 docker-compose.yml
create mode 100644 package.json
create mode 100644 project.yaml
create mode 100644 schema.graphql
create mode 100644 src/index.ts
create mode 100644 src/mappings/mappingHandlers.ts
create mode 100644 tsconfig.json
create mode 100644 yarn.lock
> git push origin master
Enumerating objects: 14, done.
Counting objects: 100% (14/14), done.
Delta compression using up to 12 threads
Compressing objects: 100% (13/13), done.
Writing objects: 100% (14/14), 59.35 KiB | 8.48 MiB/s, done.
Total 14 (delta 0), reused 0 (delta 0)
To https://github.com/seandotau/subqlHelloWorld.git
 * [new branch]      master -> master

```

Il comando push significa "per favore spingi il mio codice nel repo di origine dal mio repo locale master". Aggiornare GitHub dovrebbe mostrare tutto il codice in GitHub.

![Primo commit](/assets/img/first_commit.png)

Ora che hai messo il tuo codice su GitHub, vediamo come possiamo ospitarlo in SubQuery Projects.

## 4. Crea il tuo progetto

Vai a [https://project.subquery.network](https://project.subquery.network) e accedi con il tuo account GitHub.

![Benvenuti a SubQuery Projects](/assets/img/welcome_to_subquery_projects.png)

Poi crea un nuovo progetto,

![Benvenuto nei progetti di SubQuery](/assets/img/subquery_create_project.png)

E riempire i vari campi con i dettagli appropriati.

- **Account GitHub:** Se hai più di un account GitHub, seleziona con quale account sarà creato questo progetto. I progetti creati in un account dell'organizzazione GitHub sono condivisi tra i membri di quell'organizzazione.
- **Nome del progetto:** Dai un nome al tuo progetto qui.
- **Sottotitolo:** Fornisci un sottotitolo per il tuo progetto.
- **Descrizione:** Spiega cosa fa il tuo progetto SubQuery.
- **GitHub Repository URL:** Questo deve essere un URL GitHub valido per un repository pubblico che contiene il tuo progetto SubQuery. Il file schema.graphql deve essere nella root della vostra directory.
- **Nascondi progetto:** Se selezionato, questo nasconderà il progetto dall'esploratore pubblico di SubQuery. Tieni questo non selezionato se vuoi condividere la tua SubQuery con la comunità!

![Creare parametri di SubQuery](/assets/img/create_subquery_project_parameters.png)

Quando clicchi su crea, verrai portato alla tua dashboard.

![Dashboard Progetto di SubQuery](/assets/img/subquery_project_dashboard.png)

La dashboard contiene molte informazioni utili come la rete che sta usando, l'URL del repository GitHub del codice sorgente che sta eseguendo, quando è stato creato e aggiornato l'ultima volta, e in particolare i dettagli di distribuzione.

## 5. Distribuisci il tuo progetto

Ora che hai creato il tuo progetto in SubQuery Projects, impostando il comportamento di visualizzazione, il prossimo passo è quello di distribuire il tuo progetto rendendolo operativo. Il deploy di una versione fa partire una nuova operazione di indicizzazione SubQuery e imposta il servizio di query richiesto per iniziare ad accettare richieste GraphQL. Qui puoi anche distribuire le nuove versioni ai progetti esistenti.

Potete scegliere di distribuire in vari ambienti come uno slot di produzione o uno slot di staging. Qui faremo il deploy su uno slot di produzione. Cliccando sul pulsante "Deploy" si apre una schermata con i seguenti campi:

![Distribuisci a slot di produzione](/assets/img/deploy_production_slot.png)

- **Commit Hash della nuova versione:** Da GitHub seleziona il commit corretto del codice base del progetto SubQuery che vuoi distribuire
- **Indexer Version:** This is the version of SubQuery's node service that you want to run this SubQuery on. Vedere [@subql/node](https://www.npmjs.com/package/@subql/node)
- **Query Version:** Questa è la versione del servizio di query di SubQuery su cui si vuole eseguire questa SubQuery. Vedere [@subql/query](https://www.npmjs.com/package/@subql/query)

Poiché abbiamo solo un commit, c'è solo una singola opzione nel drop down. Lavoreremo anche con l'ultima versione dell'indicizzatore e della query, quindi accetteremo i valori predefiniti e poi cliccheremo su "Deploy Update".

Vedrai quindi il tuo deployment in stato di "Processing". Qui, il tuo codice viene distribuito sull'infrastruttura gestita della SubQuery. Fondamentalmente un server viene fatto girare su richiesta e viene fornito per voi. Questo richiederà qualche minuto, quindi è tempo di prendere un caffè!

![Elaborazione distribuzione](/assets/img/deployment_processing.png)

Il deployment è ora in esecuzione.

![Distribuzione in corso](/assets/img/deployment_running.png)

## 6. Testare il tuo progetto

Per testare il tuo progetto, clicca sulle 3 ellissi e seleziona "View on SubQuery Explorer".

![Visualizza per progetto](/assets/img/view_on_subquery.png)

Questo vi porterà al sempre familiare "Playground" dove potete cliccare sul pulsante play e vedere i risultati della query.

![Parco giochi delle subquery](/assets/img/subquery_playground.png)

## 7. Passo bonus

Per gli astuti, ricorderete che negli obiettivi di apprendimento, l'ultimo punto era quello di eseguire una semplice query GET. Per fare questo, avremo bisogno di prendere il "Query Endpoint" visualizzato nei dettagli della distribuzione.

![Fine della query](/assets/img/query_endpoint.png)

Potete quindi inviare una richiesta GET a questo endpoint utilizzando il vostro client preferito come [Postman](https://www.postman.com/) o [Mockoon](https://mockoon.com/) o tramite cURL nel vostro terminale. Per semplicità, cURL sarà mostrato di seguito.

Il comando curl da eseguire è:

```shell
curl https://api.subquery.network/sq/seandotau/subqueryhelloworld -d "query=query { starterEntities (first: 5, orderBy: CREATED_AT_DESC) { totalCount nodes { id field1 field2 field3 } } }"
```

dando i risultati di:

```shell
{"data":{"starterEntities":{"totalCount":23098,"nodes":[{"id":"0x29dfe9c8e5a1d51178565c2c23f65d249b548fe75a9b6d74cebab777b961b1a6","field1":23098,"field2":null,"field3":null},{"id":"0xab7d3e0316a01cdaf9eda420cf4021dd53bb604c29c5136fef17088c8d9233fb","field1":23097,"field2":null,"field3":null},{"id":"0x534e89bbae0857f2f07b0dea8dc42a933f9eb2d95f7464bf361d766a644d17e3","field1":23096,"field2":null,"field3":null},{"id":"0xd0af03ab2000a58b40abfb96a61d312a494069de3670b509454bd06157357db6","field1":23095,"field2":null,"field3":null},{"id":"0xc9f5a92f4684eb039e11dffa4b8b22c428272b2aa09aff291169f71c1ba0b0f7","field1":23094,"field2":null,"field3":null}]}}}

```

La leggibilità non è una preoccupazione qui, poiché probabilmente avrete del codice front-end per consumare ed analizzare questa risposta JSON.

## Riassunto

In questo avvio rapido di SubQuery hosted abbiamo mostrato quanto fosse facile e veloce prendere un progetto Subql e distribuirlo su [Progetti SubQuery](https://project.subquery.network) dove tutta l'infrastruttura è fornita per la vostra comodità. C'è un parco giochi integrato per l'esecuzione di varie query, nonché un endpoint API per l'integrazione del vostro codice.
