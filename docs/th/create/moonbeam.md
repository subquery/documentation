# การสนับสนุน EVM ของ Moonbeam

เรามีตัวประมวลผลแหล่งข้อมูลแบบกำหนดเองได้ สำหรับ EVM ของ Moonbeam และ Moonriver ซึ่งทำให้มีวิธีง่ายๆในการคัดกรองและจัดทำดัชนี ทั้งกิจกรรม EVM และ Substrate บนเครือข่ายของ Moonbeam ภายในโครงการ SubQuery เดียวเท่านั้น

เครือข่ายที่สนับสนุน:

| ชื่อเครือข่าย  | Endpoint ของ Websocket                             | Endpoint ของ Dictionary                                              |
| -------------- | -------------------------------------------------- | -------------------------------------------------------------------- |
| Moonbeam       | `wss://moonbeam.api.onfinality.io/public-ws`       | `https://api.subquery.network/sq/subquery/moonbeam-dictionary`       |
| Moonriver      | `wss://moonriver.api.onfinality.io/public-ws`      | `https://api.subquery.network/sq/subquery/moonriver-dictionary`      |
| Moonbase Alpha | `wss://moonbeam-alpha.api.onfinality.io/public-ws` | `https://api.subquery.network/sq/subquery/moonbase-alpha-dictionary` |

**คุณยังสามารถอ้างอิงถึง[โปรเจ็กต์ตัวอย่างของ Moonriver EVM แบบพื้นฐาน](https://github.com/subquery/tutorials-moonriver-evm-starter) ที่มี event handler และ call handler ด้วย** ซึ่งโปรเจ็กต์นี้โฮสต์อยู่ใน SubQuery Explorer แล้ว[ที่นี่](https://explorer.subquery.network/subquery/subquery/moonriver-evm-starter-project)

## เริ่มต้นใช้งาน

1. เพิ่มแหล่งข้อมูลที่กำหนดเอง ในรูปแบบ dependency `yarn add @subql/contract-processors`
2. เพิ่มแหล่งข้อมูลที่กำหนดเองตามที่อธิบายไว้ด้านล่าง
3. เพิ่มตัวจัดการ หรือ handle สำหรับแหล่งข้อมูลที่กำหนดเองให้กับโค้ดของคุณ

## ข้อมูลจำเพาะของแหล่งข้อมูล

| ฟิลด์             | ประเภท                                                         | จำเป็นต้องมี | คำอธิบาย                                   |
| ----------------- | -------------------------------------------------------------- | ------------ | ------------------------------------------ |
| processor.file    | `'./node_modules/@subql/contract-processors/dist/moonbeam.js'` | ใช่          | ไฟล์ที่อ้างอิงถึงโค้ดของตัวประมวลผลข้อมูล  |
| processor.options | [ProcessorOptions](#processor-options)                         | ไม่          | ตัวเลือกเฉพาะสำหรับโปรเซสเซอร์ของ Moonbeam |
| assets            | `{ [key: String]: { file: String }}`                           | ไม่          | เป้าหมายของไฟล์สินทรัพย์ภายนอก             |

### ตัวเลือกโปรเซสเซอร์

| ฟิลด์   | ประเภท           | จำเป็นต้องมี | คำอธิบาย                                                                                                     |
| ------- | ---------------- | ------------ | ------------------------------------------------------------------------------------------------------------ |
| abi     | String           | ไม่          | ABI ที่โปรเซสเซอร์ใช้เพื่อแยกวิเคราะห์ arguments ต้องเป็น key ของ`assets`                                    |
| address | String or `null` | ไม่          | แอดเดรสในสัญญา (contact address) ที่เกิดเหตุการณ์เป็น from หรือ call `null` จะจับการ call ในการสร้าง contact |

## MoonbeamCall

ทำงานในลักษณะเดียวกับ [substrate/CallHandler](../create/mapping/#call-handler) ยกเว้นมี handler argument ที่แตกต่างกันและมีการเปลี่ยนแปลงการคัดกรองเล็กน้อย

| ฟิลด์  | ประเภท                       | จำเป็นต้องมี | คำอธิบาย                          |
| ------ | ---------------------------- | ------------ | --------------------------------- |
| kind   | 'substrate/MoonbeamCall'     | ใช่          | ระบุว่านี่คือ handler ประเภท Call |
| filter | [Call Filter](#call-filters) | ไม่          | คัดกรองแหล่งข้อมูลเพื่อดำเนินการ  |

### Call Filters

| ฟิลด์    | ประเภท | ตัวอย่าง                                      | คำอธิบาย                                                                                                                                                                            |
| -------- | ------ | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| function | String | 0x095ea7b3, approve(address to,uint256 value) | เป็นได้ทั้งสตริง [Function Signature](https://docs.ethers.io/v5/api/utils/abi/fragments/#FunctionFragment) หรือฟังก์ชัน `sighash` เพื่อคัดกรองฟังก์ชันที่ called ในสัญญา (contract) |
| from     | String | 0x6bd193ee6d2104f14f94e2ca6efefae561a4334b    | แอดเดรส Ethereum ที่ส่งธุรกรรม                                                                                                                                                      |

### Handlers (ตัวดำเนินการ)

Handler นี้จะไม่เหมือนกับ handler ทั่วไป เนื่องจากคุณจะไม่ได้ `SubstrateExtrinsic` เป็นพารามิเตอร์ แต่คุณจะได้ `MoonbeamCall` ซึ่งอิงตามประเภท [TransactionResponse](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse) ของ Ethers แทน

การเปลี่ยนแปลงจากประเภท `TransactionResponse`:

- ไม่มีคุณสมบัติ `wait` และ `confirmations`
- คุณสมบัติ `success` ถูกเพิ่มในรายการเพื่อให้ทราบว่าการทำธุรกรรมประสบความสำเร็จหรือไม่
- `args` จะถูกเพิ่ม ถ้าหากมีการระบุในฟิลด์ `abi` และสามารถทำการ parse argument ได้สำเร็จ

## MoonbeamEvent

ทำงานในลักษณะเดียวกับ [substrate/CallHandler](../create/mapping/#event-handler) ยกเว้นมี handler argument ที่แตกต่างกันและมีการเปลี่ยนแปลงการคัดกรองเล็กน้อย

| ฟิลด์  | ประเภท                         | จำเป็นต้องมี | คำอธิบาย                           |
| ------ | ------------------------------ | ------------ | ---------------------------------- |
| kind   | 'substrate/MoonbeamEvent'      | ใช่          | ระบุว่านี่คือ handler ประเภท Event |
| filter | [Event Filter](#event-filters) | ไม่          | คัดกรองแหล่งข้อมูลเพื่อดำเนินการ   |

### Event Filters (การคัดกรองอีเว้นท์)

| ฟิลด์  | ประเภท       | ตัวอย่าง                                                        | คำอธิบาย                                                                                                                                           |
| ------ | ------------ | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| topics | String array | Transfer(address indexed from,address indexed to,uint256 value) | หัวข้อการคัดกรอง อ้างอิงตามการคัดกรอง log ของ Ethereum JSON-PRC โดยสามารถดูเอกสารเพิ่มเติมได้[ที่นี่](https://docs.ethers.io/v5/concepts/events/). |

<b>หมายเหตุ:</b>
มีการปรับปรุงสองสามอย่างจากการคัดกรอง log พื้นฐาน:

- หัวข้อไม่จำเป็นต้องมี pad เป็น 0
- [Event Fragment](https://docs.ethers.io/v5/api/utils/abi/fragments/#EventFragment) สามารถจัดเตรียมสตริงและแปลงเป็น id โดยอัตโนมัติ

### Handlers (ตัวดำเนินการ)

Handler นี้จะไม่เหมือนกับ handler ทั่วไป เนื่องจากคุณจะไม่ได้ `SubstrateEvent` เป็นพารามิเตอร์ แต่คุณจะได้ `MoonbeamEvent` ซึ่งอิงตามประเภทของ [Log](https://docs.ethers.io/v5/api/providers/types/#providers-Log) ของ Ethers แทน

การเปลี่ยนจากประเภท `Log`:

- `args` จะถูกเพิ่ม ถ้าหากมีการระบุในฟิลด์ `abi` และสามารถทำการ parse argument ได้สำเร็จ

## ตัวอย่างแหล่งข้อมูล

นี่คือการดึงข้อมูลจากไฟล์ Manifest `project.yaml`

```yaml
dataSources:
  - kind: substrate/Moonbeam
    startBlock: 752073
    processor:
      file: './node_modules/@subql/contract-processors/dist/moonbeam.js'
      options:
        # Must be a key of assets
        abi: erc20
        # Contract address (or recipient if transfer) to filter, if `null` should be for contract creation
        address: '0x6bd193ee6d2104f14f94e2ca6efefae561a4334b'
    assets:
      erc20:
        file: './erc20.abi.json'
    mapping:
      file: './dist/index.js'
      handlers:
        - handler: handleMoonriverEvent
          kind: substrate/MoonbeamEvent
          filter:
            topics:
              - Transfer(address indexed from,address indexed to,uint256 value)
        - handler: handleMoonriverCall
          kind: substrate/MoonbeamCall
          filter:
            ## The function can either be the function fragment or signature
            # function: '0x095ea7b3'
            # function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
            # function: approve(address,uint256)
            function: approve(address to,uint256 value)
            from: '0x6bd193ee6d2104f14f94e2ca6efefae561a4334b'
```

## ข้อจำกัดที่ทราบ

- ตอนนี้ยังไม่มีวิธีการทำ query สถานะ EVM ภายใน handler
- ไม่มีวิธีที่จะได้รับใบตอบรับการทำธุรกรรมกับ call handlers
- คุณสมบัติ `blockHash` ไม่ได้กำหนดไว้ในขณะนี้ คุณสามารถใช้คุณสมบัติ `blockNumber` แทนได้
