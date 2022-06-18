# Phương thức thanh toán

Để linh hoạt, có 3 tùy chọn thanh toán để trả cho dữ liệu blockchain. Đó là:

- Dùng đến đâu thanh toán đến đó (PAYG)
- Thỏa thuận dịch vụ kín
- Thỏa thuận dịch vụ mở

## Dùng đến đâu thanh toán đến đó (PAYG)

Đây là phương thức thanh toán cơ bản và là phương thức dự phòng cho những phương thức khác. Mỗi Người lập chỉ mục sẽ quảng cáo giá PAYG của họ khi đăng ký khả năng phục vụ yêu cầu cho các dự án SubQuery cụ thể.

Người tiêu dùng đưa ra yêu cầu sẽ phải khóa các mã thông báo cần thiết để thực hiện yêu cầu đó trong một kênh trạng thái và khi kết thúc Chu kỳ, các mã thông báo này sẽ được phân phối cho Người lập chỉ mục dựa trên hàm sản xuất Cobb-Douglas.

## Các kế hoạch và thỏa thuận kín

Các thỏa thuận kín cho thỏa thuận giữa chỉ một người lập chỉ mục và một người tiêu dùng. Đó là mối quan hệ trực tiếp, nơi tất cả các khoản thanh toán luân chuyển giữa hai bên cho công việc được thực hiện.

Thỏa thuận kín được thiết kế để cung cấp cho người lập chỉ mục tin tưởng rằng có một thị trường và ROI cho dữ liệu từ một Dự án SubQuery cụ thể và về cơ bản báo hiệu cho họ biết Dự án nào nên được lập chỉ mục.

Kế hoạch kín cũng có thể được đặt trên các Dự án SubQuery hiện có để thu hút thêm người lập chỉ mục vào Dự án SubQuery đó. Điều này có thể hữu ích trong các tình huống mà công cụ lập chỉ mục độc quyền hiện tại có thể tính phí dữ liệu một số tiền không hợp lý hoặc thiếu sự cạnh tranh để thúc đẩy giá về trạng thái cân bằng.

## Thỏa thuận dịch vụ mở

Open Market Service Agreements are similar to Closed Market Service Agreements, but allow multiple Indexers to join and compete to provide data to the Consumer. An Open Market Service Agreement may start as a contract between 1 Consumer and 1 Indexer, but more parties may join the contract resulting in *n* consumer and *n* indexers.

Each Open Market Service Agreement results in a new reward pool being created for that contract, and SQT is distributed amongst participating indexers by the Cobb-Douglas production function.

Open Agreements provide favourable terms for both Indexers and Consumers, but enable better performance and reliability for Consumers by attracting more Indexers to compete and serve the same data. If Consumers are running large scale applications with users around the world, then Open Agreements are ideal.

## SubQuery’s Innovation in Payment Methods

Today, we generally pay with subscription-based payments for the music we listen to, the TV shows we watch, and the applications that we use. In pioneering web3 service applications, we’ve instead adopted a pay-as-you-go model, where each atomic transaction has an exact cost in the network.

We think subscription based or recurring payment methods are here to stay. Service providers like them because they represent predictable revenue, similarly on the other side consumers like them because they are a known and easily quantified cost. There’s also a psychological factor where once you subscribe, most consumers will feel obligated to consume as much if not all of it, increasing the demand for the service and allowing economies of scale to kick in.

The combination of the above three payment options for indexers provide several advanced subscription based options for Consumers and Indexers. Some parties may benefit from the certainty of rewards provided by Closed Agreements and the predictability of recurring costs. Equally, others may instead prefer to hunt out the most affordable data by going for high volume recurring agreements or low spot prices on the Pay-As-You-Go market.
