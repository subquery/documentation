# Розміщення проекту за допомогою IPFS

У цьому посібнику описано, як опублікувати локальний проект SubQuery в [IPFS](https://ipfs.io/) і розгорнути його в нашій інфраструктурі хостингу.

Hosting a project in IPFS makes it available for all and reduces your reliance on centralised services like GitHub.

## Вимоги

- `@subql/cli` version 0.21.0 or above.
- Маніфест `specVersion` 0.2.0 або вище.
- Get your [SUBQL_ACCESS_TOKEN](ipfs.md#prepare-your-subql-access-token) ready.
- Щоб переконатися в успіху вашого розгортання, ми наполегливо рекомендуємо вам створити проект за допомогою команди `subql build` і протестувати його локально перед публікацією.

## Підготуйте свій SUBQL_ACCESS_TOKEN

- Крок 1. Перейдіть до [SubQuery Projects](https://project.subquery.network/) та увійдіть.
- Step 2: Click on your profile at the top right of the navigation menu, then click on **_Refresh Token_**.
- Крок 3: скопіюйте згенерований токен.
- Крок 4. Щоб використовувати цей токен:
  - Варіант 1. Додайте SUBQL_ACCESS_TOKEN у змінні середовища. `EXPORT SUBQL_ACCESS_TOKEN=<token>`
  - Варіант 2. Незабаром `subql/cli` підтримуватиме локальне зберігання вашого SUBQL_ACCESS_TOKEN.

## Як опублікувати проект

We provide two methods to publish your project:

### Option 1

As you have `@subql/cli` already installed, you can run the following command, which will read the project and required information from its default manifest `project.yaml`:

```
// Опублікувати його з кореневого каталогу вашого проекту
subql опублікувати

// АБО вказуйте на корінь вашого проекту
subql опублікувати -f ~/мій-проект/
```

### Option 2

Крім того, припустімо, що у вашому проекті є кілька файлів маніфесту, наприклад, ви підтримуєте кілька мереж, але використовуєте однакове відображення та бізнес-логіку та маєте таку структуру проекту:

```
L projectRoot
 L src/
 L package.json
 L polkadot.yaml (Manifest for Polkadot network)
 L kusama.yaml   (Manifest for Kusama network)
 ...
```

Ви завжди можете опублікувати проект із вибраним файлом маніфесту.

```
 # Це опублікує підтримку проекту індексування мережі Polkadot
subql опублікувати -f ~/my-projectRoot/polkadot.yaml
```

## Після публікації

Після успішної публікації проекту наведені нижче журнали вказують, що проект було створено в кластері IPFS і повернуто його `CID` (ідентифікатор вмісту).

```
Побудова та код упаковки... виконано
Завантаження проекту SupQuery в IPFS
Проект SubQuery, завантажений до IPFS: QmZ3q7YZSmhwBiot4PQCK3c7Z6HkteswN2Py58gkkZ8kNd //CID
```

Будь ласка, зверніть увагу на `CID`. With this `CID`, you can view your published project as what we call it [IPFS Deployment](ipfs.md#ipfs-deployment).

With `@subql/cli` version 1.3.0 or above, when using `subql publish` it will store a copy of the project's `IPFS CID` in a file in your project directory, the naming of the file will be consistent with your project.yaml. For example, if your manfiest file is named `project.yaml`, the IPFS file will be named  `.project-cid`.

## Розгортання в IPFS

Розгортання IPFS являє собою незалежне та унікальне існування проекту SubQuery в децентралізованій мережі. Тому будь-які зміни коду в проекті вплинуть на його унікальність. Якщо вам потрібно налаштувати свою бізнес-логіку, напр. змінити функцію відображення, ви повинні повторно опублікувати проект, і `CID` зміниться.

For now, to view the project you have published, use a `REST` api tool such as [Postman](https://web.postman.co/), and use `POST` method with the following example URL to retrieve it:`https://ipfs.subquery.network/ipfs/api/v0/cat?arg=<YOUR_PROJECT_CID>`.

You should see the example project deployment as below.

Це розгортання дуже схоже на ваш файл маніфесту. Ви можете очікувати цих описових полів, а кінцеву точку мережі та словника було видалено, оскільки вони не впливали безпосередньо на результат виконання проекту.

Ці файли, які використовувалися у вашому локальному проекті, також були запаковані та опубліковані в IPFS.

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

## Запустіть проект SubQuery на розміщеній службі

### Створіть проект із розгортанням IPFS

You can follow the guide to [Publish your SubQuery project](../run_publish/publish.md) but where you set your deployment source you can select **IPFS**.

Потім виберіть свій робочий слот, скопіюйте та вставте свій CID розгортання IPFS (без початкового `ipfs://`).

Ви повинні побачити розгортання IPFS у розділі попереднього перегляду. І ви можете вибрати мережу, кінцеві точки словника тощо.

Після успішного розгортання розгортання IPFS на нашій розміщеній службі він повинен бути доступний для перегляду в SubQuery Explorer, ви можете отримати доступ до служби запитів так само, як і локально.
