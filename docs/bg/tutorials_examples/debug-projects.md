# Как да отстраняваме грешки в проект SubQuery?

## Видео ръководство

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/6NlaO-YN2q4" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Въведение

За отстраняване на бъгове или грешки в проекта SubQuery, такива например като поетапно изпълнение на код, задаване на брейкпоинт и проверка на променливи, ще трябва да използвате Node.js inspector в комбинация с инструменти за разработчици на Chrome.

## Инспектор на ноди

Изпълнете следната команда на екрана на терминала.

```shell
node --inspect-brk <path to subql-node> -f <path to subQuery project>
```

Например:
```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Debugger listening on ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
За помощ разгледайте: https://nodejs.org/en/docs/inspector
Прилага се упътване за отстраняване на грешки.
```

## Инструменти за разработчици в Chrome

Отворете Chrome DevTools и отидете в раздела Източници. Обърнете внимание, при щракване върху зелената икона ще се отвори нов прозорец.

![проверка на нода](/assets/img/node_inspect.png)

Отидете към Системата от файлове и добавете папката на вашия проект към работното пространство. След това отворете папката dist > mappings и изберете кода, който искате да отстраните. Разгледайте или отстранете кода, както бихте направили с всеки стандартен инструмент за отстраняване на грешки.

![отстраняване на бъгове в проектите](/assets/img/debugging_projects.png)
