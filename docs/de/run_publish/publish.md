# In Managed Services veröffentlichen

## Vorteile des Hostens Ihres Projekts mit dem Managed Service von SubQuery

Die größten dApps sind auf den Managed Service auf Unternehmensebene von SubQuery angewiesen – mit Hunderten von Millionen täglicher Anfragen und Hunderten von aktiven Projekten bietet der Managed Service von SubQuery branchenführendes Hosting für unsere Kunden.

- Wir führen Ihre SubQuery-Projekte für Sie in einem leistungsstarken, skalierbaren und verwalteten öffentlichen Dienst aus.
- Dieser Service wird der Community mit einem großzügigen kostenlosen Kontingent zur Verfügung gestellt! Sie können Ihre ersten beiden SubQuery-Projekte absolut kostenlos hosten!
- Sie können Ihre Projekte öffentlich machen, damit sie im [SubQuery Explorer](https://explorer.subquery.network) aufgelistet werden und jeder auf der ganzen Welt sie anzeigen kann.
- Wir sind in GitHub integriert, sodass jeder in Ihren GitHub-Organisationen freigegebene Organisationsprojekte anzeigen kann.

Sie können ein Upgrade durchführen, um die folgenden kostenpflichtigen Dienste zu nutzen:

- Produktionsreifes Hosting für geschäftskritische Daten mit Blue/Green-Bereitstellungen ohne Ausfallzeiten
- Dedizierte Datenbanken
- Mehrere georedundante Cluster und intelligentes Routing
- Erweiterte Überwachung und Analyse.

## Veröffentlichen Sie Ihr SubQuery-Projekt in IPFS

Bei der Bereitstellung für den Managed Service von SubQuery müssen Sie zuerst Ihre Codebasis in [IPFS](https://ipfs.io/) hosten. Das Hosten eines Projekts in IPFS macht es für alle verfügbar und verringert Ihre Abhängigkeit von zentralisierten Diensten wie GitHub.

:::Warnung GitHub-Bereitstellungsflows sind für IPFS veraltet

Wenn Ihr Projekt noch über GitHub bereitgestellt wird, lesen Sie den Migrationsleitfaden für IPFS-Bereitstellungen [hier](./ipfs.md) :::

### Anforderungen

- `@subql/cli` Version 0.21.0 oder höher.
- Manifest `specVersion` 1.0.0 und höher.
- Halten Sie Ihr [SUBQL_ACCESS_TOKEN](ipfs.md#prepare-your-subql-access-token) bereit.
- Um sicherzustellen, dass Ihre Bereitstellung erfolgreich ist, empfehlen wir dringend, dass Sie Ihr Projekt mit dem Befehl `subql build` erstellen und es vor der Veröffentlichung lokal testen.

### Bereiten Sie Ihr SUBQL_ACCESS_TOKEN vor

- Schritt 1: Gehen Sie zu [SubQuery Projects](https://project.subquery.network/) und melden Sie sich an.
- Schritt 2: Klicken Sie oben rechts im Navigationsmenü auf Ihr Profil und dann auf **_Token aktualisieren_**.
- Schritt 3: Kopieren Sie das generierte Token.
- Schritt 4: So verwenden Sie dieses Token:
  - Variante 1: Fügen Sie SUBQL_ACCESS_TOKEN zu Ihren Umgebungsvariablen hinzu. `EXPORT SUBQL_ACCESS_TOKEN=<token>` (Windows) oder `export SUBQL_ACCESS_TOKEN=<token>` (Mac/Linux)
  - Variante 2: Demnächst wird `subql/cli` das lokale Speichern Ihres SUBQL_ACCESS_TOKEN unterstützen.

### Wie kann man ein Projekt veröffentlichen?

Da Sie `@subql/cli` bereits installiert haben, können Sie den folgenden Befehl ausführen, der das Projekt und die erforderlichen Informationen aus seinem Standardmanifest `project.yaml` liest:

```
// Veröffentlichen Sie es aus dem Stammverzeichnis Ihres Projekts
subql publish

// OR point zu Ihrem Projektstamm
subql publish -f ~/my-project/
```

Angenommen, Ihr Projekt verfügt alternativ über mehrere Manifestdateien, Sie unterstützen beispielsweise mehrere Netzwerke, verwenden jedoch dieselbe Zuordnung und Geschäftslogik und haben eine Projektstruktur wie folgt:

```
L projectRoot
 L src/
 L package.json
 L polkadot.yaml (Manifest für das Polkadot-Netzwerk)
 L kusama.yaml   (Manifest für das Kusama-Netzwerk)
 ...
```

Sie können das Projekt jederzeit mit Ihrer ausgewählten Manifestdatei veröffentlichen.

```
 # Dadurch wird die Indexierung des Polkadot-Netzwerks zur Unterstützung des Projekts veröffentlicht
subql publish -f ~/my-projectRoot/polkadot.yaml
```

### Nach der Veröffentlichung

Nach erfolgreicher Veröffentlichung des Projekts zeigen die Protokolle unten, dass das Projekt auf dem IPFS-Cluster erstellt wurde und seine `CID` (Content Identifier) zurückgegeben hat.

```
Bau- und Verpackungscode ... fertig
Hochladen des SupQuery-Projekts in IPFS
Auf IPFS hochgeladenes SubQuery-Projekt:
QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd  //CID
```

Bitte notieren Sie sich diese `CID`. Mit dieser `CID` können Sie Ihr veröffentlichtes Projekt als die sogenannte [IPFS-Bereitstellung](ipfs.md#ipfs-deployment) anzeigen.

Mit `@subql/cli` Version 1.3.0 oder höher wird bei Verwendung von `subql publish` eine Kopie der `IPFS-CID` des Projekts in einer Datei gespeichert In Ihrem Projektverzeichnis stimmt die Benennung der Datei mit Ihrer project.yaml überein. Wenn Ihre Manfiest-Datei beispielsweise `project.yaml` heißt, heißt die IPFS-Datei `.project-cid`.

### IPFS-Bereitstellung

Die IPFS-Bereitstellung stellt eine unabhängige und einzigartige Existenz eines SubQuery-Projekts in einem dezentralisierten Netzwerk dar. Daher wirken sich alle Änderungen am Code im Projekt auf dessen Eindeutigkeit aus. Wenn Sie Ihre Geschäftslogik anpassen müssen, z.B. Wenn Sie die Zuordnungsfunktion ändern, müssen Sie das Projekt erneut veröffentlichen, und die `CID` ändert sich.

Um das von Ihnen veröffentlichte Projekt anzuzeigen, verwenden Sie vorerst ein `REST`-API-Tool wie [Postman](https://web.postman.co/) und die `POST`-Methode mit der folgenden Beispiel-URL zum Abrufen:`https://ipfs.subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`.

Sie sollten die Beispielprojektbereitstellung wie unten sehen.

Diese Bereitstellung sieht Ihrer Manifestdatei sehr ähnlich. Sie können diese beschreibenden Felder erwarten, und der Netzwerk- und Wörterbuchendpunkt wurde entfernt, da sie das Ergebnis der Projektausführung nicht direkt beeinflussten.

Diese Dateien, die in Ihrem lokalen Projekt verwendet wurden, wurden ebenfalls gepackt und in IPFS veröffentlicht.

```yaml
dataSources:
  - kind: substrate/Runtime
    mapping:
      file: ipfs://QmTTJKrMVzCZqmRCd5xKHbKymtQQnHZierBMHLtHHGyjLy
      handlers:
        - handler: handleBlock
          kind: substrate/BlockHandler
        - filter:
            method: Deposit
            module: balances
          handler: handleEvent
          kind: substrate/EventHandler
        - handler: handleCall
          kind: substrate/CallHandler
    startBlock: 8973820
network:
  genesisHash: "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3"
schema:
  file: ipfs://QmTP5BjtxETVqvU4MkRxmgf8NbceB17WtydS6oQeHBCyjz
specVersion: 0.2.0
```

## Stellen Sie Ihr SubQuery-Projekt im Managed Service bereit

### Melden Sie sich bei SubQuery-Projekten an

Bevor Sie beginnen, stellen Sie bitte sicher, dass die Codebasis Ihres SubQuery-Projekts in IPFS veröffentlicht ist.

Um Ihr erstes Projekt zu erstellen, gehen Sie zu [SubQuery Projects](https://project.subquery.network). You'll need to authenticate with your GitHub account to login.

On first login, you will be asked to authorize SubQuery. We only need your email address to identify your account, and we don't use any other data from your GitHub account for any other reasons. In this step, you can also request or grant access to your GitHub Organization account so you can post SubQuery projects under your GitHub Organization instead of your personal account.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

SubQuery Projects is where you manage all your hosted projects uploaded to the SubQuery platform. You can create, delete, and even upgrade projects all from this application.

![Projects Login](/assets/img/projects-dashboard.png)

If you have a GitHub Organization accounts connected, you can use the switcher on the header to change between your personal account and your GitHub Organization account. Projects created in a GitHub Organization account are shared between members in that GitHub Organization. To connect your GitHub Organization account, you can [follow the steps here](publish.md#add-github-organization-account-to-subquery-projects).

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

### Create Your First Project

There are two methods to create a project in the SubQuery Managed Service: you can use the UI or directly via the `subql` cli tool

#### Verwendung von UI

Let's start by clicking on "Create Project". You'll be taken to the New Project form. Please enter the following (you can change this in the future):

- **GitHub account:** If you have more than one GitHub account, select which account this project will be created under. Projects created in a GitHub organisation account are shared between members in that organisation.
- **Project Name**
- **Subtitle**
- **Beschreibung**
- **GitHub Repository URL:** This must be a valid GitHub URL to a public repository that has your SubQuery project. The `schema.graphql` file must be in the root of your directory ([learn more about the directory structure](../build/introduction.md#directory-structure)).
- **Database:** Premium customers can access dedicated databases to host production SubQuery projects from. If this interests you, you can contact [sales@subquery.network](mailto:sales@subquery.network) to have this setting enabled.
- **Deployment Source:** You can choose to have the project deployed from the GitHub repository or alternatively deployed from a IPFS CID, see our guide about [hosting with IPFS.](ipfs.md)
- **Hide project:** If selected, this will hide the project from the public SubQuery explorer. Keep this unselected if you want to share your SubQuery with the community!

![Create your first Project](/assets/img/projects-create.png)

Create your project and you'll see it on your SubQuery Project's list. _We're almost there! We just need to deploy a new version of it._

![Created Project with no deployment](/assets/img/projects-no-deployment.png)

#### Verwendung von CLI

You can also use `@subql/cli` to publish your project to our Managed Service. Dies erfordert:

- `@subql/cli` Version 1.1.0 oder höher.
- A valid [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ready.

```shell
// Creating a project using the CLI
$ subql project:create-project

// OR using non-interactive, it will prompt you if the required fields are missing
$ subql project:create-project
    --apiVersion=apiVersion      Api version is default to 2
    --description=description    Enter description
    --gitRepo=gitRepo            Enter git repository
    --org=org                    Enter organization name
    --projectName=projectName  Enter project name
```

### Deploy your First Version

There are three methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly, via the `subql` cli tool, or using an automated GitHub Action.

#### Verwendung von UI

While creating a project will setup the display behaviour of the project, you must deploy a version of it before it becomes operational. Deploying a version triggers a new SubQuery indexing operation to start, and sets up the required query service to start accepting GraphQL requests. You can also deploy new versions to existing projects here.

With your new project, you'll see a Deploy New Version button. Click this, and fill in the required information about the deployment:

- **Branch:** From GitHub, select the branch of the project that you want to deploy from.
- **Commit Hash:** From GitHub, select the specific commit of the version of your SubQuery project codebase that you want deployed.
- **IPFS:** If deploying from IPFS, paste you IPFS deployment CID (without the leading `ipfs://`).
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here.
- **Indexer Version:** This is the version of SubQuery's node service that you want to run this SubQuery on. See [`@subql/node`](https://www.npmjs.com/package/@subql/node).
- **Query Version:** This is the version of SubQuery's query service that you want to run this SubQuery on. See [`@subql/query`](https://www.npmjs.com/package/@subql/query).

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

#### Verwendung von CLI

You can also use `@subql/cli` to create a new deployment of your project to our Managed Service. Dies erfordert:

- `@subql/cli` Version 1.1.0 oder höher.
- A valid [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ready.

```shell
// Deploy using the CLI
$ subql deployment:deploy

// OR Deploy using non-interactive CLI
$ subql deployment:deploy

  -d, --useDefaults                Use default values for indexerVerion, queryVersion, dictionary, endpoint
  --dict=dict                      Enter dictionary
  --endpoint=endpoint              Enter endpoint
  --indexerVersion=indexerVersion  Enter indexer-version
  --ipfsCID=ipfsCID                Enter IPFS CID
  --org=org                        Enter organization name
  --projectName=projectName        Enter project name
  --queryVersion=queryVersion      Enter query-version
  --type=(stage|primary)           [default: primary]
```

#### Using GitHub actions

With the introduction of the deployment feature for the CLI, we've added a **Default Action Workflow** to [the starter project in GitHub](https://github.com/subquery/subql-starter/blob/v1.0.0/.github/workflows/cli-deploy.yml) that will allow you to publish and deploy your changes automatically:

- Step 1: After pushing your project to GitHub, create `DEPLOYMENT` environment on GitHub, and add the secret [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) to it.
- Step 2: Create a project on [SubQuery Projects](https://project.subquery.network), this can be done using the the [UI](#using-the-ui) or [CLI](#using-the-cli).
- Step 3: Once your project is created, navigate to the GitHub Actions page for your project, and select the workflow `CLI deploy`
- Step 4: You'll see an input field where you can enter the unique code of your project created on SubQuery Projects, you can get the code from the URL in SubQuery Projects [SubQuery Projects](https://project.subquery.network). The code is based on the name of your project, where spaces are replaced with hyphens `-`. e.g. `my project name` becomes `my-project-name`
- Once the workflow is complete, you should be see your project deployed to our Managed Service

A common approach is to extend the default GitHub Action to automatically deploy changes to our Managed Service when code is merged into main. The following change to the GitHub Action workflow do this:

```yml
on:
  push:
    branches:
      - main
jobs:
  deploy:
    name: CLI Deploy
    ...
```

## Nächste Schritte - Verbinden Sie sich mit Ihrem Projekt

Sobald Ihre Bereitstellung erfolgreich abgeschlossen wurde und unsere Nodes Ihre Daten aus der Chain indiziert haben, können Sie über den angezeigten GraphQL-Abfrageendpunkt eine Verbindung zu Ihrem Projekt herstellen.

![Projekt wird bereitgestellt und synchronisiert](/assets/img/projects-deploy-sync.png)

Alternativ können Sie auf die drei Punkte neben dem Titel Ihres Projekts klicken und es im SubQuery Explorer anzeigen. There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![Projekte im SubQuery Explorer](/assets/img/projects-explorer.png)

## Add GitHub Organization Account to SubQuery Projects

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
