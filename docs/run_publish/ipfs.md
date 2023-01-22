# Migrating from GitHub to IPFS

In order to make deploying projects easier on the Managed Service, we are deprecating GitHub deployments in favour of IPFS.

Using IPFS provides a better experience for developers in a few ways:

- Unlike with GitHub deployments, projects are built locally on your machine. This means that you can have full control over the environment. Resolving any issues with version compatibility such as node.js version or other dependencies is much faster and easier.
- You can share your projects CID and ensure that everyone will be able to run the same project with the same results.
- It’s decentralised, so that you don’t have to rely on a centralised party like GitHub to store your code.
- And on top of this, you can deploy the same project to the SubQuery Network!

## How to prepare your project?

1. Update your project's dependencies.
   - Update `@subql/cli` to the latest version: you can do this by running `yarn add -D @subql/cli@latest` or `npm i -dev @subql/cli@latest`
   - We also recommend updating other dependencies at this time
   - Pay attention to this issue: [926](https://github.com/subquery/subql/discussions/926)
2. `package.json`: Update the build command to `subql build`. It should look like [this](https://github.com/subquery/subql-starter/blob/418440f09226694a0063c939ff3332530f3047c4/package.json#L7).
3. `src/index.ts`: For Substrate based projects, if updating from `@polkadot/api` v6 (or earlier), update your `src/index.ts` to include [this line](https://github.com/subquery/subql-starter/blob/418440f09226694a0063c939ff3332530f3047c4/src/index.ts#L3).
4. `project.yaml`:

   - Make sure your project is using manifest version 1.0.0. You can check this by looking at the `specVersion` field in `project.yaml`. If it is below 1.0.0, then run `subql migrate` and follow the [migration steps to upgrade](../build/manifest/polkadot.md#migrating-to-v100-badge-textupgrade-typewarning).

   - Check that the `datasources: mapping: file:` references your code entrypoint correctly. Usually this is `./dist/index.js`

   - If you're using a datasource processor (any `processor:` in the `project.yaml`) we need to ensure that it gets bundled during build and publish. To do so please update to the latest version of the package that now includes a bundled version. You can do this by adding exports to your `package.json`.

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

   We need to update the reference to the bundle in your `project.yaml`. To do this you can update any processor file paths to `file: ./node_modules/@subql/<processor-name>/dist/bundle.js` and replace `<processor-name>` with the processor you are using. If you are using `@subql/datasource-processors` this package is now deprecated, you can find the relevant replacement from the new [datasource-processors repository](https://github.com/subquery/datasource-processors/tree/main/packages).

   - If your project uses js/ts based custom [Substrate Chain Types](../build/manifest/polkadot.md#custom-chains) you will need to repeat the steps above but with the reference to your chain types.

5. `docker-compose.yaml`: Update it to the [latest docker compose version](https://github.com/subquery/subql-starter/blob/main/Polkadot/Polkadot-starter/docker-compose.yml) and add [this directory](https://github.com/subquery/subql-starter/tree/main/Polkadot/Polkadot-starter/docker) to your repo. To test it we recommend running your project locally.

:::warning
Please now rebuild and run your project locally to test these changes before proceeding using `yarn`, `yarn codegen`, `yarn build`, and then `yarn start:docker`.
:::

Your project should now be ready to deploy via IPFS to SubQuery Managed Service or the SubQuery network. You can follow the guide [here](./publish.md#publish-your-subquery-project-to-ipfs) to deploy to IPFS and then publish to the Managed Service.
