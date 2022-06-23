# Triết lý thiết kế của Mạng SubQuery

Nguyên tắc với Mạng SubQuery là sự đơn giản và linh hoạt cho các trường hợp sử dụng, phương thức thanh toán và mạng khác nhau. Trong khi các dịch vụ dữ liệu khác có nhiều người tham gia mạng lớn khác nhau, SubQuery tập trung vào ba dịch vụ chính. Trong khi các mạng khác có cơ chế báo hiệu thuật toán phức tạp, SubQuery dựa trên tín hiệu cơ bản nhất, nhu cầu của người tiêu dùng. Trong khi các mạng khác chỉ cung cấp một loại mô hình thanh toán (thường là PAYG), SubQuery cung cấp một số tùy chọn dựa trên đăng ký nâng cao cho Người tiêu dùng và Người lập chỉ mục, và cuối cùng, trong khi các mạng khác chỉ hỗ trợ một chuỗi lớp 1, SubQuery được thiết kế để đa chuỗi ngay từ đầu.

## Thiết kế Đa chuỗi

*SubQuery tin tưởng vào ý tưởng rằng một cộng đồng các blockchain, làm việc cùng nhau để khuyến khích việc áp dụng web3 vào đời sống, là tương lai của thế giới*

SubQuery có nguồn gốc từ hệ sinh thái Polkadot, đó là ngôi nhà của chúng tôi và sẽ là vị trí của Mạng SubQuery. Tiền đề cốt lõi của Polkadot là tạo ra một cộng đồng lớn mạnh gồm các nhà phát triển, người dùng và doanh nghiệp sẽ khai thác khả năng tương tác đa chuỗi của nó. SubQuery tin tưởng vào ý tưởng rằng một cộng đồng các blockchain, làm việc cùng nhau để khuyến khích việc áp dụng web3, là tương lai và Polkadot sẽ là người dẫn đầu trong sáng kiến ​​đó.

Nhưng tương lai là đa chuỗi. SubQuery biết rằng sẽ có nhiều blockchains khác nhau làm việc cùng nhau để giải quyết các vấn đề khác nhau. Kế hoạch là sử dụng SubQuery và điều chỉnh nó để hoạt động cho các blockchain khác không có đủ giải pháp lập chỉ mục. Cách tiếp cận đa chuỗi cần thiết để làm cho nó hoạt động với Polkadot đồng nghĩa là SubQuery là hoàn toàn phù hợp cho thách thức này.

Mạng SubQuery được thiết kế để hỗ trợ bất kỳ Dự án SubQuery nào từ bất kỳ mạng Lớp 1 nào (trong Polkadot hay không). Nó sẽ được thiết kế và xây dựng để trở thành đa chuỗi ngay từ đầu, nơi bạn sẽ thấy các dự án từ một mạng lưới được lập chỉ mục cùng với các dự án từ mạng khác.

SubQuery hiện hỗ trợ cả Polkadot, Avalanche và Terra. Mong đợi sự hỗ trợ layer-1 khác trong những tháng tới.

## Đơn giản và dễ tiếp cận

*Mạng SubQuery được thiết kế để trở thành nhà cung cấp dữ liệu của mọi người.*

Nguyên tắc với Mạng SubQuery là sự đơn giản. Theo ý kiến của SubQuery rằng các phương pháp tiếp cận khác đối với các dịch vụ truy vấn dữ liệu phi tập trung là quá phức tạp và khiến người tham gia khó dự đoán lợi tức đầu tư của họ. Mục đích là giúp bạn dễ dàng tham gia vào mạng lưới và dự báo rõ ràng lợi nhuận tiềm năng trong tương lai của bạn.

Theo kế hoạch, SubQuery Network sẽ không yêu cầu ngưỡng đặt cược cao để tham gia hoặc đầu tư lớn vào phần cứng. Trọng tâm sẽ là làm cho SubQuery dễ dàng tham gia và xây dựng hơn các nhà cung cấp dữ liệu khác - thành công của SubQuery phụ thuộc vào sự thành công của những người khác tạo ra tương lai trên đó.

Điều này có nghĩa là mục tiêu thiết kế là làm cho mọi người tham gia dễ dàng nhất có thể. Bạn không cần phải là nhà phát triển hoặc có kiến thức sâu về mô hình tokenomocs, vẫn có thể dễ dàng tham gia với tư cách là Người uỷ quyền. Là Người tiêu dùng, bạn cũng có nhiều lựa chọn thanh toán phù hợp nhất với nhu cầu của mình. Cuối cùng, trọng tâm chính của SubQuery Foundation là đảm bảo có đủ sự hỗ trợ để bất kỳ ai, từ một nhóm chuyên gia về blockchain đến một nhà phát triển mới, đều có thể xây dựng dự án SubQuery của riêng họ.

## Linh hoạt

*SubQuery chỉ là một công cụ trong tay cộng đồng của chúng ta, vô số cơ hội tồn tại chỉ có giới hạn bởi sự sáng tạo của con người.*

Tiềm năng của SubQuery có thể nằm ở tính linh hoạt của nó - người dùng sẽ có quyền tự do điều chỉnh và chuyển đổi dữ liệu phi tập trung cho phù hợp với nhu cầu của họ. các nhà phát triển dApp cần dữ liệu ở một định dạng cụ thể được thiết kế riêng cho dApp của họ để dễ phát triển và tạo sự khác biệt với những dữ liệu khác.

Không giống như các nhà cung cấp dịch vụ API phi tập trung “hợp nhất” khác, SubQuery là mã nguồn mở, vì vậy Người tiêu dùng sẽ có quyền tự do xác định bộ dữ liệu của họ cụ thể cho nhu cầu của họ. Thay vì phải kết hợp các truy vấn từ các điểm cuối API khác nhau - người sáng tạo và người tiêu dùng của các dự án SubQuery có thể tự xác định hình dạng của các mô hình dữ liệu API của họ. Nó tiết kiệm thời gian, tiền bạc và cung cấp trải nghiệm tốt hơn rất nhiều cho người dùng cuối.

## Báo hiệu nhu cầu tự nhiên và các tùy chọn thanh toán khác nhau

Với các thị trường như những gì SubQuery đang đề xuất, nơi có cả người mua và người bán đang cố gắng trao đổi dữ liệu, báo hiệu nhu cầu về nguồn cung trong tương lai có xu hướng là một vấn đề khó khăn. Các mạng khác tạo ra một vai trò nhân tạo trong nỗ lực dự đoán nhu cầu trong tương lai và chúng sẽ được thưởng khi nhu cầu trong tương lai đó thành hiện thực. Kế hoạch là thực hiện một cách tiếp cận khác, một cách tiếp cận yêu cầu báo hiệu nhu cầu tự nhiên từ trước.

Người tiêu dùng có thể tận dụng Thỏa thuận mở hoặc kín để chỉ ra và cam kết cụ thể nhu cầu đối với Dự án SubQuery mới. Điều này sẽ tạo điều kiện và khuyến khích cung cấp ở mức giá và khối lượng cố định (về cơ bản giúp đảm bảo phần thưởng được phân bổ trước cho Người lập chỉ mục của Dự án SubQuery) và cung cấp sự chắc chắn về giá cả và dịch vụ cho cả hai bên. Điều này có thể được sử dụng để thu hút Người lập chỉ mục vào các Dự án SubQuery mới cũng như thu hút Người lập chỉ mục bổ sung vào các Dự án SubQuery hiện có nhưng không có tính cạnh tranh.

Nó cũng cung cấp một số tùy chọn dựa trên đăng ký nâng cao cho Người tiêu dùng và Người lập chỉ mục. Một số bên có thể được hưởng lợi từ sự chắc chắn của phần thưởng được cung cấp bởi các thỏa thuận kín và khả năng dự đoán của các chi phí định kỳ. Thay vào đó, những người khác có thể thích tìm kiếm dữ liệu có giá cả phải chăng nhất bằng cách thực hiện các thỏa thuận định kỳ với khối lượng lớn hoặc giá giao ngay thấp trên thị trường Pay as you Go.

## Mất cân bằng giữa Người lập chỉ mục/Người ủy quyền

Trong số một số đối thủ cạnh tranh, có thể thấy rằng có sự mất cân bằng nghiêm trọng giữa Người lập chỉ mục và Người ủy quyền về khả năng thay đổi tỷ lệ ủy quyền mà không cần cảnh báo. SubQuery đã cố gắng cân bằng sự mất cân bằng này bằng cách yêu cầu Người lập chỉ mục quảng cáo tăng Tỷ lệ hoa hồng của Người lập chỉ mục trong toàn bộ Chu kỳ đặt cược. Người ủy quyền cũng có thể tự do rút các mã thông báo được ủy quyền của họ tại bất kỳ thời điểm nào trong Chu kỳ đặt cược, nhưng họ sẽ mất bất kỳ phần thưởng nào mà họ có thể đủ điều kiện nhận trong Chu kỳ đó.

## Ưu đãi cho Hiệu suất Truy vấn

Để trở thành một nền tảng có hiệu suất cao, nhiệm vụ quan trọng - Mạng SubQuery phải hoạt động ở cấp cao nhất. Đó là lý do tại sao quá trình khám phá Trình lập chỉ mục sẽ bao gồm dữ liệu hiệu suất (độ trễ và thời gian hoạt động) cho tất cả Người lập chỉ mục và chúng tôi sẽ thực hiện các bước để đảm bảo Người tiêu dùng báo cáo về tốc độ truy vấn và hiệu suất càng thường xuyên càng tốt.

Các công cụ cũng có thể được cung cấp để giới hạn tính khả dụng của Người lập chỉ mục ở một khu vực địa lý nhất định để họ có thể tập trung vào việc cung cấp dịch vụ tốt nhất cho khu vực đó, thu hút nhiều yêu cầu nhất và có khả năng tối đa hóa phần thưởng cho những đóng góp của họ. Điều này sẽ cho phép Người lập chỉ mục lớn hơn và trưởng thành hơn chạy cơ sở hạ tầng theo vị trí cụ thể trên toàn thế giới.
