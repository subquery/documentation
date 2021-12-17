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

We also support a **hybrid** library like `@polkadot/*` that uses ESM as default. However, if any other libraries depend on any modules in **ESM** format, the virtual machine will **NOT** compile and return an error.

## Custom Substrate Chains

SubQuery can be used on any Substrate-based chain, not just Polkadot or Kusama.

You can use a custom Substrate-based chain and we provide tools to import types, interfaces, and additional methods automatically using [@polkadot/typegen](https://polkadot.js.org/docs/api/examples/promise/typegen/).

In the following sections, we use our [kitty example](https://github.com/subquery/tutorials-kitty-chain) to explain the integration process.

### Preparation

Create a new directory `api-interfaces` under the project `src` folder to store all required and generated files. We also create an `api-interfaces/kitties` directory as we want to add decoration in the API from the `kitties` module.

#### Metadata

We need metadata to generate the actual API endpoints. In the kitty example, we use an endpoint from a local testnet, and it provides additional types. Follow the steps in [PolkadotJS metadata setup](https://polkadot.js.org/docs/api/examples/promise/typegen#metadata-setup) to retrieve a node's metadata from its **HTTP** endpoint.

```shell
curl -H "Content-Type: application/json" -d '{"id":"1", "jsonrpc":"2.0", "method": "state_getMetadata", "params":[]}' http://localhost:9933
```
or from its **websocket** endpoint with help from [`websocat`](https://github.com/vi/websocat):

```shell
//Install the websocat
brew install websocat

//Get metadata
echo state_getMetadata | websocat 'ws://127.0.0.1:9944' --jsonrpc
```

Next, copy and paste the output to a JSON file. In our [kitty example](https://github.com/subquery/tutorials-kitty-chain), we have created `api-interface/kitty.json`.

#### Type definitions
We assume that the user knows the specific types and RPC support from the chain, and it is defined in the [Manifest](./manifest.md).

Following [types setup](https://polkadot.js.org/docs/api/examples/promise/typegen#metadata-setup), we create :
- `src/api-interfaces/definitions.ts` - this exports all the sub-folder definitions

```ts
export { default as kitties } from './kitties/definitions';
```

- `src/api-interfaces/kitties/definitions.ts` - type definitions for the kitties module
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

- In the `package.json` file, make sure to add `@polkadot/typegen` as a development dependency and `@polkadot/api` as a regular dependency (ideally the same version). We also need `ts-node` as a development dependency to help us run the scripts.
- We add scripts to run both types; `generate:defs` and metadata `generate:meta` generators (in that order, so metadata can use the types).

Here is a simplified version of `package.json`. Make sure in the **scripts** section the package name is correct and the directories are valid.

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

### Type generation

Now that preparation is completed, we are ready to generate types and metadata. Run the commands below:

```shell
# Yarn to install new dependencies
yarn

# Generate types
yarn generate:defs
```

In each modules folder (eg `/kitties`), there should now be a generated `types.ts` that defines all interfaces from this modules' definitions, also a file `index.ts` that exports them all.

```shell
# Generate metadata
yarn generate:meta
```

This command will generate the metadata and a new api-augment for the APIs. As we don't want to use the built-in API, we will need to replace them by adding an explicit override in our `tsconfig.json`. After the updates, the paths in the config will look like this (without the comments):

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

Now in the mapping function, we can show how the metadata and types actually decorate the API. The RPC endpoint will support the modules and methods we declared above. And to use custom rpc call, please see section [Custom chain rpc calls](#custom-chain-rpc-calls)
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

**If you wish to publish this project to our explorer, please include the generated files in `src/api-interfaces`.**

### Custom chain rpc calls

To support customised chain RPC calls, we must manually inject RPC definitions for `typesBundle`, allowing per-spec configuration. You can define the `typesBundle` in the `project.yml`. And please remember only `isHistoric` type of calls are supported.
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
