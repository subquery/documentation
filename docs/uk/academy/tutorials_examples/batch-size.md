# Як змінити розмір одного пакета отримуваного з блокчейну?

## Відеоінструкція

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/LO_Gea_IN_s" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Вступ

Розмір пакету за замовчуванням становить 100, але це можна змінити за допомогою додаткової команди ` - розмір пакету = xx `.

Вам потрібно вказати це в командному рядку як додатковий прапорець або, якщо ви використовуєте Docker, змініть docker-compose.yml за допомогою:

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

У цьому прикладі розмір пакету встановлюється рівним 50.

## Навіщо змінювати розмір пакета?

Використання меншого розміру пакету може зменшити використання пам’яті та скоротити час очікування відповіді від великих запитів користувачів. Іншими словами, ваш додаток зможе працювати швидше. 