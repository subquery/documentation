# Install Indexing Service With Separated Database

If you want to use a separated database for the Indexing service, you can follow this guide to set up the database and install the Indexing service.

## Initial Preparation

- [Docker](https://docs.docker.com/get-docker/) - It contains all the required images to run the entire Web3 application.

## Setup Database

### Choice 1: Setup PostgreSQL From An External Service

To set up PostgreSQL from an external service, you need to follow these steps:

1. **Create a PostgreSQL Database on the External Service**: Sign up and create a new PostgreSQL database on your chosen external service. Some popular options include Amazon RDS, Google Cloud SQL, and Heroku Postgres.

2. **Configure Database Settings**: Configure the database settings as per your requirements. This usually includes setting the username, password, database name, and other connection parameters.

3. **Get the Connection Credentials**: Get the connection credentials for your database. This usually includes the database host, port, username, password, and database name.

### Choice 2: Install PostgreSQL With Docker Compose

#### Database Setup

- Create a `docker-compose.yml` file with the following content:

```bash
version: '3'

services:
  postgres:
    image: postgres:16-alpine
    container_name: indexer_db
    restart: always
    ports:
      - 5432:5432
    volumes:
      - .data/postgres:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: <replace with you own password>
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U postgres']
      interval: 5s
      timeout: 5s
      retries: 5
```

- Run the following command to start the PostgreSQL service:

```bash
docker compose up -d
```

#### Datebase Safety

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
