# Файл манифеста

Манифест файл `project. aml`можно рассматривать как входную точку вашего проекта, и он определяет большую часть деталей о том, как SubQuery будет индексировать и преобразовывать данные цепочки.

Манифест может быть в формате YAML или JSON. В этом документе мы будем использовать YAML во всех примерах. Ниже приведен стандартный пример базового `project.yaml`.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml specVersion: 0.2.0 name: example-project # Provide the project name version: 1.0.0  # Project version description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: file: ./schema.graphql # The location of your GraphQL schema file network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' # Genesis hash of the network endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: file: "./dist/index.js" handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> <CodeGroupItem title="v0.0.1"> ``` yml specVersion: "0.0.1" description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: ./schema.graphql # The location of your GraphQL schema file network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - name: main kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional but suggested to speed up event processing module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> </CodeGroup>

## Migrating from v0.0.1 to v0.2.0 <Badge text="upgrade" type="warning"/>

**If you have a project with specVersion v0.0.1, you can use `subql migrate` to quickly upgrade. смотри здесь больше информации</p>

В разделе network

- –Появилось новое обязательное поле genesisHash, которое помогает идентифицировать используемую цепочку.
- В версии 0.2.0 и выше вы можете ссылаться на внешний файл типа цепи, если вы ссылаетесь на пользовательскую цепь.

В разделе dataSources

- Можно напрямую связать точку входа index.js для обработчиков отображения. По умолчанию этот ndex.js будет сгенерирован из index.ts в процессе сборки.
- Источники данных теперь могут быть как обычным источником данных во время выполнения, так и пользовательским источником данных.

### Опции CLI

Пока версия v0.2.0 находится в бета-версии, вам необходимо явно определить ее во время инициализации проекта, выполнив команду subql init --specVersion 0.2.0 проект_имя

subql migrate можно запустить в существующем проекте, чтобы перенести манифест проекта на последнюю версию.

| Параметры      | Описание                                                            |
| -------------- | ------------------------------------------------------------------- |
| f, --force     |                                                                     |
| -l, --location | локальная папка для запуска migrate (должна содержать project.yaml) |
| --file=file    | чтобы указать project.yaml для миграции                             |

## Обзор

### Спецификация верхнего уровня

| Поле                    | v0.0.1                              | v0.2.0                      | Описание                                              |
| ----------------------- | ----------------------------------- | --------------------------- | ----------------------------------------------------- |
| **спецификация версии** | String                              | String                      | 0.0.1 или 0.2.0 - версия спецификации файла манифеста |
| **имя**                 | 𐄂                                   | String                      | Название вашего проекта                               |
| **версия**              | 𐄂                                   | String                      | Версия вашего проекта                                 |
| **описание**            | String                              | String                      | Описание вашего проекта                               |
| **репозиторий**         | String                              | String                      | Адрес Git-репозитория вашего проекта                  |
| **схема**               | String                              | [Schema Spec](#schema-spec) | Расположение вашего файла схемы GraphQL               |
| **сеть**                | [Network Spec](#network-spec)       | Network Spec                | Деталь сети, подлежащей индексированию                |
| **источники данных**    | [DataSource Spec](#datasource-spec) | DataSource Spec             |                                                       |

### Спецификация схемы

| Поле      | v0.0.1 | v0.2.0 | Описание                                |
| --------- | ------ | ------ | --------------------------------------- |
| **файла** | 𐄂      | String | Расположение вашего файла схемы GraphQL |

### Спецификация сети

| Поле               | v0.0.1 | v0.2.0        | Описание                                                                                                                                                                              |
| ------------------ | ------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **genesisHash**    | 𐄂      | String        | genesis hash сети                                                                                                                                                                     |
| **конечная точка** | String | String        | Определяет конечную точку wss или ws блокчейна для индексирования - Это должен быть узел полного архива. Вы можете бесплатно получить конечные точки для всех парачейнов в OnFinality |
| **словарь**        | String | String        | Для ускорения обработки предлагается предоставлять HTTP конечную точку полного словаря цепочки - читайте, как работает SubQuery Dictionary                                            |
| **типы цепей**     | 𐄂      | {file:String} | Путь к файлу с типами цепей, принимается формат .json или .yaml                                                                                                                       |

### Спецификация источника данных

Определяет данные, которые будут отфильтрованы и извлечены, и местоположение обработчика функции отображения для применяемого преобразования данных.
| Поле               | v0.0.1                                                    | v0.2.0                                        | Описание                                                                                                                                                                              |
| ------------------ | --------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **имя**            | String                                                    | 𐄂                                             | Имя источника данных                                                                                                                                                                  |
| **вид**            | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, substrate/CustomDataSource | Мы поддерживаем такие типы данных, как block, event и extrinsic(call) Начиная с версии 0.2.0, мы поддерживаем данные из пользовательской среды исполнения, например, смарт-контракта. |
| **начальный блок** | Integer                                                   | Integer                                       | Это изменяет начальный блок индексирования, установите это значение выше, чтобы пропускать начальные блоки с меньшим количеством данных                                               |
| **картирование**   | Mapping Spec                                              | Mapping Spec                                  |                                                                                                                                                                                       |
| **фильтр**         | [network-filters](./manifest/#network-filters)            | 𐄂                                             | Фильтр источника данных для выполнения по имени спецификации конечной точки сети                                                                                                      |

### Mapping Spec

| Поле                      | v0.0.1                                                                         | v0.2.0                                                                     | Описание                                                                                                                                                                                                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **файла**                 | String                                                                         | 𐄂                                                                          | Путь к записи отображения                                                                                                                                                                                                                                                   |
| **обработчики и фильтры** | [Обработчики и фильтры по умолчанию](./manifest/#mapping-handlers-and-filters) | Обработчики и фильтры по умолчанию, Пользовательские обработчики и фильтры | Список всех функций отображения и соответствующих им типов обработчиков, с дополнительными фильтрами отображения. Для получения информации о пользовательских обработчиках отображения времени выполнения, пожалуйста, просмотрите раздел Пользовательские источники данных |

## Источники данных и картирование

В этом разделе мы поговорим о времени выполнения субстрата по умолчанию и его отображении. Вот пример:

```yaml
dataSources:
  - kind: substrate/Runtime # Указывает, что это время выполнения по умолчанию
    startBlock: 1 # Это изменяет начальный блок индексирования, установите его выше, чтобы пропускать начальные блоки с меньшим количеством данных
    mapping:
      file: dist/index.js # Путь входа для этого отображения
```

### Обработчики и фильтры по умолчанию

В следующей таблице описаны фильтры, поддерживаемые различными обработчиками.

**Ваш проект SubQuery будет намного эффективнее, если вы будете использовать только обработчики событий и вызовов с соответствующими фильтрами отображения.**

| Обработчик                                       | Поддерживаемый фильтр |
| ------------------------------------------------ | --------------------- |
| [Обработчик блоков](./mapping.md#block-handler)  | `спецификация версии` |
| [Обработчик событий](./mapping.md#event-handler) | модуль,метод          |
| [Обработчик вызовов](./mapping.md#call-handler)  | модуль,метод ,успех   |

Фильтры отображения по умолчанию во время выполнения являются чрезвычайно полезной функцией, позволяющей решить, какой блок, событие или внешнее свойство вызовет обработчик отображения.

Только входящие данные, удовлетворяющие условиям фильтра, будут обработаны функциями сопоставления. Фильтры отображения являются необязательными, но настоятельно рекомендуются, поскольку они значительно уменьшают объем данных, обрабатываемых вашим проектом SubQuery, и улучшают производительность индексирования.

```yaml
# Пример фильтра из обработчика вызовов
filter: 
   module: balances
   method: Deposit
   success: true
```

- Фильтры модулей и методов поддерживаются на любой цепи на основе субстрата.
- Фильтр success принимает логическое значение и может быть использован для фильтрации дополнительных по его статусу успеха.
- Фильтр по спецификации  определяет диапазон версии спецификации для блока субстрата. В следующих примерах описано, как установить диапазоны версий.

```yaml
filter:
  specVersion: [23, 24] #Index блок с specVersion в диапазоне от 23 до 24 (включительно).
  specVersion: [100]      #Index блок со спецификацией больше или равно 100.
  specVersion: [null, 23] #Индекс блок со специализацией равной или менее 23.
```

## Пользовательские цепочки

### Спецификация сети

При подключении к другой сети Polkadot или даже к пользовательской подстраховке, вам нужно отредактировать раздел Network Spec этого манифеста.

`genesisHash` должен всегда быть хэшем первого блока пользовательской сети. Вы можете это легко отменить, перейдя к [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) и ищущая хэш на **блоке 0** (см. изображение ниже).

![Genesis Hash](/assets/img/genesis-hash.jpg)

Кроме того, вам нужно будет обновить `endpoint`. Определяет конечную точку wss блокчейна для индексирования - **Это должен быть узел полного архива**. Вы можете бесплатно получить конечные точки для всех парачейнов в OnFinality

### Типы цепи

Вы можете проиндексировать данные из пользовательских цепей, включив в manifest.

Мы поддерживаем дополнительные типы, используемые модулями runtime substrate, `typesAlias`, Также поддерживается `typesBundle`, `typesChain`, и `typesSpec`.

In the v0.2.0 example below, the `network.chaintypes` are pointing to a file that has all the custom types included, This is a standard chainspec file that declares the specific types supported by this blockchain in either `.json`, `.yaml` or `.js` format.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # The relative filepath to where custom types are stored ... ``` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> ``` yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter:  #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true ``` </CodeGroupItem> </CodeGroup>

To use typescript for your chain types file include it in the `src` folder (e.g. `./src/types.ts`), run `yarn build` and then point to the generated js file located in the `dist` folder.

```yml
network:
  chaintypes:
    file: ./dist/types.js # Will be generated after yarn run build
...
```

Things to note about using the chain types file with extension `.ts` or `.js`:

- Your manifest version must be v0.2.0 or above.
- Only the default export will be included in the [polkadot api](https://polkadot.js.org/docs/api/start/types.extend/) when fetching blocks.

Here is an example of a `.ts` chain types file:

<CodeGroup> <CodeGroupItem title="types.ts"> ```ts
import { typesBundleDeprecated } from "moonbeam-types-bundle"
export default { typesBundle: typesBundleDeprecated }; ``` </CodeGroupItem> </CodeGroup>

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

<CodeGroup> <CodeGroupItem title="v0.0.1"> ```yaml --- network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' #Create a template to avoid redundancy definitions: mapping: &mymapping handlers: - handler: handleBlock kind: substrate/BlockHandler dataSources: - name: polkadotRuntime kind: substrate/Runtime filter: #Optional specName: polkadot startBlock: 1000 mapping: *mymapping #use template here - name: kusamaRuntime kind: substrate/Runtime filter: specName: kusama startBlock: 12000 mapping: *mymapping # can reuse or change ``` </CodeGroupItem>

</CodeGroup>
