# 로컬에서 서브쿼리 실행하기

이 가이드는 인덱서와 쿼리 서비스를 모두 포함하는 인프라에서 로컬 SubQuery 노드를 실행하는 방법을 설명합니다. 자체 SubQuery 인프라를 실행하는 것에 대해 걱정하고 싶지 않으세요? SubQuery는 커뮤니티에 [관리 호스팅 서비스](https://explorer.subquery.network)를 무료로 제공합니다. [Follow our publishing guide](../run_publish/publish.md) to see how you can upload your project to [SubQuery Projects](https://project.subquery.network).

## 도커 사용

다른 솔루션은 `docker-compose.yml` 파일로 정의된 <strong>Docker Container</strong>를 실행하는 것입니다. 방금 초기화된 새 프로젝트의 경우 여기에서 아무 것도 변경할 필요가 없습니다.

프로젝트 디렉터리에서 다음 명령을 실행합니다.

```shell
docker-compose pull && docker-compose up
```

필요한 패키지([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query) 및 Postgres) 를 처음 다운로드하는 데 시간이 걸릴 수 있지만 곧 실행 중인 것을 볼 수 있습니다.

## 인덱서 실행 (subql/node)

요구 사항:

- [Postgres](https://www.postgresql.org/) 데이터베이스(버전 12 이상). [SubQuery 노드](#start-a-local-subquery-node)가 블록체인을 인덱싱하는 동안 추출된 데이터는 외부 데이터베이스 인스턴스에 저장됩니다.

A SubQuery node is an implementation that extracts Substrate/Polkadot-based blockchain data per the SubQuery project and saves it into a Postgres database.

### 설치

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

``` shell
# NPM
npm install -g @subql/node
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

``` shell
# NPM
npm install -g @subql/node-terra
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

``` shell
# NPM
npm install -g @subql/node-avalanche
````

</CodeGroupItem>
</CodeGroup>

Please note that we **DO NOT** encourage the use of `yarn global` due to its poor dependency management which may lead to an errors down the line.

설치가 완료되면 다음 명령으로 노드를 시작할 수 있습니다.


<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node <command>
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra <command>
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche <command> 
```

</CodeGroupItem>
</CodeGroup>

### Key Commands

The following commands will assist you to complete the configuration of a SubQuery node and begin indexing. 자세히 알아보려면 언제든지 `--help`를 실행할 수 있습니다.

#### 로컬 프로젝트 경로를 가리킴

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node -f your-project-path
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra -f your-project-path
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -f your-project-path
```

</CodeGroupItem>
</CodeGroup>

#### Use a Dictionary

Using a full chain dictionary can dramatically speed up the processing of a SubQuery project during testing or during your first index. In some cases, we've seen indexing performance increases of up to 10x.

A full chain dictionary pre-indexes the location of all events and extrinsics within the specific chain and allows your node service to skip to relevant locations when indexing rather than inspecting each block.

You can add the dictionary endpoint in your `project.yaml` file (see [Manifest File](../create/manifest.md)), or specify it at run time using the following command:

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot/Polkadot'>

```shell
subql-node --network-dictionary=https://api.subquery.network/sq/subquery/dictionary-polkadot
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra --network-dictionary=https://api.subquery.network/sq/subquery/terra-columbus-5-dictionary
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche --network-dictionary=https://api.subquery.network/sq/subquery/avalanche-dictionary
```

</CodeGroupItem>
</CodeGroup>

[Read more about how a SubQuery Dictionary works](../academy/tutorials_examples/dictionary.md).

#### Connect to database

```shell
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
subql-node -f your-project-path
```

Depending on the configuration of your Postgres database (e.g. a different database password), please ensure also that both the indexer (`subql/node`) and the query service (`subql/query`) can establish a connection to it.

#### Specify a configuration file

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node -c your-project-config.yml
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra -c your-project-config.yml
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -c your-project-config.yml
```

</CodeGroupItem>
</CodeGroup>

This will point the query node to a configuration file which can be in YAML or JSON format. Check out the example below.

```yaml
subquery: ../../../../subql-example/extrinsics
subqueryName: extrinsics
batchSize:100
localMode:true
```

#### 블록 가져오기 배치 크기 변경

```shell
subql-node -f your-project-path --batch-size 200

Result:
[IndexerManager] fetch block [203, 402]
[IndexerManager] fetch block [403, 602]
```

인덱서가 체인을 처음 인덱싱할 때 단일 블록을 가져오면 성능이 크게 저하됩니다. 가져오는 블록 수를 조정하기 위해 배치 크기를 늘리면 전체 처리 시간이 줄어듭니다. 현재 기본 배치 크기는 100입니다.

#### Local mode

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node -f your-project-path --local
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra -f your-project-path --local
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -f your-project-path --local
```

</CodeGroupItem>
</CodeGroup>

For debugging purposes, users can run the node in local mode. 로컬 모델로 전환하면 기본 스키마 `public`에 Postgres 테이블이 생성됩니다.

로컬 모드를 사용하지 않는 경우 초기 `subquery_` 및 해당 프로젝트 테이블이 있는 새 Postgres 스키마가 생성됩니다.

#### 노드 상태 확인

실행 중인 SubQuery 노드의 상태를 확인하고 모니터링하는 데 사용할 수 있는 2개의 엔드포인트가 있습니다.

- 간단한 200 응답을 반환하는 상태 확인 엔드포인트
- 실행 중인 SubQuery 노드에 대한 추가 분석을 포함하는 메타데이터 엔드포인트

이것을 SubQuery 노드의 기본 URL에 추가합니다. 예를 들어 `http://localhost:3000/meta`는 다음을 반환합니다.

```bash
{
    "currentProcessingHeight": 1000699,
    "currentProcessingTimestamp": 1631517883547,
    "targetHeight": 6807295,
    "bestHeight": 6807298,
    "indexerNodeVersion": "0.19.1",
    "lastProcessedHeight": 1000699,
    "lastProcessedTimestamp": 1631517883555,
    "uptime": 41.151789063,
    "polkadotSdkVersion": "5.4.1",
    "apiConnected": true,
    "injectedApiConnected": true,
    "usingDictionary": false,
    "chain": "Polkadot",
    "specName": "polkadot",
    "genesisHash": "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3",
    "blockTime": 6000
}
```

`http://localhost:3000/health`는 성공하면 HTTP 200을 반환합니다.

인덱서가 비정상인 경우 오류 500 값이 반환됩니다. 노드가 부팅 중인 과정에서도 종종 볼 수 있습니다.

```shell
{
    "status": 500,
    "error": "Indexer is not healthy"
}
```

잘못된 URL을 사용하면 찾을 수 없음 오류 404가 반환됩니다.

```shell
{
"statusCode": 404,
"message": "Cannot GET /healthy",
"error": "Not Found"
}
```

#### 프로젝트 디버그

[노드 검사기](https://nodejs.org/en/docs/guides/debugging-getting-started/)를 사용하여 다음 명령어를 실행하세요.

```shell
node --inspect-brk <path to subql-node> -f <path to subQuery project>
```

예제:

```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad에서 수신하는 디버거
도움이 필요하면 https://nodejs.org/en/docs/inspector를 참조하세요.
```

이후, 크롬 개발자 도구를 통해 Source > Filesystem을 열고, 작업공간에 프로젝트를 추가하고 디버깅을 시작합니다. For more information, check out [How to debug a SubQuery project](https://doc.subquery.network/academy/tutorials_examples/debug-projects/)

## 쿼리 서비스 실행(subql/query)

### 설치

```shell
# NPM
npm install -g @subql/query
```

`yarn global`의 사용을 권장하지 **않습니다**. 잘못된 종속성 관리로 인해 오류가 발생할 수 있기 때문입니다.

### 쿼리 서비스 실행

```
export DB_HOST=localhost
subql-query --name <project_name> --playground
```

[프로젝트를 초기화](../quickstart/quickstart.md#initialise-the-starter-subquery-project)할 때 프로젝트 이름이 프로젝트 이름과 동일한지 확인하세요. 또한 환경 변수가 올바른지 확인하십시오.

Subql-query 서비스를 성공적으로 실행한 후 브라우저를 열고 `http://localhost:3000`으로 이동합니다. Explorer에 표시되는 GraphQL 플레이그라운드와 쿼리할 준비가 된 스키마가 표시되어야 합니다.
