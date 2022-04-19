# Lưu trữ Dự án bằng IPFS

Hướng dẫn này hoạt động thông qua cách xuất bản dự án SubQuery cục bộ lên [IPFS](https://ipfs.io/) và triển khai nó trên cơ sở hạ tầng lưu trữ của chúng tôi.

Lưu trữ một dự án trong IPFS làm cho nó khả dụng cho tất cả mọi người và giảm sự phụ thuộc của bạn vào các dịch vụ tập trung như GitHub.

## Yêu cầu

- `@subql/cli` phiên bản 0.21.0 trở lên.
- Tệp kê khai `specVersion` 0.2.0 trở lên.
- Chuẩn bị [SUBQL_ACCESS_TOKEN](#prepare-your-subql-access-token) của bạn đã sẵn sàng.
- Để đảm bảo việc triển khai của bạn thành công, chúng tôi thật sự khuyến nghị bạn nên xây dựng dự án của mình bằng lệnh `subql build`, và kiểm tra cục bộ nó trước khi xuất bản.

## Chuẩn bị SUBQL_ACCESS_TOKEN của bạn

- Bước 1: Truy cập [Dự án SubQuery](https://project.subquery.network/) và đăng nhập.
- Bước 2: Nhấp vào hồ sơ của bạn ở trên cùng bên phải của menu điều hướng, sau đó nhấp vào **_Refresh Token_**
- Bước 3: Sao chép mã thông báo đã tạo.
- Bước 4: Để sử dụng mã thông báo này:
  - Tùy chọn 1: Thêm SUBQL_ACCESS_TOKEN trong các biến môi trường của bạn. `EXPORT SUBQL_ACCESS_TOKEN=<token>`
  - Tùy chọn 2: Sắp có, `subql/cli` sẽ hỗ trợ lưu trữ cục bộ SUBQL_ACCESS_TOKEN của bạn.

## Làm thế nào để xuất bản một dự án

Chúng tôi cung cấp hai phương pháp để xuất bản dự án của bạn,

### Tùy chọn 1:

Khi bạn đã cài đặt `@subql/cli`, bạn có thể chạy lệnh sau, lệnh này sẽ đọc dự án và thông tin cần thiết từ tệp kê khai mặc định của nó `project.yaml`

```
// Xuất bản nó từ thư mục gốc dự án của bạn
subql publish

// HOẶC trỏ tới dự án gốc của bạn
subql publish -f ~/my-project/
```

### Tùy chọn 2:

Ngoài ra, giả sử dự án của bạn có nhiều tệp kê khai, ví dụ: bạn hỗ trợ nhiều mạng nhưng chia sẻ cùng một bản đồ và logic nghiệp vụ, đồng thời có cấu trúc dự án như sau:

```
L projectRoot
 L src/
 L package.json
 L polkadot.yaml (Manifest for Polkadot network)
 L kusama.yaml   (Manifest for Kusama network)
 ...
```

Bạn luôn có thể xuất bản dự án với tệp kê khai đã chọn của mình.

```
 # Lệnh này sẽ xuất bản hỗ trợ dự án lập chỉ mục mạng Polkadot
subql publish -f ~/my-projectRoot/polkadot.yaml
```

## Sau khi xuất bản

Sau khi xuất bản dự án thành công, nhật ký bên dưới cho biết rằng dự án đã được tạo trên cụm IPFS và đã trả về `CID` (mã định danh nội dung) của nó.

```
Building and packing code... done
Uploading SupQuery project to IPFS
SubQuery Project uploaded to IPFS: QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd  //CID
```

Hãy ghi chú `CID` này. Với `CID` này, bạn có thể xem dự án đã xuất bản của mình như cái mà chúng tôi gọi là [Triển khai IPFS](#ipfs-deployment)

## Triển khai IPFS

Triển khai IPFS thể hiện sự tồn tại độc lập và duy nhất của một dự án SubQuery trên một mạng phi tập trung. Do đó, bất kỳ thay đổi nào với mã trong dự án sẽ ảnh hưởng đến tính duy nhất của nó. Nếu bạn cần điều chỉnh logic kinh doanh của mình, ví dụ: thay đổi chức năng ánh xạ, bạn phải xuất bản lại dự án và `CID` sẽ thay đổi.

Hiện tại, để xem dự án bạn đã xuất bản, hãy sử dụng công cụ api `REST` như [Postman](https://web.postman.co/) và sử dụng phương thức `POST` với URL mẫu sau để lấy nó. `https://ipfs.subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`

Bạn sẽ thấy mẫu triển khai dự án như bên dưới:

Việc triển khai này tương đồng với tệp kê khai của bạn. Bạn có thể hy vọng các trường mô tả đó, và điểm cuối mạng và từ điển đã bị gỡ bỏ vì chúng không ảnh hưởng trực tiếp đến kết quả thực hiện dự án.

Các tệp đó được sử dụng trong dự án cục bộ của bạn cũng đã được đóng gói và xuất bản lên IPFS.

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

### Tạo dự án với IPFS deployment

Bạn có thể làm theo hướng dẫn để [Xuất bản dự án SubQuery của mình](publish.md) nhưng nơi bạn đặt nguồn triển khai, bạn có thể chọn **IPFS**.

Sau đó, chọn vùng sản xuất của bạn, sao chép và dán CID IPFS triển khai của bạn (không có `ipfs://`).

Bạn sẽ thấy mình triển khai IPFS trong phần xem trước. Và bạn có thể chọn mạng, điểm cuối từ điển, v.v.

Sau khi triển khai thành công việc triển khai IPFS trên dịch vụ được lưu trữ của chúng tôi, nó sẽ có sẵn để xem trên SubQuery Explorer, bạn có thể truy cập dịch vụ truy vấn giống như bạn làm trên máy bạn.
