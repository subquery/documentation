# Bắt đầu nhanh với Cosmos

Trong hướng dẫn bắt đầu nhanh này, chúng ta sẽ bắt đầu với một dự án khởi động Cosmos đơn giản trong Mạng Juno và sau đó kết thúc bằng cách lập chỉ mục một số dữ liệu thực tế. Đây là cơ sở tuyệt vời để bắt đầu khi phát triển Dự án SubQuery của riêng bạn.

**Nếu bạn đang tìm kiếm hướng dẫn cho Substrate/Polkadot, bạn có thể đọc [ Hướng dẫn bắt đầu nhanh cụ thể dành cho Substrate/Polkadot](./quickstart-polkadot).**

Sau khi hoàn thành xong hướng dẫn này, bạn sẽ có một dự án SubQuery đang hoạt động chạy trên nút SubQuery với điểm cuối GraphQL mà có thể truy vấn dữ liệu từ đó.

Nếu bạn chưa sẵn sàng, chúng tôi khuyên bạn nên tự làm quen với [thuật ngữ](../#terminology) được sử dụng trong SubQuery.

**Mục tiêu của hướng dẫn nhanh này là điều chỉnh dự án khởi động tiêu chuẩn để bắt đầu lập chỉ mục tất cả các phiếu bầu trên [ Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2) (cũng đóng góp cho SubQuery) từ Cosmos, chỉ mất 10-15 phút**

Bạn có thể xem code cuối cùng của dự án này tại [https://github.com/jamesbayly/juno-terra-developer-fund-votes](https://github.com/jamesbayly/juno-terra-developer-fund-votes)

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

Xin lưu ý rằng chúng tôi **KHÔNG** khuyến khích sử dụng `yarn global` để cài đặt `@subql/cli` do khả năng quản lý dependency kém có thể dẫn đến lỗi.

Sau khi cài đặt xong, bạn có thể chạy lệnh help để xem các lệnh có sẵn của CLI và cách sử dụng chúng

```shell
subql help
```

## Khởi tạo Dự án khởi đầu SubQuery

Cosmos vẫn chưa được hỗ trợ trong CLI của SubQuery (`subql`), để bắt đầu với Juno clone hoặc fork [dự án khởi đầu](https://github.com/subquery/juno-subql-starter).

Sau khi quá trình khởi tạo hoàn tất, bạn sẽ thấy một thư mục có tên dự án của bạn đã được tạo bên trong thư mục. Nội dung của thư mục này phải giống với nội dung được liệt kê trong [Cấu trúc thư mục](../create/introduction.md#directory-structure).

Cuối cùng, trong thư mục dự án, chạy lệnh sau để cài đặt các phụ thuộc của dự án mới.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

## Thực hiện các thay đổi trên dự án của bạn

Trong gói khởi đầu mà bạn vừa khởi tạo, chúng tôi đã cung cấp cấu hình tiêu chuẩn cho dự án của bạn. Bạn sẽ làm việc chủ yếu trên các tệp sau:

1. Lược đồ GraphQL ở `schema.graphql`
2. Tệp Kê khai dự án ở ` project.yaml `
3. Các chức năng ánh xạ trong thư mục `src/mappings/`

Mục tiêu của hướng dẫn bắt đầu nhanh này là điều chỉnh dự án khởi đầu tiêu chuẩn để bắt đầu lập chỉ mục tất cả các giao dịch từ hợp đồng thông minh bLuna.

### Cập nhật tệp lược đồ GraphQL của bạn

Tệp `schema.graphql` xác định các lược đồ GraphQL khác nhau. Do cách hoạt động của ngôn ngữ truy vấn GraphQL, về cơ bản tệp lược đồ chỉ ra hình dạng dữ liệu của bạn từ SubQuery. Đây là một nơi tuyệt vời để bắt đầu vì nó cho phép bạn xác định trước mục tiêu cuối cùng của mình.

Chúng tôi sẽ cập nhật tệp `schema.graphql` để trông như sau để chúng tôi có thể lập chỉ mục tất cả các phiếu bầu trên [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2).

```graphql
type Vote @entity {
  id: ID! # trường id luôn là bắt buộc và phải trông như thế này
  blockHeight: BigInt!
  voter: String! # Địa chỉ đã bỏ phiếu
  proposalID: BigInt! # ID đề xuất
  vote: Boolean! # Nếu họ bỏ phiếu ủng hộ hoặc từ chối đề xuất
}
```

**Quan trọng: Khi bạn thực hiện bất kỳ thay đổi nào đối với tệp lược đồ, hãy đảm bảo rằng bạn tạo lại thư mục types của mình. Thực hiện ngay bây giờ.**

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn codegen ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell npm run-script codegen ``` </CodeGroupItem> </CodeGroup>

Bạn sẽ tìm thấy các model đã tạo trong `thư mục /src/types/models`. Để biết thêm thông tin về tệp `schema.graphql`, hãy xem tài liệu của chúng tôi trong [Lược đồ Build/GraphQL ](../build/graphql.md)

### Cập nhật tệp kê khai dự án

Tệp Project Manifest (`project.yaml`) có thể được xem là điểm vào dự án của bạn và nó xác định hầu hết các thông tin chi tiết về cách SubQuery sẽ lập chỉ mục và chuyển đổi dữ liệu chuỗi.

Chúng tôi sẽ không thực hiện nhiều thay đổi đối với tệp kê khai vì tệp đã được thiết lập đúng cách, nhưng chúng tôi cần thay đổi trình xử lý của mình. Hãy nhớ rằng chúng tôi đang có kế hoạch lập chỉ mục tất cả các phiếu bầu trên [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2). Điều này có nghĩa là chúng tôi sẽ xem xét các tin nhắn sử dụng lệnh gọi hợp đồng `vote`, chúng tôi cần cập nhật phần `datasources` để trông nó như sau.

```yml
dataSources:
  - kind: cosmos/Runtime
    startBlock: 3246370 # The block when the first proposal in this fund was created
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleTerraDeveloperFund
          kind: cosmos/MessageHandler
          filter:
            type: "/cosmwasm.wasm.v1.MsgExecuteContract"
            # Filter to only messages with the vote function call
            contractCall: "vote" # The name of the contract function that was called
            values: # This is the specific smart contract that we are subscribing to
              contract: "juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2"
```

Điều này có nghĩa là chúng tôi sẽ chạy một hàm `handleTerraDeveloperFund` lập lược đồ mỗi khi có một `vote` từ hợp đồng thông minh [Terra Developer Fund](https://daodao.zone/multisig/juno1lgnstas4ruflg0eta394y8epq67s4rzhg5anssz3rc5zwvjmmvcql6qps2).

Để biết thêm thông tin về tệp Project Manifest (`project.yaml`), hãy xem tài liệu của chúng tôi trong [Build/Manifest File](../build/manifest.md)

### Thêm một hàm Ánh xạ

Các hàm ánh xạ xác định cách dữ liệu chuỗi được chuyển đổi thành các thực thể GraphQL được tối ưu hóa mà chúng ta đã xác định trước đó trong tệp `schema.graphql`.

Điều hướng đến hàm ánh xạ mặc định trong thư mục `src/mappings `. Bạn sẽ thấy bốn hàm được xuất, `handleBlock`, `handleEvent`, `handleMessage`, và `handleTransaction`. Vì chúng ta chỉ xử lý tin nhắn, bạn có thể xóa mọi thứ khác ngoài hàm `handleMessage`.

Hàm `handleMessage` nhận dữ liệu sự kiện bất cứ khi nào sự kiện khớp với các bộ lọc mà chúng tôi chỉ định trước đó trong `project.yaml` của chúng tôi. Chúng tôi sẽ cập nhật nó để xử lý tất cả các tin nhắn `vote` và lưu chúng vào các thực thể GraphQL mà chúng tôi đã tạo trước đó.

Bạn có thể cập nhật hàm `handleMessage` lên như sau (lưu ý việc nhập bổ sung và đổi tên hàm):

```ts
import { Vote } from "../types";
import { CosmosMessage } from "@subql/types-cosmos";

export async function handleTerraDeveloperFund(
  message: CosmosMessage
): Promise<void> {
  // logger.info(JSON.stringify(message));
  // Example vote https://www.mintscan.io/juno/txs/EAA2CC113B3EC79AE5C280C04BE851B82414B108273F0D6464A379D7917600A4

  const voteRecord = new Vote(`${message.tx.hash}-${message.idx}`);
  voteRecord.blockHeight = BigInt(message.block.block.header.height);
  voteRecord.voter = message.msg.sender;
  voteRecord.proposalID = message.msg.msg.vote.proposal_id;
  voteRecord.vote = message.msg.msg.vote.vote === "yes";

  await voteRecord.save();
}
```

Hàm này đang nhận CosmosMessage bao gồm dữ liệu tin nhắn trên trọng tải. Chúng tôi trích xuất dữ liệu này và sau đó khởi tạo thực thể `Vote` mới mà chúng tôi đã xác định trước đó trong tệp `schema.graphql`. Chúng tôi thêm thông tin bổ sung và sau đó sử dụng hàm `.save()` để lưu thực thể mới (SubQuery sẽ tự động lưu nó vào cơ sở dữ liệu).

Để biết thêm thông tin về các hàm ánh xạ, hãy xem tài liệu của chúng tôi trong [Build/Mappings](../build/mapping.md)

### Xây dựng dự án

Để chạy Dự án SubQuery mới của bạn trước tiên chúng tôi cần xây dựng công việc của mình. Chạy lệnh xây dựng từ thư mục gốc của dự án.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script build ``` </CodeGroupItem> </CodeGroup>

**Quan trọng: Bất cứ khi nào bạn thực hiện các thay đổi đối với các hàm ánh xạ của mình, bạn sẽ cần phải xây dựng lại dự án của mình**

## Chạy và truy vấn dự án của bạn

### Chạy Dự án của bạn với Docker

Bất cứ khi nào bạn tạo một Dự án SubQuery mới, bạn nên chạy nó cục bộ trên máy tính của mình để kiểm tra nó trước. Cách dễ nhất để làm điều này là sử dụng Docker.

Tất cả cấu hình kiểm soát cách chạy node SubQuery được định nghĩa trong tệp ` docker-comp.yml`. Đối với một dự án mới vừa được khởi tạo, bạn sẽ không cần phải thay đổi bất kỳ điều gì nhưng có thể đọc thêm về tệp và cài đặt trong [phần Chạy dự án](../run_publish/run.md) của chúng tôi

Trong thư mục dự án chạy lệnh sau:

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn start:docker ``` </CodeGroupItem> <CodeGroupItem title="NPM"> ```shell npm run-script start:docker ``` </CodeGroupItem> </CodeGroup>

Có thể mất một chút thời gian để tải xuống các gói cần thiết ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), và Postgres) cho lần đầu tiên, nhưng bạn sẽ sớm thấy một node SubQuery đang chạy. Hãy kiên nhẫn ở bước này.

### Truy vấn dự án của bạn

Mở trình duyệt của bạn và truy cập [ http://localhost:3000](http://localhost:3000).

Bạn sẽ thấy một sân chơi GraphQL đang hiển thị trong explorer và các lược đồ đã sẵn sàng để truy vấn. Ở trên cùng bên phải của sân chơi, bạn sẽ tìm thấy nút _Tài liệu_ sẽ mở bản vẽ tài liệu. Tài liệu này được tạo tự động và giúp bạn tìm thấy những thực thể và phương pháp nào bạn có thể truy vấn.

Đối với dự án khởi đầu SubQuery mới, bạn có thể thử truy vấn như sau để biết cách hoạt động của nó hoặc [tìm hiểu thêm về ngôn ngữ Truy vấn GraphQL](../run_publish/graphql.md).

```graphql
query {
    votes(
    first: 5
    orderBy: BLOCK_HEIGHT_DESC
    # filter: {proposalID: {equalTo: "4"}}
  ) {
    nodes {
      id
      blockHeight
      voter
      vote
    }
  }
}
```

Bạn có thể xem code cuối cùng của dự án này tại [https://github.com/jamesbayly/juno-terra-developer-fund-votes](https://github.com/jamesbayly/juno-terra-developer-fund-votes)

### Xuất bản Dự Án SubQuery của bạn

SubQuery cung cấp dịch vụ quản lý miễn phí nơi bạn có thể triển khai dự án mới của mình. Bạn có thể triển khai nó trên [SubQuery Projects](https://project.subquery.network) và truy vấn nó bằng cách sử dụng [Explorer](https://explorer.subquery.network) của chúng tôi.

[Đọc hướng dẫn để xuất bản dự án mới của bạn lên SubQuery Projects](../run_publish/publish.md)

## Bước tiếp theo

Xin chúc mừng, bạn hiện có một dự án SubQuery đang chạy cục bộ chấp nhận các yêu cầu API GraphQL để chuyển dữ liệu từ Luna.

Bây giờ bạn đã có cái nhìn sâu sắc về cách xây dựng một dự án SubQuery cơ bản, câu hỏi đặt ra là bắt đầu từ đâu? Nếu bạn cảm thấy tự tin, bạn có thể bắt đầu tìm hiểu thêm về ba tệp chính. Tệp kê khai, lược đồ GraphQL và tệp ánh xạ trong phần [Phần Xây dựng của các tài liệu này](../build/introduction.md).

Nếu không, hãy tiếp tục đến [Phần Học viện](../academy/academy.md) của chúng tôi, nơi có các hội thảo, hướng dẫn và dự án mẫu chuyên sâu hơn. Ở đó, chúng ta sẽ xem xét các sửa đổi nâng cao hơn và chúng ta sẽ đi sâu hơn vào việc chạy các dự án SubQuery bằng cách chạy các dự án nguồn mở và sẵn có.

Cuối cùng, nếu bạn đang tìm kiếm các cách khác để chạy và xuất bản dự án của mình, [Chạy & Phần xuất bản](../run_publish/run.md) cung cấp thông tin chi tiết về tất cả các cách để chạy dự án SubQuery của bạn và các tính năng tổng hợp GraphQL và tính năng theo dõi.
