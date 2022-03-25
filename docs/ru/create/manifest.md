# Файл манифеста

Файл манифеста `project.yaml` можно рассматривать как входную точку вашего проекта, и он определяет большую часть деталей о том, как SubQuery будет индексировать и преобразовывать данные цепочки.

Манифест может быть в формате YAML или JSON. В этом документе мы будем использовать YAML во всех примерах. Ниже приведен стандартный пример базового файла Манифест `project.yaml`.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml specVersion: 0.2.0 name: example-project # Provide the project name version: 1.0.0  # Project version description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: file: ./schema.graphql # The location of your GraphQL schema file network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' # Genesis hash of the network endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: file: "./dist/index.js" handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> <CodeGroupItem title="v0.0.1"> ``` yml specVersion: "0.0.1" description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: ./schema.graphql # The location of your GraphQL schema file network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - name: main kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional but suggested to speed up event processing module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> </CodeGroup>

## Migrating from v0.0.1 to v0.2.0 <Badge text="upgrade" type="warning"/>

**If you have a project with specVersion v0.0.1, you can use `subql migrate` to quickly upgrade. [Смотрите здесь](#cli-options) для получения дополнительной информации**

В разделе network

- –Появилось новое обязательное поле genesisHash, которое помогает идентифицировать используемую цепочку.
- В версии 0.2.0 и выше, вы можете ссылаться на внешний [chaintype file](#custom-chains), если вы ссылаетесь на пользовательскую цепь.

В разделе dataSources

- Возможность напрямую связать `index.js` точку входа для обработчиков сопоставления. По умолчанию этот index.js будет сгенерирован из index.ts во время процесса сборки.
- Источники данных теперь могут быть как обычным источником данных во время выполнения, так и пользовательским источником данных.

### Опции CLI

По умолчанию интерфейс командной строки будет генерировать проекты SubQuery для спецификации версии v0.2.0. Это поведение можно переопределить, запустив `subql init --specVersion 0.0.1 PROJECT_NAME`, хотя это не рекомендуется, поскольку в будущем проект не будет поддерживаться размещенной службой SubQuery

subql migrate функцию можно запустить в существующем проекте, чтобы мигрировать файл манифест проекта на последнюю версию.

Использование $ subql init [PROJECTNAME]

Аргументы PROJECTNAME  Задайте имя стартовому проекту

| Параметры               | Описание                                                                                      |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| f, --force              |                                                                                               |
| -l, --location=location | локальная папка для создания проекта                                                          |
| --install-dependencies  | также устанавливает зависимости                                                               |
| --npm                   | Принудительное использование NPM вместо yarn, работает только с флагом `install-dependencies` |
| --specVersion=0.0.1     | 0.2.0  [default: 0.2.0] | Версия спецификации, которая будет использоваться проектом          |

## Обзор

### Спецификации верхнего уровня

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

| Поле               | v0.0.1 | v0.2.0        | Описание                                                                                                                                                                               |
| ------------------ | ------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **genesisHash**    | 𐄂      | String        | genesis hash сети                                                                                                                                                                      |
| **конечная точка** | String | String        | Определяет конечную точку wss или ws блокчейна для индексирования - Это должен быть узел полного архива. В OnFinality, Вы можете бесплатно получить конечные точки для всех парачейнов |
| **словарь**        | String | String        | Для ускорения обработки рекомендуется предоставлять HTTP конечную точку полного словаря цепочки - смотрите, как работает SubQuery Dictionary.                                          |
| **типы цепей**     | 𐄂      | {file:String} | Путь к файлу с типами цепей, принимается формат .json или .yaml                                                                                                                        |

### Спецификация источника данных

Определяет данные, которые будут отфильтрованы и извлечены, а также расположение обработчика mapping функции для применяемого преобразования данных.
| Поле           | v0.0.1                                                    | v0.2.0                                                                           | Описание                                                                                                                                                                                                                                     |
| -------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **имя**        | String                                                    | 𐄂                                                                                | Имя источника данных                                                                                                                                                                                                                         |
| **вид**        | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | Мы поддерживаем типы данных из среды выполнения substrate по умолчанию, такие как block, event и extrinsic(call). <br /> Начиная с версии 0.2.0 мы поддерживаем данные из пользовательской среды выполнения, например смарт-контракта. |
| **startBlock** | Integer                                                   | Integer                                                                          | Это изменяет ваш начальный блок индексации, установите его выше, чтобы пропустить начальные блоки с меньшим количеством данных                                                                                                               |
| **mapping**    | Mapping Spec                                              | Mapping Spec                                                                     |                                                                                                                                                                                                                                              |
| **фильтр**     | [network-filters](./manifest/#network-filters)            | 𐄂                                                                                | Отфильтровать источник данных для выполнения по имени спецификации конечной точки сети                                                                                                                                                       |

### Mapping Spec

| Поле                      | v0.0.1                                                                         | v0.2.0                                                                | Описание                                                                                                                                                                                                                                                                                           |
| ------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **файла**                 | String                                                                         | 𐄂                                                                     | Путь к записи сопоставления                                                                                                                                                                                                                                                                        |
| **обработчики и фильтры** | [Обработчики и фильтры по умолчанию](./manifest/#mapping-handlers-and-filters) | Базовые обработчики и фильтры, Пользовательские обработчики и фильтры | Перечислите все [функции сопоставления](./mapping.md) и их соответствующие типы обработчиков, с дополнительными фильтрами сопоставления. Для получения информации о пользовательских обработчиках отображения времени выполнения, пожалуйста, просмотрите раздел Пользовательские источники данных |

## Источники данных и картирование

В этом разделе мы поговорим о среде выполнения субстрата по умолчанию и ее сопоставлении. Вот пример:

```yaml
dataSources:
  - kind: substrate/Runtime # Указывает, что это время выполнения по умолчанию
    startBlock: 1 # Это изменяет начальный блок индексирования, установите его выше, чтобы пропускать начальные блоки с меньшим количеством данных
    mapping:
      file: dist/index.js # Путь входа для этого отображения
```

### Обработчики и фильтры по умолчанию

В следующей таблице описаны фильтры, поддерживаемые различными обработчиками.

**Ваш проект SubQuery будет намного эффективнее, если вы будете использовать только обработчики событий и вызовов с соответствующими фильтрами сопоставления**

| Обработчик                                       | Поддерживаемый фильтр |
| ------------------------------------------------ | --------------------- |
| [Обработчик блоков](./mapping.md#block-handler)  | `спецификация версии` |
| [Обработчик событий](./mapping.md#event-handler) | модуль,метод          |
| [Обработчик вызовов](./mapping.md#call-handler)  | модуль,метод ,успех   |

Фильтры сопоставления по умолчанию во время выполнения — чрезвычайно полезная функция, позволяющая решить, какой блок, событие или внешний элемент вызовет обработчик сопоставления.

Только входящие данные, удовлетворяющие условиям фильтрации, будут обрабатываться функциями отображения. Фильтры сопоставления необязательны, но настоятельно рекомендуются, поскольку они значительно сокращают объем данных, обрабатываемых вашим проектом SubQuery, и улучшают производительность индексирования.

```yaml
# Пример фильтра из обработчика вызовов
filter: 
   module: balances
   method: Deposit
   success: true
```

- Фильтры модулей и методов поддерживаются на любой цепи субстрата.
- Фильтр success принимает логическое значение и используется для фильтрации по статусу успеха.
- Фильтр по спецификации  определяет диапазон версии спецификации для блока субстрата. В следующих примерах описано, как выставить диапазоны версий.

```yaml
filter:
  specVersion: [23, 24] #Index блок с specVersion в диапазоне от 23 до 24 (включительно).
  specVersion: [100]      #Index блок со спецификацией больше или равно 100.
  specVersion: [null, 23] #Индекс блок со специализацией равной или менее 23.
```

## Пользовательские цепочки

### Спецификация сети

При подключении к другому парачейну Polkadot или даже к пользовательской субстрат-цепи вам потребуется отредактировать раздел [Network Spec](#network-spec) этого манифеста.

`genesisHash` всегда должен быть хэшем первого блока пользовательской сети. Вы можете легко получить его, перейдя в [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) и найдя хэш в **block 0** (см. изображение ниже).

![Genesis Hash](/assets/img/genesis-hash.jpg)

Кроме того, вам потребуется обновить `конечную точку`. Это определяет конечную точку wss блокчейна для индексации. **Это должен быть полный архивный узел**. В OnFinality, Вы можете бесплатно получить конечные точки для всех парачейнов

### Типы цепи

Вы можете индексировать данные из кастомных цепей, включив в манифест типы цепочек.

Мы поддерживаем дополнительные типы, используемые модулями среды выполнения субстрата, а также поддерживаются `typesAlias`, `typesBundle`, `typesChain` и `typesSpec`.

В приведенном ниже примере v0.2.0 `network.chaintypes` указывает на файл, в который включены все пользовательские типы, это стандартный файл chainspec, в котором объявляются конкретные типы, поддерживаемые этой цепочкой блоков, в формате `.json`, `.yaml` или `.js`.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # The relative filepath to where custom types are stored ... ``` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> ``` yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter:  #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true ``` </CodeGroupItem> </CodeGroup>

Чтобы использовать typescript для вашего файла типов цепочек, включите его в папку `src` (например, `./src/types.ts`), запустите `yarn build` и затем укажите созданный файл js, расположенный в папке `dist`.

```yml
network:
  chaintypes:
    file: ./dist/types.js # Будет сгенерирован после yarn run build
...
```

На что следует обратить внимание при использовании файла типов цепочек с расширением `.ts` или `.js`:

- Версия вашего manifest должна быть v0.2.0 или выше.
- При выборке блоков только экспорт по умолчанию будет включен в polkadot api.

Вот пример файла типов цепочек `.ts`:

<CodeGroup> <CodeGroupItem title="types.ts"> ```ts
import { typesBundleDeprecated } from "moonbeam-types-bundle"
export default { typesBundle: typesBundleDeprecated }; ``` </CodeGroupItem> </CodeGroup>

## Пользовательские источники данных

Пользовательские источники данных предоставляют специфические для сети функции, упрощающие работу с данными. Они действуют как промежуточное ПО, обеспечивающее дополнительную фильтрацию и преобразование данных.

Хорошим примером этого является поддержка EVM: наличие специального процессора источника данных для EVM означает, что вы можете фильтровать на уровне EVM (например, фильтровать методы контракта или журналы), а данные также преобразуются в структуры, сходные с экосистемой Ethereum. как параметры синтаксического анализа с помощью ABI.

Пользовательские источники данных можно использовать с обычными источниками данных.

Вот список поддерживаемых пользовательских источников данных:

| Вид                                                     | Поддерживаемые обработчики                                                                               | Фильтры                             | Описание                                                                             |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------ |
| [substrate/Лунный луч](./moonbeam/#data-source-example) | [substrate/MoonbeamEvent](./moonbeam/#moonbeamevent), [substrate/MoonbeamCall](./moonbeam/#moonbeamcall) | См. фильтры для каждого обработчика | Обеспечивает простое взаимодействие с транзакциями и событиями EVM в сетях Moonbeams |

## Сетевые фильтры

**Сетевые фильтры применяются только к спецификации манифеста версии 0.0.1**.

Обычно пользователь создает SubQuery и рассчитывает повторно использовать его как для среды тестовой сети, так и для среды основной сети (например, Polkadot и Kusama). Между сетями различные параметры, вероятно, будут разными (например, начальный блок индекса). Поэтому мы позволяем пользователям определять разные сведения для каждого источника данных, что означает, что один проект SubQuery по-прежнему может использоваться в нескольких сетях.

Пользователи могут добавить `filter` в `dataSources`, чтобы решить, какой источник данных запускать в каждой сети.

Ниже приведен пример, который показывает разные источники данных для сетей Polkadot и Kusama.

<CodeGroup> <CodeGroupItem title="v0.0.1"> ```yaml --- network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' #Create a template to avoid redundancy definitions: mapping: &mymapping handlers: - handler: handleBlock kind: substrate/BlockHandler dataSources: - name: polkadotRuntime kind: substrate/Runtime filter: #Optional specName: polkadot startBlock: 1000 mapping: *mymapping #use template here - name: kusamaRuntime kind: substrate/Runtime filter: specName: kusama startBlock: 12000 mapping: *mymapping # can reuse or change ``` </CodeGroupItem>

</CodeGroup>
