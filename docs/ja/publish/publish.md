# SubQuery プロジェクトを公開する

## SubQueryでプロジェクトをホスティングするメリット
- SubQueryプロジェクトを高性能、スケーラブル、かつ管理されたパブリックサービスで実行します。
- このサービスは無料でコミュニティに提供されています！
- [SubQuery Explorer](https://explorer.subquery.network) にリストされ、世界中の誰でもそれらを表示できるようにプロジェクトを公開することができます。
- GitHub と統合されているので、GitHub 組織内の誰でも共有プロジェクトを閲覧することができます。

## 最初のプロジェクトを作成します。

#### SubQuery Projectsにログイン

始める前に、SubQueryプロジェクトがGitHubの公開リポジトリでオンラインになっていることを確認してください。 `schema.graphql` ファイルはディレクトリのルートになければなりません。

最初のプロジェクトを作成するには、 [project.subquery.network](https://project.subquery.network) を参照してください。 ログインするにはGitHubアカウントで認証する必要があります。

最初にログインすると、SubQueryを認証するよう求められます。 あなたのメールアドレスを必要とするのは、アカウントを特定するためだけであり、GitHubアカウントの他のデータを他の理由で使用することはありません。 このステップでは、GitHub Organizationアカウントへのアクセスを要求または許可することで、個人アカウントではなくGitHub OrganizationでSubQueryプロジェクトを発行できるようにすることもできます。

![GitHub アカウントからの承認を取り消します](/assets/img/project_auth_request.png)

SubQuery Projectsは、SubQueryプラットフォームにアップロードされたすべてのホストプロジェクトを管理する場所です。 このアプリケーションからすべてのプロジェクトを作成、削除、およびアップグレードすることさえできます。

![プロジェクトにログイン](/assets/img/projects-dashboard.png)

GitHub Organizationのアカウントを接続している場合、ヘッダーの切替ボタンで個人アカウントとGitHub Organizationのアカウントを切り替えることができます。 GitHub Organizationのアカウントで作成されたプロジェクトは、そのGitHub Organizationに所属するメンバー間で共有されます。 GitHub Organization アカウントに接続するには、 [こちらの手順に従ってください](#add-github-organization-account-to-subquery-projects)。

![GitHubアカウントを切り替える](/assets/img/projects-account-switcher.png)

#### 最初のプロジェクトを作成します。

「プロジェクトを作成」をクリックして始めましょう。 新しいプロジェクトのフォームに移動します。 次の項目を入力してください。（将来的に変更可能です）:
- **GitHubアカウント:** 複数のGitHubアカウントをお持ちの場合、このプロジェクトをどのアカウントで作成するかを選択してください。 GitHub Organizationのアカウントで作成されたプロジェクトは、そのGitHub Organizationに所属するメンバー間で共有されます。
- **名前**
- **サブタイトル**
- **説明**
- **GitHub Repository URL:** これは、あなたのSubQueryプロジェクトがあるパブリックリポジトリへの有効なGitHub URLである必要があります。 `schema.graphql` ファイルは、ディレクトリのルートにある必要があります ([ディレクトリ構造の詳細](../create/introduction.md#directory-structure) を参照してください)。
- **プロジェクトを非表示にする:** 選択すると、公開の SubQuery エクスプローラからプロジェクトを非表示にします。 SubQueryをコミュニティと共有したい場合は、この選択を解除しておいてください。 ![最初のプロジェクトを作成します。](/assets/img/projects-create.png)

プロジェクトを作成すると、SubQuery Projectのリストに表示されます。 *もうすぐです！ 新しいバージョンをデプロイするだけです。*

![デプロイがないプロジェクトを作成](/assets/img/projects-no-deployment.png)

#### 最初のバージョンをデプロイします

プロジェクトを作成するとプロジェクトの動作が設定されますが、運用を開始する前にそのバージョンをデプロイする必要があります。 バージョンをデプロイすると、新しいSubQueryインデックス作成操作が開始され、必要なクエリーサービスがGraphQLリクエストの受け付けを開始するようセットアップされます。 新しいバージョンを既存のプロジェクトにデプロイすることもできます。

新しいプロジェクトには、「新しいバージョンのデプロイ」ボタンが表示されます。 これをクリックして、デプロイに関する必要な情報を入力してください:
- **新しいバージョンのコミットハッシュ：** GitHubから デプロイしたいSubQueryプロジェクトのコードベースのバージョンの完全なコミットハッシュをコピーします
- **インデクサバージョン:** このSubQueryを実行するノードサービスのバージョンを指定します。 [`@subql/node`を参照](https://www.npmjs.com/package/@subql/node)
- **クエリのバージョン:** SubQueryのクエリサービスのバージョンで、このSubQueryを実行します。 [`@subql/query`を参照](https://www.npmjs.com/package/@subql/query)

![最初のプロジェクトをデプロイする](https://static.subquery.network/media/projects/projects-first-deployment.png)

正常にデプロイされると、インデクサが動作を開始し、現在のチェーンのインデックス作成の進捗を報告されるのがわかります。 このプロセスは100%に達するまで時間がかかることがあります。

## 次のステップ - プロジェクトに接続
デプロイが正常に完了し、ノードがチェーンからデータのインデックスを作成したら、表示されたGraphQLクエリエンドポイントからプロジェクトに接続することができるようになります。

![プロジェクトを展開および同期する](/assets/img/projects-deploy-sync.png)

または、プロジェクトのタイトルの横にある3つの点をクリックして、SubQuery Explorer で表示することもできます。 ブラウザ内のプレイグラウンドを使用して始めることができます - [Explorerの使い方についてはこちら](../query/query.md) をご覧ください。

![SubQuery Explorer のプロジェクト](/assets/img/projects-explorer.png)

## GitHub Organization アカウントを SubQuery Projects に追加

個人の GitHub アカウントではなく、GitHub Organization アカウントの名前で SubQuery プロジェクトを公開するのが一般的です。 アカウントの切替を使用して、 [SubQuery Projects](https://project.subquery.network) で現在選択されているアカウントを変更することができます。

![GitHubアカウントを切り替える](/assets/img/projects-account-switcher.png)

GitHub Organization のアカウントがアカウント切替に表示されていない場合は、GitHub Organization に対して SubQuery へのアクセスを許可する必要があります。（または管理者にリクエストする） これを行うには、まず GitHub アカウントから SubQuery アプリケーションへの権限を取り消す必要があります。 これを行うには、GitHub のアカウント設定にログインし、「Applications」に移動し「Authorized OAuth Apps」タブで SubQuery を取り消します - [正確な手順はこちら](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth)を参照してください。 **ご心配なく、SubQueryプロジェクトは削除されず、データが失われることはありません。**

![GitHubアカウントへのアクセスを取り消す](/assets/img/project_auth_revoke.png)

アクセスを取り消したら、 [SubQuery Projects](https://project.subquery.network) からログアウトし、再度ログインしてください。 *Authorize SubQuery* というタイトルのページにリダイレクトされ、GitHub Organization アカウントからSubQueryへのアクセスを要求または許可することができるはずです。 管理者権限がない場合は、管理者権限を有効にするように要求する必要があります。

![GitHub アカウントからの承認を取り消します](/assets/img/project_auth_request.png)

このリクエストが管理者によって承認されると (あるいは自分で承認すると)、アカウント切替に正しい GitHub Organization アカウントが表示されるようになります。
