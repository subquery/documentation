# Faq (에프에이큐)

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

## SubQuery란?

서브쿼리(SubQuery) 는 개발자를 위한 오픈 소스 블록체인 데이터 인덱서입니다. 빠르고 유연하며 안정적이고 탈중앙화된 API를 제공하여 선도적인 멀티체인 애플리케이션을 구동합니다.

개발자가 자체 인덱싱 솔루션을 구축할 필요가 없도록 함으로써 개발자의 시간과 비용을 절약하는 것이 우리의 목표입니다. 이제 그들은 애플리케이션 개발에 전념할 수 있습니다. 서브쿼리는 개발자들이 미래의 분산형 제품을 만들도록 지원합니다.

<br/>
<figure class="video_container">
<iframe src="https://www.youtube.com/embed/gCpVz_mkWdo" title="하위 쿼리 네트워크 소개" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscree="true"></iframe>
</figure>

**서브쿼리 관리 서비스**

서브쿼리(SubQuery) 는 개발자들을 위해 무료로 생산 수준의 프로젝트 호스팅을 제공합니다. 우리 Managed Service는 인프라를 관리하는 책임을 제거하여 개발자들이 가장 잘하는 일인 개발에 집중할 수 있도록 합니다. 더 알아보기[여기](/run_publish/publish.md)

**서브쿼리 네트워크**

서브쿼리 네트워크는 개발자들이 인프라 스택을 완전히 탈중앙화할 수 있도록 합니다. 이것은 dApp을 위한 가장 개방적이고, 성능이 뛰어나고, 안정적이며, 확장 가능한 데이터 서비스입니다. 이것은 dApp을 위한 가장 개방적이고, 성능이 뛰어나고, 안정적이며, 확장 가능한 데이터 서비스입니다. 당신의 프로젝트를 SubQuery 네트워크에 게시하면 누구나 인덱싱하고 호스트할 수 있습니다. 이를 통해 전 세계 사용자에게 데이터를 더 빠르고 안정적으로 제공할 수 있습니다.

추가 정보[여기](/subquery_network/introduction.md)

## SubQuery를 시작하는 가장 좋은 방법은 무엇입니까?

The best way to get started with SubQuery is to follow our [quick start guides](../quickstart/quickstart.md) for your chosen network. They give you a good run through of how SubQuery works, and how you can get started.

## How can I contribute to SubQuery?

우리는 커뮤니티의 기여와 피드백을 좋아합니다. 코드를 제공하려면 관심 있는 저장소를 포크하고 변경하세요. 그런 다음 PR 또는 Pull Request를 제출하세요. 테스트하는 것도 잊지 마세요. 또한 우리의 [기부 지침](../miscellaneous/contributing.html)

## How can I run my SubQuery Project

SubQuery is open-source, meaning you have the freedom to run it in the following three ways:

- Locally on your own computer (or a cloud provider of your choosing), [view the instructions on how to run SubQuery Locally](https://academy.subquery.network/run_publish/run.html)
- By publishing it to our enterprise-level [Managed Service](https://managedservice.subquery.network), where we'll host your SubQuery project in production ready services for mission critical data with zero-downtime blue/green deployments. We even have a generous free tier. [Find out how](https://academy.subquery.network/run_publish/publish.html)
- By publishing it to the decentralised [SubQuery Network](https://subquery.network/network), the most open, performant, reliable, and scalable data service for dApp developers. The SubQuery Network indexes and services data to the global community in an incentivised and verifiable way. [Read more](../subquery_network/publish.md)

## 프로젝트 속도를 높이기 위해 어떻게 프로젝트를 최적화할 수 있나요?

성능은 각 프로젝트에서 중요한 요소입니다. 다행히도 이를 개선하기 위해 할 수 있는 몇 가지 작업이 있습니다. 다음에서 권장 사항을 찾을 수 있습니다.[프로젝트 최적화](../build/optimisation.md)
