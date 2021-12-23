# Привіт Світ пояснив

У посібнику з швидкого старту [ Hello World ](helloworld-localhost.md) ми пройшли кілька простих команд і дуже швидко отримали приклад і запущено. Це дозволило вам переконатися, що у вас є всі попередні реквізити, і ви можете використовувати місцевий майданчик, щоб зробити простий запит, щоб отримати перші дані з SubQuery. Тут ми детальніше розглянемо, що означають усі ці команди.

## subql init

Перша команда, яку ми виконували, була ` subql init --starter subqlHelloWorld `.

Це робить важкий підйом і створює для вас цілу купу файлів. Як зазначається в [ офіційній документації ](quickstart.md#configure-and-build-the-starter-project), ви в основному будете працювати над такими файлами:

- Маніфест в `project.yaml`
- Схема GraphQL в `схемі a.graphql`
- Картографування функціонує в каталозі ` src / mappings / `

![key subql files](/assets/img/main_subql_files.png)

Ці файли є основою всього, що ми робимо. Як такий, ми приділимо більше часу цим файлам в іншій статті. Поки що просто знайте, що схема містить опис даних, які користувачі можуть запитувати з API SubQuery, файлу проекту yaml, який містить параметри типу "конфігурація", і, звичайно, картографічні обробники, що містять машинопис, який містить функції, що перетворюють дані.

## yarn install

Наступне, що ми зробили - `yarn install`. `встановлення npm` також може бути використано.

> Короткий урок історії. Node Package Manager або npm спочатку був випущений у 2010 році і є надзвичайно популярним менеджером пакетів серед розробників JavaScript. Це пакет за замовчуванням, який автоматично встановлюється кожного разу, коли ви встановлюєте Node.js у свою систему. Спочатку компанія Yarn була випущена Facebook у 2016 році з наміром вирішити деякі недоліки у виконанні та безпеці роботи з npm (на той час).

Що робить yarn - це подивитися на файл ` package.json ` та завантажити різні інші залежності. Looking at the `package.json` file, it doesn't look like there are many dependencies, but when you run the command, you'll notice that 18,983 files are added. This is because each dependency will also have its own dependencies.

![key subql files](/assets/img/dependencies.png)

## yarn codegen

Then we ran `yarn codegen` or `npm run-script codegen`. What this does is fetch the GraphQL schema (in the `schema.graphql`) and generates the associated typescript model files (Hence the output files will have a .ts extension). You should never change any of these generated files, only change the source `schema.graphql` file.

![key subql files](/assets/img/typescript.png)

## yarn build

`yarn build` or `npm run-script build` was then executed. This should be familiar for seasoned programmers. It creates a distribution folder performing things such as code optimisation preparing for a deployment.

![key subql files](/assets/img/distribution_folder.png)

## docker-compose

The final step was the combined docker command `docker-compose pull && docker-compose up` (can be run separately as well). The `pull` command grabs all the required images from Docker Hub and the `up` command starts the container.

```shell
> docker-compose pull
Pulling postgres        ... done
Pulling subquery-node   ... done
Pulling graphql-engine  ... done
```

When the container is started, you'll see the terminal spit out lots of text showing the status of the node and the GraphQL engine. It's when you see:

```
subquery-node_1   | 2021-06-06T02:04:25.490Z <fetch> INFO fetch block [1, 100]
```

that you know that the SubQuery node has started to synchronise.

## Підсумок

Now that you've had an insight into what is happening under the covers, the question is where to from here? If you are feeling confident, you can jump into learning about how to [create a project](../create/introduction.md) and learn more about the three key files. The manifest file, the GraphQL schema, and the mappings file.

Otherwise, continue to our tutorials section where we look at how we can run this Hello World example on SubQuery's hosted infrastructure, we'll look at modifying the start block, and we'll take a deeper dive at running SubQuery projects by running readily available and open source projects.
