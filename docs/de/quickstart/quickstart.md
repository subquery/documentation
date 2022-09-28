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

::: wichtige Warnung

**Für Cosmos-Benutzer**

Cosmos wird noch nicht in der Befehlszeilenschnittstelle von SubQuery (`subql`) unterstützt. Wenn Sie Cosmos verwenden, müssen Sie daher mit einem Juno-Klon beginnen oder dieses [Starterprojekt](https://github.com/subquery/cosmos-subql-starter) forken.

Um Ihr Projekt mit Cosmos zu initialisieren, folgen Sie diesen 4 Schritten, die in diesem [Link](https://github.com/subquery/juno-subql-starter#readme) gezeigt werden. Sobald Sie diese 4 Schritte ausgeführt haben, **springen** Sie zum Abschnitt [Änderungen an Ihrem Projekt vornehmen](../quickstart/quickstart.md#_3-make-changes-to-your-project). :::

Im weiteren Verlauf werden Ihnen bestimmte Fragen gestellt:

- **Projektname**: Ein Projektname für Ihr SubQuery-Projekt.
- **Netzwerkfamilie**: Die Layer-1-Blockchain-Netzwerkfamilie, die dieses SubQuery-Projekt indizieren wird. Verwenden Sie die Pfeiltasten, um aus den verfügbaren Optionen auszuwählen. Zum Beispiel Polkadot, Avalanche, Cosmos oder jedes andere unterstützte Netzwerk.
- **Netzwerk**: Das spezifische Netzwerk, das dieses SubQuery-Projekt indizieren wird. Verwenden Sie die Pfeiltasten, um aus den verfügbaren Optionen auszuwählen. Zum Beispiel Polkadot, Avalanche oder jedes andere unterstützte Netzwerk.
- **Vorlagenprojekt**: Wählen Sie ein SubQuery-Vorlagenprojekt aus, das einen Ausgangspunkt für die Entwicklung darstellt. Wir empfehlen, das Projekt _"subql-starter"_ auszuwählen.
- **RPC-Endpunkt**: Geben Sie eine HTTPS-URL zu einem ausgeführten RPC-Endpunkt an, der standardmäßig für dieses Projekt verwendet wird. Sie können schnell auf öffentliche Endpunkte für verschiedene Netzwerke zugreifen, Ihren eigenen privaten dedizierten Knoten mit [OnFinality](https://app.onfinality.io) erstellen oder einfach den Standardendpunkt verwenden. Dieser RPC-Node muss ein Archivnode sein (den Zustand der vollständigen Chain haben). Wir werden den Standardwert für diese Anleitung verwenden. Basierend auf dem ausgewählten Netzwerk kann der Standardwert wie folgt lauten:
  - Für Polkadot - _"https://polkadot.api.onfinality.io"_,
  - Für Avalanche - _"https://avalanche.api.onfinality.io"_,
  - Für Terra - _"https://terra-columbus-5.beta.api.onfinality.io"_ und ebenso für andere Netzwerke. <br/>
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

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

Mit wenigen Handgriffen haben Sie nun Ihr erstes SubQuery-Projekt initialisiert. Lassen Sie uns nun das Standardvorlagenprojekt für eine bestimmte Blockchain von Interesse anpassen.

Sie können sich auf die [Befehlszeilenargumente](../run_publish/references.md) beziehen, die in SubQuery verwendet werden. Es wird Ihnen helfen, die Befehle besser zu verstehen.

## 3. Nehmen Sie Änderungen an Ihrem Projekt vor

Es gibt 3 wichtige Dateien, die geändert werden müssen. Dies sind:

1. Das GraphQL-Schema in `schema.graphql`.
2. Das Projektmanifest in `project.yaml`.
3. Die Mapping-Funktionen im Verzeichnis `src/mappings/`.

SubQuery supports various blockchain networks and provides a dedicated guide for each of them. Select your preferred blockchain under 2. Specific Chains and continue the quick start guide.