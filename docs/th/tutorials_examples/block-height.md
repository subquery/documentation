# จะเริ่มต้นที่ Block Height ที่ต่างกันได้อย่างไร?

## คู่มือวิดีโอ

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/ZiNSXDMHmBk" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## บทนำ

โดยค่าเริ่มต้น โปรเจ็กต์เริ่มต้นทั้งหมดจะเริ่มซิงโครไนซ์บล็อกเชนจากบล็อกแรก (Genesis Block) กล่าวอีกนัยหนึ่งคือเริ่มจากบล็อกที่ 1 สำหรับบล็อกเชนขนาดใหญ่ โดยปกติจะใช้เวลาหลายวันหรือหลายสัปดาห์ในการซิงโครไนซ์ให้สมบูรณ์

ในการเริ่มโหนด SubQuery ที่ซิงโครไนซ์จาก Block Height ที่ไม่ใช่ศูนย์ สิ่งที่คุณต้องทำคือแก้ไขไฟล์ project.yaml ของคุณและเปลี่ยนค่า startBlock

ด้านล่างเป็นไฟล์ project.yaml ที่ตั้งค่าบล็อกเริ่มต้นเป็น 1,000,000

```shell
specVersion: 0.0.1
description: ""
repository: ""
schema: ./schema.graphql
network:
  endpoint: wss://polkadot.api.onfinality.io/public-ws
  dictionary: https://api.subquery.network/sq/subquery/dictionary-polkadot
dataSources:
  - name: main
    kind: substrate/Runtime
    startBlock: 1000000
    mapping:
      handlers:
        - handler: handleBlock
          kind: substrate/BlockHandler

Text
XPath: /pre/code
```

## ทำไมไม่เริ่มจากศูนย์?

สาเหตุหลักคือสามารถลดเวลาที่ใช้ในการซิงโครไนซ์บล็อกเชนได้ ซึ่งหมายความว่าหากคุณสนใจเฉพาะธุรกรรมในช่วงเวลา 3 เดือนที่ผ่านมา คุณสามารถที่จะซิงโครไนซ์เฉพาะ 3 เดือนนั้น ทำให้เวลารอน้อยลง และคุณสามารถเริ่มการพัฒนาได้เร็วขึ้น

## ข้อเสียของการไม่เริ่มจากศูนย์คืออะไร?

ข้อเสียที่ชัดเจนที่สุดคือคุณจะไม่สามารถค้นหาข้อมูลบนบล็อกเชนสำหรับบล็อกที่คุณไม่มีได้

## จะทราบ Height ของบล็อกเชนปัจจุบันได้อย่างไร?

หากคุณกำลังใช้เครือข่าย Polkadot คุณสามารถไปที่ [https://polkascan.io/](https://polkascan.io/) เลือกเครือข่ายแล้วดูค่า "Finalized Block"

## ฉันต้องทำการ Rebuild หรือ Codegen หรือไม่?

ไม่ เนื่องจากคุณกำลังแก้ไขไฟล์ project.yaml ซึ่งโดยพื้นฐานแล้วเป็นไฟล์ที่ใช้สำหรับการกำหนดค่า คุณจะไม่ต้องทำการ Rebuild หรือ Regenerate โค้ด Typescript ใหม่
