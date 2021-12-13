# Options de ligne de commande

## subql-node

### --help

Cela montre les options d'aide.

```shell
> subql-node --help
Options:
      --help                Montrer l'aide                                  [boolean]
      --version             Afficher la version                       [boolean]
  -f, --subquery            Chemin local du projet subquery          [string]
      --subquery-name       Nom du projet de subquery                [string]
  -c, --config              Fichier de configuration spécifier                  [string]
      --local               Utiliser le mode local                             [boolean]
      --force-clean         Nettoyage forcé de la base de données, en 
                            supprimant le schéma et les tables du projet                                 [boolean]
      --batch-size          Taille du lot de blocs à extraire en 
                            une seule fois  [number]
      --timeout             Délai d'exécution des fonctions de mapping 
                            par la sandbox de l'indexeur                                   [number]
      --debug               Affiche les informations de débogage sur la console. will
                            forcefully set log level to debug
                                                      [boolean] [default: false]
      --profiler            Show profiler information to console output
                                                      [boolean] [default: false]
      --network-endpoint    Blockchain network endpoint to connect      [string]
      --output-fmt          Print log as json or plain text
                                           [string] [choices: "json", "colored"]
      --log-level           Specify log level to print. Ignored when --debug is
                            used
          [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                                       "silent"]
      --migrate             Migrate db schema (for management tables only)
                                                      [boolean] [default: false]
      --timestamp-field     Enable/disable created_at and updated_at in schema
                                                       [boolean] [default: true]
  -d, --network-dictionary  Specify the dictionary api for this network [string]
  -m, --mmr-path            Local path of the merkle mountain range (.mmr) file
                                                                        [string]
      --proof-of-index      Enable/disable proof of index
                                                      [boolean] [default: false]
  -p, --port                The port the service will bind to
                                                        [number] [default: 3000]
```

### --version

Cela affiche la version actuelle.

```shell
> subql-node --version
0.19.1
```

### -f, --subquery

Utilisez cette option pour démarrer le projet SubQuery.

```shell
subql-node -f . // OU
subql-node --subquery .
```

### --subquery-name

Cette option vous permet de fournir un nom pour votre projet qui agit comme s'il créait une instance de votre projet. En fournissant un nouveau nom, un nouveau schéma de base de données est créé et la synchronisation des blocs reprend à zéro.

```shell
subql-node -f . --subquery-name=test2
```

### -c, --config

Toutes ces diverses configurations peuvent être placées dans un fichier .yml ou .json, puis référencées avec l'option config.

Exemple de fichier subquery_config.yml :

```shell
subquery: . // Obligatoire. Il s'agit du chemin local du projet. La point signifie ici le répertoire local courant.
subqueryName: hello // Nom facultatif
batchSize: 55 // Configuration facultative
```

Placez ce fichier dans le même répertoire que le projet. Ensuite, dans le répertoire actuel du projet, exécutez :

```shell
> subql-node -c ./subquery_config.yml
```

### --local

Cette option est principalement utilisé à des fins de débogage où il crée la table starter_entity par défaut dans le schéma "postgres" par défaut.

```shell
subql-node -f . --local
```

Notez qu'une fois que vous utilisez cette option, le supprimer ne signifie pas qu'il pointera vers une autre base de données. Pour pointer vers une autre base de données, vous devrez créer une NOUVELLE base de données et modifier les paramètres de l'environnement pour cette nouvelle base de données. En d'autres termes, "export DB_DATABASE=<new_db_here>"

### --force-clean

Cette option force les schémas et les tables du projet à être régénérés, utile à utiliser lors du développement itératif des schémas graphql de sorte que les nouvelles exécutions du projet travaillent toujours avec un état propre. Notez que cette option effacera également toutes les données indexées.

### --batch-size

Cette option vous permet de définir la taille du lot dans la ligne de commande. Si la taille du lot est également définie dans le fichier de configuration, elle est prioritaire.

```shell
> subql-node -f . --batch-size=20
2021-08-09T23:24:43.775Z <fetch> INFO fetch block [6601,6620], total 20 blocks
2021-08-09T23:24:45.606Z <fetch> INFO fetch block [6621,6640], total 20 blocks
2021-08-09T23:24:47.415Z <fetch> INFO fetch block [6641,6660], total 20 blocks
2021-08-09T23:24:49.235Z <fetch> INFO fetch block [6661,6680], total 20 blocks
```

<!-- ### --timeout -->

### --debug

Cela permet d'afficher des informations de débogage sur la console et de forcer le niveau des logs à déboguer.

```shell
> subql-node -f . --debug
2021-08-10T11:45:39.471Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): INSERT INTO "subquery_1"."starter_entities" ("id","block_height","created_at","updated_at") VALUES ($1,$2,$3,$4) ON CONFLICT ("id") DO UPDATE SET "id"=EXCLUDED."id","block_height"=EXCLUDED."block_height","updated_at"=EXCLUDED."updated_at" RETURNING "id","block_height","created_at","updated_at";
2021-08-10T11:45:39.472Z <db> DEBUG Executing (default): UPDATE "subqueries" SET "next_block_height"=$1,"updated_at"=$2 WHERE "id" = $3
2021-08-10T11:45:39.472Z <db> DEBUG Executing (1b0d0c23-d7c7-4adb-a703-e4e5c414e035): COMMIT;
```

### --profiler

Ceci affiche les informations du profil.

```shell
subql-node -f . --local --profiler
2021-08-10T10:57:07.234Z <profiler> INFO FetchService, fetchMeta, 3876 ms
2021-08-10T10:57:08.095Z <profiler> INFO FetchService, fetchMeta, 774 ms
2021-08-10T10:57:10.361Z <profiler> INFO SubstrateUtil, fetchBlocksBatches, 2265 ms
2021-08-10T10:57:10.361Z <fetch> INFO fetch block [3801,3900], total 100 blocks
```

### --network-endpoint

Cette option permet aux utilisateurs de remplacer la configuration du point d'extrémité du réseau à partir du fichier manifeste.

```shell
subql-node -f . --network-endpoint="wss://polkadot.api.onfinality.io/public-ws"
```

Notez que cela doit également être défini dans le fichier manifest, sinon vous obtiendrez :

```shell
ERROR Create Subquery project from given path failed! Error: failed to parse project.yaml.
An instance of ProjectManifestImpl has failed the validation:
 - property network has failed the following constraints: isObject
 - property network.network has failed the following constraints: nestedValidation
```

### --output-fmt

Il existe deux formats de sortie de terminal différents. JSON ou colored. Colored est la valeur par défaut et contient du texte coloré.

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

Vous avez le choix entre sept options. “fatal”, “error”, “warn”, “info”, “debug”, “trace”, “silent”. L'exemple ci-dessous affiche le silent. Rien ne sera imprimé dans le terminal, donc la seule façon de savoir si le nœud fonctionne ou non est d'interroger la base de données pour le nombre de lignes (select count(\*) from subquery_1.starter_entities) ou demander la hauteur du bloc.

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
(node:24686) [DEP0152] DeprecationWarning: Custom PerformanceEntry accessors are deprecated. Please use the detail property.
(node:24686) [PINODEP007] Warning: bindings.level is deprecated, use options.level option instead
```

<!-- ### --migrate TBA -->

### --timestamp-field

Par défaut, c'est vrai. lorsqu'il est mis à faux avec :

```shell
> subql-node -f . –timestamp-field=false
```

Cela supprime les colonnes created_at et updated_at de la table starter_entities.

### -d, --network-dictionary

Cela vous permet de spécifier un point de terminaison de dictionnaire qui est un service gratuit fourni et hébergé à : [https://explorer.subquery.network/](https://explorer.subquery.network/) (recherche de dictionnaire) et présente un point de terminaison API de : https://api.subquery.network/sq/subquery/dictionary-polkadot

En général, ce paramètre est défini dans votre fichier manifeste, mais vous trouverez ci-dessous un exemple d'utilisation de ce paramètre en tant qu'argument dans la ligne de commande.

```shell
subql-node -f . -d "https://api.subquery.network/sq/subquery/dictionary-polkadot"
```

[En savoir plus sur le fonctionnement d'un dictionnaire de SubQuery](../tutorials_examples/dictionary.md).

## subql-query

### --help

Cela montre les options d'aide.

```shell
Options:
      --help        Show help                                          [boolean]
      --version     Show version number                                [boolean]
  -n, --name        Project name                             [string] [required]
      --playground  Enable graphql playground                          [boolean]
      --output-fmt  Print log as json or plain text
                      [string] [choices: "json", "colored"] [default: "colored"]
      --log-level   Specify log level to print.
          [string] [choices: "fatal", "error", "warn", "info", "debug", "trace",
                                                     "silent"] [default: "info"]
      --indexer     Url that allow query to access indexer metadata     [string]
```

### --version

Cela affiche la version actuelle.

```shell
> subql-query --version
0.7.0
```

### -n, --name

Cette option est utilisé pour démarrer le service query. Si l'option --subquery-name n'est pas fournie lors de l'exécution d'un indexeur, le nom indiqué ici fera référence au nom de projet par défaut. Si le paramètre --subquery-name est défini, alors le nom doit correspondre à celui qui a été défini.

```shell
> subql-node -f . // --subquery-name not set

> subql-query -n subql-helloworld  --playground // le nom correspond par défaut au nom du répertoire du projet
```

```shell
> subql-node -f . --subquery-name=hiworld // --subquery-name set

> subql-query -n hiworld --playground  // le nom pointe vers le projet subql-helloworld mais avec le nom de hiworld
```

### --playground

Cette option active le graphql playground et doit donc toujours être inclus par défaut pour être utile.

### --output-fmt

Voir [--output-fmt](https://doc.subquery.network/references/references.html#output-fmt)

### --log-level

Voir [--log-level](https://doc.subquery.network/references/references.html#log-level)

<!-- ### --indexer TBA -->
