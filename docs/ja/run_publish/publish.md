# Publish to Managed Services

## Benefits of hosting your project with SubQuery's Managed Service

The biggest dApps depend on SubQuery's enterprise level Managed Service. With 100's of millions of daily requests and hundreds of active projects, SubQuery's Managed Service provides industry leading hosting for our customers.

- We'll run your SubQuery projects for you in a high performance, scalable, and managed public service.
- This service is being provided to the community with a generous free tier! You can host your first two SubQuery projects for absolutely free!
- You can make your projects public so that they'll be listed in the [SubQuery Explorer](https://explorer.subquery.network) and anyone around the world can view them.

You can upgrade to take advantage of the following paid services:

- Production ready hosting for mission critical data with zero-downtime blue/green deployments
- Dedicated databases
- Multiple geo-redundant clusters and intelligent routing
- Advanced monitoring and analytics.

## Publish your SubQuery project to IPFS

When deploying to SubQuery's Managed Service, you must first host your codebase in [IPFS](https://ipfs.io/). Hosting a project in IPFS makes it available for everyone and reduces your reliance on centralised services like GitHub.

:::warning GitHub Deployment flows have being deprecated for IPFS

If your project is still being deployed via GitHub, read the migration guide for IPFS deployments [here](./ipfs.md) :::

### 要件

- `@subql/cli` バージョン 0.21.0 以上。
- Manifest `specVersion` 1.0.0 and above.
- Get your SUBQL_ACCESS_TOKEN ready.
- To make sure your deployment is successful, we strongly recommend that you build your project with the `subql build` command, and test it locally before publishing.

### SUBQL_ACCESS_TOKENを準備する

- ステップ 1: [SubQuery Projects](https://project.subquery.network/) に移動してログインします。
- Step 2: Click on your profile at the top right of the navigation menu, then click on **_Refresh Token_**.
- ステップ 3: 生成されたトークンをコピーします。
- ステップ 4: このトークンを使用するには:
  - オプション1:環境変数に SUBQL_ACCESS_TOKENを追加します。 `EXPORT SUBQL_ACCESS_TOKEN=<token>` (Windows) or `export SUBQL_ACCESS_TOKEN=<token>` (Mac/Linux)
  - オプション 2: 近日中に `subql/cli` が SUBQL_ACCESS_TOKEN をローカルに保存することをサポートする予定です。

### プロジェクトを公開する方法

Run the following command, which will read the project's default manifest `project.yaml` for the required information.

```
// Publish it from your project's root directory
subql publish

// OR point to your project root
subql publish -f ~/my-project/
```

Alternatively, if your project has multiple manifest files, for example you support multiple networks but share the same mapping and business logic, and have a project structure as follows:

```
L projectRoot
 L src/
 L package.json
 L polkadot.yaml (Manifest for Polkadot network)
 L kusama.yaml   (Manifest for Kusama network)
 ...
```

選択したマニフェストファイルを使用してプロジェクトをいつでも公開できます

```
 # This will publish project support indexing Polkadot network
subql publish -f ~/my-projectRoot/polkadot.yaml
```

### 公開した後

After successfully publishing the project, the logs below indicate that the project was created on the IPFS cluster and have returned its `CID` (Content IDentifier). Please note down this `CID`.

```
Building and packing code... done
Uploading SupQuery project to IPFS
SubQuery Project uploaded to IPFS: QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd  //CID
```

Note: With `@subql/cli` version 1.3.0 or above, when using `subql publish`, a copy of the project's `IPFS CID` will be stored in a file in your project directory. The naming of the file will be consistent with your project.yaml. For example, if your manfiest file is named `project.yaml`, the IPFS file will be named `.project-cid`.

### IPFS Deployment

IPFS Deploymentは、分散ネットワーク上のSubQueryプロジェクトの独立したユニークな存在を表します。 そのため、プロジェクト内のコードに変更があると、そのユニーク性に影響が出ます。 ビジネスロジックを調整する必要がある場合、例えばマッピング機能を変更する場合は、プロジェクトを再発行する必要があり、 `CID` が変更されます。

For now, to view the project you have published, use a `REST` api tool such as [Postman](https://web.postman.co/), and use the `POST` method with the following example URL to retrieve it:`https://ipfs.subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`.

You should see the example project deployment as below.

このデプロイメントはマニフェストファイルによく似ています。 それらの記述フィールドを期待することができ、ネットワークとディクショナリーのエンドポイントは、プロジェクトの実行結果に直接影響しないため、削除されました。

ローカルプロジェクトで使用されたファイルは、IPFSにもパックされて公開されています。

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

![Projects Login](/assets/img/projects_dashboard.png)

If you have a GitHub Organization accounts connected, you can use the switcher on the header to change between your personal account and your GitHub Organization account. Projects created in a GitHub Organization account are shared between members in that GitHub Organization. To connect your GitHub Organization account, you can [follow the steps here](publish.md#add-github-organization-account-to-subquery-projects).

![Switch between GitHub accounts](/assets/img/projects_account_switcher.png)

### Create Your First Project

There are two methods to create a project in the SubQuery Managed Service: you can use the UI or directly via the `subql` cli tool

#### Using the UI

Start by clicking on "Create Project". You'll be taken to the new project form. Please enter the following (you can change this in the future):

- **Project Name:** Name your project.
- **Description:** Provide a description of your project.
- **Database:** Premium customers can access dedicated databases to host production SubQuery projects from. If this interests you, you can contact [sales@subquery.network](mailto:sales@subquery.network) to have this setting enabled.
- **Visible in Explorer:** If selected, this will show the project from the public SubQuery explorer to share with the community.

![Create your first Project](/assets/img/projects_create.png)

Create your project and you'll see it on your SubQuery Project's list. Next, we just need to deploy a new version of it.

![Project created](/assets/img/project_created.png)

#### Using the CLI

You can also use `@subql/cli` to publish your project to our Managed Service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ready.

```shell
// Creating a project using the CLI
$ subql project:create-project

// OR using non-interactive, it will prompt you if the required fields are missing
$ subql project:create-project
    --apiVersion=apiVersion      Api version is default to 2
    --description=description    Enter description
    --gitRepo=gitRepo            Enter git repository
    --org=org                    Enter organization name
    --projectName=projectName    Enter project name
```

### Deploy your First Version

There are three methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly, via the `subql` cli tool, or using an automated GitHub Action.

#### Using the UI

While creating a project will setup the display behaviour of the project, you must deploy a version of it before it becomes operational. Deploying a version triggers a new SubQuery indexing operation to start, and sets up the required query service to start accepting GraphQL requests. You can also deploy new versions to existing projects here.

With your new project, you'll see a "Deploy your first version" button. Click this, and fill in the required information about the deployment:

- **CID:** Provide your IPFS deployment CID (without the leading `ipfs://`). This can be acquired by running `subql publish` with the CLI. The rest of the fields should then auto-populate.
- **Manifest:** The details are obtained from the contents of the provided CID.
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here.
- **Indexer Version:** This is the version of SubQuery's node service that you want to run this SubQuery on. See [`@subql/node`](https://www.npmjs.com/package/@subql/node).
- **Query Version:** This is the version of SubQuery's query service that you want to run this SubQuery on. See [`@subql/query`](https://www.npmjs.com/package/@subql/query).
- **Advanced Settings:** There are numerous advanced settings which are explained via the inbuild help feature.

![Deploy your first Project](/assets/img/projects_first_deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

#### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our Managed Service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ready.

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

#### Using GitHub actions

With the introduction of the deployment feature for the CLI, we've added a **Default Action Workflow** to [the starter project in GitHub](https://github.com/subquery/subql-starter/blob/v1.0.0/.github/workflows/cli-deploy.yml) that will allow you to publish and deploy your changes automatically:

- Step 1: After pushing your project to GitHub, create `DEPLOYMENT` environment on GitHub, and add the secret [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) to it.
- Step 2: Create a project on [SubQuery Projects](https://project.subquery.network), this can be done using the the [UI](#using-the-ui) or [CLI](#using-the-cli).
- Step 3: Once your project is created, navigate to the GitHub Actions page for your project, and select the workflow `CLI deploy`
- Step 4: You'll see an input field where you can enter the unique code of your project created on SubQuery Projects, you can get the code from the URL in SubQuery Projects [SubQuery Projects](https://project.subquery.network). The code is based on the name of your project, where spaces are replaced with hyphens `-`. e.g. `my project name` becomes `my-project-name`
- Once the workflow is complete, you should be see your project deployed to our Managed Service

A common approach is to extend the default GitHub Action to automatically deploy changes to our Managed Service when code is merged into main. The following change to the GitHub Action workflow do this:

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

## 次のステップ - プロジェクトに接続

デプロイが正常に完了し、ノードがチェーンからデータのインデックスを作成したら、表示されたGraphQLクエリエンドポイントからプロジェクトに接続することができるようになります。

![プロジェクトを展開および同期する](/assets/img/projects_deploy_sync.png)

または、プロジェクトのタイトルの横にある3つの点をクリックして、SubQuery Explorer で表示することもできます。 There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![Projects in SubQuery Explorer](/assets/img/projects_explorer.png)

## Add GitHub Organization Account to SubQuery Projects

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. Then, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
