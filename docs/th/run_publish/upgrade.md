# Deploy โปรเจกต์ SubQuery เวอร์ชันใหม่ของคุณ

## แนวทาง

แม้ว่าคุณจะมีอิสระในการอัปเกรดและ deploy โปรเจกต์ SubQuery เวอร์ชันใหม่ของคุณได้ตลอดเวลา แต่โปรดเอาใจใส่กระบวนการนี้หากโปรเจกต์ SubQuery ของคุณเป็นแบบสาธารณะที่ทุกคนสามารถเข้าถึงได้ โดยมีประเด็นสำคัญที่ควรทราบดังนี้:

- หากการอัปเกรดของคุณเป็นการเปลี่ยนแปลงครั้งใหญ่ ให้คุณสร้างสร้างโปรเจกต์ใหม่ (เช่น `My SubQuery Project V2`) หรือให้คอมมูนิตี้ของคุณรับทราบถึงการเปลี่ยนแปลงมากมายผ่านช่องทางโซเชียลมีเดีย
- การ deploy โปรเจกต์ SubQuery เวอร์ชันใหม่ ส่งผลให้เกิดการ downtime เนื่องจากเวอร์ชันใหม่ต้องจัดทำดัชนีข้อมูล chain ทั้งหมดทั้งหมดจาก genesis block

## Deploy การเปลี่ยนแปลง

There are three methods to deploy a new version of your project to the SubQuery Managed Service: you can use the UI, create it directly via the `subql` cli tool, or use an automated GitHub action.

### Using the UI

Log into SubQuery Project and select the project you want to deploy a new version of. You can choose to either deploy to the production or staging slot. These two slots are isolated environments and each has their own databases and synchronise independently.

We recommend deploying to your staging slot only for final staging testing or when you need to resync your project data. You can then promote it to production with zero downtime. You will find testing is faster when [running a project locally](../run_publish/run.md) as you can more [easily debug issues](../academy/tutorials_examples/debug-projects.md).

The staging slot is perfect for:

- การตรวจสอบการเปลี่ยนแปลงโปรเจกต์ SubQuery ในสภาพแวดล้อมที่แยกจากกัน Staging slot มี URL ที่แตกต่างไปจากการ production ที่คุณสามารถใช้ได้ใน dApps ของคุณ
- Warming up and indexing data for an updated SubQuery project to eliminate downtime in your dApp.
- การเตรียมปล่อยเวอร์ชันใหม่สำหรับโปรเจกต์ SubQuery ของคุณโดยไม่เปิดเผยต่อสาธารณะ Staging slot จะไม่ปรากฏต่อสาธารณะใน Explorer และมี URL เฉพาะที่มองเห็นได้เฉพาะคุณเท่านั้น

![Staging slot](/assets/img/staging_slot.png)

Fill in the IPFS CID of the new version of your SubQuery project codebase that you want deployed (see the documetation to publish to IPFS [here](./publish.md). การกรอก Commit Hash จาก GitHub จะทำให้มี downtime นานขึ้น ซึ่งขึ้นอยู่กับเวลาที่ใช้ในการจัดทำ index ข้อมูลของเชนปัจจุบัน คุณสามารถรายงาน progress ของคุณได้ที่นี่

### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our Managed Service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ready.

```shell
// You can directly set your Indexer and Query versions
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// OR you can use the interface, it will validate your IPFS CID and render a list of image versions that matches your manifest file `project.yaml`

$ subql deployment:deploy
```

### Using GitHub actions

With the introduction of the deployment feature for the CLI, we've added a **Default Action Workflow** to [the starter project in GitHub](https://github.com/subquery/subql-starter/blob/main/Polkadot/Polkadot-starter/.github/workflows/cli-deploy.yml) that will allow you to publish and deploy your changes automatically:

- Step 1: After pushing your project to GitHub, create `DEPLOYMENT` environment on GitHub, and add the secret [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) to it.
- Step 2: If you haven't already, create a project on [SubQuery Managed Service](https://managedservice.subquery.network). This can be done using the the [UI](#using-the-ui) or [CLI](#using-the-cli).
- Step 3: Once your project is created, navigate to the GitHub Actions page of your project, and select the workflow `CLI deploy`.
- Step 4: You'll see an input field where you can enter the unique code of your project created on SubQuery Projects. You can get the code from the URL in SubQuery's Managed Service [SubQuery Managed Service](https://managedservice.subquery.network). The code is based on the name of your project, where spaces are replaced with hyphens `-`. e.g. `my project name` becomes `my-project-name`.

::: tips Tip
Once the workflow is complete, you should be able to see your project deployed to our Managed Service.
:::

A common approach is to extend the default GitHub Action to automatically deploy changes to our Managed Service when code is merged into the main branch. The following change to the GitHub Action workflow do this:

```yml
on:
  push:
    branches:
      - main
jobs:
  deploy:
    name: CLI Deploy
    ...
```

## Upgrade to the Latest Indexer and Query Service

If you just want to upgrade to the latest indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) or query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) to take advantage of our regular performance and stability improvements, just select a newer versions of our packages and save. This will cause only a few minutes of downtime as the services running your project are restarted.

## ขั้นตอนต่อไป - เชื่อมต่อกับโปรเจกต์ของคุณ

เมื่อการ deploy ของคุณเสร็จสมบูรณ์ และ โหนดของเราได้ทำจัดทำดัชนีข้อมูลของคุณจาก chain แล้ว คุณจะสามารถเชื่อมต่อกับโปรเจกต์ผ่าน GraphQL Query endpoint ที่ปรากฎขึ้นมา

![โปรเจกต์ที่กำลัง deploy และ sync](/assets/img/projects_deploy_sync.png)

หรือคุณสามารถคลิกที่จุดสามจุดถัดจากชื่อโปรเจกต์ของคุณ และดูบน SubQuery Explorer There you can use the in browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![Projects in SubQuery Explorer](/assets/img/projects_explorer.png)

::: tip Note Learn more about the [GraphQL Query language.](./graphql.md) :::
