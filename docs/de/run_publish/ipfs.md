# Migrieren von GitHub zu IPFS-Bereitstellungen

Um die Bereitstellung von Projekten auf dem Managed Service zu vereinfachen, verwerfen wir GitHub-Bereitstellungen zugunsten von IPFS.

Die Verwendung von IPFS bietet Entwicklern in mehrfacher Hinsicht ein besseres Erlebnis:

- Anders als bei GitHub-Bereitstellungen werden Projekte lokal auf Ihrem Computer erstellt. Dies bedeutet, dass Sie die volle Kontrolle über die Umgebung haben. Das Lösen von Problemen mit der Versionskompatibilität wie der node.js-Version oder anderen Abhängigkeiten ist viel schneller und einfacher.
- Sie können Ihre Projekt-CID teilen und sicherstellen, dass alle dasselbe Projekt mit denselben Ergebnissen ausführen können.
- Es ist dezentralisiert, sodass Sie sich nicht auf eine zentralisierte Partei wie GitHub verlassen müssen, um Ihren Code zu speichern.
- Und darüber hinaus können Sie dasselbe Projekt im SubQuery-Netzwerk bereitstellen!

## So migrieren Sie Ihr Projekt zu IPFS

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

   Wir müssen den Verweis auf das Paket in Ihrer `project.yaml` aktualisieren. To do this you can update any processor file paths to `file: ./node_modules/@subql/<processor-name>/dist/bundle.js` and replace `<processor-name>` with the processor you are using. If you are using `@subql/datasource-processors` this package is now deprecated, you can find the relevant replacement from the new [datasource-processors repository](https://github.com/subquery/datasource-processors/tree/main/packages).

   4. If your project uses js/ts based custom [Substrate Chain Types](../build/manifest/polkadot.md#custom-chains) you will need to repeat the steps above but with the reference to your chain types.

5. `docker-compose.yaml`: Update it to the [latest docker compose version](https://github.com/subquery/subql-starter/blob/main/Polkadot/Polkadot-starter/docker-compose.yml) and add [this directory](https://github.com/subquery/subql-starter/tree/main/Polkadot/Polkadot-starter/docker) to your repo. To test it we recommend running your project locally.

:::warning Please now rebuild and run your project locally to test these changes before proceeding using `yarn`, `yarn codegen`, `yarn build`, and then `yarn start:docker`. :::

## Test deploying your project to IPFS

Your project should now be ready to deploy via IPFS to SubQuery Managed Service or the SubQuery network. You can follow the guide [here](./publish.md#publish-your-subquery-project-to-ipfs) to deploy to IPFS and then publish to the Managed Service.
