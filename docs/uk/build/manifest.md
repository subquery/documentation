# Файл маніфесту

Файл Manifest `project.yaml` можна розглядати як точку входу вашого проекту, і він визначає більшість деталей про те, як SubQuery буде індексувати та трансформувати дані ланцюга.

Маніфест може бути у форматі YAML або JSON. У цьому документі ми будемо використовувати YAML у всіх прикладах. Нижче наведено стандартний приклад базового `project.yaml`.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ` yml specVersion: 0.2.0 name: example-project # Provide the project name version: 1.0.0 # Project version description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: file: ./schema.graphql # The location of your GraphQL schema file network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' # Genesis hash of the network endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: file: "./dist/index.js" handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> <CodeGroupItem title="v0.0.1"> ` yml specVersion: "0.0.1" description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: ./schema.graphql # The location of your GraphQL schema file network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - name: main kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional but suggested to speed up event processing module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> </CodeGroup>

## Migrating from v0.0.1 to v0.2.0 <Badge text="upgrade" type="warning"/>

**If you have a project with specVersion v0.0.1, you can use `subql migrate` to quickly upgrade. [ Див. Тут ](#cli-options) для отримання додаткової інформації **

Під `network`:

- Існує нове поле ** required ** `genesisHash`, яке допомагає визначити ланцюг, що використовується.
- Для v0.2.0 і вище ви можете посилатися на зовнішній [ chaintype file](#custom-chains), якщо ви посилаєтесь на спеціальний ланцюг.

Під `dataSources`:

- Можна безпосередньо пов'язати точку входу `index.js` для обробників карт. За замовчуванням цей `index.js` буде генеруватися з `index.ts` під час процесу збирання.
- Джерела даних тепер можуть бути або звичайним джерелом даних у режимі виконання, або [ custom data source ](#custom-data-sources).

### Параметри CLI

За замовчуванням CLI буде генерувати SubQuery проекти для verison v0.2.0. Ця поведінка може бути перевизначена за керуванням ` SubQL init-specversion 0.0.1 project_name </ 0>, хоча це не рекомендується, оскільки проект не буде підтриманий підзаписом обслуговування в майбутньому</p>

<p spaces-before="0"><code> subql migrate ` можна запустити в існуючому проекті для перенесення маніфесту проекту на останню версію.

Використання $ subql init [назвапроекту]

НЕОБХІДНО ДЛЯ НАДАТИ початкову назву проекту

| Параметри               | Описання                                                                                |
| ----------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| -f, --force             |                                                                                         |
| -l, --location=location | локальна папка для створення проекту                                                    |
| --install-dependencies  | Також встановіть залежності                                                             |
| --npm                   | Примусове використання NPM замість yarn, працює лише з прапорцем `install-dependencies` |
| --specVersion=0.1       | 0.2.0 [default 0.2.0]                                                                   | Версія специфікації, яка буде використовуватися в проекті |

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
| **словник**        | String | String        | Пропонується надати кінцеву точку HTTP повного словника ланцюга для прискорення обробки - прочитайте [ як працює словник підзапиту ](../academy/tutorials_examples/dictionary.md).                                            |
| **типи ланцюгів**  | 𐄂      | {file:String} | Шлях до файлу типів ланцюга, приймайте формат `.json` або `.yaml`                                                                                                                                                             |

### Специфікація ресурсу даних

Визначає дані, які будуть відфільтровані та витягнуті, а також розташування обробника функції відображення для застосування перетворення даних.
| поле | v0.0.1 | v0.2.0 | Описання |
| -------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ім’я** | Рядок | 𐄂 | Назва джерела даних |
| **вид** | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | Ми підтримуємо типи даних із середовища виконання субстрату за замовчуванням, такі як блок, подія та зовнішній (виклик). <br /> Починаючи з версії 0.2.0, ми підтримуємо дані зі спеціального середовища виконання, наприклад смарт-контракт. |
| **startBlock** | Ціле число | Ціле число | Це змінює початковий блок індексації, встановіть його вище, щоб пропускати початкові блоки з меншою кількістю даних |
| **mapping** | Специфікація карт | Специфікація карт | |
| **Фільтр** | [Мережеві фільтри](./manifest/#network-filters) | 𐄂 | Відфільтруйте джерело даних для виконання за назвою специфікації кінцевої точки мережі |

### Специфікація карт

Перерахуйте всі mapping functions<0> та відповідні типи обробників за допомогою додаткових фільтрів відображення. <0 /> <0 /> Для користувацьких обробників відображення часу перегляньте [ Спеціальні джерела даних ](#custom-data-sources)</td> </tr> </tbody> </table>

## Джерела даних та картографування

У цьому розділі ми поговоримо про стандартний час виконання субстрату та його відображення. До прикладу:

```yaml
dataSources:
  - kind: substrate/Runtime # Indicates that this is default runtime
    startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data
    mapping:
      file: dist/index.js # Entry path for this mapping
```

### Картографування обробників та фільтрів

У наступній таблиці пояснюється фільтри, які підтримуються різними обробниками.

**Ваш проект SubQuery буде набагато ефективнішим, якщо ви використовуєте лише обробники подій і викликів із відповідними фільтрами зіставлення**

| Обробник                                          | Підтримуваний фільтр      |
| ------------------------------------------------- | ------------------------- |
| [Обробник блокування](./mapping/polkadot.md#block-handler) | `версія специфікації`     |
| [Подіяльний обробник](./mapping/polkadot.md#event-handler) | `модуль`,`метод`          |
| [Обробник дзвінків](./mapping/polkadot.md#call-handler)    | `модуль`,`метод` ,`успіx` |

Фільтри зіставлення за замовчуванням під час виконання є надзвичайно корисною функцією, щоб визначити, який блок, подія або зовнішній елемент запускатиме обробник зіставлення.

Функції відображення оброблятимуть лише вхідні дані, які задовольняють умовам фільтра. Фільтри зіставлення є необов’язковими, але настійно рекомендовані, оскільки вони значно зменшують обсяг даних, які обробляються вашим проектом SubQuery, і покращують продуктивність індексування.

```yaml
# Example filter from callHandler
filter:
  module: balances
  method: Deposit
  success: true
```

- Модульні та методичні фільтри підтримуються на будь-якій ланцюзі на основі підкладки.
- Фільтр `success` приймає булеве значення і може використовуватися для фільтрації екстрин за його статусом успіху.
- Фільтр `specVersion` визначає діапазон версій специфікації для блоку підкладки. Наступні приклади описують, як встановити діапазони версій.

```yaml
filter:
  specVersion: [23, 24]   # Index block with specVersion in between 23 and 24 (inclusive).
  specVersion: [100]      # Index block with specVersion greater than or equal 100.
  specVersion: [null, 23] # Index block with specVersion less than or equal 23.
```

## Спеціальні ланцюги

### Специфікація мережі

Під час підключення до іншого парачейну Polkadot або навіть спеціального ланцюжка підкладки вам потрібно відредагувати розділ [Специфікація мережі](#network-spec) цього маніфесту.

`genesisHash` завжди має бути хешем першого блоку користувацької мережі. Ви можете легко отримати це, перейшовши до [Polkadot JS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) і знайшовши хеш на ** block 0** (див. зображення нижче).

![Genesis Hash](/assets/img/genesis-hash.jpg)

Крім того, вам потрібно буде оновити `endpoint`. Це визначає кінцеву точку wss блокчейну для індексації - **Це має бути повний архівний вузол**. Ви можете отримати кінцеві точки для всіх парашаїв безкоштовно від [ OnFinality ](https://app.onfinality.io)

### Типи ланцюгів

Ви можете індексувати дані з користувацьких ланцюжків, також включивши типи ланцюжків у маніфест.

Ми підтримуємо додаткові типи, які використовуються модулями середовища виконання, `typesAlias`, `typesBundle`, `typesChain` і `typesSpec` також підтримуються .

У наведеному нижче прикладі версії 0.2.0 `network.chaintypes` вказує на файл, який містить усі користувацькі типи. Це стандартний файл специфікації ланцюга, який оголошує конкретні типи, які підтримує цей блокчейн у < 0>.json</code>, `.yaml` або `.js`.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> `yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # The relative filepath to where custom types are stored ...` </CodeGroupItem>

<CodeGroupItem title="v0.0.1"> `yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter: #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true` </CodeGroupItem> </CodeGroup>

To use typescript for your chain types file include it in the `src` folder (e.g. `./src/types.ts`), run `yarn build` and then point to the generated js file located in the `dist` folder.

```yml
network:
  chaintypes:
    file: ./dist/types.js # Will be generated after yarn run build
```

Що слід звернути увагу на використання файлу типів ланцюга з розширенням `.ts` або `.js`:

- Ваша версія маніфесту має бути v0.2.0 або новішої.
- При отриманні блоків будуть включені лише експорт за замовчуванням до програми polkadot api.

Ось приклад файлу типів ланцюга `.ts`:

<CodeGroup> <CodeGroupItem title="types.ts"> `тс імпортувати {typeBundleDeprecated } з "moonbeam-types-bundle" експорт за замовчуванням {typeBundle: typesBundleDeprecated }; ` </CodeGroupItem> </CodeGroup>

## Спеціальні джерела даних

Спеціальні джерела даних забезпечують специфічні для мережі функціональні можливості, які полегшують роботу з даними. Вони діють як проміжне програмне забезпечення, яке може забезпечити додаткову фільтрацію та перетворення даних.

Гарним прикладом цього є підтримка EVM, наявність спеціального процесора джерела даних для EVM означає, що ви можете фільтрувати на рівні EVM (наприклад, фільтрувати методи контрактів або журнали), а дані також трансформуються в структури, схожі на екосистему Ethereum. як параметри аналізу за допомогою ABI.

Спеціальні джерела даних можна використовувати зі звичайними джерелами даних.

Ось список підтримуваних користувацьких джерел даних:

| Добрий                                                       | Підтримувані обробники                                                                                   | Фільтри                                   | Опис                                                                         |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------- |
| [субстрат/місячний промінь](./moonbeam/#data-source-example) | [substrate/MoonbeamEvent](./moonbeam/#moonbeamevent), [substrate/MoonbeamCall](./moonbeam/#moonbeamcall) | Перегляньте фільтри під кожним обробником | Забезпечує легку взаємодію з транзакціями та подіями EVM у мережах Moonbeams |

## Мережеві фільтри

**Мережеві фільтри застосовуються лише до специфікації маніфесту v0.0.1**.

Зазвичай користувач створює підзапит і очікує повторно використовувати його як для тестової, так і для основної мережі (наприклад, Polkadot і Kusama). Між мережами, ймовірно, різні варіанти будуть різними (наприклад, блок початку індексу). Тому ми дозволяємо користувачам визначати різні деталі для кожного джерела даних, що означає, що один проект SubQuery все ще можна використовувати в кількох мережах.

Користувачі можуть додати `filter` до `dataSources`, щоб вирішити, яке джерело даних запускати в кожній мережі.

Нижче наведено приклад, який показує різні джерела даних для мереж Polkadot і Kusama.

<CodeGroup> <CodeGroupItem title="v0.0.1"> `yaml --- network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' #Create a template to avoid redundancy definitions: mapping: &mymapping handlers: - handler: handleBlock kind: substrate/BlockHandler dataSources: - name: polkadotRuntime kind: substrate/Runtime filter: #Optional specName: polkadot startBlock: 1000 mapping: *mymapping #use template here - name: kusamaRuntime kind: substrate/Runtime filter: specName: kusama startBlock: 12000 mapping: *mymapping # can reuse or change ` </CodeGroupItem>

</CodeGroup>
