# Часто Задаваемые Вопросы(FAQ)

## Что такое SubQuery?

SubQuery , это индексатор данных блокчейна с открытым исходным кодом для разработчиков, который предоставляет быстрые, гибкие, надежные и децентрализованные API для управления ведущими многоканальными приложениями.

Наша цель - это сэкономить время и деньги разработчиков, устранив необходимость разработки собственного решения для индексации. Сейчас они могут полностью сосредоточиться на разработке своих приложений. SubQuery - помогает разработчикам создавать децентрализованные продукты будущего.

<br/>
<figure class="video_container">
<iframe src="https://www.youtube.com/embed/gCpVz_mkWdo" title="Представляем сеть SubQuery" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscree="true"></iframe>
</figure>

**Управляемая служба подзапроса**

Подзапрос также предоставляет бесплатный хостинг проектов для разработчиков. Наш управляемый сервис устраняет ответственность за управление инфраструктурой, чтобы разработчики делали то, что они делали лучше — это строить. Подробнее [здесь](/run_publish/publish.md).

**Сеть SubQuery**

SubQuery Network позволяет разработчикам полностью децентрализовать свой стек инфраструктуры. Это самый открытый, производительный, надежный и масштабируемый сервис данных для dApps. SubQuery Network индексирует и предоставляет данные глобальному сообществу вознаграждаемым и поддающимся проверке способом. После публикации вашего проекта в SubQuery Network любой может индексировать и разместить его, предоставляя данные пользователям по всему миру быстрее и надежнее.

Подробнее [здесь](/subquery_network/introduction.md).

## Как лучше всего начать работу с SubQuery?

Лучший способ начать работу с SubQuery - попробовать наш учебник [Hello World](/assets/pdf/Hello_World_Lab.pdf). Это простоя 5 минутная прогулка по упражнению. Загрузите начальный шаблон, создайте проект, используйте Docker для запуска узла на вашем локальном хосте и запустите простой запрос.

## Как я могу внести свой вклад или оставить отзыв о SubQuery?

Нам нравится вклад и обратная связь от сообщества. Чтобы внести свой код, "форкните" интересующий вас репозиторий и внесите свои изменения. Далее отправьте PR или Pull Request. Не забудьте также протестировать. Also check out our [contributions guidelines](../miscellaneous/contributing.html).

Чтобы оставить отзыв, свяжитесь с нами по адресу hello@subquery.network или перейдите на наш канал [discord](https://discord.com/invite/78zg8aBSMG).

## Сколько стоит размещение моего проекта в SubQuery Projects?

This service is being provided to the community with a generous free tier! You can host your first two SubQuery projects for absolutely free!

## Что такое слоты развертывания?

Слоты развертывания - это функция в [SubQuery Managed Service](https://managedservice.subquery.network), которая является эквивалентом среды разработки. Например, в любой организации занимающейся программным обеспечением обычно есть как минимум среда разработки и производственная среда (без учета localhost). Обычно дополнительные условия, такие как постановка и пре-продакшен или даже QA, включаются в зависимости от потребностей организации и их разработки.

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

Конечная точка сети Kusama - `wss://kusama.api.onfinality.io/public-ws`.

## Что является конечной точкой для сети Polkado mainnet?

Конечная точка сети Polkadot является - `wss://polkadot.api.onfinality.io/public-ws`.

## Как итеративно разработать схему проекта?

Известной проблемой при разработке изменяющейся схемы проекта является то, что при запуске узла Subquery для тестирования ранее проиндексированные блоки будут несовместимы с новой схемой. Для итеративной разработки схем индексированные блоки, хранящиеся в базе данных, должны быть очищены, этого можно добиться, запустив узел с флагом `--force-clean`. Например:

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

Обратите внимание, что рекомендуется использовать `--force-clean` при изменении `startBlock` в манифесте проекта (`project.yaml`), чтобы начать переиндексацию с настроенного блока. Если `startBlock` изменен без `--force-clean` проекта, то индексатор продолжит индексирование с ранее настроенным `startBlock`.

## How can I optimise my project to speed it up?

Performance is a crucial factor in each project. Fortunately, there are several things you could do to improve it. Here is the list of some suggestions:

- Avoid using block handlers where possible.
- Query only necessary fields.
- Try to use filter conditions to reduce the response size. Create filters as specific as possible to avoid querying unnecessary data.
- For large data tables, avoid querying `totalCount` without adding conditions.
- Add indexes to entity fields for query performance, this is especially important for historical projects.
- Set the start block to when the contract was initialised.
- Always use a [dictionary](../tutorials_examples/dictionary.html#how-does-a-subquery-dictionary-work) (we can help create one for your new network).
- Optimise your schema design, keep it as simple as possible.
  - Try to reduce unnecessary fields and columns.
  - Create indexes as needed.
- Use parallel/batch processing as often as possible.
  - Use `api.queryMulti()` to optimise Polkadot API calls inside mapping functions and query them in parallel. This is a faster way than a loop.
  - Use `Promise.all()`. In case of multiple async functions, it is better to execute them and resolve in parallel.
  - If you want to create a lot of entities within a single handler, you can use `store.bulkCreate(entityName: string, entities: Entity[])`. You can create them in parallel, no need to do this one by one.
- Making API calls to query state can be slow. You could try to minimise calls where possible and to use `extrinsic/transaction/event` data.
- Use `worker threads` to move block fetching and block processing into its own worker thread. It could speed up indexing by up to 4 times (depending on the particular project). You can easily enable it using the `-workers=<number>` flag. Обращаем ваше внимание, что количество доступных ядер процессора строго ограничивает использование рабочих потоков. For now, it is only available for Substrate and Cosmos and will soon be integrated for Avalanche.
- Note that `JSON.stringify` doesn’t support native `BigInts`. Our logging library will do this internally if you attempt to log an object. We are looking at a workaround for this.
- Use a convenient `modulo` filter to run a handler only once to a specific block. This filter allows handling any given number of blocks, which is extremely useful for grouping and calculating data at a set interval. For instance, if modulo is set to 50, the block handler will run on every 50 blocks. It provides even more control over indexing data to developers and can be implemented like so below in your project manifest.
