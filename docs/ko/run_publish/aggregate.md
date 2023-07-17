# 집계 함수

## 그룹화 기준

SubQuery는 고급 집계 함수를 지원하여 쿼리 중에 값 집합에 대해 계산을 수행할 수 있도록 합니다.

집계 함수는 일반적으로 쿼리의 GroupBy 함수와 함께 사용됩니다.

GroupBy를 사용하면 단일 쿼리에서 SubQuery에서 집합의 고유한 값을 빠르게 가져올 수 있습니다.

![Graphql Groupby](/assets/img/graphql_aggregation.png)

## 고급 집계 기능

SubQuery는 안전하지 않은 모드일 때 다음 집계 함수를 제공합니다.

- `sum` (숫자와 같은 필드에 적용) - 모든 값을 함께 더한 결과
- `distinctCount` (모든 필드에 적용) - 고유 값의 개수
- `min` (숫자와 같은 필드에 적용) - 가장 작은 값
- `max` (숫자와 같은 필드에 적용) - 가장 큰 값
- `average` (숫자와 유사한 필드에 적용) - 평균(산술 평균) 값
- `stddevSample` (숫자 유사 필드에 적용) - 값의 샘플 표준 편차
- `stddevPopulation` (숫자와 유사한 필드에 적용) - 값의 모집단 표준 편차
- `varianceSample` (숫자와 같은 필드에 적용) - 값의 표본 분산
- `variancePopulation` (숫자와 같은 필드에 적용) - 값의 모집단 분산

SubQuery's implementation of aggregate functions is based on [pg-aggregates](https://github.com/graphile/pg-aggregates), you can find more information there.

::: warning Important Please note that you must enable the `--unsafe` flag on the query service in order to use these functions. [Read more](./references.md#unsafe-query-service).

Also, note that the `--unsafe` command will prevent your project from being run in the SubQuery Network, and you must contact support if you want this command to be run with your project in [SubQuery's managed service](https://managedservice.subquery.network). :::
