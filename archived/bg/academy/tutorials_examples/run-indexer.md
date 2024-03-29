# Как да стартирам индексиращ възел?

## Видео ръководство

<br/>
<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/QfNsR12ItnA" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Въведение

Стартирането на възел или нода на индексатор е друга опция, освен използването на Docker или разполагането на проект в[SubQuery Managed Service](https://managedservice.subquery.network/). Това отнема повече време и усилия, но ще подпомогне в разбирането относно работният процес в SubQuery.

## Postgres

Стартирането на индексаторна нода във вашата инфраструктура ще изисква настройка на базата данни Postgres. Можете да инсталирате Postgres с [тук](https://www.postgresql.org/download/) а също така да се уверите, че версията е 12 или по-висока.

## Инсталиране на subql/node

След това, за да стартирате SubQuery нода, изпълнете следната команда:

```shell
npm install -g @subql/node
```

Флагът -g означава задаване в глобален мащаб, което означава, че в OSX местоположението ще бъде/usr/local/lib/node_modules.

След инсталирането, можете да проверите версията, като стартирате:

```shell
> subql-node --version
0.19.1
```

## Задаване на DB конфигурацията

След това трябва да зададете следните променливи на средата:

```shell
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
```

Разбира се, ако имате различни стойности за горните клавиши, моля, направете съответните корекции. Имайте предвид, че командата `env` ще покаже текущите променливи на средата и факта, че този процес задава стойностите само временно. Тоест, те са валидни само по време на работа с термина. За да ги зададете за постоянно, запазете във вашия ~/bash_profile.

## Индексиране на проекта

За да започнете индексирането на проекта, отидете в папката на вашия проект и изпълнете следната команда:

```shell
subql-node -f .
```

Ако нямате проект под ръка проекта `git clone https://github.com/subquery/subql-helloworld`. Ще забележите как нодата на индексатора започва да работи и да индексира блоковете.

## Проверка на Postgres

Ако преминете към Postgres, трябва да видите създадени две таблици. `public.subqueries` и `subquery_1.starter_entities`.

`public.subqueries` съдържа само 1 ред, който индексаторът проверява при неговият старт, за да "разбере текущото състояние" по този начин той разбира откъде да започне. Таблицата `starter_entities` съдържа индекси. За да разгледате данните, стартирайте `select (*) из subquery_1.starter_entities`.
