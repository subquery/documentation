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

**IPFS**: Your project's codebase can be stored in IPFS, you can follow our IPFS hosting guide to see how to [first publish to IPFS](ipfs.md).

### Melden Sie sich bei SubQuery-Projekten an

Bevor Sie beginnen, stellen Sie bitte sicher, dass die Codebasis Ihres SubQuery-Projekts online in einem öffentlichen GitHub-Repository oder auf IPFS ist. Die Datei `schema.graphql` muss sich im Stammverzeichnis Ihres Verzeichnisses befinden.

To create your first project, head to [SubQuery Projects](https://project.subquery.network). Sie müssen sich mit Ihrem GitHub-Konto authentifizieren, um sich anzumelden.

Bei der ersten Anmeldung werden Sie aufgefordert, SubQuery zu autorisieren. Wir benötigen Ihre E-Mail-Adresse nur, um Ihr Konto zu identifizieren, und wir verwenden keine anderen Daten aus Ihrem GitHub-Konto für andere Zwecke. In diesem Schritt können Sie auch Zugriff auf Ihr GitHub-Organisationskonto anfordern oder gewähren, sodass Sie SubQuery-Projekte unter Ihrer GitHub-Organisation statt unter Ihrem persönlichen Konto veröffentlichen können.

![Widerrufen Sie die Genehmigung von einem GitHub-Konto](/assets/img/project_auth_request.png)

Unter SubQuery-Projekte verwalten Sie alle Ihre gehosteten Projekte, die auf die SubQuery-Plattform hochgeladen wurden. Mit dieser Anwendung können Sie Projekte erstellen, löschen und sogar aktualisieren.

![Projekte-Login](/assets/img/projects-dashboard.png)

Wenn Sie mit einem GitHub-Organisationskonto verbunden sind, können Sie den Umschalter in der Kopfzeile verwenden, um zwischen Ihrem persönlichen Konto und Ihrem GitHub-Organisationskonto zu wechseln. In einem GitHub-Organisationskonto erstellte Projekte werden von Mitgliedern dieser GitHub-Organisation gemeinsam genutzt. Um Ihr GitHub-Organisationskonto zu verbinden, können Sie [diesen Schritten folgen](#add-github-organization-account-to-subquery-projects).

![Umschaltung zwischen GitHub-Konten](/assets/img/projects-account-switcher.png)

### Erstellen Sie Ihr erstes Projekt

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
- **Hide project:** Wenn ausgewählt, wird das Projekt im öffentlichen SubQuery-Explorer ausgeblendet. Lassen Sie diese Option deaktiviert, wenn Sie Ihre SubQuery mit der Community teilen möchten! ![Erstellen Sie Ihr erstes Projekt](/assets/img/projects-create.png)

Erstellen Sie Ihr Projekt und Sie sehen es in der Liste Ihres SubQuery-Projekts. _Wir sind fast da! Wir müssen nur eine neue Version davon bereitstellen._

![Erstelltes Projekt ohne Bereitstellung](/assets/img/projects-no-deployment.png)

#### Verwendung von CLI

Sie können auch `@subql/cli` verwenden, um Ihr Projekt in unserem Managed Service zu veröffentlichen. Dies erfordert:

- `@subql/cli` Version 1.1.0 oder höher.
- A valid [SUBQL_ACCESS_TOKEN]() ready.

```shell
// Erstellung eines Projekts mit der CLI
$ subql project:create-project

// Bei Verwendung von nicht interaktiv OR werden Sie gefragt, ob die erforderlichen Felder fehlen
$ subql project:create-project
    --apiVersion=apiVersion      Die API-Version ist standardmäßig 2
    --description=description    Beschreibung eingeben
    --gitRepo=gitRepo            Geben Sie das Git-Repository ein
    --org=org                    Geben Sie den Namen der Organisation ein
    --project_name=project_name  Geben Sie den Projektnamen ein
```

### Stellen Sie Ihre erste Version bereit

Es gibt zwei Methoden zum Bereitstellen einer neuen Version Ihres Projekts für den SubQuery Managed Service: Sie können die Benutzeroberfläche oder direkt über das CLI-Tool `subql` verwenden.

#### Verwendung von UI

Während das Erstellen eines Projekts das Anzeigeverhalten des Projekts einrichtet, müssen Sie eine Version davon bereitstellen, bevor es einsatzbereit ist. Die Bereitstellung einer Version löst einen neuen SubQuery-Indizierungsvorgang aus und richtet den erforderlichen Abfragedienst ein, um mit der Annahme von GraphQL-Anforderungen zu beginnen. Sie können hier auch neue Versionen für bestehende Projekte bereitstellen.

Bei Ihrem neuen Projekt sehen Sie die Schaltfläche Neue Version bereitstellen. Klicken Sie darauf und geben Sie die erforderlichen Informationen zur Bereitstellung ein:

- **Branch:** From GitHub, select the branch of the project that you want to deploy from.
- **Commit Hash:** From GitHub, select the specific commit of the version of your SubQuery project codebase that you want deployed.
- **IPFS:** If deploying from IPFS, paste you IPFS deployment CID (without the leading `ipfs://`).
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here.
- **Indexer Version:** Dies ist die Version des Nodendienstes von SubQuery, auf der Sie diese SubQuery ausführen möchten. See [`@subql/node`](https://www.npmjs.com/package/@subql/node).
- **Query Version:** Dies ist die Version des Abfragedienstes von SubQuery, auf der Sie diese SubQuery ausführen möchten. See [`@subql/query`](https://www.npmjs.com/package/@subql/query).

![Stellen Sie Ihr erstes Projekt bereit](https://static.subquery.network/media/projects/projects-first-deployment.png)

Bei erfolgreicher Bereitstellung sehen Sie, dass der Indexer zu arbeiten beginnt und den Fortschritt beim Indizieren der aktuellen Chain zurückmeldet. Dieser Vorgang kann einige Zeit dauern, bis er 100 % erreicht.

#### Verwendung von CLI

Sie können auch `@subql/cli` verwenden, um eine neue Bereitstellung Ihres Projekts für unseren Managed Service zu erstellen. Dies erfordert:

- `@subql/cli` Version 1.1.0 oder höher.
- A valid [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ready.

```shell
// Bereitstellung mit der CLI
$ suqbl deployment:deploy

// OR Bereitstellung mit nicht interaktiver CLI
$ suqbl deployment:deploy
--dict=dict Wörterbuchendpunkt eingeben
   --endpoint=endpoint Geben Sie den Netzwerkendpunkt ein
   --indexerVersion=indexerVersion Geben Sie die Indexer-Version ein
   --ipfsCID=ipfsCID Geben Sie die IPFS-CID ein
   --org=org Geben Sie den Organisationsnamen ein
   --project_name=Projektname Geben Sie den Projektnamen ein
   --queryVersion=queryVersion Geben Sie die Abfrageversion ein
   --type=type Geben Sie den Bereitstellungstyp ein, z. Grundschule oder Stufe
```

## Nächste Schritte - Verbinden Sie sich mit Ihrem Projekt

Sobald Ihre Bereitstellung erfolgreich abgeschlossen wurde und unsere Nodes Ihre Daten aus der Chain indiziert haben, können Sie über den angezeigten GraphQL-Abfrageendpunkt eine Verbindung zu Ihrem Projekt herstellen.

![Projekt wird bereitgestellt und synchronisiert](/assets/img/projects-deploy-sync.png)

Alternativ können Sie auf die drei Punkte neben dem Titel Ihres Projekts klicken und es im SubQuery Explorer anzeigen. Dort können Sie den Spielplatz im Browser verwenden, um loszulegen - [lesen Sie hier mehr über die Verwendung unseres Explorers](../run_publish/query.md).

![Projekte im SubQuery Explorer](/assets/img/projects-explorer.png)

## GitHub-Organisationskonto zu SubQuery-Projekten hinzufügen

Es ist üblich, Ihr SubQuery-Projekt unter dem Namen Ihres GitHub-Organisationskontos und nicht unter Ihrem persönlichen GitHub-Konto zu veröffentlichen. Sie können Ihr derzeit ausgewähltes Konto in [SubQuery Projects](https://project.subquery.network) jederzeit mit dem Kontowechsler ändern.

![Umschaltung zwischen GitHub-Konten](/assets/img/projects-account-switcher.png)

Wenn Sie Ihr GitHub-Organisationskonto nicht im Switcher sehen können, müssen Sie möglicherweise Zugriff auf SubQuery für Ihre GitHub-Organisation gewähren (oder es von einem Administrator anfordern). Dazu müssen Sie zunächst die Berechtigungen Ihres GitHub-Kontos für die SubQuery-Anwendung widerrufen. Melden Sie sich dazu bei Ihren Kontoeinstellungen in GitHub an, gehen Sie zu Anwendungen und widerrufen Sie auf der Registerkarte Autorisierte OAuth-Apps SubQuery – [Sie können die genauen Schritte hier befolgen](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Keine Sorge, Ihr SubQuery-Projekt wird dadurch nicht gelöscht und Sie verlieren keine Daten.**

![Widerrufen Sie den Zugriff auf das GitHub-Konto](/assets/img/project_auth_revoke.png)

Sobald Sie den Zugriff widerrufen haben, melden Sie sich von [SubQuery Projects](https://project.subquery.network) ab und wieder an. Sie sollten zu einer Seite mit dem Titel _SubQuery autorisieren_ weitergeleitet werden, auf der Sie SubQuery-Zugriff auf Ihr GitHub-Organisationskonto anfordern oder gewähren können. Wenn Sie keine Administratorberechtigungen haben, müssen Sie einen Administrator anfordern, um dies für Sie zu aktivieren.

![Widerrufen Sie die Genehmigung von einem GitHub-Konto](/assets/img/project_auth_request.png)

Sobald diese Anfrage von Ihrem Administrator genehmigt wurde (oder Sie sie selbst gewähren können), sehen Sie das richtige GitHub-Organisationskonto im Kontowechsler.
