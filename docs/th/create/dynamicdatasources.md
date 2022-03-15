# แหล่งข้อมูลแบบไดนามิก

มีหลายกรณีที่คุณไม่ทราบพารามิเตอร์ทั้งหมดสําหรับแหล่งข้อมูลเมื่อโครงการเริ่มต้น ตัวอย่างนี้คือการเชื่อมต่อดั้งเดิมที่จะสร้างการเชื่อมต่อใหม่ในภายหลัง เป็นไปไม่ได้เลยที่จะรู้ว่าการเชื่อมต่อใดจะระบุไว้ล่วงหน้าสำหรับเรื่องนี้ นี่คือจุดที่สามารถสร้างแหล่งข้อมูลใหม่แบบไดนามิกได้

## ฟิลด์`เทมเพลต`

ในการใช้แหล่งข้อมูลแบบไดนามิก คุณต้องมีเวอร์ชันข้อมูลเป็นอย่างน้อย `0.2.1` หากคุณใช้ `0.2.0` สิ่งที่คุณต้องทำคือเปลี่ยนเวอร์ชั่นข้อมูล หากคุณใช้เวอร์ชันที่ต่ำกว่า คุณควรอัปเดทเป็น `0.2.0` ก่อนด้วย `subql migrate`

เวอร์ชัน `0.2.1` แนะนำฟิลด์`เทมเพลต`ใหม่  เทมเพลตจะเหมือนกับแหล่งข้อมูลที่มีความแตกต่าง

* ระบบต้องการ `name` เพื่อระบุเทมเพลต
* `startBlock` ไม่จำเป็นอีกต่อไป สิ่งนี้จะถูกตั้งค่าเป็นบล็อกที่สร้างแหล่งข้อมูล
* ในกรณีของแหล่งข้อมูลที่กำหนดเอง ฟิลด์ `processor.options` สามารถกรอกข้อมูลได้เพียงบางส่วน ตัวเลือกที่เหลือจะได้รับเมื่อมีการสร้างอินสแตนซ์แหล่งข้อมูล

## ตัวอย่างโครงการ

วิธีที่ดีที่สุดในการแสดงวิธีใช้แหล่งข้อมูลแบบไดนามิกคือตัวอย่างต่อไปนี้

ตัวอย่างด้านล่างเป็นการแลกเปลี่ยนแบบกระจายอำนาจที่มีการเชื่อมต่อดั้งเดิมซึ่งปรับใช้การเชื่อมต่อใหม่เมื่อมีการเพิ่มการจับคู่การซื้อขาย เมื่อดำเนินโครงการแล้ว จะไม่สามารถทราบที่อยู่ของสัญญาคู่ซื้อขายทั้งหมดที่สร้างขึ้นหรือจะถูกสร้างขึ้น แหล่งข้อมูลสามารถสร้างไดนามิกโดยตัวจัดการการจับคู่จากเทมเพลตเพื่อจัดทำดัชนีสัญญาคู่การซื้อขายที่สร้างขึ้นใหม่


### `project.yaml`
```yaml
specVersion: 0.2.1
name: example-project
version: 1.0.0
description: ''
repository: ''
schema:
  file: ./schema.graphql
network:
  genesisHash: '0x91bc6e169807aaa54802737e1c504b2577d4fafedd5a02c10293b1cd60e39527'
  chaintypes:
    file: "./types.yaml"
dataSources:
  - kind: substrate/Moonbeam
    startBlock: 1358833
    processor:
      file: './node_modules/@subql/contract-processors/dist/moonbeam.js'
      options:
        abi: exchangeFactory
        address: '0x0000000000000000000000000000000000000000'
    assets:
      exchangeFactory:
        file: ./src/exchangeFactory.abi.json
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleNewTradingPair
          kind: substrate/MoonbeamEvent
          filter:
            topics:
              - newTradingPair(address exchange, address token1, address token2)

templates:
  - name: TradingPair
    kind: substrate/Moonbeam
    processor:
      file: './node_modules/@subql/contract-processors/dist/moonbeam.js'
      options:
        abi: tradingPair
        # we do not know the address at this point, it will be provided when instantiated
    assets:
      tradingPair:
        file: ./src/tradingPair.abi.json
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleLiquidityAdded
          kind: substrate/MoonbeamEvent
          filter:
            topics:
              - liquidityAdded(address provider, uint256 amount1, uint256 amount2)
 
Text
XPath: /pre/code
```

### `mappingHandlers.ts`

```ts
// ฟังก์ชั่นนี้ถูกกำหนดโดยใช้คำสั่ง `subql codegen` cli
import { createTradingPairDatasource } from '../types';
import {MoonbeamEvent} from '@subql/contract-processors/dist/moonbeam';

async function handleNewTradingPair(event: MoonbeamEvent): Promise<void> {
  const { exchange, token1, token2 } = event.args;

  // Create a new datasource providing the address of the trading pair exchange contract
  await createTradingPairDatasource({ address: exchange });
}

async function handleLiquidityAdded(event: MoonbeamEvent): Promise<void> {
  /* mapping fuction implementation here */
}
```


## การดูโครงการ แหล่งข้อมูลไดนามิก

รายละเอียดของข้อมูลแบบไดนามิก หากคุณต้องการดูรายละเอียดที่คุณสามารถสอบถามได้ด้านล่าง:

```gql
{
  _metadata {
    dynamicDatasources
  }
}
```

ผลลัพธ์
```
{
  "data": {
    "_metadata": {
      "dynamicDatasources": "[{\"templateName\":\"TradingPair\",\"args\":{\"address\":\"0x0000000000000000000000000000000000000000\"},\"startBlock\":1358833}]"
    }
  }
}
```

