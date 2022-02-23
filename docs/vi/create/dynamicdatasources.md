# Nguồn dữ liệu động

Có những trường hợp bạn không biết tất cả các tham số cho nguồn dữ liệu khi một dự án được bắt đầu. Một ví dụ về điều này là một nhà máy hợp đồng sẽ tạo ra các phiên bản hợp đồng mới vào một ngày sau đó. Không thể biết trước thời hạn địa chỉ hợp đồng sẽ như thế nào. Đây là nơi có thể tự động tạo các nguồn dữ liệu mới.

## Trường `templates`

Để sử dụng các nguồn dữ liệu động, bạn cần phải có phiên bản thông số kỹ thuật ít nhất là `0.2.1`. Nếu bạn đang sử dụng `0.2.0`, tất cả những gì bạn cần làm là thay đổi thông số phiên bản. Nếu bạn đang sử dụng phiên bản thấp hơn thì trước tiên bạn nên cập nhật lên `0.2.0` với `subql migrate`.

Phiên bản thông số `0.2.1` giới thiệu trường `templates` mới. Các Template cũng giống như các nguồn dữ liệu với một vài điểm khác biệt.

* Họ cần một `name` để xác định template
* `startBlock` không còn cần thiết nữa. Nó sẽ được đặt thành khối mà nguồn dữ liệu được tạo
* Trong trường hợp nguồn dữ liệu tùy chỉnh, trường `processor.options` cũng có thể được điền một phần, phần còn lại của các tùy chọn sẽ được cung cấp khi nguồn dữ liệu được cài đặt.

## Dự án mẫu

Cách tốt nhất để chỉ ra cách sử dụng nguồn dữ liệu động là với một ví dụ.

Ví dụ dưới đây là cho một sàn giao dịch phi tập trung có hợp đồng nhà máy triển khai hợp đồng mới khi thêm một cặp giao dịch. Khi dự án được chạy, không thể biết địa chỉ của tất cả các hợp đồng cặp giao dịch đã được tạo hoặc sẽ được tạo. Nguồn dữ liệu có thể được tạo một cách tự động bởi một trình xử lý ánh xạ từ một mẫu để lập chỉ mục các hợp đồng cặp giao dịch mới được tạo.


### `project.yaml`
```yaml
specVersion: 0.2.1
name: example-project
version: 1.0.0
description: ''
repository: ''
schema:
  file: ./schema.graphql
network:
  genesisHash: '0x91bc6e169807aaa54802737e1c504b2577d4fafedd5a02c10293b1cd60e39527'
  chaintypes:
    file: "./types.yaml"
dataSources:
  - kind: substrate/Moonbeam
    startBlock: 1358833
    processor:
      file: './node_modules/@subql/contract-processors/dist/moonbeam.js'
      options:
        abi: exchangeFactory
        address: '0x0000000000000000000000000000000000000000'
    assets:
      exchangeFactory:
        file: ./src/exchangeFactory.abi.json
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleNewTradingPair
          kind: substrate/MoonbeamEvent
          filter:
            topics:
              - newTradingPair(address exchange, address token1, address token2)

templates:
  - name: TradingPair
    kind: substrate/Moonbeam
    processor:
      file: './node_modules/@subql/contract-processors/dist/moonbeam.js'
      options:
        abi: tradingPair
        # we do not know the address at this point, it will be provided when instantiated
    assets:
      tradingPair:
        file: ./src/tradingPair.abi.json
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleLiquidityAdded
          kind: substrate/MoonbeamEvent
          filter:
            topics:
              - liquidityAdded(address provider, uint256 amount1, uint256 amount2)
```

### `mappingHandlers.ts`

```ts
// This function is defined using `subql codegen` cli command
import { createTradingPairDatasource } from '../types';
import {MoonbeamEvent} from '@subql/contract-processors/dist/moonbeam';

async function handleNewTradingPair(event: MoonbeamEvent): Promise<void> {
  const { exchange, token1, token2 } = event.args;

  // Create a new datasource providing the address of the trading pair exchange contract
  await createTradingPairDatasource({ address: exchange });
}

async function handleLiquidityAdded(event: MoonbeamEvent): Promise<void> {
  /* mapping fuction implementation here */
}
```


## Xem dự án Nguồn dữ liệu động

Nguồn dữ liệu động được lưu trữ trong siêu dữ liệu của dự án. Nếu bạn cần xem chi tiết nào, bạn có thể truy vấn chúng như bên dưới:

```gql
{
  _metadata {
    dynamicDatasources
  }
}
```

Kết quả
```
{
  "data": {
    "_metadata": {
      "dynamicDatasources": "[{\"templateName\":\"TradingPair\",\"args\":{\"address\":\"0x0000000000000000000000000000000000000000\"},\"startBlock\":1358833}]"
    }
  }
}
```

