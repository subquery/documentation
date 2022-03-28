# SubQueryのインストール

SubQuery プロジェクトの作成には、さまざまなコンポーネントが必要です。 [@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) ツールは、SubQuery プロジェクトの作成に使用されます。 インデクサを実行するには、 [@subql/node](https://github.com/subquery/subql/tree/docs-new-section/packages/node) コンポーネントが必要です。 クエリを生成するには、 [@subql/query](https://github.com/subquery/subql/tree/docs-new-section/packages/query) ライブラリが必要です。

## @subql/cli をインストールする

[@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) は、プロジェクトのフレームワークや基礎を作るのに役立ち、ゼロから始める必要がないことを意味します。

Yarn または NPM を使用して、端末に SubQuery CLI をインストールします。

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/cli ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/cli ``` </CodeGroupItem> </CodeGroup>

helpを実行すると、CLIで利用可能なコマンドや使い方が表示されます。

```shell
subql help
```
## @subql/node をインストールする

SubQueryノードは、SubQueryプロジェクトごとにSubstrateベースのブロックチェーンデータを抽出し、Postgresデータベースに保存します。

SubQueryノードをYarnやNPMを使って端末にインストールします。

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/node ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/node ``` </CodeGroupItem> </CodeGroup>

インストールすると、次のようにノードを起動することができます。

```shell
subql-node <command>
```
> 注意: Dockerを使用している場合、またはSubQuery Projectsでプロジェクトをホスティングしている場合は、この手順をスキップできます。 これは、SubQueryノードがDockerコンテナとホスティングインフラストラクチャにすでに提供されているためです。

## @subql/queryをインストールする

SubQueryクエリライブラリは、ブラウザを介した「プレイグラウンド」環境でプロジェクトにクエリを発行するサービスを提供します。

Yarn または NPM を使用して、端末に SubQuery クエリ をインストールします。

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/query ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/query ``` </CodeGroupItem> </CodeGroup>

> 注意: Dockerを使用している場合、またはSubQuery Projectsでプロジェクトをホスティングしている場合は、この手順をスキップできます。 これは、SubQueryノードがDockerコンテナとホスティングインフラストラクチャにすでに提供されているためです。 