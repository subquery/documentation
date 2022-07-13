# SubQueryへの貢献

このSubQueryプロジェクトへの貢献をご検討いただき、誠にありがとうございます！ 私たちは共に、より分散化された未来への道を切り開くことができます。

> このドキュメントは、SubQuery チームによって頻繁にメンテナンスされています。 GitHubプロジェクトをフォークして、`docs`ディレクトリにあるすべてのドキュメントのマークダウンファイルを変更することで、あなたの貢献を歓迎します。

以下は、SubQueryに貢献するためのガイドライン（ルールではありません）です。 これらのガイドラインに従うことで、関係者全員にとって貢献プロセスを簡単かつ効果的にすることができます。 また、このプロジェクトを管理・開発している開発者の時間を尊重することを伝えるものです。 その見返りとして、私たちはあなたの問題に取り組み、変更を検討し、改善について協力し、あなたのプルリクエストを完成させる手助けをすることで、その敬意に報いることにしています。

## 行動規範

私たちは、オープンソースコミュニティのプロジェクトと責任を真剣に受け止め、自分自身と他の貢献者に高いコミュニケーション基準を課しています。 このプロジェクトに参加し、貢献することにより、あなたは私たちの[行動規範](https://github.com/subquery/subql/blob/contributors-guide/CODE_OF_CONDUCT.md)に同意するものとします。

## はじめに

リポジトリへの貢献は、Issue と Pull Request (PR) によって行われます。 両方をカバーするいくつかの一般的なガイドライン:

* 自分で作成する前に、既存のIssuesやPRを検索してください。
* 迅速な対応に努めていますが、影響によっては原因究明に時間がかかる場合もあります。 あなたの問題がブロックされている場合、コメントスレッドで投稿者や投稿者に友好的に@で言及することで、注意を引くことができます。

## 貢献方法

### バグ報告

バグはGitHub issuesとして追跡されます。 問題を記録するときは内容を説明し、開発者が問題を再現するのに役立つような詳細情報を含めてください。

* 問題を特定するために、明確で説明的なタイトルを使用します。
* 問題を再現するための正確なステップを記述します。
* 手順に従って観察した動作を説明します。
* どの動作を期待するか、またその理由を説明します。
* 可能であればスクリーンショットを含めます。

### プルリクエストを送る

In general, we follow the "fork-and-pull" Git workflow:

* Fork the repository to your own Github account.
* Clone the project to your machine.
* Create a branch locally with a succinct but descriptive name.
* Commit changes to the branch.
* Following any formatting and testing guidelines specific to this repo.
* Push changes to your fork.
* Open a PR in our repository.

## コーディング規約

### コミットメッセージ

* Use the present tense ("Add feature" not "Added feature").
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
* Limit the first line to 72 characters or less.

### JavaScript Styleguide

* All JavaScript code is linted with Prettier and ESLint.
