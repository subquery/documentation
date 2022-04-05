# Các theo dõi

## Theo dõi GraphQL là gì

SubQuery hiện đang hỗ trợ Các theo dõi Graphql. Giống như truy vấn, các theo dõi cho phép bạn lấy dữ liệu. Không giống như truy vấn, theo dõi hoạt động lâu dài, có thể thay đổi kết quả của chúng theo thời gian.

Các theo dõi rất hữu ích khi bạn muốn ứng dụng khách của mình thay đổi dữ liệu hoặc hiển thị một số dữ liệu mới ngay khi dữ liệu thay đổi hoặc dữ liệu mới có sẵn. Các theo dõi cho phép bạn *theo dõi* dự án SubQuery của bạn để biết sự thay đổi.

[Đọc thêm về các theo dõi tại đây](https://www.apollographql.com/docs/react/data/subscriptions/)

## Làm thế nào để theo dõi một thực thể

Ví dụ cơ bản của theo dõi GraphQL là để nhận được thông báo khi bất kỳ thực thể mới nào được tạo. Trong ví dụ sau, chúng tôi theo dõi thực thể `Transfer` và nhận được bản cập nhật khi có bất kỳ thay đổi nào đối với bảng này.

Bạn có thể tạo theo dõi bằng cách truy vấn điểm cuối GraphQL như sau. Kết nối của bạn sau đó sẽ theo dõi bất kỳ thay đổi nào được thực hiện đối với bảng thực thể `Transfer`.

```graphql
subscription {
  transfer {
    id
    mutation_type
    _entity
  }
}
```

Nội dung của thực thể trong truy vấn của bạn cho biết dữ liệu bạn muốn nhận được thông qua theo dõi của mình khi bảng `Transfer` được cập nhật:
- `id`: Trả về ID của thực thể đã thay đổi
- `mutation_type`: Hành động đã được thực hiện đối với thực thể này. Các kiểu đột biến có thể là `INSERT`, `UPDATE` hoặc `DELETE`
- `_entity`: giá trị của thực thể đó ở định dạng JSON.

## Bộ lọc

Chúng tôi cũng hỗ trợ bộ lọc về theo dõi, có nghĩa là khách hàng sẽ chỉ nhận được dữ liệu theo dõi cập nhật nếu dữ liệu hoặc đột biến đó đáp ứng các tiêu chí nhất định.

Có hai loại bộ lọc mà chúng tôi đang hỗ trợ:

- `id`: Bộ lọc để chỉ trả về những thay đổi ảnh hưởng đến một thực thể cụ thể (được chỉ định bởi ID).
- `mutation_type`: Chỉ cùng một loại đột biến được thực hiện sẽ trả về một bản cập nhật.

Giả sử chúng ta có một thực thể `Balances` và nó ghi lại số dư của mỗi tài khoản.

```graphql
type Balances {
  id: ID! # tài khoản của ai đó , ví dụ: 15rb4HVycC1KLHsdaSdV1x2TJAmUkD7PhubmhL3PnGv7RiGY
  amount: Int! # số dư của tài khoản này
}
```

Nếu chúng tôi muốn theo dõi bất kỳ cập nhật số dư nào ảnh hưởng đến một tài khoản cụ thể, chúng tôi có thể chỉ định bộ lọc theo dõi như sau:

```graphql
subscription {
  balances(
    id: "15rb4HVycC1KLHsdaSdV1x2TJAmUkD7PhubmhL3PnGv7RiGY"
    mutation: UPDATE
  ) {
    id
    mutation_type
    _entity
  }
}
```

Lưu ý rằng bộ lọc `mutation` có thể là một trong những hàm ` INSERT `, ` UPDATE ` hoặc ` DELETE `

## Sử dụng Tính năng này

**Xin lưu ý rằng bạn phải bật cờ `--unsafe` trên cả node và dịch vụ truy vấn để sử dụng các hàm này. [Đọc thêm](./references.md#unsafe-2). Lưu ý rằng lệnh `--unsafe` sẽ ngăn dự án của bạn được chạy trong SubQuery Network, và bạn phải liên hệ với bộ phận hỗ trợ nếu bạn muốn lệnh này được chạy với dự án của mình trong dịch vụ được quản lý của SubQuery ([project.subquery.network](https://project.subquery.network))**

The subcription feature works on SubQuery's managed service when you directly call the listed GraphQL endpoint. It will not work within the in-browser GraphQL playground.
