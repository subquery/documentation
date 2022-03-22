# Schema ของ GraphQL

## การนิยาม Entity

ไฟล์ `schema.graphql` นั้นนิยาม Schema ของ GraphQL ที่หลากหลาย เนื่องจากวิธีที่ภาษา GraphQL ใช้ในการดึงข้อมูลทำงานนั้น ไฟล์ Schema เป็นสิ่งสำคัญที่กำหนดรูปร่างข้อข้อมูลจาก SubQuery เพื่อที่จะเรียนรู้เพิ่มเติมเกี่ยวกับการเขียนภาษาของ GraphQL Schema เราแนะนำให้ดูที่ [Schema และ Types](https://graphql.org/learn/schema/#type-language)

**สำคัญ: เมื่อคุณทำการเปลี่ยนแปลงใดๆ กับไฟล์ Schema โปรดตรวจสอบให้แน่ใจว่าคุณได้สร้างโฟลเดอร์ Types ของคุณใหม่ด้วยคำสั่ง `yarn codegen`**

### Entitiy
แต่ละ Entity จะต้องนิยามฟิลด์ที่จำเป็น `id` ด้วย Type ของ `ID!` สิ่งนี้จะถูกใช้เป็น Primary Key และไม่ซ้ำกันกับ Entity ทั้งหมดที่มี Type เดียวกัน

ฟิลด์ที่ไม่สามารถกำหนดค่า Null ได้ (Non-nullable Field) จะมีเครื่องหมาย `!` กำกับไว้ สามารถดูตัวอย่างโค้ดได้ด้านล่าง:

```graphql
type Example @entity {
  id: ID! # Id ฟิลด์จะต้องการตลอด และต้องเป็นลักษณะดังนี้
  name: String! # เป็นฟิลด์ที่จำเป็น
  address: String # เป็นฟิลด์ที่ไม่จำเป็น
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
- `<EntityName>` สำหรับความสัมพันธ์แบบซ้อนของ Entity (Nested Relationship) คุณอาจต้องใช้ชื่อของ Entity ที่ระบุไว้แล้วเป็นส่วนหนึ่งของฟิลด์ อ่านเพิ่มเติมได้ใน [ความสัมพันธ์ของ Entity](#entity-relationships)
- `JSON` เป็นอีกหนึ่งทางเลือกสำหรับการจัดเก็บข้อมูลที่มีโครงสร้างชัดเจน (Structured Data) สามารถอ่านเพิ่มใน [JSON type](#json-type)
- `<EnumName>` Type เป็นชนิดพิเศษของ Enumerated Scalar ที่จำกัดเฉพาะกลุ่มของค่าที่สามารถใช้ได้ โปรอ่านเพิ่มเติมที่ [Graphql Enum](https://graphql.org/learn/schema/#enumeration-types)

## การทำ Index (Indexing) ด้วย Non-primary-key Field

เพื่อที่จะพัฒนาความสามารถในการดึงข้อมูล การทำ Index และ Entity Field อย่างง่ายสามารถทำได้ด้วยการกำกับ `@index` บน Non-primary-key Field

อย่างไรก็ตาม เราไม่อนุญาติให้เพิ่มการกำกับ `@index` บน [JSON](#json-type) Object ใดๆ ได้ โดยปกติแล้ว Index จะถูกเพิ่มเข้าไปใน Foreign Key และสำหรับ JSON Field ในฐานข้อมูลโดยอัตโนมัติ เพื่อเพิ่มประสิทธิภาพของการดึงข้อมูล

ตัวอย่างดังนี้

```graphql
type User @entity {
  id: ID!
  name: String! @index(unique: true) # unique สามารถเลือกเป็น true หรือ false
  title: Title! # Index จะถูกเพิ่มใน Field Foreign Key อัตโนมัติ
}

type Title @entity {
  id: ID!  
  name: String! @index(unique:true)
}
```
สมมุติว่าเรารู้ชื่อของผู้ใช้งานแต่เราไม่รู้ค่า Id ที่แน่ชัด แทนที่จะดึงข้อมูลผู้ใช้งานทั้งหมดและกรองตามชื่อ เราสามารถเพิ่ม `@index` หลัง Name Field ได้ วิธีนี้ทำให้การดึงข้อมูลนั้นเร็วกว่ามาก และเราสามารถเพิ่ม `unique: true` เพื่อการันตีว่าข้อมูลนั้นไม่เหมือนกัน

**หากแต่ละฟิลด์นั้นไม่ซ้ำกัน จำนวนผลลัพท์สูงสุดจะถูกตั้งไว้ที่ 100**

เมื่อการสร้างโค้ดนั้นเริ่มต้นรันแล้ว `getByName` จะถูกสร้างขึ้นโดยอัตโนมัติภายใต้ `User` Model และ Field ของ Foreign Key `title` จะสร้าง method `getByTitleId` ซึ่งจะทั้งคู่จะสามารถเข้าถึงได้โดยตรงผ่านฟังก์ชัน Mapping

```sql
/*เตรียมการบันทึกสำหรับ Title Entity */
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

Entity นั้นโดยทั่วไปจะเป็นความสัมพันธ์ซ้อน​ (Nested Relationship) กับ Entity อื่นๆ การตั้งค่า Field ให้แก่ Entity Name อื่นจะนิยามความสัมพันธ์แบบ One-to-One ระหว่างสอง Entity เป็นค่าเริ่มต้น

ความสัมพันธ์ของ Entity ที่ต่างกัน (One-to-One, One-to-Many, และ Many-to-Many) สามารถตั้งค่าได้ตามตัวอย่างด้านล่าง

### ความสัมพันธ์แบบหนึ่งต่อหนึ่ง (One-to-One)

ความสัมพันธ์แบบ One-to-One จะเป็นค่าเริ่มต้นเมื่อมี Entity เพียงตัวเดียวเชื่อมโยงกับตัวอื่น

ตัวอย่างเช่น: พาสปอร์ตที่เป็นเจ้าของโดยคนเดียว และหนึ่งคนจะต้องมีเพียงหนึ่งพาสปอร์ต (ในตัวอย่างนี้):

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

คุณสามารถใช้วงเล็บเหลี่ยม เพื่อระบุว่า Type ของฟิลด์มีหลาย Entity

ตัวอย่าง: คนหนึ่งคนสามารถมีได้หลายบัญชี

```graphql
type Person @entity {
  id: ID!
  accounts: [Account] @derivedFrom(field: "publicAddress") #This is virtual field 
}

type Account @entity {
  id: ID!
  publicAddress: String! #This will create a field point to the fk `publicAddress_id`
}
```

### ความสัมพันธ์แบบ Many-to-Many
ความสัมพันธ์แบบ Many-to-Many สามารถได้รับด้วยการใช้งาน Mapping Entity เพื่อเชื่อมต่อกับ Entity อื่นอีกสองอัน

ตัวอย่าง: แต่ละคนสามารถเป็นส่วนหนึ่งของหลายๆ กลุ่ม (PersonGroup) และกลุ่มสามารถมีหลายๆ คนที่ต่างกันได้ (PersonGroup)

```graphql
type Person @entity {
  id: ID!
  name: String!
}

type PersonGroup @entity {
  id: ID!
  person: Person!
  Group: Group!
}

type Group @entity {
  id: ID!
  name: String!
}
```

นอกจากนี้ เรายังสามารถสร้างการเชื่อมต่อระหว่าง Entity ที่เหมือนกันในหลายๆ ฟิลด์ของ Entity กลางได้

ตัวอย่างเช่น บัญชีสามารถโอนได้หลายครั้ง และในแต่ละการโอนจะมีบัญชีต้นทางและบัญชีปลายทาง

สิ่งนี้จะสร้างความสัมพันธ์แบบสองทาง ระหว่างบัญชี (จาก และ ถึง) ผ่านตารางการโอน (Transfer Table)

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

เพื่อที่จะอนุญาตการเรียกดูย้อนกลับบน Entity กับความสัมพันธ์ ให้แนบ `@derivedFrom` จากฟิลด์ที่ชี้ไปที่ฟิลด์ที่ต้องการจะเรียกดูย้อนกลับของ Entity อีกตัว

สิ่งนี้สามารถสร้างฟิลด์จำลองบน Entity ที่สามารถถูกเรียกใช้ได้

Transfer "จาก (From)" Account นั้นสามารถเข้าถึงได้จาก Account Entity ด้วยการตั้งค่า sentTransfer หรือ receivedTransfer เนื่องจากมีค่าที่เรียกมาจากฟิลด์ from หรือ to

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

เรารองรับการเซฟข้อมูลในรูปแบบของ JSON ซึ่งเป็นวิธีที่รวดเร็วในการเก็บข้อมูลที่มีโครงสร้างชัดเจน เราจะสร้างอินเทอร์เฟซของ JSON ที่สอดคล้องโดยอัตโนมัติ เพื่อการดึงข้อมูลนี้ และช่วยประหยัดเวลาในการนิยามและจัดการกับ Entity

เราแนะนำให้ผู้ใช้งานใช้ JSON สำหรับกรณีดังต่อไปนี้:
- เมื่อทำการกักเก็บข้อมูลที่มีโครงสร้างชัดเจนในฟิลด์เดี่ยวนั้นสามารถจัดการได้ง่ายกว่าการสร้าง Entity หลายอันที่แยกกันไป
- การบันทึก คีย์/ค่า ใดก็ตามที่ผู้ใช้งานต้องการ (โดยค่านั้นสามารถเป็น Boolean ลายลักษณ์อักษร หรือ ตัวเลข และคุณไม่ต้องการที่จะมีคอลลัมน์แยกสำหรับ Type ของข้อมูลต่างๆ)
- Schema นั้นมีการเปลี่ยนแปลงที่บ่อยและไม่แน่นอน

### การนิยามคำสั่ง JSON
กำหนดคุณสมบัติเป็น JSON ด้วยการเพิ่ม `jsonField` ไว้ใน Entity วิธีการนี้จะสร้างรูปแบบการเชื่อมต่อโดยอัตโนมัติสำหรับ JSON Object ในโปรเจคภายใต้ `types/interfaces.ts` และคุณสามารถเข้าถึงมันด้วยฟงัก์ชัน Mapping ของคุณ

คำสั่งจาก Object ของ jsonField ไม่ต้องการ Field `id` ซึ่งแตกต่างจาก Entity JSON Object ยังสามารถซ้อนกับ JSON Object อื่นๆ ได้อีกด้วย

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

ข้อเสียของการใช้ Type ชนิด JSON คือผลกระทบด้านประสิทธิภาพของการดึงข้อมูลที่ถูกกรองมาแล้ว และแต่ละครั้งที่มีการค้นหาตัวอักษร มันจะอยู่บน Entity ทั้งหมด

อย่างไรก็ตาม ผลกระทบนั้นยังอยู่ในระดับที่รับได้ในบริการของการดึงข้อมูล นี่คือตัวอย่างของการใช้คำสั่ง `contains` ใน GraphQL ที่ดึงข้อมูลบนฟิลด์ของ JSON เพื่อค้นหาผู้ใช้งาน 5 คนแรกที่มีเบอร์โทรศัพท์ที่มีตัวเลข '0064'

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
