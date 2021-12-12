# Làm thế nào để bắt đầu ở một block height khác?

## Video hướng dẫn

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/ZiNSXDMHmBk" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Giới thiệu

By default, all starter projects start synchronising the blockchain from the genesis block. In otherwords, from block 1. For large blockchains, this can typically take days or even weeks to fully synchronise.

Để bắt đầu đồng bộ hóa nút SubQuery từ height khác 0, tất cả những gì bạn phải làm là sửa đổi tệp project.yaml của mình và thay đổi khóa startBlock.

Dưới đây là tệp project.yaml trong đó khối bắt đầu đã được đặt thành 1.000.000

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

## Tại sao không bắt đầu từ con số không?

The main reason is that it can reduce the time to synchronise the blockchain. This means that if you are only interested in transactions in the last 3 months, you can only synchronise the last 3 months worth meaning less waiting time and you can start your development faster.

## Hạn chế của việc không bắt đầu từ con số 0 là gì?

Hạn chế rõ ràng nhất sẽ là bạn sẽ không thể truy vấn dữ liệu trên blockchain cho các khối mà bạn không có.

## Làm thế nào để tìm ra chiều cao blockchain hiện tại?

Nếu bạn đang sử dụng mạng Polkadot, bạn có thể truy cập [ https://polkascan.io/ ](https://polkascan.io/), chọn mạng và sau đó xem hình "Khối được hoàn thiện".

## Tôi có phải xây dựng lại hoặc tạo mã không?

No. Because you are modifying the project.yaml file, which is essentially a configuration file, you will not have to rebuild or regenerate the typescript code.
