# 동적 데이터 소스

프로젝트를 시작할 때 데이터 소스의 모든 매개변수를 알지 못하는 경우가 있습니다. 이에 대한 예는 나중에 새 계약 인스턴스를 생성하는 계약 공장입니다. 이에 대한 계약 주소가 무엇인지 미리 아는 것은 불가능합니다. 여기에서 새로운 데이터 소스를 동적으로 생성할 수 있습니다.

## `템플릿` 필드

동적 데이터 소스를 사용하려면 사양 버전이 `0.2.1` 이상이어야 합니다. `0.2.0`을 사용 중이라면 specVersion을 변경하기만 하면 됩니다. 더 낮은 버전을 사용 중이라면 먼저 `subql migrate`를 사용하여 `0.2.0`으로 업데이트해야 합니다.

사양 버전 `0.2.1`에는 새로운 `템플릿` 필드가 도입되었습니다. 템플릿은 몇 가지 차이점이 있는 데이터 소스와 동일합니다.

* 템플릿을 식별하려면 `이름`이 필요합니다.
* `startBlock`은 더 이상 필요하지 않습니다. 이것은 데이터 소스가 생성되는 블록으로 설정됩니다.
* 사용자 지정 데이터 소스의 경우 `processor.options` 필드도 부분적으로 채울 수 있으며 나머지 옵션은 데이터 소스가 인스턴스화될 때 제공됩니다.

## 예시 프로젝트

동적 데이터 소스를 사용하는 방법을 보여주는 가장 좋은 방법은 예제를 사용하는 것입니다.

아래 예는 거래 쌍이 추가될 때 새 계약을 배포하는 공장 계약이 있는 분산형 거래소에 대한 것입니다. 프로젝트가 실행될 때 생성되었거나 생성될 모든 거래 쌍 계약의 주소를 알 수는 없습니다. 데이터 소스는 새로 생성된 거래 쌍 계약을 인덱싱하기 위해 템플릿에서 매핑 핸들러에 의해 동적으로 생성될 수 있습니다.


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


## 프로젝트 동적 데이터 소스 보기

동적 데이터 소스는 프로젝트 메타데이터에 저장됩니다. 어떤 세부 정보를 확인해야 하는 경우 아래와 같이 쿼리할 수 있습니다.

```gql
{
  _metadata {
    dynamicDatasources
  }
}
```

결과
```
{
  "data": {
    "_metadata": {
      "dynamicDatasources": "[{\"templateName\":\"TradingPair\",\"args\":{\"address\":\"0x0000000000000000000000000000000000000000\"},\"startBlock\":1358833}]"
    }
  }
}
```

