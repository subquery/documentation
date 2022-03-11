# 別のブロックの高さで開始するには？

## ビデオのガイド

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/ZiNSXDMHmBk" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## はじめに

既定では、すべてのスタータープロジェクトは創世記のブロックからブロックチェーンの同期を開始します。 つまり、ブロック1から。 大きなブロックチェーンの場合、完全に同期するのに通常数日または数週間がかかる可能性があります。

SubQueryノードの同期をゼロ以外の高さから開始するには、project.yaml ファイルをいじって、startBlock キーを変更するだけでよい。

以下は project.yaml ファイルで、開始ブロックが 1,000,000 に設定されています。

```shell
specVersion: 0.0.1
description: ""
repository: ""
schema: ./schema.graphql
network:
  endpoint: wss://polkadot.api.onfinality.io/public-ws
  dictionary: https://api.subquery.network/sq/subquery/dictionary-polkadot
dataSources:
  - name: main
    kind: substrate/Runtime
    startBlock: 1000000
    mapping:
      handlers:
        - handler: handleBlock
          kind: substrate/BlockHandler
```

## ゼロから始まらない理由は？

主な理由は、ブロックチェーンを同期させる時間を短縮できることです。 つまり、最後の3ヶ月間の取引にしか興味がない場合、その最後の3ヶ月分しか同期しないので待ち時間が少なく、より早く開発を開始できます。

## ゼロからスタートしないことの欠点は何？

最も明らかな欠点は、ブロックチェーン上の持っていないブロックのデータをクエリできないことです。

## 現在のブロックチェーンの高さを把握する方法には？

Polkadotネットワークをご利用の場合は、[https://polkascan.io/](https://polkascan.io/) にアクセスしてネットワークを選択し、「Finalised Block」の数値を見ます。

## リビルドやコード生成をする必要があるかどうか？

いいえ。 本質的に設定ファイルであるproject.yamlを変更するため、スクリプト類コードをリビルドまたはコード生成する必要はありません。
