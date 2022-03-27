# Hello World (localhost & Docker)

Herzlich Willkommen bei dieser Schnellstartanleitung für SubQuery Hallo die Welt. Der Schnellstart soll Ihnen zeigen, wie Sie in wenigen einfachen Schritten das Standard-Starterprojekt in Docker zum Laufen bringen.

## Lernziele

Am Ende dieses Schnellstarts sollten Sie:

- die erforderlichen Voraussetzungen verstehen
- die grundlegenden allgemeinen Befehle verstehen
- in der Lage sein, zu localhost:3000 zu navigieren und den Playground anzuzeigen
- eine einfache Abfrage ausführen, um die Blockhöhe des Polkadot-Mainnets zu erhalten

## Zielgruppe

Dieses Handbuch richtet sich an neue Entwickler, die über einige Entwicklungserfahrungen verfügen und daran interessiert sind, mehr über SubQuery zu erfahren.

## Videoanleitung

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/j034cyUYb7k" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Voraussetzungen

Was Sie noch brauchen:

- yarn- oder npm-Paketmanager
- SubQuery CLI (`@subql/cli`)
- Docker

Sie können die folgenden Befehle in einem Terminal ausführen, um festzustellen, ob Sie bereits über eine dieser Voraussetzungen verfügen.

```shell
yarn -v (or npm -v)
subql -v
docker -v
```

Für fortgeschrittene Benutzer kopieren Sie Folgendes und fügen Sie es ein:

```shell
echo -e "My yarn version is:" `yarn -v` "\nMy subql version is:" `subql -v`  "\nMy docker version is:" `docker -v`
```

Dies sollte zurückgeben: (für npm-Benutzer, yarn durch npm ersetzen)

```shell
Meine Yarn-version ist: 1.22.10
Meine Subql-Version ist: @subql/cli/0.9.3 darwin-x64 node-v16.3.0
Meine Docker-Version ist: Docker-version 20.10.5, build 55c4c88
```

Wenn Sie das oben genannte erhalten, können Sie loslegen. Wenn nicht, folgen Sie diesen Links, um sie zu installieren:

- [yarn](https://classic.yarnpkg.com/en/docs/install/) or [npm](https://www.npmjs.com/get-npm)
- [SubQuery CLI](quickstart.md#install-the-subquery-cli)
- [Docker](https://docs.docker.com/get-docker/)

## 1. Projekt initialisieren

Der erste Schritt beim Starten mit SubQuery besteht darin, den Befehl `subql init` auszuführen. Lassen Sie uns ein Startprojekt mit dem Namen `subqlHelloWorld` initialisieren. Beachten Sie, dass nur der Autor obligatorisch ist. Alle andere wird unten leer gelassen.

```shell
> subql init subqlHelloWorld
? Wählen Sie einen Netzwerk-Polkadot aus
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

Vergessen Sie nicht, in dieses neue Verzeichnis zu wechseln.

```shell
cd subqlHelloWorld
```

## 2. Abhängigkeiten installieren

Führen Sie nun eine Yarn- oder Nodeinstallation durch, um die verschiedenen Abhängigkeiten zu installieren.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm install ``` </CodeGroupItem> </CodeGroup>

Beispiel von`yarn install`

```shell
> yarn install
yarn install v1.22.10
info No lockfile found.
[1/4] 🔍 Pakete werden aufgelöst...
[2/4] 🚚 Pakete werden abgerufen...
[3/4] 🔗 Abhängigkeiten verknüpfen...
[4/4] 🔨 Neue Pakete erstellen...
success Saved lockfile.
✨ Fertig in 31,84s.
```

## 3. Code generieren

Führen Sie nun `yarn codegen` aus, um Typescript aus dem GraphQL-Schema zu generieren.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

Beispiel von `yarn codegen`

```shell
> yarn codegen
yarn run v1.22.10
$ ./node_modules/.bin/subql codegen
===============================
---------Subql Codegen---------
===============================
* Schema StarterEntity generated !
* Modellindex wurde generiert !
* Typenindex wurde generiert !
✨  Fertig in 1.02s.
```

**Warnung** Wenn Änderungen an der Schemadatei vorgenommen werden, denken Sie bitte daran, `yarn codegen` erneut auszuführen, um Ihr Typenverzeichnis neu zu generieren.

## 4. Code erstellen

Der nächste Schritt besteht darin, den Code mit `yarn build` zu erstellen.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

Beispiel von`yarn build`

```shell
> yarn build
yarn run v1.22.10
$ tsc -b
✨  Fertig in 5.68s.
```

## 5. Run Docker

Mit Docker können Sie dieses Beispiel sehr schnell ausführen, da die gesamte erforderliche Infrastruktur im Docker-Image bereitgestellt werden kann. Führen Sie `docker-compose pull && docker-compose up`.

Dies wird alles zum Leben erwecken, wo irgendwann Blöcke geholt werden.

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

## 6. Browse Playground

Navigieren Sie zu http://localhost:3000/ und fügen Sie die Abfrage unten in die linke Seite des Bildschirms ein und drücken Sie dann die Wiedergabetaste.

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

SubQuery Playground auf Localhost.

![Playground-Localhost](/assets/img/subql_playground.png)

Die Blockanzahl auf dem Spielplatz sollte auch mit der Blockanzahl (technisch die Blockhöhe) im Terminal übereinstimmen.

## Zusammenfassung

In diesem Schnellstart haben wir die grundlegenden Schritte demonstriert, um ein Starterprojekt in einer Docker-Umgebung zum Laufen zu bringen, und dann zu localhost:3000 navigiert und eine Abfrage ausgeführt, um die Blocknummer des Mainnet-Polkadot-Netzwerks zurückzugeben.
