# Инсталиране на SubQuery

Различни компоненти са необходими при създаване на проект в SubQuery. Инструментът @subql/cli се изолзва при създаване на проекти на SubQuery. Компонентът @subql/node е необходим за стартиране на индексатор. Библиотеката @subql/query се използва за генериране на заявки.

## Инсталиране на @subql/cli

Инструментът @subql/cli служи за вспомагателно средство при създаване на структура за проекта или основа, което означава, че не е нужно да изграждане на проекта от нулата.

Инсталирайте SubQuery CLI globally във вашия терминал, като използвате Yarn или NPM:

<CodeGroup> ```bash npm install -g @subql/cli ``` ```shell yarn global add @subql/cli ``` След това въведете команда help за да видите наличните команди и тяхното използване, предоставени от CLI
## Инсталиране на @subql/node

Нодата SubQuery е реализация, която извлича базирани върху субстрат блокчейн данни за проекта SubQuery и ги записва в база данни на Postgres.

Инсталирайте нодата SubQuery node като използвате за целта терминал Yarn или NPM:

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/node ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/node ``` </CodeGroupItem> </CodeGroup>

Once installed, you can can start a node with:

```shell
subql-node <command>
```
> Забележка: Ако използвате Docker или хостинг на проекта в други SubQuery проекти, може да пропуснете тази стъпка. Причината е следната: нодата SubQuery вече е част от Docker контейнера и инфраструктурата на хостинга.

## Инсталиране на @subql/query

Библиотеката за заявки на SubQuery предоставя услуга, позволяваща стартирането на вашия проект в среда на "playground" чрез вашия браузър.

Инсталирайте запитване SubQuery като използвате за целта терминал Yarn или NPM:

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/query ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/query ``` </CodeGroupItem> </CodeGroup>

> Забележка: Ако използвате Docker или хостинг на проекта в други SubQuery проекти, може да пропуснете тази стъпка. Причината е следната: нодата SubQuery вече е част от Docker контейнера и инфраструктурата на хостинга. 