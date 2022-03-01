# Die Erklärung von Hello World

In der [Hello World-Kurzanleitung](helloworld-localhost.md) sind wir einige einfache Befehle durchgegangen und haben sehr schnell ein Beispiel zum Laufen gebracht. Auf diese Weise konnten Sie sicherstellen, dass alle Voraussetzungen erfüllt sind und Sie einen lokalen Playground verwenden können, um eine einfache Abfrage durchzuführen, um Ihre ersten Daten von SubQuery abzurufen. Hier sehen wir uns genauer an, was all diese Befehle bedeuten.

## subql init

Der erste Befehl, den wir ausgeführt haben, war `subql init subqlHelloWorld`.

Dies erledigt die schwere Arbeit und erstellt eine ganze Reihe von Dateien für Sie. Wie in der [offiziellen Dokumentation](quickstart.md#configure-and-build-the-starter-project) vermerkt, werden Sie hauptsächlich an den folgenden Dateien arbeiten:

- Das Manifest in `project.yaml`
- Das GraphQL-Schema in `schema.graphql`
- Die Mapping-Funktionen im Verzeichnis `src/mappings/`directory

![key subql files](/assets/img/main_subql_files.png)

Diese Dateien sind der Kern von allem, was wir tun. Daher widmen wir diesen Dateien in einem anderen Artikel mehr Zeit. Vorerst sollten Sie jedoch nur wissen, dass das Schema eine Beschreibung der Daten enthält, die Benutzer von der SubQuery-API anfordern können, die Projekt-Yaml-Datei, die Parameter des Typs "Konfiguration" enthält, und natürlich die Zuordnungshandler, die Typskript enthalten, das Funktionen enthält, die die Daten umwandeln.

## yarn install

Als nächstes haben wir `yarn install` gemacht. `npm install` kann auch verwendet werden.

> Eine kurze Geschichtsstunde. Node Package Manager oder npm wurde ursprünglich im Jahr 2010 veröffentlicht und ist ein unter JavaScript-Entwicklern äußerst beliebter Paketmanager. Es ist das Standardpaket, das automatisch installiert wird, wenn Sie Node.js auf Ihrem System installieren. Yarn wurde ursprünglich 2016 von Facebook mit der Absicht veröffentlicht, einige der Leistungs- und Sicherheitsmängel bei der Arbeit mit npm (damals) zu beheben.

Yarn sieht sich die Datei `package.json` an und lädt verschiedene andere Abhängigkeiten herunter. Wenn Sie sich die Datei `package.json` ansehen, sieht es nicht so aus, als gäbe es viele Abhängigkeiten, aber wenn Sie den Befehl ausführen, werden Sie feststellen, dass 18.983 Dateien hinzugefügt werden. Dies liegt daran, dass jede Abhängigkeit auch ihre eigenen Abhängigkeiten hat.

![key subql files](/assets/img/dependencies.png)

## yarn codegen

Dann haben wir `yarn codegen` oder `npm run-script codegen` ausgeführt. Dies bewirkt, dass das GraphQL-Schema (in der `schema.graphql`) abgerufen und die zugehörigen Typoskript-Modelldateien generiert werden (daher haben die Ausgabedateien die Erweiterung .ts). Sie sollten keine dieser generierten Dateien ändern, sondern nur die Quelldatei `schema.graphql`.

![key subql files](/assets/img/typescript.png)

## yarn build

Anschließend wurde `yarn build` oder `npm run-script build` ausgeführt. Dies sollte erfahrenen Programmierern bekannt sein. Es erstellt einen Verteilungsordner, der Aufgaben wie die Codeoptimierung zur Vorbereitung einer Bereitstellung durchführt.

![key subql files](/assets/img/distribution_folder.png)

## docker-compose

Der letzte Schritt war der kombinierte Docker-Befehl `docker-compose pull && docker-compose up` (kann auch separat ausgeführt werden). Der Befehl `pull` ruft alle erforderlichen Images von Docker Hub ab und der Befehl `up` startet den Container.

```shell
> docker-compose pull
Pulling postgres        ... fertig
Pulling subquery-node   ... fertig
Pulling graphql-engine  ... fertig
```

Wenn der Container gestartet wird, werden Sie sehen, dass das Terminal viel Text ausgibt, der den Status der Node und der GraphQL-Engine anzeigt. Es ist, wenn Sie sehen:

```
subquery-node_1   | 2021-06-06T02:04:25.490Z <fetch> INFO fetch block [1, 100]
```

jetzt wissen Sie, dass die SubQuery-Node mit der Synchronisierung begonnen hat.

## Zusammenfassung

Nachdem Sie nun einen Einblick in das Geschehen unter der Decke bekommen haben, stellt sich die Frage, wo Sie von hier aus weiterkommen können. Wenn Sie sich sicher fühlen, können Sie gleich mit dem [Erstellen eines Projekts](../create/introduction.md) beginnen und mehr über die drei Schlüsseldateien erfahren. Die Manifestdatei, das GraphQL-Schema und die Zuordnungsdatei.

Fahren Sie andernfalls mit unserem Tutorial-Abschnitt fort, in dem wir uns ansehen, wie wir dieses Hello World-Beispiel in der gehosteten Infrastruktur von SubQuery ausführen können, wir werden uns das Ändern des Startblocks ansehen und tiefer in die Ausführung von SubQuery-Projekten eintauchen, indem wir sie sofort ausführen und Open-Source-Projekte.
