# Häufig Gestellte Fragen

## Was ist SubQuery?

SubQuery ist ein Open-Source-Projekt, das es Entwicklern ermöglicht, Substratkettendaten zu indizieren, umzuwandeln und abzufragen, um ihre Anwendungen zu unterstützen.

SubQuery bietet außerdem kostenloses Hosting von Projekten in Produktionsqualität für Entwickler, die die Verantwortung für die Verwaltung der Infrastruktur abnehmen und Entwicklern das tun lassen, was sie am besten können - die Erstellung.

## Was ist der beste Weg, um mit SubQuery zu beginnen?

Der beste Weg, um mit SubQuery zu beginnen, besteht darin, unser [Hello World-Tutorial](../quickstart/helloworld-localhost.md) auszuprobieren. Dies ist ein einfacher 5-minütiger Spaziergang durch das Herunterladen der Starter-Vorlage, das Erstellen des Projekts und die anschließende Verwendung von Docker, um einen Knoten auf Ihrem localhost auszuführen und eine einfache Abfrage auszuführen.

## Wie kann ich SubQuery beitragen oder Feedback geben?

Wir lieben Beiträge und Feedback aus der Community. Um Code beizutragen, verzweigen Sie das gewünschte Repository und nehmen Sie Ihre Änderungen vor. Senden Sie dann einen PR- oder Pull-Request. Oh, vergiss auch nicht zu testen! Sehen Sie sich auch unsere Beitragsrichtlinien (TBA) an.

Um Feedback zu geben, kontaktieren Sie uns unter hello@subquery.network oder springen Sie auf unseren [Discord-Kanal](https://discord.com/invite/78zg8aBSMG)

## Wie viel kostet es, mein Projekt in SubQuery-Projekten zu hosten?

Das Hosten Ihres Projekts in SubQuery Projects ist absolut kostenlos - es ist unsere Art, der Community etwas zurückzugeben. Um zu erfahren, wie Sie Ihr Projekt bei uns hosten, lesen Sie bitte das Tutorial [Hello World (SubQuery gehostet)](../quickstart/helloworld-hosted.md).

## Was sind Bereitstellungsslots?

Bereitstellungsslots sind eine Funktion in [SubQuery-Projekten](https://project.subquery.network), die einer Entwicklungsumgebung entspricht. Zum Beispiel gibt es in jeder Softwareorganisation normalerweise mindestens eine Entwicklungsumgebung und eine Produktionsumgebung (wobei localhost nicht berücksichtigt wird). Typischerweise sind zusätzliche Umgebungen wie Staging und Pre-Prod oder sogar QS enthalten, abhängig von den Anforderungen der Organisation und ihrer Entwicklung.

SubQuery hat derzeit zwei verfügbare Slots. Ein Staging-Slot und ein Produktions-Slot. Dies ermöglicht es Entwicklern, ihre SubQuery in der Staging-Umgebung bereitzustellen und alles läuft gut, mit einem Klick auf eine Schaltfläche "in die Produktion übergehen".

## Was ist der Vorteil eines Staging-Slots?

Der Hauptvorteil der Verwendung eines Staging-Slots besteht darin, dass Sie eine neue Version Ihres SubQuery-Projekts vorbereiten können, ohne es öffentlich zugänglich zu machen. Sie können warten, bis der Staging-Slot alle Daten neu indiziert hat, ohne Ihre Produktionsanwendungen zu beeinträchtigen.

Der Staging-Slot wird im [Explorer](https://explorer.subquery.network/) nicht öffentlich angezeigt und hat eine eindeutige URL, die nur für Sie sichtbar ist. Und natürlich können Sie in der separaten Umgebung Ihren neuen Code testen, ohne die Produktion zu beeinträchtigen.

## Was sind Extrinsics?

Wenn Sie bereits mit Blockchain-Konzepten vertraut sind, können Sie sich Extrinsik als vergleichbar mit Transaktionen vorstellen. Formaler ist eine extrinsische Information jedoch eine Information, die von außerhalb der Chain kommt und in einem Block enthalten ist. Es gibt drei Kategorien von Extrinsics. Ihr seid inhärente, signierte Transaktionen und nicht signierte Transaktionen.

Inhärente Extrinsics sind Informationen, die nicht signiert und nur vom Blockautor in einen Block eingefügt werden.

Extrinsische Signaturtransaktionen sind Transaktionen, die eine Signatur des Kontos enthalten, das die Transaktion ausgestellt hat. Sie müssen eine Gebühr zahlen, um die Transaktion in die Chain aufzunehmen.

Extrinsische Transaktionen ohne Unterschrift sind Transaktionen, die keine Unterschrift des Kontos enthalten, das die Transaktion ausgestellt hat. Extrinsische Transaktionen ohne Signatur sollten mit Vorsicht verwendet werden, da niemand eine Gebühr zahlt, da sie signiert ist. Aus diesem Grund fehlt der Transaktionswarteschlange eine wirtschaftliche Logik, um Spam zu verhindern.

Für weitere Info klicken Sie [hier](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics).

## Was ist der Endpunkt für das Kusama-Netzwerk?

Der network.endpoint für das Kusama-Netzwerk ist `wss://kusama.api.onfinality.io/public-ws`.

## Was ist der Endpunkt für das Polkadot-Mainnet-Netzwerk?

Der network.endpoint für das Polkadot-Netzwerk ist `wss://polkadot.api.onfinality.io/public-ws`.

## Wie entwickle ich mein Projektschema iterativ?

Ein bekanntes Problem bei der Entwicklung eines sich ändernden Projektschemas besteht darin, dass beim Starten Ihrer Subquery Node zum Testen die zuvor indizierten Blöcke nicht mit Ihrem neuen Schema kompatibel sind. Um Schemata iterativ zu entwickeln, müssen die in der Datenbank gespeicherten indizierten Blöcke gelöscht werden. Dies kann durch Start Ihrer Node mit dem Flag `--force-clean` erreicht werden. Zum Beispiel:

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

Beachten Sie, dass es empfohlen wird, `--force-clean` zu verwenden, wenn Sie den `startBlock` im Projektmanifest (`project.yaml`) ändern, um zu beginnen Neuindizierung aus dem konfigurierten Block. Wenn `startBlock` ohne `--force-clean` des Projekts geändert wird, fährt der Indexer mit der Indizierung mit dem zuvor konfigurierten `startBlock` fort.