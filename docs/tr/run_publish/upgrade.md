# SubQuery Projenizin Yeni Bir Sürümünü Dağıtın

## Yönergeler

SubQuery projenizin yeni sürümlerini yükseltme ve dağıtma özgürlüğüne her zaman sahipsiniz, bununla birlikte, SubQuery projeniz tüm dünyaya açıksa lütfen bu süreçte dikkatli olmayı ihmal etmeyin. Not alınması gereken bazı anahtar noktalar:

- Yükseltmeniz son derece önemli bir değişikliği beraberinde getiriyorsa, ya yeni bir proje oluşturun (ör. `My SubQuery Project V2`) ya da sosyal medya kanalları aracılığıyla topluluğunuza söz konusu değişiklikle ilgili tüm gerekli uyarıları verin.
- Yeni bir SubQuery proje sürümünün dağıtımının yapılması, yeni sürüm, genesis bloğundan tüm zinciri endekslediği için, bazı kesinti sürelerinin yaşanması söz konusu olabilir.

## Değişiklikleri Dağıt

SubQuery Projelerine giriş yapın ve yeni bir sürümünü dağıtmak istediğiniz projeyi bulun. Production veya staging slotuna dağıtmayı seçebilirsiniz. Bu iki slot yalıtılmış ortamlardır ve her birinin kendi veritabanları olup bağımsız olarak senkronize edilirler.

Yalnızca son staging testleri için veya proje verilerinizi yeniden senkronize etmeniz gerektiğinde staging slotuna dağıtım yapmanızı öneririz. Daha sonra sıfır kesinti süresi ile production ortamına yükseltebilirsiniz. You will find testing is faster when [running a project locally](../run_publish/run.md) as you can more [easily debug issues](../academy/tutorials_examples/debug-projects.md).

Staging slotu aşağıdakiler için idealdir:

- Ayrı bir ortamda SubQuery Projenizde yapılan değişikliklerin nihai doğrulaması. Staging slotu, dApp'lerinizde kullanabileceğiniz farklı bir production URL'sine sahiptir.
- dApp'inizdeki kesinti süresini ortadan kaldırmak amacıyla güncellenmiş bir SubQuery projesi için verilerin hazırlanması ve dizine eklenmesi
- SubQuery Projeniz için kamuya açık hale getirmeksizin yeni bir sürüm hazırlamak. Staging slotu tarayıcıda herkese açık değildir ve yalnızca sizin görebileceğiniz benzersiz bir URL'si vardır.

![Staging slotu](/assets/img/staging_slot.png)

#### En Son İndeksleyici ve Sorgu Hizmetine Yükseltin

Düzenli performans ve stabilite iyileştirmelerimizden yararlanmak için yalnızca en son endeksleyiciye ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) veya sorgu hizmetine ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) yükseltmek istiyorsanız, sadece paketlerimizin daha yeni sürümlerini seçin ve kaydedin. Bu, yalnızca birkaç dakikalık kesinti süresine neden olacaktır.

#### When using `@subql/cli`
#### Requirement
- `@subql/cli` version 1.1.0 or above.
- Get your [SUBQL_ACCESS_TOKEN](/docs/run_publish/ipfs.md#prepare-your-subqlaccesstoken) ready.
```
// You can directly set your Indexer and Query versions
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// OR you can use the interface, it will validate your IPFS CID and render a list of image versions that matches your manifest file `project.yaml`

$ subql deployment:deploy
```
#### Deploy New Version of your SubQuery Project

Dağıtılmasını istediğiniz SubQuery proje kod tabanınızın sürümünün GitHub'dan Commit Hash'ini doldurun (tam Commit Hash'ini kopyalayın). Bu, mevcut zincirin endekslenmesi için geçen süreye bağlı olarak daha uzun bir kesinti süresine neden olacaktır. Buradan her zaman ilerleme raporları sağlayabilirsiniz.

## Sonraki Adımlar - Projenize Bağlanın

Dağıtımınız başarıyla tamamlandıktan ve node'larımız zincirdeki verilerinizi dizine ekledikten sonra, görüntülenen GraphQL Query uç noktası aracılığıyla projenize bağlanabileceksiniz.

![Projenize yeni sürümü dağıtın](/assets/img/projects-deploy-sync.png)

Alternatif olarak, projenizin başlığının yanında bulunan üç noktaya tıklayabilir ve onu SubQuery Explorer'da görüntüleyebilirsiniz. There you can use the in browser playground to get started - [read more about how to user our Explorer here](../run_publish/query.md).
