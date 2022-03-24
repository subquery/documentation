# Hosten eines Projekts mit IPFS

In diesem Leitfaden wird beschrieben, wie Sie ein lokales SubQuery-Projekt in [IPFS](https://ipfs.io/) veröffentlichen und in unserer Hosting-Infrastruktur bereitstellen.

Das Hosten eines Projekts in IPFS macht es für alle verfügbar und verringert Ihre Abhängigkeit von zentralisierten Diensten wie GitHub.

## Anforderungen

- `@subql/cli` Version 0.21.0 oder höher.
- Manifest `specVersion` 0.2.0 und höher.
- Halten Sie Ihr [SUBQL_ACCESS_TOKEN](#prepare-your-subql-access-token) bereit.
- Um sicherzustellen, dass Ihre Bereitstellung erfolgreich ist, empfehlen wir dringend, dass Sie Ihr Projekt mit dem Befehl `subql build` erstellen und es vor der Veröffentlichung lokal testen.

## Bereiten Sie Ihr SUBQL_ACCESS_TOKEN vor

- Schritt 1: Gehen Sie zu [SubQuery Projects](https://project.subquery.network/) und melden Sie sich an.
- Schritt 2: Klicken Sie oben rechts im Navigationsmenü auf Ihr Profil und dann auf **_Refresh Token_**
- Schritt 3: Kopieren Sie das generierte Token.
- Schritt 4: So verwenden Sie dieses Token:
  - Option 1: Fügen Sie SUBQL_ACCESS_TOKEN zu Ihren Umgebungsvariablen hinzu. `EXPORT SUBQL_ACCESS_TOKEN=<token>`
  - Option 2: Demnächst wird `subql/cli` das lokale Speichern Ihres SUBQL_ACCESS_TOKEN unterstützen.

## So veröffentlichen Sie ein Projekt

Wir bieten zwei Methoden, um Ihr Projekt zu veröffentlichen,

### Variante 1:

Da Sie `@subql/cli` bereits installiert haben, können Sie den folgenden Befehl ausführen, der das Projekt und die erforderlichen Informationen aus seinem Standardmanifest `project.yaml` liest

```
// Veröffentlichen Sie es aus dem Stammverzeichnis Ihres Projekts
subql publish

// OR point zu Ihrem Projektstamm
subql publish -f ~/my-project/
```

### Variante 2:

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

Bitte notieren Sie sich diese `CID`. Mit dieser `CID` können Sie Ihr veröffentlichtes Projekt als sogenannte [IPFS-Bereitstellung](#ipfs-deployment) anzeigen

## IPFS-Bereitstellung

Die IPFS-Bereitstellung stellt eine unabhängige und einzigartige Existenz eines SubQuery-Projekts in einem dezentralisierten Netzwerk dar. Daher wirken sich alle Änderungen am Code im Projekt auf dessen Eindeutigkeit aus. Wenn Sie Ihre Geschäftslogik anpassen müssen, z.B. Wenn Sie die Zuordnungsfunktion ändern, müssen Sie das Projekt erneut veröffentlichen, und die `CID` ändert sich.

Um das von Ihnen veröffentlichte Projekt anzuzeigen, verwenden Sie vorerst ein `REST`-API-Tool wie [Postman](https://web.postman.co/) und die `POST`-Methode mit der folgenden Beispiel-URL um es abzurufen. `https://ipfs.subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`

Sie sollten die Beispielprojektbereitstellung wie folgt sehen:

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

Sie können der Anleitung zum [Veröffentlichen Ihres SubQuery-Projekts](publish.md) folgen, aber dort, wo Sie Ihre Bereitstellungsquelle festlegen, können Sie **IPFS** auswählen.

Wählen Sie dann Ihren Produktionsslot aus, kopieren Sie Ihre IPFS-Bereitstellungs-CID und fügen Sie sie ein (ohne das vorangestellte `ipfs://`).

Sie sollten Ihre IPFS-Bereitstellung im Vorschaubereich sehen. Und Sie können das Netzwerk, die Wörterbuchendpunkte usw. auswählen.

Nach erfolgreicher Bereitstellung der IPFS-Bereitstellung auf unserem gehosteten Dienst sollte sie im SubQuery Explorer angezeigt werden können, Sie können auf den Abfragedienst genauso zugreifen wie lokal.
