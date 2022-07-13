# Hosten eines Projekts mit IPFS

In diesem Leitfaden wird beschrieben, wie Sie ein lokales SubQuery-Projekt in [IPFS](https://ipfs.io/) veröffentlichen und in unserer Hosting-Infrastruktur bereitstellen.

Hosting a project in IPFS makes it available for all and reduces your reliance on centralised services like GitHub.

## Anforderungen

- `@subql/cli` Version 0.21.0 oder höher.
- Manifest `specVersion` 0.2.0 und höher.
- Get your [SUBQL_ACCESS_TOKEN](ipfs.md#prepare-your-subql-access-token) ready.
- Um sicherzustellen, dass Ihre Bereitstellung erfolgreich ist, empfehlen wir dringend, dass Sie Ihr Projekt mit dem Befehl `subql build` erstellen und es vor der Veröffentlichung lokal testen.

## Bereiten Sie Ihr SUBQL_ACCESS_TOKEN vor

- Schritt 1: Gehen Sie zu [SubQuery Projects](https://project.subquery.network/) und melden Sie sich an.
- Step 2: Click on your profile at the top right of the navigation menu, then click on **_Refresh Token_**.
- Schritt 3: Kopieren Sie das generierte Token.
- Schritt 4: So verwenden Sie dieses Token:
  - Variante 1: Fügen Sie SUBQL_ACCESS_TOKEN zu Ihren Umgebungsvariablen hinzu. `EXPORT SUBQL_ACCESS_TOKEN=<token>`
  - Variante 2: Demnächst wird `subql/cli` das lokale Speichern Ihres SUBQL_ACCESS_TOKEN unterstützen.

## Wie kann man ein Projekt veröffentlichen?

We provide two methods to publish your project:

### Option 1

As you have `@subql/cli` already installed, you can run the following command, which will read the project and required information from its default manifest `project.yaml`:

```
// Veröffentlichen Sie es aus dem Stammverzeichnis Ihres Projekts
subql publish

// OR point zu Ihrem Projektstamm
subql publish -f ~/my-project/
```

### Option 2

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

## Nach der Veröffentlichung

Nach erfolgreicher Veröffentlichung des Projekts zeigen die Protokolle unten, dass das Projekt auf dem IPFS-Cluster erstellt wurde und seine `CID` (Content Identifier) zurückgegeben hat.

```
Bau- und Verpackungscode ... fertig
Hochladen des SupQuery-Projekts in IPFS
Auf IPFS hochgeladenes SubQuery-Projekt:
QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd  //CID
```

Bitte notieren Sie sich diese `CID`. With this `CID`, you can view your published project as what we call it [IPFS Deployment](ipfs.md#ipfs-deployment).

## IPFS-Bereitstellung

Die IPFS-Bereitstellung stellt eine unabhängige und einzigartige Existenz eines SubQuery-Projekts in einem dezentralisierten Netzwerk dar. Daher wirken sich alle Änderungen am Code im Projekt auf dessen Eindeutigkeit aus. Wenn Sie Ihre Geschäftslogik anpassen müssen, z.B. Wenn Sie die Zuordnungsfunktion ändern, müssen Sie das Projekt erneut veröffentlichen, und die `CID` ändert sich.

For now, to view the project you have published, use a `REST` api tool such as [Postman](https://web.postman.co/), and use `POST` method with the following example URL to retrieve it:`https://ipfs.subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`.

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

## Führen Sie Ihr SubQuery-Projekt auf dem gehosteten Dienst aus

### Projekt mit IPFS-Bereitstellung erstellen

You can follow the guide to [Publish your SubQuery project](../run_publish/publish.md) but where you set your deployment source you can select **IPFS**.

Wählen Sie dann Ihren Produktionsslot aus, kopieren Sie Ihre IPFS-Bereitstellungs-CID und fügen Sie sie ein (ohne das vorangestellte `ipfs://`).

Sie sollten Ihre IPFS-Bereitstellung im Vorschaubereich sehen. Und Sie können das Netzwerk, die Wörterbuchendpunkte usw. auswählen.

Nach erfolgreicher Bereitstellung der IPFS-Bereitstellung auf unserem gehosteten Dienst sollte sie im SubQuery Explorer angezeigt werden können, Sie können auf den Abfragedienst genauso zugreifen wie lokal.
