# チュートリアルと例

[クイックスタート](/quickstart/quickstart.md) ガイドで SubQuery とは何か、そしてどのように動作するのかを説明するために、簡単な例を見てみました。 ここでは、プロジェクトを作成する際のワークフローと、使用する主要なファイルを詳しく見ていきます。

## 基本的なワークフロー

以下の例では、 [クイックスタート](../quickstart/quickstart.md) セクションでスターターパッケージを正常に初期化したと仮定します。 そのスターターパッケージから、SubQuery プロジェクトをカスタマイズして実装するための標準プロセスを説明します。

1. `subql init PROJECT_NAME` を使用してプロジェクトを初期化します。
2. マニフェストファイル（`project.yaml`）を更新して、ブロックチェーンとマッピングするエンティティに関する情報を含めます。 （[マニフェストファイル](./manifest.md)を参照）
3. スキーマ（`schema.graphql`）に GraphQL エンティティを作成し、クエリのために抽出・保存するデータの型を定義します。 （[GraphQL Schema](./graphql.md)を参照）
4. チェーンデータを定義した GraphQL エンティティに変換するために呼び出したいすべてのマッピング関数（例：`mappingHandlers.ts`）を追加します。 （[マッピング](./mapping.md)を参照）
5. コードの生成、ビルド、SubQuery Projects への公開（または自分のローカル・ノードでの実行）をします。 （クイック・スタートガイドの[スタータープロジェクトの実行とクエリ](./quickstart.md#running-and-querying-your-starter-project)を参照）

## ディレクトリ構造

以下のマップは、`init` コマンドの実行時に展開される SubQuery プロジェクトのディレクトリ構造の概要を示します。

```
- project-name
  L package.json
  L project.yaml
  L README.md
  L schema.graphql
  L tsconfig.json
  L docker-compose.yml
  L src
    L index.ts
    L mappings
      L mappingHandlers.ts
  L .gitignore
```

例

![SubQuery ディレクトリ構造](/assets/img/subQuery_directory_stucture.png)

## コード生成

GraphQL エンティティを変更するたびに、次のコマンドで types ディレクトリを再生成する必要があります。

```
yarn codegen
```

これは`schema.graphql`内で事前に定義した型ごとに生成されたエンティティ・クラスを含む `src/types` ディレクトリを作成します（または既存のディレクトリを更新します）。 これらのクラスは、タイプセーフなエンティティのロード、エンティティフィールドへの読み取りと書き込みのアクセスを提供します。 （このプロセスについては、[GraphQL Schema](./graphql.md)を参照）

## ビルド

ローカルホストの SubQuery Node 上で SubQuery プロジェクトを実行するには、最初にビルド作業をする必要があります。

プロジェクトのルートディレクトリから build コマンドを実行します。

<CodeGroup> <CodeGroupItem title="YARN" active> `shell yarn build ` </CodeGroupItem>
<CodeGroupItem title="NPM"> `bash npm run-script build ` </CodeGroupItem> </CodeGroup>

### 代替のビルド オプション

`subql build`

を使用した subquery プロジェクトのための追加ビルドオプションをサポートします。

これにより、package.json の exports フィールドを使用してビルドするための追加のエントリ ポイントを定義できます。

```json
"name": "project-name",
"version": "1.0.0",
...
"exports": {
  "entry_one": "./src/entry_one.ts",
  "entry_renamed": "./src/entry_two.ts"
},
```

次に、 `subql build` を実行すると、次の構造の dist フォルダが生成されます。

```
- project-name
  L dist
    L entry_one.js
    L entry_renamed.js
    L index.js
```

exports フィールドで指定されているかどうかに関わらず、 `index.ts` をビルドすることに注意してください。

フラグを含むこれの使用に関する詳細は、 [cli reference](https://doc.subquery.network/run_publish/references/#build) を参照してください。

## ロギング

`console.log` メソッドは **サポートされなくなりました**。 </strong> 代わりに、 `logger` モジュールが型に組み込まれています。 つまり、さまざまなロガーレベルを受け入れるロガーをサポートすることができます。

```typescript
logger.info("Info level message");
logger.debug("Debugger level message");
logger.warn("Warning level message");
```

`logger.info` または `logger.warn`を使用するには、マッピングファイルに行を挿入してください。

![logging.info](/assets/img/logging_info.png)

`logger.debug`を使用するには、追加のステップが必要です。 コマンドラインに `--log-level=debug` を追加します。

Docker container を実行している場合は、 `docker-compose.yaml` ファイルにこの行を追加してください。

![logging.debug](/assets/img/logging_debug.png)

ターミナル画面に新しいログが表示されます。

![logging.debug](/assets/img/subquery_logging.png)
