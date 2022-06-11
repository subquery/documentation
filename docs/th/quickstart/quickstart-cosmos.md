# Cosmos Quick Start

In this Quick start guide, we're going to start with a simple Cosmos starter project in the Juno Network and then finish by indexing some actual real data. นี้จะเป็นการสร้างพื้นฐานให้กับคุณเมื่อตอนที่คุณทำโปรเจกต์ SubQuery ของคุณเอง

**หากคุณกำลังมองหาคำแนะนำสำหรับ Substrate/Polkadot คุณสามารถอ่าน[Substrate/Polkadot คู่มือการเริ่มต้นฉบับย่อโดยเฉพาะ](./quickstart-polkadot).**

หลังจบคู่มือนี้ คุณจะมีโปรเจ็กต์ SubQuery ที่ทำงานบนโหนด SubQuery และมี GraphQL endpoint ที่คุณสามารถสืบค้นข้อมูลได้

หากคุณยังไม่คุ้นเคย เราขอแนะนำให้คุณทำความคุ้นเคยกับ [คำศัพท์](../#terminology) ที่ใช้ใน SubQuery

**The goal of this quick start guide is to adapt the standard starter project to begin indexing all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2) (which also contributed to SubQuery) from Cosmos, it should only take 10-15 minutes**

You can see the final code of this project here at [https://github.com/jamesbayly/juno-terra-developer-fund-votes](https://github.com/jamesbayly/juno-terra-developer-fund-votes)

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

Cosmos is not yet supported in SubQuery's CLI (`subql`), to start with Juno clone or fork the [starter project](https://github.com/subquery/juno-subql-starter).

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

We're going to update the `schema.graphql` file to read as follows so we can index all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2).

```graphql
type Vote @entity {
  id: ID! # id field is always required and must look like this
  blockHeight: BigInt!
  voter: String! # The address that voted
  proposalID: BigInt! # The proposal ID
  vote: Boolean! # If they voted to support or reject the proposal
}
```

**สำคัญ: เมื่อคุณได้ทำการเปลี่ยนแปลงใดๆกับไฟล์ schema โปรดตรวจสอบให้มั่นใจว่าคุณสามารถนำชนิดของ directory กลับมาใหม่ได้ ทำแบบนี้เลย**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

คุณจะเจอรูปแบบที่สร้างขึ้นภายใน `/src/types/models` directory. สำหรับข้อมูลเพิ่มเติมภายใน `schema.graphql` ไฟล์, โปรดตรวจสอบได้ที่ เอกสารของเราภายใต้ [Build/GraphQL Schema](../build/graphql.md)

### การอับเดท Project Manifest File

The Projet Manifest (`project.yaml`)ไฟล์สามารถมองว่าเป็นจุดเริ่มต้นโครงการของคุณและกำหนดรายละเอียดส่วนใหญ่ว่า SubQuery จะสร้างดัชนีและแปลงข้อมูลลูกโซ่อย่างไร

เราจะไม่ทำการเปลี่ยนแปลงใดๆในไฟล์ Manifest เนื่องจากไฟล์ได้รับการตั้งค่าอย่างถูกต้องแล้ว แต่เราจำเป็นต้องเปลี่ยนตัว handlers ของเรา Remember we are planning to index all votes on the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2). This means that we we will look at messages that use the `vote` contract call, we need to update the `datasources` section to read the following.

```yml
dataSources:
  - kind: cosmos/Runtime
    startBlock: 3246370 # The block when the first proposal in this fund was created
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleTerraDeveloperFund
          kind: cosmos/MessageHandler
          filter:
            type: "/cosmwasm.wasm.v1.MsgExecuteContract"
            # Filter to only messages with the vote function call
            contractCall: "vote" # The name of the contract function that was called
            values: # This is the specific smart contract that we are subscribing to
              contract: "juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2"
```

This means we'll run a `handleTerraDeveloperFund` mapping function each and every time there is a `vote` message from the [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2) smart contract.

สำหรับข้อมูลเพิ่มเติมเกี่ยวกับ Project Manifest (`project.yaml`) ไฟล์,โปรดตรวจสอบได้ที่เอกสารของเราภายใต้พ [Build/Manifest File](../build/manifest.md)

### เพิ่ม Mapping Function

Mapping functions กำหนดวิธีการแปลง chain data เป็น GraphQL entities ซึ่งถูกปรับให้เหมาะสมที่เราได้กำหนดไว้ก่อนหน้านี้ในไฟล์ `schema.graphql`

นำทางไปยัง mapping function เริ่มต้นใน `src/mappings` directory You'll see four exported functions, `handleBlock`, `handleEvent`, `handleMessage`, and `handleTransaction`. Since we are dealing only with messages, you can delete everything other than the `handleMessage` function.

The `handleMessage` function recieved event data whenever event matches the filters that we specify previously in our `project.yaml`. We are going to update it to process all `vote` messages and save them to the GraphQL entity that we created earlier.

You can update the `handleMessage` function to the following (note the additional imports and renaming the function):

```ts
import { Vote } from "../types";
import { CosmosMessage } from "@subql/types-cosmos";

export async function handleTerraDeveloperFund(
  message: CosmosMessage
): Promise<void> {
  // logger.info(JSON.stringify(message));
  // Example vote https://www.mintscan.io/juno/txs/EAA2CC113B3EC79AE5C280C04BE851B82414B108273F0D6464A379D7917600A4

  const voteRecord = new Vote(`${message.tx.hash}-${message.idx}`);
  voteRecord.blockHeight = BigInt(message.block.block.header.height);
  voteRecord.voter = message.msg.sender;
  voteRecord.proposalID = message.msg.msg.vote.proposal_id;
  voteRecord.vote = message.msg.msg.vote.vote === "yes";

  await voteRecord.save();
}
```

What this is doing is receiving a CosmosMessage which includes message data on the payload. We extract this data and then instantiate a new `Vote` entity that we defined earlier in the `schema.graphql` file. เราเพิ่มข้อมูลเพิ่มเติมแล้วใช้ function `.save()` เพื่อที่จะบันทึก entity ใหม่ (SubQuery จะบันทึกอัตโนมัติใน database).

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
query {
    votes(
    first: 5
    orderBy: BLOCK_HEIGHT_DESC
    # filter: {proposalID: {equalTo: "4"}}
  ) {
    nodes {
      id
      blockHeight
      voter
      vote
    }
  }
}
```

You can see the final code of this project here at [https://github.com/jamesbayly/juno-terra-developer-fund-votes](https://github.com/jamesbayly/juno-terra-developer-fund-votes)

### เผยแพร่โปรเจกต์ SubQuery ของคุณ

SubQuery ให้บริการที่มีการจัดการฟรีเมื่อคุณปรับใช้โปรเจ็กต์ใหม่ได้ คุณสามารถปรับใช้มัน [SubQuery Projects](https://project.subquery.network) และ query โดยใช้ [Explorer](https://explorer.subquery.network).

[อ่านคำแนะนำเพื่อเผยแพร่โครงการใหม่ของคุณไปยัง SubQuery Projects](../run_publish/publish.md)

## ขั้นต่อไป

ยินดีด้วย ตอนนี้คุณได้มี Subquery Project ที่กำลังทำงานอยู่บน local ที่ยอมรับการร้องขอจาก GraphQL API สำหรับการส่งข้อมูล จาก bLuna

ตอนนี้คุณได้รับข้อมูลเชิงลึกเกียวกับสร้าง Subquery project ขั้นพื้นฐาน คำถามคือ เราจะไปที่ไหนต่อ ถ้าคุณคิดว่าคุณมั่นใจ คุณสามารถข้ามไปเรียนรู้เกี่ยวกับ three key files ได้เลย The manifest ไฟล์, the GraphQL schema, และ mappings ไฟล์ภายใต้ [Build section of these docs](../build/introduction.md).

หรือไปที่[ส่วน Academy](../academy/academy.md) ซึ่งมีเวิร์กช็อปเชิงลึก บทแนะนำ และตัวอย่างโครงการเพิ่มเติม เราจะดูการปรับเปลี่ยนขั้นสูงเพิ่มเติมที่นั่น และเราจะเจาะลึกลงไปที่การเรียกใช้โครงการ SubQuery โดยการเรียกใช้โครงการที่พร้อมใช้งานและโอเพ่นซอร์ส

สุดท้ายนี้ หากคุณกำลังมองหาวิธีเพิ่มเติมในการรันและเผยแพร่โปรเจกต์ของคุณ [Run & Publish section](../run_publish/run.md) ของเราสามารถให้ข้อมูลโดยละเอียดเกี่ยวกับวิธีการทั้งหมดในการรันโปรเจกต์ SubQuery ของคุณและการรวบรวม GraphQL ขั้นสูง และ การ subscription features อื่นๆ
