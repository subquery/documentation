# Manifest File

ไฟล์ Manifest `project.yaml` สามารถเห็นได้จากจุดเริ่มต้นโครงการของคุณ โดยจะใช้กำหนดรายละเอียดเกือบทั้งหมด ว่า SubQuery จะกำหนดดัชนีและแปลงข้อมูลที่อยู่บน Chain ได้อย่างไร

Manifest สามารถอยู่ในรูป YAML หรือ JSON ในคู่มือนี้ เราจะใช้ตัวอย่างเป็น YAML ด้านล่างจะเป็ฯตัวอย่างมาตรฐานของ `project.yaml`

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml specVersion: 0.2.0 name: example-project # Provide the project name version: 1.0.0  # Project version description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: file: ./schema.graphql # The location of your GraphQL schema file network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' # Genesis hash of the network endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: file: "./dist/index.js" handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> <CodeGroupItem title="v0.0.1"> ``` yml specVersion: "0.0.1" description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: ./schema.graphql # The location of your GraphQL schema file network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - name: main kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional but suggested to speed up event processing module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> </CodeGroup>

## การอัพเกรดเวอชันจาก v0.0.1 สู่ v0.2.0 <Badge text="upgrade" type="warning"/>

**ถ้าคุณมีโปรเจ็กต์ที่ใช้ specVersion v0.0..1 คุณสามารถใช้คำสั่ง `subql migrate` เพื่ออัพเกรดอย่างรวดเร็ว [ดูที่นี่](#cli-options) สำหรับข้อมูลเพิ่มเติม**

ภายใต้ `network`

- นี่คือ field ที่ถูกสร้างขึ้นใหม่ **required** `genesisHash` ซึ่งจะช่วยให้คุณรู้ว่ากำลังใช้ chain ใดอยู่
- สำหรับ v0.2.0 หรือสูงกว่า คุณสามารถอ้างอิงถึงไฟล์ภายนอก [chaintype file](#custom-chains) ถ้าหากคุณกำลังอ้างอิงถึง chain ที่คุณกำหนดเอง

ภายใต้ `dataSources`:

- สามารถเชื่อมไปยังจุดเริ่มต้น `index.js` สำหรับ mapping handlers โดยพื้นฐาน `index.js` จะถูกสร้างขึ้นจาก `index.ts` ในกระบวนการ build
- Data sources สามารถเป็นได้ทั้ง data source ทั่วไป หรือ [custom data source](#custom-data-sources)

### CLI Options

ในขณะ v0.2.0 spec version อยู่ในช่วง beta คุณจำเป็นจำต้องกำหนดในขณะที่คุณสร้างโปรเจ็กต์ ด้วยคำสั่ง `subql init --specVersion 0.2.0 PROJECT_NAME`

`subql migrate` สามารถรันอยู่บนโปรเจ็กต์ที่เกิดขึ้นแล้ว เพื่ออัพเกรดไปสู่ project manifest เวอชันล่าสุดได้

| Options        | คำอธิบาย                                                      |
| -------------- | ------------------------------------------------------------- |
| -f, --force    |                                                               |
| -l, --location | local folder ที่จะใช้ migrate (จำเป็นต้องมีไฟล์ project.yaml) |
| --file=file    | ใช้ระบุ project.yaml ที่ต้องการ migrate                       |

## ภาพรวม

### Top Level Spec

| Field           | v0.0.1                              | v0.2.0                      | คำอธิบาย                                             |
| --------------- | ----------------------------------- | --------------------------- | ---------------------------------------------------- |
| **specVersion** | String                              | String                      | `0.0.1` หรือ `0.2.0` - spec version ของไฟล์ manifest |
| **name**        | 𐄂                                   | String                      | ชื่อโปรเจ็กต์ของคุณ                                  |
| **version**     | 𐄂                                   | String                      | เวอร์ชั่นโปรเจ็กต์ของคุณ                             |
| **description** | String                              | String                      | คำอธิบายโปรเจ็กต์ของคุณ                              |
| **repository**  | String                              | String                      | ตำแหน่ง Git repository ของโปรเจ็กต์คุณ               |
| **schema**      | String                              | [Schema Spec](#schema-spec) | ตำแหน่งไฟล์ GraphQL schema ของคุณ                    |
| **network**     | [Network Spec](#network-spec)       | Network Spec                | รายละเอียดของเครือข่ายที่จะถูกนำมา index             |
| **dataSources** | [DataSource Spec](#datasource-spec) | DataSource Spec             |                                                      |

### Schema Spec

| Field    | v0.0.1 | v0.2.0 | คำอธิบาย                          |
| -------- | ------ | ------ | --------------------------------- |
| **file** | 𐄂      | String | ตำแหน่งไฟล์ GraphQL schema ของคุณ |

### Network Spec

| Field           | v0.0.1 | v0.2.0        | คำอธิบาย                                                                                                                                                                                   |
| --------------- | ------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **genesisHash** | 𐄂      | String        | Genesis Hash ของเครือข่าย                                                                                                                                                                  |
| **endpoint**    | String | String        | กำหนด wss หรือ ws ปลายทางของ blockchain ที่ต้องการ index - **จำเป็นต้องเป็น full archive node** คุณสามารถดึงปลายทางได้จากทุก parachains ได้ฟรี จาก [OnFinality](https://app.onfinality.io) |
| **dictionary**  | String | String        | แนะนำให้คุณกำ HTTP เป็นปลายทางของโฟลเดอร์ full chain เพื่อเพิ่มความเร็วในการทำงาน - อ่าน [how a subQuery Dictionary works](../tutorials_examples/dictionary.md)                            |
| **chaintypes**  | 𐄂      | {file:String} | เส้นทางไปยัง chain types file รองรับรูปแบบ `.json` หรือ `.yaml`                                                                                                                            |

### Datasource Spec

กำหนดข้อมูลที่จะถูกกรองหรือดึงออกจากตำแหน่งของ mapping function handler เพื่อนำมาใช้กับข้อมูลที่ถูกแปลง
| Field          | v0.0.1                                                    | v0.2.0                                                                           | คำอธิบาย                                                                                                                                                                    |
| -------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name**       | String                                                    | 𐄂                                                                                | ชื่อของแหล่งข้อมูล                                                                                                                                                          |
| **kind**       | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | เรารองรับชนิดข้อมูลจาก substrate runtime เริ่มต้น อย่างเช่น block, event และ extrinsic(call) ตั้งแต่ v. 0.2.0 พวกเรารองรับข้อมูลจาก custom runtime อย่างเช่น smart contract |
| **startBlock** | Integer                                                   | Integer                                                                          | ระบุ block เริ่มต้นที่ต้องการทำ indexing หากตั้งค่าสูงขึ้นจะข้าม block เริ่มต้น ส่งผลให้ข้อมูลน้อยลง                                                                        |
| **mapping**    | Mapping Spec                                              | Mapping Spec                                                                     |                                                                                                                                                                             |
| **filter**     | [network-filters](./manifest/#network-filters)            | 𐄂                                                                                | กรองข้อมูลที่รันด้วย network endpoint spec name                                                                                                                             |

### Mapping Spec

| Field                  | v0.0.1                                                                   | v0.2.0                                                                                        | คำอธิบาย                                                                                                                                                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **file**               | String                                                                   | 𐄂                                                                                             | ตำแหน่งไฟล์ของ mapping entry                                                                                                                                                                                                                   |
| **handlers & filters** | [Default handlers and filters](./manifest/#mapping-handlers-and-filters) | Default handlers and filters, <br />[Custom handlers and filters](#custom-data-sources) | ลิสท์รายการ [mapping functions](./mapping.md) ทั้งหมด และ handler type ที่เกี่ยวข้อง รวมไปถึง mapping filters <br /><br /> สำหรับการใช้ custom runtimes mapping handlers กรุณาดูต่อที่ [Custom data sources](#custom-data-sources) |

## Data Sources and Mapping

ในรายการนี้ พวกเราจะพูดถึงการใช้งาน default substrate runtime และการ mapping ตัวอย่างดังนี้:

```yaml
dataSources:
  - kind: substrate/Runtime # Indicates that this is default runtime
    startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data
    mapping:
      file: dist/index.js # Entry path for this mapping
```

### Mapping handlers and Filters

จากตารางต่อไปนี้ จะอธิบาย filters ที่รองรับกับ handlers ที่หลากหลาย

**โปรเจ็คต์ SubQuery ของคุณจะมีประสิทธิภาพเพิ่มมากขึ้นเป็นอย่างมาก เมื่อคุณใช้เพียง event และ call handlers ร่วมกับ mapping filters ที่เหมาะสม**

| Handlers (ตัวดำเนินการ)                    | Supported filter (ตัวกรองที่รองรับ) |
| ------------------------------------------ | ----------------------------------- |
| [BlockHandler](./mapping.md#block-handler) | `specVersion`                       |
| [EventHandler](./mapping.md#event-handler) | `module`,`method`                   |
| [CallHandler](./mapping.md#call-handler)   | `module`,`method` ,`success`        |

Runtime mapping filters เบื้องต้น เป็นฟีเจอร์ที่มีประโยชน์เป็นอย่างมาก ใช้ในการตัดสินใจว่า block, event หรือ extrinsic ใดจะใช้เรียก mapping handler

มีเพียงข้อมูลที่เข้ามาใหม่เท่านั้นที่จะเข้ากับเงื่อนไขในการกรอง และจะถูกประมวลผลโดย mapping functions Mapping filters เป็นตัวเลือกหนึ่ง แต่เราแนะนำเป็นอย่างยิ่งให้ใช้ เนื่องจากจะสามารถลดปริมาณข้อมูลที่จะต้องประมวลผลด้วยโปรเจ็กต์ SubQuery ของคุณได้มหาศาล และมันจะช่วยเพิ่มประสิทธิภาพในการทำ indexing

```yaml
# Example filter from callHandler
filter:
  module: balances
  method: Deposit
  success: true
```

- Module และ method filters รองรับบน substrate-based chain ใดๆ
- `success` filter จะรับค่า boolean และใช้ในการกรอง extrinsic ที่ผ่านสถานะ success
- `specVersion` filter จะใช้กำหนด spec version ที่อยู่ในช่วงที่กำหนดสำหรับ substrate block ตัวอย่างดังต่อไปนี้จะอธิบายว่าจะกำหนด version ranges ได้อย่างไร

```yaml
filter:
  specVersion: [23, 24]   # Index block with specVersion in between 23 and 24 (inclusive).
  specVersion: [100]      # Index block with specVersion greater than or equal 100.
  specVersion: [null, 23] # Index block with specVersion less than or equal 23.
```

## Custom Chains

### Network Spec

เมื่อเชื่อมต่อกับ Polkadot parachain อื่น หรือแม้แต่ custom substrate chain คุณจำเป็นจะต้องแก้ไขในส่วน [Network Spec](#network-spec) ของไฟล์ manifest นี้

`genesisHash` มักจะเป็น hash ของ block แรกในแต่ละเครือข่าย คุณสามารถอ่านค่าเหล่านี้ได้ง่ายๆ เพียงไปที่ [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) และมองหา hash บน **block 0** (ดูรูปประกอบด้านล่าง)

![Genesis Hash](/assets/img/genesis-hash.jpg)

นอกจากนี้ คุณจำเป็นจะต้องอัพเดท `endpoint` กำหนด wss หรือ ws ปลายทางของ blockchain ที่ต้องการ index - **จำเป็นต้องเป็น full archive node** คุณสามารถดึงปลายทางได้จากทุก parachains ได้ฟรี จาก [OnFinality](https://app.onfinality.io)

### Chain Types

คุณสามารถทำดัชนีข้อมูลจาก custom chains ได้ โดยการกำหนด chain types ใน manifest

พวกเรารองรับชนิดเพิ่มเติมที่ถูกใช้โดย substrate runtime modules โดยรองรับ `typesAlias`, `typesBundle`, `typesChain`, และ `typesSpec`

ใน v0.2.0 ตัวอย่างดังต่อไปนี้ `network.chaintypes` จะถูกชี้ไปที่ไฟล์ที่มี custom types ทั้งหมด นี่จะเป็นมาตรฐานของไฟล์ chainspec ที่ใช้ในการประกาศ และระบุชินที่มีความจำเพาะ รองรับกับ blockchain โดยรองรับทั้งรูปแบบ `.json`, `.yaml` หรือ `.js`.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # The relative filepath to where custom types are stored ... ``` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> ``` yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter:  #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true ``` </CodeGroupItem> </CodeGroup>

To use typescript for your chain types file include it in the `src` folder (e.g. `./src/types.ts`), run `yarn build` and then point to the generated js file located in the `dist` folder.

```yml
network:
  chaintypes:
    file: ./dist/types.js # Will be generated after yarn run build
...
```

สิ่งที่คุณจะต้องทราบเกี่ยวกับการใช้งาน chain types file ด้วยนามสกุล `.ts` หรือ `.js`:

- ไฟล์ manifest version ต้องเป็น v0.2.0 หรือสูงกว่า
- มีเพียง default export เท่านั้นที่จะถูกรวมไปใน [polkadot api](https://polkadot.js.org/docs/api/start/types.extend/) เมื่อดึงข้อมูลจาก blocks

นี่คือตัวอย่างของ `.ts` ไฟล์ chain types:

<CodeGroup> <CodeGroupItem title="types.ts"> ```ts
import { typesBundleDeprecated } from "moonbeam-types-bundle"
export default { typesBundle: typesBundleDeprecated }; ``` </CodeGroupItem> </CodeGroup>

## Custom Data Sources

Custom Data Sources จะระบุฟังก์ชันของ network ที่กำหนด ที่จะทำให้จัดการกับข้อมูลได้ง่ายยิ่งขึ้น โดยจะทำงานเหมือนตัวกลาง ที่จะช่วยกรองเพิ่มขึ้น และการแปลงข้อมูล

ตัวอย่างที่ดีของอันนี้ คือการรองรับ EVM สามารถมีการประมวลผล data source สำหรับ EVM หมายความว่าคุณสามารถทำการกรองได้ตั้งแต่ระดับ EVM (e.g. กรอง contract methods หรือ logs) และข้อมูลเหล่านั้นจะถูกแปลงเป็นโครงสร้างที่ใกล้เคียงกับ Ethereum ecosystem เฉกเช่นเดียวกับการดึง parameters ด้วย ABIs.

Custom Data Sources สามารถใช้ร่วมกับ normal data sources.

นี่คือรายการ custom datasources ที่รองรับ:

| Kind                                                  | Supported Handlers                                                                                       | Filters                         | Description                                                                         |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------- |
| [substrate/Moonbeam](./moonbeam/#data-source-example) | [substrate/MoonbeamEvent](./moonbeam/#moonbeamevent), [substrate/MoonbeamCall](./moonbeam/#moonbeamcall) | See filters under each handlers | ช่วยให้กระทำกับ EVM trsnaction ได้ง่าย และเหตุการณ์ที่เกิดขึ้นบน Moonbeams networks |

## Network Filters

**Network filters จะใช้เฉพาะใน manifest spec v0.0.1**.

โดยทั่วไป user จะสร้าง SubQuery และคาดว่าจะนำมาใช้ทั้ง testnet และ mainnet environments (e.g. Polkdaot และ Kusama) ระหว่างเครือข่าย การตั้งค่าต่างๆอาจมีการเปลี่ยนแปลง (e.g. index start block) นอกจากนี้ เราอนุญาติให้ผู้ใช้งานสามารถกำหนดรายละเอียดในแต่ละ data source ได้ นั่นหมายความว่าในหนึ่งโปรเจ็คต์ Subquery จะสามารถนำไปใช้ได้หลายเครือข่าย

ผู้ใช้งานสามารถเพิ่ม `filter` บน `dataSources` เพื่อเลือกว่า data source ใดจะใช้ในแต่ละเครือข่าย

ตัวอย่างดังต่อไปนี้ จะแสดงการใช้งาน data sources ที่ต่างกัน สำหรับทั้งเครือข่าย Polkadot และ Kusama

<CodeGroup> <CodeGroupItem title="v0.0.1"> ```yaml --- network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' #Create a template to avoid redundancy definitions: mapping: &mymapping handlers: - handler: handleBlock kind: substrate/BlockHandler dataSources: - name: polkadotRuntime kind: substrate/Runtime filter: #Optional specName: polkadot startBlock: 1000 mapping: *mymapping #use template here - name: kusamaRuntime kind: substrate/Runtime filter: specName: kusama startBlock: 12000 mapping: *mymapping # can reuse or change ``` </CodeGroupItem>

</CodeGroup>
