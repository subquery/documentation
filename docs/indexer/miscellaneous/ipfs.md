# Publishing your Project to IPFS

In order to make deploying projects easier on the network, we use IPFS to package and distribute project code.

## How to prepare your project?

1. Update your project's dependencies.
   - Update `@subql/cli` to the latest version: you can do this by running `yarn add -D @subql/cli@latest` or `npm i -dev @subql/cli@latest`
   - We also recommend updating other dependencies at this time, you might want to copy them from the latest example projects (e.g. [Ethereum](https://github.com/subquery/ethereum-subql-starter), [Polkadot](https://github.com/subquery/subql-starter/), [Cosmos](https://github.com/subquery/cosmos-subql-starter/))
   - Pay attention to this issue: [926](https://github.com/subquery/subql/discussions/926)
2. `package.json`: Update the build command to `subql build`. It should look like [this](https://github.com/subquery/subql-starter/blob/main/Polkadot/Polkadot-starter/package.json#L6).
3. `src/index.ts`: For Substrate based projects, if updating from `@polkadot/api` v6 (or earlier), update your `src/index.ts` to include [this line](https://github.com/subquery/subql-starter/blob/418440f09226694a0063c939ff3332530f3047c4/src/index.ts#L3).
4. `project.ts`:

   - Make sure your project is using manifest version 1.0.0. You can check this by looking at the `specVersion` field in `project.ts`. If it is below 1.0.0, then run `subql migrate` and follow the [migration steps to upgrade](../build/manifest/polkadot.md#migrating-to-v100-badge-textupgrade-typewarning).

   - Check that the `datasources: mapping: file:` references your code entrypoint correctly. Usually this is `./dist/index.js`

   - If you're using a datasource processor (any `processor:` in the `project.ts`) we need to ensure that it gets bundled during build and publish. To do so please update to the latest version of the package that now includes a bundled version. You can do this by adding exports to your `package.json`.

   ```json
   ...
   "exports": {
     "processorName": "./node_modules/path/to/processor.js"
     // "frontierEvm": "./node_modules/@subql/frontier-evm-processor/dist/index.js"
     // "acalaEvm": "./node_modules/@subql/acala-evm-processor/dist/index.js",
     // "ethermintEVM": "./node_modules/@subql/ethermint-evm-processor/dist/index.js"
     // "chaintypes": "./src/chaintypes.ts" // chain types if required
   }
   ```

   We need to update the reference to the bundle in your `project.ts`. To do this you can update any processor file paths to `file: ./node_modules/@subql/<processor-name>/dist/bundle.js` and replace `<processor-name>` with the processor you are using. If you are using `@subql/datasource-processors` this package is now deprecated, you can find the relevant replacement from the new [datasource-processors repository](https://github.com/subquery/datasource-processors/tree/main/packages).

   - If your project uses js/ts based custom [Substrate Chain Types](../build/manifest/polkadot.md#custom-chains) you will need to repeat the steps above but with the reference to your chain types.

5. `docker-compose.yaml`: Update it to the [latest docker compose version](https://github.com/subquery/subql-starter/blob/main/Polkadot/Polkadot-starter/docker-compose.yml) and add [this directory](https://github.com/subquery/subql-starter/tree/main/Polkadot/Polkadot-starter/docker) to your repo. To test it we recommend running your project locally.

:::warning
Please now rebuild and run your project locally to test these changes before proceeding using `yarn`, `yarn codegen`, `yarn build`, and then `yarn start:docker`.
:::

Your project should now be ready to deploy via IPFS to the SubQuery network.

## Publish to IPFS

### Prepare your SUBQL_ACCESS_TOKEN

- Step 1: Go to [OnFinality Indexer Service](https://indexing.onfinality.io/) and log in.
- Step 2: Click on your profile at the top right of the navigation menu, then click on **_Refresh Token_**.
- Step 3: Copy the generated token.
- Step 4: To use this token:
  - Option 1: Add SUBQL_ACCESS_TOKEN in your environment variables. `EXPORT SUBQL_ACCESS_TOKEN=<token>` (Windows) or `export SUBQL_ACCESS_TOKEN=<token>` (Mac/Linux)
  - Option 2: Coming soon, `subql/cli` will support storing your SUBQL_ACCESS_TOKEN locally.

### How to publish a project

Run the following command, which will read the project's default manifest `project.ts` for the required information.
If you have `@subql/cli` version `5.0.0` or above, you will need to install `@subql/common-<network>` package in the dependencies before execute this command.

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

Note:

- With `@subql/cli` version 1.3.0 or above, when using `subql publish`, a copy of the project's `IPFS CID` will be stored in a file in your project directory. The naming of the file will be consistent with your project.ts. For example, if your manifest file is named `project.ts`, the IPFS file will be named `.project-cid`.
- With `@subql/cli` version `5.0.0` or above, you will need to install `@subql/common-<network>` package in the dependencies before execute this command. For example, for substrate project, please make sure`@subql/common-substrate` 4.0.0 is installed

::: details What happens during IPFS Deployment?

IPFS deployment represents an independent and unique existence of a SubQuery project on a decentralised network. Therefore, any changes with the code in the project will affect its uniqueness. If you need to adjust your business logic, e.g. change the mapping function, you must republish the project, and the `CID` will change.

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
