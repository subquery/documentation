# SubQueryのインストール

SubQuery プロジェクトの作成には、さまざまなコンポーネントが必要です。 [@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) ツールは、SubQuery プロジェクトの作成に使用されます。 インデクサを実行するには、 [@subql/node](https://github.com/subquery/subql/tree/docs-new-section/packages/node) コンポーネントが必要です。 クエリを生成するには、 [@subql/query](https://github.com/subquery/subql/tree/docs-new-section/packages/query) ライブラリが必要です。

## @subql/cli をインストールする

[@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) ツールは、プロジェクトのフレームワークや基礎を作るのに役立ち、ゼロから始める必要がないことを意味します。

Yarn または NPM を使用して、端末に SubQuery CLI をインストールします。

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/cli ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/cli ``` </CodeGroupItem> </CodeGroup>

You can then run help to see available commands and usage provide by CLI:

```shell
subql help
```
## @subql/node をインストールする

SubQueryノードは、SubQueryプロジェクトごとにSubstrateベースのブロックチェーンデータを抽出し、Postgresデータベースに保存します。

Yarn または NPM を使用して、端末に SubQuery CLI をインストールします。

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/node ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/node ``` </CodeGroupItem> </CodeGroup>

Once installed, you can can start a node with:

```shell
subql-node <command>
```
> 注意: Dockerを使用している場合、またはSubQuery Projectsでプロジェクトをホスティングしている場合は、この手順をスキップできます。 これは、SubQueryノードがDockerコンテナとホスティングインフラストラクチャにすでに提供されているためです。

## @subql/queryをインストールする

SubQueryクエリライブラリは、ブラウザを介した「遊び場」環境でプロジェクトにクエリを発行するサービスを提供します。

Yarn または NPM を使用して、端末に SubQuery CLI をインストールします。

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/query ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/query ``` </CodeGroupItem> </CodeGroup>

> 注意: Dockerを使用している場合、またはSubQuery Projectsでプロジェクトをホスティングしている場合は、この手順をスキップできます。 これは、SubQueryノードがDockerコンテナとホスティングインフラストラクチャにすでに提供されているためです。 