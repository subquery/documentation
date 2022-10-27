# Các câu hỏi thường gặp

## SubQuery là gì?

SubQuery is an open source blockchain data indexer for developers that provides fast, flexible, reliable, and decentralised APIs to power leading multi-chain apps.

Our goal is to save developers' time and money by eliminating the need of building their own indexing solution. Now, they can fully focus on developing their applications. SubQuery helps developers create the decentralised products of the future.

<figure class="video_container">
<iframe src="https://www.youtube.com/embed/gCpVz_mkWdo" title="Introducing The SubQuery Network" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscree="true"></iframe>
</figure>

**SubQuery Managed Service**

SubQuery also provides free, production grade hosting of projects for developers. Our Managed Service removes the responsiblity of managing infrastructure, so that developers do what they do best — build. Find out more [here](/run_publish/publish.md).

**Mạng SubQuery**

The SubQuery Network allows developers to completely decentralise their infrastructure stack. It is the most open, performant, reliable, and scalable data service for dApps. Mạng SubQuery lập chỉ mục và dữ liệu dịch vụ cho cộng đồng toàn cầu theo cách được khuyến khích và có thể xác minh.  Sau khi xuất bản dự án của bạn lên Mạng SubQuery, bất kỳ ai cũng có thể lập chỉ mục và lưu trữ nó - cung cấp dữ liệu cho người dùng trên toàn thế giới nhanh hơn và đáng tin cậy hơn.

More information [here](/subquery_network/introduction.md).

## Cách tốt nhất để bắt đầu với SubQuery là gì?

Cách tốt nhất để bắt đầu sử dụng SubQuery là thực hiện [Hướng dẫn Hello World](/assets/pdf/Hello_World_Lab.pdf) của chúng tôi. This is a simple 5 min walk through exercise. Download the starter template, build the project, use Docker to run a node on your localhost, and run a simple query.

## Làm cách nào để tôi có thể đóng góp hoặc đưa ra phản hồi cho SubQuery?

Chúng tôi rất mong nhận được ý kiến đóng góp và phản hồi từ cộng đồng. To contribute the code, fork the repository of your interest and make your changes. Sau đó hãy sử dụng chức năng Pull Request hay gọi tắt là PR. Don't forget to test as well. Also check out our <a href="http://localhost:8080/miscellaneous/contributing.html">contributions guidelines.</a>

To give feedback, contact us at hello@subquery.network or jump onto our [discord channel](https://discord.com/invite/78zg8aBSMG).

## Chi phí để lưu trữ dự án của tôi trong SubQuery là bao nhiêu?

This service is being provided to the community with a generous free tier! You can host your first two SubQuery projects for absolutely free!

## Các vị trí triển khai là gì?

Vị trí triển khai là một tính năng trong [SubQuery Projects](https://project.subquery.network) gần giống với môi trường phát triển. Ví dụ, trong bất kỳ tổ chức phần mềm nào tối thiểu đều có môi trường phát triển và môi trường sản xuất (không tính localhost). Thông thường, nó bao gồm các môi trường bổ sung như dàn dựng và tiền sản xuất hoặc thậm chí là QA, tùy thuộc vào nhu cầu của tổ chức và sự phát triển của chúng được.

SubQuery hiện có sẵn hai vị trí. Một vị trí dàn dựng (staging slot) và một vị trí sản xuất (production slot). Điều này cho phép các nhà phát triển triển khai SubQuery của họ vào môi trường dàn dựng và để mọi thứ diễn ra tốt đẹp, sau đó chọn "thúc đẩy sản xuất" chỉ bằng một nút bấm.

## Ưu điểm của vị trí dàn dựng là gì?

Lợi ích chính của việc sử dụng vị trí dàn dựng là nó cho phép bạn chuẩn bị một bản phát hành mới cho dự án SubQuery của mình không cần công khai. Bạn có thể đợi vị trí dàn dựng lập chỉ mục lại tất cả dữ liệu mà không ảnh hưởng đến các ứng dụng sản xuất của bạn.

Vị trí dàn dựng không được hiển thị công khai trong [ Explorer ](https://explorer.subquery.network/) và có một URL duy nhất chỉ hiển thị cho bạn. Và tất nhiên, môi trường riêng biệt này cho phép bạn kiểm tra mã mới của mình mà không ảnh hưởng đến quá trình sản xuất.

## Thông tin ngoại lai Polkadot là gì?

Nếu bạn đã quen thuộc với các khái niệm blockchain, bạn có thể nghĩ thông tin ngoại lai gần giống với các giao dịch. Tuy nhiên, về mặt chính thức, thông tin ngoại lai là một đoạn thông tin đến từ bên ngoài chuỗi và được bao gồm trong một block. Có ba loại thông tin ngoại lai. Bao gồm: thông tin cố hữu, giao dịch đã ký và giao dịch chưa ký.

Thông tin ngoại lai cố hữu là những phần thông tin không được ký và chỉ được thêm vào block bởi tác giả của block.

Giao dịch ngoại lai có chữ ký là các giao dịch có chứa chữ ký của tài khoản thực hiện giao dịch. Họ phải trả một khoản phí để giao dịch được đưa vào chuỗi.

Các giao dịch ngoại lai không có chữ ký là các giao dịch không có chữ ký của tài khoản đã thực hiện giao dịch. Các giao dịch ngoại lai chưa được ký kết nên sử dụng cẩn thận vì không ai trả phí, vì nó đã được ký. Vì thế, danh sách chờ giao dịch không có logic kinh tế để tránh bị spam.

Để biết thêm thông tin chi tiết, hãy nhấp vào [đây](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics).

## What is the endpoint for the Kusama network?

The network.endpoint for the Kusama network is `wss://kusama.api.onfinality.io/public-ws`.

## What is the endpoint for the Polkadot mainnet network?

The network.endpoint for the Polkadot network is `wss://polkadot.api.onfinality.io/public-ws`.

## How do I iteratively develop my project schema?

A known issue with developing a changing project schema is that when lauching your Subquery node for testing, the previously indexed blocks will be incompatible with your new schema. In order to iteratively develop schemas the indexed blocks stored in the database must be cleared, this can be achieved by launching your node with the `--force-clean` flag. For example:

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

Note that it is recommended to use `--force-clean` when changing the `startBlock` within the project manifest (`project.yaml`) in order to begin reindexing from the configured block. If `startBlock` is changed without a `--force-clean` of the project, then the indexer will continue indexing with the previously configured `startBlock`.


## How can I optimise my project to speed it up?

Performance is a crucial factor in each project. Fortunately, there are several things you could do to improve it. You can find our recommendations in the [Project Optimisation](../build/optimisation.md). 