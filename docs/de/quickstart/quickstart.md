# 1. Erstellen Sie ein neues Projekt

Das Ziel dieser Schnellstartanleitung ist es, Ihnen ein vollständiges Entwicklungssetup und geführte Schritte zum Erstellen Ihres ersten SubQuery-Blockchain-Projekts bereitzustellen. Es richtet sich an erfahrene Entwickler bis hin zu denen, die gerade erst ihre Blockchain-Reise beginnen.

Diese Kurzanleitung sollte etwa 10-15 Minuten dauern.

Nach Abschluss dieser Kurzanleitung verfügen Sie über ein funktionierendes SubQuery-Projekt, das auf einem SubQuery-Knoten ausgeführt wird. Sie können das Standard-Starterprojekt anpassen und Übertragungen von Ihrem bevorzugten Blockchain-Netzwerk wie Polkadot, Avalanche, Cosmos usw. indizieren.

Beginnen wir mit der Erstellung Ihres ersten SubQuery-Blockchain-Projekts.

## Voraussetzungen

Bevor Sie mit der Erstellung Ihres Blockchain-Projekts mit SubQuery beginnen, vergewissern Sie sich, dass Sie die ersten unterstützenden Softwareanwendungen installiert haben. Diese sind:

- [Node](https://nodejs.org/en/): Eine moderne (z. B. die LTS-Version) Installation von Node.
- [Docker](https://docker.com/): Dieses Tutorial verwendet das erforderliche Docker.

Jetzt können Sie mit dem ersten Schritt beginnen, nämlich der Installation der SubQuery-CLI.

## 1. Installieren Sie die SubQuery-CLI

Installieren Sie die SubQuery-CLI mithilfe von NPM global auf Ihrem Terminal:

```shell
# NPM
npm install -g @subql/cli
```

::: Achtung Wir empfehlen **NICHT** die Verwendung von `yarn global` für die Installation von `@subql/cli` aufgrund seines schlechten Abhängigkeitsmanagements. Dies kann zu mehreren Fehlern führen. :::

Sehen Sie sich alle verfügbaren Befehle und ihre Verwendung an. Führen Sie den folgenden Befehl in der CLI aus:

```shell
subql help
```

## 2. Initialisieren Sie das SubQuery-Starterprojekt

Führen Sie den folgenden Befehl in dem Verzeichnis aus, in dem Sie ein SubQuery-Projekt erstellen möchten:

```shell
subql init
```

Im weiteren Verlauf werden Ihnen bestimmte Fragen gestellt:

- **Projektname**: Ein Projektname für Ihr SubQuery-Projekt.
- **Netzwerkfamilie**: Die Layer-1-Blockchain-Netzwerkfamilie, die dieses SubQuery-Projekt indizieren wird. Verwenden Sie die Pfeiltasten, um aus den verfügbaren Optionen auszuwählen. Zum Beispiel Polkadot, Avalanche, Cosmos oder jedes andere unterstützte Netzwerk.
- **Netzwerk**: Das spezifische Netzwerk, das dieses SubQuery-Projekt indizieren wird. Verwenden Sie die Pfeiltasten, um aus den verfügbaren Optionen auszuwählen. Zum Beispiel Polkadot, Avalanche oder jedes andere unterstützte Netzwerk.
- **Vorlagenprojekt**: Wählen Sie ein SubQuery-Vorlagenprojekt aus, das einen Ausgangspunkt für die Entwicklung darstellt. Wir empfehlen, das Projekt _"subql-starter"_ auszuwählen.
- **RPC endpoint**: Provide an HTTP or websocket URL to a running RPC endpoint, which will be used by default for this project. Sie können schnell auf öffentliche Endpunkte für verschiedene Netzwerke zugreifen, Ihren eigenen privaten dedizierten Knoten mit [OnFinality](https://app.onfinality.io) erstellen oder einfach den Standardendpunkt verwenden. This RPC node must have the entire state of the data that you wish to index, so we recommend an archive node. Wir werden den Standardwert für diese Anleitung verwenden. Basierend auf dem ausgewählten Netzwerk kann der Standardwert wie folgt lauten:
  - For Polkadot - _"wss://polkadot.api.onfinality.io/public-ws"_,
  - For Avalanche - _"https://avalanche.api.onfinality.io/public/ext/bc/C/rpc"_,
  - For Ethereum - _“https://eth.api.onfinality.io/public”_ and likewise for other networks.
- **Git-Repository**: Geben Sie eine Git-URL zu einem Repository an, in dem dieses SubQuery-Projekt gehostet wird (wenn es in SubQuery Explorer gehostet wird), oder akzeptieren Sie die bereitgestellte Standardeinstellung.
- **Autoren**: Geben Sie hier den Eigentümer dieses SubQuery-Projekts ein (z. B. Ihren Namen!) oder übernehmen Sie die vorgegebene Vorgabe.
- **Beschreibung**: Geben Sie einen kurzen Absatz zu Ihrem Projekt an, der beschreibt, welche Daten es enthält und was Benutzer damit tun können, oder akzeptieren Sie die bereitgestellte Standardeinstellung.
- **Version**: Geben Sie eine benutzerdefinierte Versionsnummer ein oder verwenden Sie die Standardversion (`1.0.0`).
- **Lizenz**: Geben Sie die Softwarelizenz für dieses Projekt an oder akzeptieren Sie die Standardeinstellung (`MIT`).

Sehen wir uns ein Beispiel an:

```shell
$ subql init
Project name [subql-starter]: HelloWorld
? Wählen Sie ein Substrat der Netzwerkfamilie aus
? Wählen Sie einen Netzwerk-Polkadot aus
? Select a template project subql-starter     Starter project for subquery
RPC endpoint: [wss://polkadot.api.onfinality.io/public-ws]:
Git repository [https://github.com/subquery/subql-starter]:
Fetching network genesis hash... done
Author [Ian He & Jay Ji]: Sean
Description [This project can be used as a starting po...]:
Version [1.0.0]:
License [MIT]:
Preparing project... done
HelloWorld is ready
```

Nachdem Sie den Initialisierungsprozess abgeschlossen haben, sehen Sie einen Ordner mit Ihrem Projektnamen, der im Verzeichnis erstellt wurde. Bitte beachten Sie, dass der Inhalt dieses Verzeichnisses mit dem identisch sein sollte, was in der [Verzeichnisstruktur](../build/introduction.md#directory-structure) aufgeführt ist.

Führen Sie abschließend den folgenden Befehl aus, um die Abhängigkeiten des neuen Projekts aus dem Verzeichnis des neuen Projekts zu installieren.

::: code-tabs @tab:active yarn

```shell
cd PROJECT_NAME
yarn install
```

@tab npm

```shell
cd PROJECT_NAME
npm install
```

:::

You have now initialised your first SubQuery project with just a few simple steps. Let’s now customise the standard template project for a specific blockchain of interest.

You may want to refer to the [command line arguments](../run_publish/references.md) used in SubQuery. It will help you understand the commands better.

## 3. Make Changes to Your Project

There are 3 important files that need to be modified. Diese sind:

1. The GraphQL Schema in `schema.graphql`.
2. Das Projektmanifest in `project.yaml`.
3. Die Mapping-Funktionen im Verzeichnis `src/mappings/`.

SubQuery supports various blockchain networks and provides a dedicated guide for each of them. Select your preferred blockchain under 2. Specific Chains and continue the quick start guide.
