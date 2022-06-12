# ローカルでのSubQueryの実行

このガイドでは、インフラストラクチャ上でローカルのSubQueryノードを実行する方法を説明します。このノードには、インデクサとクエリサービスの両方が含まれます。 SubQueryのインフラストラクチャの運用を心配する必要はないでしょうか？ SubQueryは、[マネージドホスティングサービス](https://explorer.subquery.network)をコミュニティに無償で提供しています。 [Follow our publishing guide](../run_publish/publish.md) to see how you can upload your project to [SubQuery Projects](https://project.subquery.network).

## Docker の使用

代替案としては、`docker-compose.yml`ファイルで定義された<strong>Dockerコンテナ</strong>を実行する方法があります。 初期化されたばかりの新しいプロジェクトでは、ここで何も変更する必要はありません。

プロジェクトディレクトリで、以下のコマンドを実行します。

```shell
docker-compose pull && docker-compose up
```

初回は必要なパッケージ ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query),Postgres) をダウンロードするのに時間がかかるかもしれませんが、すぐにSubQueryノードが動作するのを確認できると思います。

## インデクサの実行 (subql/node)

要件

- [Postgres](https://www.postgresql.org/) データベース (バージョン12以上)。 [SubQueryノード](#start-a-local-subquery-node) はブロックチェーンのインデックスを作成していますが、抽出されたデータは外部データベース・インスタンスに保存されます。

A SubQuery node is an implementation that extracts Substrate/Polkadot-based blockchain data per the SubQuery project and saves it into a Postgres database.

### インストール

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

``` shell
# NPM
npm install -g @subql/node
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

``` shell
# NPM
npm install -g @subql/node-terra
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

``` shell
# NPM
npm install -g @subql/node-avalanche
````

</CodeGroupItem>
</CodeGroup>

Please note that we **DO NOT** encourage the use of `yarn global` due to its poor dependency management which may lead to an errors down the line.

インストールが完了したら、次のコマンドでノードを起動できます。


<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node <command>
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra <command>
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche <command> 
```

</CodeGroupItem>
</CodeGroup>

### Key Commands

The following commands will assist you to complete the configuration of a SubQuery node and begin indexing. 詳細を調べるには、いつでも `--help` を実行してください。

#### ローカルプロジェクトのパスを指定する

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node -f your-project-path
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra -f your-project-path
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -f your-project-path
```

</CodeGroupItem>
</CodeGroup>

#### Use a Dictionary

Using a full chain dictionary can dramatically speed up the processing of a SubQuery project during testing or during your first index. In some cases, we've seen indexing performance increases of up to 10x.

A full chain dictionary pre-indexes the location of all events and extrinsics within the specific chain and allows your node service to skip to relevant locations when indexing rather than inspecting each block.

You can add the dictionary endpoint in your `project.yaml` file (see [Manifest File](../create/manifest.md)), or specify it at run time using the following command:

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot/Polkadot'>

```shell
subql-node --network-dictionary=https://api.subquery.network/sq/subquery/dictionary-polkadot
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra --network-dictionary=https://api.subquery.network/sq/subquery/terra-columbus-5-dictionary
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche --network-dictionary=https://api.subquery.network/sq/subquery/avalanche-dictionary
```

</CodeGroupItem>
</CodeGroup>

[Read more about how a SubQuery Dictionary works](../academy/tutorials_examples/dictionary.md).

#### Connect to database

```shell
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
subql-node -f your-project-path
```

Depending on the configuration of your Postgres database (e.g. a different database password), please ensure also that both the indexer (`subql/node`) and the query service (`subql/query`) can establish a connection to it.

#### Specify a configuration file

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node -c your-project-config.yml
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra -c your-project-config.yml
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -c your-project-config.yml
```

</CodeGroupItem>
</CodeGroup>

This will point the query node to a configuration file which can be in YAML or JSON format. Check out the example below.

```yaml
subquery: ../../../../subql-example/extrinsics
subqueryName: extrinsics
batchSize:100
localMode:true
```

#### ブロックフェッチのバッチサイズを変更

```shell
subql-node -f your-project-path --batch-size 200

Result:
[IndexerManager] fetch block [203, 402]
[IndexerManager] fetch block [403, 602]
```

インデクサが最初にチェーンのインデックスを作成するとき、単一ブロックをフェッチすると性能が大幅に低下します。 バッチサイズを大きくしてフェッチするブロック数を調整することで、全体の処理時間を短縮することができます。 現在のバッチサイズは100です。

#### ローカルモードで実行する

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node -f your-project-path --local
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra -f your-project-path --local
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -f your-project-path --local
```

</CodeGroupItem>
</CodeGroup>

For debugging purposes, users can run the node in local mode. ローカルモデルに切り替えると、デフォルトのスキーマ `public` 内に Postgres テーブルが作成されます。

ローカル モードが使用されていない場合、最初の `subquery_` を持つ新しい Postgres スキーマと対応するプロジェクトテーブルが作成されます。

#### ノードの健全性を確認する

実行中の SubQuery ノードの正常性をチェックし監視するために使用できる 2 つのエンドポイントがあります。

- シンプルな200レスポンスを返すヘルスチェックエンドポイント
- 実行中の SubQuery ノードの追加分析を含むメタデータエンドポイント

これを SubQuery ノードのベース URL に追加します。 例 `http://localhost:3000/meta` は以下を返します:

```bash
{
    "currentProcessingHeight": 1000699,
    "currentProcessingTimestamp": 1631517883547,
    "targetHeight": 6807295,
    "bestHeight": 6807298,
    "indexerNodeVersion": "0.19.1",
    "lastProcessedHeight": 1000699,
    "lastProcessedTimestamp": 1631517883555,
    "uptime": 41.151789063,
    "polkadotSdkVersion": "5.4.1",
    "apiConnected": true,
    "injectedApiConnected": true,
    "usingDictionary": false,
    "chain": "Polkadot",
    "specName": "polkadot",
    "genesisHash": "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3",
    "blockTime": 6000
}
```

`http://localhost:3000/health` は成功するとHTTP 200を返します。

インデクサが正常でない場合は、500 エラーが返されます。 これは、ノードが起動しているときによく見られます。

```shell
{
    "status": 500,
    "error": "Indexer is not healthy"
}
```

不正な URL が使用された場合、404 not found error が返されます。

```shell
{
"statusCode": 404,
"message": "Cannot GET /healthy",
"error": "Not Found"
}
```

#### プロジェクトのデバッグ

[ノードインスペクタ](https://nodejs.org/en/docs/guides/debugging-getting-started/)を使い、以下のコマンドを実行します。

```shell
node --inspect-brk <path to subql-node> -f <path to subQuery project>
```

例

```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Debugger listening on ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
```

Chrome 開発ツールを開き、ソース > ファイルシステムに移動し、プロジェクトをワークスペースに追加してデバッグを開始します。 For more information, check out [How to debug a SubQuery project](https://doc.subquery.network/academy/tutorials_examples/debug-projects/)

## クエリサービスの実行 (subql/query)

### インストール

```shell
# NPM
npm install -g @subql/query
```

なお、`yarn global` の使用は、依存関係の管理が不十分であるため、**推奨しない** ことになり、将来的にエラーを引き起こす可能性があることに注意してください。

### クエリサービスの実行

```
export DB_HOST=localhost
subql-query --name <project_name> --playground
```

プロジェクト名は、[プロジェクトを初期化](../quickstart/quickstart-polkadot.md#initialise-the-starter-subquery-project)したときのプロジェクト名と同じにしてください。 また、環境変数が正しいことを確認してください。

subql-queryサービスを正常に実行した後、ブラウザを開き、 `http://localhost:3000` に進みます。 Explorerに表示されるGraphQLプレイグラウンドと、クエリーの準備ができたスキーマが表示されるはずです。
