# Phương thức thanh toán

Để linh hoạt, có 3 tùy chọn thanh toán để trả cho dữ liệu blockchain. Đó là:

- Dùng đến đâu thanh toán đến đó (PAYG)
- Thỏa thuận dịch vụ kín
- Thỏa thuận dịch vụ mở

## Dùng đến đâu thanh toán đến đó (PAYG)

Đây là phương thức thanh toán cơ bản và là phương thức dự phòng cho những phương thức khác. Mỗi Người lập chỉ mục sẽ quảng cáo giá PAYG của họ khi đăng ký khả năng phục vụ yêu cầu cho các dự án SubQuery cụ thể.

Người tiêu dùng đưa ra yêu cầu sẽ phải khóa các mã thông báo cần thiết để thực hiện yêu cầu đó trong một kênh trạng thái và khi kết thúc Chu kỳ, các mã thông báo này sẽ được phân phối cho Người lập chỉ mục dựa trên hàm sản xuất Cobb-Douglas.

## Các kế hoạch và thỏa thuận kín

Các thỏa thuận kín là thỏa thuận giữa chỉ một người lập chỉ mục và một người tiêu dùng. Đó là mối quan hệ trực tiếp, nơi tất cả các khoản thanh toán luân chuyển giữa hai bên cho công việc được thực hiện.

Thỏa thuận kín được thiết kế để cung cấp cho người lập chỉ mục tin tưởng rằng có một thị trường và ROI cho dữ liệu từ một Dự án SubQuery cụ thể và về cơ bản báo hiệu cho họ biết Dự án nào nên được lập chỉ mục.

Kế hoạch kín cũng có thể được đặt trên các Dự án SubQuery hiện có để thu hút thêm người lập chỉ mục vào Dự án SubQuery đó. Điều này có thể hữu ích trong các tình huống mà công cụ lập chỉ mục độc quyền hiện tại có thể tính phí dữ liệu một số tiền không hợp lý hoặc thiếu sự cạnh tranh để thúc đẩy giá về trạng thái cân bằng.

## Thỏa thuận dịch vụ mở

Thỏa thuận dịch vụ thị trường mở tương tự như Thỏa thuận dịch vụ thị trường kín, nhưng cho phép nhiều Người lập chỉ mục tham gia và cạnh tranh để cung cấp dữ liệu cho Người tiêu dùng. Thỏa thuận dịch vụ thị trường mở có thể bắt đầu như một hợp đồng giữa 1 Người tiêu dùng và 1 Người lập chỉ mục, nhưng nhiều bên có thể tham gia hợp đồng dẫn đến *n* người tiêu dùng và *n* người lập chỉ mục.

Mỗi Thỏa thuận dịch vụ thị trường mở là kết quả của một pool phần thưởng mới được tạo ra cho hợp đồng đó và SQT được phân phối giữa các nhà lập chỉ mục tham gia bởi hàm sản xuất Cobb-Douglas.

Thỏa thuận mở cung cấp các điều khoản có lợi cho cả Người lập chỉ mục và Người tiêu dùng, nhưng mang lại hiệu suất và độ tin cậy tốt hơn cho Người tiêu dùng bằng cách thu hút nhiều Người lập chỉ mục cạnh tranh và cung cấp cùng một dữ liệu. Nếu Người tiêu dùng đang chạy các ứng dụng quy mô lớn với người dùng trên khắp thế giới, thì thỏa thuận mở là lý tưởng.

## Sự đổi mới của SubQuery trong phương thức thanh toán

Ngày nay, chúng ta thường thanh toán bằng các khoản thanh toán như đăng ký cho nhạc chúng ta nghe, chương trình truyền hình chúng ta xem và các ứng dụng mà chúng ta sử dụng. Trong các ứng dụng dịch vụ web3 tiên phong, thay vào đó, chúng tôi đã áp dụng mô hình dùng đến đâu trả tiền đến đó, trong đó mỗi giao dịch nhỏ có một chi phí chính xác trong mạng.

Chúng tôi nghĩ rằng các phương thức thanh toán dựa trên đăng ký hoặc định kỳ vẫn tồn tại. Các nhà cung cấp dịch vụ thích chúng bởi vì chúng đại diện cho doanh thu có thể dự đoán được, tương tự ở mặt khác, người tiêu dùng thích chúng vì chúng là một chi phí được biết đến và dễ dàng định lượng. Ngoài ra còn có một yếu tố tâm lý mà một khi bạn đăng ký, hầu hết người tiêu dùng sẽ cảm thấy có nghĩa vụ phải tiêu dùng thật nhiều, nếu không phải là tất cả, làm tăng nhu cầu đối với dịch vụ và cho phép phát huy lợi thế kinh tế theo quy mô.

Sự kết hợp ba tùy chọn thanh toán ở trên cho Người lập chỉ mục cung cấp một số tùy chọn dựa trên đăng ký nâng cao cho Người tiêu dùng và Người lập chỉ mục. Một số bên có thể được hưởng lợi từ sự chắc chắn của phần thưởng được cung cấp bởi các thỏa thuận kín và khả năng dự đoán của các chi phí định kỳ. Tương tự, những người khác có thể thích tìm kiếm dữ liệu hợp lý nhất bằng cách thực hiện các thỏa thuận định kỳ với khối lượng lớn hoặc giá giao ngay thấp trên thị trường Pay-As-You-Go.
