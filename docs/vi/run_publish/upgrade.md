# Triển khai phiên bản mới cho Dự Án SubQuery của bạn

## Hướng Dẫn

Mặc dù bạn luôn có quyền nâng cấp và triển khai các phiên bản mới của dự án SubQuery của mình, nhưng hãy lưu ý trong quá trình này nếu dự án SubQuery của bạn là công khai với toàn thế giới. Một số điểm chính cần lưu ý:

- Nếu nâng cấp của bạn là một thay đổi mang tính đột phá, hãy tạo một dự án mới (ví dụ `Dự Án SubQuery V2 của tôi`) hoặc cung cấp cho cộng đồng của bạn nhiều cảnh báo về sự thay đổi thông qua các kênh truyền thông xã hội.
- Việc triển khai phiên bản dự án SubQuery mới có thể dẫn đến thời gian chết vì phiên bản mới lập chỉ mục chuỗi hoàn chỉnh từ khối genesis.

## Các Thay Đổi Triển Khai

There are three methods to deploy a new version of your project to the SubQuery Managed Service: you can use the UI, create it directly via the `subql` cli tool, or use an automated GitHub action.

### Sử dụng giao diện người dùng

Đăng nhập vào SubQuery Project và chọn dự án bạn muốn triển khai phiên bản mới. Bạn có thể chọn triển khai trên vị trí sản xuất hoặc vị trí dàn dựng. Hai vị trí này là môi trường biệt lập và mỗi vị trí sở hữu cơ sở dữ liệu riêng và đồng bộ hóa độc lập.

Chúng tôi khuyên bạn chỉ nên triển khai vào vị trí dàn dựng của mình để kiểm tra giai đoạn cuối cùng hoặc khi bạn cần đồng bộ lại dữ liệu dự án của mình. Sau đó, bạn có thể nâng cấp nó lên phiên bản sản xuất với thời gian chết bằng 0. Bạn sẽ thấy kiểm tra nhanh hơn khi [chạy một dự án cục bộ](../run_publish/run.md) vì bạn có thể [dễ dàng gỡ lỗi các sự cố](../academy/tutorials_examples/debug-projects.md).

Vị trí dàn dựng sẽ hoàn hảo cho việc:

- Xác thực lần cuối các thay đổi đối với Dự án SubQuery của bạn trong một môi trường riêng biệt. Vị trí dàn dựng có một URL khác để xuất bản mà bạn có thể sử dụng trong dApps của mình.
- Warming up and indexing data for an updated SubQuery project to eliminate downtime in your dApp.
- Chuẩn bị một bản phát hành mới cho Dự án SubQuery của bạn với chế độ không công khai. Vị trí dàn dựng không được hiển thị công khai trong Explorer và có một URL duy nhất chỉ hiển thị cho bạn.

![Vị trí dàn dựng](/assets/img/staging_slot.png)

Fill in the IPFS CID of the new version of your SubQuery project codebase that you want deployed (see the documetation to publish to IPFS [here](./publish.md). Bước này sẽ làm tốn nhiều thời gian hơn nữa tùy thuộc vào thời gian cần để lập chỉ mục chuỗi hiện tại. Bạn luôn có thể báo cáo lại tại đây để biết tiến độ.

### Sử dụng CLI

You can also use `@subql/cli` to create a new deployment of your project to our Managed Service. Điều này yêu cầu:

- `@subql/cli` phiên bản 1.1.0 trở lên.
- A valid [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) ready.

```shell
// Bạn có thể đặt trực tiếp phiên bản Trình lập chỉ mục và Truy vấn của mình
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// HOẶC bạn có thể sử dụng giao diện, nó sẽ xác thực IPFS CID của bạn và hiển thị danh sách các phiên bản image phù hợp với tệp kê khai của bạn 'project.yaml'

$ subql deployment:deploy
```

### Using GitHub actions

With the introduction of the deployment feature for the CLI, we've added a **Default Action Workflow** to [the starter project in GitHub](https://github.com/subquery/subql-starter/blob/v1.0.0/.github/workflows/cli-deploy.yml) that will allow you to publish and deploy your changes automatically:

- Step 1: After pushing your project to GitHub, create `DEPLOYMENT` environment on GitHub, and add the secret [SUBQL_ACCESS_TOKEN](../run_publish/ipfs.md#prepare-your-subql-access-token) to it.
- Step 2: If you haven't already, create a project on [SubQuery Projects](https://project.subquery.network). This can be done using the the [UI](#using-the-ui) or [CLI](#using-the-cli).
- Step 3: Once your project is created, navigate to the GitHub Actions page of your project, and select the workflow `CLI deploy`.
- Step 4: You'll see an input field where you can enter the unique code of your project created on SubQuery Projects. You can get the code from the URL in SubQuery Projects [SubQuery Projects](https://project.subquery.network). The code is based on the name of your project, where spaces are replaced with hyphens `-`. e.g. `my project name` becomes `my-project-name`.

::: tips Tip
Once the workflow is complete, you should be able to see your project deployed to our Managed Service.
:::

A common approach is to extend the default GitHub Action to automatically deploy changes to our Managed Service when code is merged into the main branch. The following change to the GitHub Action workflow do this:

```yml
on:
  push:
    branches:
      - main
jobs:
  deploy:
    name: CLI Deploy
    ...
```

## Nâng cấp lên Dịch vụ lập chỉ mục và Truy vấn mới nhất

If you just want to upgrade to the latest indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) or query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) to take advantage of our regular performance and stability improvements, just select a newer versions of our packages and save. This will cause only a few minutes of downtime as the services running your project are restarted.

## Các Bước Tiếp Theo - Kết nối đến Dự Án của bạn

Sau khi việc triển khai đã thành công và các nút của chúng ta đã lập chỉ mục dữ liệu của bạn trên chuỗi, bạn sẽ có thể kết nối với dự án của mình thông qua hiển thị của điêm cuối truy vấn GraphQL.

![Các dự án đang được triển khai và đồng bộ](/assets/img/projects-deploy-sync.png)

Ngoài ra, bạn có thể nhấp vào ba dấu chấm bên cạnh tiêu đề dự án của mình và xem nó trên SubQuery Explorer. There you can use the in browser playground to get started - [read more about how to use our Explorer here](../run_publish/query.md).

![Projects in SubQuery Explorer](/assets/img/projects-explorer.png)

::: info Note Learn more about the [GraphQL Query language.](./graphql.md) :::