# Принос и участие в SubQuery

Добре дошли и ви благодаря, че обмисляте да допринесете за този SubQuery проект! Заедно можем да проправим пътя към по-децентрализирано бъдеще.

::: tip Note This documentation is actively maintained by the SubQuery team. Приветстваме и се радваме на вашия принос към проекта. Можете да го направите, като създадете форк на нашия GitHub проект и направите промени във всички файлове от документацията в директорията `документи`. :::

По-долу ви предоставяме набор от насоки (не правила) за принос към SubQuery. Следването на тези указания ще ни помогне да направим процеса на принос лесен и ефективен за всички участници. Това също означава, че се съгласявате да уважавате времето на разработчиците, които управляват и разработват този проект. В замяна ние ще отвърнем на това с доза уважение, като разгледаме проблема ви, ще разгледаме промените, ще си сътрудничим за подобрения и ще ви помогнем да финализирате заявките си.

::: info Contributing to the SubQuery Network There are specific contribution guidelines for the SubQuery Network [here](../subquery_network/community.md#contributing-to-codebases). :::

## Кодекс на поведение

We take our open source community projects and responsibility seriously and hold ourselves and other contributors to high standards of communication. By participating and contributing to this project, you agree to uphold our [Code of Conduct](https://github.com/subquery/subql/blob/main/CODE_OF_CONDUCT.md).

## Нека да започнем

Contributions to our repositories are made through Issues and Pull Requests (PRs). A few general guidelines that cover both:

- Потърсете съществуващи проблеми и заявки за изтегляне, преди да създадете свои собствени.
- We work hard to make sure issues are handled in promptly but, depending on the impact, it could take a while to investigate the root cause. Приятелското @ споменаване в коментарите към подателя или сътрудника, може да ви помогне да привлечете внимание, в случай че проблемът ви блокира.

## Как да допринесете

### Докладване на грешки

Bugs are tracked as GitHub issues. When logging an issue, explain the problem and include additional details to help maintainers reproduce the problem:

- Използвайте ясно и описателно заглавие на проблема, за да идентифицирате проблема.
- Опишете точните стъпки за възпроизвеждане на проблема.
- Describe the behaviour you observed after following the steps.
- Explain which behaviour you expected to see instead and why.
- Включете снимки на екрана, ако е възможно.

If it is a security issue, please review our documentation on [Vulnerability Reporting](./vulnerability-reporting.md)

### Подаване на заявки за изтегляне

In general, we follow the "fork-and-pull" Git workflow:

- Разклонете хранилището към вашия собствен Github акаунт.
- Клонирайте проекта на вашата машина.
- Създайте клон локално със сбито, но описателно име.
- Извършете промени в клона.
- Следвайки всички указания за форматиране и тестване, специфични за това репо.
- Изпратете промените във вашата вилица.
- Отворете PR в нашето хранилище.

## Правила за кодиране

### Git Commit съобщения

- Използвайте сегашно време („Добавяне на функция“, а не „Добавена функция“).
- Използвайте повелително наклонение („Преместване на курсора на...“, а не „Преместване на курсора на...“).
- Ограничете първия ред до 72 знака или по-малко.

### JavaScript Styleguide

- Целият JavaScript код е линтиран с Prettier и ESLint.
