# IPFS를 사용하여 프로젝트 호스팅

이 가이드는 로컬 SubQuery 프로젝트를 [IPFS](https://ipfs.io/)에 게시하고 호스팅 인프라에 배포하는 방법을 설명합니다.

Hosting a project in IPFS makes it available for all and reduces your reliance on centralised services like GitHub.

## 요구 사항

- `@subql/cli` 버전 0.21.0 이상.
- 매니페스트 `specVersion` 0.2.0 이상.
- Get your [SUBQL_ACCESS_TOKEN](ipfs.md#prepare-your-subql-access-token) ready.
- 배포에 성공하려면 `subql build` 명령으로 프로젝트를 빌드하고 게시하기 전에 로컬에서 테스트하는 것이 좋습니다.

## SUBQL_ACCESS_TOKEN 준비

- 1단계: [SubQuery 프로젝트](https://project.subquery.network/)로 이동하여 로그인합니다.
- Step 2: Click on your profile at the top right of the navigation menu, then click on **_Refresh Token_**.
- 3단계: 생성된 토큰을 복사합니다.
- 4단계: 이 토큰을 사용하려면:
  - 옵션 1: 환경 변수에 SUBQL_ACCESS_TOKEN을 추가합니다. `SUBQL_ACCESS_TOKEN= 내보내기<token>`
  - 옵션 2: 곧 나올 예정입니다. `subql/cli`는 SUBQL_ACCESS_TOKEN을 로컬에 저장하는 것을 지원할 것입니다.

## 프로젝트를 게시하는 방법

We provide two methods to publish your project:

### Option 1

As you have `@subql/cli` already installed, you can run the following command, which will read the project and required information from its default manifest `project.yaml`:

```
// Publish it from your project's root directory
subql publish

// OR point to your project root
subql publish -f ~/my-project/
```

### Option 2

또는 프로젝트에 여러 매니페스트 파일이 있다고 가정합니다. 예를 들어 여러 네트워크를 지원하지만 동일한 매핑 및 비즈니스 논리를 공유하고 다음과 같은 프로젝트 구조가 있다고 가정합니다.

```
L projectRoot
 L src/
 L package.json
 L polkadot.yaml (Manifest for Polkadot network)
 L kusama.yaml   (Manifest for Kusama network)
 ...
```

선택한 매니페스트 파일로 언제든지 프로젝트를 게시할 수 있습니다.

```
 # This will publish project support indexing Polkadot network
subql publish -f ~/my-projectRoot/polkadot.yaml
```

## 게시 후

프로젝트를 성공적으로 게시한 후 아래 로그는 프로젝트가 IPFS 클러스터에서 생성되었고 해당 `CID` (콘텐츠 식별자) 를 반환했음을 나타냅니다.

```
Building and packing code... done
Uploading SupQuery project to IPFS
SubQuery Project uploaded to IPFS: QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd  //CID
```

이 `CID`를 기록해 두십시오. With this `CID`, you can view your published project as what we call it [IPFS Deployment](ipfs.md#ipfs-deployment).

## IPFS 배포

IPFS 배포는 분산 네트워크에서 SubQuery 프로젝트의 독립적이고 고유한 존재를 나타냅니다. 따라서 프로젝트의 코드를 변경하면 고유성에 영향을 줍니다. 비즈니스 로직을 조정해야 하는 경우 매핑 기능을 변경하려면 프로젝트를 다시 게시해야 하며 `CID`가 변경됩니다.

For now, to view the project you have published, use a `REST` api tool such as [Postman](https://web.postman.co/), and use `POST` method with the following example URL to retrieve it:`https://ipfs.subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`.

You should see the example project deployment as below.

이 배포는 매니페스트 파일과 매우 유사합니다. 이러한 설명 필드를 예상할 수 있으며 네트워크 및 사전 끝점은 프로젝트 실행 결과에 직접적인 영향을 미치지 않았기 때문에 제거되었습니다.

로컬 프로젝트에서 사용된 파일은 압축되어 IPFS에도 게시되었습니다.

```yaml
dataSources:
  - kind: substrate/Runtime
    mapping:
      file: ipfs://QmTTJKrMVzCZqmRCd5xKHbKymtQQnHZierBMHLtHHGyjLy
      handlers:
        - handler: handleBlock
          kind: substrate/BlockHandler
        - filter:
            method: Deposit
            module: balances
          handler: handleEvent
          kind: substrate/EventHandler
        - handler: handleCall
          kind: substrate/CallHandler
    startBlock: 8973820
network:
  genesisHash: "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3"
schema:
  file: ipfs://QmTP5BjtxETVqvU4MkRxmgf8NbceB17WtydS6oQeHBCyjz
specVersion: 0.2.0
```

## 호스팅 서비스에서 SubQuery 프로젝트 실행

### IPFS 배포로 프로젝트 만들기

You can follow the guide to [Publish your SubQuery project](../run_publish/publish.md) but where you set your deployment source you can select **IPFS**.

그런 다음 프로덕션 슬롯을 선택하고 IPFS 배포 CID(앞에 `ipfs://` 제외)를 복사하여 붙여넣습니다.

미리보기 섹션에서 IPFS 배포가 표시되어야 합니다. 그리고 네트워크, 사전 끝점 등을 선택할 수 있습니다.

호스팅된 서비스에 IPFS 배포를 성공적으로 배포한 후에는 SubQuery Explorer에서 볼 수 있어야 하며 로컬에서와 마찬가지로 쿼리 서비스에 액세스할 수 있습니다.
