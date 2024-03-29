# การจำกัดความ

- โปรเจค SubQuery (_ที่ที่เวทมนตร์เกิดขึ้น_): คำจำกัดความ ([`@subql/cli`](https://www.npmjs.com/package/@subql/cli)) ของวิธีที่ SubQuery Node ควรสำรวจและรวมเครือข่ายของโปรเจกต์ และวิธีที่ข้อมูลควรแปลง และเก็บไว้เพื่อเปิดใช้งานการสืบค้น GraphQL ที่เป็นประโยชน์
- SubQuery Node (_ที่ซึ่งงานจะถูกทำให้เสร็จสิ้น_): แพ็คเกจ ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) ที่เป็นไปตามคำจำกัดความของโปรเจกต์ SubQuery และมีการรันโหนดซึ่งมีการจัดทำดัชนีของเครือข่ายที่เชื่อมต่อกับฐานข้อมูลอย่างต่อเนื่อง
- SubQuery Query Service (_ที่ซึ่งเราไปเอาข้อมูลมา_): แพ็คเกจ ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) ที่สื่อสารกับ GraphQL API ของโหนด SubQuery ที่ใช้เพื่อสืบค้นและดูข้อมูลในดัชนี
- GraphQL (_วิธีที่เราสืบค้นข้อมูล_): ภาษาที่ใช้สืบค้นสำหรับ API ซึ่งเหมาะสมและเจาะจงกับข้อมูลตามกราฟที่มีความยืดหยุ่น - ดูที่ [graphql.org](https://graphql.org/learn/)
