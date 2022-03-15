# สนับสนุนโปรเจ็กต์โดยใช้ IPFS

คู่มือนี้อธิบายวิธีการเผยแพร่โปรเจ็กต์ SubQuery ไปยัง [IPFS](https://ipfs.io/) และปรับใช้บนโครงสร้างพื้นฐานการสนับสนุนของเรา

การสนับสนุนโปรเจ็กต์ใน IPFS จะทำให้ทุกคนใช้งานได้และลดการพึ่งพาบริการแบบรวมศูนย์ เช่น GitHub

## สิ่งที่ต้องมี

- `@subql/cli` เวอร์ชั่น 0.21.0 หรือสูงกว่า
- Manifest `specVersion` 0.2.0 และสูงกว่า
- เตรียม [SUBQL_ACCESS_TOKEN](#prepare-your-subql-access-token) ของคุณให้พร้อม
- เพื่อให้แน่ใจว่าการทำให้ใช้งานได้สำเร็จ เราขอแนะนำให้คุณสร้างโปรเจ็กต์ด้วยคำสั่ง `subql build` และทดสอบในเครื่องก่อนเผยแพร่

## Prepare your SUBQL_ACCESS_TOKEN

- ขั้นตอนที่ 1: ไปที่ [SubQuery Projects](https://project.subquery.network/) และเข้าสู่ระบบ
- ขั้นตอนที่ 2: คลิกที่โปรไฟล์ของคุณที่ด้านบนขวาของเมนู จากนั้นคลิกที่ **_Refresh Token_**
- ขั้นตอนที่ 3: คัดลอกโทเค็นที่สร้างขึ้น
- ขั้นตอนที่ 4: ในการใช้โทเค็นนี้:
  - ตัวเลือกที่ 1: เพิ่ม SUBQL_ACCESS_TOKEN ในตัวแปรของคุณ `EXPORT SUBQL_ACCESS_TOKEN=<token>`
  - Option 2: Coming soon, `subql/cli` will support storing your SUBQL_ACCESS_TOKEN locally.

## How to publish a project

We provide two methods to publish your project,

### Option 1:

As you have `@subql/cli` already installed, you can run the following command, which will read the project and required information from its default manifest `project.yaml`

```
// Publish it from your project's root directory
subql publish

// OR point to your project root
subql publish -f ~/my-project/
```

### Option 2:

Alternatively, suppose your project has multiple Manifest files, for example you support multiple networks but share the same mapping and business logic, and have a project structure as follows:

```
L projectRoot
 L src/
 L package.json
 L polkadot.yaml (Manifest for Polkadot network)
 L kusama.yaml   (Manifest for Kusama network)
 ...
```

You can always publish the project with your selected manifest file.

```
 # This will publish project support indexing Polkadot network
subql publish -f ~/my-projectRoot/polkadot.yaml
```

## After publish

After successfully publishing the project, the logs below indicate that the project was created on the IPFS cluster and have returned its `CID` (content identifier).

```
Building and packing code... done
Uploading SupQuery project to IPFS
SubQuery Project uploaded to IPFS: QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd  //CID
```

Please note this `CID`. With this `CID`, you can view your published project as what we call it [IPFS Deployment](#ipfs-deployment)

## IPFS Deployment

IPFS deployment represents an independent and unique existence of a SubQuery project on a decentralized network. Therefore, any changes with the code in the project will affect its uniqueness. If you need to adjust your business logic, e.g. change the mapping function, you must republish the project, and the `CID` will change.

For now, to view the project you have published, use a `REST` api tool such as [Postman](https://web.postman.co/), and use `POST` method with the following example URL to retrieve it. `https://subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`

You should see the example project deployment as below:

This deployment looks very similar to your manifest file. You can expect those descriptive fields, and the network and dictionary endpoint has been removed as they did not directly affect the outcome of project execution.

Those files been used in your local project has been packed and published to IPFS as well.

```yaml
dataSources:
  - kind: substrate/Runtime
    mapping:
      file: ipfs://QmTTJKrMVzCZqmRCd5xKHbKymtQQnHZierBMHLtHHGyjLy
      handlers:
        - handler: handleBlock
          kind: substrate/BlockHandler
        - filter:
            method: Deposit
            module: balances
          handler: handleEvent
          kind: substrate/EventHandler
        - handler: handleCall
          kind: substrate/CallHandler
    startBlock: 8973820
network:
  genesisHash: "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3"
schema:
  file: ipfs://QmTP5BjtxETVqvU4MkRxmgf8NbceB17WtydS6oQeHBCyjz
specVersion: 0.2.0
```

## Run your SubQuery project on Hosted Service

### Create project with IPFS deployment

You can follow the guide to [Publish your SubQuery project](publish.md) but where you set your deployment source you can select **IPFS**.

Then choose your production slot, copy and paste you IPFS deployment CID (without the leading `ipfs://`).

You should see you IPFS deployment in the preview section. And you can select the network, dictionary endpoints etc.

After successful deploy the IPFS deployment on our hosted service, it should be available to view on the SubQuery Explorer, you can access the query service just like you do locally.
