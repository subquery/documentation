# 서브쿼리 프로젝트 신규 버전 배포하기

## 가이드라인

공개된 서브쿼리 프로젝트에 대한 업그레이드 및 신규 버전을 배포하고자 하는 경우, 본 프로세스를 따라주시기 바랍니다. 주의해야 할 주요 포인트는 다음과 같습니다.

- 호환성이 손상되는 업그레이드인 경우에는 새로운 프로젝트(예: `My SubQuery Project V2`)를 생성하거나 소셜 미디어 채널을 통해 커뮤니티에 변경에 대해 충분히 안내해야 합니다.
- 새로운 버전의 서브쿼리 프로젝트 배포 시, 제네시스 블록의 모든 체인에 대한 인덱싱으로 인해 일부 다운타임이 발생할 수 있습니다.

## 신규 버전 배포하기

There are two methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

### Using the UI

Log into SubQuery Project and select the project you want to deploy a new version of. You can choose to either deploy to the production or staging slot. These two slots are isolated environments and each has their own databases and synchronise independently.

We recommend deploying to your staging slot only for final staging testing or when you need to resync your project data. You can then promote it to production with zero downtime. You will find testing is faster when [running a project locally](../run_publish/run.md) as you can more [easily debug issues](../academy/tutorials_examples/debug-projects.md).

The staging slot is perfect for:

- 별도의 환경에서 SubQuery 프로젝트의 변경 사항에 대한 최종 유효성 검사. 스테이징 슬롯에는 dApp에서 사용할 수 있는 프로덕션에 대한 다른 URL이 있습니다.
- Warming up and indexing data for an updated SubQuery project to eliminate downtime in your dApp.
- 공개하지 않고 SubQuery 프로젝트에 대한 새 릴리즈 준비. 스테이징 슬롯은 Explorer에 공개되지 않으며 프로젝트 관리자에게만 제공되는 고유 URL이 있습니다.

![Staging slot](/assets/img/staging_slot.png)

배포하려는 SubQuery 프로젝트 코드베이스 버전의 GitHub에서 커밋 해시를 입력합니다(전체 커밋 해시 복사). 이로 인해 현재 체인을 인덱싱하는 데 걸리는 시간에 따라 다운타임이 발생합니다. 진행상황은 언제든지 여기에 보고할 수 있습니다.

### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our managed service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN](/docs/run_publish/ipfs.md#prepare-your-subqlaccesstoken) ready.

```shell
// You can directly set your Indexer and Query versions
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// OR you can use the interface, it will validate your IPFS CID and render a list of image versions that matches your manifest file `project.yaml`

$ subql deployment:deploy
```

## Upgrade to the Latest Indexer and Query Service

If you just want to upgrade to the latest indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) or query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) to take advantage of our regular performance and stability improvements, just select a newer versions of our packages and save. This will cause only a few minutes of downtime as the services running your project are restarted.

## 다음 단계 - 프로젝트 연결하기

배포가 성공적으로 완료되고 노드가 체인에서 데이터를 인덱스화하면 표출된 GraphQL 쿼리 엔드포인트를 통해 프로젝트에 접속할 수 있습니다.

![배포 및 동기화된 프로젝트](/assets/img/projects-deploy-sync.png)

프로젝트 제목 옆에 있는 3개의 점을 클릭하여 SubQuery 탐색기로 표시할 수도 있습니다. There you can use the in browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).
