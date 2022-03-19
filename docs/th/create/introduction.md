# การสร้างโปรเจกต์ของ SubQuery

ในคู่มือ [quick start](/quickstart/quickstart.md) เราจะมีตัวอย่างอธิบายแบบเร็วๆ เพื่อให้รู้ถึงความหมายของ SubQuery และเข้าใจวิธีการทำงานของมัน ในส่วนนี้ เราจะพามาดูขั้นตอนการสร้างโปรเจกต์ของคุณและไฟล์สำคัญที่คุณจะต้องใช้ในขั้นตอนนี้

## ขั้นตอนการทำงานเบื้องต้น

ในตัวอย่างบางส่วน จะสมมติว่าคุณได้เริ่มต้นแพ็คเกจในส่วนของ [Quick start](../quickstart/quickstart.md) สำเร็จแล้ว จากแพ็คเกจเริ่มต้น เราจะพาคุณดูขั้นตอนมาตรฐานเพื่อใช้ในการปรับแต่ง และใช้งานโปรเจกต์ SubQuery ของคุณ

1. เริ่มโปรเจกต์ของคุณโดยใช้คำสั่ง `subql init PROJECT_NAME`.
2. อัพเดท Manifest File (`project.yaml`) เพื่อใส่ข้อมูลที่เกี่ยวกับ Blockchain และ Entity ที่คุณจะทำการ Map โปรดดูที่ [Manifest File](./manifest.md)
3. สร้าง Entity ของ GraphQL ภายใน Schema ของคุณ (`schema.graphql`) เพื่อกำหนดโครงสร้างของข้อมูลที่คุณจะดึงข้อมูลออกมา โปรดดูที่ [GraphQL Schema](./graphql.md)
4. เพิ่ม Mapping Function ทั้งหมด (ตัวอย่าง `mappingHandlers.ts`) ที่คุณจะเรียกใช้เพื่อแปลงข้อมูลที่อยู่บน Chain ให้เป็นของ Entity ของ GraphQL ที่คุณได้กำหนดไว้ โปรดดูที่ [Mapping](./mapping.md)
5. การสร้างและเผยแพร่โค้ดของคุณไปยังโปรเจกต์ SubQuery (หรือรันอยู่บนโหนดของคุณเอง) โปรดดูที่ [Running and Querying your Starter Project](./quickstart.md#running-and-querying-your-starter-project) ที่อยู่ใน Quick Start Guide

## โครงสร้างของไดเร็กทอรี (Directory Structure)

Map ด้านล่างนี้จะแสดงถึงเห็นภาพรวมของโครงสร้างไดเร็กทอรีของโปรเจกต์ SubQuery เมื่อใช้คำสั่ง `init`

```
- project-name
  L package.json
  L project.yaml
  L README.md
  L schema.graphql
  L tsconfig.json
  L docker-compose.yml
  L src
    L index.ts
    L mappings
      L mappingHandlers.ts
  L .gitignore
```

ยกตัวอย่างเช่น:

![โครงสร้างไดเร็กทอรี SubQuery](/assets/img/subQuery_directory_stucture.png)

## Code Generation

เมื่อใดก็ตามที่คุณเปลี่ยนแปลง Entity ของ GraphQL คุณต้องสร้างประเภทของไดเรกทอรีใหม่ ซึ่งประกอบด้วยคำสั่ง

```
yarn codegen
```

นี่จะสร้างไดเรกทอรีใหม่ (หรืออัพเดทของเดิมที่มีอยู่) `src/types` โดยกำหนดคลาสของ Entity ที่ถูกสร้างขึ้นสำหรับแต่ละประเภทที่คุณได้กำหนดไว้ใน `schema.graphql` คลาสเหล่านี้จะให้ Type-safe Entity ที่จะให้สิทธิ์ในการ โหลด อ่านและเขียนลงไปในช่องข้อมูลของ Entity - อ่านต่อเกี่ยวกับกระบวนการนี้ได้ใน [the GraphQL Schema](./graphql.md)

## Build

ในการสร้างโปรเจ็กต์ SubQuery ของคุณบนโหนด SubQuery ที่โฮสต์บนเครื่อง คุณต้องเริ่มต้นจากการสร้างงานของคุณก่อน

รันคำสั่งในการสร้างจากไดเร็กทอรีเริ่มต้นของโปรเจกต์

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

### ตัวอย่างการสร้างตัวเลือก

เราสนับสนุนตัวเลือกการสร้างเพิ่มเติมสำหรับ subquery project โดยใช้ `subql build`. Text XPath: /p[10]/CodeGroup

ด้วยวิธีนี้ คุณสามารถกำหนดการเข้าใช้งานเพิ่มเติมเพื่อสร้างโดยใช้ฟิลด์จาก package.json

```json
"name": "project-name",
"version": "1.0.0",
...
"exports": {
  "entry_one": "./src/entry_one.ts",
  "entry_renamed": "./src/entry_two.ts"
},
```

จากนั้นโดยการเรียกใช้ `subql build` ระบบจะสร้างแฟ้มข้อมูล ที่มีโครงสร้างดังต่อไปนี้:

```
- project-name
  L dist
    L entry_one.js
    L entry_renamed.js
    L index.js 
```

โปรดทราบ ระบบจะสร้าง `index.ts` ไม่ว่าจะมีการระบุไว้ในฟิล์ดหรือไม่

สำหรับข้อมูลเพิ่มเติมเกี่ยวกับการใช้สิ่งนี้รวมถึง Flag ต่างๆ โปรดดูที่ [การอ้างอิง cli](https://doc.subquery.network/references/references/#build)

## Logging

`console.log` **จะไม่รองรับอีกต่อไป**. แต่โมดูล `logger` จะถูกแทนที่ลงไปแทน ซึ่งหมายความว่าเราสามารถรองรับ logger ที่เป็นตัวแปรในรูปแบบต่างๆ กันได้

```typescript
logger.info('Info level message');
logger.debug('Debugger level message');
logger.warn('Warning level message');
```

การใช้ `logger.info` หรือ `logger.warn` ให้วางคำสั่งลงใน mapping file

![logging.info](/assets/img/logging_info.png)

หากต้องการใช้ `logger.debug` จำเป็นต้องเรียกใช้ Flag เพิ่มเติม เพิ่ม `--log-level=debug` ในบรรทัดคำสั่งของคุณ

หากคุณกำลังใช้งาน Docker Container ให้เพิ่มบรรทัดนี้ในไฟล์ `docker-compose.yaml` ของคุณ

![logging.debug](/assets/img/logging_debug.png)

คุณควรเห็นการบันทึกข้อมูลอันใหม่บน Terminal

![logging.debug](/assets/img/subquery_logging.png)
