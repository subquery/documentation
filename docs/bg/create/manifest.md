# Манифест Файл

Файлът Manifest `project.yaml` може да се разглежда като входящата точка на вашия проект, той дефинира повечето подробности за това как SubQuery ще индексира и трансформира данните от веригата.

Манифестът може да бъде във формат YAML или JSON. В този документ ще използваме YAML във всички примери. По-долу е даден стандартен пример за основен `project.yaml`.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml specVersion: 0.2.0 name: example-project # version: 1.0.0  # Версия на проекта description: '' # Посочете името на проекта repository: 'https://github.com/subquery/subql-starter' # Git адрес на хранилището на вашия проект schema: file: ./schema.graphql # Местоположението на вашия файл със схема на GraphQL network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' # Генезис хеш на мрежата endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # По избор предоставете HTTP крайната точка на речник с пълна верига, за да ускорите обработката dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - kind: substrate/Runtime startBlock: 1 # Това променя вашия начален блок за индексиране, задайте го по-високо, за да пропуснете първоначалните блокове с по-малко данни mapping: file: "./dist/index.js" handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> ``` yml specVersion: "0.0.1" description: '' # Описание на вашия проект repository: 'https://github.com/subquery/subql-starter' # Git адрес на хранилището на вашия проект schema: ./schema.graphql # Местоположението на вашия файл със схема на GraphQL network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # По избор предоставете HTTP крайната точка на речник с пълна верига, за да ускорите обработката dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - name: main kind: substrate/Runtime startBlock: 1 # Това променя вашия начален блок за индексиране, задайте го по-високо, за да пропуснете първоначалните блокове с по-малко данни mapping: handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Филтърът е по избор, но се препоръчва за ускоряване на обработката на събития module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> </CodeGroup>

## Мигриране от v0.0.1 към v0.2.0 <Badge text="upgrade" type="warning"/>

**Ако имате проект със specVersion v0.0.1, можете да използвате `subql migrate` за бързо ъпдейтване. [Вижте тук](#cli-options) за повече информация **

Под `мрежа`:

- Има ново**задължително поле ** `genesisHash`, което помага да се идентифицира използваната верига.
- За v0.2.0 и по-нова версия, можете да свържете външен [chaintype file](#custom-chains), ако препращате към персонализирана верига.

Под `Източници на данни`:

- Може директно да свържете входната точка `index.js` за мапинг манипулатори. По подразбиране този `index.js` ще се генерира от `index.ts` по време на процеса на изграждане.
- Източниците на данни вече могат да бъдат или обикновен източник на данни по време на изпълнение, или [персонализиран източник на данни](#custom-data-sources).

### CLI Опции

По подразбиране CLI ще генерира SubQuery проекти за версия v0.2.0 на спецификацията. Това поведение може да бъде прекратено, чрез стартиране на `subql init --specVersion 0.0.1 PROJECT_NAME`, въпреки че това не се препоръчва, тъй като проектът няма да се поддържа от хостваната SubQuery услуга в бъдеще

`subql migrate` може да се стартира в съществуващ проект, за да мигрира манифеста на проекта към най-новата версия.

USAGE $ subql init [PROJECTNAME]

АРГУМЕНТИ PROJECTNAME  Дава име на началния проект

| Опции                   | Описание                                                                                |
| ----------------------- | --------------------------------------------------------------------------------------- |
| -f, --force             |                                                                                         |
| -l, --location=location | локална папка, в която да създадете проекта                                             |
| --install-dependencies  | Инсталирайте и зависимостите                                                            |
| --npm                   | Принудително използване на NPM вместо прежда, работи само с флаг `install-dependencies` |
| --specVersion=0.0.1     | 0.2.0  [default: 0.2.0] | Версията на спецификацията, която ще се използва от проекта   |

## Обзор

### Най-високо ниво спецификации

| Поле            | v0.0.1                                                 | v0.2.0                                  | Описание                                                            |
| --------------- | ------------------------------------------------------ | --------------------------------------- | ------------------------------------------------------------------- |
| **specVersion** | Низ                                                    | Низ                                     | `0.0.1` or `0.2.0` - версия на спецификацията на файла на манифеста |
| **name**        | 𐄂                                                      | Низ                                     | Име на проекта                                                      |
| **version**     | 𐄂                                                      | Низ                                     | Версия на вашия проект                                              |
| **description** | Низ                                                    | Низ                                     | Описание на вашия проект                                            |
| **repository**  | Низ                                                    | Низ                                     | Git адрес на хранилището на вашия проект                            |
| **schema**      | Низ                                                    | [Спецификация на схемата](#schema-spec) | Местоположението на вашия файл със схема на GraphQL                 |
| **network**     | [Мрежова спецификация](#network-spec)                  | Мрежова спецификация                    | Подробности за мрежата, която трябва да бъде индексирана            |
| **dataSources** | [Спецификация на източника на данни](#datasource-spec) | Спецификация на източника на данни      |                                                                     |

### Спецификация на схемата

| Поле     | v0.0.1 | v0.2.0 | Описание                                            |
| -------- | ------ | ------ | --------------------------------------------------- |
| **file** | 𐄂      | String | Местоположението на вашия файл със схема на GraphQL |

### Мрежова спецификация

| Поле            | v0.0.1 | v0.2.0        | Описание                                                                                                                                                                                                                |
| --------------- | ------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **genesisHash** | 𐄂      | Низ           | Генезисният хеш на мрежата                                                                                                                                                                                              |
| **endpoint**    | Низ    | Низ           | Дефинира wss или ws крайната точка на блокчейна, която да бъде индексирана - **Това трябва да е пълен архивен нод**. Можете да извлечете ендпойнт за всички парачейни безплатно [OnFinality](https://app.onfinality.io) |
| **dictionary**  | Низ    | Низ           | Препоръчва се да се предостави HTTP еднпойнт на речник с пълна верига, за да се ускори обработката - четене[как работи SubQuery речникът](../tutorials_examples/dictionary.md).                                         |
| **chaintypes**  | 𐄂      | {file:String} | Път към файла с типове вериги, приема`.json`или`.yaml` формат                                                                                                                                                           |

### Спец. източник на данни

Дефинира данните, които ще бъдат филтрирани и извлечени, и местоположението на манипулатора на функцията за преобразуване, за да се приложи трансформацията на данни.
| Поле           | v0.0.1                                                    | v0.2.0                                                                           | Описание                                                                                                                                                                                                                      |
| -------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name**       | Низ                                                       | 𐄂                                                                                | Име на източника на данни                                                                                                                                                                                                     |
| **kind**       | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | Поддържаме тип данни от среда за изпълнение на субстрата по подразбиране, като блок, събитие и външно (повикване). <br /> От v0.2.0 поддържаме данни от персонализирана среда за изпълнение, като интелигентен договор. |
| **startBlock** | Цяло число                                                | Цяло число                                                                       | Това променя вашия начален блок за индексиране, задайте го по-високо, за да пропуснете първоначалните блокове с по-малко данни                                                                                                |
| **mapping**    | Мапинг спецификации                                       | Мапинг спецификации                                                              |                                                                                                                                                                                                                               |
| **filter**     | [network-filters](./manifest/#network-filters)            | 𐄂                                                                                | Филтрирайте източника на данни за изпълнение по името на спецификацията на ендпойнта на мрежата                                                                                                                               |

### Мапинг спецификации

| Поле                   | v0.0.1                                                                            | v0.2.0                                                                                                           | Описание                                                                                                                                                                                                                                                                                |
| ---------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **file**               | Низ                                                                               | 𐄂                                                                                                                | Път до записа за мапинг                                                                                                                                                                                                                                                                 |
| **handlers & filters** | [Манипулатори и филтри по подразбиране](./manifest/#mapping-handlers-and-filters) | Манипулатори и филтри по подразбиране, <br />[Персонализирани манипулатори и филтри](#custom-data-sources) | Избройте всички [мапинг функции](./mapping.md) и съответните им типове манипулатори, с допълнителни филтри за мапинг. <br /><br /> За персонализирани манипулатори за мапинг по време на изпълнение, моля, вижте [Персонализирани източници на данни](#custom-data-sources) |

## Източници на данни и мапинг

В този раздел ще говорим за времето за изпълнение на substrate по подразбиране и неговият мапинг. Ето един пример:

```yaml
dataSources:
  - kind: substrate/Runtime # Indicates that this is default runtime
    startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data
    mapping:
      file: dist/index.js # Entry path for this mapping
```

### Манипулатори на мапинг и филтри

Следващата таблица обяснява филтрите, поддържани от различни манипулатори.

**Вашият SubQuery проект ще бъде много по-ефективен, когато използвате само манипулатори на събития и повиквания с подходящи филтри за мапинг**

| Манипулатор                                | Поддържан филтър             |
| ------------------------------------------ | ---------------------------- |
| [BlockHandler](./mapping.md#block-handler) | `specVersion`                |
| [EventHandler](./mapping.md#event-handler) | `module`,`method`            |
| [CallHandler](./mapping.md#call-handler)   | `module`,`method` ,`success` |

Филтрите за мапинг по време на изпълнение са изключително полезна функция, за да решите кой блок, събитие или външен елемент ще задейства мапинг манипулатор.

Само входящите данни, които отговарят на условията на филтъра, ще бъдат обработени от мапинг функциите. Мапинг филтрите не са задължителни, но са силно препоръчителни, тъй като значително намаляват количеството данни, обработвани от вашия SubQuery проект и ще подобрят ефективността на индексирането.

```yaml
# Примерен филтър от callHandler
филтър:
  module: balances
  method: Deposit
  success: true
```

- Филтрите за модули и методи се поддържат на всяка верига, базирана на substrate.
- Филтърът за `успех` приема булева стойност и може да се използва за филтриране на външния по неговия статус на успех.
- Филтърът `specVersion` определя диапазона на версията на спецификацията за блок на substrate. Следващите примери описват как да зададете диапазони на версиите.

```yaml
филтър:
  specVersion: [23, 24]   # Индексен блок със specVersion между 23 и 24 (включително).
  specVersion: [100]      # Индексен блок със specVersion по-голям или равен на 100.
  specVersion: [null, 23] # Индексен блок със specVersion по-малък или равен на 23.
```

## Персонализирани вериги

### Мрежова спецификация

When connecting to a different Polkadot parachain or even a custom substrate chain, you'll need to edit the [Network Spec](#network-spec) section of this manifest.

The `genesisHash` must always be the hash of the first block of the custom network. You can retireve this easily by going to [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) and looking for the hash on **block 0** (see the image below).

![Genesis Hash](/assets/img/genesis-hash.jpg)

Additionally you will need to update the `endpoint`. This defines the wss endpoint of the blockchain to be indexed - **This must be a full archive node**. Можете да извлечете ендпойнт за всички парачейни безплатно [OnFinality](https://app.onfinality.io)

### Chain Types

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
