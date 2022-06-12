# Création d'un projet de SubQuery

Dans le guide [de démarrage rapide](/quickstart/quickstart-polkadot.md) , nous avons rapidement parcouru un exemple pour vous donner un aperçu de ce qu'est SubQuery et de son fonctionnement. Ici, nous allons examiner de plus près le workflow lors de la création de votre projet et les fichiers clés avec lesquels vous travaillez.

## Le Workflow de base

Certains des exemples suivants supposent que vous avez initialisé avec succès le paquet de démarrage dans la section [Démarrage rapide](../quickstart/quickstart-polkadot.md). À partir de ce paquet, nous allons suivre le processus standard pour personnaliser et implémenter votre projet SubQuery.

1. Initialise your project using `subql init PROJECT_NAME`.
2. Mettre à jour le fichier Manifest (`projet. aml`) pour inclure des informations sur votre blockchain, et les entités que vous allez cartographier - voir [Fichier Manifest](./manifest.md)
3. Créez des entités GraphQL dans votre schéma (`schéma.graphql`) qui définissent la forme des données que vous allez extraire et persister pour interroger - voir [Schéma GraphQL](./graphql.md)
4. Ajouter toutes les fonctions de mappage (par exemple `mappingHandlers.ts`) que vous souhaitez appeler pour transformer des chaînes de données en entités GraphQL que vous avez définies - voir [Mapping](./mapping.md)
5. Générer, construire, et publiez votre code sur les projets SubQuery (ou exécutez dans votre propre nœud local) - voir [Exécuter et interroger votre projet de démarrage](./quickstart-polkadot.md#running-and-querying-your-starter-project) dans notre guide de démarrage rapide.

## Structure du répertoire

Voici un aperçu de la structure de répertoire d'un projet de SubQuery lorsque la commande `init` est exécutée.

```
- project-name
  L package.json
  L project.yaml
  L README.md
  L schema.graphql
  L tsconfig.json
  L docker-compose.yml
  L src
    L index.ts
    L mappings
      L mappingHandlers.ts
  L .gitignore
```

Par exemple :

![Structure du répertoire SubQuery](/assets/img/subQuery_directory_stucture.png)

## Génération du code

Lorsque vous changez vos entités GraphQL, vous devez régénérer votre répertoire de types avec la commande suivante.

```
yarn codegen
```

Cela va créer un nouveau répertoire (ou mettre à jour le existant) `src/types` qui contiennent des classes d'entités générées pour chaque type que vous avez défini précédemment dans le schéma `schema.graphql`. Ces classes fournissent le chargement d'entités sécurisées par type, lire et écrire l'accès aux champs de l'entité - en savoir plus sur ce processus dans [le Schéma GraphQL](./graphql.md).

## Construction

Afin d'exécuter votre projet SubQuery sur un noeud SubQuery hébergé localement, vous devez d'abord compiler votre travail.

Exécutez la commande build depuis le répertoire racine du projet.

<CodeGroup> <CodeGroupItem title="YARN" active> `shell yarn build ` </CodeGroupItem> <CodeGroupItem title="NPM"> `bash npm run-script build ` </CodeGroupItem> </CodeGroup>

### Autres options de compilation

Nous supportons des options de construction supplémentaires pour les projets SubQuery en utilisant `subql build`.

Avec cela, vous pouvez définir des points d'entrée supplémentaires pour la construction en utilisant le champ exports dans package.json.

```json
"name": "project-name",
"version": "1.0.0",
...
"exports": {
  "entry_one": "./src/entry_one.ts",
  "entry_renamed": "./src/entry_two.ts"
},
```

Ensuite, en exécutant `subql build`, il générera un dossier dist avec la structure suivante :

```
- project-name
  L dist
    L entry_one.js
    L entry_renamed.js
    L index.js
```

Notez que le `fichier index.ts` sera construit, qu'il soit spécifié ou non dans le champ exports.

Pour plus d'informations sur l'utilisation de ces drapeaux d'inclusion, voir la [référence cli](https://doc.subquery.network/references/references/#build).

## Journalisation

La méthode `console.log` **n'**est **plus prise en charge**. À la place, un module `logger` a été injecté dans les types, ce qui signifie que nous pouvons prendre en charge un logger qui peut accepter différents niveaux de journalisation.

```typescript
logger.info("Info level message");
logger.debug("Debugger level message");
logger.warn("Warning level message");
```

Pour utiliser `logger.info` ou `logger.warn`, il suffit de placer la ligne dans votre fichier de mappage.

![logging.info](/assets/img/logging_info.png)

Pour utiliser `logger.debug`, un drapeau supplémentaire est nécessaire. Ajoutez `--log-level=debug` à votre ligne de commande.

Si vous exécutez un conteneur docker, ajoutez cette ligne à votre fichier `docker-compose.yaml`.

![logging.debug](/assets/img/logging_debug.png)

Vous devriez maintenant voir la nouvelle journalisation dans l'écran du terminal.

![logging.debug](/assets/img/subquery_logging.png)
