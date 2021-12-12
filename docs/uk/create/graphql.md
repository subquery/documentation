# GraphQL Schema

## Визначення об'єктів

Файл `schema.graphql` визначає різні схеми GraphQL. Відповідно до того, як працює мова запитів GraphQL, файл схема, по суті, диктує форму ваших даних від SubQuery. Щоб дізнатися більше про те, як писати в мові GraphQL, ми рекомендуємо переглянути [схему і типи](https://graphql.org/learn/schema/#type-language).

**Важливо: після внесення будь-яких змін до файлу схеми, будь ласка, переконайтеся, що ви регенеруєте каталог типів за допомогою наступної команди `yarn codegen`**

### Об'єкти
Кожний об'єкт повинен визначити свої обов'язкові поля `id` з типом `ID!`. Він використовується як первинний ключ і унікальний серед всіх об'єктів одного типу.

Недопустимі поля в об'єкті `!`. Будь ласка, перегляньте наведений нижче приклад:

```graphql
type Example @entity {
  id: ID! # id field is always required and must look like this
  name: String! # This is a required field
  address: String # This is an optional field
}
```

### Підтримувані скаляри та типи

На даний момент ми підтримуємо типи скалярних елементів:
- `ID`
- `Int`
- `Рядок`
- `BigInt`
- `Плаваючий`
- `Дата`
- `Логічний тип`
- `<EntityName>` для вкладених відношень, ви можете використовувати ім'я визначеного об'єкту як один із полів. Будь ласка, побачити в [зв'язок істот](#entity-relationships).
- `JSON` може альтернативно зберігати структуровані дані, будь ласка, перегляньте [тип JSON](#json-type)
- `<EnumName>` типи є спеціальним видом перерахованого скаляру, який обмежується конкретним набором допустимих значень. Будь ласка, погляньте [Graphql Enum](https://graphql.org/learn/schema/#enumeration-types)

## Індексування по полю не основного ключа

Для поліпшення продуктивності запитів, індексувати поле об'єкта просто шляхом впровадження анотації `@index` в поле без основного ключа.

Проте, ми не дозволяємо користувачам додавати `@індекс` анотації на будь-якому об'єкті [JSON](#json-type). За замовчуванням індекси автоматично додаються до зовнішніх ключів та до полів JSON в базі даних, але лише для покращення продуктивності сервісу запитів.

Ось приклад:

```graphql
type Example @entity {
  id: ID!
  назва: Рядок! @index(унікальний: істина) # унікальний може бути встановлений значення true або false
  title: Назва! # Індекси автоматично додаються до зовнішнього ключового поля 
}

тип Title @entity {
  id: ID!  
  назва: Рядок! @index(unique:true)
}
```
Припускаючи, що ми знали ім'я користувача, але ми не знаємо точної ідентифікаційної цінності, замість того, щоб вилучати всіх користувачів, а потім фільтрувати за назвою, яку ми можемо додати `@index` за полем. Цей процес робить запит набагато швидшим і додатково ми можемо передати `унікальність: true` для удосконалення унікальності.

**Якщо поле не є унікальним, максимальний розмір цього результату 100**

Коли запущено генерацію коду, це автоматично створить `getByName` під моделлю `користувача,` і поле стороннього ключа, `заголовок` створить метод `getByTitleId` до якого можна отримати безпосередній доступ в функції.мап.

```sql
/* Підготувати запис для об'єкта title */
INSERT INTO (id, ім'я) VALUES ('id_1', 'Капітан')
```

```typescript
// Handler in mapping function
import {User} from "../types/models/User"
import {Title} from "../types/models/Title"

const jack = await User.getByName('Jack Sparrow');

const captainTitle = await Title.getByName('Captain');

const pirateLords = await User.getByTitleId(captainTitle.id); // List of all Captains
```

## Зв'язки об'єктів

В сутності часто є вкладені стосунки з іншими суб'єктами. Встановлення значення поля в іншу назву сутності визначає типовий зв'язок між цими двома сутностями.

Маси відповідності сутності (один до одного і багато-багатьох) можна налаштувати на прикладах нижче.

### Багато в одному відношенні

Одне до одного відношення є типовим, коли лише один об'єкт накладається на інший об'єкт.

Приклад: паспорт належить лише одній особі і має лише один паспорт (у цьому прикладі):

```graphql
type Example @entity {
  id: ID!
}type Example @entity {
  id: ID!
  owner: Person!
}
```

або

```graphql
type Example @entity {
  id: ID!
  passport: Passport!
}type Example @entity {
  id: ID!
  owner: Person!
}
```

### Багато в одному відношення

You can use square brackets to indicate that a field type includes multiple entities.

Example: A person can have multiple accounts.

```graphql
type Example @entity {
  id: ID!
  accounts: [Account] 
}

type Account @entity {
  id: ID!
  publicAddress: String!
}
```

### Many-to-Many relationships
A many-to-many relationship can be achieved by implementing a mapping entity to connect the other two entities.

Example: Each person is a part of multiple groups (PersonGroup) and groups have multiple different people (PersonGroup).

```graphql
type Example @entity {
  id: ID!
  назва: Рядок!
  groups: [PersonGroup]
}

type PersonGroup @entity {
  id: ID!
  person: Person!
  Group: Group!
}

type Group @entity {
  id: ID!
  назва: Рядок!
  persons: [PersonGroup]
}
```

Also, it is possible to create a connection of the same entity in multiple fields of the middle entity.

For example, an account can have multiple transfers, and each transfer has a source and destination account.

This will establish a bi-directional relationship between two Accounts (from and to) through Transfer table.

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

### Reverse Lookups

To enable a reverse lookup on an entity to a relation, attach `@derivedFrom` to the field and point to its reverse lookup field of another entity.

This creates a virtual field on the entity that can be queried.

The Transfer "from" an Account is accessible from the Account entity by setting the sentTransfer or receivedTransfer as having their value derived from the respective from or to fields.

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
