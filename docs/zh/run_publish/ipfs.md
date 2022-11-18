# 从 GitHub 迁移到 IPFS 部署

为了使管理服务的部署更加容易，我们正在放弃GitHub 部署，而改用IPFS。

使用 IPFS 可以通过以下几种方式为开发者提供更好的经验：

- 与GitHub 部署不同的是，项目是在你的机器上本地建造的。 这意味着您可以对环境拥有完全控制权。 解决任何与版本兼容性如node.js版本或其他依赖关系的问题更快更容易。
- 您可以分享您的项目 CID 并确保所有人都能够以相同的结果运行相同的项目。
- 它是去中心的，所以你不必依赖像GitHub 这样的集中组队来存储你的代码。
- 除此之外，您可以将同一个项目部署到SubQuery网络！

## 如何将你的项目迁移到 IPFS

1. 更新你的项目依赖关系。
   1. 更新 `@subql/cli` 到最新版本：您可以运行 `yarn 添加 -D @subql/cli@latest` 或 `npm i -dev @subql/cli@latest`
   2. 我们还建议此时更新其他依赖关系
   3. 注意这个问题： [926](https://github.com/subquery/subql/discussions/926)
2. `package.json`: 将构建命令更新到 `subql build`。 看起来像 [这个](https://github.com/subquery/subql-starter/blob/418440f09226694a0063c939ff3332530f3047c4/package.json#L7)。
3. `src/index.ts`: 如果从 `@polkadot/api` v6 (或更早) 进行更新，请更新您的 `src/index。 s` 包括 [此行](https://github.com/subquery/subql-starter/blob/418440f09226694a0063c939ff3332530f3047c4/src/index.ts#L3)。
4. `project.yaml`:

   1. 请确保您的项目正在使用清单版本 1.0.0。 你可以通过查看`project.yaml`中的`specVersion`字段来检查这个。 如果低于1.0.0，运行 `subql 迁移` 并按照 [迁移步骤升级](../build/manifest/polkadot.md#migrating-to-v100-badge-textupgrade-typewarning)

   2. 检查 `数据源：映射：文件：` 引用您的代码条目正确，通常是 `./dist/index.js`

   3. 如果您正在使用数据源处理器 (任何 `处理器： <code>项目中的` 处理器。 aml</code>我们需要确保它在构建和发布过程中被捆绑。 为此，请更新到现在包含捆绑版本的软件包的最新版本。 您可以通过将导出添加到您的 `package.json` 来实现这一点。

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

   我们需要更新您的 `project.yaml` 中的 bundle 的引用。 要做到这一点，您可以将任何处理器文件路径更新为 `file: ./node_modules/@subql/<processor-name>/dist/bundle。 s` 用您正在使用的处理器替换 `<processor-name>`。 如果您正在使用 `@subql/datasource-processor` 这个软件包现在已被废弃， 您可以从新的 [数据源处理器仓库中找到相关的替换](https://github.com/subquery/datasource-processors/tree/main/packages)

   4. 如果你的项目使用基于 js/ts 的自定义 [Substrate 链类型](../build/manifest/polkadot.md#custom-chains) ，你将需要重复上面的步骤，但是要引用你的链类型。

5. `docker-compose.yaml`。将其更新为[最新的docker compose版本](https://github.com/subquery/subql-starter/blob/main/Polkadot/Polkadot-starter/docker-compose.yml)，并将[这个目录](https://github.com/subquery/subql-starter/tree/main/Polkadot/Polkadot-starter/docker)添加到你的 repo。 要测试它，我们建议在本地运行您的项目。

:::警告 现在请在本地重建和运行您的项目，然后再使用 `yarn`来测试这些更改， `yarn 代码`, `yarn building`, 然后 `yarn start:docker`. :::

## 测试将您的项目部署到 IPFS

您的项目现在应该可以通过 IPFS 部署到 SubQuery 管理服务或子查询网络。 你可以按照指南[这里](./publish.md#publish-your-subquery-project-to-ipfs)来部署到IPFS，然后发布到托管服务。
