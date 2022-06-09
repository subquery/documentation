# Cosmos (CosmWasm) Quick Start

In this Quick start guide, we're going to start with a simple Cosmos starter project in the Juno Network and then finish by indexing some actual real data. นี้จะเป็นการสร้างพื้นฐานให้กับคุณเมื่อตอนที่คุณทำโปรเจกต์ SubQuery ของคุณเอง

**หากคุณกำลังมองหาคำแนะนำสำหรับ Substrate/Polkadot คุณสามารถอ่าน[Substrate/Polkadot คู่มือการเริ่มต้นฉบับย่อโดยเฉพาะ](./quickstart-polkadot).**

หลังจบคู่มือนี้ คุณจะมีโปรเจ็กต์ SubQuery ที่ทำงานบนโหนด SubQuery และมี GraphQL endpoint ที่คุณสามารถสืบค้นข้อมูลได้

หากคุณยังไม่คุ้นเคย เราขอแนะนำให้คุณทำความคุ้นเคยกับ [คำศัพท์](../#terminology) ที่ใช้ใน SubQuery

**The goal of this quick start guide is to adapt the standard starter project to begin indexing all transfers from Cosmos, it should only take 10-15 minutes**

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

โปรดทราบว่าเรา **ไม่** สนับสนุนให้ใช้ `yarn global` สำหรับการติดตั้ง `@subql/cli` เนื่องจากการจัดการ dependency ที่ไม่ได้อาจนำไปสู่ข้อผิดพลาดได้

คุณสามารถเรียกใช้ความช่วยเหลือเพื่อดูคำสั่งและการใช้งานที่ CLI ที่ให้มา

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
- Network Family: The layer-1 blockchain network family that this SubQuery project will be developed to index, use the arrow keys on your keyboard to select from the options, for this guide we will use *"Cosmos"*
- Network: The specific network that this SubQuery project will be developed to index, use the arrow keys on your keyboard to select from the options, for this guide we will use *"Juno"*
- แม่แบบ: เลือกเทมเพลตโครงการ SubQuery ที่จะให้จุดเริ่มต้นเพื่อเริ่มการพัฒนา เราขอแนะนำให้เลือก"Starter project"
- Git repository (ทางเลือก): ระบุ Git URL ไปยัง repo ที่โปรเจกต์ SubQuery ที่จะถูกทำการโฮสต์ (เมื่อโฮสต์ใน Subquery Explorer)
- RPC endpoint (จำเป็น): ระบุ HTTPS URL ไปยัง RPC endpoint ที่ทำงานอยู่ที่จะใช้งานเป็นค่าเริ่มต้นของโปรเจค RPC node นี้ต้องเป็น archive node (มีสถานะ full chain state) For this guide we will use the default value *"https://rpc.juno-1.api.onfinality.io"*
- Authors (Required): กรอกชื่อเจ้าของโปรเจกต์ที่นี่ (เช่น ชื่อของคุณ)
- Description (ไม่บังคับ): คุณสามารถใส่ข้อความสั้น ๆ เกี่ยวกับโปรเจกต์ของคุณโดยอธิบายว่ามีข้อมูลใดบ้างและผู้ใช้สามารถทำอะไรกับมันได้
- Version (จำเป็น): ระบุหมายเลขเวอร์ชันที่กำหนดเองหรือใช้ค่าเริ่มต้น(`1.0.0`)
- License (จำเป็น): ระบุใบอนุญาตซอฟต์แวร์สำหรับโปรเจกต์นี้หรือใช้ค่าเริ่มต้น (`Apache-2.0`)

หลังจากกระบวนการเริ่มต้นเสร็จสมบูรณ์ คุณควรเห็นโฟลเดอร์ที่มีชื่อโปรเจกต์ของคุณถูกสร้างขึ้นภายในไดเร็กทอรี เนื้อหาของไดเร็กทอรีนี้ควรเหมือนกับที่ระบุไว้ใน โครงสร้างไดเร็กทอรี

สุดท้ายแล้วภายใต้โปรเจกต์ไดเร็กทอรี ให้รันคำสั่งต่อไปนี้เพื่อติดตั้งการพึ่งพาของโปรเจกต์ใหม่

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## ทำการเปลี่ยนแปลงโปรเจกต์ของคุณ

ในแพ็คเกจเริ่มต้นที่คุณเพิ่งเริ่มต้น เราได้จัดเตรียมการกำหนดค่ามาตรฐานสำหรับโปรเจกต์ใหม่ของคุณ คุณจะต้องทำงานกับไฟล์ต่อไปนี้เป็นหลัก:

1. The GraphQL Schema ใน `schema.graphql`
2. The Project Manifest ใน `project.yaml`
3. Mapping functions ในไดเรกทอรี `src/mappings/`

เป้าหมายของบทเริ่มต้นอย่างง่ายของนี้คือ สามารถนำข้อมูลของโปรเจกต์เริ่มต้นเพื่อทำการ indexing ไปยังการโอนย้ายที่ Smart Contract

### อัปเดตไฟล์ GraphQL Schema ของคุณ

ไฟล์ `schema.graphql` นั้นกำหนด GraphQL schemas ที่หลากหลาย เนื่องจากวิธีที่ภาษา GraphQL ใช้ในการดึงข้อมูลทำงานนั้น ไฟล์ Schema เป็นสิ่งสำคัญที่กำหนดรูปร่างข้อข้อมูลจาก SubQuery มันเป็นจุดที่ดีทีสุดที่จะเริ่มต้นเพราะมันอณุญาตให้คุณกำหนด end goal up front ของคุณได้

เราจะอัปเดตไฟล์ `schema.graphql` ให้อ่านดังนี้

```graphql
type Transfer @entity {
  id: ID! # id field ต้องไม่เป็นค่าว่างเสมอ และจะต้องมีลักษณะตามด้านล่างนี้
  txHash: String!
  blockHeight: BigInt # Block height ของการโอน
  sender: String! # บัญชีที่เป็นผู้โอน
  recipient: String! # บัญชีที่จะรับโอน
  amount: String! # จำนวนที่ถูกโอน
}
```

**สำคัญ: เมื่อคุณได้ทำการเปลี่ยนแปลงใดๆกับไฟล์ schema โปรดตรวจสอบให้มั่นใจว่าคุณสามารถนำชนิดของ directory กลับมาใหม่ได้ ทำแบบนี้เลย**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

คุณจะเจอรูปแบบที่สร้างขึ้นภายใน `/src/types/models` directory. สำหรับข้อมูลเพิ่มเติมภายใน `schema.graphql` ไฟล์, โปรดตรวจสอบได้ที่ เอกสารของเราภายใต้ [Build/GraphQL Schema](../build/graphql.md)

### การอับเดท Project Manifest File

The Projet Manifest (`project.yaml`)ไฟล์สามารถมองว่าเป็นจุดเริ่มต้นโครงการของคุณและกำหนดรายละเอียดส่วนใหญ่ว่า SubQuery จะสร้างดัชนีและแปลงข้อมูลลูกโซ่อย่างไร

เราจะไม่ทำการเปลี่ยนแปลงใดๆในไฟล์ Manifest เนื่องจากไฟล์ได้รับการตั้งค่าอย่างถูกต้องแล้ว แต่เราจำเป็นต้องเปลี่ยนตัว handlers ของเรา จำไว้ว่าเรากำลังวางแผนที่จะจัดทำดัชนีเหตุการณ์การถ่ายโอน Terra ทั้งหมด ด้วยเหตุนี้ เราจึงต้องอัปเดตส่วน `datasources` เพื่ออ่านข้อมูลต่อไปนี้

```yaml
dataSources:
  - kind: cosmos/Runtime
    startBlock: 1 # Where you want to start indexing from
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

ซึ่งหมายความว่าเราจะเรียกใช้ mapping function `handleEvent` ทุกครั้งที่มีเหตุการณ์ `transfer` event จาก Smart contract ขอบ bLuna

สำหรับข้อมูลเพิ่มเติมเกี่ยวกับ Project Manifest (`project.yaml`) ไฟล์,โปรดตรวจสอบได้ที่เอกสารของเราภายใต้พ [Build/Manifest File](../build/manifest.md)

### เพิ่ม Mapping Function

Mapping functions กำหนดวิธีการแปลง chain data เป็น GraphQL entities ซึ่งถูกปรับให้เหมาะสมที่เราได้กำหนดไว้ก่อนหน้านี้ในไฟล์ `schema.graphql`

นำทางไปยัง mapping function เริ่มต้นใน `src/mappings` directory คุณจะเห็นสามฟังก์ชันที่ส่งออกมาก, `handleBlock`, `handleEvent`, and `handleCall`. คุณสามารถลบทั้ง `handleBlock` และ `handleCall` functions, เราจัดการกับ `handleEvent` function เท่านั้น

`handleEvent` function ได้รับ event data เมื่อใดก็ตามที่เหตุการณ์ตรงกับตัวกรองที่เราระบุไว้ก่อนหน้านี้ในของเรา`project.yaml`. เราจะอัปเดตเพื่อประมวลผลกระบวนการทั้งหมดของ`transfer` events และบันทึกลงใน GraphQL entities ที่เราสร้างไว้ก่อนหน้านี้

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

สิ่งที่กำลังทำคือการได้รับ SubstrateEvent ซึ่งรวมถึงการถ่ายโอนข้อมูลในส่วนของข้อมูล payload ด้วย เราดึงข้อมูลนี้แล้วสร้าง instantiate entity ใหม่ที่`Transfer` ซึ่งเรากำหนดไว้ก่อนหน้านี้ในไฟล์ `schema.graphql` เราเพิ่มข้อมูลเพิ่มเติมแล้วใช้ function `.save()` เพื่อที่จะบันทึก entity ใหม่ (SubQuery จะบันทึกอัตโนมัติใน database).

สำหรับข้อมูลเพิ่มเติมเกี่ยวกับฟังก์ชันการทำแผนที่ โปรดดูเอกสารประกอบของเราใน [Build/Mappings](../build/mapping.md)

### การสร้างโปรเจค

ในการรันโปรเจกต์ SubQuery ใหม่ของคุณ เราต้องสร้างงานของเราก่อน ทำการ Run คำสั่งเริ่มต้นจาก project's root directory

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**สำคัญ เมื่อไรก็ตามที่มีการเปลี่ยนแปลงใน Mapping Functions คุณจำเป็นต้องสร้างโปรเจคของคุณใหม่**

## Running and Querying your Project

### รันโปรเจคของคุณกับ Docker

เมื่อไรก็ตามที่คุณสร้าง Subquery Project ใหม่ คุณควรจะรันโปเจค local บนคอมพิวเตอร์ของคุณเสมอเพื่อทดสอบมันก่อน. วิธีที่ง่ายที่สุดคือให้ใช้ Docker

การกำหนดค่าทั้งหมดที่ควบคุมวิธีการรันโหนด SubQuery ถูกกำหนดในสิ่งนี้ ` docker-compose.yml` file. สำหรับโปรเจกต์ใหม่ที่เพิ่งเริ่มต้น คุณไม่จำเป็นต้องเปลี่ยนแปลงอะไรที่นี่ แต่คุณสามารถอ่านเพิ่มเติมเกี่ยวกับไฟล์และการตั้งค่าใน [ รันในส่วนของโปรเจกต์ ](../run_publish/run.md)

ภายใต้ poject directory ให้รันคำสั่งต่อไปนี้

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

อาจใช้เวลาสักครู่ในการดาวน์โหลดแพ็คเกจที่จำเป็นสำหรับครั้งแรก ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres)  แต่ในไม่ช้า คุณจะเห็น SubQuery node ที่ทำงานอยู่ อดทนไว้

### Query โปรเจกต์ของคุณ

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

### เผยแพร่โปรเจกต์ SubQuery ของคุณ

SubQuery ให้บริการที่มีการจัดการฟรีเมื่อคุณปรับใช้โปรเจ็กต์ใหม่ได้ คุณสามารถปรับใช้มัน [SubQuery Projects](https://project.subquery.network) และ query โดยใช้ [Explorer](https://explorer.subquery.network).

[อ่านคำแนะนำเพื่อเผยแพร่โครงการใหม่ของคุณไปยัง SubQuery Projects](../run_publish/publish.md)

## ขั้นต่อไป

ยินดีด้วย ตอนนี้คุณได้มี Subquery Project ที่กำลังทำงานอยู่บน local ที่ยอมรับการร้องขอจาก GraphQL API สำหรับการส่งข้อมูล จาก bLuna

ตอนนี้คุณได้รับข้อมูลเชิงลึกเกียวกับสร้าง Subquery project ขั้นพื้นฐาน คำถามคือ เราจะไปที่ไหนต่อ ถ้าคุณคิดว่าคุณมั่นใจ คุณสามารถข้ามไปเรียนรู้เกี่ยวกับ three key files ได้เลย The manifest ไฟล์, the GraphQL schema, และ mappings ไฟล์ภายใต้ [Build section of these docs](../build/introduction.md).

หรือไปที่[ส่วน Academy](../academy/academy.md) ซึ่งมีเวิร์กช็อปเชิงลึก บทแนะนำ และตัวอย่างโครงการเพิ่มเติม เราจะดูการปรับเปลี่ยนขั้นสูงเพิ่มเติมที่นั่น และเราจะเจาะลึกลงไปที่การเรียกใช้โครงการ SubQuery โดยการเรียกใช้โครงการที่พร้อมใช้งานและโอเพ่นซอร์ส

สุดท้ายนี้ หากคุณกำลังมองหาวิธีเพิ่มเติมในการรันและเผยแพร่โปรเจกต์ของคุณ [Run & Publish section](../run_publish/run.md) ของเราสามารถให้ข้อมูลโดยละเอียดเกี่ยวกับวิธีการทั้งหมดในการรันโปรเจกต์ SubQuery ของคุณและการรวบรวม GraphQL ขั้นสูง และ การ subscription features อื่นๆ
