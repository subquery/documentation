# คู่มือเริ่มต้นใช้งาน

ในคู่มือการเริ่มต้นใช้งานฉบับนี้ เราจะสร้างโปรเจกต์เริ่มต้นอย่างง่ายที่คุณสามารถใช้เป็นเฟรมเวิร์คสำหรับการพัฒนา SubQuery Project ของคุณเองได้

หลังจบคู่มือนี้ คุณจะมีโปรเจ็กต์ SubQuery ที่ทำงานบนโหนด SubQuery และมี GraphQL endpoint ที่คุณสามารถสืบค้นข้อมูลได้

หากคุณยังไม่คุ้นเคย เราขอแนะนำให้คุณทำความคุ้นเคยกับ [คำศัพท์](../#terminology) ที่ใช้ใน SubQuery

## การเตรียมความพร้อม

### สภาพแวดล้อมสำหรับการพัฒนาภายในตัวเครื่อง

- [Typescript](https://www.typescriptlang.org/) จำเป็นสำหรับการคอมไพล์โปรเจกต์และกำหนด types
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

ภายในไดเรกทอรีที่คุณต้องการสร้างโปรเจกต์ SubQuery เพียงแทนที่ `PROJECT_NAME` ด้วยชื่อของคุณเองและรันคำสั่ง:

```shell
subql init PROJECT_NAME
```

เมื่อเราทำการสร้างโปรเจ็กต์ SubQuery จะมีรายละเอียดให้กรอกคือ:

- Network: เครือข่าย blockchain ที่โปรเจกต์ SubQuery นี้จะถูกพัฒนาเพื่อเป็น index
- Template: เลือกเทมเพลตโปรเจกต์ SubQuery ที่จะให้จุดเริ่มต้นเพื่อเริ่มการพัฒนา
- Git repository (ไม่บังคับ): ระบุ Git URL ไปยังที่จัดเก็บที่จะโฮสต์โปรเจกต์ SubQuery นี้ (เมื่อโฮสต์ใน SubQuery Explorer)
- RPC endpoint (จำเป็น): ระบุ websocket (wss) URL ไปยัง RPC endpoint ที่จะใช้เป็นค่าเริ่มต้นของโปรเจกต์นี้ คุณสามารถเข้าถึง endpoint สาธารณะได้อย่างรวดเร็วสำหรับเครือข่ายต่างๆบนเครือข่าย Polkadot หรือแม้แต่สร้างโหนดส่วนตัวเฉพาะของคุณเองโดยใช้ [OnFinality](https://app.onfinality.io) หรือเพียงแค่ใช้ Polkadot endpoint ที่เป็นค่าเริ่มต้น RPC โหนดนี้ต้องเป็นโหนดถาวร (มี full chain state)
- Authors (จำเป็น): กรอกชื่อเจ้าของโปรเจกต์ SubQuery นี้ที่นี่
- Description (ไม่บังคับ): คุณสามารถระบุข้อความสั้นๆ เกี่ยวกับโปรเจกต์ของคุณซึ่งอธิบายว่ามีข้อมูลใดบ้างและผู้ใช้สามารถทำอะไรกับมันได้บ้าง
- Version (จำเป็น): ระบุหมายเลขเวอร์ชันที่กำหนดเองหรือใช้ค่าเริ่มต้น (`1.0.0`)
- License (จำเป็น): ระบุใบอนุญาตซอฟต์แวร์สำหรับโปรเจกต์นี้หรือใช้ค่าเริ่มต้น (`Apache-2.0`)

หลังจากกระบวนการในการเริ่มต้นเสร็จสมบูรณ์ คุณจะเห็นโฟลเดอร์ที่มีชื่อโปรเจกต์ของคุณถูกสร้างขึ้นภายในไดเรกทอรี เนื้อหาของไดเรกทอรีนี้ควรเหมือนกับที่ระบุไว้ใน [Directory Structure](../create/introduction.md#directory-structure)

สุดท้ายนี้ ภายใต้ไดเรกทอรีของโปรเจกต์ ให้รันคำสั่งต่อไปนี้เพื่อติดตั้ง dependencies ของโปรเจกต์ใหม่นี้

<CodeGroup> <CodeGroupItem title="YARN" active> `shell cd PROJECT_NAME yarn install ` </CodeGroupItem> <CodeGroupItem title="NPM"> `bash cd PROJECT_NAME npm install ` </CodeGroupItem> </CodeGroup>

## การกำหนดค่าและการสร้าง Starter Project

ในแพ็คเกจเริ่มต้นที่คุณเพิ่งติดตั้ง เราได้จัดเตรียมการกำหนดค่ามาตรฐานสำหรับโปรเจกต์ใหม่ของคุณ XPath: /p[11]/CodeGroup/text คุณจะต้องทำงานในไฟล์ต่อไปนี้เป็นหลัก:

- The Manifest in `project.yaml` คุณจะต้องทำงานในไฟล์ต่อไปนี้เป็นหลัก:</p>

- The Manifest in `project.yaml`
- GraphQL Schema ใน `schema.graphql`
- Mapping functions ในไดเรกทอรี `src/mappings/`

สำหรับข้อมูลเพิ่มเติมเกี่ยวกับวิธีการเขียน SubQuery ของคุณเอง โปรดดูเอกสารของเราใน [การสร้างโปรเจกต์](../create/introduction.md)

### การสร้างโมเดล GraphQL

ในการทำ [index](../run_publish/run.md) สำหรับโปรเจ็กต์ SubQuery ของคุณ ก่อนอื่นคุณต้องสร้างโมเดล GraphQL ที่จำเป็น ซึ่งคุณได้กำหนดไว้ในไฟล์ GraphQL Schema (`schema.graphql`) รันคำสั่งนี้ในรูทไดเร็กทอรีของโปรเจ็กต์ รันคำสั่งนี้ในรูทไดเร็กทอรีของโปรเจ็กต์

<CodeGroup> <CodeGroupItem title="YARN" active> `shell yarn codegen ` </CodeGroupItem> <CodeGroupItem title="NPM"> `bash npm run-script codegen ` </CodeGroupItem> </CodeGroup>

คุณจะพบโมเดลที่สร้างขึ้นในไดเร็กทอรี `/src/types/models`

## การ Build โปรเจกต์

ในการรันโปรเจกต์ SubQuery ของคุณบนโหนด SubQuery ที่โฮสต์ในเครื่อง คุณต้อง build งานของคุณ

รันคำสั่ง build จากรูทไดเร็กทอรีของโปรเจกต์

<CodeGroup> <CodeGroupItem title="YARN" active> `shell yarn build ` </CodeGroupItem> <CodeGroupItem title="NPM"> `bash npm run-script build ` </CodeGroupItem> </CodeGroup>

## การรันและการสืบค้น Starter Project ของคุณ

แม้ว่าคุณจะเผยแพร่โปรเจ็กต์ใหม่ของคุณไปยัง [SubQuery Projects](https://project.subquery.network) ได้อย่างรวดเร็วและสามารถสืบค้นโดยใช้ [Explorer](https://explorer.subquery.network) ของเรา แต่วิธีที่ง่ายที่สุดในการรันโหนด SubQuery ภายในเครื่องคือการรันภายในคอนเทนเนอร์ Docker ถ้าคุณยังไม่มี Docker คุณสามารถติดตั้งได้จาก [docker.com](https://docs.docker.com/get-docker/).

[_ข้ามสิ่งนี้และเผยแพร่โครงการใหม่ของคุณไปยัง SubQuery Projects_](../run_publish/publish.md)

### รัน SubQuery Project ของคุณ

การกำหนดค่าทั้งหมดที่ควบคุมวิธีการเรียกใช้โหนด SubQuery จะถูกกำหนดในไฟล์ `docker-compose.yml` นี้ สำหรับโปรเจ็กต์ใหม่ที่เพิ่งเริ่มต้น คุณไม่จำเป็นต้องเปลี่ยนแปลงอะไรในนี้ แต่คุณสามารถอ่านเพิ่มเติมเกี่ยวกับไฟล์และการตั้งค่าได้ใน [ส่วนการรันโปรเจ็กต์](../run_publish/run.md) สำหรับโปรเจ็กต์ใหม่ที่เพิ่งเริ่มต้น คุณไม่จำเป็นต้องเปลี่ยนแปลงอะไรในนี้ แต่คุณสามารถอ่านเพิ่มเติมเกี่ยวกับไฟล์และการตั้งค่าได้ใน [ส่วนการรันโปรเจ็กต์](../run_publish/run.md)

ให้รันคำสั่งต่อไปนี้ ภายใต้ไดเรกทอรีของโปรเจ็กต์:

```shell
docker-compose pull && docker-compose up
```

อาจใช้เวลาสักครู่ในการดาวน์โหลดแพ็คเกจที่จำเป็น ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query) และ Postgres) ในครั้งแรก แต่ในไม่ช้าคุณจะเห็นการทำงานของโหนด SubQuery

### การสืบค้นโปรเจกต์ของคุณ

เปิดเบราว์เซอร์ของคุณและไปที่ [http://localhost:3000](http://localhost:3000)

คุณควรเห็น GraphQL playground แสดงใน explorer และ schemas ที่พร้อมสำหรับการสืบค้น ที่ตำแหน่งด้านบนขวาของ Playground คุณจะพบปุ่ม _Docs_ ที่จะเปิดการร่างเอกสาร เอกสารนี้ถูกสร้างขึ้นโดยอัตโนมัติและช่วยให้คุณค้นหา entities และ methods ที่คุณสามารถค้นหาได้

สำหรับ SubQuery starter project ใหม่ คุณสามารถลองใช้ query ต่อไปนี้เพื่อดูว่ามันทำงานอย่างไร หรือ [เรียนรู้เพิ่มเติมเกี่ยวกับภาษาของ GraphQL Query](../run_publish/graphql.md)

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

ยินดีด้วย ตอนนี้คุณมีโปรเจกต์ SubQuery ที่ทำงานอยู่ในเครื่องที่ยอมรับคำร้องขอ GraphQL API สำหรับข้อมูลตัวอย่างแล้ว ในคู่มือถัดไป เราจะแสดงวิธีเผยแพร่โปรเจกต์ใหม่ของคุณไปยัง [SubQuery Projects](https://project.subquery.network) และการสืบค้นโดยใช้ [ Explorer ](https://explorer.subquery.network) ของเรา

[เผยแพร่โปรเจ็กต์ใหม่ของคุณไปยัง SubQuery Projects](../run_publish/publish.md)
