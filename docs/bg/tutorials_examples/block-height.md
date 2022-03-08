# Как да започнете от различна височина на блока?

## Видео ръководство

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/ZiNSXDMHmBk" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Въведение

По подразбиране всички проекти при стартирането им започват синхронизирация на блокчейна от блока genesis. С други думи, от първи блок. За големите блокчейн обикновено може да отнеме няколко дни или дори седмици, за да се синхронизира напълно.

За да стартирате синхронизирането на възел на SubQuery от ненулева височина, всичко, което трябва да направите, е да модифицирате файла си project.yaml и променете ключа startBlock.

По-долу е файлът project.yaml, в който първоначалният блок беше зададен на 1 000 000

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

## Why not start from zero?

Основната причина е, че това може да намали времето за синхронизиране на blockchain. Това означава, че ако се интересувате само от транзакции от последните 3 месеца, можете да синхронизирате само Последните 3 месеца, което означава по-малко време за изчакване и ви позволява да започнете да се развивате по-бързо.

## Какви са недостатъците да не започнете от zero?

Най-очевидният недостатък ще бъде, че няма да можете да заявявате данни в блокчейна за блокове, които нямате.

## Как да определите текущата височина на блокчейна?

Ако използвате мрежата Polka dot, можете да посетите [https://polkascan.io/](https://polkascan.io/)изберете мрежа и след това прегледайте фигурата "Finalised Block".

## Трябва ли да възстановя или създам код?

Не. Тъй като променяте файла project.yaml, който по същество е конфигурационен файл, няма да се налага да възстановявате или пресъздавате кода на typescript.
