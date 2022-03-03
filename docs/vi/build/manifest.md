# Tệp Manifest

Tệp Manifest `project.yaml` có thể được xem như một điểm đầu vào của dự án của bạn và nó xác định hầu hết các chi tiết về cách SubQuery sẽ lập chỉ mục và chuyển đổi dữ liệu chuỗi.

Tệp kê khai có thể ở định dạng YAML hoặc JSON. Trong tài liệu này, chúng tôi sẽ sử dụng YAML trong tất cả các ví dụ. Dưới đây là ví dụ tiêu chuẩn về `project.yaml` cơ bản.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ` yml specVersion: 0.2.0 name: example-project # Provide the project name version: 1.0.0 # Project version description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: file: ./schema.graphql # The location of your GraphQL schema file network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' # Genesis hash of the network endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: file: "./dist/index.js" handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> <CodeGroupItem title="v0.0.1"> ` yml specVersion: "0.0.1" description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: ./schema.graphql # The location of your GraphQL schema file network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - name: main kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional but suggested to speed up event processing module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> </CodeGroup>

## Di chuyển từ v0.0.1 sang v0.2.0<Badge text="upgrade" type="warning"/>

**Nếu bạn có một dự án với specVersion v0.0.1, bạn có thể sử dụng `subql migrate` để nâng cấp nhanh chóng. [Xem tại đây](#cli-options) để biết thêm thông tin **

Trong `network`:

- Có một trường mới ** bắt buộc ** `genesisHash` giúp xác định chuỗi đang được sử dụng.
- Đối với v0.2.0 trở lên, bạn có thể tham chiếu đến [chaintype file](#custom-chains) bên ngoài nếu bạn đang tham chiếu đến một chuỗi tùy chỉnh.

Trong `dataSources`:

- Có thể liên kết trực tiếp `index.js` điểm vào cho các trình xử lý ánh xạ. Theo mặc định, `index.js` này sẽ được tạo từ `index.ts` trong quá trình xây dựng.
- Nguồn dữ liệu có thể là nguồn dữ liệu thời gian chạy thông thường hoặc [nguồn dữ liệu tùy chỉnh](#custom-data-sources).

### Tùy chọn CLI

Theo mặc định, CLI sẽ tạo các dự án SubQuery theo phiên bản đặc tả v0.2.0. Hành vi này có thể bị ghi đè bằng cách chạy `subql init --specVersion 0.0.1 PROJECT_NAME`, mặc dù điều này không được khuyến khích vì dự án sẽ không được hỗ trợ bởi dịch vụ được lưu trữ subQuery trong tương lai

`subql migrate` có thể chạy trong một dự án hiện có để di chuyển tệp kê khai dự án sang phiên bản mới nhất.

USAGE $ subql init [PROJECTNAME]

ĐỐI SỐ PROJECTNAME Đặt tên dự án khởi động

| Các Tùy chọn            | Mô tả                                                                      |
| ----------------------- | -------------------------------------------------------------------------- | ------------------------------------------ |
| -f, --force             |                                                                            |
| -l, --location=location | thư mục cục bộ để chứa dự án tạo ra                                        |
| -install-dependencies   | Cài đặt các phần phụ thuộc                                                 |
| --npm                   | Buộc sử dụng NPM thay vì yarn, chỉ hoạt động với cờ `install-dependencies` |
| --specVersion=0.0.1     | 0.2.0 [mặc định: 0.2.0]                                                    | Phiên bản đặc tả sẽ được sử dụng bởi dự án |

## Tổng quan

### Thông số kỹ thuật cấp cao nhất

| Trường          | v0.0.1                              | v0.2.0                      | Mô tả                                                             |
| --------------- | ----------------------------------- | --------------------------- | ----------------------------------------------------------------- |
| **specVersion** | String                              | String                      | `0.0.1` or `0.2.0` - thông số kỹ thuật phiên bản của tệp manifest |
| **name**        | String                              | String                      | Tên của dự án                                                     |
| **version**     | String                              | String                      | Phiên bản dự án của bạn                                           |
| **description** | String                              | String                      | Mô tả dự án của bạn                                               |
| **repository**  | String                              | String                      | Địa chỉ kho lưu trữ Git của dự án của bạn                         |
| **schema**      | String                              | [Schema Spec](#schema-spec) | Vị trí của tệp lược đồ GraphQL của bạn                            |
| **network**     | [Network Spec](#network-spec)       | Network Spec                | Chi tiết của mạng được lập chỉ mục                                |
| **dataSources** | [DataSource Spec](#datasource-spec) | DataSource Spec             |                                                                   |

### Schema Spec

| Trường   | v0.0.1 | v0.2.0 | Mô tả                                  |
| -------- | ------ | ------ | -------------------------------------- |
| **file** | String | String | Vị trí của tệp lược đồ GraphQL của bạn |

### Network Spec

| Trường          | v0.0.1 | v0.2.0        | Mô tả                                                                                                                                                                                                                |
| --------------- | ------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **genesisHash** | String | String        | Hàm băm gốc của mạng                                                                                                                                                                                                 |
| **endpoint**    | String | String        | Xác định điểm cuối wss hoặc ws của chuỗi khối được lập chỉ mục - **Đây phải là một nút lưu trữ đầy đủ**. Bạn có thể truy xuất điểm cuối cho tất cả các parachain miễn phí từ [OnFinality](https://app.onfinality.io) |
| **dictionary**  | String | String        | Đề nghị cung cấp điểm cuối HTTP của từ điển chuỗi đầy đủ để tăng tốc độ xử lý - đọc [Làm thế nào để từ điển SubQuery hoạt động](../academy/tutorials_examples/dictionary.md).                                        |
| **chaintypes**  | String | {file:String} | Đường dẫn đến tệp types, chấp nhận định dạng `.json` hoặc `.yaml`                                                                                                                                                    |

### Thông số kỹ thuật Data Source

Xác định dữ liệu sẽ được lọc và trích xuất và vị trí của trình xử lý hàm ánh xạ để áp dụng chuyển đổi dữ liệu.
| Trường | v0.0.1 | v0.2.0 | Mô tả |
| -------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name** | String | String | Tên của nguồn dữ liệu |
| **kind** | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | Chúng tôi hỗ trợ các kiểu dữ liệu mặc định của thời gian chạy substrate, chẳng hạn như khối, sự kiện và phần bổ sung (cuộc gọi). <br /> Từ v0.2.0, chúng tôi hỗ trợ dữ liệu thời gian chạy tùy chỉnh, chẳng hạn như hợp đồng thông minh. |
| **startBlock** | Integer | Integer | Thao tác này sẽ thay đổi khối bắt đầu lập chỉ mục, hãy đặt khối này cao hơn để bỏ qua khối ban đầu với ít dữ liệu hơn |
| **mapping** | Thông số kỹ thuật ánh xạ | Thông số kỹ thuật ánh xạ | |
| **filter** | [network-filters](./manifest/#network-filters) | String | Lọc nguồn dữ liệu để thực thi theo tên thông số điểm cuối mạng |

### Thông số kỹ thuật ánh xạ

| Trường                 | v0.0.1                                                                   | v0.2.0                                                                                  | Mô tả                                                                                                                                                                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **file**               | String                                                                   | String                                                                                  | Đường dẫn đến mục nhập ánh xạ                                                                                                                                                                                                                              |
| **handlers & filters** | [Default handlers and filters](./manifest/#mapping-handlers-and-filters) | Default handlers and filters, <br />[Custom handlers and filters](#custom-data-sources) | Liệt kê tất cả [chức năng ánh xạ](./mapping.md) và các loại trình xử lý tương ứng của chúng, với các bộ lọc ánh xạ bổ sung. <br /><br /> Đối với trình xử lý ánh xạ thời gian chạy tùy chỉnh, vui lòng xem [Nguồn dữ liệu tùy chỉnh](#custom-data-sources) |

## Nguồn dữ liệu và ánh xạ

Trong phần này, chúng ta sẽ nói về thời gian chạy cơ bản mặc định và ánh xạ của nó. Đây là một ví dụ:

```yaml
dataSources:
  - kind: substrate/Runtime # Indicates that this is default runtime
    startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data
    mapping:
      file: dist/index.js # Entry path for this mapping
```

### Trình xử lý ánh xạ và bộ lọc

Bảng sau giải thích các bộ lọc được hỗ trợ bởi các trình xử lý khác nhau.

**Dự án SubQuery của bạn sẽ hiệu quả hơn nhiều khi bạn chỉ sử dụng trình xử lý sự kiện và cuộc gọi với các bộ lọc ánh xạ thích hợp**

| Hàm sự kiện                                | Bộ lọc được hỗ trợ           |
| ------------------------------------------ | ---------------------------- |
| [BlockHandler](./mapping.md#block-handler) | `specVersion`                |
| [EventHandler](./mapping.md#event-handler) | `module`,`method`            |
| [CallHandler](./mapping.md#call-handler)   | `module`,`method` ,`success` |

Bộ lọc ánh xạ là một tính năng cực kỳ hữu ích để quyết định khối, sự kiện hoặc thông tin ngoại lai nào sẽ kích hoạt trình xử lý ánh xạ.

Chỉ dữ liệu đến thỏa mãn các điều kiện lọc sẽ được xử lý bởi các hàm ánh xạ. Bộ lọc ánh xạ là tùy chọn nhưng được khuyến nghị vì chúng làm giảm đáng kể lượng dữ liệu được xử lý bởi dự án SubQuery của bạn và sẽ cải thiện hiệu suất lập chỉ mục.

```yaml
# Example filter from callHandler
filter:
  module: balances
  method: Deposit
  success: true
```

- Bộ lọc mô-đun và phương pháp được hỗ trợ trên bất kỳ chuỗi chất nền nào.
- Bộ lọc `success` nhận một giá trị boolean và có thể được sử dụng để lọc phần bên ngoài theo trạng thái thành công của nó.
- Bộ lọc `specVersion` chỉ định phạm vi phiên bản cụ thể cho khối chất nền. Các ví dụ sau đây mô tả cách đặt phạm vi phiên bản.

```yaml
filter:
  specVersion: [23, 24]   # Index block with specVersion in between 23 and 24 (inclusive).
  specVersion: [100]      # Index block with specVersion greater than or equal 100.
  specVersion: [null, 23] # Index block with specVersion less than or equal 23.
```

## Chuỗi tùy chỉnh

### Thông số kỹ thuật mạng

Khi kết nối với một parachain Polkadot khác hoặc thậm chí là một chuỗi chất nền tùy chỉnh, bạn sẽ cần chỉnh sửa phần [Thông số mạng](#network-spec) của tệp kê khai này.

`genesisHash` phải luôn là băm của khối đầu tiên của mạng tùy chỉnh. Bạn có thể gỡ bỏ điều này một cách dễ dàng bằng cách truy cập [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) và tìm mã băm trên **khối 0** (xem hình ảnh bên dưới).

![Genesis Hash](/assets/img/genesis-hash.jpg)

Ngoài ra, bạn sẽ cần cập nhật `điểm cuối`. Xác định điểm cuối wss hoặc ws của chuỗi khối được lập chỉ mục - **Đây phải là một nút lưu trữ đầy đủ**. Bạn có thể truy xuất điểm cuối cho tất cả các parachain miễn phí từ [OnFinality](https://app.onfinality.io)

### Các loại chuỗi

Bạn có thể lập chỉ mục dữ liệu từ các chuỗi tùy chỉnh bằng cách bao gồm các loại chuỗi trong manifest.

Chúng tôi hỗ trợ các kiểu bổ sung được sử dụng bởi các mô-đun thời gian chạy nền, `typeAlias​`, `typeBundle`, `typeChain` và `typeSpec` cũng được hỗ trợ.

Trong ví dụ v0.2.0 bên dưới, `network.chaintypes` đang trỏ đến một tệp có tất cả các loại tùy chỉnh được nhúng vào, Đây là tệp chainpec tiêu chuẩn khai báo các kiểu cụ thể được hỗ trợ bởi chuỗi khối này trong cả định dạng `.json`, `.yaml` hoặc `.js`.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> `yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # The relative filepath to where custom types are stored ...` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> `yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter: #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true` </CodeGroupItem> </CodeGroup>

Để sử dụng typescript cho các loại chuỗi của bạn, hãy bao gồm tệp đó trong thư mục `src` (ví dụ: `./src/types.ts`), chạy `yarn build` và sau đó trỏ đến tệp js đã tạo nằm trong thư mục `dist`.

```yml
network:
  chaintypes:
    file: ./dist/types.js # Will be generated after yarn run build
```

Những điều cần lưu ý khi sử dụng tệp loại chuỗi có phần mở rộng `.ts` hoặc `.js`:

- Phiên bản tệp kê khai của bạn phải là v0.2.0 trở lên.
- Chỉ có xuất mặc định sẽ được bao gồm trong api [polkadot](https://polkadot.js.org/docs/api/start/types.extend/) khi lấy khối.

Đây là ví dụ về tệp loại chuỗi `.ts`:

<CodeGroup> <CodeGroupItem title="types.ts"> `ts import { typesBundleDeprecated } from "moonbeam-types-bundle" export default { typesBundle: typesBundleDeprecated }; ` </CodeGroupItem> </CodeGroup>

## Nguồn dữ liệu tùy chỉnh

Nguồn dữ liệu tùy chỉnh cung cấp chức năng cụ thể của mạng giúp việc xử lý dữ liệu dễ dàng hơn. Chúng hoạt động như một phần mềm trung gian có thể cung cấp thêm khả năng lọc và chuyển đổi dữ liệu.

Một ví dụ điển hình về điều này là hỗ trợ EVM, có bộ xử lý nguồn dữ liệu tùy chỉnh cho EVM có nghĩa là bạn có thể lọc ở cấp EVM (ví dụ: lọc các phương pháp hợp đồng hoặc nhật ký) và dữ liệu được chuyển đổi thành các cấu trúc trang trại riêng cho hệ sinh thái Ethereum cũng như các tham số phân tích cú pháp với ABIs.

Nguồn dữ liệu tùy chỉnh có thể được sử dụng với các nguồn dữ liệu thông thường.

Dưới đây là danh sách các nguồn dữ liệu tùy chỉnh được hỗ trợ:

| Kind                                                  | Trình xử lý được hỗ trợ                                                                                  | Bộ lọc                              | Mô tả                                                                                    |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------- |
| [substrate/Moonbeam](./moonbeam/#data-source-example) | [substrate/MoonbeamEvent](./moonbeam/#moonbeamevent), [substrate/MoonbeamCall](./moonbeam/#moonbeamcall) | Xem các bộ lọc dưới mỗi trình xử lý | Cung cấp khả năng tương tác dễ dàng với các giao dịch và sự kiện EVM trên mạng Moonbeams |

## Bộ lọc mạng

**Bộ lọc mạng chỉ áp dụng cho thông số tệp manifest v0.0.1**.

Thông thường người dùng sẽ tạo SubQuery và mong muốn sử dụng lại nó cho cả môi trường testnet và mainnet của họ (ví dụ: Polkadot và Kusama). Giữa các mạng, các tùy chọn khác nhau có thể khác nhau (ví dụ: khối bắt đầu lập chỉ mục). Do đó, chúng tôi cho phép người dùng xác định các chi tiết khác nhau cho từng nguồn dữ liệu, có nghĩa là một dự án SubQuery vẫn có thể được sử dụng trên nhiều mạng.

Người dùng có thể thêm `filter` trên `dataSources` để quyết định nguồn dữ liệu nào sẽ chạy trên mỗi mạng.

Dưới đây là một ví dụ hiển thị các nguồn dữ liệu khác nhau cho cả mạng Polkadot và Kusama.

<CodeGroup> <CodeGroupItem title="v0.0.1"> `yaml --- network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' #Create a template to avoid redundancy definitions: mapping: &mymapping handlers: - handler: handleBlock kind: substrate/BlockHandler dataSources: - name: polkadotRuntime kind: substrate/Runtime filter: #Optional specName: polkadot startBlock: 1000 mapping: *mymapping #use template here - name: kusamaRuntime kind: substrate/Runtime filter: specName: kusama startBlock: 12000 mapping: *mymapping # can reuse or change ` </CodeGroupItem>

</CodeGroup>
