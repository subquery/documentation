# Hello World (SubQuery ホスティング)

このクイックスタートの目的は、SubQuery Projects（マネージドサービス）でデフォルトのスタータープロジェクトを実行する方法を、いくつかの簡単な手順で紹介することです。

簡単なスタータープロジェクト(およびこれまでに学んだことすべて)を取り上げますが、Docker 内でローカルに実行するのではありません。 SubQuery のマネージドホスティングインフラストラクチャを活用します。 つまり、本番インフラの運用・管理という重い仕事をすべて SubQuery に任せているのです。

## 学習のねらい

このクイックスタートが終了した時点で、あなたは次のことが出来るようになります。

- 必要な前提条件を理解すること
- [SubQuery Managed Service](https://managedservice.subquery.network/) でプロジェクトをホストすること
- プレイグラウンドを使用して、Polkadot メインネットのブロックの高さを取得するための簡単なクエリを実行すること
- cURL を使用して Polkadot メインネットのブロックの高さを取得するために簡単な GET クエリを実行すること

## 対象者

このガイドは、開発経験があり、SubQuery についてもっと学ぶことに興味がある新規開発者を対象としています。

## ビデオガイド

<br/>
<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/b-ba8-zPOoo" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## 前提条件

必要なもの

- GitHub アカウント

## 1. プロジェクトを作成する

`subql init`を実行し、`Polkadot`ネットワークでプロジェクトを構築し、`subql-starter`テンプレートでプロジェクトを初期化することを選択して、subqlHelloWorld というプロジェクトを作成しましょう。 お決まりのインストール、コード生成、ビルドをお気に入りのパッケージマネージャで実行する必要があります。

```shell
> subql init subqlHelloWorld
yarn install
yarn codegen
yarn build
```

docker コマンドを実行しないでください。

## 2. GitHub リポジトリを作成する

GitHub で、新しいパブリックリポジトリを作成します。 名前を入力し、公開に設定します。 ここでは、とりあえずすべてをデフォルトのままにしています。

![GitHub リポジトリを作成](/assets/img/github_create_new_repo.png)

GitHub URL に注意してください。SubQuery にアクセスするには、これを公開する必要があります。

![GitHub リポジトリを作成](/assets/img/github_repo_url.png)

## 3. GitHub にプッシュする

プロジェクトディレクトリに戻り、git ディレクトリとして初期化します。 そうでなければ、"fatal: not a git repository (or any of the parent directories): .git" というエラーが表示されるかもしれません。

```shell
git init
```

次のコマンドでリモートリポジトリを追加します。

```shell
git remote add origin https://github.com/seandotau/subqlHelloWorld.git
```

これは基本的にあなたのリモートリポジトリを「https://github.com/seandotau/subqlHelloWorld.git」に設定し、GitHubのリモートリポジトリの標準名称である「origin」という名前を付けます。

次に、以下のコマンドでリポジトリにコードを追加します。

```shell
> git add .
> git commit -m "First commit"
[master (root-commit) a999d88] First commit
10 files changed, 3512 insertions(+)
create mode 100644 .gitignore
create mode 100644 README.md
create mode 100644 docker-compose.yml
create mode 100644 package.json
create mode 100644 project.yaml
create mode 100644 schema.graphql
create mode 100644 src/index.ts
create mode 100644 src/mappings/mappingHandlers.ts
create mode 100644 tsconfig.json
create mode 100644 yarn.lock
> git push origin master
Enumerating objects: 14, done.
Counting objects: 100% (14/14), done.
Delta compression using up to 12 threads
Compressing objects: 100% (13/13), done.
Writing objects: 100% (14/14), 59.35 KiB | 8.48 MiB/s, done.
Total 14 (delta 0), reused 0 (delta 0)
To https://github.com/seandotau/subqlHelloWorld.git
 * [new branch]      master -> master

```

push コマンドは、「マスターローカルリポジトリからコードを元リポジトリにプッシュしてください」という意味です。 更新すると GitHub にすべてのコードが表示されます。

![最初のコミット](/assets/img/first_commit.png)

コードが GitHub に組み込まれたので、SubQuery Projects でどのようにホストできるかを見てみましょう。

## 4. プロジェクトを作成する

[https://managedservice.subquery.network](https://managedservice.subquery.network) に移動し、GitHub アカウントでログインします。

![SubQuery Projectsにようこそ](/assets/img/welcome_to_subquery_projects.png)

プロジェクトを新規作成

![SubQuery Projectsにようこそ](/assets/img/subquery_create_project.png)

そして、さまざまなフィールドに適切な内容を記入してください。

- **GitHub アカウント:** 複数の GitHub アカウントをお持ちの場合、このプロジェクトをどのアカウントで作成するかを選択してください。 GitHub Organization のアカウントで作成されたプロジェクトは、その GitHub Organization に所属するメンバー間で共有されます。
- **プロジェクト名:** プロジェクトに名前を付けます。
- **サブタイトル：**プロジェクトのサブタイトルを記入します。
- **説明:** SubQuery プロジェクトが何をしているかを説明します。
- **GitHub リポジトリ URL:** これは、あなたの SubQuery プロジェクトがあるパブリックリポジトリへの有効な GitHub URL である必要があります。 schema.graphql ファイルはディレクトリのルートになければなりません。
- **プロジェクトを非表示にする:** 選択すると、公開の SubQuery Explorer からプロジェクトを非表示にします。 SubQuery をコミュニティと共有したい場合は、この選択を解除しておいてください。

![SubQueryパラメータを作成](/assets/img/create_subquery_project_parameters.png)

作成をクリックすると、ダッシュボードが表示されます。

![SubQuery Project ダッシュボード](/assets/img/subquery_project_dashboard.png)

ダッシュボードには、使用しているネットワーク、実行中のソースコードの GitHub リポジトリ URL、作成日と最終更新日、そして特にデプロイの詳細など、多くの有用な情報が含まれています。

## 5. プロジェクトをデプロイする

SubQuery Projects にプロジェクトを作成し、表示動作を設定したところで、次のステップでは、プロジェクトをデプロイして動作させることになります。 バージョンをデプロイすると、新しい SubQuery インデックス作成操作が開始され、必要なクエリーサービスが GraphQL リクエストの受け付けを開始するようセットアップされます。 新しいバージョンを既存のプロジェクトにデプロイすることもできます。

本番スロットやステージングスロットなど、さまざまな環境へのデプロイを選択することができます。 ここでは、本番スロットにデプロイします。 「デプロイ」ボタンをクリックすると、以下のフィールドが表示されます。

![本番スロットにデプロイ](/assets/img/deploy_production_slot.png)

- **新バージョンのコミットハッシュ:** GitHub から、デプロイしたい SubQuery プロジェクトのコードベースの正しいコミットを選択します。
- **インデクサバージョン:** この SubQuery を実行するノードサービスのバージョンを指定します。 [@subql/node](https://www.npmjs.com/package/@subql/node)を参照
- **クエリのバージョン:** SubQuery のクエリサービスのバージョンで、この SubQuery を実行します。 [@subql/query](https://www.npmjs.com/package/@subql/query)を参照

コミットは 1 つだけなので、ドロップダウンには 1 つのオプションしかありません。 また、インデクサとクエリバージョンの最新バージョンでも動作しますので、デフォルトを受け入れて「更新をデプロイ」をクリックします。

すると、デプロイのステータスが「処理中」になっていることが確認できます。 ここでは、SubQuery のマネージドインフラストラクチャにコードがデプロイされます。 基本的にサーバーはオンデマンドで起動され、あなたのためにプロビジョニングされます。 数分かかるので、コーヒーでも飲んでください。

![デプロイ処理](/assets/img/deployment_processing.png)

デプロイが実行されました。

![デプロイを実行](/assets/img/deployment_running.png)

## 6. プロジェクトのテスト

プロジェクトをテストするには、3 つの楕円をクリックし、"SubQuery Explorer の表示 "を選択します。

![Subqueryプロジェクトを表示](/assets/img/view_on_subquery.png)

プレイボタンをクリックすると、おなじみの「プレイグラウンド」が表示され、クエリーの結果を見ることができます。

![Subqueryのプレイグラウンド](/assets/img/subquery_playground.png)

## 7. ボーナスステップ

鋭い方なら、学習目標の最後のポイントは単純な GET クエリを実行することであることを思い出すでしょう。 これを行うには、デプロイメントの詳細に表示される「クエリーエンドポイント」を取得する必要があります。

![クエリの終了](/assets/img/query_endpoint.png)

そして、[Postman](https://www.postman.com/)や[Mockoon](https://mockoon.com/)のようなお気に入りのクライアントを使うか、ターミナルで cURL を使ってこのエンドポイントに GET リクエストを送ることができます。 簡略化のため、cURL を以下に示します。

実行する curl コマンドは次のとおりです。

```shell
curl https://api.subquery.network/sq/seandotau/subqueryhelloworld -d "query=query { starterEntities (first: 5, orderBy: CREATED_AT_DESC) { totalCount nodes { id field1 field2 field3 } } }"
```

次のような結果をもたらします

```shell
{"data":{"starterEntities":{"totalCount":23098,"nodes":[{"id":"0x29dfe9c8e5a1d51178565c2c23f65d249b548fe75a9b6d74cebab777b961b1a6","field1":23098,"field2":null,"field3":null},{"id":"0xab7d3e0316a01cdaf9eda420cf4021dd53bb604c29c5136fef17088c8d9233fb","field1":23097,"field2":null,"field3":null},{"id":"0x534e89bbae0857f2f07b0dea8dc42a933f9eb2d95f7464bf361d766a644d17e3","field1":23096,"field2":null,"field3":null},{"id":"0xd0af03ab2000a58b40abfb96a61d312a494069de3670b509454bd06157357db6","field1":23095,"field2":null,"field3":null},{"id":"0xc9f5a92f4684eb039e11dffa4b8b22c428272b2aa09aff291169f71c1ba0b0f7","field1":23094,"field2":null,"field3":null}]}}}

```

おそらく、この JSON レスポンスを取得、解析するフロントエンドのコードがあるため、可読性はここでは考慮されません。

## 概要

この Subquery でホストされたクイックスタートでは、Subql プロジェクトを使用して、すべてのインフラストラクチャが提供される [SubQuery Managed Service](https://managedservice.subquery.network) にデプロイするのがいかに迅速かつ簡単かを示しました。 様々なクエリを実行するためのプレイグラウンドが内蔵されており、また、あなたのコードと統合するための API エンドポイントも用意されています。
