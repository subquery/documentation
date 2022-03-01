# Xuất bản Dự Án SubQuery của bạn

## Các lợi ích của việc hosting dự án của bạn bằng SubQuery

- Chúng tôi sẽ chạy các dự án SubQuery của bạn trong một dịch vụ công được quản lý có hiệu suất cao, có thể mở rộng
- Dịch vụ này đang được cung cấp đến cộng đồng miễn phí!
- Bạn có thể tạo ra các dự án công khai do đó chúng sẽ được liệt kê trong [SubQuery Explorer](https://explorer.subquery.network) và bất cứ ai trên khắp thế giới cũng đều có thể xem chúng
- Chúng tôi được tích hợp với GitHub, vì thế bất kỳ ai trong các tổ chức GitHub của bạn cũng sẽ xem được các dự án đã chia sẻ của tổ chức

## Create your first project in SubQuery Projects

### Project Codebase Hosting

There are two ways you can host your SubQuery project's codebase before publishing.

**GitHub**: Your project's codebase must be in a public GitHub repository

**IPFS**: Your project's codebase can be stored in IPFS, you can follow our IPFS hosting guide to see how to [first publish to IPFS](ipfs.md)

### Login to SubQuery Projects

Before starting, please make sure that your SubQuery project codebase is online in a public GitHub repository or on IPFS. The `schema.graphql` file must be in the root of your directory.

To create your first project, head to [project.subquery.network](https://project.subquery.network). You'll need to authenticate with your GitHub account to login.

On first login, you will be asked to authorize SubQuery. We only need your email address to identify your account, and we don't use any other data from your GitHub account for any other reasons. In this step, you can also request or grant access to your GitHub Organization account so you can post SubQuery projects under your GitHub Organization instead of your personal account.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

SubQuery Projects is where you manage all your hosted projects uploaded to the SubQuery platform. You can create, delete, and even upgrade projects all from this application.

![Projects Login](/assets/img/projects-dashboard.png)

If you have a GitHub Organization accounts connected, you can use the switcher on the header to change between your personal account and your GitHub Organization account. Projects created in a GitHub Organization account are shared between members in that GitHub Organization. To connect your GitHub Organization account, you can [follow the steps here](#add-github-organization-account-to-subquery-projects).

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

### Create your First Project

Let's start by clicking on "Create Project". You'll be taken to the New Project form. Please enter the following (you can change this in the future):

- **Tài khoản GitHub:** Nếu bạn có nhiều hơn một tài khoản GitHub, hãy chọn ra tài khoản mà dự án này được tạo ra bên dưới. Các dự án được tạo ra trong tài khoản GitHub Organization đều được chia sẻ giữa các thành viên trong cùng tổ chức.
- **Project Name**
- **Phụ đề**
- **Mô tả**
- **URL Kho Lưu Trữ GitHub:** Đây phải là một URL GitHub hợp lệ chỉ đến kho lưu trữ công khai có chứa dự án SubQuery của bạn. Tập tin `schema.graphql` phải nằm trong thư mục gốc của bạn ([tìm hiểu thêm về cấu trúc thư mục gốc](../create/introduction.md#directory-structure)).
- **Database:** Premium customers can access dedicated databases to host production SubQuery projects from. If this interests you, you can contact [sales@subquery.network](mailto:sales@subquery.network) to have this setting enabled.
- **Deployment Source:** You can choose to have the project deployed from the GitHub repository or alternatively deployed from a IPFS CID, see our guide about [hosting with IPFS.](ipfs.md)
- **Ẩn dự án:** Nếu được chọn, điều này sẽ ẩn dự án khỏi trình khám phá SubQuery công khai. Hãy bỏ chọn mục này nếu bạn muốn chia sẻ SubQuery của mình với cộng đồng! ![Create your first Project](/assets/img/projects-create.png)

Create your project and you'll see it on your SubQuery Project's list. _We're almost there! We just need to deploy a new version of it._

![Created Project with no deployment](/assets/img/projects-no-deployment.png)

### Deploy your first Version

While creating a project will setup the display behaviour of the project, you must deploy a version of it before it becomes operational. Triển khai một phiên bản sẽ kích hoạt khởi động lập chỉ mục SubQuery mới để bắt đầu, và cài đặt dịch vụ query bắt buộc để chấp nhận các yêu cầu từ GraphQl. Bạn cũng có thể triển khai các phiên bản mới đối với các dự án hiện tại tại đây.

With your new project, you'll see a Deploy New Version button. Click this, and fill in the required information about the deployment:

- **Branch:** From GitHub, select the branch of the project that you want to deploy from
- **Commit Hash:** From GitHub, select the specific commit of the version of your SubQuery project codebase that you want deployed
- **IPFS:** If deploying from IPFS, paste you IPFS deployment CID (without the leading `ipfs://`)
- **Override Network and Dictionary Endpoints:** You can override the endpoints in your project manifest here
- **Indexer Version:** Đây là phiên bản của dịch vụ nút SubQuery mà bạn muốn chạy SubQuery này. See [`@subql/node`](https://www.npmjs.com/package/@subql/node)
- **Query Version:** Đây là phiên bản của dịch vụ truy vấn SubQuery mà bạn muốn chạy SubQuery này. See [`@subql/query`](https://www.npmjs.com/package/@subql/query)

![Deploy your first Project](https://static.subquery.network/media/projects/projects-first-deployment.png)

If deployed successfully, you'll see the indexer start working and report back progress on indexing the current chain. This process may take time until it reaches 100%.

## Các Bước Tiếp Theo - Kết nối đến Dự Án của bạn

Sau khi việc triển khai đã thành công và các node đã lập chỉ mục dữ liệu của bạn trên chuỗi, bạn sẽ có thể kết nối với dự án của mình thông qua endpoint được hiển thị của GraphQL Query.

![Các dự án đang được triển khai và đồng bộ](/assets/img/projects-deploy-sync.png)

Ngoài ra, bạn có thể nhấp vào ba dấu chấm bên cạnh tiêu đề dự án của mình và xem nó trên SubQuery Explorer. There you can use the in-browser playground to get started - [read more about how to use our Explorer here](../query/query.md).

![Các dự án trong trình khám phá truy vấn con](/assets/img/projects-explorer.png)

## Thêm Tài Khoản GitHub Organization vào các Dự Án SubQuery

It is common to publish your SubQuery project under the name of your GitHub Organization account rather than your personal GitHub account. At any point your can change your currently selected account on [SubQuery Projects](https://project.subquery.network) using the account switcher.

![Switch between GitHub accounts](/assets/img/projects-account-switcher.png)

If you can't see your GitHub Organization account listed in the switcher, the you may need to grant access to SubQuery for your GitHub Organization (or request it from an administrator). To do this, you first need to revoke permissions from your GitHub account to the SubQuery Application. To do this, login to your account settings in GitHub, go to Applications, and under the Authorized OAuth Apps tab, revoke SubQuery - [you can follow the exact steps here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/reviewing-your-authorized-applications-oauth). **Don't worry, this will not delete your SubQuery project and you will not lose any data.**

![Revoke access to GitHub account](/assets/img/project_auth_revoke.png)

Once you have revoked access, log out of [SubQuery Projects](https://project.subquery.network) and log back in again. You should be redirected to a page titled _Authorize SubQuery_ where you can request or grant SubQuery access to your GitHub Organization account. If you don't have admin permissions, you must make a request for an adminstrator to enable this for you.

![Revoke approval from a GitHub account](/assets/img/project_auth_request.png)

Once this request has been approved by your administrator (or if are able to grant it youself), you will see the correct GitHub Organization account in the account switcher.
