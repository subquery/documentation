# 여러분의 서브쿼리 프로젝트를 퍼블리싱 하세요

## 서브쿼리를 통한 프로젝트 호스팅의 장점
- 서브쿼리 프로젝트를 고성능, 확장성, 관리성 높은 공공서비스로 실행합니다.
- 이 서비스는 커뮤니티에 무료로 제공되고 있어요!
- 프로젝트를 퍼블리싱하고 [SubQuery Explorer](https://explorer.subquery.network) 에 등록할 수 있으며 누구나 프로젝트를 참조할 수 있습니다.
- 저희는 깃허브과 통합이 되어 있으므로 깃허브에서 누구나 공유된 프로젝트를 볼 수 있습니다.

## 첫번째 프로젝트 생성

#### 서브쿼리 프로젝트에 로그인

시작하기 전, 여러분의 서브쿼리 프로젝트가 깃허브 저장소에 온라인 되어있는지 확인하세요. `schema.graphql` 파일은 반드시 디렉토리에 있어야 합니다.

첫 번째 프로젝트를 생성하려면 [project.subquery.network](https://project.subquery.network)로 이동합니다. 로그인을 하려면 깃허브 계정으로 인증해야 합니다.

최초 로그인 후 SubQuery를 허용하도록 요청됩니다. 여러분의 계정을 식별하기 위해 이메일 주소가 필요하며, 그 외의 다른 깃허브 계정 데이터는 사용하지 않습니다. 이 단계에서 개인 계정 대신에 GitHub 조직에 SubQuery 프로젝트를 게시할 수 있도록 GitHub 조직 계정에 대한 접근 권한을 요청하거나 부여할 수 있습니다.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

SubQuery 프로젝트는 SubQuery 플랫폼에 업로드된 모든 호스팅 프로젝트를 관리하는 곳입니다. 이 어플리케이션을 통해 모든 프로젝트를 생성, 삭제, 업그레이드 할 수 있습니다.

![Projects Login](/assets/img/projects-dashboard.png)

GitHub 조직 계정이 연결되어 있다면 헤더의 switcher를 이용하여 개인 계쩡과 GitHub 계정을 변경할 수 있습니다. GitHub 조직 계정에서 생성된 프로젝트는 해당 GitHub 조직의 구성원 간에 공유됩니다. GitHub 조직 계정을 연결하려면 [여기에 있는 일련의 단계를 따르세요](#add-github-organization-account-to-subquery-projects).

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

#### 첫번째 프로젝트 생성

"프로젝트 생성"을 클릭하여 시작해봅시다. 새 프로젝트 양식으로 이동하게 됩니다. 다음의 항목을 입력해주세요(추후 변경 가능합니다):
- **GitHub 계정:** 다수의 GitHub 계정이 있는 경우, 프로젝트를 생성할 계정을 선택하십시오. GitHub 조직 계정에서 생성한 프로젝트는 조직 구성원 간 공유됩니다.
- **이름**
- **부제목**
- **설명**
- **GitHub Repository URL:** This must be a valid GitHub URL to a public repository that has your SubQuery project. The `schema.graphql` file must be in the root of your directory ([learn more about the directory structure](../create/introduction.md#directory-structure)).
- **프로젝트 숨기기:** 선택 시, 공개 SubQuery 익스플로러에서 프로젝트를 숨깁니다. SubQuery 커뮤니티와 공유하려면 이 항목을 선택하지 않은 상태로 유지하십시오! ![Create your first Project](/assets/img/projects-create.png)

Create your project and you'll see it on your SubQuery Project's list. *We're almost there! We just need to deploy a new version of it. </p>

![Created Project with no deployment](/assets/img/projects-no-deployment.png)

#### 최초 버전 배포하기

While creating a project will setup the display behaviour of the project, you must deploy a version of it before it becomes operational. Deploying a version triggers a new SubQuery indexing operation to start, and sets up the required query service to start accepting GraphQL requests. You can also deploy new versions to existing projects here.

With your new project, you'll see a Deploy New Version button. Click this, and fill in the required information about the deployment:
- **Commit Hash of new Version:** From GitHub, copy the full commit hash of the version of your SubQuery project codebase that you want deployed
- **Indexer Version:** This is the version of SubQuery's node service that you want to run this SubQuery on. See [`@subql/node`](https://www.npmjs.com/package/@subql/node)
- **Query Version:** This is the version of SubQuery's query service that you want to run this SubQuery on. See [`@subql/query`](https://www.npmjs.com/package/@subql/query)

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

## 다음 단계 - 프로젝트 연결하기
Once your deployment has succesfully completed and our nodes have indexed your data from the chain, you'll be able to connect to your project via the displayed GraphQL Query endpoint.

![프로젝트 전개와 동기화](/assets/img/projects-deploy-sync.png)

프로젝트 제목 옆에 있는 3개의 점을 클릭하여 SubQuery 탐색기로 표시할 수도 있습니다. There you can use the in-browser playground to get started - [read more about how to user our Explorer here](../query/query.md).

![SubQuery 탐색기 프로젝트](/assets/img/projects-explorer.png)

## Add GitHub Organization Account to SubQuery Projects

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
