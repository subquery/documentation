# Hello World (localhost & Docker)

Добре дошли в тази SubQuery Hello World quick start. Ръководството за бърз старт има за цел да ви покаже как да стартирате първоначалния проект по подразбиране в Docker в няколко прости стъпки.

## Учебни Цели

В края на този бърз старт трябва:

- разберете необходимите предпоставки
- разберете основните общи команди
- да можете да отидете на localhost: 3000 и да видите детската площадка
- изпълнете проста заявка, за да получите височината на блока на основната мрежа на Polkadot

## Аудитория

Това ръководство е предназначено за начинаещи разработчици, които имат известен опит в разработката и се интересуват да научат повече за подзаявката.

## Видео ръководство

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/j034cyUYb7k" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Предпоставка

Ще ви трябва:

- yarn или npm мениджър на пакети
- SubQuery CLI (`@subql/cli`)
- Docker

Можете да изпълните следните команди в терминала, за да проверите дали вече имате някоя от тези предпоставки.

```shell
yarn -v (or npm -v)
subql -v
docker -v
```

За по-напреднали потребители копирайте и поставете следното:

```shell
echo -e "My yarn version is:" `yarn -v` "\nMy subql version is:" `subql -v`  "\nMy docker version is:" `docker -v`
```

Това трябва да върне: (за потребители на npm заменете преждата с npm)

```shell
Моята версия на преждата е: 1.22.10
Моята версия на subql е: @subql/cli/0.9.3 darwin-x64 node-v16.3.0
Моята версия на docker е:Docker version 20.10.5, build 55c4c88
```

Ако получите всичко по-горе, тогава можете да отидете. Ако не, следвайте тези връзки, за да ги инсталирате:

- [yarn](https://classic.yarnpkg.com/en/docs/install/) or [npm](https://www.npmjs.com/get-npm)
- [SubQuery CLI](quickstart.md#install-the-subquery-cli)
- [Docker](https://docs.docker.com/get-docker/)

## 1. Инициализирайте проекта

Първата стъпка при стартиране с подзаявка е да стартирате `subql init`команда. Нека инициализираме стартовия проект с име `subqlHelloWorld`. Имайте предвид, че само авторът е задължителен. Всичко останало отдолу остава празно.

```shell
> subql init subqlHelloWorld
? Изберете мрежов Polkadot
? Select a template project subql-starter     Starter project for subquery
Cloning project... done
RPC endpoint: [wss://polkadot.api.onfinality.io/public-ws]:
Git repository [https://github.com/subquery/subql-starter]:
Fetching network genesis hash... done
Author [Ian He & Jay Ji]:
Description [This project can be use as a starting po...]:
Version [0.0.4]:
License [MIT]:
Preparing project... done
subqlHelloWorld is ready

```

Не забравяйте да отидете в тази нова директория.

```shell
cd subqlHelloWorld
```

## 2. Инсталирайте зависимости

Сега направете инсталацията на преждата или възела, за да инсталирате различни зависимости.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn install ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```bash npm install ``` </CodeGroupItem> </CodeGroup>

An example of `yarn install`

```shell
> yarn install
yarn install v1.22.10
info No lockfile found.
Разрешаване на пакети...
Получаване на колети...
Свързване на зависимости...
Създаване на нови пакети...
успешно запазен заключващ файл.
Направено за 31,84 секунди.
```

## 3. Генериране на код

Сега бягай`yarn codegen`за да създадете Typescript от GraphQL схема.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```bash npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

An example of `yarn codegen`

```shell
> yarn codegen
yarn run v1.22.10
$ ./node_modules/.bin/subql codegen
===============================
---------Subql Codegen---------
===============================
* Schema StarterEntity generated !
Генериран индекс на моделите !
Генериран индекс на типа !
Done in 1.02s.
```

**Warning**Когато правите промени във файла на схемата, моля, не забравяйте да стартирате отново `yarn codegen` за да създадете отново вашата директория Тип.

## 4. Код за сглобяване

Следващата стъпка е да създадете код с `yarn build`.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

An example of `yarn build`

```shell
> yarn build
yarn run v1.22.10
$ tsc -b
✨  Done in 5.68s.
```

## 5. Стартирайте Docker

Използването на Docker ви позволява да изпълните този пример много бързо, тъй като цялата необходима инфраструктура може да бъде предоставена в изображението на Docker. Run `docker-compose pull && docker-compose up`.

Това ще доведе всичко до живот, където в крайна сметка ще получите блокове, които ще бъдат извлечени.

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

## 6. Преглед на детската площадка

Отидете на http://localhost:3000/ и поставете заявката по-долу в лявата част на екрана и след това натиснете бутона за възпроизвеждане.

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

Детска площадка за SubQuery в localhost.

![детска площадка localhost](/assets/img/subql_playground.png)

Броят на блоковете на детската площадка също трябва да съответства на броя на блоковете (технически височината на блока) в терминала.

## Резюме

В това кратко ръководство демонстрирахме основните стъпки за стартиране и стартиране на първоначален проект в среда на Docker и след това преминахме към localhost:3000 и изпълнихме заявка за връщане на номера на блока на мрежата на mainnet Polkadot.
