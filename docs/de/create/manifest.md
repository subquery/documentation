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

Während sich die v0.2.0-Spezifikationsversion in der Betaphase befindet, müssen Sie sie während der Projektinitialisierung explizit definieren, indem Sie `subql init --specVersion 0.2.0 PROJECT_NAME` ausführen

`subql migrate`  kann in einem vorhandenen Projekt ausgeführt werden, um das Projektmanifest auf die neueste Version zu migrieren.

| Optionen       | Beschreibung                                                                              |
| -------------- | ----------------------------------------------------------------------------------------- |
| -f, --force    |                                                                                           |
| -l, --Standort | lokaler Ordner, in dem die Migration ausgeführt werden soll (muss project.yaml enthalten) |
| --file=Datei   | um die zu migrierende project.yaml anzugeben                                              |

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

Definiert die Daten, die gefiltert und extrahiert werden, sowie die Position des Mapping-Funktionshandlers für die anzuwendende Datentransformation.
| Bereich        | v0.0.1                                                    | v0.2.0                                                                           | Beschreibung                                                                                                                                                                                                   |
| -------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**       | String                                                    | 𐄂                                                                                | Name der Datenquelle                                                                                                                                                                                           |
| **kind**       | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | Wir unterstützen Datentypen aus der Standard-Substrat-Laufzeit wie Block, Event und Extrinsic(Call). <br /> Ab v0.2.0 unterstützen wir Daten aus benutzerdefinierter Laufzeit, wie z. B. Smart Contract. |
| **startBlock** | Integer                                                   | Integer                                                                          | Dies ändert Ihren Indexierungsstartblock. Stellen Sie diesen höher ein, um anfängliche Blöcke mit weniger Daten zu überspringen                                                                                |
| **mapping**    | Mapping Spec                                              | Mapping Spec                                                                     |                                                                                                                                                                                                                |
| **Filter**     | [Netzwerk-Filter](./manifest/#network-filters)            | 𐄂                                                                                | Filtern Sie die auszuführende Datenquelle nach dem Netzwerk-Endpunkt-Spezifikationsnamen                                                                                                                       |

### Mapping Spec

| Bereich              | v0.0.1                                                                  | v0.2.0                                                                                                 | Beschreibung                                                                                                                                                                                                                                                                                         |
| -------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Datei**            | String                                                                  | 𐄂                                                                                                      | Pfad zum Mapping-Eintrag                                                                                                                                                                                                                                                                             |
| **handler & Filter** | [Standardhandler und -filter](./manifest/#mapping-handlers-and-filters) | Standardhandler und -filter, <br />[Benutzerdefinierte Handler und Filter](#custom-data-sources) | Listen Sie alle [Zuordnungsfunktionen](./mapping.md) und ihre entsprechenden Handlertypen mit zusätzlichen Zuordnungsfiltern auf. <br /><br /> Informationen zu benutzerdefinierten Laufzeit-Zuordnungshandlern finden Sie unter [Benutzerdefinierte Datenquellen](#custom-data-sources) |

## Data Sources und Mapping

In diesem Abschnitt werden wir über die standardmäßige Substratlaufzeit und ihre Zuordnung sprechen. Hier ist ein Beispiel:

```yaml
dataSources:
  - kind: substrate/Runtime # Zeigt an, dass dies die Standardlaufzeit ist
    startBlock: 1 # Dies ändert Ihren Indexierungsstartblock. Stellen Sie diesen höher ein, um anfängliche Blöcke mit weniger Daten zu überspringen
    mapping:
      file: dist/index.js # Eingabepfad für diese Zuordnung
```

### Mapping Handler und Filter

In der folgenden Tabelle werden Filter erläutert, die von verschiedenen Handlern unterstützt werden.

**Ihr SubQuery-Projekt wird viel effizienter, wenn Sie nur Ereignis- und Aufrufhandler mit entsprechenden Zuordnungsfiltern verwenden**

| Handler                                    | Unterstützte Filter:        |
| ------------------------------------------ | --------------------------- |
| [Blockhandler](./mapping.md#block-handler) | `specVersion`               |
| [EventHandler](./mapping.md#event-handler) | `module`,`method`           |
| [CallHandler](./mapping.md#call-handler)   | `Modul`,`Methode` ,`Erfolg` |

Standard-Laufzeit-Mapping-Filter sind eine äußerst nützliche Funktion, um zu entscheiden, welcher Block, welches Ereignis oder welcher Extrinsic einen Mapping-Handler auslöst.

Nur eingehende Daten, die die Filterbedingungen erfüllen, werden von den Mapping-Funktionen verarbeitet. Zuordnungsfilter sind optional, werden jedoch dringend empfohlen, da sie die von Ihrem SubQuery-Projekt verarbeitete Datenmenge erheblich reduzieren und die Indexierungsleistung verbessern.

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

Wenn Sie eine Verbindung zu einer anderen Polkadot-Parachain oder sogar einer benutzerdefinierten Substratchain herstellen, müssen Sie den Abschnitt [Network Spec](#network-spec) dieses Manifests bearbeiten.

Der `genesisHash` muss immer der Hash des ersten Blocks des benutzerdefinierten Netzwerks sein. Sie können dies leicht abrufen, indem Sie zu [Polkadot JS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) gehen und nach dem Hash auf **Block 0** suchen (siehe Abbildung unten).

![Genesis-Hash](/assets/img/genesis-hash.jpg)

Außerdem müssen Sie den `Endpunkt` aktualisieren. Dies definiert den wss-Endpunkt der zu indizierenden Blockchain - **Dies muss eine vollständige Archivnode sein**. Sie können Endpunkte für alle Parachains kostenlos von [OnFinality](https://app.onfinality.io)  abrufen

### Chain-Typen

Sie können Daten aus benutzerdefinierten Chains indizieren, indem Sie auch Chain-Typen in das Manifest aufnehmen.

Wir unterstützen die zusätzlichen Typen, die von Substrat-Laufzeitmodulen verwendet werden, `typesAlias`, `typesBundle`, `typesChain` und `typesSpec` werden ebenfalls unterstützt .

Im folgenden Beispiel v0.2.0 verweisen die `network.chaintypes` auf eine Datei, die alle benutzerdefinierten Typen enthält. Dies ist eine Standardchainspezifikationsdatei, die die spezifischen Typen deklariert, die von dieser Blockchain in entweder < 0>.json</code>-, `.yaml`- oder `.js`-Format.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml Netzwerk: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # Der relative Dateipfad zum Speicherort benutzerdefinierter Typen ``` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> ``` yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter:  #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true ``` </CodeGroupItem> </CodeGroup>

Um Typskript für Ihre Chain-Typen Datei zu verwenden, fügen Sie sie in den Ordner `src` ein (z.B `./src/types.ts`), führen Sie `yarn build</ aus. 4> und zeigen Sie dann auf die generierte js-Datei im Ordner <code>dist`.

```yml
network:
  chaintypes:
    file: ./dist/types.js # Wird nach yarn run generiert
...
```

Beachten Sie bei der Verwendung der Chain-Typen Datei mit der Erweiterung `.ts` oder `.js`:

- Ihre Manifestversion muss v0.2.0 oder höher sein.
- Beim Abrufen von Blöcken wird nur der Standardexport in die [Polkadot-API](https://polkadot.js.org/docs/api/start/types.extend/) aufgenommen.

Hier ist ein Beispiel für eine `.ts`-Chain-Typ Datei:

<CodeGroup> <CodeGroupItem title="types.ts"> ```ts
import { typesBundleDeprecated } from "moonbeam-types-bundle"
export default { typesBundle: typesBundleDeprecated }; ``` </CodeGroupItem> </CodeGroup>

## Benutzerdefinierte Datenquellen

Benutzerdefinierte Datenquellen bieten netzwerkspezifische Funktionen, die den Umgang mit Daten erleichtern. Sie fungieren als Middleware, die zusätzliche Filterung und Datentransformation bieten kann.

Ein gutes Beispiel dafür ist die EVM-Unterstützung. Mit einem benutzerdefinierten Datenquellenprozessor für EVM können Sie auf EVM-Ebene filtern (z. B. Vertragsmethoden oder Protokolle filtern) und Daten werden auch in Strukturen umgewandelt, die dem Ethereum-Ökosystem ähnlich sind als Parsing-Parameter mit ABIs.

Benutzerdefinierte Datenquellen können mit normalen Datenquellen verwendet werden.

Hier ist eine Liste der unterstützten benutzerdefinierten Datenquellen:

| Kind                                                  | Supported Handlers                                                                                       | Filters                          | Description                                                                                     |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------- |
| [substrate/Moonbeam](./moonbeam/#data-source-example) | [substrate/MoonbeamEvent](./moonbeam/#moonbeamevent), [substrate/MoonbeamCall](./moonbeam/#moonbeamcall) | Siehe Filter unter jedem Handler | Bietet eine einfache Interaktion mit EVM-Transaktionen und -Ereignissen in Moonbeams-Netzwerken |

## Netzwerkfilter

**Netzwerkfilter gelten nur für Manifest-Spezifikation v0.0.1**.

Normalerweise erstellt der Benutzer eine Unterabfrage und erwartet, diese sowohl für seine Testnet- als auch für seine Mainnet-Umgebungen (z. B. Polkadot und Kusama) wiederzuverwenden. Zwischen Netzwerken sind verschiedene Optionen wahrscheinlich unterschiedlich (z. B. Index-Startblock). Daher erlauben wir Benutzern, für jede Datenquelle unterschiedliche Details zu definieren, was bedeutet, dass ein SubQuery-Projekt immer noch in mehreren Netzwerken verwendet werden kann.

Benutzer können einen `Filter` für `Datenquellen` hinzufügen, um zu entscheiden, welche Datenquelle in jedem Netzwerk ausgeführt werden soll.

Unten sehen Sie ein Beispiel, das verschiedene Datenquellen für das Polkadot- und das Kusama-Netzwerk zeigt.

<CodeGroup> <CodeGroupItem title="v0.0.1"> ```yaml --- network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' #Erstellen Sie eine Vorlage, um Redundanzen zu vermeiden definitions: mapping: &mymapping handlers: - handler: handleBlock kind: substrate/BlockHandler dataSources: - name: polkadotRuntime kind: substrate/Runtime filter: #Optional specName: polkadot startBlock: 1000 mapping: *mymapping #man kann hier Vorlage verwenden - name: kusamaRuntime kind: substrate/Runtime filter: specName: kusama startBlock: 12000 mapping: *mymapping # kann wiederverwendet oder geändert werden </CodeGroupItem>

</CodeGroup>
