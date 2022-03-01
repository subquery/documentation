# Стартиране на SubQuery Locally

Това ръководство показва как да стартирате локален SubQuery нод във вашата инфраструктура, който включва индексатора и услугата за заявки. Не желаете да се занимавате със стартирането на собствена SubQuery инфраструктура? SubQuery предоставя [управлявана хоствана услуга](https://explorer.subquery.network) безплатно за общността. [Следвайте нашето ръководство](../run_publish/publish.md) за да разберете как да качите вашия проект в [SubQuery Projects](https://project.subquery.network).

## Използване на Docker

Алтернативно решение е да стартирате <strong>Docker Container</strong>, дефиниран от файла `docker-compose.yml`. За нов проект, който току-що е инициализиран, няма да е необходимо да променяте нищо тук.

Под директорията на проекта изпълнете следната команда:

```shell
docker-compose pull && docker-compose up
```

Може да отнеме известно време, за да изтеглите необходимите пакети ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), и Postgres) за първи път, но скоро ще видите работещ SubQuery нод.

## Изпълнение на индексатор (subql/node)

Изисквания:

- База данни [Postgres](https://www.postgresql.org/) (версия 12 или по-нова). Докато [SubQuery нодът ](#start-a-local-subquery-node) индексира блокчейна, извлечените данни се съхраняват във външна база данни.

SubQuery нодът е реализация, която извлича базирани на Substrate блокчейн данни за проекта SubQuery и ги записва в базата данни на Postgres.

### Инсталация

```shell
# NPM
npm install -g @subql/node
```

Моля, имайте предвид, че ние **НЕ** насърчаваме използването на `yarn global` поради лошото управление на зависимостта, което може да доведе до грешки в бъдеще.

Веднъж инсталиран, можете да стартирате нода със следната команда:

```shell
subql-node <command>
```

### Ключови команди

Следващите команди ще ви помогнат да завършите конфигурацията на SubQuery нода и да започнете индексирането. За да научите повече, винаги можете да стартирате `--help`.

#### Посочете пътя към локалния проект

```
subql-node -f your-project-path
```

#### Използвайте речник

Използването на речник за цяла верига може драстично да ускори обработката на SubQuery проект по време на тестване или по време на първия ви индекс. В някои случаи сме виждали увеличение на ефективността на индексирането до 10 пъти.

Цял верижен речник предварително индексира местоположението на всички събития и ненужни данни в рамките на конкретната верига и позволява на вашата нод услуга да прескача до съществените местоположения при индексиране, вместо да инспектира всеки блок.

Можете да добавите крайната точка на речника във вашия `project.yaml` файл (вижте [Manifest File](../create/manifest.md)), или го посочете по време на изпълнението, като използвате следната команда:

```
subql-node --network-dictionary=https://api.subquery.network/sq/subquery/dictionary-polkadot
```

[Прочетете повече за това как работи SubQuery речникът.](../academy/tutorials_examples/dictionary.md).

#### Свържете се с базата данни

```
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
subql-node -f your-project-path
```

В зависимост от конфигурацията на вашата Postgres база данни (например различна парола за базата данни), моля, уверете се, че индексаторът (`subql/node`) и услугата за заявки (`subql/query`) могат да установят връзка с нея.

#### Посочете конфигурационен файл

```
subql-node -c your-project-config.yml
```

Това ще насочи нода на заявката към конфигурационен файл, който може да бъде във формат - YAML или JSON. Вижте примера по-долу.

```yaml
subquery: ../../../../subql-example/extrinsics
subqueryName: extrinsics
batchSize:100
localMode:true
```

#### Промяна размера на партидата за извличане на блок

```
subql-node -f your-project-path --batch-size 200

Резултат:
[IndexerManager] fetch block [203, 402]
[IndexerManager] fetch block [403, 602]
```

Когато индексаторът първо индексира веригата, извличането на единични блокове значително ще намали производителността. Увеличаването на размера на партидата, с цел регулиране на броя на извлечените блокове, ще намали общото време за обработка. Текущият размер на партидата по подразбиране е 100.

#### Работете в локален мод (режим)

```
subql-node -f your-project-path --local
```

За целите на отстраняване на грешки, потребителите могат да стартират нода в локален режим. Преминаването към локален модел ще създаде Postgres таблици схемата по подразбиране - `public`.

Ако не се използва локален режим, ще бъде създадена нова Postgres схема с първоначалната `subquery_` и съответните таблици на проектите.

#### Проверете здравето на вашия нод

Има 2 крайни точки, които можете да използвате за проверка и наблюдение на здравето на работещ SubQuery нод.

- Крайна точка за проверка на състоянието, която връща опростен 200 отговор
- Крайна точка с метаданни, която включва допълнителни анализи на вашия работещ SubQuery нод

Добавете това към основния URL адрес на вашия SubQuery нод. Например: `http://localhost:3000/meta` ще върне:

```bash
{
    "currentProcessingHeight": 1000699,
    "currentProcessingTimestamp": 1631517883547,
    "targetHeight": 6807295,
    "bestHeight": 6807298,
    "indexerNodeVersion": "0.19.1",
    "lastProcessedHeight": 1000699,
    "lastProcessedTimestamp": 1631517883555,
    "uptime": 41.151789063,
    "polkadotSdkVersion": "5.4.1",
    "apiConnected": true,
    "injectedApiConnected": true,
    "usingDictionary": false,
    "chain": "Polkadot",
    "specName": "polkadot",
    "genesisHash": "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3",
    "blockTime": 6000
}
```

`http://localhost:3000/health` ще върне HTTP 200 ако е успешно.

Ще бъде върната грешка 500, ако индексаторът не е здрав. Това често може да се види, когато нодът се зарежда.

```shell
{
    "status": 500,
    "error": "Indexer is not healthy"
}
```

Ако е използван грешен URL, грешка 404 „не е намерено“ ще се появи, отново.

```shell
{
"statusCode": 404,
"message": "Cannot GET /healthy",
"error": "Not Found"
}
```

#### Отстранете грешките в проекта си

Използвайте [node inspector](https://nodejs.org/en/docs/guides/debugging-getting-started/) за да изпълните следната команда.

```shell
node --inspect-brk <path to subql-node> -f <path to subQuery project>
```

Например:

```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Debugger listening on ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
```

След това отворете инструментите за разработка на Chrome, отидете на Source > Filesystem и добавете проекта си към работното пространство и започнете да отстранявате грешки. За повече информация вижте: [Как да отстраните грешки в SubQuery проект](https://doc.subquery.network/academy/tutorials_examples/debug-projects/)

## Изпълнение на услуга за заявки (subql/query)

### Инсталация

```shell
# NPM
npm install -g @subql/query
```

Моля, имайте предвид, че ние **НЕ** насърчаваме използването на `yarn global` поради лошото управление на зависимостта, което може да доведе до грешки в бъдеще.

### Изпълнение на Query услуга

``` export DB_HOST=localhost subql-query --name <project_name> --playground ````

Уверете се, че името на проекта е същото като името на проекта, когато [инициализирате проекта](../quickstart/quickstart.md#initialise-the-starter-subquery-project). Също така проверете дали променливите на средата са правилни.

След като стартирате успешно услугата subql-query, отворете браузъра си и се насочете към `http://localhost:3000`. Трябва да видите работното меню на GraphQL, показващo се в Explorer и схемата, която е готова за заявка.
