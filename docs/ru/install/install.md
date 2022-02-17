# Установка SubQuery

Для создании проекта SubQuery требуются различные компоненты. Для генерации запросов требуется библиотека [@subql/query](https://github.com/subquery/subql/tree/docs-new-section/packages/cli). Для запуска индексатора требуется компонент [@subql/node](https://github.com/subquery/subql/tree/docs-new-section/packages/node). Для генерации запросов требуется библиотека [@subql/query](https://github.com/subquery/subql/tree/docs-new-section/packages/query).

## Установка @subql/cli

Библиотека [@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) помогает создать фреймворк проекта. Это означает, что вам не нужно начинать с нуля.

Установите SubQuery CLI на терминал, используя Yarn или NPM:

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/cli ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/cli ``` </CodeGroupItem> </CodeGroup>

You can then run help to see available commands and usage provide by CLI:

```shell
subql help
```
## Установите @subql/node

Узел SubQuery - это реализация, которая извлекает субстратегически данные блокчейна в рамках проекта SubQuery и сохраняет их в базу данных Postgres.

Установите ноду SubQuery на терминал, используя Yarn или NPM:

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/node ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/node ``` </CodeGroupItem> </CodeGroup>

Once installed, you can can start a node with:

```shell
subql-node <command>
```
> Примечание: Если вы используете Docker или хостинг вашего проекта в проектах SubQuery вы можете пропустить этот шаг. Это происходит потому, что узел SubQuery уже находится в контейнере Docker и в инфраструктуре хостинга.

## Установите @subql/query

Библиотека запросов SubQuery предоставляет сервис, который позволяет запускать ваш проект в среде "playground" через ваш браузер.

Установите запрос SubQuery на терминал с помощью Yarn или NPM:

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/query ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/query ``` </CodeGroupItem> </CodeGroup>

> Примечание: Если вы используете Docker или хостинг вашего проекта в проектах SubQuery вы можете пропустить этот шаг. Это происходит потому, что узел SubQuery уже находится в контейнере Docker и в инфраструктуре хостинга. 