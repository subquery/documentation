# Tệp Manifest

Tệp Manifest `project.yaml` có thể được xem như một điểm đầu vào của dự án của bạn và nó xác định hầu hết các chi tiết về cách SubQuery sẽ lập chỉ mục và chuyển đổi dữ liệu chuỗi.

Tệp kê khai có thể ở định dạng YAML hoặc JSON. Trong tài liệu này, chúng tôi sẽ sử dụng YAML trong tất cả các ví dụ. Dưới đây là ví dụ tiêu chuẩn về `project.yaml` cơ bản.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml specVersion: 0.2.0 name: example-project # Provide the project name version: 1.0.0  # Project version description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: file: ./schema.graphql # The location of your GraphQL schema file network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' # Genesis hash of the network endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: file: "./dist/index.js" handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> ``` yml specVersion: "0.0.1" description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: ./schema.graphql # The location of your GraphQL schema file network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - name: main kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional but suggested to speed up event processing module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> </CodeGroup>

## Di chuyển từ v0.0.1 sang v0.2.0<Badge text="upgrade" type="warning"/>

**Nếu bạn có một dự án với specVersion v0.0.1, bạn có thể sử dụng `subql migrate` để nâng cấp nhanh chóng. [Xem tại đây](#cli-options) để biết thêm thông tin **

Trong `network`:

- Có một trường mới ** bắt buộc ** ` genesisHash ` giúp xác định chuỗi đang được sử dụng.
- Đối với v0.2.0 trở lên, bạn có thể tham chiếu đến [chaintype file](#custom-chains) bên ngoài nếu bạn đang tham chiếu đến một chuỗi tùy chỉnh.

Trong `dataSources`:

- Có thể liên kết trực tiếp `index.js` điểm vào cho các trình xử lý ánh xạ. Theo mặc định, `index.js` này sẽ được tạo từ `index.ts` trong quá trình xây dựng.
- Nguồn dữ liệu có thể là nguồn dữ liệu thời gian chạy thông thường hoặc [nguồn dữ liệu tùy chỉnh](#custom-data-sources).

### Tùy chọn CLI

Trong khi phiên bản kỹ thuật v0.2.0 đang trong giai đoạn thử nghiệm, bạn sẽ cần xác định rõ ràng nó trong quá trình khởi tạo dự án bằng cách chạy `subql init --specVersion 0.2.0 PROJECT_NAME`

`subql migrate` có thể chạy trong một dự án hiện có để di chuyển tệp kê khai dự án sang phiên bản mới nhất.

| Các Tùy chọn   | Mô tả                                                         |
| -------------- | ------------------------------------------------------------- |
| -f, --force    |                                                               |
| -l, --location | thư mục cục bộ để chạy di chuyển vào (phải chứa project.yaml) |
| --file=file    | để chỉ định project.yaml di chuyển                            |

## Tổng quan

### Thông số kỹ thuật cấp cao nhất

| Trường          | v0.0.1                              | v0.2.0                      | Mô tả                                                             |
| --------------- | ----------------------------------- | --------------------------- | ----------------------------------------------------------------- |
| **specVersion** | String                              | String                      | `0.0.1` or `0.2.0` - thông số kỹ thuật phiên bản của tệp manifest |
| **name**        | 𐄂                                   | String                      | Tên của dự án                                                     |
| **version**     | 𐄂                                   | String                      | Phiên bản dự án của bạn                                           |
| **description** | String                              | String                      | Mô tả dự án của bạn                                               |
| **repository**  | String                              | String                      | Địa chỉ kho lưu trữ Git của dự án của bạn                         |
| **schema**      | String                              | [Schema Spec](#schema-spec) | Vị trí của tệp lược đồ GraphQL của bạn                            |
| **network**     | [Network Spec](#network-spec)       | Network Spec                | Chi tiết của mạng được lập chỉ mục                                |
| **dataSources** | [DataSource Spec](#datasource-spec) | DataSource Spec             |                                                                   |

### Schema Spec

| Trường   | v0.0.1 | v0.2.0 | Mô tả                                  |
| -------- | ------ | ------ | -------------------------------------- |
| **file** | 𐄂      | String | Vị trí của tệp lược đồ GraphQL của bạn |

### Network Spec

| Trường          | v0.0.1 | v0.2.0        | Mô tả                                                                                                                                                                                                                |
| --------------- | ------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **genesisHash** | 𐄂      | String        | Hàm băm gốc của mạng                                                                                                                                                                                                 |
| **endpoint**    | String | String        | Xác định điểm cuối wss hoặc ws của chuỗi khối được lập chỉ mục - **Đây phải là một nút lưu trữ đầy đủ**. Bạn có thể truy xuất điểm cuối cho tất cả các parachain miễn phí từ [OnFinality](https://app.onfinality.io) |
| **dictionary**  | String | String        | It is suggested to provide the HTTP endpoint of a full chain dictionary to speed up processing - read [how a SubQuery Dictionary works](../tutorials_examples/dictionary.md).                                        |
| **chaintypes**  | 𐄂      | {file:String} | Path to chain types file, accept `.json` or `.yaml` format                                                                                                                                                           |

### Thông số kỹ thuật Data Source

DataSources xác định dữ liệu sẽ được lọc và trích xuất và vị trí của trình xử lý hàm ánh xạ để áp dụng chuyển đổi dữ liệu.
| Trường         | v0.0.1                                                    | v0.2.0                                                                           | Mô tả                                                                                                                                                                                 |
| -------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name**       | String                                                    | 𐄂                                                                                | Name of the data source                                                                                                                                                               |
| **kind**       | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | We supports data type from default substrate runtime such as block, event and extrinsic(call). <br /> From v0.2.0, we support data from custom runtime, such as smart contract. |
| **startBlock** | Integer                                                   | Integer                                                                          | This changes your indexing start block, set this higher to skip initial blocks with less data                                                                                         |
| **mapping**    | Mapping Spec                                              | Mapping Spec                                                                     |                                                                                                                                                                                       |
| **filter**     | [network-filters](./manifest/#network-filters)            | 𐄂                                                                                | Filter the data source to execute by the network endpoint spec name                                                                                                                   |

### Thông số kỹ thuật ánh xạ

| Trường                 | v0.0.1                                                                   | v0.2.0                                                                                        | Mô tả                                                                                                                                                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **file**               | String                                                                   | 𐄂                                                                                             | Path to the mapping entry                                                                                                                                                                                                                    |
| **handlers & filters** | [Default handlers and filters](./manifest/#mapping-handlers-and-filters) | Default handlers and filters, <br />[Custom handlers and filters](#custom-data-sources) | List all the [mapping functions](./mapping.md) and their corresponding handler types, with additional mapping filters. <br /><br /> For custom runtimes mapping handlers please view [Custom data sources](#custom-data-sources) |

## Nguồn dữ liệu và ánh xạ

In this section, we will talk about the default substrate runtime and its mapping. Here is an example:

```yaml
dataSources:
  - kind: substrate/Runtime # Indicates that this is default runtime
    startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data
    mapping:
      file: dist/index.js # Entry path for this mapping
```

### Mapping handlers and Filters

The following table explains filters supported by different handlers.

**Your SubQuery project will be much more efficient when you only use event and call handlers with appropriate mapping filters**

| Handler                                    | Supported filter             |
| ------------------------------------------ | ---------------------------- |
| [BlockHandler](./mapping.md#block-handler) | `specVersion`                |
| [EventHandler](./mapping.md#event-handler) | `module`,`method`            |
| [CallHandler](./mapping.md#call-handler)   | `module`,`method` ,`success` |

Default runtime mapping filters are an extremely useful feature to decide what block, event, or extrinsic will trigger a mapping handler.

Only incoming data that satisfy the filter conditions will be processed by the mapping functions. Mapping filters are optional but are highly recommended as they significantly reduce the amount of data processed by your SubQuery project and will improve indexing performance.

```yaml
# Example filter from callHandler
filter:
  module: balances
  method: Deposit
  success: true
```

- Module and method filters are supported on any substrate-based chain.
- The `success` filter takes a boolean value and can be used to filter the extrinsic by its success status.
- The `specVersion` filter specifies the spec version range for a substrate block. The following examples describe how to set version ranges.

```yaml
filter:
  specVersion: [23, 24]   # Index block with specVersion in between 23 and 24 (inclusive).
  specVersion: [100]      # Index block with specVersion greater than or equal 100.
  specVersion: [null, 23] # Index block with specVersion less than or equal 23.
```

## Chuỗi tùy chỉnh

### Thông số kỹ thuật mạng

When connecting to a different Polkadot parachain or even a custom substrate chain, you'll need to edit the [Network Spec](#network-spec) section of this manifest.

The `genesisHash` must always be the hash of the first block of the custom network. You can retireve this easily by going to [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) and looking for the hash on **block 0** (see the image below).

![Genesis Hash](/assets/img/genesis-hash.jpg)

Additionally you will need to update the `endpoint`. This defines the wss endpoint of the blockchain to be indexed - **This must be a full archive node**. Bạn có thể truy xuất điểm cuối cho tất cả các parachain miễn phí từ [OnFinality](https://app.onfinality.io)

### Các loại chuỗi

Bạn có thể lập chỉ mục dữ liệu từ các chuỗi tùy chỉnh bằng cách bao gồm các loại chuỗi trong manifest.

We support the additional types used by substrate runtime modules, `typesAlias`, `typesBundle`, `typesChain`, and `typesSpec` are also supported.

In the v0.2.0 example below, the `network.chaintypes` are pointing to a file that has all the custom types included, This is a standard chainspec file that declares the specific types supported by this blockchain in either `.json` or `.yaml` format.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # The relative filepath to where custom types are stored ... ``` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> ``` yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter:  #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true ``` </CodeGroupItem> </CodeGroup>

## Custom Data Sources

Custom Data Sources provide network specific functionality that makes dealing with data easier. They act as a middleware that can provide extra filtering and data transformation.

A good example of this is EVM support, having a custom data source processor for EVM means that you can filter at the EVM level (e.g. filter contract methods or logs) and data is transformed into structures farmiliar to the Ethereum ecosystem as well as parsing parameters with ABIs.

Custom Data Sources can be used with normal data sources.

Here is a list of supported custom datasources:

| Kind                                                  | Supported Handlers                                                                                       | Filters                         | Description                                                                      |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------- |
| [substrate/Moonbeam](./moonbeam/#data-source-example) | [substrate/MoonbeamEvent](./moonbeam/#moonbeamevent), [substrate/MoonbeamCall](./moonbeam/#moonbeamcall) | See filters under each handlers | Provides easy interaction with EVM transactions and events on Moonbeams networks |

## Network Filters

**Network filters only applies to manifest spec v0.0.1**.

Usually the user will create a SubQuery and expect to reuse it for both their testnet and mainnet environments (e.g Polkadot and Kusama). Between networks, various options are likely to be different (e.g. index start block). Therefore, we allow users to define different details for each data source which means that one SubQuery project can still be used across multiple networks.

Users can add a `filter` on `dataSources` to decide which data source to run on each network.

Below is an example that shows different data sources for both the Polkadot and Kusama networks.

<CodeGroup> <CodeGroupItem title="v0.0.1"> ```yaml --- network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' #Create a template to avoid redundancy definitions: mapping: &mymapping handlers: - handler: handleBlock kind: substrate/BlockHandler dataSources: - name: polkadotRuntime kind: substrate/Runtime filter: #Optional specName: polkadot startBlock: 1000 mapping: *mymapping #use template here - name: kusamaRuntime kind: substrate/Runtime filter: specName: kusama startBlock: 12000 mapping: *mymapping # can reuse or change ``` </CodeGroupItem>

</CodeGroup>
