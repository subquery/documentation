# SubQuery Projenizin Yeni Bir Sürümünü Dağıtın

## Yönergeler

SubQuery projenizin yeni sürümlerini yükseltme ve dağıtma özgürlüğüne her zaman sahipsiniz, bununla birlikte, SubQuery projeniz tüm dünyaya açıksa lütfen bu süreçte dikkatli olmayı ihmal etmeyin. Not alınması gereken bazı anahtar noktalar:

- Yükseltmeniz son derece önemli bir değişikliği beraberinde getiriyorsa, ya yeni bir proje oluşturun (ör. `My SubQuery Project V2`) ya da sosyal medya kanalları aracılığıyla topluluğunuza söz konusu değişiklikle ilgili tüm gerekli uyarıları verin.
- Yeni bir SubQuery proje sürümünün dağıtımının yapılması, yeni sürüm, genesis bloğundan tüm zinciri endekslediği için, bazı kesinti sürelerinin yaşanması söz konusu olabilir.

## Değişiklikleri Dağıt

There are two methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

### Using the UI

Log into SubQuery Project and select the project you want to deploy a new version of. You can choose to either deploy to the production or staging slot. These two slots are isolated environments and each has their own databases and synchronise independently.

We recommend deploying to your staging slot only for final staging testing or when you need to resync your project data. You can then promote it to production with zero downtime. You will find testing is faster when [running a project locally](../run_publish/run.md) as you can more [easily debug issues](../academy/tutorials_examples/debug-projects.md).

The staging slot is perfect for:

- Ayrı bir ortamda SubQuery Projenizde yapılan değişikliklerin nihai doğrulaması. Staging slotu, dApp'lerinizde kullanabileceğiniz farklı bir production URL'sine sahiptir.
- dApp'inizdeki kesinti süresini ortadan kaldırmak amacıyla güncellenmiş bir SubQuery projesi için verilerin hazırlanması ve dizine eklenmesi
- SubQuery Projeniz için kamuya açık hale getirmeksizin yeni bir sürüm hazırlamak. Staging slotu tarayıcıda herkese açık değildir ve yalnızca sizin görebileceğiniz benzersiz bir URL'si vardır.

![Staging slot](/assets/img/staging_slot.png)

Dağıtılmasını istediğiniz SubQuery proje kod tabanınızın sürümünün GitHub'dan Commit Hash'ini doldurun (tam Commit Hash'ini kopyalayın). Bu, mevcut zincirin endekslenmesi için geçen süreye bağlı olarak daha uzun bir kesinti süresine neden olacaktır. Buradan her zaman ilerleme raporları sağlayabilirsiniz.

### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our managed service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN](/docs/run_publish/ipfs.md#prepare-your-subqlaccesstoken) ready.

```shell
// You can directly set your Indexer and Query versions
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// OR you can use the interface, it will validate your IPFS CID and render a list of image versions that matches your manifest file `project.yaml`

$ subql deployment:deploy
```

## Upgrade to the Latest Indexer and Query Service

If you just want to upgrade to the latest indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) or query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) to take advantage of our regular performance and stability improvements, just select a newer versions of our packages and save. This will cause only a few minutes of downtime as the services running your project are restarted.

## Sonraki Adımlar - Projenize Bağlanın

Dağıtımınız başarıyla tamamlandıktan ve node'larımız zincirdeki verilerinizi dizine ekledikten sonra, görüntülenen GraphQL Query uç noktası aracılığıyla projenize bağlanabileceksiniz.

![Projenize yeni sürümü dağıtın](/assets/img/projects-deploy-sync.png)

Alternatif olarak, projenizin başlığının yanında bulunan üç noktaya tıklayabilir ve onu SubQuery Explorer'da görüntüleyebilirsiniz. There you can use the in browser playground to get started - [read more about how to user our Explorer here](../run_publish/query.md).
