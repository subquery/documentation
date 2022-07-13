# การโฮสติ้งโปรเจกต์โดยใช้ IPFS

คู่มือนี้อธิบายวิธีการเผยแพร่โปรเจกต์ SubQuery ไปยัง [IPFS](https://ipfs.io/) และปรับใช้บนโครงสร้างพื้นฐานสำหรับการโฮสติ้งของเรา

Hosting a project in IPFS makes it available for all and reduces your reliance on centralised services like GitHub.

## สิ่งที่ต้องมี:

- `@subql/cli` เวอร์ชั่น 0.21.0 หรือสูงกว่า
- Manifest `specVersion` 0.2.0 หรือสูงกว่า
- Get your [SUBQL_ACCESS_TOKEN](ipfs.md#prepare-your-subql-access-token) ready.
- เพื่อให้แน่ใจว่าการทำให้ใช้งานได้สำเร็จ เราขอแนะนำให้คุณสร้างโปรเจกต์ด้วยคำสั่ง `subql build` และทดสอบในเครื่องก่อนเผยแพร่

## เตรียม SUBQL_ACCESS_TOKEN . ของคุณ

- ขั้นตอนที่ 1: ไปที่ [SubQuery Projects](https://project.subquery.network/) และเข้าสู่ระบบ
- Step 2: Click on your profile at the top right of the navigation menu, then click on **_Refresh Token_**.
- ขั้นตอนที่ 3: คัดลอกโทเค็นที่สร้างขึ้น
- ขั้นตอนที่ 4: ในการใช้โทเค็นนี้:
  - ตัวเลือกที่ 1: เพิ่ม SUBQL_ACCESS_TOKEN ในตัวแปรของคุณ `EXPORT SUBQL_ACCESS_TOKEN=<token>`
  - ตัวเลือกที่ 2: `subql/cli` จะสนับสนุนการจัดเก็บ SUBQL_ACCESS_TOKEN ของคุณ ในเร็วๆนี้

## วิธีเผยแพร่โปรเจกต์

We provide two methods to publish your project:

### Option 1

As you have `@subql/cli` already installed, you can run the following command, which will read the project and required information from its default manifest `project.yaml`:

```
// Publish it from your project's root directory
subql publish

// OR point to your project root
subql publish -f ~/my-project/
```

### Option 2

สมมติว่าโปรเจกต์ของคุณมีไฟล์ Manifest หลายไฟล์ ตัวอย่างเช่น คุณสนับสนุนเครือข่ายหลายเครือข่าย แต่ใช้การ Mapping, Business Logic รว่มกัน และมีโครงสร้างของโปรเจกต์ดังต่อไปนี้:

```
L projectRoot
 L src/
 L package.json
 L polkadot.yaml (Manifest for Polkadot network)
 L kusama.yaml   (Manifest for Kusama network)
 ...
```

คุณสามารถเผยแพร่โปรเจกต์ด้วยไฟล์ Manifest ที่คุณเลือก

```
 # This will publish project support indexing Polkadot network
subql publish -f ~/my-projectRoot/polkadot.yaml
```

## หลังจากเผยแพร่

หลังจากเผยแพร่โปรเจ็กต์เรียบร้อยแล้ว บันทึกด้านล่างระบุว่าโปรเจกต์ถูกสร้างขึ้นบน IPFS และส่งคืน `CID` (Content Identifier)

```
Building and packing code... done
Uploading SupQuery project to IPFS
SubQuery Project uploaded to IPFS: QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd  //CID
```

โปรดทราบว่า `CID` นี้ With this `CID`, you can view your published project as what we call it [IPFS Deployment](ipfs.md#ipfs-deployment).

## การปรับใช้ IPFS

การปรับใช้ IPFS ทำให้โปรเจกต์ SubQuery มีความเป็นอิสระและไม่ซ้ำใครบนเครือข่ายแบบกระจายอำนาจ ดังนั้นการเปลี่ยนแปลงใด ๆ กับโค้ดในโปรเจกต์จะส่งผลต่อความเป็นเอกลักษณ์ หากคุณต้องการ Business Logic เช่น เปลี่ยน Mapping Function คุณต้องทำการเผยแพร่อีกครั้ง และ `CID` จะเปลี่ยนไป

For now, to view the project you have published, use a `REST` api tool such as [Postman](https://web.postman.co/), and use `POST` method with the following example URL to retrieve it:`https://ipfs.subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`.

You should see the example project deployment as below.

การปรับใช้นี้ดูคล้ายกับไฟล์ Manifest ของคุณ คุณสามารถเลือกใช้ฟิลด์คำอธิบาย, เครือข่าย และ Dictionary Endpoint จะถูกลบออกและ ผลลัพธ์จะไม่ส่งผลกระทบโดยตรงต่อการดำเนินการของโปรเจกต์

ไฟล์เหล่านั้นถูกใช้ในโปรเจกต์ของคุณ และจะได้รับการเผยแพร่ไปยัง IPFS ด้วย

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

## รันโปรเจกต์ SubQuery ของคุณบน Hosted Service

### สร้างโปรเจกต์ด้วยการปรับใช้ IPFS

You can follow the guide to [Publish your SubQuery project](../run_publish/publish.md) but where you set your deployment source you can select **IPFS**.

จากนั้นเลือกสล็อตที่ใช้งานจริงของคุณ คัดลอกและวาง CID การปรับใช้ IPFS ของคุณ (โดยไม่มี `ipfs://` นำหน้า)

คุณควรเห็นการปรับใช้ IPFS ของคุณในส่วนของการแสดงตัวอย่าง และคุณสามารถเลือกเครือข่าย, Dictionary Endpoint ฯลฯ

หลังจากการปรับใช้ IPFS บน Hosted Service ของเราได้สำเร็จแล้ว จะสามารถดูได้บน SubQuery Explorer และคุณสามารถเข้าถึงบริการสืบค้นได้เช่นเดียวกับที่คุณทำในเครื่องของคุณ
