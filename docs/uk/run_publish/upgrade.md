# Розгорніть нову версію проекту SubQuery

## Керівні принципи

Хоча у вас є свобода завжди оновлювати та розгортати нові версії вашого проекту SubQuery, будь ласка, будьте уважні під час цього процесу, якщо ваш проект SubQuery є загальнодоступним для світу. Деякі ключові точки для замітки:

- Якщо оновлення є зміною, або створіть новий проект (наприклад,. ` Мій проект SubQuery V2 `) або повідомте вашій громаді багато попередження про зміни через канали соціальних медіа. Trans
- Розгортання нової версії проекту SubQuery спричиняє деякий час простою, оскільки нова версія індексує повний ланцюг із блоку генезису.

## Зміни розгортання

There are two methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

### Використання інтерфейсу користувача

Log into SubQuery Project and select the project you want to deploy a new version of. You can choose to either deploy to the production or staging slot. These two slots are isolated environments and each has their own databases and synchronise independently.

We recommend deploying to your staging slot only for final staging testing or when you need to resync your project data. You can then promote it to production with zero downtime. You will find testing is faster when [running a project locally](../run_publish/run.md) as you can more [easily debug issues](../academy/tutorials_examples/debug-projects.md).

The staging slot is perfect for:

- Остаточна перевірка змін у вашому проекті SubQuery в окремому середовищі. Слот для постановки має іншу URL-адресу для виробництва, яку ви можете використовувати у своїх dApps.
- Warming up and indexing data for an updated SubQuery project to eliminate downtime in your dApp.
- Підготовка нового випуску для вашого проекту SubQuery, не розкриваючи його публічно. Слот для постановки не відображається для публіки в Explorer і має унікальну URL-адресу, яку видно лише вам.

![Staging slot](/assets/img/staging_slot.png)

Заповніть хеш-консистенцію від GitHub (копіюйте повний хеш-комплект) версії кодової бази проекту SubQuery, яку ви хочете розгорнути. Це призведе до більш тривалого простоїв, залежно від часу, необхідного для індексації поточного ланцюга. Ви завжди можете повідомити про це назад на прогрес.

### Використання інтерфейсу командного рядка

You can also use `@subql/cli` to create a new deployment of your project to our managed service. This requires:

- `@subql/cli` Версія 1.1.0 або вище.
- Допустимий [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) готовий.

```shell
// You can directly set your Indexer and Query versions
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// OR you can use the interface, it will validate your IPFS CID and render a list of image versions that matches your manifest file `project.yaml`

$ subql deployment:deploy
```

## Upgrade to the Latest Indexer and Query Service

If you just want to upgrade to the latest indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) or query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) to take advantage of our regular performance and stability improvements, just select a newer versions of our packages and save. This will cause only a few minutes of downtime as the services running your project are restarted.

## Наступні етапи - Увімкнутися до вашого проєкту

Після того, як ваше розгортання успішно завершиться і наші вузли індексують ваші дані з ланцюга, ви зможете підключитися до вашого проекту через відображену кінцеву точку GraphQL Query.

![Проект розгортається та синхронізується](/assets/img/projects-deploy-sync.png)

Крім того, ви можете натиснути на три точки поруч із заголовком проекту та переглянути його на SubQuery Explorer. There you can use the in browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).
