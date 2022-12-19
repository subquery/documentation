# Hello World (localhost & Docker)

SubQuery Hello World のクイックスタートへようこそ。 クイックスタートでは、いくつかの簡単な手順でデフォルトのスタータープロジェクトを Docker で実行する方法を説明します。

## 学習のねらい

このクイックスタートが終了した時点で、あなたは次のことが出来るようになります。

- 必要な前提条件を理解すること
- 基本的な一般的なコマンドを理解すること
- localhost:3000 に移動して、プレイグラウンドを表示できるようになること
- Polkadot メインネットのブロックの高さを取得するための簡単なクエリを実行すること

## 対象者

このガイドは、開発経験があり、SubQuery についてもっと学ぶことに興味がある新規開発者を対象としています。

## ビデオガイド

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/j034cyUYb7k" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## 前提条件

必要なもの

- yarn または npm パッケージマネージャ
- SubQuery CLI (`@subql/cli`)
- Docker

ターミナルで以下のコマンドを実行することで、これらの前提条件がすでに備わっているかどうかを確認することができます。

```shell
yarn -v (or npm -v)
subql -v
docker -v
```

上級者の方は、以下をコピー＆ペーストしてください。

```shell
echo -e "My yarn version is:" `yarn -v` "\nMy subql version is:" `subql -v`  "\nMy docker version is:" `docker -v`
```

これらが表示される必要があります: (npm ユーザの場合、yarn を npm に置き換えてください)

```shell
My yarn version is: 1.22.10
My subql version is: @subql/cli/0.9.3 darwin-x64 node-v16.3.0
My docker version is: Docker version 20.10.5, build 55c4c88
```

上記が表示された場合、問題ありません。 そうでない場合は、以下のリンクに従ってインストールしてください:

- [yarn](https://classic.yarnpkg.com/en/docs/install/) or [npm](https://www.npmjs.com/get-npm)
- [SubQuery CLI](quickstart-polkadot.md#install-the-subquery-cli)
- [Docker](https://docs.docker.com/get-docker/)

## 1. プロジェクトを初期化する

SubQuery で始める最初のステップは、 `subql init` コマンドを実行することです。 `subqlHelloWorld` という名前でプロジェクトを初期化しましょう。 作成者のみが必須であることに注意してください。 以下、すべて空欄のままで大丈夫です。

```shell
> subql init subqlHelloWorld
? Select a network Polkadot
? Select a template project subql-starter     Starter project for subquery
Cloning project... done
RPC endpoint: [wss://polkadot.api.onfinality.io/public-ws]:
Git repository [https://github.com/subquery/subql-starter]:
Fetching network genesis hash... done
Author [Ian He & Jay Ji]:
Description [This project can be use as a starting po...]:
Version [0.0.4]:
License [MIT]:
Preparing project... done
subqlHelloWorld is ready

```

この新しいディレクトリに移動することを忘れないでください。

```shell
cd subqlHelloWorld
```

## 2. 依存するモジュールをインストールする

ここで様々な依存関係をインストールするために、yarn または node のインストールを実行します。

::: code-tabs @tab:active yarn `shell yarn install `
@tab npm `bash npm install ` :::

例 `yarn install`

```shell
> yarn install
yarn install v1.22.10
info No lockfile found.
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
✨  Done in 31.84s.
```

## 3. コードを生成する

ここで`yarn codegen`を実行して、GraphQL スキーマから Typescript を生成します。

::: code-tabs @tab:active yarn `shell yarn codegen `
@tab npm `bash npm run-script codegen ` :::

例 `yarn codegen`

```shell
> yarn codegen
yarn run v1.22.10
$ ./node_modules/.bin/subql codegen
===============================
---------Subql Codegen---------
===============================
* Schema StarterEntity generated !
* Models index generated !
* Types index generated !
✨  Done in 1.02s.
```

**警告** スキーマファイルに変更があった場合、`yarn codegen` を再実行し、types ディレクトリを再生成することを忘れないようにしてください。

## 4. コードをビルドする

次のステップは、 `yarn build` でコードをビルドすることです。

::: code-tabs @tab:active yarn `shell yarn build `
@tab npm `bash npm run-script build ` :::

例 `yarn build`

```shell
> yarn build
yarn run v1.22.10
$ tsc -b
✨  Done in 5.68s.
```

## 5. Docker を実行する

Docker を使用すると、必要なインフラをすべて Docker イメージ内で提供できるため、この例を非常に迅速に実行することができます。 `docker-compose pull && docker-compose up` を実行する

これですべてがキックされ、最終的にブロックがフェッチされます。

```shell
> #SNIPPET
subquery-node_1   | 2021-06-05T22:20:31.450Z <subql-node> INFO node started
subquery-node_1   | 2021-06-05T22:20:35.134Z <fetch> INFO fetch block [1, 100]
subqlhelloworld_graphql-engine_1 exited with code 0
subquery-node_1   | 2021-06-05T22:20:38.412Z <fetch> INFO fetch block [101, 200]
graphql-engine_1  | 2021-06-05T22:20:39.353Z <nestjs> INFO Starting Nest application...
graphql-engine_1  | 2021-06-05T22:20:39.382Z <nestjs> INFO AppModule dependencies initialized
graphql-engine_1  | 2021-06-05T22:20:39.382Z <nestjs> INFO ConfigureModule dependencies initialized
graphql-engine_1  | 2021-06-05T22:20:39.383Z <nestjs> INFO GraphqlModule dependencies initialized
graphql-engine_1  | 2021-06-05T22:20:39.809Z <nestjs> INFO Nest application successfully started
subquery-node_1   | 2021-06-05T22:20:41.122Z <fetch> INFO fetch block [201, 300]
graphql-engine_1  | 2021-06-05T22:20:43.244Z <express> INFO request completed

```

## 6. プレイグラウンドを表示する

http://localhost:3000/ にアクセスし、以下のクエリを画面左側に貼り付けて、再生ボタンを押してください。

```
{
 query{
   starterEntities(last:10, orderBy:FIELD1_ASC ){
     nodes{
       field1
     }
   }
 }
}

```

ローカルホストの SubQuery playground

![ローカルホストの playground](/assets/img/subql_playground.png)

プレイグラウンドのブロック数は、ターミナルのブロック数（厳密にはブロックの高さ）とも一致させる必要があります。

## 概要

このクイックスタートでは、Docker 環境内でプロジェクトを立ち上げて実行する基本的な手順を示した後、localhost:3000 にナビゲートして、メインネット Polkadot ネットワークのブロック番号を返すクエリーを実行しました。
