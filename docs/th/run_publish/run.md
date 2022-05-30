# การรัน SubQuery ภายในเครื่อง

คู่มือนี้จะศึกษาวิธีการรันโหนด SubQuery บนโครงสร้างพื้นฐานของคุณ ซึ่งรวมถึง indexer และ query service คุณไม่อยากที่จะต้องคอยกังวลเกี่ยวกับการรันโครงสร้างพื้นฐาน SubQuery ของคุณเองใช่หรือไม่? SubQuery ให้บริการ [โฮสต์ที่มีการจัดการ](https://explorer.subquery.network) แก่ชุมชนฟรี ตามไกด์การเผยแพร่ เพื่อแสดงให้เห็นถึงวิธีการอัพโหลด SubQuery Projects

## การใช้กับ Docker

ทางเลือกหนึ่ง คือการรัน <strong>Docker Container</strong> ซึ่งกำหนดจากไฟล์ `docker-compose.yml` สำหรับโปรเจกต์ใหม่ที่เพิ่งเริ่มต้น คุณไม่จำเป็นต้องเปลี่ยนแปลงอะไรในส่วนนี้

ให้รันคำสั่งต่อไปนี้ ภายใต้ไดเร็กทอรีของโปรเจกต์:

```shell
docker-compose pull && docker-compose up
```

อาจใช้เวลาสักครู่ในการดาวน์โหลดแพ็คเกจที่จำเป็น ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query) และ Postgres) ในครั้งแรก แต่ในไม่ช้าคุณจะเห็นการทำงานของโหนด SubQuery

## การรัน Indexer (subql/node)

สิ่งที่ต้องมี:

- ฐานข้อมูล [Postgres](https://www.postgresql.org/) (เวอร์ชัน 12 ขึ้นไป) ในขณะที่ [โหนด SubQuery](#start-a-local-subquery-node) กำลังทำการ index บล็อกเชน ข้อมูลที่ออกมาจะถูกเก็บไว้ในอินสแตนซ์ของฐานข้อมูลภายนอก

โหนดของ SubQuery เป็นการใช้งานที่แยกข้อมูลบล็อกเชนแบบ Substrate/Polkadot ตามโปรเจ็กต์ของ SubQuery และบันทึกลงในฐานข้อมูล Postgres

### การติดตั้ง

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

``` shell
# NPM
npm install -g @subql/node
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

``` shell
# NPM
npm install -g @subql/node-terra
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

``` shell
# NPM
npm install -g @subql/node-avalanche
````

</CodeGroupItem>
</CodeGroup>

โปรดทราบว่าเรา ** โปรดอย่า </ 6> ส่งเสริมการใช้งาน ` yarn global </ 7> เนื่องจากการจัดการการพึ่งพาที่ไม่ค่อยดีอาจนำไปสู่ข้อผิดพลาด</p>

<p spaces-before="0">เมื่อติดตั้งแล้ว คุณสามารถเริ่มโหนดด้วยคำสั่งต่อไปนี้:</p>

<p spaces-before="0">


<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node <command>
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra <command>
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche <command> 
```

</CodeGroupItem>
</CodeGroup></p>

<h3 spaces-before="0">คำสั่งที่สำคัญ</h3>

<p spaces-before="0">คำสั่งต่อไปนี้จะช่วยคุณในการกำหนดค่าโหนด SubQuery ให้เสร็จสมบูรณ์และเริ่มสร้างดัชนี
หากต้องการข้อมูลเพิ่มเติม คุณสามารถรันคำสั่ง <code>--help` ได้ตลอดเวลา</p>

#### ชี้ไปที่ local path ของโปรเจกต์

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node -f your-project-path
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra -f your-project-path
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -f your-project-path
```

</CodeGroupItem>
</CodeGroup>

#### ใช้พจนานุกรม

การใช้พจนานุกรมเชนแบบเต็มสามารถเร่งการประมวลผลโปรเจ็กต์ SubQuery ได้อย่างมากระหว่างการทดสอบหรือระหว่างดัชนีแรกของคุณ Xpath: /p[10]/CodeGroup File: run. md ในบางกรณี เราพบว่าประสิทธิภาพการจัดทำดัชนีเพิ่มขึ้นถึง 10 เท่า

พจนานุกรมเชนเต็มรูปแบบจัดทำดัชนีล่วงหน้าตำแหน่งของเหตุการณ์และปัจจัยภายนอกทั้งหมดภายในเชนโดยเฉพาะ และช่วยให้บริการโหนดของคุณสามารถข้ามไปยังตำแหน่งที่เกี่ยวข้องเมื่อสร้างดัชนีแทนที่จะตรวจสอบแต่ละบล็อก

คุณสามารถเพิ่มจุดสิ้นสุดพจนานุกรมในไฟล์` project.yaml ของคุณ` (ดู[ ไฟล์ Manifest ](../create/manifest.md)) หรือระบุตอนรันไทม์โดยใช้คำสั่งต่อไปนี้:

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot/Polkadot'>

```shell
subql-node --network-dictionary=https://api.subquery.network/sq/subquery/dictionary-polkadot
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra --network-dictionary=https://api.subquery.network/sq/subquery/terra-columbus-5-dictionary
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche --network-dictionary=https://api.subquery.network/sq/subquery/avalanche-dictionary
```

</CodeGroupItem>
</CodeGroup>

[อ่านเพิ่มเติมเกี่ยวกับวิธีการทำงานของพจนานุกรม SubQuery](../academy/tutorials_examples/dictionary.md).

#### เชื่อมต่อกับฐานข้อมูล

```shell
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
subql-node -f your-project-path
```
 Text XPath: /p[11]/CodeGroup/text

ขึ้นอยู่กับการกำหนดค่าฐานข้อมูล Postgres ของคุณ (เช่นความแตกต่างของฐานข้อมูลรหัสผ่าน) โดยโปรดตรวจสอบให้แน่ใจว่า indexer (`subql/node`) และการบริการ Query (`subql/query`) สามารถเชื่อมต่อกันได้

#### ระบุไฟล์การกำหนดค่า

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node -c your-project-config.yml
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra -c your-project-config.yml
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'> ```shell subql-node-avalanche -c your-project-config.yml ดูตัวอย่างด้านล่างต่อไปนี้.

```yaml
subquery: ../../../../subql-example/extrinsics
subqueryName: extrinsics
batchSize:100
localMode:true
```

#### จะเปลี่ยน batch size การ fetch บล็อคเชนได้อย่างไร

```shell
subql-node -f your-project-path --batch-size 200

Result:
[IndexerManager] fetch block [203, 402]
[IndexerManager] fetch block [403, 602]
```

เมื่อ indexer ทำการ index chain ในครั้งแรก การ fetch ทีละบล็อกจะลดประสิทธิภาพการทำงานลงอย่างมาก การเพิ่ม batch size เพื่อปรับจำนวนบล็อคที่ fetch จะลดเวลาดำเนินการโดยรวมได้ Batch size เริ่มต้นในปัจจุบันคือ 100

#### การรันในโหมด local

<CodeGroup>
<CodeGroupItem title='Substrate/Polkadot'>

```shell
subql-node -f your-project-path --local
```

</CodeGroupItem>
<CodeGroupItem title='Terra'>

```shell
subql-node-terra -f your-project-path --local
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -f your-project-path --local
```

</CodeGroupItem>
</CodeGroup>

For debugging purposes, users can run the node in local mode. การเปลี่ยนไปใช้โหมด local จะสร้างตาราง Postgres ใน ` public ` ซึ่งเป็น default schema

หากไม่ได้ใช้โหมด local, Postgres schema ใหม่ที่มี `subquery_` เริ่มต้นและตารางโปรเจกต์ที่เกี่ยวข้องจะถูกสร้างขึ้น

#### ตรวจสอบสถานะความสมบูรณ์ของโหนดของคุณ

มีปลายทาง 2 endpoints ที่คุณสามารถใช้ตรวจสอบและมอนิเตอร์ความสมบูรณ์ของโหนด SubQuery ที่ทำงานอยู่

- Health check endpoint ที่ส่งคืนค่า response 200 อย่างง่าย
- Metadata endpoint ที่รวมการวิเคราะห์เพิ่มเติมเกี่ยวกับโหนด SubQuery ของคุณที่กำลังทำงานอยู่

เพิ่มสิ่งนี้ไปกับ URL พื้นฐานของโหนด SubQuery ของคุณ ตัวอย่างเช่น` http://localhost:3000/meta` จะส่งคืนค่า:

```bash
{
    "currentProcessingHeight": 1000699,
    "currentProcessingTimestamp": 1631517883547,
    "targetHeight": 6807295,
    "bestHeight": 6807298,
    "indexerNodeVersion": "0.19.1",
    "lastProcessedHeight": 1000699,
    "lastProcessedTimestamp": 1631517883555,
    "uptime": 41.151789063,
    "polkadotSdkVersion": "5.4.1",
    "apiConnected": true,
    "injectedApiConnected": true,
    "usingDictionary": false,
    "chain": "Polkadot",
    "specName": "polkadot",
    "genesisHash": "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3",
    "blockTime": 6000
}
```

`http://localhost:3000/health` จะคืนค่า HTTP 200 ถ้าสำเร็จ

ค่า 500 error จะถูกส่งเมื่อ indexer ไม่สมบูรณ์ ซึ่งมักจะเห็นได้เมื่อโหนดกำลังทำการบูทอัพ

```shell
{
    "status": 500,
    "error": "Indexer is not healthy"
}
```

หากใช้ URL ที่ไม่ถูกต้อง ข้อผิดพลาด 404 not found จะถูกส่งกลับมา

```shell
{
"statusCode": 404,
"message": "Cannot GET /healthy",
"error": "Not Found"
}
```

#### การ debug โปรเจกต์ของคุณ

ใช้ [node inspector](https://nodejs.org/en/docs/guides/debugging-getting-started/) เพื่อเรียกใช้คำสั่งต่อไปนี้

```shell
node --inspect-brk <path to subql-node> -f <path to subQuery project>
```

ยกตัวอย่างเช่น:

```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Debugger listening on ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
```

จากนั้นเปิดเครื่องมือ Chrome dev ไปที่ Source > Filesystem และเพิ่มโปรเจกต์ของคุณลงในเวิร์กสเปซ แล้วเริ่มการ debug สามารถดูรายละเอียดเพิ่มเติมได้ที่ [วิธีการ debug โปรเจกต์ SubQuery](https://doc.subquery.network/academy/tutorials_examples/debug-projects/)

## การรัน Query Service (subql/query)

### การติดตั้ง

```shell
# NPM
npm install -g @subql/query
```

โปรดทราบว่าเรา **ไม่** สนับสนุนให้ใช้ `yarn global` เนื่องจากการจัดการ dependency ที่ไม่ดี ซึ่งอาจนำไปสู่ข้อผิดพลาดได้

### การรัน Query service

```
export DB_HOST=localhost
subql-query --name <project_name> --playground
```

ตรวจสอบให้แน่ใจว่าชื่อโปรเจกต์เหมือนกับชื่อโปรเจกต์เมื่อคุณ [เริ่มต้นโปรเจกต์](../quickstart/quickstart-polkadot.md#initialise-the-starter-subquery-project) ตรวจสอบ environment variables ด้วยว่าถูกต้องหรือไม่

หลังจากรัน service subql-query สำเร็จแล้ว ให้เปิดเบราว์เซอร์ของคุณ แล้วไปที่ `http://localhost:3000` คุณควรเห็น GraphQL playground แสดงใน explorer และ schemas ที่พร้อมสำหรับการ query
