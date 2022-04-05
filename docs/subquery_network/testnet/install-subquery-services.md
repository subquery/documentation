# Install SubQuery Indexer Services
## Introduction
This tutorial shows how to run SubQuery Indexer Services in a single machine via Docker & Docker Compose.

These services includes
* subquery-proxy
* subquery-coordinator
* postgresql
## Download the Docker Compose File for Indexer Services
```
mkdir subquery-indexer & cd subquery-indexer
curl https://raw.githubusercontent.com/subquery/indexer-services/main/docker-compose.yml -o docker-compose.yml
```

## Start All Services
```shell
cd subquery-indexer
sudo docker-compose up -d
```
