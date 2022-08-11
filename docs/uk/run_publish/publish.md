# Опублікуйте проект SubQuery

## Переваги розміщення вашого проекту за допомогою SubQuery

- Ми запустимо Ваші проєкти SubQuery для вас у високопродуктивному, масштабованому та керованому загальнодоступному сервісі.
- This service is being provided to the community with a generous free tier! You can host your first two SubQuery projects for absolutely free!”
- Ви можете зробити свої проєкти загальнодоступними, щоб вони були перераховані в [провіднику вкладених запитів](https://explorer.subquery.network), і їх міг переглядати будь-яка людина по всьому світу.
- Ми інтегровані з GitHub, тому будь-який член вашої організації на GitHub зможе переглядати спільні проєкти організації.

## Створіть свій перший проєкт у SubQuery Projects

### Хостинг проекту Codebase

Є два способи розміщення кодової бази проекту SubQuery перед публікацією.

**IPFS (пропоноване)**: кодову базу вашого проекту можна зберігати в IPFS. Ви можете скористатися нашим посібником із розміщення IPFS, щоб дізнатися, як [перше опублікувати в IPFS](../run_publish/ipfs.md).

**GitHub (will be deprecated)**: Your project's codebase must be in a public GitHub repository, this process may be deprecated soon.

### Увійдіть до SubQuery Projects

Перш ніж почати, переконайтеся, що ваша кодова база проекту SubQuery знаходиться в режимі онлайн у загальнодоступному репозиторії GitHub або на IPFS. Файл `schema.graphql` має бути в корені вашого каталогу.

Щоб створити свій перший проєкт, перейдіть до розділу [SubQuery Projects](https://project.subquery.network). Щоб увійти, вам потрібно буде пройти автентифікацію за допомогою свого облікового запису GitHub.

Під час першого входу вам буде запропоновано авторизувати SubQuery. Нам потрібна лише ваша адреса електронної пошти, щоб ідентифікувати ваш обліковий запис, і ми не використовуємо будь-які інші дані з вашого облікового запису GitHub з будь-яких інших причин. На цьому кроці ви також можете запросити або надати доступ до свого облікового запису організації GitHub, щоб ви могли публікувати проекти SubQuery у своїй організації GitHub замість свого особистого облікового запису.

![Скасувати схвалення облікового запису GitHub](/assets/img/project_auth_request.png)

SubQuery Projects — це місце, де ви керуєте всіма своїми розміщеними проектами, завантаженими на платформу SubQuery. За допомогою цієї програми можна створювати, видаляти та навіть оновлювати проекти.

![Вхід до проектів](/assets/img/projects-dashboard.png)

Якщо у вас підключені облікові записи організації GitHub, ви можете використовувати перемикач у заголовку, щоб перемикатися між вашим особистим обліковим записом і обліковим записом організації GitHub. Проекти, створені в обліковому записі організації GitHub, спільно використовують члени цієї організації GitHub. Щоб підключити свій обліковий запис організації GitHub, ви можете [виконати наступні дії](publish.md#add-github-organization-account-to-subquery-projects).

![Перемикайтеся між обліковими записами GitHub](/assets/img/projects-account-switcher.png)

### Створіть Свій Перший Проєкт

There are three methods to create a project in the SubQuery Managed Service: you can use the UI, create it directly via the `subql` cli tool, or use an automated GitHub action.

#### Використання інтерфейсу користувача

Почнім з того, що натиснемо на кнопку Create Project". Ви перейдете до нової форми проєкту. Будь ласка, введіть наступне (Ви можете змінити це в майбутньому):

- ** Обліковий запис GitHub: ** Якщо у вас є більше одного облікового запису GitHub, виберіть, в якому обліковому записі буде створено цей проект. Проекти, створені на рахунку організації GitHub, поділяються між членами цієї організації.
- **Назва проєкту**
- **Підзаголовок**
- **Описання**
- ** itHub Repository URL: ** Це має бути дійсною URL-адресою GitHub для публічного сховища, яке має ваш проект SubQuery. Файл `schema.graphql` повинен знаходитися в корені Вашого каталогу ([докладніше про структуру каталогів](../build/introduction.md#directory-structure)).
- **База даних:** Клієнти преміум-класу можуть отримати доступ до виділених баз даних для розміщення виробничих проектів SubQuery. Якщо вас це цікавить, ви можете зв’язатися з [sales@subquery.network](mailto:sales@subquery.network), щоб увімкнути це налаштування.
- **Джерело розгортання:** Ви можете розгорнути проект із репозитарію GitHub або розгорнути з IPFS CID, дивіться наш посібник щодо [хостингу за допомогою IPFS.](ipfs.md)
- **Приховати проект:** Якщо вибрано, це приховає проект з громадського засобу обробки підкадрів. Зберігайте це необрано, якщо ви хочете поділитися підробкою із спільнотою!

![Створіть свій перший проєкт](/assets/img/projects-create.png)

Створіть свій проєкт, і ви побачите його в списку проєктів вашого SubQuery. _Ми майже на місці! Нам просто потрібно розгорнути його нову версію._

![Створений проєкт без розгортання](/assets/img/projects-no-deployment.png)

#### Використання інтерфейсу командного рядка

Ви також можете використовувати `@subql/cli` для публікації вашого проєкту в нашій керованій службі. Для цього потрібно:

- `@subql/cli` Версія 1.1.0 або вище.
- Допустимий [SUBQL_ACCESS_TOKEN ](../run_publish/ipfs.md#prepare-your-subql-access-token) готовий.

```shell
// Creating a project using the CLI
$ subql project:create-project

// OR using non-interactive, it will prompt you if the required fields are missing
$ subql project:create-project
    --apiVersion=apiVersion      Api version is default to 2
    --description=description    Enter description
    --gitRepo=gitRepo            Enter git repository
    --org=org                    Enter organization name
    --projectName=projectName  Enter project name
```

### Розгорніть свою першу версію

There are three methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly, via the `subql` cli tool, or using an automated GitHub Action.

#### Використання інтерфейсу користувача

У той час як при створенні проєкт буде налаштовано поведінку відбивання проєкту, ви повинні розгорнути його версію, перш ніж він почне функціонувати. Розгортання версії запускає нову операцію індексації SubQuery і налаштовує необхідну службу запитів для початку приймання запитів GraphQL. Ви також можете розгорнути нові версії в що існує проєкт тут.

У вашому новому проєкти ви побачите кнопку Розгорнути нову версію. Натисніть на це і заповніть необхідну інформацію про розгортання:

- **Branch:** на GitHub виберіть гілку проєкту, з якої Ви хочете розгорнути.
- **Commit Hash:** На GitHub виберіть конкретну фіксацію версії вашої кодової бази проєкту SubQuery, яку ви хочете розгорнути.
- **IPFS:** при розгортанні з IPFS вставте ідентифікатор розгортання IPFS (без початкового `ipfs://`).
- **Override Network and Dictionary Endpoints:** Ви можете перевизначити кінцеві точки в маніфесті вашого проєкту тут.
- **Indexer Version:** Це версія служби вузлів SubQuery, на якій ви хочете запустити цей SubQuery. Бачачи [`@subql/node`](https://www.npmjs.com/package/@subql/node).
- **Query Version:** Це версія служби запитів SubQuery's, на якій ви хочете запустити цей SubQuery. Бачачи [`@subql/query`](https://www.npmjs.com/package/@subql/query).

![Розгорніть свій перший проєкт](https://static.subquery.network/media/projects/projects-first-deployment.png)

У разі успішного розгортання ви побачите, що індексатор почне працювати й повідомить про хід індексації поточного ланцюжка. Цей процес може зайняти деякий час, поки він не досягне 100%.

#### Використання інтерфейсу командного рядка

Ви також можете використовувати `@subql/cli` для створення нового розгортання вашого проєкту в нашій керованій службі. Для цього потрібно:

- `@subql/cli` Версія 1.1.0 або вище.
- Допустимий [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) готовий.

```shell
// Розгортання з використанням CLI
$ subql deployment:deploy

// Або розгорнути за допомогою неінтерактивного CLI
$ subql deployment:deploy

  -d, --useDefaults                Використовуйте значення за замовчуванням для версії індексатора, версії запиту, словника, кінцевої точки
  --dict=dict                      Введіть словник
  --endpoint=endpoint              Введіть кінцеву точку
  --indexerVersion=indexerVersion  Введіть версію індексатора
  --ipfsCID=ipfsCID                Введіть IPFS CID
  --org=org                        Введіть назву організації
  --projectName=projectName        Введіть назву проекту
  --queryVersion=queryVersion      Введіть query версію
  --type=(stage|primary)           [default: primary]
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

## Наступні етапи - Увімкнутися до вашого проєкту

Після того, як ваше розгортання успішно завершиться і наші вузли індексують ваші дані з ланцюга, ви зможете підключитися до вашого проекту через відображену кінцеву точку GraphQL Query.

![Проєкт розгортається і синхронізується](/assets/img/projects-deploy-sync.png)

Крім того, ви можете натиснути на три точки поруч із заголовком проєкту та переглянути його на SubQuery Explorer. There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![Проєкти в провіднику вкладених SubQuery](/assets/img/projects-explorer.png)

## Додайте обліковий запис організації GitHub до проектів SubQuery

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![Перемикайтеся між обліковими записами GitHub](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![Скасувати схвалення облікового запису GitHub](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
