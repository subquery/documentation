# Внедрете нова версия на вашия проект SubQuery

## Насоки

Въпреки че имате свободата винаги да надграждате и внедрявате нови версии на вашия проект SubQuery, моля, бъдете внимателни по време на този процес, ако вашият проект SubQuery е публичен за целия свят. Някои ключови точки, които трябва да се отбележат:

- Ако ъпдейта ви е критична промяна, или създайте нов проект (напр. `My SubQuery Project V2`) или пратете множество предупреждения към общността за промяната чрез социалнитете медии.
- Разгръщането на нова версия на проекта SubQuery причинява известен престой, тъй като новата версия индексира цялата верига от началния блок.

## Внедряване на промени

There are two methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

### Using the UI

Log into SubQuery Project and select the project you want to deploy a new version of. You can choose to either deploy to the production or staging slot. These two slots are isolated environments and each has their own databases and synchronise independently.

We recommend deploying to your staging slot only for final staging testing or when you need to resync your project data. You can then promote it to production with zero downtime. You will find testing is faster when [running a project locally](../run_publish/run.md) as you can more [easily debug issues](../academy/tutorials_examples/debug-projects.md).

The staging slot is perfect for:

- Окончателно валидиране на промените във вашия SubQuery Project в отделна среда. Стейджинг слота има различен URL адрес от производствения, който можете да използвате във вашите dApps.
- Подготвяне и индексиране на данни за актуализиран SubQuery проект, за да се елиминира забавянето във вашият dApp
- Подготовяте нова версия за вашия SubQuery Project, без да го представяте публично. Стейджинг слота не се показва на обществеността в Explorer и има уникален URL адрес, който е видим само за вас.

![Staging slot](/assets/img/staging_slot.png)

Попълнете Commit Hash от GitHub (копирайте пълния хеш за комит) на версията на кодовата база на вашия SubQuery проект, която искате да бъде разгърната. Това ще доведе до по-дълъг престой в зависимост от времето, необходимо за индексиране на текущата верига. Винаги можете да докладвате тук за напредък.

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

## Следващи стъпки - Свържете се с вашия проект

След като внедряването ви приключи успешно и нашите нодове са индексирали вашите данни от веригата, ще можете да се свържете с вашия проект чрез показания ендпойнт на GraphQL Query.

![Проектът се внедрява и се синхронизира](/assets/img/projects-deploy-sync.png)

Като алтернатива можете да щракнете върху трите точки до заглавието на вашия проект и да го видите в SubQuery Explorer. There you can use the in browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).
