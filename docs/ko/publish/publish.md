# 여러분의 서브쿼리 프로젝트를 퍼블리싱 하세요

## 서브쿼리를 통한 프로젝트 호스팅의 장점

- 서브쿼리 프로젝트를 고성능, 확장성, 관리성 높은 공공서비스로 실행합니다.
- 이 서비스는 커뮤니티에 무료로 제공되고 있어요!
- 프로젝트를 퍼블리싱하고 [SubQuery Explorer](https://explorer.subquery.network) 에 등록할 수 있으며 누구나 프로젝트를 참조할 수 있습니다.
- 저희는 깃허브과 통합이 되어 있으므로 깃허브에서 누구나 공유된 프로젝트를 볼 수 있습니다.

## Create your first project in SubQuery Projects

### Project Codebase Hosting

There are two ways you can host your SubQuery project's codebase before publishing.

**GitHub**: Your project's codebase must be in a public GitHub repository

**IPFS**: Your project's codebase can be stored in IPFS, you can follow our IPFS hosting guide to see how to [first publish to IPFS](ipfs.md)

### Login to SubQuery Projects

Before starting, please make sure that your SubQuery project codebase is online in a public GitHub repository or on IPFS. The `schema.graphql` file must be in the root of your directory.

To create your first project, head to [project.subquery.network](https://project.subquery.network). You'll need to authenticate with your GitHub account to login.

On first login, you will be asked to authorize SubQuery. We only need your email address to identify your account, and we don't use any other data from your GitHub account for any other reasons. In this step, you can also request or grant access to your GitHub Organization account so you can post SubQuery projects under your GitHub Organization instead of your personal account.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

SubQuery Projects is where you manage all your hosted projects uploaded to the SubQuery platform. You can create, delete, and even upgrade projects all from this application.

![Projects Login](/assets/img/projects-dashboard.png)

If you have a GitHub Organization accounts connected, you can use the switcher on the header to change between your personal account and your GitHub Organization account. Projects created in a GitHub Organization account are shared between members in that GitHub Organization. To connect your GitHub Organization account, you can [follow the steps here](#add-github-organization-account-to-subquery-projects).

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

### Create your First Project

Let's start by clicking on "Create Project". You'll be taken to the New Project form. Please enter the following (you can change this in the future):

- **GitHub 계정:** 다수의 GitHub 계정이 있는 경우, 프로젝트를 생성할 계정을 선택하십시오. GitHub 조직 계정에서 생성한 프로젝트는 조직 구성원 간 공유됩니다.
- **Project Name**
- **부제목**
- **설명**
- **GitHub 저장 URL:** 이것은 SubQuery 프로젝트가 있는 공개 저장소에 대한 유효한 GitHub URL이어야 합니다. `schema.graphql` 파일은 디렉토리의 루트에 있어야 합니다([디렉토리 구조에 대해 자세히 알아보기](../create/introduction.md#directory-structure)).
- **Database:** Premium customers can access dedicated databases to host production SubQuery projects from. If this interests you, you can contact [sales@subquery.network](mailto:sales@subquery.network) to have this setting enabled.
- **Deployment Source:** You can choose to have the project deployed from the GitHub repository or alternatively deployed from a IPFS CID, see our guide about [hosting with IPFS.](ipfs.md)
- **Hide project:**선택하면, 공개 SubQuery 탐색기에서 프로젝트를 숨깁니다. 커뮤니티와 SubQuery를 공유하려면 이 항목을 선택하지 않은 상태로 유지하십시오! ![Create your first Project](/assets/img/projects-create.png)

Create your project and you'll see it on your SubQuery Project's list. _We're almost there! We just need to deploy a new version of it._

![Created Project with no deployment](/assets/img/projects-no-deployment.png)

### Deploy your first Version

While creating a project will setup the display behaviour of the project, you must deploy a version of it before it becomes operational. 버전을 배포하면 새로운 SubQuery 인덱싱 작업이 시작되고 필요한 쿼리 서비스가 GraphQL 요청 수락을 시작하도록 설정됩니다. 여기에서 기존 프로젝트에 새 버전을 배포할 수도 있습니다.

With your new project, you'll see a Deploy New Version button. Click this, and fill in the required information about the deployment:

- **Branch:** From GitHub, select the branch of the project that you want to deploy from
- **Commit Hash:** From GitHub, select the specific commit of the version of your SubQuery project codebase that you want deployed
- **IPFS:** If deploying from IPFS, paste you IPFS deployment CID (without the leading `ipfs://`)
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here
- **Indexer Version:**이 SubQuery를 실행하려는 SubQuery의 노드 서비스 버전입니다. See [`@subql/node`](https://www.npmjs.com/package/@subql/node)
- **Query Version:** 이 SubQuery를 실행하려는 SubQuery의 쿼리 서비스 버전입니다. See [`@subql/query`](https://www.npmjs.com/package/@subql/query)

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

## 다음 단계 - 프로젝트 연결하기

배포가 성공적으로 완료되고 노드가 체인에서 데이터를 인덱스화하면 표출된 GraphQL 쿼리 엔드포인트를 통해 프로젝트에 접속할 수 있습니다.

![프로젝트 전개와 동기화](/assets/img/projects-deploy-sync.png)

프로젝트 제목 옆에 있는 3개의 점을 클릭하여 SubQuery 탐색기로 표시할 수도 있습니다. There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../query/query.md).

![SubQuery 탐색기 프로젝트](/assets/img/projects-explorer.png)

## SubQuery 프로젝트에 GitHub 계정 추가하기

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
