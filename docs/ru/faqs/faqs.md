# Часто Задаваемые Вопросы(FAQ)

## Что такое SubQuery?

SubQuery is an open source blockchain data indexer for developers that provides fast, flexible, reliable, and decentralised APIs to power leading multi-chain apps.

Our goal is to save developers' time and money by eliminating the need of building their own indexing solution. Now, they can fully focus on developing their applications. SubQuery helps developers create the decentralised products of the future.

<figure class="video_container">
<iframe src="https://www.youtube.com/embed/gCpVz_mkWdo" title="Introducing The SubQuery Network" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscree="true"></iframe>
</figure>

**SubQuery Managed Service**

SubQuery also provides free, production grade hosting of projects for developers. Our Managed Service removes the responsiblity of managing infrastructure, so that developers do what they do best — build. Find out more [here](/run_publish/publish.md).

**Сеть SubQuery**

The SubQuery Network allows developers to completely decentralise their infrastructure stack. It is the most open, performant, reliable, and scalable data service for dApps. SubQuery Network индексирует и предоставляет данные глобальному сообществу вознаграждаемым и поддающимся проверке способом.  После публикации вашего проекта в SubQuery Network любой может индексировать и разместить его, предоставляя данные пользователям по всему миру быстрее и надежнее.

More information [here](/subquery_network/introduction.md).

## Как лучше всего начать работу с SubQuery?

Лучший способ начать работу с SubQuery - попробовать наш учебник [Hello World](/assets/pdf/Hello_World_Lab.pdf). This is a simple 5 min walk through exercise. Download the starter template, build the project, use Docker to run a node on your localhost, and run a simple query.

## Как я могу внести свой вклад или оставить отзыв о SubQuery?

Нам нравится вклад и обратная связь от сообщества. To contribute the code, fork the repository of your interest and make your changes. Далее отправьте PR или Pull Request. Don't forget to test as well. Также ознакомьтесь с нашими рекомендациями внесению дополнений (будет анонсировано).

Чтобы оставить отзыв, свяжитесь с нами по адресу hello@subquery.network или перейдите на наш канал [discord](https://discord.com/invite/78zg8aBSMG).

## Сколько стоит размещение моего проекта в SubQuery Projects?

Hosting your project in SubQuery Projects is absolutely free — it is our way of giving back to the community. Please check out the [Hello World (SubQuery hosted)](../run_publish/publish.md) tutorial and learn how to host your project with us.

## Что такое слоты развертывания?

Слоты развертывания - это функция в [SubQuery Projects](https://project.subquery.network), которая является эквивалентом среды разработки. Например, в любой организации занимающейся программным обеспечением обычно есть как минимум среда разработки и производственная среда (без учета localhost). Обычно дополнительные условия, такие как постановка и пре-продакшен или даже QA, включаются в зависимости от потребностей организации и их разработки.

SubQuery в настоящее время имеет два доступных слота. Промежуточный слот и производственный слот. Это позволяет разработчикам установить свой SubQuery в промежуточную среду и если все хорошо, "продвинуть в производство" щелчком по кнопке.

## Каковы преимущества разбивающегося слота?

Основное преимущество использования промежуточного слота состоит в том, что он позволяет вам подготовить новую версию вашего проекта SubQuery, не раскрывая ее публично. Вы можете ждать обновления слота для переиндексации всех данных, не затрагивая ваших приложений.

Промежуточный слот не отображается публично в [Explorer](https://explorer.subquery.network/) и имеет уникальный URL, который видим только вам. И, конечно же, отдельная среда позволяет вам тестировать новый код, не ущерба вашему производству.

## Что такое "Экстрадивые" Polkadot?

Если вы уже знакомы с понятиями блокчейна, вы можете подумать о дополнительных функциях, сопоставимых с транзакциями. Однако более формально надстройками является часть информации, которая поступает извне цепи и включена в блок. Есть три категории надстроек. Они являются неотъемлемыми элементами, подписанными транзакциями и неподписанными транзакциями.

Inherent Extrinsics - это части информации, которые не подписаны и вставляются в блок автором блока.

Внешние подписанные транзакции - это транзакции, которые содержат подпись учетной записи, выданного транзакцией. Они должны заплатить комиссию за включение транзакции в цепочку.

Неподписанные транзакции – это транзакции, которые не содержат подписи счета, который выдает транзакцию. Extrinsics неподписанных транзакций следует использовать с осторожностью, поскольку никто не платит комиссию, так как они не подписаны. Из за этого в очереди транзакций отсутствует экономическая логика для предотвращения спама.

Для получения дополнительной информации нажмите [here](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics).

## Что такое конечная точка для сети Кусама?

Конечная точка сети Kusama  -  `wss://kusama.api.onfinality.io/public-ws`.

## Что является конечной точкой для сети Polkado mainnet?

Конечная точка сети Polkadot является - `wss://polkadot.api.onfinality.io/public-ws`.

## Как итеративно разработать схему проекта?

Известной проблемой при разработке изменяющейся схемы проекта является то, что при запуске узла Subquery для тестирования ранее проиндексированные блоки будут несовместимы с новой схемой. Для итеративной разработки схем индексированные блоки, хранящиеся в базе данных, должны быть очищены, этого можно добиться, запустив узел с флагом `--force-clean`. Например:

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

Обратите внимание, что рекомендуется использовать `--force-clean` при изменении `startBlock` в манифесте проекта (`project.yaml`), чтобы начать переиндексацию с настроенного блока. If `startBlock` is changed without a `--force-clean` of the project, then the indexer will continue indexing with the previously configured `startBlock`.
