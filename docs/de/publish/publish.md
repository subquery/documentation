# Publish your SubQuery Project

## Vorteile des Hostens Ihres Projekts mit SubQuery
- Wir führen Ihre SubQuery-Projekte für Sie in einem leistungsstarken, skalierbaren und verwalteten öffentlichen Dienst durch
- Dieser Service wird der Community kostenlos zur Verfügung gestellt!
- Sie können Ihre Projekte öffentlich machen, damit sie im [SubQuery Explorer](https://explorer.subquery.network) aufgelistet werden und jeder auf der Welt sie sehen kann
- Wir sind in GitHub integriert, sodass jeder in Ihren GitHub-Organisationen freigegebene Organisationsprojekte anzeigen kann

## Erstellen Sie Ihr erstes Projekt

#### Bei SubQuery-Projekten anmelden

Bevor Sie beginnen, stellen Sie bitte sicher, dass Ihr SubQuery-Projekt in einem öffentlichen GitHub-Repository online ist. Die Datei `schema.graphql` muss sich im Stammverzeichnis Ihres Verzeichnisses befinden.

Um Ihr erstes Projekt zu erstellen, gehen Sie zu [project.subquery.network](https://project.subquery.network). Sie müssen sich mit Ihrem GitHub-Konto authentifizieren, um sich anzumelden.

Bei der ersten Anmeldung werden Sie aufgefordert, SubQuery zu autorisieren. Wir benötigen Ihre E-Mail-Adresse nur zur Identifizierung Ihres Kontos und verwenden keine anderen Daten Ihres GitHub-Kontos aus anderen Gründen. In diesem Schritt können Sie auch Zugriff auf Ihr GitHub-Organisationskonto anfordern oder gewähren, damit Sie SubQuery-Projekte unter Ihrer GitHub-Organisation anstelle Ihres persönlichen Kontos veröffentlichen können.

![Genehmigung von einem GitHub-Konto widerrufen](/assets/img/project_auth_request.png)

In SubQuery-Projekte verwalten Sie alle Ihre gehosteten Projekte, die auf die SubQuery-Plattform hochgeladen wurden. Sie können alle Projekte von dieser Anwendung erstellen, löschen und sogar aktualisieren.

![Projekte Login](/assets/img/projects-dashboard.png)

Wenn Sie mit einem GitHub-Organisationskonto verbunden sind, können Sie den Umschalter in der Kopfzeile verwenden, um zwischen Ihrem persönlichen Konto und Ihrem GitHub-Organisationskonto zu wechseln. Projekte, die in einem GitHub-Organisationskonto erstellt wurden, werden zwischen Mitgliedern dieser GitHub-Organisation geteilt. Um Ihr GitHub-Organisationskonto zu verbinden, können Sie [die Schritte hier ausführen](#add-github-organization-account-to-subquery-projects).

![Zwischen GitHub-Konten wechseln](/assets/img/projects-account-switcher.png)

#### Erstellen Sie Ihr erstes Projekt

Beginnen wir mit einem Klick auf "Create Project". Sie werden zum Formular New Project weitergeleitet. Bitte geben Sie Folgendes ein (Sie können dies in Zukunft ändern):
- **GitHub-Konto:** Wenn Sie mehr als ein GitHub-Konto haben, wählen Sie aus, unter welchem Konto dieses Projekt erstellt wird. Projekte, die in einem GitHub-Organisationskonto erstellt wurden, werden zwischen Mitgliedern dieser Organisation geteilt.
- **Name**
- **Untertitel**
- **Beschreibung**
- **GitHub-Repository-URL:** Dies muss eine gültige GitHub-URL zu einem öffentlichen Repository sein, das Ihr SubQuery-Projekt enthält. Die Datei `schema.graphql` muss sich im Stammverzeichnis Ihres Verzeichnisses befinden ([weitere Informationen zur Verzeichnisstruktur](../create/introduction.md#directory-structure)).
- **Hide project:** Wenn ausgewählt, wird das Projekt im öffentlichen SubQuery-Explorer ausgeblendet. Lassen Sie diese Option deaktiviert, wenn Sie Ihre SubQuery mit der Community teilen möchten! ![Erstellen Sie Ihr erstes Projekt](/assets/img/projects-create.png)

Erstellen Sie Ihr Projekt und Sie sehen es in der Liste Ihres SubQuery-Projekts. *Wir sind fast da! We just need to deploy a new version of it. </p>

![Projekt, das ohne Bereitstellung erstellt wurde](/assets/img/projects-no-deployment.png)

#### Stellen Sie Ihre erste Version bereit

Während die Erstellung eines Projekts das Anzeigeverhalten des Projekts einrichtet, müssen Sie eine Version davon bereitstellen, bevor es betriebsbereit ist. Das Bereitstellen einer Version löst den Start eines neuen SubQuery-Indizierungsvorgangs aus und richtet den erforderlichen Abfragedienst ein, um GraphQL-Anforderungen zu akzeptieren. Sie können hier auch neue Versionen für bestehende Projekte bereitstellen.

With your new project, you'll see a Deploy New Version button. Click this, and fill in the required information about the deployment:
- **Commit Hash of new Version:** From GitHub, copy the full commit hash of the version of your SubQuery project codebase that you want deployed
- **Indexer Version:** This is the version of SubQuery's node service that you want to run this SubQuery on. See [`@subql/node`](https://www.npmjs.com/package/@subql/node)
- **Query Version:** This is the version of SubQuery's query service that you want to run this SubQuery on. See [`@subql/query`](https://www.npmjs.com/package/@subql/query)

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

## Next Steps - Connect to your Project
Once your deployment has succesfully completed and our nodes have indexed your data from the chain, you'll be able to connect to your project via the displayed GraphQL Query endpoint.

![Projekt wird bereitgestellt und synchronisiert](/assets/img/projects-deploy-sync.png)

Alternativ können Sie auf die drei Punkte neben dem Titel Ihres Projekts klicken und es im SubQuery Explorer anzeigen. There you can use the in-browser playground to get started - [read more about how to user our Explorer here](../query/query.md).

![Projekte im SubQuery Explorer](/assets/img/projects-explorer.png)

## Add GitHub Organization Account to SubQuery Projects

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![Zwischen GitHub-Konten wechseln](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![Genehmigung von einem GitHub-Konto widerrufen](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
