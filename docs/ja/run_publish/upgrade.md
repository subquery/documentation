# SubQueryプロジェクトの新しいバージョンをデプロイする

## ガイドライン

SubQueryプロジェクトは、常に新しいバージョンをアップグレードしてデプロイする自由がありますが、SubQueryプロジェクトが世界に公開されている場合は、このプロセスに配慮してください。 注意すべきいくつかの重要なポイント:

- アップグレードが破損した変更である場合、新しいプロジェクトを作成するか（例：`My SubQuery Project V2`）、ソーシャルメディアチャンネルを通じてコミュニティに変更の警告を十分に行ってください。
- 新しいSubQueryプロジェクトのバージョンをデプロイすると、新しいバージョンが生成ブロックから完全なチェーンのインデックスを作成するため、ダウンタイムが発生します。

## 変更をデプロイする

There are two methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

### Using the UI

Log into SubQuery Project and select the project you want to deploy a new version of. You can choose to either deploy to the production or staging slot. These two slots are isolated environments and each has their own databases and synchronise independently.

We recommend deploying to your staging slot only for final staging testing or when you need to resync your project data. You can then promote it to production with zero downtime. You will find testing is faster when [running a project locally](../run_publish/run.md) as you can more [easily debug issues](../academy/tutorials_examples/debug-projects.md).

The staging slot is perfect for:

- SubQuery Projectの変更を別環境で最終検証します。 ステージングスロットは、dAppsで使用できる本番環境とは異なるURLを持っています。
- 更新されたSubQueryプロジェクトのデータのウォームアップとインデックス作成により、dAppのダウンタイムをなくすことができます
- 公開せずに、SubQuery プロジェクトの新しいリリースを準備します。 ステージングスロットはエクスプローラでは公開されず、あなただけに表示される固有のURLを持っています。

![Staging slot](/assets/img/staging_slot.png)

デプロイしたいSubQueryプロジェクトのコードベースのバージョンのGitHubからコミットハッシュ（完全なコミットハッシュをコピー）を記入する。 これは現在のチェーンをインデックスするのにかかる時間に応じて、より長いダウンタイムを引き起こします。 いつでもここで進捗状況を確認することができます.

### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our managed service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN](/docs/run_publish/ipfs.md#prepare-your-subqlaccesstoken) ready.

```shell
// You can directly set your Indexer and Query versions
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// OR you can use the interface, it will validate your IPFS CID and render a list of image versions that matches your manifest file `project.yaml`

$ subql deployment:deploy
```

## Upgrade to the Latest Indexer and Query Service

If you just want to upgrade to the latest indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) or query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) to take advantage of our regular performance and stability improvements, just select a newer versions of our packages and save. This will cause only a few minutes of downtime as the services running your project are restarted.

## 次のステップ - プロジェクトに接続

デプロイが正常に完了し、ノードがチェーンからデータのインデックスを作成したら、表示されたGraphQLクエリエンドポイントからプロジェクトに接続することができるようになります。

![プロジェクトを展開および同期する](/assets/img/projects-deploy-sync.png)

または、プロジェクトのタイトルの横にある3つの点をクリックして、SubQuery Explorer で表示することもできます。 There you can use the in browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).
