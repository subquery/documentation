# Déployer une nouvelle version de votre projet SubQuery

## Directives

Bien que vous ayez la liberté de toujours mettre à jour et de déployer de nouvelles versions de votre projet SubQuery, veuillez faire preuve de considération pendant ce processus si votre projet SubQuery est public pour le monde entier. Quelques points clés à noter :

- Si votre mise à niveau est un changement de rupture, créez un nouveau projet (par exemple `Mon projet SubQuery V2`) ou prévenez largement votre communauté du changement par le biais des canaux de médias sociaux.
- Le déploiement d'une nouvelle version du projet SubQuery entraîne un certain temps d'arrêt car la nouvelle version indexe la chaîne complète à partir du bloc de genèse.

## Déployer les modifications

There are two methods to deploy a new version of your project to the SubQuery Managed Service, you can use the UI or directly via the `subql` cli tool.

### Using the UI

Log into SubQuery Project and select the project you want to deploy a new version of. You can choose to either deploy to the production or staging slot. These two slots are isolated environments and each has their own databases and synchronise independently.

We recommend deploying to your staging slot only for final staging testing or when you need to resync your project data. You can then promote it to production with zero downtime. You will find testing is faster when [running a project locally](../run_publish/run.md) as you can more [easily debug issues](../academy/tutorials_examples/debug-projects.md).

The staging slot is perfect for:

- Validation finale des modifications apportées à votre projet de SubQuery dans un environnement séparé. Le slot de staging, emplacement de mise à disposition, possède une URL différente de celle de la production que vous pouvez utiliser dans vos dApps.
- Réchauffer et indexer les données pour un projet SubQuery mis à jour afin d'éliminer les temps d'arrêt dans votre dApp
- Préparer une nouvelle version de votre projet SubQuery sans l'exposer publiquement. L'emplacement de mise à disposition n'est pas exposé au public dans l'explorateur et possède une URL unique qui n'est visible que par vous.

![Staging slot](/assets/img/staging_slot.png)

Remplissez le Commit Hash de GitHub (copiez le Commit Hash complet) de la version de la base de code de votre projet SubQuery que vous souhaitez déployer. Cela entraînera un temps d'arrêt plus long en fonction du temps nécessaire à l'indexation de la chaîne actuelle. Vous pouvez toujours rapporter ici les progrès accomplis.

### Using the CLI

You can also use `@subql/cli` to create a new deployment of your project to our managed service. This requires:

- `@subql/cli` version 1.1.0 or above.
- A valid [SUBQL_ACCESS_TOKEN](/docs/run_publish/ipfs.md#prepare-your-subqlaccesstoken) ready.

```shell
// You can directly set your Indexer and Query versions
$ subql deployment:deploy --indexerVersion=1.1.2 --queryVersion=1.1.1

// OR you can use the interface, it will validate your IPFS CID and render a list of image versions that matches your manifest file `project.yaml`

$ subql deployment:deploy
```

## Upgrade to the Latest Indexer and Query Service

If you just want to upgrade to the latest indexer ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) or query service ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) to take advantage of our regular performance and stability improvements, just select a newer versions of our packages and save. This will cause only a few minutes of downtime as the services running your project are restarted.

## Étapes suivantes - Connexion à votre projet

Une fois que votre déploiement a été effectué avec succès et que nos nœuds ont indexé vos données depuis chaîne, vous pourrez vous connecter à votre projet via le point de terminaison GraphQL Query affiché.

![Projet en cours de déploiement et de synchronisation](/assets/img/projects-deploy-sync.png)

Vous pouvez également cliquer sur les trois points situés à côté du titre de votre projet, et le visualiser dans l'explorateur de SubQuery. There you can use the in browser playground to get started - [read more about how to user our Explorer here](../run_publish/query.md).
