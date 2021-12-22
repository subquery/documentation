# Картографування

Функції картографування визначають, як дані ланцюга перетворюються на оптимізовані об'єкти GraphQL, які ми раніше визначали у файлі ` schema.graphql `.

- Картинки визначені в каталозі ` src / mappings ` і експортуються як функція
- Ці відображення також експортуються в ` src / index.ts `
- Файли відображень посилаються на ` project.yaml ` під обробниками картографування.

Існує три класи функцій картографування; [ Обробники блоків ](#block-handler), [ Обробники подій ](#event-handler) та [ Обробники викликів ](#call-handler).

## Обробник блоків

Ви можете використовувати обробники блоків для збору інформації кожного разу, коли новий блок приєднаний до ланцюга Substrate, наприклад. номер блоку. Щоб досягти цього, визначений обробник блоків буде викликаний один раз для кожного блоку.

```ts
import {SubstrateBlock} from "@subql/types";

export async function handleBlock(block: SubstrateBlock): Promise<void> {
    // Create a new StarterEntity with the block hash as it's ID
    const record = new starterEntity(block.block.header.hash.toString());
    record.field1 = block.block.header.number.toNumber();
    await record.save();
}
```

[ SubstrateBlock ](https://github.com/OnFinality-io/subql/blob/a5ab06526dcffe5912206973583669c7f5b9fdc9/packages/types/src/interfaces.ts#L16) - це розширений тип інтерфейсу [ signedBlock ](https://polkadot.js.org/docs/api/cookbook/blocks/), але також включає ` specVersion ` та ` timestamp `.

## Обробники подій

Ви можете використовувати обробники подій для збору інформації, коли певні події включаються до нового блоку. Події, що входять до часу виконання Substrate за замовчуванням та блоку, можуть містити кілька подій.

Під час обробки обробник подій отримає подію підкладки як аргумент із набраними входами та виходами події. Будь-який тип події спричинить відображення, дозволяючи захоплювати активність із джерелом даних. Ви повинні використовувати [ Mapping Filters ](./manifest.md#mapping-filters) у своєму маніфесті для фільтрації подій, щоб скоротити час, необхідний для індексації даних та покращення продуктивності відображення.

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

[ SubstrateEvent ](https://github.com/OnFinality-io/subql/blob/a5ab06526dcffe5912206973583669c7f5b9fdc9/packages/types/src/interfaces.ts#L30) - це розширений тип інтерфейсу [ EventRecord ](https://github.com/polkadot-js/api/blob/f0ce53f5a5e1e5a77cc01bf7f9ddb7fcf8546d11/packages/types/src/interfaces/system/types.ts#L149). Окрім даних про події, він також включає ` id ` (блок, до якого належить ця подія) та зовнішню всередині цього блоку.

## Обробник дзвінків

Обробники викликів використовуються, коли ви хочете фіксувати інформацію про певні екстринти substrate.

```ts
export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    const record = new starterEntity(extrinsic.block.block.header.hash.toString());
    record.field4 = extrinsic.block.timestamp;
    await record.save();
}
```

[ SubstrateEvent ](https://github.com/OnFinality-io/subql/blob/a5ab06526dcffe5912206973583669c7f5b9fdc9/packages/types/src/interfaces.ts#L21) - це розширений тип інтерфейсу [ EventRecord ](https://github.com/polkadot-js/api/blob/a9c9fb5769dec7ada8612d6068cf69de04aa15ed/packages/types/src/extrinsic/Extrinsic.ts#L170). Йому присвоюється ` id ` (блок, до якого належить цей зовнішній) і забезпечує зовнішню властивість, яка розширює події серед цього блоку. Крім того, він фіксує статус успіху цього зовнішнього.

## Форма запиту
Наша мета - охопити всі джерела даних для користувачів для обробників карт (більше ніж лише три типи подій інтерфейсу вище). Тому ми виявили деякі інтерфейси @polkadot / api для збільшення можливостей.

Це інтерфейси, які ми зараз підтримуємо:
- [api.query.&lt;module&gt;.&lt;method&gt;()](https://polkadot.js.org/docs/api/start/api.query) буде запитувати <strong>поточний</strong> блок.
- [api.query.&lt;module&gt;.&lt;method&gt;.multi()](https://polkadot.js.org/docs/api/start/api.query.multi/#multi-queries-same-type) зробить декілька запитів <strong>того ж</strong> типу в поточному блоці.
- [api.query.&lt;module&gt;.&lt;method&gt;.multi()](https://polkadot.js.org/docs/api/start/api.query.multi/#multi-queries-same-type) зробить декілька запитів <strong>того ж</strong> типу в поточному блоці.

Це інтерфейси, які ми робимо **НЕ** підтримуємо:
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

Дивіться приклад використання цього API у нашому прикладі використання [ validator-threshold ](https://github.com/subquery/tutorials-validator-threshold).

## Дзвінки RPC

Ми також підтримуємо деякі методи RPC API, які є віддаленими дзвінками, які дозволяють функції відображення взаємодіяти з фактичним вузлом, запитом та поданням. Основна передумова SubQuery полягає в тому, що він є детермінованим, а отже, щоб підтримувати результати послідовними, ми дозволяємо лише історичні дзвінки RPC.

Документи в [ JSON-RPC ](https://polkadot.js.org/docs/substrate/rpc/#rpc) містять деякі методи, які приймають ` BlockHash ` як вхідний параметр (наприклад,. ` в?: BlockHash `), які зараз дозволені. Ми також змінили ці методи, щоб за замовчуванням взяти поточний хеш-блок індексації.

```typescript
// Let's say we are currently indexing a block with this hash number
const blockhash = `0x844047c4cf1719ba6d54891e92c071a41e3dfe789d064871148e9d41ef086f6a`;

// Original method has an optional input is block hash
const b1 = await api.rpc.chain.getBlock(blockhash);

// It will use the current block has by default like so
const b2 = await api.rpc.chain.getBlock();
```
- Для [Custom Substrate Chains](#custom-substrate-chains) RPC викликів, див. [ usage.](#usage).

## Модулі та Сервіси

Щоб покращити можливості обробки даних SubQuery, ми дозволили деяким вбудованим модулям NodeJS для запуску функцій картографування в [ sandbox ](#the-sandbox) і дозволили користувачам телефонувати стороннім бібліотекам.

Зверніть увагу, що це ** експериментальна функція **, і ви можете зіткнутися з помилками або проблемами, які можуть негативно вплинути на ваші функції картографування. Будь ласка, повідомте про будь-які помилки, які ви виявите, створивши проблему в [GitHub](https://github.com/subquery/subql).

### Вбудовані модулі

В даний час ми дозволяємо наступні модулі NodeJS: `assert`, `buffer` `крипто`, `util`, та `шлях`.

Замість того, щоб імпортувати весь модуль, ми рекомендуємо лише імпортувати необхідний метод (и), який вам потрібен. Деякі методи в цих модулях можуть мати непідтримувані залежності і не вдасться імпортувати.

```ts
import {hashMessage} from "ethers/lib/utils"; //Good way
import {utils} from "ethers" //Bad way

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    const record = new starterEntity(extrinsic.block.block.header.hash.toString());
    record.field1 = hashMessage('Hello');
    await record.save();
}
```

### Сторонні бібліотеки

Через обмеження віртуальної машини в нашій пісочниці, ми підтримуємо лише сторонні бібліотеки, написані ** CommonJS **

Ми також підтримуємо бібліотеку ** hybrid ** на зразок ` @ polkadot / * `, яка використовує ESM за замовчуванням. Однак якщо будь-які інші бібліотеки залежать від будь-яких модулів у форматі ** ESM **, віртуальна машина ** НЕ ** складе та поверне помилку.

## Користувацькі ланцюжки Substrate

SubQuery можна використовувати в будь-якій ланцюжку на основі Substrate, а не лише в Polkadot або Kusama.

Ви можете використовувати власну ланцюжок на основі Substrate, і ми надаємо інструменти для імпорту типів, інтерфейсів та додаткових методів автоматично, використовуючи [ @ polkadot / typegen ](https://polkadot.js.org/docs/api/examples/promise/typegen/).

У наступних розділах ми використовуємо наш [ kitty example ](https://github.com/subquery/tutorials-kitty-chain) для пояснення процесу інтеграції.

### Підготовка

Створіть новий каталог ` api-interfaces ` у папці проекту ` src ` для зберігання всіх необхідних та створених файлів. Ми також створили директорію `api-interfaces/kitties` коли ми хочемо додати прикраси в API з модуля `кодів`.

#### Метаданні

Нам потрібні метадані для створення фактичних кінцевих точок API. У прикладі kitty ми використовуємо кінцеву точку з локальної тестової мережі, і вона надає додаткові типи. Виконайте кроки в [ Налаштування метаданих PolkadotJS ](https://polkadot.js.org/docs/api/examples/promise/typegen#metadata-setup), щоб отримати метадані вузла з його кінцевої точки ** HTTP **.

```shell
curl -H "Content-Type: application/json" -d '{"id":"1", "jsonrpc":"2.0", "method": "state_getMetadata", "params":[]}' http://localhost:9933
```
або зі свого **websocket** кінцевої точки з допомогою [`websocat`](https://github.com/vi/websocat):

```shell
//Install the websocat
brew install websocat

//Get metadata
echo state_getMetadata | websocat 'ws://127.0.0.1:9944' --jsonrpc
```

Далі, скопіюйте і вставте вихід у файл JSON. У нашому [kitty example](https://github.com/subquery/tutorials-kitty-chain)ми створили `api-interface/kitty.json`.

#### Визначення типів
Ми припускаємо, що користувач знає конкретні типи та підтримку RPC з ланцюга, і це визначено в [ Маніфесті ](./manifest.md).

Наступні [types setup](https://polkadot.js.org/docs/api/examples/promise/typegen#metadata-setup), ми створюємо :
- `src/api-interfaces/definitions.ts` - цей експорт всіх визначень підтек

```ts
export { default as kitties } from './kitties/definitions';
```

- `src/api-interfaces/kitties/definitions.ts` - визначення типів для модуля kitties
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

- В пакеті `. son` файл, не забудьте додати `@polkadot/typegen` як залежність від розробників і `@polkadot/api` як регулярну залежність (в ідеалі та сама версія). Нам також потрібно `ts-node` в якості залежності від розробки, щоб допомогти нам запустити сценарії.
- Ми додаємо сценарії для запуску обох типів; ` generate:defs ` та метадані ` generate:meta ` генератори (у такому порядку, тому метадані можуть використовувати типи).

Ось спрощена версія ` package.json `. Переконайтесь, що в розділі ** scripts ** ім'я пакета є правильним, а каталоги дійсними.

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

### Генерація коду

Тепер, коли підготовка завершена, ми готові генерувати типи та метадані. Виконайте команди нижче:

```shell
# Yarn to install new dependencies
yarn

# Generate types
yarn generate:defs
```

У кожній папці модулів (наприклад, ` / kitties `) тепер має бути сформований ` types.ts `, який визначає всі інтерфейси з визначень цих модулів, також файл ` index.ts ` що експортує їх усіх.

```shell
# Generate metadata
yarn generate:meta
```

Ця команда генерує метадані та новий апі-аугмент для API. Оскільки ми не хочемо використовувати вбудований API, нам потрібно буде замінити їх, додавши явне перекриття в нашому ` tsconfig.json `. Після оновлень шляхи в конфігурації будуть виглядати так (без коментарів) :

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

### Використання

Тепер у функції картографування ми можемо показати, як метадані та типи насправді прикрашають API. Кінцева точка RPC підтримуватиме модулі та методи, які ми заявили вище. А щоб використовувати спеціальний дзвінок rpc, перегляньте розділ [ Спеціальні дзвінки rpc ](#custom-chain-rpc-calls)
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

**Якщо ви хочете опублікувати цей проект нашому досліднику, будь ласка, включіть створені файли у ` src / api-interfaces `.**

### Користувальницькі ланцюжки викликів rpc

Для підтримки налаштованих мережевих дзвінків RPC ми повинні вручну вводити визначення RPC для ` typesBundle `, дозволяючи конфігурацію за специфікацією. Ви можете визначити `typesBundle` в `project.yml`. Як ласка, запам'ятайте, підтримуються лише ` isHistoric ` тип.
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
