# Hello World の説明

[Hello World クイックスタート ガイド](helloworld-localhost.md)では、いくつかの簡単なコマンドを実行し、非常に迅速にサンプルを立ち上げて実行する方法を説明しました。 これにより、すべての前提条件が整っていることを確認し、ローカルのプレイグラウンドを使用して、SubQueryから最初のデータを取得するための簡単なクエリを作成することができたのです。 ここでは、これらのコマンドの意味を詳しく説明します。

## subql init

最初に実行したコマンドは `subql init subqlHelloWorld` です。

これは重い作業を行い、あなたのために必要なファイルを集めます。 [official documentation](quickstart.md#configure-and-build-the-starter-project) にあるように、主に以下のファイルを操作することになります。

- Manifest（`project.yaml`）
- GraphQL Schema（`schema.graphql`）
- Mapping functions（ `src/mappings/` ディレクトリ）

![key subql files](/assets/img/main_subql_files.png)

これらのファイルは私たちが行う全てのコアファイルです。 そのため、これらのファイルについては、別の記事で詳しく説明します。 今のところ、スキーマにはユーザーがSubQuery APIにリクエストできるデータの記述があり、プロジェクトのyamlファイルには「設定」タイプのパラメータ、そしてもちろんmappingHandlersにはデータを変換する関数が含まれるtypescriptがあることだけは知っておいてください。

## yarn install

次に実行するのは`yarn install`です。 `npm install` も使用可能です。

> 歴史を簡単に説明します。 Node Package Manager（npm）は、2010年にリリースされ、JavaScript開発者の間で絶大な人気を誇るパッケージマネージャです。 Node.jsをシステムにインストールする際に、自動的にインストールされるデフォルトのパッケージです。 Yarnは当時、npmで作業する際のパフォーマンスやセキュリティの欠点を解消する目的で、2016年にFacebookがリリースしたものです。

yarnが行うのは、`package.json`ファイルを見て、他の様々な依存関係をダウンロードすることです。 `package.json`ファイルを見ると、あまり依存関係がないように見えますが、コマンドを実行すると、18,983個のファイルが追加されていることに気づきます。 これは、それぞれの依存関係がまた依存関係を持つことになるからです。

![key subql files](/assets/img/dependencies.png)

## yarn codegen

次に `yarn codegen` または `npm run-script codegen` を実行します。 これはGraphQLスキーマ（`schema.graphql`内）を取得し、関連するtypescriptモデルファイルを生成します（したがって出力ファイルの拡張子は.tsになります）。 これらの生成されたファイルは決して変更せず、ソースの `schema.graphql` ファイルのみを変更します。

![key subql files](/assets/img/typescript.png)

## yarn build

`yarn build` または `npm run-script build` が実行します。 これは熟練したプログラマーにとってはよく知られているはずです。 配布フォルダが作成され、デプロイの準備をするコードの最適化などが実行されます。

![key subql files](/assets/img/distribution_folder.png)

## docker-compose

最後は、Dockerコマンド`docker-compose pull && docker-compose up`（別々に実行することも可能）を組み合わせて実行します。 `pull` コマンドは、Docker Hub から必要なすべてのイメージを取得し、 `up` コマンドはコンテナを起動します。

```shell
> docker-compose pull
Pulling postgres        ... done
Pulling subquery-node   ... done
Pulling graphql-engine  ... done
```

コンテナが開始されると、ターミナルはノードの状態とGraphQLエンジンの状態を示す多くのテキストを出力します。 以下のように表示されます：

```
subquery-node_1   | 2021-06-06T02:04:25.490Z <fetch> INFO fetch block [1, 100]
```

SubQueryノードが同期を開始したことがわかります。

## 概要

カバーの下で何が起こっているかについての洞察があったので、問題はここからどこにあるかである。 あなたに自信があれば、<a href="."/create/introduction.md">プロジェクトの作成方法</a>の学習に飛び込んで、3 つの重要なファイルについて詳しく学ぶことができます。 マニフェストファイル、GraphQL スキーマ、およびマッピングファイル。

それ以外の場合は、SubQueryがホストするインフラストラクチャで、この Hello World の例をどのように実行するかを見ていきます。 スタートブロックを変更し、すぐに利用可能なオープンソースプロジェクトを実行することで、SubQueryプロジェクトを実行することにします。
