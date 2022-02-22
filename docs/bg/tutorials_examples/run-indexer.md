# Как да стартирам индексиращ възел?

## Видео ръководство

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/QfNsR12ItnA" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Въеведение

Стартирането на възел на индексатор е друга опция, освен използването на Docker или хостването на проект за вас[SubQuery Projects](https://project.subquery.network/). Това отнема повече време и усилия, но ще подобри разбирането ви за това как SubQuery работи под прикритие.

## Postgres

Стартирането на възел на индексатор във вашата инфраструктура ще изисква настройка на база данни Postgres. Можете да инсталирате Postgres с [here](https://www.postgresql.org/download/) и се уверете, че версията е 12 или по-висока.

## Инсталирам subql/node

След това, за да стартирате възел за SubQuery, изпълнете следната команда:

```shell
npm install -g @subql/node
```

The -g флагът означава да го зададете глобално, което означава, че в OSX местоположението ще бъде /usr/local/lib/node_modules.

След инсталирането можете да проверите версията, като стартирате:

```shell
> subql-node --version
0.19.1
```

## Конфигуриране на конфигурацията на DB

След това трябва да зададете следните променливи на средата:

```shell
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
```

Разбира се, ако имате различни стойности за горните клавиши, моля, направете съответните корекции. Имайте предвид, че `env` командата ще покаже текущите променливи на околната среда и че този процес задава тези стойности само временно. Тоест, те са валидни само за цялата терминална сесия. За да ги зададете за постоянно, вместо това ги запазете във вашия ~/bash_profile.

## Индексиране на проекта

За да започнете индексирането на проекта, отидете в папката на вашия проект и изпълнете следната команда:

```shell
subql-node -f .
```

If you do not have a project handy, `git clone https://github.com/subquery/subql-helloworld`. You should see the indexer node kick into life and start indexing blocks.

## Inspecting Postgres

If you navigate to Postgres, you should see two tables created. `public.subqueries` and `subquery_1.starter_entities`.

`public.subqueries` only contains 1 row which the indexer checks upon start up to “understand the current state” so it knows where to continue from. The `starter_entities` table contains the indexes. To view the data, run `select (*) from subquery_1.starter_entities`.
