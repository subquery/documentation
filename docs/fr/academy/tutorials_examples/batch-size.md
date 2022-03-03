# Comment modifier la taille du lot de récupération de la blockchain ?

## Guide vidéo

<figure class="video_container">
  <iframe src="https://www.youtube.com/embed/LO_Gea_IN_s" frameborder="0" allowfullscreen="true"></iframe>
</figure>

## Introduction

La taille de lot par défaut est de 100, mais elle peut être modifiée en utilisant la commande supplémentaire `--batch-size=xx`.

Vous devez ajouter cette commande à la ligne de commande en tant qu'indicateur supplémentaire ou, si vous utilisez Docker, modifier le fichier docker-compose.yml :

```shell
subquery-node:
    image: onfinality/subql-node:latest
    depends_on:
      - "postgres"
    restart: always
    environment:
      DB_USER: postgres
      DB_PASS: postgres
      DB_DATABASE: postgres
      DB_HOST: postgres
      DB_PORT: 5432
    volumes:
      - ./:/app
    command:
      - -f=/app
      - --local
      - --batch-size=50

```

Cet exemple définit la taille du lot à 50.

## Pourquoi changer la taille du lot ?

L'utilisation d'une taille de lot plus petite peut réduire l'utilisation de la mémoire et ne pas laisser les utilisateurs en suspens pour les grandes requêtes. En d'autres termes, votre application peut être plus réactive. 