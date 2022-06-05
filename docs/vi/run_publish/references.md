# Cờ hiệu dòng lệnh

## subql (cli)

### --help

```shell
> subql --help

COMMANDS
  build     Xây dựng mã dự án SubQuery
  codegen   Tạo lược đồ cho nút đồ thị
  help      hiển thị trợ giúp cho subql
  init      Khởi tạo một khung dự án subquery
  migrate   Di chuyển tệp kê khai dự án truy vấn con v0.0.1 sang v0.2.0
  publish   Tải dự án SubQuery này lên IPFS
  validate  Kiểm tra một thư mục hoặc github repo là một dự án subquery xác thực
```

### build

Lệnh này sử dụng webpack để tạo một gói dự án subquery.

| Các Tùy chọn       | Mô tả                                                                                                      |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| -l, --location     | thư mục cục bộ của dự án subquery (nếu chưa có trong thư mục)                                              |
| -o, --output       | chỉ định thư mục đầu ra của bản dựng, ví dụ: build-folder                                                  |
| --mode=(production | prod                                                        | development | dev) | [ default: production ] |

- Với `subql build`, bạn có thể chỉ định các điểm nhập bổ sung trong trường export mặc dù nó sẽ luôn tạo `index.ts` tự động

- Bạn cần có @subql/cli v0.19.0 trở lên để sử dụng trường exports.

- Mọi trường `exports` phải ánh xạ tới kiểu chuỗi (ví dụ: `"entry": "./src/file.ts"`), nếu không, nó sẽ bị bỏ qua khỏi bản dựng.

[Ví dụ khác](https://doc.subquery.network/create/introduction/#build).

## subql-node

### --help

Lệnh này chỉ ra các trợ giúp tuỳ chọn.

```shell
> subql-node --help
Options:
      --help                Hiển thị trợ giúp                          [boolean]
      --version             Hiển thị số phiên bản                      [boolean]
  -f, --subquery            Đường dẫn cục bộ của dự án subquery         [string]
      --subquery-name       Tên của dự án subquery     [không dùng nữa] [string]
  -c, --config              Chỉ định tệp cấu hình                       [string]
      --local               Sử dụng chế độ cục bộ [không dùng nữa]     [boolean]
      --force-clean         Buộc dọn dẹp cơ sở dữ liệu, loại bỏ các lược đồ dự 
                            án và bảng                                 [boolean]
      --db-schema           Tên giản đồ Db của dự án                    [string]
      --unsafe              Cho phép sử dụng bất kỳ mô-đun tích hợp nào trong
                            sandbox                     boolean][default: false]
      --batch-size          Kích thước hàng loạt của các khối để tìm nạp trong 
                            một vòng                                    [number]
      --scale-batch-size    chia tỷ lệ kích thước lô dựa trên việc sử dụng bộ nhớ
                                                      [boolean] [default: false]
      --timeout             Hết thời gian chờ để sandbox của trình lập chỉ mục
                            thực hiện ánh xạ chức năng                  [number]
      --debug               Hiển thị thông tin gỡ lỗi cho đầu ra bảng điều khiển.
                            will
                            forcefully set log level to debug
                                                      [boolean] [default: false]
      --profiler            Show profiler information to console output
                                                      [boolean] [default: false]
      --subscription        Bật theo dõi              [boolean] [default: false]                                                     
      --network-endpoint    Blockchain network endpoint to connect      [string]
      --output-fmt          Print log as json or plain text
                                           [string] [choices: "json", "colored"]
      --log-level           Specify log level to print. Bỏ qua khi --debug được
                            sử dụng
          [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                                       "silent"]
      --migrate             Di chuyển giản đồ db (chỉ dành cho bảng quản lý)
                                                      [boolean] [default: false]
      --timestamp-field     Bật/tắt create_at và updated_at trong lược đồ
                                                      [boolean] [default: false]
  -d, --network-dictionary  Chỉ định api từ điển cho mạng này           [string]
  -m, --mmr-path            Đường dẫn cục bộ của tệp merkle (.mmr)      [string]
      --proof-of-index      Bật/tắt bằng chứng chỉ mục
                                                      [boolean] [default: false]
  -p, --port                Cổng mà dịch vụ sẽ liên kết với             [number]
```

### --version

Lệnh này sẽ hiển thị phiên bản hiện tại.

```shell
> subql-node --version
0.19.1
```

### -f, --subquery

Sử dụng cờ này để bắt đầu dự án SubQuery.

```shell
subql-node -f . // Hoặc
subql-node --subquery .
```

### --subquery-name (không được dùng nữa)

Cờ này cho phép bạn cung cấp tên cho dự án của mình, tên này hoạt động như thể nó tạo ra một phiên bản của dự án của bạn. Sau khi cung cấp một tên mới, một lược đồ cơ sở dữ liệu mới được tạo và đồng bộ hóa khối bắt đầu từ số 0. Không được chấp nhận vì `--db-schema`

```shell
subql-node -f . --subquery-name=test2
```

### -c, --config

Tất cả các cấu hình khác nhau này có thể được đặt vào tệp .yml hoặc .json và sau đó được tham chiếu với cờ cấu hình.

Tệp mẫu subquery_config.yml:

```shell
subquery: . // Bắt buộc. Đây là đường dẫn cục bộ của dự án. Dấu chấm ở đây có nghĩa là thư mục cục bộ hiện tại.
subqueryName: hello // Tên tùy chọn
batchSize: 55 // Cấu hình tùy chọn
```

Đặt tệp này trong cùng thư mục với dự án. Sau đó, trong thư mục dự án hiện tại, hãy chạy:

```shell
> subql-node -c ./subquery_config.yml
```

### --local (không được dùng nữa)

Cờ này chủ yếu được sử dụng cho mục đích gỡ lỗi trong đó nó tạo bảng starter_entity mặc định trong lược đồ "postgres" mặc định.

```shell
subql-node -f . --local
```

Lưu ý rằng một khi bạn sử dụng cờ này, việc loại bỏ nó sẽ không có nghĩa là nó sẽ trỏ đến một cơ sở dữ liệu khác. Để đặt lại cơ sở dữ liệu khác, bạn sẽ phải tạo một cơ sở dữ liệu MỚI và thay đổi cài đặt env cho cơ sở dữ liệu mới này. Nói cách khác, "export DB_DATABASE =<new_db_here>"

### --force-clean

Cờ này buộc các lược đồ và bảng của dự án phải được tạo lại, hữu ích để sử dụng khi phát triển lặp đi lặp lại các lược đồ graphql sao cho các lần chạy mới của dự án luôn hoạt động ở trạng thái sạch. Lưu ý rằng cờ này cũng sẽ xóa tất cả dữ liệu được lập chỉ mục.

### --db-schema

Cờ này cho phép bạn cung cấp tên cho lược đồ cơ sở dữ liệu dự án. Sau khi cung cấp một tên mới, một lược đồ cơ sở dữ liệu mới được tạo với tên được cấu hình và bắt đầu lập chỉ mục khối.

```shell
subql-node -f . --db-schema=test2
```

### --subscription
Cờ này sẽ tạo ra một trình kích hoạt thông báo trên thực thể, đây cũng là điều kiện tiên quyết để bật tính năng theo dõi trong dịch vụ truy vấn.

### --unsafe

Các dự án SubQuery thường được chạy trong javascript sandbox để bảo mật nhằm giới hạn phạm vi truy cập mà dự án có đối với hệ thống của bạn. Sandbox giới hạn các lần nhập javascript có sẵn cho các mô-đun sau:

```javascript
["assert", "buffer", "crypto", "util", "path"];
```

Mặc dù điều này tăng cường bảo mật, chúng tôi hiểu rằng điều này hạn chế chức năng có sẵn của SubQuery của bạn. Lệnh `--unsafe` nhập tất cả các mô-đun javascript mặc định, điều này làm tăng đáng kể chức năng của sandbox với sự đánh đổi của việc giảm bảo mật.

**Lưu ý rằng lệnh `--unsafe` sẽ ngăn dự án của bạn được chạy trong SubQuery Network, và bạn phải liên hệ với bộ phận hỗ trợ nếu bạn muốn lệnh này được chạy với dự án của mình trong dịch vụ được quản lý của SubQuery ([project.subquery.network](https://project.subquery.network))**

### --batch-size

Cờ này cho phép bạn đặt kích thước lô trong dòng lệnh. Nếu kích thước lô cũng được đặt trong tệp cấu hình, nó sẽ được ưu tiên.

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

### --scale-batch-size

Chia tỷ lệ kích thước lô tìm nạp khối với mức sử dụng bộ nhớ

### --timeout

Đặt thời gian chờ tùy chỉnh cho sandbox javascript để thực hiện các chức năng lập ánh xạ trên một khối trước khi hàm ánh xạ khối xuất lỗi ngoại lệ thời gian chờ

### --debug

Thông tin lỗi sẽ được xuất ra bảng điều khiển và cài đặt cấp độ nhật ký để gỡ lỗi nhanh chóng.

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### --profiler

Hiển thị thông tin hồ sơ.

```shell
subql-node -f . --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### --network-endpoint

Cờ này cho phép người dùng ghi đè cấu hình điểm cuối mạng từ tệp kê khai.

```shell
subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"
```

Lưu ý rằng đoạn này cũng phải được đặt trong tệp kê khai, nếu không bạn sẽ nhận được:

```shell
ERROR Create Subquery project from given path failed! Error: failed to parse project.yaml.
An instance of ProjectManifestImpl has failed the validation:
 - property network has failed the following constraints: isObject
 - property network.network has failed the following constraints: nestedValidation
```

### --output-fmt

Có hai định dạng đầu ra khác nhau. JSON hoặc colored. Colored là mặc định và chứa văn bản được bôi màu.

```shell
> subql-node -f . --output-fmt=json
{"level":"info","timestamp":"2021-08-10T11:58:18.087Z","pid":24714,"hostname":"P.local","category":"fetch","message":"fetch block [10501,10600], total 100 blocks"}
```

```shell
> subql-node -f . --output-fmt=colored
2021-08-10T11:57:41.480Z <subql-node> INFO node started
(node:24707) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
2021-08-10T11:57:48.981Z <fetch> INFO fetch block [10201,10300], total 100 blocks
2021-08-10T11:57:51.862Z <fetch> INFO fetch block [10301,10400], total 100 blocks
```

### --log-level

Có 7 tùy chọn để lựa chọn. “fatal”, “error”, “warn”, “info”, “debug”, “trace”, “silent”. Ví dụ bên dưới hiển thị tùy chọn "silent". Không có gì sẽ được in trong thiết bị đầu cuối vì vậy cách duy nhất để biết nút có hoạt động hay không là truy vấn cơ sở dữ liệu về số hàng (select count(\*) from subquery_1.starter_entities) hoặc truy vấn chiều cao khối.

```shell
> subql-node -f . --log-level=silent
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(Use `node --trace-warnings ...` to show where the warning was created)
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [DEP0152] DeprecationWarning: Custom PerformanceEntry accessors are deprecated. Please use the detail property.
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
```

<!-- ### --migrate TBA -->

### --timestamp-field

Mặc định là true. khi được đặt thành false với:

```shell
> subql-node -f . –timestamp-field=false
```

Thao tác này sẽ xóa các cột created_at và updated_at trong bảng starter_entities.

### -d, --network-dictionary

Cờ này cho phép bạn chỉ định một điểm cuối từ điển và nó là một dịch vụ miễn phí được cung cấp và lưu trữ tại: [https://explorer.subquery.network/](https://explorer.subquery.network/) (tìm kiếm từ điển) và giới thiệu điểm cuối API của: https://api.subquery.network/sq/subquery/dictionary-polkadot

Thông thường, nó sẽ được đặt trong tệp manifest của bạn nhưng bên dưới cho thấy một ví dụ về việc sử dụng nó làm đối số trong dòng lệnh.

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

[Đọc thêm về cách hoạt động của Từ điển SubQuery](../academy/tutorials_examples/dictionary.md).

### -p, --port

Cổng liên kết dịch vụ lập chỉ mục subquery. Mặc định nó được đặt là `3000`

### --disable-historical

Disables automated historical state tracking, [see Historic State Tracking](./historical.md). By default this is set to `false`.

## subql-query

### --help

Lệnh này chỉ ra các trợ giúp tuỳ chọn.

```shell
Tùy chọn:
      --help        Hiển thị trợ giúp                                  [boolean]
      --version     Hiển thị số phiên bản                              [boolean]
  -n, --name        Tên dự án                                [string] [required]
      --playground  Bật sân chơi graphql                               [boolean]
      --subscription  Bật theo dõi                    [boolean] [default: false]   
      --output-fmt  In nhật ký dưới dạng json hoặc văn bản thuần túy
                      [string] [choices: "json", "colored"] [default: "colored"]
      --log-level   Chỉ định cấp độ nhật ký để in.
            [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                     "silent"] [default: "info"]
      --log-path    Đường dẫn để tạo tệp nhật ký, ví dụ: ./src/name.log [string]
      --log-rotate  Xoay vòng các tệp nhật ký trong thư mục được chỉ định bởi 
                    đường dẫn nhật ký                 [boolean] [default: false]
      --indexer     Url cho phép truy vấn truy cập siêu dữ liệu của trình 
                    lập chỉ mục                                         [string]
      --unsafe      Vô hiệu hóa các giới hạn về độ sâu truy vấn và số lượng 
                    bản ghi truy vấn được trả lại cho phép             [boolean]
  -p, --port        Cổng mà dịch vụ sẽ liên kết với                     [number]
```

### --version

Lệnh này sẽ hiển thị phiên bản hiện tại.

```shell
> subql-node --version
0.7.0
```

### -n, --name

Cờ này được sử dụng để bắt đầu dịch vụ truy vấn. Nếu cờ --subquery-name không được cung cấp khi chạy trình lập chỉ mục, thì tên ở đây sẽ tham chiếu đến tên dự án mặc định. Nếu --subquery-name được đặt, thì tên ở đây phải khớp với tên đã được đặt.

```shell
> subql-node -f . // --subquery-name chưa được đặt

> subql-query -n subql-helloworld  --playground // tên mặc định cho tên thư mục dự án
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground  // tên chỉ đến dự án subql-helloworld nhưng với tên của hiworld
```

### --playground

Cờ này cho phép sân chơi graphql hoạt động, vì vậy nó luôn được thêm vào theo mặc định để sử dụng.

### --output-fmt

See [--output-fmt](https://doc.subquery.network/run_publish/references.html#output-fmt)

### --log-level

See [--log-level](https://doc.subquery.network/run_publish/references.html#log-level)

### --log-path

Cho phép ghi tệp nhật ký bằng cách cung cấp đường dẫn đến tệp để ghi nhật ký

### --log-rotate

Cho phép luân phiên tệp nhật ký với tùy chọn khoảng thời gian luân phiên là 1 ngày, tối đa là 7 tệp và với kích thước tệp tối đa là 1GB

### --indexer

Đặt url tùy chỉnh cho vị trí của các điểm cuối của trình lập chỉ mục, dịch vụ truy vấn sử dụng các điểm cuối này cho tình trạng của trình lập chỉ mục, siêu dữ liệu và trạng thái sẵn sàng

### --subscription

This flag enables [GraphQL Subscriptions](./subscription.md), to enable this feature requires `subql-node` also enable `--subscription`

### --unsafe

Dịch vụ truy vấn có giới hạn 100 thực thể cho các truy vấn graphql không giới hạn. Cờ unsafe loại bỏ giới hạn này có thể gây ra các vấn đề về hiệu suất trên dịch vụ truy vấn. Thay vào đó, các truy vấn nên được [phân trang](https://graphql.org/learn/pagination/).

This flag enables certain aggregation functions including sum, max, avg and others. Read more about this feature [here](./aggregate.md)

Các tùy chọn này mặc định bị tắt do giới hạn đối tượng.

**Lưu ý rằng lệnh `--unsafe` sẽ ngăn dự án của bạn được chạy trong mạng SubQuery, và bạn sẽ phải liên hệ với bộ phận hỗ trợ trong dịch vụ quản lý SubQuery nếu bạn muốn lệnh này có thể chạy trên dự án của bạn [project.subquery.network](https://project.subquery.network).**

### --port

Cổng liên kết dịch vụ truy vấn subquery. Mặc định nó được đặt là `3000`
