# Опубликовать ваш проект SubQuery

## Преимущества хостинга вашего проекта с SubQuery

- Мы будем запускать ваши проекты SubQuery для вас в высокопроизводительной, масштабируемой и управляемой общедоступной службе
- Эта услуга предоставляется сообществу бесплатно!
- Вы можете сделать свои проекты общедоступными, чтобы они были перечислены в [ SubQuery Explorer ](https://explorer.subquery.network), и любой желающий мог их просматривать
- Мы интегрированы с GitHub, поэтому любой в вашей организации GitHub сможет просматривать общие проекты организации

## Создайте свой первый проект в разделе SubQuery Projects

### Хостинг кодовой базы проекта

Существует два способа размещения кодовой базы вашего проекта SubQuery перед публикацией.

**GitHub**: кодовая база вашего проекта должна находиться в публичном репозитории GitHub

**IPFS**: Кодовая база вашего проекта может храниться в IPFS, вы можете следовать нашему руководству по хостингу IPFS, чтобы узнать, как [ впервые опубликовать в IPFS](ipfs.md).

### Вход в проекты SubQuery

Перед началом работы убедитесь, что кодовая база вашего проекта SubQuery находится в открытом репозитории GitHub или на IPFS. Файл `schema.graphql` должен находиться в корне вашего каталога.

To create your first project, head to [SubQuery Projects](https://project.subquery.network). Для входа в систему вам потребуется аутентификация с помощью учетной записи GitHub.

При первом входе в систему вам будет предложено авторизоваться в SubQuery. Ваш адрес электронной почты нужен нам только для идентификации вашего аккаунта, никакие другие данные из вашего аккаунта на GitHub мы не используем ни для каких других целей. На этом шаге вы также можете запросить или предоставить доступ к своей учетной записи GitHub Organization, чтобы вы могли размещать проекты SubQuery под своей GitHub Organization вместо личной учетной записи.

![Отмена одобрения учетной записи GitHub](/assets/img/project_auth_request.png)

SubQuery Projects - это место, где вы управляете всеми своими проектами, загруженными на платформу SubQuery. Вы можете создавать, удалять и даже обновлять проекты из этого приложения.

![Вход в проекты](/assets/img/projects-dashboard.png)

Если у вас подключены аккаунты GitHub Organization, вы можете использовать переключатель в заголовке, чтобы переключаться между личным аккаунтом и аккаунтом GitHub Organization. Проекты, созданные в учетной записи GitHub Organization, распространяются между членами этой GitHub Organization. Для подключения учетной записи GitHub Organization вы можете [последовать следующим шагам](#add-github-organization-account-to-subquery-projects).

![Переключение между учетными записями GitHub](/assets/img/projects-account-switcher.png)

### Создайте ваш первый проект

There are two methods to create a project in the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

#### Using the UI

Let's start by clicking on "Create Project". You'll be taken to the New Project form. Please enter the following (you can change this in the future):

- ** Учетная запись GitHub: ** Если у вас есть более одной учётной записи GitHub, выберите, под какой учётной записью будет создан этот проект. Проекты, созданные в учетной записи организации GitHub, совместно используются участниками в этой организации.
- **Название проекта**
- **Тема**
- **Описание**
- ** URL-адрес репозитория GitHub: ** Это должен быть действующий URL-адрес GitHub для общедоступного репозитория, в котором находится ваш проект SubQuery. The `schema.graphql` file must be in the root of your directory ([learn more about the directory structure](../build/introduction.md#directory-structure)).
- ** База данных:** Премиум-клиенты могут получить доступ к выделенным базам данных для размещения производственных проектов SubQuery. Если это вас интересует, вы можете связаться с [sales@subquery.network](mailto:sales@subquery.network), чтобы включить эту настройку.
- **Источник развертывания:** Вы можете выбрать развертывание проекта из репозитория GitHub или альтернативное развертывание из IPFS CID, см. наше руководство о [хостинге с IPFS.](ipfs.md)
- **Скрыть проект:** Это скроет ваш проект для публичного изучения. Не устанавливайте этот флажок, если хотите поделиться своим проектом с сообществом! ![Создайте свой первый проект](/assets/img/projects-create.png)

Create your project and you'll see it on your SubQuery Project's list. _We're almost there! We just need to deploy a new version of it._

![Created Project with no deployment](/assets/img/projects-no-deployment.png)

#### Using the CLI

You can also use `@subql/cli` to publish your project to our managed service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN]() ready.

```shell
// Creating a project using the CLI
$ subql project:create-project

// OR using non-interactive, it will prompt you if the required fields are missing
$ subql project:create-project
    --apiVersion=apiVersion      Api version is default to 2
    --description=description    Enter description
    --gitRepo=gitRepo            Enter git repository
    --org=org                    Enter organization name
    --project_name=project_name  Enter project name
```

### Deploy your First Version

There are two methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

#### Using the UI

While creating a project will setup the display behaviour of the project, you must deploy a version of it before it becomes operational. Deploying a version triggers a new SubQuery indexing operation to start, and sets up the required query service to start accepting GraphQL requests. You can also deploy new versions to existing projects here.

With your new project, you'll see a Deploy New Version button. Click this, and fill in the required information about the deployment:

- **Branch:** From GitHub, select the branch of the project that you want to deploy from
- **Commit Hash:** From GitHub, select the specific commit of the version of your SubQuery project codebase that you want deployed
- **IPFS:** If deploying from IPFS, paste you IPFS deployment CID (without the leading `ipfs://`)
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here
- **Indexer Version:** This is the version of SubQuery's node service that you want to run this SubQuery on. See [`@subql/node`](https://www.npmjs.com/package/@subql/node)
- **Query Version:** This is the version of SubQuery's query service that you want to run this SubQuery on. See [`@subql/query`](https://www.npmjs.com/package/@subql/query)

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

#### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our managed service. This requires:

- `@subql/cli` version 1.1.0 or above.
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
