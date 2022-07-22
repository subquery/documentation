# Verbraucher

## Wer ist ein Verbraucher?

Ein Verbraucher ist ein Teilnehmer des SubQuery-Netzwerks und entweder eine Einzelperson oder eine Organisation, die für verarbeitete und organisierte Blockchain-Daten aus dem SubQuery-Netzwerk bezahlt. Verbraucher fordern bestimmte Daten effektiv beim SubQuery-Netzwerk an und zahlen im Gegenzug einen vereinbarten SQT-Betrag.

Verbraucher sind in der Regel dApp-Entwickler (dezentralisierte Anwendungen), Datenanalyseunternehmen, Blockchain-Netzwerke, Middleware-Entwickler oder sogar Web-Aggregationsunternehmen, die Zugriff auf Blockchain-Daten benötigen, um ihren Endbenutzern Dienste anbieten zu können.

## Verbraucheranforderungen

Es gibt keine Anforderungen als solche, um ein SubQuery-Verbraucher zu werden. Verbraucher müssen jedoch verstehen, wie sie SQT erhalten, wie sie ihre Datenanforderungen ankündigen und wie sie die zurückgegebenen JSON-Daten nutzen.

Verbraucher müssen möglicherweise auch verstehen, wie SubQuery-Projekte erstellt werden, die indiziert werden sollen, oder diese Arbeit in Auftrag geben, um die Daten in dem von ihnen benötigten Format zu erhalten.

## Servicekosten

Die Kosten für die Abfrage von Daten in der Blockchain richten sich nach Angebot und Nachfrage und sind vergleichbar mit anderen ähnlichen Diensten, die derzeit verfügbar sind. Der Vorteil eines offenen und transparenten Netzwerks und Ökosystems besteht darin, dass der Wettbewerb gefördert wird, um dem Verbraucher den besten Service zu bieten.

## Zahlungsmöglichkeiten für Verbraucher?

Aus Gründen der Flexibilität haben Verbraucher 3 Zahlungsoptionen, um Blockchain-Daten zu bezahlen. Sie sind:

- Pay As You Go (PAYG)
- Geschlossener Servicevertrag
- Servicevertrag öffnen

Weitere Informationen zu den verschiedenen Zahlungsmethoden, ihrer Funktionsweise und den Vor- und Nachteilen finden Sie im [Artikel zu Zahlungsmethoden](./payment-methods.md).

## FAQ

### Wähle ich als Verbraucher 1 Indexer oder mehrere Indexer aus?

Sofern kein geschlossener Servicevertrag verwendet wird, gibt es einen oder mehrere Indexer, die ein SubQuery-Projekt indizieren. Verbraucher haben die Wahl, von welchem Indexer Daten gelesen werden sollen. Typischerweise würden Verbraucher den zuverlässigsten Indexer mit der niedrigsten Latenz auswählen. Verbraucher könnten auch ein automatisches Failover einbauen und Daten von einem anderen Indexer lesen, wenn der erste eine Zeitüberschreitung hat oder nicht reagiert.

### What happens if an Indexer goes offline?

Sofern kein geschlossener Servicevertrag verwendet wird und mehr als ein Indexer Ihr SubQuery-Projekt indiziert, müsste einfach zu einem anderen Indexer gewechselt werden. The ideal scenario would be include strategies like alert monitoring to be notified of potential issues and intelligent routing and caching.
