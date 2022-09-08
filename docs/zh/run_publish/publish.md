# Publish to Managed Services

## Benefits of hosting your project with SubQuery's Managed Service

The biggest dApps depend on SubQuery's enterprise level Managed Service - with 100s of millions of daily requests and hundreds of active projects, SubQuery's Managed Service provides industry leading hosting for our customers.

- 我们将在高性能、可扩展和托管的公共服务中为您运行 SubQuery 项目。
- 此服务正在免费提供给社区！ You can host your first two SubQuery projects for absolutely free!
- 你可以公开你的项目，以便他们被列入 [SubQuery Explorer](https://explorer.subquery.network) 中，世界各地的任何人都可以查看这些项目.
- 我们已经与 GitHub 集成，因此您的 GitHub 组织中的任何人都可以查看共享的组织项目.

You can upgrade to take advantage of the following paid services:

- Production ready hosting for mission critical data with zero-downtime blue/green deployments
- Dedicated databases
- Multiple geo-redundant clusters and intelligent routing
- Advanced monitoring and analytics.

## Publish your SubQuery project to IPFS

When deploying to SubQuery's Managed Service, you must first host your codebase in [IPFS](https://ipfs.io/). Hosting a project in IPFS makes it available for all and reduces your reliance on centralised services like GitHub.

:::warning GitHub Deployment flows have being deprecated for IPFS

If your project is still being deployed via GitHub, read the migration guide for IPFS deployments [here](./ipfs.md) :::

### 安装要求

- `@subql/cli` 版本 0.21.0 或以上.
- Manifest `specVersion` 1.0.0 and above.
- Get your [SUBQL_ACCESS_TOKEN](ipfs.md#prepare-your-subql-access-token) ready.
- 为了确保您的部署成功，我们强烈建议您使用 `subql build` 命令来构建您的项目。 并在发布前在本地测试它。

### 准备您的 SUBQL_ACCESS_TOKEN

- 步骤1：去 [SubQuery Projects](https://project.subquery.network/) 并登录。
- Step 2: Click on your profile at the top right of the navigation menu, then click on **_Refresh Token_**.
- 步骤3:复制生成的令牌。
- 步骤4：使用此令牌：
  - 选项1：在您的环境变量中添加SUBQL_ACCESS_TOKEN。 `EXPORT SUBQL_ACCESS_TOKEN=<token>` (Windows) or `export SUBQL_ACCESS_TOKEN=<token>` (Mac/Linux)
  - 选项2：在即将到来的新版本中， `subql/cli` 将支持本地存储您的 SUBQL_ACCESS_TOKEN

### 如何发布一个项目

As you have `@subql/cli` already installed, you can run the following command, which will read the project and required information from its default manifest `project.yaml`:

```
// 从你项目的根目录发布
subql publish

// 或指向你的项目根目录
subql publish -f ~/my-project/
```

另外，假定您的项目有多个清单文件， 例如，您支持多个网络，但共享相同的映射和业务逻辑，且具有以下项目结构：

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

### 发布后

在发布项目成功后， 下面的日志表示该项目是在 IPFS 集群中创建的，并返回了它的 `CID` (内容标识符)。

```
Building and packing code... done
Uploading SupQuery project to IPFS
SubQuery Project uploaded to IPFS: QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd  //CID
```

请注意此 `CID`。 With this `CID`, you can view your published project as what we call it [IPFS Deployment](ipfs.md#ipfs-deployment).

With `@subql/cli` version 1.3.0 or above, when using `subql publish` it will store a copy of the project's `IPFS CID` in a file in your project directory, the naming of the file will be consistent with your project.yaml. For example, if your manfiest file is named `project.yaml`, the IPFS file will be named `.project-cid`.

### IPFS部署

IPFS的部署代表着分散网络上一个SubQuery项目的独立独特的存在。 因此，对项目代码的任何修改都会影响到项目的独特性。 如果您需要调整您的业务逻辑，例如更改映射功能，您必须重新发布项目， `CID`将会改变。

For now, to view the project you have published, use a `REST` api tool such as [Postman](https://web.postman.co/), and use `POST` method with the following example URL to retrieve it:`https://ipfs.subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`.

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

## Deploy your SubQuery project in the Managed Service

### Login to SubQuery Projects

Before starting, please make sure that your SubQuery project codebase is published to IPFS.

To create your first project, head to [SubQuery Projects](https://project.subquery.network). You'll need to authenticate with your GitHub account to login.

On first login, you will be asked to authorize SubQuery. We only need your email address to identify your account, and we don't use any other data from your GitHub account for any other reasons. In this step, you can also request or grant access to your GitHub Organization account so you can post SubQuery projects under your GitHub Organization instead of your personal account.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

SubQuery Projects is where you manage all your hosted projects uploaded to the SubQuery platform. You can create, delete, and even upgrade projects all from this application.

![Projects Login](/assets/img/projects-dashboard.png)

If you have a GitHub Organization accounts connected, you can use the switcher on the header to change between your personal account and your GitHub Organization account. Projects created in a GitHub Organization account are shared between members in that GitHub Organization. To connect your GitHub Organization account, you can [follow the steps here](publish.md#add-github-organization-account-to-subquery-projects).

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

### Create Your First Project

There are two methods to create a project in the SubQuery Managed Service: you can use the UI or directly via the `subql` cli tool

#### 使用用户界面

Let's start by clicking on "Create Project". You'll be taken to the New Project form. Please enter the following (you can change this in the future):

- **GitHub account:** If you have more than one GitHub account, select which account this project will be created under. Projects created in a GitHub organisation account are shared between members in that organisation.
- **Project Name**
- **Subtitle**
- **描述**
- **GitHub Repository URL:** This must be a valid GitHub URL to a public repository that has your SubQuery project. The `schema.graphql` file must be in the root of your directory ([learn more about the directory structure](../build/introduction.md#directory-structure)).
- **Database:** Premium customers can access dedicated databases to host production SubQuery projects from. If this interests you, you can contact [sales@subquery.network](mailto:sales@subquery.network) to have this setting enabled.
- **Deployment Source:** You can choose to have the project deployed from the GitHub repository or alternatively deployed from a IPFS CID, see our guide about [hosting with IPFS.](ipfs.md)
- **Hide project:** If selected, this will hide the project from the public SubQuery explorer. Keep this unselected if you want to share your SubQuery with the community!

![Create your first Project](/assets/img/projects-create.png)

Create your project and you'll see it on your SubQuery Project's list. _We're almost there! We just need to deploy a new version of it._

![Created Project with no deployment](/assets/img/projects-no-deployment.png)

#### 使用CLI

You can also use `@subql/cli` to publish your project to our Managed Service. 这需要：

- `@subql/cli` 版本 1.1.0 或以上.
- 有效的 [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) 就绪。

```shell
// Creating a project using the CLI
$ subql project:create-project

// OR using non-interactive, it will prompt you if the required fields are missing
$ subql project:create-project
    --apiVersion=apiVersion      Api version is default to 2
    --description=description    Enter description
    --gitRepo=gitRepo            Enter git repository
    --org=org                    Enter organization name
    --projectName=projectName  Enter project name
```

### Deploy your First Version

There are three methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly, via the `subql` cli tool, or using an automated GitHub Action.

#### 使用用户界面

While creating a project will setup the display behaviour of the project, you must deploy a version of it before it becomes operational. Deploying a version triggers a new SubQuery indexing operation to start, and sets up the required query service to start accepting GraphQL requests. You can also deploy new versions to existing projects here.

With your new project, you'll see a Deploy New Version button. Click this, and fill in the required information about the deployment:

- **Branch:** From GitHub, select the branch of the project that you want to deploy from.
- **Commit Hash:** From GitHub, select the specific commit of the version of your SubQuery project codebase that you want deployed.
- **IPFS:** If deploying from IPFS, paste you IPFS deployment CID (without the leading `ipfs://`).
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here.
- **Indexer Version:** This is the version of SubQuery's node service that you want to run this SubQuery on. See [`@subql/node`](https://www.npmjs.com/package/@subql/node).
- **Query Version:** This is the version of SubQuery's query service that you want to run this SubQuery on. See [`@subql/query`](https://www.npmjs.com/package/@subql/query).

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

#### 使用CLI

You can also use `@subql/cli` to create a new deployment of your project to our Managed Service. 这需要：

- `@subql/cli` 版本 1.1.0 或以上.
- 有效的 [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) 就绪。

```shell
// Deploy using the CLI
$ subql deployment:deploy

// OR Deploy using non-interactive CLI
$ subql deployment:deploy

  -d, --useDefaults                Use default values for indexerVerion, queryVersion, dictionary, endpoint
  --dict=dict                      Enter dictionary
  --endpoint=endpoint              Enter endpoint
  --indexerVersion=indexerVersion  Enter indexer-version
  --ipfsCID=ipfsCID                Enter IPFS CID
  --org=org                        Enter organization name
  --projectName=projectName        Enter project name
  --queryVersion=queryVersion      Enter query-version
  --type=(stage|primary)           [default: primary]
```

#### 使用 GitHub Actions

随着国家排雷行动中心的部署功能的引入， 我们在 GitHub</a> 中添加了一个 **默认动作流程** 到

启动器项目，它将允许您自动发布并部署您的更改：</p> 

- 第 1 步：将您的项目推送到 GitHub 后，在 GitHub 上创建 `DEPLOYMENT` 环境，并添加秘钥 [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token)
- Step 2: Create a project on [SubQuery Projects](https://project.subquery.network), this can be done using the the [UI](#using-the-ui) or [CLI](#using-the-cli).
- Step 3: Once your project is created, navigate to the GitHub Actions page for your project, and select the workflow `CLI deploy`
- Step 4: You'll see an input field where you can enter the unique code of your project created on SubQuery Projects, you can get the code from the URL in SubQuery Projects [SubQuery Projects](https://project.subquery.network). 代码基于您项目的名称, 其中空格被连线替换 `-`。 e.g. `my project name` becomes `my-project-name`
- Once the workflow is complete, you should be see your project deployed to our Managed Service

A common approach is to extend the default GitHub Action to automatically deploy changes to our Managed Service when code is merged into main. 以下对 GitHub 行动流程的更改做到这一点：



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

![正在部署和同步的项目](/assets/img/projects-deploy-sync.png)

您也可以点击项目标题旁边的三个小点图标，从而在 SubQuery 浏览器上查看项目， 在这里您可以使用我们的区块链浏览器开始—— [阅读更多关于如何在这里使用](../query/query.md) 的信息。 There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![SubQuery Explorer 中的项目](/assets/img/projects-explorer.png)



## Add GitHub Organization Account to SubQuery Projects

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
