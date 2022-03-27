# Veröffentlichen Sie Ihr SubQuery-Projekt

## Vorteile des Hostens Ihres Projekts mit SubQuery

- Wir führen Ihre SubQuery-Projekte für Sie in einem leistungsstarken, skalierbaren und verwalteten öffentlichen Dienst durch
- Dieser Service wird der Community kostenlos zur Verfügung gestellt!
- Sie können Ihre Projekte öffentlich machen, damit sie im [SubQuery Explorer](https://explorer.subquery.network) aufgelistet werden und jeder auf der Welt sie sehen kann
- Wir sind in GitHub integriert, sodass jeder in Ihren GitHub-Organisationen freigegebene Organisationsprojekte anzeigen kann

## Erstellen Sie Ihr erstes Projekt in SubQuery Projects

### Projekt-Codebase-Hosting

Es gibt zwei Möglichkeiten, wie Sie die Codebasis Ihres SubQuery-Projekts vor der Veröffentlichung hosten können.

**GitHub**: Die Codebasis Ihres Projekts muss sich in einem öffentlichen GitHub-Repository befinden

**IPFS**: Die Codebasis Ihres Projekts kann in IPFS gespeichert werden. Folgen Sie unserem IPFS-Hosting-Leitfaden, um zu erfahren, wie Sie [zuerst in IPFS veröffentlichen](ipfs.md)

### Melden Sie sich bei SubQuery-Projekten an

Bevor Sie beginnen, stellen Sie bitte sicher, dass die Codebasis Ihres SubQuery-Projekts online in einem öffentlichen GitHub-Repository oder auf IPFS ist. Die Datei `schema.graphql` muss sich im Stammverzeichnis Ihres Verzeichnisses befinden.

Um Ihr erstes Projekt zu erstellen, gehen Sie zu [project.subquery.network](https://project.subquery.network). Sie müssen sich mit Ihrem GitHub-Konto authentifizieren, um sich anzumelden.

Bei der ersten Anmeldung werden Sie aufgefordert, SubQuery zu autorisieren. Wir benötigen Ihre E-Mail-Adresse nur, um Ihr Konto zu identifizieren, und wir verwenden keine anderen Daten aus Ihrem GitHub-Konto für andere Zwecke. In diesem Schritt können Sie auch Zugriff auf Ihr GitHub-Organisationskonto anfordern oder gewähren, sodass Sie SubQuery-Projekte unter Ihrer GitHub-Organisation statt unter Ihrem persönlichen Konto veröffentlichen können.

![Widerrufen Sie die Genehmigung von einem GitHub-Konto](/assets/img/project_auth_request.png)

Unter SubQuery-Projekte verwalten Sie alle Ihre gehosteten Projekte, die auf die SubQuery-Plattform hochgeladen wurden. Mit dieser Anwendung können Sie Projekte erstellen, löschen und sogar aktualisieren.

![Projekte-Login](/assets/img/projects-dashboard.png)

Wenn Sie mit einem GitHub-Organisationskonto verbunden sind, können Sie den Umschalter in der Kopfzeile verwenden, um zwischen Ihrem persönlichen Konto und Ihrem GitHub-Organisationskonto zu wechseln. In einem GitHub-Organisationskonto erstellte Projekte werden von Mitgliedern dieser GitHub-Organisation gemeinsam genutzt. Um Ihr GitHub-Organisationskonto zu verbinden, können Sie [diesen Schritten folgen](#add-github-organization-account-to-subquery-projects).

![Umschaltung zwischen GitHub-Konten](/assets/img/projects-account-switcher.png)

### Erstellen Sie Ihr erstes Projekt

Beginnen wir mit einem Klick auf „Create Project“. Sie werden zum Formular „Neues Projekt“ weitergeleitet. Bitte geben Sie Folgendes ein (Sie können dies in Zukunft ändern):

- **GitHub-Konto:** Wenn Sie mehr als ein GitHub-Konto haben, wählen Sie aus, unter welchem Konto dieses Projekt erstellt wird. Projekte, die in einem GitHub-Organisationskonto erstellt wurden, werden zwischen Mitgliedern dieser Organisation geteilt.
- **Projekt-Name**
- **Untertitel**
- **Beschreibung**
- **GitHub-Repository-URL:** Dies muss eine gültige GitHub-URL zu einem öffentlichen Repository sein, das Ihr SubQuery-Projekt enthält. Die Datei `schema.graphql` muss sich im Stammverzeichnis Ihres Verzeichnisses befinden ([weitere Informationen zur Verzeichnisstruktur](../create/introduction.md#directory-structure)).
- **Datenbank:** Premium-Kunden können auf dedizierte Datenbanken zugreifen, um SubQuery-Produktionsprojekte zu hosten. Wenn Sie daran interessiert sind, können Sie sich an [sales@subquery.network](mailto:sales@subquery.network) wenden, um diese Einstellung zu aktivieren.
- **Bereitstellungsquelle:** Sie können wählen, ob das Projekt aus dem GitHub-Repository oder alternativ von einem IPFS-CID bereitgestellt werden soll, siehe unsere Anleitung zum [Hosting mit IPFS.](ipfs.md)
- **Hide project:** Wenn ausgewählt, wird das Projekt im öffentlichen SubQuery-Explorer ausgeblendet. Lassen Sie diese Option deaktiviert, wenn Sie Ihre SubQuery mit der Community teilen möchten! ![Erstellen Sie Ihr erstes Projekt](/assets/img/projects-create.png)

Erstellen Sie Ihr Projekt und Sie sehen es in der Liste Ihres SubQuery-Projekts. _Wir sind fast da! Wir müssen nur eine neue Version davon bereitstellen._

![Erstelltes Projekt ohne Bereitstellung](/assets/img/projects-no-deployment.png)

### Stellen Sie Ihre erste Version bereit

Während das Erstellen eines Projekts das Anzeigeverhalten des Projekts einrichtet, müssen Sie eine Version davon bereitstellen, bevor es einsatzbereit ist. Das Bereitstellen einer Version löst den Start eines neuen SubQuery-Indizierungsvorgangs aus und richtet den erforderlichen Abfragedienst ein, um GraphQL-Anforderungen zu akzeptieren. Sie können hier auch neue Versionen für bestehende Projekte bereitstellen.

Bei Ihrem neuen Projekt sehen Sie die Schaltfläche Neue Version bereitstellen. Klicken Sie darauf und geben Sie die erforderlichen Informationen zur Bereitstellung ein:

- **Zweig:** Wählen Sie auf GitHub den Zweig des Projekts aus, von dem aus Sie bereitstellen möchten
- **Commit-Hash:** Wählen Sie auf GitHub das spezifische Commit der Version Ihrer SubQuery-Projektcodebasis aus, die Sie bereitstellen möchten
- **IPFS:** Wenn Sie von IPFS aus bereitstellen, fügen Sie Ihre IPFS-Bereitstellungs-CID ein (ohne das führende `ipfs://`).
- **Netzwerk- und Wörterbuchendpunkte überschreiben:** Hier können Sie die Endpunkte in Ihrem Projektmanifest überschreiben
- **Indexer-Version:** Dies ist die Version der Notendienstes von SubQuery, auf der Sie diese SubQuery ausführen möchten. Siehe [`@subql/node`](https://www.npmjs.com/package/@subql/node)
- **Query Version:** Dies ist die Version des Abfragedienstes von SubQuery, auf der Sie diese SubQuery ausführen möchten. Siehe [`@subql/query`](https://www.npmjs.com/package/@subql/query)

![Stellen Sie Ihr erstes Projekt bereit](https://static.subquery.network/media/projects/projects-first-deployment.png)

Bei erfolgreicher Bereitstellung sehen Sie, wie der Indexer zu arbeiten beginnt und den Fortschritt beim Indizieren der aktuellen Chain zurückmeldet. Dieser Vorgang kann einige Zeit dauern, bis er 100 % erreicht.

## Nächste Schritte - Verbinden Sie sich mit Ihrem Projekt

Sobald Ihre Bereitstellung erfolgreich abgeschlossen wurde und unsere Nodes Ihre Daten aus der Chain indiziert haben, können Sie über den angezeigten GraphQL-Abfrageendpunkt eine Verbindung zu Ihrem Projekt herstellen.

![Projekt wird bereitgestellt und synchronisiert](/assets/img/projects-deploy-sync.png)

Alternativ können Sie auf die drei Punkte neben dem Titel Ihres Projekts klicken und es im SubQuery Explorer anzeigen. Dort können Sie den Spielplatz im Browser verwenden, um loszulegen - [lesen Sie hier mehr über die Verwendung unseres Explorers](../query/query.md).

![Projekte im SubQuery Explorer](/assets/img/projects-explorer.png)

## GitHub-Organisationskonto zu SubQuery-Projekten hinzufügen

Es ist üblich, Ihr SubQuery-Projekt unter dem Namen Ihres GitHub-Organisationskontos und nicht unter Ihrem persönlichen GitHub-Konto zu veröffentlichen. Sie können Ihr derzeit ausgewähltes Konto in [SubQuery Projects](https://project.subquery.network) jederzeit mit dem Kontowechsler ändern.

![Umschaltung zwischen GitHub-Konten](/assets/img/projects-account-switcher.png)

Wenn Sie Ihr GitHub-Organisationskonto nicht im Switcher sehen können, müssen Sie möglicherweise Zugriff auf SubQuery für Ihre GitHub-Organisation gewähren (oder es von einem Administrator anfordern). Dazu müssen Sie zunächst die Berechtigungen Ihres GitHub-Kontos für die SubQuery-Anwendung widerrufen. Melden Sie sich dazu bei Ihren Kontoeinstellungen in GitHub an, gehen Sie zu Anwendungen und widerrufen Sie auf der Registerkarte Autorisierte OAuth-Apps SubQuery – [Sie können die genauen Schritte hier befolgen](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Keine Sorge, Ihr SubQuery-Projekt wird dadurch nicht gelöscht und Sie verlieren keine Daten.**

![Widerrufen Sie den Zugriff auf das GitHub-Konto](/assets/img/project_auth_revoke.png)

Sobald Sie den Zugriff widerrufen haben, melden Sie sich von [SubQuery Projects](https://project.subquery.network) ab und wieder an. Sie sollten zu einer Seite mit dem Titel _SubQuery autorisieren_ weitergeleitet werden, auf der Sie SubQuery-Zugriff auf Ihr GitHub-Organisationskonto anfordern oder gewähren können. Wenn Sie keine Administratorberechtigungen haben, müssen Sie einen Administrator anfordern, um dies für Sie zu aktivieren.

![Widerrufen Sie die Genehmigung von einem GitHub-Konto](/assets/img/project_auth_request.png)

Sobald diese Anfrage von Ihrem Administrator genehmigt wurde (oder Sie sie selbst gewähren können), sehen Sie das richtige GitHub-Organisationskonto im Kontowechsler.
