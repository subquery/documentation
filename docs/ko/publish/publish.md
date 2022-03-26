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

첫 번째 프로젝트를 만들려면 [project.subquery.network](https://project.subquery.network)로 이동하세요. 로그인하려면 GitHub 계정으로 인증해야 합니다.

처음 로그인하면 SubQuery를 인증하라는 메시지가 표시됩니다. 계정을 식별하는 데만 이메일 주소가 필요하며 다른 이유로 GitHub 계정의 다른 데이터는 사용하지 않습니다. 이 단계에서 개인 계정 대신 GitHub 조직에 SubQuery 프로젝트를 게시할 수 있도록 GitHub 조직 계정에 대한 액세스 권한을 요청하거나 부여할 수도 있습니다.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

SubQuery 프로젝트는 SubQuery 플랫폼에 업로드된 모든 호스팅 프로젝트를 관리하는 곳입니다. 이 응용 프로그램에서 모든 프로젝트를 생성, 삭제 및 업그레이드할 수 있습니다.

![Projects Login](/assets/img/projects-dashboard.png)

GitHub 조직 계정이 연결된 경우 헤더의 스위처를 사용하여 개인 계정과 GitHub 조직 계정 간에 변경할 수 있습니다. GitHub 조직 계정에서 생성된 프로젝트는 해당 GitHub 조직의 구성원 간에 공유됩니다. GitHub 조직 계정을 연결하려면 [여기의 단계를 따르세요](#add-github-organization-account-to-subquery-projects).

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

### 첫 번째 프로젝트 만들기

"프로젝트 만들기"를 클릭하여 시작하겠습니다. 새 프로젝트 양식으로 이동합니다. 다음을 입력하십시오(나중에 변경할 수 있음).

- **GitHub 계정:** 다수의 GitHub 계정이 있는 경우, 프로젝트를 생성할 계정을 선택하십시오. GitHub 조직 계정에서 생성한 프로젝트는 조직 구성원 간 공유됩니다.
- **프로젝트 이름**
- **부제목**
- **설명**
- **GitHub 저장 URL:** 이것은 SubQuery 프로젝트가 있는 공개 저장소에 대한 유효한 GitHub URL이어야 합니다. `schema.graphql` 파일은 디렉토리의 루트에 있어야 합니다([디렉토리 구조에 대해 자세히 알아보기](../create/introduction.md#directory-structure)).
- **데이터베이스:** 프리미엄 고객은 프로덕션 SubQuery 프로젝트를 호스팅하기 위한 전용 데이터베이스에 액세스할 수 있습니다. 관심이 있는 경우 [sales@subquery.network](mailto:sales@subquery.network)에 연락하여 이 설정을 활성화할 수 있습니다.
- **배포 소스:** GitHub 리포지토리에서 프로젝트를 배포하거나 IPFS CID에서 배포하도록 선택할 수 있습니다. [IPFS를 사용한 호스팅](ipfs.md)에 대한 가이드를 참조하세요.
- **Hide project:**선택하면, 공개 SubQuery 탐색기에서 프로젝트를 숨깁니다. 커뮤니티와 SubQuery를 공유하려면 이 항목을 선택하지 않은 상태로 유지하십시오! ![Create your first Project](/assets/img/projects-create.png)

프로젝트를 생성하면 SubQuery 프로젝트 목록에 표시됩니다. _거의 다 왔어! 새 버전을 배포하기만 하면 됩니다._

![Created Project with no deployment](/assets/img/projects-no-deployment.png)

### 첫 번째 버전 배포

프로젝트를 생성하면 프로젝트의 표시 동작이 설정되지만 작동하려면 해당 버전을 배포해야 합니다. 버전을 배포하면 새로운 SubQuery 인덱싱 작업이 시작되고 필요한 쿼리 서비스가 GraphQL 요청 수락을 시작하도록 설정됩니다. 여기에서 기존 프로젝트에 새 버전을 배포할 수도 있습니다.

새 프로젝트에 새 버전 배포 버튼이 표시됩니다. 이를 클릭하고 배포에 대한 필수 정보를 입력합니다.

- **분기:** GitHub에서 배포하려는 프로젝트의 분기를 선택합니다.
- **해시 커밋:** GitHub에서 배포하려는 SubQuery 프로젝트 코드베이스 버전의 특정 커밋을 선택합니다.
- **IPFS:** IPFS에서 배포하는 경우 IPFS 배포 CID를 붙여넣습니다(앞에 `ipfs://` 제외).
- **네트워크 및 사전 끝점 재정의:** 여기에서 프로젝트 매니페스트의 끝점을 재정의할 수 있습니다.
- **Indexer Version:**이 SubQuery를 실행하려는 SubQuery의 노드 서비스 버전입니다. [`@subql/node`](https://www.npmjs.com/package/@subql/node)를 보세요.
- **Query Version:** 이 SubQuery를 실행하려는 SubQuery의 쿼리 서비스 버전입니다. [`@subql/query`](https://www.npmjs.com/package/@subql/query)를 보세요.

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

성공적으로 배포되면 인덱서가 작동하기 시작하고 현재 체인 인덱싱 진행 상황을 보고하게 됩니다. 이 프로세스는 100%에 도달할 때까지 시간이 걸릴 수 있습니다.

## 다음 단계 - 프로젝트 연결하기

배포가 성공적으로 완료되고 노드가 체인에서 데이터를 인덱스화하면 표출된 GraphQL 쿼리 엔드포인트를 통해 프로젝트에 접속할 수 있습니다.

![프로젝트 전개와 동기화](/assets/img/projects-deploy-sync.png)

프로젝트 제목 옆에 있는 3개의 점을 클릭하여 SubQuery 탐색기로 표시할 수도 있습니다. 여기에서 브라우저 내 플레이그라운드를 사용하여 시작할 수 있습니다. [여기에서 Explorer 사용 방법에 대해 자세히 알아보세요](../query/query.md).

![SubQuery 탐색기 프로젝트](/assets/img/projects-explorer.png)

## SubQuery 프로젝트에 GitHub 계정 추가하기

개인 GitHub 계정이 아닌 GitHub 조직 계정 이름으로 SubQuery 프로젝트를 게시하는 것이 일반적입니다. 언제든지 계정 전환기를 사용하여 [SubQuery 프로젝트](https://project.subquery.network)에서 현재 선택한 계정을 변경할 수 있습니다.

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

스위처에 GitHub 조직 계정이 표시되지 않으면 GitHub 조직에 대한 SubQuery에 대한 액세스 권한을 부여해야 할 수 있습니다(또는 관리자에게 요청). 이렇게 하려면 먼저 GitHub 계정에서 SubQuery 애플리케이션에 대한 권한을 취소해야 합니다. 이렇게 하려면 GitHub의 계정 설정에 로그인하고 애플리케이션으로 이동한 다음 Authorized OAuth Apps 탭에서 SubQuery를 취소합니다. [여기에서 정확한 단계를 따를 수 있습니다](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **걱정하지 마세요. 이렇게 하면 SubQuery 프로젝트가 삭제되지 않으며 데이터가 손실되지 않습니다.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

액세스 권한을 취소했으면 [SubQuery 프로젝트](https://project.subquery.network)에서 로그아웃했다가 다시 로그인하십시오. GitHub 조직 계정에 대한 액세스 권한을 요청하거나 부여할 수 있는 _Authorize SubQuery_ 페이지로 리디렉션되어야 합니다. 관리자 권한이 없는 경우 관리자에게 이를 활성화하도록 요청해야 합니다.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
