# คำถามที่พบบ่อย

## SubQuery คืออะไร?

SubQuery เป็นโครงการโอเพ่นซอร์สที่ช่วยให้นักพัฒนาสามารถทำการ index เปลี่ยนแปลง และ สืบค้นข้อมูลของ Substrate chain เพื่อขับเคลื่อนแอปพลิเคชันของตนได้

SubQuery ยังให้บริการโฮสติ้งโปรเจ็กต์ระดับโปรดักชันฟรีสำหรับนักพัฒนา เพื่อลดภาระในการจัดการโครงสร้างพื้นฐาน และเปิดโอกาสให้นักพัฒนาได้ทำในสิ่งที่พวกเขาทำได้ดีที่สุด - นั่นคือ การสร้าง

## วิธีที่ดีที่สุดในการเริ่มต้นใช้งาน SubQuery คืออะไร?

วิธีที่ดีที่สุดในการเริ่มต้นใช้งาน SubQuery คือทดลองทำตาม [Hello World tutorial](/assets/pdf/Hello_World_Lab.pdf)  นี่คือขั้นตอนง่ายๆ ในการดาวน์โหลดเทมเพลตเริ่มต้น สร้างโครงการ จากนั้นใช้ Docker เพื่อเรียกใช้โหนดบน localhost ของคุณและรัน query อย่างง่าย

## ฉันจะมีส่วนร่วมหรือให้คำติชมกับ SubQuery ได้อย่างไร?

เรารักการมีส่วนร่วมและข้อเสนอแนะจากชุมชน ในการสนับสนุนโค้ด ให้ fork repository ที่สนใจ และทำการเปลี่ยนแปลง จากนั้นส่ง PR หรือ Pull Request อ้อ อย่าลืมทดสอบด้วยล่ะ! รวมถึงตรวจสอบแนวทางการสนับสนุน (TBA) ของเราด้วย

หากต้องการแสดงความคิดเห็น โปรดติดต่อเราที่ hello@subquery.network หรือไปที่ [discord ของเรา](https://discord.com/invite/78zg8aBSMG).

## การโฮสต์โปรเจ็กต์ของฉันใน SubQuery Projects มีค่าใช้จ่ายเท่าไหร่?

การโฮสต์โปรเจ็กต์ของคุณใน SubQuery Projects นั้นฟรี - นั่นเป็นวิธีการตอบแทนชุมชนของเรา หากต้องการเรียนรู้วิธีโฮสต์โปรเจกต์ของ โปรดดูบทแนะนำ [Hello World (SubQuery hosted)](../run_publish/publish.md)

## Deployment slots คืออะไร?

Deployment slots เป็นฟีเจอร์ใน [SubQuery Projects ](https://project.subquery.network) ซึ่งเทียบเท่ากับสภาพแวดล้อมสำหรับการพัฒนา ตัวอย่างเช่น ในองค์กรซอฟต์แวร์ใดๆ โดยปกติแล้ว อย่างน้อยควรจะมีสภาพแวดล้อมสำหรับการพัฒนา (development) และสภาพแวดล้อมสำหรับการผลิต (ไม่นับรวม localhost) โดยทั่วไปแล้วอาจจะมีสภาพแวดล้อมอื่นๆเพิ่มเติม เช่น การจัดเตรียม (staging) และก่อนการผลิต (pre-prod) หรือแม้กระทั่ง QA ก็อาจจะรวมอยู่ด้วย ขึ้นอยู่กับความต้องการและการตั้งค่ากระบวนการการพัฒนา

ปัจจุบัน SubQuery มีสองสล็อตที่พร้อมใช้งาน สลอตสำหรับ staging และสลอตสำหรับ production ซึ่งนี่จะช่วยให้นักพัฒนาสามารถ Deploy SubQuery ของตนกับ staging environment และเมื่อทุกอย่างเป็นไปด้วยดี ก็สามารถเข้าสุ่ production environment ได้เพียงคลิกปุ่มๆเดียว

## ข้อดีของ Staging slot คืออะไร?

ประโยชน์หลักของการใช้ Staging slot คือช่วยให้คุณสามารถเตรียม New release ของโปรเจ็กต์ SubQuery โดยที่ไม่ต้องเปิดเผยต่อสาธารณะ คุณสามารถรอให้ Staging slot ทำการ Index ข้อมูลทั้งหมดใหม่ก่อน โดยไม่กระทบต่อแอปพลิเคชันที่ใช้งานจริงของคุณ

The staging slot is not shown to the public in the [Explorer](https://explorer.subquery.network/) and has a unique URL that is visible only to you. And of course, the separate environment allows you to test your new code without affecting production.

## What are Polkadot's Extrinsics?

If you are already familiar with blockchain concepts, you can think of extrinsics as comparable to transactions. More formally though, an extrinsic is a piece of information that comes from outside the chain and is included in a block. There are three categories of extrinsics. They are inherents, signed transactions, and unsigned transactions.

Inherent extrinsics are pieces of information that are not signed and only inserted into a block by the block author.

Signed transaction extrinsics are transactions that contain a signature of the account that issued the transaction. They stands to pay a fee to have the transaction included on chain.

Unsigned transactions extrinsics are transactions that do not contain a signature of the account that issued the transaction. Unsigned transactions extrinsics should be used with care because there is nobody paying a fee, becaused they are not signed. Because of this, the transaction queue lacks economic logic to prevent spam.

For more information, click [here](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics).

## What is the endpoint for the Kusama network?

The network.endpoint for the Kusama network is `wss://kusama.api.onfinality.io/public-ws`.

## What is the endpoint for the Polkadot mainnet network?

The network.endpoint for the Polkadot network is `wss://polkadot.api.onfinality.io/public-ws`.

## How do I iteratively develop my project schema?

A known issue with developing a changing project schema is that when lauching your Subquery node for testing, the previously indexed blocks will be incompatible with your new schema. In order to iteratively develop schemas the indexed blocks stored in the database must be cleared, this can be achieved by launching your node with the `--force-clean` flag. For example:

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

Note that it is recommended to use `--force-clean` when changing the `startBlock` within the project manifest (`project.yaml`) in order to begin reindexing from the configured block. If `startBlock` is changed without a `--force-clean` of the project then the indexer will continue indexing with the previously configured `startBlock`.
