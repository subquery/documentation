# Разверните новую версию вашего проекта SubQuery

## Руководство

Хотя у вас есть свобода всегда обновлять и развертывать новые версии вашего проекта SubQuery, пожалуйста, будьте внимательны во время этого процесса, если ваш проект SubQuery является общедоступным для всего мира. Некоторые ключевые моменты для заметки:

- Если ваше обновление является критическим изменением, либо создайте новый проект (например, `My SubQuery Project V2`), либо предупредите свое сообщество об изменении через каналы социальных сетей.
- Развертывание новой версии проекта SubQuery займет некоторое время, поскольку новая версия индексирует всю цепочку из блока генезиса.

## Запустить изменения

There are three methods to deploy a new version of your project to the SubQuery Managed Service: you can use the UI, create it directly via the `subql` cli tool, or use an automated GitHub action.

### Использование пользовательского интерфейса

Войдите в SubQuery Project и выберите проект, для которого вы хотите развернуть новую версию. Вы можете выбрать развертывание в производственном или промежуточном слоте. Эти два слота являются изолированными средами, каждая из которых имеет свои собственные базы данных и синхронизируется независимо друг от друга.

Мы рекомендуем выполнять развертывание в слот постановки только для окончательного тестирования постановки или когда необходимо повторно синхронизировать данные проекта. Затем вы можете запустить его в производство с нулевым временем простоя. Вы обнаружите, что тестирование проходит быстрее, если [запускать проект локально](../run_publish/run.md), так как вы можете более [легко отлаживать проблемы](../academy/tutorials_examples/debug-projects.md).

Постановочный слот идеально подходит для:

- Окончательная проверка изменений в вашем проекте SubQuery в отдельной среде. Промежуточный слот имеет другой URL-адрес для производства, который вы можете использовать в своих dApps.
- Разогрев и индексирование данных для обновленного проекта SubQuery для устранения простоев в вашем dApp.
- Подготовка нового релиза для вашего проекта SubQuery без его опубликования. Промежуточный слот не отображается публично в поисковике и имеет уникальный URL-адрес, который виден только вам.

![Промежуточный слот](/assets/img/staging_slot.png)

Fill in the IPFS CID of the new version of your SubQuery project codebase that you want deployed (see the documetation to publish to IPFS [here](./publish.md). Это приведет к увеличению времени простоя в зависимости от времени, необходимого для индексации текущей цепочки. Вы всегда можете сообщить об этом здесь.

### Использование CLI

You can also use `@subql/cli` to create a new deployment of your project to our Managed Service. Для этого необходимо:

- `@subql/cli` версии 1.1.0 или выше.
- Действительный [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) готов.

```shell
// Вы можете напрямую установить версии индексатора и запроса
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// ИЛИ вы можете использовать интерфейс, он проверит ваш IPFS CID и выдаст список версий образов, соответствующих вашему файлу манифеста `project.yaml`.

$ subql deployment:deploy
```

### Using GitHub actions

With the introduction of the deployment feature for the CLI, we've added a **Default Action Workflow** to [the starter project in GitHub](https://github.com/subquery/subql-starter/blob/main/Polkadot/Polkadot-starter/.github/workflows/cli-deploy.yml) that will allow you to publish and deploy your changes automatically:

- Step 1: After pushing your project to GitHub, create `DEPLOYMENT` environment on GitHub, and add the secret [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) to it.
- Step 2: If you haven't already, create a project on [SubQuery Projects](https://project.subquery.network). This can be done using the the [UI](#using-the-ui) or [CLI](#using-the-cli).
- Step 3: Once your project is created, navigate to the GitHub Actions page of your project, and select the workflow `CLI deploy`.
- Step 4: You'll see an input field where you can enter the unique code of your project created on SubQuery Projects. You can get the code from the URL in SubQuery Projects [SubQuery Projects](https://project.subquery.network). The code is based on the name of your project, where spaces are replaced with hyphens `-`. e.g. `my project name` becomes `my-project-name`.

::: tips Tip
Once the workflow is complete, you should be able to see your project deployed to our Managed Service.
:::

A common approach is to extend the default GitHub Action to automatically deploy changes to our Managed Service when code is merged into the main branch. The following change to the GitHub Action workflow do this:

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

## Обновление до последней версии индексатора и Query Service

If you just want to upgrade to the latest indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) or query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) to take advantage of our regular performance and stability improvements, just select a newer versions of our packages and save. This will cause only a few minutes of downtime as the services running your project are restarted.

## Следующие шаги - подключитесь к вашему проекту

После успешного завершения установки и успешного индексирования нашими узлами ваших данных из цепочки, вы сможете подключиться к вашему проекту через отображённую конечную точку запроса GraphQL Query.

![Проект будет развернут и синхронизирован](/assets/img/projects-deploy-sync.png)

Кроме того, вы можете щелкнуть три точки рядом с названием вашего проекта и просмотреть его в SubQuery Explorer. There you can use the in browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![Проекты в SubQuery Explorer](/assets/img/projects-explorer.png)

::: Информация Примечание Узнайте больше о языке запросов [GraphQL.](./graphql.md) :::
