# 커맨드 라인 플래그

## subql (cli)

### --help

```shell
> subql --help

COMMANDS
  build     Build this SubQuery project code
  codegen   Generate schemas for graph node
  help      display help for subql
  init      Initialize a scaffold subquery project
  migrate   Migrate Subquery project manifest v0.0.1 to v0.2.0
  publish   Upload this SubQuery project to IPFS
  validate  Check a folder or github repo is a validate subquery project
```

### build

이 명령은 webpack을 사용하여 SubQuery 프로젝트의 번들을 생성합니다.

| 옵션                 | 설명                                                                                                         |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| -l, --location     | SubQuery 프로젝트의 로컬 폴더(이미 폴더에 없는 경우)                                                                         |
| -o, --output       | 빌드의 출력 폴더를 지정하십시오. e.g. 빌드 폴더                                                                              |
                                                   | development | dev) | [ default: production ] |

- `subql build`를 사용하면 항상 빌드되지만 내보내기 필드에 추가 진입점을 지정할 수 있습니다. 자동으로 `index.ts`

- 내보내기 필드를 사용하려면 @subql/cli v0.19.0 이상이 필요합니다.

- 모든 `내보내기` 필드는 문자열 유형에 매핑되어야 합니다(예: `"entry": "./src/file.ts"`). 그렇지 않으면 빌드에서 무시됩니다.

[추가 예](https://doc.subquery.network/create/introduction/#build).

## subql-node

### --help

다음은 help 옵션을 보여줍니다.

```shell
> subql-node --help
Options:
      --help                Show help                                  [boolean]
      --version             Show version number                        [boolean]
  -f, --subquery            Local path of the subquery project          [string]
      --subquery-name       Name of the subquery project   [deprecated] [string]
  -c, --config              Specify configuration file                  [string]
      --local               Use local mode                [deprecated] [boolean]
      --force-clean         Force clean the database, dropping project schemas
                            and tables                                 [boolean]
      --db-schema           Db schema name of the project               [string]
      --unsafe              Allows usage of any built-in module within the
                            sandbox                    [boolean][default: false]
      --batch-size          Batch size of blocks to fetch in one round  [number]
      --scale-batch-size    scale batch size based on memory usage
                                                      [boolean] [default: false]
      --timeout             Timeout for indexer sandbox to execute the mapping
                            functions                                   [number]
      --debug               Show debug information to console output. will
                            forcefully set log level to debug
                                                      [boolean] [default: false]
      --profiler            Show profiler information to console output
                                                      [boolean] [default: false]
      --subscription        Enable subscription       [boolean] [default: false]                                                     
      --network-endpoint    Blockchain network endpoint to connect      [string]
      --output-fmt          Print log as json or plain text
                                           [string] [choices: "json", "colored"]
      --log-level           Specify log level to print. Ignored when --debug is
                            used
          [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                                       "silent"]
      --migrate             Migrate db schema (for management tables only)
                                                      [boolean] [default: false]
      --timestamp-field     Enable/disable created_at and updated_at in schema
                                                      [boolean] [default: false]
  -d, --network-dictionary  Specify the dictionary api for this network [string]
  -m, --mmr-path            Local path of the merkle mountain range (.mmr) file
                                                                        [string]
      --proof-of-index      Enable/disable proof of index
                                                      [boolean] [default: false]
  -p, --port                The port the service will bind to           [number]
```

### --version

현재 버전이 표시됩니다.

```shell
> subql-node --version
0.19.1
```

### -f, --subquery

이 플래그를 사용하여 SubQuery 프로젝트 시작합니다.

```shell
subql-node -f . // OR
subql-node --subquery .
```

### --subquery-name (더이상 사용되지 않음)

이 플래그를 사용하면 프로젝트의 인스턴스를 생성하는 것처럼 작동하는 프로젝트 이름을 제공할 수 있습니다. 새 이름을 제공하면 새 데이터베이스 스키마가 생성되고 블록 동기화가 0부터 시작됩니다. `--db-schema`를 위해 더 이상 사용되지 않음

```shell
subql-node -f . --subquery-name=test2
```

### -c, --config

이러한 다양한 구성은 모두 .yml 또는 .json 파일에 배치한 다음 config 플래그로 참조할 수 있습니다.

샘플 subquery_config.yml 파일:

```shell
subquery: . // Mandatory. This is the local path of the project. The period here means the current local directory.
subqueryName: hello // Optional name
batchSize: 55 // Optional config
```

이 파일을 프로젝트와 동일한 디렉토리에 배치합니다. 그런 다음 현재 프로젝트 디렉터리에서 다음을 실행합니다.

```shell
> subql-node -c ./subquery_config.yml
```

### --local (더이상 사용되지 않음)

이 플래그는 기본 "postgres" 스키마에서 기본 starter_entity 테이블을 생성하는 디버깅 목적으로 주로 사용됩니다.

```shell
subql-node -f . --local
```

이 플래그를 사용하고 나면 제거한다고 해서 다른 데이터베이스를 가리키는 것은 아닙니다. 른 데이터베이스를 다시 가리키려면 새 데이터베이스를 만들고 환경 설정을 이 새 데이터베이스로 변경해야 합니다. 즉, "내보내기 DB_DATABASE="<new_db_here>"

### --force-clean

이 플래그는 프로젝트 스키마와 테이블을 강제로 다시 생성하여 프로젝트의 새 실행이 항상 깨끗한 상태로 작동하도록 graphql 스키마를 반복적으로 개발할 때 유용합니다. 이 플래그는 인덱스된 모든 데이터도 지울 것입니다.

### --db-schema

이 플래그를 사용하면 프로젝트 데이터베이스 스키마의 이름을 제공할 수 있습니다. 새 이름을 제공하면 구성된 이름으로 새 데이터베이스 스키마가 생성되고 블록 인덱싱이 시작됩니다.

```shell
subql-node -f . --db-schema=test2
```

### --subscription
This will create a notification trigger on entity, this also is the prerequisite to enable subscription feature in query service.

### --unsafe

SubQuery 프로젝트는 일반적으로 보안을 위해 자바스크립트 샌드박스에서 실행되어 프로젝트가 시스템에 액세스할 수 있는 범위를 제한합니다. 샌드박스는 사용 가능한 자바스크립트 가져오기를 다음 모듈로 제한합니다.

```javascript
["assert", "buffer", "crypto", "util", "path"];
```

이것은 보안을 강화하지만 이것이 SubQuery의 사용 가능한 기능을 제한한다는 것을 이해합니다. `--unsafe` 명령은 보안 감소의 절충안으로 샌드박스 기능을 크게 향상시키는 모든 기본 자바스크립트 모듈을 가져옵니다.

**`--unsafe` 명령은 프로젝트가 SubQuery 네트워크에서 실행되는 것을 방지하며 이 명령을 SubQuery의 관리 서비스([project.subquery.network](https://project.subquery.network))에서 프로젝트와 함께 실행하려면 지원팀에 문의해야 합니다.**

### --batch-size

이 플래그를 사용하면 명령줄에서 배치 크기를 설정할 수 있습니다. 구성 파일에 배치 크기도 설정되어 있으면 이것이 우선합니다.

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

### --scale-batch-size

메모리 사용량에 따라 블록 가져오기 배치 크기 조정

### --timeout

블록 매핑 함수가 시간 초과 예외를 발생시키기 전에 블록에 대해 매핑 함수를 실행하도록 자바스크립트 샌드박스에 대한 사용자 지정 시간 초과를 설정합니다.

### --debug

그러면 디버그 정보가 콘솔 출력으로 출력되고 로그 수준이 디버그로 강제 설정됩니다.

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### --profiler

프로파일러 정보를 보여줍니다.

```shell
subql-node -f . --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### --network-endpoint

이 플래그를 사용하면 매니페스트 파일에서 네트워크 끝점 구성을 재정의할 수 있습니다.

```shell
subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"
```

이것은 매니페스트 파일에서도 설정해야 합니다. 그렇지 않으면 다음을 얻게 됩니다.

```shell
ERROR Create Subquery project from given path failed! Error: failed to parse project.yaml.
An instance of ProjectManifestImpl has failed the validation:
 - property network has failed the following constraints: isObject
 - property network.network has failed the following constraints: nestedValidation
```

### --output-fmt

두 가지 다른 터미널 출력 형식이 있습니다. JSON 또는 컬러. 색상은 기본값이며 색상 텍스트를 포함합니다.

```shell
> subql-node -f . --output-fmt=json
{"level":"info","timestamp":"2021-08-10T11:58:18.087Z","pid":24714,"hostname":"P.local","category":"fetch","message":"fetch block [10501,10600], total 100 blocks"}
```

```shell
> subql-node -f . --output-fmt=colored
2021-08-10T11:57:41.480Z <subql-node> INFO node started
(node:24707) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
2021-08-10T11:57:48.981Z <fetch> INFO fetch block [10201,10300], total 100 blocks
2021-08-10T11:57:51.862Z <fetch> INFO fetch block [10301,10400], total 100 blocks
```

### --log-level

선택할 수있는 7 가지 옵션이 있습니다. “fatal”, “error”, “warn”, “info”, “debug”, “trace”, “silent”. 아래의 예는 silent를 보여줍니다. 터미널에 아무 것도 인쇄되지 않으므로 노드가 작동하는지 여부를 알 수 있는 유일한 방법은 데이터베이스에 행 수를 쿼리하거나(subquery_1.starter_entities에서 count(\*) 선택) 블록 높이를 쿼리하는 것입니다.

```shell
> subql-node -f . --log-level=silent
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(Use `node --trace-warnings ...` to show where the warning was created)
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [DEP0152] DeprecationWarning: Custom PerformanceEntry accessors are deprecated. Please use the detail property.
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
```

<!-- ### --migrate TBA -->

### --timestamp-field

기본값은 'true'로 되어있습니다. 다음을 사용하여 false로 설정한 경우:

```shell
> subql-node -f . –timestamp-field=false
```

그러면 starter_entities 테이블에서 created_at 및 updated_at 열이 제거됩니다.

### -d, --network-dictionary

이를 통해 [https://explorer.subquery.network/](https://explorer.subquery.network/) (사전 검색)에서 제공 및 호스팅되는 무료 서비스인 사전 끝점을 지정할 수 있으며 다음의 API 끝점을 제공합니다. https://api.subquery/network/sq/subquery/dictionary-polkadot

일반적으로 이것은 매니페스트 파일에 설정되지만 아래는 명령줄에서 인수로 사용하는 예를 보여줍니다.

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

[Read more about how a SubQuery Dictionary works](../academy/tutorials_examples/dictionary.md).

### -p, --port

하위 쿼리 인덱싱 서비스가 바인딩되는 포트입니다. 기본적으로 `3000`으로 설정되어 있습니다.

## subql-query

### --help

다음은 help 옵션을 보여줍니다.

```shell
Options:
      --help          Show help                                          [boolean]
      --version       Show version number                                [boolean]
  -n, --name          Project name                             [string] [required]
      --playground    Enable graphql playground                          [boolean]
      --subscription  Enable subscription               [boolean] [default: false]   
      --output-fmt    Print log as json or plain text
                        [string] [choices: "json", "colored"] [default: "colored"]
      --log-level     Specify log level to print.
            [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                       "silent"] [default: "info"]
      --log-path      Path to create log file e.g ./src/name.log          [string]
      --log-rotate    Rotate log files in directory specified by log-path
                                                      [boolean] [default: false]
      --indexer       Url that allows query to access indexer metadata    [string]
      --unsafe        Disable limits on query depth and allowable number returned
                      query records                                      [boolean]
  -p, --port          The port the service will bind to                   [number]
```

### --version

현재 버전이 표시됩니다.

```shell
> subql-query --version
0.7.0
```

### -n, --name

이 플래그는 쿼리 서비스를 시작하는 데 사용됩니다. 인덱서를 실행할 때 --subquery-name 플래그가 제공되지 않으면 여기에서 이름은 기본 프로젝트 이름을 참조합니다. --subquery-name이 설정되면 여기의 이름은 설정된 이름과 일치해야 합니다.

```shell
> subql-node -f . // --subquery-name not set

> subql-query -n subql-helloworld  --playground // the name defaults to the project directory name
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground  // the name points to the subql-helloworld project but with the name of hiworld
```

### --playground

이 플래그는 graphql 플레이그라운드를 활성화하므로 어떤 용도로든 기본적으로 항상 포함되어야 합니다.

### --output-fmt

[--output-fmt](#output-fmt)을 보세요.

### --log-level

[--log-level](#log-level)를 보세요.

### --log-path

기록할 파일의 경로를 제공하여 파일 기록 활성화

### --log-rotate

1d 회전 간격, 최대 7개 파일 및 최대 파일 크기 1GB 옵션으로 파일 로그 회전을 활성화합니다.

### --indexer

인덱서의 끝점 위치에 대한 사용자 지정 Url을 설정합니다. 쿼리 서비스는 인덱서 상태, 메타데이터 및 준비 상태에 대해 이러한 끝점을 사용합니다.

### --subscription

This flag enables [GraphQL Subscriptions](./subscription.md), to enable this feature requires `subql-node` also enable `--subscription`

### --unsafe

쿼리 서비스는 무제한 graphql 쿼리에 대해 100개의 엔터티로 제한됩니다. 안전하지 않은 플래그는 쿼리 서비스에서 성능 문제를 일으킬 수 있는 이 제한을 제거합니다. 대신 쿼리에 [페이지를 매기는 것](https://graphql.org/learn/pagination/)이 좋습니다.

This flag enables certain aggregation functions including sum, max, avg and others. Read more about this feature [here](./aggregate.md)

엔티티 제한으로 인해 기본적으로 비활성화되어 있습니다.

**`--unsafe` 명령은 프로젝트가 SubQuery 네트워크에서 실행되는 것을 방지하며 이 명령을 SubQuery의 관리 서비스 [project.subquery.network](https://project.subquery.network)에서 프로젝트와 함께 실행하려면 지원팀에 문의해야 합니다.**

### --port

SubQuery 쿼리 서비스가 바인딩되는 포트입니다. 기본적으로 `3000`으로 설정되어 있습니다.
