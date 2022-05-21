# Terra Quick Start

In this Quick start guide, we're going to start with a simple Terra starter project and then finish by indexing some actual real data. This is an excellent basis to start with when developing your own SubQuery Project.

**If your are looking for guides for Substrate/Polkadot, you can read the [Substrate/Polkadot specific quick start guide](./quickstart-polkadot).**

หลังจบคู่มือนี้ คุณจะมีโปรเจ็กต์ SubQuery ที่ทำงานบนโหนด SubQuery และมี GraphQL endpoint ที่คุณสามารถสืบค้นข้อมูลได้

หากคุณยังไม่คุ้นเคย เราขอแนะนำให้คุณทำความคุ้นเคยกับ [คำศัพท์](../#terminology) ที่ใช้ใน SubQuery

**The goal of this quick start guide is to adapt the standard starter project to begin indexing all transfers from Terra, it should only take 10-15 minutes**

## การเตรียมความพร้อม

### สภาพแวดล้อมสำหรับการพัฒนาภายในตัวเครื่อง

- [Node](https://nodejs.org/en/): A modern (e.g. the LTS version) installation of Node.
- [Docker](https://docker.com/): This tutorial will use require Docker

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

You'll be asked certain questions as the SubQuery project is initalised:

- Name: ชื่อ Subquery Project ของคุณ
- Network Family: The layer-1 blockchain network family that this SubQuery project will be developed to index, use the arrow keys on your keyboard to select from the options, for this guide we will use *"Terra"*
- Network: The specific network that this SubQuery project will be developed to index, use the arrow keys on your keyboard to select from the options, for this guide we will use *"Terra"*
- Template: Select a SubQuery project template that will provide a starting point to begin development, we suggest selecting the *"Starter project"*
- Git repository (ทางเลือก): ระบุ Git URL ไปยัง repoที่ SubQuery project ที่จะถูกทำากรโฮสต์ (เมื่อโฮสต์ใน Subquery Explorer)
- RPC endpoint (จำเป็น): ระบุ HTTPS URL ไปยัง RPC endpoint ที่ทำงานอยู่ที่จะใช้งานเป็นค่าเริ่มต้นของโปรเจค This RPC node must be an archive node (have the full chain state). For this guide we will use the default value *"https://terra-columbus-5.beta.api.onfinality.io"*
- Authors (Required): Enter the owner of this SubQuery project here (e.g. your name!)
- Description (Optional): You can provide a short paragraph about your project that describe what data it contains and what users can do with it
- Version (Required): Enter a custom version number or use the default (`1.0.0`)
- License (Required): Provide the software license for this project or accept the default (`Apache-2.0`)

After the initialisation process is complete, you should see a folder with your project name has been created inside the directory. The contents of this directoy should be identical to what's listed in the [Directory Structure](../create/introduction.md#directory-structure).

Last, under the project directory, run following command to install the new project's dependencies.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Making Changes to your Project

In the starter package that you just initialised, we have provided a standard configuration for your new project. You will mainly be working on the following files:

1. The GraphQL Schema in `schema.graphql`
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

The Projet Manifest (`project.yaml`) file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data.

We won't do many changes to the manifest file as it already has been setup correctly, but we need to change our handlers. Remember we are planning to index all Terra transfer events, as a result, we need to update the `datasources` section to read the following.

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

You can update the `handleEvent` function to the following (note the additional imports):

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

For more information about mapping functions, check out our documentation under [Build/Mappings](../build/mapping.md)

### การสร้างโปรเจค

In order run your new SubQuery Project we first need to build our work. Run the build command from the project's root directory.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**สำคัญ เมื่อไรก็ตามที่มีการเปลี่ยนแปลงใน Mapping Functions คุณจำเป็นต้องสร้างโปรเจคของคุณใหม่**

## Running and Querying your Project

### รันโปรเจคของคุณกับ Docker

เมื่อไรก็ตามที่คุณสร้าง Subquery Project ใหม่ คุณควรจะรันโปเจค local บนคอมพิวเตอร์ของคุณเสมอเพื่อทดสอบมันก่อน. วิธีที่ง่ายที่สุดคือให้ใช้ Docker

ทุกๆการตั้งค่าใน SubQuery node จะรันอยู่ภายใน `docker-compose.yml` ไฟล์. For a new project that has been just initalised you won't need to change anything here, but you can read more about the file and the settings in our [Run a Project section](../run_publish/run.md)

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

SubQuery provides a free managed service when you can deploy your new project to. คุณสามารถปรับใช้มัน [SubQuery Projects](https://project.subquery.network) และ query โดยใช้ [Explorer](https://explorer.subquery.network).

[Read the guide to publish your new project to SubQuery Projects](../run_publish/publish.md)

## ขั้นต่อไป

ยินดีด้วย ตอนนี้คุณได้มี Subquery Project ที่กำลังทำงานอยู่บน local ที่ยอมรับการร้องขอจาก GraphQL API สำหรับการส่งข้อมูล จาก bLuna

ตอนนี้คุณได้รับข้อมูลเชิงลึกเกียวกับสร้าง Subquery project ขั้นพื้นฐาน คำถามคือ เราจะไปที่ไหนต่อ ถ้าคุณคิดว่าคุณมั่นใจ คุณสามารถข้ามไปเรียนรู้เกี่ยวกับ three key files ได้เลย The manifest ไฟล์, the GraphQL schema, และ mappings ไฟล์ภายใต้ [Build section of these docs](../build/introduction.md).

Otherwise, continue to our [Academy section](../academy/academy.md) where have more in depth workshops, tutorials, and example projects. There we'll look at more advanced modifications, and we'll take a deeper dive at running SubQuery projects by running readily available and open source projects.

Finally, if you're looking for more ways to run and publish your project, our [Run & Publish section](../run_publish/run.md) provides detailed informatation about all the ways to run your SubQuery project and other advanced GraphQL aggregation and subscription features.
