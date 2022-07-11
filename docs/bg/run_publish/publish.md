# Публикувайте своя SubQuery проект

## Предимства от хостването на вашия проект със SubQuery

- Ние ще изпълняваме вашите SubQuery проекти за вас във високопроизводителна, скалираща се и управлявана обществена услуга
- Тази услуга се предоставя на общността безплатно!
- Можете да направите проектите си публични, така че да бъдат откриваеми в [SubQuery Explorer](https://explorer.subquery.network) и всеки по света да може да ги види
- Интегрирани сме с GitHub, така че всеки във вашите GitHub организации ще може да преглежда споделени организационни проекти

## Създайте първия си проект в SubQuery Projects

### Хостване на базата с кодове на проекта

Има два начина, по които можете да хоствате кодовата база на вашия проект SubQuery преди публикуване.

**GitHub**: Кодовата база на вашия проект трябва да е в публично хранилище на GitHub

**IPFS**: Кодовата база на вашия проект може да се съхранява в IPFS, можете да следвате нашето ръководство за IPFS хостинг, за да видите как да [публикувате първо в IPFS](ipfs.md)

### Влезте в SubQuery Projects

Преди да започнете, моля, уверете се, че кодовата база на вашия SubQuery проект е онлайн в публично хранилище на GitHub. Файлът `schema.graphql` трябва да е в основната ви директория.

To create your first project, head to [SubQuery Projects](https://project.subquery.network). Ще трябва да се удостоверите с вашия акаунт в GitHub, за да влезете.

При първото влизане ще бъдете помолени да оторизирате SubQuery. Нуждаем се само от вашия имейл адрес, за да идентифицираме вашия акаунт и не използваме никакви други данни от вашия акаунт в GitHub по други причини. В тази стъпка можете също да заявите или предоставите достъп до вашия акаунт в GitHub Organization, за да можете да публикувате проекти на SubQuery във вашата GitHub организация вместо в личния си акаунт.

![Отмяна на одобрение от GitHub акаунт](/assets/img/project_auth_request.png)

SubQuery Projects е мястото, където управлявате всички ваши хоствани проекти, качени в платформата SubQuery. Можете да създавате, изтривате и дори да ъпгрейдвате проекти от това приложение.

![Вход в Проекти](/assets/img/projects-dashboard.png)

Ако имате свързани акаунти на организацията GitHub, можете да използвате превключвателя в хедъра, за да превключите между личния си акаунт и акаунта на организацията в GitHub. Проектите, създадени в акаунт на GitHub Organization, се споделят между членовете в тази GitHub организация. За да свържете своя акаунт в GitHub Organization, можете да [следвате стъпките тук](#add-github-organization-account-to-subquery-projects).

![Превключване между акаунти в GitHub](/assets/img/projects-account-switcher.png)

### Създайте своя първи проект

There are two methods to create a project in the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

#### Using the UI

Let's start by clicking on "Create Project". You'll be taken to the New Project form. Please enter the following (you can change this in the future):

- **GitHub акаунт:** Ако имате повече от един акаунт в GitHub, изберете под кой акаунт ще бъде създаден този проект. Проектите, създадени в акаунт на GitHub организацията, се споделят между членовете в тази организация.
- **Име на проекта**
- **Подзаглавие**
- **Описание**
- **URL адрес на GitHub хранилище:** Това трябва да е валиден URL адрес на GitHub към публичното хранилище, което има вашият SubQuery проект. The `schema.graphql` file must be in the root of your directory ([learn more about the directory structure](../build/introduction.md#directory-structure)).
- **Database:** Премиум клиентите имат достъп до специализирани бази данни, от които да хостват производствени проекти на SubQuery. Ако това ви интересува, можете да се свържете с [sales@subquery.network](mailto:sales@subquery.network), за да активирате тази настройка.
- **Deployment Source:** Можете да изберете проектът да бъде внедрен от хранилището на GitHub или алтернативно да се внедри от IPFS CID, вижте нашето ръководство за [хостинг с IPFS.](ipfs.md)
- **Скриване на проект:** Ако е маркирано, това ще скрие проекта от публичния SubQuery експлорър. Запазете това немаркирано, ако искате да споделите вашият SubQuery с общността! ![Създайте своя първи проект](/assets/img/projects-create.png)

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

## Следващи стъпки - Свържете се с вашия проект

След като внедряването ви приключи успешно и нашите нодове са индексирали вашите данни от веригата, ще можете да се свържете с вашия проект чрез показания ендпойнт на GraphQL Query.

![Проектът се внедрява и се синхронизира](/assets/img/projects-deploy-sync.png)

Като алтернатива можете да щракнете върху трите точки до заглавието на вашия проект и да го видите в SubQuery Explorer. There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![Projects in SubQuery Explorer](/assets/img/projects-explorer.png)

## Добавете организационен акаунт в GitHub към SubQuery Projects

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![Превключване между акаунти в GitHub](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![Отмяна на одобрение от GitHub акаунт](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
