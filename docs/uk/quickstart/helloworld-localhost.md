# Привіт, світ (localhost + Docker)

Ласкаво просимо до цього SubQuery Hello Світ швидко запускається. Швидкий старт має на меті показати вам, як ви отримуєте проект стартера за замовчуванням у Docker за кілька простих кроків.

## Цілі навчання

Наприкінці цього швидкого старту слід:

- зрозуміти необхідні передумови
- зрозуміти основні загальні команди
- мати можливість перейти до localhost: 3000 та переглянути ігровий майданчик
- запустіть простий запит, щоб отримати висоту блоку мережі Polkadot

## Навмисна аудиторія

Цей посібник орієнтований на нових розробників, які мають певний досвід розвитку та зацікавлені дізнатися більше про SubQuery.

## Відеоінструкція

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/j034cyUYb7k" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Пре-реєстрація

Вам потрібно:

- Менеджер пакунків yarn або npm
- SubQuery CLI (`@subql/cli`)
- Docker

Ви можете запустити наступні команди в терміналі, щоб побачити, чи є у вас вже якісь із цих попередніх реквізитів.

```shell
yarn -v (or npm -v)
subql -v
docker -v
```

Для більш просунутих користувачів скопіюйте та вставте наступне:

```shell
echo -e "Моя версія yarn is:" `yarn -v`\nМоя версія subql :" `subql -v`\nМоя версія docker :" `docker -v`
```

Це повинно повернутися: (для користувачів npm замініть yarn на npm)

```shell
My yarn version is: 1.22.10
My subql version is: @subql/cli/0.9.3 darwin-x64 node-v16.3.0
My docker version is: Docker version 20.10.5, build 55c4c88
```

Якщо ви отримаєте вищесказане, то вам добре піти. Якщо ні, дотримуйтесь цих посилань, щоб встановити їх:

- [yarn](https://classic.yarnpkg.com/en/docs/install/) or [npm](https://www.npmjs.com/get-npm)
- [SubQuery CLI](quickstart.md#install-the-subquery-cli)
- [Docker](https://docs.docker.com/get-docker/)

## 1. Ініціалізація проекту

Перший крок при запуску з SubQuery - це запуск команди ` subql init `. Давайте ініціалізуємо стартовий проект із назвою ` subqlHelloWorld `. Зауважте, що обов'язковий лише автор. Все інше залишається порожнім внизу.

```shell
> subql init --starter subqlHelloWorld
Git repository:
RPC endpoint [wss://polkadot.api.onfinality.io/public-ws]:
Authors: sa
Description:
Version: [1.0.0]:
License: [Apache-2.0]:
Init the starter package... subqlHelloWorld is ready

```

Не забудьте перейти в цей новий каталог.

```shell
cd subqlHelloWorld
```

## 2. Встановіть залежності

Тепер зробіть встановлення пряжі або вузла, щоб встановити різні залежності.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm install ``` </CodeGroupItem> </CodeGroup>

An example of `yarn install`

```shell
> yarn install
yarn install v1.22.10
info No lockfile found.
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
✨  Done in 31.84s.
```

## 3. Створити код

Тепер запустіть ` yarn codegen `, щоб генерувати Typescript зі схеми GraphQL.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

An example of `yarn codegen`

```shell
> yarn codegen
yarn run v1.22.10
$ ./node_modules/.bin/subql codegen
===============================
---------Subql Codegen---------
===============================
* Schema StarterEntity generated !
* Models index generated !
* Types index generated !
✨  Done in 1.02s.
```

** Попередження ** Коли в файл схеми вносяться зміни, будь ласка, не забудьте повторно запустити ` yarn codegen ` для відновлення каталогу типів.

## 4. Створіть код

Наступний крок - побудувати код із ` yarn build `.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

An example of `yarn build`

```shell
> yarn build
yarn run v1.22.10
$ tsc -b
✨  Done in 5.68s.
```

## 5. Запустити Докер

Використання Docker дозволяє запустити цей приклад дуже швидко, оскільки вся необхідна інфраструктура може бути надана в межах зображення Docker. Виконати `docker-compose pull && docker-compose up`.

Це призведе до життя все, де в кінцевому підсумку ви отримаєте блоки.

```shell
> #SNIPPET
subquery-node_1   | 2021-06-05T22:20:31.450Z <subql-node> INFO node started
subquery-node_1   | 2021-06-05T22:20:35.134Z <fetch> INFO fetch block [1, 100]
subqlhelloworld_graphql-engine_1 exited with code 0
subquery-node_1   | 2021-06-05T22:20:38.412Z <fetch> INFO fetch block [101, 200]
graphql-engine_1  | 2021-06-05T22:20:39.353Z <nestjs> INFO Starting Nest application...
graphql-engine_1  | 2021-06-05T22:20:39.382Z <nestjs> INFO AppModule dependencies initialized
graphql-engine_1  | 2021-06-05T22:20:39.382Z <nestjs> INFO ConfigureModule dependencies initialized
graphql-engine_1  | 2021-06-05T22:20:39.383Z <nestjs> INFO GraphqlModule dependencies initialized
graphql-engine_1  | 2021-06-05T22:20:39.809Z <nestjs> INFO Nest application successfully started
subquery-node_1   | 2021-06-05T22:20:41.122Z <fetch> INFO fetch block [201, 300]
graphql-engine_1  | 2021-06-05T22:20:43.244Z <express> INFO request completed

```

## 6. Огляд ігрового майданчика

Перейдіть до http://localhost: 3000 / та вставте запит внизу в ліву частину екрана, а потім натисніть кнопку відтворення.

```
{
 query{
   starterEntities(last:10, orderBy:FIELD1_ASC ){
     nodes{
       field1
     }
   }
 }
}

```

Ігровий майданчик SubQuery на місцевому приході.

![playground localhost](/assets/img/subql_playground.png)

Кількість блоків на ігровому майданчику також повинна відповідати кількості блоків (технічно висота блоку) в терміналі.

## Підсумок

У цьому швидкому старті ми продемонстрували основні кроки для запуску та запуску стартового проекту в середовищі Docker, а потім перейшли до localhost: 3000 та запустили запит, щоб повернути номер блоку мережі Polkadot.
