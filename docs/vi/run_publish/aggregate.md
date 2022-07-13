# Hàm Tổng hợp

## Nhóm Bởi

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

SubQuery's implementation of aggregate functions is based on [pg-aggregates](https://github.com/graphile/pg-aggregates), you can find more information there.

**Please note that you must enable the `--unsafe` flag on the query service in order to use these functions. [Read more](./references.md#unsafe-2). Note that the `--unsafe` command will prevent your project from being run in the SubQuery Network, and you must contact support if you want this command to be run with your project in [SubQuery's managed service](https://project.subquery.network))**.
