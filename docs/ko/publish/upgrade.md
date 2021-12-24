# 서브쿼리 프로젝트 신규 버전 배포하기

## 가이드라인

공개된 서브쿼리 프로젝트에 대한 업그레이드 및 신규 버전을 배포하고자 하는 경우, 본 프로세스를 따라주시기 바랍니다. 주의해야 할 주요 포인트는 다음과 같습니다.
- 호환성이 손상되는 업그레이드인 경우에는 새로운 프로젝트(예: `My SubQuery Project V2`)를 생성하거나 소셜 미디어 채널을 통해 커뮤니티에 변경에 대해 충분히 안내해야 합니다.
- 새로운 버전의 서브쿼리 프로젝트 배포 시, 제네시스 블록의 모든 체인에 대한 인덱싱으로 인해 일부 다운타임이 발생할 수 있습니다.

## 신규 버전 배포하기

서브쿼리 프로젝트에 로그인하고 신규 버전을 배포하고자 하는 프로젝트를 선택합니다. 가동 슬롯 또는 스테이징 슬롯에 배포하도록 선택할 수 있습니다. 이 두 슬롯은 서로 격리된 환경에서 각각 자체 데이터베이스를 가지며, 독립적으로 동기화됩니다.

스테이징 슬롯 상 배포는 최종 스테이징 테스트 또는 프로젝트 데이터를 다시 동기화해야 하는 경우에만 권장합니다. 그런 이후에는 다운타임 없이 가동으로 승격이 가능합니다. [프로젝트 로컬 실행](../run/run.md) 시, [보다 쉽게 디버깅](../tutorials_examples/debug-projects.md)이 가능하므로 보다 빠른 테스팅이 가능합니다.

스테이징 슬롯은 다음에 적합합니다.
* Final validation of changes to your SubQuery Project in a separate environment. The staging slot has a different URL to production that you can use in your dApps.
* Warming up and indexing data for an updated SubQuery project to eliminate downtime in your dApp
* Preparing a new release for your SubQuery Project without exposing it publicly. The staging slot is not shown to the public in the Explorer and has a unique URL that is visible only to you.

![스테이징 슬롯](/assets/img/staging_slot.png)

#### Upgrade to the Latest Indexer and Query Service

If you just want to upgrade to the latest indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) or query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) to take advantage of our regular performance and stability improvements, just select a newer versions of our packages and save. This will cause only a few minutes of downtime.

#### Deploy New Version of your SubQuery Project

Fill in the Commit Hash from GitHub (copy the full commit hash) of the version of your SubQuery project codebase that you want deployed. This will cause a longer downtime depending on the time it takes to index the current chain. You can always report back here for progress.

## 다음 단계 - 프로젝트 연결하기
Once your deployment has succesfully completed and our nodes have indexed your data from the chain, you'll be able to connect to your project via the displayed GraphQL Query endpoint.

![배포 및 동기화된 프로젝트](/assets/img/projects-deploy-sync.png)

프로젝트 제목 옆에 있는 3개의 점을 클릭하여 SubQuery 탐색기로 표시할 수도 있습니다. There you can use the in browser playground to get started - [read more about how to user our Explorer here](../query/query.md).
