# Hỗ trợ Substrate EVM

Chúng tôi cung cấp bộ xử lý nguồn dữ liệu tùy chỉnh cho EVM của Moonbeam và Moonriver. Nó cung cấp một cách đơn giản để lọc và lập chỉ mục cả hoạt động EVM và Substrate trên các mạng của Moonbeam với một dự án SubQuery duy nhất.

Các mạng được hỗ trợ:

| Tên Mạng       | Điểm cuối Websocket                                | Điểm cuối Dictionary                                                 |
| -------------- | -------------------------------------------------- | -------------------------------------------------------------------- |
| Moonbeam       | `wss://moonbeam.api.onfinality.io/public-ws`       | `https://api.subquery.network/sq/subquery/moonbeam-dictionary`       |
| Moonriver      | `wss://moonriver.api.onfinality.io/public-ws`      | `https://api.subquery.network/sq/subquery/moonriver-dictionary`      |
| Moonbase Alpha | `wss://moonbeam-alpha.api.onfinality.io/public-ws` | `https://api.subquery.network/sq/subquery/moonbase-alpha-dictionary` |

**Bạn cũng có thể tham khảo [dự án ví dụ Moonriver EVM cơ bản](https://github.com/subquery/tutorials-moonriver-evm-starter) với một event và call handler.** Dự án này cũng được lưu trữ trực tiếp trong SubQuery Explorer [tại đây](https://explorer.subquery.network/subquery/subquery/moonriver-evm-starter-project).

## Bắt đầu

1. Thêm custom data source dưới dạng dependency ` fiber add @ subql / contract-processors `
2. Thêm một custom data source như được mô tả bên dưới
3. Thêm handlers cho custom data source vào code của bạn

## Thông số kỹ thuật Data Source

| Trường            | Kiểu dữ liệu                                                   | Bắt buộc | Mô tả                                          |
| ----------------- | -------------------------------------------------------------- | -------- | ---------------------------------------------- |
| processor.file    | `'./node_modules/@subql/contract-processors/dist/moonbeam.js'` | Có       | Tệp tham chiếu đến mã data processor           |
| processor.options | [ProcessorOptions](#processor-options)                         | Không    | Các tùy chọn dành riêng cho Moonbeam Processor |
| assets            | `{ [key: String]: { file: String }}`                           | Không    | Đối tượng của tệp asset bên ngoài              |

### Tuỳ chọn Processor

| Trường  | Kiểu dữ liệu     | Bắt buộc | Mô tả                                                                                                                |
| ------- | ---------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| abi     | String           | Không    | ABI được bộ xử lý sử dụng để phân tích cú pháp các đối số. Phải là key của `assets`                                  |
| address | String or `null` | Không    | Địa chỉ hợp đồng, nơi mà bắt đầu sự kiện hoặc cuộc gọi được thực hiện tới. ` null ` sẽ bắt các lệnh gọi tạo hợp đồng |

## MoonbeamCall

Hoạt động giống như [substrate/CallHandler](../create/mapping/#call-handler) ngoại trừ với different handler argument và minor filtering changes.

| Trường | Kiểu dữ liệu                 | Bắt buộc | Mô tả                                     |
| ------ | ---------------------------- | -------- | ----------------------------------------- |
| kind   | 'substrate/MoonbeamCall'     | Có       | Xác định đây là một loại trình xử lý Call |
| filter | [Call Filter](#call-filters) | Không    | Lọc data source để thực thi               |

### Call Filters

| Trường   | Kiểu dữ liệu | Các ví dụ                                     | Mô tả                                                                                                                                                            |
| -------- | ------------ | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| function | String       | 0x095ea7b3, approve(address to,uint256 value) | Hoặc chuỗi [Function Signature](https://docs.ethers.io/v5/api/utils/abi/fragments/#FunctionFragment) hoặc hàm ` sighash ` dùng để lọc hàm được gọi trên hợp đồng |
| from     | String       | 0x6bd193ee6d2104f14f94e2ca6efefae561a4334b    | Một địa chỉ Ethereum đã gửi giao dịch                                                                                                                            |

### Handlers

Không giống như một handler thông thường, bạn sẽ không nhận được tham số `SubstrateExtriuality`, thay vào đó bạn sẽ nhận được một `MoonbeamCall` dựa trên kiểu [TransactionResponse](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse) của Ethers.

Thay đổi từ kiểu `TransactionResponse`:

- Nó không có thuộc tính `wait` và `confirmations`
- Một thuộc tính `success` được thêm vào để biết liệu giao dịch có thành công hay không
- `args` được thêm vào nếu trường `abi` được cung cấp và có thể phân tích cú pháp thành công các đối số

## MoonbeamEvent

Hoạt động giống như [substrate/EventHandler](../create/mapping/#event-handler) ngoại trừ với different handler argument và minor filtering changes.

| Trường | Kiểu dữ liệu                   | Bắt buộc | Mô tả                                      |
| ------ | ------------------------------ | -------- | ------------------------------------------ |
| kind   | 'substrate/MoonbeamEvent'      | Có       | Xác định đây là một loại trình xử lý Event |
| filter | [Event Filter](#event-filters) | Không    | Lọc data source để thực thi                |

### Event Filters

| Trường | Kiểu dữ liệu | Các ví dụ                                                       | Mô tả                                                                                                                                         |
| ------ | ------------ | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| topics | String array | Transfer(address indexed from,address indexed to,uint256 value) | Bộ lọc chủ đề tuân theo bộ lọc nhật ký Ethereum JSON-PRC, bạn có thể tìm thêm tài liệu [tại đây](https://docs.ethers.io/v5/concepts/events/). |

<b>Ghi chú về các topic:</b>
Có một vài cải tiến từ các bộ lọc nhật ký cơ bản:

- Các Topics không cần thêm 0
- Các chuỗi [Event Fragment](https://docs.ethers.io/v5/api/utils/abi/fragments/#EventFragment) có thể được cung cấp và tự động chuyển đổi thành id của chúng

### Handlers

Không giống như một handler thông thường, bạn sẽ không nhận được tham số `SubstrateEvent`, thay vào đó bạn sẽ nhận được một `MoonbeamEvent` dựa trên kiểu [Log](https://docs.ethers.io/v5/api/providers/types/#providers-Log) của Ethers.

Thay đổi từ kiểu `Log`:

- `args` được thêm vào nếu trường `abi` được cung cấp và có thể phân tích cú pháp thành công các đối số

## Data Source ví dụ

Đây là phần trích xuất từ tệp manifest `project.yaml`.

```yaml
dataSources:
  - kind: substrate/Moonbeam
    startBlock: 752073
    processor:
      file: './node_modules/@subql/contract-processors/dist/moonbeam.js'
      options:
        # Phải là key của assets
        abi: erc20
        # Địa chỉ hợp đồng (hoặc địa chỉ người nhận nếu chuyển khoản) để lọc, nếu `null` phải dành cho việc tạo hợp đồng
        address: '0x6bd193ee6d2104f14f94e2ca6efefae561a4334b'
    assets:
      erc20:
        file: './erc20.abi.json'
    mapping:
      file: './dist/index.js'
      handlers:
        - handler: handleMoonriverEvent
          kind: substrate/MoonbeamEvent
          filter:
            topics:
              - Transfer(address indexed from,address indexed to,uint256 value)
        - handler: handleMoonriverCall
          kind: substrate/MoonbeamCall
          filter:
            ## Hàm có thể là đoạn hàm hoặc chữ ký
            # function: '0x095ea7b3'
            # function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
            # function: approve(address,uint256)
            function: approve(address to,uint256 value)
            from: '0x6bd193ee6d2104f14f94e2ca6efefae561a4334b'
 
Text
Xpath: /pre/code
```

## Những hạn chế đã biết

- Hiện tại không có cách nào để truy vấn trạng thái EVM trong một handler
- Không có cách nào để lấy biên lai giao dịch bằng handlers
- Các thuộc tính `blockHash` hiện không được xác định, thuộc tính `blockNumber` có thể được sử dụng để thay thế
