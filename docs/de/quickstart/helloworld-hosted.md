# Hallo die Welt (SubQuery gehostet)

Das Ziel dieser Schnellstartanleitung besteht darin, zu zeigen, wie Sie in wenigen einfachen Schritten das standardmäßige Startprojekt in SubQuery Projects (unserem verwalteten Dienst) ausführen können.

Wir nehmen das einfache Starterprojekt (und alles, was wir bisher gelernt haben), aber anstatt es lokal in Docker auszuführen, nutzen wir die verwaltete Hosting-Infrastruktur von SubQuery. Mit anderen Worten, wir überlassen SubQuery die ganze schwere Arbeit, den Betrieb und die Verwaltung der Produktionsinfrastruktur.

## Lernziele

Am Ende dieses Schnellstarts sollten Sie:

- die erforderlichen Voraussetzungen verstehen
- ein Projekt in [SubQuery-Projekten](https://project.subquery.network/) hosten können
- eine einfache Abfrage ausführen, um die Blockhöhe des Polkadot-Mainnets über den Spielplatz zu erhalten
- eine einfache GET-Abfrage ausführen, um die Blockhöhe des Polkadot-Mainnets mit cURL zu erhalten

## Zielgruppe

Dieses Handbuch richtet sich an neue Entwickler, die über einige Entwicklungserfahrungen verfügen und daran interessiert sind, mehr über SubQuery zu erfahren.

## Videoanleitung

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/b-ba8-zPOoo" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Voraussetzungen

Was Sie noch brauchen:

- Github-Konto

## 1. Erstellen Sie das Projekt

Lassen Sie uns ein Projekt namens subqlHelloWorld erstellen, indem Sie `subql init` ausführen und auswählen, das Projekt mit dem `Polkadot`-Netzwerk zu erstellen, und das Projekt mit dem `subql-starter` initialisieren Schablone. Wir müssen die obligatorische Installation, Codegenerierung und Erstellung mit Ihrem bevorzugten Paketmanager ausführen.

```shell
> subql init subqlHelloWorld
yarn install
yarn codegen
yarn build
```

Führen Sie die Docker-Befehle jedoch NICHT aus.

## 2. Erstellen Sie ein GitHub-Repository

Erstellen Sie in GitHub ein neues öffentliches Repository. Geben Sie einen Namen an und stellen Sie Ihre Sichtbarkeit auf öffentlich ein. Hier wird vorerst alles als Standard beibehalten.

![Erstellen Sie ein Github-Repository](/assets/img/github_create_new_repo.png)

Notieren Sie sich Ihre GitHub-URL. Diese muss öffentlich sein, damit SubQuery darauf zugreifen kann.

![Erstellen Sie ein Github-Repository](/assets/img/github_repo_url.png)

## 3. Auf GitHub pushen

Zurück in Ihrem Projektverzeichnis, initialisieren Sie es als Git-Verzeichnis. Andernfalls erhalten Sie möglicherweise die Fehlermeldung "fatal: not a git repository (or any of the parent directory): .git"

```shell
git init
```

Fügen Sie dann ein Remote-Repository mit dem Befehl hinzu:

```shell
git remote add origin https://github.com/seandotau/subqlHelloWorld.git
```

Dies setzt Ihr Remote-Repository im Grunde auf „https://github.com/seandotau/subqlHelloWorld.git“ und gibt ihm den Namen „origin“, was die Standardnomenklatur für ein Remote-Repository in GitHub ist.

Als nächstes fügen wir den Code mit den folgenden Befehlen zu unserem Repository hinzu:

```shell
> git add .
> git commit -m "First commit"
[master (root-commit) a999d88] First commit
10 files changed, 3512 insertions(+)
create mode 100644 .gitignore
create mode 100644 README.md
create mode 100644 docker-compose.yml
create mode 100644 package.json
create mode 100644 project.yaml
create mode 100644 schema.graphql
create mode 100644 src/index.ts
create mode 100644 src/mappings/mappingHandlers.ts
create mode 100644 tsconfig.json
create mode 100644 yarn.lock
> git push origin master
Enumerating objects: 14, done.
Counting objects: 100% (14/14), fertig.
Delta-Komprimierung mit bis zu 12 Threads
Komprimieren von Objekten: 100% (13/13), fertig.
Schreibobjekte: 100% (14/14), 59,35 KiB | 8,48 MiB/s, fertig.
Total 14 (delta 0), reused 0 (delta 0)
To https://github.com/seandotau/subqlHelloWorld.git
 * [new branch]      master -> master

```

Der Push-Befehl bedeutet "Bitte schiebe meinen Code VON meinem lokalen Master-Repository in das Ursprungsrepo". Beim Aktualisieren von GitHub sollte der gesamte Code in GitHub angezeigt werden.

![Erstes Commit](/assets/img/first_commit.png)

Nachdem Sie Ihren Code nun in GitHub eingegeben haben, schauen wir uns an, wie wir ihn in SubQuery-Projekten hosten können.

## 4. Erstellen Sie das Projekt

Navigieren Sie zu [https://project.subquery.network](https://project.subquery.network) und melden Sie sich mit Ihrem GitHub-Konto an.

![Herzlich Willkommen bei SubQuery-Projekten](/assets/img/welcome_to_subquery_projects.png)

Dann erstellen Sie ein neues Projekt,

![Herzlich Willkommen bei SubQuery-Projekten](/assets/img/subquery_create_project.png)

Und füllen Sie die verschiedenen Felder mit den entsprechenden Angaben aus.

- **GitHub-Konto:** Wenn Sie mehr als ein GitHub-Konto haben, wählen Sie aus, unter welchem Konto dieses Projekt erstellt wird. Projekte, die in einem GitHub-Organisationskonto erstellt wurden, werden zwischen Mitgliedern dieser Organisation geteilt.
- **Projektname:** Geben Sie hier Ihrem Projekt einen Namen.
- **Untertitel:** Geben Sie einen Untertitel für Ihr Projekt an.
- **Beschreibung:** Erklären Sie, was Ihr SubQuery-Projekt tut.
- **GitHub-Repository-URL:** Dies muss eine gültige GitHub-URL zu einem öffentlichen Repository sein, das Ihr SubQuery-Projekt enthält. Die Datei schema.graphql muss sich im Stammverzeichnis Ihres Verzeichnisses befinden.
- **Hide project:** Wenn ausgewählt, wird das Projekt im öffentlichen SubQuery-Explorer ausgeblendet. Lassen Sie diese Option deaktiviert, wenn Sie Ihre SubQuery mit der Community teilen möchten!

![SubQuery-Parameter erstellen](/assets/img/create_subquery_project_parameters.png)

Wenn Sie auf create klicken, gelangen Sie zu Ihrem Dashboard.

![SubQuery-Projekt-Dashboard](/assets/img/subquery_project_dashboard.png)

Das Dashboard enthält viele nützliche Informationen wie das verwendete Netzwerk, die GitHub-Repository-URL des ausgeführten Quellcodes, wann er erstellt und zuletzt aktualisiert wurde, und insbesondere die Bereitstellungsdetails.

## 5. Step 5: Deploy your project

Nachdem Sie Ihr Projekt nun in SubQuery Projects erstellt und das Anzeigeverhalten eingerichtet haben, besteht der nächste Schritt darin, Ihr Projekt bereitzustellen, um es betriebsbereit zu machen. Das Bereitstellen einer Version löst den Start eines neuen SubQuery-Indizierungsvorgangs aus und richtet den erforderlichen Abfragedienst ein, um GraphQL-Anforderungen zu akzeptieren. Sie können hier auch neue Versionen für bestehende Projekte bereitstellen.

Sie können wählen, ob Sie in verschiedenen Umgebungen bereitstellen möchten, z. B. in einem Produktions-Slot oder einem Staging-Slot. Hier stellen wir einen Produktionsslot bereit. Wenn Sie auf die Schaltfläche "Deploy" klicken, wird ein Bildschirm mit den folgenden Feldern angezeigt:

![Im Produktionsslot bereitstellen](/assets/img/deploy_production_slot.png)

- **Commit-Hash der neuen Version:** Wählen Sie auf GitHub den richtigen Commit der SubQuery-Projektcodebasis aus, die Sie bereitstellen möchten
- **Indexer-Version:** Dies ist die Version der Notendienstes von SubQuery, auf der Sie diese SubQuery ausführen möchten. Sehen Sie [@subql/node](https://www.npmjs.com/package/@subql/node)
- **Query Version:** Dies ist die Version des Abfragedienstes von SubQuery, auf der Sie diese SubQuery ausführen möchten. Sehen Sie [@subql/query](https://www.npmjs.com/package/@subql/query)

Da wir nur einen Commit haben, gibt es nur eine einzige Option im Dropdown. Wir arbeiten auch mit der neuesten Version des Indexers und der Abfrageversion, akzeptieren also die Standardeinstellungen und klicken dann auf "Deploy Update".

Sie sehen dann Ihre Bereitstellung im Status "Processing". Hier wird Ihr Code in der verwalteten Infrastruktur von SubQuery bereitgestellt. Grundsätzlich wird ein Server bei Bedarf hochgefahren und für Sie bereitgestellt. Dies dauert ein paar Minuten, also ist es Zeit, sich einen Kaffee zu holen!

![Bereitstellungsverarbeitung](/assets/img/deployment_processing.png)

Die Bereitstellung wird jetzt ausgeführt.

![Bereitstellung läuft](/assets/img/deployment_running.png)

## 6. Testen Sie Ihr Projekt

Um Ihr Projekt zu testen, klicken Sie auf die drei Auslassungspunkte und wählen Sie "View on SubQuery Explorer".

![Subquery-Projekt anzeigen](/assets/img/view_on_subquery.png)

Dies bringt Sie zum allseits bekannten "Playground", wo Sie auf den Play-Button klicken und die Ergebnisse der Abfrage sehen können.

![Subquery-Playground

](/assets/img/subquery_playground.png)

## 7. Bonusschritt

Die Klugen unter uns werden sich erinnern, dass in den Lernzielen der letzte Punkt darin bestand, eine einfache GET-Abfrage auszuführen. Dazu müssen wir den in den Bereitstellungsdetails angezeigten "Query Endpoint" abrufen.

![Query-Endpoint](/assets/img/query_endpoint.png)

Sie können dann entweder mit Ihrem bevorzugten Client wie [Postman](https://www.postman.com/) oder [Mockoon](https://mockoon.com/) oder über cURL in Ihrem Terminal eine GET-Anfrage an diesen Endpunkt senden. Der Einfachheit halber wird cURL unten angezeigt.

Der auszuführende curl-Befehl lautet:

```shell
curl https://api.subquery.network/sq/seandotau/subqueryhelloworld -d "query=query { starterEntities (first: 5, orderBy: CREATED_AT_DESC) { totalCount nodes { id field1 field2 field3 } } }"
```

die Ergebnisse von:

```shell
{"data":{"starterEntities":{"totalCount":23098,"nodes":[{"id":"0x29dfe9c8e5a1d51178565c2c23f65d249b548fe75a9b6d74cebab777b961b1a6","field1":23098,"field2":null,"field3":null},{"id":"0xab7d3e0316a01cdaf9eda420cf4021dd53bb604c29c5136fef17088c8d9233fb","field1":23097,"field2":null,"field3":null},{"id":"0x534e89bbae0857f2f07b0dea8dc42a933f9eb2d95f7464bf361d766a644d17e3","field1":23096,"field2":null,"field3":null},{"id":"0xd0af03ab2000a58b40abfb96a61d312a494069de3670b509454bd06157357db6","field1":23095,"field2":null,"field3":null},{"id":"0xc9f5a92f4684eb039e11dffa4b8b22c428272b2aa09aff291169f71c1ba0b0f7","field1":23094,"field2":null,"field3":null}]}}}

```

Die Lesbarkeit ist hier kein Problem, da Sie wahrscheinlich etwas Front-End-Code haben werden, um diese JSON-Antwort zu verarbeiten und zu parsen.

## Zusammenfassung

In diesem von SubQuery gehosteten Schnellstart haben wir gezeigt, wie schnell und einfach es war, ein Subql-Projekt zu verwenden und es in [SubQuery-Projekten](https://project.subquery.network) bereitzustellen, wo Ihnen die gesamte Infrastruktur zur Verfügung gestellt wird. Es gibt einen integrierten Playground zum Ausführen verschiedener Abfragen sowie einen API-Endpunkt, in den Ihr Code integriert werden kann.
