# Frequently Asked Questions

## Apa itu SubQuery?

SubQuery adalah proyek open source yang memungkinkan developer untuk mengindeks, mengubah, dan melakukan query Substrate data chain untuk mentenagai aplikasi mereka.

SubQuery also provides free, production grade hosting of projects for developers removing the responsiblity of manging infrastructure, and letting developers do what they do best - build.

## Apa cara terbaik untuk memulai SubQuery?

The best way to get started with SubQuery is to try out our [Hello World tutorial](../quickstart/helloworld-localhost.md). Ini adalah 5 menit berjalan sederhana untuk mengunduh template starter, membangun proyek, dan kemudian menggunakan Docker untuk menjalankan node di localhost Anda dan menjalankan kueri sederhana.

## Bagaimana saya bisa berkontribusi atau memberi masukan ke SubQuery?

Kami menyukai kontribusi dan umpan balik dari komunitas. Untuk menyumbangkan kode, garpu repositori yang menarik dan buat perubahan Anda. Kemudian kirimkan PR atau Pull Request. Oh, jangan lupa untuk menguji juga! Also check out our contributions guide lines (TBA).

To give feedback, contact us at hello@subquery.network or jump onto our [discord channel](https://discord.com/invite/78zg8aBSMG).

## Berapa biaya untuk hosting proyek saya di SubQuery Projects?

Hosting proyek Anda di Proyek SubQuery benar-benar gratis - ini adalah cara kami memberikan kembali kepada komunitas. To learn how to host your project with us, please check out the [Hello World (SubQuery hosted)](../run_publish/publish.md) tutorial.

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

Note that it is recommended to use `--force-clean` when changing the `startBlock` within the project manifest (`project.yaml`) in order to begin reindexing from the configured block. If `startBlock` is changed without a `--force-clean` of the project then the indexer will continue indexing with the previously configured `startBlock`.
