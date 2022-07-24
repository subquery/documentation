# 使用 IPFS 托管一个项目

本指南通过如何发布本地的 SubQuery 项目到 [IPFS](https://ipfs.io/) 并将其部署到我们的托管基础设施上。

在 IPFS 中托管一个项目，可以让所有人都能使用，并减少您对中心化服务的依赖，例如GitHub。

## 安装要求

- `@subql/cli` 版本 0.21.0 或以上.
- Manifest `spec版本` 0.2.0 及以上.
- 准备好您的 [SUBQL_ACCESS_TOKEN](ipfs.md#prepare-your-subql-access-token)
- 为了确保您的部署成功，我们强烈建议您使用 `subql build` 命令来构建您的项目。 并在发布前在本地测试它。

## 准备您的 SUBQL_ACCESS_TOKEN

- 步骤1：去 [SubQuery Projects](https://project.subquery.network/) 并登录。
- Step 2: Click on your profile at the top right of the navigation menu, then click on **_Refresh Token_**.
- 步骤3:复制生成的令牌。
- 步骤4：使用此令牌：
  - 选项1：在您的环境变量中添加SUBQL_ACCESS_TOKEN。 `ExPORT SUBQL_ACCESS_TOKEN=<token>`
  - 选项2：在即将到来的新版本中， `subql/cli` 将支持本地存储您的 SUBQL_ACCESS_TOKEN

## 如何发布一个项目

We provide two methods to publish your project:

### Option 1

As you have `@subql/cli` already installed, you can run the following command, which will read the project and required information from its default manifest `project.yaml`:

```
// 从你项目的根目录发布
subql publish

// 或指向你的项目根目录
subql publish -f ~/my-project/
```

### Option 2

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

## 发布后

在发布项目成功后， 下面的日志表示该项目是在 IPFS 集群中创建的，并返回了它的 `CID` (内容标识符)。

```
Building and packing code... done
Uploading SupQuery project to IPFS
SubQuery Project uploaded to IPFS: QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd  //CID
```

请注意此 `CID`。 With this `CID`, you can view your published project as what we call it [IPFS Deployment](ipfs.md#ipfs-deployment).

With `@subql/cli` version 1.3.0 or above, when using `subql publish` it will store a copy of the project's `IPFS CID` in a file in your project directory, the naming of the file will be consistent with your project.yaml. For example, if your manfiest file is named `project.yaml`, the IPFS file will be named  `.project-cid`.

## IPFS部署

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

## 在托管服务上运行您的SubQuery项目

### 使用IPFS部署创建项目

You can follow the guide to [Publish your SubQuery project](../run_publish/publish.md) but where you set your deployment source you can select **IPFS**.

然后选择你的产品插槽，复制并粘贴你的IPFS部署CID(去掉前面的`ipfs://`)。

您可以在预览部分看到您的IPFS部署。 您可以选择网络、字典终点等。

在我们的托管服务成功部署IPFS后， 它应该可以在SubQuery Explorer上查看，您可以像在本地一样访问查询服务。
