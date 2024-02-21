# ไฟล์ Manifest

ไฟล์ Manifest `project.yaml` เป็นจุดเริ่มต้นโปรเจกต์ของคุณ และมันจะกำหนดรายละเอียดส่วนใหญ่ว่า SubQuery จะสร้างดัชนีและแปลงข้อมูลบนระบบอย่างไร

Manifest สามารถใช้เครื่องมือในรูปแบบของ YAML หรือ JSON ซึ่งในคู่มือนี้ เราจะใช้ตัวอย่างเป็น YAML ตัวอย่างด้านล่างรูปแบบมาตรฐานของ `project.yaml`

::: code-tabs @tab v0.2.0 `yml specVersion: 0.2.0 name: example-project # Provide the project name version: 1.0.0  # Project version description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: file: ./schema.graphql # The location of your GraphQL schema file network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' # Genesis hash of the network endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: file: "./dist/index.js" handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` 
@tab v0.0.1` yml specVersion: "0.0.1" description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: ./schema.graphql # The location of your GraphQL schema file network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - name: main kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional but suggested to speed up event processing module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` :::

## สำหรับการอัพเกรดเวอร์ชันจาก v0.0.1 สู่ v0.2.0 <Badge text="upgrade" type="warning"/>

**ถ้าหากคุณมีโปรเจกต์ที่ใช้เวอร์ชั่น v0.0.1 คุณสามารถใช้คำสั่ง `subql migrate` เพื่ออัพเกรดได้อย่างรวดเร็ว [ดูที่นี่](#cli-options) สำหรับข้อมูลเพิ่มเติม**

ภายใต้ `network`

- นี่คือฟิลด์ที่ถูกสร้างขึ้นใหม่ **required** `genesisHash` ซึ่งจะช่วยให้คุณรู้ว่า กำลังใช้งานอยู่บนระบบเครือข่ายใด
- สำหรับเวอร์ชั่น v0.2.0 หรือสูงกว่า คุณสามารถอ้างอิงถึงไฟล์จากภายนอก [chaintype file](#custom-chains) ถ้าหากคุณกำลังอ้างอิงถึงระบบเครือข่ายที่คุณกำหนดเอง

ภายใต้ `dataSources`:

- สามารถเชื่อมโยง `index.js` สำหรับการ mapping handlers โดยพื้นฐาน `index.js` จะถูกสร้างขึ้นจาก `index.ts` ในกระบวนการสร้าง
- แหล่งข้อมูลสามารถเป็นได้ทั้งแหล่งข้อมูลทั่วไป หรือ [custom data source](#custom-data-sources)

### CLI Options

โดยค่าเริ่มต้น CLI จะสร้างโปรเจ็กต์ SubQuery สำหรับเวอร์ชัน v0.2.0 การกระทำนี้ สามารถแทนที่ได้โดยการเรียกใช้ `subql init --specVersion 0.0.1 PROJECT_NAME` แต่อย่างไรก็ตาม เราไม่แนะนำให้ทำ เนื่องจากโปรเจ็กต์จะไม่ได้รับการสนับสนุนโดย SubQuery hosted service ในอนาคต

สามารถเรียกใช้ `subql migrate` ในโปรเจกต์ที่มีอยู่ เพื่อย้ายไฟล์ Manifest ของโปรเจกต์เป็นเวอร์ชันล่าสุด

การใช้งาน $ subql init [PROJECTNAME]

หมายเหตุ PROJECTNAME ตั้งชื่อโปรเจกต์

| Options                 | Description                                                             |
| ----------------------- | ----------------------------------------------------------------------- | -------------------------- |
| -f, --force             |                                                                         |
| -l, --location=location | ตำแหน่งแฟ้มข้อมูลของโปรเจกต์                                            |
| --install-dependencies  | การติดตั้ง                                                              |
| --npm                   | บังคับให้ใช้ NPM แทน yarn ใช้งานได้เฉพาะกับ `install-dependencies` flag |
| --specVersion=0.0.1     | 0.2.0 [default: 0.2.0]                                                  | เวอร์ชั่นที่ใช้กับโปรเจกต์ |

## ภาพรวม

### Top Level Spec

| Field           | v0.0.1                              | v0.2.0                      | Description                                      |
| --------------- | ----------------------------------- | --------------------------- | ------------------------------------------------ |
| **specVersion** | String                              | String                      | `0.0.1` หรือ `0.2.0` - เวอร์ชั่นของไฟล์ manifest |
| **name**        | 𐄂                                   | String                      | ชื่อโปรเจกต์ของคุณ                               |
| **version**     | 𐄂                                   | String                      | เวอร์ชั่นโปรเจกต์ของคุณ                          |
| **description** | String                              | String                      | คำอธิบายโปรเจกต์ของคุณ                           |
| **repository**  | String                              | String                      | ตำแหน่ง Git repository ของโปรเจกต์คุณ            |
| **schema**      | String                              | [Schema Spec](#schema-spec) | ตำแหน่งไฟล์ GraphQL schema ของคุณ                |
| **network**     | [Network Spec](#network-spec)       | Network Spec                | รายละเอียดของเครือข่ายที่จะถูกนำทำดัชนี          |
| **dataSources** | [DataSource Spec](#datasource-spec) | DataSource Spec             |                                                  |

### Schema Spec

| Field    | v0.0.1 | v0.2.0 | Description                       |
| -------- | ------ | ------ | --------------------------------- |
| **file** | 𐄂      | String | ตำแหน่งไฟล์ GraphQL schema ของคุณ |

### Network Spec

| Field           | v0.0.1 | v0.2.0        | Description                                                                                                                                                                                     |
| --------------- | ------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **genesisHash** | 𐄂      | String        | Genesis Hash ของเครือข่าย                                                                                                                                                                       |
| **endpoint**    | String | String        | กำหนด wss หรือ ws ปลายทางของ blockchain ที่ต้องการเรียบเรียง - **This must be a full archive node** คุณสามารถดึงข้อมูลปลายทางได้ใน parachains ได้ฟรีจาก [OnFinality](https://app.onfinality.io) |
| **dictionary**  | String | String        | ขอแนะนำให้ระบุ HTTP ปลายทางของระบบ full chain dictionary เพื่อเพิ่มความเร็วในการประมวลผล - อ่าน [วิธีการทำงานของ SubQuery](../tutorials_examples/dictionary.md)                                 |
| **chaintypes**  | 𐄂      | {file:String} | เส้นทางไปยังไฟล์เครือข่ายแต่ละประเภท ซึ่งรองรับรูปแบบ `.json` หรือ `.yaml`                                                                                                                      |

### Datasource Spec

กำหนดข้อมูลที่จะถูก คัดกรอง และ แยกออก จากตำแหน่งของตัวจัดการ mapping function handler สำหรับการแปลงข้อมูลที่จะนำไปใช้
| Field | v0.0.1 | v0.2.0 | Description |
| -------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name** | String | 𐄂 | ชื่อสำหรับแหล่งข้อูล |
| **kind** | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | ระบบรองรับประเภทข้อมูลจากเริ่มต้นของซับสเตรต เช่น บล็อก เหตุการณ์ และ extrinsic(call)) <br /> ตั้งแต่ v0.2.0 ระบบรองรับข้อมูลที่กำหนดเอง เช่น smart contact |
| **startBlock** | Integer | Integer | สิ่งนี้จะเปลี่ยนตำแหน่งการเริ่มต้นการจัดทำดัชนีของคุณ ตั้งค่าให้สูงกว่านี้เพื่อข้ามบล็อกเริ่มต้นที่มีข้อมูลน้อยลง |
| **mapping** | Mapping Spec | Mapping Spec | |
| **filter** | [network-filters](./manifest/#network-filters) | 𐄂 | กรองข้อมูลเพื่อดำเนินการตามชื่อข้อมูลเฉพาะของเครือข่าย |

### Mapping Spec

| Field                  | v0.0.1                                                                   | v0.2.0                                                                                  | Description                                                                                                                                                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **file**               | String                                                                   | 𐄂                                                                                       | ตำแหน่งไฟล์ของ mapping entry                                                                                                                                                                                                                |
| **handlers & filters** | [Default handlers and filters](./manifest/#mapping-handlers-and-filters) | Default handlers and filters, <br />[Custom handlers and filters](#custom-data-sources) | ลิสท์รายการ [mapping functions](./mapping/polkadot.md) ทั้งหมด และ handler type ที่เกี่ยวข้อง รวมไปถึง mapping filters <br /><br /> สำหรับการใช้ custom runtimes mapping handlers กรุณาดูต่อที่ [Custom data sources](#custom-data-sources) |

## Data Sources and Mapping

ในส่วนนี้ เราจะพูดถึงการใช้งาน default substrate runtime และการ mapping ซึ่งมีตัวอย่างดังนี้:

```yaml
dataSources:
  - kind: substrate/Runtime # ระบุค่าเริ่มต้น
    startBlock: 1 # สิ่งนี้จะเปลี่ยนบล็อคการเริ่มต้นการจัดทำดัชนีของคุณ ตั้งค่าให้สูงกว่านี้เพื่อข้ามบล็อกเริ่มต้นที่มีข้อมูลน้อยลง
    mapping:
      file: dist/index.js # เริ่มต้นการ mapping
```

### Mapping Handlers and Filters

จากตารางต่อไปนี้ จะอธิบาย filters ที่รองรับกับ handlers ที่หลากหลาย

**โปรเจ็คต์ SubQuery ของคุณจะมีประสิทธิภาพเพิ่มมากขึ้นเป็นอย่างมาก เมื่อคุณเพียงใช้ event และ call handlers ร่วมกับ mapping filters ที่เหมาะสม**

| Handlers (ตัวดำเนินการ)                             | Supported filter (ตัวกรองที่รองรับ) |
| --------------------------------------------------- | ----------------------------------- |
| [BlockHandler](./mapping/polkadot.md#block-handler) | `specVersion`                       |
| [EventHandler](./mapping/polkadot.md#event-handler) | `module`,`method`                   |
| [CallHandler](./mapping/polkadot.md#call-handler)   | `module`,`method` ,`success`        |

Runtime mapping filters เบื้องต้น เป็นฟีเจอร์ที่มีประโยชน์เป็นอย่างมาก ใช้ในการตัดสินใจว่า block, event หรือ extrinsic ใดจะใช้เรียก mapping handler

มีเพียงข้อมูลที่เข้ามาใหม่เท่านั้นที่จะเข้ากับเงื่อนไขในการกรอง และจะถูกประมวลผลโดย mapping functions Mapping filters เป็นตัวเลือกหนึ่ง แต่เราแนะนำเป็นอย่างยิ่งให้ใช้ เนื่องจากจะสามารถลดปริมาณข้อมูลที่จะต้องประมวลผลด้วยโปรเจกต์ SubQuery ของคุณได้มหาศาล และมันจะช่วยเพิ่มประสิทธิภาพในการทำดัชนีข้อมูล

```yaml
# ตัวอย่าง filter from callHandler
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

เมื่อเชื่อมต่อกับ Polkadot parachain หรือแม้แต่ custom substrate chain คุณจำเป็นจะต้องแก้ไขในส่วน [Network Spec](#network-spec) ของไฟล์ manifest นี้

`genesisHash` มักจะเป็น hash ของ block แรกในแต่ละเครือข่าย คุณสามารถยกเลิกค่าเหล่านี้ได้ง่ายๆ เพียงไปที่ [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) และมองหา hash บน **block 0** (ดูรูปประกอบด้านล่าง)

![Genesis Hash](/assets/img/genesis-hash.jpg)

นอกจากนี้ คุณจำเป็นจะต้องอัพเดท `endpoint` กำหนด wss เป็นจุดหมายปลายทางของ blockchain ที่ต้องการทำดัชนี - **จำเป็นต้องเป็น full archive node** คุณสามารถดึงข้อมูลปลายทางได้ใน parachains ได้ฟรีจาก [OnFinality](https://app.onfinality.io)

### Chain Types

คุณสามารถทำดัชนีข้อมูลจาก custom chains ได้ โดยการกำหนด chain types ใน manifest

พวกเรารองรับชนิดเพิ่มเติมที่ถูกใช้โดย substrate runtime modules โดยรองรับ `typesAlias`, `typesBundle`, `typesChain`, และ `typesSpec`

ใน v0.2.0 ตัวอย่างดังต่อไปนี้ `network.chaintypes` จะถูกชี้ไปที่ไฟล์ที่มี custom types ทั้งหมด นี่จะเป็นมาตรฐานของไฟล์ chainspec ที่ใช้ในการแสดงผลในรูปแบบ blockchain โดยรองรับทั้งรูปแบบ `.json`, `.yaml` หรือ `.js`.

::: code-tabs @tab v0.2.0 `yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # The relative filepath to where custom types are stored ...`
@tab v0.0.1 `yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter:  #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true` :::

หากต้องการใช้ typescript สำหรับเครือข่ายของคุณจะอยู่ใน `src` แฟ้มข้อมูล (e.g. `./src/types.ts`), run `yarn build` จากนั้นชี้ไปที่ไฟล์ js ที่ถูกสร้างขึ้นซึ่งอยู่ในไฟล์ `dist` ของแฟ้มข้อมูล

```yml
network:
  chaintypes:
    file: ./dist/types.js # Will be generated after yarn run build
```

สิ่งที่ควรทราบเกี่ยวกับการใช้งาน chain types file ด้วยนามสกุล `.ts` หรือ `.js`:

- ไฟล์ manifest version ต้องเป็นเวอร์ชั่น v0.2.0 หรือสูงกว่า
- มีเพียง default export เท่านั้นที่จะถูกรวมไปใน [polkadot api](https://polkadot.js.org/docs/api/start/types.extend/) เมื่อดึงข้อมูลจาก blocks

นี่คือตัวอย่างของ `.ts` ไฟล์ chain types:

::: code-tabs @tab types.ts `ts import { typesBundleDeprecated } from "moonbeam-types-bundle" export default { typesBundle: typesBundleDeprecated }; ` :::

## Custom Data Sources

Custom Data Sources จะระบุฟังก์ชันของ network ที่กำหนด ที่จะทำให้จัดการกับข้อมูลได้ง่ายยิ่งขึ้น โดยการทำงานจะทำหน้าที่เสมือนตัวกลาง ที่จะช่วยในการคัดกรองเพิ่มเติมและการนำส่งของข้อมูล

ตัวอย่างที่ดีของอันนี้ คือการรองรับ EVM สามารถมีการประมวลผล data source สำหรับ EVM หมายความว่าคุณสามารถทำการกรองข้อมูลได้ตั้งแต่ระดับ EVM (e.g. กรอง contract methods หรือ logs) และข้อมูลเหล่านั้นจะถูกแปลงเป็นโครงสร้างที่ใกล้เคียงกับ Ethereum ecosystem เฉกเช่นเดียวกับการดึง parameters ด้วย ABIs.

Custom Data Sources สามารถใช้ร่วมกับ normal data sources.

นี่คือรายการ custom datasources ที่รองรับ:

| Kind                                                  | Supported Handlers                                                                                       | Filters                         | Description                                                                            |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------------- |
| [substrate/Moonbeam](./moonbeam/#data-source-example) | [substrate/MoonbeamEvent](./moonbeam/#moonbeamevent), [substrate/MoonbeamCall](./moonbeam/#moonbeamcall) | See filters under each handlers | ช่วยให้สื่อสารกับ EVM transaction ได้ง่าย และเหมือนกับที่เกิดขึ้นบน Moonbeams networks |

## Network Filters

**Network filters จะใช้เฉพาะใน manifest spec v0.0.1**.

โดยทั่วไปผู้ใช้จะสร้าง SubQuery และจะนำมาใช้ทั้ง testnet และ mainnet environments (e.g. Polkdaot และ Kusama) ระหว่างเครือข่าย ตัวแปรต่างๆ มักจะแตกต่างกัน (เช่น บล็อกเริ่มต้นดัชนี) นอกจากนี้ เราอนุญาติให้ผู้ใช้งานสามารถกำหนดรายละเอียดในแต่ละ data source ได้ นั่นหมายความว่าในหนึ่งโปรเจกต์ SubQuery จะสามารถนำไปใช้ได้หลายเครือข่าย

ผู้ใช้งานสามารถเพิ่ม `filter` บน `dataSources` เพื่อเลือกว่า data source ใดจะใช้ในแต่ละเครือข่าย

ด้านล่างนี้คือตัวอย่างที่แสดงแหล่งข้อมูลต่างๆ สำหรับทั้งเครือข่าย Polkadot และ Kusama

::: code-tabs @tab v0.0.1 `yaml --- network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' #Create a template to avoid redundancy definitions: mapping: &mymapping handlers: - handler: handleBlock kind: substrate/BlockHandler dataSources: - name: polkadotRuntime kind: substrate/Runtime filter: #Optional specName: polkadot startBlock: 1000 mapping: *mymapping #use template here - name: kusamaRuntime kind: substrate/Runtime filter: specName: kusama startBlock: 12000 mapping: *mymapping # can reuse or change `

:::
