# Агрегатні функції

## Group By

SubQuery підтримує розширені агрегатні функції, що дозволяють вам здійснювати обчислення щодо набору значень під час вашого запиту.

Агрегуючі функції зазвичай використані з функцією GroupBy у вашому запиті.

GroupBy дозволяє вам швидко отримувати чіткі цінності в наборі від SubQuery в єдиному запиті.

![Graphql Groupby](/assets/img/graphql_aggregation.png)

## Розширені агрегатні функції

SubQuery надає наступні агрегатні функції, коли в небезпечному режимі –

- `sum` (застосовується до числових полів) - результат додавання всіх значень разом
- `distinctCount` (застосовується до всіх полів) - кількість різних значень
- `min` (застосовується до числових полів) - найменше значення
- `max` (застосовується до числових полів) - найбільше значення
- `average` (застосовується до числових полів) - середнє (середнє арифметичне) значення
- `stddevSample` (застосовується до числових полів) - стандартне відхилення вибірки значень
- `stddevPopulation` (застосовується до числових полів) - стандартне відхилення величин населення
- `varianceSample` (застосовується до числових полів) - похибка вибірки значень
- `variancePopulation` (застосовується до числових полів) - дисперсія генеральної сукупності значень

SubQuery's implementation of aggregate functions is based on [pg-aggregates](https://github.com/graphile/pg-aggregates), you can find more information there.

**Please note that you must enable the `--unsafe` flag on the query service in order to use these functions. [Read more](./references.md#unsafe-2). Note that the `--unsafe` command will prevent your project from being run in the SubQuery Network, and you must contact support if you want this command to be run with your project in [SubQuery's managed service](https://project.subquery.network))**.
