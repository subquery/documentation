# Avalanche Quick Start

ในไกด์นี้ พวกเราจะพาไปเริ่มต้นอย่างง่ายๆกับ Avalanche โปรเจค และ ทำดัชนีกับข้อมูลจริง นี้จะเป็นการสร้างพื้นฐานให้กับคุณเมื่อตอนที่คุณทำโปรเจกต์ SubQuery ของคุณเอง

**ถ้าคุณกำลังหาไกด์สำหรับ Substrate/Polkadot คุณสามารถอ่านได้ที่ [Substrate/Polkadot specific quick start guide](./quickstart-polkadot)**

หลังจบคู่มือนี้ คุณจะมีโปรเจ็กต์ SubQuery ที่ทำงานบนโหนด SubQuery และมี GraphQL endpoint ที่คุณสามารถสืบค้นข้อมูลได้

หากคุณยังไม่คุ้นเคย เราขอแนะนำให้คุณทำความคุ้นเคยกับ [คำศัพท์](../#terminology) ที่ใช้ใน SubQuery

**เป้าหมายของบทเรียนนี้คือการทำดัชนีเหรียญ Pangolin ทั้งหมด _ยอมรับ_ บันทึก มันควรใช้เวลาประมาณ 10-15 นาที**

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

จากน้นคุณสามารถรันคำสั่ง Help เพื่อดูคำสั่งที่สามารถใช้งานได้ จาก CLI จัดเตรียมไว้

```shell
subql help
```

## เริ่มต้น SubQuery Starter Project

ภายใน directory ที่คุณต้องการที่จะสร้าง Subquery Project สามารถรันคำสั่งต่อไปนี้เพื่อเป็นการเริ่มต้น

```shell
subql init
```

เมื่อคุณทำการสร้างโปรเจกต์

- Name: ชื่อ Subquery Project ของคุณ
- Network Family: ตระกูลเครือข่ายบล๊อคเชน layer-1 ที่โปรเจกต์ SubQuery จะ develop เป็น index ใช้ปุ่มลูกศรบนแป้นพิมพ์เพื่อเลือกจากตัวเลือกต่างๆ สำหรับคำแนะนำนี้ เราจะใช้_"Avalanche"_
- Network: เจาะจงเครือข่ายที่โครงการ SubQuery นี้จะdevelop เพื่อสร้าง index ใช้ปุ่มลูกศรบนแป้นพิมพ์เพื่อเลือกจากตัวเลือกต่างๆ สำหรับคู่มือนี้เราจะใช้_"Avalanche"_
- Template: เลือกเทมเพลตโปรเจกต์ SubQuery ที่จะให้จุดเริ่มต้นเพื่อเริ่มการdevelop เราขอแนะนำให้เลือก _"Starter project"_
- Git repository (ทางเลือก): ระบุ Git URL ไปยัง repoที่โปรเจกต์ SubQuery ที่จะถูกทำการโฮสต์ (เมื่อโฮสต์ใน Subquery Explorer)
- RPC endpoint (จำเป็น): ระบุ HTTPS URL ไปยัง RPC endpoint ที่ทำงานอยู่ที่จะใช้งานเป็นค่าเริ่มต้นของโปรเจค RPC node นี้ต้องเป็น archive node (มีสถานะ full chain state) สำหรับคู่มือนี้เราจะใช้ค่าเริ่มต้น _"avalanche.api.onfinality.io"_
- Authors (Required): กรอกชื่อเจ้าของโปรเจกต์ที่นี่ (เช่น ชื่อของคุณ)
- Description (ไม่บังคับ): คุณสามารถใส่ข้อความสั้น ๆ เกี่ยวกับโปนเจกต์ของคุณโดยอธิบายว่ามีข้อมูลใดบ้างและผู้ใช้สามารถทำอะไรกับมันได้
- Version (จำเป็น): ระบุหมายเลขเวอร์ชันที่กำหนดเองหรือใช้ค่าเริ่มต้น(`1.0.0`)
- License (จำเป็น): ระบุใบอนุญาตซอฟต์แวร์สำหรับโปรเจกต์นี้หรือใช้ค่าเริ่มต้น (`Apache-2.0`)

หลังจากกระบวนการเริ่มต้นเสร็จสมบูรณ์ คุณควรเห็นโฟลเดอร์ที่มีชื่อโปรเจคของคุณถูกสร้างขึ้นภายในไดเร็กทอรี เนื้อหาของไดเรกทอรีนี้ควรเหมือนกับที่ระบุไว้ใน [Directory Structure](../create/introduction.md#directory-structure)

สุดท้าย ภายใต้ไดเรกทอรีของโปรเจกต์ ให้รันคำสั่งต่อไปนี้เพื่อติดตั้ง dependencies ของโปรเจกต์ใหม่นี้

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## สร้างความเปลี่ยนแปลงให้กับโปรเจกต์ของคุณ

ในแพ็คเกจเริ่มต้นที่คุณเพิ่งติดตั้ง เราได้จัดเตรียมการกำหนดค่ามาตรฐานสำหรับโปรเจกต์ใหม่ของคุณ</5> คุณจะต้องทำงานบนไฟล์เหล่านี้เป็นหลัก:

1. The Manifest in `schema.graphql`
2. Project Manifest ใน `project.yaml`
3. Mapping functions ในไดเรกทอรี `src/mappings/`

เป้าหมายของคู่มือเริ่มต้นฉบับย่อนี้คือการปรับโปรเจกต์มาตรฐานเริ่มต้นเพื่อสร้าง index Pangolin ทั้งหมด `อนุมัติ` transaction logs

### อับเดทไฟล์ GraphQL Schema ของคุณ

ไฟล์ `schema.graphql` นั้นกำหนด GraphQL schemas ที่หลากหลาย เนื่องจากวิธีที่ภาษา GraphQL ใช้ในการดึงข้อมูลทำงานนั้น ไฟล์ Schema เป็นสิ่งสำคัญที่กำหนดรูปร่างข้อข้อมูลจาก SubQuery มันเป็นจุดที่ดีทีสุดที่จะเริ่มต้นเพราะมันอณุญาตให้คุณกำหนด end goal up front ของคุณได้

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

**สำคัญ: เมื่อคุณได้ทำการเปลี่ยนแปลงใดๆกับไฟล์ schema โปรดตรวจสอบให้มั่นใจว่าคุณสามารถนำชนิดของ directory กลับมาใหม่ได้ ทำแบบนี้เลย**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

คุณจะพบโมเดลที่สร้างขึ้นใน `/src/types/models` directory. สำหรับข้อมูลเพิ่มเติมภายใน `schema.graphql` ไฟล์, โปรดตรวจสอบได้ที่ เอกสารของเราภายใต้ [Build/GraphQL Schema](../build/graphql.md)

### การอับเดท Project Manifest File

โปนเจกต์ไฟล์ Manifest (`project.yaml`) สามารถมองว่าเป็นจุดเริ่มต้นโปรเจกต์ของคุณและกำหนดรายละเอียดส่วนใหญ่ว่า SubQuery จะสร้าง index และแปลง chain data อย่างไร

เราจะไม่ทำการเปลี่ยนแปลงในไฟล์ Manifest มากเนื่องจากไฟล์ได้รับการตั้งค่าอย่างถูกต้องแล้ว แต่เราจำเป็นต้องเปลี่ยนตัวจัดการของเรา Remember we are planning to index all Pangolin approval logs, as a result, we need to update the `datasources` section to read the following.

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

สำหรับข้อมูลเพิ่มเติมเกี่ยวกับ Project Manifest (`project.yaml`) ไฟล์,โปรดตรวจสอบได้ที่เอกสารของเราภายใต้พ [Build/Manifest File](../build/manifest.md)

### เพิ่ม Mapping Function

Mapping functions กำหนดวิธีการแปลง chain data เป็น GraphQL entities ซึ่งถูกปรับให้เหมาะสมที่เราได้กำหนดไว้ก่อนหน้านี้ในไฟล์ `schema.graphql`

นำทางไปยัง mapping function เริ่มต้นใน `src/mappings` directory คุณจะเห็นสามฟังก์ชันที่ส่งออก, `handleBlock`, `handleLog`, และ `handleTransaction`. คุณสามารถลบทั้ง `handleBlock` และ `handleTransaction` functions, เราจัดการกับ `handleLog` function เท่านั้น

`handleLog` function ได้รับ event data เมื่อใดก็ตามที่เหตุการณ์ตรงกับตัวกรองที่เราระบุไว้ก่อนหน้านี้ในของเรา`project.yaml`. เราจะอัปเดตกระบวนการทั้งหมดเพื่อ `approval` transaction logs และบันทึกลงใน GraphQL entities ที่เราสร้างไว้ก่อนหน้านี้

คุณสามารถอัปเดต `handleLog` function ดังต่อไปนี้ (บันทึกการ imports เพิ่ม):

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

สิ่งที่กำลังทำคือการได้รับ Avalanche Log ซึ่งรวมถึง transation log ข้อมูลบน payload ด้วย เราดึงข้อมูลนี้แล้วสร้าง instantiate ใหม่ `PangolinApproval` entity ที่เรากำหนดไว้ก่อนหน้านี้ ในไฟล์`schema.graphql` เราเพิ่มข้อมูลเพิ่มเติมแล้วใช้ function `.save()` เพื่อที่จะบันทึก entity ใหม่ (SubQuery จะบันทึกอัตโนมัติใน database).

For more information about mapping functions, check out our documentation under [Build/Mappings](../build/mapping.md)

### การสร้างโปรเจค

In order run your new SubQuery Project we first need to build our work. Run the build command from the project's root directory.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**สำคัญ เมื่อไรก็ตามที่มีการเปลี่ยนแปลงใน Mapping Functions คุณจำเป็นต้องสร้างโปรเจคของคุณใหม่**

## Running and Querying your Project

### Run your Project with Docker

เมื่อไรก็ตามที่คุณสร้าง Subquery Project ใหม่ คุณควรจะรันโปเจค local บนคอมพิวเตอร์ของคุณเสมอเพื่อทดสอบมันก่อน. วิธีที่ง่ายที่สุดคือให้ใช้ Docker.

ทุกๆการตั้งค่าใน SubQuery node จะรันอยู่ภายใน`docker-compose.yml` ไฟล์. For a new project that has been just initalised you won't need to change anything here, but you can read more about the file and the settings in our [Run a Project section](../run_publish/run.md)

ภายใต้ poject directory ให้รันคำสั่งต่อไปนี้

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you'll see a running SubQuery node. อดทนไว้

### Query your Project

เปิดเบราว์เซอร์ของคุณและไปที่ [http://localhost:3000](http://localhost:3000)

คุณควรที่จะเห็น GraphQl playground แสดงใน Explorer และ schemas ที่พร้อมจะสามารถ query ได้ ที่ตำแหน่งด้านบนขวาของ playground คุณจะพบปุ่ม _Docs_ ที่จะเปิดการร่างเอกสาร เอกสารนี้สร้างขึ้นโดยอัตโนมัติและช่วยให้คุณค้นหา entities และ methods ที่คุณสามารถค้นหาได้

สำหรับ Subquery โปรเจคเริ่มต้นใหม่ คุณสามารถลองใช้ query ต่อไปนี้เพื่อดูว่ามันจะทำงานอย่างไร หรือ r [เรียนรู้เพิ่มเติมเกี่ยวกับ GraphQL Query language](../run_publish/graphql.md).

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

### Publish your SubQuery Project

SubQuery provides a free managed service when you can deploy your new project to. คุณสามารถปรับใช้มัน [SubQuery Projects](https://project.subquery.network) และ query โดยใช้ [Explorer](https://explorer.subquery.network).

[Read the guide to publish your new project to SubQuery Projects](../run_publish/publish.md), **Note that you must deploy via IPFS**.

## ขั้นต่อไป

ยินดีด้วย ตอนนี้คุณได้มี Subquery Project ที่กำลังทำงานอยู่บน local ที่ยอมรับการร้องขอจาก GraphQL API สำหรับการส่งข้อมูล จาก bLuna

ตอนนี้คุณได้รับข้อมูลเชิงลึกเกียวกับสร้าง Subquery project ขั้นพื้นฐาน คำถามคือ เราจะไปที่ไหนต่อ ถ้าคุณคิดว่าคุณมั่นใจ คุณสามารถข้ามไปเรียนรู้เกี่ยวกับ three key files ได้เลย The manifest ไฟล์, the GraphQL schema, และ mappings ไฟล์ภายใต้ [Build section of these docs](../build/introduction.md).

Otherwise, continue to our [Academy section](../academy/academy.md) where have more in depth workshops, tutorials, and example projects. There we'll look at more advanced modifications, and we'll take a deeper dive at running SubQuery projects by running readily available and open source projects.

Finally, if you're looking for more ways to run and publish your project, our [Run & Publish section](../run_publish/run.md) provides detailed informatation about all the ways to run your SubQuery project and other advanced GraphQL aggregation and subscription features.
