# 자주 묻는 질문

## 서브쿼리란?

서브쿼리는 개발자가 서브스트레이트 체인 데이터를 인덱싱, 변환 및 쿼리하여 애플리케이션을 구동할 수 있도록 하는 오픈 소스 프로젝트입니다.

서브쿼리는 또한 개발자가 인프라 관리에 대한 책임 없이 오직 개발에만 집중할 수 있는 프로덕션 수준의 프로젝트 호스팅을 무료로 제공합니다.

## 서브쿼리를 시작하는 가장 좋은 방법은 무엇입니까?

서브쿼리를 시작하는 가장 좋은 방법은 [Hello World 튜토리얼](../quickstart/helloworld-localhost.md)을 따라해 보는 것입니다. 쿼리를 실행하는 과정을 5분 만에 쉽게 구동할 수 있습니다. 일단 스타트 템플릿을 다운로드하고 프로젝트를 빌드한 다음, Docker를 이용하여 로컬 호스트에서 노드를 실행합니다.

## 서브쿼리에 기여하거나 피드백을 어떻게 제공하나요?

우리는 언제나 커뮤니티의 기여와 피드백을 환영합니다. 코드를 피드백을 하려면 관심 있는 레포지토리를 포크하고 변경합니다. 그런 다음 PR 또는 풀 리퀘스트를 통해 제출해주세요. 맞다! 테스트도 잊지 마시구요! 또한, 기여 가이드 라인(TBA)도 확인해주세요.

피드백은 hello@subquery.network 또는 [디스코드 채널](https://discord.com/invite/78zg8aBSMG)을 통해 주시기 바랍니다.

## 서브쿼리 프로젝트에서 내 프로젝트를 호스팅하는 데 비용이 얼마나 듭니까?

서브쿼리 프로젝트에서 프로젝트를 호스팅하는 비용은 무료입니다! 이것이 저희가 커뮤니티에 보답하는 방법입니다! 프로젝트의 호스트 방법에 대해서는, [Hello World (SubQuery hosted)](../quickstart/helloworld-hosted.md)튜토리얼을 참조해 주세요.

## 배치 슬롯은 무엇인가요?

배치 슬롯은 개발 환경과 같도록 하는 [서브쿼리 프로젝트](https://project.subquery.network)의 특징입니다. 예를 들어, 어느 소프트웨어 조직이든 최소한 개발 환경과 가동 환경을 갖습니다(로컬호스트 무시). 통상적으로 조직의 수요와 개발 설정에 따라, 스테이징이나 예비가동 또는 QA와 같은 추가적인 환경이 포함됩니다.

서브쿼리에는 현재 2개의 슬롯이 있습니다. 스테이징 슬롯과 가동 슬롯. 그러면 개발자는 서브쿼리를 스테이징 환경에 배치하고, 버튼 클릭을 통해 "가동 환경으로 승격"할 수 있습니다.

## 스테이징 슬롯의 장점은 무엇인가요?

스테이징 슬롯을 사용하는 주요 장점은 서브쿼리 프로젝트의 공개하지 않고 새로운 릴리즈를 준비할 수 있다는 것입니다. 스테이징 슬롯이 가동 애플리케이션에 영향을 주지 않고 모든 데이터를 재인덱스화할 때까지 기다릴 수 있습니다.

스테이징 슬롯은 [Explorer](https://explorer.subquery.network/)에서는 일반에는 공개되지 않고, 유저만이 참조할 수 있는 일의 URL이 있습니다. 물론 별도의 환경을 통해 가동에 영향을 주지 않고 새로운 코드를 테스트할 수 있습니다.

## What are extrinsics?

If you are already familiar with blockchain concepts, you can think of extrinsics as comparable to transactions. More formally though, an extrinsic is a piece of information that comes from outside the chain and is included in a block. There are three categories of extrinsics. They are inherents, signed transactions, and unsigned transactions.

Inherent extrinsics are pieces of information that are not signed and only inserted into a block by the block author.

Signed transaction extrinsics are transactions that contain a signature of the account that issued the transaction. They stands to pay a fee to have the transaction included on chain.

Unsigned transactions extrinsics are transactions that do not contain a signature of the account that issued the transaction. Unsigned transactions extrinsics should be used with care because there is nobody paying a fee, becaused it is signed. Because of this, the transaction queue lacks economic logic to prevent spam.

보다 자세한 정보를 원하시면, [here](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics)을 클릭해주세요.

## Kusama 네트워크의 엔드포인트는 무엇입니까?

Kusama 네트워크의 network.endpoint는 `wss://kusama.api.onfinality.io/public-ws`입니다.

## Polkadot 메인넷 네트워크의 엔드포인트는 무엇입니까?

Polkadot 네트워크의 network.endpoint는 `wss://polkadot.api.onfinality.io/public-ws`입니다.

## How do I iteratively develop my project schema?

A known issue with developing a changing project schema is that when lauching your Subquery node for testing, the previously indexed blocks will be incompatible with your new schema. In order to iteratively develop schemas the indexed blocks stored in the database must be cleared, this can be achieved by launching your node with the `--force-clean` flag. Example

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

Note that it is recommended to use `--force-clean` when changing the `startBlock` within the project manifest (`project.yaml`) in order to begin reindexing from the configured block. If `startBlock` is changed without a `--force-clean` of the project then the indexer will continue indexing with the previously configured `startBlock`.