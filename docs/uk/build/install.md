# Встановлення SubQuery

Існують різні компоненти, необхідні при створенні проекту SubQuery. Інструмент [ @ subql / cli ](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) використовується для створення проектів SubQuery. Для запуску індексатора необхідний компонент [ @ subql / node ](https://github.com/subquery/subql/tree/docs-new-section/packages/node). Для створення запитів потрібна бібліотека [ @ subql / query ](https://github.com/subquery/subql/tree/docs-new-section/packages/query).

## Встановлення @subql/cli

Інструмент [ @ subql / cli ](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) допомагає створити рамку проекту або риштування, тобто не потрібно починати з нуля.

Встановіть SubQuery CLI у всьому світі на свій термінал, використовуючи пряжу або NPM:

::: code-tabs @tab:active yarn `shell yarn global add @subql/cli `
@tab npm `bash npm install -g @subql/cli ` :::

Потім ви можете запустити довідку, щоб побачити доступні команди та використання, надані CLI:

```shell
subql help
```

## Встановіть @subql/node

Вузол SubQuery - це реалізація, яка витягує дані блокчейна на основі субстрату за проектом SubQuery і зберігає їх у базі даних Postgres.

Встановіть вузол SubQuery у всьому світі на своєму терміналі за допомогою пряжі або NPM:

::: code-tabs @tab:active yarn `shell yarn global add @subql/node `
@tab npm `bash npm install -g @subql/node ` :::

Після встановлення ви можете запустити вузол з:

```shell
subql-node <command>
```

> Примітка. Якщо ви використовуєте Docker або розміщуєте свій проект у проектах SubQuery, ви можете пропустити цей крок. Це тому, що вузол SubQuery вже передбачений у контейнері Docker та хостинговій інфраструктурі.

## Встановіть @subql/query

Бібліотека запитів SubQuery надає послугу, яка дозволяє запитувати проект у середовищі "playground" через браузер.

Встановіть запит SubQuery у всьому світі на своєму терміналі за допомогою пряжі або NPM:

::: code-tabs @tab npm `bash npm install -g @subql/query `
@tab:active yarn `shell yarn global add @subql/query ` :::

> Примітка. Якщо ви використовуєте Docker або розміщуєте свій проект у проектах SubQuery, ви також можете пропустити цей крок. Це тому, що вузол SubQuery вже передбачений у контейнері Docker та хостинговій інфраструктурі.
