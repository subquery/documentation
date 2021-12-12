# คำถามที่พบบ่อย

## SubQuery คืออะไร?

SubQuery เป็นโปรเจ็กต์โอเพ่นซอร์สที่ช่วยให้นักพัฒนาสามารถทำการ index เปลี่ยนแปลง และสืบค้นข้อมูลเชนของ Substrate เพื่อขับเคลื่อนแอปพลิเคชันของตนได้

SubQuery ยังให้บริการโฮสติ้งโปรเจ็กต์ระดับโปรดักชันฟรีสำหรับนักพัฒนา เพื่อลดความรับผิดชอบในการจัดการโครงสร้างพื้นฐาน และปล่อยให้นักพัฒนาได้ทำในสิ่งที่พวกเขาทำได้ดีที่สุด - นั่นคือ การพัฒนาระบบ

## วิธีที่ดีที่สุดในการเริ่มต้นใช้งาน SubQuery คืออะไร?

The best way to get started with SubQuery is to try out our [Hello World tutorial](../quickstart/helloworld-localhost.md). วิธีที่ดีที่สุดในการเริ่มต้นใช้งาน SubQuery คือทดลองทำตาม [บทแนะนำ Hello World](../quickstart/helloworld-localhost.md) ของเรา นี่คือขั้นตอนง่ายๆในการดาวน์โหลดเทมเพลตเริ่มต้น สร้างโปรเจ็กต์ จากนั้นใช้ Docker เพื่อเรียกใช้โหนดบน localhost ของคุณและรัน query อย่างง่าย

## ฉันจะมีส่วนร่วมหรือให้คำติชมกับ SubQuery ได้อย่างไร?

We love contributions and feedback from the community. To contribute code, fork the repository of interest and make your changes. Then submit a PR or Pull Request. Oh, don't forget to test as well! รวมถึงตรวจสอบหลักเกณฑ์การสนับสนุน (TBA) ของเราด้วย

หากต้องการแสดงความคิดเห็น โปรดติดต่อเราที่ hello@subquery.network หรือไปที่ [ช่อง discord](https://discord.com/invite/78zg8aBSMG)

## การโฮสต์โปรเจ็กต์ของฉันใน SubQuery Projects มีค่าใช้จ่ายเท่าไหร่?

Hosting your project in SubQuery Projects is absolutely free - it's is our way of giving back to the community. การโฮสต์โปรเจ็กต์ของคุณใน SubQuery Projects นั้นฟรี - นั่นเป็นวิธีการตอบแทนชุมชนของเรา หากต้องการเรียนรู้วิธีโฮสต์โครงการของคุณกับเรา โปรดดูบทแนะนำ [Hello World (SubQuery hosted)](../quickstart/helloworld-hosted.md)

## Deployment slots คืออะไร?

Deployment slots เป็นฟีเจอร์ใน [SubQuery Projects ](https://project.subquery.network) ซึ่งเทียบเท่ากับสภาพแวดล้อมสำหรับการพัฒนา ตัวอย่างเช่น ในองค์กรซอฟต์แวร์ใดๆ โดยปกติจะมีสภาพแวดล้อมสำหรับการพัฒนาและสภาพแวดล้อมสำหรับการผลิตเป็นขั้นต่ำ (ไม่นับรวม localhost) โดยทั่วไปแล้วอาจจะมีสภาพแวดล้อมอื่นๆเพิ่มเติม เช่น การจัดเตรียมและก่อนการผลิต หรือแม้กระทั่ง QA จะรวมอยู่ด้วย ขึ้นอยู่กับความต้องการขององค์กรและการตั้งค่ากระบวนการการพัฒนา For example, in any software organisation there is normally a development environment and a production environment as a minimum (ignoring localhost that is). Typically additional environments such as staging and pre-prod or even QA are included depending on the needs of the organisation and their development set up.

SubQuery currently has two slots available. A staging slot and a production slot. SubQuery ปัจจุบันมีสอง slot ที่พร้อมใช้งาน คือ slot สำหรับ staging และ production ซึ่งช่วยให้นักพัฒนา deploy SubQuery ของตนกับ staging environment และเมื่อทุกอย่างเป็นไปด้วยดี ก็สามารถ"โปรโมตเป็น production" ได้เพียงคลิกปุ่ม

## ข้อดีของ staging slot คืออะไร?

ประโยชน์หลักของการใช้ staging slot คือช่วยให้คุณสามารถเตรียม new release ของโปรเจ็กต์ SubQuery โดยยังไม่ต้องเปิดเผยต่อสาธารณะ คุณสามารถรอให้ staging slot ทำการ index ข้อมูลทั้งหมดใหม่โดยไม่กระทบต่อแอปพลิเคชันที่ใช้งานจริงของคุณ You can wait for the staging slot to reindex all data without affecting your production applications.

Staging slot จะไม่แสดงต่อสาธารณะใน [Explorer](https://explorer.subquery.network/) และมี URL เฉพาะที่มองเห็นได้เฉพาะคุณเท่านั้น และแน่นอน สภาพแวดล้อมที่แยกจากกันทำให้คุณสามารถทดสอบโค้ดใหม่ได้โดยไม่กระทบต่อการใช้งานจริง And of course, the separate environment allows you to test your new code without affecting production.

## Extrinsics คืออะไร?

If you are already familiar with blockchain concepts, you can think of extrinsics as comparable to transactions. More formally though, an extrinsic is a piece of information that comes from outside the chain and is included in a block. There are three categories of extrinsics. They are inherents, signed transactions, and unsigned transactions.

Inherent extrinsics คือชิ้นส่วนของข้อมูลที่ไม่ได้ลงนามและแทรกเข้าไปในบล็อกโดยผู้เขียนบล็อกเท่านั้น

Signed transaction extrinsics คือธุรกรรมที่มีลายเซ็นของบัญชีที่ออกธุรกรรม พวกเขาพร้อมที่จะจ่ายค่าธรรมเนียมเพื่อให้ธุรกรรมรวมอยู่ใน chain They stands to pay a fee to have the transaction included on chain.

Unsigned transactions extrinsics are transactions that do not contain a signature of the account that issued the transaction. Unsigned transactions extrinsics  คือธุรกรรมที่ไม่มีลายเซ็นของบัญชีที่ออกธุรกรรม Unsigned transactions extrinsics ควรใช้ด้วยความระมัดระวังเพราะไม่มีใครจ่ายค่าธรรมเนียมเนื่องจากมีการลงนาม ด้วยเหตุนี้ คิวธุรกรรมจึงขาดตรรกะทางเศรษฐกิจในการป้องกันการสแปม Because of this, the transaction queue lacks economic logic to prevent spam.

สำหรับข้อมูลเพิ่มเติม คลิก [ที่นี่](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics)

## Endpoint  สำหรับเครือข่าย Kusama คืออะไร?

network.endpoint สำหรับเครือข่าย Kusama คือ `wss://kusama.api.onfinality.io/public-ws`

## Endpoint  สำหรับเครือข่าย Polkadot mainnet คืออะไร?

network.endpoint สำหรับเครือข่าย Polkadot คือ `wss://polkadot.api.onfinality.io/public-ws`

## How do I iteratively develop my project schema?

A known issue with developing a changing project schema is that when lauching your Subquery node for testing, the previously indexed blocks will be incompatible with your new schema. In order to iteratively develop schemas the indexed blocks stored in the database must be cleared, this can be achieved by launching your node with the `--force-clean` flag. For example:

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

Note that it is recommended to use `--force-clean` when changing the `startBlock` within the project manifest (`project.yaml`) in order to begin reindexing from the configured block. If `startBlock` is changed without a `--force-clean` of the project then the indexer will continue indexing with the previously configured `startBlock`.