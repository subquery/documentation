# เผยแพร่โปรเจกต์ SubQuery ของคุณ

## ประโยชน์ของการโฮสต์โปรเจคของคุณกับ SubQuery

- เราจะดำเนินการโปรเจกต์ SubQuery ของคุณด้วยบริการที่มีประสิทธิภาพสูง สามารถปรับขนาดได้ และมีการจัดการแบบบริการสาธารณะ
- บริการนี้เป็นบริการฟรีให้กับคอมมูนิตี้ของเรา
- คุณสามารถกำหนดให้โปรเจกต์ของคุณเป็นแบบสาธารณะเพื่อให้โปรเจกต์ของคุณถูกลิสต์อยู่ใน [SubQuery Explorer](https://explorer.subquery.network) และทุกคนทั่วโลกสามารถดูได้
- เราทำงานร่วมกับ GitHub ดังนั้นทุกคนใน GitHub Organization ของคุณจะสามารถดูโปรเจกต์ขององค์กรที่ใช้ร่วมกันได้

## สร้างโปรเจกต์แรกของคุณใน SubQuery Projects

### การโฮสต์ Project Codebase

มีสองวิธีที่คุณจะสามารถโฮสต์โปรเจกต์ SubQuery ของคุณก่อนทำการเผยแพร่

**GitHub**: codebase โปรเจกต์ของคุณต้องอยู่ใน GitHub repository แบบสาธารณะ

**IPFS**: โปรเจกต์ของคุณสามารถจัดเก็บอยู่ในรูปแบบ IPFS, คุณสามารถดูคู่มือสำหรับการโฮสต์ IPFS ได้ที่ [การเผยแพร่แบบ IPFS](ipfs.md)

### การเข้าสู่ระบบ SubQuery Projects

ก่อนจะเริ่มต้น โปรดตรวจสอบให้แน่ใจว่าโปรเจกต์ SubQuery ของคุณได้ออนไลน์อยู่บน GitHub repository สาธารณะ หรือ อยู่บน IPFS เรียบร้อยแล้ว โดยไฟล์ `schema.graphql` จะต้องอยู่ในไดเรกทอรีเริ่มต้นของคุณ

คุณสามารถสร้างโปรเจกต์แรกของคุณได้ที่ [project.subquery.network](https://project.subquery.network). โดยคุณจำเป็นต้องอนุญาตการเข้าถึงบัญชี GitHub ของคุณเพื่อเข้าสู่ระบบ

ในการเข้าสู่ระบบครั้งแรก คุณจะถูกขออนุญาตการเข้าถึงโดย SubQuery เราต้องการเพียงที่อยู่อีเมลเพื่อระบุบัญชีของคุณ และเราไม่ใช้ข้อมูลอื่น ๆ จากบัญชี GitHub ของคุณเพื่อเหตุผลอื่น ๆ ในขั้นตอนนี้ คุณยังสามารถขอ หรือให้สิทธิ์ในการเข้าถึงบัญชี GitHub Organization ของคุณ เพื่อโพสต์ โปรเจกต์ SubQuery ภายใต้ GitHub Organization แทนที่จะเป็นบัญชีส่วนตัวของคุณ

![เพิกถอนการอนุมัติจากบัญชี GitHub](/assets/img/project_auth_request.png)

SubQuery Projects คือที่ที่คุณสามารถจัดการทุกโฮสต์โปรเจกต์ที่คุณอัพโหลดไปที่แพลตฟอร์ม SubQuery คุณสามารถสร้าง ลบ และอัปเกรด ทุกโปรเจกต์จากแอปพลิเคชันนี้

![เข้าสู่โปรเจกต์](/assets/img/projects-dashboard.png)

ถ้าคุณเชื่อมต่อบัญชี GitHub Organization แล้ว คุณสามารถใช้ switcher ที่อยู่ด้านบนเพื่อเปลี่ยนระหว่างบัญชีส่วนตัวและบัญชี GitHub Organization ของคุณได้ โปรเจกต์ที่สร้างในบัญชี GitHub Organization จะถูกแบ่งปันกันระหว่างสมาชิกภายในองค์กร คุณสามารถเชื่อมต่อบัญชี GitHub Organization ของคุณได้โดย [การทำตามขั้นตอนเหล่านี้](#add-github-organization-account-to-subquery-projects)

![สลับระหว่างบัญชี GitHub](/assets/img/projects-account-switcher.png)

### สร้างโปรเจกต์แรกของคุณ

There are two methods to create a project in the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

#### Using the UI

Let's start by clicking on "Create Project". You'll be taken to the New Project form. Please enter the following (you can change this in the future):

- **บัญชี GitHub:** หากคุณมีบัญชี GitHub มากกว่าหนึ่งบัญชี ให้เลือกบัญชีที่จะใช้สร้างโปรเจ็กต์นี้ โปรเจกต์ที่สร้างในบัญชี GitHub Organization สามารถแบ่งปันกันระหว่างสมาชิกภายในองค์กรได้
- **ชื่อโปรเจกต์**
- **ชื่อรอง (Subtitle)**
- **คำอธิบาย**
- **GitHub Repository URL:** ต้องเป็น GitHub URL ที่ถูกต้องที่อยู่ใน repository สาธารณะที่มีโปรเจกต์ SubQuery ของคุณ โดยไฟล์ `schema.graphql` ต้องอยู่ในไดเรกทอรีเริ่มต้นของคุณ ([เรียนรู้เพิ่มเติมเกี่ยวกับโครงสร้างไดเร็กทอรี](../create/introduction.md#directory-structure))
- **ฐานข้อมูล:** ลูกค้าระดับพรีเมียมสามารถเข้าถึงฐานข้อมูลเฉพาะเพื่อโฮสต์โปรเจกต์ SubQuery หากคุณสนใจ คุณสามารถติดต่อ [sales@subquery.network](mailto:sales@subquery.network) เพื่อเปิดการตั้งค่านี้
- **Deployment Source:** คุณสามารถเลือกที่จะจัดโปรเจกต์เพื่อใช้งานจาก GitHub repository หรือ จาก IPFS CID ก็ได้ โดยคุณสามารถดูคำแนะนำของเราเกี่ยวกับ [การโฮสต์กับ IPFS.](ipfs.md)
- **ซ่อนโปรเจกต์:** หากคุณเลือกที่จะซ่อนโปรเจกต์ โปรเจกต์ของคุณจะไม่ปรากฎบน SubQuery explorer สาธารณะ อย่าเลือกตัวเลือกนี้ หากคุณต้องการแบ่งปัน SubQuery ของคุณแก่คอมมูนิตี้! ![สร้างโปรเจกต์แรกของคุณ](/assets/img/projects-create.png)

Create your project and you'll see it on your SubQuery Project's list. _We're almost there! We just need to deploy a new version of it._

![Created Project with no deployment](/assets/img/projects-no-deployment.png)

#### Using the CLI

You can also use `@subql/cli` to publish your project to our managed service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN](/docs/run_publish/ipfs.md#prepare-your-subqlaccesstoken) ready.

```shell
// Creating a project using the CLI
$ subql project:create-project

// OR using non-interactive, it will prompt you if the required fields are missing
$ subql project:create-project
    --apiVersion=apiVersion      Api version is default to 2
    --description=description    Enter description
    --gitRepo=gitRepo            Enter git repository
    --org=org                    Enter organization name
    --project_name=project_name  Enter project name
```

### Deploy your First Version

There are two methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

#### Using the UI

While creating a project will setup the display behaviour of the project, you must deploy a version of it before it becomes operational. Deploying a version triggers a new SubQuery indexing operation to start, and sets up the required query service to start accepting GraphQL requests. You can also deploy new versions to existing projects here.

With your new project, you'll see a Deploy New Version button. Click this, and fill in the required information about the deployment:

- **Branch:** From GitHub, select the branch of the project that you want to deploy from
- **Commit Hash:** From GitHub, select the specific commit of the version of your SubQuery project codebase that you want deployed
- **IPFS:** If deploying from IPFS, paste you IPFS deployment CID (without the leading `ipfs://`)
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here
- **Indexer Version:** This is the version of SubQuery's node service that you want to run this SubQuery on. See [`@subql/node`](https://www.npmjs.com/package/@subql/node)
- **Query Version:** This is the version of SubQuery's query service that you want to run this SubQuery on. See [`@subql/query`](https://www.npmjs.com/package/@subql/query)

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

#### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our managed service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN](/docs/run_publish/ipfs.md#prepare-your-subqlaccesstoken) ready.

```shell
// Deploy using the CLI
$ suqbl deployment:deploy

// OR Deploy using non-interactive CLI
$ suqbl deployment:deploy
  --dict=dict                      Enter Dictionary Endpoint
  --endpoint=endpoint              Enter Network Endpoint
  --indexerVersion=indexerVersion  Enter indexer-version
  --ipfsCID=ipfsCID                Enter IPFS CID
  --org=org                        Enter Organization Name
  --project_name=project_name      Enter Project Name
  --queryVersion=queryVersion      Enter Query-version
  --type=type                      Enter deployment type e.g. primary or stage
```

## ขั้นตอนต่อไป - เชื่อมต่อกับโปรเจกต์ของคุณ

เมื่อการ deploy ของคุณเสร็จสมบูรณ์ และ โหนดของเราได้ทำจัดทำดัชนีข้อมูลของคุณจาก chain แล้ว คุณจะสามารถเชื่อมต่อกับโปรเจกต์ผ่าน GraphQL Query endpoint ที่ปรากฎขึ้นมา

![โปรเจกต์ที่กำลัง deploy และ sync](/assets/img/projects-deploy-sync.png)

หรือคุณสามารถคลิกที่จุดสามจุดถัดจากชื่อโปรเจกต์ของคุณ และดูบน SubQuery Explorer There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![Projects in SubQuery Explorer](/assets/img/projects-explorer.png)

## เพิ่มบัญชี GitHub Organization ในโปรเจกต์ SubQuery

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![สลับระหว่างบัญชี GitHub](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![เพิกถอนการอนุมัติจากบัญชี GitHub](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
