# วิธีการรัน indexer node

## คู่มือวิดีโอ

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/QfNsR12ItnA" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## บทนำ

การรัน indexer node เป็นอีกตัวเลือกหนึ่งนอกเหนือจากการใช้ Docker หรือการโฮสต์โปรเจ็กต์ของคุณที่ [SubQuery Projects ](https://project.subquery.network/) ซึ่งต้องใช้เวลาและความพยายามมากขึ้น แต่จะช่วยเพิ่มความเข้าใจเกี่ยวกับวิธีการทำงานของ SubQuery เบื้องหลังให้กับคุณมากยิ่งขึ้น

## Postgres

การรัน indexer node บนโครงสร้างพื้นฐานของคุณจะต้องมีการตั้งค่าฐานข้อมูล Postgres คุณสามารถติดตั้ง Postgres ได้ คุณสามารถติดตั้ง Postgres ได้ [ที่นี่](https://www.postgresql.org/download/) และตรวจดูให้แน่ใจว่าเป็นเวอร์ชัน 12 ขึ้นไป

## ติดตั้ง subql/node

จากนั้นให้ใช้คำสั่งต่อไปนี้เพื่อรันโหนด SubQuery:

```shell
npm install -g @subql/node
```

คำสั่ง -g หมายถึงการติดตั้งแบบ global ซึ่งหมายถึงตำแหน่งจะเป็น /usr/local/lib/node_modules บน OSX

เมื่อติดตั้งแล้ว คุณสามารถตรวจสอบเวอร์ชันได้โดยการรัน:

```shell
> subql-node --version
0.19.1
```

## การตั้งค่า DB

จากนั้น คุณต้องตั้งค่า environmental variables ต่อไปนี้:

```shell
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
```

แน่นอนว่าหากคุณมีค่าที่ต่างออกไปสำหรับตัวแปรด้านบน โปรดปรับตามนั้น โปรดคำนึงไว้ว่าคำสั่ง `env` จะแสดงผล environment variables ที่ต้ังไว้ในขณะนี้ และนี่เป็นกระบวนการที่จะตั้งค่าเหล่านี้แค่ชั่วคราว กล่าวคือ ตัวแปรเหล่านี้จะใช้ได้ในเฉพาะช่วง session ของ terminal นั้นเท่านั้น หากต้องการตั้งค่าถาวร ต้องเก็บการตั้งค่าไว้ใน ~/.bash_profile แทน

## การ Index โปรเจ็กต์

ในการเริ่มทำการ index โปรเจ็กต์ ให้ไปที่โฟลเดอร์โปรเจ็กต์ของคุณและรันคำสั่งต่อไปนี้:

```shell
subql-node -f .
```

หากคุณไม่มีโปรเจ็กต์ในการทำให้รันคำสั่ง `git clone https://github.com/subquery/subql-helloworld` คุณจะเห็น indexer node เริ่มทำงานและเริ่มการ index บล็อก

## การตรวจสอบ Postgres

หากคุณไปที่ Postgres คุณจะเห็นตารางที่สร้างขึ้นสองตาราง `public.subqueries` และ `subquery_1.starter_entities`

`public.subqueries` มี 1 แถวเท่านั้นที่ indexer จะตรวจสอบเมื่อเริ่มต้นใช้งานในการ "เข้าใจในสถานะปัจจุบัน" เพื่อให้รู้ว่าจะดำเนินการต่อจากที่ใด ตาราง `starter_entities` เก็บการ index ต่างๆไว้ หากต้องการดูข้อมูล ให้เรียกใช้ `select (*) from subquery_1.starter_entities`
