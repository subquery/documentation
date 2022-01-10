# Wie ändere ich die Blockchain, die die Batchgröße abruft?

## Videoanleitung

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/LO_Gea_IN_s" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Die Einführung

Die Standardbatchgröße ist 100, dies kann jedoch mit dem zusätzlichen Befehl `--batch-size=xx` geändert werden.

Sie müssen dies als zusätzliches Flag in die Befehlszeile eingeben oder wenn Sie Docker verwenden, ändern Sie die docker-compose.yml mit:

```shell
subquery-node:
    image: onfinality/subql-node:latest
    depends_on:
      - "postgres"
    restart: always
    environment:
      DB_USER: postgres
      DB_PASS: postgres
      DB_DATABASE: postgres
      DB_HOST: postgres
      DB_PORT: 5432
    volumes:
      - ./:/app
    command:
      - -f=/app
      - --local
      - --batch-size=50

```

In diesem Beispiel wird die Batchgröße auf 50 festgelegt.

## Warum die Batchgröße ändern?

Die Verwendung einer kleineren Batchgröße kann die Speichernutzung reduzieren und Benutzer nicht für große Abfragen hängen lassen. Mit anderen Worten, Ihre Anwendung kann reaktionsschneller sein. 