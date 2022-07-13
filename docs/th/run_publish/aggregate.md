# ฟังก์ชั่นการรวม

## ฟังก์ชั่นจัดกลุ่มโดย (GroupBy)

SubQuery รองรับฟังก์ชันการรวมขั้นสูงเพื่อให้คุณสามารถคำนวณชุดของค่าต่าง ๆ ในระหว่างการสืบค้นของคุณได้

โดยฟังก์ชันการรวมมักใช้กับฟังก์ชัน GroupBy ในการสืบค้น

ซึ่ง GroupBy นั้นจะช่วยให้คุณรับค่าที่แตกต่างกันอย่างรวดเร็วในชุดจาก SubQuery ในการสืบค้นเพียงครั้งเดียว

![Graphql Groupby](/assets/img/graphql_aggregation.png)

## ฟังก์ชั่นการรวมขั้นสูง

SubQuery มีฟังก์ชันการรวมต่อไปนี้เมื่ออยู่ในโหมดที่ไม่ปลอดภัย:

- `sum` (ใช้กับช่องตัวเลข) - ผลลัพธ์ของการเพิ่มค่าทั้งหมดเข้าด้วยกัน
- `distinctCount` (ใช้กับทุกช่อง) - การนับจำนวนค่าที่ไม่ซ้ำ
- `min` (ใช้กับช่องตัวเลข) - ค่าที่น้อยที่สุด
- `max` (ใช้กับช่องตัวเลข) - ค่าที่มากที่สุด
- `average` (ใช้กับช่องตัวเลข) - ค่าเฉลี่ย (ค่าเฉลี่ยเลขคณิต)
- `stddevSample` (ใช้กับช่องตัวเลข) - ค่าเบี่ยงเบนมาตรฐานตัวอย่าง
- `stddevPopulation` (ใช้กับช่องตัวเลข) - ค่าเบี่ยงเบนมาตรฐานประชากร
- `varianceSample` (ใช้กับช่องตัวเลข) - ความแปรปรวนตัวอย่าง
- `variancePopulation` (ใช้กับช่องตัวเลข) - ความแปรปรวนประชากร

SubQuery's implementation of aggregate functions is based on [pg-aggregates](https://github.com/graphile/pg-aggregates), you can find more information there.

::: warning Important Please note that you must enable the `--unsafe` flag on the query service in order to use these functions. [Read more](./references.md#unsafe-2).

Also, note that the `--unsafe` command will prevent your project from being run in the SubQuery Network, and you must contact support if you want this command to be run with your project in [SubQuery's managed service](https://project.subquery.network). :::
