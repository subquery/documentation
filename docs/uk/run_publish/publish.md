# Опублікуйте проект SubQuery

## Переваги розміщення вашого проекту за допомогою SubQuery

- We'll run your SubQuery projects for you in a high performance, scalable, and managed public service.
- Ця послуга надається громаді безкоштовно!
- You can make your projects public so that they'll be listed in the [SubQuery Explorer](https://explorer.subquery.network) and anyone around the world can view them.
- We're integrated with GitHub, so anyone in your GitHub organisations will be able to view shared organisation projects.

## Створіть свій перший проект у SubQuery Projects

### Хостинг проекту Codebase

Є два способи розміщення кодової бази проекту SubQuery перед публікацією.

**GitHub**: Your project's codebase must be in a public GitHub repository.

**IPFS**: Your project's codebase can be stored in IPFS, you can follow our IPFS hosting guide to see how to [first publish to IPFS](../run_publish/ipfs.md).

### Увійдіть до SubQuery Projects

Перш ніж почати, переконайтеся, що ваша кодова база проекту SubQuery знаходиться в режимі онлайн у загальнодоступному репозиторії GitHub або на IPFS. Файл `schema.graphql` має бути в корені вашого каталогу.

To create your first project, head to [SubQuery Projects](https://project.subquery.network). Щоб увійти, вам потрібно буде пройти автентифікацію за допомогою свого облікового запису GitHub.

Під час першого входу вам буде запропоновано авторизувати SubQuery. Нам потрібна лише ваша адреса електронної пошти, щоб ідентифікувати ваш обліковий запис, і ми не використовуємо будь-які інші дані з вашого облікового запису GitHub з будь-яких інших причин. На цьому кроці ви також можете запросити або надати доступ до свого облікового запису організації GitHub, щоб ви могли публікувати проекти SubQuery у своїй організації GitHub замість свого особистого облікового запису.

![Скасувати схвалення облікового запису GitHub](/assets/img/project_auth_request.png)

SubQuery Projects — це місце, де ви керуєте всіма своїми розміщеними проектами, завантаженими на платформу SubQuery. За допомогою цієї програми можна створювати, видаляти та навіть оновлювати проекти.

![Вхід до проектів](/assets/img/projects-dashboard.png)

Якщо у вас підключені облікові записи організації GitHub, ви можете використовувати перемикач у заголовку, щоб перемикатися між вашим особистим обліковим записом і обліковим записом організації GitHub. Проекти, створені в обліковому записі організації GitHub, спільно використовують члени цієї організації GitHub. To connect your GitHub Organization account, you can [follow the steps here](publish.md#add-github-organization-account-to-subquery-projects).

![Перемикайтеся між обліковими записами GitHub](/assets/img/projects-account-switcher.png)

### Create Your First Project

There are two methods to create a project in the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

#### Using the UI

Let's start by clicking on "Create Project". You'll be taken to the New Project form. Please enter the following (you can change this in the future):

- ** Обліковий запис GitHub: ** Якщо у вас є більше одного облікового запису GitHub, виберіть, в якому обліковому записі буде створено цей проект. Проекти, створені на рахунку організації GitHub, поділяються між членами цієї організації.
- **Назва проєкту**
- **Підзаголовок**
- **Описання**
- ** itHub Repository URL: ** Це має бути дійсною URL-адресою GitHub для публічного сховища, яке має ваш проект SubQuery. The `schema.graphql` file must be in the root of your directory ([learn more about the directory structure](../build/introduction.md#directory-structure)).
- **База даних:** Клієнти преміум-класу можуть отримати доступ до виділених баз даних для розміщення виробничих проектів SubQuery. Якщо вас це цікавить, ви можете зв’язатися з [sales@subquery.network](mailto:sales@subquery.network), щоб увімкнути це налаштування.
- **Джерело розгортання:** Ви можете розгорнути проект із репозитарію GitHub або розгорнути з IPFS CID, дивіться наш посібник щодо [хостингу за допомогою IPFS.](ipfs.md)
- **Приховати проект:** Якщо вибрано, це приховає проект з громадського засобу обробки підкадрів. Зберігайте це необрано, якщо ви хочете поділитися підробкою із спільнотою!

![Create your first Project](/assets/img/projects-create.png)

Create your project and you'll see it on your SubQuery Project's list. _We're almost there! We just need to deploy a new version of it._

![Created Project with no deployment](/assets/img/projects-no-deployment.png)

#### Using the CLI

You can also use `@subql/cli` to publish your project to our managed service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ready.

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

- **Branch:** From GitHub, select the branch of the project that you want to deploy from.
- **Commit Hash:** From GitHub, select the specific commit of the version of your SubQuery project codebase that you want deployed.
- **IPFS:** If deploying from IPFS, paste you IPFS deployment CID (without the leading `ipfs://`).
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here.
- **Indexer Version:** This is the version of SubQuery's node service that you want to run this SubQuery on. See [`@subql/node`](https://www.npmjs.com/package/@subql/node).
- **Query Version:** This is the version of SubQuery's query service that you want to run this SubQuery on. See [`@subql/query`](https://www.npmjs.com/package/@subql/query).

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

## Наступні етапи - Підключіться до вашого проекту

Після того, як ваше розгортання успішно завершиться і наші вузли індексують ваші дані з ланцюга, ви зможете підключитися до вашого проекту через відображену кінцеву точку GraphQL Query.

![Проект розгортається та синхронізується](/assets/img/projects-deploy-sync.png)

Крім того, ви можете натиснути на три точки поруч із заголовком проекту та переглянути його на SubQuery Explorer. There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![Projects in SubQuery Explorer](/assets/img/projects-explorer.png)

## Додайте обліковий запис організації GitHub до проектів SubQuery

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![Перемикайтеся між обліковими записами GitHub](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![Скасувати схвалення облікового запису GitHub](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
