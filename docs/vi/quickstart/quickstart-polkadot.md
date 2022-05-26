# Bắt đầu nhanh với Polkadot

Trong hướng dẫn nhanh này, chúng ta sẽ khởi đầu với một dự án Substrate/Polkadot đơn giản và sau đó kết thúc bằng cách lập chỉ mục một số dữ liệu thực tế. Đây là cơ sở tuyệt vời để bắt đầu khi phát triển Dự án Substrate/Polkadot với SubQuery của riêng bạn.

Sau khi hoàn thành xong hướng dẫn này, bạn sẽ có một dự án SubQuery đang hoạt động chạy trên nút SubQuery với điểm cuối GraphQL mà có thể truy vấn dữ liệu từ đó.

Nếu bạn chưa sẵn sàng, chúng tôi khuyên bạn nên tự làm quen với [thuật ngữ](../#terminology) được sử dụng trong SubQuery.

**Mục tiêu của hướng dẫn bắt đầu nhanh này là điều chỉnh dự án khởi động tiêu chuẩn để bắt đầu lập chỉ mục tất cả các lần chuyển từ Polkadot, chỉ mất 10-15 phút**

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

Xin lưu ý rằng chúng tôi **KHÔNG** khuyến khích sử dụng `yarn global<` để cài đặt `@subql/cli` do quản lý phụ thuộc kém có thể dẫn đến lỗi xuống dòng.

Sau khi cài đặt xong, bạn có thể chạy lệnh help để xem các lệnh có sẵn của CLI và cách sử dụng chúng:

```shell
subql help
```

## Khởi tạo Dự án khởi đầu SubQuery

Bên trong thư mục mà bạn muốn tạo một dự án SubQuery, hãy chạy lệnh sau để bắt đầu.

```shell
subql init
```

Bạn sẽ được hỏi một số câu hỏi khi dự án SubQuery được khởi tạo:

- Tên dự án: Tên dự án SubQuery của bạn
- Network family: Một mạng blockchain layer-1 mà dự án SubQuery này sẽ được phát triển để lập chỉ mục. Sử dụng các phím mũi tên để chọn từ các tùy chọn có sẵn. Đối với hướng dẫn này, chúng tôi sẽ sử dụng * "Substrate" *
- Network: Network cụ thể mà dự án SubQuery này sẽ được phát triển để lập chỉ mục. Sử dụng các phím mũi tên để chọn từ các tùy chọn có sẵn. Đối với hướng dẫn này, chúng tôi sẽ sử dụng * "Polkadot" *
- Template project (Dự án mẫu): Chọn một dự án mẫu SubQuery sẽ cung cấp một điểm khởi đầu để bắt đầu phát triển. Chúng tôi khuyên bạn nên chọn dự án * "subql-starter" *.
- RPC endpoint: Cung cấp HTTPS URL cho RPC endpoint đang chạy, sẽ được sử dụng mặc định cho dự án này. Bạn có thể nhanh chóng truy cập các endpoints công khai cho các mạng Polkadot khác nhau, tạo node chuyên dụng riêng của mình bằng cách sử dụng [ OnFinality ](https://app.onfinality.io) hoặc chỉ sử dụng Polkadot endpoint mặc định. Nút RPC này phải là một nút lưu trữ (có trạng thái chuỗi đầy đủ). Đối với hướng dẫn này, chúng tôi sẽ sử dụng giá trị mặc định * "https://polkadot.api.onfinality.io" *
- Git repository: Cung cấp Git URL cho repo mà dự án SubQuery này sẽ được lưu trữ (khi được lưu trữ trong SubQuery Explorer) hoặc chấp nhận giá trị mặc định được cung cấp.
- Authors (Tác giả): Nhập chủ sở hữu của dự án SubQuery này tại đây (ví dụ: tên của bạn!) Hoặc chấp nhận giá trị mặc định đã cung cấp.
- Description (Mô tả): Cung cấp một đoạn giới thiệu ngắn về dự án của bạn, mô tả dự án chứa dữ liệu gì và người dùng có thể làm gì với dự án đó hoặc chấp nhận giá trị mặc định đã cung cấp.
- Version (Phiên bản): Nhập số phiên bản tùy chỉnh hoặc sử dụng mặc định (` 1.0.0 `)
- License (Giấy phép): Cung cấp giấy phép phần mềm cho dự án này hoặc chấp nhận giấy phép mặc định (` MIT `)

Sau khi quá trình khởi tạo hoàn tất, bạn sẽ thấy một thư mục có tên dự án của bạn đã được tạo bên trong thư mục. Nội dung của thư mục này phải giống với nội dung được liệt kê trong [Directory Structure](../create/introduction.md#directory-structure).

Cuối cùng, trong thư mục dự án, chạy lệnh sau để cài đặt các phụ thuộc của dự án mới.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Thực hiện các thay đổi đối với dự án của bạn

Trong gói khởi động vừa được khởi tạo, một cấu hình tiêu chuẩn đã được cung cấp. Đó là:

1. Lược đồ GraphQL trong ` schema.graphql `
2. Tệp Kê khai dự án ở ` project.yaml `
3. Các chức năng ánh xạ trong thư mục `src/mappings/`

Mục tiêu của hướng dẫn bắt đầu nhanh này là điều chỉnh dự án khởi đầu tiêu chuẩn để bắt đầu lập chỉ mục tất cả các giao dịch từ Polkadot.

### Cập nhật tệp lược đồ GraphQL của bạn

Tệp `schema.graphql` xác định các lược đồ GraphQL khác nhau. Do cách hoạt động của ngôn ngữ truy vấn GraphQL, về cơ bản tệp lược đồ chỉ ra hình dạng dữ liệu của bạn từ SubQuery. Đây là một nơi tuyệt vời để bắt đầu vì nó cho phép bạn xác định trước mục tiêu cuối cùng của mình.

Chúng ta sẽ cập nhật tệp `schema.graphql` giống như sau:

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

Bạn sẽ tìm thấy các mô hình đã tạo trong thư mục `/src/types/models` Để biết thêm thông tin về tệp `schema.graphql`, hãy xem tài liệu của chúng tôi trong [Lược đồ Build/GraphQL ](../build/graphql.md)

### Cập nhật tệp kê khai dự án

file Project Manifest (`project.yaml`) có thể được xem là entry point của dự án và nó xác định hầu hết các thông tin chi tiết về cách SubQuery sẽ lập chỉ mục và chuyển đổi dữ liệu chuỗi.

File kê khai đã được thiết lập chính xác, nhưng chúng tôi cần thay đổi trình xử lý của mình. Chúng tôi đang lên kế hoạch lập chỉ mục tất cả các giao dịch Polkadot, do đó, chúng tôi cần cập nhật phần `datasources` để trông như sau:

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

Điều này có nghĩa là chúng ta sẽ chạy một hàm ánh xạ `handleEvent` mỗi khi có sự kiện `balance.Transfer`.

Để biết thêm thông tin về tệp Project Manifest (`project.yaml`), hãy xem tài liệu của chúng tôi trong [Build/Manifest File](../build/manifest.md)

### Thêm một hàm Ánh xạ

Các hàm ánh xạ xác định cách dữ liệu chuỗi được chuyển đổi thành các thực thể GraphQL được tối ưu hóa mà chúng ta đã xác định trước đó trong tệp `schema.graphql`.

Điều hướng đến hàm ánh xạ mặc định trong thư mục `src/mappings `. Bạn sẽ thấy ba hàm được xuất, `handleBlock`, `handleEvent` và `handleCall`. Xóa cả hai hàm `handleBlock` và `handleCall`, chúng tôi chỉ sử dụng hàm `handleEvent`.

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

SubQuery cung cấp dịch vụ quản lý miễn phí nơi bạn có thể triển khai dự án mới của mình. Bạn có thể triển khai nó trên [SubQuery Projects](https://project.subquery.network) và truy vấn nó bằng cách sử dụng [Explorer](https://explorer.subquery.network) của chúng tôi.

Read the guide to [publish your new project to SubQuery Projects](../run_publish/publish.md)

## Bước tiếp theo

Xin chúc mừng, bạn hiện có một dự án SubQuery đang chạy cục bộ chấp nhận các yêu cầu API GraphQL để chuyển dữ liệu.

Bây giờ bạn đã có cái nhìn sâu sắc về cách xây dựng một dự án SubQuery cơ bản, câu hỏi đặt ra là bắt đầu từ đâu? Nếu bạn cảm thấy tự tin, bạn có thể bắt đầu tìm hiểu thêm về ba tệp chính. The manifest file, the GraphQL schema, and the mappings file are under the [Build section of these docs](../build/introduction.md).

Otherwise, continue to our [Academy section](../academy/academy.md) where we have more in-depth workshops, tutorials, and example projects. Ở đó, chúng ta sẽ xem xét các sửa đổi nâng cao hơn và chúng ta sẽ đi sâu hơn vào việc chạy các dự án SubQuery bằng cách chạy các dự án nguồn mở và sẵn có.

Finally, if you're looking for more ways to run and publish your project, our [Run & Publish section](../run_publish/run.md) provides detailed information about all the ways to run your SubQuery project and other advanced GraphQL aggregation and subscription features.
