# 发布您的 SubQuery 项目

## 使用 SubQuery 托管您的项目有哪些优势

- We'll run your SubQuery projects for you in a high performance, scalable, and managed public service.
- 此服务正在免费提供给社区！
- You can make your projects public so that they'll be listed in the [SubQuery Explorer](https://explorer.subquery.network) and anyone around the world can view them.
- We're integrated with GitHub, so anyone in your GitHub organisations will be able to view shared organisation projects.

## 在 SubQuery 项目中创建您的第一个项目

### 项目代码托管

在发布之前，您可以使用两种方式托管您的 SubQuery 项目的代码库。

**GitHub**: Your project's codebase must be in a public GitHub repository.

**IPFS**: Your project's codebase can be stored in IPFS, you can follow our IPFS hosting guide to see how to [first publish to IPFS](ipfs.md).

### 登录到 SubQuery 项目

在启动前，请确保您的 SubQuery 项目在 GitHub 公开存储库中在线。 `schema.graphql` 文件必须在您的目录的根目录中。

To create your first project, head to [SubQuery Projects](https://project.subquery.network). 您需要使用您的 GitHub 帐户进行身份验证才能登录。

首次登录时，您将被要求授权 SubQuery。 我们只需要您的电子邮件地址来识别您的帐户，我们不会出于任何其他原因使用您的GitHub 帐户的任何其他数据。 在这一步骤中， 您也可以请求或授予您的 GitHub 组织帐户访问权限，以便您可以在您的 GitHub 组织下发布SubQuery 项目而不是您的个人帐户。

![撤销GitHub 帐户的批准](/assets/img/project_auth_request.png)

SubQuery 项目是您管理上传到SubQuery平台的所有托管项目的地方。 您可以从此应用程序创建、删除甚至升级项目。

![项目登录](/assets/img/projects-dashboard.png)

如果您已连接到GitHub 组织帐户， 您可以使用页眉上的切换器来更改您的个人帐户和您的GitHub 组织帐户。 GitHub 组织帐户中创建的项目由GitHub 组织的成员共享。 若要连接您的 GitHub 组织账户，您可以在这里 [按照步骤](#add-github-organization-account-to-subquery-projects)

![在GitHub 帐户间切换](/assets/img/projects-account-switcher.png)

### 创建您的第一个项目。

There are two methods to create a project in the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

#### Using the UI

Let's start by clicking on "Create Project". You'll be taken to the New Project form. Please enter the following (you can change this in the future):

- **GitHub 帐户：** 如果您有多个GitHub 帐户，请选择该项目将在哪个帐户下创建。 GitHub 组织账户中创建的项目由该组织的成员共享。
- **项目名称**
- **副标题**
- **描述**
- **GitHub 存储库 URL：** 这必须是包含您的 SubQuery 项目的公共存储库的有效 GitHub URL。 The `schema.graphql` file must be in the root of your directory ([learn more about the directory structure](../build/introduction.md#directory-structure)).
- **数据库：** 高级客户可以访问专用数据库来托管生产SubQuery项目。 如果您感兴趣，您可以联系 [sales@subquery.network](mailto:sales@subquery.network) 来启用此设置。
- **部署源:** 您可以选择从GitHub 仓库部署项目或从IPFS CID部署项目。 请参阅我们的指南 [与 IPFS 托管。](ipfs.md)
- **隐藏项目：** 如果选中，如果选中，这将在公共 SubQuery 浏览器中隐藏项目。 如果您想与社区共享您的SubQuery项目，请不要选择此项！ ![创建您的第一个项目。](/assets/img/projects-create.png)

Create your project and you'll see it on your SubQuery Project's list. _We're almost there! We just need to deploy a new version of it._

![Created Project with no deployment](/assets/img/projects-no-deployment.png)

#### Using the CLI

You can also use `@subql/cli` to publish your project to our managed service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN]() ready.

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

- **Branch:** From GitHub, select the branch of the project that you want to deploy from.
- **Commit Hash:** From GitHub, select the specific commit of the version of your SubQuery project codebase that you want deployed.
- **IPFS:** If deploying from IPFS, paste you IPFS deployment CID (without the leading `ipfs://`).
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here.
- **Indexer Version:** This is the version of SubQuery's node service that you want to run this SubQuery on. See [`@subql/node`](https://www.npmjs.com/package/@subql/node).
- **Query Version:** This is the version of SubQuery's query service that you want to run this SubQuery on. See [`@subql/query`](https://www.npmjs.com/package/@subql/query).

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

#### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our managed service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ready.

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

## 下一步 - 连接到您的项目

一旦您的部署成功完成并且我们的节点已经从该链中为您的数据编制了索引， 您可以通过显示的 GraphQL 查询端点连接到您的项目。

![正在部署和同步的项目](/assets/img/projects-deploy-sync.png)

您也可以点击项目标题旁边的三个小点图标，从而在 SubQuery 浏览器上查看项目， 在这里您可以使用我们的区块链浏览器开始—— [阅读更多关于如何在这里使用](../query/query.md) 的信息。 There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![Projects in SubQuery Explorer](/assets/img/projects-explorer.png)

## 将 GitHub 组织帐户添加到 SubQuery 项目

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![在GitHub 帐户间切换](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![撤销GitHub 帐户的批准](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
