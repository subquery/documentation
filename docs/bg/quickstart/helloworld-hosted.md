# Здравей свят (Хоствано от SubQuery)

Целта на този наръчник е да покаже как можете да стартирате проект по подразбиране в SubQuery Projects (нашата управлявана услуга) в няколко лесни стъпки.

Ще вземем простия стартов проект (и всичко, което научихме досега), но вместо да го изпълняваме локално в Docker, ще се възползваме от управляваната хостинг инфраструктура на SubQuery. С други думи, ние позволяваме на SubQuery да върши цялата работа по стартиране и управление на производствената инфраструктура.

## Учебни Цели

В края на този курс вие трябва да:

- разберете необходимите предпоставки
- можете да хостнете проект [SubQuery Projects](https://project.subquery.network/)
- изпълнете проста заявка, за да получите височината на блока от основната мрежа на Polkadot
- изпълнете проста GET заявка, за да получите височината на блока от основната мрежа на Polkadot, като използвате cURL

## Аудитория

Това ръководство е насочено към нови разработчици, които имат известен опит в разработката и се интересуват да научат повече за SubQuery.

## Видео ръководство

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/b-ba8-zPOoo" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Необходими условия

Ще ви трябва:

- gitHub акаунт

## 1. Създай проект

Нека създадем проект, наречен subqlHelloWorld, като стартираме `subql init` и изберем да изградим проекта с мрежата `Polkadot` и инициализираме проекта с `subql-starter` шаблон. Трябва да изпълним задължителната инсталация, кодиране и изграждане с любимия ви мениджър на пакети.

```shell
> subql init subqlHelloWorld
yarn install
yarn codegen
yarn build
```

Въпреки това НЕ изпълнявайте командите на docker.

## 2. Създаване на GitHub хранилище

В GitHub създайте ново публично хранилище. Въведете име и задайте видимостта си на обществена. Тук всичко се запазва по подразбиране засега.

![create github repo](/assets/img/github_create_new_repo.png)

Обърнете внимание на вашия URL адрес на GitHub, той трябва да е публичен, за да може SubQuery да има достъп до него.

![create github repo](/assets/img/github_repo_url.png)

## 3. Натиснете към GitHub

Обратно в директорията на вашия проект, инициализирайте я като директория git. В противен случай може да получите грешката "fatal: not a git repository (or any of the parent directories): .git"

```shell
git init
```

След това добавете отдалечено хранилище с командата:

```shell
git remote add origin https://github.com/seandotau/subqlHelloWorld.git
```

Това настройва вашето отдалечено хранилище на “https://github.com/seandotau/subqlHelloWorld.git” и му дава името „origin“, което е стандартната номенклатура за отдалечено хранилище в GitHub.

След това добавяме кода към нашето репо със следните команди:

```shell
> git add .
> git commit -m "First commit"
[master (root-commit) a999d88] First commit
10 files changed, 3512 insertions(+)
create mode 100644 .gitignore
create mode 100644 README.md
create mode 100644 docker-compose.yml
create mode 100644 package.json
create mode 100644 project.yaml
create mode 100644 schema.graphql
create mode 100644 src/index.ts
create mode 100644 src/mappings/mappingHandlers.ts
create mode 100644 tsconfig.json
create mode 100644 yarn.lock
> git push origin master
Enumerating objects: 14, done.
Counting objects: 100% (14/14), done.
Delta compression using up to 12 threads
Compressing objects: 100% (13/13), done.
Writing objects: 100% (14/14), 59.35 KiB | 8.48 MiB/s, done.
Total 14 (delta 0), reused 0 (delta 0)
To https://github.com/seandotau/subqlHelloWorld.git
 * [new branch]      master -> master

```

Командата за натискане означава "моля, натиснете моя код КЪМ първоначалното репо ОТ моето главно локално репо". Обновяването на GitHub трябва да покаже целия код в GitHub.

![First commit](/assets/img/first_commit.png)

Сега, след като имате кода си в GitHub, нека да разгледаме как можем да го хостваме в SubQuery Projects.

## 4. Създай проект

Отидете до [https://project.subquery.network](https://project.subquery.network) и влезте с вашия GitHub акаунт.

![Welcome to SubQuery Projects](/assets/img/welcome_to_subquery_projects.png)

След това създайте нов проект,

![Welcome to SubQuery Projects](/assets/img/subquery_create_project.png)

И попълнете различните полета със съответните данни.

- **GitHub account:** Ако имате повече от един акаунт в GitHub, изберете под кой акаунт ще бъде създаден този проект. Проектите, създадени в акаунт на организация в GitHub, се споделят между членовете в тази организация.
- **Project Name:** Дайте име на вашия проект тук.
- **Subtitle:** Предоставете подзаглавие за вашия проект.
- **Description:** Обяснете какво прави вашият SubQuery проект.
- **GitHub Repository URL:** Това трябва да е валиден URL адрес на GitHub към публично хранилище, което съдържа вашия SubQuery проект. Файлът schema.graphql трябва да е в корена на вашата директория.
- **Скриване на проект:** Ако е маркирано, това ще скрие проекта от публичния SubQuery експлорър. Запазете това немаркирано, ако искате да споделите вашият SubQuery с общността!

![Create SubQuery parameters](/assets/img/create_subquery_project_parameters.png)

Когато щракнете върху създаване, ще бъдете отведени до таблото си за управление.

![SubQuery Project dashboard](/assets/img/subquery_project_dashboard.png)

Таблото за управление съдържа много полезна информация като мрежата, която използва, URL адреса на хранилището на GitHub на изходния код, който изпълнява, кога е създаден и последно актуализиран, и по-специално подробности за внедряването.

## 5. Внедрете първия си проект

Сега, когато сте създали своя проект в SubQuery Projects, настройвайки поведението на началния екран, следващата стъпка е да стартирате проекта си, като го направите оперативен. Внедряването на версия задейства нова операция за индексиране на SubQuery и настройва необходимата услуга за заявки, за да започне да приема заявки на GraphQL. Можете също да внедрите нови версии в съществуващи проекти тук.

Можете да изберете да внедрите в различни среди, като производствен слот или слот за етапи. Тук ще внедрим в производствения слот. Щракването върху бутона "Deploy" извежда екран със следните полета:

![Deploy to production slot](/assets/img/deploy_production_slot.png)

- **Commit Hash of new Version:** От GitHub изберете правилния комит на кодовата база на проекта SubQuery, която искате да бъде внедрена
- **Версия на индексатора:** Това е версията на SubQuery нодът, на който искате да стартирате този SubQuery. Вижте [@subql/node](https://www.npmjs.com/package/@subql/node)
- **Версия на заявка:** Това е версията на услугата за заявки на SubQuery, на която искате да стартирате този SubQuery. Вижте [@subql/node](https://www.npmjs.com/package/@subql/query)

Тъй като имаме само един комит, има само една опция в падащото меню. Ние също така ще работим с най-новата версия на индексатора и версията на заявката, така че ще приемем настройките по подразбиране и след това ще щракнем върху „Deploy Update“.

След това ще видите внедряването си в статуса „Processing“. Тук вашият код се разгръща в инфраструктурата на SubQuery. По принцип сървърът се задейства при поискване и се предоставя за вас. Това ще отнеме няколко минути, така че време да вземете кафе!

![Deployment processing](/assets/img/deployment_processing.png)

Внедряването вече е в ход.

![Deployment running](/assets/img/deployment_running.png)

## 6. Тестване на вашия проект

За да тествате проекта си, щракнете върху 3-те многоточия и изберете "View on SubQuery Explorer".

![View Subquery project](/assets/img/view_on_subquery.png)

Това ще ви отведе до познато "игрище" където можете да щракнете върху бутона за възпроизвеждане и да видите резултатите от заявката.

![Subquery playground](/assets/img/subquery_playground.png)

## 7. Бонусна стъпка

За проницателните сред нас, ще си спомните, че в учебните цели последната точка беше да се изпълни проста GET заявка. За да направим това, ще трябва да вземем „Query Endpoint“, показана в подробностите за внедряване.

![Query endpoing](/assets/img/query_endpoint.png)

След това можете да изпратите GET заявка до този еднпойнт или като използвате любимия си клиент, като напр[Postman](https://www.postman.com/) или [Mockoon](https://mockoon.com/) или чрез cURL във вашия терминал. За простота, cURL ще бъде показан по-долу.

Командата curl за изпълнение е:

```shell
curl https://api.subquery.network/sq/seandotau/subqueryhelloworld -d "query=query { starterEntities (first: 5, orderBy: CREATED_AT_DESC) { totalCount nodes { id field1 field2 field3 } } }"
```

giving the results of:

```shell
{"data":{"starterEntities":{"totalCount":23098,"nodes":[{"id":"0x29dfe9c8e5a1d51178565c2c23f65d249b548fe75a9b6d74cebab777b961b1a6","field1":23098,"field2":null,"field3":null},{"id":"0xab7d3e0316a01cdaf9eda420cf4021dd53bb604c29c5136fef17088c8d9233fb","field1":23097,"field2":null,"field3":null},{"id":"0x534e89bbae0857f2f07b0dea8dc42a933f9eb2d95f7464bf361d766a644d17e3","field1":23096,"field2":null,"field3":null},{"id":"0xd0af03ab2000a58b40abfb96a61d312a494069de3670b509454bd06157357db6","field1":23095,"field2":null,"field3":null},{"id":"0xc9f5a92f4684eb039e11dffa4b8b22c428272b2aa09aff291169f71c1ba0b0f7","field1":23094,"field2":null,"field3":null}]}}}

```

Readability is not a concern here as you will probably have some front end code to consume and parse this JSON response.

## Summary

In this SubQuery hosted quick start we showed how quick and easy it was to take a Subql project and deploy it to [SubQuery Projects](https://project.subquery.network) where all the infrastructure is provided for your convenience. There is an inbuilt playground for running various queries as well as an API endpoint for your code to integrate with.
