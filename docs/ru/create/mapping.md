# Сопоставление

Функции сопоставления определяют, как данные цепи преобразуются в оптимизированные GraphQL-сущности, которые мы ранее определили в файле `schema.graphql`.

- Сопоставления определяются в директории `src/mapappings` и экспортируются как функция
- Эти сопоставления также экспортированы в `src/index.ts`
- Файлы сопоставлений являются ссылками в `project.yaml` под обработчиками сопоставлений.

Существует три класса функций сопоставления;  [Block handlers](#block-handler), [Event Handlers](#event-handler), и [Call Handlers](#call-handler).

## Обработчик блоков

Вы можете использовать обработчики блоков для сбора информации каждый раз, когда новый блок присоединяется к цепочке Substrate, например, номер блока. Для этого определенный обработчик блоков будет вызываться один раз для каждого блока.

```ts
import {SubstrateBlock} from "@subql/types";

export async function handleBlock(block: SubstrateBlock): Promise<void> {
    // Create a new StarterEntity with the block hash as it's ID
    const record = new starterEntity(block.block.header.hash.toString());
    record.field1 = block.block.header.number.toNumber();
    await record.save();
}
```

[SubstrateBlock](https://github.com/OnFinality-io/subql/blob/a5ab06526dcffe5912206973583669c7f5b9fdc9/packages/types/src/interfaces.ts#L16) является расширенным интерфейсом типа [signedBlock](https://polkadot.js.org/docs/api/cookbook/blocks/), но также включает в себя `specVersion` и `timestamp`.

## Обработчик событий

Вы можете использовать обработчики событий для сбора информации при наступлении определенных событий в новом блоке. События, которые являются частью времени выполнения Substrate по умолчанию, и блок может содержать несколько событий.

Во время обработки обработчик события получит в качестве аргумента событие-подложку с типизированными входами и выходами события. Любой тип события вызывает сопоставление, позволяя фиксировать активность с источником данных. Вы должны использовать [Mapping Filters](./manifest.md#mapping-filters) в манифесте для фильтрации событий, чтобы сократить время индексирования данных и улучшить производительность отображения.

```ts
импортировать {SubstrateEvent} из "@subql/types";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, balance]}} = event;
    // Получение записи по ее ID
    const запись = new starterEntity(event). xtrinsic.block.block.header.hash.toString());
    record.field2 = account. oString();
    record.field3 = (баланс как баланс).toBigInt();
    ожидание record.save();
```

[SubstrateEvent](https://github.com/OnFinality-io/subql/blob/a5ab06526dcffe5912206973583669c7f5b9fdc9/packages/types/src/interfaces.ts#L30) является расширенным интерфейсом типа [EventRecord](https://github.com/polkadot-js/api/blob/f0ce53f5a5e1e5a77cc01bf7f9ddb7fcf8546d11/packages/types/src/interfaces/system/types.ts#L149). Кроме данных о событии, он также включает `id` (блок, к которому принадлежит это событие) и внешние данные внутри этого блока

## Обработчик вызовов

Обработчики вызовов используются, когда вы хотите запечатлеть информацию о некоторых substrate extrinsics.

```ts
export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    const record = new starterEntity(extrinsic.block.block.header.hash.toString());
    record.field4 = extrinsic.block.timestamp;
    await record.save();
}

```

[SubstrateExtrinsic](https://github.com/OnFinality-io/subql/blob/a5ab06526dcffe5912206973583669c7f5b9fdc9/packages/types/src/interfaces.ts#L21) расширяет [GenericExtrinsic](https://github.com/polkadot-js/api/blob/a9c9fb5769dec7ada8612d6068cf69de04aa15ed/packages/types/src/extrinsic/Extrinsic.ts#L170). Ему присваивается `id` (блок, к которому принадлежит данное внешнее свойство) и предоставляется внешнее свойство, расширяющее события этого блока. Кроме того, он регистрирует успешный статус этой надбавки.

## Состояния запроса
Наша цель - охватить все источники данных для пользователей для обработчиков отображения (больше, чем просто три вышеуказанных типа событий интерфейса). Поэтому мы раскрыли некоторые интерфейсы @polkadot/api для расширения возможностей.

Это те интерфейсы, которые мы поддерживаем в настоящее время:
- [api.query.&lt;module&gt;.&lt;method&gt;()](https://polkadot.js.org/docs/api/start/api.query) будет запрашивать <strong>current</strong> блок.
- [api.query.&lt;module&gt;.&lt;method&gt;.multi()](https://polkadot.js.org/docs/api/start/api.query.multi/#multi-queries-same-type) сделает несколько запросов типа <strong>same</strong> в текущем блоке.
- [api.queryMulti()](https://polkadot.js.org/docs/api/start/api.query.multi/#multi-queries-distinct-types) сделает несколько запросов <strong>разных типов</strong> в текущем блоке.

Это интерфейсы, которые мы **НЕ** поддерживаем сейчас:
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

Посмотрите пример использования этого API в нашем примере использования [validator-threshold](https://github.com/subquery/tutorials-validator-threshold).

## RPC-вызовы

Мы также поддерживаем некоторые методы API RPC, которые представляют собой удаленные вызовы, позволяющие функции отображения взаимодействовать с реальным узлом, запросом и отправкой. Основной предпосылкой SubQuery является детерминированность, поэтому для сохранения согласованности результатов мы разрешаем только исторические вызовы RPC.

Документы в [JSON-RPC](https://polkadot.js.org/docs/substrate/rpc/#rpc) предоставляют некоторые методы, которые используют `BlockHash` в качестве входного параметра (e. . `в?: BlockHash`), которые теперь разрешены. Мы также изменили эти методы, чтобы они по умолчанию принимали хэш текущего блока индексации.

```typescript
// предположим, мы сейчас индексируем блок с этим хэш номером
const blockhash = `0x844047c4cf1719ba6d54891e92c071a41e3dfe789d064871148e9d41ef086f6a`;

// Оригинальный метод имеет необязательный входной блок хэш
const b1 = ожидание api. pc.chain.getBlock(blockhash);

// Он будет использовать текущий блок по умолчанию так:
const b2 = await api.rpc.chain.getBlock();
```
- Для [Custom Substrate Chains](#custom-substrate-chains) RPC звонки смотрите [usage](#usage).

## Модули и Библиотеки

Чтобы улучшить возможности SubQuery по обработке данных, мы разрешили некоторые встроенные модули NodeJS для выполнения функций отображения в [sandbox](#the-sandbox), а также позволили пользователям вызывать сторонние библиотеки.

Обратите внимание, что это **экспериментальная функция** и вы можете столкнуться с ошибками или проблемами, которые могут негативно повлиять на ваши функции отображения. Пожалуйста, сообщайте о найденных ошибках, создав проблему в [GitHub](https://github.com/subquery/subql).

### Встроенные модули

В настоящее время мы разрешаем следующие модули NodeJS:`assert`, `buffer`, `crypto`, `util`, and `path`.

Вместо того чтобы импортировать весь модуль, мы рекомендуем импортировать только нужный метод (методы), который вам необходим. Некоторые методы в этих модулях могут иметь зависимости, которые не поддерживаются, и при их импорте произойдет сбой.

```ts
импортировать {hashMessage} из "ethers/lib/utils"; //Хороший способ
импорта {utils} из "ethers" //Некорректный

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    const record = new starterEntity(extrinsic. lock.block.header.hash.toString());
    record.field1 = hashMessage('Hello');
    ожидание записи.save();
}
```

### Сторонние библиотеки

Из-за ограничений виртуальной машины в нашей песочнице, в настоящее время мы поддерживаем только сторонние библиотеки, написанные **CommonJS**.

Мы также поддерживаем **гибридную библиотеку** , такую как `@polkadot/*` , использующую ESM по умолчанию. Однако, если любые другие библиотеки зависят от каких-либо модулей в формате **ESM**, виртуальная машина **NOT** скомпилируется и выдаст ошибку.

## Пользовательские цепи Substrate

SubQuery можно использовать в любой цепочке на основе субстрата, а не только в Polkadot или Kusama.

Вы можете использовать пользовательскую цепочку на основе Substrate, и мы предоставляем инструменты для автоматического импорта типов, интерфейсов и дополнительных методов с помощью [@polkadot/typegen](https://polkadot.js.org/docs/api/examples/promise/typegen/).

В следующих разделах мы используем наш [kitty example](https://github.com/subquery/tutorials-kitty-chain) для объяснения процесса интеграции.

### Подготовка

Создайте новый каталог `api-интерфейсов` в папке проекта `src` для хранения всех необходимых и сгенерированных файлов. Мы также создаем каталог `api-interfaces/kitties` , так как хотим добавить декорирование в API из модуля `наборов`.

#### Метаданные

Нам нужны метаданные для генерации фактических конечных точек API. В примере с kitty example мы используем конечную точку из локальной сети testnet, и она предоставляет дополнительные типы. Выполните шаги в [настройках метаданных PolkadotJS](https://polkadot.js.org/docs/api/examples/promise/typegen#metadata-setup) , чтобы получить метаданные узла из конечной точки **HTTP**.

```shell
curl -H "Content-Type: application/json" -d '{"id":"1", "jsonrpc":"2.0", "method": "state_getMetadata", "params":[]}' http://localhost:9933
```
или из его **веб-сокета** с помощью [`websocat`](https://github.com/vi/websocat):

```shell
//Установить websocat
brew install websocat

//Получить метаданные
echo state_getMetadata | websocat 'ws://127.0.0.1:9944' --jsonrpc
```

Далее скопируйте и вставьте вывод в файл JSON. В нашем [kitty example](https://github.com/subquery/subql-examples/tree/main/kitty), мы создали `api-interface/kitty.json`.

#### Определения типов
Мы предполагаем, что пользователь знает конкретные типы и поддержку RPC из цепочки, и она определена в [Манифесте](./manifest.md).

Следуя [установке типов](https://polkadot.js.org/docs/api/examples/promise/typegen#metadata-setup), мы создаем :
- `src/api-interfaces/definitions.ts` - экспортирует все определения подпапок

```ts
экспортировать { default as kitties } из './kitties/definitions';
```

- `src/api-interfaces/kitties/definitions.ts` - определения типа для модуля котят
```ts
экспорт по умолчанию {
    // пользовательские типы
    : {
        Адрес: "AccountId",
        Справка: "ID клиента",
        KittyIndex: "u32",
        Kitty: "[u8; 16]"
    },
    // custom rpc : api. pc.kitties. etKittyPrice
    rpc: {
        getKittyPrice:{
            description: 'Get Kitty price',
            параметр: [
                {name: 'at', тип: 'BlockHash', История: правда, необязательно: false}, {name: 'kittyIndex', тип: 'KittyIndex', необязательно: ложно}], type: 'Баланс'}}}
```

#### Пакеты

- В пакете `. son` файл, не забудьте добавить `@polkadot/typegen` в качестве зависимостей для разработки и `@polkadot/api` как обычную зависимость (в идеале ту же версию). Нам также нужно `ts-node` в качестве зависимости для разработки, чтобы помочь нам запустить скрипты.
- Мы добавляем скрипты для запуска обоих типов; `generate:defs` и метаданных `generate:meta` generators (в таком порядке, чтобы метаданные могли использовать типы).

Вот упрощённая версия `package.json`. Убедитесь, что в разделе **scripts** имя пакета правильное и каталоги действительны.

```json
{
  "name": "kitty-birthinfo",
  "scripts": {
    "generate:defs": "ts-node --skip-project node_modules/.bin/polkadot-types-from-defs --package kitty-birthinfo/api-interfaces --input . src/api-interfaces",
    "generate:meta": "ts-node --skip-project node_modules/.bin/polkadot-types-from-chain --package kitty-birthinfo/api-interfaces --endpoint . src/api-interfaces/kitty.json --output ./src/api-interfaces --strict"
  },
  "dependencies": {
    "@polkadot/api": "^4.9. "
  },
  "devDependencies": {
    "typescript": "^4.1. ",
    "@polkadot/typegen": "^4.9.2",
    "ts-node": "^8.6.2"
  }
}
```

### Генерация типов

Теперь, когда подготовка завершена, мы готовы генерировать типы и метаданные. Выполните следующие команды:

```shell
# Для установки новых зависимостей
yarn

# Генерировать типы
yarn generate:defs
```

В папке каждого модуля (например, `/kitties`) теперь должен быть сгенерированный `types.ts`, определяющий все интерфейсы из определений этого модуля, а также файл `index.ts`, экспортирующий их все.

```shell
# Сгенерировать метаданные
yarn generate:meta
```

Эта команда сгенерирует метаданные и новые api-дополнения к API. Поскольку мы не хотим использовать встроенный API, нам нужно будет заменить их, добавив явное переопределение в наш `tsconfig.json`. После обновления пути в конфигурации будут выглядеть следующим образом (без комментариев):

```json
{
  "compilerOptions": {
      // это имя пакета, которое мы используем (в импорте интерфейса, --пакет для генераторов)*/
      "Информация о рождении/*": ["src/*"],
      // здесь мы заменим добавление @polkadot/api своим генерируется из цепи
      "@polkadot/api/augment": ["src/interfaces/augment-api. s"],
      // заменить дополненные типы собственными, в соответствии с определениями
      "@polkadot/types/augment": ["src/interfaces/augment-types.
```

### Использование

Теперь в функции отображения мы можем показать, как метаданные и типы фактически украшают API. Конечная точка RPC будет поддерживать модули и методы, которые мы объявили выше. А чтобы использовать пользовательский вызов rpc, смотрите раздел [ Пользовательские вызовы rpc цепочки](#custom-chain-rpc-calls).
```typescript
export async function kittyApiHandler(): Promise<void> {
    //return the KittyIndex type
    const nextKittyId = await api. веер. itties. extKittyId();
    // возвращаем тип Kitty, тип входных параметров: AccountId и KittyIndex
    const allKitties = await api. uery.kitties.kitties('xxxxxxx',123)
    logger. nfo(`Следующий id котика ${nextKittyId}`)
    //Другой rpc, установка не определена для blockhash
    const kittyPrice = ожидание api. pc.kitties.getKittyPrice(неизвестно, nextKittyId);
}
```

**Если вы хотите опубликовать этот проект в нашем проводнике, включите сгенерированные файлы в `src/api-interfaces`.**

### Пользовательские вызовы в цепочке rpc

Для поддержки индивидуальных вызовов цепочки RPC мы должны вручную ввести определения RPC для `typesBundle`, что позволяет настроить каждый конкретный вызов. Вы можете определить `typesBundle` в `project.yml`. И помните, что поддерживаются только звонки типа `isHistoric`.
```yaml
...
  типы: {
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
                параметров: [
                  {name: 'at', тип: 'BlockHash', История: правда, необязательно: false}, {name: 'kittyIndex', тип: 'KittyIndex', необязательно: ложно}], тип: "Баланс", }}}}

```
