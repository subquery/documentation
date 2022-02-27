# 動的データソース

プロジェクトが開始されたときに、データソースのすべてのパラメータがわからない場合があります。 この例は、後で新しいコントラクトインスタンスを作成するコントラクトファクトリです。 コントラクトアドレスが何であるかを事前に知ることは不可能です。 そこで、新しいデータソースを動的に作成することができます。

## `templates`フィールド

動的データソースを使用するには、少なくとも `0.2.1` のバージョンが必要です。 `0.2.0` を使用している場合は、バージョンを変更するだけです。 下位バージョンの場合は、 `subql migrate` で `0.2.0` に更新する必要があります。

バージョン `0.2.1` で新しい `templates` フィールドが導入されます。 テンプレートはデータソースと同じですが、いくつかの違いがあります。

* テンプレートを識別するには、 `name` が必要です
* `startBlock` はもう必要ありません。 データソースが作成されたブロックに設定されます
* カスタムデータソースの場合、`processor.options` フィールドに部分的に入力することも可能です。残りのオプションは、データソースのインスタンス化の際に提供されます。

## サンプルプロジェクト

動的データソースの使い方を紹介するには、例を挙げるのが一番です。

以下の例は、取引ペアが追加されたときに新しいコントラクトを展開するファクトリーコントラクトを持つ分散取引所です。 プロジェクト実行時に、作成済みまたは作成予定のすべての取引ペアコントラクトのアドレスを把握することはできません。 データソースは、新しく作成された取引ペアコントラクトをインデックスするために、テンプレートからマッピングハンドラによって動的に作成することができます。


### `project.yaml`
```yaml
specVersion: 0.2.1
name: example-project
version: 1.0.0
description: ''
repository: ''
schema:
  file: ./schema.graphql
network:
  genesisHash: '0x91bc6e169807aaa54802737e1c504b2577d4fafedd5a02c10293b1cd60e39527'
  chaintypes:
    file: "./types.yaml"
dataSources:
  - kind: substrate/Moonbeam
    startBlock: 1358833
    processor:
      file: './node_modules/@subql/contract-processors/dist/moonbeam.js'
      options:
        abi: exchangeFactory
        address: '0x0000000000000000000000000000000000000000'
    assets:
      exchangeFactory:
        file: ./src/exchangeFactory.abi.json
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleNewTradingPair
          kind: substrate/MoonbeamEvent
          filter:
            topics:
              - newTradingPair(address exchange, address token1, address token2)

templates:
  - name: TradingPair
    kind: substrate/Moonbeam
    processor:
      file: './node_modules/@subql/contract-processors/dist/moonbeam.js'
      options:
        abi: tradingPair
        # we do not know the address at this point, it will be provided when instantiated
    assets:
      tradingPair:
        file: ./src/tradingPair.abi.json
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleLiquidityAdded
          kind: substrate/MoonbeamEvent
          filter:
            topics:
              - liquidityAdded(address provider, uint256 amount1, uint256 amount2)
```

### `mappingHandlers.ts`

```ts
// This function is defined using `subql codegen` cli command
import { createTradingPairDatasource } from '../types';
import {MoonbeamEvent} from '@subql/contract-processors/dist/moonbeam';

async function handleNewTradingPair(event: MoonbeamEvent): Promise<void> {
  const { exchange, token1, token2 } = event.args;

  // Create a new datasource providing the address of the trading pair exchange contract
  await createTradingPairDatasource({ address: exchange });
}

async function handleLiquidityAdded(event: MoonbeamEvent): Promise<void> {
  /* mapping fuction implementation here */
}
```


## プロジェクトの動的データソースを確認する

動的データソースはプロジェクトのメタデータに保存されます。 以下のようにクエリできる詳細を確認する必要がある場合は、次のようにします。

```gql
{
  _metadata {
    dynamicDatasources
  }
}
```

結果
```
{
  "data": {
    "_metadata": {
      "dynamicDatasources": "[{\"templateName\":\"TradingPair\",\"args\":{\"address\":\"0x0000000000000000000000000000000000000000\"},\"startBlock\":1358833}]"
    }
  }
}
```

