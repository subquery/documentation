# Wie kann man ein SubQuery-Projekt debuggen?

## Videoanleitung

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/6NlaO-YN2q4" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Die Einführung

Um SubQuery-Projekte zu debuggen, wie z. B. das schrittweise Durchlaufen von Code, das Festlegen von Haltepunkten und das Untersuchen von Variablen, müssen Sie einen Node.js-Inspektor in Verbindung mit Chrome-Entwicklertools verwenden.

## Nodeinspektor

Führen Sie den folgenden Befehl in einem Terminalbildschirm aus.

```shell
node --inspect-brk <path to subql-node> -f <path to subQuery project>
```

Zum Beispiel:
```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Debugger listening on ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
Hilfe finden Sie unter: https://nodejs.org/en/docs/inspector
Debugger attached.
```

## Chrome devtools

Öffnen Sie Chrome DevTools und navigieren Sie zur Registerkarte Quellen. Beachten Sie, dass durch Klicken auf das grüne Symbol ein neues Fenster geöffnet wird.

![Nodeinspektion](/assets/img/node_inspect.png)

Navigieren Sie zu Dateisystem und fügen Sie Ihren Projektordner zum Arbeitsbereich hinzu. Öffnen Sie dann die Dist > Mappings-Ordner und wählen Sie den Code aus, den Sie debuggen möchten. Gehen Sie dann wie bei jedem Standard-Debugging-Tool durch den Code.

![Debugging-Projekte](/assets/img/debugging_projects.png)
