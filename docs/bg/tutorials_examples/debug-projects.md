# Как отстранявате грешки в проект за подзаявка?

## Видео ръководство

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/6NlaO-YN2q4" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Въеведение

За отстраняване на грешки в проекти за подзаявки, като поетапно изпълнение на код, задаване на точки на прекъсване и проверка на променливи, ще трябва да използвате Node.js инспектор във връзка с инструментите за разработчици на Chrome.

## Инспектор на възли

Изпълнете следната команда на екрана на терминала.

```shell
node --inspect-brk <path to subql-node> -f <path to subQuery project>
```

Например:
```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Debugger listening on ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
```

## Инструменти за разработка на Chrome

Отворете Chrome DevTools и отидете в раздела Източници. Имайте предвид, че щракването върху зелената икона ще отвори нов прозорец.

![проверка на възел](/assets/img/node_inspect.png)

Navigate to Filesystem and add your project folder to the workspace. След това отворете папката dist > съпоставяния и изберете кода, който искате да отстраните. След това преминете през кода, както бихте направили с всеки стандартен инструмент за отстраняване на грешки.

![debugging projects](/assets/img/debugging_projects.png)
