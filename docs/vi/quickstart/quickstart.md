# 1. Tạo một Dự án Mới

Mục tiêu của hướng dẫn nhanh này là cung cấp cho bạn thiết lập phát triển hoàn chỉnh và hướng dẫn các bước để tạo dự án blockchain SubQuery đầu tiên của bạn. Nó được nhắm mục tiêu đến các nhà phát triển có kinh nghiệm và cho cả những người mới bắt đầu hành trình blockchain của họ.

Hướng dẫn nhanh này sẽ mất khoảng 10-15 phút.

Sau khi hoàn thành hướng dẫn nhanh này, bạn sẽ có một dự án SubQuery hoạt động sẽ chạy trên một nút SubQuery. Bạn sẽ có thể điều chỉnh dự án khởi đầu và chuyển chỉ mục tới mạng blockchain yêu thích của bạn như Polkadot, Avalanche, Cosmos, v. v.

Hãy bắt đầu quá trình tạo ra dự án blockchain SubQuery đầu tiên của bạn.

## Điều kiện tiên quyết

Trước khi bạn bắt đầu tạo dự án blockchain đầu tiên với SubQuery, hãy đảm bảo rằng bạn đã cài đặt các ứng dụng phần mềm hỗ trợ cần thiết. Đó là:

- [Node](https://nodejs.org/en/): Cài đặt một phiên bản mới nhất của Node (ví dụ: phiên bản LTS).
- [Docker](https://docker.com/): Hướng dẫn này sẽ yêu cầu sử dụng Docker.

Bây giờ, bạn đã sẵn sàng để bắt đầu với bước đầu tiên, đó là cài đặt SubQuery CLI.

## 1. Cài đặt CLI SubQuery

Cài đặt SubQuery CLI tổng thể trên terminal của bạn bằng cách sử dụng NPM:

```shell
# NPM
npm install -g @subql/cli
```

::: Nguy hiểm Chúng tôi **KHÔNG** khuyến khích sử dụng `yarn global` để cài đặt `@subql/cli` do quản lý phụ thuộc kém. Nó có thể dẫn đến nhiều lỗi. :::

Hãy xem tất cả các lệnh có sẵn và việc sử dụng chúng. Chạy lệnh dưới đây trong CLI:

```shell
subql help
```

## 2. Khởi tạo Dự án khởi đầu SubQuery

Chạy lệnh sau bên trong thư mục bạn muốn tạo dự án SubQuery:

```shell
subql init
```

Bạn sẽ được hỏi một số câu hỏi nhất định khi tiếp tục:

- **Project name**: Tên dự án SubQuery của bạn.
- **Network family**: Nhóm mạng blockchain layer-1 mà dự án SubQuery này sẽ lập chỉ mục. Sử dụng các phím mũi tên để chọn từ các tùy chọn có sẵn. Ví dụ: Polkadot, Avalanche, Cosmos, hoặc bất kỳ mạng được hỗ trợ nào khác.
- **Network**: Mạng cụ thể mà dự án SubQuery này sẽ lập chỉ mục. Sử dụng các phím mũi tên để chọn từ các tùy chọn có sẵn. Ví dụ: Polkadot, Avalanche, hoặc bất kỳ mạng được hỗ trợ nào khác.
- **Template project**: Chọn một dự án mẫu SubQuery sẽ cung cấp một điểm khởi đầu để bắt đầu phát triển. Chúng tôi khuyên bạn nên chọn dự án _"subql-starter"_.
- **RPC endpoint**: Provide an HTTP or websocket URL to a running RPC endpoint, which will be used by default for this project. Bạn có thể nhanh chóng truy cập các điểm cuối công khai cho các mạng khác nhau, tạo node chuyên dụng riêng của mình bằng cách sử dụng [OnFinality](https://app.onfinality.io) hoặc chỉ sử dụng điểm cuối mặc định. This RPC node must have the entire state of the data that you wish to index, so we recommend an archive node. Chúng tôi sẽ sử dụng giá trị mặc định cho hướng dẫn này. Dựa trên mạng bạn đã chọn, giá trị mặc định có thể là:
  - For Polkadot - _"wss://polkadot.api.onfinality.io/public-ws"_,
  - For Avalanche - _"https://avalanche.api.onfinality.io/public/ext/bc/C/rpc"_,
  - For Ethereum - _“https://eth.api.onfinality.io/public”_ and likewise for other networks.
- **Git repository**: Cung cấp Git URL cho repo mà dự án SubQuery này sẽ được lưu trữ (khi được lưu trữ trong SubQuery Explorer) hoặc chấp nhận giá trị mặc định được cung cấp.
- **Authors**: Nhập chủ sở hữu của dự án SubQuery này tại đây (ví dụ: tên của bạn!) Hoặc chấp nhận giá trị mặc định đã cung cấp.
- **Description**: Cung cấp một đoạn giới thiệu ngắn về dự án của bạn, mô tả dự án chứa dữ liệu gì và người dùng có thể làm gì với dự án đó hoặc chấp nhận giá trị mặc định đã cung cấp.
- **Version**: Nhập số phiên bản tùy chỉnh hoặc sử dụng mặc định (`1.0.0`).
- **License**: Cung cấp giấy phép phần mềm cho dự án này hoặc chấp nhận giấy phép mặc định (`MIT`).

Hãy xem xét ví dụ sau đây:

```shell
$ subql init
Project name [subql-starter]: HelloWorld
? Select a network family Substrate
? Select a network Polkadot
? Select a template project subql-starter     Starter project for subquery
RPC endpoint: [wss://polkadot.api.onfinality.io/public-ws]:
Git repository [https://github.com/subquery/subql-starter]:
Fetching network genesis hash... done
Author [Ian He & Jay Ji]: Sean
Description [This project can be used as a starting po...]:
Version [1.0.0]:
License [MIT]:
Preparing project... done
HelloWorld is ready
```

Sau khi quá trình khởi tạo hoàn tất, bạn sẽ thấy một thư mục có tên dự án của bạn đã được tạo bên trong thư mục. Xin lưu ý rằng nội dung của thư mục này phải giống hệt với nội dung được liệt kê trong [Cấu trúc thư mục](../build/introduction.md#directory-structure).

Cuối cùng, chạy lệnh sau để cài đặt các phụ thuộc từ bên trong thư mục của dự án mới.

::: code-tabs @tab:active yarn

```shell
cd PROJECT_NAME
yarn install
```

@tab npm

```shell
cd PROJECT_NAME
npm install
```

:::

You have now initialised your first SubQuery project with just a few simple steps. Let’s now customise the standard template project for a specific blockchain of interest.

You may want to refer to the [command line arguments](../run_publish/references.md) used in SubQuery. It will help you understand the commands better.

## 3. Make Changes to Your Project

There are 3 important files that need to be modified. Đó là:

1. The GraphQL Schema in `schema.graphql`.
2. Tệp Kê khai dự án trong `project.yaml`.
3. Các hàm ánh xạ trong thư mục `src/mappings/`.

SubQuery hỗ trợ các mạng blockchain khác nhau và cung cấp hướng dẫn riêng cho từng mạng. Chọn blockchain ưa thích của bạn tối đa là 2. Chuỗi cụ thể và tiếp tục hướng dẫn bắt đầu nhanh.
