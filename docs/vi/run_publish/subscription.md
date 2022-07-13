# Các theo dõi

## Theo dõi GraphQL là gì

SubQuery hiện đang hỗ trợ Các theo dõi Graphql. Giống như truy vấn, các theo dõi cho phép bạn lấy dữ liệu. Không giống như truy vấn, theo dõi hoạt động lâu dài, có thể thay đổi kết quả của chúng theo thời gian.

Các theo dõi rất hữu ích khi bạn muốn ứng dụng khách của mình thay đổi dữ liệu hoặc hiển thị một số dữ liệu mới ngay khi dữ liệu thay đổi hoặc dữ liệu mới có sẵn. Các theo dõi cho phép bạn *theo dõi* dự án SubQuery của bạn để biết sự thay đổi.

[Read more about subscriptions here](https://www.apollographql.com/docs/react/data/subscriptions/).

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
- `id`: Returns the ID of the entity that has changed.
- `mutation_type`: Hành động đã được thực hiện đối với thực thể này. Mutation types can be either `INSERT`, `UPDATE` or `DELETE`.
- `_entity`: giá trị của thực thể đó ở định dạng JSON.

## Bộ lọc

Chúng tôi cũng hỗ trợ bộ lọc về theo dõi, có nghĩa là khách hàng sẽ chỉ nhận được dữ liệu theo dõi cập nhật nếu dữ liệu hoặc thay đổi đó đáp ứng các tiêu chí nhất định.

Có hai loại bộ lọc mà chúng tôi đang hỗ trợ:

- `id`: Bộ lọc để chỉ trả về những thay đổi ảnh hưởng đến một thực thể cụ thể (được chỉ định bởi ID).
- `mutation_type`: Chỉ cùng một loại thay đổi được thực hiện sẽ trả về một bản cập nhật.

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

Note that the `mutation` filter can be one of `INSERT`, `UPDATE` or `DELETE`.

**Xin lưu ý rằng bạn phải bật cờ `--subscription` trên cả node và dịch vụ truy vấn để sử dụng các hàm này.**

Tính năng theo dõi hoạt động trên dịch vụ được quản lý bởi SubQuery khi bạn gọi trực tiếp điểm cuối GraphQL được liệt kê. Nó sẽ không hoạt động trong sân chơi GraphQL trong trình duyệt.
