# อธิบาย Hello World

In the [Hello World quick start guide](helloworld-localhost.md), we ran through some simple commands and very quickly got an example up and running. ใน [คู่มือเริ่มต้นฉบับย่อของ Hello World](helloworld-localhost.md) เราได้ใช้คำสั่งง่ายๆ และได้รับตัวอย่างแบบเร็วๆ วิธีนี้ช่วยให้คุณมั่นใจได้ว่าคุณมีข้อกำหนดเบื้องต้นทั้งหมดแล้ว และสามารถใช้ Playground ภายในเครื่องสำหรับ query อย่างง่าย เพื่อรับข้อมูลแรกของคุณจาก SubQuery ในที่นี้ เราจะพิจารณาให้ละเอียดยิ่งขึ้นว่าคำสั่งเหล่านั้นหมายถึงอะไร Here, we take a closer look at what all those commands mean.

## subql init

คำสั่งแรกที่เราเรียกใช้คือ `subql init --starter subqlHelloWorld`

This does the heavy lifting and creates a whole bunch of files for you. สิ่งนี้ช่วยจัดการส่วนงานที่หนัก และสร้างไฟล์ทั้งหมดให้คุณ ตามที่ระบุไว้ใน [เอกสารอย่างเป็นทางการ](quickstart.md#configure-and-build-the-starter-project) คุณจะต้องทำงานกับไฟล์ต่อไปนี้เป็นหลัก:

- Manifest ใน `project.yaml`
- GraphQL Schema ใน `schema.graphql`
- Mapping functions ในไดเรกทอรี `src/mappings/`

![ไฟล์ key subql](/assets/img/main_subql_files.png)

These files are the core of everything we do. As such, we'll dedicate more time to these files in another article. ไฟล์เหล่านี้เป็นส่วนหลักของทุกสิ่งที่เราทำ ดังนั้น เราจะจัดสรรเวลาให้กับไฟล์เหล่านี้มากขึ้นในบทความอื่นๆ ในตอนนี้ ให้รู้ว่า schema ประกอบด้วยคำอธิบายของข้อมูลที่ผู้ใช้สามารถ request ได้จาก SubQuery API, ไฟล์ yaml ของโครงการซึ่งมีพารามิเตอร์ประเภท "configuration" และแน่นอนว่ามี mappingHandlers ที่มี typescript ซึ่งมีฟังก์ชันสำหรับแปลงข้อมูล

## yarn install

The next thing we did was `yarn install`. สิ่งต่อไปที่เราทำคือ `yarn install` `npm install` ก็สามารถใช้ได้เช่นกัน

> A short history lesson. สรุปเรื่องราวความเป็นมาแบบสั้นๆ Node Package Manager หรือ npm เปิดตัวครั้งแรกในปี 2010 และเป็นตัวจัดการแพ็คเกจที่ได้รับความนิยมอย่างมากในหมู่นักพัฒนา JavaScript ซี่งมันเป็นแพ็คเกจเริ่มต้นที่ติดตั้งโดยอัตโนมัติทุกครั้งที่คุณติดตั้ง Node.js บนระบบของคุณ Yarn เปิดตัวครั้งแรกโดย Facebook ในปี 2559 โดยมีจุดประสงค์เพื่อแก้ไขข้อบกพร่องด้านประสิทธิภาพและความปลอดภัยบางประการในการทำงานกับ npm (ในขณะนั้น) It is the default package that is automatically installed whenever you install Node.js on your system. Yarn was initially released by Facebook in 2016 with the intention to address some of the performance and security shortcomings of working with npm (at that time).

What yarn does is look at the `package.json` file and download various other dependencies. สิ่งที่ yarn ทำคือดูที่ไฟล์ `package.json` และดาวน์โหลด dependencies อื่นๆ เมื่อดูที่ไฟล์ `package.json` ดูเหมือนว่าจะไม่ได้มี dependencies มากนัก แต่เมื่อคุณเรียกใช้คำสั่ง คุณจะสังเกตเห็นว่ามีการเพิ่มไฟล์เข้ามา 18,983 ไฟล์ เนื่องจากแต่ละ dependency จะมี dependencies ของตนเองด้วย This is because each dependency will also have its own dependencies.

![ไฟล์ key subql](/assets/img/dependencies.png)

## yarn codegen

Then we ran `yarn codegen` or `npm run-script codegen`. จากนั้นเราก็รัน `yarn codegen` หรือ `npm run-script codegen` สิ่งนี้เป็นการดึง schema ของ GraphQL (ใน `schema.graphql`) และสร้างไฟล์โมเดล typescript ที่เกี่ยวข้อง (ดังนั้น ไฟล์เอาต์พุตจะเป็นสกุล .ts) คุณไม่ควรเปลี่ยนไฟล์ที่สร้างขึ้นเหล่านี้ เพียงเปลี่ยนไฟล์ต้นทาง `schema.graphql` You should never change any of these generated files, only change the source `schema.graphql` file.

![ไฟล์ key subql](/assets/img/typescript.png)

## yarn build

จากนั้นรันคำสั่ง `yarn build` หรือ `npm run-script build` สิ่งนี้น่าจะเรื่องที่คุ้นเคยสำหรับโปรแกรมเมอร์ที่มีประสบการณ์ ซึ่งเป็นการสร้างโฟลเดอร์แบบกระจาย (distribution folder) สำหรับทำสิ่งต่างๆ เช่นการเพิ่มประสิทธิภาพโค้ดที่เตรียมสำหรับการ deploy This should be familiar for seasoned programmers. It creates a distribution folder performing things such as code optimisation preparing for a deployment.

![ไฟล์ key subql](/assets/img/distribution_folder.png)

## docker-compose

ขั้นตอนสุดท้ายคือการรวมคำสั่ง docker `docker-compose pull && docker-compose up` (สามารถเรียกใช้แยกกันได้) คำสั่ง `pull` จะดึงอิมเมจที่จำเป็นทั้งหมดจาก Docker Hub และคำสั่ง `up` จะเริ่มต้นการทำงานของคอนเทนเนอร์ The `pull` command grabs all the required images from Docker Hub and the `up` command starts the container.

```shell
> docker-compose pull
Pulling postgres        ... done
Pulling subquery-node   ... done
Pulling graphql-engine  ... done
```

เมื่อคอนเทนเนอร์เริ่มทำงาน คุณจะเห็นเทอร์มินัลแสดงข้อความจำนวนมากที่แสดงสถานะของโหนดและ GraphQL engine และเมื่อคุณเห็น: It's when you see:

```
subquery-node_1   | 2021-06-06T02:04:25.490Z <fetch> INFO fetch block [1, 100]
```

เป็นการบอกให้คุณรู้ว่าโหนด SubQuery ได้เริ่มการซิงโครไนซ์แล้ว

## สรุป

เมื่อคุณได้ทราบข้อมูลเชิงลึกเกี่ยวกับสิ่งที่เกิดขึ้นเบื้องหลังแล้ว คำถามก็คือ จะต้องดูที่ไหนต่อ? หากคุณรู้สึกมั่นใจ คุณสามารถเรียนรู้เกี่ยวกับวิธีการ[สร้างโปรเจ็กต์](../create/introduction.md)และเรียนรู้เพิ่มเติมเกี่ยวกับไฟล์หลักสามไฟล์ นั่นคือ ไฟล์ manifest, the GraphQL schema, และ ไฟล์ the mappings The manifest file, the GraphQL schema, and the mappings file.

นอกจากนี้ สามารถไปที่บทช่วยสอนของเรา ซึ่งจะดูว่าเราสามารถเรียกใช้ตัวอย่าง Hello World นี้บนโครงสร้างพื้นฐานที่โฮสต์บน SubQuery ได้อย่างไร เราจะดูการแก้ไขบล็อกเริ่มต้น และเราจะเจาะลึกถึงการรันโปรเจ็กต์ SubQuery โดยเรียกใช้จากสิ่งที่พร้อมใช้งาน และโปรเจ็กต์โอเพ่นซอร์สต่างๆ
