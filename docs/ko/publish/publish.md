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
- **GitHub 저장 URL:** 이것은 SubQuery 프로젝트가 있는 공개 저장소에 대한 유효한 GitHub URL이어야 합니다. `schema.graphql` 파일은 디렉토리의 루트에 있어야 합니다([디렉토리 구조에 대해 자세히 알아보기](../create/introduction.md#directory-structure)).
- **프로젝트 숨기기:** 선택 시, 공개 SubQuery 익스플로러에서 프로젝트를 숨깁니다. SubQuery 커뮤니티와 공유하려면 이 항목을 선택하지 않은 상태로 유지하십시오! ![Create your first Project](/assets/img/projects-create.png)

프로젝트를 생성하면 SubQuery Project 목록에 프로젝트가 나타납니다. *거의 다 왔어요! 신규 프로젝트를 배포하기만 하면 됩니다.*

![Created Project with no deployment](/assets/img/projects-no-deployment.png)

#### 최초 버전 배포하기

프로젝트를 생성하면 프로젝트의 표시 동작이 설정되지만 반드시 실행 전에 프로젝트를 배포해야 합니다. 버전을 배포하면 새로운 SubQuery 인덱스 작업이 시작되고 GraphQL 요구 수용을 시작하기 위해 필요한 Query 서비스가 설정됩니다. 여기서는 기존 프로젝트에 새로운 버전을 배포할 수도 있습니다.

새로운 프로젝트에서는 새로운 버전 배포 버튼이 나타납니다. 이를 클릭하고 배포에 필요한 정보를 입력합니다:
- **Commit Hash of new Version:** 깃허브에서, 여러분이 전개를 원하는 SubQuery 프로젝트 코드 베이스 버전의 완전 커밋 해시를 복사 합니다.
- **Indexer Version:** 여러분이 SubQuery를 실행하는 SubQuery의 노드 서비스 버전입니다. [`@subql/node`](https://www.npmjs.com/package/@subql/node)를 참고하세요
- **Query Version:** 이 SubQuery를 실행하는 SubQuery query 서비스 버전입니다. [`@subql/query`](https://www.npmjs.com/package/@subql/query)를 참고하세요

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

배포에 성공하면, 인덱스가 동작을 개시하여 현재 체인의 인덱스 작성 진행 상황을 보고할 것입니다. 이 과정이 100% 완료되기까지는 일부 시간이 소요될 수 있습니다.

## 다음 단계 - 프로젝트 연결하기
배포가 성공적으로 완료되고 노드가 체인에서 데이터를 인덱스화하면 표시된 GraphQL Query 엔드포인트를 통해 프로젝트에 접속할 수 있습니다.

![프로젝트 전개와 동기화](/assets/img/projects-deploy-sync.png)

프로젝트 제목 옆에 있는 3개의 점을 클릭하여 SubQuery 탐색기로 표시할 수도 있습니다. There you can use the in-browser playground to get started - [read more about how to user our Explorer here](../query/query.md).

![SubQuery 탐색기 프로젝트](/assets/img/projects-explorer.png)

## SubQuery 프로젝트에 GitHub 계정 추가하기

개인 GitHub 계정이 아닌 GitHub 조직 계정으로 SubQuery 프로젝트를 공개하는 것이 일반적입니다. 언제든지[SubQuery Projects](https://project.subquery.network)에서 계정 스위처를 사용하여 현재 선택된 계정을 변경할 수 있습니다.

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

스위처에서 GitHub 조직 계정이 나타나지 않을 경우, GitHub 조직에 SubQuery 접근을 허용하거나 관리자에게 요청해야 합니다. 그러기 위해서는 먼저 GitHub 계정에서 SubQuery 신청서에 대한 권한을 취소해야 합니다. 이를 수행하려면 깃허브에서 계정 설정에 로그인하고 애플리케이션으로 이동하여 권한부여된 OAuth 앱 탭에서, SubQuery를 비활성화 합니다 - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). ** 걱정하지 마세요, SubQuery 프로젝트는 삭제되지 않고 어떠한 데이터도 잃지 않습니다. **

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
