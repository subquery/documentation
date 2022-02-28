# Lưu trữ Dự án bằng IPFS

Hướng dẫn này hoạt động thông qua cách xuất bản dự án SubQuery cục bộ lên [IPFS](https://ipfs.io/) và triển khai nó trên cơ sở hạ tầng lưu trữ của chúng tôi.

Lưu trữ một dự án trong IPFS làm cho nó khả dụng cho tất cả mọi người và giảm sự phụ thuộc của bạn vào các dịch vụ tập trung như GitHub.

## Yêu cầu

- `@subql/cli` phiên bản 0.21.0 trở lên.
- Tệp kê khai `specVersion` 0.2.0 trở lên.
- Chuẩn bị [SUBQL_ACCESS_TOKEN](#prepare-your-subql-access-token) của bạn đã sẵn sàng.
- Để đảm bảo việc triển khai của bạn thành công, chúng tôi thực sự khuyên bạn nên xây dựng dự án của mình bằng lệnh ` subql build` và kiểm tra cục bộ nó trước khi xuất bản.

## Chuẩn bị SUBQL_ACCESS_TOKEN của bạn

- Bước 1: Truy cập [Dự án SubQuery](https://project.subquery.network/) và đăng nhập.
- Bước 2: Nhấp vào hồ sơ của bạn ở trên cùng bên phải của menu điều hướng, sau đó nhấp vào **_Refresh Token_**
- Bước 3: Sao chép mã thông báo đã tạo.
- Bước 4: Để sử dụng mã thông báo này:
  - Tùy chọn 1: Thêm SUBQL_ACCESS_TOKEN trong các biến môi trường của bạn. `EXPORT SUBQL_ACCESS_TOKEN=<token>`
  - Tùy chọn 2: Sắp có, `subql/cli` sẽ hỗ trợ lưu trữ cục bộ SUBQL_ACCESS_TOKEN của bạn.

## Làm thế nào để xuất bản một dự án

Chúng tôi cung cấp hai phương pháp để xuất bản dự án của bạn,

### Lựa chọn 1:

Khi bạn đã cài đặt `@subql/cli`, bạn có thể chạy lệnh sau, lệnh này sẽ đọc dự án và thông tin cần thiết từ tệp kê khai mặc định của nó ` project.yaml `

```
// Publish it from your project's root directory
subql publish

// OR point to your project root
subql publish -f ~/my-project/
```

### Lựa chọn 2:

Alternatively, suppose your project has multiple Manifest files, for example you support multiple networks but share the same mapping and business logic, and have a project structure as follows:

```
L projectRoot
 L src/
 L package.json
 L polkadot.yaml (Manifest for Polkadot network)
 L kusama.yaml   (Manifest for Kusama network)
 ...
```

You can always publish the project with your selected manifest file.

```
 # This will publish project support indexing Polkadot network
subql publish -f ~/my-projectRoot/polkadot.yaml
```

## After publish

After successfully publishing the project, the logs below indicate that the project was created on the IPFS cluster and have returned its `CID` (content identifier).

```
Building and packing code... done
Uploading SupQuery project to IPFS
SubQuery Project uploaded to IPFS: QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd  //CID
```

Please note this `CID`. With this `CID`, you can view your published project as what we call it [IPFS Deployment](#ipfs-deployment)

## IPFS Deployment

IPFS deployment represents an independent and unique existence of a SubQuery project on a decentralized network. Therefore, any changes with the code in the project will affect its uniqueness. If you need to adjust your business logic, e.g. change the mapping function, you must republish the project, and the `CID` will change.

For now, to view the project you have published, use a `REST` api tool such as [Postman](https://web.postman.co/), and use `POST` method with the following example URL to retrieve it. `https://subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`

You should see the example project deployment as below:

This deployment looks very similar to your manifest file. You can expect those descriptive fields, and the network and dictionary endpoint has been removed as they did not directly affect the outcome of project execution.

Those files been used in your local project has been packed and published to IPFS as well.

```yaml
dataSources:
  - kind: substrate/Runtime
    mapping:
      file: ipfs://QmTTJKrMVzCZqmRCd5xKHbKymtQQnHZierBMHLtHHGyjLy
      handlers:
        - handler: handleBlock
          kind: substrate/BlockHandler
        - filter:
            method: Deposit
            module: balances
          handler: handleEvent
          kind: substrate/EventHandler
        - handler: handleCall
          kind: substrate/CallHandler
    startBlock: 8973820
network:
  genesisHash: "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3"
schema:
  file: ipfs://QmTP5BjtxETVqvU4MkRxmgf8NbceB17WtydS6oQeHBCyjz
specVersion: 0.2.0
```

## Chạy dự án SubQuery của bạn trên Dịch vụ được lưu trữ

### Create project with IPFS deployment

You can follow the guide to [Publish your SubQuery project](publish.md) but where you set your deployment source you can select **IPFS**.

Then choose your production slot, copy and paste you IPFS deployment CID (without the leading `ipfs://`).

You should see you IPFS deployment in the preview section. And you can select the network, dictionary endpoints etc.

After successful deploy the IPFS deployment on our hosted service, it should be available to view on the SubQuery Explorer, you can access the query service just like you do locally.
