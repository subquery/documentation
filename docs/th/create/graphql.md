# Schema ของ GraphQL

## การนิยาม Entity

ไฟล์ `schema.graphql` นั้นนิยาม Schema ของ GraphQL ที่หลากหลาย เนื่องจากวิธีที่ภาษา GraphQL ใช้ในการดึงข้อมูลทำงานนั้น ไฟล์ Schema เป็นสิ่งสำคัญที่กำหนดรูปร่างข้อข้อมูลจาก SubQuery เพื่อที่จะเรียนรู้เพิ่มเติมเกี่ยวกับการเขียนภาษาของ GraphQL Schema เราแนะนำให้ดูที่ [Schema และ Types](https://graphql.org/learn/schema/#type-language)

**สำคัญ: เมื่อคุณทำการเปลี่ยนแปลงใดๆ กับไฟล์ schema โปรดตรวจสอบให้แน่ใจว่าคุณได้สร้างโฟลเดอร์ types ของคุณใหม่ด้วยคำสั่ง `yarn codegen`**

### Entitiy
แต่ละ entity ต้องนิยาม fields ที่จำเป็น `id` ด้วย type ของ `ID!` สิ่งนี้จะถูกใช้เป็น primary key และไม่ซ้ำกันกับ entities ทั้งหมดที่มี type เดียวกัน

Field ที่ไม่สามารถปล่อยว่างได้จะมีเครื่องหมาย `!` กำกับไว้ สามารถดูตัวอย่างโค้ดได้ด้านล่าง:

```graphql
type Example @entity {
  id: ID! # Id ฟิล์ดจะต้องการตลอด และต้องเป็นลักษณะดังนี้
  name: String! # เป็นฟิล์ดที่จำเป็น
  address: String # เป็นฟิล์ดที่ไม่จำเป็น
}
```

### Scalar และ Type ที่รองรับ

ขณะนี้เรารองรับ Scalars Type ดังนี้:
- `ID`
- `Int`
- `String`
- `BigInt`
- `Float`
- `Date`
- `Boolean`
- `<EntityName>` สำหรับความสัมพันธ์แบบซ้อนของ entities (Nested relationship), คุณอาจต้องใช้ชื่อของ entity ที่ระบุไว้แล้วเป็นหนึ่งใน fields อ่านเพิ่มเติมได้ใน [ความสัมพันธ์ของ Entity](#entity-relationships)
- `JSON` เป็นอีกหนึ่งทางเลือกสำหรับการจัดเก็บข้อมูลที่เป็นระเบียบ (structured data) สามารถอ่านเพิ่มใน [JSON type](#json-type)
- `<EnumName>` types เป็นชนิดพิเศษของ enumerated scalar ที่จำกัดแก่เซ็ตค่าจำเพาะที่อนุญาตไว้ โปรอ่านเพิ่มเติมที่ [Graphql Enum](https://graphql.org/learn/schema/#enumeration-types)

## การ Index ด้วย Non-primary-key Field

เพื่อที่จะพัฒนาความสามารถในการดึงข้อมูล การ index และ entity field อย่างง่ายสามารถทำได้ด้วยการกำกับ `@index` บน non-primary-key field

อย่างไรก็ตาม เราไม่อนุญาติให้เพิ่มการกำกับ `@index` บน [JSON](#json-type) object ใดๆ โดยปกติแล้ว index จะถูกเพิ่มเข้าไปใน foreign key และสำหรับ JSON field ในฐานข้อมูลโดยอัตโนมัติ เพื่อเพิ่มประสิทธิภาพของการดึงข้อมูล

ตัวอย่างดังนี้

```graphql
type User @entity {
  id: ID!
  name: String! @index(unique: true) # unique สามารถเลือกเป็น true หรือ false
  title: Title! # Index จะถูกเพิ่มใน field foreign key อัตโนมัติ
}

type Title @entity {
  id: ID!  
  name: String! @index(unique:true)
}
```
สมมุติว่าเรารู้ชื่อของผู้ใช้งานแต่เราไม่รู้ค่า id ที่ถูกต้อง แทนที่จะดึงข้อมูลผู้ใช้งานทั้งหมดและกรองตามชื่อ เราสามารถเพิ่ม `@index` หลัง field ชื่อได้ วิธีนี้ทำให้การดึงข้อมูลนั้นเร็วกว่ามาก และเราสามารถเพิ่ม `unique: true` เพื่อการันตีว่าข้อมูลนั้นไม่เหมือนกัน

**หากแต่ละฟิล์ดนั้นไม่ซ้ำกัน จำนวนผลลัพท์สูงสุดจะถูกตั้งไว้ที่ 100**

เมื่อการสร้างโค้ดนั้นเริ่มต้นรันแล้ว `getByName` จะถูกสร้างขึ้นโดยอัตโนมัติภายใต้ `User` model และ field ของ foreign key `title` จะสร้าง method `getByTitleId` ซึ่งจะทั้งคู่จะสามารถเข้าถึงได้โดยตรงผ่าน mapping function

```sql
/*เตรียมการบันทึกสำหรับ title entity */
INSERT INTO titles (id, name) VALUES ('id_1', 'Captain')
```

```typescript
// Handler ในฟังก์ชัน Mapping
import {User} from "../types/models/User"
import {Title} from "../types/models/Title"

const jack = await User.getByName('Jack Sparrow');

const captainTitle = await Title.getByName('Captain');

const pirateLords = await User.getByTitleId(captainTitle.id); // รายการของกัปตันทั้งหมด
```

## ความสัมพันธ์ของ Entity

Entity นั้นโดยทั่วไปจะเป็นความสัมพันธ์ซ้อน​ (Nested Relationship) กับ Entity อื่นๆ การต้ังค่า field ให้แก่ entity name อื่นจะนิยามความสัมพันธ์แบบ หนึ่ง-ต่อ-หนึ่ง (one-to-one) ระหว่างสอง entities เป็นค่าเริ่มต้น

ความสัมพันธ์ของ entity ที่ต่างกัน (one-to-one, one-to-many, และ many-to-many) สามารถตั้งค่าได้ตากตัวอย่างด้านล่าง

### ความสัมพันธ์แบบหนึ่งต่อหนึ่ง (One-to-One)

ความสัมพันธ์แบบ One-to-one จะเป็นค่าเริ่มต้นเมื่อมี entity เพียงตัวเดียวเชื่อมโยงกับตัวอื่น

ตัวอย่างเช่น: พาสปอร์ตที่เป็นเจ้าของโดยคนเดียว และคนเดียวจะต้องมีเพียงหนึ่งพาสปอร์ต (ในตัวอย่างนี้):

```graphql
type Person @entity {
  id: ID!
}

type Passport @entity {
  id: ID!
  owner: Person!
}
```

หรือ

```graphql
type Person @entity {
  id: ID!
  passport: Passport!
}

type Passport @entity {
  id: ID!
}
```

### ความสัมพันธ์แบบ One-to-Many

คุณสามารถใช้วงเล็บเหลี่ยม เพื่อระบุว่า field type ไหนมี entities หลายตัว

ตัวอย่าง: คนหนึ่งคนสามารถมีได้หลายบัญชี

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

### ความสัมพันธ์แบบ Many-to-Many
ความสัมพันธ์แบบ many-to-many สามารถได้รับด้วยการใช้งาน mapping entity เพื่อเชื่อมต่อกับ entities อีกสองอัน

ตัวอย่าง: แต่ละคนสามารถเป็นส่วนหนึ่งของหลายๆกลุ่ม (PersonGroup) และกลุ่มสามารถมีหลายๆคนที่ต่างกันได้ (PersonGroup)

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

นอกจากนี้ เรายังสามารถสร้างการเชื่อมต่อระหว่าง entity ที่เหมือนกันในหลายๆ fiels ของ entity กลาง

ตัวอย่างเช่น บัญชีสามารถโอนได้หลายครั้ง และในแต่ละการโอนจะมีบัญชีต้นทางและบัญชีปลายทาง

สิ่งนี้จะสร้างความสัมพันธ์แบบสองทาง ระหว่างบัญชี (จาก และ ถึง) ผ่านตาราง Transfer

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

### การเรียกดูย้อนกลับ (Reverse Lookup)

เพื่อที่จะอนุญาตการเรียกดูย้อนกลับบน entity สู่ความสัมพันธ์ ให้แนบ `@derivedFrom` จาก field ที่ชี้ไป field ที่ต้องการจะเรียกดูย้อนกับของ entity อีกตัว

สิ่งนี้สามารถสร้าง field จำลองบน entity ที่สามารถเรียกใช้ได้

Transfer "จาก (from)" Account นั้นสามารถเข้าถึงได้จาก entity Account ด้วยการตั้งค่า sentTransfer หรือ receivedTransfer เพราะการมีค่าที่เรียกมาจาก fields from หรือ to

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

## Type รูปแบบ JSON

เรารองรับการเซฟข้อมูลในรูปแบบของ JSOn ซึ่งเป็นวิธีที่รวดเร็วในการเก็บข้อมูล เราจะสร้าง JSON interfaces ที่สอดคล้องอัตโนมัติ เพื่อการดึงข้อมูลชนินนี้ และช่วยประหยัดเวลาในการนิยามและจัดการ entities

เราแนะนำให้ผู้ใช้งานใช้ JSON สำหรับกรณีดังกล่าว:
- เมื่อการกักเก็บข้อมูลอย่างเป็นระเบียบใน field เดี่ยวนั้น สามารถจัดการได้ง่ายกว่าการสร้าง entities หลายอันที่แยกกันไป
- บันทึก key/value ใดก็ตามของที่ผู้ใช้งานต้องการ (โดย value สามารถเป็น boolean ลายลักษณ์อักษร หรือ ตัวเลข และคุณไม่ต้องการที่จะมีคอลลัมน์แยกสำหรับ type ต่างๆ)
- Schema นั้นมีการเปลี่ยนแปลงที่บ่อยและไม่แน่นอน

### การนิยามคำสั่ง JSON
กำหนดคุณสมบัติเป็น JSON ด้วยการเพิ่ม `jsonField` ไว้ใน entity ด้วยวิธีการนี้ จะสร้างรูปแบบการเชื่อมต่อโดยอัตโนมัติสำหรับ JSON object ในโปรเจคภายใต้ `types/interfaces.ts` และคุณสามารถเข้าถึงมันด้วย mapping function ของคุณ

ไม่เหมือนกับ entity เพราะ คำสั่งจาก jsonField object ไม่ต้องการ field `id` JSON object ยังสามารถซ้อนกับ JSON objects อื่นๆได้อีกด้วย

````graphql
type AddressDetail @jsonField {
  street: String!
  district: String!
}

type ContactCard @jsonField {
  phone: String!
  address: AddressDetail # JSON ซ้อน
}

type User @entity {
  id: ID! 
  contact: [ContactCard] # เก็บรายการของ JSON Object
}
````

### การดึงข้อมูลจาก JSON Field

ข้อเสียของการใช้ type ชนิด JSON คือผลกระทบของการดึงข้อมูลที่มีประสิทธิภาพเมื่อมีการกรองมาแล้ว และแต่ละครั้งที่มีการค้นหาตัวอักษร มันจะอยู่บน entity ทั้งหมด

อย่างไรก็ตาม ผลกระทบนั้นยังอยู่ในระดับที่รับได้ในบริการของการดึงข้อมูล นี่คือตัวอย่างของการใช้คำสั่ง `contains` ใน GraphQL ที่ดึงข้อมูลบน field ของ JSON เพื่อค้นหาผู้ใช้งาน 5 คนแรกที่มีเบอร์โทรศัพท์ที่มีตัวเลข '0064'

```graphql
# เพื่อหาผู้ใช้งาน 5 คนแรกที่มีเบอร์มือถือที่มี '0064'

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
