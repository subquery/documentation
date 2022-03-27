# Hướng dẫn & Các Ví dụ

Dưới đây chúng tôi sẽ liệt kê các bài hướng dẫn của chúng tôi và các ví dụ đa dạng để giúp bạn thiết lập và chạy dự án một cách dễ dàng và nhanh nhất.

## Hướng dẫn



## Các dự án mẫu SubQuery

| Ví dụ                                                                                         | Mô tả                                                                                                                                | Chủ đề                                                                                                                                     |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [extrinsic-finalized-block](https://github.com/subquery/tutorials-extrinsic-finalised-blocks) | Lập chỉ mục ngoại vi để chúng có thể được truy vấn bằng Hash của chúng                                                               | Ví dụ đơn giản nhất với một hàm __block handler__                                                                                          |
| [block-timestamp](https://github.com/subquery/tutorials-block-timestamp)                      | Lập Index theo dấu thời gian cho từng block đã được hoàn thiện                                                                       | Một ví dụ đơn giản khác về function **call handler** (xử lý lệnh gọi)                                                                      |
| [người xác thực - ngưỡng](https://github.com/subquery/tutorials-validator-threshold)          | Lập Index về mức staking tối thiểu để người xác nhận đủ điều kiện để được bầu chọn.                                                  | Một ví dụ phức tạp hơn về hàm __xử lý khối__ có tác dụng tạo __lệnh gọi bên ngoài__ tới cho `@polkadot/api` để lấy thêm dữ liệu trên chuỗi |
| [tổng-phần thưởng](https://github.com/subquery/tutorials-sum-reward)                          | Lập Index về số tiền ràng buộc để staking, phần thưởng staking và khoản phạt (slash) từ các sự kiện của block đã hoàn thiện          | __trình xử lý sự kiện__ phức tạp hơn với mối quan hệ __one-to-many__                                                                       |
| [mối quan hệ thực thể](https://github.com/subquery/tutorials-entity-relations)                | Lập Index về việc chuyển số dư giữa các tài khoản và cũng lập chỉ mục lô tiện ích, nhằm tìm hiểu nội dung của các lệnh gọi bên ngoài | Mối quan hệ __One-to-many__ và __many-to-many__ cùng với hàm __extrinsic handling__                                                        |
| [kitty](https://github.com/subquery/tutorials-kitty-chain)                                    | Lập Index thông tin ra đời của các kitty.                                                                                            | Hàm phức tạp để __xử lý lệnh gọi__ và __xử lý sự kiện__, với dữ liệu được lập chỉ mục từ một __chuỗi tùy chỉnh__                           |
