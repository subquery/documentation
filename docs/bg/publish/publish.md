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

За да създадете първия си проект, отидете на [project.subquery.network](https://project.subquery.network). Ще трябва да се удостоверите с вашия акаунт в GitHub, за да влезете.

При първото влизане ще бъдете помолени да оторизирате SubQuery. Нуждаем се само от вашия имейл адрес, за да идентифицираме вашия акаунт и не използваме никакви други данни от вашия акаунт в GitHub по други причини. В тази стъпка можете също да заявите или предоставите достъп до вашия акаунт в GitHub Organization, за да можете да публикувате проекти на SubQuery във вашата GitHub организация вместо в личния си акаунт.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

SubQuery Projects е мястото, където управлявате всички ваши хоствани проекти, качени в платформата SubQuery. Можете да създавате, изтривате и дори да ъпгрейдвате проекти от това приложение.

![Projects Login](/assets/img/projects-dashboard.png)

Ако имате свързани акаунти на организацията GitHub, можете да използвате превключвателя в хедъра, за да превключите между личния си акаунт и акаунта на организацията в GitHub. Проектите, създадени в акаунт на GitHub Organization, се споделят между членовете в тази GitHub организация. За да свържете своя акаунт в GitHub Organization, можете да [следвате стъпките тук](#add-github-organization-account-to-subquery-projects).

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

### Създайте своя първи проект

Нека започнем с щракване върху „Create Project“. Ще бъдете отведени до формуляра за нов проект. Моля, въведете следното (можете да промените това в бъдеще):

- **GitHub акаунт:** Ако имате повече от един акаунт в GitHub, изберете под кой акаунт ще бъде създаден този проект. Проектите, създадени в акаунт на GitHub организацията, се споделят между членовете в тази организация.
- **Име на проекта**
- **Подзаглавие**
- **Описание**
- **URL адрес на GitHub хранилище:** Това трябва да е валиден URL адрес на GitHub към публичното хранилище, което има вашият SubQuery проект. Файлът `schema.graphql` трябва да е в основната ви директория ([научете повече за структурата на директориите](../create/introduction.md#directory-structure)).
- **Database:** Премиум клиентите имат достъп до специализирани бази данни, от които да хостват производствени проекти на SubQuery. Ако това ви интересува, можете да се свържете с [sales@subquery.network](mailto:sales@subquery.network), за да активирате тази настройка.
- **Deployment Source:** Можете да изберете проектът да бъде разгърнат от хранилището на GitHub или алтернативно да се разгърне от IPFS CID, вижте нашето ръководство за [хостинг с IPFS.](ipfs.md)
- **Скриване на проект:** Ако е маркирано, това ще скрие проекта от публичния SubQuery експлорър. Запазете това немаркирано, ако искате да споделите вашият SubQuery с общността! ![Create your first Project](/assets/img/projects-create.png)

Създайте своя проект и ще го видите в списъка с вашите SubQuery проекти. _ Почти сме там! Просто трябва да внедрим новата му версия. _

![Created Project with no deployment](/assets/img/projects-no-deployment.png)

### Внедрете първата си версия

Докато създаването на проект ще настрои поведението на дисплея на проекта, трябва да внедрите негова версия, преди да започне да функционира. Внедряването на версия задейства нова операция за индексиране на SubQuery и настройва необходимата услуга за заявки, за да започне да приема заявки на GraphQL. Можете също да внедрите нови версии в съществуващи проекти тук.

With your new project, you'll see a Deploy New Version button. Click this, and fill in the required information about the deployment:

- **Branch:** From GitHub, select the branch of the project that you want to deploy from
- **Commit Hash:** From GitHub, select the specific commit of the version of your SubQuery project codebase that you want deployed
- **IPFS:** If deploying from IPFS, paste you IPFS deployment CID (without the leading `ipfs://`)
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here
- **Версия на индексатора:** Това е версията на SubQuery нодът, на който искате да стартирате този SubQuery. See [`@subql/node`](https://www.npmjs.com/package/@subql/node)
- **Версия на заявка:** Това е версията на услугата за заявки на SubQuery, на която искате да стартирате този SubQuery. See [`@subql/query`](https://www.npmjs.com/package/@subql/query)

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

## Следващи стъпки - Свържете се с вашия проект

След като внедряването ви приключи успешно и нашите нодове са индексирали вашите данни от веригата, ще можете да се свържете с вашия проект чрез показания ендпойнт на GraphQL Query.

![Проектът се внедрява и се синхронизира](/assets/img/projects-deploy-sync.png)

Като алтернатива можете да щракнете върху трите точки до заглавието на вашия проект и да го видите в SubQuery Explorer. There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../query/query.md).

![Проекти в SubQuery Explorer](/assets/img/projects-explorer.png)

## Добавете организационен акаунт в GitHub към SubQuery Projects

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
