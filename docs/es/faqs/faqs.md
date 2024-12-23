# Preguntas Frecuentes

## Migrating to version 3.0 of the SubQuery SDK

Version 3.0 adds some major improvements to SubQuery's SDK that have been requested and developed in partnership with key customers in the SubQuery ecosystem.

## Changes to tsConfig

Firstly, we have moved some components to a new `subql-core` library (`logger` and others). You will need to update your `tsconfig.json` to look like the following:

**Note, replace `node_modules/@subql/types-ethereum/dist/global.d.ts` with whatever chain you are indexing, e.g. `types-ethereum`, `types-cosmos`, `types-algorand` `types-near` etc. For Polkadot, we use just `types` (not `types-polkadot`)**

```json
  ...
  "include": [
    "src/**/*",
    "node_modules/@subql/types-core/dist/global.d.ts",
    "node_modules/@subql/types-ethereum/dist/global.d.ts"
  ],
```

## Typescript Manifest

With the number of new features we are adding to SubQuery, and the slight differences between each chain that mostly occur in the manifest, we looked for a way to make it easier for developers to understand, try out new features and push the boundaries of what they index. Rather than a complex `yaml`` file that is easy to make errors in, we’ve decided to embrace the safety of Typescript.

The manifest in version 3 is now written in Typescript by default, which includes better type safety, more advanced settings, and documentation to make it easier for developers to update and edit without having to consult our documentation. This step makes the development experience easier for developers of SubQuery, and also improves the discovery and documentation of new features and configuration options, it’s a relatively major change to our SDK that is surprisingly easy to make to your projects. For example, with typescript in your favourite code editor, you can see documentation and types for each field as you code your manifest file - easy!

You can see examples of the new manifest in the Build > Manifest section of this documentation, for example; [Ethereum](../build/manifest/ethereum.md), [Cosmos](../build/manifest/cosmos.md), and [Polkadot](../build/manifest/polkadot.md).

For Cosmos projects, in the new Typescript manifest, `chainTypes` have been renamed to `chaintypes`.

## Inserting Seed Data at Project Initiation

Some customers would like to insert specific data into the store, or initiate the database state correctly, when they start their project and begin indexing for the first time.

The best way to do this is use a combination of `startBlock`, `endBlock`, and a block handler like as follows in your project manifest. In the below example, the `initiateStoreAndDatabase` mapping function will be run once and once only on block 320 (this could be the block that your contract was deployed on):

```ts
{
  dataSources: [
    {
      // Project initiation/genesis datasource
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 320, // Set this and the endBlock to whatever block you want it to be run on
      endBlock: 320,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            kind: EthereumHandlerKind.Block,
            handler: "initiateStoreAndDatabase",
          }
        ],
      },
    },
    // Add other handlers for regular indexing after this
    {
      ...
    }
  ],
}
```

## ¿Qué es SubQuery?

SubQuery es un indexador de datos de blockchain de código abierto para desarrolladores que brinda APIs rápidas, flexibles, confiables y descentralizadas para potenciar aplicaciones multi-cadena.

Nuestro objetivo es ahorrar tiempo y dinero a los desarrolladores eliminando la necesidad de construir su propia solución de indexación. Ahora, pueden centrarse plenamente en desarrollar sus aplicaciones. Subquery ayuda a los desarrolladores a crear los productos descentralizados del futuro.

<br/>
<figure class="video_container">
<iframe src="https://www.youtube.com/embed/gCpVz_mkWdo" title="Presentando la Red SubQuery" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscree="true"></iframe>
</figure>

**SubQuery Managed Service**

SubQuery also provides free, production grade hosting of projects for developers. Our Managed Service removes the responsiblity of managing infrastructure, so that developers do what they do best — build. Find out more [here](/run_publish/publish.md).

**The SubQuery Network**

The SubQuery Network allows developers to completely decentralise their infrastructure stack. It is the most open, performant, reliable, and scalable data service for dApps. The SubQuery Network indexes and services data to the global community in an incentivised and verifiable way. After publishing your project to the SubQuery Network, anyone can index and host it - providing data to users around the world faster and reliably.

More information [here](/subquery_network/introduction/introduction.md).

## ¿Cuál es la mejor manera de comenzar con SubQuery?

The best way to get started with SubQuery is to follow our [quick start guides](../quickstart/quickstart.md) for your chosen network. They give you a good run through of how SubQuery works, and how you can get started.

## How can I contribute to SubQuery?

We love contributions and feedback from the community. To contribute the code, fork the repository of your interest and make your changes. Then submit a PR or Pull Request. Don't forget to test as well. Also check out our [contributions guidelines](../miscellaneous/contributing.html).

## How can I run my SubQuery Project

SubQuery is open-source, meaning you have the freedom to run it in the following three ways:

- Locally on your own computer (or a cloud provider of your choosing), [view the instructions on how to run SubQuery Locally](https://academy.subquery.network/run_publish/run.html)
- By publishing it to our enterprise-level [Managed Service](https://managedservice.subquery.network), where we'll host your SubQuery project in production ready services for mission critical data with zero-downtime blue/green deployments. We even have a generous free tier. [Find out how](https://academy.subquery.network/run_publish/publish.html)
- By publishing it to the decentralised [SubQuery Network](https://subquery.network/network), the most open, performant, reliable, and scalable data service for dApp developers. The SubQuery Network indexes and services data to the global community in an incentivised and verifiable way. [Read more](../subquery_network/publish.md)

## How can I optimise my project to speed it up?

Performance is a crucial factor in each project. Fortunately, there are several things you could do to improve it. You can find our recommendations in the [Project Optimisation](../build/optimisation.md).
