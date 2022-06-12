# Triển khai phiên bản mới cho Dự Án SubQuery của bạn

## Hướng Dẫn

Mặc dù bạn luôn có quyền nâng cấp và triển khai các phiên bản mới của dự án SubQuery của mình, nhưng hãy lưu ý trong quá trình này nếu dự án SubQuery của bạn là công khai với toàn thế giới. Một số điểm chính cần lưu ý:

- Nếu nâng cấp của bạn là một thay đổi mang tính đột phá, hãy tạo một dự án mới (ví dụ `Dự Án SubQuery V2 của tôi`) hoặc cung cấp cho cộng đồng của bạn nhiều cảnh báo về sự thay đổi thông qua các kênh truyền thông xã hội.
- Việc triển khai phiên bản dự án SubQuery mới có thể dẫn đến thời gian chết vì phiên bản mới lập chỉ mục chuỗi hoàn chỉnh từ khối genesis.

## Các Thay Đổi Triển Khai

Đăng nhập vào SubQuery Project và chọn dự án bạn muốn triển khai phiên bản mới. Bạn có thể chọn triển khai trên vị trí sản xuất hoặc vị trí dàn dựng. Hai vị trí này là môi trường biệt lập và mỗi vị trí sở hữu cơ sở dữ liệu riêng và đồng bộ hóa độc lập.

Chúng tôi khuyên bạn chỉ nên triển khai vào vùng phân đoạn của mình để kiểm tra giai đoạn cuối cùng hoặc khi bạn cần đồng bộ lại dữ liệu dự án của mình. Sau đó, bạn có thể thăng cấp nó lên bản phát hành với thời gian chết bằng 0. You will find testing is faster when [running a project locally](../run_publish/run.md) as you can more [easily debug issues](../academy/tutorials_examples/debug-projects.md).

Vị trí dàn dựng sẽ hoàn hảo cho việc:

- Xác thực lần cuối các thay đổi đối với Dự án SubQuery của bạn trong một môi trường riêng biệt. Vị trí dàn dựng có một URL khác để xuất bản mà bạn có thể sử dụng trong dApps của mình.
- Khởi động và lập chỉ mục dữ liệu cho một dự án SubQuery được cập nhật để loại bỏ thời gian chết trong dApp của bạn
- Chuẩn bị một bản phát hành mới cho Dự án SubQuery của bạn với chế độ không công khai. Vị trí dàn dựng không được hiển thị công khai trong Explorer và có một URL duy nhất chỉ hiển thị cho bạn.

![Vị trí dàn dựng](/assets/img/staging_slot.png)

#### Nâng cấp lên Dịch vụ lập chỉ mục và truy vấn mới nhất

Nếu bạn muốn nâng cấp lên trình lập chỉ mục mới nhất ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) hoặc dịch vụ truy vấn ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) để có lợi thế về khả năng cải thiện độ ổn định và hiệu năng thông thường của chúng tôi, chỉ cần chọn ra các phiên bản mới hơn trong các gói của chúng tôi và lưu lại. Bước này sẽ chỉ tốn vài phút.

#### Triển Khai Phiên Bản Mới Dự Án SubQuery của bạn

Điền vào Commit Hash từ GitHub (sao chép toàn bộ commit hash) của phiên bản codebase dự án SubQuery mà bạn muốn triển khai. Bước này sẽ làm tốn nhiều thời gian hơn nữa tùy thuộc vào thời gian cần để lập chỉ mục chuỗi hiện tại. Bạn luôn có thể báo cáo lại tại đây để biết tiến độ.

## Các Bước Tiếp Theo - Kết nối đến Dự Án của bạn

Sau khi việc triển khai đã thành công và các nút của chúng ta đã lập chỉ mục dữ liệu của bạn trên chuỗi, bạn sẽ có thể kết nối với dự án của mình thông qua hiển thị của điêm cuối truy vấn GraphQL.

![Các dự án đang được triển khai và đồng bộ](/assets/img/projects-deploy-sync.png)

Ngoài ra, bạn có thể nhấp vào ba dấu chấm bên cạnh tiêu đề dự án của mình và xem nó trên SubQuery Explorer. There you can use the in browser playground to get started - [read more about how to user our Explorer here](../run_publish/query.md).
