# 여러분의 서브쿼리 프로젝트를 퍼블리싱 하세요

## 서브쿼리를 통한 프로젝트 호스팅의 장점

- 서브쿼리 프로젝트를 고성능, 확장성, 관리성 높은 공공서비스로 실행합니다.
- 이 서비스는 커뮤니티에 무료로 제공되고 있어요!
- 프로젝트를 퍼블리싱하고 [SubQuery Explorer](https://explorer.subquery.network) 에 등록할 수 있으며 누구나 프로젝트를 참조할 수 있습니다.
- 저희는 깃허브과 통합이 되어 있으므로 깃허브에서 누구나 공유된 프로젝트를 볼 수 있습니다.

## SubQuery 프로젝트에서 첫 번째 프로젝트 만들기

### 프로젝트 코드베이스 호스팅

게시하기 전에 SubQuery 프로젝트의 코드베이스를 호스팅할 수 있는 두 가지 방법이 있습니다.

**GitHub**: 프로젝트의 코드베이스는 공개 GitHub 리포지토리에 있어야 합니다.

**IPFS**: 프로젝트의 코드베이스를 IPFS에 저장할 수 있습니다. IPFS 호스팅 가이드를 따라 [먼저 IPFS에 게시](ipfs.md)하는 방법을 확인할 수 있습니다.

### SubQuery 프로젝트에 로그인

시작하기 전에 SubQuery 프로젝트 코드베이스가 공개 GitHub 리포지토리 또는 IPFS에서 온라인 상태인지 확인하십시오. `schema.graphql` 파일은 디렉토리의 루트에 있어야 합니다.

To create your first project, head to [SubQuery Projects](https://project.subquery.network). 로그인하려면 GitHub 계정으로 인증해야 합니다.

처음 로그인하면 SubQuery를 인증하라는 메시지가 표시됩니다. 계정을 식별하는 데만 이메일 주소가 필요하며 다른 이유로 GitHub 계정의 다른 데이터는 사용하지 않습니다. 이 단계에서 개인 계정 대신 GitHub 조직에 SubQuery 프로젝트를 게시할 수 있도록 GitHub 조직 계정에 대한 액세스 권한을 요청하거나 부여할 수도 있습니다.

![GitHub 계정에서 승인 취소](/assets/img/project_auth_request.png)

SubQuery 프로젝트는 SubQuery 플랫폼에 업로드된 모든 호스팅 프로젝트를 관리하는 곳입니다. 이 응용 프로그램에서 모든 프로젝트를 생성, 삭제 및 업그레이드할 수 있습니다.

![프로젝트 로그인](/assets/img/projects-dashboard.png)

GitHub 조직 계정이 연결된 경우 헤더의 스위처를 사용하여 개인 계정과 GitHub 조직 계정 간에 변경할 수 있습니다. GitHub 조직 계정에서 생성된 프로젝트는 해당 GitHub 조직의 구성원 간에 공유됩니다. GitHub 조직 계정을 연결하려면 [여기의 단계를 따르세요](#add-github-organization-account-to-subquery-projects).

![GitHub 계정 간 전환](/assets/img/projects-account-switcher.png)

### 첫 번째 프로젝트 만들기

There are two methods to create a project in the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

#### Using the UI

Let's start by clicking on "Create Project". You'll be taken to the New Project form. Please enter the following (you can change this in the future):

- **GitHub 계정:** 다수의 GitHub 계정이 있는 경우, 프로젝트를 생성할 계정을 선택하십시오. GitHub 조직 계정에서 생성한 프로젝트는 조직 구성원 간 공유됩니다.
- **프로젝트 이름**
- **부제목**
- **설명**
- **GitHub 저장 URL:** 이것은 SubQuery 프로젝트가 있는 공개 저장소에 대한 유효한 GitHub URL이어야 합니다. The `schema.graphql` file must be in the root of your directory ([learn more about the directory structure](../build/introduction.md#directory-structure)).
- **데이터베이스:** 프리미엄 고객은 프로덕션 SubQuery 프로젝트를 호스팅하기 위한 전용 데이터베이스에 액세스할 수 있습니다. 관심이 있는 경우 [sales@subquery.network](mailto:sales@subquery.network)에 연락하여 이 설정을 활성화할 수 있습니다.
- **배포 소스:** GitHub 리포지토리에서 프로젝트를 배포하거나 IPFS CID에서 배포하도록 선택할 수 있습니다. [IPFS를 사용한 호스팅](ipfs.md)에 대한 가이드를 참조하세요.
- **Hide project:**선택하면, 공개 SubQuery 탐색기에서 프로젝트를 숨깁니다. 커뮤니티와 SubQuery를 공유하려면 이 항목을 선택하지 않은 상태로 유지하십시오! ![첫 번째 프로젝트 만들기](/assets/img/projects-create.png)

Create your project and you'll see it on your SubQuery Project's list. _We're almost there! We just need to deploy a new version of it._

![Created Project with no deployment](/assets/img/projects-no-deployment.png)

#### Using the CLI

You can also use `@subql/cli` to publish your project to our managed service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN]() ready.

```shell
// Creating a project using the CLI
$ subql project:create-project

// OR using non-interactive, it will prompt you if the required fields are missing
$ subql project:create-project
    --apiVersion=apiVersion      Api version is default to 2
    --description=description    Enter description
    --gitRepo=gitRepo            Enter git repository
    --org=org                    Enter organization name
    --project_name=project_name  Enter project name
```

### Deploy your First Version

There are two methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

#### Using the UI

While creating a project will setup the display behaviour of the project, you must deploy a version of it before it becomes operational. Deploying a version triggers a new SubQuery indexing operation to start, and sets up the required query service to start accepting GraphQL requests. You can also deploy new versions to existing projects here.

With your new project, you'll see a Deploy New Version button. Click this, and fill in the required information about the deployment:

- **Branch:** From GitHub, select the branch of the project that you want to deploy from
- **Commit Hash:** From GitHub, select the specific commit of the version of your SubQuery project codebase that you want deployed
- **IPFS:** If deploying from IPFS, paste you IPFS deployment CID (without the leading `ipfs://`)
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here
- **Indexer Version:** This is the version of SubQuery's node service that you want to run this SubQuery on. See [`@subql/node`](https://www.npmjs.com/package/@subql/node)
- **Query Version:** This is the version of SubQuery's query service that you want to run this SubQuery on. See [`@subql/query`](https://www.npmjs.com/package/@subql/query)

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

#### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our managed service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ready.

```shell
// Deploy using the CLI
$ suqbl deployment:deploy

// OR Deploy using non-interactive CLI
$ suqbl deployment:deploy
  --dict=dict                      Enter Dictionary Endpoint
  --endpoint=endpoint              Enter Network Endpoint
  --indexerVersion=indexerVersion  Enter indexer-version
  --ipfsCID=ipfsCID                Enter IPFS CID
  --org=org                        Enter Organization Name
  --project_name=project_name      Enter Project Name
  --queryVersion=queryVersion      Enter Query-version
  --type=type                      Enter deployment type e.g. primary or stage
```

## 다음 단계 - 프로젝트 연결하기

배포가 성공적으로 완료되고 노드가 체인에서 데이터를 인덱스화하면 표출된 GraphQL 쿼리 엔드포인트를 통해 프로젝트에 접속할 수 있습니다.

![배포 및 동기화된 프로젝트](/assets/img/projects-deploy-sync.png)

프로젝트 제목 옆에 있는 3개의 점을 클릭하여 SubQuery 탐색기로 표시할 수도 있습니다. There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![Projects in SubQuery Explorer](/assets/img/projects-explorer.png)

## SubQuery 프로젝트에 GitHub 계정 추가하기

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![GitHub 계정 간 전환](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![GitHub 계정에서 승인 취소](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
