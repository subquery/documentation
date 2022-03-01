# การสร้าง SubQuery Project ใหม่

ในคู่มือ [quick start](/quickstart/quickstart.md) พวกเราจะพาคุณเริ่มต้นจากตัวอย่างได้อย่างรวดเร็ว เพื่อให้ลิ้มรสความหมายของ SubQuery และเข้าใจถึงว่าทำงานได้อย่างไร ในที่นี้ เราจะพามาดูขั้นตอนการทำงานเมื่อคุณเริ่มสร้าง Project ของคุณ และ Key files ที่คุณจะทำงานด้วย

## ขั้นตอนการทำงานเบื้องต้น

นี่คือตัวอย่างที่คุณสามารถเริ่มต้นสร้างโครงการเสร็จสิ้น และได้เริ่มต้นจากส่วนของ [Quick start](../quickstart/quickstart.md) จากชุดเริ่มต้น พวกเราจะนำคุณผ่านกระบวนการมาตรฐานเพื่อที่จะปรับแต่ง และพัฒนา SubQuery Project ของคุณ

1. เริ่มต้น Project ของคุณโดยใช้คำสั่ง `subql init PROJECT_NAME`.
2. อัพเดท Manifest file (`project.yaml`) เพื่อใส่ข้อมูลที่เกี่ยวกับ blockchain และ entities ที่คุณจะเชื่อมโยง โปรดดู [Manifest File](./manifest.md)
3. สร้าง GraphQL entities ภายใน Schema ของคุณ (`schema.graphql`) เพื่อกำหนดโครงสร้างของข้อมูลที่คุณจะดึงข้อมูลออกมา โปรดดู [GraphQL Schema](./graphql.md)
4. เพิ่ม Mapping Function (ตัวอย่าง `mappingHandlers.ts`) คุณจะสามารถแปลงข้อมูลที่อยู่บน chain ให้เป็น GraphQL entities ที่คุณกำหนดเองได้ - โปรดดู [Mapping](./mapping.md)
5. การสร้างและเผยแพร่ Code ของคุณไปยัง SubQuery Projects (หรือรันอยู่บนเครื่องของคุณเอง) - โปรดดู [Running and Querying your Starter Project](./quickstart.md#running-and-querying-your-starter-project) ที่อยู่ใน Quick Start Guide

## Directory Structure

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

![SubQuery directory structure](/assets/img/subQuery_directory_stucture.png)

## Code Generation

เมื่อใดก็ตามที่คุณเปลี่ยนแปลง GraphQL entities คุณต้องสร้างชนิดของโฟลเดอร์ใหม่ ซึ่งประกอบด้วยคำสั่ง

```
yarn codegen
```

นี่จะสร้างโฟลเดอร์ใหม่ (หรืออัพเดทโฟลเดอร์เดิมที่มีอยู่) `src/types` โดยกำหนด class entity ที่ถูกสร้างสำหรับแต่ละชนิดที่คุณได้กำหนดไว้ใน `schema.graphql` Class เหล่านี้จะทำให้คุณโหลด type-safe entity ที่จะใช้สิทธิในการอ่านและเขียนลงไปในช่องข้อมูลของ entity - อ่านต่อในกระบวนการนี้ได้ใน [the GraphQL Schema](./graphql.md)

## Build

ในการรันโปรเจ็กต์ SubQuery ของคุณบนโหนด SubQuery ที่โฮสต์ในเครื่อง คุณต้องเริ่มต้นจากการ build งานของคุณก่อน

รันคำสั่ง build จากรูทไดเร็กทอรีของโปรเจ็กต์

<CodeGroup> <CodeGroupItem title="YARN" active> `shell yarn build ` </CodeGroupItem>
<CodeGroupItem title="NPM"> `bash npm run-script build ` </CodeGroupItem> </CodeGroup>

### Alternative build options

We support additional build options for subquery projects using `subql build`.

With this you can define additional entry points to build using the exports field in package.json.

```json
"name": "project-name",
"version": "1.0.0",
...
"exports": {
  "entry_one": "./src/entry_one.ts",
  "entry_renamed": "./src/entry_two.ts"
},
```

Then by running `subql build` it will generate a dist folder with the following structure:

```
- project-name
  L dist
    L entry_one.js
    L entry_renamed.js
    L index.js
```

Note that it will build `index.ts` whether or not it is specified in the exports field.

For more information on using this including flags, see [cli reference](https://doc.subquery.network/run_publish/references/#build).

## Logging

The `console.log` method is **no longer supported**. Instead, a `logger` module has been injected in the types, which means we can support a logger that can accept various logging levels.

```typescript
logger.info("Info level message");
logger.debug("Debugger level message");
logger.warn("Warning level message");
```

To use `logger.info` or `logger.warn`, just place the line into your mapping file.

![logging.info](/assets/img/logging_info.png)

To use `logger.debug`, an additional flag is required. Add `--log-level=debug` to your command line.

If you are running a docker container, add this line to your `docker-compose.yaml` file.

![logging.debug](/assets/img/logging_debug.png)

You should now see the new logging in the terminal screen.

![logging.debug](/assets/img/subquery_logging.png)
