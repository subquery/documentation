# Hàm Tổng hợp

## Group By

SubQuery hỗ trợ các hàm tổng hợp nâng cao để cho phép bạn thực hiện tính toán trên một tập hợp các giá trị trong truy vấn của mình.

Hàm Tổng hợp thường được sử dụng với hàm GroupBy trong truy vấn của bạn.

GroupBy cho phép bạn nhanh chóng có được các giá trị riêng biệt trong một tập hợp từ SubQuery trong một truy vấn duy nhất.

![Graphql Groupby](/assets/img/graphql_aggregation.png)

## Hàm Tổng hợp Nâng cao

SubQuery cung cấp các hàm tổng hợp sau đây khi ở chế độ không an toàn:

- `sum` (áp dụng cho các trường giống số) - kết quả của việc cộng tất cả các giá trị lại với nhau
- `distinctCount` (áp dụng cho tất cả các trường) - số lượng giá trị riêng biệt
- `min` (áp dụng cho các trường giống số) - giá trị nhỏ nhất
- `max` (áp dụng cho các trường giống số) - giá trị lớn nhất
- `average` (áp dụng cho các trường giống số) - giá trị trung bình (trung bình cộng)
- `stddevSample` (áp dụng cho các trường giống số) - độ lệch chuẩn mẫu của các giá trị
- `stddevPopulation` (áp dụng cho các trường giống số) - độ lệch chuẩn tổng thể của các giá trị
- `varianceSample` (áp dụng cho các trường giống số) - phương sai mẫu của các giá trị
- `variancePopulation` (áp dụng cho các trường giống số) - phương sai tổng thể của các giá trị

Việc thực hiện các hàm tổng hợp của SubQuery dựa trên [pg-aggregates](https://github.com/graphile/pg-aggregates), bạn có thể tìm thêm thông tin ở đó.

::: Cảnh báo quan trọng Xin lưu ý rằng bạn phải bật cờ `--unsafe` trên dịch vụ truy vấn để sử dụng chức năng này. [Đọc thêm](./references.md#unsafe-query-service).

Ngoài ra, lưu ý rằng lệnh `--unsafe` sẽ ngăn dự án của bạn được chạy trong Mạng SubQuery, và bạn sẽ phải liên hệ với bộ phận hỗ trợ nếu bạn muốn lệnh này có thể chạy trên dự án của bạn trong [Dịch vụ quản lý bởi SubQuery ](https://managedservice.subquery.network). :::
