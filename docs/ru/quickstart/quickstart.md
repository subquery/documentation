# 1. Создайте новый проект

Цель этого краткого руководства по началу работы - предоставить вам полную настройку разработки и пошаговые инструкции по созданию вашего первого блокчейн проекта SubQuery. Он ориентирован на опытных разработчиков и тех, кто только начинает свой путь в блокчейне.

Это краткое руководство по началу работы должно занять около 10-15 минут.

После завершения этого краткого руководства у вас будет рабочий проект SubQuery, который будет выполняться на ноде SubQuery. Вы сможете адаптировать стандартный стартовый проект и индексировать переводы из вашей любимой блокчейн сети, такой, как Polkadot, Avalanche, Cosmos и т. д.

Давайте начнем процесс создания вашего первого блокчейн проекта SubQuery.

## Prerequisites

Прежде чем вы начнете создавать свой первый блокчейн проект с помощью SubQuery, убедитесь, что у вас установлены необходимые вспомогательные программные приложения. Это:

- [Node](https://nodejs.org/en/): современная (например, LTS-версия) установка Node.
- [Docker](https://docker.com/): В этом руководстве будет использоваться Docker

Теперь вы готовы начать с первого шага, который заключается в установке SubQuery CLI.

## 1. Установите SubQuery CLI

Установите SubQuery CLI глобально на свой терминал с помощью NPM:

```shell
# NPM
npm install -g @subql/cli
```

**Примечание**: Мы **НЕ** поощряем использование `yarn global` для установки `@subql/cli` из-за его плохого управления зависимостями. Это может привести к многочисленным ошибкам.

Взгляните на все доступные команды и их использование. Выполните приведенную ниже команду в командной строке:

```shell
subql help
```

## 2. Инициализируем Начальный Проект SubQuery

Выполните следующую команду внутри каталога, в котором вы хотите создать проект SubQuery:

```shell
subql init
```

::: предупреждение **Для пользователей Cosmos**

Cosmos is not yet supported in SubQuery's CLI (`subql`). Hence, if you are using Cosmos, you must start with a Juno clone or fork this [starter project](https://github.com/subquery/cosmos-subql-starter).

To initialise your project with Cosmos, refer to these 4 steps shown in this [link.](https://github.com/subquery/juno-subql-starter#readme). Once you complete these 4 steps, **jump** to the [Make Changes to Your Project](../quickstart/quickstart.md#_3-make-changes-to-your-project) section. :::

You'll be asked certain questions as you proceed ahead:

- **Project name**: A project name for your SubQuery project
- **Network family**: The layer-1 blockchain network family that this SubQuery project will index. Используйте клавиши со стрелками для выбора из доступных вариантов. For example, Polkadot, Avalanche, Cosmos, or any other supported network.
- **Network**: The specific network that this SubQuery project will index. Используйте клавиши со стрелками для выбора из доступных вариантов. For example, Polkadot, Avalanche, or any other supported network.
- **Template project**: Select a SubQuery template project that will provide a starting point in the development. We suggest selecting the _"subql-starter"_ project.
- **RPC endpoint**: Provide an HTTPS URL to a running RPC endpoint, which will be used by default for this project. You can quickly access public endpoints for different networks, create your own private dedicated node using [OnFinality](https://app.onfinality.io), or just use the default endpoint. Этот узел RPC должен быть архивным узлом (иметь состояние полной цепочки). We will use the default value for this guide. Based on the network you have chosen, the default value may be:
  - For Polkadot - _"https://polkadot.api.onfinality.io"_
  - For Avalanche - _"https://avalanche.api.onfinality.io"_
  - For Terra - _“https://terra-columbus-5.beta.api.onfinality.io”_ and likewise for other networks. <br/>
- **Git repository**: Provide a Git URL to a repo that this SubQuery project will be hosted in (when hosted in SubQuery Explorer) or accept the provided default.
- **Authors**: Enter the owner of this SubQuery project here (e.g. your name!) or accept the provided default.
- **Description**: Provide a short paragraph about your project that describes what data it contains and what users can do with it, or accept the provided default.
- **Version**: Enter a custom version number or use the default (`1.0.0`)
- **License**: Provide the software license for this project or accept the default (`MIT`)

Let’s look at an example:

```shell
$ subql init
Project name [subql-starter]: HelloWorld
? Select a network family Substrate
? Select a network Polkadot
? Select a template project subql-starter     Starter project for subquery
RPC endpoint: [wss://polkadot.api.onfinality.io/public-ws]:
Git repository [https://github.com/subquery/subql-starter]:
Fetching network genesis hash... done
Author [Ian He & Jay Ji]: Sean
Description [This project can be used as a starting po...]:
Version [1.0.0]:
License [MIT]:
Preparing project... done
HelloWorld is ready
```

After you complete the initialisation process, you will see a folder with your project name created inside the directory. Please note that the contents of this directory should be identical to what's listed in the [Directory Structure](../build/introduction.md#directory-structure).

Finally, run the following command to install the new project’s dependencies from within the new project's directory.

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell cd PROJECT_NAME yarn install ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```shell cd PROJECT_NAME npm install ``` </CodeGroupItem> </CodeGroup>

You have now initialised your first SubQuery project with just a few simple steps. Let’s now customise the standard template project for a specific blockchain of interest.

You may want to refer to the [command line arguments](../run_publish/references.md) used in SubQuery. It will help you understand the commands better.

## 3. Make Changes to Your Project

There are 3 important files that need to be modified. Это:

1. Схема GraphQL в `schema.graphql`
2. Манифест проекта в `project.yaml`
3. Функции сопоставления в каталоге src / mappings /

SubQuery supports various blockchain networks and provides you with a dedicated guide for each of them.

Pick up your preferred network and proceed ahead to make the modifications required, and move an inch closer to finishing your first ever project:

**[Polkadot/Substrate](../quickstart/quickstart_chains/polkadot.md)**

**[Avalanche](../quickstart/quickstart_chains/avalanche.md)**

**[Cosmos](../quickstart/quickstart_chains/cosmos.md)**

**[Terra](../quickstart/quickstart_chains/terra.md)**
