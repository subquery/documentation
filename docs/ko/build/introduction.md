# SubQuery 프로젝트 생성하기

[quick start](/quickstart/quickstart.md) 가이드에서는 SubQuery의 기능과 작동 방식을 보여 주는 예제를 간략히 살펴보았습니다. 여기서는 프로젝트 생성 시 작업 순서와 필요한 주요 파일에 대해 자세히 살펴보겠습니다.

## 기본 작업 순서

다음 예제 중 일부는 [Quick start](../quickstart/quickstart.md) 섹션에서 스타터 패키지를 성공적으로 초기화했다고 가정합니다. 이 시작 패키지에서 SubQuery 프로젝트를 사용자 정의 및 구현하기 위한 표준 프로세스를 살펴보겠습니다.

1. Initialise your project using `subql init PROJECT_NAME`.
2. Manifest 파일 (`project.yaml`)을 업데이트하여 블록 체인과 매핑할 엔티티에 대한 정보를 포함하세요. [Manifest File](./manifest.md) 참조
3. Schema(`schema.graphql`)에서 추출하고 Query하기 위해 유지할 데이터의 모양을 정의하는 GraphQL 엔터티 만들기 - [GraphQL Schema](./graphql.md) 참조하세요
4. 체인 데이터를 정의한 GraphQL 엔터티에 변환하기 위해 호출할 모든 매핑 기능(예. `mappingHandlers.ts`) 추가 - [Mapping](./mapping.md) 참조
5. SubQuery 프로젝트에 대한 코드 생성, 생성 및 게시(또는 자체 로컬 노드에서 실행) - 빠른 시작 가이드의 [Running and Querying your Starter Project](./quickstart.md#running-and-querying-your-starter-project)을 참조하세요.

## 디렉터리 구조

다음 맵은 `init` 명령이 실행될 때 SubQuery 프로젝트의 디렉터리 구조에 대한 개요를 제공합니다.

```
- project-name
  L package.json
  L project.yaml
  L README.md
  L schema.graphql
  L tsconfig.json
  L docker-compose.yml
  L src
    L index.ts
    L mappings
      L mappingHandlers.ts
  L .gitignore
```

예제:

![SubQuery 디렉터리 구조](/assets/img/subQuery_directory_stucture.png)

## 코드 생성

GraphQL 엔터티를 변경할 때마다 다음 명령을 사용하여 디렉토리 타입을 재생성해야 합니다.

```
yarn codegen
```

이렇게 하면 `schema.graphql`에서 이전에 정의한 각 유형에 대해 생성된 엔터티 클래스가 포함된 새 디렉터리`src/types`가 생성되거나 (기존 디렉터리가) 업데이트됩니다. 이러한 클래스는 엔티티 필드에 대한 유형 안전 엔티티 로드, 읽기 및 쓰기 액세스를 제공합니다. 자세한 내용은 [the GraphQL Schema](./graphql.md)에서 확인하세요.

## 빌드

로컬 호스팅된 SubQuery 노드에서 SubQuery 프로젝트를 실행하려면 먼저 작업을 빌드해야 합니다.

프로젝트의 루트 디렉터리에서 빌드 명령을 실행합니다.

<CodeGroup> <CodeGroupItem title="YARN" active> `shell yarn build ` </CodeGroupItem>
<CodeGroupItem title="NPM"> `bash npm run-script build ` </CodeGroupItem> </CodeGroup>

### Alternative build options

We support additional build options for subquery projects using `subql build`.

With this you can define additional entry points to build using the exports field in package.json.

```json
"name": "project-name",
"version": "1.0.0",
...
"exports": {
  "entry_one": "./src/entry_one.ts",
  "entry_renamed": "./src/entry_two.ts"
},
```

Then by running `subql build` it will generate a dist folder with the following structure:

```
- project-name
  L dist
    L entry_one.js
    L entry_renamed.js
    L index.js
```

Note that it will build `index.ts` whether or not it is specified in the exports field.

For more information on using this including flags, see [cli reference](https://doc.subquery.network/run_publish/references/#build).

## Logging

The `console.log` method is **no longer supported**. Instead, a `logger` module has been injected in the types, which means we can support a logger that can accept various logging levels.

```typescript
logger.info("Info level message");
logger.debug("Debugger level message");
logger.warn("Warning level message");
```

To use `logger.info` or `logger.warn`, just place the line into your mapping file.

![logging.info](/assets/img/logging_info.png)

To use `logger.debug`, an additional flag is required. Add `--log-level=debug` to your command line.

If you are running a docker container, add this line to your `docker-compose.yaml` file.

![logging.debug](/assets/img/logging_debug.png)

You should now see the new logging in the terminal screen.

![logging.debug](/assets/img/subquery_logging.png)
