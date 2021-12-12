# Deploy โปรเจ็กต์ SubQuery เวอร์ชั่นใหม่ของคุณ

## Guidelines

แม้ว่าคุณจะมีอิสระในการอัปเกรดและ deploy เวอร์ชันใหม่โปรเจ็กต์ SubQuery ของคุณได้ตลอดเวลา แต่โปรดเอาใจใส่กระบวนการนี้หากโปรเจ็กต์ SubQuery ของคุณเป็นแบบสาธารณะที่ทุกคนสามารถเข้าถึงได้ ประเด็นสำคัญที่ควรทราบ: Some key points to note:
- หากการอัปเกรดของคุณเป็นการเปลี่ยนแปลงครั้งใหญ่ ให้สร้างโปรเจ็กต์ใหม่ (เช่น `My SubQuery Project V2`) หรือให้ชุมชนของคุณรับทราบถึงการเปลี่ยนแปลงมากมายผ่านช่องทางโซเชียลมีเดีย
- การ deploy โปรเจ็กต์ SubQuery เวอร์ชั่นใหม่ ส่งผลให้เกิดการ down time เนื่องจากเวอร์ชันใหม่ต้อง index ข้อมูล chain ทั้งหมดทั้งหมดจาก genesis block

## Deploy การเปลี่ยนแปลง

Log into SubQuery Project and select the project you want to deploy a new version of. You can choose to either deploy to the production or staging slot. These two slots are isolated environments and each has their own databases and synchronise independently.

We recommend deploying to your staging slot only for final staging testing or when you need to resync your project data. You can then promote it to production with zero downtime. เราแนะนำให้ deploy ไปยัง staging slot ของคุณสำหรับการทดสอบขั้นสุดท้ายเท่านั้น หรือเมื่อคุณต้องการซิงค์ข้อมูลโปรเจ็กต์ของคุณอีกครั้ง จากนั้นคุณสามารถปรับเป็นเวอร์ชัน production โดยไม่มี downtime คุณจะพบว่าการทดสอบเร็วขึ้นเมื่อ [รันโปรเจ็กต์ในเครื่อง](../run/run.md) เนื่องจากคุณสามารถ[ debug ปัญหาต่างๆได้ง่ายขึ้น](../tutorials_examples/debug-projects.md)

Staging slot เหมาะสำหรับ:
* Final validation of changes to your SubQuery Project in a separate environment. การตรวจสอบครั้งสุดท้ายของการเปลี่ยนแปลงในโปรเจ็กต์ SubQuery ในสภาพแวดล้อมที่แยกจากกัน staging slot มี URL ที่แตกต่างไปจากการ production ที่คุณสามารถใช้ได้ใน dApps ของคุณ
* การวอร์มอัพและทำ index ข้อมูลสำหรับโปรเจ็กต์ SubQuery ที่อัปเดต โดยไม่ต้องหยุดการทำงานของ dApp ของคุณ
* Preparing a new release for your SubQuery Project without exposing it publicly. การเตรียม new release สำหรับโครงการ SubQuery ของคุณโดยไม่เปิดเผยต่อสาธารณะ staging slot จะไม่ปรากฏต่อสาธารณะใน Explorer และมี URL เฉพาะที่มองเห็นได้เฉพาะคุณเท่านั้น

![Staging slot](/assets/img/staging_slot.png)

#### อัปเกรด Indexer และ Query Service ล่าสุด

หากคุณต้องการอัปเกรด indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) หรือ query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) เป็นตัวล่าสุด เพื่อใช้ประโยชน์จากการปรับปรุงประสิทธิภาพและความเสถียร เพียงเลือกแพ็คเกจเวอร์ชันใหม่กว่าของเราแล้วบันทึก ซึ่งจะทำให้เกิดการ downtime เพียงไม่กี่นาที This will cause only a few minutes of downtime.

#### Deploy SubQuery Project เวอร์ชันใหม่ของคุณ

กรอก Commit Hash จาก GitHub (คัดลอก commit hash แบบเต็ม) ของโค้ดโปรเจ็กต์ SubQuery เวอร์ชั่นที่คุณต้องการ deploy ซึ่งจะทำให้มี downtime นานขึ้น ซึ่งขึ้นอยู่กับเวลาที่ใช้ในการจัดทำ index ข้อมูลของเชนปัจจุบัน You can always report back here for progress. This will cause a longer downtime depending on the time it takes to index the current chain. You can always report back here for progress.

## ขั้นตอนต่อไป - เชื่อมต่อกับโปรเจ็กต์ของคุณ
เมื่อการ deploy ของคุณเสร็จสมบูรณ์ และ node ของเราได้ทำการ index ข้อมูลของคุณจาก chain แล้ว คุณจะสามารถเชื่อมต่อกับโปรเจ็กต์ผ่าน GraphQL Query endpoint ที่ปรากฎขึ้นมา

![โปรเจ็กต์ที่กำลัง deploy และ sync](/assets/img/projects-deploy-sync.png)

หรือคุณสามารถคลิกที่จุดสามจุดถัดจากชื่อโปรเจ็กต์ของคุณ และดูใน SubQuery Explorer คุณสามารถใช้ Playground ในเบราว์เซอร์เพื่อเริ่มต้นได้ - [อ่านเพิ่มเติมเกี่ยวกับวิธีใช้ Explorer ของเราที่นี่](../query/query.md) There you can use the in browser playground to get started - [read more about how to user our Explorer here](../query/query.md).
