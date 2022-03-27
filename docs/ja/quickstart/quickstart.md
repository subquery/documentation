# クイックスタートガイド

このクイックスタートガイドでは、独自の SubQuery プロジェクトを開発するためのフレームワークとして使用できる、簡単なプロジェクトを作成します。

このガイドの最後には、SubQuery ノード上で動作する SubQuery プロジェクトを作成し、GraphQL エンドポイントからデータを照会できるようになります。

まだの方は、SubQuery で使われている[用語](../#terminology)に慣れることをお勧めします。

## 準備

### ローカル開発環境

- [Typescript](https://www.typescriptlang.org/)は、プロジェクトのコンパイルや型の定義に必要です。
- SubQuery CLI と生成されたプロジェクトの両方が依存関係を持ち、最新バージョンの[Node](https://nodejs.org/en/)を必要とします。
- SubQuery Nodes には Docker が必要です

### SubQuery CLI をインストールする

NPM を使用して、SubQuery CLI を端末にインストールします。

```shell
# NPM
npm install -g @subql/cli
```

なお、`yarn global` の使用は、依存関係の管理が不十分であるため、**推奨しない** ことになり、将来的にエラーを引き起こす可能性があることに注意してください。

ヘルプを実行すると、CLI で利用可能なコマンドと使用方法が表示されます。

```shell
subql help
```

## SubQuery プロジェクトを初期化する

SubQuery プロジェクトを作成したいディレクトリの中で、`PROJECT_NAME`を自分のものに置き換えて、コマンドを実行するだけです。

```shell
subql init PROJECT_NAME
```

SubQuery プロジェクトが始動すると、特定の質問が表示されます。

- Network: このSubQueryプロジェクトがインデックスを作成するために開発するブロックチェーンネットワーク
- Template: 開発を開始するための開始点となるSubQueryプロジェクトのテンプレートを選択します。
- Git repository (任意): この SubQuery プロジェクトがホスティングされるリポジトリの Git URL を指定します (SubQuery Explorer でホスティングする場合)
- RPC endpoint (必須): このプロジェクトでデフォルトで使用される実行中のRPCエンドポイントへのWebSocket（wss）URLを指定します。 異なるPolkadotネットワーク用のパブリックエンドポイントに素早くアクセスしたり、[OnFinality](https://app.onfinality.io)を使って自分だけの専用ノードを作ったり、デフォルトのPolkadotエンドポイントだけを使用したりすることもできます。 このRPCノードはアーカイブノードでなければなりません（フルチェーン状態であること）。
- Authors (必須): このSubQueryプロジェクトの作成者をここに入力します。
- Description (任意): プロジェクトについて、どのようなデータが含まれ、ユーザーがそのデータで何ができるかを説明する短い説明を記載することができます。
- Version (必須): カスタムバージョン番号を入力するか、デフォルト（`1.0.0`）を使用します。
- License (必須): このプロジェクトのソフトウェアライセンスを指定するか、デフォルト（`Apache-2.0`）を選択します。

初期化処理が完了すると、ディレクトリ内にプロジェクト名のフォルダが作成されているのが確認できるはずです。 このディレクトリの内容は、[ディレクトリの構成](../create/introduction.md#directory-structure)に記載されているものと同じでなければなりません。

最後にプロジェクトディレクトリで、以下のコマンドを実行し、新しいプロジェクトの依存関係をインストールします。

<CodeGroup> <CodeGroupItem title="YARN" active> `shell cd PROJECT_NAME yarn install ` </CodeGroupItem>
<CodeGroupItem title="NPM"> `bash cd PROJECT_NAME npm install ` </CodeGroupItem> </CodeGroup>

## プロジェクトのビルドと設定

先ほど初期化したスターターパッケージには、新しいプロジェクトのための標準的な構成が用意されています。 主に以下のファイルについて作業します:

- Manifest（`project.yaml`）
- GraphQL Schema（`schema.graphql`）
- Mapping functions（ `src/mappings/` ディレクトリ）

SubQuery の書き方については、[プロジェクトの作成](./create/introduction.md)にあるドキュメントを参照してください。

### GraphQL モデルの生成

SubQuery プロジェクトの<a href="."/run_publish/run.md">インデックス</a>を作成するために、GraphQL Schema(`schema.graphql`)で定義した必要な GraphQL モデルを生成する必要があります。 プロジェクトディレクトリのルートで、このコマンドを実行します。

<CodeGroup> <CodeGroupItem title="YARN" active> `shell yarn codegen ` </CodeGroupItem>
<CodeGroupItem title="NPM"> `bash npm run-script codegen ` </CodeGroupItem> </CodeGroup>

生成されたモデルは、`/src/types/models`ディレクトリに格納されています。

## プロジェクトをビルドする

ローカルにホストされた SubQuery Node で SubQuery Project を実行するには、ビルドする必要があります。

プロジェクトのルートディレクトリから build コマンドを実行します。

<CodeGroup> <CodeGroupItem title="YARN" active> `shell yarn build ` </CodeGroupItem>
<CodeGroupItem title="NPM"> `bash npm run-script build ` </CodeGroupItem> </CodeGroup>

## プロジェクトの実行とクエリ

新しいプロジェクトは[SubQuery Projects](https://project.subquery.network)に公開して [Explorer](https://explorer.subquery.network)ですぐにクエリを実行できますが、 ローカルで SubQuery ノードを実行する最も簡単な方法は、Docker コンテナの中で実行することです。Docker をまだお持ちでない場合は [docker.com](https://docs.docker.com/get-docker/)からインストールすることができます。

[_これをスキップして、新しいプロジェクトを SubQuery Projects に公開します。_](../run_publish/publish.md)

### SubQuery プロジェクトを実行

SubQuery ノードの実行方法を制御するすべての設定は、この`docker-compose.yml`ファイルで定義されます。 起動したばかりの新しいプロジェクトでは、ここで何も変更する必要はありませんが、ファイルや設定の詳細については、<a href="."/run_publish/run.md">プロジェクトを実行</a>のセクションを参照してください。

プロジェクトディレクトリで、以下のコマンドを実行します。

```shell
docker-compose pull && docker-compose up
```

初回は必要なパッケージ ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query),Postgres) をダウンロードするのに時間がかかるかもしれませんが、すぐに SubQuery ノードが動作するのを確認できると思います。

### プロジェクトでクエリ実行

ブラウザを開き、[http://localhost:3000](http://localhost:3000)にアクセスしてください。

エクスプローラーに GraphQL プレイグラウンドが表示され、クエリ可能なスキーマが表示されているのが確認できるはずです。 プレイグラウンドの右上には、_Docs_ ボタンがあり、ドキュメントを開くことができます。 このドキュメントは自動的に生成され、クエリできるエンティティやメソッドを見つけるのに役立ちます。

新しい SubQuery スターター プロジェクトでは、次のクエリを実行してその動作を確認したり、[GraphQL クエリ言語について詳しく学習することができます](./run_publish/graphql.md)。

```graphql
{
  query {
    starterEntities(first: 10) {
      nodes {
        field1
        field2
        field3
      }
    }
  }
}
```

## 次のステップ

おめでとうございます。これでサンプルデータの GraphQL API リクエストを受け付ける SubQuery プロジェクトがローカルに実行されるようになりました。 次のガイドで 新しいプロジェクトを [SubQuery Projects](https://project.subquery.network) に公開し、 [Explorer](https://explorer.subquery.network) を使用してクエリする方法を説明します。

[新しいプロジェクトを SubQuery Projects に公開する](../run_publish/publish.md)
