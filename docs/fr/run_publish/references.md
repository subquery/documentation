# Options de ligne de commande

## subql (cli)

### --help

```shell
> subql --help

COMMANDES
  build     Construire le code de ce projet SubQuery
  codegen   Générer des schémas pour le nœud de graphe
  help      afficher l aide pour subql
  init      Initialiser un projet scaffold subquery
  migrate   Migrer le manifeste du projet SubQuery v0.0.1 vers v0.2.0
  publish   Télécharger ce projet SubQuery vers IPFS
  validate  Vérifier qu un dossier ou un repo github est un projet SubQuery valide
```

### construire

Cette commande utilise webpack pour générer un bundle d'un projet subql.

| Options            | Description                                                            |
| ------------------ | ---------------------------------------------------------------------- |
| -l, --location     | dossier local du projet subquery (s'il n'est pas déjà dans le dossier) |
| -o, --output       | spécifie le dossier de sortie du build, par exemple build-folder       |
| --mode=(production | prod                                                                   |

- Avec `subql build`, vous pouvez spécifier des points d'entrée supplémentaires dans le champ exports, bien que l'`index.ts` soit toujours construit automatiquement.

- Vous devez avoir @subql/cli v0.19.0 ou plus pour utiliser le champ exports.

- Tout champ `exports` doit correspondre à un type de chaîne (par exemple, `"entry" : "./src/file.ts"`), sinon il sera ignoré lors de la construction.

[Un autre exemple](https://doc.subquery.network/create/introduction/#build).

## subql-node

### --help

Ceci montre les options d'aide.

```shell
> subql-node --help
Options:
      --help                Afficher l'aide                                  [boolean]
      --version             Afficher la version                      [boolean]
  -f, --subquery            Chemin local du projet subquery         [string]
      --subquery-name       Nom du projet de subquery   [deprecated] [string]
  -c, --config              Fichier de configuration spécifier                  [string]
      --local               Utiliser le mode local                 [deprecated] [boolean]
      --force-clean         Nettoyage forcé de la base de données, en 
                            supprimant le schéma et les tables du projet                                 [boolean]
      --db-schema           Db schema nom du project               [string]
      --unsafe              Permet l'utilisation de tout module intégré dans le
                            bac à sable                    [boolean][default: false]
      --batch-size          Taille du lot de blocs à extraire en 
                            une seule fois  [number]
      --scale-batch-size    échelonner la taille des lots en fonction de l'utilisation de la mémoire
                                                      [boolean] [default: false]
      --timeout             Délai d'exécution des fonctions de mapping 
                            par la sandbox de l'indexeur                                   [number]
      --debug               Affiche les informations de débogage sur la console. will
                            force le niveau du journal à déboguer
                                                      [boolean] [default: false]
      --profiler            Afficher les informations du profileur sur la sortie console
                                                      [boolean] [default: false]
      --network-endpoint    Point de terminaison du réseau blockchain à connecter      [string]
      --output-fmt          Imprimer le journal en json ou en texte brut
                                           [string] [choices: "json", "colored"]
      --log-level           Spécifier le niveau du journal à imprimer. Ignoré quand --debug est
                            utilisé
          [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                                       "silent"]
      --migrate             Migration du schéma de la base de données (pour les tables de gestion uniquement)
                                                      [boolean] [default: false]
      --timestamp-field     Activer/désactiver created_at et updated_at dans le schéma
                                                       [boolean] [default: true]
  -d, --network-dictionary  Spécifiez l'Api du dictionnaire pour ce réseau. [string]
  -m, --mmr-path            Chemin local de la chaîne de montagne de Merkle, fichier (.mmr)
                                                                        [string]
      --proof-of-index      Activer/désactiver la preuve d'index
                                                      [boolean] [default: false]
  -p, --port                Le port auquel le service sera lié
                                                        [number] [default: 3000]
```

### --version

Ceci affiche la version actuelle.

```shell
> subql-node --version
0.19.1
```

### -f, --subquery

Utilisez cette option pour démarrer le projet SubQuery.

```shell
subql-node -f . // OR
subql-node --subquery .
```

### --subquery-name (obsolète)

Cette option vous permet de fournir un nom pour votre projet qui agit comme s'il créait une instance de votre projet. En fournissant un nouveau nom, un nouveau schéma de base de données est créé et la synchronisation des blocs recommence à zéro. Déprécié en faveur de `--db-schema`

```shell
subql-node -f . --subquery-name=test2
```

### -c, --config

Toutes ces diverses configurations peuvent être placées dans un fichier .yml ou .json et ensuite référencées avec le drapeau config.

Exemple de fichier subquery_config.yml :

```shell
subquery: . // Obligatoire. Il s agit du chemin local du projet. Le point signifie ici le répertoire local actuel.
subqueryName: hello // Facultatif name
batchSize: 55 // Facultatif config
```

Placez ce fichier dans le même répertoire que le projet. Ensuite, dans le répertoire actuel du projet, exécutez :

```shell
> subql-node -c ./subquery_config.yml
```

### --local (déprécié)

Ce drapeau est principalement utilisé à des fins de débogage où il crée la table starter_entity par défaut dans le schéma "postgres" par défaut.

```shell
subql-node -f . --local
```

Notez qu'une fois que vous utilisez ce drapeau, le supprimer ne signifie pas qu'il pointera vers une autre base de données. Pour pointer vers une autre base de données, vous devrez créer une NOUVELLE base de données et modifier les paramètres env pour cette nouvelle base de données. En d'autres termes, "export DB_DATABASE=<new_db_here>"

### --force-clean

Ce drapeau force les schémas et les tables du projet à être régénérés, utile à utiliser lors du développement itératif des schémas graphql de sorte que les nouvelles exécutions du projet travaillent toujours avec un état propre. Notez que cette option efface également toutes les données indexées.

### --db-schema

Cette option vous permet de fournir un nom pour le schéma de base de données du projet. En fournissant un nouveau nom, un nouveau schéma de base de données est créé avec le nom configuré et l'indexation par blocs commence.

```shell
subql-node -f . --db-schema=test2
```

### --unsafe

Les projets SubQuery sont généralement exécutés dans un sandbox javascript pour la sécurité afin de limiter l'étendue de l'accès du projet à votre système. La sandbox limite les importations javascript disponibles aux modules suivants :

```javascript
["assert", "buffer", "crypto", "util", "path"];
```

Bien que cela renforce la sécurité, nous comprenons que cela limite la fonctionnalité disponible de votre SubQuery. La commande `--unsafe` importe tous les modules javascript par défaut, ce qui augmente considérablement les fonctionnalités de la sandbox, avec pour contrepartie une sécurité réduite.

**Notez que la commande `--unsafe` empêchera votre projet d'être exécuté dans le réseau SubQuery, et vous devez contacter le support si vous voulez que cette commande soit exécutée avec votre projet dans le service géré de SubQuery ([project.subquery.network](https://project.subquery.network)**)</strong>

### --batch-size

Ce paramètre vous permet de définir la taille du lot dans la ligne de commande. Si la taille du lot est également définie dans le fichier de configuration, elle est prioritaire.

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

### --scale-batch-size

Adapte la taille du lot de récupération de blocs à l'utilisation de la mémoire.

### --timeout

Définit un délai personnalisé pour que la sandbox javascript exécute les fonctions de mappage sur un bloc avant que la fonction de mappage du bloc ne lève une exception de délai.

### --debug

Cette option permet d'afficher des informations de débogage sur la sortie console et de forcer le niveau de journalisation à déboguer.

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### --profiler

Ceci affiche les informations du profileur.

```shell
subql-node -f . --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### --network-endpoint

Ce paramètre permet aux utilisateurs de remplacer la configuration du point de terminaison du réseau dans le fichier manifeste.

```shell
subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"
```

Notez que cela doit également être défini dans le fichier manifeste, sinon vous obtiendrez :

```shell
ERROR Create Subquery project from given path failed! Error: failed to parse project.yaml.
An instance of ProjectManifestImpl has failed the validation:
 - property network has failed the following constraints: isObject
 - property network.network has failed the following constraints: nestedValidation
```

### --output-fmt

Il existe deux formats de sortie de terminal différents. JSON ou colored. Colored est le format par défaut et contient du texte coloré.

```shell
> subql-node -f . --output-fmt=json
{"level":"info","timestamp":"2021-08-10T11:58:18.087Z","pid":24714,"hostname":"P.local","category":"fetch","message":"fetch block [10501,10600], total 100 blocks"}
```

```shell
> subql-node -f . --output-fmt=colored
2021-08-10T11:57:41.480Z <subql-node> INFO node started
(node:24707) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
2021-08-10T11:57:48.981Z <fetch> INFO fetch block [10201,10300], total 100 blocks
2021-08-10T11:57:51.862Z <fetch> INFO fetch block [10301,10400], total 100 blocks
```

### --log-level

Vous avez le choix entre sept options. "fatal", "error", "warn", "info", "debug", "trace", "silent". L'exemple ci-dessous montre "silent". Rien ne sera imprimé dans le terminal donc la seule façon de savoir si le noeud fonctionne ou non est d'interroger la base de données pour le nombre de lignes (select count(\*) from subquery_1.starter_entities) ou d'interroger la hauteur du bloc.

```shell
> subql-node -f . --log-level=silent
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(Use `node --trace-warnings ...` to show where the warning was created)
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
(node:24686) [DEP0152] DeprecationWarning: Custom PerformanceEntry accessors are deprecated. Veuillez utiliser la propriété de détail.
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
```

<!-- ### --migrate TBA -->

### --timestamp-field

Par défaut, ce champ est vrai. Lorsqu'il est défini à false avec :

```shell
> subql-node -f . –timestamp-field=false
```

Cela supprime les colonnes created_at et updated_at dans la table starter_entities.

### -d, --network-dictionary

Ceci vous permet de spécifier un point de terminaison de dictionnaire qui est un service gratuit fourni et hébergé à l'adresse [: https://explorer.subquery.network/](https://explorer.subquery.network/) (recherchez dictionnaire) et présente un point de terminaison API de [: https://api.subquery.network/sq/subquery/dictionary-polkadot](https://api.subquery.network/sq/subquery/dictionary-polkadot).

En général, cette option est définie dans votre fichier manifeste, mais l'exemple ci-dessous montre comment l'utiliser comme argument dans la ligne de commande.

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

[Read more about how a SubQuery Dictionary works](../academy/tutorials_examples/dictionary.md).

### -p, --port

Le port sur lequel le service d'indexation de SubQuery se lie. Par défaut, il est défini sur `3000`

## subql-query

### --help

Ceci montre les options d'aide.

```shell
Options:
      --help        Afficher l'aide                                          [boolean]
      --version     Afficher la version                                [boolean]
  -n, --name        Nom du projet                             [string] [required]
      --playground  Activer le terrain de jeu graphql                          [boolean]
      --output-fmt  Imprimer le journal en json ou en texte brut
                      [string] [choices: "json", "colored"] [default: "colored"]
      --log-level   Spécifiez le niveau du journal à imprimer.
          [string] [choix: "fatal", "error", "warn", "info", "debug", "trace",
                                                     "silent"] [default: "info"]
      --log-path Chemin pour créer le fichier de log. ./src/name. og          [string]
      --log-rotate Faire tourner les fichiers journaux dans le répertoire spécifié par log-path
                                                      [boolean] [default: false]
      --indexer Url qui permet à la requête d'accéder aux métadonnées d'indexer    [string]
      --unsafe Désactiver les limites sur la profondeur de la requête et le nombre autorisé retourné
                    enregistrements de requête                                      [boolean]
  -p, --port Le port que le service va lier à [number
```

### --version

Ceci affiche la version actuelle.

```shell
> subql-query --version
0.7.0
```

### -n, --name

Cette option est utilisée pour démarrer le service de requêtes. Si l'option --subquery-name n'est pas fournie lors de l'exécution d'un indexeur, le nom indiqué ici fera référence au nom de projet par défaut. Si l'option --subquery-name est définie, alors le nom ici devrait correspondre à ce qui a été défini.

```shell
> subql-node -f . // --subquery-name not set

> subql-query -n subql-helloworld  --playground // le nom correspond par défaut au répertoire du projet name
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground  // le nom pointe vers le projet subql-helloworld mais avec le nom de hiworld
```

### --playground

Cette option active le terrain de jeu de graphql et doit donc toujours être incluse par défaut pour être utile.

### --output-fmt

See [--output-fmt](https://doc.subquery.network/run_publish/references.html#output-fmt)

### --log-level

See [--log-level](https://doc.subquery.network/run_publish/references.html#log-level)

### --log-path

Active la journalisation des fichiers en fournissant un chemin d'accès à un fichier dans lequel la journalisation sera effectuée.

### --log-rotate

Active les rotations de journaux de fichiers avec les options d'un intervalle de rotation de 1d, un maximum de 7 fichiers et une taille maximale de fichier de 1GB

### --indexer

Définit une url personnalisée pour l'emplacement des points de terminaison de l'indexeur, le service de requête utilise ces points de terminaison pour l'état de santé de l'indexeur, les métadonnées et l'état de préparation.

### --unsafe

Le service d'interrogation est limité à 100 entités pour les requêtes graphql non limitées. L'indicateur unsafe supprime cette limite, ce qui peut entraîner des problèmes de performances pour le service de requêtes. Il est plutôt recommandé que les requêtes soient [paginées](https://graphql.org/learn/pagination/).

This flag enables certain aggregation functions including sum, max, avg and others. Read more about this feature [here](./aggregate.md)

This flag enables [GraphQL Subscriptions](./subscription.md)

Ces fonctions sont désactivées par défaut en raison de la limite d'entités.

****Notez que la commande `--unsafe` empêchera votre projet d'être exécuté dans le réseau SubQuery, et vous devez contacter le support si vous voulez que cette commande soit exécutée avec votre projet dans le service géré de SubQuery ([project.subquery.network](https://project.subquery.network)**).**

### --port

Le port sur lequel le service de requête SubQuery se lie. Par défaut, il est défini sur `3000`
