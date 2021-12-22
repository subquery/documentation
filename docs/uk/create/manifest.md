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

Хоча версія специфікації v0.2.0 знаходиться в бета-версії, вам потрібно буде чітко визначити її під час ініціалізації проекту, запустивши ` subql init --specVersion 0.2.0 PROJECT_NAME `

` subql migrate ` можна запустити в існуючому проекті для перенесення маніфесту проекту на останню версію.

| Параметри      | Описання                                                              |
| -------------- | --------------------------------------------------------------------- |
| -f, --force    |                                                                       |
| -l, --location | локальна папка, щоб запустити міграцію (повинна містити project.yaml) |
| --file=файл    | уточнити проект.yaml для міграції                                     |

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

Визначає дані, які будуть відфільтровані та вилучені, та розташування обробника функцій відображення для перетворення даних, що застосовуються.
| поле             | v0.0.1                                                    | v0.2.0                                                                           | Описання                                                                                                                                                                                                                 |
| ---------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **ім’я**         | String                                                    | 𐄂                                                                                | Ім'я джерела даних                                                                                                                                                                                                       |
| **вид**          | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | Ми підтримуємо тип даних із часу виконання підкладки за замовчуванням, таких як блок, подія та зовнішній (дзвінок). <0 /> З v0.2.0 ми підтримуємо дані від користувацького часу виконання, наприклад, розумний контракт. |
| **почати блок**  | Integer                                                   | Integer                                                                          | Це змінює блок запуску індексації, встановіть це вище, щоб пропустити початкові блоки з меншою кількістю даних                                                                                                           |
| **Відображення** | Mapping Spec                                              | Mapping Spec                                                                     |                                                                                                                                                                                                                          |
| **Фільтр**       | [network-filters](./manifest/#network-filters)            | 𐄂                                                                                | Фільтруйте джерело даних для виконання за назвою специфікації кінцевої точки мережі                                                                                                                                      |

### Специфікація карт

Перерахуйте всі  mapping functions<0> та відповідні типи обробників за допомогою додаткових фільтрів відображення. <0 /> <0 /> Для користувацьких обробників відображення часу перегляньте [ Спеціальні джерела даних ](#custom-data-sources)</td> </tr> </tbody> </table> 



## Джерела даних та картографування

У цьому розділі ми поговоримо про час виконання підкладки за замовчуванням та його відображення. До прикладу:



```yaml
dataSources:
  - kind: substrate/Runtime # Indicates that this is default runtime
    startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data
    mapping:
      file: dist/index.js # Entry path for this mapping
```




### Картографування обробників та фільтрів

Наступна таблиця пояснює фільтри, підтримувані різними обробниками.

**Bаш проект SubQuery буде набагато ефективнішим, коли ви використовуєте лише обробники подій та викликів із відповідними фільтрами відображення**

| Обробник                                          | Підтримуваний фільтр      |
| ------------------------------------------------- | ------------------------- |
| [Обробник блокування](./mapping.md#block-handler) | `версія специфікації`     |
| [Подіяльний обробник](./mapping.md#event-handler) | `модуль`,`метод`          |
| [Обробник дзвінків](./mapping.md#call-handler)    | `модуль`,`метод` ,`успіx` |


Фільтри відображення часу виконання за замовчуванням є надзвичайно корисною функцією для вирішення того, який блок, подія чи зовнішній вигляд спричинить обробник карт.

Функції картографування будуть оброблятися лише вхідні дані, що відповідають умовам фільтра. Картографування фільтрів є необов'язковим, але настійно рекомендується, оскільки вони значно зменшують кількість даних, оброблених вашим проектом SubQuery, і покращать ефективність індексації.



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

Підключившись до іншого парашана Polkadot або навіть до користувацької ланцюга підкладки, вам потрібно буде відредагувати розділ [ Network Spec ](#network-spec) цього маніфесту.

` genesisHash ` завжди повинен бути хешем першого блоку користувацької мережі. Ви можете легко вийти на пенсію, перейшовши на [ PolkadotJS ](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) і шукаючи хеш на ** block 0 ** (див. Зображення нижче).

![Genesis Hash](/assets/img/genesis-hash.jpg)

Крім того, вам потрібно буде оновити ` endpoint `. Це визначає кінцеву точку wss блокчейна, що підлягає індексації - ** Це повинен бути повний вузол архіву **. Ви можете отримати кінцеві точки для всіх парашаїв безкоштовно від [ OnFinality ](https://app.onfinality.io)



### Типи ланцюгів

Ви можете індексувати дані з користувацьких ланцюжків, включно з типами ланцюжків у маніфесті.

Ми підтримуємо додаткові типи, які використовуються підкладковими модулями виконання, ` typesAlias `, ` typesBundle `, ` typesChain ` та ` typesSpec ` також підтримуються.

У прикладі v0.2.0 нижче ` network.chaintypes ` вказують на файл, у якому включені всі користувацькі типи. Це стандартний файл bainspec, який оголошує конкретні типи, підтримувані цим blockchain, або ` .json ` або ` .yaml ` формат.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # The relative filepath to where custom types are stored ... ``` </CodeGroupItem>

<CodeGroupItem title="v0.0.1"> ``` yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter:  #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true ``` </CodeGroupItem> </CodeGroup>



## Custom Data Sources

Custom Data Sources provide network specific functionality that makes dealing with data easier. Вони діють як середнє програмне забезпечення, яке може забезпечити додаткову фільтрацію та трансформацію даних.

Хорошим прикладом цього є підтримка EVM, наявність користувальницького процесора джерела даних для EVM означає, що ви можете фільтрувати на рівні EVM (наприклад,. фільтрують договірні методи або журнали) і дані перетворюються на структури, схожі на екосистему Ethereum, а також параметри розбору з ABI.

Звичайні джерела даних можна використовувати з нормальними джерелами даних.

Ось список підтримуваних спеціальних джерел даних: 

| Biд                                                       | Підтримувані обробники                                                                                           | Фільтри                            | Опис                                                                         |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------- |
| [ substrate / Moonbeam ](./moonbeam/#data-source-example) | [ substrate / MoonbeamEvent ](./moonbeam/#moonbeamevent), [ substrate / MoonbeamCall ](./moonbeam/#moonbeamcall) | Див. Фільтри під кожним обробником | Забезпечує легку взаємодію з транзакціями EVM та подіями в мережах Moonbeams |




## Мережеві фільтри 

** Мережеві фільтри застосовуються лише до маніфесту специфікації v0.0.1 **.

Зазвичай користувач створить SubQuery і розраховує повторно використовувати його як для тестового, так і для основного середовища (наприклад, Polkadot і Kusama). Між мережами різні варіанти, ймовірно, будуть різними (наприклад,. блок запуску індексу). Тому ми дозволяємо користувачам визначати різні деталі для кожного джерела даних, а це означає, що один проект SubQuery все ще може використовуватися в декількох мережах.

Користувачі можуть додати ` filter ` на ` dataSources `, щоб вирішити, яке джерело даних працювати в кожній мережі.

Нижче наведено приклад, який показує різні джерела даних як для мереж Polkadot, так і для Kusama.

<CodeGroup> <CodeGroupItem title="v0.0.1"> ```yaml --- network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' #Create a template to avoid redundancy definitions: mapping: &mymapping handlers: - handler: handleBlock kind: substrate/BlockHandler dataSources: - name: polkadotRuntime kind: substrate/Runtime filter: #Optional specName: polkadot startBlock: 1000 mapping: *mymapping #use template here - name: kusamaRuntime kind: substrate/Runtime filter: specName: kusama startBlock: 12000 mapping: *mymapping # can reuse or change ``` </CodeGroupItem>

</CodeGroup>
