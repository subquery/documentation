# Frequently Asked Questions

## 서브쿼리란?

서브쿼리는 개발자가 서브스트레이트 체인 데이터를 인덱싱, 변환 및 쿼리하여 애플리케이션을 구동할 수 있도록 하는 오픈 소스 프로젝트입니다.

SubQuery also provides free, production grade hosting of projects for developers removing the responsiblity of manging infrastructure, and letting developers do what they do best - build.

## 서브쿼리를 시작하는 가장 좋은 방법은 무엇입니까?

The best way to get started with SubQuery is to try out our [Hello World tutorial](../quickstart/helloworld-localhost.md). 쿼리를 실행하는 과정을 5분 만에 쉽게 구동할 수 있습니다. 일단 스타트 템플릿을 다운로드하고 프로젝트를 빌드한 다음, Docker를 이용하여 로컬 호스트에서 노드를 실행합니다.

## 서브쿼리에 기여하거나 피드백을 어떻게 제공하나요?

우리는 언제나 커뮤니티의 기여와 피드백을 환영합니다. 코드를 피드백을 하려면 관심 있는 레포지토리를 포크하고 변경합니다. 그런 다음 PR 또는 풀 리퀘스트를 통해 제출해주세요. 맞다! 테스트도 잊지 마시구요! Also check out our contributions guide lines (TBA).

To give feedback, contact us at hello@subquery.network or jump onto our [discord channel](https://discord.com/invite/78zg8aBSMG)

## 서브쿼리 프로젝트에서 내 프로젝트를 호스팅하는 데 비용이 얼마나 듭니까?

서브쿼리 프로젝트에서 프로젝트를 호스팅하는 비용은 무료입니다! 이것이 저희가 커뮤니티에 보답하는 방법입니다! To learn how to host your project with us, please check out the [Hello World (SubQuery hosted)](../quickstart/helloworld-hosted.md) tutorial.

## What are deployment slots?

Deployment slots are a feature in [SubQuery Projects](https://project.subquery.network) that is the equivalent of a development environment. For example, in any software organisation there is normally a development environment and a production environment as a minimum (ignoring localhost that is). Typically additional environments such as staging and pre-prod or even QA are included depending on the needs of the organisation and their development set up.

SubQuery currently has two slots available. A staging slot and a production slot. This allows developers to deploy their SubQuery to the staging environment and all going well, "promote to production" at the click of a button.

## What is the advantage of a staging slot?

The main benefit of using a staging slot is that it allows you to prepare a new release of your SubQuery project without exposing it publicly. You can wait for the staging slot to reindex all data without affecting your production applications.

The staging slot is not shown to the public in the [Explorer](https://explorer.subquery.network/) and has a unique URL that is visible only to you. And of course, the separate environment allows you to test your new code without affecting production.

## What are extrinsics?

If you are already familiar with blockchain concepts, you can think of extrinsics as comparable to transactions. More formally though, an extrinsic is a piece of information that comes from outside the chain and is included in a block. There are three categories of extrinsics. They are inherents, signed transactions, and unsigned transactions.

Inherent extrinsics are pieces of information that are not signed and only inserted into a block by the block author.

Signed transaction extrinsics are transactions that contain a signature of the account that issued the transaction. They stands to pay a fee to have the transaction included on chain.

Unsigned transactions extrinsics are transactions that do not contain a signature of the account that issued the transaction. Unsigned transactions extrinsics should be used with care because there is nobody paying a fee, becaused it is signed. Because of this, the transaction queue lacks economic logic to prevent spam.

For more information, click [here](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics).

## What is the endpoint for the Kusama network?

The network.endpoint for the Kusama network is `wss://kusama.api.onfinality.io/public-ws`.

## What is the endpoint for the Polkadot mainnet network?

The network.endpoint for the Polkadot network is `wss://polkadot.api.onfinality.io/public-ws`.

## How do I iteratively develop my project schema?

A known issue with developing a changing project schema is that when lauching your Subquery node for testing, the previously indexed blocks will be incompatible with your new schema. In order to iteratively develop schemas the indexed blocks stored in the database must be cleared, this can be achieved by launching your node with the `--force-clean` flag. Example

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

Note that it is recommended to use `--force-clean` when changing the `startBlock` within the project manifest (`project.yaml`) in order to begin reindexing from the configured block. If `startBlock` is changed without a `--force-clean` of the project then the indexer will continue indexing with the previously configured `startBlock`.