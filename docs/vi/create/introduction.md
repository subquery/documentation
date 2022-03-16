# Cách tạo một project sử dụng SubQuery:

Trong hướng dẫn [ bắt đầu nhanh ](/quickstart/quickstart.md), chúng tôi đã đưa ra một ví dụ ngắn gọn để bạn hiểu SubQuery là gì và nó hoạt động như thế nào. Ở đây chúng ta sẽ xem xét kỹ hơn quy trình làm việc để tạo ra một dự án và các tập tin chính mà bạn sẽ sử dụng.

## Quy trình làm việc cơ bản:

Một vài ví dụ sau có điều kiện tiên quyết là bạn đã khởi động thành công gói khởi động trong phần [ Bắt đầu nhanh ](../quickstart/quickstart.md). Từ gói khởi động đó, chúng tôi sẽ hướng dẫn quy trình chuẩn để tùy chỉnh và triển khai dự án SubQuery của bạn.

1. Khởi tạo dự án của bạn bằng `subql init PROJECT_NAME`.
2. Cập nhật tệp kê khai (`project.yaml`) để đưa vào thông tin về blockchain của bạn và các thực thể mà bạn sẽ ánh xạ - xem [Manifest File](./manifest.md)
3. Tạo các thực thể GraphQL trong lược đồ của bạn (`schema.graphql`) nhằm định nghĩa dạng của dữ liệu mà bạn sẽ trích xuất và duy trì để truy vấn - xem [Lược đồ GraphQL](./graphql.md)
4. Thêm tất cả các hàm ánh xạ (ví dụ: `mappingHandlers.ts`) mà bạn muốn gọi để chuyển đổi dữ liệu chuỗi thành các thực thể GraphQL mà bạn đã xác định - xem [Ánh xạ](./mapping.md)
5. Tạo, xây dựng và xuất bản code của bạn lên các dự án SubQuery (hoặc chạy trong node cục bộ của riêng bạn) - xem [Hướng dẫn chạy và truy vấn Dự án bắt đầu của bạn](./quickstart.md#running-and-querying-your-starter-project) trong hướng dẫn bắt đầu nhanh của chúng tôi.

## Cấu trúc thư mục

Bản đồ sau cung cấp một cái nhìn tổng quan về cấu trúc thư mục của một dự án SubQuery khi lệnh `init` được chạy.

```
- project-name
  L package.json
  L project.yaml
  L README.md
  L schema.graphql
  L tsconfig.json
  L docker-compose.yml
  L src
    L index.ts
    L mappings
      L mappingHandlers.ts
  L .gitignore
```

Ví dụ:

![Cấu trúc thư mục SubQuery](/assets/img/subQuery_directory_stucture.png)

## Tạo mã

Bất cứ khi nào bạn thay đổi các thực thể GraphQL của mình, bạn phải tạo lại thư mục types của mình bằng lệnh sau.

```
yarn codegen
```

Thao tác này sẽ tạo một thư mục mới (hoặc cập nhật thư mục hiện có) `src/styles` là nơi chứa các lớp thực thể được tạo cho mỗi loại mà bạn đã định nghĩa trước đó trong `schema.graphql`. Các lớp này cung cấp quyền truy cập tải, đọc và ghi thực thể an toàn về kiểu đối với các trường thực thể - xem thêm về quy trình này trong [Lược đồ GraphQL](./graphql.md).

## Xây dựng

Để chạy Dự án SubQuery của bạn trên một Node SubQuery được lưu trữ cục bộ, trước tiên bạn cần tự xây dựng dự án của riêng bạn.

Chạy lệnh xây dựng từ thư mục gốc của dự án.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

### Tùy chọn xây dựng thay thế

Chúng tôi hỗ trợ xây dựng các tùy chọn bổ sung cho các dự án Subquery bằng cách sử dụng `subql build`.

Với công cụ này, bạn có thể xác định các điểm vào để xây dựng các tùy chọn bổ sung bằng cách sử dụng trường exports trong package.json.

```json
"name": "project-name",
"version": "1.0.0",
...
"exports": {
  "entry_one": "./src/entry_one.ts",
  "entry_renamed": "./src/entry_two.ts"
},
```

Sau đó, bằng cách chạy `subql build` một thư mục dist sẽ được tạo ra với cấu trúc như sau:

```
- project-name
  L dist
    L entry_one.js
    L entry_renamed.js
    L index.js 
```

Lưu ý rằng `subql build` sẽ xây dựng <0>index.ts</0> cho dù nó có được chỉ định trong trường exports hay không.

Để biết thêm thông tin về cách sử dụng công cụ này (bao gồm cả flags), xem [cli reference](https://doc.subquery.network/references/references/#build).

## Sử dụng nhật ký

Phương thức `console.log` **không còn được hỗ trợ**. Thay vào đó, mô-đun `logger` đã được đưa vào các kiểu dữ liệu, có nghĩa là chúng tôi có thể hỗ trợ trình ghi nhật ký có thể chấp nhận các cấp độ ghi nhật ký khác nhau.

```typescript
logger.info('Info level message');
logger.debug('Debugger level message');
logger.warn('Warning level message');
```

Để sử dụng `logger.info` hoặc `logger.warn`, chỉ cần đặt dòng lệnh cần sử dụng vào file ánh xạ của bạn.

![logging.info](/assets/img/logging_info.png)

Để sử dụng `logger.debug`, cần thực hiện thêm một bước. Thêm `--log-level=debug` vào dòng lệnh của bạn.

Nếu bạn đang chạy docker container, hãy thêm dòng này vào tệp `docker-comp.yaml` của bạn.

![logging.debug](/assets/img/logging_debug.png)

Bây giờ bạn sẽ thấy nhật ký mới trong màn hình đầu cuối.

![logging.debug](/assets/img/subquery_logging.png)
