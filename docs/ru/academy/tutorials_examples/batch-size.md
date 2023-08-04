# Как изменить размер пакетной выборки блокчейна?

## Видеоинструкция

<br/>
<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/LO_Gea_IN_s" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Вступление

Размер пакета по умолчанию равен 100, но это может быть изменено с помощью дополнительной команды `--batch-size=xx`.

Вам нужно сделать это в командной строке как дополнительный признак или, если вы используете Docker, изменить docker-compose.yml на:

```shell
subquery-node:
    image: onfinality/subql-node:latest
    depends_on:
      - "postgres"
    перезапуск: всегда
    окружение:
      DB_USER: postgres
      DB_PASS: postgres
      DB_DATABASE: postgres
      DB_HOST: postgres
      DB_PORT: 5432
    тома:
      - . :/app
    команда:
      - -f=/app
      - --local
      - --batch-size=50

```

В данном примере задается размер пакета - 50.

## Зачем изменять размер батча?

Использование меньшего размера пакета может уменьшить использование памяти и не оставлять пользователей в подвешенном состоянии при выполнении больших запросов. Другими словами, ваше приложение будет реагировать быстрее.
