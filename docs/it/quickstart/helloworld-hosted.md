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

Creiamo un progetto chiamato subql_hellowworld ed eseguiamo l'obbligatorio install, codegen e build con il vostro gestore di pacchetti preferito.

```shell
> subql init --starter subqlHelloWorld
yarn install
yarn codegen
yarn build
```

NON eseguire i comandi docker però.

## 2. Creare un repo GitHub

Create a GitHub repo. Fornisci un nome e imposta la tua visibilità su pubblico. Qui, tutto è mantenuto come predefinito per ora.

![create github repo](/assets/img/github_create_new_repo.png)

Prendi nota del tuo URL GitHub, questo deve essere pubblico perché SubQuery possa accedervi.

![create github repo](/assets/img/github_repo_url.png)

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

![First commit](/assets/img/first_commit.png)

Ora che hai messo il tuo codice su GitHub, vediamo come possiamo ospitarlo in SubQuery Projects.

## 4. Crea il tuo progetto

Vai a [https://project.subquery.network](https://project.subquery.network) e accedi con il tuo account GitHub.

![Welcome to SubQuery Projects](/assets/img/welcome_to_subquery_projects.png)

Poi crea un nuovo progetto,

![Welcome to SubQuery Projects](/assets/img/subquery_create_project.png)

E riempire i vari campi con i dettagli appropriati.

- **Account GitHub:** Se hai più di un account GitHub, seleziona con quale account sarà creato questo progetto. I progetti creati in un account dell'organizzazione GitHub sono condivisi tra i membri di quell'organizzazione.
- **Nome del progetto:** Dai un nome al tuo progetto qui.
- **Sottotitolo:** Fornisci un sottotitolo per il tuo progetto.
- **Descrizione:** Spiega cosa fa il tuo progetto SubQuery.
- **GitHub Repository URL:** Questo deve essere un URL GitHub valido per un repository pubblico che contiene il tuo progetto SubQuery. Il file schema.graphql deve essere nella root della vostra directory.
- **Nascondi progetto:** Se selezionato, questo nasconderà il progetto dall'esploratore pubblico di SubQuery. Tieni questo non selezionato se vuoi condividere la tua SubQuery con la comunità!

![Create SubQuery parameters](/assets/img/create_subquery_project_parameters.png)

Quando clicchi su crea, verrai portato alla tua dashboard.

![SubQuery Project dashboard](/assets/img/subquery_project_dashboard.png)

La dashboard contiene molte informazioni utili come la rete che sta usando, l'URL del repository GitHub del codice sorgente che sta eseguendo, quando è stato creato e aggiornato l'ultima volta, e in particolare i dettagli di distribuzione.

## 5. Step 5: Deploy your project

Now that you have created your project within SubQuery Projects, setting up the display behaviour, the next step is to deploy your project making it operational. Deploying a version triggers a new SubQuery indexing operation to start, and sets up the required query service to start accepting GraphQL requests. You can also deploy new versions to existing projects here.

You can choose to deploy to various environments such as a production slot or a staging slot. Here we'll deploy to a production slot. Clicking on the "Deploy" button brings up a screen with the following fields:

![Deploy to production slot](/assets/img/deploy_production_slot.png)

- **Commit Hash of new Version:** From GitHub select the correct commit of the SubQuery project codebase that you want deployed
- **Indexer Version:** This is the version of SubQuery's node service that you want to run this SubQuery on. See [@subql/node](https://www.npmjs.com/package/@subql/node)
- **Query Version:** This is the version of SubQuery's query service that you want to run this SubQuery on. See [@subql/query](https://www.npmjs.com/package/@subql/query)

Because we only have one commit, there is only a single option in the drop down. We'll also work with the latest version of the indexer and query version so we will accept the defaults and then click "Deploy Update".

You’ll then see your deployment in “Processing” status. Here, your code is getting deployed onto the SubQuery's managed infrastructure. Basically a server is getting spun up on demand and being provisioned for you. This will take a few minutes so time to grab a coffee!

![Deployment processing](/assets/img/deployment_processing.png)

The deployment is now running.

![Deployment running](/assets/img/deployment_running.png)

## 6. Step 6: Testing your project

To test your project, click on the 3 ellipsis and select "View on SubQuery Explorer".

![View Subquery project](/assets/img/view_on_subquery.png)

This will take you to the ever familiar "Playground" where you can click the play button and see the results of the query.

![Subquery playground](/assets/img/subquery_playground.png)

## 7. Step 7: Bonus step

For the astute amongst us, you will recall that in the learning objectives, the last point was to run a simple GET query. To do this, we will need to grab the "Query Endpoint" displayed in the deployment details.

![Query endpoing](/assets/img/query_endpoint.png)

You can then send a GET request to this endpoint either using your favourite client such as [Postman](https://www.postman.com/) or [Mockoon](https://mockoon.com/) or via cURL in your terminal. For simplicity, cURL will be shown below.

The curl command to run is:

```shell
curl https://api.subquery.network/sq/seandotau/subqueryhelloworld -d "query=query { starterEntities (first: 5, orderBy: CREATED_AT_DESC) { totalCount nodes { id field1 field2 field3 } } }"
```

giving the results of:

```shell
{"data":{"starterEntities":{"totalCount":23098,"nodes":[{"id":"0x29dfe9c8e5a1d51178565c2c23f65d249b548fe75a9b6d74cebab777b961b1a6","field1":23098,"field2":null,"field3":null},{"id":"0xab7d3e0316a01cdaf9eda420cf4021dd53bb604c29c5136fef17088c8d9233fb","field1":23097,"field2":null,"field3":null},{"id":"0x534e89bbae0857f2f07b0dea8dc42a933f9eb2d95f7464bf361d766a644d17e3","field1":23096,"field2":null,"field3":null},{"id":"0xd0af03ab2000a58b40abfb96a61d312a494069de3670b509454bd06157357db6","field1":23095,"field2":null,"field3":null},{"id":"0xc9f5a92f4684eb039e11dffa4b8b22c428272b2aa09aff291169f71c1ba0b0f7","field1":23094,"field2":null,"field3":null}]}}}

```

Readability is not a concern here as you will probably have some front end code to consume and parse this JSON response.

## Summary

In this SubQuery hosted quick start we showed how quick and easy it was to take a Subql project and deploy it to [SubQuery Projects](https://project.subquery.network) where all the infrastructure is provided for your convenience. There is an inbuilt playground for running various queries as well as an API endpoint for your code to integrate with.
