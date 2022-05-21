# คำถามที่พบบ่อย

## SubQuery คืออะไร?

SubQuery เป็นโปรเจ็กต์โอเพ่นซอร์ส ที่ช่วยให้นักพัฒนาสามารถทำการ index เปลี่ยนแปลง และสืบค้นข้อมูลของ Substrate chain เพื่อขับเคลื่อนแอปพลิเคชันของตนได้

SubQuery ยังให้บริการโฮสติ้งโปรเจ็กต์ระดับโปรดักชันฟรีสำหรับนักพัฒนา เพื่อลดความรับผิดชอบในการจัดการโครงสร้างพื้นฐาน และปล่อยให้นักพัฒนาได้ทำในสิ่งที่พวกเขาทำได้ดีที่สุด - นั่นคือ การสร้าง

## วิธีที่ดีที่สุดในการเริ่มต้นใช้งาน SubQuery คืออะไร?

วิธีที่ดีที่สุดในการเริ่มต้นใช้งาน SubQuery คือทดลองทำตาม [Hello World tutorial](../quickstart/helloworld-localhost.md) ของเรา นี่คือขั้นตอนง่ายๆ ซึ่งทำได้ใภายใน 5 นาที เริ่มจากการดาวน์โหลดเทมเพลตเริ่มต้น สร้างโปรเจ็กต์ จากนั้นใช้ Docker เพื่อเรียกใช้โหนดบน localhost ของคุณและทดลองรัน query พื้นฐานที่ไม่ซับซ้อน

## ฉันจะมีส่วนร่วมหรือให้คำติชมกับ SubQuery ได้อย่างไร?

เรารักการมีส่วนร่วมและข้อเสนอแนะจากชุมชน หากต้องการร่วมสนับสนุนโค้ด ให้ fork repository ที่สนใจ และทำการเปลี่ยนแปลงในส่วนที่คุณต้องการ จากนั้นส่ง PR หรือ Pull Request อ้อ อย่าลืมทดสอบด้วยล่ะ! รวมถึงตรวจสอบหลักเกณฑ์การสนับสนุน (TBA) ของเราด้วย

หากต้องการแสดงความคิดเห็น โปรดติดต่อเราที่ hello@subquery.network หรือไปที่ [discord ของเรา](https://discord.com/invite/78zg8aBSMG)

## การโฮสต์โปรเจ็กต์ของฉันใน SubQuery Projects มีค่าใช้จ่ายเท่าไหร่?

การโฮสต์โปรเจ็กต์ของคุณใน SubQuery Projects นั้นฟรี - นั่นเป็นวิธีการตอบแทนชุมชนของเรา หากต้องการเรียนรู้วิธีโฮสต์โครงการของคุณกับเรา โปรดดูบทแนะนำ [Hello World (SubQuery hosted)](../quickstart/helloworld-hosted.md)

## Deployment slots คืออะไร?

Deployment slots เป็นฟีเจอร์ใน [SubQuery Projects ](https://project.subquery.network) ซึ่งเทียบเท่ากับสภาพแวดล้อมสำหรับการพัฒนา ตัวอย่างเช่น ในองค์กรซอฟต์แวร์ใดๆ โดยปกติแล้ว อย่างน้อยควรจะมีสภาพแวดล้อมสำหรับการพัฒนา (development) และ สภาพแวดล้อมสำหรับการผลิต (production) (ไม่นับรวม localhost) โดยทั่วไปแล้วอาจจะมีสภาพแวดล้อมอื่นๆเพิ่มเติม เช่น การจัดเตรียม (staging) และก่อนการผลิต (pre-prod) หรือแม้กระทั่ง QA ก็อาจจะรวมอยู่ด้วย ขึ้นอยู่กับความต้องการขององค์กรและการตั้งค่ากระบวนการการพัฒนา

ปัจจุบัน SubQuery มีสอง slot ที่พร้อมใช้งาน คือ slot สำหรับ staging และ production ซึ่งนี่จะช่วยให้นักพัฒนาสามารถ deploy SubQuery ของตนกับ staging environment และเมื่อทุกอย่างเป็นไปด้วยดี ก็สามารถ "โปรโมตเป็น production" ได้เพียงคลิกปุ่มๆเดียว

## ข้อดีของ staging slot คืออะไร?

ประโยชน์หลักของการใช้ staging slot คือช่วยให้คุณสามารถเตรียม new release ของโปรเจ็กต์ SubQuery โดยที่ยังไม่ต้องเปิดเผยต่อสาธารณะ คุณสามารถรอให้ staging slot ทำการ index ข้อมูลทั้งหมดใหม่ก่อน โดยไม่กระทบต่อแอปพลิเคชันที่ใช้งานจริงของคุณ

Staging slot จะไม่แสดงต่อสาธารณะใน [Explorer](https://explorer.subquery.network/) และมี URL เฉพาะที่มองเห็นได้เฉพาะคุณเท่านั้น และแน่นอน สภาพแวดล้อมที่แยกจากกันทำให้คุณสามารถทดสอบโค้ดใหม่ได้โดยไม่กระทบต่อการใช้งานจริง

## Polkadot's Extrinsics คืออะไร

หากคุณคุ้นเคยกับบล็อคเชนอยู่แล้ว คุณสามารถเปรียบ extrinsics ได้กับธุรกรรม หรืออธิบายให้เป็นทางการมากขึ้น extrinsic เป็นส่วนของข้อมูลที่มาจากนอก chain และถูกรวมอยู่ในบล็อก โดย extrinsics มีสามประเภท ได้แก่ inherents, signed transactions และ unsigned transactions

Inherent extrinsics คือชิ้นส่วนของข้อมูลที่ไม่ได้ลงนาม และแทรกเข้าไปในบล็อกโดยผู้เขียนบล็อกเท่านั้น

Signed transaction extrinsics คือธุรกรรมที่มีลายเซ็นของบัญชีที่ออกธุรกรรม โดยพวกเขาพร้อมที่จะจ่ายค่าธรรมเนียมเพื่อให้ธุรกรรมรวมอยู่ใน chain

Unsigned transactions extrinsics คือธุรกรรมที่ไม่มีลายเซ็นของบัญชีที่ออกธุรกรรม Unsigned transactions extrinsics should be used with care because there is nobody paying a fee, becaused they are not signed. ด้วยเหตุนี้ คิวของธุรกรรมจึงขาดตรรกะทางเศรษฐศาสตร์ในการป้องกันการสแปม

สำหรับข้อมูลเพิ่มเติม คลิก [ที่นี่](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics)

## Endpoint สำหรับเครือข่าย Kusama คืออะไร?

network.endpoint สำหรับเครือข่าย Kusama คือ `wss://kusama.api.onfinality.io/public-ws`

## Endpoint สำหรับเครือข่าย Polkadot mainnet คืออะไร?

network.endpoint สำหรับเครือข่าย Polkadot คือ `wss://polkadot.api.onfinality.io/public-ws`

## ฉันจะพัฒนา Schema ของโปรเจคของฉันได้อย่างไร

ปัญหาที่เราทราบกับการพัฒนาและเปลี่ยนโปรเจ็กค์ schema คือเมื่อคุณเริ่มต้น Subquery node สำหรับทดสอบ ข้อมูลที่ทำ index แล้วจะเข้ากับ schema ใหม่ของคุณไม่ได้ ในการพัฒนา schemas ข้อมูล indexed block ที่ถูกเก็บไว้ในฐานข้อมูลจะถูกลบออก ในกระบวนการนี้สามารถทำได้โดยการเริ่มต้น node ของคุณด้วย flag `--force-clean` ยกตัวอย่างเช่น:

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

แนะนำว่าควรใช้ `--force-clean` เมื่อเปลี่ยน `startBlock` ที่อยู่ใน project manifest (`project.yaml`) เพื่มเริ่มต้นการทำ indexing ใหม่จาก block ที่ถูกตั้งค่าไว้ ถ้า `startBlock` ถูกเปลี่ยนโดยไม่ได้ใช้ `--force-clean` แล้วล่ะก็ indexer จะทำการ index ต่อจากค่า `startBlock` เดิม
