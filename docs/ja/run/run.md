# ローカルでのSubQueryの実行

このガイドでは、インフラストラクチャ上でローカルのSubQueryノードを実行する方法を説明します。このノードには、インデクサとクエリサービスの両方が含まれます。 SubQueryのインフラストラクチャの運用を心配する必要はないでしょうか？ SubQueryは、[マネージドホスティングサービス](https://explorer.subquery.network)をコミュニティに無償で提供しています。 [公式ガイド](../publish/publish.md) に従って、 [SubQuery Projects](https://project.subquery.network) にプロジェクトをアップロードする方法をご覧ください。

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

SubQueryノードは、SubQueryプロジェクトごとにSubstrateベースのブロックチェーンデータを抽出し、Postgresデータベースに保存します。

### インストール

```shell
# NPM
npm install -g @subql/node
```

なお、`yarn global` の使用は、依存関係の管理が不十分であるため、**推奨しないこと** とし、将来的にエラーを引き起こす可能性があることに注意してください。

インストールが完了したら、次のコマンドでノードを起動できます。

```shell
subql-node <command>
```

### キーコマンド

The following commands will assist you to complete the configuration of a SubQuery node and begin indexing. To find out more, you can always run `--help`.

#### Point to local project path

```
subql-node -f your-project-path
```

#### Using a Dictionary

Using a full chain dictionary can dramatically speed up the processing of a SubQuery project during testing or during your first index. In some cases, we've seen indexing performance increases of up to 10x.

A full chain dictionary pre-indexes the location of all events and extrinsics within the specific chain and allows your node service to skip to relevant locations when indexing rather than inspecting each block.

You can add the dictionary endpoint in your `project.yaml` file (see [Manifest File](../create/manifest.md)), or specify it at run time using the following command:

```
subql-node --network-dictionary=https://api.subquery.network/sq/subquery/dictionary-polkadot
```

[Read more about how a SubQuery Dictionary works](../tutorials_examples/dictionary.md).

#### Connect to database

```
Depending on the configuration of your Postgres database (e.g. a different database password), please ensure also that both the indexer (<code>subql/node</code>) and the query service (<code>subql/query</code>) can establish a connection to it.

#### Specify a configuration file

```
) and the query service (subql/query) can establish a connection to it.

#### Specify a configuration file

</code>
subql-node -c your-project-config.yml
```

This will point the query node to a configuration file which can be in YAML or JSON format. Check out the example below.

subquery: ../../../../subql-example/extrinsics
subqueryName: extrinsics
batchSize:100
localMode:true
```

#### Change the block fetching batch size

```
subql-node -f your-project-path --batch-size 200

Result:
[IndexerManager] fetch block [203, 402]
[IndexerManager] fetch block [403, 602]
```

When the indexer first indexes the chain, fetching single blocks will significantly decrease the performance. Increasing the batch size to adjust the number of blocks fetched will decrease the overall processing time. The current default batch size is 100.

#### Run in local mode

```
subql-node -f your-project-path --local
```

For debugging purposes, users can run the node in local mode. Switching to local model will create Postgres tables in the default schema `public`.

If local mode is not used, a new Postgres schema with the initial `subquery_` and corresponding project tables will be created.


#### Local mode

There are 2 endpoints that you can use to check and monitor the health of a running SubQuery node.

- Health check endpoint that returns a simple 200 response
- Metadata endpoint that includes additional analytics of your running SubQuery node

Append this to the base URL of your SubQuery node. Eg `http://localhost:3000/meta` will return:

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

`http://localhost:3000/health` will return HTTP 200 if successful.

A 500 error will be returned if the indexer is not healthy. This can often be seen when the node is booting up.

```shell
{
    "status": 500,
    "error": "Indexer is not healthy"
}
```

If an incorrect URL is used, a 404 not found error will be returned.

```shell
{
"statusCode": 404,
"message": "Cannot GET /healthy",
"error": "Not Found"
}
```

#### Debug your project

Use the [node inspector](https://nodejs.org/en/docs/guides/debugging-getting-started/) to run the following command.

```shell
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
subql-node -f your-project-path
```

例
```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Debugger listening on ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
```
Then open up the Chrome dev tools, go to Source > Filesystem and add your project to the workspace and start debugging. For more information, check out [How to debug a SubQuery project](https://doc.subquery.network/tutorials_examples/debug-projects/)
## Running a Query Service (subql/query)

### インストール

```shell
# NPM
npm install -g @subql/query
```

なお、`yarn global` の使用は、依存関係の管理が不十分であるため、**推奨しないこと** とし、将来的にエラーを引き起こす可能性があることに注意してください。

### Running the Query service
``` export DB_HOST=localhost subql-query --name <project_name> --playground ````

Make sure the project name is the same as the project name when you [initialize the project](../quickstart/quickstart.md#initialise-the-starter-subquery-project). Also, check the environment variables are correct.

After running the subql-query service successfully, open your browser and head to `http://localhost:3000`. You should see a GraphQL playground showing in the Explorer and the schema that is ready to query.
