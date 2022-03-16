# การทำ Mapping

ฟังก์ชันการทำ Mapping นั้นช่วยกำหนดวิธีการแปลงข้อมูลเครือข่ายเป็นเอนทิตี GraphQL ที่เหมาะสม ซึ่งเราได้กำหนดไว้แล้วในไฟล์ `schema.graphql`

- การทำ Mapping นั้นได้ถูกกำหนดไว้ใน Directory `src/mappings` และถูก Export ออกมาเป็นฟังก์ชั่น
- การทำ Mapping เหล่านี้ยังจะถูก Export ใน `src/index.ts` ด้วย
- ไฟล์ Mapping จะเป็นตัวอ้างอิงใน `project.yaml` ภายใต้ตัวจัดการการแมป (Mapping Handlers)

ฟังก์ชั่น Mapping จะมีอยู่ 3 คลาส ได้แก่ [Block handler](#block-handler), [Event Handler](#event-handler) และ [Call Handler](#call-handler)

## Block Handler

คุณสามารถใช้ Block Handler ต่าง ๆ เพื่อเก็บข้อมูลทุกครั้งที่มีการแนบบล็อกใหม่เข้ากับเครือข่าย Substrate เช่น หมายเลขบล็อก การจะทำแบบนี้ได้, BlockHandler จะถูกเรียกออกมา 1 ครั้งในทุก ๆ บล็อก

```ts
import {SubstrateBlock} from "@subql/types";

export async function handleBlock(block: SubstrateBlock): Promise<void> {
    // Create a new StarterEntity with the block hash as it's ID
    const record = new starterEntity(block.block.header.hash.toString());
    record.field1 = block.block.header.number.toNumber();
    await record.save();
}
```

[SubstrateBlock](https://github.com/OnFinality-io/subql/blob/a5ab06526dcffe5912206973583669c7f5b9fdc9/packages/types/src/interfaces.ts#L16) เป็นอินเทอร์เฟซเพิ่มเติมของ [signedBlock](https://polkadot.js.org/docs/api/cookbook/blocks/) แต่ยังรวมถึง `specVersion` และ `timestamp` ด้วย

## Event Handler

คุณสามารถใช้ Event Handler ต่าง ๆ ในการเก็บข้อมูล เมื่อมี event นั้น ๆ ในบล็อกใหม่ Event ต่าง ๆ ที่เป็นส่วนหนึ่งของค่าเริ่มต้นของรันไทม์ Substrate และบล็อก อาจมีหลาย Event ก็ได้

ในระหว่างการประมวลผล, Event Handler จะได้รับ Substrate Event เป็น Argument ที่มีอินพุตและเอาต์พุตของ Event นั้น ๆ ซึ่งไม่ว่าจะเป็น Event ประเภทใด ก็จะทริกเกอร์ให้มีการทำ Mapping เสมอ ทำให้สามารถบันทึกกิจกรรมที่มีแหล่งข้อมูลได้ คุณควรใช้ [Mapping Filter](./manifest.md#mapping-filters) ในไฟล์รายการ ในการคัดกรอง Event ด้วย เพื่อลดเวลาที่ใช้ในการจัดทำ Data Index และเพิ่มประสิทธิภาพในการทำ Mapping

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

[SubstrateEvent](https://github.com/OnFinality-io/subql/blob/a5ab06526dcffe5912206973583669c7f5b9fdc9/packages/types/src/interfaces.ts#L30) เป็นอินเทอร์เฟซแบบเพิ่มเติมของ [EventRecord](https://github.com/polkadot-js/api/blob/f0ce53f5a5e1e5a77cc01bf7f9ddb7fcf8546d11/packages/types/src/interfaces/system/types.ts#L149) นอกจากข้อมูล Event แล้ว ยังมี `id` (บล็อกที่เป็นของ Event นี้) และ Extrinsic ที่อยู่ภายในบล็อกนี้ด้วย

## Call Handler

Call Handler ต่าง ๆ จะถูกใช้เมื่อคุณต้องการบันทึกข้อมูลเกี่ยวกับ Substrate Extrinsic นั้นๆ

```ts
export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    const record = new starterEntity(extrinsic.block.block.header.hash.toString());
    record.field4 = extrinsic.block.timestamp;
    await record.save();
}
```

[SubstrateExtrinsic](https://github.com/OnFinality-io/subql/blob/a5ab06526dcffe5912206973583669c7f5b9fdc9/packages/types/src/interfaces.ts#L21) จะไปขยาย [GenericExtrinsic](https://github.com/polkadot-js/api/blob/a9c9fb5769dec7ada8612d6068cf69de04aa15ed/packages/types/src/extrinsic/Extrinsic.ts#L170) มันจะถูกกำหนด `id` (บล็อกที่ Extrinsic นี้อยู่) และให้คุณสมบัติ Extrinsic นั้น ๆ ซึ่งจะช่วยขยาย Event ต่าง ๆ ระหว่างบล็อกนี้ นอกจากนี้ มันยังทำการบันทึกสถานะความสำเร็จของ Extrinsic นี้ด้วย

## Query States
เป้าหมายของเราคือ การทำให้ข้อมูลทั้งหมดสำหรับผู้ใช้งานมีความครอบคลุมในการใช้ Mapping Handler ต่าง ๆ (มากกว่าแค่อินเทอร์เฟซทั้งสามประเภทของ Event ที่กล่าวไปข้างต้น) ดังนั้นเราจึงได้เปิดเผยอินเทอร์เฟซ @polkadot/api บางส่วนเพื่อเพิ่มความสามารถในการทำงานให้มากขึ้น

ซึ่งอินเทอร์เฟซที่เรารองรับในขณะนี้ ได้แก่
- [api.query.&lt;module&gt;.&lt;method&gt;()](https://polkadot.js.org/docs/api/start/api.query) สำหรับการคิวรี่บล็อก <strong>ปัจจุบัน</strong>
- [api.query.&lt;module&gt;.&lt;method&gt;.multi()](https://polkadot.js.org/docs/api/start/api.query.multi/#multi-queries-same-type) สำหรับการคิวรี่พร้อมกันหลายครั้งในอินเทอร์เฟซประเภท <strong>เดียวกัน</strong> ที่บล็อกปัจจุบัน
- [api.queryMulti()](https://polkadot.js.org/docs/api/start/api.query.multi/#multi-queries-distinct-types) สำหรับการคิวรี่พร้อมกันหลายครั้งในอินเทอร์เฟซประเภท
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

เรายังสนับสนุนวิธี API RPC บางอย่างที่เป็นการ Remote Call ซึ่งอนุญาตให้ฟังก์ชัน Mapping สามารถสื่อสารกับโหนด คิวรี่ และการบันทึกข้อมูลได้ ความคิดหลักของ SubQuery คือการกำหนดได้ ดังนั้น เพื่อให้ผลลัพธ์สอดคล้องกัน เราจึงอนุญาตเฉพาะการเรียก RPC ในอดีตเท่านั้น

เอกสารใน [JSON-RPC](https://polkadot.js.org/docs/substrate/rpc/#rpc) มีวิธีการบางอย่างที่ใช้ `BlockHash` เป็นพารามิเตอร์อินพุต (เช่น `at?: BlockHash`) ซึ่งขณะนี้ได้รับอนุญาตให้ใช้แล้ว นอกจากนี้เรายังได้ปรับวิธีการเหล่านี้เพื่อให้การแฮช Indexing Block ปัจจุบัน กลายเป็นค่าเริ่มต้น

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

เพื่อปรับปรุงความสามารถในการประมวลผลข้อมูลของ SubQuery เราได้อนุญาตให้ Built-In Module ของ NodeJS บางส่วน สามารถเรียกใช้ฟังก์ชัน Mapping ใน [ sandbox ](#the-sandbox) ได้ และอนุญาตให้ผู้ใช้งานเรียกใช้ไลบรารีของบุคคลที่สามได้

โปรดทราบว่านี่เป็นเพียง **คุณลักษณะทดลอง** และคุณอาจพบข้อบกพร่องหรือปัญหาที่อาจส่งผลเสียต่อฟังก์ชัน Mapping ของคุณได้ โปรดรายงานปัญหาที่คุณพบโดยการสร้างหัวข้อใน [GitHub](https://github.com/subquery/subql)

### Built-In Modules

ในขณะนี้ โมดูลของ NodeJS ที่ได้รับอนุญาต ได้แก่ `assert`, `buffer`, `crypto`, `util`, และ `path`.

เราขอแนะนำให้คุณ Import เฉพาะ Method(s) ที่คุณต้องการ แทนที่จะนำเข้ามาทั้งโมดูล เนื่องจาก Method บางอย่างในโมดูลเหล่านี้ อาจเกี่ยวข้องกับสิ่งที่ยังไม่ได้รับการสนับสนุน จึงอาจจะทำให้การ Import ไม่สำเร็จ

```ts
import {hashMessage} from "ethers/lib/utils"; //Good way
import {utils} from "ethers" //Bad way

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    const record = new starterEntity(extrinsic.block.block.header.hash.toString());
    record.field1 = hashMessage('Hello');
    await record.save();
}
```

### Third-Party Libraries

เนื่องจากข้อจำกัดของ Virtual Machine ในแซนด์บ็อกซ์ของเรา ขณะนี้เราจึงรองรับเฉพาะ Third-Party Libraries ที่เขียนด้วย **CommonJS** เท่านั้น

และเรายังสนับสนุนไลบรารี **ไฮบริด** ด้วย เช่น `@polkadot/*` ที่ใช้ ESM เป็นค่าเริ่มต้น อย่างไรก็ตาม หากไลบรารีอื่นขึ้นอยู่กับโมดูลในรูปแบบ **ESM** จะทำให้ Virtual Machine **ไม่** รวบรวมข้อมูลและส่งผลให้เกิดความผิดพลาด

## เครือข่าย Substrate แบบกำหนดเอง

SubQuery สามารถใช้กับเครือข่ายใดก็ได้ ที่มีพื้นฐานมาจาก Substrate ไม่จำเป็นต้องใช้กับ Polkadot หรือ Kusama เท่านั้น

ซึ่งคุณสามารถจะใช้เครือข่ายที่มี Substrate เป็นพื้นฐานแบบกำหนดเองได้ โดยเรามีเครื่องมือสำหรับ Import ประเภท อินเทอร์เฟซ และ Method เพิ่มเติมโดยใช้ [@polkadot/typegen](https://polkadot.js.org/docs/api/examples/promise/typegen/) อย่างอัตโนมัติ

ในส่วนต่อไปนี้ เราใช้ [kitty example](https://github.com/subquery/tutorials-kitty-chain) เป็นตัวอย่างเพื่ออธิบายขั้นตอนการรวมระบบ

### การเตรียมพร้อม

สร้างไดเร็กทอรีใหม่ `api-interfaces` ภายใต้โฟลเดอร์โปรเจ็กต์ `src` เพื่อจัดเก็บไฟล์ที่จำเป็นและสร้างขึ้นทั้งหมด นอกจากนี้เรายังสร้างไดเร็กทอรี `api-interfaces/kitties` เนื่องจากเราต้องการเพิ่มการตกแต่งใน API จากโมดูล `kitty`

#### Metadata

เราต้องการข้อมูล Metadata เพื่อสร้าง endpoint ของ API อย่างถูกต้องตามจริง ในตัวอย่าง Kitty Example เราใช้ Endpoint จากเครือข่ายทดสอบในเครื่อง และมีเพิ่มประเภทต่าง ๆ เข้าไป ทำตามขั้นตอนใน [การตั้งค่า Metadata ที่ PolkadotJS](https://polkadot.js.org/docs/api/examples/promise/typegen#metadata-setup) เพื่อดึง metadata ของโหนดจาก Endpoint **HTTP**

```shell
curl -H "Content-Type: application/json" -d '{"id":"1", "jsonrpc":"2.0", "method": "state_getMetadata", "params":[]}' http://localhost:9933
```
หรือจาก Endpoint **websocket** ด้วยความช่วยเหลือจาก [`websocat`](https://github.com/vi/websocat):

```shell
//Install the websocat
brew install websocat

//Get metadata
echo state_getMetadata | websocat 'ws://127.0.0.1:9944' --jsonrpc
```

จากนั้น ก็อปปี้และวางผลที่ได้ที่ไฟล์ JSON ในตัวอย่าง [kitty example](https://github.com/subquery/tutorials-kitty-chain) ของเรา เราได้สร้าง `api-interface/kitty.json`

#### คำจำกัดความของประเภทต่างๆ
เราคิดว่า ผู้ใช้รู้จัก ประเภทเฉพาะและการสนับสนุน RPC จากเครือข่ายอยู่แล้ว ซึ่งมันถูกกำหนดไว้ใน [Manifest](./manifest.md)

ตาม [การตั้งค่าของประเภทต่าง ๆ](https://polkadot.js.org/docs/api/examples/promise/typegen#metadata-setup) เราสร้าง:
- `src/api-interfaces/definitions.ts` - ซึ่งช่วยส่งออกคำจำกัดความของโฟลเดอร์ย่อยทั้งหมด

```ts
export { default as kitties } from './kitties/definitions';
```

- `src/api-interfaces/kitty/definitions.ts` - คำจำกัดความต่าง ๆ เรื่องประเภทสำหรับโมดูลลูกแมว(Kitties Module)
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

- ในไฟล์ `package.json` ให้ตรวจสอบให้แน่ใจว่าได้เพิ่ม `@polkadot/typegen` สำหรับการพึ่งพาการพัฒนา (Development Dependency) และ `@polkadot/api` เป็น การพึ่งพาทั่วไป(Regular Dependency) (ควรจะเป็นเวอร์ชั่นเดียวกัน) นอกจากนี้เรายังต้องการ `ts-node` สำหรับการพึ่งพาการพัฒนา (Development Dependency) เพื่อช่วยเราในการเรียกใช้สคริปต์
- โดยเราเพิ่มสคริปต์เพื่อใช้ทั้งสองประเภท ได้แก่ `generate:defs` และ Metadata `generate:meta` (เรียงตามลำดับนี้ ทำให้ Metadata สามารถใช้ประเภทดังกล่าวได้)

ส่วนนี่เป็นเวอร์ชันที่เรียบง่ายของ `package.json` กรุณาตรวจสอบให้แน่ใจว่า ส่วน **สคริปต์** มีชื่อแพ็คเกจถูกต้องและมีไดเร็กทอรีนั้น ๆ อยู่

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

คำสั่งนี้จะสร้าง Metadata และ API-Augment ใหม่สำหรับ API ต่าง ๆ เนื่องจากเราไม่ต้องการใช้ API แบบบิวท์อิน เราจึงต้องเพิ่มการแทนที่ที่ชัดเจนใน `tsconfig.json` ของเรา หลังจากอัปเดตแล้ว Path ในการกำหนดค่าจะมีลักษณะดังนี้ (โดยไม่มีความคิดเห็นใด ๆ):

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

ในฟังก์ชัน Mapping เราสามารถแสดงให้เห็นว่า Metadata และประเภทต่าง ๆ จะเติมแต่ง API อย่างไร RPC Endpoint จะสนับสนุนโมดูลและวิธีการต่าง ๆ ที่เราประกาศไว้ข้างต้น และหากต้องการเรียกใช้ RPC แบบกำหนดเอง โปรดดูส่วน [การเรียกเรียกใช้ RPC ของเครือข่ายแบบกำหนดเอง](#custom-chain-rpc-calls)
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

**หากคุณต้องการเผยแพร่โปรเจคนี้ให้กับ Explorer ของเรา โปรดรวมไฟล์ที่สร้างขึ้นใน `src/api-interfaces`**

### การกำหนดค่า RPC Call ต่าง ๆ ของเครือข่าย

เพื่อรองรับการกำหนดค่า RPC Call ต่าง ๆ ของเครือข่าย เราต้องใส่คำจำกัดความ RPC ของ `typesBundle` เอง เพื่อให้สามารถกำหนดค่าตามข้อกำหนดได้ โดยคุณสามารถกำหนด `typesBundle` ใน `project.yml` ได้ และโปรดทราบว่า ในประเภทต่าง ๆ ของ Call จะมีเพียง `isHistoric` เท่านั้นที่เรารองรับ
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
