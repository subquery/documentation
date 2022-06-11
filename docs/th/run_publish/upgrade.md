# Deploy โปรเจกต์ SubQuery เวอร์ชันใหม่ของคุณ

## แนวทาง

แม้ว่าคุณจะมีอิสระในการอัปเกรดและ deploy โปรเจกต์ SubQuery เวอร์ชันใหม่ของคุณได้ตลอดเวลา แต่โปรดเอาใจใส่กระบวนการนี้หากโปรเจกต์ SubQuery ของคุณเป็นแบบสาธารณะที่ทุกคนสามารถเข้าถึงได้ โดยมีประเด็นสำคัญที่ควรทราบดังนี้:

- หากการอัปเกรดของคุณเป็นการเปลี่ยนแปลงครั้งใหญ่ ให้คุณสร้างสร้างโปรเจกต์ใหม่ (เช่น `My SubQuery Project V2`) หรือให้คอมมูนิตี้ของคุณรับทราบถึงการเปลี่ยนแปลงมากมายผ่านช่องทางโซเชียลมีเดีย
- การ deploy โปรเจกต์ SubQuery เวอร์ชันใหม่ ส่งผลให้เกิดการ downtime เนื่องจากเวอร์ชันใหม่ต้องจัดทำดัชนีข้อมูล chain ทั้งหมดทั้งหมดจาก genesis block

## Deploy การเปลี่ยนแปลง

เข้าสู่ระบบ SubQuery Project และเลือกโปรเจกต์ที่คุณต้องการ deploy เวอร์ชันใหม่ คุณสามารถเลือกที่จะ deploy ไปยัง production slot หรือ staging slot ซึ่งทั้งสอง slot นี้มีสภาพแวดล้อมที่แยกจากกัน และต่างมีฐานข้อมูลของตัวเองรวมถึงมีการ sync ที่มีอิสระจากกัน

เราแนะนำให้คุณ deploy ไปยัง staging slot ของคุณสำหรับการทดสอบขั้นสุดท้ายเท่านั้น หรือเมื่อคุณต้องการ sync ข้อมูลโปรเจกต์ของคุณอีกครั้ง จากนั้นคุณสามารถปรับเป็นเวอร์ชัน production โดยไม่มี downtime You will find testing is faster when [running a project locally](../run_publish/run.md) as you can more [easily debug issues](../academy/tutorials_examples/debug-projects.md).

Staging slot เหมาะสำหรับ:

- การตรวจสอบการเปลี่ยนแปลงโปรเจกต์ SubQuery ในสภาพแวดล้อมที่แยกจากกัน Staging slot มี URL ที่แตกต่างไปจากการ production ที่คุณสามารถใช้ได้ใน dApps ของคุณ
- การวอร์มอัพและทำจัดทำดัชนีข้อมูลสำหรับโปรเจ็กต์ SubQuery ที่อัปเดต โดยไม่ต้องหยุดการทำงานของ dApp ของคุณ
- การเตรียมปล่อยเวอร์ชันใหม่สำหรับโปรเจกต์ SubQuery ของคุณโดยไม่เปิดเผยต่อสาธารณะ Staging slot จะไม่ปรากฏต่อสาธารณะใน Explorer และมี URL เฉพาะที่มองเห็นได้เฉพาะคุณเท่านั้น

![Staging slot](/assets/img/staging_slot.png)

#### อัปเกรด Indexer และ Query Service ล่าสุด

หากคุณต้องการอัปเกรด indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) หรือ query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) เป็นตัวล่าสุด เพื่อใช้ประโยชน์จากการปรับปรุงประสิทธิภาพและความเสถียร เพียงเลือกแพ็คเกจเวอร์ชันใหม่กว่าของเราแล้วบันทึก การอัปเกรดนี้จะทำให้เกิดการ downtime เพียงไม่กี่นาที

#### Deploy SubQuery Project เวอร์ชันใหม่ของคุณ

กรอก Commit Hash จาก GitHub (คัดลอก commit hash แบบเต็ม) ของโค้ดโปรเจกต์ SubQuery เวอร์ชั่นที่คุณต้องการ deploy การกรอก Commit Hash จาก GitHub จะทำให้มี downtime นานขึ้น ซึ่งขึ้นอยู่กับเวลาที่ใช้ในการจัดทำ index ข้อมูลของเชนปัจจุบัน คุณสามารถรายงาน progress ของคุณได้ที่นี่

## ขั้นตอนต่อไป - เชื่อมต่อกับโปรเจกต์ของคุณ

เมื่อการ deploy ของคุณเสร็จสมบูรณ์ และ โหนดของเราได้ทำจัดทำดัชนีข้อมูลของคุณจาก chain แล้ว คุณจะสามารถเชื่อมต่อกับโปรเจกต์ผ่าน GraphQL Query endpoint ที่ปรากฎขึ้นมา

![โปรเจกต์ที่กำลัง deploy และ sync](/assets/img/projects-deploy-sync.png)

หรือคุณสามารถคลิกที่จุดสามจุดถัดจากชื่อโปรเจกต์ของคุณ และดูบน SubQuery Explorer There you can use the in browser playground to get started - [read more about how to user our Explorer here](../run_publish/query.md).
