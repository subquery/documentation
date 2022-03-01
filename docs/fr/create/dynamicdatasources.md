# Sources de données dynamiques

Il existe des cas où vous ne connaissez pas tous les paramètres d'une source de données au début du projet. Par exemple, une usine de contrats qui créera de nouvelles instances de contrats à une date ultérieure. Il est impossible de savoir à l'avance quelles seront les adresses des contrats. C'est là qu'intervient la possibilité de créer de nouvelles sources de données de manière dynamique.

## Le champ des `modèles`

Afin d'utiliser les sources de données dynamiques, vous devez avoir une version de spec d'au moins `0.2.1`. Si vous êtes sur la version `0.2.0`, il vous suffit de modifier la specVersion. Si vous êtes sur une version inférieure, vous devez d'abord mettre à jour vers `0.2.0` avec `subql migrate`.

La version `0.2.1` de Spec introduit un nouveau champ pour `les modèles`. Les modèles sont les mêmes que les sources de données, à quelques différences près.

* Ils ont besoin d'un `nom` afin d'identifier le modèle.
* `startBlock` n'est plus nécessaire. Il sera défini dans le bloc où la source de données est créée.
* Dans le cas d'une source de données personnalisée, le champ `processor.options` peut également être partiellement rempli, le reste des options sera fourni lorsque la source de données sera instanciée.

## Exemple de projet

La meilleure façon de montrer comment utiliser une source de données dynamique est de donner un exemple.

L'exemple ci-dessous concerne une bourse décentralisée qui possède un contrat d'usine qui déploie un nouveau contrat lorsqu'une paire de transactions est ajoutée. Lorsque le projet est exécuté, il n'est pas possible de connaître les adresses de tous les contrats de paire de négociation qui ont été créés ou qui seront créés. Les sources de données peuvent être créées dynamiquement par un gestionnaire de mapping à partir d'un modèle afin d'indexer les contrats de paires de négociation nouvellement créés.


### `project.yaml`
```yaml
specVersion: 0.2.1
name: example-project
version: 1.0.0
description: ""
repository: ""
schema:
  file: ./schema.graphql
network:
  genesisHash: "0x91bc6e169807aaa54802737e1c504b2577d4fafedd5a02c10293b1cd60e39527"
  chaintypes:
    file: "./types.yaml"
dataSources:
  - kind: substrate/Moonbeam
    startBlock: 1358833
    processor:
      file: "./node_modules/@subql/contract-processors/dist/moonbeam.js"
      options:
        abi: exchangeFactory
        address: "0x0000000000000000000000000000000000000000"
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
      file: "./node_modules/@subql/contract-processors/dist/moonbeam.js"
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
// This function is defined using `subql codegen` cli command
import { createTradingPairDatasource } from "../types";
import { MoonbeamEvent } from "@subql/contract-processors/dist/moonbeam";

async function handleNewTradingPair(event: MoonbeamEvent): Promise<void> {
  const { exchange, token1, token2 } = event.args;

  // Create a new datasource providing the address of the trading pair exchange contract
  await createTradingPairDatasource({ address: exchange });
}

async function handleLiquidityAdded(event: MoonbeamEvent): Promise<void> {
  /* mapping fuction implementation here */
}
```


## Voir les sources de données dynamiques d'un projet

Les sources de données dynamiques sont stockées dans les métadonnées du projet. Si vous avez besoin de voir les détails, vous pouvez les interroger comme ci-dessous :

```gql
{
  _metadata {
    dynamicDatasources
  }
}
```

Résultat
```
{
  "data": {
    "_metadata": {
      "dynamicDatasources": "[{\"templateName\":\"TradingPair\",\"args\":{\"address\":\"0x0000000000000000000000000000000000000000\"},\"startBlock\":1358833}]"
    }
  }
}
```

