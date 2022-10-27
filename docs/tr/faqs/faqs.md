# Frequently Asked Questions

## SubQuery nedir?

SubQuery, önde gelen çok zincirli uygulamaları desteklemek için hızlı, esnek, güvenilir ve merkezi olmayan API'ler sağlayan geliştiriciler için açık kaynaklı bir blok zinciri veri dizinleyicisidir.

Amacımız, kendi indeksleme çözümlerini oluşturma ihtiyacını ortadan kaldırarak geliştiricilerin zaman ve paradan tasarruf etmesini sağlamaktır. Artık tamamen uygulamalarını geliştirmeye odaklanabilirler. SubQuery, geliştiricilerin geleceğin merkezi olmayan ürünlerini oluşturmasına yardımcı olur.

<figure class="video_container">
<iframe src="https://www.youtube.com/embed/gCpVz_mkWdo" title="Introducing The SubQuery Network" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscree="true"></iframe>
</figure>

**SubQuery Managed Service**

SubQuery also provides free, production grade hosting of projects for developers. Our Managed Service removes the responsiblity of managing infrastructure, so that developers do what they do best — build. Find out more [here](/run_publish/publish.md).

**The SubQuery Network**

The SubQuery Network allows developers to completely decentralise their infrastructure stack. It is the most open, performant, reliable, and scalable data service for dApps. The SubQuery Network indexes and services data to the global community in an incentivised and verifiable way.  After publishing your project to the SubQuery Network, anyone can index and host it - providing data to users around the world faster and reliably.

More information [here](/subquery_network/introduction.md).

## SubQuery'ye başlamanın en iyi yolu nedir?

The best way to get started with SubQuery is to try out our [Hello World tutorial](/assets/pdf/Hello_World_Lab.pdf). This is a simple 5 min walk through exercise. Download the starter template, build the project, use Docker to run a node on your localhost, and run a simple query.

## SubQuery'ye nasıl katkıda bulunabilir veya geri bildirimde bulunabilirim?

Topluluktan gelen katkıları ve geri bildirimleri seviyoruz. To contribute the code, fork the repository of your interest and make your changes. Ardından bir PR veya Çekme İsteği gönderin. Don't forget to test as well. Also check out our <a href="http://localhost:8080/miscellaneous/contributing.html">contributions guidelines.</a>

To give feedback, contact us at hello@subquery.network or jump onto our [discord channel](https://discord.com/invite/78zg8aBSMG).

## Projemi SubQuery Projelerinde barındırmanın maliyeti nedir?

Bu hizmet, topluluğa cömert bir ücretsiz katmanla sunuluyor! İlk iki SubQuery projenizi tamamen ücretsiz olarak barındırabilirsiniz!

## What are deployment slots?

Deployment slots are a feature in [SubQuery Projects](https://project.subquery.network) that is the equivalent of a development environment. For example, in any software organisation there is normally a development environment and a production environment as a minimum (ignoring localhost that is). Typically additional environments such as staging and pre-prod or even QA are included depending on the needs of the organisation and their development set up.

SubQuery currently has two slots available. A staging slot and a production slot. This allows developers to deploy their SubQuery to the staging environment and all going well, "promote to production" at the click of a button.

## What is the advantage of a staging slot?

The main benefit of using a staging slot is that it allows you to prepare a new release of your SubQuery project without exposing it publicly. You can wait for the staging slot to reindex all data without affecting your production applications.

The staging slot is not shown to the public in the [Explorer](https://explorer.subquery.network/) and has a unique URL that is visible only to you. And of course, the separate environment allows you to test your new code without affecting production.

## What are Polkadot's Extrinsics?

If you are already familiar with blockchain concepts, you can think of extrinsics as comparable to transactions. More formally though, an extrinsic is a piece of information that comes from outside the chain and is included in a block. There are three categories of extrinsics. They are inherents, signed transactions, and unsigned transactions.

Inherent extrinsics are pieces of information that are not signed and only inserted into a block by the block author.

Signed transaction extrinsics are transactions that contain a signature of the account that issued the transaction. They stands to pay a fee to have the transaction included on chain.

Unsigned transactions extrinsics are transactions that do not contain a signature of the account that issued the transaction. Unsigned transactions extrinsics should be used with care because there is nobody paying a fee, becaused they are not signed. Because of this, the transaction queue lacks economic logic to prevent spam.

For more information, click [here](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics).

## What is the endpoint for the Kusama network?

The network.endpoint for the Kusama network is `wss://kusama.api.onfinality.io/public-ws`.

## What is the endpoint for the Polkadot mainnet network?

The network.endpoint for the Polkadot network is `wss://polkadot.api.onfinality.io/public-ws`.

## How do I iteratively develop my project schema?

A known issue with developing a changing project schema is that when lauching your Subquery node for testing, the previously indexed blocks will be incompatible with your new schema. In order to iteratively develop schemas the indexed blocks stored in the database must be cleared, this can be achieved by launching your node with the `--force-clean` flag. For example:

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

Note that it is recommended to use `--force-clean` when changing the `startBlock` within the project manifest (`project.yaml`) in order to begin reindexing from the configured block. If `startBlock` is changed without a `--force-clean` of the project, then the indexer will continue indexing with the previously configured `startBlock`.


## How can I optimise my project to speed it up?

Performance is a crucial factor in each project. Fortunately, there are several things you could do to improve it. You can find our recommendations in the [Project Optimisation](../build/optimisation.md). 