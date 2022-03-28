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

By default the CLI will generate SubQuery projects for spec verison v0.2.0. This behaviour can be overridden by running `subql init --specVersion 0.0.1 PROJECT_NAME`, although this is not recommended as the project will not be supported by the SubQuery hosted service in the future

`subql migrate`는 기존 프로젝트에서 실행하여 프로젝트 Manifest를 최신 버전으로 마이그레이션할 수 있습니다.

USAGE $ subql init [PROJECTNAME]

ARGUMENTS PROJECTNAME Give the starter project name

| 옵션                    | 설명                                                                         |
| ----------------------- | ---------------------------------------------------------------------------- | ------------------------------------------ |
| -f, --force             |                                                                              |
| -l, --location=location | local folder to create the project in                                        |
| --install-dependencies  | Install dependencies as well                                                 |
| --npm                   | Force using NPM instead of yarn, only works with `install-dependencies` flag |
| --specVersion=0.0.1     | 0.2.0 [default: 0.2.0]                                                       | The spec version to be used by the project |

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

Defines the data that will be filtered and extracted and the location of the mapping function handler for the data transformation to be applied.
| 필드 | v0.0.1 | v0.2.0 | 설명 |
| -------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name** | String | 𐄂 | Name of the data source |
| **kind** | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | We supports data type from default substrate runtime such as block, event and extrinsic(call). <br /> From v0.2.0, we support data from custom runtime, such as smart contract. |
| **startBlock** | Integer | Integer | This changes your indexing start block, set this higher to skip initial blocks with less data |
| **mapping** | Mapping Spec | Mapping Spec | |
| **filter** | [network-filters](./manifest/#network-filters) | 𐄂 | Filter the data source to execute by the network endpoint spec name |

### Mapping Spec

| 필드                   | v0.0.1                                                         | v0.2.0                                                                        | 설명                                                                                                                                                                                                        |
| ---------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **file**               | String                                                         | 𐄂                                                                             | Entry 맵핑을 위한 path                                                                                                                                                                                      |
| **handlers & filters** | [기본 핸들러와 필터](./manifest/#mapping-handlers-and-filters) | 기본 핸들러와 필터, <br />[Custom handlers and filters](#custom-data-sources) | [mapping functions](./mapping.md) 과 그에 상응하는 핸들러 유형을 추가적인 맵핑 필터와 함께 나열하세요. <br /><br /> 커스텀 런타임 맵핑을 위해서는 [Custom data sources](#custom-data-sources)을 참조하세요. |

## Data Source와 맵핑

In this section, we will talk about the default substrate runtime and its mapping. Here is an example:

```yaml
dataSources:
  - kind: substrate/Runtime # Indicates that this is default runtime
    startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data
    mapping:
      file: dist/index.js # Entry path for this mapping
```

### 맵핑 핸들러와 필터

The following table explains filters supported by different handlers.

**Your SubQuery project will be much more efficient when you only use event and call handlers with appropriate mapping filters**

| 핸들러                                      | 지원되는 필터                |
| ------------------------------------------- | ---------------------------- |
| [블록핸들러](./mapping.md#block-handler)    | `specVersion`                |
| [이벤트 핸들러](./mapping.md#event-handler) | `module`,`method`            |
| [콜핸들러](./mapping.md#call-handler)       | `module`,`method` ,`success` |

Default runtime mapping filters are an extremely useful feature to decide what block, event, or extrinsic will trigger a mapping handler.

Only incoming data that satisfy the filter conditions will be processed by the mapping functions. Mapping filters are optional but are highly recommended as they significantly reduce the amount of data processed by your SubQuery project and will improve indexing performance.

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

When connecting to a different Polkadot parachain or even a custom substrate chain, you'll need to edit the [Network Spec](#network-spec) section of this manifest.

The `genesisHash` must always be the hash of the first block of the custom network. You can retireve this easily by going to [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) and looking for the hash on **block 0** (see the image below).

![Genesis Hash](/assets/img/genesis-hash.jpg)

Additionally you will need to update the `endpoint`. This defines the wss endpoint of the blockchain to be indexed - **This must be a full archive node**. [OnFinality](https://app.onfinality.io)에서 모든 파라체인의 endpoint를 무료로 검색할 수 있습니다

### 체인 유형

You can index data from custom chains by also including chain types in the manifest.

We support the additional types used by substrate runtime modules, `typesAlias`, `typesBundle`, `typesChain`, and `typesSpec` are also supported.

In the v0.2.0 example below, the `network.chaintypes` are pointing to a file that has all the custom types included, This is a standard chainspec file that declares the specific types supported by this blockchain in either `.json`, `.yaml` or `.js` format.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> `yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # The relative filepath to where custom types are stored ...` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> `yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter: #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true` </CodeGroupItem> </CodeGroup>

To use typescript for your chain types file include it in the `src` folder (e.g. `./src/types.ts`), run `yarn build` and then point to the generated js file located in the `dist` folder.

```yml
network:
  chaintypes:
    file: ./dist/types.js # Will be generated after yarn run build
```

Things to note about using the chain types file with extension `.ts` or `.js`:

- Manifest 버전은 v0.2.0 이상이어야 합니다.
- 블록을 가져올 때 기본 내보내기만 [polkadot api](https://polkadot.js.org/docs/api/start/types.extend/)에 포함됩니다.

Here is an example of a `.ts` chain types file:

<CodeGroup> <CodeGroupItem title="types.ts"> `ts import { typesBundleDeprecated } from "moonbeam-types-bundle" export default { typesBundle: typesBundleDeprecated }; ` </CodeGroupItem> </CodeGroup>

## Custom Data Sources

Custom Data Sources provide network specific functionality that makes dealing with data easier. They act as a middleware that can provide extra filtering and data transformation.

A good example of this is EVM support, having a custom data source processor for EVM means that you can filter at the EVM level (e.g. filter contract methods or logs) and data is transformed into structures farmiliar to the Ethereum ecosystem as well as parsing parameters with ABIs.

Custom Data Sources can be used with normal data sources.

Here is a list of supported custom datasources:

| Kind                                                  | Supported Handlers                                                                                       | Filters                         | Description                                                                      |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------- |
| [substrate/Moonbeam](./moonbeam/#data-source-example) | [substrate/MoonbeamEvent](./moonbeam/#moonbeamevent), [substrate/MoonbeamCall](./moonbeam/#moonbeamcall) | See filters under each handlers | Provides easy interaction with EVM transactions and events on Moonbeams networks |

## Network Filters

**Network filters only applies to manifest spec v0.0.1**.

Usually the user will create a SubQuery and expect to reuse it for both their testnet and mainnet environments (e.g Polkadot and Kusama). Between networks, various options are likely to be different (e.g. index start block). Therefore, we allow users to define different details for each data source which means that one SubQuery project can still be used across multiple networks.

Users can add a `filter` on `dataSources` to decide which data source to run on each network.

Below is an example that shows different data sources for both the Polkadot and Kusama networks.

<CodeGroup> <CodeGroupItem title="v0.0.1"> `yaml --- network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' #Create a template to avoid redundancy definitions: mapping: &mymapping handlers: - handler: handleBlock kind: substrate/BlockHandler dataSources: - name: polkadotRuntime kind: substrate/Runtime filter: #Optional specName: polkadot startBlock: 1000 mapping: *mymapping #use template here - name: kusamaRuntime kind: substrate/Runtime filter: specName: kusama startBlock: 12000 mapping: *mymapping # can reuse or change ` </CodeGroupItem>

</CodeGroup>
