# Terra Quick Start

ในคู่มือเริ่มต้นฉบับย่อนี้ เราจะเริ่มต้นด้วยโครงการ Terra starter แบบง่าย ๆ จากนั้นจึงเสร็จสิ้นด้วยการจัดทำดัชนีข้อมูลจริงบางส่วน นี้จะเป็นการสร้างพื้นฐานให้กับคุณเมื่อตอนที่คุณทำโปรเจกต์ SubQuery ของคุณเอง

**ถ้าคุณกำลังมองหาบทความการใช้ Substrate/Polkadot, คุณสามารถอ่านเพิ่มเติมได้ที่ คู่มือเริ่มต้นโดยเฉพาะ Substrate/Polkadot**

หลังจบคู่มือนี้ คุณจะมีโปรเจ็กต์ SubQuery ที่ทำงานบนโหนด SubQuery และมี GraphQL endpoint ที่คุณสามารถสืบค้นข้อมูลได้

หากคุณยังไม่คุ้นเคย เราขอแนะนำให้คุณทำความคุ้นเคยกับ [คำศัพท์](../#terminology) ที่ใช้ใน SubQuery

**เป้าหมายของคู่มือเริ่มต้นฉบับย่อนี้คือการปรับโครงการเริ่มต้นมาตรฐานเพื่อเริ่มสร้างดัชนีการถ่ายโอนทั้งหมดจาก Terra โดยใช้เวลาเพียง 10-15 นาที**

## การเตรียมความพร้อม

### สภาพแวดล้อมสำหรับการพัฒนาภายในตัวเครื่อง

- [Node](https://nodejs.org/en/): ติดตั้ง node ที่ทันสมัย (เช่น LTS version)
- [Docker](https://docker.com/): บทนี้จะช่วยสอนสิ่งที่ Docker ต้องใช้

### การติดตั้ง SubQuery CLI

ติดตั้ง SubQuery CLI แบบ Global บนเทอมินัลของคุณโดยใช้ NPM

```shell
# NPM
npm install -g @subql/cli
```

Please note that we **DO NOT** encourage the use of `yarn global` for installing `@subql/cli` due to its poor dependency management which may lead to an errors down the line.

คุณสามารถรันคำสั่ง Help เพื่อดูคำสั่งที่สมารถใช้งานได้ ที่ CLI นั้นจัดไว้ให้

```shell
subql help
```

## เริ่มต้น SubQuery Starter Project

ภายใน directory ที่คุณต้องการที่จะสร้าง Subquery Project สามารถรันคำสั่งต่อไปนี้เพื่อเป็นการเริ่มต้น

```shell
subql init
```

คุณจะถูกถามคำถามบางอย่างเมื่อโครงการ SubQuery เริ่มต้น:

- Name: ชื่อ Subquery Project ของคุณ
- ตระกูลเครือข่าย: ตระกูลเครือข่ายบล็อกเชนเลเยอร์ 1 ที่โครงการ SubQuery นี้จะถูกพัฒนาเพื่อสร้างดัชนี ใช้ปุ่มลูกศรบนแป้นพิมพ์เพื่อเลือกจากตัวเลือก สำหรับคำแนะนำนี้ เราจะใช้ "Terra"
- เครือข่าย: เครือข่ายเฉพาะที่โครงการ SubQuery นี้จะถูกพัฒนาเพื่อสร้างดัชนี ใช้ปุ่มลูกศรบนแป้นพิมพ์เพื่อเลือกจากตัวเลือก สำหรับคำแนะนำนี้ เราจะใช้ "Terra"
- แม่แบบ: เลือกเทมเพลตโครงการ SubQuery ที่จะให้จุดเริ่มต้นเพื่อเริ่มการพัฒนา เราขอแนะนำให้เลือก"Starter project"
- Git repository (ทางเลือก): ระบุ Git URL ไปยัง repoที่โปรเจกต์ SubQuery ที่จะถูกทำการโฮสต์ (เมื่อโฮสต์ใน Subquery Explorer)
- RPC endpoint (จำเป็น): ระบุ HTTPS URL ไปยัง RPC endpoint ที่ทำงานอยู่ที่จะใช้งานเป็นค่าเริ่มต้นของโปรเจค RPC node นี้ต้องเป็น archive node (มีสถานะ full chain state) สำหรับคู่มือนี้เราจะใช้ค่าเริ่มต้นคือ "https://terra-columbus-5.beta.api.onfinality.io"
- Authors (Required): กรอกชื่อเจ้าของโปรเจกต์ที่นี่ (เช่น ชื่อของคุณ)
- Description (ไม่บังคับ): คุณสามารถใส่ข้อความสั้น ๆ เกี่ยวกับโปนเจกต์ของคุณโดยอธิบายว่ามีข้อมูลใดบ้างและผู้ใช้สามารถทำอะไรกับมันได้
- Version (จำเป็น): ระบุหมายเลขเวอร์ชันที่กำหนดเองหรือใช้ค่าเริ่มต้น(`1.0.0`)
- License (จำเป็น): ระบุใบอนุญาตซอฟต์แวร์สำหรับโปรเจกต์นี้หรือใช้ค่าเริ่มต้น (`Apache-2.0`)

หลังจากกระบวนการเริ่มต้นเสร็จสมบูรณ์ คุณควรเห็นโฟลเดอร์ที่มีชื่อโครงการของคุณถูกสร้างขึ้นภายในไดเร็กทอรี เนื้อหาของไดเร็กทอรีนี้ควรเหมือนกับที่ระบุไว้ใน โครงสร้างไดเร็กทอรี

สุดท้าย ภายใต้ไดเร็กทอรีโครงการ ให้รันคำสั่งต่อไปนี้เพื่อติดตั้งการพึ่งพาของโปรเจ็กต์ใหม่

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Making Changes to your Project

In the starter package that you just initialised, we have provided a standard configuration for your new project. คุณจะต้องทำงานกับไฟล์ต่อไปนี้เป็นหลัก:

1. The GraphQL Schema ใน `schema.graphql`
2. The Project Manifest ใน `project.yaml`
3. Mapping functions ในไดเรกทอรี `src/mappings/`

The goal of this quick start guide is to adapt the standard starter project to begin indexing all transfers from the bLuna smart contract.

### อับเดทไฟล์ GraphQL Schema ของคุณ

The `schema.graphql` file defines the various GraphQL schemas. Due to the way that the GraphQL query language works, the schema file essentially dictates the shape of your data from SubQuery. มันเป็นจุดที่ดีทีสุดที่จะเริ่มต้นเพราะมันอณุญาตให้คุณกำหนด end goal up front ของคุณได้

We're going to update the `schema.graphql` file to read as follows

```graphql
type Transfer @entity {
  id: ID! # id field ต้องไม่เป็นค่าว่างเสมอ และจะต้องมีลักษณะตามด้านล่างนี้
  txHash: String!
  blockHeight: BigInt # The block height of the transfer
  sender: String! # The account that transfers are made from
  recipient: String! # The account that transfers are made to
  amount: String! # Amount that is transferred
}
```

**สำคัญ: เมื่อคุณได้ทำการเปลี่ยนแปลงใดๆกับไฟล์ schema โปรดตรวจสอบให้มั่นใจว่าคุณสามารถนำชนิดของ directory กลับมาใหม่ได้ ทำแบบนี้เลย**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

คุณจะเจอรูปแบบที่สร้างขึ้นภายใน `/src/types/models` directory. สำหรับข้อมูลเพิ่มเติมภายใน `schema.graphql` ไฟล์, โปรดตรวจสอบได้ที่ เอกสารของเราภายใต้ [Build/GraphQL Schema](../build/graphql.md)

### การอับเดท Project Manifest File

The Projet Manifest (`project.yaml`)ไฟล์สามารถมองว่าเป็นจุดเริ่มต้นโครงการของคุณและกำหนดรายละเอียดส่วนใหญ่ว่า SubQuery จะสร้างดัชนีและแปลงข้อมูลลูกโซ่อย่างไร

เราจะไม่ทำการเปลี่ยนแปลงมากมายในไฟล์ Manifest เนื่องจากไฟล์ได้รับการตั้งค่าอย่างถูกต้องแล้ว แต่เราจำเป็นต้องเปลี่ยนตัวจัดการของเรา จำไว้ว่าเรากำลังวางแผนที่จะจัดทำดัชนีเหตุการณ์การถ่ายโอน Terra ทั้งหมด ด้วยเหตุนี้ เราจึงต้องอัปเดตส่วน `datasources` เพื่ออ่านข้อมูลต่อไปนี้

```yaml
dataSources:
  - kind: terra/Runtime
    startBlock: 4724001 # Colombus-5 Starts at this height
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleEvent
          kind: terra/EventHandler
          # this will trigger on all events that match the following smart contract filter condition
          filter:
            type: transfer
            messageFilter:
              type: /terra.wasm.v1beta1.MsgExecuteContract
              values:
                # We are subscribing to the bLuna smart contract (e.g. only transfer events from this contract)
                contract: terra1j66jatn3k50hjtg2xemnjm8s7y8dws9xqa5y8w
```

This means we'll run a `handleEvent` mapping function each and every time there is a `transfer` event from the bLuna smart contract.

สำหรับข้อมูลเพิ่มเติมเกี่ยวกับ Project Manifest (`project.yaml`) ไฟล์,โปรดตรวจสอบได้ที่เอกสารของเราภายใต้พ [Build/Manifest File](../build/manifest.md)

### เพิ่ม Mapping Function

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we have previously defined in the `schema.graphql` file.

Navigate to the default mapping function in the `src/mappings` directory. You'll see three exported functions, `handleBlock`, `handleEvent`, and `handleCall`. You can delete both the `handleBlock` and `handleCall` functions, we are only dealing with the `handleEvent` function.

The `handleEvent` function recieved event data whenever event matches the filters that we specify previously in our `project.yaml`. We are going to update it to process all `transfer` events and save them to the GraphQL entities that we created earlier.

คุณสามารถอัปเดตฟังก์ชัน `handleEvent` เป็นดังต่อไปนี้ (โปรดสังเกตการนำเข้าเพิ่มเติม):

```ts
import { TerraEvent } from "@subql/types-terra";
import { Transfer } from "../types";
import { MsgExecuteContract } from "@terra-money/terra.js";

export async function handleEvent(
  event: TerraEvent<MsgExecuteContract>
): Promise<void> {
    // Print debugging data from the event
    // logger.info(JSON.stringify(event));

    // Create the new transfer entity with a unique ID
    const transfer = new Transfer(
      `${event.tx.tx.txhash}-${event.msg.idx}-${event.idx}`
    );
    transfer.blockHeight = BigInt(event.block.block.block.header.height);
    transfer.txHash = event.tx.tx.txhash;
    for (const attr of event.event.attributes) {
      switch (attr.key) {
        case "sender":
          transfer.sender = attr.value;
          break;
        case "recipient":
          transfer.recipient = attr.value;
          break;
        case "amount":
          transfer.amount = attr.value;
          break;
        default:
      }
    }
    await transfer.save();
}
```

What this is doing is receiving a SubstrateEvent which includes transfer data on the payload. We extract this data and then instantiate a new `Transfer` entity that we defined earlier in the `schema.graphql` file. We add additional information and then use the `.save()` function to save the new entity (SubQuery will automatically save this to the database).

สำหรับข้อมูลเพิ่มเติมเกี่ยวกับฟังก์ชันการทำแผนที่ โปรดดูเอกสารประกอบของเราใน [Build/Mappings](../build/mapping.md)

### การสร้างโปรเจค

ถ้าต้องการสร้างโปรเจคใหม่ในSubQuery Project เราต้องเริ่มต้นสร้างงานใหม่ โดย ทำการ Run คำสั่งเริ่มต้นจาก project's root directory

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**สำคัญ เมื่อไรก็ตามที่มีการเปลี่ยนแปลงใน Mapping Functions คุณจำเป็นต้องสร้างโปรเจคของคุณใหม่**

## Running and Querying your Project

### รันโปรเจคของคุณกับ Docker

เมื่อไรก็ตามที่คุณสร้าง Subquery Project ใหม่ คุณควรจะรันโปเจค local บนคอมพิวเตอร์ของคุณเสมอเพื่อทดสอบมันก่อน. วิธีที่ง่ายที่สุดคือให้ใช้ Docker

ทุกๆการตั้งค่าใน SubQuery node จะรันอยู่ภายใน `docker-compose.yml` ไฟล์. สำหรับโปรเจคใหม่ที่เพิ่งติดตั้งเสร็จ คุณไม่ต้องมีการเปลี่ยนแปลงอะไร, แต่คถณสามารถอ่านเพิ่มเติมได้ที่ เมนู ไฟล์ และ ตั้งค่า ใน Run a Project section

ภายใต้ poject directory ให้รันคำสั่งต่อไปนี้

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you'll see a running SubQuery node. อดทนไว้

### Query your Project

เปิดเบราว์เซอร์ของคุณและไปที่ [http://localhost:3000](http://localhost:3000)

คุณควรที่จะเห็น GraphQl playground แสดงใน Explorer และ schemas ที่พร้อมจะสามารถ query ได้ ที่ตำแหน่งด้านบนขวาของ playground คุณจะพบปุ่ม _Docs_ ที่จะเปิดการร่างเอกสาร เอกสารนี้สร้างขึ้นโดยอัตโนมัติและช่วยให้คุณค้นหา entities และ methods ที่คุณสามารถค้นหาได้

สำหรับ Subquery โปรเจคเริ่มต้นใหม่ คุณสามารถลองใช้ query ต่อไปนี้เพื่อดูว่ามันจะทำงานอย่างไร หรือ r [เรียนรู้เพิ่มเติมเกี่ยวกับ GraphQL Query language](../run_publish/graphql.md).

```graphql
{
  query {
    transfers(
      first: 10,
      orderBy: ID_DESC
    ) {
      nodes {
        id
        txHash
        amount
        blockHeight
        sender
        recipient
      }
    }
  }
}
```

### Publish your SubQuery Project

SubQuery ให้บริการที่มีการจัดการฟรีเมื่อคุณปรับใช้โปรเจ็กต์ใหม่ได้ คุณสามารถปรับใช้มัน [SubQuery Projects](https://project.subquery.network) และ query โดยใช้ [Explorer](https://explorer.subquery.network).

[อ่านคำแนะนำเพื่อเผยแพร่โครงการใหม่ของคุณไปยัง SubQuery Projects](../run_publish/publish.md)

## ขั้นต่อไป

ยินดีด้วย ตอนนี้คุณได้มี Subquery Project ที่กำลังทำงานอยู่บน local ที่ยอมรับการร้องขอจาก GraphQL API สำหรับการส่งข้อมูล จาก bLuna

ตอนนี้คุณได้รับข้อมูลเชิงลึกเกียวกับสร้าง Subquery project ขั้นพื้นฐาน คำถามคือ เราจะไปที่ไหนต่อ ถ้าคุณคิดว่าคุณมั่นใจ คุณสามารถข้ามไปเรียนรู้เกี่ยวกับ three key files ได้เลย The manifest ไฟล์, the GraphQL schema, และ mappings ไฟล์ภายใต้ [Build section of these docs](../build/introduction.md).

Otherwise, continue to our [Academy section](../academy/academy.md) where have more in depth workshops, tutorials, and example projects. There we'll look at more advanced modifications, and we'll take a deeper dive at running SubQuery projects by running readily available and open source projects.

Finally, if you're looking for more ways to run and publish your project, our [Run & Publish section](../run_publish/run.md) provides detailed informatation about all the ways to run your SubQuery project and other advanced GraphQL aggregation and subscription features.
