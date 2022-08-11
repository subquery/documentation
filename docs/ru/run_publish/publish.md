# Опубликовать ваш проект SubQuery

## Преимущества хостинга вашего проекта с SubQuery

- Мы готовы выполнять ваши проекты SubQuery для вас в высокопроизводительной, масштабируемой и управляемой публичной службе.
- This service is being provided to the community with a generous free tier! You can host your first two SubQuery projects for absolutely free!”
- Вы сможете сделать свои проекты публичными, чтобы они были перечислены в [SubQuery Explorer](https://explorer.subquery.network) и абсолютно любой человек в мире сможет их просмотреть.
- Мы интегрированы с GitHub, поэтому все члены ваших организаций GitHub смогут просматривать общие проекты организации.

## Создайте свой первый проект в разделе SubQuery Projects

### Хостинг кодовой базы проекта

Существует два способа размещения кодовой базы вашего проекта SubQuery перед публикацией.

**IPFS (рекомендуется)**: База кодов вашего проекта может храниться в IPFS, вы можете изучить наше руководство по хостингу IPFS, чтобы узнать, как [сначала опубликоваться в IPFS](../run_publish/ipfs.md).

**GitHub (will be deprecated)**: Your project's codebase must be in a public GitHub repository, this process may be deprecated soon.

### Вход в проекты SubQuery

Перед началом работы убедитесь, что кодовая база вашего проекта SubQuery находится в открытом репозитории GitHub или на IPFS. Файл `schema.graphql` должен находиться в корне вашего каталога.

Чтобы создать свой первый проект, перейдите в раздел [SubQuery Projects](https://project.subquery.network). Для входа в систему вам потребуется аутентификация с помощью учетной записи GitHub.

При первом входе в систему вам будет предложено авторизоваться в SubQuery. Ваш адрес электронной почты понадобится нам только для идентификации аккаунта, никакие другие данные из вашего аккаунта на GitHub мы не используем ни для каких других целей. На этом шаге вы также можете запросить или предоставить доступ к своей учетной записи GitHub Organization, чтобы вы могли размещать проекты SubQuery под своей GitHub Organization вместо личной учетной записи.

![Отмена одобрения учетной записи GitHub](/assets/img/project_auth_request.png)

SubQuery Projects - это место, где вы управляете всеми своими проектами, загруженными на платформу SubQuery. Вы можете создавать, удалять и даже обновлять проекты из этого приложения.

![Вход в проекты](/assets/img/projects-dashboard.png)

Если у вас подключены аккаунты GitHub Organization, вы можете использовать переключатель в заголовке, чтобы переключаться между личным аккаунтом и аккаунтом GitHub Organization. Проекты, созданные в учетной записи GitHub Organization, распространяются между членами этой GitHub Organization. Для подключения учетной записи GitHub Organization вы можете [последовать следующим шагам](publish.md#add-github-organization-account-to-subquery-projects).

![Переключение между учетными записями GitHub](/assets/img/projects-account-switcher.png)

### Создайте свой первый проект

There are three methods to create a project in the SubQuery Managed Service: you can use the UI, create it directly via the `subql` cli tool, or use an automated GitHub action.

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

![Создайте свой первый проект](/assets/img/projects-create.png)

Создайте свой проект, и вы увидите его в списке SubQuery Project. _ Мы почти у цели! Нам просто нужно развернуть новую версию._

![Созданный проект без развертывания](/assets/img/projects-no-deployment.png)

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
    --projectName=projectName Введите имя проекта
```

### Разверните свою первую версию

There are three methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly, via the `subql` cli tool, or using an automated GitHub Action.

#### Использование пользовательского интерфейса

Хотя создание проекта настроит поведение проекта на экране, вы должны развернуть его версию, прежде чем он начнет работать. Развертывание версии запускает новую операцию индексирования SubQuery и устанавливает необходимую службу запросов, чтобы начать принимать запросы GraphQL. Здесь же можно развернуть новые версии в существующих проектах.

В новом проекте вы увидите кнопку Развернуть новую версию. Щелкните это и заполните необходимую информацию о развертывании:

- **Branch:** На GitHub выберите ветвь проекта, из которой вы хотите развернуть проект.
- **Commit Hash:** На GitHub выберите конкретный коммит той версии кодовой базы вашего проекта SubQuery, которую вы хотите развернуть.
- **IPFS:** При развертывании из IPFS вставьте CID развертывания IPFS (без ведущего `ipfs://`).
- **Override Network and Dictionary Endpoints:** Здесь вы можете переопределить конечные точки в манифесте вашего проекта.
- **Indexer Version:** Это версия службы узла SubQuery, на которой вы хотите запустить этот SubQuery. См. [`@ subql / node`](https://www.npmjs.com/package/@subql/node).
- **Query Version:** Это версия службы запросов SubQuery, на которой вы хотите запустить этот SubQuery. См. [`@subql/query`](https://www.npmjs.com/package/@subql/query).

![Разверните свой первый проект](https://static.subquery.network/media/projects/projects-first-deployment.png)

При успешном развертывании вы увидите, как индексатор начинает работать и сообщает о ходе индексирования текущей цепочки. Этот процесс может занять некоторое время до достижения 100%.

#### Использование CLI

Вы также можете использовать `@subql/cli` для создания нового развертывания вашего проекта в нашей управляемой службе. Для этого необходимо:

- `@subql/cli` версии 1.1.0 или выше.
- Действительный [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) готов.

```shell
// Развертывание с помощью CLI
$ subql deployment:deploy

// ИЛИ Развертывание с помощью неинтерактивного CLI
$ subql deployment:deploy

  -d, --useDefaults Использовать значения по умолчанию для indexerVerion, queryVersion, dictionary, endpoint
  --dict=dict Введите словарь
  --endpoint=endpoint Введите конечную точку
  --indexerVersion=indexerVersion Введите версию индексатора
  --ipfsCID=ipfsCID Введите CID IPFS
  --org=org Введите имя организации
  --projectName=projectName Введите имя проекта
  --queryVersion=queryVersion Введите версию запроса
  --type=(stage|primary) [по умолчанию: primary]
```

#### Using GitHub actions

With the introduction of the deployment feature for the CLI, we've added a **Default Action Workflow** to [the starter project in GitHub](https://github.com/subquery/subql-starter/blob/v1.0.0/.github/workflows/cli-deploy.yml) that will allow you to publish and deploy your changes automatically:

- Step 1: After pushing your project to GitHub, create `DEPLOYMENT` environment on GitHub, and add the secret [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) to it.
- Step 2: Create a project on [SubQuery Projects](https://project.subquery.network), this can be done using the the [UI](#using-the-ui) or [CLI](#using-the-cli).
- Step 3: Once your project is created, navigate to the GitHub Actions page for your project, and select the workflow `CLI deploy`
- Step 4: You'll see an input field where you can enter the unique code of your project created on SubQuery Projects, you can get the code from the URL in SubQuery Projects [SubQuery Projects](https://project.subquery.network). The code is based on the name of your project, where spaces are replaced with hyphens `-`. e.g. `my project name` becomes `my-project-name`
- Once the workflow is complete, you should be see your project deployed to our Managed Service

A common approach is to extend the default GitHub Action to automatically deploy changes to our Managed Service when code is merged into main. The following change to the GitHub Action workflow do this:

```yml
on:
  push:
    branches:
      - main
jobs:
  deploy:
    name: CLI Deploy
    ...
```

## Следующие шаги - подключитесь к вашему проекту

После успешного завершения установки и успешного индексирования нашими узлами ваших данных из цепочки, вы сможете подключиться к вашему проекту через отображённую конечную точку запроса GraphQL Query.

![Проект будет развернут и синхронизирован](/assets/img/projects-deploy-sync.png)

Кроме того, вы можете щелкнуть три точки рядом с названием вашего проекта и просмотреть его в SubQuery Explorer. There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![Проекты в SubQuery Explorer](/assets/img/projects-explorer.png)

## Добавить учетную запись организации GitHub в проекты подзапроса

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![Переключение между учетными записями GitHub](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![Отмена одобрения учетной записи GitHub](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
