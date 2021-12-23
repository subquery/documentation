# GraphQL 개요

## 엔티티 정의

`schema.graphql` 파일은 다양한 GraphQL 스키마를 정의합니다. GraphQL 쿼리 언어가 작동하는 방식으로 인하여 스키마 파일은 본질적으로 서브쿼리의 데이터 모양을 결정합니다. GraphQL 스키마 언어로 작성하는 방법에 대해 자세히 알아보려면 [스키마 및 유형](https://graphql.org/learn/schema/#type-language)을 확인하시기 바랍니다.

**중요: 스키마 파일을 변경할 때, 반드시 `yarn codegen` 명령을 통해 디렉토리 타입을 재생성해야 합니다.**

### 엔티티
각 엔티티는 `ID!` 형식의 필수 필드 `id`를 정의해야 합니다. 이는 동일한 유형의 모든 엔티티에서 기본 키로 사용되며 고유의 값을 갖습니다.

Non-nullable fields in the entity are indicated by `!`. Please see the example below:

```graphql
type Example @entity {
  id: ID! # id field is always required and must look like this
  name: String! # This is a required field
  address: String # This is an optional field
}
```

### 지원되는 스칼라 및 유형

현재 지원되는 스칼라 및 유형은 다음과 같습니다.
- `ID`
- `Int`
- `String`
- `BigInt`
- `Float`
- `날짜`
- `Boolean`
- `<EntityName>` for nested relationship entities, you might use the defined entity's name as one of the fields. Please see in [Entity Relationships](#entity-relationships).
- `JSON` can alternatively store structured data, please see [JSON type](#json-type)
- `<EnumName>` types are a special kind of enumerated scalar that is restricted to a particular set of allowed values. Please see [Graphql Enum](https://graphql.org/learn/schema/#enumeration-types)

## Indexing by non-primary-key field

To improve query performance, index an entity field simply by implementing the `@index` annotation on a non-primary-key field.

However, we don't allow users to add `@index` annotation on any [JSON](#json-type) object. By default, indexes are automatically added to foreign keys and for JSON fields in the database, but only to enhance query service performance.

Here is an example.

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
Assuming we knew this user's name, but we don't know the exact id value, rather than extract all users and then filtering by name we can add `@index` behind the name field. This makes querying much faster and we can additionally pass the `unique: true` to  ensure uniqueness.

**필드가 고유하지 않은 경우 최대 결과 집합 크기는 100입니다.**

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

## Entity Relationships

An entity often has nested relationships with other entities. Setting the field value to another entity name will define a one-to-one relationship between these two entities by default.

Different entity relationships (one-to-one, one-to-many, and many-to-many) can be configured using the examples below.

### One-to-One Relationships

One-to-one relationships are the default when only a single entity is mapped to another.

Example: A passport will only belong to one person and a person only has one passport (in this example):

```graphql
type Person @entity {
  id: ID!
}

type Passport @entity {
  id: ID!
  owner: Person!
}
```

or

```graphql
type Person @entity {
  id: ID!
  passport: Passport!
}

type Passport @entity {
  id: ID!
}
```

### One-to-Many relationships

You can use square brackets to indicate that a field type includes multiple entities.

Example: A person can have multiple accounts.

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

### Many-to-Many relationships
A many-to-many relationship can be achieved by implementing a mapping entity to connect the other two entities.

Example: Each person is a part of multiple groups (PersonGroup) and groups have multiple different people (PersonGroup).

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

## JSON 유형

JSON 유형의 데이터 저장을 지원하여 구조화된 데이터를 빠르게 저장할 수 있습니다. 데이터 쿼리에 필요한 해당 JSON 인터페이스를 자동으로 생성함으로써 엔티티를 정의하고 관리하는 시간을 절약합니다.

다음 시나리오의 사용자는 JSON 유형의 사용을 권장합니다.
- 구조화된 데이터를 단일 필드에 저장하는 것이 여러 개의 개별 엔티티를 생성하는 것보다 용이한 경우
- Saving arbitrary key/value user preferences (where the value can be boolean, textual, or numeric, and you don't want to have separate columns for different data types)
- 스키마가 휘발성이고 자주 변경되는 경우

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

### JSON 필드 쿼리하기

JSON 유형을 사용하면, 텍스트 검색을 수행할 때마다 전체 엔티티에 적용되기 때문에 필터링 시 쿼리 효율성을 일부 저하시키는 단점이 있습니다.

그러나, 효율성 저하는 쿼리 서비스가 수용할 수 있는 수준입니다. Here is an example of how to use the `contains` operator in the GraphQL query on a JSON field to find the first 5 users who own a phone number that contains '0064'.

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
