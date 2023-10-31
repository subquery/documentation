# Publish to Managed Services

## Benefits of hosting your project with SubQuery's Managed Service

The biggest dApps depend on SubQuery's enterprise level Managed Service. With 100's of millions of daily requests and hundreds of active projects, SubQuery's Managed Service provides industry leading hosting for our customers.

- 我们将在高性能、可扩展和托管的公共服务中为您运行 SubQuery 项目。
- 此服务正在免费提供给社区！ You can host your first two SubQuery projects for absolutely free!
- 你可以公开你的项目，以便他们被列入 [SubQuery Explorer](https://explorer.subquery.network) 中，世界各地的任何人都可以查看这些项目.

You can upgrade to take advantage of the following paid services:

- Production ready hosting for mission critical data with zero-downtime blue/green deployments
- Dedicated databases
- Multiple geo-redundant clusters and intelligent routing
- Advanced monitoring and analytics.

## Publish your SubQuery project to IPFS

When deploying to SubQuery's Managed Service, you must first host your codebase in [IPFS](https://ipfs.io/). Hosting a project in IPFS makes it available for everyone and reduces your reliance on centralised services like GitHub.

:::warning GitHub Deployment flows have been deprecated for IPFS

If your project is still being deployed via GitHub, read the migration guide for IPFS deployments [here](../miscellaneous/ipfs.md) :::

### 安装要求

- `@subql/cli` 版本 0.21.0 或以上.
- Manifest `specVersion` 1.0.0 and above.
- Get your SUBQL_ACCESS_TOKEN ready.
- To make sure your deployment is successful, we strongly recommend that you build your project with the `subql build` command, and test it locally before publishing.

### 准备您的 SUBQL_ACCESS_TOKEN

- Step 1: Go to [SubQuery Managed Service](https://managedservice.subquery.network/) and log in.
- Step 2: Click on your profile at the top right of the navigation menu, then click on **_Refresh Token_**.
- 步骤3:复制生成的令牌。
- 步骤4：使用此令牌：
  - 选项1：在您的环境变量中添加SUBQL_ACCESS_TOKEN。 `EXPORT SUBQL_ACCESS_TOKEN=<token>` (Windows) or `export SUBQL_ACCESS_TOKEN=<token>` (Mac/Linux)
  - 选项2：在即将到来的新版本中， `subql/cli` 将支持本地存储您的 SUBQL_ACCESS_TOKEN

### 如何发布一个项目

Run the following command, which will read the project's default manifest `project.ts` for the required information.

```
// 从你项目的根目录发布
subql publish

// 或指向你的项目根目录
subql publish -f ~/my-project/
```

Alternatively, if your project has multiple manifest files, for example you support multiple networks but share the same mapping and business logic, and have a project structure as follows:

```
L projectRoot
 L src/
 L package.json
 L polkadot.yaml (Polkadot 网络的清单)
 L kusama.yaml (Kusama 网络的清单)
...
```

您可以随时发布您选定的清单文件的项目。

```
 # 这将发布支持索引Polkadot 网络
subql publish -f ~/my-projectRoot/polkadot.yaml
```

After successfully publishing the project, the logs below indicate that the project was created on the IPFS cluster and have returned its `CID` (Content Identifier). Please note down this `CID`.

```
Building and packing code... done
Uploading SupQuery project to IPFS
SubQuery Project uploaded to IPFS: QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd  //CID
```

Note: With `@subql/cli` version 1.3.0 or above, when using `subql publish`, a copy of the project's `IPFS CID` will be stored in a file in your project directory. The naming of the file will be consistent with your project.ts. For example, if your manifest file is named `project.ts`, the IPFS file will be named `.project-cid`.

::: details What happens during IPFS Deployment?

IPFS的部署代表着分散网络上一个SubQuery项目的独立独特的存在。 因此，对项目代码的任何修改都会影响到项目的独特性。 如果您需要调整您的业务逻辑，例如更改映射功能，您必须重新发布项目， `CID`将会改变。

For now, to view the project you have published, use a `REST` API tool such as [Postman](https://web.postman.co/), and use the `POST` method with the following example URL to retrieve it:`https://ipfs.subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`.

You should see the example project deployment as below.

此部署看起来与您的清单文件非常相似。 您可以预知这些描述性的字段。 且因为网络和字典端点并不直接影响项目执行的结果而导致他们被删除出字段。

这些文件在您的本地项目中已经被打包并发布到IPFS中。

```yaml
dataSources:
  - kind: substrate/Runtime
    mapping:
      file: ipfs://QmTTJKrMVzCZqmRCd5xKHbKymtQQnHZierBMHLtHHGyjLy
      handlers:
        - handler: handleBlock
          kind: substrate/BlockHandler
        - filter:
            method: Deposit
            module: balances
          handler: handleEvent
          kind: substrate/EventHandler
        - handler: handleCall
          kind: substrate/CallHandler
    startBlock: 8973820
network:
  genesisHash: "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3"
schema:
  file: ipfs://QmTP5BjtxETVqvU4MkRxmgf8NbceB17WtydS6oQeHBCyjz
specVersion: 0.2.0
```

:::

## Login to SubQuery Projects

To create your first project, head to [SubQuery Managed Service](https://managedservice.subquery.network). You'll need to authenticate with your GitHub account to login.

On first login, you will be asked to authorize SubQuery. We only need your email address to identify your account, and we don't use any other data from your GitHub account for any other reasons. In this step, you can also request or grant access to your GitHub Organization account so you can post SubQuery projects under your GitHub Organization instead of your personal account.

![Revoke approval from a GitHub account](/assets/img/run_publish/project_auth_request.png)

SubQuery Projects is where you manage all your hosted projects uploaded to the SubQuery platform. You can create, delete, and even upgrade projects all from this application.

![Projects Login](/assets/img/run_publish/projects_dashboard.png)

If you have a GitHub Organization accounts connected, you can use the switcher on the header to change between your personal account and your GitHub Organization account. Projects created in a GitHub Organization account are shared between members in that GitHub Organization. To connect your GitHub Organization account, you can [follow the steps here](publish.md#add-github-organization-account-to-subquery-projects).

![Switch between GitHub accounts](/assets/img/run_publish/projects_account_switcher.png)

## Create Your First Project

Before starting, please make sure that your SubQuery project codebase is published to IPFS.

There are two methods to create a project in the SubQuery Managed Service: you can use the UI or directly via the `subql` cli tool

### Using the UI

Start by clicking on "Create Project". You'll be taken to the new project form. Please enter the following (you can change this in the future):

- **Project Name:** Name your project.
- **Description:** Provide a description of your project.
- **Database:** Premium customers can access dedicated databases to host production SubQuery projects from. If this interests you, you can contact [sales@subquery.network](mailto:sales@subquery.network) to have this setting enabled.
- **Visible in Explorer:** If selected, this will show the project from the public SubQuery explorer to share with the community.

![Create your first Project](/assets/img/run_publish/projects_create.png)

Create your project and you'll see it on your SubQuery Project's list. Next, we just need to deploy a new version of it.

![Project created](/assets/img/run_publish/project_created.png)

### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our Managed Service. Please follow the guide on how to [create a new project](./cli.md#create-a-new-project) on the SubQuery Managed Service in the [CLI documentation](./cli.md).

## Deploy your First Version

There are three methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly, via the `subql` cli tool, or using an automated GitHub Action.

### Using the UI

While creating a project will setup the display behaviour of the project, you must deploy a version of it before it becomes operational. Deploying a version triggers a new SubQuery indexing operation to start, and sets up the required query service to start accepting GraphQL requests. You can also deploy new versions to existing projects here.

With your new project, you'll see a "Deploy your first version" button. Click this, and fill in the required information about the deployment:

- **CID:** Provide your IPFS deployment CID (without the leading `ipfs://`). This can be acquired by running `subql publish` with the CLI. The rest of the fields should then auto-populate.
- **Manifest:** The details are obtained from the contents of the provided CID.
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here.
- **Indexer Version:** This is the version of SubQuery's node service that you want to run this SubQuery on. See [`@subql/node`](https://www.npmjs.com/package/@subql/node).
- **Query Version:** This is the version of SubQuery's query service that you want to run this SubQuery on. See [`@subql/query`](https://www.npmjs.com/package/@subql/query).
- **Advanced Settings:** There are numerous advanced settings which are explained via the inbuild help feature.

![Deploy your first Project](/assets/img/run_publish/projects_first_deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our Managed Service. Please follow the guide on how to [deploy to an existing project](./cli.md#deploy-a-new-version-of-your-project) on the SubQuery Managed Service in the [CLI documentation](./cli.md).

## Deploy new versions of your SubQuery project

Although you have the freedom to always upgrade and deploy new versions of your SubQuery project, please be considerate during this process if your SubQuery project is public to the world. 需要注意的一些要点如下：

- 如果你的升级是一次重大更新，或者创建一个新的项目(例如) `我的 SubQuery 项目 V2`，建议通过您社交媒体如推特、电报等给您的社区足够的事前告知与注意事项提醒。
- 部署一个新的 SubQuery 项目版本将会导致一些停机时间，因为新版本会从初始区块链中索引整个链。

有两种方法可以在 SubQuery 管理服务中部署新版本的项目。 您可以使用界面或直接通过 `subql` cli 工具。

### Using the UI

登录到 SubQuery 项目并选择你想要部署一个新版本的项目。 您可以选择部署到生产或暂存槽。 这两个插槽是各自独立的环境，各自都有自己的数据库并独立地同步进行。

我们建议仅在最终阶段测试或需要重新同步项目数据时部署到暂存槽。 然后，您可以在零停机时间的情况下将其推广到生产环境。 您会发现[在本地运行项目](../run_publish/run.md)时测试更快，因为您可以更[更轻松地调试问题](../academy/tutorials_examples/debug-projects.md)。

暂存槽非常适合：

- 在独立的环境中最后验证您的 SubQuery 项目的更改。 中转插槽有一个不同的用于生产的URL，可以在dApps中使用它。
- 为更新的 SubQuery 项目预热和索引数据，以消除 dApp 中的停机时间。
- 为您的SubQuery Project准备一个新版本，而不公开它。 中转插槽不会在Explorer中显示给公众，它有一个唯一的URL，仅对您可见。

![暂存槽位](/assets/img/run_publish/projects_staging_slot.png)

Fill in the IPFS CID of the new version of your SubQuery project codebase that you want deployed (see the documentation to publish to IPFS [here](#publish-your-subquery-project-to-ipfs). 这将导致更长的停机时间，取决于索引当前链所需的时间。 您可以一直在这里报告进度。

### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our Managed Service. Please follow the guide on how to [deploy a new version of your project](./cli.md#deploy-a-new-version-of-your-project) on the SubQuery Managed Service in the [CLI documentation](./cli.md).

### Using GitHub actions

With the introduction of the deployment feature for the CLI, we've added a **Default Action Workflow** to [the starter project in GitHub](https://github.com/subquery/subql-starter/blob/main/Polkadot/Polkadot-starter/.github/workflows/cli-deploy.yml) that will allow you to publish and deploy your changes automatically:

- Step 1: After pushing your project to GitHub, create `DEPLOYMENT` environment on GitHub, and add the secret [SUBQL_ACCESS_TOKEN](#prepare-your-subql_access_token) and another secret with the name `ENDPOINT` which matches the RPC API endpoint that you want to connect (you can retrieve this from your `project.ts` and include a private API key).
- Step 2: If you haven't already, create a project on [SubQuery Managed Service](https://managedservice.subquery.network). This can be done using the [UI](#using-the-ui) or [CLI](#using-the-cli).
- 第 3 步：一旦您的项目被创建，导航到您项目的 GitHub 动作页面，并选择工作流程 `CLI 部署`。
- 第 4 步：您将看到一个输入字段，您可以在这里输入在 SubQuery 项目上创建的项目的唯一代码。 You can get the code from the URL in SubQuery's Managed Service [SubQuery Managed Service](https://managedservice.subquery.network). 代码基于您项目的名称, 其中空格被连线替换 `-`。 例如： `我的项目名称` 变成 `我的项目名称`。

::: tip Tip

Once the workflow is complete, you should be able to see your project deployed to our Managed Service.

:::

一个常见的方法是扩展默认的 GitHub 动作，以便在代码合并到主页时自动对我们的管理服务进行更改。 以下对 GitHub 行动流程的更改做到这一点：

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

## 下一步 - 连接到您的项目

一旦您的部署成功完成并且我们的节点已经从该链中为您的数据编制了索引， 您可以通过显示的 GraphQL 查询端点连接到您的项目。

![正在部署和同步的项目](/assets/img/run_publish/projects_deploy_sync.png)

您也可以点击项目标题旁边的三个小点图标，从而在 SubQuery 浏览器上查看项目， 在这里您可以使用我们的区块链浏览器开始—— [阅读更多关于如何在这里使用](../query/query.md) 的信息。 There you can use the in browser playground to get started - [read more about how to use our Explorer's GraphQL playground here](../run_publish/query.md).

![Projects in SubQuery Explorer](/assets/img/run_publish/projects_explorer.png)

## Project Alert Notifications

[SubQuery Managed Service](https://managedservice.subquery.network) provides a service where you can receive alerts on the health status of your projects. This means you can be alerted in real-time when your project becomes unhealthy and you can quickly resolve the issue to avoid any impact to your users.

You can easily set up a webhook endpoint to receive alert notifications on the health status of your projects on the Alerting page inside of the [Managed Service](https://managedservice.subquery.network). All you need to do is enter the URL of the endpoint that you would like us to send webhooks to (e.g. Slack, Telegram). For example, you can easily receive notifications in [Slack by following this guide](https://api.slack.com/messaging/webhooks), or [Discord by following this guide](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).

[SubQuery Managed Service](https://managedservice.subquery.network) makes POST requests to send these notifications to your specified endpoint as a JSON payload. You can then use these notifications to execute actions in your backend systems. The JSON payload is in the following format

```json
{
  "event_type": "indexer_unhealthy", // Event Type enum
  "event_message": "The indexer service for [jamesbayly/transaction-list][primary] is now unhealthy",
  "text": "The indexer service for [https://explorer.subquery.network/subquery/jamesbayly/projects/transaction-list> ][primary] is now unhealthy", // A longer version of event_message that is compatible with Slack
  "project": "jamesbayly/transaction-list", // Project key
  "project_name": "Polkadot Transactions",
  "project_url": "https://explorer.subquery.network/subquery/jamesbayly/projects/transaction-list?stage=false",
  "slot": "primary" // Either primary or stage
}
```

We currently support the following event types.

| Event Type           | What will trigger this event                                        |
| -------------------- | ------------------------------------------------------------------- |
| `block_sync_stalled` | The block height has stalled in the last 15 mins                    |
| `block_sync_recover` | The block height resumes syncing after a `block_sync_stalled` event |
| `indexer_unhealthy`  | The Indexer service transitions to unhealthy                        |
| `indexer_healthy`    | The Indexer service transitions to healthy status                   |
| `query_unhealthy`    | The Query service transitions to unhealthy                          |
| `query_healthy`      | The Query service transitions to healthy status                     |
| `deployment_started` | A deployment starts                                                 |
| `deployment_success` | A deployment succeeds                                               |
| `deployment_failed`  | A deployment fails                                                  |

## 升级到最新索引和查询服务

如果只想升级到最新的索引器（[`@subql/node`](https://www.npmjs.com/package/@subql/node)）或查询服务（

`@subql/query`</ 2>) 要利用我们常规的性能和稳定性改进，只需选择更新版本的软件包并保存即可。 当运行您的项目的服务重新启动时，这只会导致几分钟的停用。</p> 



## Add GitHub Organization Account to SubQuery Projects

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Managed Service](https://managedservice.subquery.network) using the account switcher.

If you can't see your GitHub Organization account listed in the switcher, then you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. Then, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/run_publish/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Managed Service](https://managedservice.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an administrator to enable this for you.

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
