# Мапинг

Мапинг функциите дефинират как данните от веригата се трансформират в оптимизираните GraphQL обекти, които по-рано сме дефинирали във файла `schema.graphql`.

- Мапингите се дефинират в директорията `src/mappings` и се експортират като функция
- Мапингите също се експортират `src/index.ts`
- Мапинг файловете са препратки в `project.yaml` под манипулаторите за мапинг.

Има три класа функции за мапинг; [Манипулатори на блокове](#block-handler), [Манипулатори на събития](#event-handler) и [Манипулатори на изпълнение](#call-handler).

## Манипулатор на блокове

Можете да използвате манипулатори на блокове, за да улавяте информация всеки път, когато нов блок е прикачен към веригата на Substrate, напр. номер на блока. За да се постигне това, дефиниран BlockHandler ще бъде заявен веднъж за всеки блок.

```ts
import {SubstrateBlock} from "@subql/types";

export async function handleBlock(block: SubstrateBlock): Promise<void> {
    // Create a new StarterEntity with the block hash as it's ID
    const record = new starterEntity(block.block.header.hash.toString());
    record.field1 = block.block.header.number.toNumber();
    await record.save();
}
```

[SubstrateBlock](https://github.com/OnFinality-io/subql/blob/a5ab06526dcffe5912206973583669c7f5b9fdc9/packages/types/src/interfaces.ts#L16) е разширен тип интерфейс на [signedBlock](https://polkadot.js.org/docs/api/cookbook/blocks/), но също така включва `specVersion` и `timestamp`.

## Манипулатор на събития

Можете да използвате манипулатори на събития за улавяне на информация, когато определени събития са включени в нов блок. Събитията, които са част от времето за изпълнение на Substrate по подразбиране и блок, могат да съдържат няколко събития.

По време на обработката, манипулаторът на събития ще получи Substrate събитие като аргумент с въведените входове и изходи на събитието. Всеки тип събитие ще задейства мапинг, който позволява да бъде уловена дейност с източника на данни. Трябва да използвате [Мапинг филтри](./manifest.md#mapping-filters) във вашия манифест, за да филтрирате събития, за да намалите времето, необходимо за индексиране на данни и да подобрите ефективността на мапинга.

```ts
import {SubstrateEvent} from "@subql/types";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, balance]}} = event;
    // Retrieve the record by its ID
    const record = new starterEntity(event.extrinsic.block.block.header.hash.toString());
    record.field2 = account.toString();
    record.field3 = (balance as Balance).toBigInt();
    await record.save();
```

[SubstrateEvent](https://github.com/OnFinality-io/subql/blob/a5ab06526dcffe5912206973583669c7f5b9fdc9/packages/types/src/interfaces.ts#L30) е разширен тип интерфейс на [EventRecord](https://github.com/polkadot-js/api/blob/f0ce53f5a5e1e5a77cc01bf7f9ddb7fcf8546d11/packages/types/src/interfaces/system/types.ts#L149). Освен данните за събитието, той включва и `id` (блока, към който принадлежи това събитие) за външен елемент вътре в този блок.

## Манипулатор на изпълнение

Манипулаторите на изпълнения се използват, когато искате да уловите информация за определени външни елементи на Substrate.

```ts
export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    const record = new starterEntity(extrinsic.block.block.header.hash.toString());
    record.field4 = extrinsic.block.timestamp;
    await record.save();
}
```

[SubstrateExtrinsic](https://github.com/OnFinality-io/subql/blob/a5ab06526dcffe5912206973583669c7f5b9fdc9/packages/types/src/interfaces.ts#L21) разширява [GenericExtrinsic](https://github.com/polkadot-js/api/blob/a9c9fb5769dec7ada8612d6068cf69de04aa15ed/packages/types/src/extrinsic/Extrinsic.ts#L170). Прилага му се `id` (блокът, към който принадлежи този външен елемент) и предоставя външен елемент, който разширява събитията между този блок. Освен това, той записва статуса на успех на този външен елемент.

## Състояния на заявка
Нашата цел е да покрием всички източници на данни за потребители за манипулатори на мапинг (повече от трите типа събития на интерфейса по-горе). Ето защо ние разкрихме някои от @polkadot/api интерфейсите, за да увеличим възможностите.

Това са интерфейсите, които в момента поддържаме:
- [api.query.&lt;module&gt;.&lt;method&gt;()](https://polkadot.js.org/docs/api/start/api.query) ще направи заявка към <strong>текущия</strong> блок.
- [api.query.&lt;module&gt;.&lt;method&gt;.multi()](https://polkadot.js.org/docs/api/start/api.query.multi/#multi-queries-same-type) ще направи множество заявки от <strong>един</strong> тип към текущия блок.
- [api.queryMulti()](https://polkadot.js.org/docs/api/start/api.query.multi/#multi-queries-distinct-types) ще направи множество заявки от <strong>различен</strong> тип към текущия блок.

Това са интерфейсите, които **НЕ ** поддържаме в момента:
- ~~api.tx.*~~
- ~~api.derive.*~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.at~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.entriesAt~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.entriesPaged~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.hash~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.keysAt~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.keysPaged~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.range~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.sizeAt~~

Вижте пример за използване на този API в нашия пример за използване на [validator-threshold](https://github.com/subquery/tutorials-validator-threshold).

## RPC повиквания

Ние поддържаме някои API RPC методи, които са отдалечени повиквания, които позволяват на функцията за мапинг да взаимодейства с действителния нод, заявка и подаване. Основната предпоставка на SubQuery е, че е детерминистична и следователно, за да поддържаме резултатите последователни, позволяваме само исторически RPC повиквания.

Документите в [JSON-RPC](https://polkadot.js.org/docs/substrate/rpc/#rpc) предоставят някои методи, които приема `BlockHash` като входен параметър (например `at?: BlockHash`), който вече е разрешен. Ние също така променихме тези методи, за да приемем хеш на текущия индексиращ блок по подразбиране.

```typescript
// Да приемем, че в момента индексираме блок с този хеш номер
const blockhash = `0x844047c4cf1719ba6d54891e92c071a41e3dfe789d064871148e9d41ef086f6a`;

// Оригиналният метод има избираем вход в блок хеш
const b1 = await api.rpc.chain.getBlock(blockhash);

// Ще използва текущия блок по подразбиране, по този начин:
const b2 = await api.rpc.chain.getBlock();
```
- За [Персонализирани Substrate Вериги](#custom-substrate-chains) RPC повиквания, вижте [употреба](#usage).

## Модули и библиотеки

За да подобрим възможностите на SubQuery за обработка на данни, ние разрешихме някои от вградените модули на NodeJS за изпълнение на функции за мапинг в [sandbox](#the-sandbox), и позволихме на потребителите да изпълняват библиотеки на трети страни.

Моля, имайте предвид, че това е **експериментална функция** и може да срещнете грешки или проблеми, които могат да повлияят негативно на функциите ви за мапинг. Моля, докладвайте всички грешки, които откриете, като създадете казус в [GitHub](https://github.com/subquery/subql).

### Вградени модули

Понастоящем позволяваме следните модули на NodeJS: `assert`, `buffer`, `crypto`, `util` и `path`.

Вместо да импортирате целия модул, препоръчваме да импортирате само необходимия(те) метод(и), от който се нуждаете. Някои методи в тези модули може да имат зависимости, които не се поддържат и няма да се импортират.

```ts
импортирайте  {hashMessage} от "ethers/lib/utils"; //Добър начин
импортирайте  {utils} от "ethers" //Лош начин

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    const record = new starterEntity(extrinsic.block.block.header.hash.toString());
    record.field1 = hashMessage('Hello');
    await record.save();
}
```

### Библиотеки на трети страни

Поради ограниченията на виртуалната машина в нашия sandbox, в момента поддържаме само библиотеки на трети страни, написани на **CommonJS**.

Ние поддържаме **хибридна** библиотека като `@polkadot/*` която използва ESM по подразбиране. Въпреки това, ако други библиотеки зависят от модули във формат **ESM** виртуалната машина **НЯМА** да компилира и да върне грешка.

## Персонализирани вериги за Substrate

SubQuery може да се използва във всяка верига, базирана на Substrate, не само Polkadot или Kusama.

Можете да използвате персонализирана верига, базирана на Substrate, и ние предоставяме инструменти за автоматично импортиране на типове, интерфейси и допълнителни методи, използвайки [@polkadot/typegen](https://polkadot.js.org/docs/api/examples/promise/typegen/).

В следващите раздели използваме нашия пример [kitty](https://github.com/subquery/tutorials-kitty-chain), за да обясним процеса на интеграция.

### Подготовка

Създайте нова директория `api-interfaces` под папката `src` на проекта, за да съхранявате всички необходими и генерирани файлове. Също създаваме директория `api-interfaces/kitties` тъй като искаме да добавим декорация в API от модула `kitties`.

#### Метаданни

Нуждаем се от метаданни, за да генерираме действителните крайни точки на API. В примера с котките, ние използваме крайна точка от локална тестова мрежа и тя предоставя допълнителни типове. Следвайте стъпките в настройката на метаданните на [PolkadotJS metadata setup](https://polkadot.js.org/docs/api/examples/promise/typegen#metadata-setup) за да извлечете метаданните на нода от неговата **HTTP** крайна точка.

```shell
curl -H "Content-Type: application/json" -d '{"id":"1", "jsonrpc":"2.0", "method": "state_getMetadata", "params":[]}' http://localhost:9933
```
или от неговата **websocket** крайна точка с помощта на [`websocat`](https://github.com/vi/websocat):

```shell
//Install the websocat
brew install websocat

//Get metadata
echo state_getMetadata | websocat 'ws://127.0.0.1:9944' --jsonrpc
```

След това копирайте и поставете резултата в JSON файл. В нашия пример [kitty](https://github.com/subquery/tutorials-kitty-chain), създадохме `api-interface/kitty.json`.

#### Дефиниции на типове
Предполагаме, че потребителят познава специфичните типове и RPC поддръжка от веригата, и това е дефинирано в [Манифеста](./manifest.md).

Следвайки [видовете сетъпи](https://polkadot.js.org/docs/api/examples/promise/typegen#metadata-setup), създаваме :
- `src/api-interfaces/definitions.ts` - това експортира всички дефиниции на подпапки

```ts
export { default as kitties } from './kitties/definitions';
```

- `src/api-interfaces/kitties/definitions.ts` - дефиниции на типа за модула Kitties
```ts
export default {
    // custom types
    types: {
        Address: "AccountId",
        LookupSource: "AccountId",
        KittyIndex: "u32",
        Kitty: "[u8; 16]"
    },
    // custom rpc : api.rpc.kitties.getKittyPrice
    rpc: {
        getKittyPrice:{
            description: 'Get Kitty price',
            params: [
                {
                    name: 'at',
                    type: 'BlockHash',
                    isHistoric: true,
                    isOptional: false
                },
                {
                    name: 'kittyIndex',
                    type: 'KittyIndex',
                    isOptional: false
                }
            ],
            type: 'Balance'
        }
    }
}
```

#### Пакети

- Във файла `package.json`, не забравяйте да добавите `@polkadot/typegen` като зависимост за разработка и `@polkadot/api` като обикновена зависимост (в идеалния случай същата версия). Нуждаем се и от `ts-node` като зависимост за разработка, за да ни помогне да стартираме скриптовете.
- Добавяме скриптове за изпълнение на двата типа; `generate:defs` и метадата `generate:meta` генератори (в този ред, така че метаданните могат да използват типовете).

Ето опростена версия на `package.json`. Уверете се, че в секцията **scripts** името на пакета е правилно и директориите са валидни.

```json
{
  "name": "kitty-birthinfo",
  "scripts": {
    "generate:defs": "ts-node --skip-project node_modules/.bin/polkadot-types-from-defs --package kitty-birthinfo/api-interfaces --input ./src/api-interfaces",
    "generate:meta": "ts-node --skip-project node_modules/.bin/polkadot-types-from-chain --package kitty-birthinfo/api-interfaces --endpoint ./src/api-interfaces/kitty.json --output ./src/api-interfaces --strict"
  },
  "dependencies": {
    "@polkadot/api": "^4.9.2"
  },
  "devDependencies": {
    "typescript": "^4.1.3",
    "@polkadot/typegen": "^4.9.2",
    "ts-node": "^8.6.2"
  }
}
```

### Генериране на тип

След като подготовката е завършена, ние сме готови да генерираме типове и метаданни. Изпълнете командите по-долу:

```shell
# Yarn to install new dependencies
yarn

# Generate types
yarn generate:defs
```

In each modules folder (eg `/kitties`), there should now be a generated `types.ts` that defines all interfaces from this modules' definitions, also a file `index.ts` that exports them all.

```shell
# Generate metadata
yarn generate:meta
```

This command will generate the metadata and a new api-augment for the APIs. As we don't want to use the built-in API, we will need to replace them by adding an explicit override in our `tsconfig.json`. After the updates, the paths in the config will look like this (without the comments):

```json
{
  "compilerOptions": {
      // this is the package name we use (in the interface imports, --package for generators) */
      "kitty-birthinfo/*": ["src/*"],
      // here we replace the @polkadot/api augmentation with our own, generated from chain
      "@polkadot/api/augment": ["src/interfaces/augment-api.ts"],
      // replace the augmented types with our own, as generated from definitions
      "@polkadot/types/augment": ["src/interfaces/augment-types.ts"]
    }
}
```

### Usage

Now in the mapping function, we can show how the metadata and types actually decorate the API. The RPC endpoint will support the modules and methods we declared above. And to use custom rpc call, please see section [Custom chain rpc calls](#custom-chain-rpc-calls)
```typescript
export async function kittyApiHandler(): Promise<void> {
    //return the KittyIndex type
    const nextKittyId = await api.query.kitties.nextKittyId();
    // return the Kitty type, input parameters types are AccountId and KittyIndex
    const allKitties  = await api.query.kitties.kitties('xxxxxxxxx',123)
    logger.info(`Next kitty id ${nextKittyId}`)
    //Custom rpc, set undefined to blockhash
    const kittyPrice = await api.rpc.kitties.getKittyPrice(undefined,nextKittyId);
}
```

**If you wish to publish this project to our explorer, please include the generated files in `src/api-interfaces`.**

### Custom chain rpc calls

To support customised chain RPC calls, we must manually inject RPC definitions for `typesBundle`, allowing per-spec configuration. You can define the `typesBundle` in the `project.yml`. And please remember only `isHistoric` type of calls are supported.
```yaml
...
  types: {
    "KittyIndex": "u32",
    "Kitty": "[u8; 16]",
  }
  typesBundle: {
    spec: {
      chainname: {
        rpc: {
          kitties: {
            getKittyPrice:{
                description: string,
                params: [
                  {
                    name: 'at',
                    type: 'BlockHash',
                    isHistoric: true,
                    isOptional: false
                  },
                  {
                    name: 'kittyIndex',
                    type: 'KittyIndex',
                    isOptional: false
                  }
                ],
                type: "Balance",
            }
          }
        }
      }
    }
  }

```
