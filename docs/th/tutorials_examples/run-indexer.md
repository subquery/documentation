# วิธีการรัน indexer node

## คู่มือวิดีโอ

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/QfNsR12ItnA" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## บทนำ

การรัน indexer node เป็นอีกตัวเลือกหนึ่งนอกเหนือจากการใช้ Docker หรือการโฮสต์โปรเจ็กต์ของคุณที่ [SubQuery Projects ](https://project.subquery.network/) ซึ่งต้องใช้เวลาและความพยายามมากขึ้น แต่จะช่วยเพิ่มความเข้าใจเกี่ยวกับวิธีการทำงานของ SubQuery เบื้องหลังให้กับคุณมากยิ่งขึ้น แม้จะต้องต้องใช้เวลาและความพยายามมากกว่า แต่การรันโหนดนี้จะช่วยให้คุณเข้าใจการทำงานของ SubQuery ในเบื้องลึกมากขึ้น

## Postgres

การรัน indexer node บนโครงสร้างพื้นฐานของคุณจะต้องมีการตั้งค่าฐานข้อมูล Postgres คุณสามารถติดตั้ง Postgres ได้[ที่นี่](https://www.postgresql.org/download/) และตรวจดูให้แน่ใจว่าเป็นเวอร์ชัน 12 ขึ้นไป You can install Postgres from [here](https://www.postgresql.org/download/) and ensure the version is 12 or greater.

## ติดตั้ง subql/node

จากนั้นให้ใช้คำสั่งต่อไปนี้เพื่อรันโหนด SubQuery:

```shell
npm install -g @subql/node
```

flag -g หมายถึงการติดตั้งแบบ global ซึ่งหมายถึงตำแหน่งจะเป็น /usr/local/lib/node_modules บน OSX

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

Of course, if you have different values for the above keys, please adjust accordingly. แน่นอนว่าหากคุณมีค่าที่ต่างออกไปสำหรับตัวแปรด้านบน โปรดปรับตามนั้น โปรดทราบว่าคำสั่ง `env` จะแสดง environment variables ปัจจุบัน และกระบวนการนี้จะทำตั้งค่าเหล่านี้เพียงชั่วคราวเท่านั้น นั่นคือใช้ได้เฉพาะในช่วงเวลาที่ใช้งานเทอร์มินัล หากต้องการตั้งค่าอย่างถาวร ให้เก็บค่าไว้ใน ~/bash_profile ของคุณแทน That is, they are only valid for the duration of the terminal session. To set them permanently, store them in your ~/bash_profile instead.

## การ Index โปรเจ็กต์

ในการเริ่มทำการ index โปรเจ็กต์ ให้ไปที่โฟลเดอร์โปรเจ็กต์ของคุณและรันคำสั่งต่อไปนี้:

```shell
subql-node -f .
```

หากคุณไม่มีโปรเจ็กต์ในการทำ, `git clone https://github.com/subquery/subql-helloworld` คุณจะเห็น indexer node เริ่มทำงานและเริ่มการ index บล็อก You should see the indexer node kick into life and start indexing blocks.

## การตรวจสอบ Postgres

หากคุณไปที่ Postgres คุณจะเห็นตารางที่สร้างขึ้นสองตาราง `public.subqueries` และ `subquery_1.starter_entities` `public.subqueries` and `subquery_1.starter_entities`.

`public.subqueries` มี 1 แถวเท่านั้นที่ indexer จะตรวจสอบเมื่อเริ่มต้นใช้งานในการ "เข้าใจในสถานะปัจจุบัน" เพื่อให้รู้ว่าจะดำเนินการต่อจากที่ใด ตาราง `starter_entities` เก็บการ index ต่างๆไว้ หากต้องการดูข้อมูล ให้เรียกใช้ `select (*) from subquery_1.starter_entities` The `starter_entities` table contains the indexes. To view the data, run `select (*) from subquery_1.starter_entities`.
