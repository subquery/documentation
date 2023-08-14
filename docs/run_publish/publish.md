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

:::warning
GitHub Deployment flows have been deprecated for IPFS

If your project is still being deployed via GitHub, read the migration guide for IPFS deployments [here](./ipfs.md)
:::

### Requirements

- `@subql/cli` version 0.21.0 or above.
- Manifest `specVersion` 1.0.0 and above.
- Get your SUBQL_ACCESS_TOKEN ready.
- To make sure your deployment is successful, we strongly recommend that you build your project with the `subql build` command, and test it locally before publishing.

### Prepare your SUBQL_ACCESS_TOKEN

- Step 1: Go to [SubQuery Managed Service](https://managedservice.subquery.network/) and log in.
- Step 2: Click on your profile at the top right of the navigation menu, then click on **_Refresh Token_**.
- Step 3: Copy the generated token.
- Step 4: To use this token:
  - Option 1: Add SUBQL_ACCESS_TOKEN in your environment variables. `EXPORT SUBQL_ACCESS_TOKEN=<token>` (Windows) or `export SUBQL_ACCESS_TOKEN=<token>` (Mac/Linux)
  - Option 2: Coming soon, `subql/cli` will support storing your SUBQL_ACCESS_TOKEN locally.

### How to publish a project

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

You can always publish the project with your selected manifest file.

```
 # This will publish project support indexing Polkadot network
subql publish -f ~/my-projectRoot/polkadot.yaml
```

After successfully publishing the project, the logs below indicate that the project was created on the IPFS cluster and have returned its `CID` (Content Identifier). Please note down this `CID`.

```
Building and packing code... done
Uploading SupQuery project to IPFS
SubQuery Project uploaded to IPFS: QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd  //CID
```

Note: With `@subql/cli` version 1.3.0 or above, when using `subql publish`, a copy of the project's `IPFS CID` will be stored in a file in your project directory. The naming of the file will be consistent with your project.yaml. For example, if your manifest file is named `project.yaml`, the IPFS file will be named `.project-cid`.

::: details What happens during IPFS Deployment?

IPFS deployment represents an independent and unique existence of a SubQuery project on a decentralized network. Therefore, any changes with the code in the project will affect its uniqueness. If you need to adjust your business logic, e.g. change the mapping function, you must republish the project, and the `CID` will change.

For now, to view the project you have published, use a `REST` API tool such as [Postman](https://web.postman.co/), and use the `POST` method with the following example URL to retrieve it:`https://ipfs.subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`.

You should see the example project deployment as below.

This deployment looks very similar to your manifest file. You can expect those descriptive fields, and the network and dictionary endpoint has been removed as they did not directly affect the outcome of project execution.

Those files been used in your local project has been packed and published to IPFS as well.

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

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

SubQuery Projects is where you manage all your hosted projects uploaded to the SubQuery platform. You can create, delete, and even upgrade projects all from this application.

![Projects Login](/assets/img/projects_dashboard.png)

If you have a GitHub Organization accounts connected, you can use the switcher on the header to change between your personal account and your GitHub Organization account. Projects created in a GitHub Organization account are shared between members in that GitHub Organization. To connect your GitHub Organization account, you can [follow the steps here](publish.md#add-github-organization-account-to-subquery-projects).

![Switch between GitHub accounts](/assets/img/projects_account_switcher.png)

## Create Your First Project

Before starting, please make sure that your SubQuery project codebase is published to IPFS.

There are two methods to create a project in the SubQuery Managed Service: you can use the UI or directly via the `subql` cli tool

### Using the UI

Start by clicking on "Create Project". You'll be taken to the new project form. Please enter the following (you can change this in the future):

- **Project Name:** Name your project.
- **Description:** Provide a description of your project.
- **Database:** Premium customers can access dedicated databases to host production SubQuery projects from. If this interests you, you can contact [sales@subquery.network](mailto:sales@subquery.network) to have this setting enabled.
- **Visible in Explorer:** If selected, this will show the project from the public SubQuery explorer to share with the community.

![Create your first Project](/assets/img/projects_create.png)

Create your project and you'll see it on your SubQuery Project's list. Next, we just need to deploy a new version of it.

![Project created](/assets/img/project_created.png)

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

![Deploy your first Project](/assets/img/projects_first_deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our Managed Service. Please follow the guide on how to [deploy to an existing project](./cli.md#deploy-a-new-version-of-your-project) on the SubQuery Managed Service in the [CLI documentation](./cli.md).

## Deploy new versions of your SubQuery project

Although you have the freedom to always upgrade and deploy new versions of your SubQuery project, please be considerate during this process if your SubQuery project is public to the world. Some key points to note:

- If your upgrade is a breaking change, either create a new project (e.g. `My SubQuery Project V2`) or give your community plenty of warning of the change through social media channels.
- Deploying a new SubQuery project version causes some downtime as the new version indexes the complete chain from the genesis block.

There are three methods to deploy a new version of your project to the SubQuery Managed Service: you can use the UI, create it directly via the `subql` cli tool, or use an automated GitHub action.

### Using the UI

Log into SubQuery Project and select the project you want to deploy a new version of. You can choose to either deploy to the production or staging slot. These two slots are isolated environments and each has their own databases and synchronise independently.

We recommend deploying to your staging slot only for final staging testing or when you need to resync your project data. You can then promote it to production with zero downtime. You will find testing is faster when [running a project locally](../run_publish/run.md) as you can more [easily debug issues](../academy/tutorials_examples/debug-projects.md).

The staging slot is perfect for:

- Final validation of changes to your SubQuery Project in a separate environment. The staging slot has a different URL to production that you can use in your dApps.
- Warming up and indexing data for an updated SubQuery project to eliminate downtime in your dApp.
- Preparing a new release for your SubQuery Project without exposing it publicly. The staging slot is not shown to the public in the Explorer and has a unique URL that is visible only to you.

![Staging slot](/assets/img/staging_slot.png)

Fill in the IPFS CID of the new version of your SubQuery project codebase that you want deployed (see the documentation to publish to IPFS [here](#publish-your-subquery-project-to-ipfs). This will cause a longer downtime depending on the time it takes to index the current chain. You can always report back here for progress.

### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our Managed Service. Please follow the guide on how to [deploy a new version of your project](./cli.md#deploy-a-new-version-of-your-project) on the SubQuery Managed Service in the [CLI documentation](./cli.md).

### Using GitHub actions

With the introduction of the deployment feature for the CLI, we've added a **Default Action Workflow** to [the starter project in GitHub](https://github.com/subquery/subql-starter/blob/main/Polkadot/Polkadot-starter/.github/workflows/cli-deploy.yml) that will allow you to publish and deploy your changes automatically:

- Step 1: After pushing your project to GitHub, create `DEPLOYMENT` environment on GitHub, and add the secret [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) and another secret with the name `ENDPOINT` which matches the RPC API endpoint that you want to connect (you can retrieve this from your `project.yaml` and include a private API key).
- Step 2: If you haven't already, create a project on [SubQuery Managed Service](https://managedservice.subquery.network). This can be done using the [UI](#using-the-ui) or [CLI](#using-the-cli).
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

## Next Steps - Connect to your Project

Once your deployment has succesfully completed and our nodes have indexed your data from the chain, you'll be able to connect to your project via the displayed GraphQL Query endpoint.

![Project being deployed and synced](/assets/img/projects_deploy_sync.png)

Alternatively, you can click on the three dots next to the title of your project, and view it on SubQuery Explorer. There you can use the in browser playground to get started - [read more about how to use our Explorer's GraphQL playground here](../run_publish/query.md).

![Projects in SubQuery Explorer](/assets/img/projects_explorer.png)

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

## Upgrade to the Latest Indexer and Query Service

If you just want to upgrade to the latest indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) or query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) to take advantage of our regular performance and stability improvements, just select a newer versions of our packages and save. This will cause only a few minutes of downtime as the services running your project are restarted.

## Add GitHub Organization Account to SubQuery Projects

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Managed Service](https://managedservice.subquery.network) using the account switcher.

If you can't see your GitHub Organization account listed in the switcher, then you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. Then, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Managed Service](https://managedservice.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an administrator to enable this for you.

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
