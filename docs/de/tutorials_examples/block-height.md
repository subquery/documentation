# Wie starte ich mit einer anderen Blockhöhe?

## Videoanleitung

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/ZiNSXDMHmBk" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Die Einführung

Standardmäßig beginnen alle Starterprojekte mit der Synchronisierung der Blockchain aus dem Genesis-Block. Mit anderen Worten, ab Block 1. Bei großen Blockchains kann die vollständige Synchronisierung normalerweise Tage oder sogar Wochen dauern.

Um eine SubQuery-Node mit der Synchronisierung aus einer Höhe ungleich Null zu starten, müssen Sie lediglich Ihre Datei project.yaml und den startBlock-Schlüssel ändern.

Unten ist eine Datei project.yaml, in der der Startblock auf 1.000.000  gesetzt wurde

```shell
specVersion: 0.0.1
description: ""
repository: ""
schema: ./schema.graphql
network:
  endpoint: wss://polkadot.api.onfinality.io/public-ws
  dictionary: https://api.subquery.network/sq/subquery/dictionary-polkadot
dataSources:
  - name: main
    kind: substrate/Runtime
    startBlock: 1000000
    mapping:
      handlers:
        - handler: handleBlock
          kind: substrate/BlockHandler
```

## Warum nicht bei Null anfangen?

Der Hauptgrund ist, dass es die Zeit zum Synchronisieren der Blockchain verkürzen kann. Dies bedeutet, dass Sie, wenn Sie nur an Transaktionen der letzten 3 Monate interessiert sind, nur die letzten 3 Monate synchronisieren können, was weniger Wartezeit bedeutet und Sie schneller mit Ihrer Entwicklung beginnen können.

## Welche Nachteile hat es, nicht bei Null anzufangen?

Der offensichtlichste Nachteil ist, dass Sie keine Daten in der Blockchain für Blöcke abfragen können, die Sie nicht haben.

## Wie finde ich die aktuelle Blockchain-Höhe heraus?

Wenn Sie das Polkadot-Netzwerk verwenden, können Sie [https://polkascan.io/](https://polkascan.io/) besuchen, das Netzwerk auswählen und dann die Abbildung "Abgeschlossener Block" anzeigen.

## Muss ich einen Rebuild oder Codegen machen?

Nein Da Sie die Datei project.yaml ändern, bei der es sich im Wesentlichen um eine Konfigurationsdatei handelt, müssen Sie den Typoskriptcode nicht neu erstellen oder generieren.
