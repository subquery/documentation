# Ciao Mondo (localhost & Docker)

Benvenuti a questo inizio rapido di SubQuery Hello World. L'avvio rapido ha lo scopo di mostrarvi come far funzionare il progetto iniziale predefinito in Docker in pochi semplici passi.

## Obiettivi di apprendimento

Alla fine di questo inizio rapido, dovreste:

- capire i pre-requisiti richiesti
- capire i comandi comuni di base
- essere in grado di navigare verso localhost:3000 e visualizzare il parco giochi
- eseguire una semplice query per ottenere l'altezza del blocco della rete principale Polkadot

## Pubblico interessato

Questa guida è orientata ai nuovi sviluppatori che hanno qualche esperienza di sviluppo e sono interessati a saperne di più su SubQuery.

## Video guida

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/j034cyUYb7k" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Prerequisiti

Avrete bisogno di:

- yarn or npm package manager
- SubQuery CLI (`@subql/cli`)
- Docker

Potete eseguire i seguenti comandi in un terminale per vedere se avete già qualcuno di questi pre-requisiti.

```shell
yarn -v (or npm -v)
subql -v
docker -v
```

Per gli utenti più avanzati, copiate e incollate quanto segue:

```shell
echo -e "My yarn version is:" `yarn -v` "\nMy subql version is:" `subql -v`  "\nMy docker version is:" `docker -v`
```

Questo dovrebbe restituire: (per gli utenti di npm, sostituire yarn con npm

```shell
My yarn version is: 1.22.10
My subql version is: @subql/cli/0.9.3 darwin-x64 node-v16.3.0
My docker version is: Docker version 20.10.5, build 55c4c88
```

Se si ottiene quanto sopra, allora si è pronti a partire. In caso contrario, seguite questi link per installarli:

- [yarn](https://classic.yarnpkg.com/en/docs/install/) or [npm](https://www.npmjs.com/get-npm)
- [SubQuery CLI](quickstart.md#install-the-subquery-cli)
- [Docker](https://docs.docker.com/get-docker/)

## 1. Initialise project

Il primo passo per iniziare con SubQuery è eseguire il comando `subql init`. Inizializziamo un progetto iniziale con il nome `subqlHelloWorld`. Si noti che solo l'autore è obbligatorio. Tutto il resto è lasciato vuoto sotto.

```shell
> subql init subqlHelloWorld
? Select a network Polkadot
? Select a template project subql-starter     Starter project for subquery
Cloning project... done
RPC endpoint: [wss://polkadot.api.onfinality.io/public-ws]:
Git repository [https://github.com/subquery/subql-starter]:
Fetching network genesis hash... done
Author [Ian He & Jay Ji]:
Description [This project can be use as a starting po...]:
Version [0.0.4]:
License [MIT]:
Preparing project... done
subqlHelloWorld is ready

```

Non dimenticate di cambiare in questa nuova directory.

```shell
cd subqlHelloWorld
```

## 2. Install dependencies

Ora fate un'installazione di yarn o node per installare le varie dipendenze.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm install ``` </CodeGroupItem> </CodeGroup>

An example of `yarn install`

```shell
> yarn install
yarn install v1.22.10
info No lockfile found.
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
✨  Done in 31.84s.
```

## 3. Generate code

Ora esegui `yarn codegen` per generare Typescript dallo schema GraphQL.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

An example of `yarn codegen`

```shell
> yarn codegen
yarn run v1.22.10
$ ./node_modules/.bin/subql codegen
===============================
---------Subql Codegen---------
===============================
* Schema StarterEntity generated !
* Models index generated !
* Types index generated !
✨  Done in 1.02s.
```

**Attenzione** Quando vengono fatte delle modifiche al file dello schema, ricordatevi di rieseguire `yarn codegen` per rigenerare la vostra directory dei tipi.

## 4. Build code

Il prossimo passo è costruire il codice con `yarn build`.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

An example of `yarn build`

```shell
> yarn build
yarn run v1.22.10
$ tsc -b
✨  Done in 5.68s.
```

## 5. Run Docker

L'uso di Docker permette di eseguire questo esempio molto rapidamente perché tutta l'infrastruttura necessaria può essere fornita all'interno dell'immagine Docker. Run `docker-compose pull && docker-compose up`.

Questo darà il via a tutto, dove alla fine si otterrà che i blocchi vengano recuperati.

```shell
> #SNIPPET
subquery-node_1   | 2021-06-05T22:20:31.450Z <subql-node> INFO node started
subquery-node_1   | 2021-06-05T22:20:35.134Z <fetch> INFO fetch block [1, 100]
subqlhelloworld_graphql-engine_1 exited with code 0
subquery-node_1   | 2021-06-05T22:20:38.412Z <fetch> INFO fetch block [101, 200]
graphql-engine_1  | 2021-06-05T22:20:39.353Z <nestjs> INFO Starting Nest application...
graphql-engine_1  | 2021-06-05T22:20:39.382Z <nestjs> INFO AppModule dependencies initialized
graphql-engine_1  | 2021-06-05T22:20:39.382Z <nestjs> INFO ConfigureModule dependencies initialized
graphql-engine_1  | 2021-06-05T22:20:39.383Z <nestjs> INFO GraphqlModule dependencies initialized
graphql-engine_1  | 2021-06-05T22:20:39.809Z <nestjs> INFO Nest application successfully started
subquery-node_1   | 2021-06-05T22:20:41.122Z <fetch> INFO fetch block [201, 300]
graphql-engine_1  | 2021-06-05T22:20:43.244Z <express> INFO request completed

```

## 6. Browse playground

Naviga su http://localhost:3000/ e incolla la query qui sotto nella parte sinistra dello schermo e poi premi il pulsante play.

```
{
 query{
   starterEntities(last:10, orderBy:FIELD1_ASC ){
     nodes{
       field1
     }
   }
 }
}

```

SubQuery playground su localhost.

![playground localhost](/assets/img/subql_playground.png)

Il conteggio dei blocchi nel parco giochi dovrebbe corrispondere al conteggio dei blocchi (tecnicamente l'altezza dei blocchi) anche nel terminale.

## Riassunto

In questo avvio rapido, abbiamo dimostrato i passi di base per ottenere un progetto iniziale e funzionante in un ambiente Docker e poi abbiamo navigato verso localhost:3000 ed eseguito una query per restituire il numero di blocco della rete principale Polkadot.
