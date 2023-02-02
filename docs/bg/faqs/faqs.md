# Често задавани въпроси

## Какво е SubQuery?

SubQuery представлява блокчейн индексатор на данни с отворен код за разработчици, който предоставя бързи, гъвкави, надеждни и децентрализирани API за управление на водещи мулти-чейн приложения.

Нашата цел е да спестим време и пари на разработчиците, като елиминираме необходимостта от изграждане на собствено решение за индексиране. Затова, те ще могат напълно да се съсредоточат върху разработването на своите приложения. SubQuery помага на разработчиците да създават децентрализираните продукти от бъдещето.

<br/>
<figure class="video_container">
<iframe src="https://www.youtube.com/embed/gCpVz_mkWdo" title="Представяне на SubQuery Network" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscree="true"></iframe>
</figure>

**SubQuery Managed Service**

SubQuery also provides free, production grade hosting of projects for developers. Our Managed Service removes the responsiblity of managing infrastructure, so that developers do what they do best — build. Find out more [here](/run_publish/publish.md).

**The SubQuery Network**

The SubQuery Network allows developers to completely decentralise their infrastructure stack. It is the most open, performant, reliable, and scalable data service for dApps. The SubQuery Network indexes and services data to the global community in an incentivised and verifiable way. After publishing your project to the SubQuery Network, anyone can index and host it - providing data to users around the world faster and reliably.

More information [here](/subquery_network/introduction.md).

## Кой е най-добрият начин да стартирате работа със SubQuery?

The best way to get started with SubQuery is to try out our [Hello World tutorial](/assets/pdf/Hello_World_Lab.pdf). This is a simple 5 min walk through exercise. Download the starter template, build the project, use Docker to run a node on your localhost, and run a simple query.

## По какъв начин мога да допринеса или да дам обратна връзка към SubQuery?

We love contributions and feedback from the community. To contribute the code, fork the repository of your interest and make your changes. Then submit a PR or Pull Request. Don't forget to test as well. Also check out our [contributions guidelines](../miscellaneous/contributing.html).

To give feedback, contact us at hello@subquery.network or jump onto our [discord channel](https://discord.com/invite/78zg8aBSMG).

## Колко струва хостването на моя проект в SubQuery Projects?

This service is being provided to the community with a generous free tier! You can host your first two SubQuery projects for absolutely free!

## Какво представляват слотовете за разполагане?

Deployment slots are a feature in [SubQuery Projects](https://project.subquery.network) that is the equivalent of a development environment. For example, in any software organisation there is normally a development environment and a production environment as a minimum (ignoring localhost that is). Typically additional environments such as staging and pre-prod or even QA are included depending on the needs of the organisation and their development set up.

SubQuery currently has two slots available. A staging slot and a production slot. This allows developers to deploy their SubQuery to the staging environment and all going well, "promote to production" at the click of a button.

## Какво е предимството на етапния слот?

The main benefit of using a staging slot is that it allows you to prepare a new release of your SubQuery project without exposing it publicly. You can wait for the staging slot to reindex all data without affecting your production applications.

The staging slot is not shown to the public in the [Explorer](https://explorer.subquery.network/) and has a unique URL that is visible only to you. And of course, the separate environment allows you to test your new code without affecting production.

## Какви са външните характеристики на Polkadot?

If you are already familiar with blockchain concepts, you can think of extrinsics as comparable to transactions. More formally though, an extrinsic is a piece of information that comes from outside the chain and is included in a block. There are three categories of extrinsics. They are inherents, signed transactions, and unsigned transactions.

Inherent extrinsics are pieces of information that are not signed and only inserted into a block by the block author.

Signed transaction extrinsics are transactions that contain a signature of the account that issued the transaction. They stands to pay a fee to have the transaction included on chain.

Unsigned transactions extrinsics are transactions that do not contain a signature of the account that issued the transaction. Unsigned transactions extrinsics should be used with care because there is nobody paying a fee, becaused they are not signed. Because of this, the transaction queue lacks economic logic to prevent spam.

For more information, click [here](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics).

## Каква е крайната точка за мрежата Kusama?

The network.endpoint for the Kusama network is `wss://kusama.api.onfinality.io/public-ws`.

## Каква е крайната точка за основната мрежа на Polkadot?

The network.endpoint for the Polkadot network is `wss://polkadot.api.onfinality.io/public-ws`.

## Как да разработя итеративно моята проектна схема?

A known issue with developing a changing project schema is that when lauching your Subquery node for testing, the previously indexed blocks will be incompatible with your new schema. In order to iteratively develop schemas the indexed blocks stored in the database must be cleared, this can be achieved by launching your node with the `--force-clean` flag. For example:

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

Note that it is recommended to use `--force-clean` when changing the `startBlock` within the project manifest (`project.yaml`) in order to begin reindexing from the configured block. If `startBlock` is changed without a `--force-clean` of the project, then the indexer will continue indexing with the previously configured `startBlock`.

## Как мога да оптимизирам проекта си, за да го направя по-бърз?

Performance is a crucial factor in each project. Fortunately, there are several things you could do to improve it. You can find our recommendations in the [Project Optimisation](../build/optimisation.md).
