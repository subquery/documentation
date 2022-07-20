# คำถามที่พบบ่อย

## SubQuery คืออะไร?

SubQuery is an open source blockchain data indexer for developers that provides fast, flexible, reliable, and decentralised APIs to power leading multi-chain apps.

Our goal is to save developers' time and money by eliminating the need of building their own indexing solution. Now, they can fully focus on developing their applications. SubQuery helps developers create the decentralised products of the future.

<figure class="video_container">
<iframe src="https://www.youtube.com/embed/gCpVz_mkWdo" title="Introducing The SubQuery Network" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscree="true"></iframe>
</figure>

**SubQuery Managed Service**

SubQuery also provides free, production grade hosting of projects for developers. Our Managed Service removes the responsiblity of managing infrastructure, so that developers do what they do best — build. Find out more [here](/run_publish/publish.md).

**The SubQuery Network**

The SubQuery Network allows developers to completely decentralise their infrastructure stack. It is the most open, performant, reliable, and scalable data service for dApps. The SubQuery Network indexes and services data to the global community in an incentivised and verifiable way.  After publishing your project to the SubQuery Network, anyone can index and host it - providing data to users around the world faster and reliably.

More information [here](/subquery_network/introduction.md).

## วิธีที่ดีที่สุดในการเริ่มต้นใช้งาน SubQuery คืออะไร?

วิธีที่ดีที่สุดในการเริ่มต้นใช้งาน SubQuery คือทดลองทำตาม [Hello World tutorial](/assets/pdf/Hello_World_Lab.pdf)  This is a simple 5 min walk through exercise. Download the starter template, build the project, use Docker to run a node on your localhost, and run a simple query.

## ฉันจะมีส่วนร่วมหรือให้คำติชมกับ SubQuery ได้อย่างไร?

เรารักการมีส่วนร่วมและข้อเสนอแนะจากชุมชน To contribute the code, fork the repository of your interest and make your changes. จากนั้นส่ง PR หรือ Pull Request Don't forget to test as well. รวมถึงตรวจสอบแนวทางการสนับสนุน (TBA) ของเราด้วย

หากต้องการแสดงความคิดเห็น โปรดติดต่อเราที่ hello@subquery.network หรือไปที่ [discord ของเรา](https://discord.com/invite/78zg8aBSMG).

## การโฮสต์โปรเจ็กต์ของฉันใน SubQuery Projects มีค่าใช้จ่ายเท่าไหร่?

Hosting your project in SubQuery Projects is absolutely free — it is our way of giving back to the community. Please check out the [Hello World (SubQuery hosted)](../run_publish/publish.md) tutorial and learn how to host your project with us.

## Deployment slots คืออะไร?

Deployment slots เป็นฟีเจอร์ใน [SubQuery Projects ](https://project.subquery.network) ซึ่งเทียบเท่ากับสภาพแวดล้อมสำหรับการพัฒนา ตัวอย่างเช่น ในองค์กรซอฟต์แวร์ใดๆ โดยปกติแล้ว อย่างน้อยควรจะมีสภาพแวดล้อมสำหรับการพัฒนา (development) และสภาพแวดล้อมสำหรับการผลิต (ไม่นับรวม localhost) โดยทั่วไปแล้วอาจจะมีสภาพแวดล้อมอื่นๆเพิ่มเติม เช่น การจัดเตรียม (staging) และก่อนการผลิต (pre-prod) หรือแม้กระทั่ง QA ก็อาจจะรวมอยู่ด้วย ขึ้นอยู่กับความต้องการและการตั้งค่ากระบวนการการพัฒนา

ปัจจุบัน SubQuery มีสองสล็อตที่พร้อมใช้งาน สลอตสำหรับ staging และสลอตสำหรับ production ซึ่งนี่จะช่วยให้นักพัฒนาสามารถ Deploy SubQuery ของตนกับ staging environment และเมื่อทุกอย่างเป็นไปด้วยดี ก็สามารถเข้าสุ่ production environment ได้เพียงคลิกปุ่มๆเดียว

## ข้อดีของ Staging slot คืออะไร?

ประโยชน์หลักของการใช้ Staging slot คือช่วยให้คุณสามารถเตรียม New release ของโปรเจ็กต์ SubQuery โดยที่ไม่ต้องเปิดเผยต่อสาธารณะ คุณสามารถรอให้ Staging slot ทำการ Index ข้อมูลทั้งหมดใหม่ก่อน โดยไม่กระทบต่อแอปพลิเคชันที่ใช้งานจริงของคุณ

Staging slot จะไม่แสดงต่อสาธารณะใน [Explorer](https://explorer.subquery.network/) และมี URL ที่มองเห็นได้เฉพาะคุณเท่านั้น และแน่นอน สภาพแวดล้อมที่แยกจากกันทำให้คุณสามารถทดสอบโค้ดใหม่ได้โดยไม่กระทบต่อการใช้งานจริง

## Polkadot's Extrinsics คืออะไร

หากคุณคุ้นเคยกับบล็อคเชนอยู่แล้ว คุณสามารถเปรียบ Extrinsics ได้กับธุรกรรม หรืออธิบายให้เป็นทางการมากขึ้น extrinsic เป็นส่วนของข้อมูลที่มาจากนอก chain และถูกรวมอยู่ในบล็อก โดย Extrinsics มีทั้งหมดสามประเภท ได้แก่ inherents, signed transactions และ unsigned transactions

Inherent extrinsics คือชิ้นส่วนของข้อมูลที่ไม่ได้ถูก signed และแทรกเข้าไปในบล็อกโดยผู้เขียนบล็อกเท่านั้น

Signed transaction extrinsics คือธุรกรรมที่มีลายเซ็นของบัญชีที่ออกธุรกรรม โดยพวกเขาพร้อมที่จะจ่ายค่าธรรมเนียมเพื่อให้ธุรกรรมรวมอยู่ใน chain

Unsigned transactions extrinsics คือธุรกรรมที่ไม่มีลายเซ็นของบัญชีที่ออกธุรกรรม Unsigned transactions extrinsics ควรถูกใช้อย่างระมัดระวัง เนื่องจากไม่มีใครจ่ายค่าธรรมเนียม เพราะธุรกรรมไม่ได้ถูกลงนาม (signed) ด้วยเหตุนี้ คิวของธุรกรรมจึงขาดตรรกะทางเศรษฐศาสตร์ในการป้องกันการสแปม

สำหรับข้อมูลเพิ่มเติม คลิก [ที่นี่](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics)

## Endpoint สำหรับเครือข่าย Kusama คืออะไร?

network.endpoint สำหรับเครือข่าย Kusama คือ `wss://kusama.api.onfinality.io/public-ws`

## Endpoint สำหรับเครือข่าย Polkadot mainnet คืออะไร?

network.endpoint สำหรับเครือข่าย Polkadot คือ `wss://polkadot.api.onfinality.io/public-ws`

## ฉันจะพัฒนา Schema ของโปรเจกต์ของฉันได้อย่างไร

ปัญหาที่เราทราบกับการพัฒนาและเปลี่ยนโปรเจกค์ Schema คือเมื่อคุณเริ่มต้น Subquery node สำหรับทดสอบ ข้อมูลที่ทำ Index แล้วจะเข้ากับ Schema ใหม่ของคุณไม่ได้ ในการพัฒนา Schemas ข้อมูล Indexed block ที่ถูกเก็บไว้ในฐานข้อมูลจะต้องถูกลบออก โดยทำได้จากการเริ่มต้น node ของคุณด้วย flag `--force-clean` ยกตัวอย่างเช่น:

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

แนะนำว่าควรใช้ `--force-clean` เมื่อเปลี่ยน `startBlock` ที่อยู่ใน Project manifest (`project.yaml`) เพื่มเริ่มต้นการทำ Indexing ใหม่จาก Block ที่ถูกตั้งค่าไว้ If `startBlock` is changed without a `--force-clean` of the project, then the indexer will continue indexing with the previously configured `startBlock`.
