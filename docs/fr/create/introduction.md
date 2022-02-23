# Création d'un projet de SubQuery

Dans le guide [de démarrage rapide](/quickstart/quickstart.md) , nous avons rapidement parcouru un exemple pour vous donner un aperçu de ce qu'est SubQuery et de son fonctionnement. Ici, nous allons examiner de plus près le workflow lors de la création de votre projet et les fichiers clés avec lesquels vous travaillez.

## Le Workflow de base

Certains des exemples suivants supposent que vous avez initialisé avec succès le paquet de démarrage dans la section [Démarrage rapide](../quickstart/quickstart.md). À partir de ce paquet, nous allons suivre le processus standard pour personnaliser et implémenter votre projet SubQuery.

1. Initialise your project using `subql init PROJECT_NAME`.
2. Mettre à jour le fichier Manifest (`projet. aml`) pour inclure des informations sur votre blockchain, et les entités que vous allez cartographier - voir [Fichier Manifest](./manifest.md)
3. Créez des entités GraphQL dans votre schéma (`schéma.graphql`) qui définissent la forme des données que vous allez extraire et persister pour interroger - voir [Schéma GraphQL](./graphql.md)
4. Ajouter toutes les fonctions de mappage (par exemple `mappingHandlers.ts`) que vous souhaitez appeler pour transformer des chaînes de données en entités GraphQL que vous avez définies - voir [Mapping](./mapping.md)
5. Générer, construire, et publiez votre code sur les projets SubQuery (ou exécutez dans votre propre nœud local) - voir [Exécuter et interroger votre projet de démarrage](./quickstart.md#running-and-querying-your-starter-project) dans notre guide de démarrage rapide.

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

<CodeGroup> <CodeGroupItem title="YARN" active> ```shell yarn build ``` </CodeGroupItem>
<CodeGroupItem title="NPM"> ```bash npm run-script build ``` </CodeGroupItem> </CodeGroup>

### Alternative build options

We support additional build options for subquery projects using `subql build`.

With this you can define additional entry points to build using the exports field in package.json.

```json
"name": "project-name",
"version": "1.0.0",
...
"exports": {
  "entry_one": "./src/entry_one.ts",
  "entry_renamed": "./src/entry_two.ts"
},
```

Then by running `subql build` it will generate a dist folder with the following structure:

```
- project-name
  L dist
    L entry_one.js
    L entry_renamed.js
    L index.js 
```

Note that it will build `index.ts` whether or not it is specified in the exports field.

For more information on using this including flags, see [cli reference](https://doc.subquery.network/references/references/#build).

## Logging

The `console.log` method is **no longer supported**. Instead, a `logger` module has been injected in the types, which means we can support a logger that can accept various logging levels.

```typescript
logger.info('Info level message');
logger.debug('Debugger level message');
logger.warn('Warning level message');
```

To use `logger.info` or `logger.warn`, just place the line into your mapping file.

![logging.info](/assets/img/logging_info.png)

To use `logger.debug`, an additional flag is required. Add `--log-level=debug` to your command line.

If you are running a docker container, add this line to your `docker-compose.yaml` file.

![logging.debug](/assets/img/logging_debug.png)

You should now see the new logging in the terminal screen.

![logging.debug](/assets/img/subquery_logging.png)
