# Публикувайте своя SubQuery проект

## Предимства от хостването на вашия проект със SubQuery
- Ние ще изпълняваме вашите SubQuery проекти за вас във високопроизводителна, скалираща се и управлявана обществена услуга
- Тази услуга се предоставя на общността безплатно!
- Можете да направите проектите си публични, така че да бъдат откриваеми в [SubQuery Explorer](https://explorer.subquery.network) и всеки по света да може да ги види
- Интегрирани сме с GitHub, така че всеки във вашите GitHub организации ще може да преглежда споделени организационни проекти

## Създайте своя първи проект

#### Влезте в SubQuery Projects

Преди да започнете, моля, уверете се, че вашият SubQuery проект е онлайн в публично хранилище на GitHub. Файлът `schema.graphql` трябва да е в основната ви директория.

За да създадете първия си проект, отидете на [project.subquery.network](https://project.subquery.network). Ще трябва да се удостоверите с вашия акаунт в GitHub, за да влезете.

При първото влизане ще бъдете помолени да оторизирате SubQuery. Нуждаем се само от вашия имейл адрес, за да идентифицираме вашия акаунт и не използваме никакви други данни от вашия акаунт в GitHub по други причини. В тази стъпка можете също да заявите или предоставите достъп до вашия акаунт в GitHub Organization, за да можете да публикувате проекти на SubQuery във вашата GitHub организация вместо в личния си акаунт.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

SubQuery Projects е мястото, където управлявате всички ваши хоствани проекти, качени в платформата SubQuery. Можете да създавате, изтривате и дори да ъпгрейдвате проекти от това приложение.

![Projects Login](/assets/img/projects-dashboard.png)

Ако имате свързани акаунти на организацията GitHub, можете да използвате превключвателя в хедъра, за да превключите между личния си акаунт и акаунта на организацията в GitHub. Проектите, създадени в акаунт на GitHub Organization, се споделят между членовете в тази GitHub организация. За да свържете своя акаунт в GitHub Organization, можете да следвате стъпките тук.

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

#### Създайте своя първи проект

Let's start by clicking on "Create Project". You'll be taken to the New Project form. Please enter the following (you can change this in the future):
- **GitHub account:** If you have more than one GitHub account, select which account this project will be created under. Projects created in a GitHub organisation account are shared between members in that organisation.
- **Name**
- **Subtitle**
- **Описание**
- **GitHub Repository URL:** This must be a valid GitHub URL to a public repository that has your SubQuery project. The `schema.graphql` file must be in the root of your directory ([learn more about the directory structure](../create/introduction.md#directory-structure)).
- **Hide project:** If selected, this will hide the project from the public SubQuery explorer. Keep this unselected if you want to share your SubQuery with the community! ![Create your first Project](/assets/img/projects-create.png)

Create your project and you'll see it on your SubQuery Project's list. *We're almost there! We just need to deploy a new version of it.*

![Created Project with no deployment](/assets/img/projects-no-deployment.png)

#### Deploy your first Version

While creating a project will setup the display behaviour of the project, you must deploy a version of it before it becomes operational. Deploying a version triggers a new SubQuery indexing operation to start, and sets up the required query service to start accepting GraphQL requests. You can also deploy new versions to existing projects here.

With your new project, you'll see a Deploy New Version button. Click this, and fill in the required information about the deployment:
- **Commit Hash of new Version:** From GitHub, copy the full commit hash of the version of your SubQuery project codebase that you want deployed
- **Indexer Version:** This is the version of SubQuery's node service that you want to run this SubQuery on. See [`@subql/node`](https://www.npmjs.com/package/@subql/node)
- **Query Version:** This is the version of SubQuery's query service that you want to run this SubQuery on. See [`@subql/query`](https://www.npmjs.com/package/@subql/query)

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

## Next Steps - Connect to your Project
Once your deployment has succesfully completed and our nodes have indexed your data from the chain, you'll be able to connect to your project via the displayed GraphQL Query endpoint.

![Проектът се внедрява и се синхронизира](/assets/img/projects-deploy-sync.png)

Като алтернатива можете да щракнете върху трите точки до заглавието на вашия проект и да го видите в SubQuery Explorer. There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../query/query.md).

![Проекти в SubQuery Explorer](/assets/img/projects-explorer.png)

## Add GitHub Organization Account to SubQuery Projects

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled *Authorize SubQuery* where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
