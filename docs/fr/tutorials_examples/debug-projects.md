# Comment déboguer un projet SubQuery ?

## Guide vidéo

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/6NlaO-YN2q4" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Introduction

Pour déboguer un projet SubQuery, par exemple en parcourant le code, en définissant des points d'arrêt et en inspectant les variables, vous devez utiliser un inspecteur Node.js conjointement avec les outils de développement de Chrome.

## Inspecteur Node

Exécutez la commande suivante dans un écran terminal.

```shell
node --inspect-brk <path to subql-node> -f <path to subQuery project>
```

Par exemple :
```shell
node --inspect-brk /usr/local/bin/subql-node -f ~/Code/subQuery/projects/subql-helloworld/
Débogueur écoute sur ws://127.0.0.1:9229/56156753-c07d-4bbe-af2d-2c7ff4bcc5ad
Pour de l'aide voir : https://nodejs.org/en/docs/inspector
Débogueur attaché.
```

## Chrome devtools

Ouvrez Chrome DevTools et accédez à l'onglet Sources. Notez que si vous cliquez sur l'icône verte, une nouvelle fenêtre s'ouvrira.

![node inspect](/assets/img/node_inspect.png)

Naviguez jusqu'à Filesystem et ajoutez votre dossier de projet à l'espace de travail. Ouvrez ensuite le dossier dist > mappings et sélectionnez le code que vous souhaitez déboguer. Ensuite, parcourez le code comme avec n'importe quel outil de débogage standard.

![debugging projects](/assets/img/debugging_projects.png)
