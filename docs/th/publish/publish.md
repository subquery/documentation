# เผยแพร่โปรเจกต์ SubQuery ของคุณ

## ประโยชน์ในการโฮสต์โปรเจกต์ของคุณกับ SubQuery

- เราจะรันโปรเจกต์ SubQuery ให้กับคุณด้วยบริการที่มีประสิทธิภาพสูง สามารถปรับขนาดได้ และมีการจัดการแบบบริการสาธารณะ
- บริการนี้มอบให้กับคอมมูนิตี้ฟรี!
- คุณสามารถกำหนดให้โปรเจกต์ของคุณเป็นแบบสาธารณะเพื่อให้ลิสต์อยู่ใน [SubQuery Explorer](https://explorer.subquery.network) และทุกคนทั่วโลกสามารถดูได้
- เราผสานรวมกับ GitHub ดังนั้นทุกคนใน GitHub organisations ของคุณจะสามารถดูโปรเจกต์ขององค์กรที่ใช้ร่วมกันได้

## สร้างโปรเจกต์แรกของคุณใน SubQuery Projects

### Project Codebase Hosting

มีสองวิธีที่คุณจะสามารถโฮสต์โปรเจกต์ SubQuery ของคุณก่อนทำการเผยแพร่

**GitHub**: โปรเจกต์ของคุณต้องอยู่ใน GitHub repository แบบสาธารณะ

**IPFS**: โปรเจกต์ของคุณสามารถจัดเก็บอยู่ในรูปแบบ IPFS, คุณสามารถดูคู่มือสำหรับการโฮสต์ IPFS ได้ที่ [การเผยแพร่แบบ IPFS](ipfs.md)

### เข้าสู่ระบบ SubQuery Projects

ก่อนจะเริ่มต้น ตรวจสอบให้แน่ใจว่าโปรเจกต์ SubQuery ออนไลน์อยู่บน GitHub repository สาธารณะ หรืออยู่บน IPFS เรียบร้อยแล้ว ไฟล์ `schema.graphql` จะต้องอยู่ในไดเรกทอรีเริ่มต้นของคุณ

การเริ่มต้นสร้างโปรเจกต์แรกของคุณ ให้ไปที่ [project.subquery.network](https://project.subquery.network). คุณจำเป็นต้องอนุญาตการเข้าถึงบัญชี GitHub ของคุณเพื่อเข้าสู่ระบบ

ในการเข้าสู่ระบบครั้งแรก คุณจะถูกขออนุญาตการเข้าถึงโดย SubQuery เราต้องการเพียงที่อยู่อีเมลเพื่อระบุบัญชีของคุณ และเราไม่ใช้ข้อมูลอื่น ๆ จากบัญชี GitHub ของคุณเพื่อเหตุผลอื่น ๆ ในขั้นตอนนี้ คุณยังสามารถขอ หรือให้สิทธิ์ในการเข้าถึงบัญชี GitHub Organization ของคุณ เพื่อโพสต์ โปรเจกต์ SubQuery ภายใต้ GitHub Organization แทนที่จะเป็นบัญชีส่วนตัวของคุณ

![เพิกถอนการอนุมัติจากบัญชี GitHub](/assets/img/project_auth_request.png)

โปรเจกต์ SubQuery คือที่ที่คุณสามารถจัดการทุกโฮสต์โปรเจกต์ที่คุณอัพโหลดไปที่แพลตฟอร์ม SubQuery คุณสามารถสร้าง ลบ และอัปเกรด ทุกโปรเจกต์จากแอปพลิเคชันนี้

![Projects Login](/assets/img/projects-dashboard.png)

ถ้าคุณมีบัญชี GitHub Organization ที่เชื่อมต่อแล้ว คุณสามารถใช้ switcher ที่อยู่ด้านบนเพื่อเปลี่ยนระหว่างบัญชีส่วนตัวและบัญชี GitHub Organization ของคุณ โปรเจ็กต์ที่สร้างในบัญชี GitHub Organization สามารถแบ่งปันกันระหว่างสมาชิกภายในองค์กรได้ ในการเชื่อมต่อบัญชี GitHub Organization [คุณสามารถทำตามขั้นนี้](#add-github-organization-account-to-subquery-projects)

![สลับระหว่างบัญชี GitHub](/assets/img/projects-account-switcher.png)

### สร้างโปรเจกต์แรกของคุณ

เริ่มต้นด้วยการคลิกที่ "Create Project" คุณจะถูกนำไปที่แบบฟอร์มการสร้างโปรเจกต์ใหม่ กรุณากรอกข้อมูลตามนี้ (สามารถเปลี่ยนแปลงได้ในอนาคต):

- **บัญชี GitHub:** หากคุณมีบัญชี GitHub มากกว่าหนึ่งบัญชี ให้เลือกบัญชีที่จะใช้สร้างโปรเจ็กต์นี้ โปรเจกต์ที่สร้างในบัญชี GitHub organisation สามารถแบ่งปันกันระหว่างสมาชิกภายในองค์กรได้
- **ชื่อโปรเจกต์**
- **ชื่อรอง (Subtitle)**
- **คำอธิบาย**
- **GitHub Repository URL:** ต้องเป็น GitHub URL ที่ใช้งานได้ซึ่งชี้ไปยัง repository สาธารณะที่มีโปรเจกต์ SubQuery ของคุณ ไฟล์ `schema.graphql` ต้องอยู่ในไดเร็กทอรีเริ่มต้นของคุณ ([เรียนรู้เพิ่มเติมเกี่ยวกับโครงสร้างไดเร็กทอรี](../create/introduction.md#directory-structure))
- **ฐานข้อมูล:** ลูกค้าระดับพรีเมียมสามารถเข้าถึงฐานข้อมูลเฉพาะเพื่อโฮสต์โปรเจกต์ SubQuery หากคุณสนใจ คุณสามารถติดต่อ [sales@subquery.network](mailto:sales@subquery.network) เพื่อเปิดการตั้งค่านี้
- **Deployment Source:** คุณสามารถเลือกที่จะปรับใช้โปรเจกต์จาก GitHub repository หรือปรับใช้จาก IPFS CID ดูคำแนะนำของเราเกี่ยวกับ [การโฮสต์กับ IPFS.](ipfs.md)
- **ซ่อนโปรเจกต์:** หากเลือก จะเป็นการซ่อนจาก SubQuery explorer สาธารณะ อย่าเลือกตัวเลือกนี้ หากคุณต้องการแบ่งปัน SubQuery ของคุณแก่คอมมูนิตี้! ![สร้างโปรเจกต์แรกของคุณ](/assets/img/projects-create.png)

สร้างโปรเจกต์ของคุณ แล้วคุณจะเห็นบนรายการของโปรเจกต์ SubQuery _เราเกือบจะถึงแล้ว! เราแค่ต้องทำการปรับใช้เป็นเวอร์ชันใหม่_

![สร้างโปรเจกต์โดยไม่มีการ deploy](/assets/img/projects-no-deployment.png)

### Deploy เวอร์ชันแรกของคุณ

ขณะสร้างโปรเจกต์จะมีการตั้งค่าลักษณะการแสดงผลของโปรเจ็กต์ คุณต้องปรับใช้เวอร์ชันของโปรเจกต์ก่อนที่จะดำเนินการได้ การปรับใช้เวอร์ชันจะทริกเกอร์การทำ SubQuery indexing ใหม่ให้เริ่มต้น และทำการตั้งค่า query service ที่จำเป็นเพื่อเริ่มยอมรับคำขอของ GraphQL คุณยังสามารถ deploy โปรเจกต์เวอร์ชันใหม่บนนี้ได้

ที่โปรเจกต์ใหม่ของคุณ คุณจะเห็นปุ่ม Deploy New Version ให้กดคลิกที่นั้น และกรอกข้อมูลที่จำเป็นเกี่ยวกับการ deploy:

- **หมวดย่อย:** จาก GitHub เลือกหมวดย่อยของโปรเจกต์ที่คุณต้องการที่จะ deploy
- **Commit Hash:** จาก GitHub เลือกคอมมิตเฉพาะเวอร์ชันของ codebase โปรเจกต์ SubQuery ของคุณที่คุณต้องการ deploy
- **IPFS:** ถ้าการ deploy จาก IPFS วาง IPFS deployment CID ของคุณ (โดยไม่ต้องใช้ `ipfs://`)
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here
- **Indexer Version:** คือเวอร์ชันของ node service ของ SubQuery ที่คุณต้องการรัน SubQuery ดูได้ที่ [`@subql/node`](https://www.npmjs.com/package/@subql/node)
- **Query Version:** คือเวอร์ชันของ query service ของ SubQuery ที่คุณต้องการรัน SubQuery ดูได้ที่ [`@subql/query`](https://www.npmjs.com/package/@subql/query)

![Deploy โปรเจกต์แรกของคุณ](https://static.subquery.network/media/projects/projects-first-deployment.png)

หาก deploy ได้สำเร็จ คุณจะเห็น indexer เริ่มทำงานและรายงานความคืบหน้าในการทำ indexing ของ chain ในปัจจุบัน ขั้นตอนนี้อาจใช้เวลาระยะเวลาจนกว่าจะถึง 100%

## ขั้นตอนต่อไป - เชื่อมต่อกับโปรเจกต์ของคุณ

เมื่อการ deploy ของคุณเสร็จสมบูรณ์ และโหนดของเราได้ทำการ index ข้อมูลของคุณจาก chain แล้ว คุณจะสามารถเชื่อมต่อกับโปรเจกต์ผ่าน GraphQL Query endpoint ที่ปรากฎขึ้นมา

![โปรเจกต์ที่กำลัง deploy และ sync แล้ว](/assets/img/projects-deploy-sync.png)

หรือคุณสามารถคลิกที่จุดสามจุดถัดจากชื่อโปรเจกต์ของคุณ แล้วดูใน SubQuery Explorer ซึ่งคุณสามารถใช้ Playground ในเบราว์เซอร์เพื่อเริ่มต้นได้ - [อ่านเพิ่มเติมเกี่ยวกับวิธีใช้ Explorer ของเราที่นี่](../query/query.md)

![โปรเจกต์ใน SubQuery Explorer](/assets/img/projects-explorer.png)

## เพิ่มบัญชี GitHub Organization ในโปรเจกต์ SubQuery

เป็นเรื่องปกติที่จะเผยแพร่โปรเจ็กต์ SubQuery ภายใต้ชื่อบัญชี GitHub Organization ของคุณ แทนที่จะเป็นบัญชี GitHub ส่วนตัว คุณสามารถเปลี่ยนบัญชีที่เลือกในปัจจุบันของคุณใน [SubQuery Projects](https://project.subquery.network) ได้ทุกเมื่อโดยใช้ account switcher

![สลับระหว่างบัญชี GitHub](/assets/img/projects-account-switcher.png)

หากคุณไม่เห็นบัญชี GitHub Organization ของคุณที่แสดงใน switcher คุณอาจต้องให้สิทธิ์การเข้าถึง SubQuery สำหรับ GitHub Organization ของคุณ (หรือขอจากผู้ดูแลระบบ) ในการดำเนินการนี้ คุณจะต้องเพิกถอนการอนุญาตจากบัญชี GitHub ของคุณกับแอปพลิเคชัน SubQuery ก่อน ในการดำเนินการนี้ ให้เข้าสู่ระบบการตั้งค่าบัญชีของคุณใน GitHub ไปที่ Applications และภายใต้แท็บ Authorized OAuth Apps ให้เพิกถอน SubQuery - [คุณสามารถทำตามขั้นตอนแบบละเอียดได้ที่นี่](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth) **อย่ากังวล การดำเนินการนี้จะไม่ลบโปรเจ็กต์ SubQuery ของคุณและคุณจะไม่สูญเสียข้อมูลใดๆ**

![เพิกถอนการเข้าถึงบัญชี GitHub](/assets/img/project_auth_revoke.png)

เมื่อคุณเพิกถอนการเข้าถึงแล้ว ให้ออกจากระบบ [SubQuery Projects](https://project.subquery.network) และกลับเข้าสู่ระบบใหม่อีกครั้ง คุณจะเข้าไปยังหน้าที่ชื่อว่า _Authorize SubQuery_ ซึ่งคุณสามารถขอหรือให้สิทธิ์การเข้าถึง SubQuery กับบัญชี GitHub Organization ของคุณ หากคุณไม่มีสิทธิ์ของผู้ดูแลระบบ คุณต้องขอผู้ดูแลระบบเพื่อเปิดใช้งานสิ่งนี้ให้กับคุณ

![เพิกถอนการอนุมัติจากบัญชี GitHub](/assets/img/project_auth_request.png)

เมื่อคำขอนี้ได้รับการอนุมัติจากผู้ดูแลระบบของคุณ (หรือหากสามารถให้สิทธิ์เองได้) คุณจะเห็นบัญชี GitHub Organization ที่ถูกต้องใน account switcher
