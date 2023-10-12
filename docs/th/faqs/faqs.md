# คำถามที่พบบ่อย

## Migrating to version 3.0 of the SubQuery SDK

Version 3.0 adds some major improvements to SubQuery's SDK that have been requested and developed in partnership with key customers in the SubQuery ecosystem.

## Changes to tsconfig

Firstly, we have moved some components to a new `subql-core` library (`logger` and others). You will need to update your `tsconfig.json` to look like the following:

**Note, replace `node_modules/@subql/types-ethereum/dist/global.d.ts` with whatever chain you are indexing, e.g. `types-ethereum`, `types-cosmos`, `types-algorand` `types-near` etc. For Polkadot, we use just `types` (not `types-polkadot`)**

```json
  ...
  "include": [ "src/**/*", "node_modules/@subql/types-core/dist/global.d.ts", "node_modules/@subql/types-ethereum/dist/global.d.ts" ]
```

## Typescript Manifest

With the number of new features we are adding to SubQuery, and the slight differences between each chain that mostly occur in the manifest, we looked for a way to make it easier for developers to understand, try out new features and push the boundaries of what they index. Rather than a complex `yaml`` file that is easy to make errors in, we’ve decided to embrace the safety of Typescript.

The manifest in version 3 is now written in Typescript by default, which includes better type safety, more advanced settings, and documentation to make it easier for developers to update and edit without having to consult our documentation. This step makes the development experience easier for developers of SubQuery, and also improves the discovery and documentation of new features and configuration options, it’s a relatively major change to our SDK that is surprisingly easy to make to your projects. For example, with typescript in your favourite code editor, you can see documentation and types for each field as you code your manifest file - easy!

You can see examples of the new manifest in the Build > Manifest section of this documentation, for example; [Ethereum](../build/manifest/ethereum.md), [Cosmos](../build/manifest/cosmos.md), and [Polkadot](../build/manifest/polkadot.md).

For Cosmos projects, in the new Typescript manifest, `chainTypes` have been renamed to `chaintypes`.

## SubQuery คืออะไร?

SubQuery is an open source blockchain data indexer for developers that provides fast, flexible, reliable, and decentralised APIs to power leading multi-chain apps.

เป้าหมายของพวกเราคือการทำให้ นักพัฒนาได้ประหยัดเวลาและเงิน โดยการอำนวยสิ่งจำเป็นต่างๆในการทำ Indexing พวกเขาจะได้เอาเวลาไปม่งเน้นพัฒนา แอปพลิเคชั่น Subquery ได้ช่วยให้พัฒนาได้สร้างผลิตภัณฑ์กระจายศุนย์แห่งอนาคต

<br/>
<figure class="video_container">
<iframe src="https://www.youtube.com/embed/gCpVz_mkWdo" title="Introducing The SubQuery Network" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscree="true"></iframe>
</figure>

**SubQuery Managed Service**

SubQuery also provides free, production grade hosting of projects for developers. Our Managed Service removes the responsiblity of managing infrastructure, so that developers do what they do best — build. Find out more [here](/run_publish/publish.md).

**The SubQuery Network**

The SubQuery Network allows developers to completely decentralise their infrastructure stack. It is the most open, performant, reliable, and scalable data service for dApps. The SubQuery Network indexes and services data to the global community in an incentivised and verifiable way. After publishing your project to the SubQuery Network, anyone can index and host it - providing data to users around the world faster and reliably.

More information [here](/subquery_network/introduction.md).

## วิธีที่ดีที่สุดในการเริ่มต้นใช้งาน SubQuery คืออะไร?

The best way to get started with SubQuery is to try out our [Hello World tutorial](/assets/pdf/Hello_World_Lab.pdf). This is a simple 5 min walk through exercise. Download the starter template, build the project, use Docker to run a node on your localhost, and run a simple query.

## ฉันจะมีส่วนร่วมหรือให้คำติชมกับ SubQuery ได้อย่างไร?

We love contributions and feedback from the community. To contribute the code, fork the repository of your interest and make your changes. Then submit a PR or Pull Request. Don't forget to test as well. Also check out our [contributions guidelines](../miscellaneous/contributing.html).

To give feedback, contact us at hello@subquery.network or jump onto our [discord channel](https://discord.com/invite/78zg8aBSMG).

## How much does it cost to host my project in SubQuery's Managed Service?

This service is being provided to the community with a generous free tier! You can host your first two SubQuery projects for absolutely free!

## Deployment slots คืออะไร?

Deployment slots are a feature in [SubQuery Managed Service](https://managedservice.subquery.network) that is the equivalent of a development environment. For example, in any software organisation there is normally a development environment and a production environment as a minimum (ignoring localhost that is). Typically additional environments such as staging and pre-prod or even QA are included depending on the needs of the organisation and their development set up.

SubQuery currently has two slots available. A staging slot and a production slot. This allows developers to deploy their SubQuery to the staging environment and all going well, "promote to production" at the click of a button.

## ข้อดีของ Staging slot คืออะไร?

The main benefit of using a staging slot is that it allows you to prepare a new release of your SubQuery project without exposing it publicly. You can wait for the staging slot to reindex all data without affecting your production applications.

The staging slot is not shown to the public in the [Explorer](https://explorer.subquery.network/) and has a unique URL that is visible only to you. And of course, the separate environment allows you to test your new code without affecting production.

## Polkadot's Extrinsics คืออะไร

If you are already familiar with blockchain concepts, you can think of extrinsics as comparable to transactions. More formally though, an extrinsic is a piece of information that comes from outside the chain and is included in a block. There are three categories of extrinsics. They are inherents, signed transactions, and unsigned transactions.

Inherent extrinsics are pieces of information that are not signed and only inserted into a block by the block author.

Signed transaction extrinsics are transactions that contain a signature of the account that issued the transaction. They stands to pay a fee to have the transaction included on chain.

Unsigned transactions extrinsics are transactions that do not contain a signature of the account that issued the transaction. Unsigned transactions extrinsics should be used with care because there is nobody paying a fee, becaused they are not signed. Because of this, the transaction queue lacks economic logic to prevent spam.

For more information, click [here](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics).

## Endpoint สำหรับเครือข่าย Kusama คืออะไร?

The network.endpoint for the Kusama network is `wss://kusama.api.onfinality.io/public-ws`.

## Endpoint สำหรับเครือข่าย Polkadot mainnet คืออะไร?

The network.endpoint for the Polkadot network is `wss://polkadot.api.onfinality.io/public-ws`.

## ฉันจะพัฒนา Schema ของโปรเจกต์ของฉันได้อย่างไร

A known issue with developing a changing project schema is that when lauching your Subquery node for testing, the previously indexed blocks will be incompatible with your new schema. In order to iteratively develop schemas the indexed blocks stored in the database must be cleared, this can be achieved by launching your node with the `--force-clean` flag. For example:

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

Note that it is recommended to use `--force-clean` when changing the `startBlock` within the project manifest (`project.ts`) in order to begin reindexing from the configured block. If `startBlock` is changed without a `--force-clean` of the project, then the indexer will continue indexing with the previously configured `startBlock`.

## How can I optimise my project to speed it up?

Performance is a crucial factor in each project. Fortunately, there are several things you could do to improve it. You can find our recommendations in the [Project Optimisation](../build/optimisation.md).
