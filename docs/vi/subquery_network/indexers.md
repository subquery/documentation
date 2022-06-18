# Người lập chỉ mục

## Người lập chỉ mục là gì?

Người lập chỉ mục là người tham gia vào mạng SubQuery, là người chịu trách nhiệm lập chỉ mục dữ liệu chuỗi khối và cung cấp dữ liệu này cho khách hàng của họ.

Người lập chỉ mục đóng một vai trò rất quan trọng trong mạng SubQuery. Là một phần của dịch vụ kinh doanh dữ liệu, Người lập chỉ mục biến sức mạnh tính toán và mạng thành lợi nhuận.

## Người lập chỉ mục đặt cược

Để kiếm được phần thưởng từ doanh thu truy vấn với tư cách là Người lập chỉ mục, người lập chỉ mục phải đặt cược SQT vào một Dự án SubQuery cụ thể mà họ đang cung cấp dịch vụ. Hàm sản xuất Cobb-Douglas sẽ được sử dụng để xác định phần thưởng được phân phối cho mỗi người lập chỉ mục.

SubQuery có kế hoạch thêm một ràng buộc vào mạng trong đó người lập chỉ mục phải đặt số tiền SQT tối thiểu vào pool phần thưởng liên quan để có thể tham gia vào Thỏa thuận mở phù hợp. Họ cũng phải đặt cược một số tiền tối thiểu vào một hợp đồng đặt cược tương đương cho bất kỳ Thỏa thuận kín nào theo cùng một cách. Có thể tham gia vào Thỏa thuận mở phù hợp. Người lập chỉ mục này đặt cược giá trị tối thiểu phải là một tỷ lệ phần trăm nhất định của giá trị phần thưởng theo thời kỳ của Thỏa thuận, có nghĩa là để gia hạn Thỏa thuận với khối lượng cao hơn, người lập chỉ mục cũng phải tăng cổ phần của họ. Khi cổ phần của người lập chỉ mục giảm xuống dưới số tiền tối thiểu này, họ sẽ không thể gia hạn Thỏa thuận ở mức giá hiện tại.

Nếu một Người lập chỉ mục có hành vi sai trái (chẳng hạn như cách cung cấp dữ liệu không hợp lệ, không đầy đủ hoặc không chính xác), họ có trách nhiệm phải phân bổ lại một phần SQT đã đặt cọc của họ (trên từng pool phần thưởng cụ thể) cho SubQuery Foundation Treasury, làm giảm việc nắm giữ SQT cổ phần trong mạng và phần thưởng tiềm năng của họ. Vì cổ phần được phân bổ của người lập chỉ mục được xác định theo tỷ lệ phần trăm trong tổng số SQT của họ, điều này sẽ có hiệu lực đối với tất cả các pool phần thưởng khác mà người lập chỉ mục tham gia.

## Người lập chỉ mục được thưởng như thế nào?

Người lập chỉ mục được thưởng trong SQT theo hai cách:
- Phần thưởng từ nhóm phần thưởng SQT dựa trên phân phối được xác định bởi Hàm Sản xuất Cobb-Douglas
- Phần thưởng phí truy vấn SQT trực tiếp từ các Thỏa thuận kín mà người lập chỉ mục là bên tham gia

Người lập chỉ mục được thưởng các khoản phí mà Người tiêu dùng trả cho việc cung cấp dữ liệu blockchain mà Người tiêu dùng đã yêu cầu. Người lập chỉ mục sẽ nhận được tất cả các khoản phí từ một Thỏa thuận kín. Nếu không, các khoản phí được phân chia dựa trên khối lượng công việc được thực hiện (các yêu cầu được cung cấp) và số lượng SQT được ủy quyền - sự phân chia này được xác định bằng cách áp dụng Hàm Sản xuất Cobb-Douglas.

Có thể có nhiều pool phần thưởng hoạt động đồng thời cho một Người lập chỉ mục nhất định. Công việc của người lập chỉ mục là phân bổ SQT được đặt cọc và ủy quyền của họ giữa các nhóm này (tính theo tỷ lệ phần trăm trong tổng số SQT của họ). Sẽ có một phần thưởng cho mỗi dự án mà Người lập chỉ mục chấp nhận PAYG và một pool thưởng cho mỗi Thỏa thuận thị trường mà Người lập chỉ mục tham gia.

## Thu hút Người ủy quyền

Người lập chỉ mục có thể tăng tiềm năng kiếm tiền của họ bằng cách thu hút Người ủy quyền. Người ủy quyền là chủ sở hữu mã thông báo SQT có thể ủy quyền mã thông báo của họ cho Người lập chỉ mục để nhận thêm phần thưởng. Người lập chỉ mục sử dụng các mã thông báo bổ sung này để tăng số lượng họ phân bổ cho các dự án mà họ lựa chọn. Điều này cho phép Người lập chỉ mục tăng thu nhập của họ.

Người lập chỉ mục đặt Tỷ lệ hoa hồng của Người lập chỉ mục (ICR), là tỷ lệ phần trăm mà Người lập chỉ mục kiếm được. Phần còn lại sau đó được chia sẻ giữa Người lập chỉ mục và tất cả Người ủy quyền theo tỷ lệ theo số tiền đặt cọc/ủy quyền. Do đó, Người lập chỉ mục cần quyết định tỷ lệ lợi nhuận mà Người lập chỉ mục muốn giữ lại so với số tiền chia sẻ với Người ủy quyền của họ. ICR thấp sẽ hấp dẫn hơn đối với Người ủy quyền.

Ví dụ: Người lập chỉ mục A đã đặt ICR là 80% và đã nhận được SQT từ 8 Người ủy quyền. Điều này có nghĩa là 8 Người ủy quyền cộng với chính Người lập chỉ mục, sẽ được thưởng một phần trong số 20% còn lại của những gì Người lập chỉ mục đã kiếm được. Cổ phần sẽ được chia theo tỷ lệ với nhau. Lưu ý rằng Người ủy quyền phải ủy quyền mã thông báo của họ cho toàn bộ Chu kỳ để đủ điều kiện nhận những phần thưởng này. Để biết thêm thông tin về phần thưởng Người ủy quyền, hãy xem [Người ủy quyền](./delegators.md).

## Trở thành Người lập chỉ mục

Để trở thành Người lập chỉ mục trên Mạng SubQuery, Người lập chỉ mục phải có phần cứng cần thiết, chạy các dịch vụ SubQuery được yêu cầu, có mạng truy cập công cộng qua IP tĩnh hoặc tên miền và đăng ký làm Người lập chỉ mục.

### Bộ kỹ năng lập chỉ mục

Nói chung, một Người lập chỉ mục phải là một người sử dụng máy tính thành thạo về mặt kỹ thuật. Tuy nhiên, sự đơn giản của mạng SubQuery và các khuôn khổ được đề xuất cho phép ngay cả một nhà phát triển junior cũng có thể tham gia thành công.

Người dùng cơ bản phải quen thuộc với việc cung cấp và quản lý máy chủ, cài đặt các công cụ SubQuery CLI, quản lý cơ sở dữ liệu và mạng cơ bản. Những người dùng có kinh nghiệm hơn có thể chạy các nút trong cụm môi trường, kết hợp giám sát và cảnh báo cũng như quản lý mạng nâng cao hơn.

Cuối cùng, các bên quan tâm nên chuẩn bị đầu tư thời gian vào việc duy trì các nút lập chỉ mục và cơ sở hạ tầng của họ.

### Yêu cầu đặt cược bắt buộc

Người lập chỉ mục dự kiến sẽ phải đặt cược và duy trì một số lượng tối thiểu các mã thông báo. Điều này nhằm đảm bảo rằng Người lập chỉ mục chấp nhận một số rủi ro trong cuộc chơi và cam kết hỗ trợ mạng. SubQuery vẫn chưa xác định được điều này nhưng một trong những [triết lý thiết kế](./design-philosophy.md) của chúng tôi là điều này càng thấp và càng dễ tiếp cận càng tốt.

Nếu Người lập chỉ mục trải qua một sự kiện có thể xử lý được và số dư SQT đặt cược của họ giảm xuống dưới mức tối thiểu được yêu cầu, họ sẽ phải nạp tiền vào SQT đã đặt cọc để tiếp tục kiếm phần thưởng từ công việc của mình.

### Yêu cầu phần cứng

Người lập chỉ mục có thể đầu tư vào phần cứng cơ sở hạ tầng của riêng họ hoặc thuê cơ sở hạ tầng từ AWS, Google Cloud, Digital Ocean, Microsoft Azure, v. v.

### Yêu cầu bảo trì/vận hành

Dưới đây là một số yêu cầu về bảo trì và/hoặc vận hành mà Người lập chỉ mục nên mong đợi:

- Luôn nâng cấp lên phiên bản phần mềm Subquery mới nhất
- Xác định và tận dụng các cơ hội lập chỉ mục mới
- Cập nhật phiên bản dự án lên mới nhất và lập chỉ mục khi cần thiết
- Bảo trì cơ sở hạ tầng
  - Liên tục theo dõi và tăng kích thước ổ cứng
  - Truy vấn kích thước phù hợp và tính toán lập chỉ mục dựa trên lưu lượng truy cập
  - Tăng các dịch vụ truy vấn để tăng lưu lượng truy cập vào

### Cơ sở hạ tầng

Yêu cầu cơ sở hạ tầng tối thiểu bao gồm:

- Ít nhất một nút tính toán để chạy các dịch vụ sau:
  - [Dịch vụ nút (lập chỉ mục)](https://www.npmjs.com/package/@subql/node)
  - [Dịch vụ truy vấn](https://www.npmjs.com/package/@subql/query)
  - [Dịch vụ điều phối lập chỉ mục](https://www.npmjs.com/package/@subql/indexer-coordinator)
- Một nút cơ sở dữ liệu để chạy Postgresql db (v12 trở lên).

Thông tin chi tiết hơn sẽ sớm công bố.

## Bảo mật & Cân nhắc về hiệu suất

Các cân nhắc về bảo mật và hiệu suất như sau.

### Ví vận hành

Việc lưu trữ an toàn cụm từ bảo mật khôi phục ví của Người lập chỉ mục rất được khuyến khích.

### Tường lửa

Người lập chỉ mục cần phải lưu ý đến vấn đề bảo mật. Bảo mật cơ sở hạ tầng, đặc biệt là tường lửa, nên được thực hiện để ngăn chặn truy cập công khai với các cổng cá nhân.

Mật khẩu an toàn nên được sử dụng theo mặc định và các chính sách xoay vòng mật khẩu nên được xem xét.

### Hiệu suất của người lập chỉ mục

Để tạo ra hiệu suất mong muốn, Người lập chỉ mục cần xem xét các yếu tố khác nhau như:

- sự cân bằng giữa cổ phần của chính họ và cổ phần của Người ủy quyền.
- loại hợp đồng đang được phục vụ. Người lập chỉ mục sẽ nhận được tất cả các khoản phí truy vấn nếu đó là hợp đồng đã đóng. Nếu nó đang mở, thì phần thưởng của Người lập chỉ mục sẽ phụ thuộc vào số lượng Người lập chỉ mục khác.
- đáp ứng các thông số kỹ thuật của Thỏa thuận mức dịch vụ (SLA) (để tránh bị phạt nặng)
- tính chính xác của dữ liệu được cung cấp để tránh bị phạt

## Chọn các dự án SubQuery để lập chỉ mục

Có một số chỉ báo mà Người lập chỉ mục cần xem xét khi chọn dự án SubQuery để lập chỉ mục.

### Cơ hội phí truy vấn

Một số dự án sẽ có kế hoạch mở hoặc đóng được quảng cáo bởi người tiêu dùng.

Khi Người tiêu dùng quảng cáo kế hoạch mở hoặc đóng cho một dự án, cuối cùng họ chỉ định số tiền họ sẵn sàng trả cho một lượng yêu cầu nhất định. Người tiêu dùng càng sẵn sàng trả nhiều tiền, thì dự án càng hấp dẫn đối với Người lập chỉ mục. Nó cũng cung cấp niềm tin rằng có thể sẽ có doanh thu định kỳ từ dự án SubQuery này.

### Độ phức tạp của dự án

Các dự án sẽ khác nhau về yêu cầu tính toán. Các dự án đơn giản sẽ chỉ lập chỉ mục một vài thông số trong khi các dự án phức tạp hơn sẽ đòi hỏi nhiều tài nguyên tính toán hơn và băng thông nhiều hơn. Người lập chỉ mục cần hiểu mức độ phức tạp của dự án và khả năng phần cứng của nó.

### Cạnh tranh lập chỉ mục

Các dự án phổ biến cung cấp lượng truy vấn cao thu hút một lượng lớn Người lập chỉ mục. Điều này cũng ngụ ý rằng phần thưởng sẽ được chia sẻ cho nhiều người hơn. Một Người lập chỉ mục có thể chia ít hơn đối với một dự án ít phổ biến hơn với phí truy vấn thấp hơn một chút nhưng với số Người lập chỉ mục ít hơn nhiều.

### Chiến lược định giá

Người lập chỉ mục cần phải biết về chi phí hoạt động và thu nhập dự kiến ​​của họ để hiểu điểm hòa vốn của họ. Một số cân nhắc như sau:

- Người lập chỉ mục nên đặt giá kế hoạch của họ như thế nào?
- Người lập chỉ mục có thể chấp nhận thỏa thuận dịch vụ ở mức giá nào?

### Quảng cáo

Người lập chỉ mục cần tự quảng cáo cho Người ủy quyền cũng như Người tiêu dùng. Người lập chỉ mục có thể làm điều này từ trang web của riêng họ, trong các diễn đàn Subquery hoặc bất kỳ nơi nào khác được coi là cần thiết. Một số ví dụ về thông tin cần cung cấp là:

- Nền tảng và kinh nghiệm của người hoặc nhóm của Người lập chỉ mục
- Cách tiếp cận phần cứng và lý do tại sao nó cung cấp hiệu suất vượt trội
- Chính sách hỗ trợ khách hàng hoặc SLA
- Bằng chứng về các màn trình diễn lịch sử

### Hỗ trợ Khách hàng

Người lập chỉ mục được khuyến khích cung cấp một phương thức giao tiếp để khách hàng của họ báo cáo tình trạng không có sẵn và cũng để cung cấp phản hồi.
