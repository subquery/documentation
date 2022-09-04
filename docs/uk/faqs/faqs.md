# Часті Питання

## Що таке SubQuery?

SubQuery-це індексатор даних блокчейн з відкритим вихідним кодом для розробників, який надає швидкі, гнучкі, надійні й децентралізовані API-інтерфейси для підтримки провідних багатоланцюгових додатків.

Наша мета заощадити час і гроші розробників, позбавивши їх від необхідності створювати власне рішення для індексації. Тепер вони можуть повністю зосередитися на розробці своїх додатків. SubQuery допомагає розробникам створювати децентралізовані продукти майбутнього.

<figure class="video_container">
<iframe src="https://www.youtube.com/embed/gCpVz_mkWdo" title="Знайомство з SubQuery Network" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscree="true"></iframe>
</figure>

**SubQuery керована служба**

SubQuery також надає безплатний хостинг проєкт виробничого рівня для розробників. Наш керований сервіс знімає відповідальність за управління інфраструктурою, так що розробники роблять те, що у них виходить найкраще — створюють. Дізнайтеся більше [тут](/run_publish/publish.md).

**Про SubQuery Network**

SubQuery Network дозволяє розробникам повністю децентралізувати свій стек інфраструктури. Це відкритий, продуктивний, надійний і масштабований сервіс передачі даних для додатків. SubQuery Network індексує і надає дані світовій спільноті стимульованим і піддається перевірці способом.  Після публікації вашого проєкт в SubQuery Network будь-який охочий може проіндексувати й розмістити його, надаючи дані користувачам по всьому світу швидше й надійніше.

Більш детальна інформація [тут](/subquery_network/introduction.md).

## Який найкращий спосіб розпочати роботу з SubQuery?

Найкращий спосіб розпочати роботу з SubQuery це спробувати наш [Навчальний посібник з Hello World](/assets/pdf/Hello_World_Lab.pdf). Це проста 5-хвилинна прогулянка з вправою. Завантажте початковий шаблон, створіть проєкт, використовуйте Docker для запуску вузла на вашому локальному хості та виконайте простий запит.

## Як я можу внести або надати відгуки на SubQuery?

Ми любимо внески та відгуки громади. Щоб внести свій внесок в код, розгалузите цікавить Вас репозиторій і внесіть свої зміни. Сформуйте PR або Pull Request. Не забудьте також протестувати. Also check out our <a href="http://localhost:8080/miscellaneous/contributing.html">contributions guidelines.</a>

Щоб залишити відгук, зв'яжіться з нами за адресою hello@subquery.network або перейдіть на наш канал [discord](https://discord.com/invite/78zg8aBSMG).

## Скільки коштує розміщення мого проекту в проектах SubQuery?

This service is being provided to the community with a generous free tier! You can host your first two SubQuery projects for absolutely free!

## Що таке слоти розгортання?

Слоти розгортання функція в [SubQuery Projects](https://project.subquery.network) це еквівалент середовища розробки. Наприклад, в будь-якій організації, що займається розробкою програмного забезпечення, зазвичай існує середовище розробки й, як мінімум, виробниче середовище (ігноруючи localhost, тобто). Зазвичай Додаткові середовища, такі як проміжна і попередня підготовка або навіть контроль якості, включаються в залежності від потреб організації та їх налаштування розробки.

SubQuery зараз доступно два слоти. Проміжний слот і виробничий слот. Це дозволяє розробникам розгортати свої під запити в проміжному середовищі, і все йде добре, "просуваючись до виробництва" одним натисненням кнопки.

## У чому перевага проміжного слота?

Основна перевага використання проміжного слота полягає в тому, що він дозволяє вам підготувати новий випуск вашого проєкт SubQuery, не розкриваючи його публічно. Ви можете дочекатися, поки проміжний слот переіндексує всі дані, не зачіпаючи ваші робочі програми.

Проміжний слот не показується публіці в [Explorer](https://explorer.subquery.network/) і має унікальну URL-адресу, яку видно тільки вам. І, звичайно ж, окреме середовище дозволяє вам тестувати ваш новий код, не впливаючи на продуктивність.

## Що таке Polkadots Extrinsic?

Якщо ви вже знайомі з концепціями блокчейн, ви можете думати про зовнішній як про порівнянного з транзакціями. Більш формально, однак, зовнішня інформація частина інформації, яка надходить ззовні ланцюжка і включається в блок. Існує три категорії зовнішніх факторів. Це невіддільна, підписані транзакції та непідписані транзакції.

Невіддільна зовнішніми елементами є фрагменти інформації, які не підписуються і вставляються в блок тільки автором блоку.

Зовнішні транзакції з підписом транзакції, що містять підпис облікового запису, який видав транзакцію. Вони повинні заплатити комісію, щоб транзакція була включена в ланцюжок.

Непідписані зовнішні транзакції, які не містять підпису облікового запису, що видав транзакцію. Непідписані зовнішні транзакції слід використовувати з обережністю, тому що ніхто не платить комісію, тому що вони не підписані. Через це в черзі транзакцій відсутня економічна логіка для запобігання спаму.

Для отримання додаткової інформації натисніть [тут](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics).

## Що є кінцевою точкою для Kusama network?

Кінцевою точкою network.endpoint для Kusama network є `wss://kusama.api.onfinality.io/public-ws`.

## Яка кінцева точка для основної мережі Polkadot?

Кінцевою точкою network.endpoint для Polkadot network є `wss://polkadot.api.onfinality.io/public-ws`.

## Як я можу ітеративна розробити схему мого проєкту?

Відома проблема при розробці змінної схеми проєкту полягає в тому, що при запуску вашого вузла Subquery для тестування раніше проіндексовані блоки будуть несумісні з вашою новою схемою. Для ітеративної розробки схем необхідно очистити індексовані блоки, що зберігаються в базі даних, цього можна досягти, запустивши ваш вузол з `--force-clean` прапором. Наприклад:

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

Зверніть увагу, що рекомендується використовувати `--force-clean` при зміні `startBlock` в рамках маніфесту проєкту (`project.yaml`) для того, щоб почати пере індексацію з налаштованого блоку. Якщо `startBlock` змінюється без `--force-clean` проєкту, то індекси продовжать індексування за допомогою раніше налаштованих `startBlock`.


## Як я можу оптимізувати свій проєкт, щоб прискорити його?

Продуктивність є вирішальним фактором у кожному проєкті. На щастя, є кілька речей, які ви могли б зробити, щоб її покращити. Ось список деяких пропозицій:

- Уникайте використання обробників блоків, де це можливо.
- Запитуйте лише необхідні поля.
- Намагайтеся використовувати умови фільтра, щоб зменшити розмір відповіді. Створюйте фільтри якомога конкретніше для уникнення непотрібних даних.
- For large data tables, avoid querying `totalCount` without adding conditions.
- Add indexes to entity fields for query performance, this is especially important for historical projects.
- Set the start block to when the contract was initialised.
- Always use a [dictionary](../tutorials_examples/dictionary.html#how-does-a-subquery-dictionary-work) (we can help create one for your new network).
- Optimise your schema design, keep it as simple as possible.
    - Try to reduce unnecessary fields and columns.
    - Create  indexes as needed.
- Use parallel/batch processing as often as possible.
    - Use `api.queryMulti()` to optimise Polkadot API calls inside mapping functions and query them in parallel. This is a faster way than a loop.
    - Use `Promise.all()`. In case of multiple async functions, it is better to execute them and resolve in parallel.
    - If you want to create a lot of entities within a single handler, you can use `store.bulkCreate(entityName: string, entities: Entity[])`. You can create them in parallel, no need to do this one by one.
- Making API calls to query state can be slow. You could try to minimise calls where possible and to use `extrinsic/transaction/event` data.
- Use `worker threads` to move block fetching and block processing into its own worker thread. It could speed up indexing by up to 4 times (depending on the particular project). You can easily enable it using the `-workers=<number>` flag. Зауважте, що кількість доступних ядер ЦП суворо обмежує використання робочих потоків. For now, it is only available for Substrate and Cosmos and will soon be integrated for Avalanche.
- Note that `JSON.stringify` doesn’t support native `BigInts`. Our logging library will do this internally if you attempt to log an object. We are looking at a workaround for this.
- Use a convenient `modulo` filter to run a handler only once to a specific block. This filter allows handling any given number of blocks, which is extremely useful for grouping and calculating data at a set interval. For instance, if modulo is set to 50, the block handler will run on every 50 blocks. It provides even more control over indexing data to developers and can be implemented like so below in your project manifest.