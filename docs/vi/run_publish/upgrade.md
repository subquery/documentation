# Triển khai phiên bản mới cho Dự Án SubQuery của bạn

## Hướng Dẫn

Mặc dù bạn luôn có quyền nâng cấp và triển khai các phiên bản mới của dự án SubQuery của mình, nhưng hãy lưu ý trong quá trình này nếu dự án SubQuery của bạn là công khai với toàn thế giới. Một số điểm chính cần lưu ý:

- Nếu nâng cấp của bạn là một thay đổi mang tính đột phá, hãy tạo một dự án mới (ví dụ `Dự Án SubQuery V2 của tôi`) hoặc cung cấp cho cộng đồng của bạn nhiều cảnh báo về sự thay đổi thông qua các kênh truyền thông xã hội.
- Việc triển khai phiên bản dự án SubQuery mới có thể dẫn đến thời gian chết vì phiên bản mới lập chỉ mục chuỗi hoàn chỉnh từ khối genesis.

## Các Thay Đổi Triển Khai

There are two methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

### Using the UI

Log into SubQuery Project and select the project you want to deploy a new version of. You can choose to either deploy to the production or staging slot. These two slots are isolated environments and each has their own databases and synchronise independently.

We recommend deploying to your staging slot only for final staging testing or when you need to resync your project data. You can then promote it to production with zero downtime. You will find testing is faster when [running a project locally](../run_publish/run.md) as you can more [easily debug issues](../academy/tutorials_examples/debug-projects.md).

The staging slot is perfect for:

- Xác thực lần cuối các thay đổi đối với Dự án SubQuery của bạn trong một môi trường riêng biệt. Vị trí dàn dựng có một URL khác để xuất bản mà bạn có thể sử dụng trong dApps của mình.
- Khởi động và lập chỉ mục dữ liệu cho một dự án SubQuery được cập nhật để loại bỏ thời gian chết trong dApp của bạn
- Chuẩn bị một bản phát hành mới cho Dự án SubQuery của bạn với chế độ không công khai. Vị trí dàn dựng không được hiển thị công khai trong Explorer và có một URL duy nhất chỉ hiển thị cho bạn.

![Staging slot](/assets/img/staging_slot.png)

Điền vào Commit Hash từ GitHub (sao chép toàn bộ commit hash) của phiên bản codebase dự án SubQuery mà bạn muốn triển khai. Bước này sẽ làm tốn nhiều thời gian hơn nữa tùy thuộc vào thời gian cần để lập chỉ mục chuỗi hiện tại. Bạn luôn có thể báo cáo lại tại đây để biết tiến độ.

### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our managed service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN](/docs/run_publish/ipfs.md#prepare-your-subqlaccesstoken) ready.

```shell
// You can directly set your Indexer and Query versions
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// OR you can use the interface, it will validate your IPFS CID and render a list of image versions that matches your manifest file `project.yaml`

$ subql deployment:deploy
```

## Upgrade to the Latest Indexer and Query Service

If you just want to upgrade to the latest indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) or query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) to take advantage of our regular performance and stability improvements, just select a newer versions of our packages and save. This will cause only a few minutes of downtime as the services running your project are restarted.

## Các Bước Tiếp Theo - Kết nối đến Dự Án của bạn

Sau khi việc triển khai đã thành công và các nút của chúng ta đã lập chỉ mục dữ liệu của bạn trên chuỗi, bạn sẽ có thể kết nối với dự án của mình thông qua hiển thị của điêm cuối truy vấn GraphQL.

![Các dự án đang được triển khai và đồng bộ](/assets/img/projects-deploy-sync.png)

Ngoài ra, bạn có thể nhấp vào ba dấu chấm bên cạnh tiêu đề dự án của mình và xem nó trên SubQuery Explorer. There you can use the in browser playground to get started - [read more about how to user our Explorer here](../run_publish/query.md).
