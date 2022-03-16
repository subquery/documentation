# สนับสนุนโปรเจกต์โดยใช้ IPFS

คู่มือนี้อธิบายวิธีการเผยแพร่โปรเจกต์ SubQuery ไปยัง [IPFS](https://ipfs.io/) และปรับใช้บนโครงสร้างพื้นฐานการสนับสนุนของเรา

การสนับสนุนโปรเจ็กต์ใน IPFS จะทำให้ทุกคนใช้งานได้และลดการพึ่งพาบริการแบบรวมศูนย์ เช่น GitHub

## สิ่งที่ต้องมี

- `@subql/cli` เวอร์ชั่น 0.21.0 หรือสูงกว่า
- Manifest `specVersion` 0.2.0 หรือสูงกว่า
- เตรียม [SUBQL_ACCESS_TOKEN](#prepare-your-subql-access-token) ของคุณให้พร้อม
- เพื่อให้แน่ใจว่าการทำให้ใช้งานได้สำเร็จ เราขอแนะนำให้คุณสร้างโปรเจกต์ด้วยคำสั่ง `subql build` และทดสอบในเครื่องก่อนเผยแพร่

## เตรียม SUBQL_ACCESS_TOKEN . ของคุณ

- ขั้นตอนที่ 1: ไปที่ [SubQuery Projects](https://project.subquery.network/) และเข้าสู่ระบบ
- ขั้นตอนที่ 2: คลิกที่โปรไฟล์ของคุณที่ด้านบนขวาของเมนู จากนั้นคลิกที่ **_Refresh Token_**
- ขั้นตอนที่ 3: คัดลอกโทเค็นที่สร้างขึ้น
- ขั้นตอนที่ 4: ในการใช้โทเค็นนี้:
  - ตัวเลือกที่ 1: เพิ่ม SUBQL_ACCESS_TOKEN ในตัวแปรของคุณ `EXPORT SUBQL_ACCESS_TOKEN=<token>`
  - ตัวเลือกที่ 2: `subql/cli` จะสนับสนุนการจัดเก็บ SUBQL_ACCESS_TOKEN ของคุณ ในเร็วๆนี้

## วิธีเผยแพร่โปรเจกต์

เรามีสองวิธีในการเผยแพร่โครงการของคุณ

### ตัวเลือกที่ 1:

เนื่องจากคุณได้ติดตั้ง `@subql/cli` แล้ว คุณสามารถเรียกใช้คำสั่งต่อไปนี้ ซึ่งจะอ่านจากโปรเจกต์และข้อมูลที่จำเป็นจากรายการ Manifest `project.yaml`

```
// เผยแพร่จากตำแหน่งที่เก็บของโปรเจกต์
subql publish

// หรือชี้ไปที่ root โปรเจกต์ของคุณ
subql publish -f ~/my-project/
```

### ตัวเลือกที่ 2:

สมมติว่าโปรเจกต์ของคุณมีไฟล์ Manifest หลายไฟล์ ตัวอย่างเช่น คุณสนับสนุนเครือข่ายหลายเครือข่าย แต่ใช้การ Mapping, Business Logic และมีโครงสร้างโปรเจกต์ดังนี้:

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
 # สิ่งนี้จะเผยแพร่การสนับสนุนโครงการสร้างดัชนีบนเครือข่าย Polkadot
subql publish -f ~/my-projectRoot/polkadot.yaml
```

## หลังจากเผยแพร่

หลังจากเผยแพร่โปรเจ็กต์เรียบร้อยแล้ว บันทึกด้านล่างระบุว่าโปรเจกต์ถูกสร้างขึ้นบน IPFS และส่งคืน `CID` (content identifier)

```
Building and packing code... done
Uploading SupQuery project to IPFS
SubQuery Project uploaded to IPFS: QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd  //CID
```

โปรดทราบว่า `CID` นี้ ด้วย `CID` นี้ คุณสามารถดูโปรเจกต์ที่เผยแพร่ของคุณในที่นี้ เราเรียกว่า [IPFS Deployment](#ipfs-deployment)

## การปรับใช้ IPFS

การปรับใช้ IPFS แสดงถึงการมีอยู่ของโปรเจกต์ SubQuery ที่เป็นอิสระและไม่ซ้ำใครบนเครือข่ายแบบกระจายอำนาจ ดังนั้นการเปลี่ยนแปลงใด ๆ กับรหัสในโปรเจกต์จะส่งผลต่อความเป็นเอกลักษณ์ หากคุณต้องการ Business Logic เช่น เปลี่ยน Mapping Function คุณต้องเผยแพร่โปรเจกต์อีกครั้ง และ `CID` จะเปลี่ยนไป

สำหรับตอนนี้ หากต้องการดูโปรเจกต์ที่คุณเผยแพร่ ให้ใช้เครื่องมือ API `REST` เช่น [Postman](https://web.postman.co/) และใช้ `POST` ด้วย URL ตัวอย่างต่อไปนี้ `https://subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`

คุณควรเห็นตัวอย่างการปรับใช้โปรเจกต์ดังต่อไปนี้:

การปรับใช้นี้ดูคล้ายกับไฟล์ Manifest ของคุณ คุณสามารถเลือกใช้ฟิลด์คำอธิบาย, เครือข่าย และ Dictionary Endpoint จะถูกลบออกและ ผลลัพธ์จะไม่ส่งผลกระทบโดยตรงต่อการดำเนินการของโปรเจกต์

ไฟล์เหล่านั้นถูกใช้ในโปรเจกต์และคุณจะได้รับการเผยแพร่ไปยัง IPFS ด้วย

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

## เรียกใช้โปรเจกต์ SubQuery ของคุณบน Hosted Service

### สร้างโปรเจกต์ด้วย IPFS

คุณสามารถทำตามคำแนะนำเพื่อ [Publish your SubQuery project](publish.md) และคุณตั้งค่าแหล่งที่มาของการทำให้ใช้งานได้ คุณสามารถเลือก **IPFS**

จากนั้นเลือกสล็อตที่ใช้งานจริงของคุณ คัดลอกและวาง CID การปรับใช้ IPFS ของคุณ (โดยไม่มี `ipfs://` นำหน้า)

คุณควรเห็นการปรับใช้ IPFS ของคุณในส่วนแสดงตัวอย่าง และคุณสามารถเลือกเครือข่าย, Dictionary Endpoints ฯลฯ

หลังจากการปรับใช้ IPFS บน Hosted Service ของเราได้สำเร็จแล้ว คุณควรจะสามารถดูได้บน SubQuery Explorer และคุณสามารถเข้าถึงบริการสืบค้นได้เช่นเดียวกับที่คุณทำในเครื่อง
