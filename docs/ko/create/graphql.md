# GraphQL 개요

## 엔티티 정의

`schema.graphql` 파일은 다양한 GraphQL 스키마를 정의합니다. GraphQL 쿼리 언어가 작동하는 방식으로 인하여 스키마 파일은 본질적으로 서브쿼리의 데이터 모양을 결정합니다. GraphQL 스키마 언어로 작성하는 방법에 대해 자세히 알아보려면 [스키마 및 유형](https://graphql.org/learn/schema/#type-language)을 확인하시기 바랍니다.

**중요: 스키마 파일을 변경할 때, 반드시 `yarn codegen` 명령을 통해 디렉토리 타입을 재생성해야 합니다.**

### 엔티티
각 엔티티는 `ID!` 형식의 필수 필드 `id`를 정의해야 합니다. 이는 동일한 유형의 모든 엔티티에서 기본 키로 사용되며 고유의 값을 갖습니다.

Entity의 초기화될 수 없는 값들은 `!` 으로 표시됩니다. 아래 예제를 참조하세요:

```graphql
예시를 입력하세요 @entity {
  id: ID! # id 필드는 항상 필수이며 다음과 같아야 합니다.
  name: String! # 필수 필드입니다.
  주소: String # 이것은 옵션 필드입니다
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
- `<EntityName>` 중첩 관계 Entity의 경우 정의된 Entity 이름을 Field 중 하나로 사용할 수 있습니다. [Entity Relationships](#entity-relationships)를 참조하세요.
- `JSON`은 구조화된 데이터를 저장할 수 있습니다, [JSON type](#json-type)을 참조하세요
- `<EnumName>` 은 특정 허용된 값으로 제한된 특별한 스칼라 나열입니다. [Graphql Enum](https://graphql.org/learn/schema/#enumeration-types)를 참조하세요

## Non-primary-key field로 인덱싱하기

Query 성능을 향상시키려면 기본 키가 아닌 field에 `@index` 주석을 구현하여 Entity Field를 인덱싱하세요.

그러나 사용자가 [ JSON](#json-type) 개체에 `@index` 주석을 추가할 수는 없습니다. 기본적으로 인덱스는 데이터베이스의 JSON field 및 외래 키에만 자동으로 추가되지만 Query 서비스 성능만 향상시킵니다.

예제를 살펴봅시다.

```graphql
입력하세요 사용자 @entity {
  id: ID!
  이름: String! @index(unique: true) # 고유 항목을 참 또는 거짓으로 설정할 수 있습니다.
  title: Title! # 인덱스는 외부 키 field에 자동으로 추가됩니다. 
}  
  이름: String! @index(unique:true)
}
```
이 사용자의 이름은 알고 있지만 정확한 id 값은 모른다고 가정하면 모든 사용자를 추출한 다음 이름으로 필터링하는 대신 이름 필드 뒤에 `@index` 을 추가할 수 있습니다. 이렇게 하면 Query가 훨씬 빨라지고 `unique: true`를 추가로 전달하여 고유성을 보장할 수 있습니다.

**필드가 고유하지 않은 경우 최대 결과 집합 크기는 100입니다.**

When code generation is run, this will automatically create a `getByName` under the `User` model, and the foreign key field `title` will create a `getByTitleId` method, which both can directly be accessed in the mapping function.

```sql
/* 제목 Entity에 대한 레코드 준비 */
제목 삽입 (id, name) 값 ('id_1', 'Captain')
```

```typescript
// 맵핑 기능의 Handler
import {User} from "../types/models/User"
import {Title} from "../types/models/Title"

const jack = await User.getByName('Jack Sparrow');

const captainTitle = await Title.getByName('Captain');

const pirateLords = await User.getByTitleId(captainTitle.id); // List of all Captains
```

## Entity 관계

Entity는 종종 다른 Entity와 중첩된 관계를 가집니다. Field 값을 다른 Entity 이름으로 설정하면 기본적으로 두 Entity간의 일대일 관계가 정의됩니다.

아래 예제를 사용하여 서로 다른 Entity 관계(일대일, 일대다, 다대다) 를 구성할 수 있습니다.

### 일대일 관계

일대일 관계는 하나의 Entity만 다른 Entity에 맵핑된 경우의 기본값입니다.

예시: 여권은 한 사람의 소유이고 한 사람은 한 사람의 여권만 가지고 있습니다(이 예시에서):

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

### 일대다 관계

대괄호를 사용하여 field 유형에 여러 개의 Entity가 포함됨을 나타낼 수 있습니다.

예시: 한 사람이 여러개의 계정을 가질 수 있습니다.

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

### 다대다 관계
다대다 관계는 맵핑 Entity를 구현하여 다른 두 Entity를 연결함으로써 달성될 수 있습니다.

예: 각 사용자는 여러 그룹(사용자 그룹) 의 일부이며 그룹에는 여러 다른 사용자(사용자 그룹) 가 있습니다.

```graphql
type Person @entity {
  id: ID!
  이름: String!
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

또한 중간 Entity의 여러 Field에 동일한 Entity의 연결을 만들 수 있습니다.

예를 들어, 계정에는 여러 개의 전송이 있을 수 있으며 각 전송에는 소스 및 대상 계정이 있습니다.

이렇게 하면 양도 표를 통해 두 계정(출처 및 도착처) 간에 양방향 관계가 설정됩니다.

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

### 역방향 조회

Entity에 대한 역방향 조회를 활성화하려면`@derivedFrom` 을 Field에 첨부하고 다른 Entity의 역방향 조회 Field를 선택합니다.

이렇게 하면 Query할 수 있는 가상 Field가 Entity에 생성됩니다.

계정 "에서" 계정 Entity에서 발신 전송 또는 발신 받기를 각각 Field에서 파생된 값으로 설정하여 액세스할 수 있습니다.

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
- 임의의 키/값 사용자 기본 설정 저장(여기서 값은 Boolean, 텍스트 또는 숫자일 수 있으며 다른 데이터 유형에 대해 별도의 열을 사용하지 않을 수 있습니다).
- 스키마가 휘발성이고 자주 변경되는 경우

### JSON 지시어 정의
Entity에 `jsonField` 주석을 추가하여 속성을 JSON 유형으로 정의합니다. This will automatically generate interfaces for all JSON objects in your project under `types/interfaces.ts`, and you can access them in your mapping function.

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
