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

Wenn Sie bereits mit Blockchain-Konzepten vertraut sind, können Sie sich Extrinsics als vergleichbar mit Transaktionen vorstellen. More formally though, an extrinsic is a piece of information that comes from outside the chain and is included in a block. There are three categories of extrinsics. They are inherents, signed transactions, and unsigned transactions.

Inherent extrinsics are pieces of information that are not signed and only inserted into a block by the block author.

Signed transaction extrinsics are transactions that contain a signature of the account that issued the transaction. They stands to pay a fee to have the transaction included on chain.

Unsigned transactions extrinsics are transactions that do not contain a signature of the account that issued the transaction. Unsigned transactions extrinsics should be used with care because there is nobody paying a fee, becaused they are not signed. Because of this, the transaction queue lacks economic logic to prevent spam.

For more information, click [here](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics).

## What is the endpoint for the Kusama network?

The network.endpoint for the Kusama network is `wss://kusama.api.onfinality.io/public-ws`.

## What is the endpoint for the Polkadot mainnet network?

The network.endpoint for the Polkadot network is `wss://polkadot.api.onfinality.io/public-ws`.

## How do I iteratively develop my project schema?

A known issue with developing a changing project schema is that when lauching your Subquery node for testing, the previously indexed blocks will be incompatible with your new schema. In order to iteratively develop schemas the indexed blocks stored in the database must be cleared, this can be achieved by launching your node with the `--force-clean` flag. For example:

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

Note that it is recommended to use `--force-clean` when changing the `startBlock` within the project manifest (`project.yaml`) in order to begin reindexing from the configured block. If `startBlock` is changed without a `--force-clean` of the project, then the indexer will continue indexing with the previously configured `startBlock`.


## How can I optimise my project to speed it up?

Performance is a crucial factor in each project. Fortunately, there are several things you could do to improve it. Here is the list of some suggestions:

- Avoid using block handlers where possible.
- Query only necessary fields.
- Try to use filter conditions to reduce the response size. Create filters as specific as possible to avoid querying unnecessary data.
- For large data tables, avoid querying `totalCount` without adding conditions.
- Add indexes to entity fields for query performance, this is especially important for historical projects.
- Set the start block to when the contract was initialised.
- Always use a [dictionary](../tutorials_examples/dictionary.html#how-does-a-subquery-dictionary-work) (we can help create one for your new network).
- Optimise your schema design, keep it as simple as possible.
    - Try to reduce unnecessary fields and columns.
    - Create  indexes as needed.
- Use parallel/batch processing as often as possible.
    - Use `api.queryMulti()` to optimise Polkadot API calls inside mapping functions and query them in parallel. This is a faster way than a loop.
    - Use `Promise.all()`. In case of multiple async functions, it is better to execute them and resolve in parallel.
    - If you want to create a lot of entities within a single handler, you can use `store.bulkCreate(entityName: string, entities: Entity[])`. You can create them in parallel, no need to do this one by one.
- Making API calls to query state can be slow. You could try to minimise calls where possible and to use `extrinsic/transaction/event` data.
- Use `worker threads` to move block fetching and block processing into its own worker thread. It could speed up indexing by up to 4 times (depending on the particular project). You can easily enable it using the `-workers=<number>` flag. Note that the number of available CPU cores strictly limits the usage of worker threads. For now, it is only available for Substrate and Cosmos and will soon be integrated for Avalanche.
- Note that `JSON.stringify` doesn’t support native `BigInts`. Our logging library will do this internally if you attempt to log an object. We are looking at a workaround for this.
- Use a convenient `modulo` filter to run a handler only once to a specific block. This filter allows handling any given number of blocks, which is extremely useful for grouping and calculating data at a set interval. For instance, if modulo is set to 50, the block handler will run on every 50 blocks. It provides even more control over indexing data to developers and can be implemented like so below in your project manifest.