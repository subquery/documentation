# บทช่วยสอนและตัวอย่างต่าง ๆ

เราจะแสดงรายการบทช่วยสอนของเราและตัวอย่างต่าง ๆ ไว้ที่นี่ เพื่อช่วยให้คุณเริ่มต้นใช้งานได้ง่ายและรวดเร็วที่สุด

## บทช่วยสอน



## ตัวอย่างโปรเจคต่าง ๆ ของ SubQuery

| ตัวอย่าง                                                                                      | คำอธิบาย                                                                                                          | หัวข้อ                                                                                                                           |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [extrinsic-finalized-block](https://github.com/subquery/tutorials-extrinsic-finalised-blocks) | จัดทำดัชนีของ extrinsic ต่างๆ เพื่อให้สามารถสืบค้นได้ด้วยแฮช                                                      | ตัวอย่างที่ง่ายที่สุดซึ่งมีการใช้ฟังก์ชัน __block handler__                                                                      |
| [block-timestamp](https://github.com/subquery/tutorials-block-timestamp)                      | ดัชนีการบันทึกเวลาของแต่ละบล็อกที่สิ้นสุดแล้ว                                                                     | อีกหนึ่งตัวอย่างง่าย ๆ ของการใช้ฟังก์ชั่น __call handler__                                                                       |
| [validator-threshold](https://github.com/subquery/tutorials-validator-threshold)              | จัดทำดัชนีของจำนวนเงินขั้นต่ำในการ stake สำหรับ validator ที่จะถูกเลือก                                           | ฟังก์ชัน __block handler__ ที่ซับซ้อนยิ่งขึ้น ซึ่งทำการ__external calls__ไปยัง `@polkadot/api` เพื่อดูข้อมูลในเครือข่ายเพิ่มเติม |
| [sum-reward](https://github.com/subquery/tutorials-sum-reward)                                | จัดทำดัชนีของ staking bond, ผลตอบแทน และการลงโทษจาก event ต่าง ๆ ของบล็อกที่สิ้นสุดแล้ว                           | ฟังก์ชั่น __event handlers__ ที่ซับซ้อนยิ่งขึ้นด้วยความสัมพันธ์แบบ __one-to-many__                                               |
| [entity-relation](https://github.com/subquery/tutorials-entity-relations)                     | จัดทำดัชนีการโอนยอดคงเหลือระหว่างบัญชี รวมถึงจัดทำดัชนีชุดยูทิลิตี้ batchAll เพื่อค้นหาเนื้อหาของ extrinsic calls | ความสัมพันธ์ของ __One-to-many__ และ __many-to-many__ และ __extrinsic handling__ ที่ซับซ้อน                                       |
| [kitty](https://github.com/subquery/tutorials-kitty-chain)                                    | จัดทำดัชนีข้อมูลการเกิดของลูกแมว                                                                                  | __call handlers__ และ __event handlers__ ที่ซับซ้อน โดยมีการจัดทำดัชนีข้อมูลจาก __เครือข่ายที่กำหนดเอง__                         |
