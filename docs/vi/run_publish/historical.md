# Theo dõi trạng thái lịch sử tự động

## Dưới nền

SubQuery cho phép bạn lập chỉ mục bất kỳ dữ liệu nào bạn muốn từ Substrate, Avalance và các mạng khác. Hiện tại, SubQuery hoạt động như một kho dữ liệu có thể thay đổi, nơi bạn có thể thêm, cập nhật, xóa hoặc thay đổi các thực thể đã lưu hiện có trong tập dữ liệu được SubQuery lập chỉ mục. Khi SubQuery lập chỉ mục từng khối, trạng thái của từng thực thể có thể được cập nhật hoặc xóa dựa trên logic của dự án của bạn.

Một dự án SubQuery cơ bản lập chỉ mục số dư tài khoản có thể có một thực thể trông giống như sau.

```graphql
type Account @entity {
  id: ID! # Địa chỉ tài khoản của Alice 
  balance: BigInt
  transfers: [Transfer]
}
```

![Lập chỉ mục lịch sử](/assets/img/historic_indexing.png)

Trong ví dụ trên, số dư DOT của Alice liên tục thay đổi và khi chúng tôi lập chỉ mục dữ liệu, `balance` trên thực thể `Account` sẽ thay đổi. Một dự án SubQuery cơ bản lập chỉ mục số dư tài khoản sẽ mất dữ liệu lịch sử này và sẽ chỉ lưu trữ trạng thái của chiều cao khối lập chỉ mục hiện tại. Ví dụ: nếu chúng ta hiện đang lập chỉ mục ở khối 100, dữ liệu trong cơ sở dữ liệu chỉ có thể đại diện cho trạng thái tài khoản của Alice ở khối 100.

Sau đó, chúng ta phải đối mặt với một vấn đề. tại block 100. Giả sử dữ liệu đã thay đổi khi lập chỉ mục đến khối 200, làm thế nào chúng ta có thể truy vấn trạng thái của dữ liệu tại khối 100?

## Theo dõi trạng thái lịch sử tự động

SubQuery hiện tự động hóa việc theo dõi trạng thái lịch sử của các thực thể cho tất cả các dự án mới. Bạn có thể tự động truy vấn trạng thái của dự án SubQuery ở bất kỳ chiều cao khối nào. Điều này có nghĩa là bạn có thể xây dựng các ứng dụng cho phép người dùng quay ngược thời gian hoặc hiển thị trạng thái dữ liệu của bạn thay đổi theo thời gian.

Nói tóm lại, khi bạn tạo, cập nhật hoặc xóa bất kỳ thực thể SubQuery nào, chúng tôi sẽ lưu trữ trạng thái trước đó với phạm vi khối mà nó hợp lệ. Sau đó, bạn có thể truy vấn dữ liệu từ một chiều cao khối cụ thể bằng cách sử dụng cùng các điểm cuối GraphQL và API.

## Bật tính năng này

Tính năng này mặc định được kích hoạt cho tất cả các dự án mới bắt đầu với `@subql/node@1.1.1` và `@subql/query1.1.0`. Nếu bạn muốn thêm nó vào dự án hiện tại của mình, hãy cập nhật `@subql/node` và `@subql/query` sau đó lập chỉ mục lại dự án của bạn với một cơ sở dữ liệu trống.

Nếu bạn muốn vô hiệu hóa tính năng này vì bất kỳ lý do gì, bạn có thể đặt tham số `--disable-historical=true` trên `subql-node`.

Khi khởi động, trạng thái hiện tại của tính năng này được in lên bảng điều khiển (`Historical state is enabled`).

## Truy vấn Trạng thái Lịch sử

Có một thuộc tính đặc biệt (tùy chọn) trên bộ lọc thực thể GraphQL được gọi là `blockHeight`. Nếu bạn bỏ qua thuộc tính này, SubQuery sẽ truy vấn trạng thái thực thể ở chiều cao khối hiện tại.

Please see one of our example projects: [RMRK NFT](https://explorer.subquery.network/subquery/subquery/rmrk-nft-historical).

Để truy vấn chủ sở hữu của NFT RMRK ở chiều cao khối 5.000.000, hãy thêm tham số blockHeight như hình dưới đây:

```graphql
query {
  nFTEntities(first: 5, blockHeight: "5000000") {
    nodes {
      name
      currentOwner
    }
  }
}
```

Để truy vấn chủ sở hữu của các bộ sưu tập NFT RMRK ở chiều cao khối mới nhất, hãy bỏ qua tham số blockHeight như hình dưới đây.

```graphql
query {
  nFTEntities(first: 5) {
    nodes {
      name
      currentOwner
    }
  }
}
```