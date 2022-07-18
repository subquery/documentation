# Veröffentlichen Sie Ihr SubQuery-Projekt

## Vorteile des Hostens Ihres Projekts mit SubQuery

- We'll run your SubQuery projects for you in a high performance, scalable, and managed public service.
- Dieser Service wird der Community kostenlos zur Verfügung gestellt!
- You can make your projects public so that they'll be listed in the [SubQuery Explorer](https://explorer.subquery.network) and anyone around the world can view them.
- We're integrated with GitHub, so anyone in your GitHub organisations will be able to view shared organisation projects.

## Erstellen Sie Ihr erstes Projekt in SubQuery Projects

### Projekt-Codebase-Hosting

Es gibt zwei Möglichkeiten, wie Sie die Codebasis Ihres SubQuery-Projekts vor der Veröffentlichung hosten können.

**GitHub**: Your project's codebase must be in a public GitHub repository.

**IPFS**: Your project's codebase can be stored in IPFS, you can follow our IPFS hosting guide to see how to [first publish to IPFS](../run_publish/ipfs.md).

### Melden Sie sich bei SubQuery-Projekten an

Bevor Sie beginnen, stellen Sie bitte sicher, dass die Codebasis Ihres SubQuery-Projekts online in einem öffentlichen GitHub-Repository oder auf IPFS ist. Die Datei `schema.graphql` muss sich im Stammverzeichnis Ihres Verzeichnisses befinden.

To create your first project, head to [SubQuery Projects](https://project.subquery.network). Sie müssen sich mit Ihrem GitHub-Konto authentifizieren, um sich anzumelden.

Bei der ersten Anmeldung werden Sie aufgefordert, SubQuery zu autorisieren. Wir benötigen Ihre E-Mail-Adresse nur, um Ihr Konto zu identifizieren, und wir verwenden keine anderen Daten aus Ihrem GitHub-Konto für andere Zwecke. In diesem Schritt können Sie auch Zugriff auf Ihr GitHub-Organisationskonto anfordern oder gewähren, sodass Sie SubQuery-Projekte unter Ihrer GitHub-Organisation statt unter Ihrem persönlichen Konto veröffentlichen können.

![Widerrufen Sie die Genehmigung von einem GitHub-Konto](/assets/img/project_auth_request.png)

Unter SubQuery-Projekte verwalten Sie alle Ihre gehosteten Projekte, die auf die SubQuery-Plattform hochgeladen wurden. Mit dieser Anwendung können Sie Projekte erstellen, löschen und sogar aktualisieren.

![Projekte-Login](/assets/img/projects-dashboard.png)

Wenn Sie mit einem GitHub-Organisationskonto verbunden sind, können Sie den Umschalter in der Kopfzeile verwenden, um zwischen Ihrem persönlichen Konto und Ihrem GitHub-Organisationskonto zu wechseln. In einem GitHub-Organisationskonto erstellte Projekte werden von Mitgliedern dieser GitHub-Organisation gemeinsam genutzt. To connect your GitHub Organization account, you can [follow the steps here](publish.md#add-github-organization-account-to-subquery-projects).

![Umschaltung zwischen GitHub-Konten](/assets/img/projects-account-switcher.png)

### Create Your First Project

Es gibt zwei Methoden zum Erstellen eines Projekts im SubQuery Managed Service: Sie können die Benutzeroberfläche oder direkt über das CLI-Tool `subql` verwenden.

#### Verwendung von UI

Beginnen wir mit einem Klick auf „Create Project“. Sie werden zum Formular „New Project“ weitergeleitet. Bitte geben Sie Folgendes ein (Sie können dies in Zukunft ändern):

- **GitHub-Konto:** Wenn Sie mehr als ein GitHub-Konto haben, wählen Sie aus, unter welchem Konto dieses Projekt erstellt wird. Projekte, die in einem GitHub-Organisationskonto erstellt wurden, werden zwischen Mitgliedern dieser Organisation geteilt.
- **Projekt-Name**
- **Untertitel**
- **Beschreibung**
- **GitHub-Repository-URL:** Dies muss eine gültige GitHub-URL zu einem öffentlichen Repository sein, das Ihr SubQuery-Projekt enthält. The `schema.graphql` file must be in the root of your directory ([learn more about the directory structure](../build/introduction.md#directory-structure)).
- **Datenbank:** Premium-Kunden können auf dedizierte Datenbanken zugreifen, um SubQuery-Produktionsprojekte zu hosten. Wenn Sie daran interessiert sind, können Sie sich an [sales@subquery.network](mailto:sales@subquery.network) wenden, um diese Einstellung zu aktivieren.
- **Bereitstellungsquelle:** Sie können wählen, ob das Projekt aus dem GitHub-Repository oder alternativ von einem IPFS-CID bereitgestellt werden soll, siehe unsere Anleitung zum [Hosting mit IPFS.](ipfs.md)
- **Hide project:** Wenn ausgewählt, wird das Projekt im öffentlichen SubQuery-Explorer ausgeblendet. Lassen Sie diese Option deaktiviert, wenn Sie Ihre SubQuery mit der Community teilen möchten!

![Create your first Project](/assets/img/projects-create.png)

Create your project and you'll see it on your SubQuery Project's list. _We're almost there! We just need to deploy a new version of it._

![Created Project with no deployment](/assets/img/projects-no-deployment.png)

#### Verwendung von CLI

You can also use `@subql/cli` to publish your project to our managed service. Dies erfordert:

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

### Stellen Sie Ihre erste Version bereit

Es gibt zwei Methoden zum Bereitstellen einer neuen Version Ihres Projekts für den SubQuery Managed Service: Sie können die Benutzeroberfläche oder direkt über das CLI-Tool `subql` verwenden.

#### Verwendung von UI

While creating a project will setup the display behaviour of the project, you must deploy a version of it before it becomes operational. Deploying a version triggers a new SubQuery indexing operation to start, and sets up the required query service to start accepting GraphQL requests. You can also deploy new versions to existing projects here.

With your new project, you'll see a Deploy New Version button. Click this, and fill in the required information about the deployment:

- **Branch:** From GitHub, select the branch of the project that you want to deploy from.
- **Commit Hash:** From GitHub, select the specific commit of the version of your SubQuery project codebase that you want deployed.
- **IPFS:** If deploying from IPFS, paste you IPFS deployment CID (without the leading `ipfs://`).
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here.
- **Indexer Version:** Dies ist die Version des Nodendienstes von SubQuery, auf der Sie diese SubQuery ausführen möchten. See [`@subql/node`](https://www.npmjs.com/package/@subql/node).
- **Query Version:** Dies ist die Version des Abfragedienstes von SubQuery, auf der Sie diese SubQuery ausführen möchten. See [`@subql/query`](https://www.npmjs.com/package/@subql/query).

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

#### Verwendung von CLI

Sie können auch `@subql/cli` verwenden, um eine neue Bereitstellung Ihres Projekts für unseren Managed Service zu erstellen. Dies erfordert:

- `@subql/cli` Version 1.1.0 oder höher.
- A valid [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ready.

```shell
// Deploy using the CLI
$ suqbl deployment:deploy

// OR Deploy using non-interactive CLI
$ suqbl deployment:deploy

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

## Nächste Schritte - Verbinden Sie sich mit Ihrem Projekt

Sobald Ihre Bereitstellung erfolgreich abgeschlossen wurde und unsere Nodes Ihre Daten aus der Chain indiziert haben, können Sie über den angezeigten GraphQL-Abfrageendpunkt eine Verbindung zu Ihrem Projekt herstellen.

![Projekt wird bereitgestellt und synchronisiert](/assets/img/projects-deploy-sync.png)

Alternativ können Sie auf die drei Punkte neben dem Titel Ihres Projekts klicken und es im SubQuery Explorer anzeigen. There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![Projects in SubQuery Explorer](/assets/img/projects-explorer.png)

## GitHub-Organisationskonto zu SubQuery-Projekten hinzufügen

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![Umschaltung zwischen GitHub-Konten](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![Widerrufen Sie die Genehmigung von einem GitHub-Konto](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
