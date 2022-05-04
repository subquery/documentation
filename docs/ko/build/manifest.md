# Manifest 파일

Manifest `project.yaml` 파일은 프로젝트의 시작점으로 볼 수 있으며 서브쿼리가 체인 데이터를 인덱스화 및 변환하는 방법에 대한 대부분의 세부사항을 정의합니다.

매니페스트는 YAML 또는 JSON 형식일 수 있습니다. 이 문서의 모든 예제는 YAML을 기준으로 합니다. 다음은 기본 `project.yaml`의 표준 예시입니다.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ` yml specVersion: 0.2.0 name: example-project # Provide the project name version: 1.0.0 # Project version description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: file: ./schema.graphql # The location of your GraphQL schema file network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' # Genesis hash of the network endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: file: "./dist/index.js" handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> <CodeGroupItem title="v0.0.1"> ` yml specVersion: "0.0.1" description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: ./schema.graphql # The location of your GraphQL schema file network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - name: main kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional but suggested to speed up event processing module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> </CodeGroup>

## v0.0.1에서 v0.2.0으로 업그레이드<Badge text="upgrade" type="warning"/>

**specVersion v0.0.1에 따른 프로젝트의 경우, `subql migrate`을 통해 빠른 업그레이드가 가능합니다. 보다 많은 정보를 원하신다면, [이곳을](#cli-options) 참조해주십시오.**

`network` 기반:

- 사용 중인 체인 식별에 도움을 줄 수 있는 새로운 **요구되는** `genesisHas` 필드가 있습니다.
- v0.2.0 이상에서 사용자 지정 체인을 참조하는 경우에는 외부 [chaintype 파일](#custom-chains)을 참조할 수 있습니다.

`dataSources` 기반:

- 매핑 핸들러에 대한 `index.js` 엔트리 포인트는 직접 연결할 수 있습니다. 기본적으로 이 `index.js`는 빌드 프로세스 중 `index.ts`에서 생성됩니다.
- 이제 데이터 소스는 일반 런타임 데이터 소스 또는 [커스텀 데이터 소스](#custom-data-sources)가 될 수 있습니다.

### CLI 옵션

기본적으로 CLI는 사양 버전 v0.2.0에 대한 SubQuery 프로젝트를 생성합니다. 이 동작은 `subql init --specVersion 0.0.1 PROJECT_NAME`을 실행하여 재정의할 수 있지만 향후 SubQuery 호스팅 서비스에서 프로젝트를 지원하지 않을 것이기 때문에 권장하지 않습니다.

`subql migrate`는 기존 프로젝트에서 실행하여 프로젝트 Manifest를 최신 버전으로 마이그레이션할 수 있습니다.

USAGE $ subql init [PROJECTNAME]

ARGUMENTS PROJECTNAME Give the starter project name

| 옵션                      | 설명                                                    |
| ----------------------- | ----------------------------------------------------- |
| -f, --force             |                                                       |
| -l, --location=location | 프로젝트를 생성할 로컬 폴더                                       |
| --install-dependencies  | 종속성들의 설치                                              |
| --npm                   | yarn 대신 NPM을 강제로 사용, `install-dependencies` 플래그에서만 작동 |
| --specVersion=0.0.1     | 0.2.0 [기본값: 0.2.0] | 프로젝트에서 사용할 사양 버전                 |

## 개요

### 상위레벨 스펙

| 필드            | v0.0.1                              | v0.2.0                      | 설명                                             |
| --------------- | ----------------------------------- | --------------------------- | ------------------------------------------------ |
| **specVersion** | String                              | String                      | `0.0.1` 또는 `0.2.0` - Manifest 파일의 사양 버전 |
| **name**        | 𐄂                                   | String                      | 프로젝트명                                       |
| **version**     | 𐄂                                   | String                      | 프로젝트 버전                                    |
| **description** | String                              | String                      | 프로젝트 설명                                    |
| **repository**  | String                              | String                      | Git repository 주소                              |
| **schema**      | String                              | [Schema Spec](#schema-spec) | GraphQL schema file의 위치                       |
| **network**     | [Network Spec](#network-spec)       | Network Spec                | 인덱싱될 네트워크의 상세내용                     |
| **dataSources** | [DataSource 사양](#datasource-spec) | DataSource 사양             |                                                  |

### Schema Spec

| 필드     | v0.0.1 | v0.2.0 | 설명                       |
| -------- | ------ | ------ | -------------------------- |
| **file** | 𐄂      | String | GraphQL schema file의 위치 |

### Network Spec

| 필드            | v0.0.1 | v0.2.0        | 설명                                                                                                                                                                                                                  |
| --------------- | ------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **genesisHash** | 𐄂      | String        | 네트워크의 Genesis Hash                                                                                                                                                                                               |
| **endpoint**    | String | String        | `network. endpoint` 은 인덱스화하는 블록체인의 wss 또는 ws 엔드포인트를 정의합니다. **풀 아카이브 노드여야 합니다**. [OnFinality](https://app.onfinality.io)에서 모든 파라체인의 endpoint를 무료로 검색할 수 있습니다 |
| **dictionary**  | String | String        | 처리속도를 높이기 위한 풀 체인 Dictionary의 HTTP endpoint 제공이 제안됩니다. - [how a SubQuery Dictionary works](../academy/tutorials_examples/dictionary.md)를 참고하세요.                                           |
| **chaintypes**  | 𐄂      | {file:String} | 체인 형식의 파일을 찾으려면 `.json` 또는 `.yaml` 포맷을 이용하세요                                                                                                                                                    |

### DataSource 사양

필터링 및 추출할 데이터와 적용할 데이터 변환에 대한 매핑 함수 처리기의 위치를 정의합니다.
| 필드             | v0.0.1                                                    | v0.2.0                                                                           | 설명                                                                                                      |
| -------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **name**       | String                                                    | 𐄂                                                                                | 데이터 출처 명명                                                                                               |
| **kind**       | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | 블록, 이벤트 및 외부(호출)와 같은 기본 기판 런타임의 데이터 유형을 지원합니다. <br /> v0.2.0부터 스마트 계약과 같은 사용자 정의 런타임의 데이터를 지원합니다. |
| **startBlock** | Integer                                                   | Integer                                                                          | 이것은 인덱싱 시작 블록을 변경하고 더 적은 데이터로 초기 블록을 건너뛰려면 이 값을 높게 설정합니다.                                               |
| **mapping**    | Mapping Spec                                              | Mapping Spec                                                                     |                                                                                                         |
| **filter**     | [network-filters](./manifest/#network-filters)            | 𐄂                                                                                | 네트워크 끝점 사양 이름으로 실행할 데이터 원본 필터링                                                                          |

### Mapping Spec

| 필드                   | v0.0.1                                                         | v0.2.0                                                                        | 설명                                                                                                                                                                                                        |
| ---------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **file**               | String                                                         | 𐄂                                                                             | Entry 맵핑을 위한 path                                                                                                                                                                                      |
| **handlers & filters** | [기본 핸들러와 필터](./manifest/#mapping-handlers-and-filters) | 기본 핸들러와 필터, <br />[Custom handlers and filters](#custom-data-sources) | [mapping functions](./mapping.md) 과 그에 상응하는 핸들러 유형을 추가적인 맵핑 필터와 함께 나열하세요. <br /><br /> 커스텀 런타임 맵핑을 위해서는 [Custom data sources](#custom-data-sources)을 참조하세요. |

## Data Source와 맵핑

이 섹션에서는 기본 기판 런타임과 해당 매핑에 대해 설명합니다. 여기 예제가 있습니다.

```yaml
dataSources:
  - kind: substrate/Runtime # Indicates that this is default runtime
    startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data
    mapping:
      file: dist/index.js # Entry path for this mapping
```

### 맵핑 핸들러와 필터

다음 표에서는 다양한 처리기에서 지원하는 필터에 대해 설명합니다.

**적절한 매핑 필터가 있는 이벤트 및 호출 핸들러만 사용할 때 SubQuery 프로젝트가 훨씬 더 효율적입니다.**

| 핸들러                                      | 지원되는 필터                |
| ------------------------------------------- | ---------------------------- |
| [블록핸들러](./mapping.md#block-handler)    | `specVersion`                |
| [이벤트 핸들러](./mapping.md#event-handler) | `module`,`method`            |
| [콜핸들러](./mapping.md#call-handler)       | `module`,`method` ,`success` |

기본 런타임 매핑 필터는 매핑 핸들러를 트리거할 블록, 이벤트 또는 외부 항목을 결정하는 데 매우 유용한 기능입니다.

필터 조건을 만족하는 들어오는 데이터만 매핑 기능에 의해 처리됩니다. 매핑 필터는 선택 사항이지만 SubQuery 프로젝트에서 처리하는 데이터의 양을 크게 줄이고 인덱싱 성능을 향상시키므로 적극 권장됩니다.

```yaml
# 콜핸들러의 필터 예제
filter:
  module: balances
  method: Deposit
  success: true
```

- Module 및 Method 필터는 Substrate 기반 체인에서 지원됩니다.
- `success` 필터는 Boolean 값을 취해, 성공적인 상태의 외인성을 필터링 하기 위해서 사용할 수 있습니다.
- `specVersion` 필터는 Substrate 블록의 스펙 버전 범위를 지정합니다. 다음은 버전 범위를 설정하는 예제입니다.

```yaml
filter:
  specVersion: [23, 24]   #Index block with specVersion in between 23 and 24 (inclusive).
  specVersion: [100]      # Index block with specVersion greater than or equal 100.
  specVersion: [null, 23] # Index block with specVersion less than or equal 23.
```

## 커스텀 체인

### 네트워크 스펙

다른 Polkadot parachain 또는 사용자 지정 기판 체인에 연결할 때 이 매니페스트의 [네트워크 사양](#network-spec) 섹션을 편집해야 합니다.

`genesisHash`는 항상 사용자 지정 네트워크의 첫 번째 블록의 해시여야 합니다. [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0)로 이동하여 **블록 0**에서 해시를 찾으면 이것을 쉽게 폐기할 수 있습니다(아래 이미지 참조).

![제네시스 해시](/assets/img/genesis-hash.jpg)

또한 `끝점`을 업데이트해야 합니다. 이것은 인덱싱될 블록체인의 wss 엔드포인트를 정의합니다. **이것은 전체 아카이브 노드여야 합니다**. [OnFinality](https://app.onfinality.io)에서 모든 파라체인의 endpoint를 무료로 검색할 수 있습니다

### 체인 유형

매니페스트에 체인 유형도 포함하여 사용자 지정 체인의 데이터를 인덱싱할 수 있습니다.

기질 런타임 모듈에서 사용하는 추가 유형을 지원합니다. `typesAlias`, `typesBundle`, `typesChain` 및 `typesSpec`도 지원됩니다.

아래 v0.2.0 예제에서 `network.chaintypes`는 모든 사용자 정의 유형이 포함된 파일을 가리키고 있습니다. 이것은 이 블록체인이 지원하는 특정 유형을 `.json`, `.yaml` 또는 `.js`로 선언하는 표준 chainspec 파일입니다.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> `yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # The relative filepath to where custom types are stored ...` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> `yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter: #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true` </CodeGroupItem> </CodeGroup>

체인 유형 파일에 typescript를 사용하려면 `src` 폴더(예: `./src/types.ts`)에 파일을 포함하고 `yarn build</ 4> 그런 다음 <code>dist` 폴더에 있는 생성된 js 파일을 가리킵니다.

```yml
network:
  chaintypes:
    file: ./dist/types.js # Will be generated after yarn run build
```

확장자가 `.ts` 또는 `.js`인 체인 유형 파일을 사용할 때 주의할 사항:

- Manifest 버전은 v0.2.0 이상이어야 합니다.
- 블록을 가져올 때 기본 내보내기만 [polkadot api](https://polkadot.js.org/docs/api/start/types.extend/)에 포함됩니다.

다음은 `.ts` 체인 유형 파일의 예입니다.

<CodeGroup> <CodeGroupItem title="types.ts"> `ts import { typesBundleDeprecated } from "moonbeam-types-bundle" export default { typesBundle: typesBundleDeprecated }; ` </CodeGroupItem> </CodeGroup>

## 사용자 정의 데이터 소스

사용자 지정 데이터 원본은 데이터를 더 쉽게 처리할 수 있도록 하는 네트워크별 기능을 제공합니다. 추가 필터링 및 데이터 변환을 제공할 수 있는 미들웨어 역할을 합니다.

이에 대한 좋은 예는 EVM 지원입니다. EVM을 위한 맞춤형 데이터 소스 프로세서가 있다는 것은 EVM 수준에서 필터링할 수 있음을 의미합니다(예: 필터 계약 방법 또는 로그). ABI와 함께.

사용자 정의 데이터 소스는 일반 데이터 소스와 함께 사용할 수 있습니다.

다음은 지원되는 사용자 지정 데이터 소스 목록입니다.

| 종류                                                    | 지원 Handlers                                                                                              | 필터                              | 소개                                                                               |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------- |
| [substrate/Moonbeam](./moonbeam/#data-source-example) | [substrate/MoonbeamEvent](./moonbeam/#moonbeamevent), [substrate/MoonbeamCall](./moonbeam/#moonbeamcall) | See filters under each handlers | Provides easy interaction with EVM transactions and events on Moonbeams networks |

## 네트워크 필터

**네트워크 필터는 매니페스트 사양 v0.0.1에만 적용됩니다.**.

일반적으로 사용자는 SubQuery를 만들고 테스트넷과 메인넷 환경(예: Polkadot 및 Kusama) 모두에서 재사용할 것으로 예상합니다. (e.g Polkadot and Kusama). 네트워크 간에 다양한 옵션이 다를 수 있습니다(예: 인덱스 시작 블록). 따라서 사용자는 각 데이터 소스에 대해 서로 다른 세부 정보를 정의할 수 있습니다. 즉, 하나의 SubQuery 프로젝트를 여러 네트워크에서 계속 사용할 수 있습니다.

사용자는 `데이터 소스`에 `필터`를 추가하여 각 네트워크에서 실행할 데이터 소스를 결정할 수 있습니다.

다음은 Polkadot 및 Kusama 네트워크 모두에 대해 서로 다른 데이터 소스를 보여주는 예입니다.

<CodeGroup> <CodeGroupItem title="v0.0.1"> `yaml --- network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' #Create a template to avoid redundancy definitions: mapping: &mymapping handlers: - handler: handleBlock kind: substrate/BlockHandler dataSources: - name: polkadotRuntime kind: substrate/Runtime filter: #Optional specName: polkadot startBlock: 1000 mapping: *mymapping #use template here - name: kusamaRuntime kind: substrate/Runtime filter: specName: kusama startBlock: 12000 mapping: *mymapping # can reuse or change ` </CodeGroupItem>

</CodeGroup>
