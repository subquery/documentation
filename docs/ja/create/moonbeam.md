# MoonbeamのEVMサポート

MoonbeamとMoonriverのEVM用にカスタムデータソースプロセッサを提供しています。 これにより、単一のSubQueryプロジェクト内で、Moonbeamのネットワーク上でEVMとSubstrateの両方のアクティビティをフィルタリングしてインデックス作成する簡単な方法です。

サポートされているネットワーク:

| ネットワーク名        | Websocket エンドポイント                                  | ディクショナリエンドポイント                                                       |
| -------------- | -------------------------------------------------- | -------------------------------------------------------------------- |
| Moonbeam       | _準備中_                                              | _準備中_                                                                |
| Moonriver      | `wss://moonriver.api.onfinality.io/public-ws`      | `https://api.subquery.network/sq/subquery/moonriver-dictionary`      |
| Moonbase Alpha | `wss://moonbeam-alpha.api.onfinality.io/public-ws` | `https://api.subquery.network/sq/subquery/moonbase-alpha-dictionary` |

**また、イベントと呼び出しハンドラを備えた[basic Moonriver EVM example project](https://github.com/subquery/tutorials-moonriver-evm-starter)を参照することもできます。**このプロジェクトは、[SubQuery Explorer](https://explorer.subquery.network/subquery/subquery/moonriver-evm-starter-project)でもご覧いただけます。

## はじめに

1. 依存関係としてカスタムデータソースを追加する `yarn add @subql/contract-processor`
2. 以下の説明に従ってカスタムデータソースを追加する
3. カスタムデータソースのハンドラをコードに追加する

## データソース仕様

| フィールド             | 型                                                              | 必須  | 説明                    |
| ----------------- | -------------------------------------------------------------- | --- | --------------------- |
| processor.file    | `'./node_modules/@subql/contract-processors/dist/moonbeam.js'` | Yes | データプロセッサコードへのファイル参照   |
| processor.options | [ProcessorOptions](#processor-options)                         | No  | Moonbeamプロセッサ固有のオプション |
| assets            | `{ [key: String]: { file: String }}`                           | No  | 外部ファイルのオブジェクト         |

### プロセッサオプション

| フィールド   | 型                | 必須 | 説明                                                          |
| ------- | ---------------- | -- | ----------------------------------------------------------- |
| abi     | String           | No | 引数を解析するためにプロセッサが使用する ABI です。 `assets` のキーでなければなりません         |
| address | String or `null` | No | イベントの発信元または発信先となるコントラクトアドレス。 `null` はコントラクトの作成呼び出しをキャプチャします |

## MoonbeamCall

ハンドラの引数が異なり、若干のフィルタリング変更以外は、[substrate/CallHandler](../create/mapping/#call-handler)と同じように動作する。

| フィールド  | 型                            | 必須  | 説明                   |
| ------ | ---------------------------- | --- | -------------------- |
| kind   | 'substrate/MoonbeamCall'     | Yes | 呼び出しハンドラであることを指定します。 |
| filter | [Call Filter](#call-filters) | No  | 実行するデータソースをフィルタする    |

### Call Filter

| フィールド    | 型      | 例                                             | 説明                                                                                                                                         |
| -------- | ------ | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| function | String | 0x095ea7b3, approve(address to,uint256 value) | [Function Signature](https://docs.ethers.io/v5/api/utils/abi/fragments/#FunctionFragment) 文字列、またはコントラクトで呼び出された関数をフィルタする関数 `sighash` のいずれか。 |
| from     | String | 0x6bd193ee6d2104f14f94e2ca6efefae561a4334b    | トランザクションを送信したイーサリアムアドレス                                                                                                                    |

### ハンドラ

通常のハンドラーとは異なり、パラメータとして`SubstrateExtrinsic`を得ることはできませんが、代わりにイーサリアム[TransactionResponse](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse)型に基づいた`MoonbeamCall`を得ることができます。

`TransactionResponse` 型からの変更:

- `wait` と `confirmations` プロパティがありません
- `success` プロパティが追加され、トランザクションが成功したかどうかが分かります
- `args` は `abi` フィールドが指定され、引数が正常に解析される場合に追加されます。

## MoonbeamEvent

ハンドラの引数が異なり、若干のフィルタリング変更以外は、[substrate/EventHandler](../create/mapping/#event-handler)と同じように動作する。

| フィールド  | 型                              | 必須  | 説明                   |
| ------ | ------------------------------ | --- | -------------------- |
| kind   | 'substrate/MoonbeamEvent'      | Yes | 呼び出しハンドラであることを指定します。 |
| filter | [Event Filter](#event-filters) | No  | 実行するデータソースをフィルタする    |

### イベントフィルタ

| フィールド  | 型            | 例                                                            | 説明                                                                                                                                               |
| ------ | ------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| topics | String array | Transfer(address indexed from,address indexed to,u256 value) | The topics filter follows the Ethereum JSON-PRC log filters, more documentation can be found [here](https://docs.ethers.io/v5/concepts/events/). |

<b>Note on topics:</b>
There are a couple of improvements from basic log filters:

- Topics don't need to be 0 padded
- [Event Fragment](https://docs.ethers.io/v5/api/utils/abi/fragments/#EventFragment) strings can be provided and automatically converted to their id

### ハンドラ

Unlike a normal handler you will not get a `SubstrateEvent` as the parameter, instead you will get a `MoonbeamEvent` which is based on Ethers [Log](https://docs.ethers.io/v5/api/providers/types/#providers-Log) type.

Changes from the `Log` type:

- `args` は `abi` フィールドが指定され、引数が正常に解析される場合に追加されます。

## Data Source Example

This is an extract from the `project.yaml` manifest file.

```yaml
dataSources:
  - kind: substrate/Moonbeam
    startBlock: 752073
    processor:
      file: './node_modules/@subql/contract-processors/dist/moonbeam.js'
      options:
        # Must be a key of assets
        abi: erc20
        # Contract address (or recipient if transfer) to filter, if `null` should be for contract creation
        address: '0x6bd193ee6d2104f14f94e2ca6efefae561a4334b'
    assets:
      erc20:
        file: './erc20.abi.json'
    mapping:
      file: './dist/index.js'
      handlers:
        - handler: handleMoonriverEvent
          kind: substrate/MoonbeamEvent
          filter:
            topics:
              - Transfer(address indexed from,address indexed to,uint256 value)
        - handler: handleMoonriverCall
          kind: substrate/MoonbeamCall
          filter:
            ## The function can either be the function fragment or signature
            # function: '0x095ea7b3'
            # function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
            # function: approve(address,uint256)
            function: approve(address to,uint256 value)
            from: '0x6bd193ee6d2104f14f94e2ca6efefae561a4334b'
```

## Known Limitations

- There is currently no way to query EVM state within a handler
- There is no way to get the transaction receipts with call handlers
- `blockHash` properties are currently left undefined, the `blockNumber` property can be used instead
