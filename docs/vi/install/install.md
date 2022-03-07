# Cài đặt SubQuery

Có nhiều thành phần cần thiết khi bạn muốn tạo một dự án sử dụng SubQuery: [@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) được sử dụng để xây dựng dự án bằng SubQuery. Thành phần [@subql/node](https://github.com/subquery/subql/tree/docs-new-section/packages/node) là bắt buộc để chạy trình chỉ mục. Thư viện [@subql/query](https://github.com/subquery/subql/tree/docs-new-section/packages/query) là bắt buộc để tạo các truy vấn.

## Cài đặt @subql/cli

[@subql/cli](https://github.com/subquery/subql/tree/docs-new-section/packages/cli) giúp tạo nên khung dự án(project framework), nghĩa là bạn không phải bắt đầu từ đầu, giúp tiết kiệm thời gian.

Cài đặt SubQuery CLI trên toàn cầu trên thiết bị đầu cuối (terminal) của bạn bằng cách sử dụng Yarn hoặc NPM:

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/cli ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/cli ``` </CodeGroupItem> </CodeGroup>

Sau đó, bạn có thể chạy help để xem các lệnh có sẵn và cách sử dụng do CLI cung cấp:

```shell
subql help
```
## Cài đặt @subql/node

Node SubQuery là một phương thức để trích xuất dữ liệu Blockchain trên nền tảng Substrate cho mỗi dự án sử dụng SubQuery và lưu nó vào cơ sở dữ liệu Postgres.

Cài đặt nút SubQuery trên toàn cầu trên thiết bị đầu cuối của bạn bằng cách sử dụng Yarn hoặc NPM:

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/node ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/node ``` </CodeGroupItem> </CodeGroup>

Sau khi cài đặt, bạn có thể bắt đầu một node với:

```shell
subql-node <command>
```
> Lưu ý: Nếu bạn đang sử dụng Docker hoặc lưu trữ dự án của mình trên SubQuery Projects, bạn có thể bỏ qua bước này. Bởi vì SubQuery Node đã được cung cấp trong Docker Container và cơ sở hạ tầng lưu trữ.

## Cài đặt @subql/query

Thư viện truy vấn SubQuery cung cấp dịch vụ cho phép bạn truy vấn dự án của mình trong môi trường "sân chơi" thông qua trình duyệt của bạn.

Cài đặt truy vấn SubQuery trên toàn cầu trên thiết bị đầu cuối của bạn bằng cách sử dụng Yarn hoặc NPM:

<CodeGroup> <CodeGroupItem title="NPM"> ```bash npm install -g @subql/query ``` </CodeGroupItem>
<CodeGroupItem title="YARN" active> ```shell yarn global add @subql/query ``` </CodeGroupItem> </CodeGroup>

> Lưu ý: Nếu bạn đang sử dụng Docker hoặc lưu trữ dự án của mình trên SubQuery Projects, bạn cũng có thể bỏ qua bước này. Bởi vì SubQuery Node đã được cung cấp trong Docker Container và cơ sở hạ tầng lưu trữ. 