# Deploy โปรเจกต์ SubQuery เวอร์ชันใหม่ของคุณ

## แนวทาง

แม้ว่าคุณจะมีอิสระในการอัปเกรดและ deploy โปรเจกต์ SubQuery เวอร์ชันใหม่ของคุณได้ตลอดเวลา แต่โปรดเอาใจใส่กระบวนการนี้หากโปรเจกต์ SubQuery ของคุณเป็นแบบสาธารณะที่ทุกคนสามารถเข้าถึงได้ โดยมีประเด็นสำคัญที่ควรทราบดังนี้:

- หากการอัปเกรดของคุณเป็นการเปลี่ยนแปลงครั้งใหญ่ ให้คุณสร้างสร้างโปรเจกต์ใหม่ (เช่น `My SubQuery Project V2`) หรือให้คอมมูนิตี้ของคุณรับทราบถึงการเปลี่ยนแปลงมากมายผ่านช่องทางโซเชียลมีเดีย
- การ deploy โปรเจกต์ SubQuery เวอร์ชันใหม่ ส่งผลให้เกิดการ downtime เนื่องจากเวอร์ชันใหม่ต้องจัดทำดัชนีข้อมูล chain ทั้งหมดทั้งหมดจาก genesis block

## Deploy การเปลี่ยนแปลง

There are two methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

### Using the UI

Log into SubQuery Project and select the project you want to deploy a new version of. You can choose to either deploy to the production or staging slot. These two slots are isolated environments and each has their own databases and synchronise independently.

We recommend deploying to your staging slot only for final staging testing or when you need to resync your project data. You can then promote it to production with zero downtime. You will find testing is faster when [running a project locally](../run_publish/run.md) as you can more [easily debug issues](../academy/tutorials_examples/debug-projects.md).

The staging slot is perfect for:

- การตรวจสอบการเปลี่ยนแปลงโปรเจกต์ SubQuery ในสภาพแวดล้อมที่แยกจากกัน Staging slot มี URL ที่แตกต่างไปจากการ production ที่คุณสามารถใช้ได้ใน dApps ของคุณ
- การวอร์มอัพและทำจัดทำดัชนีข้อมูลสำหรับโปรเจ็กต์ SubQuery ที่อัปเดต โดยไม่ต้องหยุดการทำงานของ dApp ของคุณ
- การเตรียมปล่อยเวอร์ชันใหม่สำหรับโปรเจกต์ SubQuery ของคุณโดยไม่เปิดเผยต่อสาธารณะ Staging slot จะไม่ปรากฏต่อสาธารณะใน Explorer และมี URL เฉพาะที่มองเห็นได้เฉพาะคุณเท่านั้น

![Staging slot](/assets/img/staging_slot.png)

กรอก Commit Hash จาก GitHub (คัดลอก commit hash แบบเต็ม) ของโค้ดโปรเจกต์ SubQuery เวอร์ชั่นที่คุณต้องการ deploy การกรอก Commit Hash จาก GitHub จะทำให้มี downtime นานขึ้น ซึ่งขึ้นอยู่กับเวลาที่ใช้ในการจัดทำ index ข้อมูลของเชนปัจจุบัน คุณสามารถรายงาน progress ของคุณได้ที่นี่

### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our managed service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN](/docs/run_publish/ipfs.md#prepare-your-subqlaccesstoken) ready.

```shell
// You can directly set your Indexer and Query versions
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// OR you can use the interface, it will validate your IPFS CID and render a list of image versions that matches your manifest file `project.yaml`

$ subql deployment:deploy
```

## Upgrade to the Latest Indexer and Query Service

If you just want to upgrade to the latest indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) or query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) to take advantage of our regular performance and stability improvements, just select a newer versions of our packages and save. This will cause only a few minutes of downtime as the services running your project are restarted.

## ขั้นตอนต่อไป - เชื่อมต่อกับโปรเจกต์ของคุณ

เมื่อการ deploy ของคุณเสร็จสมบูรณ์ และ โหนดของเราได้ทำจัดทำดัชนีข้อมูลของคุณจาก chain แล้ว คุณจะสามารถเชื่อมต่อกับโปรเจกต์ผ่าน GraphQL Query endpoint ที่ปรากฎขึ้นมา

![โปรเจกต์ที่กำลัง deploy และ sync](/assets/img/projects-deploy-sync.png)

หรือคุณสามารถคลิกที่จุดสามจุดถัดจากชื่อโปรเจกต์ของคุณ และดูบน SubQuery Explorer There you can use the in browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).
