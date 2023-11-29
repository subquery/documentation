# Install Indexing Service With Separated Database

If you want to use a separated database for the Indexing service, you can follow this guide to set up the database and install the Indexing service.

## Initial Preparation

- [Docker](https://docs.docker.com/get-docker/) - It contains all the required images to run the entire Web3 application.

## Setup Database

To setup the database, you can choose one of the following options:

### Setup PostgreSQL From An Existing Database Service

- Make sure you have a PostgreSQL database service running.
- Create a database for the Indexing service.
- Create a user for the Indexing service.
- Grant the user access to the database, and permission to create databases.
- Get the credentials of the database, including the host, port, username, password, and database name.
- Make sure the database is accessible from the machine running the Indexing service.

### Datebase Safety

Install and setup your firewall to only allow connections from the IP address of the machine running the Indexing service.

```bash
sudo ufw allow from <IP address of the machine running the Indexing service> to any port 5432
```

## Install Indexer Service

### Step 1 - Download the Indexer Service file

- Donwloand indexing services `docker-compose.yml` file to you machine, which consists of all the images to build and start the various applications.

```bash
mkdir subquery-indexer && cd subquery-indexer
curl https://raw.githubusercontent.com/subquery/network-indexer-services/main/deploy/docker-compose.yml -o docker-compose.yml

# extra steps to use local ipfs node
mkdir ipfs
curl https://raw.githubusercontent.com/subquery/network-indexer-services/main/deploy/ipfs/ipfs.sh -o ipfs/ipfs.sh
chmod +x ipfs/ipfs.sh
```

### Step 2 - Update the Indexer Service file with Separated Database Information

- Update the `docker-compose.yml` file with the database information.

```bash
# 1. remove or commment the postgres section
  # postgres:
  #   image: postgres:16-alpine
  #   container_name: indexer_db
  #   ...

# 2. update the following fields in coordinator section
- --postgres-host=<replace with your database host>
- --postgres-port=<replace with your database port>
- --postgres-username=<replace with your database username>
- --postgres-password=<replace with your database password>
- --postgres-database=<replace with your database name>
```

### Step 3 - Start the Indexing Service

Run the following command to start the Indexing service:

```bash
docker compose up -d
```

:::tip Tip
For extra information about starting the Indexing service, please visit from [this section](./install-indexer-locally.md#step-2-start-the-indexing-service).
:::
