# Faq (에프에이큐)

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

서브쿼리 시작하는 가장 좋은 방법은 저희를 사용해보는 것입니다. [안녕하세요 세계 지도 시간 ](/assets/pdf/Hello_World_Lab.pdf) 이것은 간단한 5분 걷기 운동입니다. 시작 템플릿을 다운로드하고, 프로젝트를 빌드하고, Docker를 사용하여 로컬 호스트에서 노드를 실행하고, 간단한 쿼리를 실행하세요.

## SubQuery에 기여하거나 피드백을 하려면 어떻게 해야하나요?

우리는 커뮤니티의 기여와 피드백을 좋아합니다. 코드를 제공하려면 관심 있는 저장소를 포크하고 변경하세요. 그런 다음 PR 또는 Pull Request를 제출하세요. 테스트하는 것도 잊지 마세요. 또한 우리의 [기부 지침](../miscellaneous/contributing.html)

피드백을 제공하려면 hello@subquery.network로 문의하거나 다음 페이지로 이동하세요. [디스코드 채널](https://discord.com/invite/78zg8aBSMG)

## SubQuery의 관리형 서비스에서 내 프로젝트를 호스팅하는 데 비용이 얼마나 드나요?

이 서비스는 넉넉한 무료 등급으로 커뮤니티에 제공됩니다! 처음 두 개의 SubQuery 프로젝트를 무료로 호스팅할 수 있습니다!

## 배포 슬롯이란 무엇입니까?

배포 슬롯은 다음의 기능입니다. [하위 쿼리 관리 서비스](https://managedservice.subquery.network) 이는 개발 환경과 동일합니다. 예를 들어, 모든 소프트웨어 조직에는 일반적으로 개발 환경과 프로덕션 환경이 최소한으로 존재합니다(즉, localhost는 무시함). 일반적으로 조직의 요구 사항과 개발 설정에 따라 준비, 사전 제작 또는 QA와 같은 추가 환경이 포함됩니다.

SubQuery에는 현재 두 개의 슬롯을 사용할 수 있습니다. 스테이징 슬롯과 프로덕션 슬롯. 이를 통해 개발자는 SubQuery를 스테이징 환경에 배포할 수 있으며 버튼 클릭만으로 "프로덕션으로 승격"할 수 있습니다.

## 스테이징 슬롯의 장점은 무엇입니까?

스테이징 슬롯 사용의 주요 이점은 SubQuery 프로젝트를 공개적으로 노출하지 않고도 새 릴리스를 준비할 수 있다는 것입니다. 프로덕션 애플리케이션에 영향을 주지 않고 스테이징 슬롯이 모든 데이터를 다시 색인화할 때까지 기다릴 수 있습니다.

스테이징 슬롯은 공개적으로 표시되지 않습니다.[탐침](https://explorer.subquery.network/)귀하에게만 표시되는 고유한 URL이 있습니다. 물론 별도의 환경을 사용하면 프로덕션에 영향을 주지 않고 새 코드를 테스트할 수 있습니다.

## Polkadot의 외인성 제품은 무엇입니까?

블록체인 개념에 이미 익숙하다면 외부를 트랜잭션과 비교할 수 있다고 생각할 수 있습니다. 좀 더 공식적으로 말하면, 외부 정보는 체인 외부에서 제공되고 블록에 포함된 정보 조각입니다. 외인성에는 세 가지 범주가 있습니다. 이는 고유성, 서명된 트랜잭션 및 서명되지 않은 트랜잭션입니다.

고유한 외부 요소는 서명되지 않고 블록 작성자가 블록에 삽입하기만 하는 정보 조각입니다.

서명된 트랜잭션 외부 항목은 트랜잭션을 발행한 계정의 서명이 포함된 트랜잭션입니다. 그들은 거래가 체인에 포함되도록 수수료를 지불합니다.

서명되지 않은 트랜잭션 외부 항목은 트랜잭션을 발행한 계정의 서명이 포함되지 않은 트랜잭션입니다. 서명되지 않은 거래 외부 항목은 서명되지 않았기 때문에 수수료를 지불하는 사람이 없으므로 주의해서 사용해야 합니다. 이로 인해 트랜잭션 대기열에는 스팸을 방지할 수 있는 경제적 논리가 부족합니다.

자세한 내용을 보려면 클릭하세요.[여기](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics).

## Kusama 네트워크의 엔드포인트는 무엇입니까?

Kusama 네트워크의 network.endpoint는 다음과 같습니다. `wss://kusama.api.onfinality.io/public-ws`.

## Polkadot 메인넷 네트워크의 엔드포인트는 무엇입니까?

Polkadot 네트워크의 network.endpoint는 다음과 같습니다. `wss://polkadot.api.onfinality.io/public-ws`.

## 프로젝트 스키마를 반복적으로 개발하려면 어떻게 해야 합니까?

변경되는 프로젝트 스키마를 개발할 때 알려진 문제는 테스트를 위해 하위 쿼리 노드를 시작할 때 이전에 인덱싱된 블록이 새 스키마와 호환되지 않는다는 것입니다. 스키마를 반복적으로 개발하려면 데이터베이스에 저장된 인덱싱된 블록을 지워야 합니다. 이는 다음과 같이 노드를 시작하여 달성할 수 있습니다.`--강제 청소`깃발. 예를 들어:

```shell
subql-노드 -f . --force-clean --subquery-name=<project-name>
```

Note that it is recommended to use `--force-clean` when changing the `startBlock` within the project manifest (`project.ts`) in order to begin reindexing from the configured block. 만약에 `startBlock` 없이 변경됩니다 `--force-clean` 그러면 인덱서는 이전에 구성한 항목으로 인덱싱을 계속합니다 `startBlock`.

## 프로젝트 속도를 높이기 위해 어떻게 프로젝트를 최적화할 수 있나요?

성능은 각 프로젝트에서 중요한 요소입니다. 다행히도 이를 개선하기 위해 할 수 있는 몇 가지 작업이 있습니다. 다음에서 권장 사항을 찾을 수 있습니다.[프로젝트 최적화](../build/optimisation.md)
