# Fichier Manifeste

Le fichier Manifeste `project.yaml` peut être vu comme un point d'entrée de votre projet et il définit la plupart des détails sur la façon dont SubQuery indexera et transformera les données de la chaîne.

Le manifeste peut être au format YAML ou JSON. Dans ce document, nous utiliserons YAML dans tous les exemples. Ci-dessous est un exemple type d'un `project.yaml` de base.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> ` yml specVersion: 0.2.0 name: example-project # Fournir le nom du projet version: 1.0.0 # Version du projet description: '' # Description de votre projet repository: 'https://github.com/subquery/subql-starter' # Adresse du dépôt Git de votre projet schema: file: ./schema.graphql # L'emplacement de votre fichier de schéma GraphQL network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' # Genesis hash of the network endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Il est possible de fournir le point de terminaison HTTP d'un dictionnaire de chaîne complet pour accélérer le traitement. dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - kind: substrate/Runtime startBlock: 1 # Cela modifie le bloc de départ de l'indexation, définissez-le plus haut pour sauter les blocs initiaux avec moins de données. mapping: file: "./dist/index.js" handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Filter is optional module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> <CodeGroupItem title="v0.0.1"> ` yml specVersion: "0.0.1" description: '' # Description de votre projet repository: 'https://github.com/subquery/subql-starter' # Adresse du dépôt Git de votre projet schema: ./schema.graphql # L'emplacement de votre fichier de schéma GraphQL network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' # Il est possible de fournir le point de terminaison HTTP d'un dictionnaire de chaîne complet pour accélérer le traitement. dictionary: 'https://api.subquery.network/sq/subquery/dictionary-polkadot' dataSources: - name: main kind: substrate/Runtime startBlock: 1 # Cela modifie le bloc de départ de l'indexation, définissez-le plus haut pour sauter les blocs initiaux avec moins de données. mapping: handlers: - handler: handleBlock kind: substrate/BlockHandler - handler: handleEvent kind: substrate/EventHandler filter: #Le filtre est facultatif mais suggéré pour accélérer le traitement des événements. module: balances method: Deposit - handler: handleCall kind: substrate/CallHandler ```` </CodeGroupItem> </CodeGroup>

## Migration de v0.0.1 à v0.2.0 <Badge text="upgrade" type="warning"/>

**Si vous avez un projet avec specVersion v0.0.1, vous pouvez utiliser `subql migrate` pour une mise à niveau rapide. [Voir ici](#cli-options) pour plus d'informations**

Sous `network`:

- Il y a un nouveau champ **requis** `genesisHash` qui aide à identifier la chaîne utilisée.
- Pour la v0.2.0 et supérieure, vous pouvez référencer un type de[fichier chaintype](#custom-chains) externe si vous référencez une chaîne personnalisée.

Sous `dataSources`:

- Peut directement lier un point d'entrée `index.js` pour les gestionnaires de mappage. Par défaut, ce `index.js` sera généré à partir de `index.ts` pendant le processus de construction.
- Les sources de données peuvent maintenant être soit une source de données d'exécution régulière ou [une source de données personnalisée](#custom-data-sources).

### Options CLI

Par défaut, l'interface CLI génère des projets SubQuery pour la version 0.2.0 de la spécification. Ce comportement peut être modifié en exécutant `subql init --specVersion 0.0.1 NOM_DE_PROJET`, bien que cela ne soit pas recommandé car le projet ne sera pas supporté par le service hébergé SubQuery dans le futur.

`subql migrate` peut être exécutée dans un projet existant pour migrer le manifeste du projet vers la dernière version.

USAGE $ subql init [PROJECTNAME]

ARGUMENTS PROJECTNAME Donne le nom du projet de démarrage.

| Options                 | Description                                                                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| -f, --force             |                                                                                                                                                              |
| -l, --location=location | dossier local pour créer le projet                                                                                                                           |
| --install-dependencies  | Installer également les dépendances                                                                                                                          |
| --npm                   | Force l'utilisation de NPM au lieu de yarn, ne fonctionne qu'avec l'option `install-dependencies`                                                            |
| --specVersion=0.0.1     | 0.2.0 [default: 0.2.0]                                                                            | La version de la spécification à utiliser par le projet. |

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
| **dictionary**  | String | String        | Il est suggéré de fournir le point de terminaison HTTP d'un dictionnaire en chaîne complète pour accélérer le traitement - lire [comment fonctionne un dictionnaire SubQuery](../academy/tutorials_examples/dictionary.md).                                            |
| **chaintypes**  | 𐄂      | {file:String} | Chemin vers le fichier de types de chaîne, accepte le format `.json` ou `.yaml`                                                                                                                                                                                        |

### Datasource Spec

Définit les données qui seront filtrées et extraites et l'emplacement du gestionnaire de la fonction de mappage pour la transformation des données à appliquer.
| Champ          | v0.0.1                                                    | v0.2.0                                                                           | Description                                                                                                                                                                                                                                                                                                    |
| -------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name**       | String                                                    | 𐄂                                                                                | Nom de la source de données                                                                                                                                                                                                                                                                                    |
| **kind**       | [substrate/Runtime](./manifest/#data-sources-and-mapping) | substrate/Runtime, [substrate/CustomDataSource](./manifest/#custom-data-sources) | Nous prenons en charge les types de données provenant du runtime de substrat par défaut, tels que les blocs, les événements et les extrinsèques (appels). <br/> À partir de la version 0.2.0, nous prenons en charge les données provenant de runtime personnalisés, tels que les contrats intelligents. |
| **startBlock** | Entier                                                    | Entier                                                                           | Ceci change le bloc de départ de l'indexation, mettez-le plus haut pour sauter les blocs initiaux avec moins de données.                                                                                                                                                                                       |
| **mapping**    | Mapping Spec                                              | Mapping Spec                                                                     |                                                                                                                                                                                                                                                                                                                |
| **filter**     | [network-filters](./manifest/#network-filters)            | 𐄂                                                                                | Filtrer la source de données à exécuter par le nom du spec du point de terminaison réseau.                                                                                                                                                                                                                     |

### Mapping Spec

| Champ                  | v0.0.1                                                                   | v0.2.0                                                                                  | Description                                                                                                                                                                                                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **file**               | String                                                                   | 𐄂                                                                                       | Chemin d'accès à l'entrée de mapping                                                                                                                                                                                                                                                                    |
| **handlers & filters** | [Default handlers and filters](./manifest/#mapping-handlers-and-filters) | Default handlers and filters, <br />[Custom handlers and filters](#custom-data-sources) | Liste toutes les [fonctions de mappage](./mapping.md) et leurs types de gestion correspondants, avec des filtres de mappage supplémentaires. <br /><br /> Pour les gestionnaires de mapping des runtimes personnalisés veuillez consulter [les sources de données personnalisées](#custom-data-sources) |

## Sources de données et mapping

Dans cette section, nous allons parler du runtime de substrat par défaut et de son mapping. Voici un exemple :

```yaml
dataSources:
  - kind: substrate/Runtime # Indique qu'il s'agit du runtime par défaut
    startBlock: 1 # Ceci modifie votre bloc d'indexation de démarrage, définir ceci plus haut pour passer les blocs initiaux avec moins de données
    mapping:
      file: dist/index.js # Chemin d'entrée pour ce mapping
```

### Gestionnaires de mapping et Filtres

Le tableau suivant explique les filtres supportés par les différents gestionnaires.

**Votre projet SubQuery sera beaucoup plus efficace si vous utilisez uniquement des gestionnaires d'événements et d'appels avec des filtres de mapping appropriés.**

| Gestionnaire                               | Filtres pris en charge       |
| ------------------------------------------ | ---------------------------- |
| [BlockHandler](./mapping.md#block-handler) | `specVersion`                |
| [EventHandler](./mapping.md#event-handler) | `module`,`method`            |
| [CallHandler](./mapping.md#call-handler)   | `module`,`method` ,`success` |

Les filtres de mappage par défaut du temps d'exécution sont une fonctionnalité extrêmement utile pour décider quel bloc, événement ou extrinsèque déclenchera un gestionnaire de mappage.

Seules les données entrantes qui satisfont aux conditions du filtre seront traitées par les fonctions de mappage. Les filtres de mappage sont facultatifs mais sont fortement recommandés car ils réduisent considérablement la quantité de données traitées par votre projet SubQuery et améliorent les performances d'indexation.

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

Lorsque vous vous connectez à une parachaîne Polkadot différente ou même à une chaîne de substrat personnalisée, vous devrez modifier la section [Network Spec](#network-spec) de ce manifeste.

Le `genesisHash` doit toujours être le hash du premier bloc du réseau personnalisé. Vous pouvez le retirer facilement en allant sur [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/explorer/query/0) et en recherchant le hachage du **bloc 0** (voir l'image ci-dessous).

![Genesis Hash](/assets/img/genesis-hash.jpg)

En outre, vous devrez mettre à jour le `point de terminaison`. Ceci définit le point de terminaison wss de la blockchain à indexer - **Ce doit être un nœud d'archive complet**. Vous pouvez récupérer les points de terminaison (endpoints) pour toutes les parachains gratuitement depuis [OnFinality](https://app.onfinality.io)

### Types de chaînes

Vous pouvez indexer les données de chaînes personnalisées en incluant également les types de chaînes dans le manifeste.

Nous supportons les types supplémentaires utilisés par les modules d'exécution de substrat, `typesAlias`, `typesBundle`, `typesChain`, et `typesSpec` sont également supportés.

Dans l'exemple v0.2.0 ci-dessous, `network.chaintypes` pointe vers un fichier qui contient tous les types personnalisés. Il s'agit d'un fichier chainspec standard qui déclare les types spécifiques pris en charge par cette blockchain au format `.json`, `.yaml` ou `.js`.

<CodeGroup> <CodeGroupItem title="v0.2.0" active> `yml network: genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' endpoint: 'ws://host.kittychain.io/public-ws' chaintypes: file: ./types.json # The relative filepath to where custom types are stored ...` </CodeGroupItem> <CodeGroupItem title="v0.0.1"> `yml ... ``` </CodeGroupItem>
<CodeGroupItem title="v0.0.1"> ``` yml ... network: endpoint: "ws://host.kittychain.io/public-ws" types: { "KittyIndex": "u32", "Kitty": "[u8; 16]" } # typesChain: { chain: { Type5: 'example' } } # typesSpec: { spec: { Type6: 'example' } } dataSources: - name: runtime kind: substrate/Runtime startBlock: 1 filter: #Optional specName: kitty-chain mapping: handlers: - handler: handleKittyBred kind: substrate/CallHandler filter: module: kitties method: breed success: true` </CodeGroupItem> </CodeGroup>

Pour utiliser Typescript pour votre fichier de types de chaînes, incluez-le dans le dossier `src` (par exemple `./src/types.ts`), exécutez `yarn build` et pointez ensuite sur le fichier js généré situé dans le dossier `dist`.

```yml
network:
  chaintypes:
    file: ./dist/types.js # Will be generated after yarn run build
```

Points à noter concernant l'utilisation du fichier de types de chaîne avec l'extension `.ts` ou `.js`:

- La version de votre manifeste doit être v0.2.0 ou supérieure.
- Seule l'exportation par défaut sera incluse dans l'[api polkadot](https://polkadot.js.org/docs/api/start/types.extend/) lors de la récupération des blocs.

Voici un exemple d'un fichier de types de chaînes `.ts`:

<CodeGroup> <CodeGroupItem title="types.ts"> `ts import { typesBundleDeprecated } from "moonbeam-types-bundle" export default { typesBundle: typesBundleDeprecated }; ` </CodeGroupItem> </CodeGroup>

## Sources de données personnalisées

Les sources de données personnalisées fournissent une fonctionnalité spécifique au réseau qui facilite le traitement des données. Elles agissent comme un intergiciel qui peut fournir un filtrage supplémentaire et une transformation des données.

Un bon exemple de ceci est le support EVM, avoir un processeur de source de données personnalisé pour EVM signifie que vous pouvez filtrer au niveau EVM (par exemple, filtrer les méthodes de contrat ou les journaux) et les données sont transformées en structures familières à l'écosystème Ethereum ainsi que les paramètres d'analyse syntaxique avec ABIs.

Les sources de données personnalisées peuvent être utilisées avec les sources de données normales.

Voici une liste des sources de données personnalisées prises en charge :

| Type                                                 | Gestionnaires pris en charge                                                                           | Filtres                                   | Description                                                                                          |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [substrat/Moonbeam](./moonbeam/#data-source-example) | [substrat/MoonbeamEvent](./moonbeam/#moonbeamevent), [substrat/MoonbeamCall](./moonbeam/#moonbeamcall) | Voir les filtres sous chaque gestionnaire | Fournit une interaction facile avec les transactions et les événements EVM sur les réseaux Moonbeams |

## Filtres réseau

Les**filtres de réseau ne s'appliquent qu'au manifest spec v0.0.1**.

En général, l'utilisateur crée une SubQuery et s'attend à la réutiliser à la fois pour son environnement testnet et mainnet (par exemple Polkadot et Kusama). D'un réseau à l'autre, plusieurs options sont susceptibles d'être différentes (par exemple, le bloc de départ de l'index). Par conséquent, nous permettons aux utilisateurs de définir différents détails pour chaque source de données, ce qui signifie qu'un projet SubQuery peut toujours être utilisé sur plusieurs réseaux.

Les utilisateurs peuvent ajouter un `filtre` sur les `dataSources` pour décider de la source de données à exécuter sur chaque réseau.

Voici un exemple qui montre différentes sources de données pour les réseaux Polkadot et Kusama.

<CodeGroup> <CodeGroupItem title="v0.0.1"> `yaml --- network: endpoint: 'wss://polkadot.api.onfinality.io/public-ws' #Create a template to avoid redundancy definitions: mapping: &mymapping handlers: - handler: handleBlock kind: substrate/BlockHandler dataSources: - name: polkadotRuntime kind: substrate/Runtime filter: #Optional specName: polkadot startBlock: 1000 mapping: *mymapping #use template here - name: kusamaRuntime kind: substrate/Runtime filter: specName: kusama startBlock: 12000 mapping: *mymapping # can reuse or change ` </CodeGroupItem>

</CodeGroup>
