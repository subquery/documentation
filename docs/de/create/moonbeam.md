# Moonbeam EVM-Unterstützung

Wir bieten einen benutzerdefinierten Datenquellenprozessor für die EVM von Moonbeam und Moonriver. Dies bietet eine einfache Möglichkeit, sowohl EVM- als auch Substrat-Aktivitäten in Moonbeam-Netzwerken innerhalb eines einzigen SubQuery-Projekts zu filtern und zu indizieren.

Unterstützte Netzwerke:

| Netzwerkname   | Websocket-Endpoint                                 | Wörterbuch-Endpoint                                                  |
| -------------- | -------------------------------------------------- | -------------------------------------------------------------------- |
| Moonbeam       | `wss://moonbeam.api.onfinality.io/public-ws`       | `https://api.subquery.network/sq/subquery/moonbeam-dictionary`       |
| Moonriver      | `wss://moonriver.api.onfinality.io/public-ws`      | `https://api.subquery.network/sq/subquery/moonriver-dictionary`      |
| Moonbase Alpha | `wss://moonbeam-alpha.api.onfinality.io/public-ws` | `https://api.subquery.network/sq/subquery/moonbase-alpha-dictionary` |

**Sie können auch auf das [einfache Moonriver EVM-Beispielprojekt](https://github.com/subquery/tutorials-moonriver-evm-starter) mit einem Ereignis- und Aufrufhandler verweisen.** Dieses Projekt wird auch [hier](https://explorer.subquery.network/subquery/subquery/moonriver-evm-starter-project) live im SubQuery Explorer gehostet .

## Erste Schritte

1. Fügen Sie die benutzerdefinierte Datenquelle als Abhängigkeit hinzu `yarn add @subql/contract-processors`
2. Fügen Sie eine benutzerdefinierte Datenquelle wie unten beschrieben hinzu
3. Fügen Sie Ihrem Code Handler für die benutzerdefinierte Datenquelle hinzu

## Data Source Spec

| Bereich           | Typ                                                            | Erforderlich | Beschreibung                                  |
| ----------------- | -------------------------------------------------------------- | ------------ | --------------------------------------------- |
| processor.file    | `'./node_modules/@subql/contract-processors/dist/moonbeam.js'` | Ja           | Dateiverweis auf den Datenprozessorcode       |
| processor.options | [ProcessorOptions](#processor-options)                         | Nein         | Spezielle Optionen für den Moonbeam-Prozessor |
| Vermögenswerte    | `{ [key: String]: { file: String }}`                           | Nein         | Ein Objekt externer Asset-Dateien             |

### Prozessoroptionen

| Bereich | Typ                | Erforderlich | Beschreibung                                                                                                                           |
| ------- | ------------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| abi     | String             | Nein         | Die ABI, die vom Prozessor zum Analysieren von Argumenten verwendet wird. MUSS ein Schlüssel von `Assets` sein                         |
| Adresse | String oder `null` | Nein         | Eine Vertragsadresse, von der aus das Ereignis stattfindet oder an die der Anruf erfolgt. `null` erfasst Anrufe zur Vertragserstellung |

## MoonbeamCall

Funktioniert auf dieselbe Weise wie [substrat/CallHandler](../create/mapping/#call-handler), außer mit einem anderen Handler-Argument und kleineren Filteränderungen.

| Bereich | Typ                          | Erforderlich | Beschreibung                                |
| ------- | ---------------------------- | ------------ | ------------------------------------------- |
| kind    | 'substrate/MoonbeamCall'     | Ja           | Gibt an, dass dies ein Call-Typ-Handler ist |
| Filter  | [Call Filter](#call-filters) | Nein         | Filtern Sie die auszuführende Datenquelle   |

### Call Filters

| Bereich  | Typ    | Beispiele                                     | Beschreibung                                                                                                                                                                              |
| -------- | ------ | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Funktion | String | 0x095ea7b3, approve(address to,uint256 value) | Entweder [Function Signature](https://docs.ethers.io/v5/api/utils/abi/fragments/#FunctionFragment)-Strings oder die Funktion `sighash`, um die im Vertrag aufgerufene Funktion zu filtern |
| von      | String | 0x6bd193ee6d2104f14f94e2ca6efefae561a4334b    | Eine Ethereum-Adresse, die die Transaktion gesendet hat                                                                                                                                   |

### Handlers

Im Gegensatz zu einem normalen Handler erhalten Sie als Parameter keinen `SubstrateExtrinsic`, sondern einen `MoonbeamCall`, der auf dem Ethers-Typ [TransactionResponse](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse) basiert.

Änderungen vom Typ `TransactionResponse`:

- Es hat keine Eigenschaften `Warten` und `Bestätigungen`
- Eine `success`-Eigenschaft wird hinzugefügt, um zu wissen, ob die Transaktion erfolgreich war
- `args` wird hinzugefügt, wenn das Feld `abi` bereitgestellt wird und die Argumente erfolgreich geparst werden können

## MoonbeamEvent

Funktioniert genauso wie [substrate/EventHandler](../create/mapping/#event-handler), außer mit einem anderen Handler-Argument und kleineren Filteränderungen.

| Bereich | Typ                           | Erforderlich | Beschreibung                                   |
| ------- | ----------------------------- | ------------ | ---------------------------------------------- |
| kind    | 'substrate/MoonbeamEvent'     | Ja           | Gibt an, dass dies ein Ereignistyp-Handler ist |
| Filter  | [Event Filter](#call-filters) | Nein         | Filtern Sie die auszuführende Datenquelle      |

### Event Filter

| Bereich | Typ          | Beispiele                                                        | Beschreibung                                                                                                                                        |
| ------- | ------------ | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Themen  | String Array | Transfer(Addresse indexed von,Addresse indexed zu,uint256 value) | Der Themenfilter folgt den Ethereum JSON-PRC-Protokollfiltern, weitere Dokumentation finden Sie [hier](https://docs.ethers.io/v5/concepts/events/). |

<b>Hinweis zu Themen:</b>
Es gibt einige Verbesserungen der grundlegenden Protokollfilter:

- Themen müssen nicht 0 gepolstert sein
- [Ereignisfragment](https://docs.ethers.io/v5/api/utils/abi/fragments/#EventFragment)-Strings können bereitgestellt und automatisch in ihre ID konvertiert werden

### Handlers

Im Gegensatz zu einem normalen Handler erhalten Sie als Parameter kein `SubstrateEvent`, sondern ein `MoonbeamEvent`, das auf dem Ethers-Typ [Log](https://docs.ethers.io/v5/api/providers/types/#providers-Log) basiert.

Änderungen vom Typ `Log`:

- `args` wird hinzugefügt, wenn das Feld `abi` bereitgestellt wird und die Argumente erfolgreich geparst werden können

## Data Source Beispiele

Dies ist ein Auszug aus der Manifestdatei `project.yaml`.

```yaml
dataSources:
  - kind: substrate/Moonbeam
    startBlock: 752073
    processor:
      file: './node_modules/@subql/contract-processors/dist/moonbeam.js'
      options:
        # Must be a key of assets
        abi: erc20
        # Contract address (or recipient if transfer) to filter, if `null` should be for contract creation
        address: '0x6bd193ee6d2104f14f94e2ca6efefae561a4334b'
    assets:
      erc20:
        file: './erc20.abi.json'
    mapping:
      file: './dist/index.js'
      handlers:
        - handler: handleMoonriverEvent
          kind: substrate/MoonbeamEvent
          filter:
            topics:
              - Transfer(address indexed from,address indexed to,uint256 value)
        - handler: handleMoonriverCall
          kind: substrate/MoonbeamCall
          filter:
            ## The function can either be the function fragment or signature
            # function: '0x095ea7b3'
            # function: '0x7ff36ab500000000000000000000000000000000000000000000000000000000'
            # function: approve(address,uint256)
            function: approve(address to,uint256 value)
            from: '0x6bd193ee6d2104f14f94e2ca6efefae561a4334b'
```

## Bekannte Einschränkungen

- Es gibt derzeit keine Möglichkeit, den EVM-Status innerhalb eines Handlers abzufragen
- Es gibt keine Möglichkeit, die Transaktionsquittungen mit Call-Handlern zu erhalten
- `blockHash`-Eigenschaften sind derzeit nicht definiert, stattdessen kann die `blockNumber`-Eigenschaft verwendet werden
