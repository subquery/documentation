# Migration guide for Near.

## Goals

Migrate [thegraph example](https://github.com/graphprotocol/graph-tooling/tree/main/examples/near-blocks) to subquery



**Original code before porting ([link](https://github.com/web3cdnservices/subquery-near-migration-from-thegraph-example/tree/4a10de0b048f7f68fb4f84b6de8b79ac40a85c03)**

**Modified code for subquery indexers ([Link](https://github.com/web3cdnservices/subquery-near-migration-from-thegraph-example)**

____



## 1. Update docker-compose.yml

Open `docker-compose.yml` and fully override with content below.  This container will help to debug. No changes required.

```
version: "3"

services:
  postgres:
    build:
      context: .
      dockerfile: ./docker/pg-Dockerfile
    ports:
      - 5432:5432
    volumes:
      - .data/postgres:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: postgres
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  subquery-node:
    image: onfinality/subql-node-near:latest
    depends_on:
      "postgres":
        condition: service_healthy
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
      - sh
      - -f=/app
      - --db-schema=app
      - --disable-historical=false
      - --batch-size=10
    healthcheck:
      test: ["CMD", "curl", "-f", "http://subquery-node:3000/ready"]
      interval: 3s
      timeout: 5s
      retries: 10

  graphql-engine:
    image: onfinality/subql-query:latest
    ports:
      - 3000:3000
    depends_on:
      "postgres":
        condition: service_healthy
      "subquery-node":
        condition: service_healthy
    restart: always
    environment:
      DB_USER: postgres
     DB_PASS: postgres
      DB_DATABASE: postgres
      DB_HOST: postgres
      DB_PORT: 5432
    command:
      - --name=app
      - --playground
      - --indexer=http://subquery-node:3000
```

## 2. Add packages as compose requirements.

**create & open file (load-extensions )**
```
mkdir -p docker && nano docker/load-extensions.sh
```
And paste content:

```
#!/bin/sh

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<EOF
CREATE EXTENSION IF NOT EXISTS btree_gist;
EOF
```

____

**create & open file (Pg-Dockerfile)**

`mkdir -p docker && nano docker/pg-Dockerfile`

And paste content:

```
FROM postgres:12-alpine

# Variables needed at runtime to configure postgres and run the initdb scripts
ENV POSTGRES_DB 'postgres'
ENV POSTGRES_USER 'postgres'
ENV POSTGRES_PASSWORD 'postgres'

# Copy in the load-extensions script
COPY docker/load-extensions.sh /docker-entrypoint-initdb.d/

# Convert line endings to LF
RUN sed -i 's/\r$//' /docker-entrypoint-initdb.d/load-extensions.sh && chmod +x /docker-entrypoint-initdb.d/load-extensions.sh
```

## 3. Override package.json

Fully clean and paste content below, but change repo name and url. (Packages version OPTIONAL)

```
{
  "name": "example-near-blocks-porting-to-subquery",
  "version": "0.1.0",
  "repository": "https://github.com/web3cdnservices/subquery-near-migration-from-thegraph-example",
  "files": [
    "dist",
    "schema.graphql",
    "project.yaml"
  ],
  "author": "Web3cdn | SubQuery ",
  "license": "MIT",
  "private": true,
  "scripts": {
    "build": "subql build",
    "codegen": "subql codegen",
    "start:docker": "docker-compose pull && docker-compose up --remove-orphans",
    "dev": "subql codegen && subql build &&  docker-compose up --remove-orphans",
    "prepack": "rm -rf dist && npm run build",
    "test": "jest"
  },
  "dependencies": {
    "@subql/common": "latest",
    "@subql/types-near": "latest",
    "assert": "^2.0.0"
  },
  "devDependencies": {
    "@subql/cli": "latest",
    "typescript": "4.5.5"
  }
}
```
____

## 4. Configure Subgraph

  Rename  **subgraph.yaml** TO **project.yaml**

Bring the content into the structure described below.
Note that you can use filter types:
  - CreateAccount
  - DeployContract
  - FunctionCall
  - Transfer
  - Stake
  - AddKey
  - DeleteKey
  - DeleteAccount
  - Delegate;


```
specVersion: 1.0.0
description: "This project can be use as a starting point for developing your new NEAR SubQuery project"
repository: "https://github.com/subquery/near-subql-starter"
schema:
  file: ./schema.graphql

name: near-migration-example
version: 0.0.1
runner:
  node:
    name: "@subql/node-near"
    version: "*"
  query:
    name: "@subql/query"
    version: "*"


network:
  chainId: mainnet
  # This endpoint must be a public non-pruned archive node
  # We recommend providing more than one endpoint for improved reliability, performance, and uptime
  # Public nodes may be rate limited, which can affect indexing speed
  # When developing your project we suggest getting a private API key from a commercial provider
  endpoint: ["https://archival-rpc.mainnet.near.org"]
  # Optionally provide the HTTP endpoint of a full chain dictionary to speed up processing
  dictionary: "https://api.subquery.network/sq/subquery/near-dictionary"
  bypassBlocks: [81003306] # This is a missing block from the NEAR mainnet chain that we are skipping

dataSources:
  - kind: near/Runtime
    startBlock: 98360855
    mapping:
      file: "./dist/index.js"
      handlers:
        - handler: handleBlock
          kind: near/BlockHandler
          filter:
            modulo: 10
            type: Transfer
```

  ## 5. Override ts.config with content below

```
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "esModuleInterop": true,
    "declaration": true,
    "importHelpers": true,
    "resolveJsonModule": true,
    "module": "commonjs",
    "outDir": "dist",
    "rootDir": "src",
    "target": "es2017",
    "strict": true
  },
  "include": ["src/**/*", "node_modules/@subql/types/dist/global.d.ts"]
}
```

___ 

## 6. Edit mapping file and change requirements.

Open src/mapping.ts

- Remove all graphql entries.
- Add new requirements frim subquery libs

```
  import {
  NearBlock,
} from "@subql/types-near";

```

All operation types you can find [Here](https://github.com/subquery/subql-near/blob/edee30b6dcc327ca86101c5fcd195607a1d29e57/packages/types/src/interfaces.ts)

____ 

## 7. Run project & test project

   **Generate types & mpdels**
   `yarn codefen`

   **Execute full test**
   `yarn dev`
