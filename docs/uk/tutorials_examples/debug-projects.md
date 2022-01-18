# Як дебажити проект SubQuery?

## Відеоінструкція

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/6NlaO-YN2q4" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Вступ

Для того, щоб проводити дебаг проектів SubQuery, такі як наприклад покрокове виконання коду, налаштування точок зупинки коду та перевірку змінних, вам доведеться використовувати інспектор Node.js у поєднанні з інструментами розробника Chrome.

## Node Інспектор

Запустіть наступну команду в терміналі.

```shell
node --inspect-brk -f
```

Наприклад:
```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Debugger listening on ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
```

## Інструменти розробника Chrome

Відкрийте Chrome DevTools та перейдіть до вкладки Джерела. Зверніть увагу, що натискання на зелений значок відкриє нове вікно.

![node inspect](/assets/img/node_inspect.png)

Перейдіть до файлової системи і додайте папку вашого проекту до робочої області. Потім відкрийте папку dist > mappings та оберіть код, який ви бажаєте дебажити. Тоді пройдіться по коду із будь-яким стандартним інструментом для дебагу.

![debugging projects](/assets/img/debugging_projects.png)
