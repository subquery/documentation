# Hướng dẫn & Ví dụ

In the [quick start](/quickstart/quickstart.md) guide, we very quickly ran through an example to give you a taste of what SubQuery is and how it works. Here we'll take a closer look at the workflow when creating your project and the key files you'll be working with.

## Ví dụ SubQuery

Some of the following examples will assume you have successfully initialized the starter package in the [Quick start](../quickstart/quickstart.md) section. From that starter package, we'll walk through the standard process to customise and implement your SubQuery project.

1. Initialise your project using `subql init --specVersion 0.2.0 PROJECT_NAME`. alternatively you can use the old spec version `subql init PROJECT_NAME`
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

This will create a new directory (or update the existing) `src/types` which contain generated entity classes for each type you have defined previously in `schema.graphql`. These classes provide type-safe entity loading, read and write access to entity fields - see more about this process in [the GraphQL Schema](./graphql.md).

## Xây dựng

Để chạy Dự án SubQuery của bạn trên một Node SubQuery được lưu trữ cục bộ, trước tiên bạn cần xây dựng công việc của mình.

Chạy lệnh xây dựng từ thư mục gốc của dự án.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

## Logging

The `console.log` method is **no longer supported**. Instead, a `logger` module has been injected in the types, which means we can support a logger that can accept various logging levels.

```typescript
logger.info('Info level message');
logger.debug('Debugger level message');
logger.warn('Warning level message');
```

Để sử dụng `logger.info` hoặc `logger.warn`, chỉ cần đặt dòng vào tệp ánh xạ của bạn.

![logging.info](/assets/img/logging_info.png)

To use `logger.debug`, an additional step is required. Add `--log-level=debug` to your command line.

Nếu bạn đang chạy vùng chứa docker, hãy thêm dòng này vào tệp `docker-comp.yaml` của bạn.

![logging.debug](/assets/img/logging_debug.png)

Bây giờ bạn sẽ thấy đăng nhập mới trong màn hình đầu cuối.

![logging.debug](/assets/img/subquery_logging.png)
