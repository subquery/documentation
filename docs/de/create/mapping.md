# Mapping

Mappingfunktionen definieren, wie Chaindaten in die optimierten GraphQL-Entitäten umgewandelt werden, die wir zuvor in der Datei `schema.graphql` definiert haben.

- Mappings werden im Verzeichnis `src/mappings` definiert und als Funktion exportiert
- Diese Mappings werden auch in `src/index.ts` exportiert
- Die Mapping-Dateien werden in `project.yaml` unter den Mapping-Handlern referenziert.

Es gibt drei Klassen von Zuordnungsfunktionen; [Blockhandler](#block-handler), [Ereignishandler](#event-handler) und [Callhandler](#call-handler).

## Block Handler

Sie können Blockhandler verwenden, um jedes Mal Informationen zu erfassen, wenn ein neuer Block an die Substratchain angehängt wird, z.B. Blocknummer. Dazu wird für jeden Block einmal ein definierter BlockHandler aufgerufen.

```ts
import {SubstrateBlock} from "@subql/types";

Exportiere Async-Funktion handleBlock(block: SubstrateBlock): Promise<void> {
    // Erstellen Sie eine neue StarterEntity mit dem Block-Hash als ID
    const record = new starterEntity(block.block.header.hash.toString());
    record.field1 = block.block.header.number.toNumber();
    await record.save();
}
```

Ein [SubstrateBlock](https://github.com/OnFinality-io/subql/blob/a5ab06526dcffe5912206973583669c7f5b9fdc9/packages/types/src/interfaces.ts#L16) ist ein erweiterter Schnittstellentyp von [signedBlock](https://polkadot.js.org/docs/api/cookbook/blocks/), beinhaltet aber auch die `specVersion` und den `timestamp`.

## Event-Handler

Sie können Ereignishandler verwenden, um Informationen zu erfassen, wenn bestimmte Ereignisse in einem neuen Block enthalten sind. Die Ereignisse, die Teil der standardmäßigen Substrate-Laufzeit und ein Block sind, können mehrere Ereignisse enthalten.

Während der Verarbeitung erhält der Ereignishandler ein Substratereignis als Argument mit den typisierten Ein- und Ausgängen des Ereignisses. Jede Art von Ereignis löst das Mapping aus, sodass Aktivitäten mit der Datenquelle erfasst werden können. Sie sollten [Zuordnungsfilter](./manifest.md#mapping-filters) in Ihrem Manifest verwenden, um Ereignisse zu filtern, um die Zeit zum Indexieren von Daten zu verkürzen und die Zuordnungsleistung zu verbessern.

```ts
import {SubstrateEvent} from "@subql/types";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, balance]}} = event;
    // Retrieve the record by its ID
    const record = new starterEntity(event.extrinsic.block.block.header.hash.toString());
    record.field2 = account.toString();
    record.field3 = (balance as Balance).toBigInt();
    await record.save();
```

Ein [SubstrateEvent](https://github.com/OnFinality-io/subql/blob/a5ab06526dcffe5912206973583669c7f5b9fdc9/packages/types/src/interfaces.ts#L30) ist ein erweiterter Schnittstellentyp des [EventRecord](https://github.com/polkadot-js/api/blob/f0ce53f5a5e1e5a77cc01bf7f9ddb7fcf8546d11/packages/types/src/interfaces/system/types.ts#L149). Neben den Ereignisdaten enthält es auch eine `id` (der Block, zu dem dieses Ereignis gehört) und die Extrinsic innerhalb dieses Blocks.

## Call-Handler

Call-Handler werden verwendet, wenn Sie Informationen zu bestimmten externen Substraten erfassen möchten.

```ts
export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    const record = new starterEntity(extrinsic.block.block.header.hash.toString());
    record.field4 = extrinsic.block.timestamp;
    warten record.save();
}
```

Das [SubstratExtrinsic](https://github.com/OnFinality-io/subql/blob/a5ab06526dcffe5912206973583669c7f5b9fdc9/packages/types/src/interfaces.ts#L21) erweitert [GenericExtrinsic](https://github.com/polkadot-js/api/blob/a9c9fb5769dec7ada8612d6068cf69de04aa15ed/packages/types/src/extrinsic/Extrinsic.ts#L170). Ihm wird eine `id` (der Block, zu dem diese Extrinsic gehört) zugewiesen und stellt eine extrinsische Eigenschaft bereit, die die Ereignisse innerhalb dieses Blocks erweitert. Darüber hinaus zeichnet es den Erfolgsstatus dieses Extrinsic auf.

## Abfragestatus
Unser Ziel ist es, alle Datenquellen für Benutzer für das Mapping von Handlern abzudecken (mehr als nur die drei oben genannten Schnittstellenereignistypen). Aus diesem Grund haben wir einige der @polkadot/api-Schnittstellen bereitgestellt, um die Fähigkeiten zu erweitern.

Dies sind die Schnittstellen, die wir derzeit unterstützen:
- [api.query.&lt;module&gt;.&lt;method&gt;()](https://polkadot.js.org/docs/api/start/api.query) fragt den <strong>aktuellen</strong> Block ab.
- 72 / 5000 [api.query.&lt;module&gt;.&lt;method&gt;.multi()](https://polkadot.js.org/docs/api/start/api.query.multi/#multi-queries-same-type) führt im aktuellen Block mehrere Abfragen des <strong>gleichen</strong>-Typs durch.
- [api.queryMulti()](https://polkadot.js.org/docs/api/start/api.query.multi/#multi-queries-distinct-types) führt im aktuellen Block mehrere Abfragen <strong>verschiedener</strong> Typen durch.

Dies sind die Schnittstellen, die wir derzeit **NICHT** unterstützen:
- ~~api.tx.*~~
- ~~api.derive.*~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.at~~
- ~~api.abfrage.&lt;module&gt;.&lt;method&gt;.entriesAt~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.entriesPaged~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.hash~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.keysAt~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.keysPaged~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.range~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.sizeAt~~

Sehen Sie sich ein Beispiel für die Verwendung dieser API in unserem [validator-threshold](https://github.com/subquery/tutorials-validator-threshold)-Beispielanwendungsfall an.

## RPC-Anrufe

Wir unterstützen auch einige API-RPC-Methoden, bei denen es sich um Remoteaufrufe handelt, die es der Zuordnungsfunktion ermöglichen, mit dem tatsächlichen Node, der Abfrage und der Übermittlung zu interagieren. Eine Kernprämisse von SubQuery ist, dass es deterministisch ist. Um die Ergebnisse konsistent zu halten, lassen wir daher nur historische RPC-Aufrufe zu.

Dokumente in [JSON-RPC](https://polkadot.js.org/docs/substrate/rpc/#rpc) stellen einige Methoden bereit, die `BlockHash` als Eingabeparameter verwenden (z. B. `at?: BlockHash`), die jetzt erlaubt sind. Wir haben diese Methoden auch geändert, um standardmäßig den aktuellen Indexierungsblock-Hash zu verwenden.

```typescript
// Nehmen wir an, wir indizieren gerade einen Block mit dieser Hash-Nummer
const blockhash = `0x844047c4cf1719ba6d54891e92c071a41e3dfe789d064871148e9d41ef086f6a`;

// Originalmethode hat eine optionale Eingabe ist Blockhash
const b1 = warten api.rpc.chain.getBlock(blockhash);

// Es wird der aktuelle Block verwendet, der standardmäßig so ist
const b2 = api.rpc.chain.getBlock() erwarten;
```
- Informationen zu [Benutzerdefinierten Substratketten](#custom-substrate-chains) RPC-Aufrufen finden Sie unter [Verwendung](#usage).

## Module und Bibliotheken

Um die Datenverarbeitungsfunktionen von SubQuery zu verbessern, haben wir einige der integrierten Module von NodeJS zum Ausführen von Mapping-Funktionen in der [Sandbox](#the-sandbox) zugelassen und den Benutzern erlaubt, Bibliotheken von Drittanbietern aufzurufen.

Beachten Sie bitte, dass dies eine **experimentelle Funktion** ist und Sie möglicherweise auf Fehler oder Probleme stoßen, die sich negativ auf Ihre Mapping-Funktionen auswirken können. Bitte melden Sie alle Fehler, die Sie finden, indem Sie ein Problem in [GitHub](https://github.com/subquery/subql) erstellen.

### Eingebaute Module

Derzeit erlauben wir die folgenden NodeJS-Module: `assert`, `buffer`, `crypto`, `util` und `path `.

Anstatt das gesamte Modul zu importieren, empfehlen wir, nur die erforderliche(n) Methode(n) zu importieren. Einige Methoden in diesen Modulen können Abhängigkeiten aufweisen, die nicht unterstützt werden und beim Import fehlschlagen.

```ts
import {hashMessage} from "ethers/lib/utils"; //Good way
import {utils} from "ethers" //Bad way

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    const record = new starterEntity(extrinsic.block.block.header.hash.toString());
    record.field1 = hashMessage('Hello');
    await record.save();
}
```

### Bibliotheken von Drittanbietern

Aufgrund der Einschränkungen der virtuellen Maschine in unserer Sandbox unterstützen wir derzeit nur Bibliotheken von Drittanbietern, die von **CommonJS** geschrieben wurden.

Wir unterstützen auch eine **Hybrid**-Bibliothek wie `@polkadot/*`, die standardmäßig ESM verwendet. Wenn jedoch andere Bibliotheken von Modulen im **ESM**-Format abhängen, wird die virtuelle Maschine **NICHT** kompilieren und einen Fehler zurückgeben.

## Benutzerdefinierte Substrat-Chain

SubQuery kann auf jeder Substrat-basierten Chain verwendet werden, nicht nur Polkadot oder Kusama.

Sie können eine benutzerdefinierte substratbasierte Chain verwenden und wir bieten Tools zum automatischen Importieren von Typen, Schnittstellen und zusätzlichen Methoden mithilfe von [@polkadot/typegen](https://polkadot.js.org/docs/api/examples/promise/typegen/).

In den folgenden Abschnitten verwenden wir unser [Kitty-Beispiel](https://github.com/subquery/tutorials-kitty-chain), um den Integrationsprozess zu erklären.

### Vorbereitung

Man kann ein neues Verzeichnis `api-interfaces` unter dem Projektordner `src` erstellen, um alle erforderlichen und generierten Dateien zu speichern. Wir erstellen auch ein `api-interfaces/kitties`-Verzeichnis, da wir Dekorationen in der API aus dem `kitties`-Modul hinzufügen möchten.

#### Metadata

Wir benötigen Metadaten, um die tatsächlichen API-Endpunkte zu generieren. Im Kitty-Beispiel verwenden wir einen Endpunkt aus einem lokalen Testnetz, der zusätzliche Typen bereitstellt. Befolgen Sie die Schritte unter [PolkadotJS-Metadaten-Setup](https://polkadot.js.org/docs/api/examples/promise/typegen#metadata-setup), um die Metadaten einer Node von seinem **HTTP**-Endpunkt abzurufen.

```shell
curl -H "Content-Type: application/json" -d '{"id":"1", "jsonrpc":"2.0", "method": "state_getMetadata", "params":[]}' http://localhost:9933
```
oder von seinem **websocket**-Endpunkt mit Hilfe von [`websocat`](https://github.com/vi/websocat):

```shell
//Installieren Sie die websocat
brew install websocat

//hol Metadata
echo state_getMetadata | websocat 'ws://127.0.0.1:9944' --jsonrpc
```

Kopieren Sie als Nächstes die Ausgabe und fügen Sie sie in eine JSON-Datei ein. In unserem [kitty-Beispiel](https://github.com/subquery/tutorials-kitty-chain) haben wir `api-interface/kitty.json` erstellt.

#### Typdefinitionen
Wir gehen davon aus, dass der Benutzer die spezifischen Typen und die RPC-Unterstützung aus der Chain kennt und im [Manifest](./manifest.md) definiert ist.

Nach der [Typenkonfiguration](https://polkadot.js.org/docs/api/examples/promise/typegen#metadata-setup) erstellen wir:
- `src/api-interfaces/definitions.ts` - dies exportiert alle Subordnerdefinitionen

```ts
export { default as kitties } from './kitties/definitions';
```

- `src/api-interfaces/kitties/definitions.ts` -Typdefinitionen für das Kitties-Modul
```ts
export default {
    // custom types
    types: {
        Address: "AccountId",
        LookupSource: "AccountId",
        KittyIndex: "u32",
        Kitty: "[u8; 16]"
    },
    // custom rpc : api.rpc.kitties.getKittyPrice
    rpc: {
        getKittyPrice:{
            description: 'Get Kitty price',
            params: [
                {
                    name: 'at',
                    type: 'BlockHash',
                    isHistoric: true,
                    isOptional: false
```

#### Pakete

- Man kann in der Datei `package.json` sicherstellen, dass man `@polkadot/typegen` als Entwicklungsabhängigkeit und `@polkadot/api` als reguläre Abhängigkeit ( idealerweise die gleiche Version). Wir brauchen auch `ts-node` als Entwicklungsabhängigkeit, um uns bei der Ausführung der Skripte zu helfen.
- Wir brauchen auch `ts-node` als Entwicklungsabhängigkeit, um uns bei der Ausführung der Skripte zu helfen.

Hier ist eine vereinfachte Version von `package.json`. Stellen Sie sicher, dass im Abschnitt **Skripte** der Paketname korrekt und die Verzeichnisse gültig sind.

```json
{
  "name": "kitty-birthinfo",
  "scripts": {
    "generate:defs": "ts-node --skip-project node_modules/.bin/polkadot-types-from-defs --package kitty-birthinfo/api-interfaces --input ./src/api-interfaces",
    "generate:meta": "ts-node --skip-project node_modules/.bin/polkadot-types-from-chain --package kitty-birthinfo/api-interfaces --endpoint ./src/api-interfaces/kitty.json --output ./src/api-interfaces --strict"
  },
  "dependencies": {
    "@polkadot/api": "^4.9.2"
  },
  "devDependencies": {
    "typescript": "^4.1.3",
    "@polkadot/typegen": "^4.9.2",
    "ts-node": "^8.6.2"
  }
}
```

### Typgenerierung

Nachdem die Vorbereitungen nun abgeschlossen sind, können wir Typen und Metadaten generieren. Führen Sie die folgenden Befehle aus:

```shell
# Yarn um neue Abhängigkeiten zu installieren
yarn

# Typen generieren
yarn generate:defs
```

In jedem Modulordner (z.B `/kitties`) sollte nun eine generierte `types.ts` sein, die alle Schnittstellen aus diesen Moduldefinitionen definiert, auch eine Datei `index .ts`, das sie alle exportiert.

```shell
# Metadaten generieren
yarn generate:meta
```

Dieser Befehl generiert die Metadaten und ein neues API-Augment für die APIs. Da wir die integrierte API nicht verwenden möchten, müssen wir sie ersetzen, indem wir eine explizite Überschreibung in unserer `tsconfig.json` hinzufügen. Nach den Updates sehen die Pfade in der Config so aus (ohne Kommentare):

```json
{
  "compilerOptions": {
      // Dies ist der Paketname, den wir verwenden (in den Schnittstellenimporten --package für Generatoren) */
      "kitty-birthinfo/*": ["src/*"],
      // hier ersetzen wir die @polkadot/api-Erweiterung durch unsere eigene, die aus der Chain generiert wurde
      "@polkadot/api/augment": ["src/interfaces/augment-api.ts"],
      // Ersetzen Sie die erweiterten Typen durch unsere eigenen, die aus Definitionen generiert wurden
      "@polkadot/types/augment": ["src/interfaces/augment-types.ts"]
    }
}
```

### Verwendung

Jetzt können wir in der Mapping-Funktion zeigen, wie die Metadaten und Typen die API tatsächlich schmücken. Der RPC-Endpunkt unterstützt die oben deklarierten Module und Methoden. Und um benutzerdefinierte rpc-Aufrufe zu verwenden, lesen Sie bitte den Abschnitt [Benutzerdefinierte Chain-rpc-Aufrufe](#custom-chain-rpc-calls)
```typescript
Async-Funktion exportieren kittyApiHandler(): Promise<void> {
    //den KittyIndex-Typ zurückgeben
    const nextKittyId = await api.query.kitties.nextKittyId();
    // Geben Sie den Kitty-Typ zurück, die Eingabeparametertypen sind AccountId und KittyIndex
    const allKitties  = await api.query.kitties.kitties('xxxxxxxxx',123)
    logger.info(`Next kitty id ${nextKittyId}`)
    //Benutzerdefinierter RPC, undefined auf Blockhash setzen
    const kittyPrice = await api.rpc.kitties.getKittyPrice(undefined,nextKittyId);
}
```

**Wenn Sie dieses Projekt in unserem Explorer veröffentlichen möchten, fügen Sie die generierten Dateien bitte in `src/api-interfaces` ein.**

### Benutzerdefinierte Chain-RPC-Aufrufe

Um benutzerdefinierte Chain-RPC-Aufrufe zu unterstützen, müssen wir RPC-Definitionen für `typesBundle` manuell einfügen, um eine spezifikationsspezifische Konfiguration zu ermöglichen. Sie können das `typesBundle` in der `project.yml` definieren. Und denken Sie bitte daran, dass nur Anrufe vom Typ `isHistoric` unterstützt werden.
```yaml
...
  types: {
    "KittyIndex": "u32",
    "Kitty": "[u8; 16]",
  }
  typesBundle: {
    spec: {
      chainname: {
        rpc: {
          kitties: {
            getKittyPrice:{
                description: string,
                params: [
                  {
                    name: 'at',
                    type: 'BlockHash',
                    isHistoric: true,
                    isOptional: false
                  },
                  {
                    name: 'kittyIndex',
                    type: 'KittyIndex',
                    isOptional: false
                  }
                ],
                type: "Balance",
            }
          }
        }
      }
    }
  }

```
