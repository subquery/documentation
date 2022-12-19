# Hello World の説明

[Hello World クイックスタート ガイド](helloworld-localhost.md)では、いくつかの簡単なコマンドを実行し、非常に迅速にプロジェクトを立ち上げて実行する方法を説明しました。 これにより、すべての前提条件が整っていることを確認し、ローカルのプレイグラウンドを使用して、SubQuery から最初のデータを取得するための簡単なクエリを作成することができたのです。 ここでは、これらのコマンドの意味を詳しく説明します。

## subql init

最初に実行したコマンドは `subql init subqlHelloWorld` です。

これは重い作業を行い、あなたのために必要なファイルを集めます。 [official documentation](quickstart-polkadot.md#configure-and-build-the-starter-project) にあるように、主に以下のファイルを操作することになります。

- Manifest（`project.yaml`）
- GraphQL Schema（`schema.graphql`）
- Mapping functions（ `src/mappings/` ディレクトリ）

![key subql files](/assets/img/main_subql_files.png)

これらのファイルは私たちが行う全てのコアファイルです。 そのため、これらのファイルについては、別の記事で詳しく説明します。 今のところ、スキーマにはユーザーが SubQuery API にリクエストできるデータの記述があり、プロジェクトの yaml ファイルには「設定」タイプのパラメータ、そしてもちろん mappingHandlers にはデータを変換する関数が含まれる typescript があることだけは知っておいてください。

## yarn install

次に実行するのは`yarn install`です。 `npm install` も使用可能です。

> 歴史を簡単に説明します。 Node Package Manager（npm）は、2010 年にリリースされ、JavaScript 開発者の間で絶大な人気を誇るパッケージマネージャです。 Node.js をシステムにインストールする際に、自動的にインストールされるデフォルトのパッケージです。 Yarn は当時、npm で作業する際のパフォーマンスやセキュリティの欠点を解消する目的で、2016 年に Facebook がリリースしたものです。

yarn が行うのは、`package.json`ファイルを見て、他の様々な依存関係をダウンロードすることです。 `package.json`ファイルを見ると、あまり依存関係がないように見えますが、コマンドを実行すると、18,983 個のファイルが追加されていることに気づきます。 これは、それぞれの依存関係がまた依存関係を持つことになるからです。

![key subql files](/assets/img/dependencies.png)

## yarn codegen

次に `yarn codegen` または `npm run-script codegen` を実行します。 これは GraphQL スキーマ（`schema.graphql`内）を取得し、関連する typescript モデルファイルを生成します（したがって出力ファイルの拡張子は.ts になります）。 これらの生成されたファイルは決して変更せず、ソースの `schema.graphql` ファイルのみを変更します。

![key subql files](/assets/img/typescript.png)

## yarn build

`yarn build` または `npm run-script build` が実行します。 これは熟練したプログラマーにとってはよく知られているはずです。 配布フォルダが作成され、デプロイの準備をするコードの最適化などが実行されます。

![key subql files](/assets/img/distribution_folder.png)

## docker-compose

最後は、Docker コマンド`docker-compose pull && docker-compose up`（別々に実行することも可能）を組み合わせて実行します。 `pull` コマンドは、Docker Hub から必要なすべてのイメージを取得し、 `up` コマンドはコンテナを起動します。

```shell
> docker-compose pull
Pulling postgres        ... done
Pulling subquery-node   ... done
Pulling graphql-engine  ... done
```

コンテナが開始されると、ターミナルはノードの状態と GraphQL エンジンの状態を示す多くのテキストを出力します。 以下のように表示されます：

```
subquery-node_1   | 2021-06-06T02:04:25.490Z <fetch> INFO fetch block [1, 100]
```

SubQuery ノードが同期を開始したことがわかります。

## 概要

さて、カバーの中で何が起きているのかがわかったところで、問題はここから先です。 あなたに自信があれば、[プロジェクトの作成方法](../quickstart/quickstart.md)の学習に飛び込んで、3 つの重要なファイルについて詳しく学ぶことができます。 マニフェストファイル、GraphQL スキーマ、およびマッピングファイル。

それ以外の場合は、SubQuery がホストするインフラストラクチャで、この Hello World の例をどのように実行するかを見ていきます。 スタートブロックを変更し、すぐに利用可能なオープンソースプロジェクトを実行することで、SubQuery プロジェクトを実行することにします。
