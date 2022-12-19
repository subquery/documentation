# Subscriptions

## GraphQL Subscription คืออะไร

SubQuery ยังรองรับ Graphql Subscriptions อีกด้วย subscriptions สามารถให้คุณดึงข้อมูลออกมาได้, เช่นเดียวกับการ queries subscriptions ใช้การดำเนินการที่ยาวนานซึ่งผลลัพธ์สามารถเปลี่ยนแปลงได้ตลอดเวลา, ไม่เหมือนกับการ queries

การสมัครสมาชิกมีประโยชน์มากเมื่อคุณต้องการให้ client application ของคุณเปลี่ยนแปลงข้อมูลหรือแสดงข้อมูลใหม่บางอย่างทันทีที่การเปลี่ยนแปลงนั้นเกิดขึ้นหรือมีข้อมูลใหม่ Subscriptions allow you to _subscribe_ to your SubQuery project for changes.

::: tip Note Read more about [Subscriptions](https://www.apollographql.com/docs/react/data/subscriptions/). :::

## วิธีการสมัครสมาชิกให้กับ Entity

ตัวอย่างพื้นฐานของการใช้งาน GraphQL subscription จะได้รับแจ้งเตือนเมื่อมีการสร้าง entities ใหม่ ตัวอย่างต่อไปนี้ เราได้ทำการ subscribe `Transfer` ให้กับ entity และได้รับการอัพเดท เมื่อมีการเปลี่ยนแปลงข้อมูลในตาราง

คุณสามารถสร้างการสมัครสมาชิกโดยการ querying the GraphQL ปลายทางดังนี้ การเชื่อต่อของคุณจะรับการเปลี่ยนแปลงผ่าน `transfer` entity table

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

- `id`: Returns the ID of the entity that has changed.
- `mutation_type`: การปฏิบัติที่ทำกับเอนทิตีนี้ Mutation types can be either `INSERT`, `UPDATE` or `DELETE`.
- `_entity`: คุณค่าของตัวเอนทิตีเองในรูปแบบ JSON

## การคัดกรอง

เรายังรองรับการคัดกรองการสมัครรับข้อมูล ซึ่งหมายความว่าลูกค้าควรได้รับข้อมูลการสมัครสมาชิกเวอร์ชันที่อัปเดตแล้วเท่านั้นหากข้อมูลหรือการเปลี่ยนรูปแบบนั้นตรงตามเกณฑ์ที่กำหนด

มีตัวคัดกรองอยู่ 2 ประเภทที่พวกเรารองรับ

- `id` : การคัดกรองเพื่อแสดงเฉพาะการเปลี่ยนแปลงที่ส่งผลต่อเอนทิตีเฉพาะ (ถูกกำหนดโดย ID)
- `mutation_type`: เฉพาะประเภทการเปลี่ยนรูปแบบที่เหมือนกันเท่านั้นที่จะส่งคืนการอัปเดต

สมมุติในกรณีที่เรามี entity `Balances` และมันบันทึกยอดคงเหลือของแต่ละบัญชี

```graphql
type Balances {
  id: ID! # someone's account , eg. 15rb4HVycC1KLHsdaSdV1x2TJAmUkD7PhubmhL3PnGv7RiGY
  amount: Int! # the balance of this account
}
```

หากเราต้องการสมัครรับข้อมูลอัปเดตเกี่ยวกับยอดคงเหลือที่ส่งผลต่อบัญชีใดบัญชีหนึ่ง เราสามารถระบุตัวกรองการสมัครได้ดังนี้:

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

Note that the `mutation` filter can be one of `INSERT`, `UPDATE` or `DELETE`.

::: warning Important Please note that you must enable the `--subscription` flag on both the node and query service in order to use these functions. :::

::: warning Important
The subcription feature works on SubQuery's Managed Service when you directly call the listed GraphQL endpoint. มันจะไม่ทำงานภายในเบราว์เซอร์ GraphQL playground.
:::
