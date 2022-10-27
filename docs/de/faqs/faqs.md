# Häufig Gestellte Fragen

## Was ist SubQuery?

SubQuery ist ein Open-Source-Blockchain-Datenindexer für Entwickler, der schnelle, flexible, zuverlässige und dezentralisierte APIs bereitstellt, um führende Multi-Chain-Apps zu betreiben.

Unser Ziel ist es, Entwicklern Zeit und Geld zu sparen, indem wir die Notwendigkeit beseitigen, ihre eigene Indizierungslösung zu erstellen. Jetzt können sie sich voll und ganz auf die Entwicklung ihrer Anwendungen konzentrieren. SubQuery hilft Entwicklern, die dezentralen Produkte der Zukunft zu erstellen.

<figure class="video_container">
<iframe src="https://www.youtube.com/embed/gCpVz_mkWdo" title="Einführung in das SubQuery Network" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscree="true"></iframe>
</figure>

**SubQuery Managed Service**

SubQuery bietet Entwicklern außerdem kostenloses, produktionstaugliches Hosting von Projekten. Unser Managed Service entlastet Sie von der Verantwortung für die Verwaltung der Infrastruktur, sodass Entwickler das tun können, was sie am besten können – bauen. Weitere Informationen finden Sie [hier](/run_publish/publish.md).

**SubQuery-Netzwerk**

Das SubQuery-Netzwerk ermöglicht Entwicklern die vollständige Dezentralisierung ihres Infrastruktur-Stacks. Es ist der offenste, leistungsfähigste, zuverlässigste und skalierbarste Datendienst für dApps. Das SubQuery-Netzwerk indiziert und stellt Daten für die globale Gemeinschaft auf eine motivierte und überprüfbare Weise bereit.  Nachdem Sie Ihr Projekt im SubQuery-Netzwerk veröffentlicht haben, kann jeder es indizieren und hosten, wodurch Daten schneller und zuverlässiger für Benutzer auf der ganzen Welt bereitgestellt werden.

Weitere Info finden Sie [hier](/subquery_network/introduction.md).

## Was ist der beste Weg, um mit SubQuery zu beginnen?

Der beste Einstieg in SubQuery ist unser [Hello World Tutorial](/assets/pdf/Hello_World_Lab.pdf). Dies ist eine einfache 5-minütige Walk-Through-Übung. Laden Sie die Startvorlage herunter, erstellen Sie das Projekt, verwenden Sie Docker, um einen Knoten auf Ihrem lokalen Host auszuführen, und führen Sie eine einfache Abfrage aus.

## Wie kann ich zu SubQuery beitragen oder Feedback geben?

Wir lieben Beiträge und Feedback aus der Community. Um den Code beizutragen, forken Sie das Repository Ihres Interesses und nehmen Sie Ihre Änderungen vor. Senden Sie dann einen PR- oder Pull-Request. Vergessen Sie nicht, auch zu testen. Sehen Sie sich auch unsere <a href="http://localhost:8080/miscellaneous/contributing.html">Richtlinien für Beiträge</a> an

Um Feedback zu geben, kontaktiere uns unter hello@subquery.net oder besuche unseren [Discord-Kanal](https://discord.com/invite/78zg8aBSMG).

## Wie viel kostet es, mein Projekt in SubQuery Projects zu hosten?

Dieser Service wird der Community mit einem großzügigen kostenlosen Kontingent zur Verfügung gestellt! Sie können Ihre ersten beiden SubQuery-Projekte absolut kostenlos hosten!

## Was sind Bereitstellungsslots?

Bereitstellungsslots sind eine Funktion in [SubQuery-Projekten](https://project.subquery.network), die einer Entwicklungsumgebung entsprechen. Beispielsweise gibt es in jeder Softwareorganisation normalerweise mindestens eine Entwicklungsumgebung und eine Produktionsumgebung (das heißt, localhost wird ignoriert). Typischerweise sind zusätzliche Umgebungen wie Staging und Pre-Prod oder sogar QA enthalten, abhängig von den Anforderungen der Organisation und ihrer Entwicklungsumgebung.

SubQuery hat derzeit zwei verfügbare Slots. Ein Bereitstellungsslot und ein Produktionsslot. Auf diese Weise können Entwickler ihre SubQuery in der Staging-Umgebung bereitstellen und alles, was gut läuft, auf Knopfdruck „in die Produktion befördern“.

## Was ist der Vorteil eines Staging-Slots?

Der Hauptvorteil der Verwendung eines Staging-Slots besteht darin, dass Sie eine neue Version Ihres SubQuery-Projekts vorbereiten können, ohne es öffentlich zugänglich zu machen. Sie können warten, bis der Staging-Slot alle Daten neu indiziert, ohne Ihre Produktionsanwendungen zu beeinträchtigen.

Der Staging-Slot wird der Öffentlichkeit im [Explorer](https://explorer.subquery.network/) nicht angezeigt und hat eine eindeutige URL, die nur für Sie sichtbar ist. Und natürlich ermöglicht Ihnen die separate Umgebung, Ihren neuen Code zu testen, ohne die Produktion zu beeinträchtigen.

## Was sind Polkadots Extrinsics?

Wenn Sie bereits mit Blockchain-Konzepten vertraut sind, können Sie sich Extrinsics als vergleichbar mit Transaktionen vorstellen. Formaler ist eine extrinsische Information jedoch eine Information, die von außerhalb der Chain kommt und in einem Block enthalten ist. Es gibt drei Kategorien von Extrinsics. Sie sind Inhärente, signierte Transaktionen und nicht signierte Transaktionen.

Inhärente Extrinsics sind Informationen, die nicht signiert sind und nur vom Blockautor in einen Block eingefügt werden.

Signierte Transaktionsextrinsiken sind Transaktionen, die eine Signatur des Kontos enthalten, das die Transaktion ausgegeben hat. Sie zahlen eine Gebühr, um die Transaktion in die Chain aufzunehmen.

Extrinsische nicht signierte Transaktionen sind Transaktionen, die keine Signatur des Kontos enthalten, das die Transaktion ausgegeben hat. Unsignierte Transaktionen sollten mit Vorsicht verwendet werden, da niemand eine Gebühr zahlt, da sie nicht signiert sind. Aus diesem Grund fehlt der Transaktionswarteschlange die ökonomische Logik, um Spam zu verhindern.

Für weitere Info klicken Sie [hier](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics).

## Was ist der Endpunkt für das Kusama-Netzwerk?

Der network.endpoint für das Kusama-Netzwerk ist `wss://kusama.api.onfinality.io/public-ws`.

## Was ist der Endpunkt für das Polkadot-Mainnet-Netzwerk?

Der network.endpoint für das Polkadot-Netzwerk ist `wss://polkadot.api.onfinality.io/public-ws`.

## Wie entwickle ich mein Projektschema iterativ?

Ein bekanntes Problem bei der Entwicklung eines sich ändernden Projektschemas besteht darin, dass beim Starten Ihres Unterabfrageknotens zum Testen die zuvor indizierten Blöcke nicht mit Ihrem neuen Schema kompatibel sind. Um Schemata iterativ zu entwickeln, müssen die in der Datenbank gespeicherten indizierten Blöcke gelöscht werden. Dies kann erreicht werden, indem Sie Ihren Knoten mit dem Flag `--force-clean` starten. Zum Beispiel:

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

Beachten Sie, dass empfohlen wird, `--force-clean` zu verwenden, wenn Sie den `startBlock` im Projektmanifest (`project.yaml`) ändern, um zu beginnen Neuindizierung aus dem konfigurierten Block. Wenn `startBlock` ohne `--force-clean` des Projekts geändert wird, dann wird der Indexer die Indizierung mit dem zuvor konfigurierten `startBlock` fortsetzen.


## Wie kann ich mein Projekt optimieren, um es zu beschleunigen?

Leistung ist ein entscheidender Faktor in jedem Projekt. Glücklicherweise gibt es mehrere Dinge, die Sie tun könnten, um es zu verbessern. You can find our recommendations in the [Project Optimisation](../build/optimisation.md). 