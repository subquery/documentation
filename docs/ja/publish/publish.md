# SubQuery プロジェクトを公開する

## SubQueryでプロジェクトをホスティングするメリット

- SubQueryプロジェクトを高性能、スケーラブル、かつ管理されたパブリックサービスで実行します。
- このサービスは無料でコミュニティに提供されています！
- [SubQuery Explorer](https://explorer.subquery.network) にリストされ、世界中の誰でもそれらを表示できるようにプロジェクトを公開することができます。
- GitHub と統合されているので、GitHub チーム内の誰でも共有プロジェクトを閲覧することができます。

## SubQuery Projectsで最初のプロジェクトを作成する

### プロジェクトコードベースのホスティング

公開前にSubQueryプロジェクトのコードベースをホストするには、2つの方法があります。

**GitHub**: プロジェクトのコードベースはパブリックGitHubリポジトリになければなりません

**IPFS**: プロジェクトのコードベースは IPFS に保存できます。IPFS ホスティングガイドについては、[IPFSに公開する方法](ipfs.md)を参照してください。

### SubQuery Projectsにログイン

始める前に、SubQueryプロジェクトがGitHubの公開リポジトリでオンラインになっていることを確認してください。 `schema.graphql` ファイルはディレクトリのルートになければなりません。

最初のプロジェクトを作成するには、 [project.subquery.network](https://project.subquery.network) を参照してください。 ログインするにはGitHubアカウントで認証する必要があります。

最初にログインすると、SubQueryを認証するよう求められます。 あなたのメールアドレスを必要とするのは、アカウントを特定するためだけであり、GitHubアカウントの他のデータを他の理由で使用することはありません。 このステップでは、GitHub Organizationアカウントへのアクセスを要求または許可することで、個人アカウントではなくGitHub OrganizationでSubQueryプロジェクトを発行できるようにすることもできます。

![GitHub アカウントからの承認を取り消します](/assets/img/project_auth_request.png)

SubQuery Projectsは、SubQueryプラットフォームにアップロードされたすべてのホストプロジェクトを管理する場所です。 このアプリケーションからすべてのプロジェクトを作成、削除、およびアップグレードすることさえできます。

![プロジェクトにログイン](/assets/img/projects-dashboard.png)

GitHub Organizationのアカウントを接続している場合、ヘッダーの切替ボタンで個人アカウントとGitHub Organizationのアカウントを切り替えることができます。 GitHub Organizationのアカウントで作成されたプロジェクトは、そのGitHub Organizationに所属するメンバー間で共有されます。 GitHub Organization アカウントに接続するには、 [こちらの手順](#add-github-organization-account-to-subquery-projects) に従ってください。

![GitHubアカウントを切り替える](/assets/img/projects-account-switcher.png)

### 最初のプロジェクトを作成します

「プロジェクトを作成」をクリックして始めましょう。 新しいプロジェクトのフォームに移動します。 次の項目を入力してください。（後で変更可能です）:

- **GitHubアカウント:** 複数のGitHubアカウントをお持ちの場合、このプロジェクトをどのアカウントで作成するかを選択してください。 GitHub Organizationのアカウントで作成されたプロジェクトは、そのGitHub Organizationに所属するメンバー間で共有されます。
- **プロジェクト名**
- **サブタイトル**
- **説明**
- **GitHub リポジトリ URL:** これは、あなたのSubQueryプロジェクトがあるパブリックリポジトリへの有効なGitHub URLである必要があります。 `schema.graphql` ファイルは、ディレクトリのルートにある必要があります ([ディレクトリ構造の詳細](../create/introduction.md#directory-structure) を参照してください)。
- **データベース:** プレミアムユーザーは、本番環境の SubQuery プロジェクトをホストする専用データベースにアクセスできます。 興味がある場合は、 [sales@subquery.network](mailto:sales@subquery.network) に連絡して、この設定を有効にすることができます。
- **デプロイメントソース:** GitHub リポジトリからプロジェクトをデプロイするか、IPFS CID からデプロイするかを選択することができます。[IPFSによるホスティング](ipfs.md)を参照してください。
- **プロジェクトを非表示:** 選択すると、公開の SubQuery エクスプローラからプロジェクトを非表示にします。 SubQueryをコミュニティと共有したい場合は、この選択を解除しておいてください。 ![最初のプロジェクトを作成します](/assets/img/projects-create.png)

プロジェクトを作成すると、SubQuery Projectsのリストに表示されます。 _もうすぐです！ 新しいバージョンをデプロイするだけです。_

![デプロイがないプロジェクトを作成](/assets/img/projects-no-deployment.png)

### 最初のプロジェクトをデプロイする

プロジェクトを作成するとプロジェクトの動作が設定されますが、運用を開始する前にそのバージョンをデプロイする必要があります。 バージョンをデプロイすると、新しいSubQueryインデックス作成操作が開始され、必要なクエリーサービスがGraphQLリクエストの受け付けを開始するようセットアップされます。 新しいバージョンを既存のプロジェクトにデプロイすることもできます。

新しいプロジェクトには、「新しいバージョンのデプロイ」ボタンが表示されます。 これをクリックして、デプロイに関する必要な情報を入力してください:

- **ブランチ:** GitHub から、デプロイするプロジェクトのブランチを選択します。
- **コミットハッシュ:** GitHub から、デプロイしたいバージョンの SubQuery プロジェクトのコードベースの特定のコミットを選択します
- **IPFS:** IPFSからデプロイする場合は、IPFSデプロイメントCIDを貼り付けます (先頭の `ipfs://` を除く)
- **ネットワークと辞書のエンドポイントを上書き:** ここでプロジェクトマニフェストのエンドポイントを上書きできます
- **インデクサバージョン:** このSubQueryを実行するノードサービスのバージョンを指定します。 [`@subql/node`](https://www.npmjs.com/package/@subql/node) を参照してください。
- **クエリのバージョン:** このSubQueryを実行するクエリサービスのバージョンを指定します。 [`@subql/query`](https://www.npmjs.com/package/@subql/query) を参照してください。

![最初のプロジェクトをデプロイする](https://static.subquery.network/media/projects/projects-first-deployment.png)

正常にデプロイされるとインデクサが動作を開始し、現在のチェーンのインデックス作成の進捗がわかります。 このプロセスは100%に達するまで時間がかかることがあります。

## 次のステップ - プロジェクトに接続

デプロイが正常に完了し、ノードがチェーンからデータのインデックスを作成したら、表示されたGraphQLクエリエンドポイントからプロジェクトに接続することができるようになります。

![プロジェクトを展開および同期する](/assets/img/projects-deploy-sync.png)

または、プロジェクトのタイトルの横にある3つの点をクリックして、SubQuery Explorer で表示することもできます。 ブラウザ内のプレイグラウンドを使用して始めることができます - [エクスプローラの使い方についてはこちら](../query/query.md) をご覧ください。

![SubQuery Explorer のプロジェクト](/assets/img/projects-explorer.png)

## GitHub Organization アカウントを SubQuery Projects に追加

個人の GitHub アカウントではなく、GitHub Organization アカウントの名前で SubQuery プロジェクトを公開するのが一般的です。 [SubQuery Projects](https://project.subquery.network) で現在選択されているアカウントは、アカウントの切替を使っていつでも変更することができます。

![GitHubアカウントを切り替える](/assets/img/projects-account-switcher.png)

GitHub Organization のアカウントがアカウント切替に表示されていない場合は、GitHub Organization に対して SubQuery へのアクセスを許可する必要があります。（または管理者にリクエストする） これを行うには、まず GitHub アカウントから SubQuery アプリケーションへの権限を取り消す必要があります。 そして、GitHub のアカウント設定にログインし、「Applications」に移動し「Authorized OAuth Apps」タブで SubQuery を取り消します - [正確な手順はこちら](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth)を参照してください。 **ご心配なく、SubQueryプロジェクトは削除されず、データが失われることはありません。**

![GitHubアカウントへのアクセス権を取り消す](/assets/img/project_auth_revoke.png)

アクセス権を取り消したら、 [SubQuery Projects](https://project.subquery.network) からログアウトし、再度ログインしてください。 _Authorize SubQuery_ というタイトルのページにリダイレクトされ、GitHub Organization アカウントへの SubQuery アクセスを要求または許可することができるようになっているはずです。 管理者権限がない場合は、管理者権限を有効にするように要求する必要があります。

![GitHub アカウントからの承認を取り消す](/assets/img/project_auth_request.png)

このリクエストが管理者によって承認されると (あるいは自分で承認すると)、アカウント切替に正しい GitHub Organization アカウントが表示されるようになります。
