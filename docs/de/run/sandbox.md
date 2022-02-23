# Sandbox

In unserem vorgesehenen Nutzungsszenario wird die SubQuery-Node normalerweise von einem vertrauenswürdigen Host ausgeführt, und der Code des SubQuery-Projekts, der vom Benutzer an die Node gesendet wird, ist nicht vollständig vertrauenswürdig.

Einige bösartige Codes werden wahrscheinlich den Host angreifen oder sogar kompromittieren und die Daten anderer Projekte auf demselben Host beschädigen. Daher verwenden wir den [VM2](https://www.npmjs.com/package/vm2)-Sandbox-gesicherten Mechanismus, um Risiken zu reduzieren. Dieses:

- Führt nicht vertrauenswürdigen Code sicher in einem isolierten Kontext aus und bösartiger Code greift nicht auf das Netzwerk und das Dateisystem des Hosts zu, es sei denn, über die exponierte Schnittstelle, die wir in die Sandbox eingefügt haben.

- Ruft sicher Methoden auf und tauscht Daten und Rückrufe zwischen Sandboxen aus.

- Ist gegen viele bekannte Angriffsmethoden immun.


## Die Beschränkungen

- Um den Zugriff auf bestimmte integrierte Module einzuschränken, nur `assert`, `buffer`, `crypto`, `util` und ` path` stehen auf der Whitelist.

- Wir unterstützen [Module von Drittanbietern](../create/mapping.md#third-party-libraries), die in **CommonJS** und **Hybrid**-Bibliotheken wie `@polkadot/*` geschrieben sind und standardmäßig ESM verwenden.

- Alle Module, die `HTTP` und `WebSocket` verwenden, sind verboten.
