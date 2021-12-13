# Схема GraphQL

## Определение сущностей

В файле ` schema.graphql ` определены различные схемы GraphQL. Из-за способа работы языка запросов GraphQL файл схемы по существу определяет форму ваших данных из SubQuery. Чтобы узнать больше о том, как писать на языке схем GraphQL, мы рекомендуем ознакомиться со схемами и типами.

**Важно: когда вы вносите какие-либо изменения в файл схемы, убедитесь, что вы регенерируете каталог типов с помощью следующей команды ` yarn codegen `**

### Cущности
Каждая сущность должна определять требуемые поля ID c помощью типа ID. Это используется как главный ключ и он уникален среди всех сущностей одинакового типа.

Не-нулевые поля в сущности обозначаются `!`. Посмотрите на пример ниже:

```graphql
type Example @entity {
  id: ID! # id field is always required and must look like this
  name: String! # This is a required field
  address: String # This is an optional field
}
```

### Supported scalars and types

We currently supporting flowing scalars types:
- `ID`
- `Int`
- `String`
- `BigInt`
- `Float`
- `Date`
- `Boolean`
- `<EntityName>` для вложенных сущностей отношений, вы можете использовать имя определенной сущности в качестве одного из полей. Пожалуйста, смотрите в [Entity Relationships](#entity-relationships).
- `JSON` может также хранить структурированные данные, пожалуйста, посмотрите [JSON type](#json-type)
- `<EnumName>` типы это особый вид enum скаляра, который ограничен определенным набором допустимых значений. Please see [Graphql Enum](https://graphql.org/learn/schema/#enumeration-types)

## Indexing by non-primary-key field

Для улучшения производительности запроса необходимо индексировать поле сущности выполнив `@index` для поля не являющегося первичным ключом.

Однако мы не позволяем юзерам добавлять аннотацию `@index` на какой либо из объектов [JSON](#json-type). По умолчанию индексы автоматически добавляются к внешним ключам и к полям JSON в базе данных, но только для повышения производительности службы запросов.

Вот пример.

```graphql
type User @entity {
  id: ID!
  name: String! @index(unique: true) # unique can be set to true or false
  title: Title! # Indexes are automatically added to foreign key field 
}

type Title @entity {
  id: ID!  
  name: String! @index(unique:true)
}
```
Если предположить, что мы знаем имя этого пользователя, но не знаем точного значения Id, то вместо того, чтобы извлечь всех пользователей и затем фильтровать их по имени, мы можем добавить ` @index ` за полем имени. Это делает выполнение запросов значительно более быстрым, и мы можем дополнительно передать `unique: true` для обеспечения уникальности.

**Если поле не является уникальным, то максимальный размер набора результатов будет равен 100**

When code generation is run, this will automatically create a `getByName` under the `User` model, and the foreign key field `title` will create a `getByTitleId` method, which both can directly be accessed in the mapping function.

```sql
/* Prepare a record for title entity */
INSERT INTO titles (id, name) VALUES ('id_1', 'Captain')
```

```typescript
// Handler in mapping function
import {User} from "../types/models/User"
import {Title} from "../types/models/Title"

const jack = await User.getByName('Jack Sparrow');

const captainTitle = await Title.getByName('Captain');

const pirateLords = await User.getByTitleId(captainTitle.id); // List of all Captains
```

## Отношения сущностей

Сущности часто имеют вложенные взаимоотношения с другими сущностями. Установка значения в поле имени другой сущности по умолчанию будет означать отношение один-к-одному между этими двумя сущностями.

Различные взаимоотношения отношения сущностей («один-к-одному», «один-ко-многим» и «многие-ко-многим») могут быть настроены с помощью примеров приведенных ниже.

### Отношения Один-к-Одному

Отношения «один-к-одному» используются по умолчанию, когда только один объект сопоставлен с другим.

Пример: Паспорт будет принадлежать только одному человеку, и человек имеет только один паспорт (в этом примере):

```graphql
type Person @entity {
  id: ID!
}

type Passport @entity {
  id: ID!
  owner: Person!
}
```

или

```graphql
type Person @entity {
  id: ID!
  passport: Passport!
}

type Passport @entity {
  id: ID!
  owner: Person!
}
```

### Отношения Один-ко-Многим

Вы можете использовать квадратные скобки, чтобы указать, что тип поля содержит несколько сущностей.

Пример: Человек может иметь несколько учетных записей.

```graphql
type Person @entity {
  id: ID!
  accounts: [Account] 
}

type Account @entity {
  id: ID!
  publicAddress: String!
}
```

### Отношения Многие-ко-Многим
Отношения «многие ко многим» могут быть достигнуты путем реализации сопоставления сущности для соединения с двумя другими сущностями.

Пример: Каждый человек является частью нескольких групп (ЧеловекГруппа), и в группах есть несколько разных людей (ЧеловекГруппа).

```graphql
type Person @entity {
  id: ID!
  name: String!
  groups: [PersonGroup]
}

type PersonGroup @entity {
  id: ID!
  person: Person!
  Group: Group!
}

type Group @entity {
  id: ID!
  name: String!
  persons: [PersonGroup]
}
```

Кроме того, возможно создать связь одной и той же сущности в нескольких полях средней сущности.

Например, учетная запись может иметь несколько переводов, и каждая передача имеет исходную и конечную учетную запись.

Это установит двунаправленную связь между двумя Учетными Записями (от и до) через Таблицу Переводов.

```graphql
type Account @entity {
  id: ID!
  publicAddress: String!
}

type Transfer @entity {
  id: ID!
  amount: BigInt
  from: Account!
  to: Account!
}
```

### Обратный просмотр

Чтобы включить обратный поиск cущности в отношении, прикрепите ` @dehibitedFrom ` к полю и укажите на его поле обратного просмотра другой сущности.

Это создает виртуальное поле на cущности, которое может быть запрошено.

Передача «от» Учетной Записи доступна из объекта Учетной Записи путем установки значений отправитьПередачу (sentTransfer) или получитьПередачу (receiveTransfer), полученной из соответствующих полей из (from) или в (to).

```graphql
type Account @entity {
  id: ID!
  publicAddress: String!
  sentTransfers: [Transfer] @derivedFrom(field: "from")
  receivedTransfers: [Transfer] @derivedFrom(field: "to")
}

type Transfer @entity {
  id: ID!
  amount: BigInt
  from: Account!
  to: Account!
}
```

## JSON type

We are supporting saving data as a JSON type, which is a fast way to store structured data. We'll automatically generate corresponding JSON interfaces for querying this data and save you time defining and managing entities.

We recommend users use the JSON type in the following scenarios:
- When storing structured data in a single field is more manageable than creating multiple separate entities.
- Saving arbitrary key/value user preferences (where the value can be boolean, textual, or numeric, and you don't want to have separate columns for different data types)
- The schema is volatile and changes frequently

### Define JSON directive
Define the property as a JSON type by adding the `jsonField` annotation in the entity. This will automatically generate interfaces for all JSON objects in your project under `types/interfaces.ts`, and you can access them in your mapping function.

Unlike the entity, the jsonField directive object does not require any `id` field. A JSON object is also able to nest with other JSON objects.

````graphql
type AddressDetail @jsonField {
  street: String!
  district: String!
}

type ContactCard @jsonField {
  phone: String!
  address: AddressDetail # Nested JSON
}

type User @entity {
  id: ID! 
  contact: [ContactCard] # Store a list of JSON objects
}
````

### Querying JSON fields

The drawback of using JSON types is a slight impact on query efficiency when filtering, as each time it performs a text search, it is on the entire entity.

However, the impact is still acceptable in our query service. Here is an example of how to use the `contains` operator in the GraphQL query on a JSON field to find the first 5 users who own a phone number that contains '0064'.

```graphql
#To find the the first 5 users own phone numbers contains '0064'.

query{
  user(
    first: 5,
    filter: {
      contactCard: {
        contains: [{ phone: "0064" }]
    }
}){
    nodes{
      id
      contactCard
    }
  }
}
```
