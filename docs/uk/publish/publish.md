# Опублікуйте проект SubQuery

## Переваги розміщення вашого проекту за допомогою SubQuery

- Ми будемо запускати ваші проекти SubQuery для вас у високопродуктивній, масштабованій та керованій державній службі
- Ця послуга надається громаді безкоштовно!
- Ви можете оприлюднити свої проекти, щоб вони були вказані в [ SubQuery Explorer ](https://explorer.subquery.network), і кожен у всьому світі може їх переглянути
- Ми інтегровані з GitHub, тому кожен, хто з ваших організацій GitHub, зможе переглянути спільні організаційні проекти.

## Створіть свій перший проект у SubQuery Projects

### Хостинг проекту Codebase

Є два способи розміщення кодової бази проекту SubQuery перед публікацією.

**GitHub**: кодова база вашого проекту має бути у загальнодоступному сховищі GitHub

**IPFS**: кодову базу вашого проекту можна зберігати в IPFS. Ви можете дотримуватись нашого посібника з хостингу IPFS, щоб дізнатися, як [першу опублікувати в IPFS](ipfs.md)

### Увійдіть до SubQuery Projects

Перш ніж почати, переконайтеся, що ваша кодова база проекту SubQuery знаходиться в режимі онлайн у загальнодоступному репозиторії GitHub або на IPFS. Файл `schema.graphql` має бути в корені вашого каталогу.

Щоб створити свій перший проект, перейдіть до [project.subquery.network](https://project.subquery.network). Щоб увійти, вам потрібно буде пройти автентифікацію за допомогою свого облікового запису GitHub.

Під час першого входу вам буде запропоновано авторизувати SubQuery. Нам потрібна лише ваша адреса електронної пошти, щоб ідентифікувати ваш обліковий запис, і ми не використовуємо будь-які інші дані з вашого облікового запису GitHub з будь-яких інших причин. На цьому кроці ви також можете запросити або надати доступ до свого облікового запису організації GitHub, щоб ви могли публікувати проекти SubQuery у своїй організації GitHub замість свого особистого облікового запису.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

SubQuery Projects — це місце, де ви керуєте всіма своїми розміщеними проектами, завантаженими на платформу SubQuery. За допомогою цієї програми можна створювати, видаляти та навіть оновлювати проекти.

![Projects Login](/assets/img/projects-dashboard.png)

Якщо у вас підключені облікові записи організації GitHub, ви можете використовувати перемикач у заголовку, щоб перемикатися між вашим особистим обліковим записом і обліковим записом організації GitHub. Проекти, створені в обліковому записі організації GitHub, спільно використовують члени цієї організації GitHub. Щоб підключити свій обліковий запис організації GitHub, ви можете [виконати вказівки тут](#add-github-organization-account-to-subquery-projects).

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

### Create your First Project

Let's start by clicking on "Create Project". You'll be taken to the New Project form. Please enter the following (you can change this in the future):

- ** Обліковий запис GitHub: ** Якщо у вас є більше одного облікового запису GitHub, виберіть, в якому обліковому записі буде створено цей проект. Проекти, створені на рахунку організації GitHub, поділяються між членами цієї організації.
- **Project Name**
- **Підзаголовок**
- **Описання**
- ** itHub Repository URL: ** Це має бути дійсною URL-адресою GitHub для публічного сховища, яке має ваш проект SubQuery. Файл ` schema.graphql ` повинен бути в корені вашого каталогу ([ дізнатися більше про структуру каталогу ](../create/introduction.md#directory-structure)).
- **Database:** Premium customers can access dedicated databases to host production SubQuery projects from. If this interests you, you can contact [sales@subquery.network](mailto:sales@subquery.network) to have this setting enabled.
- **Deployment Source:** You can choose to have the project deployed from the GitHub repository or alternatively deployed from a IPFS CID, see our guide about [hosting with IPFS.](ipfs.md)
- **Приховати проект:** Якщо вибрано, це приховає проект з громадського засобу обробки підкадрів. Зберігайте це необрано, якщо ви хочете поділитися підробкою із спільнотою! ![Create your first Project](/assets/img/projects-create.png)

Create your project and you'll see it on your SubQuery Project's list. _We're almost there! We just need to deploy a new version of it._

![Created Project with no deployment](/assets/img/projects-no-deployment.png)

### Deploy your first Version

While creating a project will setup the display behaviour of the project, you must deploy a version of it before it becomes operational. Розгортання версії викликає нову операцію індексування підзапити для початку і налаштує необхідний сервіс запитів для прийняття графічних запитів. Ви також можете розгорнути нові версії на існуючі проекти.

With your new project, you'll see a Deploy New Version button. Click this, and fill in the required information about the deployment:

- **Branch:** From GitHub, select the branch of the project that you want to deploy from
- **Commit Hash:** From GitHub, select the specific commit of the version of your SubQuery project codebase that you want deployed
- **IPFS:** If deploying from IPFS, paste you IPFS deployment CID (without the leading `ipfs://`)
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here
- **Версія індексера:** Це версія служби вузла SubQuery, на якій ви хочете запустити цей SubQuery далі. See [`@subql/node`](https://www.npmjs.com/package/@subql/node)
- **Версія індексера:** Це версія служби вузла SubQuery, на якій ви хочете запустити цей SubQuery далі. See [`@subql/query`](https://www.npmjs.com/package/@subql/query)

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

## Наступні етапи - Підключіться до вашого проекту

Після того, як ваше розгортання успішно завершиться і наші вузли індексують ваші дані з ланцюга, ви зможете підключитися до вашого проекту через відображену кінцеву точку GraphQL Query.

![Проект розгортається та синхронізується](/assets/img/projects-deploy-sync.png)

Крім того, ви можете натиснути на три точки поруч із заголовком проекту та переглянути його на SubQuery Explorer. There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../query/query.md).

![Проекти в SubQuery Explorer](/assets/img/projects-explorer.png)

## Додайте обліковий запис організації GitHub до проектів SubQuery

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
