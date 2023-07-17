# คู่มือเริ่มต้นสำหรับ Avalanche

ในไกด์นี้ พวกเราจะพาไปเริ่มต้นอย่างง่ายๆกับ Avalanche โปรเจค และ ทำการดัชนีกับข้อมูลจริง นี้จะเป็นการสร้างพื้นฐานให้กับคุณเมื่อตอนที่คุณทำโปรเจกต์ SubQuery ของคุณเอง

**ถ้าคุณกำลังหาไกด์สำหรับ Substrate/Polkadot คุณสามารถอ่านได้ที่ [Substrate/Polkadot specific quick start guide](./quickstart-polkadot)**

หลังจบคู่มือนี้ คุณจะมีโปรเจ็กต์ SubQuery ที่ทำงานบนโหนด SubQuery และมี GraphQL endpoint ที่คุณสามารถสืบค้นข้อมูลได้

หากคุณยังไม่คุ้นเคย เราขอแนะนำให้คุณทำความคุ้นเคยกับ [คำศัพท์](../#terminology) ที่ใช้ใน SubQuery

**เป้าหมายของบทเรียนนี้คือการทำดัชนี Token Pangolin ทั้งหมด _Approve_ บันทึก มันควรใช้เวลาประมาณ 10-15 นาที**

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

โปรดทราบว่าเรา **ไม่** สนับสนุนให้ใช้ `yarn global` สำหรับการติดตั้ง `@subql/cli`เนื่องจากการจัดการ dependency ที่ไม่ดี ซึ่งอาจนำไปสู่ข้อผิดพลาดได้

จากนั้นคุณสามารถรันคำสั่ง help เพื่อดูคำสั่งและการใช้งานที่ CLI จัดเตรียมให้

```shell
subql help
```

## เริ่มต้น SubQuery Starter Project

ภายใน directory ที่คุณต้องการที่จะสร้าง Subquery Project สามารถรันคำสั่งต่อไปนี้เพื่อเป็นการเริ่มต้น

```shell
subql init
```

เมื่อเราทำการสร้างโปรเจ็กต์ SubQuery จะมีรายละเอียดให้กรอกคือ:

- Project Name: A name for your SubQuery project
- Network Family: ตระกูลเครือข่ายบล๊อคเชน layer-1 ที่โปรเจกต์ SubQuery จะถูกพัฒนาเพื่อ index ใช้ปุ่มลูกศรบนแป้นพิมพ์เพื่อเลือกจากตัวเลือกต่างๆ สำหรับคำแนะนำนี้ เราจะใช้*"Avalanche"*
- Network: เฉพาะเครือข่ายที่โครงการ SubQuery นี้จะdevelop เพื่อสร้าง index ใช้ปุ่มลูกศรบนแป้นพิมพ์เพื่อเลือกจากตัวเลือกต่างๆ สำหรับคู่มือนี้เราจะใช้*"Avalanche"*
- Template: เลือกเทมเพลตโปรเจกต์ SubQuery ที่จะให้เป็นจุดเริ่มต้นเพื่อเริ่มการ Develop เราขอแนะนำให้เลือก _"Starter project"_
- Git repository (ทางเลือก): ระบุ Git URL ไปยัง repo ที่โปรเจกต์ SubQuery ที่จะถูกทำการโฮสต์ (เมื่อโฮสต์ใน Subquery Explorer)
- RPC endpoint (จำเป็น): ระบุ HTTPS URL ไปยัง RPC endpoint ที่ทำงานอยู่ที่จะใช้งานเป็นค่าเริ่มต้นของโปรเจค RPC node นี้ต้องเป็น archive node (มีสถานะ full chain state) สำหรับคู่มือนี้เราจะใช้ค่าเริ่มต้น _"avalanche.api.onfinality.io"_
- Authors (Required): กรอกชื่อเจ้าของโปรเจกต์ที่นี่ (เช่น ชื่อของคุณ)
- Description (ไม่บังคับ): คุณสามารถใส่ข้อความสั้น ๆ เกี่ยวกับโปรเจกต์ของคุณโดยอธิบายว่ามีข้อมูลใดบ้างและผู้ใช้สามารถทำอะไรกับมันได้
- Version (จำเป็น): ระบุหมายเลขเวอร์ชันที่กำหนดเองหรือใช้ค่าเริ่มต้น(`1.0.0`)
- License (จำเป็น): ระบุใบอนุญาตซอฟต์แวร์สำหรับโปรเจกต์นี้หรือใช้ค่าเริ่มต้น (`Apache-2.0`)

หลังจากกระบวนการเริ่มต้นเสร็จสมบูรณ์ คุณควรเห็นโฟลเดอร์ที่มีชื่อโปรเจคของคุณถูกสร้างขึ้นภายในไดเร็กทอรี เนื้อหาของไดเรกทอรีนี้ควรเหมือนกับที่ระบุไว้ใน [Directory Structure](../create/introduction.md#directory-structure)

สุดท้าย ภายใต้ไดเรกทอรีของโปรเจกต์ ให้รันคำสั่งต่อไปนี้เพื่อติดตั้ง dependencies ของโปรเจกต์ใหม่นี้

::: code-tabs @tab:active yarn `shell cd PROJECT_NAME yarn install `
@tab npm `shell cd PROJECT_NAME npm install ` :::

## สร้างความเปลี่ยนแปลงให้กับโปรเจกต์ของคุณ

ในแพ็คเกจเริ่มต้นที่คุณเพิ่งติดตั้ง เราได้จัดเตรียมการกำหนดค่ามาตรฐานสำหรับโปรเจกต์ใหม่ของคุณ</5> คุณจะต้องทำงานบนไฟล์เหล่านี้เป็นหลัก:

1. The Manifest in `schema.graphql`
2. Project Manifest ใน `project.yaml`
3. Mapping functions ในไดเรกทอรี `src/mappings/`

เป้าหมายของคู่มือเริ่มต้นฉบับย่อนี้คือการปรับโปรเจกต์มาตรฐานเริ่มต้นเพื่อสร้าง index Pangolin ทั้งหมด `อนุมัติ` transaction logs

### อับเดทไฟล์ GraphQL Schema ของคุณ

ไฟล์ `schema.graphql` นั้นกำหนด GraphQL schemas ที่หลากหลาย เนื่องจากวิธีการทำงานของภาษา GraphQL query ใช้ในการดึงข้อมูลทำงานนั้น ไฟล์ Schema จึงเป็นสิ่งสำคัญในการกำหนดรูปร่างของข้อมูลของคุณจาก SubQuery เป็นจุดเริ่มต้นที่ดีเพราะช่วยให้คุณสามารถกำหนดเป้าหมายปลายทางได้ล่วงหน้า

พวกเรากำลังจะอัพเดทไฟล์ `schema.graphql` เพื่อจะลบ entities ที่มีอยู่และอ่านดังต่อไปนี้

```graphql
type PangolinApproval @entity {
  id: ID!
  transactionHash: String!
  blockNumber: String!
  blockHash: String!
  addressFrom: String
  addressTo: String
  amount: String
}
```

**สำคัญ: เมื่อคุณทำการเปลี่ยนแปลงใดๆ กับไฟล์ schemaโปรดตรวจสอบให้แน่ใจว่าคุณได้สร้าง directory types ของคุณขึ้นมาใหม่ ทำแบบนี้เลย**

::: code-tabs @tab:active yarn `shell yarn codegen `
@tab npm `shell npm run-script codegen ` :::

คุณจะพบโมเดลที่สร้างขึ้นใน `/src/types/models` directory. สำหรับข้อมูลเพิ่มเติมภายใน `schema.graphql` ไฟล์, โปรดตรวจสอบได้ที่ เอกสารของเราภายใต้ [Build/GraphQL Schema](../build/graphql.md)

### การอับเดทโปรเจกต์ไฟล์ Manifest

โปนเจกต์ไฟล์ Manifest (`project.yaml`) สามารถมองว่าเป็นจุดเริ่มต้นโปรเจกต์ของคุณและกำหนดรายละเอียดส่วนใหญ่ว่า SubQuery จะสร้าง index และแปลง chain data อย่างไร

เราจะไม่ทำการเปลี่ยนแปลงในไฟล์ Manifest มากนักเนื่องจากไฟล์ได้รับการตั้งค่าอย่างถูกต้องแล้ว แต่เราจำเป็นต้องเปลี่ยนตัวจัดการของเรา โปรดทราบว่าเรากำลังวางแผนที่จะจัดทำดัชนีบันทึกการอนุมัติตัวนิ่มทั้งหมด ด้วยเหตุนี้ เราจึงต้องอัปเดตส่วน `datasources` เพื่ออ่านข้อมูลต่อไปนี้

```yaml
dataSources:
  - kind: avalanche/Runtime
    startBlock: 57360 # Block when the Pangolin contract was created
    options:
      # Must be a key of assets
      abi: erc20
      ## Pangolin token https://snowtrace.io/token/0x60781c2586d68229fde47564546784ab3faca982
      address: "0x60781C2586D68229fde47564546784ab3fACA982"
    assets:
      erc20:
        file: "./node_modules/@pangolindex/exchange-contracts/artifacts/contracts/pangolin-core/interfaces/IPangolinERC20.sol/IPangolinERC20.json"
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleLog
          kind: avalanche/LogHandler
          filter:
            ## Follows standard log filters https://docs.ethers.io/v5/concepts/events/
            function: Approve(address spender, uint256 rawAmount)
            # address: "0x60781C2586D68229fde47564546784ab3fACA982"
```

นี้หมายความว่าพวกเราจะรัน `handleLog` แมปปิ้งฟังก์ชั่นที่ทุกครั้งที่มี`approve` log on ทุก transaction จาก [Pangolin contract](https://snowtrace.io/txs?a=0x60781C2586D68229fde47564546784ab3fACA982&p=1).

สำหรับข้อมูลเพิ่มเติมเกี่ยวกับ Project Manifest (`project.yaml`) ไฟล์,โปรดตรวจสอบได้ที่เอกสารของเราภายใต้ [Build/Manifest File](../build/manifest/polkadot.md)

### เพิ่ม Mapping Function เข้าไป

ฟังก์ชันการ Mapping กำหนดวิธีที่ข้อมูลของเชนถูกแปลงเป็น GraphQL entities ที่ปรับให้เหมาะสมที่เราได้กำหนดไว้ก่อนหน้านี้ในไฟล์ `schema.graphql`

นำทางไปยัง mapping function เริ่มต้นใน `src/mappings` directory คุณจะเห็นสามฟังก์ชันที่ส่งออก, `handleBlock`, `handleLog`, และ `handleTransaction`. คุณสามารถลบทั้ง `handleBlock` และ `handleTransaction` functions, เราจัดการกับ `handleLog` function เท่านั้น

`handleLog` function ได้รับ event data เมื่อใดก็ตามที่เหตุการณ์ตรงกับตัวกรองที่เราระบุไว้ก่อนหน้านี้ในของเรา`project.yaml`. เราจะอัปเดตเพื่อประมวลผลทุกๆการ `approval` ธุรกรรมและบันทึกลงใน GraphQL entities ที่เราสร้างไว้ก่อนหน้านี้

คุณสามารถอัปเดตฟังก์ชั่น `handleLog` ดังต่อไปนี้ (บันทึกการ imports เพิ่ม):

```ts
import { PangolinApproval } from "../types";
import { AvalancheLog } from "@subql/types-avalanche";

export async function handleLog(event: AvalancheLog): Promise<void> {
  const pangolinApprovalRecord = new PangolinApproval(
    `${event.blockHash}-${event.logIndex}`
  );

  pangolinApprovalRecord.transactionHash = event.transactionHash;
  pangolinApprovalRecord.blockHash = event.blockHash;
  pangolinApprovalRecord.blockNumber = event.blockNumber;
  # topics store data as an array
  pangolinApprovalRecord.addressFrom = event.topics[0];
  pangolinApprovalRecord.addressTo = event.topics[1];
  pangolinApprovalRecord.amount = event.topics[2];

  await pangolinApprovalRecord.save();
}
```

การดำเนินการนี้คือการได้รับ Avalanche Log ซึ่งรวมถึงข้อมูล transation log บน payload ด้วย เราดึงข้อมูลนี้แล้วสร้าง instantiate ใหม่ `PangolinApproval` entity ที่เรากำหนดไว้ก่อนหน้านี้ ในไฟล์`schema.graphql` เราเพิ่มข้อมูลเพิ่มเติมแล้วใช้ function `.save()` เพื่อที่จะบันทึก entity ใหม่ (SubQuery จะบันทึกอัตโนมัติใน database).

สำหรับข้อมูลเพิ่มเติมเกี่ยวกับmapping functions โปรดดูเอกสารประกอบของเราข้างใต้[Build/Mappings](../build/mapping/polkadot.md)

### การสร้างโปรเจกต์

ในการใช้งานโปรเจกต์ SubQuery ใหม่ของคุณ เราต้องสร้างงานของเราก่อน ใช้คำสั่ง build จาก root directory ของโปรเจกต์

::: code-tabs @tab:active yarn `shell yarn build ` @tab npm `shell npm run-script build ` :::

**สำคัญ เมื่อไรก็ตามที่มีการเปลี่ยนแปลงใน Mapping Functions คุณจำเป็นต้องสร้างโปรเจคของคุณใหม่**

## Running and Querying your Project

### Run your Project with Docker

เมื่อไรก็ตามที่คุณสร้าง Subquery Project ใหม่ คุณควรจะรันโปเจค local บนคอมพิวเตอร์ของคุณเสมอเพื่อทดสอบมันก่อน. วิธีที่ง่ายที่สุดคือให้ใช้ Docker.

ทุกๆการตั้งค่าใน SubQuery node จะรันอยู่ภายใน`docker-compose.yml` ไฟล์. สำหรับโปรเจกต์ใหม่ที่เพิ่งเริ่มต้น คุณไม่จำเป็นต้องเปลี่ยนแปลงอะไรที่นี่ แต่คุณสามารถอ่านเพิ่มเติมเกี่ยวกับไฟล์และการตั้งค่าใน [Run a Project section](../run_publish/run.md) ของเรา

ภายใต้ poject directory ให้รันคำสั่งต่อไปนี้

::: code-tabs @tab:active yarn `shell yarn start:docker ` @tab npm `shell npm run-script start:docker ` :::

อาจใช้เวลาสักครู่ในการดาวน์โหลดแพ็คเกจที่จำเป็นสำหรับครั้งแรก ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) แต่ในไม่ช้า คุณจะเห็น SubQuery node ที่ทำงานอยู่ อดทนไว้

### ทำการ Query โปรเจกต์ของคุณ

เปิดเบราว์เซอร์ของคุณและไปที่ [http://localhost:3000](http://localhost:3000)

คุณควรเห็นGraphQl playground แสดงใน explorer และ schemas ที่พร้อมสำหรับการ query ที่ตำแหน่งด้านบนขวาของ playground คุณจะพบปุ่ม _Docs_ ที่จะเปิดการร่างเอกสาร เอกสารนี้สร้างขึ้นโดยอัตโนมัติและช่วยให้คุณค้นหา entities และ methods ที่คุณสามารถค้นหาได้

สำหรับโปรเจ็กต์เริ่มต้น SubQuery ใหม่ คุณสามารถลองใช้ query เพื่อรับทราบวิธีการทำงานหรือ [ เรียนรู้เพิ่มเติมเกี่ยวกับ GraphQL Query language](../run_publish/graphql.md).

```graphql
query {
  pangolinApprovals(first: 5) {
    nodes {
      id
      blockNumber
      blockHash
      transactionHash
      addressFrom
      addressTo
      amount
    }
  }
}
```

### เผยแพร่โปรเจกต์ SubQuery ของคุณ

SubQuery ให้บริการที่มีการจัดการฟรีเมื่อคุณปรับใช้โปรเจ็กต์ใหม่ได้ คุณสามารถปรับใช้มัน [SubQuery Managed Service](https://managedservice.subquery.network) และ query โดยใช้ [Explorer](https://explorer.subquery.network).

[อ่านคำแนะนำเพื่อเผยแพร่โปรเจกต์ของคุณไปยัง SubQuery Projects](../run_publish/publish.md), **โปรดจำไว้คุณต้อง deploy โดย IPFS**.

## ขั้นตอนต่อไป

ขอแสดงความยินดีด้วย ตอนนี้คุณโปรเจกต์ SubQuery ที่ทำงานอยู่ในเครื่องที่ยอมรับคำขอ GraphQL API สำหรับการถ่ายโอนข้อมูลจาก bLuna แล้ว

ในตอนนี้คุณมีความเข้าใจเชิงลึกถึงวิธีการสร้างโปรเจกต์ SubQuery พื้นฐานแล้ว คำถามคือจากเราจะไปที่ไหนกันต่อ? หากคุณรู้สึกมั่นใจแล้วคุณสามารถข้ามเพื่อเรียนรู้เพิ่มเติมเกี่ยวกับไฟล์หลักสามไฟล์ได้เลย ไฟล์ Manifest, GraphQL schema และ mappings file ภายใต้การ [ สร้างส่วนของเอกสารเหล่านี้](../build/introduction.md).

หรือไปต่อที่ [Academy section](../academy/academy.md) ซึ่งจะมี workshops เชิงลึก แบบฝึกหัดและตัวอย้างโปรเจกต์ให้เพิ่เติม เราจะดูการปรับเปลี่ยนขั้นสูงเพิ่มเติมที่นั่น และเราจะเจาะลึกลงไปที่การเรียกใช้โครงการ SubQuery โดยการเรียกใช้โปรเจกต์ที่พร้อมใช้งานและเป็นโปรเจกต์แบบ open source

สุดท้ายนี้ หากคุณกำลังมองหาวิธีเพิ่มเติมในการรันและเผยแพร่โปรเจกต์ของคุณ [Run & Publish section](../run_publish/run.md) ของเราสามารถให้ข้อมูลโดยละเอียดเกี่ยวกับวิธีการทั้งหมดในการรันโปรเจกต์ SubQuery ของคุณและการรวบรวม GraphQL ขั้นสูง และ การ subscription features อื่นๆ
