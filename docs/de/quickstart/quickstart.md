# Schnellstartanleitung

In dieser Kurzanleitung erstellen wir ein einfaches Starterprojekt, das Sie als Framework für die Entwicklung Ihres eigenen SubQuery-Projekts verwenden können.

Am Ende dieses Handbuchs haben Sie ein funktionierendes SubQuery-Projekt, das auf einer SubQuery-Node mit einem GraphQL-Endpunkt ausgeführt wird, von dem Sie Daten abfragen können.

Falls noch nicht geschehen, empfehlen wir Ihnen, sich mit der [Terminologie](../#terminology) vertraut zu machen, die in SubQuery verwendet wird.

## Vorbereitung

### Lokale Entwicklungsumgebung

- [Typescript](https://www.typescriptlang.org/) ist erforderlich, um Projekte zu kompilieren und Typen zu definieren.
- Sowohl die SubQuery-CLI als auch das generierte Projekt haben Abhängigkeiten und erfordern eine moderne Version [Node](https://nodejs.org/en/).
- SubQuery-Nodes erfordern Docker

### Installieren Sie die SubQuery-CLI

Installieren Sie SubQuery CLI global auf Ihrem Terminal, indem Sie NPM verwenden:

```shell
# NPM
npm install -g @subql/cli
```

Beachten Sie bitte, dass wir **NICHT** zur Verwendung von `yarn global` ermutigen, da dies aufgrund seines schlechten Abhängigkeitsmanagements zu Fehlern auf der ganzen Linie führen kann.

Sie können dann die Hilfe ausführen, um die verfügbaren Befehle und die Verwendung anzuzeigen, die von CLI bereitgestellt werden

```shell
subql help
```

## Initialisieren Sie das Starter-SubQuery-Projekt

Ersetzen Sie in dem Verzeichnis, in dem Sie ein SubQuery-Projekt erstellen möchten, einfach `PROJECT_NAME` durch Ihr eigenes und führen Sie den Befehl aus:

```shell
subql init --starter PROJECT_NAME
```

Beim Initialisieren des SubQuery-Projekts werden Ihnen bestimmte Fragen gestellt:

- Git repository (Optional): Provide a Git URL to a repo that this SubQuery project will be hosted in (when hosted in SubQuery Explorer)
- RPC endpoint (Required): Provide a wss URL to a running RPC endpoint that will be used by default for this project. You can quickly access public endpoints for different Polkadot networks or even create your own private dedicated node using [OnFinality](https://app.onfinality.io) or just use the default Polkadot endpoint.
- Authors (Required): Enter the owner of this SubQuery project here
- Description (Optional): You can provide a short paragraph about your project that describe what data it contains and what users can do with it
- Version (Required): Enter a custom version number or use the default (`1.0.0`)
- License (Required): Provide the software license for this project or accept the default (`Apache-2.0`)

After the initialisation process is complete, you should see a folder with your project name has been created inside the directory. The contents of this directoy should be identical to what's listed in the [Directory Structure](../create/introduction.md#directory-structure).

Last, under the project directory, run following command to install the new project's dependencies.

<CodeGroup> cd PROJECT_NAME # Yarn yarn install # NPM npm install You will mainly be working on the following files:

- The Manifest in `project.yaml`
- The GraphQL Schema in `schema.graphql`
- The Mapping functions in `src/mappings/` directory

For more information on how to write your own SubQuery, check out our documentation under [Create a Project](../create/introduction.md)

### GraphQL Model Generation

In order to [index](../run/run.md) your SubQuery project, you must first generate the required GraphQL models that you have defined in your GraphQL Schema file (`schema.graphql`). Run this command in the root of the project directory.

<CodeGroup> # Yarn yarn codegen # NPM npm run-script codegen

## Build the Project

In order run your SubQuery Project on a locally hosted SubQuery Node, you need to build your work.

Führen Sie den Build-Befehl aus dem Stammverzeichnis des Projekts aus.

<CodeGroup> All configuration that controls how a SubQuery node is run is defined in this `docker-compose.yml` file. For a new project that has been just initalised you won't need to change anything here, but you can read more about the file and the settings in our [Run a Project section](../run/run.md)

Under the project directory run following command:

```shell
docker-compose pull && docker-compose up
```

It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you'll see a running SubQuery node.

### Query your Project

Open your browser and head to [http://localhost:3000](http://localhost:3000).

You should see a GraphQL playground is showing in the explorer and the schemas that are ready to query. On the top right of the playground, you'll find a _Docs_ button that will open a documentation draw. Diese Dokumentation wird automatisch generiert und hilft Ihnen zu finden, welche Entitäten und Methoden Sie abfragen können.

For a new SubQuery starter project, you can try the following query to get a taste of how it works or [learn more about the GraphQL Query language](../query/graphql.md).

```graphql
{
  query {
    starterEntities(first: 10) {
      nodes {
        field1
        field2
        field3
      }
    }
  }
}
```

## Next Steps

Congratulations, you now have a locally running SubQuery project that accepts GraphQL API requests for sample data. In the next guide, we'll show you how to publish your new project to [SubQuery Projects](https://project.subquery.network) and query it using our [Explorer](https://explorer.subquery.network)

[Publish your new project to SubQuery Projects](../publish/publish.md)
