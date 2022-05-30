# Subscriptions

## GraphQL Subscription คืออะไร

SubQuery ยังรองรับ Graphql Subscriptions อีกด้วย subscriptions สามารถให้คุณดึงข้อมูลออกมาได้, เช่นเดียวกับการ queries subscriptions ใช้การดำเนินการที่ยาวนานซึ่งผลลัพธ์สามารถเปลี่ยนแปลงได้ตลอดเวลา, ไม่เหมือนกับการ queries

Subscriptions มีประโยชน์มากเมื่อคุณต้องการให้ client application ของคุณเปลี่ยนแปลงข้อมูลหรือแสดงข้อมูลใหม่บางอย่างทันทีที่มีการเปลี่ยนแปลงนั้นเกิดขึ้นหรือมีข้อมูลใหม่ Subscriptions อนุญาติให้คุณ *subscribe* to your SubQuery project for changes.

[อ่านเพิ่มเติมเกี่ยวกับ subscriptions ได้ที่นี่](https://www.apollographql.com/docs/react/data/subscriptions/)

## วิธีการ Subscribe ให้กับ Entity

ตัวอย่างพื้นฐานของการใช้งาน GraphQL subscription จะได้รับแจ้งเตือนเมื่อมีการสร้าง entities ใหม่ ตัวอย่างต่อไปนี้ เราได้ทำการ subscribe `Transfer` ให้กับ entity และได้รับการอัพเดท เมื่อมีการเปลี่ยนแปลงข้อมูลในตาราง

คุณสามารถสร้างการ subscription โดยการ querying the GraphQL endpoint as follows การเชื่อต่อของคุณจะรับการเปลี่ยนแปลงผ่าน `transfer` entity table

```graphql
subscription {
  transfer {
    id
    mutation_type
    _entity
  }
}
```

Body ของ entity ในขั้นตอนการ query จะแสดงให้เห็นถึงข้อมูลต่าง ๆ ที่คุณต้องการรับผ่านทาง subscription ของคุณ เมื่อตาราง `Transfer` ถูกอัพเดท:
- `id`: การส่งกลับ ID ของเอนทิตีที่เปลี่ยนแปลงไป
- `mutation_type`: การปฏิบัติที่ทำกับเอนทิตีนี้ ประเภทการเปลี่ยนรูปแบบอาจเป็น `INSERT`, `UPDATE` หรือ `DELETE`
- `_entity`: คุณค่าของตัวเอนทิตีเองในรูปแบบ JSON

## การคัดกรอง

เรายังรองรับการคัดกรองการสมัครรับข้อมูล ซึ่งหมายความว่าลูกค้าควรได้รับข้อมูลการสมัครสมาชิกเวอร์ชันที่อัปเดตแล้วเท่านั้นหากข้อมูลหรือการเปลี่ยนรูปแบบนั้นตรงตามเกณฑ์ที่กำหนด

มีตัวกรอง 2 ชนิดที่เราสนับสนุน

- `id` : การคัดกรองเพื่อแสดงเฉพาะการเปลี่ยนแปลงที่ส่งผลต่อเอนทิตีเฉพาะ (ถูกกำหนดโดย ID)
- `mutation_type`: เฉพาะประเภทการเปลี่ยนรูปแบบที่เหมือนกันเท่านั้นที่จะส่งคืนการอัปเดต

สมมติว่าเรามีหนึ่ง entity `Balances` และมันบันทึกยอดคงเหลือของแต่ละบัญชี

```graphql
type Balances {
  id: ID! # someone's account , eg. 15rb4HVycC1KLHsdaSdV1x2TJAmUkD7PhubmhL3PnGv7RiGY
  amount: Int! # the balance of this account
}
```

ถ้าเราต้องการที่จะติดตามการอัพเดทยอดคงเหลืออันใด ๆ ก็ตามที่มีผลต่อบัญชีโดยเฉพาะ เราจะสามารถระบุ ตัวกรองการ subscription ดังต่อไปนี้

```graphql
subscription {
  balances(
    id: "15rb4HVycC1KLHsdaSdV1x2TJAmUkD7PhubmhL3PnGv7RiGY"
    mutation: UPDATE
  ) {
    id
    mutation_type
    _entity
  }
}
```

โปรดทราบว่า `mutation` ฟิลเตอร์ สามารถเป็น หนึ่งใน `INSERT`, `UPDATE` or `DELETE`

**คุณต้องเปิดใช้งาน `--subscription` บน Node และ query service ถึงสมารถใช้งาน function นีได้**

คุณสมบัติการ subcription ทำงานบนบริการการจัดการของ SubQuery เมือคุณเรียกใช้ GraphQL endpoint ที่ลงทะเบียนไว้โดยตรง มันจะไม่ทำงานภายใต้ GraphQL playground บนบราวเซอร์
