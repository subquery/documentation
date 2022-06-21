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

### Creating Projects using CLI

You can also use `@subql/cli` to create your project
#### Yêu cầu
- `@subql/cli` version 1.1.0 or above.
- Get your [SUBQL_ACCESS_TOKEN](/docs/run_publish/ipfs.md#prepare-your-subqlaccesstoken) ready.

```
// Creating a project using the CLI
$ subql project:create-project

// OR using non-interactive, it will prompt you if the required fields are missing
$ subql project:create-project
    --apiVersion=apiVersion      Api version is default to 2
    --description=description    Enter description
    --gitRepo=gitRepo            Enter git repository
    --org=org                    Enter organization name
    --project_name=project_name  Enter project name
```

### Deploy your first Version

### Tùy chọn 1:

While creating a project will setup the display behaviour of the project, you must deploy a version of it before it becomes operational. Deploying a version triggers a new SubQuery indexing operation to start, and sets up the required query service to start accepting GraphQL requests. You can also deploy new versions to existing projects here.

With your new project, you'll see a Deploy New Version button. Click this, and fill in the required information about the deployment:

- **Branch:** From GitHub, select the branch of the project that you want to deploy from
- **Commit Hash:** From GitHub, select the specific commit of the version of your SubQuery project codebase that you want deployed
- **IPFS:** If deploying from IPFS, paste you IPFS deployment CID (without the leading `ipfs://`)
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here
- **Indexer Version:** This is the version of SubQuery's node service that you want to run this SubQuery on. See [`@subql/node`](https://www.npmjs.com/package/@subql/node)
- **Query Version:** This is the version of SubQuery's query service that you want to run this SubQuery on. See [`@subql/query`](https://www.npmjs.com/package/@subql/query)

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

### Tùy chọn 2:
#### Deploying using CLI
#### Yêu cầu
- `@subql/cli` version 1.1.0 or above.
- Get your [SUBQL_ACCESS_TOKEN](/docs/run_publish/ipfs.md#prepare-your-subqlaccesstoken) ready.

```
// Deploy using the CLI
$ suqbl deployment:deploy

// OR Deploy using non-interactive CLI
$ suqbl deployment:deploy
  --dict=dict                      Enter Dictionary Endpoint
  --endpoint=endpoint              Enter Network Endpoint
  --indexerVersion=indexerVersion  Enter indexer-version
  --ipfsCID=ipfsCID                Enter IPFS CID
  --org=org                        Enter Organization Name
  --project_name=project_name      Enter Project Name
  --queryVersion=queryVersion      Enter Query-version
  --type=type                      Enter deployment type e.g. primary or stage
```

## Các Bước Tiếp Theo - Kết nối đến Dự Án của bạn

Sau khi việc triển khai đã thành công và các nút của chúng ta đã lập chỉ mục dữ liệu của bạn trên chuỗi, bạn sẽ có thể kết nối với dự án của mình thông qua hiển thị của điêm cuối truy vấn GraphQL.

![Các dự án đang được triển khai và đồng bộ](/assets/img/projects-deploy-sync.png)

Ngoài ra, bạn có thể nhấp vào ba dấu chấm bên cạnh tiêu đề dự án của mình và xem nó trên SubQuery Explorer. There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![Projects in SubQuery Explorer](/assets/img/projects-explorer.png)

## Thêm Tài Khoản GitHub Organization vào các Dự Án SubQuery

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![Chuyển đổi giữa các tài khoản GitHub](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![Thu hồi chấp thuận từ một tài khoản GitHub](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.



