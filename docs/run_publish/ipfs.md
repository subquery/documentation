# Hosting a Project using IPFS

This guide works through how to publish a local SubQuery project to [IPFS](https://ipfs.io/) and deploy it on our hosting infrastructure.

Hosting a project in IPFS makes it available for all and reduces your reliance on centralised services like GitHub.

## Requirements

- `@subql/cli` version 0.21.0 or above.
- Manifest `specVersion` 0.2.0 and above.
- Get your [SUBQL_ACCESS_TOKEN](ipfs.md#prepare-your-subql-access-token) ready.
- To make sure your deployment success, we strongly recommend that you build your project with the `subql build` command, and test it locally before publishing.

## Prepare your SUBQL_ACCESS_TOKEN

- Step 1: Go to [SubQuery Projects](https://project.subquery.network/) and log in.
- Step 2: Click on your profile at the top right of the navigation menu, then click on **_Refresh Token_**.
- Step 3: Copy the generated token.
- Step 4: To use this token:
  - Option 1: Add SUBQL_ACCESS_TOKEN in your environment variables. `EXPORT SUBQL_ACCESS_TOKEN=<token>`
  - Option 2: Coming soon, `subql/cli` will support storing your SUBQL_ACCESS_TOKEN locally.

## How to publish a project

We provide two methods to publish your project:

### Option 1

As you have `@subql/cli` already installed, you can run the following command, which will read the project and required information from its default manifest `project.yaml`:

```
// Publish it from your project's root directory
subql publish

// OR point to your project root
subql publish -f ~/my-project/
```

### Option 2

Alternatively, suppose your project has multiple Manifest files, for example you support multiple networks but share the same mapping and business logic, and have a project structure as follows:

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

## After publish

After successfully publishing the project, the logs below indicate that the project was created on the IPFS cluster and have returned its `CID` (content identifier).

```
Building and packing code... done
Uploading SupQuery project to IPFS
SubQuery Project uploaded to IPFS: QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd  //CID
```

Please note this `CID`. With this `CID`, you can view your published project as what we call it [IPFS Deployment](ipfs.md#ipfs-deployment).

## IPFS Deployment

IPFS deployment represents an independent and unique existence of a SubQuery project on a decentralized network. Therefore, any changes with the code in the project will affect its uniqueness. If you need to adjust your business logic, e.g. change the mapping function, you must republish the project, and the `CID` will change.

For now, to view the project you have published, use a `REST` api tool such as [Postman](https://web.postman.co/), and use `POST` method with the following example URL to retrieve it:`https://ipfs.subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`.

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

## Run your SubQuery project on Hosted Service

### Create project with IPFS deployment

You can follow the guide to [Publish your SubQuery project](../run_publish/publish.md) but where you set your deployment source you can select **IPFS**.

Then choose your production slot, copy and paste you IPFS deployment CID (without the leading `ipfs://`).

You should see you IPFS deployment in the preview section. And you can select the network, dictionary endpoints etc.

After successful deploy the IPFS deployment on our hosted service, it should be available to view on the SubQuery Explorer, you can access the query service just like you do locally.
