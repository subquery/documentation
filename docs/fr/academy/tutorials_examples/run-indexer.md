# Comment exécuter un nœud d'indexation ?

## Guide vidéo

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/QfNsR12ItnA" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Introduction

Exécuter un nœud d'indexation est une autre option en dehors de l'utilisation de Docker ou d'avoir un projet hébergé pour vous sur [SubQuery Projects](https://project.subquery.network/). Cela demande plus de temps et d'efforts, mais vous permettra de mieux comprendre comment SubQuery fonctionne sous les couvertures.

## Postgres

L'exécution d'un nœud d'indexation sur votre infrastructure nécessitera la configuration d'une base de données Postgres. Vous pouvez installer Postgres à partir d'[ici](https://www.postgresql.org/download/) et vous assurer que la version est égal ou supérieur à 12.

## Installez subql/node

Ensuite, pour exécuter un nœud SubQuery, exécutez la commande suivante :

```shell
npm install -g @subql/node
```

Le drapeau -g signifie l'installer globalement, ce qui signifie que sous OSX, l'emplacement sera /usr/local/lib/node_modules.

Une fois installé, vous pouvez vérifier la version en exécutant :

```shell
> subql-node --version
0.19.1
```

## Configuration de la base de données

Ensuite, vous devez définir les variables environnementales suivantes :

```shell
export DB_USER=postgres
export DB_PASS=postgres
export DB_DATABASE=postgres
export DB_HOST=localhost
export DB_PORT=5432
```

Bien sûr, si vous avez des valeurs différentes pour les clés ci-dessus, veuillez les ajuster en conséquence. Notez que la commande `env` affichera les variables d'environnement actuelles et que ce processus ne définit ces valeurs que temporairement. C'est-à-dire qu'elles ne sont valables que pour la durée de la session du terminal. Pour les définir de manière permanente, stockez-les plutôt dans votre ~/bash_profile.

## Indexation d'un projet

Pour commencer à indexer un projet, naviguez dans le dossier de votre projet et exécutez la commande suivante :

```shell
subql-node -f .
```

Si vous n'avez pas de projet sous la main, `clonez git https://github.com/subquery/subql-helloworld`. Vous devriez voir le nœud d'indexation se mettre en marche et commencer à indexer les blocs.

## Inspection de Postgres

Si vous naviguez vers Postgres, vous devriez voir deux tables créées. `public.subqueries` et `subquery_1.starter_entities`.

`public.subqueries` ne contient qu'une seule ligne que l'indexeur vérifie au démarrage pour "comprendre l'état actuel" afin de savoir où continuer. La table `starter_entities` contient les index. Pour afficher les données, exécutez `select (*) from subquery_1.starter_entities`.
