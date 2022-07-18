# SubQuery Projenizi Yayımlama

## Projenizi SubQuery ile barındırmanın faydaları

- We'll run your SubQuery projects for you in a high performance, scalable, and managed public service.
- Bu hizmet topluma ücretsiz olarak sağlanmaktadır!
- You can make your projects public so that they'll be listed in the [SubQuery Explorer](https://explorer.subquery.network) and anyone around the world can view them.
- We're integrated with GitHub, so anyone in your GitHub organisations will be able to view shared organisation projects.

## SubQuery Projelerinde ilk projenizi oluşturun

### Proje Kod Tabanı Barındırma

Yayınlamadan önce SubQuery projenizin kod tabanını barındırmanın iki yolu vardır.

**GitHub**: Your project's codebase must be in a public GitHub repository.

**IPFS**: Your project's codebase can be stored in IPFS, you can follow our IPFS hosting guide to see how to [first publish to IPFS](../run_publish/ipfs.md).

### SubQuery Projelerine Giriş Yap

Başlamadan önce, lütfen SubQuery projenizin herkese açık bir GitHub deposunda çevrimiçi olduğundan emin olun. `schema.graphql` dosyası dizininizin kökünde olmalıdır.

To create your first project, head to [SubQuery Projects](https://project.subquery.network). Giriş yapmak için GitHub hesabınızla kimlik doğrulamanız gerekir.

İlk girişte, SubQuery'yi yetkilendirmeniz istenecektir. Hesabınızı tanımlamak için yalnızca e-posta adresinize ihtiyacımız vardır ve GitHub hesabınızdaki başka hiçbir veriyi başka bir nedenle kullanmayız. Bu adımda, Kişisel hesabınız yerine GitHub Kuruluşunuz altında SubQuery projeleri yayınlayabilmeniz için GitHub Kuruluş hesabınıza erişim talep edebilir veya izin verebilirsiniz.

![GitHub hesabından onayı iptal et](/assets/img/project_auth_request.png)

SubQuery Projeleri, SubQuery platformuna yüklenen barındırılan tüm projelerinizi yönettiğiniz yerdir. Bu uygulamadan projeler oluşturabilir, silebilir ve hatta yükseltebilirsiniz.

![Projelere Giriş](/assets/img/projects-dashboard.png)

Bağlı bir GitHub Kuruluş hesabınız varsa, kişisel hesabınız ile GitHub Organization hesabınız arasında geçiş yapmak için üstbilgideki değiştiriciyi kullanabilirsiniz. GitHub Kuruluş hesabında oluşturulan projeler, bu GitHub Organizasyonu'ndaki üyeler arasında paylaşılır. To connect your GitHub Organization account, you can [follow the steps here](publish.md#add-github-organization-account-to-subquery-projects).

![GitHub hesapları arasında geçiş yapma](/assets/img/projects-account-switcher.png)

### Create Your First Project

There are two methods to create a project in the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

#### Using the UI

Let's start by clicking on "Create Project". You'll be taken to the New Project form. Please enter the following (you can change this in the future):

- **GitHub account:** Birden fazla GitHub hesabınız varsa, bu projenin hangi hesap altında oluşturulacağını seçin. GitHub kuruluş hesabında oluşturulan projeler bu kuruluştaki üyeler arasında paylaşılır.
- **Proje İsmi**
- **Altyazı**
- **Tarif**
- **GitHub Repository URL:** Bu, SubQuery projenize sahip bir ortak depo için geçerli bir GitHub URL'si olmalıdır. The `schema.graphql` file must be in the root of your directory ([learn more about the directory structure](../build/introduction.md#directory-structure)).
- **Veritabanı**: Premium müşteriler, üretim SubQuery projelerini barındırmak için ayrılmış veritabanlarına erişebilir. Bu ilginizi çekiyorsa, bu ayarı etkinleştirmek için [sales@subquery.network](mailto:sales@subquery.network) ile iletişime geçebilirsiniz.
- **Dağıtım Kaynağı:** Projenin GitHub deposundan dağıtılmasını veya alternatif olarak bir IPFS CID'sinden dağıtılmasını seçebilirsiniz, [IPFS ile barındırma](ipfs.md) hakkındaki kılavuzumuza bakın
- **Hide project:** Seçilirse, bu, projeyi genel SubQuery gezgininden gizler. SubQuerynuzu toplulukla paylaşmak istiyorsanız bunu seçimsiz tutun!

![Create your first Project](/assets/img/projects-create.png)

Create your project and you'll see it on your SubQuery Project's list. _We're almost there! We just need to deploy a new version of it._

![Created Project with no deployment](/assets/img/projects-no-deployment.png)

#### Using the CLI

You can also use `@subql/cli` to publish your project to our managed service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ready.

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

### Deploy your First Version

There are two methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

#### Using the UI

While creating a project will setup the display behaviour of the project, you must deploy a version of it before it becomes operational. Deploying a version triggers a new SubQuery indexing operation to start, and sets up the required query service to start accepting GraphQL requests. You can also deploy new versions to existing projects here.

With your new project, you'll see a Deploy New Version button. Click this, and fill in the required information about the deployment:

- **Branch:** From GitHub, select the branch of the project that you want to deploy from.
- **Commit Hash:** From GitHub, select the specific commit of the version of your SubQuery project codebase that you want deployed.
- **IPFS:** If deploying from IPFS, paste you IPFS deployment CID (without the leading `ipfs://`).
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here.
- **Indexer Version:** This is the version of SubQuery's node service that you want to run this SubQuery on. See [`@subql/node`](https://www.npmjs.com/package/@subql/node).
- **Query Version:** This is the version of SubQuery's query service that you want to run this SubQuery on. See [`@subql/query`](https://www.npmjs.com/package/@subql/query).

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

#### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our managed service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ready.

```shell
// Deploy using the CLI
$ suqbl deployment:deploy

// OR Deploy using non-interactive CLI
$ suqbl deployment:deploy

  -d, --useDefaults                Use default values for indexerVerion, queryVersion, dictionary, endpoint
  --dict=dict                      Enter dictionary
  --endpoint=endpoint              Enter endpoint
  --indexerVersion=indexerVersion  Enter indexer-version
  --ipfsCID=ipfsCID                Enter IPFS CID
  --org=org                        Enter organization name
  --projectName=projectName        Enter project name
  --queryVersion=queryVersion      Enter query-version
  --type=(stage|primary)           [default: primary]
```

## Sonraki Adımlar - Projenize Bağlanın

Dağıtımınız başarıyla tamamlandıktan ve node'larımız zincirdeki verilerinizi dizine ekledikten sonra, görüntülenen GraphQL Query uç noktası aracılığıyla projenize bağlanabileceksiniz.

![Projenize yeni sürümü dağıtın](/assets/img/projects-deploy-sync.png)

Alternatif olarak, projenizin başlığının yanında bulunan üç noktaya tıklayabilir ve onu SubQuery Explorer'da görüntüleyebilirsiniz. There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![Projects in SubQuery Explorer](/assets/img/projects-explorer.png)

## GitHub Kuruluş Hesabını SubQuery Projelerine Ekleme

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![GitHub hesapları arasında geçiş yapma](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![GitHub hesabından onayı iptal et](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
