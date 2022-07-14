# Опубликовать ваш проект SubQuery

## Преимущества хостинга вашего проекта с SubQuery

- Мы будем выполнять ваши проекты SubQuery для вас в высокопроизводительной, масштабируемой и управляемой публичной службе.
- Эта услуга предоставляется сообществу бесплатно!
- Вы можете сделать свои проекты публичными, чтобы они были перечислены в [SubQuery Explorer](https://explorer.subquery.network) и любой человек в мире мог их просмотреть.
- Мы интегрированы с GitHub, поэтому все члены ваших организаций GitHub смогут просматривать общие проекты организации.

## Создайте свой первый проект в разделе SubQuery Projects

### Хостинг кодовой базы проекта

Существует два способа размещения кодовой базы вашего проекта SubQuery перед публикацией.

**GitHub**: Кодовая база вашего проекта должна находиться в публичном репозитории GitHub.

**IPFS**: Кодовая база вашего проекта может храниться в IPFS, вы можете следовать нашему руководству по хостингу IPFS, чтобы узнать, как [первая публикация в IPFS](../run_publish/ipfs.md).

### Вход в проекты SubQuery

Перед началом работы убедитесь, что кодовая база вашего проекта SubQuery находится в открытом репозитории GitHub или на IPFS. Файл `schema.graphql` должен находиться в корне вашего каталога.

Чтобы создать свой первый проект, перейдите в раздел [SubQuery Projects](https://project.subquery.network). Для входа в систему вам потребуется аутентификация с помощью учетной записи GitHub.

При первом входе в систему вам будет предложено авторизоваться в SubQuery. Ваш адрес электронной почты нужен нам только для идентификации вашего аккаунта, никакие другие данные из вашего аккаунта на GitHub мы не используем ни для каких других целей. На этом шаге вы также можете запросить или предоставить доступ к своей учетной записи GitHub Organization, чтобы вы могли размещать проекты SubQuery под своей GitHub Organization вместо личной учетной записи.

![Отмена одобрения учетной записи GitHub](/assets/img/project_auth_request.png)

SubQuery Projects - это место, где вы управляете всеми своими проектами, загруженными на платформу SubQuery. Вы можете создавать, удалять и даже обновлять проекты из этого приложения.

![Вход в проекты](/assets/img/projects-dashboard.png)

Если у вас подключены аккаунты GitHub Organization, вы можете использовать переключатель в заголовке, чтобы переключаться между личным аккаунтом и аккаунтом GitHub Organization. Проекты, созданные в учетной записи GitHub Organization, распространяются между членами этой GitHub Organization. Для подключения учетной записи GitHub Organization вы можете [последовать следующим шагам](publish.md#add-github-organization-account-to-subquery-projects).

![Переключение между учетными записями GitHub](/assets/img/projects-account-switcher.png)

### Создайте свой первый проект

Существует два способа создания проекта в SubQuery Managed Service, вы можете использовать пользовательский интерфейс или непосредственно через инструмент `subql` cli.

#### Использование пользовательского интерфейса

Начнем с нажатия кнопки "Создать проект". Вы попадете на форму "Новый проект". Пожалуйста, введите следующие данные (вы можете изменить их в будущем):

- ** Учетная запись GitHub: ** Если у вас есть более одной учётной записи GitHub, выберите, под какой учётной записью будет создан этот проект. Проекты, созданные в учетной записи организации GitHub, совместно используются участниками в этой организации.
- **Название проекта**
- **Тема**
- **Описание**
- ** URL-адрес репозитория GitHub: ** Это должен быть действующий URL-адрес GitHub для общедоступного репозитория, в котором находится ваш проект SubQuery. Пожалуйста, введите следующие данные (вы можете изменить их в будущем):
- ** База данных:** Премиум-клиенты могут получить доступ к выделенным базам данных для размещения производственных проектов SubQuery. Если это вас интересует, вы можете связаться с [sales@subquery.network](mailto:sales@subquery.network), чтобы включить эту настройку.
- **Источник развертывания:** Вы можете выбрать развертывание проекта из репозитория GitHub или альтернативное развертывание из IPFS CID, см. наше руководство о [хостинге с IPFS.](ipfs.md)
- **Скрыть проект:** Это скроет ваш проект для публичного изучения. Не устанавливайте этот флажок, если хотите поделиться своим проектом с сообществом!

![Create your first Project](/assets/img/projects-create.png)

Создайте свой проект, и вы увидите его в списке SubQuery Project. _ Мы почти у цели! Нам просто нужно развернуть новую версию._

![Created Project with no deployment](/assets/img/projects-no-deployment.png)

#### Использование CLI

Вы также можете использовать `@subql/cli` для публикации вашего проекта в нашей управляемой службе. Для этого необходимо:

- `@subql/cli` версии 1.1.0 или выше.
- Действительный [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) готов.

```shell
// Создание проекта с помощью CLI
$ subql project:create-project

// ИЛИ при неинтерактивном использовании, он подскажет вам, если отсутствуют необходимые поля
$ subql project:create-project
    --apiVersion=apiVersion Версия Api по умолчанию равна 2
    --description=description Введите описание
    --gitRepo=gitRepo Введите git-репозиторий
    --org=org Введите имя организации
    --project_name=project_name Введите имя проекта

```

### Разверните свою первую версию

Существует два способа развертывания новой версии вашего проекта в SubQuery Managed Service: вы можете использовать пользовательский интерфейс или непосредственно инструмент `subql` cli.

#### Использование пользовательского интерфейса

Хотя создание проекта настроит поведение проекта на экране, вы должны развернуть его версию, прежде чем он начнет работать. Развертывание версии запускает новую операцию индексирования SubQuery и устанавливает необходимую службу запросов, чтобы начать принимать запросы GraphQL. Здесь же можно развернуть новые версии в существующих проектах.

В новом проекте вы увидите кнопку Развернуть новую версию. Щелкните это и заполните необходимую информацию о развертывании:

- **Branch:** На GitHub выберите ветвь проекта, из которой вы хотите развернуть проект.
- **Commit Hash:** На GitHub выберите конкретный коммит той версии кодовой базы вашего проекта SubQuery, которую вы хотите развернуть.
- **IPFS:** При развертывании из IPFS вставьте CID развертывания IPFS (без ведущего `ipfs://`).
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here.
- **Indexer Version:** This is the version of SubQuery's node service that you want to run this SubQuery on. See [`@subql/node`](https://www.npmjs.com/package/@subql/node).
- **Query Version:** This is the version of SubQuery's query service that you want to run this SubQuery on. See [`@subql/query`](https://www.npmjs.com/package/@subql/query).

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

#### Использование CLI

You can also use `@subql/cli` to create a new deployment of your project to our managed service. This requires:

- `@subql/cli` версии 1.1.0 или выше.
- A valid [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ready.

```shell
// Deploy using the CLI
$ suqbl deployment:deploy

// OR Deploy using non-interactive CLI
$ suqbl deployment:deploy
  --dict=dict                      Enter Dictionary Endpoint
  --endpoint=endpoint              Enter Network Endpoint
  --indexerVersion=indexerVersion  Enter indexer-version
  --ipfsCID=ipfsCID                Enter IPFS CID
  --org=org                        Enter Organization Name
  --project_name=project_name      Enter Project Name
  --queryVersion=queryVersion      Enter Query-version
  --type=type                      Enter deployment type e.g. primary or stage
```

## Следующие шаги - подключитесь к вашему проекту

После успешного завершения установки и успешного индексирования нашими узлами ваших данных из цепочки, вы сможете подключиться к вашему проекту через отображённую конечную точку запроса GraphQL Query.

![Проект будет развернут и синхронизирован](/assets/img/projects-deploy-sync.png)

Кроме того, вы можете щелкнуть три точки рядом с названием вашего проекта и просмотреть его в SubQuery Explorer. There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![Projects in SubQuery Explorer](/assets/img/projects-explorer.png)

## Добавить учетную запись организации GitHub в проекты подзапроса

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![Переключение между учетными записями GitHub](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![Отмена одобрения учетной записи GitHub](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
