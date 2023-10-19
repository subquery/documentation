# Migrieren von GitHub zu IPFS-Bereitstellungen

Um die Bereitstellung von Projekten auf dem Managed Service zu vereinfachen, verwerfen wir GitHub-Bereitstellungen zugunsten von IPFS.

Die Verwendung von IPFS bietet Entwicklern in mehrfacher Hinsicht ein besseres Erlebnis:

- Anders als bei GitHub-Bereitstellungen werden Projekte lokal auf Ihrem Computer erstellt. Dies bedeutet, dass Sie die volle Kontrolle über die Umgebung haben. Das Lösen von Problemen mit der Versionskompatibilität wie der node.js-Version oder anderen Abhängigkeiten ist viel schneller und einfacher.
- Sie können Ihre Projekt-CID teilen und sicherstellen, dass alle dasselbe Projekt mit denselben Ergebnissen ausführen können.
- Es ist dezentralisiert, sodass Sie sich nicht auf eine zentralisierte Partei wie GitHub verlassen müssen, um Ihren Code zu speichern.
- Und darüber hinaus können Sie dasselbe Projekt im SubQuery-Netzwerk bereitstellen!

## How to migrate your project to IPFS

1. Aktualisieren Sie die Abhängigkeiten Ihres Projekts.
   1. Aktualisieren Sie `@subql/cli` auf die neueste Version: Sie können dies tun, indem Sie `yarn add -D @subql/cli@latest` oder `npm i -dev @subql ausführen /cli@neueste`
   2. Wir empfehlen außerdem, zu diesem Zeitpunkt andere Abhängigkeiten zu aktualisieren
   3. Achten Sie auf dieses Problem: [926](https://github.com/subquery/subql/discussions/926)
2. `package.json`: Aktualisieren Sie den Build-Befehl auf `subql build`. Es sollte [so](https://github.com/subquery/subql-starter/blob/418440f09226694a0063c939ff3332530f3047c4/package.json#L7) aussehen.
3. `src/index.ts`: Wenn Sie von `@polkadot/api` v6 (oder früher) aktualisieren, aktualisieren Sie bitte Ihre `src/index.ts`, um sie einzuschließen [diese Zeile](https://github.com/subquery/subql-starter/blob/418440f09226694a0063c939ff3332530f3047c4/src/index.ts#L3).
4. `project.yaml`:

   1. Stellen Sie sicher, dass Ihr Projekt die Manifestversion 1.0.0 verwendet. Sie können dies überprüfen, indem Sie sich das Feld `specVersion` in `project.yaml` ansehen. Wenn es unter 1.0.0 ist, führen Sie `subqlmigration` aus und befolgen Sie die [Migrationsschritte zum Upgrade](../build/manifest/polkadot.md#migrating-to-v100-badge-textupgrade-typewarning).

   2. Überprüfen Sie, ob die `datasources: mapping: file:` korrekt auf Ihren Code-Einstiegspunkt verweist, normalerweise ist dies `./dist/index.js`

   3. Wenn Sie einen Datenquellenprozessor (jeden `Prozessor:` in der `project.yaml`) verwenden, müssen wir sicherstellen, dass er während des Erstellens und Veröffentlichens gebündelt wird. Aktualisieren Sie dazu bitte auf die neueste Version des Pakets, das jetzt eine gebündelte Version enthält. Sie können dies tun, indem Sie Ihrer `package.json` Exporte hinzufügen.

   ```json
   ...
   "exports": {
     "processorName": "./node_modules/path/to/processor.js"
     // "frontierEvm": "./node_modules/@subql/frontier-evm-processor/dist/index.js"
     // "acalaEvm": "./node_modules/@subql/acala-evm-processor/dist/index.js",
     // "ethermintEVM": "./node_modules/@subql/ethermint-evm-processor/dist/index.js"
     // "chaintypes": "./src/chaintypes.ts" // chain types if required
   }
   ```

   Wir müssen den Verweis auf das Paket in Ihrer `project.yaml` aktualisieren. Dazu können Sie alle Prozessordateipfade auf `file: ./node_modules/@subql/<processor-name>/dist/bundle.js` aktualisieren und `<processor-name>` durch die ersetzen Prozessor, den Sie verwenden. Wenn Sie `@subql/datasource-processors` verwenden, ist dieses Paket jetzt veraltet, Sie können den entsprechenden Ersatz im neuen [datasource-processors-Repository](https://github.com/subquery/datasource-processors/tree/main/packages) finden.

   4. Wenn Ihr Projekt js/ts-basierte benutzerdefinierte [Substratkettentypen](../build/manifest/polkadot.md#custom-chains) verwendet, müssen Sie die obigen Schritte wiederholen, jedoch unter Bezugnahme auf Ihre Kettentypen.

5. `docker-compose.yaml`: Aktualisieren Sie es auf die [neueste Docker-Compose-Version](https://github.com/subquery/subql-starter/blob/main/Polkadot/Polkadot-starter/docker-compose.yml) und fügen Sie [dieses Verzeichnis](https://github.com/subquery/subql-starter/tree/main/Polkadot/Polkadot-starter/docker) zu Ihrem Repository hinzu. Zum Testen empfehlen wir, Ihr Projekt lokal auszuführen.

:::Warnung Bitte erstellen Sie Ihr Projekt jetzt neu und führen Sie es lokal aus, um diese Änderungen zu testen, bevor Sie mit `Yarn`, `Yarn Codegen`, `Yarn Build` und dann mit `Yarn fortfahren start:docker`. :::

## Testen Sie die Bereitstellung Ihres Projekts in IPFS

Ihr Projekt sollte jetzt für die Bereitstellung über IPFS für SubQuery Managed Service oder das SubQuery-Netzwerk bereit sein. Sie können der Anleitung [hier](./publish.md#publish-your-subquery-project-to-ipfs) folgen, um sie in IPFS bereitzustellen und dann im Managed Service zu veröffentlichen.
