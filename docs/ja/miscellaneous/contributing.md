# SubQueryへの貢献

このSubQueryプロジェクトへの貢献をご検討いただき、誠にありがとうございます！ 私たちは共に、より分散化された未来への道を切り開くことができます。

::: tip Note This documentation is actively maintained by the SubQuery team. We welcome your contributions. You can do so by forking our GitHub project and making changes to all the documentation markdown files under the `docs` directory. :::

What follows is a set of guidelines (not rules) for contributing to SubQuery. Following these guidelines will help us make the contribution process easy and effective for everyone involved. It also communicates that you agree to respect the time of the developers managing and developing this project. In return, we will reciprocate that respect by addressing your issue, considering changes, collaborating on improvements, and helping you finalise your pull requests.

::: info Contributing to the SubQuery Network There are specific contribution guidelines for the SubQuery Network [here](../subquery_network/community.md#contributing-to-codebases). :::

## 行動規範

We take our open source community projects and responsibility seriously and hold ourselves and other contributors to high standards of communication. By participating and contributing to this project, you agree to uphold our [Code of Conduct](https://github.com/subquery/subql/blob/main/CODE_OF_CONDUCT.md).

## はじめに

Contributions to our repositories are made through Issues and Pull Requests (PRs). A few general guidelines that cover both:

- 自分で作成する前に、既存のIssuesやPRを検索してください。
- We work hard to make sure issues are handled in promptly but, depending on the impact, it could take a while to investigate the root cause. あなたの問題がブロックされている場合、コメントスレッドで投稿者や投稿者に友好的に@で言及することで、注意を引くことができます。

## 貢献方法

### バグ報告

Bugs are tracked as GitHub issues. When logging an issue, explain the problem and include additional details to help maintainers reproduce the problem:

- 問題を特定するために、明確で説明的なタイトルを使用します。
- 問題を再現するための正確なステップを記述します。
- Describe the behaviour you observed after following the steps.
- Explain which behaviour you expected to see instead and why.
- 可能であればスクリーンショットを含めます。

If it is a security issue, please review our documentation on [Vulnerability Reporting](./vulnerability-reporting.md)

### プルリクエストを送る

In general, we follow the "fork-and-pull" Git workflow:

- Fork the repository to your own Github account.
- Clone the project to your machine.
- Create a branch locally with a succinct but descriptive name.
- Commit changes to the branch.
- Following any formatting and testing guidelines specific to this repo.
- Push changes to your fork.
- Open a PR in our repository.

## コーディング規約

### コミットメッセージ

- Use the present tense ("Add feature" not "Added feature").
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
- Limit the first line to 72 characters or less.

### JavaScript Styleguide

- All JavaScript code is linted with Prettier and ESLint.
