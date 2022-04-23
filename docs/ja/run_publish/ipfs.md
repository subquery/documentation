# IPFSを使用してプロジェクトをホスティングする

このガイドでは、ローカルの SubQuery プロジェクトを [IPFS](https://ipfs.io/) に公開し、ホスティングインフラストラクチャにデプロイする方法について説明します。

IPFSにプロジェクトをホストすることで、すべての人が利用できるようになり、GitHubのような中央集権的なサービスへの依存を減らすことができます。

## 要件

- `@subql/cli` バージョン 0.21.0 以上。
- マニフェスト `specVersion` 0.2.0 以上。
- [SUBQL_ACCESS_TOKEN](#prepare-your-subql-access-token) を準備すること。
- デプロイを確実に成功させるために、`subql build` コマンドでプロジェクトをビルドし、公開する前にローカルでテストすることを強くお勧めします。

## SUBQL_ACCESS_TOKENを準備する

- ステップ 1: [SubQuery Projects](https://project.subquery.network/) に移動してログインします。
- ステップ 2: ナビゲーションメニューの右上にあるプロフィールをクリックし、 **_Refresh Token_** をクリックします
- ステップ 3: 生成されたトークンをコピーします。
- ステップ 4: このトークンを使用するには:
  - オプション1:環境変数に SUBQL_ACCESS_TOKENを追加します。 `EXPORT SUBQL_ACCESS_TOKEN=<token>`
  - オプション 2: 近日中に `subql/cli` が SUBQL_ACCESS_TOKEN をローカルに保存することをサポートする予定です。

## プロジェクトを公開する方法

プロジェクトを公開するには2つの方法があります。

### オプション1:

すでに `@subql/cli` がインストールされているので、以下のコマンドを実行すると、プロジェクトとそのデフォルトマニフェスト `project.yaml` から必要な情報を読み込むことができます。

```
// Publish it from your project's root directory
subql publish

// OR point to your project root
subql publish -f ~/my-project/
```

### オプション2:

または、プロジェクトに複数のマニフェストファイルがあるとします。 たとえば、複数のネットワークをサポートしていますが、同じマッピングとビジネスロジックを共有し、以下のようにプロジェクト構造を持っています:

```
L projectRoot
 L src/
 L package.json
 L polkadot.yaml (Manifest for Polkadot network)
 L kusama.yaml   (Manifest for Kusama network)
 ...
```

選択したマニフェストファイルを使用してプロジェクトをいつでも公開できます

```
 # This will publish project support indexing Polkadot network
subql publish -f ~/my-projectRoot/polkadot.yaml
```

## 公開した後

プロジェクトを正常に公開した後 以下のログは、プロジェクトが IPFS クラスターで作成され、 `CID` (コンテンツ識別子) を返したことを示しています。

```
Building and packing code... done
Uploading SupQuery project to IPFS
SubQuery Project uploaded to IPFS: QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd  //CID
```

この `CID` に注意してください。 この `CID`を使用すると、公開されたプロジェクトを [IPFS Deployment](#ipfs-deployment) と呼びます。

## IPFS Deployment

IPFS Deploymentは、分散ネットワーク上のSubQueryプロジェクトの独立したユニークな存在を表します。 そのため、プロジェクト内のコードに変更があると、そのユニーク性に影響が出ます。 ビジネスロジックを調整する必要がある場合、例えばマッピング機能を変更する場合は、プロジェクトを再発行する必要があり、 `CID` が変更されます。

とりあえず公開したプロジェクトを見るには、[Postman](https://web.postman.co/)などの `REST` apiツールを使い、以下のサンプルURLで `POST` メソッドを使用して取得します。 `https://ipfs.subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`

以下のように、プロジェクトのデプロイ例が表示されます。

このデプロイメントはマニフェストファイルによく似ています。 それらの記述フィールドを期待することができ、ネットワークとディクショナリーのエンドポイントは、プロジェクトの実行結果に直接影響しないため、削除されました。

ローカルプロジェクトで使用されたファイルは、IPFSにもパックされて公開されています。

```yaml
dataSources:
  - kind: substrate/Runtime
    mapping:
      file: ipfs://QmTTJKrMVzCZqmRCd5xKHbKymtQQnHZierBMHLtHHGyjLy
      handlers:
        - handler: handleBlock
          kind: substrate/BlockHandler
        - filter:
            method: Deposit
            module: balances
          handler: handleEvent
          kind: substrate/EventHandler
        - handler: handleCall
          kind: substrate/CallHandler
    startBlock: 8973820
network:
  genesisHash: "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3"
schema:
  file: ipfs://QmTP5BjtxETVqvU4MkRxmgf8NbceB17WtydS6oQeHBCyjz
specVersion: 0.2.0
```

## ホストされたサービスでSubQueryプロジェクトを実行する

### IPFS Deploymentでプロジェクトを作成する

ガイドに従って、 [SubQuery プロジェクトの公開](publish.md) を参照してください。ただし、デプロイソースを設定する場合は、 **IPFS** を選択できます。

次に、本番用環境を選択し、IPFS Deploymentの CID（先頭の `ipfs://` を除く）をコピーして貼り付けます。

プレビューセクションにIPFS Deploymentが表示されます。 ネットワーク、ディクショナリのエンドポイントなどを選択できます。

ホストされたサービスにIPFSデプロイメントを正常にデプロイした後。 SubQueryエクスプローラで表示することができ、ローカルで行うようにクエリーサービスにアクセスできます。
