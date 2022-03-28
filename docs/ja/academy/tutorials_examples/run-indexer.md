# インデクサノードの実行方法は？

## ビデオガイド

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/QfNsR12ItnA" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## はじめに

Docker を使用するか、[SubQuery Projects](https://project.subquery.network/) でプロジェクトをホストしてもらう以外に、インデクサノードを実行することもできます。 より多くの時間と労力を必要としますが、SubQueryがどのように機能するのか、その理解を深めることができます。

## Postgres

インフラストラクチャ上でインデクサノードを実行するには、Postgres データベースのセットアップが必要です。 Postgresは [ここ](https://www.postgresql.org/download/)からインストールできます 。バージョンが12以上であることを確認してください。

## subql/nodeをインストールする

次に、SubQuery ノードを実行するには、次のコマンドを実行します。

```shell
npm install -g @subql/node
```

-g フラグは、OSX 上でインストールすることを意味します。場所は /usr/local/lib/node_modules になります。

インストールが完了したら、以下を実行してバージョンを確認できます。

```shell
> subql-node --version
0.19.1
```

## DBコンフィグの設定

次に、以下の環境変数を設定する必要があります。

```shell
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
```

もちろん、上記のキーに異なる値がある場合は、適宜調整してください。 なお、`env`コマンドは現在の環境変数を表示し、この処理はこれらの値を一時的に設定するだけであることに注意してください。 つまり、これらは現在のセッションを繋いでる期間のみ有効です。 恒久的に設定するには、~/bash_profile に保存してください。

## プロジェクトのインデックス作成

プロジェクトのインデックスを開始するには、プロジェクトフォルダに移動し、次のコマンドを実行します。

```shell
subql-node -f .
```

もしプロジェクトがない場合は、`git clone https://github.com/subquery/subql-helloworld` を実行してください。 インデクサノードが起動し、ブロックのインデックス作成を開始するのが見えるはずです。

## Postgresの検査

Postgresに移動すると、作成された2つのテーブルが表示されます。 `public.subquery` と `subquery_1.starter_entities`です。

`public ubqueries <code>` には、インデクサが「現在の状態を理解する」ために開始時にチェックする行が 1 つだけ含まれており、どこから継続するかが分かります。 `starter_entities` テーブルには、インデックスが含まれます。 データを表示するには、`select (*) from subquery_1.starter_entities` を実行してください。
