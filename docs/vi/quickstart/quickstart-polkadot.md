# Bắt đầu nhanh với Polkadot

In this quick start guide, we're going to start with a simple Substrate/Polkadot starter project and then finish by indexing some actual real data. Đây là cơ sở tuyệt vời để bắt đầu khi phát triển Dự án Substrate/Polkadot với SubQuery của riêng bạn.

Sau khi hoàn thành xong hướng dẫn này, bạn sẽ có một dự án SubQuery đang hoạt động chạy trên nút SubQuery với điểm cuối GraphQL mà có thể truy vấn dữ liệu từ đó.

Nếu bạn chưa sẵn sàng, chúng tôi khuyên bạn nên tự làm quen với [thuật ngữ](../#terminology) được sử dụng trong SubQuery.

**The goal of this quick start guide is to adapt the standard starter project to begin indexing all transfers from Polkadot, it should only take 10-15 minutes**

## Chuẩn bị

### Môi trường phát triển địa phương

- [Node](https://nodejs.org/en/): Bạn cần cài đặt một phiên bản mới nhất của Node (ví dụ: phiên bản LTS).
- [Docker](https://docker.com/): Hướng dẫn này sẽ yêu cầu sử dụng Docker

### Cài đặt CLI SubQuery

Cài đặt SubQuery CLI tổng thể trên terminal của bạn bằng cách sử dụng NPM:

```shell
# NPM
npm install -g @subql/cli
```

Please note that we **DO NOT** encourage the use of `yarn global` for installing `@subql/cli` due to its poor dependency management which may lead to errors down the line.

You can then run help to see available commands and usage provided by the CLI:

```shell
subql help
```

## Khởi tạo Dự án khởi đầu SubQuery

Bên trong thư mục mà bạn muốn tạo một dự án SubQuery, hãy chạy lệnh sau để bắt đầu.

```shell
subql init
```

Bạn sẽ được hỏi một số câu hỏi khi dự án SubQuery được khởi tạo:

- Project name: A project name for your SubQuery project
- Network family: The layer-1 blockchain network family that this SubQuery project will be developed to index. Use the arrow keys to select from the available options. For this guide, we will use *"Substrate"*
- Network: The specific network that this SubQuery project will be developed to index. Use the arrow keys to select from the available options. For this guide, we will use *"Polkadot"*
- Template project: Select a SubQuery template project that will provide a starting point to begin development. We suggest selecting the *"subql-starter"* project.
- RPC endpoint: Provide an HTTPS URL to a running RPC endpoint that will be used by default for this project. You can quickly access public endpoints for different Polkadot networks, create your own private dedicated node using [OnFinality](https://app.onfinality.io) or just use the default Polkadot endpoint. Nút RPC này phải là một nút lưu trữ (có trạng thái chuỗi đầy đủ). For this guide, we will use the default value *"https://polkadot.api.onfinality.io"*
- Git repository: Provide a Git URL to a repo that this SubQuery project will be hosted in (when hosted in SubQuery Explorer) or accept the provided default.
- Authors: Enter the owner of this SubQuery project here (e.g. your name!) or accept the provided default.
- Description: Provide a short paragraph about your project that describes what data it contains and what users can do with it or accept the provided default.
- Version: Enter a custom version number or use the default (`1.0.0`)
- License: Provide the software license for this project or accept the default (`MIT`)

After the initialisation process is complete, you should see that a folder with your project name has been created inside the directory. The contents of this directory should be identical to what's listed in the [Directory Structure](../create/introduction.md#directory-structure).

Last, under the project directory, run the following command to install the new project's dependencies.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Making Changes to your Project

In the starter package that was just initialised, a standard configuration has been provided. These are:

1. The GraphQL Schema in `schema.graphql`
2. Tệp Kê khai dự án ở ` project.yaml `
3. Các chức năng ánh xạ trong thư mục `src/mappings/`

The goal of this quick start guide is to adapt the standard starter project to begin indexing all transfers from Polkadot.

### Cập nhật tệp lược đồ GraphQL của bạn

Tệp `schema.graphql` xác định các lược đồ GraphQL khác nhau. Do cách hoạt động của ngôn ngữ truy vấn GraphQL, về cơ bản tệp lược đồ chỉ ra hình dạng dữ liệu của bạn từ SubQuery. It's a great place to start because it allows you to define your end goal upfront.

Update the `schema.graphql` file to read as follows:

```graphql
type Transfer @entity {
  id: ID! # id field is always required and must look like this
  amount: BigInt # Amount that is transferred
  blockNumber: BigInt # The block height of the transfer
  from: String! # The account that transfers are made from
  to: String! # The account that transfers are made to
}
```

**Quan trọng: Khi bạn thực hiện bất kỳ thay đổi nào đối với tệp lược đồ, hãy đảm bảo rằng bạn tạo lại thư mục types của mình.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

You'll find the generated models in the `/src/types/models` directory. Để biết thêm thông tin về tệp `schema.graphql`, hãy xem tài liệu của chúng tôi trong [Lược đồ Build/GraphQL ](../build/graphql.md)

### Cập nhật tệp kê khai dự án

The Project Manifest (`project.yaml`) file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data.

The manifest file has already been set up correctly, but we need to change our handlers. As we are planning to index all Polkadot transfers, we need to update the `datasources` section as follows:

```yaml
dataSources:
  - kind: substrate/Runtime
    startBlock: 1
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleEvent
          kind: substrate/EventHandler
          filter:
            module: balances
            method: Transfer
```

This means we'll run a `handleEvent` mapping function each and every time there is a `balances.Transfer` event.

Để biết thêm thông tin về tệp Project Manifest (`project.yaml`), hãy xem tài liệu của chúng tôi trong [Build/Manifest File](../build/manifest.md)

### Thêm một hàm Ánh xạ

Các hàm ánh xạ xác định cách dữ liệu chuỗi được chuyển đổi thành các thực thể GraphQL được tối ưu hóa mà chúng ta đã xác định trước đó trong tệp `schema.graphql`.

Điều hướng đến hàm ánh xạ mặc định trong thư mục `src/mappings `. Bạn sẽ thấy ba hàm được xuất, `handleBlock`, `handleEvent` và `handleCall`. Delete both the `handleBlock` and `handleCall` functions as we will only deal with the `handleEvent` function.

The `handleEvent` function receives event data whenever an event matches the filters that we specified previously in our `project.yaml`. We will update it to process all `balances.Transfer` events and save them to the GraphQL entities that we created earlier.

Bạn có thể cập nhật hàm `handleEvent` như sau (lưu ý các import bổ sung):

```ts
import { SubstrateEvent } from "@subql/types";
import { Transfer } from "../types";
import { Balance } from "@polkadot/types/interfaces";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    // Get data from the event
    // The balances.transfer event has the following payload \[from, to, value\]
    // logger.info(JSON.stringify(event));
    const from = event.event.data[0];
    const to = event.event.data[1];
    const amount = event.event.data[2];

    // Create the new transfer entity
    const transfer = new Transfer(
        `${event.block.block.header.number.toNumber()}-${event.idx}`,
    );
    transfer.blockNumber = event.block.block.header.number.toBigInt();
    transfer.from = from.toString();
    transfer.to = to.toString();
    transfer.amount = (amount as Balance).toBigInt();
    await transfer.save();
}
```

What this is doing is receiving a SubstrateEvent which includes transfer data in the payload. Chúng tôi trích xuất dữ liệu này và sau đó khởi tạo thực thể `Transfer` mới mà chúng tôi đã xác định trước đó trong tệp `schema.graphql`. Chúng tôi thêm thông tin bổ sung và sau đó sử dụng hàm `.save()` để lưu thực thể mới (SubQuery sẽ tự động lưu nó vào cơ sở dữ liệu).

Để biết thêm thông tin về các hàm ánh xạ, hãy xem tài liệu của chúng tôi trong [Build/Mappings](../build/mapping.md)

### Xây dựng dự án

In order to run your new SubQuery Project we first need to build our work. Chạy lệnh xây dựng từ thư mục gốc của dự án.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Important: Whenever you make changes to your mapping functions, you will need to rebuild your project**

## Running and Querying your Project

### Run your Project with Docker

Whenever you create a new SubQuery Project, you should always run it locally on your computer to test it first. Cách dễ nhất để làm điều này là sử dụng Docker.

All configuration that controls how a SubQuery node is run is defined in the `docker-compose.yml` file. For a new project that has been just initialised you won't need to change anything, but you can read more about the file and the settings in our [Run a Project](../run_publish/run.md) section.

Under the project directory, run the following command:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you should see a running SubQuery node in the terminal screen.

### Truy vấn dự án của bạn

Mở trình duyệt của bạn và truy cập [ http://localhost:3000](http://localhost:3000).

You should see a GraphQL playground in the browser and the schemas that are ready to query. Ở trên cùng bên phải của sân chơi, bạn sẽ tìm thấy nút _Tài liệu_ sẽ mở bản vẽ tài liệu. Tài liệu này được tạo tự động và giúp bạn tìm thấy những thực thể và phương pháp nào bạn có thể truy vấn.

For a new SubQuery starter project, try the following query to understand how it works or learn more about the [GraphQL Query language](../run_publish/graphql.md).

```graphql
{
  query {
    transfers(
      first: 10,
      orderBy: AMOUNT_DESC
    ) {
      nodes {
        id
        amount
        blockNumber
        from
        to
      }
    }
  }
}
```

### Xuất bản Dự Án SubQuery của bạn

SubQuery provides a free managed service where you can deploy your new project to. Bạn có thể triển khai nó trên [SubQuery Projects](https://project.subquery.network) và truy vấn nó bằng cách sử dụng [Explorer](https://explorer.subquery.network) của chúng tôi.

Read the guide to [publish your new project to SubQuery Projects](../run_publish/publish.md)

## Bước tiếp theo

Congratulations, you now have a locally running SubQuery project that accepts GraphQL API requests for transfers data.

Bây giờ bạn đã có cái nhìn sâu sắc về cách xây dựng một dự án SubQuery cơ bản, câu hỏi đặt ra là bắt đầu từ đâu? Nếu bạn cảm thấy tự tin, bạn có thể bắt đầu tìm hiểu thêm về ba tệp chính. The manifest file, the GraphQL schema, and the mappings file are under the [Build section of these docs](../build/introduction.md).

Otherwise, continue to our [Academy section](../academy/academy.md) where we have more in-depth workshops, tutorials, and example projects. Ở đó, chúng ta sẽ xem xét các sửa đổi nâng cao hơn và chúng ta sẽ đi sâu hơn vào việc chạy các dự án SubQuery bằng cách chạy các dự án nguồn mở và sẵn có.

Finally, if you're looking for more ways to run and publish your project, our [Run & Publish section](../run_publish/run.md) provides detailed information about all the ways to run your SubQuery project and other advanced GraphQL aggregation and subscription features.
