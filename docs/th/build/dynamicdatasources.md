# Dynamische Datenquellen

Es gibt Fälle, in denen Sie zu Beginn eines Projekts noch nicht alle Parameter einer Datenquelle kennen. Ein Beispiel hierfür ist eine Contract Factory, die zu einem späteren Zeitpunkt neue Vertragsinstanzen erstellt. Es ist unmöglich, die Vertragsadressen dafür im Voraus zu kennen. Hier kommt die Möglichkeit ins Spiel, neue Datenquellen dynamisch zu erstellen.

## `Templates` Feld

Um dynamische Datenquellen verwenden zu können, benötigen Sie mindestens die Spezifikationsversion `0.2.1`. Wenn Sie auf `0.2.0` sind, müssen Sie nur die specVersion ändern. Wenn Sie eine niedrigere Version verwenden, sollten Sie zuerst mit `subqlmigration` auf `0.2.0` aktualisieren.

Spezifikationsversion `0.2.1` führt ein neues `Templates`-Feld ein. Templates sind mit einigen Unterschieden identisch mit Datenquellen.

* Sie benötigen einen `Namen`, um die Template zu identifizieren
* `startBlock` ist nicht mehr erforderlich. Dies wird auf den Block gesetzt, in dem die Datenquelle erstellt wird
* Im Fall einer benutzerdefinierten Datenquelle kann das Feld `processor.options` auch teilweise ausgefüllt werden, die restlichen Optionen werden bereitgestellt, wenn die Datenquelle instanziiert wird.

## Beispielprojekt

Am besten lässt sich anhand eines Beispiels zeigen, wie dynamische Datenquellen verwendet werden.

Das folgende Beispiel gilt für eine dezentrale Börse mit einem Fabrikvertrag, der einen neuen Vertrag einsetzt, wenn ein Handelspaar hinzugefügt wird. Wenn das Projekt ausgeführt wird, ist es nicht möglich, die Adressen aller Handelspaarkontrakte zu kennen, die erstellt wurden oder erstellt werden. Datenquellen können von einem Mapping-Handler aus einer Vorlage dynamisch erstellt werden, um die neu erstellten Handelspaarkontrakte zu indizieren.


### `project.yaml`
```yaml
specVersion: 0.2.1
name: example-project
version: 1.0.0
description: ''
repository: ''
schema:
  file: ./schema.graphql
network:
  genesisHash: '0x91bc6e169807aaa54802737e1c504b2577d4fafedd5a02c10293b1cd60e39527'
  chaintypes:
    file: "./types.yaml"
dataSources:
  - kind: substrate/Moonbeam
    startBlock: 1358833
    processor:
      file: './node_modules/@subql/contract-processors/dist/moonbeam.js'
      options:
        abi: exchangeFactory
        address: '0x0000000000000000000000000000000000000000'
    assets:
      exchangeFactory:
        file: ./src/exchangeFactory.abi.json
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleNewTradingPair
          kind: substrate/MoonbeamEvent
          filter:
            topics:
              - newTradingPair(address exchange, address token1, address token2)

templates:
  - name: TradingPair
    kind: substrate/Moonbeam
    processor:
      file: './node_modules/@subql/contract-processors/dist/moonbeam.js'
      options:
        abi: tradingPair
        # we do not know the address at this point, it will be provided when instantiated
    assets:
      tradingPair:
        file: ./src/tradingPair.abi.json
    mapping:
      file: ./dist/index.js
      handlers:
        - handler: handleLiquidityAdded
          kind: substrate/MoonbeamEvent
          filter:
            topics:
              - liquidityAdded(address provider, uint256 amount1, uint256 amount2)
```

### `mappingHandlers.ts`

```ts
// Diese Funktion wird mit dem CLI-Befehl „subql codegen“ definiert
import { createTradingPairDatasource } from '../types';
import {MoonbeamEvent} from '@subql/contract-processors/dist/moonbeam';

async function handleNewTradingPair(event: MoonbeamEvent): Promise<void> {
  const { exchange, token1, token2 } = event.args;

  // Erstellen Sie eine neue Datenquelle, die die Adresse des Tauschvertrags für das Handelspaar enthält
  await createTradingPairDatasource({ address: exchange });
}

async function handleLiquidityAdded(event: MoonbeamEvent): Promise<void> {
  /* mapping fuction implementation here */
}
```


## Anzeigen der dynamischen Datenquellen eines Projekts

Dynamische Datenquellen werden in den Metadaten des Projekts gespeichert. Wenn Sie sehen möchten, welche Details Sie wie folgt abfragen können:

```gql
{
  _metadata {
    dynamicDatasources
  }
}
```

Ergebnis
```
{
  "data": {
    "_metadata": {
      "dynamicDatasources": "[{\"templateName\":\"TradingPair\",\"args\":{\"address\":\"0x0000000000000000000000000000000000000000\"},\"startBlock\":1358833}]"
    }
  }
}
```

