# Chào mừng

Trong hướng dẫn bắt đầu nhanh này, chúng ta sẽ bắt đầu với một dự án khởi đầu đơn giản và sau đó kết thúc bằng cách lập chỉ mục một số dữ liệu thực tế. Đây là cơ sở tuyệt vời để bắt đầu khi phát triển Dự án SubQuery của riêng bạn.

Ở cuối hướng dẫn này, bạn sẽ có một dự án SubQuery đang hoạt động chạy trên nút SubQuery với điểm cuối GraphQL mà có thể truy vấn dữ liệu từ đó.

Nếu chưa có, chúng tôi khuyên bạn nên tự làm quen với [thuật ngữ](../#terminology) được sử dụng trong SubQuery.

**Mục tiêu của hướng dẫn bắt đầu nhanh này là điều chỉnh dự án khởi đầu tiêu chuẩn để bắt đầu lập chỉ mục tất cả các giao dịch từ Polkadot, chỉ mất 10-15 phút**

## Chuẩn bị

### Môi trường phát triển địa phương

- [Node](https://nodejs.org/en/): Cài đặt một phiên bản mới nhất của Node (ví dụ: phiên bản LTS).
- [Docker](https://docker.com/): Hướng dẫn này sẽ yêu cầu sử dụng Docker

### Cài đặt CLI SubQuery

Cài đặt SubQuery CLI tổng thể trên terminal của bạn bằng cách sử dụng NPM:

```shell
# NPM
npm install -g @subql/cli
```

Xin lưu ý rằng chúng tôi **KHÔNG** khuyến khích sử dụng `yarn global<` để cài đặt `@subql/cli` do quản lý phụ thuộc kém có thể dẫn đến lỗi xuống dòng.

Sau đó, bạn có thể chạy help để xem các lệnh có sẵn và cách sử dụng do CLI cung cấp

```shell
subql help
```

## Khởi tạo Dự án khởi đầu SubQuery

Bên trong thư mục mà bạn muốn tạo một dự án SubQuery, chỉ cần chạy lệnh sau để bắt đầu.

```shell
subql init
```

Bạn sẽ được hỏi một số câu hỏi nhất định khi dự án SubQuery được khởi động:

- Name: Tên dự án SubQuery của bạn
- Network: Một chuỗi khối mà dự án SubQuery này sẽ được phát triển để lập chỉ mục, sử dụng các phím mũi tên trên bàn phím của bạn để chọn từ các tùy chọn, đối với hướng dẫn này, chúng tôi sẽ sử dụng *"Polkadot"*
- Template: Chọn mẫu dự án SubQuery sẽ cung cấp điểm khởi đầu để bắt đầu phát triển, chúng tôi gợi ý bạn chọn *"Starter project"*
- Git repository (Tùy chọn): Cung cấp URL Git cho kho lưu trữ dự án SubQuery này (khi được lưu trữ trong SubQuery Explorer)
- RPC endpoint (Bắt buộc): Cung cấp URL HTTPS cho điểm cuối RPC đang chạy, sẽ được sử dụng mặc định cho dự án này. Bạn có thể nhanh chóng truy cập các điểm cuối công khai cho các mạng Polkadot khác nhau hoặc thậm chí tạo nút chuyên dụng riêng của mình bằng cách sử dụng [OnFinality](https://app.onfinality.io) hoặc chỉ sử dụng điểm cuối Polkadot mặc định. Nút RPC này phải là một nút lưu trữ (có trạng thái chuỗi đầy đủ). Đối với hướng dẫn này, chúng tôi sẽ sử dụng giá trị mặc định *"https://polkadot.api.onfinality.io"*
- Authors (Bắt buộc): Nhập chủ sở hữu của dự án SubQuery này tại đây (ví dụ: tên bạn!)
- Description (Tùy chọn): Bạn có thể cung cấp một đoạn giới thiệu ngắn về dự án của mình, mô tả dự án chứa dữ liệu gì và người dùng có thể làm gì với dự án
- Version (Bắt buộc): Nhập số phiên bản tùy chỉnh hoặc sử dụng giá trị mặc định (`1.0.0`)
- License (Bắt buộc): Cung cấp giấy phép phần mềm cho dự án này hoặc chấp nhận mặc định (`Apache-2.0`)

Sau khi quá trình khởi tạo hoàn tất, bạn sẽ thấy một thư mục có tên dự án của bạn đã được tạo bên trong thư mục. Nội dung của thư mục này phải giống với nội dung được liệt kê trong [Cấu trúc thư mục](../create/introduction.md#directory-structure).

Cuối cùng, trong thư mục dự án, chạy lệnh sau để cài đặt các phụ thuộc của dự án mới.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Thực hiện các thay đổi đối với dự án của bạn

Trong gói khởi đầu mà bạn vừa khởi tạo, chúng tôi đã cung cấp cấu hình tiêu chuẩn cho dự án mới của bạn. Bạn sẽ làm việc chủ yếu trên các tệp sau:

1. Lược đồ GraphQL ở `schema.graphql`
2. Tệp Kê khai dự án ở ` project.yaml `
3. Các chức năng ánh xạ trong thư mục `src/mappings/`

Mục tiêu của hướng dẫn bắt đầu nhanh này là điều chỉnh dự án khởi đầu tiêu chuẩn để bắt đầu lập chỉ mục tất cả các giao dịch từ Polkadot.

### Cập nhật tệp lược đồ GraphQL của bạn

Tệp `schema.graphql` xác định các lược đồ GraphQL khác nhau. Do cách hoạt động của ngôn ngữ truy vấn GraphQL, về cơ bản tệp lược đồ chỉ ra hình dạng dữ liệu của bạn từ SubQuery. Đây là một nơi tuyệt vời để bắt đầu vì nó cho phép bạn xác định trước mục tiêu cuối cùng của mình.

Chúng ta sẽ cập nhật tệp `schema.graphql` để trông như sau

```graphql
type Transfer @entity {
  id: ID! # Trường id là bắt buộc và phải trông như thế này
  amount: BigInt # Số tiền được chuyển
  blockNumber: BigInt # Chiều cao khổi của giao dịch
  from: Account! # Tài khoản chuyển tiền được thực hiện từ
  to: Account! # Tài khoản chuyển tiền được thực hiện cho
}
```

**Quan trọng: Khi bạn thực hiện bất kỳ thay đổi nào đối với tệp lược đồ, hãy đảm bảo rằng bạn tạo lại thư mục types của mình. Thực hiện ngay bây giờ.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

Bạn sẽ tìm thấy các model đã tạo trong thư mục `/src/types/models`. Để biết thêm thông tin về tệp `schema.graphql`, hãy xem tài liệu của chúng tôi trong [Lược đồ Build/GraphQL ](../build/graphql.md)

### Cập nhật tệp kê khai dự án

The Projet Manifest (`project.yaml`) file can be seen as an entry point of your project and it defines most of the details on how SubQuery will index and transform the chain data.

We won't do many changes to the manifest file as it already has been setup correctly, but we need to change our handlers. Remember we are planning to index all Polkadot transfers, as a result, we need to update the `datasources` section to read the following.

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

For more information about the Project Manifest (`project.yaml`) file, check out our documentation under [Build/Manifest File](../build/manifest.md)

### Thêm một hàm Ánh xạ

Mapping functions define how chain data is transformed into the optimised GraphQL entities that we have previously defined in the `schema.graphql` file.

Navigate to the default mapping function in the `src/mappings` directory. You'll see three exported functions, `handleBlock`, `handleEvent`, and `handleCall`. You can delete both the `handleBlock` and `handleCall` functions, we are only dealing with the `handleEvent` function.

The `handleEvent` function recieved event data whenever event matches the filters that we specify previously in our `project.yaml`. We are going to update it to process all `balances.Transfer` events and save them to the GraphQL entities that we created earlier.

You can update the `handleEvent` function to the following (note the additional imports):

```ts
import { SubstrateEvent } from "@subql/types";
import { Transfer } from "../types";
import { Balance } from "@polkadot/types/interfaces";

export async function handleTransfer(event: SubstrateEvent): Promise<void> {
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

What this is doing is receiving a SubstrateEvent which includes transfer data on the payload. We extract this data and then instantiate a new `Transfer` entity that we defined earlier in the `schema.graphql` file. We add additional information and then use the `.save()` function to save the new entity (SubQuery will automatically save this to the database).

For more information about mapping functions, check out our documentation under [Build/Mappings](../build/mapping.md)

### Xây dựng dự án

In order run your new SubQuery Project we first need to build our work. Run the build command from the project's root directory.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Important: Whenever you make changes to your mapping functions, you'll need to rebuild your project**

## Running and Querying your Project

### Run your Project with Docker

Whenever you create a new SubQuery Project, you should always run it locally on your computer to test it first. The easiest way to do this is by using Docker.

All configuration that controls how a SubQuery node is run is defined in this `docker-compose.yml` file. For a new project that has been just initalised you won't need to change anything here, but you can read more about the file and the settings in our [Run a Project section](../run_publish/run.md)

Under the project directory run following command:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

It may take some time to download the required packages ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), and Postgres) for the first time but soon you'll see a running SubQuery node. Be patient here.

### Truy vấn dự án của bạn

Mở trình duyệt của bạn và truy cập [ http://localhost:3000](http://localhost:3000).

Bạn sẽ thấy một sân chơi GraphQL đang hiển thị trong explorer và các lược đồ đã sẵn sàng để truy vấn. Ở trên cùng bên phải của sân chơi, bạn sẽ tìm thấy nút _Tài liệu_ sẽ mở bản vẽ tài liệu. Tài liệu này được tạo tự động và giúp bạn tìm thấy những thực thể và phương pháp nào bạn có thể truy vấn.

Đối với dự án khởi đầu SubQuery mới, bạn có thể thử truy vấn như sau để biết cách hoạt động của nó hoặc [tìm hiểu thêm về ngôn ngữ Truy vấn GraphQL](../run_publish/graphql.md).

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

SubQuery provides a free managed service when you can deploy your new project to. You can deploy it to [SubQuery Projects](https://project.subquery.network) and query it using our [Explorer](https://explorer.subquery.network).

[Read the guide to publish your new project to SubQuery Projects](../run_publish/publish.md)

## Bước tiếp theo

Xin chúc mừng, bạn hiện có một dự án SubQuery đang chạy cục bộ chấp nhận các yêu cầu API GraphQL để chuyển dữ liệu.

Now that you've had an insight into how to build a basic SubQuery project, the question is where to from here? If you are feeling confident, you can jump into learning more about the three key files. The manifest file, the GraphQL schema, and the mappings file under the [Build section of these docs](../build/introduction.md).

Otherwise, continue to our [Academy section](../academy/academy.md) where have more in depth workshops, tutorials, and example projects. There we'll look at more advanced modifications, and we'll take a deeper dive at running SubQuery projects by running readily available and open source projects.

Finally, if you're looking for more ways to run and publish your project, our [Run & Publish section](../run_publish/run.md) provides detailed informatation about all the ways to run your SubQuery project and other advanced GraphQL aggregation and subscription features.
