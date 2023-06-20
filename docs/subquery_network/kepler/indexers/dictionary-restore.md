# Restoring Dictionary Projects

Below are the [Dictionary Projects](../../../academy/tutorials_examples/dictionary.md) Supported on Kepler. These projects are commonly used, are simple to index and create, but create large datasets.

In order to speed up the onboarding of Indexers, we are providing database snapshots for most of these dictionaries

## Downloading Database Snapshots

| Network   | Deployment ID                                    | Database Size | S3 Bucket URL                                                                                      | BT Magnet Link | SHA256                                                             |
| --------- | ------------------------------------------------ | ------------- | -------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------ |
| Pollkadot | QmZGAZQ7e1oZgfuK4V29Fa5gveYK3G2zEwvUzTZKNvSBsm | ~220GB        | [S3 URL](https://kepler-dictionary-projects.s3.ap-southeast-2.amazonaws.com/polkadot/polkadot.tar) | TBC            | c1a1f67e2a205dc9fdd90f738686f3ee57052fcc7bc383a054574ab81e17584f |
| Kusama    | QmXwfCF8858YY924VHgNLsxRQfBLosVbB31mygRLhgJbWn | ~260GB        | [S3 URL](https://kepler-dictionary-projects.s3.ap-southeast-2.amazonaws.com/kusama/kusama.tar)     | TBC            | 65f6fc3dd0410b296f651369690fd866070dbba8781a61454fc00cc11676452c |
| Nodle     | QmQtmsHoJEYUcxKE4tBqr9Z8kudcgkczQPfhkAxVExQX5y | -             | [S3 URL](https://kepler-dictionary-projects.s3.ap-southeast-2.amazonaws.com/nodle/nodle.tar)       | TBC            | 71b52ef798f96c86214213e26a1960477d11f0f80916914159fd2feec2ba17fe |

You can download the snapshot either from the s3 bucket URL or the BitTorrent magnet link:

### Download Snapshot

Downloading via Bittorrent will be faster, you can use your favourite bittorent client or install Aria2

```bash
sudo apt update
sudo apt install aria2

aria2c <Magnet_Link>
```

To download from an S3 bucket

```bash
curl -o dictionary.tar <Download_URL>
```

## Restoring the Database Snapshot

This assumes that you have an indexer [running locally](../../../run_publish/run.md) with admin access to a PostgresQL database (you will be using the `pg_restore` command).

1. First extract the dowloaded snapshot and then extract it using the following command:

```bash
tar -xvf dictionary.tar
```

You will now have a pg dump file called: `schema_xxxxxxx.dump` 

2. Copy the `schema_xxxxxxx.dump` to `.data/postgres/` and then use this command:
 
```bash
docker exec -it indexer_db pg_restore -v -j 2 -h localhost -p 5432 -U postgres -d postgres /var/lib/postgresql/data/schema_xxxxxxx.dump > restore.log 2>&1 &
```

:::note
- please Make sure your `indexer_db` container is running with healthy status before starting restore process

- We use the `-j` parameter to update the number of jobs running concurrently. Depending on your machine size, you may want to increase this number to speed up the restore process. [Read more](https://www.postgresql.org/docs/current/app-pgrestore.html)
:::

The restore process will start and take quite a long time (like 2 days), please make sure you run this cmd in the background (use tools like tmux/screen/nohup). Here is an example of the output log.

```
pg_restore: creating SCHEMA "schema_qmzj9whrhrmvn2h"
pg_restore: creating FUNCTION "schema_qmzj9whrhrmvn2h.schema_notification()"
pg_restore: creating TABLE "schema_qmzj9whrhrmvn2h._metadata"
pg_restore: creating TABLE "schema_qmzj9whrhrmvn2h._poi"
pg_restore: creating TABLE "schema_qmzj9whrhrmvn2h.events"
pg_restore: creating TABLE "schema_qmzj9whrhrmvn2h.extrinsics"
pg_restore: creating TABLE "schema_qmzj9whrhrmvn2h.spec_versions"
pg_restore: processing data for table "schema_qmzj9whrhrmvn2h._metadata"
pg_restore: processing data for table "schema_qmzj9whrhrmvn2h._poi"
pg_restore: processing data for table "schema_qmzj9whrhrmvn2h.events"
pg_restore: processing data for table "schema_qmzj9whrhrmvn2h.extrinsics"
pg_restore: processing data for table "schema_qmzj9whrhrmvn2h.spec_versions"
pg_restore: creating CONSTRAINT "schema_qmzj9whrhrmvn2h._metadata _metadata_pkey"
pg_restore: creating CONSTRAINT "schema_qmzj9whrhrmvn2h._poi _poi_chainBlockHash_key"
pg_restore: creating CONSTRAINT "schema_qmzj9whrhrmvn2h._poi _poi_hash_key"
pg_restore: creating CONSTRAINT "schema_qmzj9whrhrmvn2h._poi _poi_mmrRoot_key"
pg_restore: creating CONSTRAINT "schema_qmzj9whrhrmvn2h._poi _poi_parentHash_key"
pg_restore: creating CONSTRAINT "schema_qmzj9whrhrmvn2h._poi _poi_pkey"
pg_restore: creating CONSTRAINT "schema_qmzj9whrhrmvn2h.events events_pkey"
pg_restore: creating CONSTRAINT "schema_qmzj9whrhrmvn2h.extrinsics extrinsics_pkey"
pg_restore: creating CONSTRAINT "schema_qmzj9whrhrmvn2h.spec_versions spec_versions_pkey"
pg_restore: creating INDEX "schema_qmzj9whrhrmvn2h.events_block_height__block_range"
pg_restore: creating INDEX "schema_qmzj9whrhrmvn2h.events_event__block_range"
pg_restore: creating INDEX "schema_qmzj9whrhrmvn2h.events_module__block_range"
pg_restore: creating INDEX "schema_qmzj9whrhrmvn2h.extrinsics_block_height__block_range"
pg_restore: creating INDEX "schema_qmzj9whrhrmvn2h.extrinsics_call__block_range"
pg_restore: creating INDEX "schema_qmzj9whrhrmvn2h.extrinsics_module__block_range"
pg_restore: creating INDEX "schema_qmzj9whrhrmvn2h.extrinsics_tx_hash__block_range"
pg_restore: creating INDEX "schema_qmzj9whrhrmvn2h.poi_hash"
pg_restore: creating TRIGGER "schema_qmzj9whrhrmvn2h._metadata 0xc1aaf8b4176d0f02"
```

After the data restored, you can start adding the specific project to you service inside admin app, and start indexing the project, the indexing will start basing on the restored data and continue indexing the project.

# Other Supported Projects

This is a list of smaller projects supported on Kepler. These take less time to setup, especially if you make use of the dictionary provided.

| Network                | Project Name           | Deployment ID                                    | Database Size | Dictionary Endpoint                                                                              |
| ---------------------- | ---------------------- | ------------------------------------------------ | ------------- | ----------------------------------------------------------------------------------------------- |
| Polygon                | Kepler Exchange Project| QmV6sbiPyTDUjcQNJs2eGcAQp2SMXL2BU6qdv5aKrRr7Hg | -             | [Subquery URL](https://gx.api.subquery.network/sq/subquery/polygon-dictionary)                    |
