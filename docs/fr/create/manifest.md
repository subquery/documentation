# Fichier Manifeste

Le fichier Manifeste `project.yaml` peut être vu comme un point d'entrée de votre projet et il définit la plupart des détails sur la façon dont SubQuery indexera et transformera les données de la chaîne.

Le manifeste peut être au format YAML ou JSON. Dans ce document, nous utiliserons YAML dans tous les exemples. Ci-dessous est un exemple type d'un `project.yaml` de base.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml specVersion: 0.2.0 name: example-project # Fournir le nom du projet version: 1.0.0  # Version du projet description: '' # Description de votre projet repository: 'https://github.com/subquery/subql-starter' # Adresse du dépôt Git de votre projet schema: file: ./schema.graphql # L'emplacement de votre fichier de schéma GraphQL network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' # Genesis hash of the network endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Il est possible de fournir le point de terminaison HTTP d'un dictionnaire de chaîne complet pour accélérer le traitement. dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - kind: substrate/Runtime startBlock: 1 # Cela modifie le bloc de départ de l'indexation, définissez-le plus haut pour sauter les blocs initiaux avec moins de données. mapping: file: "./dist/index.js" handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> ``` yml specVersion: "0.0.1" description: '' # Description de votre projet repository: 'https://github.com/subquery/subql-starter' # Adresse du dépôt Git de votre projet schema: ./schema.graphql # L'emplacement de votre fichier de schéma GraphQL network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Il est possible de fournir le point de terminaison HTTP d'un dictionnaire de chaîne complet pour accélérer le traitement. dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - name: main kind: substrate/Runtime startBlock: 1 # Cela modifie le bloc de départ de l'indexation, définissez-le plus haut pour sauter les blocs initiaux avec moins de données. mapping: handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Le filtre est facultatif mais suggéré pour accélérer le traitement des événements. module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> </CodeGroup>

## Migration de v0.0.1 à v0.2.0 <Badge text="upgrade" type="warning"/>

**Si vous avez un projet avec specVersion v0.0.1, vous pouvez utiliser `subql migrate` pour une mise à niveau rapide. [Voir ici](#cli-options) pour plus d'informations**

Sous `network`:

- Il y a un nouveau champ **requis** `genesisHash` qui aide à identifier la chaîne utilisée.
- Pour la v0.2.0 et supérieure, vous pouvez référencer un type de[fichier chaintype](#custom-chains) externe si vous référencez une chaîne personnalisée.

Sous `dataSources`:

- Peut directement lier un point d'entrée `index.js` pour les gestionnaires de mappage. Par défaut, ce `index.js` sera généré à partir de `index.ts` pendant le processus de construction.
- Les sources de données peuvent maintenant être soit une source de données d'exécution régulière ou [une source de données personnalisée](#custom-data-sources).

### Options CLI

Tant que la version de spec v0.2 est en bêta, vous devrez la définir explicitement lors de l'initialisation du projet en exécutant `subql init --specVersion 0.2.0 PROJECT_NAME`

`subql migrate` peut être exécutée dans un projet existant pour migrer le manifeste du projet vers la dernière version.

| Options        | Description                                                                  |
| -------------- | ---------------------------------------------------------------------------- |
| -f, --force    |                                                                              |
| -l, --location | dossier local dans lequel exécuter la migration (doit contenir project.yaml) |
| --file=file    | pour spécifier le project.yaml à migrer                                      |

## Aperçu 

### Spécification de niveau supérieur

| Champ           | v0.0.1                              | v0.2.0                      | Description                                                   |
| --------------- | ----------------------------------- | --------------------------- | ------------------------------------------------------------- |
| **specVersion** | String                              | String                      | `0.0.1` ou `0.2` - la version spécifique du fichier manifeste |
| **name**        | 𐄂                                   | String                      | Nom de votre projet                                           |
| **version**     | 𐄂                                   | String                      | Version de votre projet                                       |
| **description** | String                              | String                      | Discription de votre projet                                   |
| **repository**  | String                              | String                      | Adresse du dépôt Git de votre projet                          |
| **schema**      | String                              | [Schema Spec](#schema-spec) | L'emplacement de votre fichier de schéma GraphQL              |
| **network**     | [Network Spec](#network-spec)       | Network Spec                | Détail du réseau à indexer                                    |
| **dataSources** | [DataSource Spec](#datasource-spec) | DataSource Spec             |                                                               |

### Schema Spec

| Champ    | v0.0.1 | v0.2.0 | Description                                      |
| -------- | ------ | ------ | ------------------------------------------------ |
| **file** | 𐄂      | String | L'emplacement de votre fichier de schéma GraphQL |

### Network Spec

| Champ           | v0.0.1 | v0.2.0        | Description                                                                                                                                                                                                                                                            |
| --------------- | ------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **genesisHash** | 𐄂      | String        | Hash de la genèse du réseau                                                                                                                                                                                                                                            |
| **endpoint**    | String | String        | Définit le point de terminaison wss ou ws de la blockchain à indexer - **Ce doit être un noeud d'archive complet**. Vous pouvez récupérer les points de terminaison (endpoints) pour toutes les parachains gratuitement depuis [OnFinality](https://app.onfinality.io) |
| **dictionary**  | String | String        | Il est suggéré de fournir le point de terminaison HTTP d'un dictionnaire en chaîne complète pour accélérer le traitement - lire [comment fonctionne un dictionnaire SubQuery](../tutorials_examples/dictionary.md).                                                    |
| **chaintypes**  | 𐄂      | {file:String} | Chemin vers le fichier de types de chaîne, accepte le format `.json` ou `.yaml`                                                                                                                                                                                        |

### Datasource Spec

Définit les données qui seront filtrées et extraites et l'emplacement du gestionnaire de la fonction de mappage pour la transformation des données à appliquer.
| Champ          | v0.0.1                                                    | v0.2.0                                                                           | Description                                                                                                                                                                                                                           |
| -------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name**       | String                                                    | 𐄂                                                                                | Nom de la source de données                                                                                                                                                                                                           |
| **kind**       | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | Nous prenons en charge le type de données par défaut de substrate runtime tels que block, event et extrinsic(call). <br /> Depuis v0.2.0, nous prenons en charge les données de l'exécution, telles que le contrat intelligent. |
| **startBlock** | Integer                                                   | Integer                                                                          | Cela modifie votre bloc d'indexation de démarrage, définissez ceci plus haut pour passer les blocs initiaux avec moins de données                                                                                                     |
| **mapping**    | Mapping Spec                                              | Mapping Spec                                                                     |                                                                                                                                                                                                                                       |
| **filter**     | [network-filters](./manifest/#network-filters)            | 𐄂                                                                                | Filtrer la source de données à exécuter par le nom de la spécification du point de terminaison réseau                                                                                                                                 |

### Mapping Spec

| Champ                  | v0.0.1                                                                   | v0.2.0                                                                                        | Description                                                                                                                                                                                                                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **file**               | String                                                                   | 𐄂                                                                                             | Chemin d'accès à l'entrée de mapping                                                                                                                                                                                                                                                                                |
| **handlers & filters** | [Default handlers and filters](./manifest/#mapping-handlers-and-filters) | Default handlers and filters, <br />[Custom handlers and filters](#custom-data-sources) | Liste toutes les [fonctions de mappage](./mapping.md) et leurs types de gestion correspondants, avec des filtres de mappage supplémentaires. <br /><br /> Pour les gestionnaires de mapping des runtimes personnalisés veuillez consulter [les sources de données personnalisées](#custom-data-sources) |

## Sources de données et mapping

Dans cette section, nous allons parler de l'exécution par défaut de substrate et de son mapping. Voici un exemple :

```yaml
dataSources:
  - kind: substrate/Runtime # Indique qu'il s'agit du runtime par défaut
    startBlock: 1 # Ceci modifie votre bloc d'indexation de démarrage, définir ceci plus haut pour passer les blocs initiaux avec moins de données
    mapping:
      file: dist/index.js # Chemin d'entrée pour ce mapping
```

### Gestionnaires de mapping et Filtres

Le tableau suivant explique les filtres supportés par différents gestionnaires.

**Votre projet SubQuery sera beaucoup plus efficace lorsque vous n'utiliserez que les gestionnaires d'événements et d'appels avec les filtres de mappage appropriés**

| Gestionnaire                               | Filtres pris en charge       |
| ------------------------------------------ | ---------------------------- |
| [BlockHandler](./mapping.md#block-handler) | `specVersion`                |
| [EventHandler](./mapping.md#event-handler) | `module`,`method`            |
| [CallHandler](./mapping.md#call-handler)   | `module`,`method` ,`success` |

Les filtres de mappage par défaut sont une fonctionnalité extrêmement utile pour décider quel bloc, événement ou extrinsèque déclenchera un gestionnaire de mapping.

Seules les données entrantes qui satisfont les conditions de filtrage seront traitées par les fonctions de mapping. Les filtres de cartographie sont optionnels mais sont fortement recommandés car ils réduisent considérablement la quantité de données traitées par votre projet SubQuery et améliorent les performances d'indexation.

```yaml
# Exemple de filtre depuis callHandler
filter:
  module: balances
  method: Deposit
  success: true
```

- Les filtres de modules et de méthodes sont pris en charge sur toute chaîne basée sur un substrat.
- Le filtre `succès` prend une valeur booléenne et peut être utilisé pour filtrer l'extrinsèque par son état de réussite.
- Le filtre `specVersion` spécifie la plage de version spécifique pour un bloc de substrat. Les exemples suivants décrivent comment définir les plages de version.

```yaml
filter:
  specVersion: [23, 24]   # Bloc d'index avec specVersion entre 23 et 24 (inclus).
  specVersion: [100]      # Bloc d'index avec specVersion supérieur ou égal à 100.
  specVersion: [null, 23] # bloc d'index avec specVersion inférieure ou égale à 23.
```

## Chaînes personnalisées

### Network Spec

Lors de la connexion à une parachain Polkadot différente ou même à une chaîne de substrat personnalisée, vous devrez modifier la section [Network Spec](#network-spec) de ce manifeste.

Le `genesisHash` doit toujours être le hachage du premier bloc du réseau personnalisé. Vous pouvez le retrouver facilement en allant sur [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) et en cherchant le hachage sur **bloc 0** (voir l'image ci-dessous).

![Hash de la Genèse](/assets/img/genesis-hash.jpg)

De plus, vous devrez mettre à jour le `point de terminaison (endpoint)`. Définit le point de terminaison wss de la blockchain à indexer - **Ce doit être un noeud d'archive complet**. Vous pouvez récupérer les points de terminaison (endpoints) pour toutes les parachains gratuitement depuis [OnFinality](https://app.onfinality.io)

### Types de chaînes

Vous pouvez indexer des données à partir de chaînes personnalisées en incluant également les types de chaînes dans le manifeste.

Nous prenons en charge les types supplémentaires utilisés par les modules d'exécution de substrate, `typesAlias`, `typesBundle`, `typesChain`, et `typesSpec` sont également pris en charge.

In the v0.2.0 example below, the `network.chaintypes` are pointing to a file that has all the custom types included, This is a standard chainspec file that declares the specific types supported by this blockchain in either `.json`, `.yaml` or `.js` format.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ``` yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # The relative filepath to where custom types are stored ... ``` </CodeGroupItem> <CodeGroupItem title="v0.0.1"> ``` yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter:  #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true ``` </CodeGroupItem> </CodeGroup>

To use typescript for your chain types file include it in the `src` folder (e.g. `./src/types.ts`), run `yarn build` and then point to the generated js file located in the `dist` folder.

```yml
network:
  chaintypes:
    file: ./dist/types.js # Will be generated after yarn run build
...
```

Things to note about using the chain types file with extension `.ts` or `.js`:

- Your manifest version must be v0.2.0 or above.
- Only the default export will be included in the [polkadot api](https://polkadot.js.org/docs/api/start/types.extend/) when fetching blocks.

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
