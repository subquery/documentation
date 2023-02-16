# In Managed Services veröffentlichen

## Vorteile des Hostens Ihres Projekts mit dem Managed Service von SubQuery

The biggest dApps depend on SubQuery's enterprise level Managed Service. With 100's of millions of daily requests and hundreds of active projects, SubQuery's Managed Service provides industry leading hosting for our customers.

- Wir führen Ihre SubQuery-Projekte für Sie in einem leistungsstarken, skalierbaren und verwalteten öffentlichen Dienst aus.
- Dieser Service wird der Community mit einem großzügigen kostenlosen Kontingent zur Verfügung gestellt! Sie können Ihre ersten beiden SubQuery-Projekte absolut kostenlos hosten!
- Sie können Ihre Projekte öffentlich machen, damit sie im [SubQuery Explorer](https://explorer.subquery.network) aufgelistet werden und jeder auf der ganzen Welt sie anzeigen kann.

Sie können ein Upgrade durchführen, um die folgenden kostenpflichtigen Dienste zu nutzen:

- Produktionsreifes Hosting für geschäftskritische Daten mit Blue/Green-Bereitstellungen ohne Ausfallzeiten
- Dedizierte Datenbanken
- Mehrere georedundante Cluster und intelligentes Routing
- Erweiterte Überwachung und Analyse.

## Veröffentlichen Sie Ihr SubQuery-Projekt in IPFS

Bei der Bereitstellung für den Managed Service von SubQuery müssen Sie zuerst Ihre Codebasis in [IPFS](https://ipfs.io/) hosten. Hosting a project in IPFS makes it available for everyone and reduces your reliance on centralised services like GitHub.

:::Warnung GitHub-Bereitstellungsflows sind für IPFS veraltet

Wenn Ihr Projekt noch über GitHub bereitgestellt wird, lesen Sie den Migrationsleitfaden für IPFS-Bereitstellungen [hier](./ipfs.md) :::

### Anforderungen

- `@subql/cli` Version 0.21.0 oder höher.
- Manifest `specVersion` 1.0.0 und höher.
- Get your SUBQL_ACCESS_TOKEN ready.
- To make sure your deployment is successful, we strongly recommend that you build your project with the `subql build` command, and test it locally before publishing.

### Bereiten Sie Ihr SUBQL_ACCESS_TOKEN vor

- Schritt 1: Gehen Sie zu [SubQuery Managed Service](https://managedservice.subquery.network/) und melden Sie sich an.
- Schritt 2: Klicken Sie oben rechts im Navigationsmenü auf Ihr Profil und dann auf **_Token aktualisieren_**.
- Schritt 3: Kopieren Sie das generierte Token.
- Schritt 4: So verwenden Sie dieses Token:
  - Variante 1: Fügen Sie SUBQL_ACCESS_TOKEN zu Ihren Umgebungsvariablen hinzu. `EXPORT SUBQL_ACCESS_TOKEN=<token>` (Windows) oder `export SUBQL_ACCESS_TOKEN=<token>` (Mac/Linux)
  - Variante 2: Demnächst wird `subql/cli` das lokale Speichern Ihres SUBQL_ACCESS_TOKEN unterstützen.

### Wie kann man ein Projekt veröffentlichen?

Run the following command, which will read the project's default manifest `project.yaml` for the required information.

```
// Veröffentlichen Sie es aus dem Stammverzeichnis Ihres Projekts
subql publish

// OR point zu Ihrem Projektstamm
subql publish -f ~/my-project/
```

Alternatively, if your project has multiple manifest files, for example you support multiple networks but share the same mapping and business logic, and have a project structure as follows:

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

After successfully publishing the project, the logs below indicate that the project was created on the IPFS cluster and have returned its `CID` (Content IDentifier). Please note down this `CID`.

```
Bau- und Verpackungscode ... fertig
Hochladen des SupQuery-Projekts in IPFS
Auf IPFS hochgeladenes SubQuery-Projekt:
QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd  //CID
```

Note: With `@subql/cli` version 1.3.0 or above, when using `subql publish`, a copy of the project's `IPFS CID` will be stored in a file in your project directory. The naming of the file will be consistent with your project.yaml. For example, if your manfiest file is named `project.yaml`, the IPFS file will be named `.project-cid`.

### IPFS-Bereitstellung

Die IPFS-Bereitstellung stellt eine unabhängige und einzigartige Existenz eines SubQuery-Projekts in einem dezentralisierten Netzwerk dar. Daher wirken sich alle Änderungen am Code im Projekt auf dessen Eindeutigkeit aus. Wenn Sie Ihre Geschäftslogik anpassen müssen, z.B. Wenn Sie die Zuordnungsfunktion ändern, müssen Sie das Projekt erneut veröffentlichen, und die `CID` ändert sich.

For now, to view the project you have published, use a `REST` api tool such as [Postman](https://web.postman.co/), and use the `POST` method with the following example URL to retrieve it:`https://ipfs.subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`.

You should see the example project deployment as below.

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

Before starting, please make sure that your SubQuery project codebase is published to IPFS.

To create your first project, head to [SubQuery Managed Service](https://managedservice.subquery.network). You'll need to authenticate with your GitHub account to login.

On first login, you will be asked to authorize SubQuery. We only need your email address to identify your account, and we don't use any other data from your GitHub account for any other reasons. In this step, you can also request or grant access to your GitHub Organization account so you can post SubQuery projects under your GitHub Organization instead of your personal account.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

SubQuery Projects is where you manage all your hosted projects uploaded to the SubQuery platform. You can create, delete, and even upgrade projects all from this application.

![Projects Login](/assets/img/projects_dashboard.png)

If you have a GitHub Organization accounts connected, you can use the switcher on the header to change between your personal account and your GitHub Organization account. Projects created in a GitHub Organization account are shared between members in that GitHub Organization. To connect your GitHub Organization account, you can [follow the steps here](publish.md#add-github-organization-account-to-subquery-projects).

![Switch between GitHub accounts](/assets/img/projects_account_switcher.png)

### Erstellen Sie Ihr erstes Projekt

There are two methods to create a project in the SubQuery Managed Service: you can use the UI or directly via the `subql` cli tool

#### Verwendung von UI

Start by clicking on "Create Project". You'll be taken to the new project form. Please enter the following (you can change this in the future):

- **Project Name:** Name your project.
- **Description:** Provide a description of your project.
- **Database:** Premium customers can access dedicated databases to host production SubQuery projects from. If this interests you, you can contact [sales@subquery.network](mailto:sales@subquery.network) to have this setting enabled.
- **Visible in Explorer:** If selected, this will show the project from the public SubQuery explorer to share with the community.

![Create your first Project](/assets/img/projects_create.png)

Create your project and you'll see it on your SubQuery Project's list. Next, we just need to deploy a new version of it.

![Project created](/assets/img/project_created.png)

#### Verwendung von CLI

You can also use `@subql/cli` to publish your project to our Managed Service. Dies erfordert:

- `@subql/cli` Version 1.1.0 oder höher.
- Ein gültiges [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) bereit.

```shell
// Creating a project using the CLI
$ subql project:create-project

// OR using non-interactive, it will prompt you if the required fields are missing
$ subql project:create-project
    --apiVersion=apiVersion      Api version is default to 2
    --description=description    Enter description
    --gitRepo=gitRepo            Enter git repository
    --org=org                    Enter organization name
    --projectName=projectName    Enter project name
```

### Stellen Sie Ihre erste Version bereit

There are three methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly, via the `subql` cli tool, or using an automated GitHub Action.

#### Verwendung von UI

While creating a project will setup the display behaviour of the project, you must deploy a version of it before it becomes operational. Deploying a version triggers a new SubQuery indexing operation to start, and sets up the required query service to start accepting GraphQL requests. You can also deploy new versions to existing projects here.

With your new project, you'll see a "Deploy your first version" button. Click this, and fill in the required information about the deployment:

- **CID:** Provide your IPFS deployment CID (without the leading `ipfs://`). This can be acquired by running `subql publish` with the CLI. The rest of the fields should then auto-populate.
- **Manifest:** The details are obtained from the contents of the provided CID.
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here.
- **Indexer Version:** This is the version of SubQuery's node service that you want to run this SubQuery on. See [`@subql/node`](https://www.npmjs.com/package/@subql/node).
- **Query Version:** This is the version of SubQuery's query service that you want to run this SubQuery on. See [`@subql/query`](https://www.npmjs.com/package/@subql/query).
- **Advanced Settings:** There are numerous advanced settings which are explained via the inbuild help feature.

![Deploy your first Project](/assets/img/projects_first_deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

#### Verwendung von CLI

Sie können auch `@subql/cli` verwenden, um eine neue Bereitstellung Ihres Projekts für unseren Managed Service zu erstellen. Dies erfordert:

- `@subql/cli` Version 1.1.0 oder höher.
- Ein gültiges [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ist bereit.

```shell
// Bereitstellen mit der CLI
$ subql deployment:deploy

// ODER Bereitstellen mit nicht interaktiver CLI
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

#### Verwenden von GitHub-Aktionen

Mit der Einführung der Bereitstellungsfunktion für die CLI haben wir [dem Starterprojekt in GitHub](https://github.com/subquery/subql-starter/blob/main/Polkadot/Polkadot-starter/.github/workflows/cli-deploy.yml) einen **Standardaktions-Workflow** hinzugefügt, mit dem Sie Ihre Änderungen automatisch veröffentlichen und bereitstellen können :

- Schritt 1: Nachdem Sie Ihr Projekt auf GitHub gepusht haben, erstellen Sie eine `DEPLOYMENT`-Umgebung auf GitHub und fügen Sie das Geheimnis [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) hinzu.
- Schritt 2: Erstellen Sie ein Projekt in [SubQuery Managed Service](https://managedservice.subquery.network). Dies kann über die [Benutzeroberfläche](#using-the-ui) oder die [CLI](#using-the-cli) erfolgen.
- Schritt 3: Navigieren Sie nach der Erstellung Ihres Projekts zur GitHub-Aktionsseite für Ihr Projekt und wählen Sie den Workflow `CLI-Bereitstellung` aus
- Schritt 4: Sie sehen ein Eingabefeld, in das Sie den eindeutigen Code Ihres in SubQuery's Managed Service erstellten Projekts eingeben können. Sie können den Code aus der URL in SubQuery's Managed Service [SubQuery Managed Service](https://managedservice.subquery.network) abrufen. Der Code basiert auf dem Namen Ihres Projekts, wobei Leerzeichen durch Bindestriche `-` ersetzt werden. z.B. `my project name` wird zu `my-project-name`
- Sobald der Workflow abgeschlossen ist, sollte Ihr Projekt für unseren Managed Service bereitgestellt werden

A common approach is to extend the default GitHub Action to automatically deploy changes to our Managed Service when code is merged into main. Die folgende Änderung am GitHub Action-Workflow bewirkt dies:

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

![Projekt wird bereitgestellt und synchronisiert](/assets/img/projects_deploy_sync.png)

Alternativ können Sie auf die drei Punkte neben dem Titel Ihres Projekts klicken und es im SubQuery Explorer anzeigen. There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![Projekte im SubQuery Explorer](/assets/img/projects_explorer.png)

## Fügen Sie das GitHub-Organisationskonto zu SubQuery-Projekten hinzu

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Managed Service](https://managedservice.subquery.network) using the account switcher.

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. Then, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Managed Service](https://managedservice.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
