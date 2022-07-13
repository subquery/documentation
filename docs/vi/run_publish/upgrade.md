# Triển khai phiên bản mới cho Dự Án SubQuery của bạn

## Hướng Dẫn

Mặc dù bạn luôn có quyền nâng cấp và triển khai các phiên bản mới của dự án SubQuery của mình, nhưng hãy lưu ý trong quá trình này nếu dự án SubQuery của bạn là công khai với toàn thế giới. Một số điểm chính cần lưu ý:

- Nếu nâng cấp của bạn là một thay đổi mang tính đột phá, hãy tạo một dự án mới (ví dụ `Dự Án SubQuery V2 của tôi`) hoặc cung cấp cho cộng đồng của bạn nhiều cảnh báo về sự thay đổi thông qua các kênh truyền thông xã hội.
- Việc triển khai phiên bản dự án SubQuery mới có thể dẫn đến thời gian chết vì phiên bản mới lập chỉ mục chuỗi hoàn chỉnh từ khối genesis.

## Các Thay Đổi Triển Khai

Có hai phương pháp để triển khai một phiên bản mới của dự án của bạn cho Dịch vụ quản lý SubQuery, bạn có thể sử dụng giao diện người dùng hoặc trực tiếp thông qua công cụ `subql` cli.

### Sử dụng giao diện người dùng

Đăng nhập vào SubQuery Project và chọn dự án bạn muốn triển khai phiên bản mới. Bạn có thể chọn triển khai trên vị trí sản xuất hoặc vị trí dàn dựng. Hai vị trí này là môi trường biệt lập và mỗi vị trí sở hữu cơ sở dữ liệu riêng và đồng bộ hóa độc lập.

Chúng tôi khuyên bạn chỉ nên triển khai vào vị trí dàn dựng của mình để kiểm tra giai đoạn cuối cùng hoặc khi bạn cần đồng bộ lại dữ liệu dự án của mình. Sau đó, bạn có thể nâng cấp nó lên phiên bản sản xuất với thời gian chết bằng 0. Bạn sẽ thấy kiểm tra nhanh hơn khi [chạy một dự án cục bộ](../run_publish/run.md) vì bạn có thể [dễ dàng gỡ lỗi các sự cố](../academy/tutorials_examples/debug-projects.md).

Vị trí dàn dựng sẽ hoàn hảo cho việc:

- Xác thực lần cuối các thay đổi đối với Dự án SubQuery của bạn trong một môi trường riêng biệt. Vị trí dàn dựng có một URL khác để xuất bản mà bạn có thể sử dụng trong dApps của mình.
- Warming up and indexing data for an updated SubQuery project to eliminate downtime in your dApp.
- Chuẩn bị một bản phát hành mới cho Dự án SubQuery của bạn với chế độ không công khai. Vị trí dàn dựng không được hiển thị công khai trong Explorer và có một URL duy nhất chỉ hiển thị cho bạn.

![Vị trí dàn dựng](/assets/img/staging_slot.png)

Điền vào Commit Hash từ GitHub (sao chép toàn bộ commit hash) của phiên bản codebase dự án SubQuery mà bạn muốn triển khai. Bước này sẽ làm tốn nhiều thời gian hơn nữa tùy thuộc vào thời gian cần để lập chỉ mục chuỗi hiện tại. Bạn luôn có thể báo cáo lại tại đây để biết tiến độ.

### Sử dụng CLI

Bạn cũng có thể sử dụng `@subql/cli` để tạo một triển khai mới của dự án cho dịch vụ được quản lý của chúng tôi. Điều này yêu cầu:

- `@subql/cli` phiên bản 1.1.0 trở lên.
- A valid [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ready.

```shell
// Bạn có thể đặt trực tiếp phiên bản Trình lập chỉ mục và Truy vấn của mình
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// HOẶC bạn có thể sử dụng giao diện, nó sẽ xác thực IPFS CID của bạn và hiển thị danh sách các phiên bản image phù hợp với tệp kê khai của bạn 'project.yaml'

$ subql deployment:deploy
```

## Nâng cấp lên Dịch vụ lập chỉ mục và Truy vấn mới nhất

Nếu bạn muốn nâng cấp lên trình lập chỉ mục mới nhất ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) hoặc dịch vụ truy vấn ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) để có lợi thế về khả năng cải thiện độ ổn định và hiệu năng thông thường của chúng tôi, chỉ cần chọn ra các phiên bản mới hơn trong các gói của chúng tôi và lưu lại. Điều này sẽ chỉ gây ra một vài phút ngừng hoạt động khi các dịch vụ chạy dự án của bạn được khởi động lại.

## Các Bước Tiếp Theo - Kết nối đến Dự Án của bạn

Sau khi việc triển khai đã thành công và các nút của chúng ta đã lập chỉ mục dữ liệu của bạn trên chuỗi, bạn sẽ có thể kết nối với dự án của mình thông qua hiển thị của điêm cuối truy vấn GraphQL.

![Các dự án đang được triển khai và đồng bộ](/assets/img/projects-deploy-sync.png)

Ngoài ra, bạn có thể nhấp vào ba dấu chấm bên cạnh tiêu đề dự án của mình và xem nó trên SubQuery Explorer. There you can use the in browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).
