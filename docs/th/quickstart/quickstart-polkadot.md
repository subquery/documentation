# คู่มือเริ่มต้นสำหรับ Polkadot

ในบทความเริ่มต้นนี้, เราจะเริ่มต้นด้วยการเริ่มต้นโปรเจคSubstrate/Polkadotอย่างง่าย และต่อไปจนถึงจบด้วย การจัดทำดัชนีของข้อมูลจริง นี้คือบทความเริ่มต้นที่ดีสำหรับนักพัฒนาโปรแกรม ที่กำลังทำการพัฒนาโปรเจคSubstrate/PolkadotบนSubQuery

หลังจบคู่มือนี้ คุณจะมีโปรเจ็กต์ SubQuery ที่ทำงานบนโหนด SubQuery และมี GraphQL endpoint ที่คุณสามารถสืบค้นข้อมูลได้

หากคุณยังไม่คุ้นเคย เราขอแนะนำให้คุณทำความคุ้นเคยกับ [คำศัพท์](../#terminology) ที่ใช้ใน SubQuery

**เป้าหมายของบทเริ่มต้นอย่างง่ายของนี้คือ สามารถนำข้อมูลของโปรเจคบน Polkadotทำการย้ายดัชนีไปยังโปรเจค Subquery, ใช้เวลาในการทำแค่ 10-15 นาทีเท่านั้น**

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

โปรดทราบว่าเรา **ไม่** สนับสนุนให้ใช้ `yarn global` สำหรับการติดตั้ง `@subql/cli`เนื่องจากการจัดการ dependency ที่ไม่ได้อาจนำไปสู่ข้อผิดพลาดได้

จากนั้นคุณสามารถเรียกใช้ความช่วยเหลือเพื่อดูคำสั่งและการใช้งานที่ CLI ให้มา:

```shell
subql help
```

## เริ่มต้น SubQuery Starter Project

ภายใน directory ที่คุณต้องการที่จะสร้าง Subquery Project สามารถรันคำสั่งต่อไปนี้เพื่อเป็นการเริ่มต้น

```shell
subql init
```

คุณจะถูกถามคำถามบางอย่างเมื่อโครงการ SubQuery เริ่มต้น:

- ชื่อโปรเจค: ตั้งชื่อว่าโปรเจค A สำหรับ โปรเจค SubQuery ของคุณ
- Network family: ตระกูลเครือ blockchain layer-1ที่โปรเจกต์ SubQuery จะ develop เป็น index ใช้ลูกศร เพื่อเลือก ตัวเลือกที่มีให้ สำหรับคำแนะนำนี้ เราจะใช้ *"Substrate"*
- เครือข่าย: เครือข่ายเฉพาะที่โครงการ SubQuery นี้จะถูกพัฒนาเพื่อสร้างดัชนี ใช้ลูกศร เพื่อเลือก ตัวเลือกที่มีให้ สำหรับคำแนะนำนี้ เราจะใช้ *"Polkadot*
- โครงการแม่แบบ: เลือกโครงการแม่แบบ SubQuery ที่จะให้จุดเริ่มต้นเพื่อเริ่มการพัฒนา เราแนะนำให้เลือกโปรเจค *"subql-starter"*
- RPC endpoint: ระบุ HTTPS URL ไปยัง RPC endpoint ที่ทำงานอยู่ที่จะใช้งานเป็นค่าเริ่มต้นของโปรเจกต์ คุณสามารถเข้าถึง endpoints สาธารณะได้อย่างรวดเร็วสำหรับเครือข่าย Polkadot ต่างๆหรือแม้แต่สามารถ สร้าง node เฉพาะส่วนตัวของคุณเองโดยใช้ [OnFinality](https://app.onfinality.io) หรือเพียงแค่ใช้ Polkadot endpoints ที่เป็นค่าเริ่มต้น RPC node นี้ต้องเป็น archive node (มีสถานะ full chain state) สำหรับคู่มือนี้เราจะใช้ค่าเริ่มต้นคือ *"https://polkadot.api.onfinality.io"*
- Git repository: ระบุ Git URL ไปยัง repo ที่จะโฮสต์โปรเจ็กต์ SubQuery นี้ (เมื่อโฮสต์ใน SubQuery Explorer) หรือยอมรับค่าเริ่มต้นที่ให้ไว้
- ผู้เขียน: ใส่ชื่อของเจ้าของโปรเจคที่นี้(เช่น ชื่อของคุณ) หรือ ใช้ค่าเดิม
- คำอธิบาย: เป็นคำอธิบายสั้นๆของโปรเจคเกี่ยวกับข้อมูลด้านใน และ ผู้ใช้งงานทั้งไปสามารถใช้อะไรได้บ้าง หรือ ตั้งไว้ค่าเดิม
- เวอร์ชัน: ป้อนหมายเลขเวอร์ชันที่กำหนดเองหรือใช้ค่าเริ่มต้น
- ใบอนุญาต: ระบุสิทธิ์การใช้งานซอฟต์แวร์สำหรับโครงการนี้หรือยอมรับค่าเริ่มต้น(เช่น MIT)

หลังจากกระบวนการเริ่มต้นเสร็จสมบูรณ์ คุณจะเห็นว่ามีการสร้างโฟลเดอร์ที่มีชื่อโครงการของคุณภายในไดเร็กทอรี เนื้อหาของไดเร็กทอรีนี้ควรเหมือนกับที่แสดงใน โครงสร้างไดเร็กทอรี

สุดท้าย ภายใต้ไดเร็กทอรีโครงการ ให้รันคำสั่งต่อไปนี้เพื่อติดตั้งการพึ่งพาของโปรเจ็กต์ใหม่

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## การเปลี่ยนแปลงโครงการของคุณ

ในแพ็คเกจเริ่มต้นที่เพิ่งเริ่มต้น มีการกำหนดค่ามาตรฐานไว้ XPath: /p[12]/CodeGroup/text เหล่านี้:

1. The GraphQL Schema in `schema.graphql`
2. The Project Manifest ใน `project.yaml`
3. Mapping functions ในไดเรกทอรี `src/mappings/`

เป้าหมายของบทเริ่มต้นอย่างง่ายของนี้คือ สามารถนำข้อมูลของโปรเจกต์บน Polkadot ทำการย้าย indexing ไปยังโปรเจกต์ Subquery

### อับเดทไฟล์ GraphQL Schema ของคุณ

ไฟล์ `schema.graphql` นั้นกำหนด GraphQL schemas ที่หลากหลาย เนื่องจากวิธีที่ภาษา GraphQL ใช้ในการดึงข้อมูลทำงานนั้น ไฟล์ Schema เป็นสิ่งสำคัญที่กำหนดรูปร่างข้อข้อมูลจาก SubQuery มันเป็นจุดที่ดีทีสุดที่จะเริ่มต้นเพราะมันอนุญาตให้คุณกำหนด end goal up front ของคุณได้

อัปเดตไฟล์ `schema.graphql` ให้ทำดังนี้

```graphql
type Transfer @entity {
  id: ID! # id field is always required and must look like this
  amount: BigInt # Amount that is transferred
  blockNumber: BigInt # The block height of the transfer
  from: String! # The account that transfers are made from
  to: String! # The account that transfers are made to
}
```

**สำคัญ: เมื่อคุณได้ทำการเปลี่ยนแปลงใดๆกับไฟล์ schema โปรดตรวจสอบให้มั่นใจว่าคุณสามารถนำชนิดของ directory กลับมาใหม่ได้**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

คุณจะพบโมเดลที่สร้างขึ้นใน `/src/types/models` directory. สำหรับข้อมูลเพิ่มเติมภายใน `schema.graphql` ไฟล์, โปรดตรวจสอบได้ที่ เอกสารของเราภายใต้ [Build/GraphQL Schema](../build/graphql.md)

### การอับเดท Project Manifest File

ไฟล์ Manifest (`project.yaml`) เป็นจุดเริ่มต้นโปรเจกต์ของคุณ และมันจะกำหนดรายละเอียดส่วนใหญ่ว่า SubQuery จะสร้าง index และแปลง chain data อย่างไร

ไฟล์ Manifest ได้รับการตั้งค่าอย่างถูกต้องแล้ว แต่เราจำเป็นต้องเปลี่ยน handlers ของเรา ในขณะที่เรากำลังวางแผนที่จะจัดทำการย้าย index Polkadot ทั้งหมด เราจำเป็นต้องอัปเดตส่วน `datasources` ดังนี้:

```yaml
dataSources:
  - kind: substrate/Runtime
    startBlock: 1
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleEvent
          kind: substrate/EventHandler
          filter:
            module: balances
            method: Transfer
```

ซึ่งหมายความว่าเราจะเรียกใช้ mapping function `handleEvent` ทุกครั้งที่มีเหตุการณ์ `balances.Transfer`

สำหรับข้อมูลเพิ่มเติมเกี่ยวกับ Project Manifest (`project.yaml`) ไฟล์,โปรดตรวจสอบได้ที่เอกสารของเราภายใต้ [Build/Manifest File](../build/manifest.md)

### เพิ่ม Mapping Function

Mapping functions นั้นช่วยกำหนดวิธีการเปลี่ยนแปลง chain data เป็น GraphQL entities ที่ถูกปรับให้เหมาะสมซึ่งเราได้กำหนดไว้ก่อนหน้านี้ในไฟล์ `schema.graphql`

นำทางไปยัง mapping function เริ่มต้นใน directory`src/mappings` คุณจะเห็นสามฟังก์ชันที่ส่งออกมาก, `handleBlock`, `handleEvent`, and `handleCall`. คุณสามารถลบทั้งฟังก์ชัน `handleBlock` และ `handleCall` แล้วเราจะจัดการกับฟังก์ชัน `handleEvent` เท่านั้น

ฟังก์ชัน `handleLog` จะได้รับ event data เมื่อใดก็ตามที่เหตุการณ์ตรงกับ filters ที่เราระบุไว้ก่อนหน้านี้ใน`project.yaml`. เเราจะอัปเดตเพื่อประมวลผลเหตุการณ์ทั้งหมด `balances.Transfer` และบันทึกลงใน GraphQL entities ที่เราสร้างไว้ก่อนหน้านี้

คุณสามารถอัปเดตฟังก์ชัน `handleEvent` เป็นดังต่อไปนี้ (โปรดสังเกตการนำเข้าเพิ่มเติม):

```ts
import { SubstrateEvent } from "@subql/types";
import { Transfer } from "../types";
import { Balance } from "@polkadot/types/interfaces";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    // Get data from the event
    // The balances.transfer event has the following payload \[from, to, value\]
    // logger.info(JSON.stringify(event));
    const from = event.event.data[0];
    const to = event.event.data[1];
    const amount = event.event.data[2];

    // Create the new transfer entity
    const transfer = new Transfer(
        `${event.block.block.header.number.toNumber()}-${event.idx}`,
    );
    transfer.blockNumber = event.block.block.header.number.toBigInt();
    transfer.from = from.toString();
    transfer.to = to.toString();
    transfer.amount = (amount as Balance).toBigInt();
    await transfer.save();
}
```

สิ่งที่กำลังทำคือได้รับ SubstrateEvent ซึ่งรวมถึงการถ่ายโอนข้อมูลใน payload ด้วย เราดึงข้อมูลนี้แล้วสร้าง instantiate entity ใหม่ที่`Transfer` ซึ่งเรากำหนดไว้ก่อนหน้านี้ในไฟล์ `schema.graphql` เราเพิ่มข้อมูลเพิ่มเติมแล้วใช้ฟังก์ชัน `.save()` เพื่อที่จะบันทึก entity ใหม่ (SubQuery จะบันทึกอัตโนมัติใน database).

สำหรับข้อมูลเพิ่มเติมเกี่ยวกับฟังก์ชันการทำแผนที่ โปรดดูเอกสารประกอบของเราใน [Build/Mappings](../build/mapping.md)

### การสร้างโปรเจค

ในการรันโปรเจกต์ SubQuery ใหม่ของคุณ เราต้องทำของเราก่อน ทำการ Run คำสั่งเริ่มต้นจาก project's root directory

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Important: Whenever you make changes to your mapping functions, you will need to rebuild your project**

## Running and Querying your Project

### Run your Project with Docker

Whenever you create a new SubQuery Project, you should always run it locally on your computer to test it first. วิธีที่ง่ายที่สุดคือให้ใช้ Docker

ทุกๆการตั้งค่าใน SubQuery node จะรันอยู่ภายในไฟล์ `docker-compose.yml`. สำหรับโปรเจd9Nใหม่ที่เพิ่งเริ่มต้น คุณไม่ต้องเปลี่ยนแปลงอะไร แต่คถณสามารถอ่านเพิ่มเติมเกี่นสกับไฟล์และการตั้งค่าได้ที่ [Run a Project](../run_publish/run.md)

ให้รันคำสั่งต่อไปนี้ ภายใต้ไดเรกทอรีของโปรเจ็กต์:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

อาจจะใช้เวลาสักครู่ในการดาวน์โหลดแพ็คเกจที่จำเป็นสำหรับครั้งแรก ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) แต่ในไม่ช้า คุณจะเห็น SubQuery node ที่ทำงานอยู่ในหน้าจอ

### Query โปรเจกต์ของคุณ

เปิดเบราว์เซอร์ของคุณและไปที่ [http://localhost:3000](http://localhost:3000)

คุณควรที่จะเห็น GraphQl playground แสดงในเบราว์เซอร์และ schemas ที่พร้อมสำหรับการ query ได้ ที่ตำแหน่งด้านบนขวาของ playground คุณจะพบปุ่ม _Docs_ ที่จะเปิดการร่างเอกสาร เอกสารนี้สร้างขึ้นโดยอัตโนมัติและช่วยให้คุณค้นหา entities และ methods ที่คุณสามารถค้นหาได้

สำหรับโปรเจกต์เริ่มต้น SubQuery ใหม่ ให้ลองใช้ query ต่อไปนี้เพื่อทำความเข้าใจวิธีการทำงาน หรือเรียนรู้เพิ่มเติมเกี่ยวกับ [GraphQL Query language](../run_publish/graphql.md).

```graphql
{
  query {
    transfers(
      first: 10,
      orderBy: AMOUNT_DESC
    ) {
      nodes {
        id
        amount
        blockNumber
        from
        to
      }
    }
  }
}
```

### เผยแพร่โปรเจกต์ SubQuery ของคุณ

SubQuery ให้บริการ การจัดการฟรีในทุกๆที่ ที่คุณ deploy โปรเจ็กต์ใหม่ คุณสามารถปรับใช้มัน [SubQuery Projects](https://project.subquery.network) และ query โดยใช้ [Explorer](https://explorer.subquery.network).

อ่านคู่มือ [publish your new project to SubQuery Projects](../run_publish/publish.md)

## ขั้นต่อไป

ยินดีด้วย ตอนนี้คุณได้มี Subquery Project ที่กำลังทำงานอยู่บน local ที่ยอมรับการร้องขอจาก GraphQL API สำหรับการย้ายข้อมูล

ตอนนี้คุณได้รับข้อมูลเชิงลึกเกียวกับสร้าง Subquery project ขั้นพื้นฐาน คำถามคือ เราจะไปที่ไหนต่อ ถ้าคุณคิดว่าคุณมั่นใจ คุณสามารถข้ามไปเรียนรู้เกี่ยวกับ three key files ได้เลย The manifest ไฟล์, the GraphQL schema, และ mappings ไฟล์อยู่ภายใต้ [Build section of these docs](../build/introduction.md).

หรือไปที่[Academy section](../academy/academy.md) ที่เรามีเวิร์กช็อปเชิงลึก บทแนะนำ และตัวอย่างโครงการเพิ่มเติม เราจะดูการปรับเปลี่ยนขั้นสูงเพิ่มเติมที่นั่น และเราจะเจาะลึกลงไปที่การเรียกใช้โครงการ SubQuery โดยการเรียกใช้โครงการที่พร้อมใช้งานและโอเพ่นซอร์ส

สุดท้ายนี้ หากคุณกำลังมองหาวิธีเพิ่มเติมในการรันและเผยแพร่โปรเจกต์ของคุณ [Run & Publish section](../run_publish/run.md) ของเราสามารถให้ข้อมูลโดยละเอียดเกี่ยวกับวิธีการทั้งหมดในการรันโปรเจกต์ SubQuery ของคุณและการรวบรวม GraphQL ขั้นสูง และ การ subscription features อื่นๆ
