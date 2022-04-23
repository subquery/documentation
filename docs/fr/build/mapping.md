# Mapping

Les fonctions de mappage définissent comment les données de la chaîne sont transformées en entités GraphQL optimisées que nous avons préalablement définies dans le fichier `schema.graphql`.

- Les mappings sont définis dans le répertoire `src/mappings` et sont exportés en tant que fonction
- Ces mappings sont également exportés dans `src/index.ts`
- Les fichiers de mappings sont référencés dans `project.yaml` sous le nom de mapping handlers.

Il existe trois classes de fonctions de mappage : [Block Handlers](#block-handler), [Event Handlers](#event-handler) et [Call Handlers](#call-handler).

## Gestionnaire de bloc

Vous pouvez utiliser les gestionnaires de bloc pour capturer des informations à chaque fois qu'un nouveau bloc est attaché à la chaîne Substrate, par exemple le numéro de bloc. Pour ce faire, un BlockHandler défini sera appelé une fois pour chaque bloc.

```ts
import { SubstrateBlock } from "@subql/types";

export async function handleBlock(block: SubstrateBlock): Promise<void> {
  // Créer une nouvelle StarterEntity avec le hash du bloc comme ID
  const record = new starterEntity(block.block.header.hash.toString());
  record.field1 = block.block.header.number.toNumber();
  await record.save();
}
```

Un [SubstrateBlock](https://github.com/OnFinality-io/subql/blob/a5ab06526dcffe5912206973583669c7f5b9fdc9/packages/types/src/interfaces.ts#L16) est un type d'interface étendu de [signedBlock](https://polkadot.js.org/docs/api/cookbook/blocks/), mais il inclut également la `specVersion` et l'`horodatage`.

## Gestionnaire d'événements

Vous pouvez utiliser des gestionnaires d'événements pour capturer des informations lorsque certains événements sont inclus dans un nouveau bloc. Les événements qui font partie du runtime Substrate par défaut et un bloc peuvent contenir plusieurs événements.

Pendant le traitement, le gestionnaire d'événements recevra un événement de substrat comme argument avec les entrées et sorties typées de l'événement. Tout type d'événement déclenche le mappage, ce qui permet de capturer l'activité avec la source de données. Vous devriez utiliser des [filtres de mappage](./manifest.md#mapping-filters) dans votre manifeste pour filtrer les événements afin de réduire le temps nécessaire à l'indexation des données et d'améliorer les performances du mappage.

```ts
import {SubstrateEvent} from "@subql/types";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, balance]}} = event;
    // Récupérer l'enregistrement par son ID
    const record = new starterEntity(event.extrinsic.block.block.header.hash.toString());
    record.field2 = account.toString();
    record.field3 = (balance as Balance).toBigInt();
    await record.save();
```

Un [SubstrateEvent](https://github.com/OnFinality-io/subql/blob/a5ab06526dcffe5912206973583669c7f5b9fdc9/packages/types/src/interfaces.ts#L30) est un type d'interface étendu de l'[EventRecord](https://github.com/polkadot-js/api/blob/f0ce53f5a5e1e5a77cc01bf7f9ddb7fcf8546d11/packages/types/src/interfaces/system/types.ts#L149). Outre les données de l'événement, il comprend également un `id` (le bloc auquel appartient cet événement) et l'extrinsèque à l'intérieur de ce bloc.

## Gestionnaire d'appel

Les gestionnaires d'appels sont utilisés lorsque vous souhaitez capturer des informations sur certains extrinsèques de substrat.

```ts
export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
  const record = new starterEntity(
    extrinsic.block.block.header.hash.toString()
  );
  record.field4 = extrinsic.block.timestamp;
  await record.save();
}
```

Le [SubstrateExtrinsic](https://github.com/OnFinality-io/subql/blob/a5ab06526dcffe5912206973583669c7f5b9fdc9/packages/types/src/interfaces.ts#L21) étend [GenericExtrinsic](https://github.com/polkadot-js/api/blob/a9c9fb5769dec7ada8612d6068cf69de04aa15ed/packages/types/src/extrinsic/Extrinsic.ts#L170). On lui attribue un `id` (le bloc auquel cet extrinsèque appartient) et il fournit une propriété extrinsèque qui étend les événements parmi ce bloc. En outre, elle enregistre l'état de réussite de cette extrinsèque.

## États des requêtes
Notre objectif est de couvrir toutes les sources de données des utilisateurs pour les gestionnaires de mappage (plus que les trois types d'événements d'interface ci-dessus). Par conséquent, nous avons exposé certaines des interfaces @polkadot/api pour augmenter les capacités.

Ce sont les interfaces que nous supportons actuellement :
- [api.query.&lt;module&gt;.&lt;method&gt;()](https://polkadot.js.org/docs/api/start/api.query) interrogera le bloc <strong>actuel</strong>.
- [api.query.&lt;module&gt;.&lt;method&gt;.multi()](https://polkadot.js.org/docs/api/start/api.query.multi/#multi-queries-same-type) fera plusieurs requêtes du <strong>même</strong> type au bloc actuel.
- [api.queryMulti()](https://polkadot.js.org/docs/api/start/api.query.multi/#multi-queries-distinct-types) effectuera plusieurs requêtes de <strong>différents</strong> types dans le bloc actuel.

Voici les interfaces que nous ne supportons **pas** actuellement :
- ~~api.tx.\*~~
- ~~api.derive.\*~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.at~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.entriesAt~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.entriesPaged~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.hash~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.keysAt~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.keysPaged~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.range~~
- ~~api.query.&lt;module&gt;.&lt;method&gt;.sizeAt~~

Voyez un exemple d'utilisation de cette API dans notre exemple de cas d'utilisation [validateur-seuil](https://github.com/subquery/tutorials-validator-threshold).

## Appels RPC

Nous prenons également en charge certaines méthodes API RPC qui sont des appels à distance permettant à la fonction de mappage d'interagir avec le nœud, la requête et la soumission réels. L'un des principes de base de SubQuery est qu'il est déterministe, et donc, pour que les résultats restent cohérents, nous n'autorisons que les appels RPC historiques.

Les documents en [JSON-RPC](https://polkadot.js.org/docs/substrate/rpc/#rpc) fournissent certaines méthodes qui prennent `BlockHash` comme paramètre d'entrée (par exemple, `at? : BlockHash`), qui sont maintenant autorisées. Nous avons également modifié ces méthodes pour qu'elles prennent par défaut le hachage du bloc d'indexation actuel.

```typescript
// Disons que nous indexons actuellement un bloc avec ce numéro de hachage
const blockhash = `0x844047c4cf1719ba6d54891e92c071a41e3dfe789d064871148e9d41ef086f6a`;

// La méthode originale a une entrée optionnelle est un bloc de hachage. const b1 = await api.rpc.chain.getBlock(blockhash);

// Il utilisera le bloc actuel par défaut comme ceci
const b2 = await api.rpc.chain.getBlock();
```
- Pour les appels RPC des [chaînes de substrat personnalisées](#custom-substrate-chains), voir l'[utilisation](#usage).

## Modules et bibliothèques

Pour améliorer les capacités de traitement de données de SubQuery, nous avons autorisé certains des modules intégrés de NodeJS pour exécuter des fonctions de cartographie dans la [sandbox](#the-sandbox), et nous avons autorisé les utilisateurs à appeler des bibliothèques tierces.

Veuillez noter qu'il s'agit d'une **fonctionnalité expérimentale** et que vous pouvez rencontrer des bogues ou des problèmes qui peuvent avoir un impact négatif sur vos fonctions de cartographie. Veuillez signaler tout bogue que vous trouvez en créant un problème dans [GitHub](https://github.com/subquery/subql).

### Modules intégrés

Actuellement, nous autorisons les modules NodeJS suivants : `assert`, `buffer`, `crypto`, `util`, et `path`.

Plutôt que d'importer le module entier, nous recommandons de n'importer que la ou les méthodes dont vous avez besoin. Certaines méthodes de ces modules peuvent avoir des dépendances qui ne sont pas prises en charge et échoueront à l'importation.

```ts
import { hashMessage } from "ethers/lib/utils"; //Bon chemin
import { utils } from "ethers"; //mauvais chemin

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
  const record = new starterEntity(
    extrinsic.block.block.header.hash.toString()
  );
  record.field1 = hashMessage("Hello");
  await record.save();
}
```

### Bibliothèques tierces

En raison des limitations de la machine virtuelle dans notre sandbox, nous ne supportons actuellement que les bibliothèques tierces écrites par **CommonJS**.

Nous prenons également en charge une bibliothèque **hybride** comme `@polkadot/*` qui utilise ESM par défaut. Cependant, si d'autres bibliothèques dépendent de modules au format **ESM**, la machine virtuelle **ne** compilera **PAS** et retournera une erreur.

## Chaînes de substrats personnalisées

SubQuery peut être utilisé sur n'importe quelle chaîne basée sur Substrate, pas seulement Polkadot ou Kusama.

Vous pouvez utiliser une chaîne personnalisée basée sur Substrate et nous fournissons des outils pour importer des types, des interfaces et des méthodes supplémentaires automatiquement en utilisant [@polkadot/typegen](https://polkadot.js.org/docs/api/examples/promise/typegen/).

Dans les sections suivantes, nous utilisons notre [exemple de kitty](https://github.com/subquery/tutorials-kitty-chain) pour expliquer le processus d'intégration.

### Préparation

Créez un nouveau répertoire `api-interfaces` sous le dossier `src` du projet pour stocker tous les fichiers requis et générés. Nous créons également un répertoire `api-interfaces/kitties` car nous voulons ajouter la décoration dans l'API à partir du module `kitties`.

#### Métadonnées

Nous avons besoin de métadonnées pour générer les points de terminaison de l'API. Dans l'exemple de kitty, nous utilisons un endpoint d'un testnet local, et il fournit des types supplémentaires. Suivez les étapes de la [configuration des métadonnées de PolkadotJS](https://polkadot.js.org/docs/api/examples/promise/typegen#metadata-setup) pour récupérer les métadonnées d'un nœud à partir de son point de terminaison **HTTP**.

```shell
curl -H "Content-Type: application/json" -d '{"id":"1", "jsonrpc":"2.0", "method": "state_getMetadata", "params":[]}' http://localhost:9933
```
ou de son point de terminaison **websocket** avec l'aide de [`websocat`](https://github.com/vi/websocat):

```shell
//Installer websocat
brew install websocat

//Obtenir les metadata
echo state_getMetadata | websocat 'ws://127.0.0.1:9944' --jsonrpc
```

Ensuite, copiez et collez la sortie dans un fichier JSON. Dans notre [exemple de kitty](https://github.com/subquery/tutorials-kitty-chain), nous avons créé `api-interface/kitty.json`.

#### Définitions des types
Nous supposons que l'utilisateur connaît les types spécifiques et le support RPC de la chaîne, et que cela est défini dans le [Manifest](./manifest.md).

Après la [configuration des types](https://polkadot.js.org/docs/api/examples/promise/typegen#metadata-setup), nous créons :
- `src/api-interfaces/definitions.ts` - ceci exporte toutes les définitions des sous-dossiers.

```ts
export { default as kitties } from "./kitties/definitions";
```

- `src/api-interfaces/kitties/definitions.ts` - définitions des types pour le module kitties.
```ts
export default {
  // types personnalisés
  types: {
    Address: "AccountId",
    LookupSource: "AccountId",
    KittyIndex: "u32",
    Kitty: "[u8; 16]",
  },
  // custom rpc : api.rpc.kitties.getKittyPrice
  rpc: {
    getKittyPrice: {
      description: "Get Kitty price",
      params: [
        {
          name: "at",
          type: "BlockHash",
          isHistoric: true,
          isOptional: false,
        },
        {
          name: "kittyIndex",
          type: "KittyIndex",
          isOptional: false,
        },
      ],
      type: "Balance",
    },
  },
};
```

#### Paquets

- Dans le fichier `package.json`, assurez-vous d'ajouter `@polkadot/typegen` comme dépendance de développement et `@polkadot/api` comme dépendance normale (idéalement la même version). Nous avons également besoin de `ts-node` comme dépendance de développement pour nous aider à exécuter les scripts.
- Nous ajoutons des scripts pour exécuter les deux types ; les générateurs `generate:defs` et metadata `generate:meta` (dans cet ordre, afin que les métadonnées puissent utiliser les types).

Voici une version simplifiée du `package.json`. Assurez-vous que dans la section **scripts**, le nom du paquet est correct et que les répertoires sont valides.

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

### Génération des types

Maintenant que la préparation est terminée, nous sommes prêts à générer les types et les métadonnées. Exécutez les commandes ci-dessous :

```shell
# Yarn pour installer les nouvelles dépendances
yarn

# Générer les types
yarn generate:defs
```

Dans le dossier de chaque module (par exemple `/kitties`), il devrait maintenant y avoir un fichier `types.ts` généré qui définit toutes les interfaces à partir des définitions de ce module, ainsi qu'un fichier `index.ts` qui les exporte toutes.

```shell
# Générer les metadonnées
yarn generate:meta
```

Cette commande va générer les métadonnées et un nouvel api-augment pour les APIs. Comme nous ne voulons pas utiliser les APIs intégrées, nous devrons les remplacer en ajoutant un override explicite dans notre `tsconfig.json`. Après les mises à jour, les chemins dans la configuration ressembleront à ceci (sans les commentaires) :

```json
{
  "compilerOptions": {
    // c'est le nom du paquet que nous utilisons (dans les importations d'interface, --package pour les générateurs)  */
    "kitty-birthinfo/*": ["src/*"],
    // ici, nous remplaçons l'augmentation @polkadot/api par la nôtre, générée à partir de la chaîne
    "@polkadot/api/augment": ["src/interfaces/augment-api.ts"],
    // remplacer les types augmentés par les nôtres, tels que générés à partir des définitions
    "@polkadot/types/augment": ["src/interfaces/augment-types.ts"]
  }
}
```

### Utilisation

Maintenant, dans la fonction de mappage, nous pouvons montrer comment les métadonnées et les types décorent réellement l'API. Le point de terminaison RPC supportera les modules et les méthodes que nous avons déclarés ci-dessus. Et pour utiliser un appel RPC personnalisé, veuillez consulter la section [Appels RPC personnalisés de la chaîne](#custom-chain-rpc-calls).
```typescript
export async function kittyApiHandler(): Promise<void> {
  // retourne le type de KittyIndex
  const nextKittyId = await api.query.kitties.nextKittyId();
  // retourne le type de cagnotte, les paramètres d'entrée sont AccountId et KittyIndex. const allKitties = await api.query.kitties.kitties("xxxxxxxxx", 123);
  logger.info(`Next kitty id ${nextKittyId}`);
  //Rpc personnalisé, définir undefined to blockhash
  const kittyPrice = await api.rpc.kitties.getKittyPrice(
    undefined,
    nextKittyId
  );
}
```

**Si vous souhaitez publier ce projet dans notre explorateur, veuillez inclure les fichiers générés dans `src/api-interfaces`.**

### Appels rpc de chaîne personnalisés

Pour prendre en charge les appels RPC en chaîne personnalisés, nous devons injecter manuellement des définitions RPC pour `typesBundle`, ce qui permet une configuration par spécification. Vous pouvez définir le `typesBundle` dans le `project.yml`. Et n'oubliez pas que seuls les appels de type `isHistoric` sont supportés.
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
