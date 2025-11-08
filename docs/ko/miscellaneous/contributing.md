# SubQuery에 기여하기

SubQuery 프로젝트에 도움을 주는 여러분을 환영하고 깊은 감사의 말씀을 드립니다. 우리는 함께 보다 탈중화 미래를 위한 길을 마련할 수 있습니다.

::: tip Note This documentation is actively maintained by the SubQuery team. We welcome your contributions. You can do so by forking our GitHub project and making changes to all the documentation markdown files under the `docs` directory. :::

What follows is a set of guidelines (not rules) for contributing to SubQuery. Following these guidelines will help us make the contribution process easy and effective for everyone involved. It also communicates that you agree to respect the time of the developers managing and developing this project. In return, we will reciprocate that respect by addressing your issue, considering changes, collaborating on improvements, and helping you finalise your pull requests.

::: info Contributing to the SubQuery Network There are specific contribution guidelines for the SubQuery Network [here](../subquery_network/community.md#contributing-to-codebases). :::

## 운영 규칙

We take our open source community projects and responsibility seriously and hold ourselves and other contributors to high standards of communication. By participating and contributing to this project, you agree to uphold our [Code of Conduct](https://github.com/subquery/subql/blob/main/CODE_OF_CONDUCT.md).

## 시작하기

Contributions to our repositories are made through Issues and Pull Requests (PRs). A few general guidelines that cover both:

- 본인의 것을 만들기 전에 기존의 Issues 및 PRs를 검색하십시오.
- We work hard to make sure issues are handled in promptly but, depending on the impact, it could take a while to investigate the root cause. 당신의 문제가 막힌 경우, 댓글로 친절하게 @로 제출자 혹은 기여자를 언급하면 보다 쉽게 관심을 끌 수 있습니다.

## 기여 방법

### 버그 신고

Bugs are tracked as GitHub issues. When logging an issue, explain the problem and include additional details to help maintainers reproduce the problem:

- 문제를 식별하기 위해 문제에 대해 명확하고 자세한 제목을 사용합니다.
- 문제를 재현 확인하기 위한 정확한 단계를 설명합니다.
- Describe the behaviour you observed after following the steps.
- Explain which behaviour you expected to see instead and why.
- 가능하다면, 스크린샷을 첨부하세요.

If it is a security issue, please review our documentation on [Vulnerability Reporting](./vulnerability-reporting.md)

### Pull Requests 제출

In general, we follow the "fork-and-pull" Git workflow:

- Fork the repository to your own Github account.
- Clone the project to your machine.
- Create a branch locally with a succinct but descriptive name.
- Commit changes to the branch.
- Following any formatting and testing guidelines specific to this repo.
- Push changes to your fork.
- Open a PR in our repository.

## 코딩 규칙

### Git 커밋 메시지

- Use the present tense ("Add feature" not "Added feature").
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
- Limit the first line to 72 characters or less.

### 자바스크립트 스타일 지침

- All JavaScript code is linted with Prettier and ESLint.
