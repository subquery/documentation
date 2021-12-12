# Найбільш поширенні питання

## Що таке SubQuery?

SubQuery - це проект з відкритим вихідним кодом, який дозволяє розробникам індексувати, змінювати та шукати Субстраційні дані ланцюгів до живлення їх додатків.

SubQuery також забезпечує безкоштовний промисловий хостинг проектів для розробників, видає відповідальність за розкручування інфраструктури, і дозволяє розробникам робити те, що вони роблять найкраще.

## Який найкращий спосіб розпочати роботу з SubQuery?

Найкращий спосіб розпочати роботу з SubQuery це спробувати наш <Hello world>. Це проста 5 хвилинна ходьба через завантаження шаблону старту, будівництво проекту, а потім використовуючи Docker для запуску вузла на вашому localhost і запуску простого запиту.

## Як я можу залишити свій внесок або відгук для SubQuery?

Ми любимо внески та відгуки від спільноти. Щоб внести свій код, зробіть форк репозиторію інтересу та внесіть зміни. Сформуйте PR або Pull Request. О, не забудьте також протестувати! Також перегляньте наші пошукові інструкції (TBA).

Щоб залишити зворотний зв'язок, зв'яжіться з нами за hello@subquery.network або стрибніть у наш [dicord канал](https://discord.com/invite/78zg8aBSMG)

## Скільки коштує провести мій проект в Проектах SubQuery замовлення?

Хостинг вашого проекту в SubQuery проекти абсолютно безкоштовний - це наш спосіб віддати спільноті. Щоб дізнатися, як розмістити ваш проект у нас, будь ласка, перевірте навчання [Привіт світ (вступний запит)](../quickstart/helloworld-hosted.md) на цьому пристрої.

## Що таке слоти розгортання?

Слоти розгортання є функцією в [Проектах для обробки інформації](https://project.subquery.network) що є еквівалентом середовища розробника. Наприклад, у будь-якій програмній організації зазвичай існує середовище розробки і виробниче середовище як мінімум (ігнорування місцевості, що є). Зазвичай додаткові оточення, такі як постановка та дошкільна діяльність або навіть QA, включені в залежності від потреб організації та налаштувань їх розвитку.

Підзапит наразі має два слоти. Стабільний слот і випуск слота. Це дозволить розробникам розгорнути її SubQuery в постановки і все пройшло добре, "підвищувати виробництво за один клік.

## Яка користь від постановки слота?

Основною перевагою використання стажирного слоту є те, що він дозволяє підготувати новий реліз вашого проекту SubQuery без публічного його викриття. Ви можете дочекатися переіндексування всіх даних, не впливаючи на виробничі програми.

Провізійний слот не відображається публічно в [Explorer](https://explorer.subquery.network/) і має унікальний URL, який видно лише вам. І, звичайно, окреме середовище дозволяє перевірити ваш новий код, не впливаючи на виробництво.

## Для чого призначено розширення?

Якщо ви вже знайомі з поняттями блокчейну, ви можете розглядати додаткові процеси, порівнюючи з транзакціями. Хоча, зовнішня частина інформації знаходиться поза ланцюжком і включається у блок. There are three categories of extrinsics. They are inherents, signed transactions, and unsigned transactions.

Inherent extrinsics are pieces of information that are not signed and only inserted into a block by the block author.

Signed transaction extrinsics are transactions that contain a signature of the account that issued the transaction. They stands to pay a fee to have the transaction included on chain.

Unsigned transactions extrinsics are transactions that do not contain a signature of the account that issued the transaction. Unsigned transactions extrinsics should be used with care because there is nobody paying a fee, becaused it is signed. Because of this, the transaction queue lacks economic logic to prevent spam.

For more information, click [here](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics).

## What is the endpoint for the Kusama network?

The network.endpoint for the Kusama network is `wss://kusama.api.onfinality.io/public-ws`.

## What is the endpoint for the Polkadot mainnet network?

The network.endpoint for the Polkadot network is `wss://polkadot.api.onfinality.io/public-ws`.

## How do I iteratively develop my project schema?

A known issue with developing a changing project schema is that when lauching your Subquery node for testing, the previously indexed blocks will be incompatible with your new schema. In order to iteratively develop schemas the indexed blocks stored in the database must be cleared, this can be achieved by launching your node with the `--force-clean` flag. For example:

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

Note that it is recommended to use `--force-clean` when changing the `startBlock` within the project manifest (`project.yaml`) in order to begin reindexing from the configured block. If `startBlock` is changed without a `--force-clean` of the project then the indexer will continue indexing with the previously configured `startBlock`.