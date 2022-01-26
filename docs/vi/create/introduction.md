# Hướng dẫn & Ví dụ

Trong hướng dẫn [ bắt đầu nhanh ](/quickstart/quickstart.md), chúng tôi đã nhanh chóng đưa ra một ví dụ để bạn hiểu SubQuery là gì và nó hoạt động như thế nào. Ở đây chúng ta sẽ xem xét kỹ hơn quy trình làm việc khi tạo dự án của bạn và các tập tin chính mà bạn sẽ làm việc.

## Ví dụ SubQuery

Một vài ví dụ sau sẽ xem như bạn đã khởi tạo thành công gói khởi động trong phần [ Bắt đầu nhanh ](../quickstart/quickstart.md). Từ gói khởi động đó, chúng tôi sẽ hướng dẫn quy trình chuẩn để tùy chỉnh và triển khai dự án SubQuery của bạn.

1. Khởi tạo dự án của bạn bằng `subql init PROJECT_NAME`.
2. Cập nhật tệp kê khai (`project.yaml`) để bao gồm thông tin về chuỗi khối của bạn và các thực thể mà bạn sẽ ánh xạ - xem [Manifest File](./manifest.md)
3. Tạo các thực thể GraphQL trong lược đồ của bạn (`schema.graphql`) xác định hình dạng của dữ liệu mà bạn sẽ trích xuất và duy trì để truy vấn - xem [Lược đồ GraphQL](./graphql.md)
4. Thêm tất cả các hàm ánh xạ (ví dụ: `mappingHandlers.ts`) mà bạn muốn gọi để chuyển đổi dữ liệu chuỗi thành các thực thể GraphQL mà bạn đã xác định - xem [Ánh xạ](./mapping.md)
5. Tạo, xây dựng và xuất code của bạn lên Dự án SubQuery (hoặc chạy trong node cục bộ của riêng bạn) - xem [Chạy và truy vấn Dự án dành cho người mới bắt đầu của bạn](./quickstart.md#running-and-querying-your-starter-project) trong hướng dẫn bắt đầu nhanh của chúng tôi.

## Cấu trúc thư mục

Bản đồ sau cung cấp tổng quan về cấu trúc thư mục của một dự án SubQuery khi lệnh `init` được chạy.

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

Bất cứ khi nào bạn thay đổi các thực thể GraphQL của mình, bạn phải tạo lại thư mục loại của mình bằng lệnh sau.

```
yarn codegen
```

Thao tác này sẽ tạo một thư mục mới (hoặc cập nhật hiện có) `src/styles` nơi chứa các lớp thực thể được tạo cho mỗi loại mà bạn đã xác định trước đó trong `schema.graphql`. Các lớp này cung cấp quyền truy cập tải, đọc và ghi thực thể an toàn về kiểu đối với các trường thực thể - xem thêm về quy trình này trong [Lược đồ GraphQL](./graphql.md).

## Xây dựng

Để chạy Dự án SubQuery của bạn trên một Node SubQuery được lưu trữ cục bộ, trước tiên bạn cần xây dựng công việc của mình.

Chạy lệnh xây dựng từ thư mục gốc của dự án.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

### Alternative build options

We support additional build options for subquery projects using `subql build`.

With this you can define additional entry points to build using the exports field in package.json.

```json
"name": "project-name",
"version": "1.0.0",
...
"exports": {
  "entry_one": "./src/entry_one.ts",
  "entry_renamed": "./src/entry_two.ts"
},
```

Then by running `subql build` it will generate a dist folder with the following structure:

```
- project-name
  L dist
    L entry_one.js
    L entry_renamed.js
    L index.js 
```

Note that it will build `index.ts` whether or not it is specified in the exports field.

For more information on using this including flags, see [cli reference](https://doc.subquery.network/references/references/#build).

## Logging

The `console.log` method is **no longer supported**. Instead, a `logger` module has been injected in the types, which means we can support a logger that can accept various logging levels.

```typescript
logger.info('Info level message');
logger.debug('Debugger level message');
logger.warn('Warning level message');
```

To use `logger.info` or `logger.warn`, just place the line into your mapping file.

![logging.info](/assets/img/logging_info.png)

To use `logger.debug`, an additional flag is required. Add `--log-level=debug` to your command line.

If you are running a docker container, add this line to your `docker-compose.yaml` file.

![logging.debug](/assets/img/logging_debug.png)

You should now see the new logging in the terminal screen.

![logging.debug](/assets/img/subquery_logging.png)
