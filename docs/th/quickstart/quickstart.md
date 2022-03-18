# คู่มือเริ่มใช้งานฉบับย่อ

ในคู่มือการเริ่มต้นฉบับย่อนี้ เราจะสร้างโปรเจ็กต์เริ่มต้นอย่างง่ายที่คุณสามารถใช้เป็นเฟรมเวิร์คสำหรับการพัฒนา SubQuery Project ของคุณเองได้

หลังจบคู่มือนี้ คุณจะมีโปรเจ็กต์ SubQuery ที่ทำงานบนโหนด SubQuery และมี GraphQL endpoint ที่คุณสามารถสืบค้นข้อมูลได้

หากคุณยังไม่คุ้นเคย เราขอแนะนำให้คุณทำความคุ้นเคยกับ [คำศัพท์](../#terminology) ที่ใช้ใน SubQuery

## การเตรียมความพร้อม

### สภาพแวดล้อมสำหรับการพัฒนาภายในตัวเครื่อง

- [Typescript](https://www.typescriptlang.org/) จำเป็นสำหรับการคอมไพล์โปรเจ็กต์และกำหนด types
- ทั้ง SubQuery CLI และ Project ที่สร้างขึ้นจะมี dependencies และต้องใช้ [Node](https://nodejs.org/en/) เวอร์ชันใหม่
- SubQuery Nodes ต้องใช้ Docker

### การติดตั้ง SubQuery CLI

ติดตั้ง SubQuery CLI แบบ global บนเทอร์มินัลของคุณโดยใช้ NPM:

```shell
# NPM
npm install -g @subql/cli
```

โปรดทราบว่าเรา **ไม่** สนับสนุนให้ใช้ `yarn global` เนื่องจากการจัดการ dependency ที่ไม่ดี ซึ่งอาจนำไปสู่ข้อผิดพลาดได้

จากนั้นคุณสามารถรันคำสั่ง help เพื่อดูคำสั่งและการใช้งานที่ CLI จัดเตรียมให้

```shell
subql help
```

## เริ่มต้น SubQuery Project

ภายในไดเรกทอรีที่คุณต้องการสร้างโปรเจ็กต์ SubQuery เพียงแทนที่ `PROJECT_NAME` ด้วยชื่อของคุณเองและรันคำสั่ง:

```shell
subql init PROJECT_NAME
```

เมื่อเราทำการสร้างโปรเจ็กต์ SubQuery จะมีรายละเอียดให้กรอกคือ:

- เครือข่าย: เครือข่ายบล๊อคเชนที่โปรเจกต์ SubQuery นี้จะถูกพัฒนาเพื่อเป็น index
- Template: Select a SubQuery project template that will provide a starting point to begin development
- Git repository (Optional): Provide a Git URL to a repo that this SubQuery project will be hosted in (when hosted in SubQuery Explorer)
- RPC endpoint (Required): Provide a websocket (wss) URL to a running RPC endpoint that will be used by default for this project. You can quickly access public endpoints for different Polkadot networks or even create your own private dedicated node using [OnFinality](https://app.onfinality.io) or just use the default Polkadot endpoint. This RPC node must be an archive node (have the full chain state).
- Authors (Required): Enter the owner of this SubQuery project here
- Description (Optional): You can provide a short paragraph about your project that describe what data it contains and what users can do with it
- Version (Required): Enter a custom version number or use the default (`1.0.0`)
- License (Required): Provide the software license for this project or accept the default (`Apache-2.0`)

หลังจากกระบวนการในการเริ่มต้นเสร็จสมบูรณ์ คุณควรเห็นโฟลเดอร์ที่มีชื่อโปรเจ็กต์ของคุณถูกสร้างขึ้นภายในไดเร็กทอรี เนื้อหาของไดเร็กทอรีนี้ควรเหมือนกับที่ระบุไว้ใน [Directory Structure](../create/introduction.md#directory-structure)

สุดท้ายนี้ ภายใต้ไดเร็กทอรีของโปรเจ็กต์ ให้รันคำสั่งต่อไปนี้เพื่อติดตั้ง dependencies ของโปรเจ็กต์ใหม่นี้

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```bash cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## การกำหนดค่าและการ build Starter Project

ใน starter package ที่คุณเพิ่งติดตั้ง เราได้จัดเตรียมการกำหนดค่ามาตรฐานสำหรับโปรเจ็กต์ใหม่ของคุณ XPath: /p[11]/CodeGroup/text คุณจะต้องทำงานในไฟล์ต่อไปนี้เป็นหลัก:

- The Manifest in `project.yaml` คุณจะต้องทำงานในไฟล์ต่อไปนี้เป็นหลัก:</p>

- The Manifest in `project.yaml`
- GraphQL Schema ใน `schema.graphql`
- Mapping functions ในไดเรกทอรี `src/mappings/`

สำหรับข้อมูลเพิ่มเติมเกี่ยวกับวิธีการเขียน SubQuery ของคุณเอง โปรดดูเอกสารของเราใน [การสร้างโปรเจ็กต์](../create/introduction.md)

### การสร้าง GraphQL Model

ในการทำ [index](../run/run.md) สำหรับโปรเจ็กต์ SubQuery ของคุณ ก่อนอื่นคุณต้องสร้างโมเดล GraphQL ที่จำเป็น ซึ่งคุณได้กำหนดไว้ในไฟล์ GraphQL Schema (`schema.graphql`) รันคำสั่งนี้ในรูทไดเร็กทอรีของโปรเจ็กต์ รันคำสั่งนี้ในรูทไดเร็กทอรีของโปรเจ็กต์

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```bash npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

คุณจะพบโมเดลที่สร้างขึ้นในไดเร็กทอรี `/src/types/models`

## การ build โปรเจ็กต์

ในการรันโปรเจ็กต์ SubQuery ของคุณบนโหนด SubQuery ที่โฮสต์ในเครื่อง คุณต้อง build งานของคุณ

รันคำสั่ง build จากรูทไดเร็กทอรีของโปรเจ็กต์

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

## การรันและการ query Starter Project ของคุณ

แม้ว่าคุณจะเผยแพร่โปรเจ็กต์ใหม่ของคุณไปยัง [SubQuery Projects](https://project.subquery.network) ได้อย่างรวดเร็วและสามารถสืบค้นโดยใช้ [Explorer](https://explorer.subquery.network) ของเรา แต่วิธีที่ง่ายที่สุดในการรันโหนด SubQuery ภายในเครื่องคือการรันภายในคอนเทนเนอร์ Docker ถ้า คุณยังไม่มี Docker คุณสามารถติดตั้งได้จาก [docker.com](https://docs.docker.com/get-docker/).

[_ข้ามสิ่งนี้และเผยแพร่โครงการใหม่ของคุณไปยัง SubQuery Projects_](../publish/publish.md)

### รัน SubQuery Project ของคุณ

การกำหนดค่าทั้งหมดที่ควบคุมวิธีการเรียกใช้โหนด SubQuery จะถูกกำหนดในไฟล์ `docker-compose.yml` นี้ สำหรับโปรเจ็กต์ใหม่ที่เพิ่งเริ่มต้น คุณไม่จำเป็นต้องเปลี่ยนแปลงอะไรในนี้ แต่คุณสามารถอ่านเพิ่มเติมเกี่ยวกับไฟล์และการตั้งค่าได้ใน [ส่วนการรันโปรเจ็กต์](../run/run.md) สำหรับโปรเจ็กต์ใหม่ที่เพิ่งเริ่มต้น คุณไม่จำเป็นต้องเปลี่ยนแปลงอะไรในนี้ แต่คุณสามารถอ่านเพิ่มเติมเกี่ยวกับไฟล์และการตั้งค่าได้ใน [ส่วนการรันโปรเจ็กต์](../run/run.md)

ให้รันคำสั่งต่อไปนี้ ภายใต้ไดเร็กทอรีของโปรเจ็กต์:

```shell
docker-compose pull && docker-compose up
```

อาจใช้เวลาสักครู่ในการดาวน์โหลดแพ็คเกจที่จำเป็น ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query) และ Postgres) ในครั้งแรก แต่ในไม่ช้าคุณจะเห็นการทำงานของโหนด SubQuery

### การ query โปรเจ็กต์ของคุณ

เปิดเบราว์เซอร์ของคุณและไปที่ [http://localhost:3000](http://localhost:3000)

คุณควรเห็น GraphQL playground แสดงใน explorer และ schemas ที่พร้อมสำหรับการ query ที่ตำแหน่งด้านบนขวาของ Playground คุณจะพบปุ่ม _Docs_ ที่จะเปิดการร่างเอกสาร เอกสารนี้ถูกสร้างขึ้นโดยอัตโนมัติและช่วยให้คุณค้นหา entities และ methods ที่คุณสามารถค้นหาได้

สำหรับ SubQuery starter project ใหม่ คุณสามารถลองใช้ query ต่อไปนี้เพื่อดูว่ามันทำงานอย่างไร หรือ [เรียนรู้เพิ่มเติมเกี่ยวกับภาษาของ GraphQL Query](../query/graphql.md)

```graphql
{
  query {
    starterEntities(first: 10) {
      nodes {
        field1
        field2
        field3
      }
    }
  }
}
```

## ขั้นตอนถัดไป

ยินดีด้วย ตอนนี้คุณมีโปรเจ็กต์ SubQuery ที่ทำงานอยู่ในเครื่อง ซึ่งยอมรับ GraphQL API requests สำหรับข้อมูลตัวอย่างแล้ว ในคู่มือถัดไป เราจะแสดงวิธีเผยแพร่โปรเจ็กต์ใหม่ของคุณไปยัง [SubQuery Projects](https://project.subquery.network) และการสืบค้นโดยใช้ [ Explorer ](https://explorer.subquery.network) ของเรา

[เผยแพร่โปรเจ็กต์ใหม่ของคุณไปยัง SubQuery Projects](../publish/publish.md)
