# SubQuery プロジェクトを公開する

## SubQueryでプロジェクトをホスティングするメリット

- We'll run your SubQuery projects for you in a high performance, scalable, and managed public service.
- このサービスは無料でコミュニティに提供されています！
- You can make your projects public so that they'll be listed in the [SubQuery Explorer](https://explorer.subquery.network) and anyone around the world can view them.
- We're integrated with GitHub, so anyone in your GitHub organisations will be able to view shared organisation projects.

## SubQuery Projectsで最初のプロジェクトを作成する

### プロジェクトコードベースのホスティング

公開前にSubQueryプロジェクトのコードベースをホストするには、2つの方法があります。

**GitHub**: Your project's codebase must be in a public GitHub repository.

**IPFS**: Your project's codebase can be stored in IPFS, you can follow our IPFS hosting guide to see how to [first publish to IPFS](ipfs.md).

### SubQuery Projectsにログイン

始める前に、SubQueryプロジェクトがGitHubの公開リポジトリでオンラインになっていることを確認してください。 `schema.graphql` ファイルはディレクトリのルートになければなりません。

To create your first project, head to [SubQuery Projects](https://project.subquery.network). ログインするにはGitHubアカウントで認証する必要があります。

最初にログインすると、SubQueryを認証するよう求められます。 あなたのメールアドレスを必要とするのは、アカウントを特定するためだけであり、GitHubアカウントの他のデータを他の理由で使用することはありません。 このステップでは、GitHub Organizationアカウントへのアクセスを要求または許可することで、個人アカウントではなくGitHub OrganizationでSubQueryプロジェクトを発行できるようにすることもできます。

![GitHub アカウントからの承認を取り消します](/assets/img/project_auth_request.png)

SubQuery Projectsは、SubQueryプラットフォームにアップロードされたすべてのホストプロジェクトを管理する場所です。 このアプリケーションからすべてのプロジェクトを作成、削除、およびアップグレードすることさえできます。

![プロジェクトにログイン](/assets/img/projects-dashboard.png)

GitHub Organizationのアカウントを接続している場合、ヘッダーの切替ボタンで個人アカウントとGitHub Organizationのアカウントを切り替えることができます。 GitHub Organizationのアカウントで作成されたプロジェクトは、そのGitHub Organizationに所属するメンバー間で共有されます。 GitHub Organization アカウントに接続するには、 [こちらの手順](#add-github-organization-account-to-subquery-projects) に従ってください。

![GitHubアカウントを切り替える](/assets/img/projects-account-switcher.png)

### 最初のプロジェクトを作成します

There are two methods to create a project in the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

#### Using the UI

Let's start by clicking on "Create Project". You'll be taken to the New Project form. Please enter the following (you can change this in the future):

- **GitHubアカウント:** 複数のGitHubアカウントをお持ちの場合、このプロジェクトをどのアカウントで作成するかを選択してください。 GitHub Organizationのアカウントで作成されたプロジェクトは、そのGitHub Organizationに所属するメンバー間で共有されます。
- **プロジェクト名**
- **サブタイトル**
- **説明**
- **GitHub リポジトリ URL:** これは、あなたのSubQueryプロジェクトがあるパブリックリポジトリへの有効なGitHub URLである必要があります。 The `schema.graphql` file must be in the root of your directory ([learn more about the directory structure](../build/introduction.md#directory-structure)).
- **データベース:** プレミアムユーザーは、本番環境の SubQuery プロジェクトをホストする専用データベースにアクセスできます。 興味がある場合は、 [sales@subquery.network](mailto:sales@subquery.network) に連絡して、この設定を有効にすることができます。
- **デプロイメントソース:** GitHub リポジトリからプロジェクトをデプロイするか、IPFS CID からデプロイするかを選択することができます。[IPFSによるホスティング](ipfs.md)を参照してください。
- **プロジェクトを非表示:** 選択すると、公開の SubQuery エクスプローラからプロジェクトを非表示にします。 SubQueryをコミュニティと共有したい場合は、この選択を解除しておいてください。 ![最初のプロジェクトを作成します](/assets/img/projects-create.png)

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

- **Branch:** From GitHub, select the branch of the project that you want to deploy from.
- **Commit Hash:** From GitHub, select the specific commit of the version of your SubQuery project codebase that you want deployed.
- **IPFS:** If deploying from IPFS, paste you IPFS deployment CID (without the leading `ipfs://`).
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here.
- **Indexer Version:** This is the version of SubQuery's node service that you want to run this SubQuery on. See [`@subql/node`](https://www.npmjs.com/package/@subql/node).
- **Query Version:** This is the version of SubQuery's query service that you want to run this SubQuery on. See [`@subql/query`](https://www.npmjs.com/package/@subql/query).

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

## 次のステップ - プロジェクトに接続

デプロイが正常に完了し、ノードがチェーンからデータのインデックスを作成したら、表示されたGraphQLクエリエンドポイントからプロジェクトに接続することができるようになります。

![プロジェクトを展開および同期する](/assets/img/projects-deploy-sync.png)

または、プロジェクトのタイトルの横にある3つの点をクリックして、SubQuery Explorer で表示することもできます。 There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![Projects in SubQuery Explorer](/assets/img/projects-explorer.png)

## GitHub Organization アカウントを SubQuery Projects に追加

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![GitHubアカウントを切り替える](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![GitHub アカウントからの承認を取り消します](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
