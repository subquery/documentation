# คำสั่งต่างๆใน Command Line

## subql (cli)

### --help

```shell
> subql --help

คำสั่ง
  build     สร้างโค้ดโปรเจกต์	SubQuery นี้
  codegen   สร้าง schemas สำหรับโหนดกราฟ
  help      แสดงความช่วยเหลือสำหรับ subql
  init      เริ่มต้น scaffold โปรเจกต์ SubQuery
  migrate   โยกย้าย manifest ของโปรเจกต์ SubQuery v0.0.1 ถึง v0.2.0
  publish   อัปโหลดโปรเจกต์ SubQuery นี้ไปที่ IPFS
  validate  ตรวจสอบโฟลเดอร์หรือ github repo ว่าเป็น โปรเจกต์	 SubQuery ที่ถูกต้อง
```

### การสร้าง

คำสั่งนี้ใช้ webpack เพื่อสร้าง bundle ของโปรเจกต์ SubQuery

| ตัวเลือก           | คำอธิบาย                                                                                                       |
| ------------------ | -------------------------------------------------------------------------------------------------------------- |
| -l, --location     | โฟลเดอร์ภายในของโปรเจกต์ subquery (หากไม่ได้อยู่ในโฟลเดอร์อยู่แล้ว)                                            |
| -o, --output       | ระบุโฟลเดอร์ปลายทางของการสร้าง เช่น build-folder                                                               |
| --mode=(production | prod                                                        | development | dev) | [ ค่าเริ่มต้น: production ] |

- ด้วย `subql build` คุณสามารถระบุจุดเข้าใช้งานเพิ่มเติมได้ในช่อง exports ถึงแม้ว่าจะมีการสร้าง `index.ts` โดยอัตโนมัติเสมอ

- คุณต้องมี @subql/cli v0.19.0 ขึ้นไปเพื่อใช้ช่อง exports

- ช่อง `exports` ใดๆ ต้องแมปกับประเภทสตริง (เช่น `"entry": "./src/file.ts"`) มิฉะนั้นจะถูกละเว้นจากการสร้าง

[ตัวอย่างอื่น ๆ](https://doc.subquery.network/create/introduction/#build).

## subql-node

### --help

คำสั่งนี้จะแสดงตัวเลือกของความช่วยเหลือ

```shell
> subql-node --help
Options:
      --help                แสดงการช่วยเหลือ                                  [boolean]
      --version             แสดงหมายเลขเวอร์ชั่น                        [boolean]
  -f, --subquery            เส้นทางภายในของโปรเจกต์ subquery          [string]
      --subquery-name       ชื่อของโปรเจกต์ subquery  [deprecated] [string]
  -c, --config              ระบุไฟล์การตั้งค่า                  [string]
      --local               ใช้โหมด local                [deprecated] [boolean]
      --force-clean         บังคับการ clean database, เลิกโปรเจกต์ schemas
                            และตารางต่าง ๆ                                 [boolean]
      --db-schema           ชื่อ Db schema ของโปรเจ็ก               [string]
      --unsafe              อนุญาตให้มีการใช้โหมดบิวท์อินต่าง ๆ ภายใน 
                            sandbox                    [boolean][ค่าเริ่มต้น: false]
      --batch-size          Batch size ของบล็อกที่จะใช้ในหนึ่งรอบ [number]
      --scale-batch-size    ปรับขนาด batch size ตามการใช้หน่วยความจำ
                                                      [boolean] [ค่าเริ่มต้น: false]
      --timeout            กำหนดระยะเวลาสำหรับ indexer sandbox ในการใช้คำสั่ง mapping
                                                              [number]
      --debug               แสดงข้อมูลการ debug ไปยัง console output โดยจะ
                            บังคับให้มีการตั้งค่าเลเวล log เพื่อการ debug
                                                      [boolean] [ค่าเริ่มต้น: false]
      --profiler            แสดงข้อมูลตัวสร้างโปรไฟล์ไปยังเอาต์พุตคอนโซล
                                                      [boolean] [ค่าเริ่มต้น: false]
      --network-endpoint    Endpoint ของเครือข่ายบล็อกเชนเพื่อการเชื่อมต่อ      [string]
      --output-fmt          พิมพ์ log เป็น json หรือข้อความธรรมดา
                                           [string] [ตัวเลือก: "json", "colored"]
      --log-level           ระบุเลเวล log ที่จะพิมพ์ เพิกเฉยต่อคำสั่ง เมื่อมีการใช้ --debug
                           
          [string] [ตัวเลือก: "fatal", "error", "warn", "info", "debug", "trace",
                                                                       "silent"]
      --migrate             ย้าย db schema (สำหรับตารางการจัดการเท่านั้น)
                                                      [boolean] [ค่าเริ่มต้น: false]
      --timestamp-field     เปิด/ปิดการใช้ created_at และ updated_at ใน schema
                                                      [boolean] [ค่าเริ่มต้น: false]
  -d, --network-dictionary  ระบุ API พจนานุกรมสำหรับเครือข่ายนี้ [string]
  -m, --mmr-path            Local path ของไฟล์ merkle mountain range (.mmr)
                                                                        [string]
      --proof-of-index      เปิด/ปิดการใช้ proof of index
                                                      [boolean] [ค่าเริ่มต้น: false]
  -p, --port                พอร์ตที่บริการนี้เชื่อมต่อ           [number]
```

### --เวอร์ชัน

คำสั่งนี้แสดงเวอร์ชันปัจจุบัน

```shell
> subql-node --version
0.19.1
```

### -f, --subquery

ใช้ flag นี้เพื่อเริ่มการทำงานโปรเจ็ก SubQuery

```shell
subql-node -f . // หรือ
subql-node --subquery .
```

### --subquery-name (เลิกใช้แล้ว)

Flag นี้อนุญาตให้คุณระบุชื่อสำหรับโปรเจ็กของคุณ ซึ่งทำหน้าที่เสมือนว่าได้ทำการสร้าง instance ของโปรเจ็กของคุณ เมื่อมีการระบุชื่อใหม่ schema ของฐานข้อมูลใหม่จะถูกสร้างขึ้น และการซิงโครไนซ์บล็อกจะเริ่มต้นจากศูนย์ เลิกใช้ได้ด้วยคำสั่ง `--db-schema`

```shell
subql-node -f . --subquery-name=test2
```

### -c, --การตั้งค่า

การกำหนดค่าต่าง ๆ ทั้งหมดเหล่านี้สามารถทำได้ในไฟล์ .yml หรือ .json แล้วอ้างอิงด้วย config flag

ตัวอย่างไฟล์ subquery_config.yml

```shell
subquery: . // จำเป็นต้องมี นี่คือ local path ของโปรเจ็ก ซึ่งหมายถึงไดเร็กทอรีภายในเครื่องปัจจุบัน
ขื่อของโปรเจ็กการสืบค้นย่อย: hello // ชื่อเสริม (ไม่บังคับ)
ขนาด batch: 55 // การกำหนดค่าเสริม (ไม่บังคับ)
```

วางไฟล์นี้ในไดเร็กทอรีเดียวกันกับโปรเจ็ก จากนั้น ในไดเร็กทอรีโปรเจ็กปัจจุบัน ให้รัน:

```shell
> subql-node -c ./subquery_config.yml
```

### --local (เลิกใช้แล้ว)

Flag นี้ใช้เพื่อจุดประสงค์ในการ debug เป็นหลัก โดยจะสร้างตาราง starter_entity เริ่มต้นใน schema "postgres" ที่เป็นค่าเริ่มต้น

```shell
subql-node -f . --local
```

โปรดทราบว่าเมื่อคุณใช้ flag นี้ การลบ flag นี้ไม่ได้หมายความว่า flag นี้จะชี้ไปที่ฐานข้อมูลอื่น หากต้องการชี้ไปยังฐานข้อมูลอื่น คุณจะต้องสร้างฐานข้อมูลใหม่และเปลี่ยนการตั้งค่า env เป็นฐานข้อมูลใหม่ คือใช้ "export DB_DATABASE=<new_db_here>"

### --การบังคับคลีน

ใช้ flag นี้เพื่อบังคับให้ project schemas และ tables ถูกสร้างขึ้นใหม่ ซึ่งจะช่วยให้พัฒนา graphql schemas เหมือนเริ่มต้นโปรเจ็กใหม่และทำงานอยู่ใน clean state โปรดทราบว่า flag นี้จะลบข้อมูลที่ทำดัชนีไว้แล้วทั้งหมด

### --db-schema

Flag นี้อนุญาตให้คุณระบุชื่อสำหรับ schema ของฐานข้อมูลโปรเจ็ก เมื่อระบุชื่อใหม่ Schema ของฐานข้อมูลใหม่จะถูกสร้างขึ้นด้วยชื่อที่กำหนดค่าไว้และจะเริ่มต้นสร้างดัชนีบล็อก

```shell
subql-node -f . --db-schema=test2
```

### --โหมดไม่ปลอดภัย

โปรเจ็กต์ SubQuery มักจะทำงานใน javascript sandbox เพื่อความปลอดภัย โดยจะจำกัดขอบเขตของการเข้าถึงโปรเจ็กต์ในระบบของคุณ ซึ่ง sandbox จะจำกัดการนำเข้า javascript ที่พร้อมใช้งานไปยังโมดูลต่อไปนี้:

```javascript
["assert", "buffer", "crypto", "util", "path"];
```

แม้ว่าสิ่งนี้จะช่วยเพิ่มความปลอดภัย แต่เราก็เข้าใจดีว่า คำสั่งนี้จะจำกัดการทำงานที่มีอยู่ของ SubQuery ของคุณ คำสั่ง `--unsafe` จะนำเข้าโมดูล javascript เริ่มต้นทั้งหมด ซึ่งเพิ่มฟังก์ชันการทำงานของ sandbox อย่างมาก แลกกับความปลอดภัยที่ลดลง

**โปรดทราบว่าคำสั่ง `--unsafe` จะป้องกันไม่ให้โปรเจ็กต์ของคุณทำงานในเครือข่าย SubQuery และคุณต้องติดต่อฝ่ายสนับสนุน หากต้องการให้คำสั่งนี้รันกับโปรเจ็กต์ของคุณในบริการส่วนของ SubQuery ([project.subquery.network](https://project.subquery.network))**

### --batch-size

Flag นี้อนุญาตให้คุณตั้งค่าขนาด batch size ผ่าน command line หากมีการตั้งค่า batch size ในไฟล์ config ด้วย การดำเนินการนี้จะมีความสำคัญเหนือกว่า

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

### --scale-batch-size

ปรับขนาดชุดบล็อกดึงข้อมูลด้วยการใช้หน่วยความจำ

### --timeout

ตั้งค่า timeout แบบกำหนดเองสำหรับ javascript sandbox เพื่อเรียกใช้ฟังก์ชันการแมปบนบล็อก ก่อนที่ฟังก์ชันการแมปบล็อกจะส่งข้อยกเว้นของการ timeout ออก

### --debug

ข้อมูลนี้จะส่งออกข้อมูลการ debug ไปยังเอาต์พุตคอนโซลและบังคับตั้งค่าระดับ log เป็น debug

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### --profiler

ข้อมูลนี้แสดงข้อมูลตัวสร้างโปรไฟล์

```shell
subql-node -f . --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### --network-endpoint

Flag นี้อนุญาตให้ผู้ใช้แทนที่การกำหนดค่า endpoint ของเครือข่ายจากไฟล์ manifest

```shell
subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"
```

โปรดทราบว่าจะต้องตั้งค่านี้ในไฟล์ manifest ด้วย ไม่เช่นนั้น คุณจะได้รับ:

```shell
ERROR Create Subquery project from given path failed! Error: failed to parse project.yaml.
An instance of ProjectManifestImpl has failed the validation:
 - property network has failed the following constraints: isObject
 - property network.network has failed the following constraints: nestedValidation
```

### --output-fmt

มีรูปแบบเอาต์พุตของเทอร์มินัลสองแบบที่แตกต่างกัน JSON หรือ colored โดย colored จะเป็นค่าเริ่มต้นและมีข้อความแบบสี

```shell
> subql-node -f . --output-fmt=json
{"level":"info","timestamp":"2021-08-10T11:58:18.087Z","pid":24714,"hostname":"P.local","category":"fetch","message":"fetch block [10501,10600], total 100 blocks"}
```

```shell
> subql-node -f . --output-fmt=colored
2021-08-10T11:57:41.480Z <subql-node> INFO node started
(node:24707) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
2021-08-10T11:57:48.981Z <fetch> INFO fetch block [10201,10300], total 100 blocks
2021-08-10T11:57:51.862Z <fetch> INFO fetch block [10301,10400], total 100 blocks
```

### --log-level

จะมีตัวเลือก 7 อย่างให้เลือก ได้แก่ “fatal”, “error”, “warn”, “info”, “debug”, “trace”, “silent”. ซึ่งตัวอย่างด้านล่างจะแสดงผลของตัวเลือก silent โดยจะไม่มีการพิมพ์สิ่งใดในเทอร์มินัล ดังนั้นวิธีเดียวที่จะบอกได้ว่าโหนดทำงานหรือไม่คือการสืบค้นฐานข้อมูลสำหรับนับจำนวนแถว (select count(\*) from subquery_1.starter_entities) หรือการสืบค้น block height

```shell
> subql-node -f . --log-level=silent
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(Use `node --trace-warnings ...` to show where the warning was created)
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [DEP0152] DeprecationWarning: Custom PerformanceEntry accessors are deprecated. กรุณาใช้คุณสมบัติรายละเอียด (detail)
(node:24686) [PINODEP007] คำเตือน: เลิกใช้ bindings.level แล้ว ให้ใช้ตัวเลือก options.level แทน
```

<!-- ### --migrate TBA -->

### --timestamp-field

ค่าเริ่มต้น คือ true หากจะตั้งค่าเป็น false ใช้:

```shell
> subql-node -f . –timestamp-field=false
```

คำสั่งนี้จะลบคอลัมน์ created_at และ updated_at ในตาราง starter_entities

### -d, --network-dictionary

คำสั่งนี้ทำให้คุณสามารถระบุ dictionary endpoint ซึ่งเป็นบริการฟรีที่มีให้และโฮสต์ที่: [https://explorer.subquery.network/](https://explorer.subquery.network/) (ค้นหา dictionary) และ API endpoint ของ: https://api.subquery.network/sq/subquery/dictionary-polkadot

ปกติจะมีการตั้งค่านี้ในไฟล์ manifest ของคุณ แต่ด้านล่างจะเป็นการแสดงตัวอย่างการใช้แบบเป็น argument ใน command line

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

[อ่านเพิ่มเติมเกี่ยวกับวิธีการทำงานของ SubQuery Dictionary ได้ที่นี่](../tutorials_examples/dictionary.md)

### -p, --port

พอร์ตที่บริการการทำดัชนีแบบสอบถามย่อยผูกไว้ ค่าเริ่มต้นคือ `3000`

## subql-query

### --help

คำสั่งนี้จะแสดงตัวเลือกความช่วยเหลือ (help)

```shell
ตัวเลือก:
      --help        แสดงความช่วยเหลือ                                         [boolean]
      --version     แสดงหมายเลขเวอร์ชัน                                [boolean]
  -n, --name        ชื่อโปรเจ็ก                            [string] [required]
      --playground  เปิด graphql playground                          [boolean]
      --output-fmt  พิมพ์ log ในรูปแบบ json หรือ plain text
                      [string] [ตัวเลือก: "json", "colored"] [ค่าเริ่มต้น: "colored"]
      --log-level   ระบุ log level เพื่อพิมพ์
          [string] [ตัวเลือก: "fatal", "error", "warn", "info", "debug", "trace",
                                                     "silent"] [ค่าเริ่มต้น: "info"]
      --log-path    Path เพื่อสร้างไฟล์ log ได้แก่ /src/name.log          [string]
      --log-rotate  เปลี่ยนไฟล์ log ในไดเร็กทอรี่ที่ระบุด้วย log-path
                                                      [boolean] [ค่าเริ่มต้น: false]
      --indexer     Url ที่อนุญาตให้การเรียงข้อมูล สามารถเข้าถึง metadata ของ indexer  [string]
      --unsafe      Disable limits on query depth and allowable number returned
                    query records                                      [boolean]
  -p, --port        พอร์ทที่บริการนี้เชื่อมต่อ                   [number
```

### --version

คำสั่งนี้จะแสดงเวอร์ชันปัจจุบัน

```shell
> subql-query --version
0.7.0
```

### -n, --name

Flag นี้ใช้เพื่อเริ่มบริการเรียงข้อมูล หากไม่มีการตั้งค่าสถานะ --subquery-name เมื่อทำการรัน indexer ชื่อที่ปรากฎจะหมายถึงชื่อโปรเจ็กเริ่มต้น หากมีการตั้งค่า --subquery-name ชื่อที่นี่ควรตรงกับที่ตั้งไว้

```shell
> subql-node -f . // --subquery-name not set

> subql-query -n subql-helloworld  --playground // ชื่อที่เป็นค่าเริ่มต้นคือ ชื่อของ project directory
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground  // เป็นชื่อที่แสดงถึงโปรเจ็ก subql-helloworld แต่ใช้ชื่อว่า hiworld
```

### --playground

Flag นี้เป็นการเปิดใช้งาน graphql playground ดังนั้นควรใส่ไว้ตามค่าเริ่มต้นเสมอในทุกการใช้งาน

### --output-fmt

อ่าน [--output-fmt](https://doc.subquery.network/references/references.html#output-fmt)

### --log-level

อ่าน [--log-level](https://doc.subquery.network/references/references.html#log-level)

### --log-path

เปิดใช้งานการบันทึกไฟล์โดยระบุ path ไปยังไฟล์เพื่อเข้าสู่ระบบ

### --log-rotate

เปิดใช้งาน file log rotations ด้วยตัวเลือกช่วงการหมุน 1d สูงสุด 7 ไฟล์และขนาดไฟล์สูงสุด 1GB

### --indexer

ตั้งค่า Url ที่กำหนดเองสำหรับตำแหน่งของ endpoints ของ indexer โดยบริการจัดเรียงข้อมูลนี้จะใช้ endpoints เหล่านี้สำหรับการแสดงค่าสถานะ indexer metadata และความพร้อม

### --unsafe

บริการจัดเรียงข้อมูลมีขีดจำกัด 100 รายการสำหรับการสืบค้นที่ไม่ผูกกับ graphql Flag unsafe จะลบขีดจำกัดนี้ซึ่งอาจทำให้เกิดปัญหาด้านประสิทธิภาพในบริการสืบค้น จึงขอแนะนำว่า ให้ใช้ [ paginated ](https://graphql.org/learn/pagination/) แทน

Flag นี้ยังสามารถใช้เพื่อเปิดใช้งานฟังก์ชันการรวมบางอย่าง รวมถึง sum, max, avg และ [อื่น ๆ](https://github.com/graphile/pg-aggregates#aggregates)

สิ่งเหล่านี้ถูกปิดใช้งานโดยค่าเริ่มต้นเนื่องจากขีดจำกัดของเอนทิตี

**โปรดทราบว่า คำสั่ง `--unsafe` จะป้องกันไม่ให้โปรเจ็กของคุณทำงานในเครือข่าย SubQuery และคุณต้องติดต่อฝ่ายสนับสนุน หากต้องการให้คำสั่งนี้รันกับโปรเจ็กของคุณในบริการส่วนของ SubQuery [project.subquery.network](https://project.subquery.network)**

### --port

พอร์ตที่บริการการทำดัชนีแบบสอบถามย่อยผูกไว้ ซึ่งค่าเริ่มต้นคือ `3000`
