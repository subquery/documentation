# การติดตั้ง SubQuery

There are various components required when creating a SubQuery project. มีส่วนประกอบต่างๆ ที่จำเป็นในการสร้างโปรเจ็กต์ SubQuery เครื่องมือ [@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) ใช้เพื่อสร้างโครงการ SubQuery จำเป็นต้องมีคอมโพเนนต์ [@subql/node](https://github.com/subquery/subql/tree/docs-new-section/packages/node) เพื่อรัน indexer จำเป็นต้องมีไลบรารี [@subql/query](https://github.com/subquery/subql/tree/docs-new-section/packages/query) เพื่อสร้างข้อความค้นหา The [@subql/node](https://github.com/subquery/subql/tree/docs-new-section/packages/node) component is required to run an indexer. The [@subql/query](https://github.com/subquery/subql/tree/docs-new-section/packages/query) library is required to generate queries.

## ติดตั้ง @subql/cli

เครื่องมือ [@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) ช่วยสร้างเฟรมเวิร์คโครงร่างให้กับโครงการ ซึ่งหมายความว่าคุณไม่จำเป็นต้องเริ่มต้นใหม่ทั้งหมด

ติดตั้ง SubQuery CLI แบบ global บนเทอร์มินัลของคุณโดยใช้ Yarn หรือ NPM:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn global add @subql/cli ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/cli ``` </CodeGroupItem> </CodeGroup>

จากนั้นคุณสามารถรัน help เพื่อดูคำสั่งและการใช้งานที่ CLI ให้มา:

```shell
subql help
```
## ติดตั้ง @subql/node

โหนด SubQuery เป็นการ implement ที่ดึงข้อมูลบล็อกเชนที่ใช้ substrate จากโปรเจ็กต์ SubQuery และบันทึกลงในฐานข้อมูล Postgres

ติดตั้งโหนด SubQuery แบบ global บนเทอร์มินัลของคุณโดยใช้ Yarn หรือ NPM:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn global add @subql/node ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/node ``` </CodeGroupItem> </CodeGroup>

เมื่อติดตั้งแล้ว คุณจะสามารถ start โหนดด้วย:

```shell
subql-node <command>
```
> หมายเหตุ: หากคุณใช้ Docker หรือคุณโฮสต์โปรเจ็กต์ของคุณใน SubQuery Projects คุณสามารถข้ามขั้นตอนนี้ได้ เนื่องจากมีโหนด SubQuery ให้ใน Docker container รวมถึงมีโครงสร้างพื้นฐานของโฮสต์ให้อยู่แล้ว This is because the SubQuery node is already provided in the Docker container and the hosting infrastructure.

## ติดตั้ง @subql/query

Text XPath: /p[4]/CodeGroup/p[3]/CodeGroup/text

ไลบรารี SubQuery query ให้บริการที่จะช่วยให้คุณสามารถ query โปรเจ็กต์ของคุณใน "playground"  environment ผ่านเบราว์เซอร์ของคุณ

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn global add @subql/query ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm install -g @subql/query ``` </CodeGroupItem> </CodeGroup>

> หมายเหตุ: หากคุณใช้ Docker หรือโฮสต์โปรเจ็กต์ของคุณใน SubQuery Projects คุณสามารถข้ามขั้นตอนนี้ได้เช่นกัน เนื่องจากมี SubQuery node ให้ใน Docker container และโครงสร้างพื้นฐานของโฮสต์อยู่แล้ว This is because the SubQuery node is already provided in the Docker container and the hosting infrastructure. 