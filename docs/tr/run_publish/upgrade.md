# SubQuery Projenizin Yeni Bir Sürümünü Dağıtın

## Yönergeler

SubQuery projenizin yeni sürümlerini yükseltme ve dağıtma özgürlüğüne her zaman sahipsiniz, bununla birlikte, SubQuery projeniz tüm dünyaya açıksa lütfen bu süreçte dikkatli olmayı ihmal etmeyin. Not alınması gereken bazı anahtar noktalar:

- Yükseltmeniz son derece önemli bir değişikliği beraberinde getiriyorsa, ya yeni bir proje oluşturun (ör. `My SubQuery Project V2`) ya da sosyal medya kanalları aracılığıyla topluluğunuza söz konusu değişiklikle ilgili tüm gerekli uyarıları verin.
- Yeni bir SubQuery proje sürümünün dağıtımının yapılması, yeni sürüm, genesis bloğundan tüm zinciri endekslediği için, bazı kesinti sürelerinin yaşanması söz konusu olabilir.

## Değişiklikleri Dağıt

There are three methods to deploy a new version of your project to the SubQuery Managed Service: you can use the UI, create it directly via the `subql` cli tool, or use an automated GitHub action.

### Using the UI

Log into SubQuery Project and select the project you want to deploy a new version of. You can choose to either deploy to the production or staging slot. These two slots are isolated environments and each has their own databases and synchronise independently.

We recommend deploying to your staging slot only for final staging testing or when you need to resync your project data. You can then promote it to production with zero downtime. You will find testing is faster when [running a project locally](../run_publish/run.md) as you can more [easily debug issues](../academy/tutorials_examples/debug-projects.md).

The staging slot is perfect for:

- Ayrı bir ortamda SubQuery Projenizde yapılan değişikliklerin nihai doğrulaması. Staging slotu, dApp'lerinizde kullanabileceğiniz farklı bir production URL'sine sahiptir.
- Warming up and indexing data for an updated SubQuery project to eliminate downtime in your dApp.
- SubQuery Projeniz için kamuya açık hale getirmeksizin yeni bir sürüm hazırlamak. Staging slotu tarayıcıda herkese açık değildir ve yalnızca sizin görebileceğiniz benzersiz bir URL'si vardır.

![Staging slot](/assets/img/staging_slot.png)

Dağıtılmasını istediğiniz SubQuery proje kod tabanınızın sürümünün GitHub'dan Commit Hash'ini doldurun (tam Commit Hash'ini kopyalayın). Bu, mevcut zincirin endekslenmesi için geçen süreye bağlı olarak daha uzun bir kesinti süresine neden olacaktır. Buradan her zaman ilerleme raporları sağlayabilirsiniz.

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

### Using GitHub actions

With the introduction of the deployment feature for the CLI, we've added a **Default Action Workflow** to [the starter project in GitHub](https://github.com/subquery/subql-starter/blob/v1.0.0/.github/workflows/cli-deploy.yml) that will allow you to publish and deploy your changes automatically:

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

## Upgrade to the Latest Indexer and Query Service

If you just want to upgrade to the latest indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) or query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) to take advantage of our regular performance and stability improvements, just select a newer versions of our packages and save. This will cause only a few minutes of downtime as the services running your project are restarted.

## Sonraki Adımlar - Projenize Bağlanın

Dağıtımınız başarıyla tamamlandıktan ve node'larımız zincirdeki verilerinizi dizine ekledikten sonra, görüntülenen GraphQL Query uç noktası aracılığıyla projenize bağlanabileceksiniz.

![Projenize yeni sürümü dağıtın](/assets/img/projects-deploy-sync.png)

Alternatif olarak, projenizin başlığının yanında bulunan üç noktaya tıklayabilir ve onu SubQuery Explorer'da görüntüleyebilirsiniz. There you can use the in browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).
