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

Unlike other “unified” decentralised API service providers, SubQuery is open source, so Consumers will have the freedom to define their data set specifically for their needs. Rather than having to combine queries from different API endpoints - the creators and consumers of SubQuery projects can define the shape of their APIs data models themselves. It saves time, money, and provides a vastly better experience for end-users.

## Natural Demand Signalling and Different Payment Options

With marketplaces like what SubQuery is proposing, where there are both buyers and sellers attempting to commoditise data, signalling demand for future supply tends to be a tricky issue. Other networks create an artificial role in an attempt to predict future demand, and they’re rewarded when that future demand materialises. The plan is to take a different approach, one that requires up-front natural demand signalling.

A Consumer can take advantage of either Open or Closed Service Agreements to concretely indicate and commit demand for a new SubQuery Project. This will facilitate and encourage supply at a fixed price and volume (essentially helping secure pre-allocated rewards for Indexers of a SubQuery Project) and provide price and service certainty to both parties. This can be used both to attract Indexers to new SubQuery Projects, or to attract additional Indexers to existing and uncompetitive SubQuery Projects.

It additionally provides several advanced subscription based options for Consumers and Indexers. Some parties may benefit from the certainty of rewards provided by Closed Agreements and the predictability of recurring costs. Some may instead prefer to hunt out the most affordable data by going for high volume recurring agreements or low spot prices on the Pay as you Go market.

## Indexer/Delegator Imbalance

Among some competitors, it is observed that there is a serious imbalance between Indexers and Delegators in terms of the ability to change delegation rates without warning. SubQuery has tried to equalise this imbalance by requiring that the Indexer advertise an increase to the Indexer Commission Rate for an entire staking Era. Delegators are also free to withdraw their delegated tokens at any point during the staking Era, but they will lose any rewards that they could have been eligible for during that Era.

## Ưu đãi cho Hiệu suất Truy vấn

Để trở thành một nền tảng có hiệu suất cao, nhiệm vụ quan trọng - Mạng SubQuery phải hoạt động ở cấp cao nhất. That is why the Indexer discovery process will include performance data (latency and uptime) for all Indexers, and we will take steps to ensure that Consumers report on query speed and performance as often as possible.

Tools may also be provided to limit the availability of Indexers to a certain geographical region so that they can focus on providing the best service to that region, attract the most requests, and potentially maximise rewards for their contributions. This will allow larger and more mature Indexers to run location specific infrastructure all around the world.
