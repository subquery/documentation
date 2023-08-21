# 1. Tạo một Dự án Mới

The goal of this quick start guide is to provide you with working SubQuery project in your chosen layer-1 network and a basic understanding of how SubQuery works, it should take around 10-15 minutes.

## Điều kiện tiên quyết

Trước khi bạn bắt đầu tạo dự án blockchain đầu tiên với SubQuery, hãy đảm bảo rằng bạn đã cài đặt các ứng dụng phần mềm hỗ trợ cần thiết. Đó là:

- [NodeJS](https://nodejs.org/en/): A modern (e.g. the LTS version) installation of NodeJS.
- [Docker](https://docker.com/): This tutorial will use Docker to run a local version of SubQuery's node.

## 1. Cài đặt CLI SubQuery

Install SubQuery CLI globally on your terminal by using NPM. We **do not** encourage the use of `yarn global` for installing `@subql/cli` due to its poor dependency management. Nó có thể dẫn đến nhiều lỗi.

```shell
# NPM
npm install -g @subql/cli

# Test that it was installed correctly
subql --help
```

## 2. Initialise a new SubQuery Project

Run the following command inside the directory that you want to create a SubQuery project in:

```shell
subql init
```

Bạn sẽ được hỏi một số câu hỏi nhất định khi tiếp tục:

- **Project name**: Tên dự án SubQuery của bạn.
- **Network family**: Nhóm mạng blockchain layer-1 mà dự án SubQuery này sẽ lập chỉ mục. Use the arrow keys to select from the available options (scroll down as there are multiple pages).
- **Network**: Mạng cụ thể mà dự án SubQuery này sẽ lập chỉ mục. Use the arrow keys to select from the available options (scroll down as there are multiple pages).
- **Template project**: Chọn một dự án mẫu SubQuery sẽ cung cấp một điểm khởi đầu để bắt đầu phát triển. For some networks we provide multiple examples.
- **RPC endpoint**: Provide an HTTP or websocket URL to a running RPC endpoint, which will be used by default for this project. You can use public endpoints for different networks, your own private dedicated node, or just use the default endpoint. This RPC node must have the entire state of the data that you wish to index, so we recommend an archive node.
- **Git repository**: Provide a Git URL to a repo that this SubQuery project will be hosted in.
- **Authors**: Nhập chủ sở hữu của dự án SubQuery này tại đây (ví dụ: tên của bạn!) Hoặc chấp nhận giá trị mặc định đã cung cấp.
- **Description**: Cung cấp một đoạn giới thiệu ngắn về dự án của bạn, mô tả dự án chứa dữ liệu gì và người dùng có thể làm gì với dự án đó hoặc chấp nhận giá trị mặc định đã cung cấp.
- **Version**: Nhập số phiên bản tùy chỉnh hoặc sử dụng mặc định (`1.0.0`).
- **License**: Cung cấp giấy phép phần mềm cho dự án này hoặc chấp nhận giấy phép mặc định (`MIT`).

Hãy xem xét ví dụ sau đây:

```shell
$ subql init
Project name [subql-starter]: test-subquery-project
? Select a network family Ethereum
? Select a network Ethereum
? Select a template project ethereum-starter     Starter project for Ethereum networks
RPC endpoint: [https://eth.api.onfinality.io/public]:
Git repository [https://github.com/subquery/ethereum-subql-starter]: https://github.com/jamesbayly/test-subquery-project  ^ Author [SubQuery Team]: James Bayly
Description [This project can be use as a starting po...]: A new example ethereum SubQuery project
Version [0.0.1]:
License [MIT]:
Preparing project... done
test-subquery-project is ready
```

:::info Ethereum Project Scaffolding

You can generate a project from a JSON ABIs to save you time when creating your project in EVM chains. Please see [EVM Project Scaffolding](#evm-project-scaffolding)

:::

Sau khi quá trình khởi tạo hoàn tất, bạn sẽ thấy một thư mục có tên dự án của bạn đã được tạo bên trong thư mục. Please note that the contents of this directory should be near identical to what's listed in the [Directory Structure](../build/introduction.md#directory-structure).

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

SubQuery hỗ trợ các mạng blockchain khác nhau và cung cấp hướng dẫn riêng cho từng mạng. Select your preferred blockchain under **2. Specific Chains** and continue the quick start guide.

## EVM Project Scaffolding

Scaffolding saves time during SubQuery project creation by automatically generating typescript facades for EVM transactions, logs, and types.

When you are initalising a new project using the `subql init` command, SubQuery will give you the option to set up a scaffolded SubQuery project based on your JSON ABI. If you have select an compatiable network type (EVM), it will prompt

```shell
? Do you want to generate scaffolding with an existing abi contract?
```

So for example, If I wanted to create the [Ethereum Gravatar indexer](./quickstart_chains/ethereum-gravatar.md), I would download the Gravity ABI contract JSON from [Etherscan](https://etherscan.io/address/0x2e645469f354bb4f5c8a05b3b30a929361cf77ec#code), save it as `Gravity.json`, and then run the following.

![Project Scaffolding EVM](/assets/img/project-scaffold-evm.png)

Once completed, you will have a scaffold project structure from your chosen ABI `functions`/`events`.

You can read more about this feature in [Project Scaffolding](../build/introduction.md#evm-project-scaffolding)
