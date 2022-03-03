# 集計関数

## Group By

SubQuery は高度な集約関数をサポートしており、クエリ中に一連の値に対して計算を実行することができます。

集計関数は通常、クエリの GroupBy 関数で使用されます。

GroupBy を使用すると、1 つのクエリで SubQuery から異なる値をすばやく取得できます。

![Graphql Groupby](/assets/img/graphql_aggregation.png)

## 高度な集計関数

SubQuery は unsafe モードの場合に以下の集約関数を提供します。

- `sum` (数値のようなフィールドに適用) - すべての値を足した結果
- `distinctCount`（すべてのフィールドに適用） - 異なる値の数をカウントします。
- `min` (数値のようなフィールドに適用) - 最小の値
- `max` (数値のようなフィールドに適用) - 最大値
- `average` (数値のようなフィールドに適用) - 平均 (算術平均) 値
- `stddevSample` (数値のようなフィールドに適用) - 値の標準偏差のサンプル
- `stddevPopulation` (数値のようなフィールドに適用) - 値の母集団標準偏差
- `varianceSample`（数値のようなフィールドに適用） - 値の分散のサンプル
- `variancePopulation`（数値のようなフィールドに適用） - 値の母分散

SubQuery の集約関数の実装は[pg-aggregates](https://github.com/graphile/pg-aggregates)に基づいており、より詳しい情報はそちらを参照してください。

**これらの関数を使用するには、クエリサービスの `--unsafe` フラグを有効にする必要があります。 [続きを読む](../run_publish/references.md#unsafe-2). `--unsafe` コマンドを使用すると、SubQuery Network でプロジェクトを実行できなくなることに注意してください。このコマンドを SubQuery のマネージド サービス ([project.subquery.network](https://project.subquery.network)) でプロジェクトと共に実行したい場合は、サポートに連絡する必要があります。**
