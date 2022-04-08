# Các câu hỏi thường gặp

## SubQuery là gì?

SubQuery là một dự án mã nguồn mở cho phép các nhà phát triển chạy trình lập chỉ mục, chuyển đổi, và truy vấn dữ liệu trên chuỗi Substrate để chạy các ứng dụng của họ.

SubQuery cũng cung cấp dịch vụ lưu trữ miễn phí, công suất lớn cho các dự án của các nhà phát triển; trút bỏ trách nhiệm của các nhà sản xuất trong việc quản lý cơ sở hạ tầng nữa, để họ tập trung làm việc mình giỏi nhất: lập trình.

## Cách tốt nhất để bắt đầu sử dụng SubQuery là gì?

Cách tốt nhất để bắt đầu sử dụng SubQuery là thực hiện [Hướng dẫn Hello World](../quickstart/helloworld-localhost.md) của chúng tôi. Đây là một hướng dẫn đơn giản trong 5 phút: tải xuống mẫu khởi động, xây dựng dự án và sau đó sử dụng Docker để chạy một node trên máy chủ của bạn và chạy một truy vấn đơn giản.

## Làm cách nào để tôi có thể đóng góp hoặc gửi phản hồi cho SubQuery?

Chúng tôi rất mong nhận được ý kiến đóng góp và phản hồi từ cộng đồng. Để đóng góp vào việc phát triển, hãy tạo bản sao cho những phần bạn quan tâm và đưa ra những thay đổi. Sau đó hãy sử dụng chức năng Pull Request hay gọi tắt là PR. À, đừng quên chạy thử đấy nhé! Bạn nên tham khảo hướng dẫn đóng góp của chúng tôi (TBA).

Để gửi phản hồi, hãy liên hệ với chúng tôi qua email hello@subquery.network hoặc truy cập [kênh discord](https://discord.com/invite/78zg8aBSMG) của chúng tôi

## Chi phí để lưu trữ dự án của tôi trong SubQuery Projects là bao nhiêu?

Việc lưu trữ dự án trên SubQuery là hoàn toàn miễn phí - đây là cách chúng tôi cống hiến cho cộng đồng. Để tìm hiểu cách lưu trữ dự án của bạn với chúng tôi, vui lòng xem hướng dẫn [Hello World (SubQuery hosted)](../quickstart/helloworld-hosted.md).

## Các vị trí triển khai là gì?

Vị trí triển khai là một tính năng trong [SubQuery Projects](https://project.subquery.network) gần giống với môi trường phát triển. Ví dụ, trong bất kỳ tổ chức phần mềm nào tối thiểu đều có môi trường phát triển và môi trường sản xuất (không tính localhost). Thông thường, nó bao gồm các môi trường bổ sung như staging (dàn dựng) và pre-pod (tiền sản xuất) hoặc thậm chí là QA, tùy thuộc vào nhu cầu của tổ chức và sự phát triển của chúng được thiết lập.

SubQuery hiện có sẵn hai vị trí. Một vị trí dàn dựng (staging slot) và một vị trí sản xuất (production slot). Điều này cho phép các nhà phát triển triển khai SubQuery của họ vào môi trường dàn dựng và để mọi thứ diễn ra tốt đẹp, sau đó chọn "thúc đẩy sản xuất" chỉ bằng một nút bấm.

## Ưu điểm của vị trí dàn dựng là gì?

Lợi ích chính của việc sử dụng vị trí dàn dựng là nó cho phép bạn chuẩn bị một bản phát hành mới cho dự án SubQuery của mình không cần công khai. Bạn có thể đợi vị trí dàn dựng lập chỉ mục lại tất cả dữ liệu mà không ảnh hưởng đến các ứng dụng sản xuất của bạn.

Vị trí dàn dựng không được hiển thị công khai trong [ Explorer ](https://explorer.subquery.network/) và có một URL duy nhất chỉ hiển thị cho bạn. Và tất nhiên, môi trường riêng biệt này cho phép bạn kiểm tra mã mới của mình mà không ảnh hưởng đến quá trình sản xuất.

## What are Polkadot's Extrinsics?

Nếu bạn đã quen thuộc với các khái niệm blockchain, bạn có thể nghĩ thông tin ngoại lai gần giống với các giao dịch. Tuy nhiên, về mặt chính thức, thông tin ngoại lai là một đoạn thông tin đến từ bên ngoài chuỗi và được bao gồm trong một block. Có ba loại thông tin ngoại lai. Bao gồm: thông tin cố hữu, giao dịch đã ký và giao dịch chưa ký.

Thông tin ngoại lai cố hữu là những phần thông tin không được ký và chỉ được thêm vào block bởi tác giả của block.

Giao dịch ngoại lai có chữ ký là các giao dịch có chứa chữ ký của tài khoản thực hiện giao dịch. Họ phải trả một khoản phí để giao dịch được đưa vào chuỗi.

Các giao dịch ngoại lai không có chữ ký là các giao dịch không có chữ ký của tài khoản đã thực hiện giao dịch. Unsigned transactions extrinsics should be used with care because there is nobody paying a fee, becaused they are not signed. Do đó, hàng đợi giao dịch thiếu logic kinh tế sẽ ngăn chặn thư rác.

Để biết thêm thông tin chi tiết, hãy nhấp vào [đây](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics).

## Điểm cuối của mạng Kusama là gì?

Network.endpoint cho mạng Kusama là `wss: //kusama.api.onfinality.io/public-ws`.

## Điểm cuối cho mạng mainnet Polkadot là gì?

Network.endpoint cho mạng Polkadot là `wss: //polkadot.api.onfinality.io/public-ws`.

## Làm cách nào để phát triển lặp đi lặp lại lược đồ dự án của tôi?

Một vấn đề đã biết với việc phát triển lược đồ dự án đang thay đổi là khi chạy nút Subquery của bạn để thử nghiệm, các khối được lập chỉ mục trước đó sẽ không tương thích với lược đồ mới của bạn. Để phát triển lặp đi lặp lại các lược đồ, các khối được lập chỉ mục được lưu trữ trong cơ sở dữ liệu phải được xóa, điều này có thể đạt được bằng cách khởi chạy nút của bạn với cờ `--force-clean`. Ví dụ:

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

Lưu ý rằng bạn nên sử dụng `--force-clean` khi thay đổi `startBlock` trong tệp kê khai dự án (`project.yaml`) để bắt đầu lập chỉ mục lại từ khối đã định cấu hình. Nếu `startBlock` được thay đổi mà không có `--force-clean` của dự án thì trình lập chỉ mục sẽ tiếp tục lập chỉ mục với `startBlock` đã định cấu hình trước đó.
