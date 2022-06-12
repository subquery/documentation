# Здравей свят (localhost + Docker)

Добре дошли в този бърз старт на SubQuery Hello World. The quick start aims to show you how you get the default starter project running in Docker in a few simple steps.

## Цели на обучението

В края на този бърз старт трябва:

- разберете необходимите предпоставки
- разберете основните общи команди
- да можете да навигирате до localhost:3000 и да видите площадката за стартиране
- изпълнете проста заявка, за да получите височината на блока на основната мрежа на Polkadot

## Целева публика

Това ръководство е насочено към нови разработчици, които имат известен опит в разработката и се интересуват да научат повече за SubQuery.

## Видео ръководство

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/j034cyUYb7k" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Необходими условия

Ще ви трябват:

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

Това трябва да върне: (за потребители на npm заменете yarn с npm)

```shell
My yarn version is: 1.22.10
My subql version is: @subql/cli/0.9.3 darwin-x64 node-v16.3.0
My docker version is: Docker version 20.10.5, build 55c4c88
```

Ако видите горното, значи сте готови. Ако не, следвайте тези връзки, за да ги инсталирате:

- [yarn](https://classic.yarnpkg.com/en/docs/install/) или [npm](https://www.npmjs.com/get-npm)
- [SubQuery CLI](quickstart-polkadot.md#install-the-subquery-cli)
- [Docker](https://docs.docker.com/get-docker/)

## 1. Инициализирайте проекта

Първата стъпка при стартиране с SubQuery е да изпълните командата `subql init`. Нека инициализираме стартов проект с името `subqlHelloWorld`. Имайте предвид, че само авторът е задължителен. Всичко останало отдолу остава празно.

```shell
> subql init subqlHelloWorld
? Select a network Polkadot
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

## 2. Инсталиране на зависимости

Сега направете инсталация на yarn или node, за да инсталирате различните зависимости.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm install ``` </CodeGroupItem> </CodeGroup>

Пример за `yarn install`

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

## 3. Генериране на код

Сега стартирайте `yarn codegen`, за да генерирате Typescript от схемата GraphQL.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

Пример за `yarn codegen`

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

**Предупреждение** Когато бъдат направени промени във schema файла, моля, не забравяйте да стартирате отново `yarn codegen`, за да регенерирате вашата директория с типове.

## 4. Код за изграждане

Следващата стъпка е да създадете код с `yarn build`.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

Пример за `yarn build`

```shell
> yarn build
yarn run v1.22.10
$ tsc -b
✨  Done in 5.68s.
```

## 5. Стартирайте Docker

Използването на Docker ви позволява да стартирате този пример много бързо, тъй като цялата необходима инфраструктура може да бъде предоставена в Docker image. Изпълнете `docker-compose pull && docker-compose up`.

Това ще стартира всичко, където в крайна сметка ще започнете да извличате блокове.

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

## 6. Стартиране в браузъра

Отидете до http://localhost:3000/ и поставете заявката по-долу в лявата част на екрана и след това натиснете бутона за възпроизвеждане.

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

SubQuery тестова площадка на localhost.

![playground localhost](/assets/img/subql_playground.png)

Броят на блоковете в тестовата площадка също трябва да съответства на броя на блоковете (технически височината на блока) в терминала.

## Обобщение

В този бърз старт демонстрирахме основните стъпки за стартиране на начален проект в Docker среда и след това навигирахме до localhost:3000 и изпълнихме заявка за връщане на номера на блока на основната мрежа Polkadot.
