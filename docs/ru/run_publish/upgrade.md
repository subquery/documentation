# Разверните новую версию вашего проекта SubQuery

## Руководство

Хотя у вас есть свобода всегда обновлять и развертывать новые версии вашего проекта SubQuery, пожалуйста, будьте внимательны во время этого процесса, если ваш проект SubQuery является общедоступным для всего мира. Некоторые ключевые моменты для заметки:

- Если ваше обновление является критическим изменением, либо создайте новый проект (например, `My SubQuery Project V2`), либо предупредите свое сообщество об изменении через каналы социальных сетей.
- Развертывание новой версии проекта SubQuery займет некоторое время, поскольку новая версия индексирует всю цепочку из блока генезиса.

## Запустить изменения

There are two methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

### Using the UI

Log into SubQuery Project and select the project you want to deploy a new version of. You can choose to either deploy to the production or staging slot. These two slots are isolated environments and each has their own databases and synchronise independently.

We recommend deploying to your staging slot only for final staging testing or when you need to resync your project data. You can then promote it to production with zero downtime. You will find testing is faster when [running a project locally](../run_publish/run.md) as you can more [easily debug issues](../academy/tutorials_examples/debug-projects.md).

The staging slot is perfect for:

- Окончательная проверка изменений в вашем проекте SubQuery в отдельной среде. Промежуточный слот имеет другой URL-адрес для производства, который вы можете использовать в своих dApps.
- Warming up and indexing data for an updated SubQuery project to eliminate downtime in your dApp.
- Подготовка нового релиза для вашего проекта SubQuery без его опубликования. Промежуточный слот не отображается публично в поисковике и имеет уникальный URL-адрес, который виден только вам.

![Staging slot](/assets/img/staging_slot.png)

Заполните Commit Hash из GitHub (скопируйте полный Commit Hash) той версии базы кода вашего проекта SubQuery, которую вы хотите развернуть. Это приведет к увеличению времени простоя в зависимости от времени, необходимого для индексации текущей цепочки. Вы всегда можете сообщить об этом здесь.

### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our managed service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ready.

```shell
// You can directly set your Indexer and Query versions
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// OR you can use the interface, it will validate your IPFS CID and render a list of image versions that matches your manifest file `project.yaml`

$ subql deployment:deploy
```

## Upgrade to the Latest Indexer and Query Service

If you just want to upgrade to the latest indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) or query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) to take advantage of our regular performance and stability improvements, just select a newer versions of our packages and save. This will cause only a few minutes of downtime as the services running your project are restarted.

## Следующие шаги - подключитесь к вашему проекту

После успешного завершения установки и успешного индексирования нашими узлами ваших данных из цепочки, вы сможете подключиться к вашему проекту через отображённую конечную точку запроса GraphQL Query.

![Проект будет развернут и синхронизирован](/assets/img/projects-deploy-sync.png)

Кроме того, вы можете щелкнуть три точки рядом с названием вашего проекта и просмотреть его в SubQuery Explorer. There you can use the in browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).
