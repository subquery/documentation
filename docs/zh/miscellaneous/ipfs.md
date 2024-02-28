# Migrating from GitHub to IPFS

为了使管理服务的部署更加容易，我们正在放弃GitHub 部署，而改用IPFS。

使用 IPFS 可以通过以下几种方式为开发者提供更好的经验：

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
4. `project.ts`:

   - Make sure your project is using manifest version 1.0.0. You can check this by looking at the `specVersion` field in `project.ts`. If it is below 1.0.0, then run `subql migrate` and follow the [migration steps to upgrade](../build/manifest/polkadot.md#migrating-to-v100-badge-textupgrade-typewarning).

   - Check that the `datasources: mapping: file:` references your code entrypoint correctly. Usually this is `./dist/index.js`

   - If you're using a datasource processor (any `processor:` in the `project.ts`) we need to ensure that it gets bundled during build and publish. 为此，请更新到现在包含捆绑版本的软件包的最新版本。 您可以通过将导出添加到您的 `package.json` 来实现这一点。

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

   We need to update the reference to the bundle in your `project.ts`. 要做到这一点，您可以将任何处理器文件路径更新为 `file: ./node_modules/@subql/<processor-name>/dist/bundle。 s` 用您正在使用的处理器替换 `<processor-name>`。 如果您正在使用 `@subql/datasource-processor` 这个软件包现在已被废弃， 您可以从新的 [数据源处理器仓库中找到相关的替换](https://github.com/subquery/datasource-processors/tree/main/packages)

   - 如果你的项目使用基于 js/ts 的自定义 [Substrate 链类型](../build/manifest/polkadot.md#custom-chains) ，你将需要重复上面的步骤，但是要引用你的链类型。

5. `docker-compose.yaml`。将其更新为[最新的docker compose版本](https://github.com/subquery/subql-starter/blob/main/Polkadot/Polkadot-starter/docker-compose.yml)，并将[这个目录](https://github.com/subquery/subql-starter/tree/main/Polkadot/Polkadot-starter/docker)添加到你的 repo。 要测试它，我们建议在本地运行您的项目。

:::警告 现在请在本地重建和运行您的项目，然后再使用 `yarn`来测试这些更改， `yarn 代码`, `yarn building`, 然后 `yarn start:docker`. :::

您的项目现在应该可以通过 IPFS 部署到 SubQuery 管理服务或子查询网络。 You can follow the guide [here](../run_publish/publish.md) to deploy to IPFS and then publish to the Managed Service.
