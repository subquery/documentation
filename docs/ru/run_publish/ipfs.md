# Хостинг проекта с использованием IPFS

В этом руководстве рассказывается, как опубликовать локальный проект SubQuery в [IPFS](https://ipfs.io/) и развернуть его в нашей инфраструктуре хостинга.

Hosting a project in IPFS makes it available for all and reduces your reliance on centralised services like GitHub.

## Требования

- `@subql/cli` версии 0.21.0 или выше.
- Манифест `specVersion` 0.2.0 и выше.
- Get your [SUBQL_ACCESS_TOKEN](ipfs.md#prepare-your-subql-access-token) ready.
- Чтобы обеспечить успешное развертывание, мы настоятельно рекомендуем вам собрать проект с помощью команды `subql build` и протестировать его локально перед публикацией.

## Подготовьте свой SUBQL_ACCESS_TOKEN

- Шаг 1. Перейдите в раздел [SubQuery Projects](https://project.subquery.network/) и войдите в систему.
- Step 2: Click on your profile at the top right of the navigation menu, then click on **_Refresh Token_**.
- Шаг 3: Скопируйте сгенерированный токен.
- Шаг 4: Чтобы использовать этот токен:
  - Вариант 1: Добавьте SUBQL_ACCESS_TOKEN в переменные среды. `EXPORT SUBQL_ACCESS_TOKEN=<token>`
  - Вариант 2: (последует в скором времени) `subql/cli` будет поддерживать локальное хранение вашего SUBQL_ACCESS_TOKEN.

## Как опубликовать проект

We provide two methods to publish your project:

### Option 1

As you have `@subql/cli` already installed, you can run the following command, which will read the project and required information from its default manifest `project.yaml`:

```
// Публикуем из корневого каталога вашего проекта
subql publish

// ИЛИ указываем корневую директорию вашего проекта
subql publish -f ~/my-project/
```

### Option 2

В качестве альтернативы предположим, что в вашем проекте есть несколько manifest файлов, например, вы поддерживаете несколько сетей, но используете одно и то же сопоставление и бизнес-логику, а структура проекта выглядит следующим образом:

```
L projectRoot
 L src/
 L package.json
 L polkadot.yaml (Manifest для Polkadot network)
 L kusama.yaml   (Manifest для Kusama network)
 ...
```

Вы всегда можете опубликовать проект с выбранным файлом манифеста.

```
 #Это опубликует проект с поддержкой индексации сети Polkadot
subql publish -f ~/my-projectRoot/polkadot.yaml
```

## После публикации

После успешной публикации проекта приведенные ниже логи показывают, что проект был создан в кластере IPFS и вернул свой `CID` (идентификатор контента).

```
Building and packing code... done
Uploading SupQuery project to IPFS
SubQuery Project uploaded to IPFS: QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd  //CID
```

Обратите внимание на этот `CID`. With this `CID`, you can view your published project as what we call it [IPFS Deployment](ipfs.md#ipfs-deployment).

## IPFS Deployment

Развертывание в IPFS представляет собой независимое и уникальное существование проекта SubQuery в децентрализованной сети. Поэтому любые изменения с кодом в проекте повлияют на его уникальность. Если вам нужно перестроить свою бизнес-логику, например, изменить функцию сопоставления, вы должны повторно опубликовать проект, и `CID` изменится.

For now, to view the project you have published, use a `REST` api tool such as [Postman](https://web.postman.co/), and use `POST` method with the following example URL to retrieve it:`https://ipfs.subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`.

You should see the example project deployment as below.

Это развертывание очень похоже на ваш файл манифеста. Вы можете ожидать эти описательные поля, а конечная точка сети и словаря была удалена, поскольку они не влияли напрямую на результат выполнения проекта.

Те файлы, которые использовались в вашем локальном проекте, также были упакованы и опубликованы в IPFS.

```yaml
dataSources:
  - kind: substrate/Runtime
    mapping:
      file: ipfs://QmTTJKrMVzCZqmRCd5xKHbKymtQQnHZierBMHLtHHGyjLy
      handlers:
        - handler: handleBlock
          kind: substrate/BlockHandler
        - filter:
            method: Deposit
            module: balances
          handler: handleEvent
          kind: substrate/EventHandler
        - handler: handleCall
          kind: substrate/CallHandler
    startBlock: 8973820
network:
  genesisHash: "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3"
schema:
  file: ipfs://QmTP5BjtxETVqvU4MkRxmgf8NbceB17WtydS6oQeHBCyjz
specVersion: 0.2.0
```

## Запустите свой проект SubQuery в размещенной службе

### Создать проект с развертыванием в IPFS

You can follow the guide to [Publish your SubQuery project](../run_publish/publish.md) but where you set your deployment source you can select **IPFS**.

Затем выберите производственный слот, скопируйте и вставьте CID развертывания IPFS (без начального `ipfs://`).

Вы должны увидеть развертывание IPFS в разделе предварительного просмотра. И вы можете выбрать сеть, конечные точки словаря и т. д.

После успешного развертывания IPFS deployment в нашей размещенной службе оно должно быть доступно для просмотра в SubQuery Explorer, вы можете получить доступ к службе запросов так же, как и локально.
