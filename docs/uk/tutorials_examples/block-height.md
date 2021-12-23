# Як почати з іншої висоти блоку?

## Відеоінструкція

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/ZiNSXDMHmBk" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Вступ

За замовчуванням усі стартові проекти починають синхронізувати блокчейн із блоку генезису. Іншими словами, з блоку 1. Для великих блокчейнів це зазвичай може зайняти дні або навіть тижні для повної синхронізації.

Щоб запустити синхронізацію вузла SubQuery з нульовою висотою, необхідно лише змінити ваш project.yaml файл, а також клавішу startBlock.

Нижче навдено приклад файлу project.yaml, де початковий блок був встановлений на 10000

```shell
specVersion: 0.0.1
description: ""
repository: ""
schema: ./schema.graphql
network:
  endpoint: wss://polkadot.api.onfinality.io/public-ws
  dictionary: https://api.subquery.network/sq/subquery/dictionary-polkadot
dataSources:
  - name: main
    kind: substrate/Runtime
    startBlock: 1000000
    mapping:
      handlers:
        - handler: handleBlock
          kind: substrate/BlockHandler
```

## Чому б не почати з нуля?

Основна причина в тому, що це може зменшити час для синхронізації блокчейну. Це означає, що якщо вам потрібні дані по транзакціям лише за останні 3 місяці, ви можете синхронізувати тільки останні 3 місяці, що займе менше часу і Ви зможете швидше присутпити до роботи.

## Які недоліки при початку з нуля?

Найбільш очевидним недоліком буде те, що ви не зможете запитувати дані в блокчейні для блоків, яких у вас немає.

## Як визначити поточну висоту блокчейну?

Якщо ви використовуєте мережу Polkadot, ви можете відвідати [https://polkascan.io/](https://polkascan.io/), обрати мережу, а потім переглянути фігуру "Finalised Block".

## Чи повинен я робити rebuild або codegen?

Ні. Оскільки ви змінюєте файл project.yaml, який, по суті, є файлом конфігурації, вам не доведеться перебудовувати або відновлювати код typescript.
