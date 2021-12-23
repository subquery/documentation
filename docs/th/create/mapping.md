# การทำ Mapping

ฟังก์ชัน Map นั้นช่วยกำหนดวิธีการแปลงข้อมูลเครือข่ายเป็นเอนทิตี GraphQL ที่เหมาะสม ซึ่งเราได้กำหนดไว้แล้วในไฟล์ `schema.graphql`

- การ Map นั้นได้ถูกกำหนดไว้ในไดเรกทอรี่ `src/mappings` และถูก export ออกมาเป็นฟังก์ชั่น
- การ map เหล่านี้จะถูก export ใน `src/index.ts` ด้วย
- ไฟล์การ map มีการอ้างอิงใน `project.yaml` ภายใต้ตัวจัดการการแมป (mapping handlers)

ฟังก์ชั่น map นั้นมีอยู่ 3 คลาส ได้แก่ [Block handlers](#block-handler), [Event Handlers](#event-handler) และ [Call Handlers](#call-handler)

## Block Handler

คุณสามารถใช้ block handler ต่าง ๆ เพื่อเก็บข้อมูลทุกครั้งที่มีการแนบบล็อกใหม่เข้ากับเครือข่าย Substrate เช่น หมายเลขบล็อก ซึ่งทำได้โดย BlockHandler ที่ถูกกำหนดไว้แล้ว จะถูกเรียกขึ้นมา 1 ครั้งในทุก ๆ บล็อก

```ts
import {SubstrateBlock} from "@subql/types";

export async function handleBlock(block: SubstrateBlock): Promise<void> {
    // Create a new StarterEntity with the block hash as it's ID
    const record = new starterEntity(block.block.header.hash.toString());
    record.field1 = block.block.header.number.toNumber();
    await record.save();
}
```

[SubstrateBlock](https://github.com/OnFinality-io/subql/blob/a5ab06526dcffe5912206973583669c7f5b9fdc9/packages/types/src/interfaces.ts#L16) เป็นอินเทอร์เฟซแบบเพิ่มเติมของ [signedBlock](https://polkadot.js.org/docs/api/cookbook/blocks/) แต่ยังรวมถึง `specVersion` และ `timestamp` ด้วย

## Event Handler

คุณสามารถใช้ event handler ต่าง ๆ ในการเก็บข้อมูล เมื่อมี event นั้น ๆ ในบล็อกใหม่ event ต่าง ๆ ที่เป็นส่วนหนึ่งของค่าเริ่มต้นของรันไทม์ Substrate และบล็อก อาจมีหลาย event ก็ได้

ในระหว่างการประมวลผล event handler จะได้รับ substrate event เป็น argument ที่มีอินพุตและเอาต์พุตที่พิมพ์แล้วของ event นั้น ๆ ซึ่งไม่ว่าจะเป็น event ประเภทใด ก็จะทริกเกอร์ให้มีการทำ map ทำให้สามารถบันทึกกิจกรรมที่มีแหล่งข้อมูลได้ คุณควรใช้ [ตัวกรองการ map ](./manifest.md#mapping-filters)ในไฟล์รายการ เในการคัดกรอง event เพื่อลดเวลาที่ใช้ในการจัดทำดัชนีข้อมูลและปรับปรุงประสิทธิภาพการทำ map ให้เพิ่มมากขึ้น

```ts
import {SubstrateEvent} from "@subql/types";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, balance]}} = event;
    // Retrieve the record by its ID
    const record = new starterEntity(event.extrinsic.block.block.header.hash.toString());
    record.field2 = account.toString();
    record.field3 = (balance as Balance).toBigInt();
    await record.save();
```

[SubstrateEvent](https://github.com/OnFinality-io/subql/blob/a5ab06526dcffe5912206973583669c7f5b9fdc9/packages/types/src/interfaces.ts#L30) เป็นอินเทอร์เฟซแบบเพิ่มเติมของ [EventRecord](https://github.com/polkadot-js/api/blob/f0ce53f5a5e1e5a77cc01bf7f9ddb7fcf8546d11/packages/types/src/interfaces/system/types.ts#L149) นอกจากข้อมูล event แล้ว ยังมี `id` (บล็อกที่เป็นของ event นี้) และ extrinsic ที่อยู่ภายในบล็อกนี้ด้วย

## Call Handler

Call handler ต่าง ๆ จะใช้เมื่อคุณต้องการบันทึกข้อมูลเกี่ยวกับ substrate extrinsic นั้นๆ

```ts
export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    const record = new starterEntity(extrinsic.block.block.header.hash.toString());
    record.field4 = extrinsic.block.timestamp;
    await record.save();
}
```

[SubstrateExtrinsic](https://github.com/OnFinality-io/subql/blob/a5ab06526dcffe5912206973583669c7f5b9fdc9/packages/types/src/interfaces.ts#L21) เป็นส่วนที่ไปขยาย [GenericExtrinsic](https://github.com/polkadot-js/api/blob/a9c9fb5769dec7ada8612d6068cf69de04aa15ed/packages/types/src/extrinsic/Extrinsic.ts#L170) มันถูกกำหนด `id` (บล็อกที่ extrinsic นี้อยู่) และให้คุณสมบัติ extrinsic นั้น ๆ ที่ช่วยขยาย event ต่าง ๆ ระหว่างบล็อกนี้ นอกจากนี้ มันยังทำการบันทึกสถานะความสำเร็จของ extrinsic นี้ด้วย

## สถานะการคิวรี่
เป้าหมายของเราคือ สามารถครอบคลุมแหล่งข้อมูลทั้งหมดสำหรับผู้ใช้ในการใช้ mapping handler ต่าง ๆ (มากกว่าแค่สามประเภท event ของอินเทอร์เฟซที่กล่าวไปข้างต้น) ดังนั้นเราจึงได้เปิดเผยอินเทอร์เฟซ @polkadot/api บางส่วนเพื่อเพิ่มความสามารถในการทำงานให้มากขึ้น

ซึ่งอินเทอร์เฟซที่เราสนับสนุนในขณะนี้ ได้แก่
- [api.query.&lt;module&gt;.&lt;method&gt;()](https://polkadot.js.org/docs/api/start/api.query) จะช่วยคิวรี่ในบล็อก <strong>ปัจจุบัน</strong>
- [api.query.&lt;module&gt;.&lt;method&gt;.multi()](https://polkadot.js.org/docs/api/start/api.query.multi/#multi-queries-same-type) ช่วยให้สามารถทำได้หลายคิวรี่ในอินเทอร์เฟซประเภท <strong>เดียวกัน</strong> ที่บล็อกปัจจุบัน
- [api.queryMulti()](https://polkadot.js.org/docs/api/start/api.query.multi/#multi-queries-distinct-types) ช่วยให้สามารถทำได้หลายคิวรี่ในอินเทอร์เฟซประเภท
 <strong>ต่างกัน</strong> ที่บล็อกปัจจุบัน

และนี่คืออินเทอร์เฟซที่ขณะนี้เรา **ไม่ได้** สนับสนุน ซึ่งได้แก่
- ~~api.tx.*~~
- ~~api.derive.*~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.at~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.entriesAt~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.entriesPaged~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.hash~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.keysAt~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.keysPaged~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.range~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.sizeAt~~

ดูตัวอย่างการใช้ API นี้ในกรณีการใช้งานตัวอย่างได้ที่ [validator-threshold](https://github.com/subquery/tutorials-validator-threshold)

## RPC calls

เรายังสนับสนุนวิธี API RPC บางอย่างที่เป็นการ call ระยะไกลที่อนุญาตให้ฟังก์ชันแมปสามารถสื่อสารกับโหนด คิวรี่ และการบันทึกข้อมูลได้ ความคิดหลักของ SubQuery คือการกำหนดได้ ดังนั้น เพื่อให้ผลลัพธ์สอดคล้องกัน เราจึงอนุญาตเฉพาะการเรียก RPC ในอดีตเท่านั้น

เอกสารใน [JSON-RPC](https://polkadot.js.org/docs/substrate/rpc/#rpc) มีวิธีการบางอย่างที่ใช้ `BlockHash` เป็นพารามิเตอร์อินพุต (เช่น `at?: BlockHash`) ซึ่งขณะนี้ได้รับอนุญาตให้ใช้แล้ว นอกจากนี้เรายังได้ปรับวิธีการเหล่านี้เพื่อให้การทำดัชนี block hash ณ ขณะนั้น ตั้งเป็นค่าเริ่มต้น

```typescript
// สมมติว่าเรากำลังทำดัชนีบล็อกอันหนึ่งด้วยหมายเลข hash นี้
const blockhash = `0x844047c4cf1719ba6d54891e92c071a41e3dfe789d064871148e9d41ef086f6a`;

// วิธีการดั้งเดิมจะมีอินพุตแบบไม่บังคับเป็น block hash 
const b1 = await api.rpc.chain.getBlock(blockhash);

// มันจะใช้ค่าเริ่มต้นเป็น block hash ปัจจุบัน ดังนี้
const b2 = await api.rpc.chain.getBlock();
```
- สำหรับ RPC call ต่าง ๆ ที่เป็น [เครือข่าย Substrate แบบกำหนดเอง](#custom-substrate-chains) ดูที่ [การใช้งาน](#usage)

## โมดูลและไลบรารีต่าง ๆ

เพื่อปรับปรุงความสามารถในการประมวลผลข้อมูลของ SubQuery เราได้อนุญาตให้โมดูลต่าง ๆ ที่บิวท์อินของ NodeJS บางส่วน สามารถเรียกใช้ฟังก์ชัน map ใน [ sandbox ](#the-sandbox) และอนุญาตให้ผู้ใช้เรียกใช้ไลบรารีของบุคคลที่สามได้

โปรดทราบว่านี่เป็นเพียง **คุณลักษณะทดลอง** และคุณอาจพบข้อบกพร่องหรือปัญหาที่อาจส่งผลเสียต่อฟังก์ชัน map ของคุณ โปรดรายงานปัญหาที่คุณพบโดยการสร้างหัวข้อใน [GitHub](https://github.com/subquery/subql)

### โมดูลต่าง ๆ ที่บิวท์อิน

ในขณะนี้ โมดูล NodeJS ที่ได้รับอนุญาต ได้แก่ `assert`, `buffer`, `crypto`, `util`, และ `path`.

เราขอแนะนำให้คุณนำเข้ามาเฉพาะ method ที่คุณต้องการ แทนที่จะนำเข้ามาทั้งโมดูล เนื่องจาก method บางอย่างในโมดูลเหล่านี้ อาจเกี่ยวข้องกับสิ่งที่ยังไม่ได้รับการสนับสนุน จึงอาจจะทำให้นำเข้าไม่สำเร็จ

```ts
import {hashMessage} from "ethers/lib/utils"; //Good way
import {utils} from "ethers" //Bad way

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    const record = new starterEntity(extrinsic.block.block.header.hash.toString());
    record.field1 = hashMessage('Hello');
    await record.save();
}
```

### ไลบรารีของบุคคลที่สาม

เนื่องจากข้อจำกัดของ virtual machine ในแซนด์บ็อกซ์ของเรา ขณะนี้เราจึงรองรับเฉพาะไลบรารีของบุคคลที่สามที่เขียนด้วย **CommonJS** เท่านั้น

และเรายังสนับสนุนไลบรารี **ไฮบริด** ด้วย เช่น `@polkadot/*` ที่ใช้ ESM เป็นค่าเริ่มต้น อย่างไรก็ตาม หากไลบรารีอื่นขึ้นอยู่กับโมดูลในรูปแบบ **ESM** จะทำให้ virtual machine **ไม่** รวบรวมข้อมูลและส่งผลให้เกิดความผิดพลาด

## เครือข่าย Substrate แบบกำหนดเอง

SubQuery สามารถใช้กับเครือข่ายใดก็ได้ ที่มีพื้นฐานมาจาก Substrate ไม่จำเป็นต้องใช้กับ Polkadot หรือ Kusama เท่านั้น

ซึ่งคุณสามารถจะใช้เครือข่ายที่มี Substrate เป็นพื้นฐานแบบกำหนดเองได้ โดยเรามีเครื่องมือสำหรับนำเข้า ประเภทต่าง ๆ อินเทอร์เฟซ และ method เพิ่มเติมโดยอัตโนมัติโดยใช้ [@polkadot/typegen](https://polkadot.js.org/docs/api/examples/promise/typegen/)

ในส่วนต่อไปนี้ เราใช้[ตัวอย่างลูกแมว](https://github.com/subquery/tutorials-kitty-chain)เพื่ออธิบายขั้นตอนการรวมระบบ

### การเตรียมพร้อม

สร้างไดเร็กทอรีใหม่ `api-interfaces` ภายใต้โฟลเดอร์โปรเจ็กต์ `src` เพื่อจัดเก็บไฟล์ที่จำเป็นและสร้างขึ้นทั้งหมด นอกจากนี้เรายังสร้างไดเร็กทอรี `api-interfaces/kitties` เนื่องจากเราต้องการเพิ่มการตกแต่งใน API จากโมดูล `kitty`

#### Metadata

เราต้องการข้อมูล Metadata เพื่อสร้าง endpoint ของ API อย่างถูกต้องตามจริง ในตัวอย่างเรื่องลูกแมวนี้ เราใช้ endpoint จากเครือข่ายทดสอบในเครื่อง และมีเพิ่มประเภทต่าง ๆ เข้าไป ทำตามขั้นตอนใน [การตั้งค่า metadata ที่ PolkadotJS](https://polkadot.js.org/docs/api/examples/promise/typegen#metadata-setup) เพื่อดึง metadata ของโหนดจาก endpoint **HTTP**

```shell
curl -H "Content-Type: application/json" -d '{"id":"1", "jsonrpc":"2.0", "method": "state_getMetadata", "params":[]}' http://localhost:9933
```
หรือจาก endpoint **websocket** ด้วยความช่วยเหลือจาก [`websocat`](https://github.com/vi/websocat):

```shell
//Install the websocat
brew install websocat

//Get metadata
echo state_getMetadata | websocat 'ws://127.0.0.1:9944' --jsonrpc
```

จากนั้น ก็อปปี้และวางผลที่ได้ที่ไฟล์ JSON ใน [ตัวอย่างเรื่องลูกแมว](https://github.com/subquery/tutorials-kitty-chain) เราได้สร้าง `api-interface/kitty.json`

#### คำจำกัดความต่าง ๆ ของประเภท
เราคิดว่า ผู้ใช้รู้จัก ประเภทเฉพาะและการสนับสนุน RPC จากเครือข่ายอยู่แล้ว ซึ่งมันถูกกำหนดไว้ใน [Manifest](./manifest.md)

ตาม [การตั้งค่าของประเภทต่าง ๆ](https://polkadot.js.org/docs/api/examples/promise/typegen#metadata-setup) เราสร้าง:
- `src/api-interfaces/definitions.ts` - ซึ่งช่วยส่งออกคำจำกัดความของโฟลเดอร์ย่อยทั้งหมด

```ts
export { default as kitties } from './kitties/definitions';
```

- `src/api-interfaces/kitty/definitions.ts` - คำจำกัดความต่าง ๆ เรื่องประเภทสำหรับโมดูลลูกแมว
```ts
export default {
    // custom types
    types: {
        Address: "AccountId",
        LookupSource: "AccountId",
        KittyIndex: "u32",
        Kitty: "[u8; 16]"
    },
    // custom rpc : api.rpc.kitties.getKittyPrice
    rpc: {
        getKittyPrice:{
            description: 'Get Kitty price',
            params: [
                {
                    name: 'at',
                    type: 'BlockHash',
                    isHistoric: true,
                    isOptional: false
                },
                {
                    name: 'kittyIndex',
                    type: 'KittyIndex',
                    isOptional: false
                }
            ],
            type: 'Balance'
        }
    }
}
```

#### Packages

- ในไฟล์ `package.json` ตรวจสอบให้แน่ใจว่าได้เพิ่ม `@polkadot/typegen` เป็น dependency การพัฒนาและ `@polkadot/api` เป็น dependency ทั่วไป (ควรจะเป็นเวอร์ชั่นเดียวกัน) นอกจากนี้เรายังต้องการ `ts-node` ใน dependency การพัฒนา เพื่อช่วยเราในการเรียกใช้สคริปต์ด้วย
- โดยเราเพิ่มสคริปต์เพื่อใช้ทั้งสองประเภท ได้แก่ `generate:defs` และ metadata `generate:meta` (เรียงตามลำดับนี้ ทำให้ metadata สามารถใช้ประเภทดังกล่าวได้)

ส่วนนี่เป็นเวอร์ชันที่เรียบง่ายของ `package.json` กรุณาตรวจสอบให้แน่ใจว่า ส่วน **สคริปต์** นั้น ชื่อแพ็คเกจถูกต้องและมีไดเร็กทอรีนั้น ๆ อยู่

```json
{
  "name": "kitty-birthinfo",
  "scripts": {
    "generate:defs": "ts-node --skip-project node_modules/.bin/polkadot-types-from-defs --package kitty-birthinfo/api-interfaces --input ./src/api-interfaces",
    "generate:meta": "ts-node --skip-project node_modules/.bin/polkadot-types-from-chain --package kitty-birthinfo/api-interfaces --endpoint ./src/api-interfaces/kitty.json --output ./src/api-interfaces --strict"
  },
  "dependencies": {
    "@polkadot/api": "^4.9.2"
  },
  "devDependencies": {
    "typescript": "^4.1.3",
    "@polkadot/typegen": "^4.9.2",
    "ts-node": "^8.6.2"
  }
}
```

### การสร้างประเภท

เมื่อการเตรียมการเสร็จสิ้น เราก็พร้อมที่จะสร้างประเภทและ metadata แล้ว รันคำสั่งต่อไปนี้

```shell
# Yarn to install new dependencies
yarn

# Generate types
yarn generate:defs
```

ในแต่ละโฟลเดอร์ของโมดูล (เช่น `/kitties`) ตอนนี้ควรมี `types.ts` ที่สร้างขึ้น ซึ่งกำหนดอินเทอร์เฟซทั้งหมดจากคำจำกัดความของโมดูลนี้ รวมทั้งไฟล์ ` index.ts` ที่ส่งออกทั้งหมด

```shell
# Generate metadata
yarn generate:meta
```

คำสั่งนี้จะสร้าง metadata และ api-augment ใหม่สำหรับ API ต่าง ๆ เนื่องจากเราไม่ต้องการใช้ API แบบบิวท์อิน เราจึงต้องเพิ่มการแทนที่ที่ชัดเจนใน `tsconfig.json` ของเรา หลังจากอัปเดตแล้ว path ในการกำหนดค่าจะมีลักษณะดังนี้ (โดยไม่มีความคิดเห็นใด ๆ):

```json
{
  "compilerOptions": {
      // this is the package name we use (in the interface imports, --package for generators) */
      "kitty-birthinfo/*": ["src/*"],
      // here we replace the @polkadot/api augmentation with our own, generated from chain
      "@polkadot/api/augment": ["src/interfaces/augment-api.ts"],
      // replace the augmented types with our own, as generated from definitions
      "@polkadot/types/augment": ["src/interfaces/augment-types.ts"]
    }
}
```

### การใช้งาน

ในฟังก์ชัน map เราสามารถแสดงให้เห็นว่า metadata และประเภทต่าง ๆ จะเติมแต่ง API อย่างไร RPC endpoint จะสนับสนุนโมดูลและวิธีการต่าง ๆ ที่เราประกาศไว้ข้างต้น และหากต้องการใช้ rpc call แบบกำหนดเอง โปรดดูส่วน [การเรียก rpc ของเครือข่ายแบบกำหนดเอง](#custom-chain-rpc-calls)
```typescript
export async function kittyApiHandler(): Promise<void> {
    //return the KittyIndex type
    const nextKittyId = await api.query.kitties.nextKittyId();
    // return the Kitty type, input parameters types are AccountId and KittyIndex
    const allKitties  = await api.query.kitties.kitties('xxxxxxxxx',123)
    logger.info(`Next kitty id ${nextKittyId}`)
    //Custom rpc, set undefined to blockhash
    const kittyPrice = await api.rpc.kitties.getKittyPrice(undefined,nextKittyId);
}
```

**หากคุณต้องการเผยแพร่โครงการนี้ให้กับ explorer ของเรา โปรดรวมไฟล์ที่สร้างขึ้นใน `src/api-interfaces`**

### การกำหนดค่า rpc call ต่าง ๆ ของเครือข่าย

เพื่อรองรับการกำหนดค่า RPC call ต่าง ๆ ของเครือข่าย เราต้องใส่คำจำกัดความ RPC ของ `typesBundle` เอง เพื่อให้สามารถกำหนดค่าตามข้อกำหนดได้ โดยคุณสามารถกำหนด `typesBundle` ใน `project.yml` ได้ และโปรดทราบว่า ในประเภทต่าง ๆ ของ call จะมีเพียง `isHistoric` เท่านั้นที่เรารองรับ
```yaml
...
  types: {
    "KittyIndex": "u32",
    "Kitty": "[u8; 16]",
  }
  typesBundle: {
    spec: {
      chainname: {
        rpc: {
          kitties: {
            getKittyPrice:{
                description: string,
                params: [
                  {
                    name: 'at',
                    type: 'BlockHash',
                    isHistoric: true,
                    isOptional: false
                  },
                  {
                    name: 'kittyIndex',
                    type: 'KittyIndex',
                    isOptional: false
                  }
                ],
                type: "Balance",
            }
          }
        }
      }
    }
  }

```
