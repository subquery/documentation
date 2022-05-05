# Chạy SubQuery trên môi trường local

Hướng dẫn này hoạt động thông qua cách chạy một node SubQuery cục bộ trên cơ sở hạ tầng của bạn, bao gồm cả trình lập chỉ mục và dịch vụ truy vấn. Bạn không muốn lo lắng về việc chạy cơ sở hạ tầng SubQuery của riêng mình? SubQuery cung cấp miễn phí [ dịch vụ được lưu trữ được quản lý ](https://explorer.subquery.network) cho cộng đồng. [Follow our publishing guide](../run_publish/publish.md) to see how you can upload your project to [SubQuery Projects](https://project.subquery.network).

## Sử dụng Docker

Một giải pháp thay thế là chạy một <strong>Docker Container</strong>, được xác định bởi tệp `docker-compose.yml`. Đối với một dự án mới vừa được khởi tạo, bạn sẽ không cần phải thay đổi bất cứ điều gì ở đây.

Trong thư mục dự án, hãy chạy lệnh sau:

```shell
docker-compose pull && docker-compose up
```

Trong lần đầu tiên có thể bạn sẽ mất chút thời gian để tải xuống các package cần thiết ([`@subql/node`](https://www.npmjs.com/package/@subql/node), [`@subql/query`](https://www.npmjs.com/package/@subql/query), và Postgres), nhưng sau đó bạn sẽ thấy node SubQuery được khởi chạy.

## Khởi chạy bộ lập chỉ mục (Indexer) (subql/node)

Yêu cầu:

- [Postgres](https://www.postgresql.org/) cơ sở dữ liệu (phiên bản 12 hoặc cao hơn). Trong khi [SubQuery node](#start-a-local-subquery-node) đang lập chỉ mục chuỗi khối, dữ liệu trích xuất được lưu trữ trong một phiên bản cơ sở dữ liệu bên ngoài.

Một node SubQuery sẽ triển khai trích xuất dữ liệu chuỗi khối dựa trên chất nền (substrate) cho mỗi dự án SubQuery và lưu nó vào cơ sở dữ liệu Postgres.

### Cài đặt

<CodeGroup>
<CodeGroupItem title='Substrate'>

``` shell
# NPM
npm install -g @subql/node
```
</CodeGroupItem>

<CodeGroupItem title='Avalanche'>

``` shell
# NPM
npm install -g @subql/node-avalanche
````

</CodeGroupItem>
</CodeGroup>

Please note that we **DO NOT** encourage the use of `yarn global` due to its poor dependency management which may lead to an errors down the line.

Sau khi cài đặt, bạn có thể khởi chạy một node bằng lệnh sau:


<CodeGroup>
<CodeGroupItem title='Substrate'>

```shell
subql-node <command>
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche <command>
```

</CodeGroupItem>
</CodeGroup>

### Key Commands

The following commands will assist you to complete the configuration of a SubQuery node and begin indexing. Để tìm hiểu thêm, bạn luôn có thể chạy `--help`.

#### Trỏ đến đường dẫn dự án trên môi trường local

<CodeGroup>
<CodeGroupItem title='Substrate'>

```shell
subql-node -f your-project-path
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -f your-project-path
```

</CodeGroupItem>
</CodeGroup>

#### Use a Dictionary

Using a full chain dictionary can dramatically speed up the processing of a SubQuery project during testing or during your first index. In some cases, we've seen indexing performance increases of up to 10x.

A full chain dictionary pre-indexes the location of all events and extrinsics within the specific chain and allows your node service to skip to relevant locations when indexing rather than inspecting each block.

You can add the dictionary endpoint in your `project.yaml` file (see [Manifest File](../create/manifest.md)), or specify it at run time using the following command:

<CodeGroup>
<CodeGroupItem title='Substrate'>

```shell
subql-node --network-dictionary=https://api.subquery.network/sq/subquery/dictionary-polkadot
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche --network-dictionary=https://api.subquery.network/sq/subquery/dictionary-polkadot
```

</CodeGroupItem>
</CodeGroup>

[Read more about how a SubQuery Dictionary works](../academy/tutorials_examples/dictionary.md).

#### Connect to database

```shell
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
subql-node -f your-project-path
```

Depending on the configuration of your Postgres database (e.g. a different database password), please ensure also that both the indexer (`subql/node`) and the query service (`subql/query`) can establish a connection to it.

#### Specify a configuration file

<CodeGroup>
<CodeGroupItem title='Substrate'>

```shell
subql-node -c your-project-config.yml
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -c your-project-config.yml
```

</CodeGroupItem>
</CodeGroup>

This will point the query node to a configuration file which can be in YAML or JSON format. Check out the example below.

```yaml
subquery: ../../../../subql-example/extrinsics
subqueryName: extrinsics
batchSize:100
localMode:true
```

#### Thay đổi kích thước lô tìm nạp khối

```shell
subql-node -f your-project-path --batch-size 200

Kết quả:
[IndexerManager] fetch block [203, 402]
[IndexerManager] fetch block [403, 602]
```

Khi trình lập chỉ mục lập chỉ mục chuỗi lần đầu tiên, việc tìm nạp các khối đơn lẻ sẽ làm giảm đáng kể hiệu suất. Tăng kích thước lô để điều chỉnh số lượng khối được tìm nạp sẽ làm giảm thời gian xử lý tổng thể. Kích thước lô mặc định hiện tại là 100.

#### Chạy ở chế độ cục bộ

<CodeGroup>
<CodeGroupItem title='Substrate'>

```shell
subql-node -f your-project-path --local
```

</CodeGroupItem>
<CodeGroupItem title='Avalanche'>

```shell
subql-node-avalanche -f your-project-path --local
```

</CodeGroupItem>
</CodeGroup>

For debugging purposes, users can run the node in local mode. Viêc chuyển sang chế độ local sẽ tạo các bảng Postgres trong sơ đồ `công khai` mặc định.

Nếu chế độ local không được sử dụng, một sơ đồ Postgres mới với `subquery_` và các bảng dự án tương ứng sẽ được khởi tạo.

#### Kiểm tra tình trạng node của bạn

Có 2 điểm cuối mà bạn có thể sử dụng để kiểm tra và theo dõi tình trạng của một node SubQuery đang chạy.

- Kiểm tra tình trạng điểm cuối sẽ trả về một phần hồi 200 đơn giản
- Điểm cuối siêu dữ liệu bao gồm các phân tích bổ sung về nút SubQuery đang chạy của bạn

Nối phần này vào URL cơ sở của nút SubQuery của bạn. Ví dụ: ` http: // localhost: 3000 / meta ` sẽ trả về:

```bash
{
    "currentProcessingHeight": 1000699,
    "currentProcessingTimestamp": 1631517883547,
    "targetHeight": 6807295,
    "bestHeight": 6807298,
    "indexerNodeVersion": "0.19.1",
    "lastProcessedHeight": 1000699,
    "lastProcessedTimestamp": 1631517883555,
    "uptime": 41.151789063,
    "polkadotSdkVersion": "5.4.1",
    "apiConnected": true,
    "injectedApiConnected": true,
    "usingDictionary": false,
    "chain": "Polkadot",
    "specName": "polkadot",
    "genesisHash": "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3",
    "blockTime": 6000
}
```

`http://localhost:3000/health` sẽ trả về HTTP 200 nếu thành công.

Lỗi 500 sẽ được trả về nếu trình lập chỉ mục không khỏe mạnh. Điều này thường có thể được nhìn thấy khi nút đang khởi động.

```shell
{
    "status": 500,
    "error": "Indexer is not healthy"
}
```

Nếu một URL không chính xác được sử dụng, lỗi 404 not found sẽ được trả về.

```shell
{
"statusCode": 404,
"message": "Cannot GET /healthy",
"error": "Not Found"
}
```

#### Gỡ lỗi dự án của bạn

Sử dụng [ trình kiểm tra nút ](https://nodejs.org/en/docs/guides/debugging-getting-started/) để chạy lệnh sau.

```shell
node --inspect-brk <path to subql-node> -f <path to subQuery project>
```

Ví dụ:

```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Debugger listening on ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
```

Sau đó, mở các công cụ dành cho nhà phát triển Chrome, đi tới Nguồn > Hệ thống tệp và thêm dự án của bạn vào không gian làm việc và bắt đầu gỡ lỗi. For more information, check out [How to debug a SubQuery project](https://doc.subquery.network/academy/tutorials_examples/debug-projects/)

## Khởi chạy một Dịch vụ Truy vấn (subql/query)

### Cài đặt

```shell
# NPM
npm install -g @subql/query
```

Xin lưu ý rằng chúng tôi **KHÔNG** khuyến khích sử dụng `yarn global` do việc quản lý phụ thuộc không tốt có thể dẫn đến lỗi xuống dòng.

### Chạy dịch vụ truy vấn

```
export DB_HOST=localhost
subql-query --name <project_name> --playground
```

Đảm bảo rằng tên dự án này trùng với tên bạn đã đặt từ lúc [khởi tạo dự án](../quickstart/quickstart.md#initialise-the-starter-subquery-project). Ngoài ra, hãy kiểm tra xem các biến môi trường đã chuẩn hay chưa.

Sau khi chạy thành công dịch vụ truy vấn subql, hãy mở trình duyệt của bạn và truy cập địa chỉ `http://localhost:3000`. Bạn sẽ thấy một sân chơi GraphQL hiển thị trong Trình khám phá và lược đồ đã sẵn sàng để truy vấn.
