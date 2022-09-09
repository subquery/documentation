# คำถามที่พบบ่อย

## SubQuery คืออะไร?

SubQuery is an open source blockchain data indexer for developers that provides fast, flexible, reliable, and decentralised APIs to power leading multi-chain apps.

เป้าหมายของพวกเราคือการทำให้ นักพัฒนาได้ประหยัดเวลาและเงิน โดยการอำนวยสิ่งจำเป็นต่างๆในการทำ Indexing พวกเขาจะได้เอาเวลาไปม่งเน้นพัฒนา แอปพลิเคชั่น Subquery ได้ช่วยให้พัฒนาได้สร้างผลิตภัณฑ์กระจายศุนย์แห่งอนาคต

<figure class="video_container">
<iframe src="https://www.youtube.com/embed/gCpVz_mkWdo" title="Introducing The SubQuery Network" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscree="true"></iframe>
</figure>

**SubQuery Managed Service**

SubQuery also provides free, production grade hosting of projects for developers. Our Managed Service removes the responsiblity of managing infrastructure, so that developers do what they do best — build. ข้อมูลเพิ่มเติม [ที่นี่](/run_publish/publish.md)

**เครื่อข่าย SubQuery**

The SubQuery Network allows developers to completely decentralise their infrastructure stack. It is the most open, performant, reliable, and scalable data service for dApps. The SubQuery Network indexes and services data to the global community in an incentivised and verifiable way.  After publishing your project to the SubQuery Network, anyone can index and host it - providing data to users around the world faster and reliably.

ข้อมูลเพิ่มเติม [ที่นี่](/subquery_network/introduction.md).

## วิธีที่ดีที่สุดในการเริ่มต้นใช้งาน SubQuery คืออะไร?

วิธีที่ดีที่สุดในการเริ่มต้นใช้งาน SubQuery คือทดลองทำตาม [Hello World tutorial](/assets/pdf/Hello_World_Lab.pdf)  This is a simple 5 min walk through exercise. Download the starter template, build the project, use Docker to run a node on your localhost, and run a simple query.

## ฉันจะมีส่วนร่วมหรือให้คำติชมกับ SubQuery ได้อย่างไร?

เรารักการมีส่วนร่วมและข้อเสนอแนะจากชุมชน To contribute the code, fork the repository of your interest and make your changes. จากนั้นส่ง PR หรือ Pull Request อย่าลืมทดสอบด้วยนะ Also check out our <a href="http://localhost:8080/miscellaneous/contributing.html">contributions guidelines.</a>

หากต้องการแสดงความคิดเห็น โปรดติดต่อเราที่ hello@subquery.network หรือไปที่ [discord ของเรา](https://discord.com/invite/78zg8aBSMG).

## การโฮสต์โปรเจ็กต์ของฉันใน SubQuery Projects มีค่าใช้จ่ายเท่าไหร่?

This service is being provided to the community with a generous free tier! You can host your first two SubQuery projects for absolutely free!

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


## How can I optimise my project to speed it up?

Performance is a crucial factor in each project. Fortunately, there are several things you could do to improve it. Here is the list of some suggestions:

- Avoid using block handlers where possible.
- Query only necessary fields.
- Try to use filter conditions to reduce the response size. Create filters as specific as possible to avoid querying unnecessary data.
- For large data tables, avoid querying `totalCount` without adding conditions.
- Add indexes to entity fields for query performance, this is especially important for historical projects.
- Set the start block to when the contract was initialised.
- Always use a [dictionary](../tutorials_examples/dictionary.html#how-does-a-subquery-dictionary-work) (we can help create one for your new network).
- Optimise your schema design, keep it as simple as possible.
    - Try to reduce unnecessary fields and columns.
    - Create  indexes as needed.
- Use parallel/batch processing as often as possible.
    - Use `api.queryMulti()` to optimise Polkadot API calls inside mapping functions and query them in parallel. This is a faster way than a loop.
    - Use `Promise.all()`. In case of multiple async functions, it is better to execute them and resolve in parallel.
    - If you want to create a lot of entities within a single handler, you can use `store.bulkCreate(entityName: string, entities: Entity[])`. You can create them in parallel, no need to do this one by one.
- Making API calls to query state can be slow. You could try to minimise calls where possible and to use `extrinsic/transaction/event` data.
- Use `worker threads` to move block fetching and block processing into its own worker thread. It could speed up indexing by up to 4 times (depending on the particular project). You can easily enable it using the `-workers=<number>` flag. Note that the number of available CPU cores strictly limits the usage of worker threads. For now, it is only available for Substrate and Cosmos and will soon be integrated for Avalanche.
- Note that `JSON.stringify` doesn’t support native `BigInts`. Our logging library will do this internally if you attempt to log an object. We are looking at a workaround for this.
- Use a convenient `modulo` filter to run a handler only once to a specific block. This filter allows handling any given number of blocks, which is extremely useful for grouping and calculating data at a set interval. For instance, if modulo is set to 50, the block handler will run on every 50 blocks. It provides even more control over indexing data to developers and can be implemented like so below in your project manifest.