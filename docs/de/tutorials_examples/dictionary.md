# Wie funktioniert ein SubQuery-Wörterbuch?

Die ganze Idee eines generischen Wörterbuchprojekts besteht darin, alle Daten einer Blockchain zu indizieren und die Ereignisse, Extrinsik und ihre Typen (Modul und Methode) in einer Datenbank in der Reihenfolge der Blockhöhe aufzuzeichnen. Ein anderes Projekt kann dann diesen `network.dictionary`-Endpunkt anstelle des standardmäßigen `network.endpoint`, der in der Manifestdatei definiert ist, abfragen.

Der Endpunkt `network.dictionary` ist ein optionaler Parameter, der, falls vorhanden, vom SDK automatisch erkannt und verwendet wird. `network.endpoint` ist obligatorisch und wird nicht kompiliert, wenn es nicht vorhanden ist.

Nimmt man das [SubQuery-Wörterbuch](https://github.com/subquery/subql-dictionary)-Projekt als Beispiel, definiert die [Schema](https://github.com/subquery/subql-dictionary/blob/main/schema.graphql)-Datei 3 Entitäten; extrinsisch, Ereignisse, specVersion. Diese 3 Entitäten enthalten jeweils 6, 4 und 2 Felder. Wenn dieses Projekt ausgeführt wird, werden diese Felder in den Datenbanktabellen widergespiegelt.

![extrinsics Tabelle](/assets/img/extrinsics_table.png) ![Veranstaltungstabelle](/assets/img/events_table.png) ![Spezifikationstabelle](/assets/img/specversion_table.png)

Daten aus der Blockchain werden dann in diesen Tabellen gespeichert und auf Leistung indiziert. Das Projekt wird dann in SubQuery-Projekten gehostet und der API-Endpunkt kann der Manifestdatei hinzugefügt werden.

## Wie integrieren Sie ein Wörterbuch in Ihr Projekt?

Fügen Sie `Wörterbuch: https://api.subquery.network/sq/subquery/dictionary-polkadot` zum Netzwerkabschnitt des Manifests hinzu. z.B

```shell
network:
  endpoint: wss://polkadot.api.onfinality.io/public-ws
  dictionary: https://api.subquery.network/sq/subquery/dictionary-polkadot
```

## Was passiert, wenn ein Wörterbuch NICHT verwendet wird?

Wenn KEIN Wörterbuch verwendet wird, holt ein Indexer alle Blockdaten über die Polkadot-API gemäß dem Flag `batch-size`, das standardmäßig 100 beträgt, und legt diese zur Verarbeitung in einen Buffer. Später entnimmt der Indexer alle diese Blöcke aus dem Buffer und prüft während der Verarbeitung der Blockdaten, ob Ereignis und Extrinsic in diesen Blöcken mit dem benutzerdefinierten Filter übereinstimmen.

## Was passiert, wenn ein Wörterbuch verwendet wird?

Wenn ein Wörterbuch verwendet wird, nimmt der Indexer zuerst die Anruf- und Ereignisfilter als Parameter und führt diese in eine GraphQL-Abfrage ein. Es verwendet dann die API des Wörterbuchs, um nur eine Liste relevanter Blockhöhen zu erhalten, die die spezifischen Ereignisse und Extrinsiken enthält. Oftmals ist dies wesentlich weniger als 100, wenn der Standardwert verwendet wird.

Stellen Sie sich beispielsweise eine Situation vor, in der Sie Übertragungsereignisse indizieren. Nicht alle Blöcke haben dieses Ereignis (im Bild unten gibt es keine Transferereignisse in den Blöcken 3 und 4).

![Wörterbuchblock](/assets/img/dictionary_blocks.png)

Das Wörterbuch ermöglicht es Ihrem Projekt, dies zu überspringen. Anstatt in jedem Block nach einem Übertragungsereignis zu suchen, springt es nur zu den Blöcken 1, 2 und 5. Dies liegt daran, dass das Wörterbuch eine vorberechnete Referenz auf alle Aufrufe und Ereignisse in jedem Block ist.

Dies bedeutet, dass die Verwendung eines Wörterbuchs die Datenmenge reduzieren kann, die der Indexer aus der Chain erhält, und die Anzahl der „unerwünschten“ Blöcke, die im lokalen Buffer gespeichert werden, reduzieren kann. Im Vergleich zur herkömmlichen Methode wird jedoch ein zusätzlicher Schritt hinzugefügt, um Daten aus der API des Wörterbuchs abzurufen.

## Wann ist ein Wörterbuch NICHT sinnvoll?

Wenn [Blockhandler](https://doc.subquery.network/create/mapping.html#block-handler) verwendet werden, um Daten aus einer Chain zu holen, muss jeder Block verarbeitet werden. Daher bietet die Verwendung eines Wörterbuchs in diesem Fall keinen Vorteil und der Indexer wechselt automatisch zum Standardansatz ohne Wörterbuch.

Auch beim Umgang mit Ereignissen oder extrinsischen Ereignissen, die in jedem Block auftreten oder existieren, wie zum Beispiel `timestamp.set`, bietet die Verwendung eines Wörterbuchs keinen zusätzlichen Vorteil.
