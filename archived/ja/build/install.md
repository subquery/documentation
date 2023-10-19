# SubQuery のインストール

SubQuery プロジェクトの作成には、さまざまなコンポーネントが必要です。 [@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) ツールは、SubQuery プロジェクトの作成に使用されます。 インデクサを実行するには、 [@subql/node](https://github.com/subquery/subql/tree/docs-new-section/packages/node) コンポーネントが必要です。 クエリを生成するには、 [@subql/query](https://github.com/subquery/subql/tree/docs-new-section/packages/query) ライブラリが必要です。

## @subql/cli をインストールする

[@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) は、プロジェクトのフレームワークや基礎を作るのに役立ち、ゼロから始める必要がないことを意味します。

Yarn または NPM を使用して、端末に SubQuery CLI をインストールします。

::: code-tabs @tab npm `bash npm install -g @subql/cli `
@tab:active yarn `shell yarn global add @subql/cli ` :::

help を実行すると、CLI で利用可能なコマンドや使い方が表示されます。

```shell
subql help
```

## @subql/node をインストールする

SubQuery ノードは、SubQuery プロジェクトごとに Substrate ベースのブロックチェーンデータを抽出し、Postgres データベースに保存します。

SubQuery ノードを Yarn や NPM を使って端末にインストールします。

::: code-tabs @tab npm `bash npm install -g @subql/node `
@tab:active yarn `shell yarn global add @subql/node ` :::

インストールすると、次のようにノードを起動することができます。

```shell
subql-node <command>
```

> 注意: Docker を使用している場合、または SubQuery Projects でプロジェクトをホスティングしている場合は、この手順をスキップできます。 これは、SubQuery ノードが Docker コンテナとホスティングインフラストラクチャにすでに提供されているためです。

## @subql/query をインストールする

SubQuery クエリライブラリは、ブラウザを介した「プレイグラウンド」環境でプロジェクトにクエリを発行するサービスを提供します。

Yarn または NPM を使用して、端末に SubQuery クエリ をインストールします。

::: code-tabs @tab npm `bash npm install -g @subql/query `
@tab:active yarn `shell yarn global add @subql/query ` :::

> 注意: Docker を使用している場合、または SubQuery Projects でプロジェクトをホスティングしている場合は、この手順をスキップできます。 これは、SubQuery ノードが Docker コンテナとホスティングインフラストラクチャにすでに提供されているためです。
