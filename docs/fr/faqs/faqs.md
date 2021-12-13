# Questions fréquemment posées

## Qu'est-ce que SubQuery ?

SubQuery est un projet open source qui permet aux développeurs d'indexer, transformer et interroger les données de la chaîne Substrate pour alimenter leurs applications.

SubQuery fournit également l'hébergement gratuit de projets de production pour les développeurs, en supprimant la responsabilité de la gestion de l'infrastructure et en laissant les développeurs faire ce qu'ils font le mieux - construire.

## Quelle est la meilleure façon de commencer avec SubQuery ?

La meilleure façon de commencer avec SubQuery est d'essayer notre [tutoriel Hello World](../quickstart/helloworld-localhost.md). Il s'agit d'une prise en main de 5 minutes pour télécharger le modèle de démarrage, construire le projet, puis en utilisant Docker pour exécuter un noeud sur votre serveur local et en exécutant une requête simple.

## Comment puis-je contribuer ou faire un retour à SubQuery ?

Nous aimons les contributions et les commentaires de la communauté. Pour contribuer au code, faites un fork du répertoire d'intérêt et apportez vos changements. Ensuite soumettez une PR ou une Pull Request. Oh, n'oubliez pas de tester aussi ! Consultez également notre guide des contributions (TBA).

Pour nous faire part de vos commentaires, contactez-nous à l'adresse <hello@subquery.network> ou connectez-vous à notre [canal discord](https://discord.com/invite/78zg8aBSMG).

## Combien coûte l'hébergement de mon projet dans SubQuery Projects ?

Héberger votre projet dans SubQuery Projects est absolument gratuit - c'est notre façon de le rendre à la communauté. Pour apprendre comment héberger votre projet chez nous, veuillez consulter le tutoriel [Hello World (hébergé par SubQuery)](../quickstart/helloworld-hosted.md).

## Que sont les créneaux de déploiement ?

Les créneaux de déploiement sont une fonctionnalité des [projets SubQuery](https://project.subquery.network) qui est l'équivalent d'un environnement de développement. Par exemple, dans toute organisation logicielle, il y a normalement un environnement de développement et un environnement de production au minimum (en ignorant localhost). En général, des environnements supplémentaires tels que les environnements de développement et de pré-production, voire d'assurance qualité, sont inclus en fonction des besoins de l'organisation et de sa structure de développement.

SubQuery a actuellement deux slots disponibles. Un emplacement d'étape et un emplacement de production. Cela permet aux développeurs de déployer leur SubQuery dans l'environnement de test et, si tout va bien, de le "promouvoir en production" en cliquant sur un bouton.

## Quel est l'avantage d'un emplacement de test ?

Le principal avantage de l'utilisation d'un créneau de mise à disposition est qu'il vous permet de préparer une nouvelle version de votre projet SubQuery sans l'exposer publiquement. Vous pouvez attendre que le slot d'indexation réindexe toutes les données sans affecter vos applications de production.

Le slot de préparation n'est pas visible par le public dans l'[explorateur](https://explorer.subquery.network/) et possède une URL unique que vous seul pouvez voir. Et bien sûr, l'environnement séparé vous permet de tester votre nouveau code sans affecter la production.

## Que sont les extrinsèques ?

Si vous êtes déjà familiarisé avec les concepts de blockchain, vous pouvez considérer les extrinsèques comme comparables aux transactions. Plus formellement cependant, un extrinsèque est un élément d'information qui provient de l'extérieur de la chaîne et qui est inclus dans un bloc. Il existe trois catégories d'extrinsèques. Ce sont les inhérents, les transactions signées et les transactions non signées.

Les extrinsèques inhérents sont des éléments d'information qui ne sont pas signés et qui sont uniquement insérés dans un bloc par l'auteur du bloc.

Les extrinsèques de transaction signés sont des transactions qui contiennent une signature du compte qui a émis la transaction. Ils doivent payer des frais pour que la transaction soit incluse dans la chaîne.

Les transactions extrinsèques non signées sont des transactions qui ne contiennent pas la signature du compte qui a émis la transaction. Les transactions extrinsèques non signées doivent être utilisées avec précaution car personne ne paie de frais parce qu'elles sont signées. De ce fait, la file d'attente des transactions manque de logique économique pour éviter le spam.

Pour plus d'informations, cliquez [ici](https://substrate.dev/docs/en/knowledgebase/learn-substrate/extrinsics).

## Quel est le point de terminaison pour le réseau Kusama ?

Le point de terminaison du réseau Kusama est `wss://kusama.api.onfinality.io/public-ws`.

## Quel est le point de terminaison du réseau mainnet de Polkadot ?

Le point de terminaison du réseau Polkadot est `wss://polkadot.api.onfinality.io/public-ws`.

## Comment puis-je développer de manière itérative le schéma de mon projet ?

Un problème connu lors du développement d'un schéma de projet changeant est que lors du lancement de votre nœud Subquery pour les tests, les blocs précédemment indexés seront incompatibles avec votre nouveau schéma. Afin de développer itérativement les schémas, les blocs indexés stockés dans la base de données doivent être effacés, ceci peut être réalisé en lançant votre nœud avec l'option `--force-clean`. Par exemple :

```shell
subql-node -f . --force-clean --subquery-name=<project-name>
```

Notez qu'il est recommandé d'utiliser `--force-clean` lors de la modification du `startBlock` dans le manifeste du projet`(project.yaml`) afin de commencer la réindexation à partir du bloc configuré. Si `startBlock` est modifié sans `--force-clean` du projet, l'indexeur continuera l'indexation avec le `startBlock` précédemment configuré.