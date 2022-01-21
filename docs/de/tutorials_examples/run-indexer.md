# Wie führe ich einen Indexer Node aus?

## Videoanleitung

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/QfNsR12ItnA" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Die Einführung

Das Ausführen einer Indexer-Node ist eine weitere Option, außer Docker zu verwenden oder ein Projekt für Sie unter [SubQuery-Projekte](https://project.subquery.network/) zu hosten. Es erfordert mehr Zeit und Mühe, wird jedoch Ihr Verständnis dafür verbessern, wie SubQuery unter dem Deckmantel funktioniert.

## Postgres

Das Ausführen eines Indexer-Node in Ihrer Infrastruktur erfordert die Einrichtung einer Postgres-Datenbank.  Sie können Postgres von [aus hier](https://www.postgresql.org/download/) installieren und sicherstellen, dass die Version 12 oder höher ist.

## Subql/Knoten installieren

Um dann einen SubQuery Node auszuführen, führen Sie folgenden Befehl aus:

```shell
npm install -g @subql/node
```

Das -g flag bedeutet, es global zu installieren, was unter OSX bedeutet, das Verzeichnis wird /usr/local/lib/node_module sein.

Sobald installiert, können Sie die Version überprüfen, indem Sie ausführen:

```shell
> subql-node --version
0.19.1
```

## DB Einstellungen

Als nächstes müssen die folgenden Umgebungsvariablen festgelegt werden:

```shell
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
```

Wenn Sie für die oben genannten Tasten unterschiedliche Werte haben, passen Sie diese bitte entsprechend an. Beachten Sie, dass der Befehl `env` die aktuellen Umgebungsvariablen anzeigt und dass dieser Prozess diese Werte nur vorübergehend setzt. Das heißt, sie sind nur für die Dauer der Terminalsitzung gültig. Um sie dauerhaft einzustellen, speichern Sie sie stattdessen in Ihrem ~/bash_profil.

## Ein Projekt indizieren

Um ein Projekt zu indizieren, navigiere in deinen Projektordner und führe den folgenden Befehl aus:

```shell
subql-node -f .
```

Wenn Sie kein praktisches Projekt haben, `git clone https://github.com/subquery/subql-helloworld`. Sie sollten den Index Node ins Leben rufen und mit der Indexierung beginnen.

## Überprüfe Posts

Wenn Sie zu Postgres wechseln, sollten Sie zwei Tabellen sehen. `public.subqueries` and `subquery_1.starter_entities`.

`public. ubqueries` enthält nur eine Zeile, die der Indexer beim Start prüft, um den aktuellen Status zu verstehen, so dass er weiß, woher er er weitergehen soll. Die `starter_entities` Tabelle enthält die Indizes. Um die Daten anzuzeigen, wählen Sie `(*)  subquery_1.starter_entities` aus.
