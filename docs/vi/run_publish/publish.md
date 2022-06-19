# Xuất bản Dự Án SubQuery của bạn

## Lợi ích của việc lưu trữ dự án của bạn với SubQuery

- Chúng tôi sẽ chạy các dự án SubQuery cho bạn trong một dịch vụ công khai có hiệu suất cao, có thể mở rộng và được quản lý
- Dịch vụ này đang được cung cấp đến cộng đồng miễn phí!
- Bạn có thể tạo ra các dự án công khai do đó chúng sẽ được liệt kê trong [SubQuery Explorer](https://explorer.subquery.network) và bất cứ ai trên khắp thế giới cũng đều có thể xem chúng
- Chúng tôi được tích hợp với GitHub, vì thế bất kỳ ai trong các tổ chức GitHub của bạn cũng sẽ xem được các dự án đã chia sẻ của tổ chức

## Tạo dự án đầu tiên của bạn trong Dự án SubQuery

### Lưu trữ Codebase dự án

Có hai cách để bạn có thể lưu trữ codebase của dự án SubQuery của mình trước khi xuất bản.

** GitHub **: Codebase của dự án của bạn phải nằm trong kho lưu trữ GitHub công khai

**IPFS**: Codebase dự án của bạn có thể được lưu trữ trong IPFS, bạn có thể làm theo hướng dẫn lưu trữ IPFS của chúng tôi để xem cách [xuất bản lần đầu lên IPFS](ipfs.md)

### Đăng nhập vào Các Dự Án SubQuery

Trước khi bắt đầu, vui lòng đảm bảo rằng codebase dự án SubQuery của bạn trực tuyến trong kho lưu trữ GitHub công khai hoặc trên IPFS. Tệp tin `schema.graphql` phải được nằm trong thư mục gốc của bạn.

Để tạo ra dự án đầu tiên, hãy đến [project.subquery.network](https://project.subquery.network). Bạn sẽ cần xác thực tài khoản GitHub của mình để đăng nhập.

Trong lần đăng nhập đầu tiên, bạn sẽ được yêu cầu cấp quyền cho SubQuery. Chúng tôi chỉ cần địa chỉ email của bạn để định dạnh tài khoản của bạn, và chúng tôi không sử dụng bất kỳ dữ liệu nào từ tài khoản GitHub của bạn vì bất kỳ lý do gì. Trong bước này, bạn cũng có thể yêu cầu cấp quyền truy cập đến tài khoản GitHub Organization của bạn để đăng các dự án SubQuery dưới GitHub Organization của mình thay vì tài khoản cá nhân.

![Thu hồi chấp thuận từ một tài khoản GitHub](/assets/img/project_auth_request.png)

SubQuery Projects là nơi bạn quản lý tất cả các dự án của bạn đã được tải lên nền tảng SubQuery. Bạn có thể tạo, xóa, và thậm chí nâng cấp các dự án từ ứng dụng này.

![Đăng Nhập Các Dự Án](/assets/img/projects-dashboard.png)

Nếu bạn có kết nối các tài khoản GitHub Organization, bạn có thể sử dụng tính năng chuyển đổi ở đầu trang để thay đổi giữa tài khoản cá nhân và tài khoản GitHub Organization. Các dự án được tạo ra trong tài khoản GitHub Organization đều được chia sẻ giữa các thành viên trong GitHub Organization đó. Để kết nối tài khoản GitHub Organization của bạn, bạn có thể [làm theo các bước tại đây](#add-github-organization-account-to-subquery-projects).

![Chuyển đổi giữa các tài khoản GitHub](/assets/img/projects-account-switcher.png)

### Tạo Dự Án Đầu Tiên

Chúng ta hãy bắt đầu bằng cách nhấp vào "Create Project". Bạn sẽ được đưa đến biểu mẫu Dự Án Mới. Vui lòng nhập vào những thứ sau đây (bạn có thể thay đổi trong tương lai):

- **Tài khoản GitHub:** Nếu bạn có nhiều hơn một tài khoản GitHub, hãy chọn ra tài khoản mà dự án sẽ được tạo ra bởi nó. Các dự án được tạo ra trong tài khoản GitHub Organization đều được chia sẻ giữa các thành viên trong cùng tổ chức.
- **Tên dự án**
- **Phụ đề**
- **Mô tả**
- **URL Kho Lưu Trữ GitHub:** Đây phải là một URL GitHub hợp lệ chỉ đến kho lưu trữ công khai có chứa dự án SubQuery của bạn. Tập tin `schema.graphql` phải nằm trong thư mục gốc của bạn ([tìm hiểu thêm về cấu trúc thư mục gốc](../create/introduction.md#directory-structure)).
- **Cơ sở dữ liệu:** Khách hàng cao cấp có thể truy cập cơ sở dữ liệu chuyên dụng để lưu trữ các dự án SubQuery sản xuất từ đó. Nếu điều này khiến bạn quan tâm, bạn có thể liên hệ với [sales@subquery.network](mailto:sales@subquery.network) để kích hoạt cài đặt này.
- **Nguồn triển khai:** Bạn có thể chọn triển khai dự án từ kho lưu trữ GitHub hoặc triển khai cách khác từ IPFS CID, xem hướng dẫn của chúng tôi về [lưu trữ với IPFS.](ipfs.md)
- **Ẩn dự án:** Nếu được chọn, điều này sẽ ẩn dự án khỏi trình khám phá SubQuery công khai. Hãy bỏ chọn mục này nếu bạn muốn chia sẻ SubQuery của mình với cộng đồng! ![Tạo Dự Án đầu tiên của bạn](/assets/img/projects-create.png)

Hãy tạo dự án của bạn và bạn sẽ thấy nó trong danh sách Các Dự Án SubQuery của bạn. _Chúng ta sắp xong rồi! Chúng ta chỉ cần triển khai một phiên bản mới của nó._

![Tạo Dự án mà không cần triển khai](/assets/img/projects-no-deployment.png)

### Triển khai phiên bản đầu tiên của bạn

Trong khi đang khởi tạo, dự án sẽ thiết lập hành vi hiển thị của nó, bạn phải triển khai một phiên bản của nó trước khi dự án đi vào vận hành. Triển khai một phiên bản sẽ kích hoạt khởi động lập chỉ mục SubQuery mới để bắt đầu, và cài đặt dịch vụ truy vấn để chấp nhận các yêu cầu từ GraphQl. Bạn cũng có thể triển khai các phiên bản mới đối với các dự án hiện tại tại đây.

Cùng với dự án mới của mình, bạn sẽ thấy một nút bấm Deploy New Version. Nhấp vào nút này, và điền vào các thông tin bắt buộc để thực hiện triển khai:

- **Branch:** Từ GitHub, chọn nhánh của dự án mà bạn muốn triển khai
- **Commit Hash:** Từ GitHub, hãy chọn commit cụ thể của phiên bản codebase dự án SubQuery mà bạn muốn triển khai
- **IPFS:** Nếu triển khai từ IPFS, hãy dán CID triển khai IPFS của bạn (không có `ipfs: //` đứng đầu)
- **Override Network and Dictionary Endpoints:** Bạn có thể ghi đè các điểm cuối trong tệp kê khai dự án của mình tại đây
- **Indexer Version:** Đây là phiên bản của dịch vụ node SubQuery mà bạn muốn chạy SubQuery trên đó. Xem [`@subql/node`](https://www.npmjs.com/package/@subql/node)
- **Query Version:** Đây là phiên bản của dịch vụ truy vấn SubQuery mà bạn muốn chạy SubQuery này. Xem [`@subql/query`](https://www.npmjs.com/package/@subql/query)

![Triển khai Dự Án đầu tiên của bạn](https://static.subquery.network/media/projects/projects-first-deployment.png)

Nếu triển khai thành công, bạn sẽ thấy indexer bắt đầu làm việc và báo cáo về tiến độ lập chỉ mục cho chuỗi hiện tại. Tiến trình này có thể mất nhiều thời gian cho tới khi nó đạt đến 100%.

## Các Bước Tiếp Theo - Kết nối đến Dự Án của bạn

Sau khi việc triển khai đã thành công và các node của chúng ta đã lập chỉ mục dữ liệu của bạn trên chuỗi, bạn sẽ có thể kết nối với dự án của mình thông qua hiển thị của điểm cuối truy vấn GraphQL.

![Các dự án đang được triển khai và đồng bộ](/assets/img/projects-deploy-sync.png)

Ngoài ra, bạn có thể nhấp vào ba dấu chấm bên cạnh tiêu đề dự án của mình và xem nó trên SubQuery Explorer. Tại đó bạn có thể sử dụng nền tảng trong trình duyệt để tiến hành - [tìm hiểu nhiều hơn về cách sử dụng Explorer của chúng tôi tại đây](../run_publish/query.md).

![Các dự án trong trình khám phá SubQuery](/assets/img/projects-explorer.png)

## Thêm Tài Khoản GitHub Organization vào các Dự Án SubQuery

Thông thường, bạn sẽ xuất bản dự án SubQuery của bạn dưới tên tài khoản GitHub Organization thay vì tài khoản GitHub cá nhân của bạn. Bạn có thể thay đổi tài khoản hiện đang chọn trên [SubQuery Projects](https://project.subquery.network) bất cứ lúc nào bằng cách sử dụng tính năng chuyển đổi tài khoản.

![Chuyển đổi giữa các tài khoản GitHub](/assets/img/projects-account-switcher.png)

Nếu bạn không thể nhìn thấy tài khoản GitHub Organization của mình được liệt kê trong phần chuyển đổi tài khoản, bạn có thể cần phải cấp quyền truy cập cho SubQuery tới GitHub Organization của bạn (hoặc yêu cầu quyền này từ một quản trị viên). Để thực hiện việc này, trước tiên bạn cần thu hồi quyền từ tài khoản GitHub của mình đối với Ứng dụng SubQuery. Để thực hiện việc này, hãy đăng nhập vào phần cài đặt tài khoản của bạn trong GitHub, đến Applications, và bên dưới thẻ Authorized Oauth Apps, thu hồi SubQuery - [bạn có thể làm theo các bước chính xác tại đây](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Đừng lo, việc này sẽ không xóa đi dự án SubQuery của bạn và bạn sẽ không bị mất bất kỳ dữ liệu nào.**

![Thu hồi truy cập đối với tài khoản GitHub](/assets/img/project_auth_revoke.png)

Sau khi bạn đã thu hồi quyền truy cập, hãy đăng xuất ra khỏi [Dự án SubQuery](https://project.subquery.network) và đăng nhập vào lại. Bạn sẽ được điều hướng đến một trang có tiêu đề _Authorize SubQuery_ đây là trang bạn có thể yêu cầu cấp quyền truy cập SubQuerry đến tài khoản GitHub Organization của bạn. Nếu bạn không có các quyền quản trị, bạn cần phải yêu cầu một quản trị quyên cấp các quyền này cho bạn.

![Thu hồi chấp thuận từ một tài khoản GitHub](/assets/img/project_auth_request.png)

Sau khi yêu cầu đã được chấp thuận bởi quản trị viên (hoặc nếu bạn có thể tự cấp quyền cho mình), bạn sẽ thấy tài khoản GitHub Organization chính xác trong khu vực chuyển đổi tài khoản.
