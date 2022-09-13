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

Um Ihr erstes Projekt zu erstellen, gehen Sie zu [SubQuery Projects](https://project.subquery.network). Sie müssen sich mit Ihrem GitHub-Konto authentifizieren, um sich anzumelden.

Bei der ersten Anmeldung werden Sie aufgefordert, SubQuery zu autorisieren. Wir benötigen Ihre E-Mail-Adresse nur, um Ihr Konto zu identifizieren, und wir verwenden keine anderen Daten aus Ihrem GitHub-Konto für andere Zwecke. In diesem Schritt können Sie auch Zugriff auf Ihr GitHub-Organisationskonto anfordern oder gewähren, sodass Sie SubQuery-Projekte unter Ihrer GitHub-Organisation statt unter Ihrem persönlichen Konto veröffentlichen können.

![Widerrufen Sie die Genehmigung von einem GitHub-Konto](/assets/img/project_auth_request.png)

Unter SubQuery-Projekte verwalten Sie alle Ihre gehosteten Projekte, die auf die SubQuery-Plattform hochgeladen wurden. Mit dieser Anwendung können Sie Projekte erstellen, löschen und sogar aktualisieren.

![Projekte-Login](/assets/img/projects-dashboard.png)

Wenn Sie mit einem GitHub-Organisationskonto verbunden sind, können Sie den Umschalter in der Kopfzeile verwenden, um zwischen Ihrem persönlichen Konto und Ihrem GitHub-Organisationskonto zu wechseln. In einem GitHub-Organisationskonto erstellte Projekte werden von Mitgliedern dieser GitHub-Organisation gemeinsam genutzt. Um Ihr GitHub-Organisationskonto zu verbinden, können Sie [diesen Schritten folgen](publish.md#add-github-organization-account-to-subquery-projects).

![Wechseln Sie zwischen GitHub-Konten](/assets/img/projects-account-switcher.png)

### Erstellen Sie Ihr erstes Projekt

Es gibt zwei Methoden zum Erstellen eines Projekts im SubQuery Managed Service: Sie können die Benutzeroberfläche verwenden oder direkt über das CLI-Tool `subql`

#### Verwendung von UI

Beginnen wir mit einem Klick auf „Create Project“. Sie werden zum Formular „Neues Projekt“ weitergeleitet. Bitte geben Sie Folgendes ein (Sie können dies in Zukunft ändern):

- **GitHub-Konto:** Wenn Sie mehr als ein GitHub-Konto haben, wählen Sie aus, unter welchem Konto dieses Projekt erstellt werden soll. Projekte, die in einem GitHub-Organisationskonto erstellt wurden, werden von Mitgliedern dieser Organisation gemeinsam genutzt.
- **Projekt-Name**
- **Untertitel**
- **Beschreibung**
- **GitHub-Repository-URL:** Dies muss eine gültige GitHub-URL zu einem öffentlichen Repository sein, das Ihr SubQuery-Projekt enthält. Die Datei `schema.graphql` muss sich im Stammverzeichnis Ihres Verzeichnisses befinden ([erfahren Sie mehr über die Verzeichnisstruktur](../build/introduction.md#directory-structure)).
- **Datenbank:** Premium-Kunden können auf dedizierte Datenbanken zugreifen, um SubQuery-Produktionsprojekte zu hosten. Wenn Sie daran interessiert sind, können Sie sich an [sales@subquery.network](mailto:sales@subquery.network) wenden, um diese Einstellung zu aktivieren.
- **Bereitstellungsquelle:** Sie können wählen, ob das Projekt aus dem GitHub-Repository oder alternativ von einem IPFS-CID bereitgestellt werden soll, siehe unsere Anleitung zum [Hosting mit IPFS.](ipfs.md)
- **Projekt ausblenden:** Wenn diese Option ausgewählt ist, wird das Projekt vor dem öffentlichen SubQuery-Explorer ausgeblendet. Lassen Sie diese Option deaktiviert, wenn Sie Ihre Unterabfrage mit der Community teilen möchten!

![Erstellen Sie Ihr erstes Projekt](/assets/img/projects-create.png)

Erstellen Sie Ihr Projekt und Sie sehen es in der Liste Ihres SubQuery-Projekts. _Wir sind fast da! Wir müssen nur eine neue Version davon bereitstellen._

![Erstelltes Projekt ohne Bereitstellung](/assets/img/projects-no-deployment.png)

#### Verwendung von CLI

Sie können auch `@subql/cli` verwenden, um Ihr Projekt in unserem Managed Service zu veröffentlichen. Dies erfordert:

- `@subql/cli` Version 1.1.0 oder höher.
- Ein gültiges [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) bereit.

```shell
// Erstellen eines Projekts mit der CLI
$ subql project:create-project

// ODER bei Verwendung von nicht interaktiv werden Sie gefragt, ob die erforderlichen Felder fehlen
$ subql project:create-project
    --apiVersion=apiVersion      Api version is default to 2
    --description=description    Enter description
    --gitRepo=gitRepo            Enter git repository
    --org=org                    Enter organization name
    --projectName=projectName  Enter project name
```

### Stellen Sie Ihre erste Version bereit

Es gibt drei Methoden zum Bereitstellen einer neuen Version Ihres Projekts für den verwalteten SubQuery-Dienst: Sie können die Benutzeroberfläche oder direkt über das CLI-Tool `subql` oder eine automatisierte GitHub-Aktion verwenden.

#### Verwendung von UI

Während das Erstellen eines Projekts das Anzeigeverhalten des Projekts einrichtet, müssen Sie eine Version davon bereitstellen, bevor es einsatzbereit ist. Das Bereitstellen einer Version löst einen neuen SubQuery-Indizierungsvorgang aus und richtet den erforderlichen Abfragedienst ein, um mit der Annahme von GraphQL-Anforderungen zu beginnen. Sie können hier auch neue Versionen für bestehende Projekte bereitstellen.

Bei Ihrem neuen Projekt sehen Sie die Schaltfläche Neue Version bereitstellen. Klicken Sie darauf und geben Sie die erforderlichen Informationen zur Bereitstellung ein:

- **Zweig:** Wählen Sie auf GitHub den Zweig des Projekts aus, von dem aus Sie bereitstellen möchten.
- **Commit-Hash:** Wählen Sie auf GitHub das spezifische Commit der Version Ihrer SubQuery-Projektcodebasis aus, die Sie bereitstellen möchten.
- **IPFS:** Wenn Sie von IPFS aus bereitstellen, fügen Sie Ihre IPFS-Bereitstellungs-CID ein (ohne das führende `ipfs://`).
- **Netzwerk- und Wörterbuchendpunkte überschreiben:** Hier können Sie die Endpunkte in Ihrem Projektmanifest überschreiben.
- **Indexer-Version:** Dies ist die Version des Knotendienstes von SubQuery, auf der Sie diese SubQuery ausführen möchten. Siehe [`@subql/node`](https://www.npmjs.com/package/@subql/node).
- **Abfrageversion:** Dies ist die Version des Abfragedienstes von SubQuery, auf der Sie diese SubQuery ausführen möchten. Siehe [`@subql/query`](https://www.npmjs.com/package/@subql/query).

![Stellen Sie Ihr erstes Projekt bereit](https://static.subquery.network/media/projects/projects-first-deployment.png)

Bei erfolgreicher Bereitstellung sehen Sie, wie der Indexer zu arbeiten beginnt und den Fortschritt beim Indizieren der aktuellen Kette zurückmeldet. Dieser Vorgang kann einige Zeit dauern, bis er 100 % erreicht.

#### Verwendung von CLI

Sie können auch `@subql/cli` verwenden, um eine neue Bereitstellung Ihres Projekts für unseren Managed Service zu erstellen. Dies erfordert:

- `@subql/cli` Version 1.1.0 oder höher.
- Ein gültiges [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token)  ist bereit.

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

Mit der Einführung der Bereitstellungsfunktion für die CLI haben wir [dem Starterprojekt in GitHub](https://github.com/subquery/subql-starter/blob/v1.0.0/.github/workflows/cli-deploy.yml) einen **Standardaktions-Workflow** hinzugefügt, mit dem Sie Ihre Änderungen automatisch veröffentlichen und bereitstellen können :

- Schritt 1: Nachdem Sie Ihr Projekt auf GitHub gepusht haben, erstellen Sie eine `DEPLOYMENT`-Umgebung auf GitHub und fügen Sie das Geheimnis [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) hinzu.
- Schritt 2: Erstellen Sie ein Projekt in [SubQuery Projects](https://project.subquery.network). Dies kann über die [Benutzeroberfläche](#using-the-ui) oder die [CLI](#using-the-cli) erfolgen.
- Schritt 3: Navigieren Sie nach der Erstellung Ihres Projekts zur GitHub-Aktionsseite für Ihr Projekt und wählen Sie den Workflow `CLI-Bereitstellung` aus
- Schritt 4: Sie sehen ein Eingabefeld, in das Sie den eindeutigen Code Ihres in SubQuery Projects erstellten Projekts eingeben können. Sie können den Code aus der URL in SubQuery Projects [SubQuery Projects](https://project.subquery.network) abrufen. Der Code basiert auf dem Namen Ihres Projekts, wobei Leerzeichen durch Bindestriche `-` ersetzt werden. z.B. `my project name` wird zu `my-project-name`
- Sobald der Workflow abgeschlossen ist, sollte Ihr Projekt für unseren Managed Service bereitgestellt werden

Ein gängiger Ansatz besteht darin, die standardmäßige GitHub-Aktion so zu erweitern, dass Änderungen automatisch an unserem verwalteten Dienst bereitgestellt werden, wenn Code in „main“ zusammengeführt wird. Die folgende Änderung am GitHub Action-Workflow bewirkt dies:

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

Alternativ können Sie auf die drei Punkte neben dem Titel Ihres Projekts klicken und es im SubQuery Explorer anzeigen. Dort können Sie den Spielplatz im Browser verwenden, um loszulegen - [lesen Sie hier mehr über die Verwendung unseres Explorers](../run_publish/query.md).

![Projekte im SubQuery Explorer](/assets/img/projects-explorer.png)

## Fügen Sie das GitHub-Organisationskonto zu SubQuery-Projekten hinzu

Es ist üblich, Ihr SubQuery-Projekt unter dem Namen Ihres GitHub-Organisationskontos und nicht unter Ihrem persönlichen GitHub-Konto zu veröffentlichen. Sie können Ihr derzeit ausgewähltes Konto in [SubQuery Projects](https://project.subquery.network) jederzeit mit dem Kontowechsler ändern.

![Wechseln Sie zwischen GitHub-Konten](/assets/img/projects-account-switcher.png)

Wenn Sie Ihr GitHub-Organisationskonto nicht im Switcher sehen können, müssen Sie möglicherweise Zugriff auf SubQuery für Ihre GitHub-Organisation gewähren (oder es von einem Administrator anfordern). Dazu müssen Sie zunächst die Berechtigungen Ihres GitHub-Kontos für die SubQuery-Anwendung widerrufen. Melden Sie sich dazu bei Ihren Kontoeinstellungen in GitHub an, gehen Sie zu Anwendungen und widerrufen Sie auf der Registerkarte Autorisierte OAuth-Apps SubQuery – [Sie können die genauen Schritte hier befolgen](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Keine Sorge, Ihr SubQuery-Projekt wird dadurch nicht gelöscht und Sie verlieren keine Daten.**

![Widerrufen Sie den Zugriff auf das GitHub-Konto](/assets/img/project_auth_revoke.png)

Sobald Sie den Zugriff widerrufen haben, melden Sie sich von [SubQuery Projects](https://project.subquery.network) ab und wieder an. Sie sollten zu einer Seite mit dem Titel _SubQuery autorisieren_ weitergeleitet werden, auf der Sie SubQuery-Zugriff auf Ihr GitHub-Organisationskonto anfordern oder gewähren können. Wenn Sie keine Administratorberechtigungen haben, müssen Sie einen Administrator anfordern, um dies für Sie zu aktivieren.

![Widerrufen Sie die Genehmigung von einem GitHub-Konto](/assets/img/project_auth_request.png)

Sobald diese Anfrage von Ihrem Administrator genehmigt wurde (oder Sie sie selbst gewähren können), sehen Sie das richtige GitHub-Organisationskonto im Kontowechsler.
