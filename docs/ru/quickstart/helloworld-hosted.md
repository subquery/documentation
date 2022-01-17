# Здравствуй мир (SubQuery hosted)

Цель этого краткого руководства - показать, как можно за несколько простых шагов запустить стартовый проект по умолчанию в SubQuery Projects (наша управляемая служба).

Возьмем простой стартовый проект (и все, чему мы научились до сих пор), и вместо того, чтобы запускать его локально в Docker, мы воспользуемся инфраструктурой управляемого хостинга SubQuery. Другими словами, мы позволяем SubQuery выполнять всю тяжелую работу по запуску и управлению производственной инфраструктурой.

## Цели обучения

По окончании этого краткого курса вы должны:

- понимать необходимые предварительные требования
- иметь возможность разместить проект в [SubQuery Projects](https://project.subquery.network/)
- выполнить простой запрос для получения высоты блока в сети Polkadot, используя игровую площадку
- выполнить простой GET-запрос для получения высоты блока сети Polkadot с помощью cURL

## Целевая аудитория

Это руководство предназначено для начинающих разработчиков, имеющих некоторый опыт разработки и желающих узнать больше о SubQuery.

## Видео гайд

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/b-ba8-zPOoo" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Предварительные требования

Вам необходимо:

- аккаунт GitHub

## 1. Создание своего проекта

Создайте проект под названием subql_hellowworld и выполните обязательные установку install, codegen и сборку build с помощью вашего менеджера пакетов.

```shell
> subql init --starter subqlHelloWorld
yarn install
yarn codegen
yarn build
```

НЕ запускайте команды docker.

## 2. Создание репозитория на GitHub

В GitHub создайте новый публичный репозиторий. Укажите имя и установите его как публичный репозиторий. Все остальное оставить по умолчанию.

![Создать репозиторий GitHub](/assets/img/github_create_new_repo.png)

Обратите внимание на URL вашего GitHub, он должен быть публичным, чтобы SubQuery мог получить к нему доступ.

![Создать репозиторий GitHub](/assets/img/github_repo_url.png)

## 3. Отправим проект на GitHub

Возвращаемся в каталог проекта и инициализируем его как каталог git. Иначе вы получите ошибку "fatal: not a git repository (or any of the parent directories): .git"

```shell
git init
```

Затем добавьте удаленный репозиторий с помощью команды:

```shell
git remote add origin https://github.com/seandotau/subqlHelloWorld.git
```

По сути, это устанавливает ваш удаленный репозиторий на «https://github.com/seandotau/subqlHelloWorld.git» и дает ему имя «origin», которое является стандартной номенклатурой для удаленного репозитория в GitHub.

Далее мы добавляем код в наш репозиторий с помощью следующих команд:

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

Команда push означает "пожалуйста, переместите мой код в исходное репо из локального репо моего мастера". При обновление GitHub должен отображаться весь код в GitHub.

![Первая фиксация](/assets/img/first_commit.png)

Теперь, когда вы получили свой код на GitHub, давайте посмотрим, как мы можем разместить его в SubQuery Projects.

## 4. Создание своего проекта в SubQuery Projects

Перейдите по ссылке [ https://project.subquery.network ](https://project.subquery.network) и синхронизируйте со своей учетную запись GitHub.

![Добро пожаловать в SubQuery Projects](/assets/img/welcome_to_subquery_projects.png)

Затем создайте новый проект, нажав на кнопку new project

![Добро пожаловать в SubQuery Projects](/assets/img/subquery_create_project.png)

И заполните поля соответствующими данными.

- ** Учетная запись GitHub: ** Если у вас более одной учетной записи GitHub, выберите тот, под какой учетной записью был создан ваш проект. Проекты, созданные на GitHub, распространяются между членами этой организации.
- ** Название проекта: ** Укажите название вашему проекту.
- ** Субтитры: ** Укажите субтитры для вашего проекта.
- ** Описание: ** Опишите ваш проект, что он делает.
- ** URL-адрес репозитория GitHub: ** Это должен быть действующий URL-адрес GitHub для общедоступного репозитория, содержащего ваш проект SubQuery. Файл schema.graphql должен находиться в корне вашего каталога.
- **Скрыть проект:** Это скроет ваш проект для публичного изучения. Не устанавливайте этот флажок, если хотите поделиться своим проектом с сообществом!

![Создать параметры SubQuery](/assets/img/create_subquery_project_parameters.png)

При нажатии кнопки «Создать», вы попадете в панель управления.

![Панель управления SubQuery Project](/assets/img/subquery_project_dashboard.png)

Приборная панель содержит много полезной информации, такой как используемая сеть, URL репозитория GitHub исходного кода, когда он был создан и последний раз обновлен, и, в частности, детали развертывания.

## 5. Разверните свой проект

Теперь, когда вы создали свой проект в SubQuery Projects и настроили отображение дисплея, следующим шагом будет развертывание вашего проектаи приведение его в рабочее состояние. Развертывание версии запускает новую операцию индексирования SubQuery и устанавливает необходимую службу запросов, чтобы начать принимать запросы GraphQL. Здесь же можно развернуть новые версии в существующих проектах.

Вы можете выбрать развертывание в различных средах, таких как производственный слот или промежуточный слот. Здесь мы произведём развёртывание в производственный слот. При нажатии на кнопку «Развернуть» открывается экран со следующими полями:

![Развёртывание в производственный слот](/assets/img/deploy_production_slot.png)

- **Commit Hash of new Version:** В GitHub выберите правильную фиксацию SubQuery project codebase, которую вы хотите развернуть
- **Indexer Version:** Это версия службы узла SubQuery, на которой вы хотите запустить этот SubQuery. См. [ @ subql / node ](https://www.npmjs.com/package/@subql/node)
- **Query Version:** Это версия службы запросов SubQuery, в которой вы хотите запустить этот SubQuery. См. [ @ subql / node ](https://www.npmjs.com/package/@subql/query)

Поскольку у нас есть только один commit, в раскрывающемся списке есть только один вариант. Мы также будем работать с последней Indexer Version и query version, поэтому примем значения по умолчанию и затем нажмем «Deploy Update».

После этого вы увидите свое развертывание в статусе «Processing». Здесь ваш код развертывается в управляемой инфраструктуре SubQuery. В основном сервер раскручивается по запросу и подготавливается для вас. Это займет несколько минут, так что самое время, чтобы выпить кофе!

![Обработка развертывания](/assets/img/deployment_processing.png)

Развертывание запущено.

![Запуск развёртывания](/assets/img/deployment_running.png)

## 6. Тестирование вашего проекта

Чтобы протестировать свой проект, нажмите на 3 многоточия и выберите «View on SubQuery Explorer».

![Просмотр проектов Subquery](/assets/img/view_on_subquery.png)

Это перенесет вас на знакомую «Playground», где вы можете нажать кнопку воспроизведения и просмотреть результаты запроса.

![Площадка Subquery](/assets/img/subquery_playground.png)

## 7. Шаг 7: Бонусный шаг

Для проницательных: вы помните, что в целях обучения последним пунктом было выполнение простого запроса GET. Для этого нам нужно будет получить «Query Endpoint», отображаемую в деталях развертывания.

![Конечная точка запроса](/assets/img/query_endpoint.png)

Затем вы можете отправить запрос GET на эту конечную точку либо с помощью вашего любимого клиента, такого как [ Postman ](https://www.postman.com/) или [ Mockoon ](https://mockoon.com/), либо через cURL в вашем терминале. Для простоты ниже будет показан cURL.

Команда curl для запуска:

```shell
curl https://api.subquery.network/sq/seandotau/subqueryhelloworld -d "query=query { starterEntities (first: 5, orderBy: CREATED_AT_DESC) { totalCount nodes { id field1 field2 field3 } } }"
```

выдача результатов:

```shell
{"data":{"starterEntities":{"totalCount":23098,"nodes":[{"id":"0x29dfe9c8e5a1d51178565c2c23f65d249b548fe75a9b6d74cebab777b961b1a6","field1":23098,"field2":null,"field3":null},{"id":"0xab7d3e0316a01cdaf9eda420cf4021dd53bb604c29c5136fef17088c8d9233fb","field1":23097,"field2":null,"field3":null},{"id":"0x534e89bbae0857f2f07b0dea8dc42a933f9eb2d95f7464bf361d766a644d17e3","field1":23096,"field2":null,"field3":null},{"id":"0xd0af03ab2000a58b40abfb96a61d312a494069de3670b509454bd06157357db6","field1":23095,"field2":null,"field3":null},{"id":"0xc9f5a92f4684eb039e11dffa4b8b22c428272b2aa09aff291169f71c1ba0b0f7","field1":23094,"field2":null,"field3":null}]}}}

```

Читаемость здесь не важна, так как у вас, вероятно, будет какой-то внешний код для использования и анализа этого ответа JSON.

## Заключение

В этом кратком руководстве, размещенном в SubQuery, мы показали, насколько быстро и легко было взять проект Subql и развернуть его в [ SubQuery Projects ](https://project.subquery.network), где для вашего удобства предоставляется вся инфраструктура. Существует встроенная игровая площадка для выполнения различных запросов, а также конечная точка API для интеграции вашего кода.
