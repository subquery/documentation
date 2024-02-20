# Migrate To Mainnet

The SubQuery Network projects are currently running on the Polygon network. The network will be migrated to the Base mainnet. This guide will help you prepare for the migration.

## How to Migrate

### Step 1 - Prepare the migration script

Download the migration script to the path containing the `docker-compose.yml` file.

```bash
cd < path containing docker-compose.yml >
curl https://raw.githubusercontent.com/subquery/network-indexer-services/main/deploy/coordinator-migration-tool.sh -o coordinator-migration-tool.sh
chmod +x coordinator-migration-tool.sh
```

### Step 2 - Run the migration script

Run the script to migrate the SubQuery Network projects to the Base mainnet.

```bash
./coordinator-migration-tool.sh
```

Follow the instructions in the script to complete the migration. See the [Migration Script Overview](#migration-script-overview) for more details.

### Step 3 - Re-add the projects

After the migration, you will need to re-add the projects through the indexer admin.

## Migration Script Overview

The migration script executes the following operations:

- Confirms the MATIC balance of the indexer's controller account is withdrawn
- Confirms the indexer is unregistered
- Checks for the presence of the `docker-compose.yml` file
- Creates a backup of the `docker-compose.yml` file
- Replaces the old `ws-endpoint` with the new coordinator container key `network-endpoint` in the `docker-compose.yml` file
- Sets value of the coordinator and proxy container key `network` to `mainnet` in the `docker-compose.yml` file
- Updates the `network-endpoint` of the coordinator and proxy container to `https://mainnet.base.org` in the `docker-compose.yml` file, or to a user-provided custom value
- Changes the coordinator image version to a new version (to be provided) in the `docker-compose.yml` file, or to a user-provided custom value
- Updates the proxy image version to a new version (to be provided) in the `docker-compose.yml` file, or to a user-provided custom value
- Sets value of the coordinator container key `postgres-schema` to `coordinator_db` in the `docker-compose.yml` file, or to a user-provided custom value
