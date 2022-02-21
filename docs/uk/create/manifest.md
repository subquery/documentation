# Файл маніфесту

Файл Manifest ` project.yaml ` можна розглядати як точку входу вашого проекту, і він визначає більшість деталей про те, як SubQuery буде індексувати та трансформувати дані ланцюга.

Маніфест може бути у форматі YAML або JSON. У цьому документі ми будемо використовувати YAML у всіх прикладах. Нижче наведено стандартний приклад базового ` project.yaml `.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml specVersion: 0.2.0 name: example-project # Provide the project name version: 1.0.0  # Project version description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: file: ./schema.graphql # The location of your GraphQL schema file network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' # Genesis hash of the network endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: file: "./dist/index.js" handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> ``` yml specVersion: "0.0.1" description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: ./schema.graphql # The location of your GraphQL schema file network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - name: main kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional but suggested to speed up event processing module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> </CodeGroup>

## Migrating from v0.0.1 to v0.2.0 <Badge text="upgrade" type="warning"/>

**If you have a project with specVersion v0.0.1, you can use `subql migrate` to quickly upgrade. [ Див. Тут ](#cli-options) для отримання додаткової інформації **

Під ` network `:

- Існує нове поле ** required ** ` genesisHash `, яке допомагає визначити ланцюг, що використовується.
- Для v0.2.0 і вище ви можете посилатися на зовнішній [ chaintype file](#custom-chains), якщо ви посилаєтесь на спеціальний ланцюг.

Під ` dataSources `:

- Можна безпосередньо пов'язати точку входу ` index.js ` для обробників карт. За замовчуванням цей ` index.js ` буде генеруватися з ` index.ts ` під час процесу збирання.
- Джерела даних тепер можуть бути або звичайним джерелом даних у режимі виконання, або [ custom data source ](#custom-data-sources).

### Параметри CLI

За замовчуванням CLI буде генерувати SubQuery проекти для verison v0.2.0. Ця поведінка може бути перевизначена за керуванням ` SubQL init-specversion 0.0.1 project_name </ 0>, хоча це не рекомендується, оскільки проект не буде підтриманий підзаписом обслуговування в майбутньому</p>

<p spaces-before="0"><code> subql migrate ` можна запустити в існуючому проекті для перенесення маніфесту проекту на останню версію.

Використання $ subql init [назвапроекту]

НЕОБХІДНО ДЛЯ НАДАТИ початкову назву проекту

| Параметри               | Описання                                                                                |
| ----------------------- | --------------------------------------------------------------------------------------- |
| -f, --force             |                                                                                         |
| -l, --location=location | локальна папка для створення проекту                                                    |
| --install-dependencies  | Також встановіть залежності                                                             |
| --npm                   | Примусове використання NPM замість yarn, працює лише з прапорцем `install-dependencies` |
| --specVersion=0.1       | 0.2.0 [default 0.2.0] | Версія специфікації, яка буде використовуватися в проекті       |

## Огляд

### Специфікація верхнього рівня

| поле                    | v0.0.1                              | v0.2.0                      | Описання                                                |
| ----------------------- | ----------------------------------- | --------------------------- | ------------------------------------------------------- |
| **версія специфікації** | String                              | String                      | `0.1` або `0.2.0` - версія специфікації файлу маніфесту |
| **ім’я**                | 𐄂                                   | String                      | Назва проекту                                           |
| **версія**              | 𐄂                                   | String                      | Версія вашого проекту                                   |
| **описання**            | String                              | String                      | Опис вашого проекту                                     |
| **репозиторій:**        | String                              | String                      | Адреса Git репозиторію вашого проекту                   |
| **схема**               | String                              | [Schema Spec](#schema-spec) | Розташування файлу схеми GraphQL                        |
| **мережа**              | [Network Spec](#network-spec)       | Network Spec                | Детальна інформація мережі, яка буде проіндексована     |
| **Джерела даних**       | [DataSource Spec](#datasource-spec) | DataSource Spec             |                                                         |

### Schema Spec

| поле     | v0.0.1 | v0.2.0 | Описання                         |
| -------- | ------ | ------ | -------------------------------- |
| **file** | 𐄂      | String | Розташування файлу схеми GraphQL |

### Network Spec

| поле               | v0.0.1 | v0.2.0        | Описання                                                                                                                                                                                                                      |
| ------------------ | ------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **genesisHash**    | 𐄂      | String        | Хеш генезису мережі                                                                                                                                                                                                           |
| **гранична точка** | String | String        | Визначає кінцеву точку wss або ws блокчейна, що підлягає індексації - ** Це повинен бути повний вузол архіву **. Ви можете отримати кінцеві точки для всіх парашаїв безкоштовно від [ OnFinality ](https://app.onfinality.io) |
| **словник**        | String | String        | Пропонується надати кінцеву точку HTTP повного словника ланцюга для прискорення обробки - прочитайте [ як працює словник підзапиту ](../tutorials_examples/dictionary.md).                                                    |
| **типи ланцюгів**  | 𐄂      | {file:String} | Шлях до файлу типів ланцюга, приймайте формат ` .json ` або ` .yaml `                                                                                                                                                         |

### Специфікація ресурсу даних

Визначає дані, які будуть відфільтровані та витягнуті, а також розташування обробника функції відображення для застосування перетворення даних.
| поле           | v0.0.1                                                    | v0.2.0                                                                           | Описання                                                                                                                                                                                                        |
| -------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ім’я**       | Рядок                                                     | 𐄂                                                                                | Назва джерела даних                                                                                                                                                                                             |
| **вид**        | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | Ми підтримуємо типи даних із середовища виконання субстрату за замовчуванням, такі як блок, подія та зовнішній (виклик). <br /> From v0.2.0, we support data from custom runtime, such as smart contract. |
| **startBlock** | Integer                                                   | Integer                                                                          | This changes your indexing start block, set this higher to skip initial blocks with less data                                                                                                                   |
| **mapping**    | Специфікація карт                                         | Специфікація карт                                                                |                                                                                                                                                                                                                 |
| **Фільтр**     | [network-filters](./manifest/#network-filters)            | 𐄂                                                                                | Filter the data source to execute by the network endpoint spec name                                                                                                                                             |

### Специфікація карт

Перерахуйте всі  mapping functions<0> та відповідні типи обробників за допомогою додаткових фільтрів відображення. <0 /> <0 /> Для користувацьких обробників відображення часу перегляньте [ Спеціальні джерела даних ](#custom-data-sources)</td> </tr> </tbody> </table> 



## Джерела даних та картографування

In this section, we will talk about the default substrate runtime and its mapping. Here is an example:



```yaml
dataSources:
  - kind: substrate/Runtime # Indicates that this is default runtime
    startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data
    mapping:
      file: dist/index.js # Entry path for this mapping
```




### Картографування обробників та фільтрів

The following table explains filters supported by different handlers.

**Your SubQuery project will be much more efficient when you only use event and call handlers with appropriate mapping filters**

| Обробник                                          | Підтримуваний фільтр      |
| ------------------------------------------------- | ------------------------- |
| [Обробник блокування](./mapping.md#block-handler) | `версія специфікації`     |
| [Подіяльний обробник](./mapping.md#event-handler) | `модуль`,`метод`          |
| [Обробник дзвінків](./mapping.md#call-handler)    | `модуль`,`метод` ,`успіx` |


Default runtime mapping filters are an extremely useful feature to decide what block, event, or extrinsic will trigger a mapping handler.

Only incoming data that satisfy the filter conditions will be processed by the mapping functions. Mapping filters are optional but are highly recommended as they significantly reduce the amount of data processed by your SubQuery project and will improve indexing performance.



```yaml
# Example filter from callHandler
filter:
  module: balances
  method: Deposit
  success: true
```


- Модульні та методичні фільтри підтримуються на будь-якій ланцюзі на основі підкладки.
- Фільтр ` success ` приймає булеве значення і може використовуватися для фільтрації екстрин за його статусом успіху.
- Фільтр ` specVersion ` визначає діапазон версій специфікації для блоку підкладки. Наступні приклади описують, як встановити діапазони версій.



```yaml
filter:
  specVersion: [23, 24]   # Index block with specVersion in between 23 and 24 (inclusive).
  specVersion: [100]      # Index block with specVersion greater than or equal 100.
  specVersion: [null, 23] # Index block with specVersion less than or equal 23.
```




## Спеціальні ланцюги



### Специфікація мережі

When connecting to a different Polkadot parachain or even a custom substrate chain, you'll need to edit the [Network Spec](#network-spec) section of this manifest.

The `genesisHash` must always be the hash of the first block of the custom network. You can retireve this easily by going to [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) and looking for the hash on **block 0** (see the image below).

![Genesis Hash](/assets/img/genesis-hash.jpg)

Additionally you will need to update the `endpoint`. This defines the wss endpoint of the blockchain to be indexed - **This must be a full archive node**. Ви можете отримати кінцеві точки для всіх парашаїв безкоштовно від [ OnFinality ](https://app.onfinality.io)



### Типи ланцюгів

You can index data from custom chains by also including chain types in the manifest.

We support the additional types used by substrate runtime modules, `typesAlias`, `typesBundle`, `typesChain`, and `typesSpec` are also supported.

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

- Ваша версія маніфесту має бути v0.2.0 або новішої.
- При отриманні блоків будуть включені лише експорт за замовчуванням до програми polkadot api.

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
