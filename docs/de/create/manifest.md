# Manifest-Datei

Die Datei Manifest `project.yaml` kann als Einstiegspunkt Ihres Projekts angesehen werden und definiert die meisten Details darüber, wie SubQuery die Kettendaten indiziert und transformiert.

Das Manifest kann entweder im YAML- oder im JSON-Format vorliegen. In diesem Dokument verwenden wir YAML in allen Beispielen. Unten ist ein Standardbeispiel für eine einfache `project.yaml`.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml specVersion: 0.2.0 name: example-project # Provide the project name version: 1.0.0  # Project version description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: file: ./schema.graphql # The location of your GraphQL schema file network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' # Genesis hash of the network endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: file: "./dist/index.js" handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> <CodeGroupItem title="v0.0.1"> ``` yml specVersion: "0.0.1" description: '' # Description of your project repository: 'https://github.com/subquery/subql-starter' # Git repository address of your project schema: ./schema.graphql # The location of your GraphQL schema file network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - name: main kind: substrate/Runtime startBlock: 1 # This changes your indexing start block, set this higher to skip initial blocks with less data mapping: handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional but suggested to speed up event processing module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> </CodeGroup>

## Migrating from v0.0.1 to v0.2.0 <Badge text="upgrade" type="warning"/>

**If you have a project with specVersion v0.0.1, you can use `subql migrate` to quickly upgrade. [Siehe hier](#cli-options) für weitere Info**

Unter `Netzwerk`:

- Es gibt ein neues **erforderliches** `genesisHash`-Feld, das hilft, die verwendete Chain zu identifizieren.
- Ab v0.2.0 können Sie auf eine externe [Chaintyp Datei](#custom-chains) verweisen, wenn Sie auf eine benutzerdefinierte Chain verweisen.

Unter `dataSources`:

- Kann einen `index.js`-Einstiegspunkt für Mapping-Handler direkt verknüpfen. Standardmäßig wird diese `index.js` während des Build-Prozesses aus `index.ts` generiert.
- Datenquellen können jetzt entweder eine reguläre Laufzeitdatenquelle oder eine [benutzerdefinierte Datenquelle](#custom-data-sources) sein.

### CLI-Optionen

Standardmäßig generiert die CLI SubQuery-Projekte für die Spezifikationsversion v0.2.0. Dieses Verhalten kann durch Ausführen von `subql init --specVersion 0.0.1 PROJECT_NAME` außer Kraft gesetzt werden, obwohl dies nicht empfohlen wird, da das Projekt in Zukunft nicht mehr vom von SubQuery gehosteten Dienst unterstützt wird

`subql migrate`  kann in einem vorhandenen Projekt ausgeführt werden, um das Projektmanifest auf die neueste Version zu migrieren.

VERWENDUNG $ subql init [PROJECTNAME]

ARGUMENTE PROJECTNAME Geben Sie den Namen des Startprojekts an

| Optionen                | Beschreibung                                                                 |
| ----------------------- | ---------------------------------------------------------------------------- |
| -f, --force             |                                                                              |
| -l, --location=Standort | lokalen Ordner, in dem das Projekt erstellt werden soll                      |
| --install-dependencies  | Installieren Sie auch Abhängigkeiten                                         |
| --npm                   | Force using NPM instead of yarn, only works with `install-dependencies` flag |
| --specVersion=0.0.1     | 0.2.0  [default: 0.2.0] | The spec version to be used by the project         |

## Überblick

### Top-Level-Spezifikation

| Bereich          | v0.0.1                                   | v0.2.0                      | Beschreibung                                                       |
| ---------------- | ---------------------------------------- | --------------------------- | ------------------------------------------------------------------ |
| **specVersion**  | String                                   | String                      | `0.0.1` oder `0.2.0` – die Spezifikationsversion der Manifestdatei |
| **Name**         | 𐄂                                        | String                      | Name Ihres Projekts                                                |
| **Version**      | 𐄂                                        | String                      | Version Ihres Projekts                                             |
| **Beschreibung** | String                                   | String                      | Beschreibung Ihres Projekts                                        |
| **Repository**   | String                                   | String                      | Git-Repository-Adresse Ihres Projekts                              |
| **Schema**       | String                                   | [Schema Spec](#schema-spec) | Der Speicherort Ihrer GraphQL-Schemadatei                          |
| **Netzwerk**     | [Netzwerkspezifikationen](#network-spec) | Netzwerkspezifikationen     | Detail der indexierenden Netzwerks                                 |
| **dataSources**  | [DataSource Spec](#datasource-spec)      | DataSource Spec             |                                                                    |

### Schema Spec

| Bereich   | v0.0.1 | v0.2.0 | Beschreibung                              |
| --------- | ------ | ------ | ----------------------------------------- |
| **Datei** | 𐄂      | String | Der Speicherort Ihrer GraphQL-Schemadatei |

### Netzwerkspezifikationen

| Bereich         | v0.0.1 | v0.2.0        | Beschreibung                                                                                                                                                                                                                  |
| --------------- | ------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **genesisHash** | 𐄂      | String        | Der Genesis-Hash des Netzwerks                                                                                                                                                                                                |
| **endpoint**    | String | String        | Definiert den wss- oder ws-Endpunkt der zu indizierenden Blockchain - **Dies muss eine vollständige Archivnode sein**. Sie können Endpunkte für alle Parachains kostenlos von [OnFinality](https://app.onfinality.io) abrufen |
| **Wörterbuch**  | String | String        | Es wird empfohlen, den HTTP-Endpunkt eines vollständigen Chain-Wörterbuchs bereitzustellen, um die Verarbeitung zu beschleunigen - lesen Sie [wie ein SubQuery-Wörterbuch funktioniert](../tutorials_examples/dictionary.md). |
| **Chain-Typen** | 𐄂      | {file:String} | Pfad zur Datei mit den Chain-Typen, akzeptieren Sie das Format `.json` oder `.yaml`                                                                                                                                           |

### Datasource Spec

Defines the data that will be filtered and extracted and the location of the mapping function handler for the data transformation to be applied.
| Bereich        | v0.0.1                                                    | v0.2.0                                                                           | Beschreibung                                                                                                                                                                          |
| -------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**       | String                                                    | 𐄂                                                                                | Name of the data source                                                                                                                                                               |
| **kind**       | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | We supports data type from default substrate runtime such as block, event and extrinsic(call). <br /> From v0.2.0, we support data from custom runtime, such as smart contract. |
| **startBlock** | Integer                                                   | Integer                                                                          | This changes your indexing start block, set this higher to skip initial blocks with less data                                                                                         |
| **mapping**    | Mapping Spec                                              | Mapping Spec                                                                     |                                                                                                                                                                                       |
| **Filter**     | [network-filters](./manifest/#network-filters)            | 𐄂                                                                                | Filter the data source to execute by the network endpoint spec name                                                                                                                   |

### Mapping Spec

| Bereich              | v0.0.1                                                                  | v0.2.0                                                                                                 | Beschreibung                                                                                                                                                                                                                                                                                         |
| -------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Datei**            | String                                                                  | 𐄂                                                                                                      | Pfad zum Mapping-Eintrag                                                                                                                                                                                                                                                                             |
| **handler & Filter** | [Standardhandler und -filter](./manifest/#mapping-handlers-and-filters) | Standardhandler und -filter, <br />[Benutzerdefinierte Handler und Filter](#custom-data-sources) | Listen Sie alle [Zuordnungsfunktionen](./mapping.md) und ihre entsprechenden Handlertypen mit zusätzlichen Zuordnungsfiltern auf. <br /><br /> Informationen zu benutzerdefinierten Laufzeit-Zuordnungshandlern finden Sie unter [Benutzerdefinierte Datenquellen](#custom-data-sources) |

## Data Sources und Mapping

In this section, we will talk about the default substrate runtime and its mapping. Here is an example:

```yaml
dataSources:
  - kind: substrate/Runtime # Zeigt an, dass dies die Standardlaufzeit ist
    startBlock: 1 # Dies ändert Ihren Indexierungsstartblock. Stellen Sie diesen höher ein, um anfängliche Blöcke mit weniger Daten zu überspringen
    mapping:
      file: dist/index.js # Eingabepfad für diese Zuordnung
```

### Mapping Handler und Filter

The following table explains filters supported by different handlers.

**Your SubQuery project will be much more efficient when you only use event and call handlers with appropriate mapping filters**

| Handler                                    | Unterstützte Filter:        |
| ------------------------------------------ | --------------------------- |
| [Blockhandler](./mapping.md#block-handler) | `specVersion`               |
| [EventHandler](./mapping.md#event-handler) | `module`,`method`           |
| [CallHandler](./mapping.md#call-handler)   | `Modul`,`Methode` ,`Erfolg` |

Default runtime mapping filters are an extremely useful feature to decide what block, event, or extrinsic will trigger a mapping handler.

Only incoming data that satisfy the filter conditions will be processed by the mapping functions. Mapping filters are optional but are highly recommended as they significantly reduce the amount of data processed by your SubQuery project and will improve indexing performance.

```yaml
# Beispielfilter von callHandler
Filter:
  module: balances
  method: Deposit
  success: true
```

- Modul- und Methodenfilter werden auf jeder substratbasierten Chain unterstützt.
- Der Filter `Erfolg` nimmt einen booleschen Wert an und kann verwendet werden, um den Extrinsischen nach seinem Erfolgsstatus zu filtern.
- Der Filter `specVersion` gibt den Spezifikationsversionsbereich für einen Substratblock an. In den folgenden Beispielen wird beschrieben, wie Versionsbereiche festgelegt werden.

```yaml
Filter:
   specVersion: [23, 24] # Indexblock mit specVersion zwischen 23 und 24 (einschließlich).
  specVersion: [100] # Indexblock mit specVersion größer oder gleich 100.
  specVersion: [null, 23] # Indexblock mit specVersion kleiner oder gleich 23.
```

## Kundenspezifische Ketten

### Netzwerkspezifikationen

When connecting to a different Polkadot parachain or even a custom substrate chain, you'll need to edit the [Network Spec](#network-spec) section of this manifest.

The `genesisHash` must always be the hash of the first block of the custom network. You can retireve this easily by going to [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) and looking for the hash on **block 0** (see the image below).

![Genesis Hash](/assets/img/genesis-hash.jpg)

Additionally you will need to update the `endpoint`. This defines the wss endpoint of the blockchain to be indexed - **This must be a full archive node**. Sie können Endpunkte für alle Parachains kostenlos von [OnFinality](https://app.onfinality.io) abrufen

### Chain-Typen

You can index data from custom chains by also including chain types in the manifest.

We support the additional types used by substrate runtime modules, `typesAlias`, `typesBundle`, `typesChain`, and `typesSpec` are also supported.

In the v0.2.0 example below, the `network.chaintypes` are pointing to a file that has all the custom types included, This is a standard chainspec file that declares the specific types supported by this blockchain in either `.json`, `.yaml` or `.js` format.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # The relative filepath to where custom types are stored ... ``` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> ``` yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter:  #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true ``` </CodeGroupItem> </CodeGroup>

To use typescript for your chain types file include it in the `src` folder (e.g. `./src/types.ts`), run `yarn build` and then point to the generated js file located in the `dist` folder.

```yml
network:
  chaintypes:
    file: ./dist/types.js # Wird nach yarn run generiert
...
```

Things to note about using the chain types file with extension `.ts` or `.js`:

- Ihre Manifestversion muss v0.2.0 oder höher sein.
- Beim Abrufen von Blöcken wird nur der Standardexport in die [Polkadot-API](https://polkadot.js.org/docs/api/start/types.extend/) aufgenommen.

Here is an example of a `.ts` chain types file:

<CodeGroup> <CodeGroupItem title="types.ts"> ```ts
import { typesBundleDeprecated } from "moonbeam-types-bundle"
export default { typesBundle: typesBundleDeprecated }; ``` </CodeGroupItem> </CodeGroup>

## Custom Data Sources

Custom Data Sources provide network specific functionality that makes dealing with data easier. They act as a middleware that can provide extra filtering and data transformation.

A good example of this is EVM support, having a custom data source processor for EVM means that you can filter at the EVM level (e.g. filter contract methods or logs) and data is transformed into structures farmiliar to the Ethereum ecosystem as well as parsing parameters with ABIs.

Custom Data Sources can be used with normal data sources.

Here is a list of supported custom datasources:

| Kind                                                  | Supported Handlers                                                                                       | Filters                         | Description                                                                      |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------- |
| [substrate/Moonbeam](./moonbeam/#data-source-example) | [substrate/MoonbeamEvent](./moonbeam/#moonbeamevent), [substrate/MoonbeamCall](./moonbeam/#moonbeamcall) | See filters under each handlers | Provides easy interaction with EVM transactions and events on Moonbeams networks |

## Network Filters

**Network filters only applies to manifest spec v0.0.1**.

Usually the user will create a SubQuery and expect to reuse it for both their testnet and mainnet environments (e.g Polkadot and Kusama). Between networks, various options are likely to be different (e.g. index start block). Therefore, we allow users to define different details for each data source which means that one SubQuery project can still be used across multiple networks.

Users can add a `filter` on `dataSources` to decide which data source to run on each network.

Below is an example that shows different data sources for both the Polkadot and Kusama networks.

<CodeGroup> <CodeGroupItem title="v0.0.1"> ```yaml --- network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' #Create a template to avoid redundancy definitions: mapping: &mymapping handlers: - handler: handleBlock kind: substrate/BlockHandler dataSources: - name: polkadotRuntime kind: substrate/Runtime filter: #Optional specName: polkadot startBlock: 1000 mapping: *mymapping #use template here - name: kusamaRuntime kind: substrate/Runtime filter: specName: kusama startBlock: 12000 mapping: *mymapping # can reuse or change ``` </CodeGroupItem>

</CodeGroup>
