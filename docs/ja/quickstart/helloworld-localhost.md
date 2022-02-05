# Hello World (localhost + Docker)

SubQuery Hello World のクイックスタートへようこそ。 クイックスタートでは、いくつかの簡単な手順でデフォルトのスタータープロジェクトをDockerで実行する方法を説明します。

## 学習のねらい

このクイックスタートが終了した時点で、あなたは次のことが出来るようになります。

- 必要な前提条件を理解すること
- 基本的な一般的なコマンドを理解すること
- be able to navigate to localhost:3000 and view the playground
- run a simple query to get the block height of the Polkadot mainnet

## 対象者

このガイドは、開発経験があり、SubQueryについてもっと学ぶことに興味がある新規開発者を対象としています。

## ビデオガイド

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/j034cyUYb7k" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## 前提条件

必要なもの

- yarn or npm package manager
- SubQuery CLI (`@subql/cli`)
- Docker

You can run the following commands in a terminal to see if you already have any of these pre-requisites.

```shell
yarn -v (or npm -v)
subql -v
docker -v
```

For more advanced users, copy and paste the following:

```shell
echo -e "My yarn version is:" `yarn -v` "\nMy subql version is:" `subql -v`  "\nMy docker version is:" `docker -v`
```

This should return: (for npm users, replace yarn with npm)

```shell
My yarn version is: 1.22.10
My subql version is: @subql/cli/0.9.3 darwin-x64 node-v16.3.0
My docker version is: Docker version 20.10.5, build 55c4c88
```

If you get the above, then you are good to go. If not, follow these links to install them:

- [yarn](https://classic.yarnpkg.com/en/docs/install/) or [npm](https://www.npmjs.com/get-npm)
- [SubQuery CLI](quickstart.md#install-the-subquery-cli)
- [Docker](https://docs.docker.com/get-docker/)

## 1. Step 1: Initialise project

The first step when starting off with SubQuery is to run the `subql init` command. Let's initialise a start project with the name `subqlHelloWorld`. Note that only author is mandatory. Everything else is left empty below.

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

Don't forget to change into this new directory.

```shell
cd subqlHelloWorld
```

## 2. Step 2: Install dependencies

Now do a yarn or node install to install the various dependencies.

<CodeGroup> # Yarn yarn install # NPM npm install

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

## 3. Step 3: Generate code

Now run `yarn codegen` to generate Typescript from the GraphQL schema.

<CodeGroup> # Yarn yarn codegen # NPM npm run-script codegen

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

**Warning** When changes are made to the schema file, please remember to re-run `yarn codegen` to regenerate your types directory.

## 4. Step 4: Build code

The next step is to build the code with `yarn build`.

<CodeGroup> # Yarn yarn build # NPM npm run-script build

```shell
> yarn build
yarn run v1.22.10
$ tsc -b
✨  Done in 5.68s.
```

## 5. Run Docker

Using Docker allows you to run this example very quickly because all the required infrastructure can be provided within the Docker image. Run `docker-compose pull && docker-compose up`.

This will kick everything into life where eventually you will get blocks being fetched.

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

## 6. Browse playground

Navigate to http://localhost:3000/ and paste the query below into the left side of the screen and then hit the play button.

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

SubQuery playground on localhost.

![playground localhost](/assets/img/subql_playground.png)

The block count in the playground should match the block count (technically the block height) in the terminal as well.

## 概要

In this quick start, we demonstrated the basic steps to get a starter project up and running within a Docker environment and then navigated to localhost:3000 and ran a query to return the block number of the mainnet Polkadot network.
