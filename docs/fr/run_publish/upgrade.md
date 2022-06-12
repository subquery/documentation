# Déployer une nouvelle version de votre projet SubQuery

## Directives

Bien que vous ayez la liberté de toujours mettre à jour et de déployer de nouvelles versions de votre projet SubQuery, veuillez faire preuve de considération pendant ce processus si votre projet SubQuery est public pour le monde entier. Quelques points clés à noter :

- Si votre mise à niveau est un changement de rupture, créez un nouveau projet (par exemple `Mon projet SubQuery V2`) ou prévenez largement votre communauté du changement par le biais des canaux de médias sociaux.
- Le déploiement d'une nouvelle version du projet SubQuery entraîne un certain temps d'arrêt car la nouvelle version indexe la chaîne complète à partir du bloc de genèse.

## Déployer les modifications

Connectez-vous à SubQuery Project et sélectionnez le projet dont vous souhaitez déployer une nouvelle version. Vous pouvez choisir de déployer sur l'emplacement de production ou de mise en scène. Ces deux créneaux sont des environnements isolés et chacun possède ses propres bases de données et se synchronise indépendamment.

Nous vous recommandons de déployer sur votre emplacement de transit uniquement pour les tests finaux de transit ou lorsque vous devez resynchroniser les données de votre projet. Vous pouvez ensuite le mettre en production sans aucun temps d'arrêt. You will find testing is faster when [running a project locally](../run_publish/run.md) as you can more [easily debug issues](../academy/tutorials_examples/debug-projects.md).

Le staging slot, emplacement de mise à disposition, est parfait pour :

- Validation finale des modifications apportées à votre projet de SubQuery dans un environnement séparé. Le slot de staging, emplacement de mise à disposition, possède une URL différente de celle de la production que vous pouvez utiliser dans vos dApps.
- Réchauffer et indexer les données pour un projet SubQuery mis à jour afin d'éliminer les temps d'arrêt dans votre dApp
- Préparer une nouvelle version de votre projet SubQuery sans l'exposer publiquement. L'emplacement de mise à disposition n'est pas exposé au public dans l'explorateur et possède une URL unique qui n'est visible que par vous.

![Emplacement de stage](/assets/img/staging_slot.png)

#### Mise à niveau vers la dernière version de l'indexeur et du service de requêtes

Si vous souhaitez simplement passer à la dernière version de l'indexeur ([`@subql/node`](https://www.npmjs.com/package/@subql/node)) ou du service de requête ([`@subql/query`](https://www.npmjs.com/package/@subql/query)) pour profiter de nos améliorations régulières en termes de performances et de stabilité, il vous suffit de sélectionner une version plus récente de nos paquets et d'enregistrer. Cela ne causera que quelques minutes de temps d'arrêt.

#### Déployer la nouvelle version de votre projet SubQuery

Remplissez le Commit Hash de GitHub (copiez le Commit Hash complet) de la version de la base de code de votre projet SubQuery que vous souhaitez déployer. Cela entraînera un temps d'arrêt plus long en fonction du temps nécessaire à l'indexation de la chaîne actuelle. Vous pouvez toujours rapporter ici les progrès accomplis.

## Étapes suivantes - Connexion à votre projet

Une fois que votre déploiement a été effectué avec succès et que nos nœuds ont indexé vos données depuis chaîne, vous pourrez vous connecter à votre projet via le point de terminaison GraphQL Query affiché.

![Projet en cours de déploiement et de synchronisation](/assets/img/projects-deploy-sync.png)

Vous pouvez également cliquer sur les trois points situés à côté du titre de votre projet, et le visualiser dans l'explorateur de SubQuery. There you can use the in browser playground to get started - [read more about how to user our Explorer here](../run_publish/query.md).
