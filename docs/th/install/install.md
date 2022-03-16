# การติดตั้ง SubQuery

มันจะมีส่วนประกอบต่างๆ ที่จำเป็นในการสร้างโปรเจ็กต์ SubQuery,  [@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) ในการสร้างโปรเจ็กต์ SubQuery ส่วนประกอบ [@subql/node](https://github.com/subquery/subql/tree/docs-new-section/packages/node) ซึ่งจำเป็นสำหรับการรัน Indexer และชุดคำสั่ง [@subql/query](https://github.com/subquery/subql/tree/docs-new-section/packages/query) ซึ่งจำเป็นสำหรับการสร้าง Queries

## ติดตั้ง @subql/cli

เครื่องมือ [@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) ช่วยสร้างโครงร่างให้กับโครงการ ซึ่งหมายความว่าคุณไม่จำเป็นต้องเริ่มต้นใหม่ทั้งหมด

ติดตั้ง SubQuery CLI แบบ Global บนเทอร์มินัลของคุณโดยใช้ Yarn หรือ NPM:

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/cli ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/cli ``` </CodeGroupItem> </CodeGroup>

คุณสามารถรันคำสั่ง help เพื่อดู command ที่ใช้ได้รวมถึงการใช้งานด้วย CLI:

```shell
subql help
```
## ติดตั้ง @subql/node

โหนด SubQuery เป็นการ Implement ที่ดึงข้อมูลบล็อกเชนที่ใช้ Substrate จากโปรเจ็กต์ SubQuery และบันทึกลงในฐานข้อมูล Postgres

ติดตั้งโหนด SubQuery แบบ Global บนเทอร์มินัลของคุณโดยใช้ Yarn หรือ NPM:

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/node ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/node ``` </CodeGroupItem> </CodeGroup>

Once installed, you can can start a node with:

```shell
subql-node <command>
```
> หมายเหตุ: หากคุณใช้ Docker หรือคุณโฮสต์โปรเจ็กต์ของคุณใน SubQuery Projects คุณสามารถข้ามขั้นตอนนี้ได้ เนื่องจากมี SubQuery Node ให้ใน Docker Container และโครงสร้างพื้นฐานของโฮสต์อยู่แล้ว

## ติดตั้ง @subql/query

Text XPath: /p[4]/CodeGroup/p[3]/CodeGroup/text

ไลบรารี SubQuery query ให้บริการที่จะช่วยให้คุณสามารถ query โปรเจ็กต์ของคุณใน "playground"  environment ผ่านเบราว์เซอร์ของคุณ

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/query ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/query ``` </CodeGroupItem> </CodeGroup>

> หมายเหตุ: หากคุณใช้ Docker หรือโฮสต์โปรเจ็กต์ของคุณใน SubQuery Projects คุณสามารถข้ามขั้นตอนนี้ได้เช่นกัน เนื่องจากมี SubQuery Node ให้ใน Docker Container และโครงสร้างพื้นฐานของโฮสต์อยู่แล้ว 