# เผยแพร่โครงการ SubQuery ของคุณ

## ประโยชน์ในการโฮสต์โปรเจ็กต์ของคุณกับ SubQuery

- เราจะรันโปรเจ็กต์ SubQuery ให้กับคุณด้วยบริการที่มีประสิทธิภาพสูง สามารถปรับขนาดได้ และมีการจัดการแบบบริการสาธารณะ
- บริการนี้มอบให้กับชุมชนฟรี!
- คุณสามารถกำหนดให้โปรเจ็กต์ของคุณเป็นแบบสาธารณะเพื่อให้ลิสต์อยู่ใน [SubQuery Explorer](https://explorer.subquery.network) และทุกคนทั่วโลกสามารถดูได้
- เราผสานรวมกับ GitHub ดังนั้นทุกคนใน GitHub organisations ของคุณจะสามารถดูโปรเจ็กต์ขององค์กรที่ใช้ร่วมกันได้

## Create your first project in SubQuery Projects

### Project Codebase Hosting

There are two ways you can host your SubQuery project's codebase before publishing.

**GitHub**: Your project's codebase must be in a public GitHub repository

**IPFS**: Your project's codebase can be stored in IPFS, you can follow our IPFS hosting guide to see how to [first publish to IPFS](ipfs.md)

### Login to SubQuery Projects

Before starting, please make sure that your SubQuery project codebase is online in a public GitHub repository or on IPFS. The `schema.graphql` file must be in the root of your directory.

To create your first project, head to [project.subquery.network](https://project.subquery.network). You'll need to authenticate with your GitHub account to login.

On first login, you will be asked to authorize SubQuery. We only need your email address to identify your account, and we don't use any other data from your GitHub account for any other reasons. In this step, you can also request or grant access to your GitHub Organization account so you can post SubQuery projects under your GitHub Organization instead of your personal account.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

SubQuery Projects is where you manage all your hosted projects uploaded to the SubQuery platform. You can create, delete, and even upgrade projects all from this application.

![Projects Login](/assets/img/projects-dashboard.png)

If you have a GitHub Organization accounts connected, you can use the switcher on the header to change between your personal account and your GitHub Organization account. Projects created in a GitHub Organization account are shared between members in that GitHub Organization. To connect your GitHub Organization account, you can [follow the steps here](#add-github-organization-account-to-subquery-projects).

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

### Create your First Project

Let's start by clicking on "Create Project". You'll be taken to the New Project form. Please enter the following (you can change this in the future):

- **บัญชี GitHub:** หากคุณมีบัญชี GitHub มากกว่าหนึ่งบัญชี ให้เลือกบัญชีที่จะใช้สร้างโปรเจ็กต์นี้ โปรเจ็กต์ที่สร้างขึ้นในบัญชี GitHub organisation จะถูกแชร์ระหว่างสมาชิกใน organisation นั้นๆ โปรเจ็กต์ที่สร้างในบัญชี Github แบบองค์กร สามารถแบ่งปันกันระหว่างสมาชิกภายในองค์กรได้
- **Project Name**
- **ชื่อรอง (Subtitle)**
- **คำอธิบาย**
- **GitHub Repository URL:** ต้องเป็น GitHub URL ที่ใช้งานได้ซึ่งชี้ไปยัง repositoryสาธารณะที่มีโปรเจ็กต์ SubQuery ของคุณ ไฟล์ `schema.graphql` ต้องอยู่ในรูทของไดเร็กทอรีของคุณ ([เรียนรู้เพิ่มเติมเกี่ยวกับโครงสร้างไดเร็กทอรี](../create/introduction.md#directory-structure)) ไฟล์ schema.graphql ต้องอยู่ในไดเร็กทอรีเริ่มต้นของคุณ (เรียนรู้เพิ่มเติมเกี่ยวกับโครงสร้างไดเร็กทอรี)
- **Database:** Premium customers can access dedicated databases to host production SubQuery projects from. If this interests you, you can contact [sales@subquery.network](mailto:sales@subquery.network) to have this setting enabled.
- **Deployment Source:** You can choose to have the project deployed from the GitHub repository or alternatively deployed from a IPFS CID, see our guide about [hosting with IPFS.](ipfs.md)
- **Hide project:** หากเลือก จะเป็นการซ่อนโปรเจ็กต์จาก SubQuery explorer สาธารณะ อย่าเลือกตัวเลือกนี้หากคุณต้องการแชร์ SubQuery ของคุณกับชุมชน! อย่าเลือกตัวเลือกนี้ หากคุณต้องการแบ่งปันโปรเจ็กต์ SubQuery ของคุณแก่ชุมชน ![Create your first Project](/assets/img/projects-create.png)

Create your project and you'll see it on your SubQuery Project's list. _We're almost there! We just need to deploy a new version of it._

![Created Project with no deployment](/assets/img/projects-no-deployment.png)

### Deploy your first Version

While creating a project will setup the display behaviour of the project, you must deploy a version of it before it becomes operational. การ deploy เวอร์ชัน จะทริกเกอร์การทำ SubQuery indexing ใหม่ในการเริ่มต้น และทำการตั้งค่า query service ที่จำเป็นเพื่อเริ่มยอมรับ GraphQL requests คุณยังสามารถ deploy เวอร์ชันใหม่กับโปรเจ็กต์ที่มีอยู่ได้ที่นี่

With your new project, you'll see a Deploy New Version button. Click this, and fill in the required information about the deployment:

- **Branch:** From GitHub, select the branch of the project that you want to deploy from
- **Commit Hash:** From GitHub, select the specific commit of the version of your SubQuery project codebase that you want deployed
- **IPFS:** If deploying from IPFS, paste you IPFS deployment CID (without the leading `ipfs://`)
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here
- **Indexer Version:** คือเวอร์ชันของ node service ของ SubQuery ที่คุณต้องการรัน SubQuery See [`@subql/node`](https://www.npmjs.com/package/@subql/node)
- **Query Version:** คือเวอร์ชันของ query service ของ SubQuery ที่คุณต้องการรัน SubQuery See [`@subql/query`](https://www.npmjs.com/package/@subql/query)

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

## ขั้นตอนต่อไป - เชื่อมต่อกับโปรเจ็กต์ของคุณ

เมื่อการ deploy ของคุณเสร็จสมบูรณ์ และ node ของเราได้ทำการ index ข้อมูลของคุณจาก chain แล้ว คุณจะสามารถเชื่อมต่อกับโปรเจ็กต์ผ่าน GraphQL Query endpoint ที่ปรากฎขึ้นมา

![โปรเจ็กต์ที่กำลัง deploy และ sync แล้ว](/assets/img/projects-deploy-sync.png)

หรือคุณสามารถคลิกที่จุดสามจุดถัดจากชื่อโปรเจ็กต์ของคุณ แล้วดูใน SubQuery Explorer There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../query/query.md).

![โปรเจ็กต์ใน SubQuery Explorer](/assets/img/projects-explorer.png)

## เพิ่มบัญชี GitHub Organization ในโปรเจ็กต์ SubQuery

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
