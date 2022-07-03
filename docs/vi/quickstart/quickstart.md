# 1. Tạo một Dự án Mới

Mục tiêu của hướng dẫn nhanh này là cung cấp cho bạn thiết lập phát triển hoàn chỉnh và hướng dẫn các bước để tạo dự án blockchain SubQuery đầu tiên của bạn. Nó được nhắm mục tiêu đến các nhà phát triển có kinh nghiệm và cho cả những người mới bắt đầu hành trình blockchain của họ.

Hướng dẫn nhanh này sẽ mất khoảng 10-15 phút.

Sau khi hoàn thành hướng dẫn nhanh này, bạn sẽ có một dự án SubQuery hoạt động sẽ chạy trên một nút SubQuery. Bạn sẽ có thể điều chỉnh dự án khởi đầu và chuyển chỉ mục tới mạng blockchain yêu thích của bạn như Polkadot, Avalanch, Cosmos, v. v.

Hãy bắt đầu quá trình tạo ra dự án blockchain SubQuery đầu tiên của bạn.

## Điều kiện tiên quyết

Trước khi bạn bắt đầu tạo dự án blockchain đầu tiên với SubQuery, hãy đảm bảo rằng bạn đã cài đặt các ứng dụng phần mềm hỗ trợ cần thiết. Đó là:

- [Node](https://nodejs.org/en/): Cài đặt một phiên bản mới nhất của Node (ví dụ: phiên bản LTS).
- [Docker](https://docker.com/): Hướng dẫn này sẽ yêu cầu sử dụng Docker

Bây giờ, bạn đã sẵn sàng để bắt đầu với bước đầu tiên, đó là cài đặt SubQuery CLI.

## 1. Cài đặt CLI SubQuery

Cài đặt SubQuery CLI tổng thể trên terminal của bạn bằng cách sử dụng NPM:

```shell
# NPM
npm install -g @subql/cli
```

**Lưu ý**: Chúng tôi **KHÔNG** khuyến khích sử dụng `yarn global` để cài đặt `@subql/cli` do quản lý phụ thuộc kém. Nó có thể dẫn đến nhiều lỗi.

Hãy xem tất cả các lệnh có sẵn và việc sử dụng chúng. Chạy lệnh dưới đây trong CLI:

```shell
subql help
```

## 2. Khởi tạo Dự án khởi đầu SubQuery

Chạy lệnh sau bên trong thư mục bạn muốn tạo dự án SubQuery:

```shell
subql init
```

::: cảnh báo **Dành cho người dùng Cosmos**

Cosmos hiện chưa được hỗ trợ trong CLI của SubQuery (`subql`). Do đó, nếu bạn sử dụng Cosmos, bạn phải bắt đầu với một bản sao Juno hoặc fork [starter project](https://github.com/DeveloperInProgress/juno-subql-starter) này.

Để khởi tạo dự án của bạn với Cosmos, hãy tham khảo 4 bước được hiển thị trong [link.](https://github.com/subquery/juno-subql-starter#readme) này. Sau khi bạn hoàn thành 4 bước này, **nhảy** đến phần [Thực hiện các thay đổi trên Dự án của bạn](../quickstart/quickstart.html#_3-make-changes-to-your-project). :::

Bạn sẽ được hỏi một số câu hỏi nhất định khi tiếp tục:

- **Project name**: tên của dự án SubQuery
- **Network family**: Nhóm mạng blockchain layer-1 mà dự án SubQuery này sẽ lập chỉ mục. Sử dụng các phím mũi tên để chọn từ các tùy chọn có sẵn. Ví dụ: Polkadot, Avalanche, Cosmos, hoặc bất kỳ mạng được hỗ trợ nào khác.
- **Network**: Mạng cụ thể mà dự án SubQuery này sẽ lập chỉ mục. Sử dụng các phím mũi tên để chọn từ các tùy chọn có sẵn. Ví dụ: Polkadot, Avalanche, hoặc bất kỳ mạng được hỗ trợ nào khác.
- **Template project**: Chọn một dự án mẫu SubQuery sẽ cung cấp một điểm khởi đầu để bắt đầu phát triển. Chúng tôi khuyên bạn nên chọn dự án _"subql-starter"_.
- **RPC endpoint**: Cung cấp HTTPS URL cho RPC endpoint đang chạy, sẽ được sử dụng mặc định cho dự án này. Bạn có thể nhanh chóng truy cập các điểm cuối công khai cho các mạng khác nhau, tạo node chuyên dụng riêng của mình bằng cách sử dụng [OnFinality](https://app.onfinality.io) hoặc chỉ sử dụng điểm cuối mặc định. Nút RPC này phải là một nút lưu trữ (có trạng thái chuỗi đầy đủ). Chúng tôi sẽ sử dụng giá trị mặc định cho hướng dẫn này. Dựa trên mạng bạn đã chọn, giá trị mặc định có thể là:
  - Đối với Polkadot - _"https://polkadot.api.onfinality.io"_
  - Đối với Avalanche - _"https://avalanche.api.onfinality.io"_
  - Đối với Terra - _“https://terra-columbus-5.beta.api.onfinality.io”_ và tương tự với các mạng khác. <br/>
- **Git repository**: Cung cấp Git URL cho repo mà dự án SubQuery này sẽ được lưu trữ (khi được lưu trữ trong SubQuery Explorer) hoặc chấp nhận giá trị mặc định được cung cấp.
- **Authors**: Nhập chủ sở hữu của dự án SubQuery này tại đây (ví dụ: tên của bạn!) Hoặc chấp nhận giá trị mặc định đã cung cấp.
- **Description**: Cung cấp một đoạn giới thiệu ngắn về dự án của bạn, mô tả dự án chứa dữ liệu gì và người dùng có thể làm gì với dự án đó hoặc chấp nhận giá trị mặc định đã cung cấp.
- **Version**: Nhập số phiên bản tùy chỉnh hoặc sử dụng mặc định (`1.0.0`)
- **License**: Cung cấp giấy phép phần mềm cho dự án này hoặc chấp nhận giấy phép mặc định (`MIT`)

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

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

Bây giờ bạn đã khởi tạo dự án SubQuery đầu tiên của mình chỉ với một vài bước đơn giản. Bây giờ chúng ta hãy tùy chỉnh dự án mẫu chuẩn cho một chuỗi khối cụ thể mà bạn quan tâm.

Bạn có thể muốn tham khảo [đối số dòng lệnh](../run_publish/references.md) được sử dụng trong SubQuery. Nó sẽ giúp bạn hiểu rõ hơn về các lệnh.

## 3. Thực hiện các thay đổi trên Dự án của bạn

Có 3 tệp quan trọng cần được sửa đổi. Đó là:

1. Lược đồ GraphQL trong ` schema.graphql `
2. Tệp Kê khai dự án ở ` project.yaml `
3. Các chức năng ánh xạ trong thư mục `src/mappings/`

SubQuery hỗ trợ các mạng blockchain khác nhau và cung cấp cho bạn hướng dẫn riêng cho từng mạng.

Lựa chọn mạng ưa thích của bạn và tiếp tục để thực hiện các sửa đổi cần thiết và tiến gần hơn một chút để hoàn thành dự án đầu tiên của bạn:

**[Polkadot/Substrate](../quickstart/quickstart_chains/polkadot.md)**

**[Avalanche](../quickstart/quickstart_chains/avalanche.md)**

**[Cosmos](../quickstart/quickstart_chains/cosmos.md)**

**[Terra](../quickstart/quickstart_chains/terra.md)**
