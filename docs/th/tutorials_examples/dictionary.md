# ดิกชันนารี่ของ SubQuery Network ทำงานอย่างไร?

แนวคิดทั้งหมดของโครงการพจนานุกรมทั่วไปคือ การจัดทำดัชนีข้อมูลทั้งหมดจากบล็อคเชนและบันทึก events, extrinsic ต่างๆ รวมถึงประเภทของมัน (ทั้ง module และ method) ในฐานข้อมูลโดยเรียงตาม block height โครงการอื่นสามารถสืบค้น endpoint ของ `network.dictionary` นี้แทนค่าเริ่มต้น `network.endpoint` ที่กำหนดไว้ในไฟล์ Manifest

ซึ่ง endpoint `network.dictionary` นี้เป็นพารามิเตอร์แบบไม่บังคับ ซึ่งถ้าหากมี endpoint นี้ SDK จะตรวจหาและใช้งานโดยอัตโนมัติ ส่วน `network.endpoint` นั้น จำเป็นต้องมี และหากไม่มี ก็จะไม่เกิดการทำงาน

ลองดูตัวอย่างโปรเจ็กต์ [SubQuery dictionary](https://github.com/subquery/subql-dictionary) ไฟล์ [ schema ](https://github.com/subquery/subql-dictionary/blob/main/schema.graphql) นั้นกำหนดเอนทิตี 3 รายการ ได้แก่ extrinsic, event และ specVersion โดยทั้ง 3 เอนทิตีนี้ จะประกอบด้วย 6, 4 และ 2 ฟิลด์ตามลำดับ เมื่อเรารันโปรเจ็กต์นี้ ฟิลด์เหล่านี้ก็จะแสดงออกมาให้เห็นในตารางฐานข้อมูล

![extrinsics table](/assets/img/extrinsics_table.png) ![events table](/assets/img/events_table.png) ![specversion table](/assets/img/specversion_table.png)

จากนั้น ข้อมูลจากบล็อคเชนจะถูกเก็บไว้ในตารางเหล่านี้และถูกนำไปทำเป็นดัชนีเพื่อให้มีประสิทธิภาพ แล้วโปรเจ็กก็จะอยู่ใน SubQuery Projects และ API endpoint นั้นก็พร้อมให้เพิ่มลงในไฟล์รายการ manifest

## คุณจะรวมดิกชันนารี่นี้ในโครงการของคุณได้อย่างไร?

เพิ่ม `dictionary: https://api.subquery.network/sq/subquery/dictionary-polkadot` ไปที่ส่วนเครือข่ายของรายการ เช่น:

```shell
network:
  endpoint: wss://polkadot.api.onfinality.io/public-ws
  dictionary: https://api.subquery.network/sq/subquery/dictionary-polkadot
```

## จะเกิดอะไรขึ้นเมื่อไม่ได้ใช้ดิกชันนารี่?

เมื่อไม่ได้ใช้ดิกชันนารี่ ตัวสร้างดัชนีจะดึงข้อมูลทุกบล็อกผ่าน polkadot api ตาม flag `batch-size` ซึ่งค่าเริ่มต้นเท่ากับ 100 แล้ววางไว้ในบัฟเฟอร์สำหรับการประมวลผล จากนั้น indexer จะนำบล็อกทั้งหมดเหล่านี้จากบัฟเฟอร์ และขณะที่ประมวลผลข้อมูลบล็อก ก็จะตรวจสอบว่า event และ extrinsic ในบล็อกเหล่านี้ตรงกับตัวกรองที่ผู้ใช้กำหนดหรือไม่

## จะเกิดอะไรขึ้นเมื่อมีการใช้ดิกชันนารี่?

When a dictionary IS used, the indexer will first take the call and event filters as parameters and merge this into a GraphQL query. It then uses the dictionary's API to obtain a list of relevant block heights only that contains the specific events and extrinsics. Often this is substantially less than 100 if the default is used.

For example, imagine a situation where you're indexing transfer events. Not all blocks have this event (in the image below there are no transfer events in blocks 3 and 4).

![dictionary block](/assets/img/dictionary_blocks.png)

The dictionary allows your project to skip this so rather than looking in each block for a transfer event, it skips to just blocks 1, 2, and 5. This is because the dictionary is a pre-computed reference to all calls and events in each block.

This means that using a dictionary can reduce the amount of data that the indexer obtains from the chain and reduce the number of “unwanted” blocks stored in the local buffer. But compared to the traditional method, it adds an additional step to get data from the dictionary’s API.

## When is a dictionary NOT useful?

When [block handlers](https://doc.subquery.network/create/mapping.html#block-handler) are used to grab data from a chain, every block needs to be processed. Therefore, using a dictionary in this case does not provide any advantage and the indexer will automatically switch to the default non-dictionary approach.

Also, when dealing with events or extrinsic that occur or exist in every block such as `timestamp.set`, using a dictionary will not offer any additional advantage.
