# การสร้างโปรเจ็กต์ SubQuery ใหม่

ในคู่มือ [quick start](/quickstart/quickstart.md) พวกเราจะพาคุณเริ่มต้นจากตัวอย่างได้อย่างรวดเร็ว เพื่อให้ทราบความหมายของ SubQuery และเข้าใจถึงว่าทำงานได้อย่างไร ในที่นี้ เราจะพามาดูขั้นตอนการทำงานเมื่อคุณเริ่มสร้างโปรเจ็กต์ของคุณ และ Key files ที่คุณจะทำงานด้วย

## ขั้นตอนการทำงานเบื้องต้น

นี่คือตัวอย่างที่คุณสามารถเริ่มต้นสร้างโครงการเสร็จสิ้น และได้เริ่มต้นจากส่วนของ [Quick start](../quickstart/quickstart.md) จากชุดเริ่มต้น พวกเราจะนำคุณผ่านกระบวนการมาตรฐานเพื่อที่จะปรับแต่ง และการนำไปใช้กับโปรเจ็กต์ SubQuery ของคุณ

1. เริ่มต้นโปรเจ็กต์ของคุณโดยใช้คำสั่ง `subql init PROJECT_NAME`.
2. อัพเดท Manifest file (`project.yaml`) เพื่อใส่ข้อมูลที่เกี่ยวกับ blockchain และ entities ที่คุณจะเชื่อมโยง โปรดดู [Manifest File](./manifest.md)
3. สร้าง GraphQL entities ภายใน Schema ของคุณ (`schema.graphql`) เพื่อกำหนดโครงสร้างของข้อมูลที่คุณจะดึงข้อมูลออกมา โปรดดู [GraphQL Schema](./graphql.md)
4. เพิ่ม Mapping Function (ตัวอย่าง `mappingHandlers.ts`) คุณจะสามารถแปลงข้อมูลที่อยู่บน chain ให้เป็น GraphQL entities ที่คุณกำหนดเองได้ - โปรดดู [Mapping](./mapping.md)
5. การสร้างและเผยแพร่ Code ของคุณไปยัง SubQuery Projects (หรือรันอยู่บนเครื่องของคุณเอง) - โปรดดู [Running and Querying your Starter Project](./quickstart.md#running-and-querying-your-starter-project) ที่อยู่ใน Quick Start Guide

## โครงสร้างไดเรกทอรี

จากการเชื่อมโยงที่กำหนด จะเห็นภาพรวมของโครงสร้างโฟลเดอร์ที่ใช้ใน SubQuery project เมื่อเริ่มคำสั่ง `init`

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

## การสร้างรหัส

เมื่อใดก็ตามที่คุณเปลี่ยนแปลง GraphQL entities คุณต้องสร้างชนิดของโฟลเดอร์ใหม่ ซึ่งประกอบด้วยคำสั่ง

```
yarn codegen
```

นี่จะสร้างโฟลเดอร์ใหม่ (หรืออัพเดทโฟลเดอร์เดิมที่มีอยู่) `src/types` โดยกำหนด class entity ที่ถูกสร้างสำหรับแต่ละชนิดที่คุณได้กำหนดไว้ใน `schema.graphql` Class เหล่านี้จะทำให้คุณโหลด type-safe entity ที่จะใช้สิทธิในการอ่านและเขียนลงไปในช่องข้อมูลของ entity - อ่านต่อในกระบวนการนี้ได้ใน [the GraphQL Schema](./graphql.md)

## การสร้าง

ในการสร้างโปรเจ็กต์ SubQuery ของคุณบนโหนด SubQuery ที่โฮสต์ในเครื่อง คุณต้องเริ่มต้นจากการสร้างงานของคุณก่อน

สร้างคำสั่งจากรูทไดเร็กทอรีของโปรเจ็กต์

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

### ตัวอย่างการสร้างตัวเลือก

เราสนับสนุนตัวเลือกการสร้างเพิ่มเติมสำหรับ subquery project โดยใช้ `subql build`. Text XPath: /p[10]/CodeGroup

ด้วยวิธีนี้ คุณสามารถกำหนดการเข้าใช้งานเพิ่มเติมเพื่อสร้างโดยใช้ฟิลด์ package.json

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

โปรดทราบว่าการจะสร้าง `index.ts` ไม่ว่าจะระบุไว้ในช่องการส่งออกก็ตาม

สำหรับข้อมูลเพิ่มเติมเกี่ยวกับการใช้สิ่งนี้รวมถึง flags โปรดดูที่ [การอ้างอิง cli](https://doc.subquery.network/references/references/#build)

## การบันทึก

`console.log` **จะไม่รองรับอีกต่อไป**. โมดูล `logger` จะถูกแทนที่ลงในประเภทเดิม ซึ่งหมายความว่าเราสามารถสนับสนุน logger ที่ยอมรับการบันทึกในระบดับต่างๆ ได้

```typescript
logger.info('Info level message');
logger.debug('Debugger level message');
logger.warn('Warning level message');
```

ในการใช้ `logger.info` หรือ `logger.warn` เพียงวางคำสั่งลงในไฟล์ของคุณ

![logging.info](/assets/img/logging_info.png)

หากต้องการใช้ `logger.debug` จำเป็นต้องเรียกใช้ flag เพิ่มเติม เพิ่ม `--log-level=debug` ในบรรทัดคำสั่งของคุณ

หากคุณกำลังใช้งาน docker, ให้เพิ่มบรรทัดนี้ในไฟล์ `docker-compose.yaml` ของคุณ

![logging.debug](/assets/img/logging_debug.png)

คุณควรเห็นการบันทึกใหม่ในหน้าจอเทอร์มินัล

![logging.debug](/assets/img/subquery_logging.png)
