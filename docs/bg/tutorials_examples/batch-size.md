# Как да промените размера на блокчейн партидата за извличане?

## Видео ръководство

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/LO_Gea_IN_s" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Въеведение

Размерът на партидата по подразбиране е 100, но това може да се промени с помощта на допълнителната команда `--batch-size=xx`.

Трябва да направите това в командния ред като допълнителен флаг или ако използвате Docker, модифицирайте docker-compose.yml с:

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

Този пример задава размера на партидата - 50.

## Защо да променяте размера на партидата?

Използването на по-малък размер на партида може да намали използването на паметта и да не оставя потребителите в изчакване при изпълнение на големи заявки. С други думи, вашето приложение може да реагира по-бързо. 