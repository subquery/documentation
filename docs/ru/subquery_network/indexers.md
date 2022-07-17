# Индексаторы

## Кто такой индексатор?

Индексатор - это участник сети SubQuery, который отвечает за индексирование данных блокчейна и предоставление этих данных своим клиентам.

Индексаторы играют очень важную роль в сети SubQuery. Являясь частью бизнеса по предоставлению данных как услуги, индексатор превращает вычислительные и сетевые мощности в прибыль.

## Ставка индексатора

Для того чтобы получать вознаграждение от доходов от запросов в качестве индексатора, предлагается, что индексаторы должны делать ставки SQT против определенного проекта SubQuery, которому они предоставляют услуги. Производственная функция Кобба-Дугласа будет использоваться для определения вознаграждения, распределяемого каждому индексатору.

SubQuery планирует добавить в сеть ограничение, при котором индексатор должен поставить минимальное количество SQT на соответствующий пул вознаграждений, чтобы иметь возможность участвовать в соответствующем открытом соглашении. Они также должны сделать ставку на минимальную сумму по эквивалентному контракту на ставку для любых Закрытых соглашений таким же образом. Минимальная ставка индексатора должна составлять определенный процент от суммы вознаграждения по Соглашению за Era, что означает, что для продления Соглашения на более высокие объемы индексатор также должен увеличить свою ставку. Если доля индексатора уменьшится ниже этой минимальной суммы, он не сможет продлить Соглашение по существующей цене.

Если индексатора поймают на неправильном поведении (например, на предоставлении недействительных, неполных или неверных данных), он будет обязан перераспределить часть своих SQT (на конкретный пул вознаграждения ip) в казну фонда SubQuery, что уменьшит его долю SQT в сети и, следовательно, его потенциальное вознаграждение. Поскольку выделенная доля индексатора определяется процентом от его общего SQT, это окажет влияние на все остальные пулы вознаграждений, в которых участвует индексатор.

## Как вознаграждаются индексаторы?

Индексаторы вознаграждаются в SQT двумя способами:
- Вознаграждения из пулов вознаграждений SQT на основе распределения, определяемого производственной функцией Кобба-Дугласа.
- Прямые вознаграждения за запросы SQT из Закрытых соглашений, в которых участвует индексатор.

Индексаторы получают вознаграждение, которое платят потребители за предоставление данных блокчейна, которые запросил потребитель. Индексатор будет получать все вознаграждения от Закрытого соглашения. В противном случае плата распределяется в зависимости от объема выполненной работы (обслуженных заявок) и объема делегированного SQT - это распределение определяется путем применения производственной функции Кобба-Дугласа.

Для данного индексатора могут быть одновременно активны несколько пулов вознаграждений. Работа индексатора заключается в распределении своего SQT между этими пулами (в процентном соотношении от их общего SQT). Будет создан пул вознаграждений для каждого проекта, который Индексатор принимает PAYG, и пул вознаграждений для каждого рыночного соглашения, стороной которого является Индексатор.

## Привлечение делегаторов

Индексаторы могут увеличить свой потенциал заработка, привлекая Делегаторов. Делегаторы - это держатели токенов SQT, которые могут делегировать свои токены индексаторам для получения дополнительного вознаграждения. Индексаторы используют эти дополнительные токены для увеличения суммы, которую они выделяют на проекты по своему выбору. Это позволяет индексаторам увеличить свои доходы.

Индексаторы устанавливают ставку комиссии индексатора (ICR), которая представляет собой процент, зарабатываемый индексаторами. Оставшаяся сумма распределяется между индексатором и всеми делегаторами пропорционально размеру ставки/делегированной суммы. Поэтому Индексаторам необходимо решить, какую долю прибыли Индексатор хочет оставить себе, а какую разделить со своими Делегаторами. Более низкий ICR будет более привлекательным для делегаторов.

Например, индексатор А установил ICR 80% и получил SQT от 8 делегаторов. Это означает, что 8 делегаторов плюс сам Индексатор получат вознаграждение в размере оставшихся 20% от заработанного Индексатором. Доля будет разделена между ними пропорционально. Обратите внимание, что делегаторы должны делегировать свои токены в течение всей Era, чтобы иметь право на получение этих вознаграждений. Для получения дополнительной информации о вознаграждениях делегаторов см. раздел [Делегаторы](./delegators.md).

## Становление индексатором

Чтобы стать индексатором в сети SubQuery, индексатор должен обладать необходимым оборудованием, запускать необходимые службы SubQuery, иметь общедоступную сеть через статический IP или доменное имя и зарегистрироваться в качестве индексатора.

### Набор навыков индексатора

В целом, индексатор должен быть технически грамотным пользователем компьютера. Однако простота сети SubQuery и предлагаемых фреймворков позволяет даже начинающему разработчику успешно участвовать в проекте.

A basic user should be familiar with provisioning and managing servers, installing the SubQuery CLI tools, database management, and basic networking. More experienced users may run nodes in a clustered environment, incorporate monitoring and alerts and also more advanced networking management.

Finally, interested parties should be prepared to invest time in maintaining their indexing nodes and infrastructure.

### Staking requirements

Indexers are expected to stake and maintain a minimum amount of tokens. This is to ensure that Indexers have some skin in the game and are committed to supporting the network. SubQuery is yet to determine this but it is one of our [design philosophies](./design-philosophy.md) that this be as low and as accessible as possible.

Should an Indexer experience a slashable event and their staked SQT balance fall below the minimum required, they will have to top up their staked SQT in order to continue to earn rewards from their work.

### Hardware requirements

Indexers can either invest in their own infrastructure hardware or rent infrastructure from the likes of AWS, Google Cloud, Digital Ocean, Microsoft Azure etc.

### Maintenance/operational requirements

Here are some of the maintenance and/or operational requirements Indexers should expect:

- Always upgrade to the latest Subquery software version.
- Identify and take advantage of new indexing opportunities.
- Update project version to latest and reindex where necessary.
- Infrastructure maintenance:
  - Constantly monitoring and upsizing disk.
  - Right size query and indexing compute based on traffic.
  - Increase query services for increasing ingress traffic.

### Infrastructure

The minimum infrastructure requirement includes:

- At least one computational node to run the following services:
  - [Node (indexing) Service](https://www.npmjs.com/package/@subql/node).
  - [Query Service](https://www.npmjs.com/package/@subql/query).
  - [Indexer Coordinator Service](https://www.npmjs.com/package/@subql/indexer-coordinator).
- One database node to run Postgresql db (v12 and above).

More detailed information will come soon.

## Security & Performance considerations

Security and performance considerations are as follows.

### Operator Wallets

Secure storage of an Indexer’s wallet recovery seed phrase is highly recommended.

### Firewalls

Indexers need to keep security front of mind. Infrastructure security, in particular firewalls, should be implemented to prevent public exposure to personal ports.

Secure passwords should be used by default and password rotation policies should be considered.

### Indexer’s Performance

In order to generate desirable performances, Indexers need to consider various factors such as:

- the balance between their own stake and that of Delegators.
- the type of contract being served. The Indexer will receive all the query fees if it is a closed contract. If it is open, then an Indexer’s reward will depend on how many other Indexers there are.
- fulfilling of the Service Level Agreement (SLA) specifications (to avoid slashing penalties).
- the accuracy of the data being served to avoid slashing penalties.

## Selecting SubQuery Projects to Index

There are several indicators that an Indexer needs to consider when selecting a SubQuery project to index.

### Query Fee Opportunities

Some projects will have open or closed plans advertised by consumers.

When a Consumer advertises an open or closed plan for a project, they ultimately specify how much they are willing to pay for a set volume of requests. The more a Consumer is willing to pay, the more attractive the project will be for an Indexer. It also provides confidence that there will likely be recurring revenue from this SubQuery project.

### Project complexity

Projects will vary in computation requirements. Simple projects will only index a few parameters whereas more complicated projects will require more computation resources and more bandwidth. Indexers need to understand the complexity of the project and its hardware capabilities.

### Indexer Competition

Popular projects offering a high query volume that attract a large number of Indexers. This also implies that the rewards will be shared amongst more people. A single Indexer’s share may be less than a less popular project with a slightly lower query fee but with far fewer Indexers.

### Pricing Strategy

Indexers need to be aware of their operation cost and expected incomes to understand their break-even point. Some considerations are:

- How should Indexers set their plan prices?
- At what price can Indexers accept a service agreement or not?

### Advertisements

Indexers need to advertise themselves to Delegators as well as Consumers. Indexers may do this from their own website, in the Subquery forums or any other places deemed necessary. Some examples of the information to provide are:

- The background and experience of the Indexer or Indexer’s team.
- The hardware approach and why it provides superior performance.
- The customer support policy or SLA.
- Evidence of historical performances.

### Customer support

Indexers are highly encouraged to provide a communication method for its customers to report inavailability and also to provide feedback.
