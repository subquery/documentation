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

Cosmos hiện chưa được hỗ trợ trong CLI của SubQuery (`subql`). Hence, if you are using Cosmos, you must start with a Juno clone or fork this [starter project](https://github.com/DeveloperInProgress/juno-subql-starter).

To initialise your project with Cosmos, refer to these 4 steps shown in this [link.](https://github.com/subquery/juno-subql-starter#readme). Once you complete these 4 steps, **jump** to the [Make Changes to Your Project](../quickstart/quickstart.html#_3-make-changes-to-your-project) section. :::

You'll be asked certain questions as you proceed ahead:

- **Project name**: A project name for your SubQuery project
- **Network family**: The layer-1 blockchain network family that this SubQuery project will index. Sử dụng các phím mũi tên để chọn từ các tùy chọn có sẵn. For example, Polkadot, Avalanche, Cosmos, or any other supported network.
- **Network**: The specific network that this SubQuery project will index. Sử dụng các phím mũi tên để chọn từ các tùy chọn có sẵn. For example, Polkadot, Avalanche, or any other supported network.
- **Template project**: Select a SubQuery template project that will provide a starting point in the development. We suggest selecting the _"subql-starter"_ project.
- **RPC endpoint**: Provide an HTTPS URL to a running RPC endpoint, which will be used by default for this project. You can quickly access public endpoints for different networks, create your own private dedicated node using [OnFinality](https://app.onfinality.io), or just use the default endpoint. Nút RPC này phải là một nút lưu trữ (có trạng thái chuỗi đầy đủ). We will use the default value for this guide. Based on the network you have chosen, the default value may be:
  - For Polkadot - _"https://polkadot.api.onfinality.io"_ <br />
  - For Avalanche - _"https://avalanche.api.onfinality.io"_ <br />
  - For Terra - _“https://terra-columbus-5.beta.api.onfinality.io”_ and likewise for other networks. <br/>
- **Git repository**: Provide a Git URL to a repo that this SubQuery project will be hosted in (when hosted in SubQuery Explorer) or accept the provided default.
- **Authors**: Enter the owner of this SubQuery project here (e.g. your name!) or accept the provided default.
- **Description**: Provide a short paragraph about your project that describes what data it contains and what users can do with it, or accept the provided default.
- **Version**: Enter a custom version number or use the default (`1.0.0`)
- **License**: Provide the software license for this project or accept the default (`MIT`)

Let’s look at an example:

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

After you complete the initialisation process, you will see a folder with your project name created inside the directory. Please note that the contents of this directory should be identical to what's listed in the [Directory Structure](../build/introduction.md#directory-structure).

Finally, run the following command to install the new project’s dependencies from within the new project's directory.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

You have now initialised your first SubQuery project with just a few simple steps. Let’s now customise the standard template project for a specific blockchain of interest.

You may want to refer to the [command line arguments](../run_publish/references.md) used in SubQuery. It will help you understand the commands better.

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
