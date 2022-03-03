# Dinamik Veri Kaynakları

Bir proje başlatıldığında veri kaynağının tüm parametrelerini bilmediğiniz durumlar vardır. Bunun bir örneği, daha sonraki bir tarihte yeni sözleşme örnekleri oluşturacak bir sözleşme fabrikasıdır. Sözleşme adreslerinin ne olacağını önceden bilmek imkansızdır. Dinamik olarak yeni veri kaynakları oluşturabilmek burada devreye girer.

## `templates` alanı

Dinamik veri kaynaklarını kullanmak için en az `0.2.1` spec sürümüne sahip olmanız gerekir. `0.2.0` sürümündeyseniz, tek yapmanız gereken specVersion'ı değiştirmektir. Daha düşük bir sürümdeyseniz ilk önce `subql migrate` ile `0.2.0` sürümüne güncelleştirmeniz gerekir.

`0.2.1` spec sürümü yeni bir `templates` alanı sunar. Birkaç farklılık dışında, şablonlar veri kaynaklarıyla aynıdır.

* Şablonu tanımlamak için bir `name` gereklidir
* `startBlock` artık gerekli değildir. Bu, veri kaynağının oluşturulduğu bloğa ayarlanacak
* Özel bir veri kaynağı durumunda, `processor.options` alanı da kısmen doldurulabilir, seçeneklerin geri kalanı veri kaynağı örneklendiğinde sağlanır.

## Örnek Proje

Dinamik veri kaynağının nasıl kullanılacağını göstermenin en iyi yolu bir örnektir.

Aşağıdaki örnek, bir ticaret çifti eklendiğinde yeni bir sözleşme uygulayan bir fabrika sözleşmesine sahip merkezi olmayan bir borsa içindir. Proje çalıştırıldığında, oluşturulan veya oluşturulacak tüm işlem çifti sözleşmesinin adreslerini bilmek mümkün değildir. Veri kaynakları, yeni oluşturulan ticaret çifti sözleşmelerini dizine eklemek için bir şablondan eşleme işleyicisi tarafından dinamik olarak oluşturulabilir.


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
// Bu işlev, `subql codegen` cli komutu kullanılarak tanımlanır
import { createTradingPairDatasource } from '../types';
import {MoonbeamEvent} from '@subql/contract-processors/dist/moonbeam';

async function handleNewTradingPair(event: MoonbeamEvent): Promise<void> {
  const { exchange, token1, token2 } = event.args;

  // Ticaret çifti değişim sözleşmesinin adresini sağlayan yeni bir veri kaynağı oluşturun
  await createTradingPairDatasource({ address: exchange });
}

async function handleLiquidityAdded(event: MoonbeamEvent): Promise<void> {
  /* mapping fuction implementation here */
}
```


## Dinamik Veri Kaynakları Projeleri Görme

Dinamik veri kaynakları metadata projelerinde depolanır. Hangi ayrıntıları görmeniz gerekiyorsa, bunları aşağıdaki gibi sorgulayabilirsiniz:

```gql
{
  _metadata {
    dynamicDatasources
  }
}
```

Sonuç
```
{
  "data": {
    "_metadata": {
      "dynamicDatasources": "[{\"templateName\":\"TradingPair\",\"args\":{\"address\":\"0x0000000000000000000000000000000000000000\"},\"startBlock\":1358833}]"
    }
  }
}
```

