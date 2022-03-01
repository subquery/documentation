# Manifest-Datei

Die Manifestdatei `project.yaml` kann als Einstiegspunkt Ihres Projekts angesehen werden und definiert die meisten Details darüber, wie SubQuery die Chaindaten indiziert und umwandelt.

Das Manifest kann entweder im YAML- oder im JSON-Format vorliegen. In diesem Dokument verwenden wir YAML in allen Beispielen. Unten sehen Sie ein Standardbeispiel einer einfachen `project.yaml`.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml specVersion: 0.2.0 name: example-project # Geben Sie den Projektnamen an Version: 1.0.0 # Projektversion description: '' # Beschreibung Ihres Projekts repository: 'https://github.com/subquery/subql-starter' # Git-Repository-Adresse Ihres Projekts Schema: file: ./schema.graphql # Der Speicherort Ihrer GraphQL-Schemadatei Netzwerk: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' # Genesis-Hash des Netzwerks endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Geben Sie optional den HTTP-Endpunkt eines vollständigen Kettenwörterbuchs an, um die Verarbeitung zu beschleunigen dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - kind: substrate/Runtime startBlock: 1 # Dies ändert Ihren Startblock für die Indizierung, stellen Sie diesen höher ein, um Anfangsblöcke mit weniger Daten zu überspringen mapping: file: "./dist/index.js" handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> ``` yml specVersion: "0.0.1" description: '' # Beschreibung Ihres Projekts repository: 'https://github.com/subquery/subql-starter' # Git-Repository-Adresse Ihres Projekts schema: ./schema.graphql # Der Speicherort Ihrer GraphQL-Schemadatei Netzwerk: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Geben Sie optional den HTTP-Endpunkt eines vollständigen Kettenwörterbuchs an, um die Verarbeitung zu beschleunigen dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - name: main kind: substrate/Runtime startBlock: 1 # Dies ändert Ihren Startblock für die Indizierung, stellen Sie diesen höher ein, um Anfangsblöcke mit weniger Daten zu überspringen mapping: handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter ist optional, wird aber empfohlen, um die Ereignisverarbeitung zu beschleunigen module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> </CodeGroup>

## Migration von v0.0.1 auf v0.2.0 <Badge text="upgrade" type="warning"/>

**Wenn Sie ein Projekt mit specVersion v0.0.1 haben, können Sie `subqlmigration` für ein schnelles Upgrade verwenden. [Siehe hier](#cli-options) für weitere Info**

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

| Optionen                | Beschreibung                                                                           |
| ----------------------- | -------------------------------------------------------------------------------------- |
| -f, --force             |                                                                                        |
| -l, --location=Standort | lokalen Ordner, in dem das Projekt erstellt werden soll                                |
| --install-dependencies  | Installieren Sie auch Abhängigkeiten                                                   |
| --npm                   | Verwendung von NPM anstelle von Yarn, funktioniert nur mit `install-dependencies`-Flag |
| --specVersion=0.0.1     | 0.2.0  [default: 0.2.0] | Die vom Projekt zu verwendende Spezifikationsversion         |

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

Definiert die Daten, die gefiltert und extrahiert werden, und den Speicherort des Zuordnungsfunktionshandlers für die anzuwendende Datenumwandlung.
| Bereich        | v0.0.1                                                    | v0.2.0                                                                           | Beschreibung                                                                                                                                                                                                       |
| -------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Name**       | String                                                    | 𐄂                                                                                | Name der Datenquelle                                                                                                                                                                                               |
| **kind**       | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | Wir unterstützen Datentypen aus der Standard-Substratlaufzeit wie Block, Ereignis und extrinsisch (Call). <br /> Ab v0.2.0 unterstützen wir Daten aus benutzerdefinierter Runtime, wie z. B. Smart Contract. |
| **startBlock** | Integer                                                   | Integer                                                                          | Dies ändert Ihren Startblock für die Indizierung. Stellen Sie diesen höher ein, um anfängliche Blöcke mit weniger Daten zu überspringen                                                                            |
| **mapping**    | Mapping Spec                                              | Mapping Spec                                                                     |                                                                                                                                                                                                                    |
| **Filter**     | [Netzwerk-Filter](./manifest/#network-filters)            | 𐄂                                                                                | Filtern Sie die auszuführende Datenquelle nach dem Namen der Netzwerkendpunktspezifikation                                                                                                                         |

### Mapping Spec

| Bereich              | v0.0.1                                                                  | v0.2.0                                                                                                 | Beschreibung                                                                                                                                                                                                                                                                                         |
| -------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Datei**            | String                                                                  | 𐄂                                                                                                      | Pfad zum Mapping-Eintrag                                                                                                                                                                                                                                                                             |
| **handler & Filter** | [Standardhandler und -filter](./manifest/#mapping-handlers-and-filters) | Standardhandler und -filter, <br />[Benutzerdefinierte Handler und Filter](#custom-data-sources) | Listen Sie alle [Zuordnungsfunktionen](./mapping.md) und ihre entsprechenden Handlertypen mit zusätzlichen Zuordnungsfiltern auf. <br /><br /> Informationen zu benutzerdefinierten Laufzeit-Zuordnungshandlern finden Sie unter [Benutzerdefinierte Datenquellen](#custom-data-sources) |

## Data Sources und Mapping

In diesem Abschnitt sprechen wir über die standardmäßige Substratlaufzeit und ihre Zuordnung. Hier ist ein Beispiel:

```yaml
dataSources:
  - kind: substrate/Runtime # Zeigt an, dass dies die Standardlaufzeit ist
    startBlock: 1 # Dies ändert Ihren Indexierungsstartblock. Stellen Sie diesen höher ein, um anfängliche Blöcke mit weniger Daten zu überspringen
    mapping:
      file: dist/index.js # Eingabepfad für diese Zuordnung
```

### Mapping Handler und Filter

In der folgenden Tabelle werden Filter erläutert, die von verschiedenen Handlern unterstützt werden.

**Ihr SubQuery-Projekt wird viel effizienter, wenn Sie nur Ereignis- und Call-handler mit geeigneten Zuordnungsfiltern verwenden**

| Handler                                    | Unterstützte Filter:        |
| ------------------------------------------ | --------------------------- |
| [Blockhandler](./mapping.md#block-handler) | `specVersion`               |
| [EventHandler](./mapping.md#event-handler) | `module`,`method`           |
| [CallHandler](./mapping.md#call-handler)   | `Modul`,`Methode` ,`Erfolg` |

Standard-Laufzeit-Mapping-Filter sind eine äußerst nützliche Funktion, um zu entscheiden, welcher Block, welches Ereignis oder welche extrinsischen Elemente einen Mapping-Handler auslösen.

Nur eingehende Daten, die die Filterbedingungen erfüllen, werden von den Mapping-Funktionen verarbeitet. Zuordnungsfilter sind optional, werden jedoch dringend empfohlen, da sie die von Ihrem SubQuery-Projekt verarbeitete Datenmenge erheblich reduzieren und die Indizierungsleistung verbessern.

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

## Custom-Chains

### Netzwerkspezifikationen

Wenn Sie eine Verbindung zu einer anderen Polkadot-Parachain oder sogar einer benutzerdefinierten Substrat-Chain herstellen, müssen Sie den Abschnitt [Network Spec](#network-spec) dieses Manifests bearbeiten.

Der `genesisHash` muss immer der Hash des ersten Blocks des benutzerdefinierten Netzwerks sein. Sie können dies einfach abrufen, indem Sie zu [Polkadot JS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) gehen und nach dem Hash auf **Block 0** suchen (siehe Abbildung unten).

![Genesis-Hash](/assets/img/genesis-hash.jpg)

Außerdem müssen Sie den ` Endpoint ` aktualisieren. Dies definiert den wss-Endpunkt der Blockchain, der indiziert werden soll - **Dies muss eine vollständige Archivknode sein**. Sie können Endpunkte für alle Parachains kostenlos von [OnFinality](https://app.onfinality.io) abrufen

### Chain-Typen

Sie können Daten aus benutzerdefinierten Chains indizieren, indem Sie auch Chaintypen in das Manifest aufnehmen.

Wir unterstützen die zusätzlichen Typen, die von Substrat-Laufzeitmodulen verwendet werden, `typesAlias`, `typesBundle`, `typesChain` und `typesSpec` werden ebenfalls unterstützt .

Im folgenden v0.2.0-Beispiel verweisen die `network.chaintypes` auf eine Datei, die alle benutzerdefinierten Typen enthält. Dies ist eine standardmäßige Chainspec-Datei, die die von dieser Blockchain unterstützten spezifischen Typen entweder in < 0>.json</code>-, `.yaml`- oder `.js`-Format.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # Der relative Dateipfad, in dem benutzerdefinierte Typen gespeichert werden ``` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> ``` yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter:  #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true ``` </CodeGroupItem> </CodeGroup>

Um Typoskript für Ihre Chaintypendatei zu verwenden, fügen Sie es in den `src`-Ordner ein (z. B. `./src/types.ts`), führen Sie `yarn build</ aus. 4> und zeigen Sie dann auf die generierte js-Datei, die sich im Ordner <code>dist` befindet.

```yml
network:
  chaintypes:
    file: ./dist/types.js # Wird nach yarn run generiert
...
```

Beachten Sie Folgendes bei der Verwendung der Chaintypendatei mit der Erweiterung `.ts` oder `.js`:

- Ihre Manifestversion muss v0.2.0 oder höher sein.
- Beim Abrufen von Blöcken wird nur der Standardexport in die [Polkadot-API](https://polkadot.js.org/docs/api/start/types.extend/) aufgenommen.

Hier ist ein Beispiel für eine `.ts`-Chaintypdatei:

<CodeGroup> <CodeGroupItem title="types.ts"> ```ts
import { typesBundleDeprecated } from "moonbeam-types-bundle"
export default { typesBundle: typesBundleDeprecated }; ``` </CodeGroupItem> </CodeGroup>

## Benutzerdefinierte Datenquellen

Benutzerdefinierte Datenquellen bieten netzwerkspezifische Funktionen, die den Umgang mit Daten erleichtern. Sie fungieren als Middleware, die zusätzliche Filterung und Datentransformation bieten kann.

Ein gutes Beispiel dafür ist die EVM-Unterstützung. Ein benutzerdefinierter Datenquellenprozessor für EVM bedeutet, dass Sie auf EVM-Ebene filtern können (z. B. Vertragsmethoden oder Protokolle filtern) und Daten in Strukturen umgewandelt werden, die dem Ethereum-Ökosystem ähnlich sind als Parsing-Parameter mit ABIs.

Benutzerdefinierte Datenquellen können mit normalen Datenquellen verwendet werden.

Hier ist eine Liste der unterstützten benutzerdefinierten Datenquellen:

| Kind                                                 | Unterstützte Handler                                                                                   | Filter                           | Beschreibung                                                                                    |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------- | ----------------------------------------------------------------------------------------------- |
| [Substrat/Moonbeam](./moonbeam/#data-source-example) | [Substrat/MoonbeamEvent](./moonbeam/#moonbeamevent), [Substrat/MoonbeamCall](./moonbeam/#moonbeamcall) | Siehe Filter unter jedem Handler | Bietet eine einfache Interaktion mit EVM-Transaktionen und -Ereignissen in Moonbeams-Netzwerken |

## Netzwerkfilter

**Netzwerkfilter gelten nur für die Manifestspezifikation v0.0.1**.

Normalerweise erstellt der Benutzer eine Unterabfrage und erwartet, dass er sie sowohl für seine Testnet- als auch für seine Mainnet-Umgebungen (z. B. Polkadot und Kusama) wiederverwenden wird. Zwischen Netzwerken sind wahrscheinlich verschiedene Optionen unterschiedlich (z. B. Index-Startblock). Daher erlauben wir Benutzern, für jede Datenquelle unterschiedliche Details zu definieren, was bedeutet, dass ein SubQuery-Projekt weiterhin über mehrere Netzwerke hinweg verwendet werden kann.

Benutzer können `Datenquellen` einen `Filter` hinzufügen, um zu entscheiden, welche Datenquelle in jedem Netzwerk ausgeführt werden soll.

Unten sehen Sie ein Beispiel, das verschiedene Datenquellen für das Polkadot- und das Kusama-Netzwerk zeigt.

<CodeGroup> <CodeGroupItem title="v0.0.1"> ```yaml --- network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' #Erstellen Sie eine Vorlage, um Redundanzen zu vermeiden definitions: mapping: &mymapping handlers: - handler: handleBlock kind: substrate/BlockHandler dataSources: - name: polkadotRuntime kind: substrate/Runtime filter: #Optional specName: polkadot startBlock: 1000 mapping: *mymapping #verwenden Sie die Vorlage hier - name: kusamaRuntime kind: substrate/Runtime filter: specName: kusama startBlock: 12000 mapping: *mymapping # Man kann wiederverwenden oder ändern </CodeGroupItem>

</CodeGroup>
