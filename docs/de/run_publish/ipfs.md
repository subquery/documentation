# Migrating from GitHub to IPFS

Um die Bereitstellung von Projekten auf dem Managed Service zu vereinfachen, verwerfen wir GitHub-Bereitstellungen zugunsten von IPFS.

Die Verwendung von IPFS bietet Entwicklern in mehrfacher Hinsicht ein besseres Erlebnis:

- Unlike with GitHub deployments, projects are built locally on your machine. This means that you can have full control over the environment. Resolving any issues with version compatibility such as node.js version or other dependencies is much faster and easier.
- You can share your projects CID and ensure that everyone will be able to run the same project with the same results.
- It’s decentralised, so that you don’t have to rely on a centralised party like GitHub to store your code.
- And on top of this, you can deploy the same project to the SubQuery Network!

## How to prepare your project?

1. Update your project's dependencies.
   - Update `@subql/cli` to the latest version: you can do this by running `yarn add -D @subql/cli@latest` or `npm i -dev @subql/cli@latest`
   - We also recommend updating other dependencies at this time
   - Pay attention to this issue: [926](https://github.com/subquery/subql/discussions/926)
2. `package.json`: Update the build command to `subql build`. It should look like [this](https://github.com/subquery/subql-starter/blob/418440f09226694a0063c939ff3332530f3047c4/package.json#L7).
3. `src/index.ts`: For Substrate based projects, if updating from `@polkadot/api` v6 (or earlier), update your `src/index.ts` to include [this line](https://github.com/subquery/subql-starter/blob/418440f09226694a0063c939ff3332530f3047c4/src/index.ts#L3).
4. `project.ts`:

   - Make sure your project is using manifest version 1.0.0. You can check this by looking at the `specVersion` field in `project.ts`. If it is below 1.0.0, then run `subql migrate` and follow the [migration steps to upgrade](../build/manifest/polkadot.md#migrating-to-v100-badge-textupgrade-typewarning).

   - Check that the `datasources: mapping: file:` references your code entrypoint correctly. Usually this is `./dist/index.js`

   - If you're using a datasource processor (any `processor:` in the `project.ts`) we need to ensure that it gets bundled during build and publish. Aktualisieren Sie dazu bitte auf die neueste Version des Pakets, das jetzt eine gebündelte Version enthält. Sie können dies tun, indem Sie Ihrer `package.json` Exporte hinzufügen.

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

   We need to update the reference to the bundle in your `project.ts`. Dazu können Sie alle Prozessordateipfade auf `file: ./node_modules/@subql/<processor-name>/dist/bundle.js` aktualisieren und `<processor-name>` durch die ersetzen Prozessor, den Sie verwenden. Wenn Sie `@subql/datasource-processors` verwenden, ist dieses Paket jetzt veraltet, Sie können den entsprechenden Ersatz im neuen [datasource-processors-Repository](https://github.com/subquery/datasource-processors/tree/main/packages) finden.

   - Wenn Ihr Projekt js/ts-basierte benutzerdefinierte [Substratkettentypen](../build/manifest/polkadot.md#custom-chains) verwendet, müssen Sie die obigen Schritte wiederholen, jedoch unter Bezugnahme auf Ihre Kettentypen.

5. `docker-compose.yaml`: Aktualisieren Sie es auf die [neueste Docker-Compose-Version](https://github.com/subquery/subql-starter/blob/main/Polkadot/Polkadot-starter/docker-compose.yml) und fügen Sie [dieses Verzeichnis](https://github.com/subquery/subql-starter/tree/main/Polkadot/Polkadot-starter/docker) zu Ihrem Repository hinzu. Zum Testen empfehlen wir, Ihr Projekt lokal auszuführen.

:::Warnung Bitte erstellen Sie Ihr Projekt jetzt neu und führen Sie es lokal aus, um diese Änderungen zu testen, bevor Sie mit `Yarn`, `Yarn Codegen`, `Yarn Build` und dann mit `Yarn fortfahren start:docker`. :::

Ihr Projekt sollte jetzt für die Bereitstellung über IPFS für SubQuery Managed Service oder das SubQuery-Netzwerk bereit sein. Sie können der Anleitung [hier](./publish.md#publish-your-subquery-project-to-ipfs) folgen, um sie in IPFS bereitzustellen und dann im Managed Service zu veröffentlichen.
