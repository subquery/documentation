# Restoring Dictionary Projects

Below are the [Dictionary Projects](../../academy/tutorials_examples/dictionary.md) supported on Kepler. These projects are commonly used, are simple to index and create, but create large datasets.

In order to speed up the onboarding of Indexers, we are providing database snapshots for most of these dictionaries

## Downloading Database Snapshots

| Network   | Deployment ID                                    | Database Size | S3 Bucket URL                                                                                      | SHA256                                                             |
| --------- | ------------------------------------------------ | ------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Polkadot  | `QmZGAZQ7e1oZgfuK4V29Fa5gveYK3G2zEwvUzTZKNvSBsm` | ~220GB        | [S3 URL](https://kepler-dictionary-projects-prod.s3.amazonaws.com/polkadot/polkadot.tar)           | `c1a1f67e2a205dc9fdd90f738686f3ee57052fcc7bc383a054574ab81e17584f` |
| Kusama    | `QmXwfCF8858YY924VHgNLsxRQfBLosVbB31mygRLhgJbWn` | ~260GB        | [S3 URL](https://kepler-dictionary-projects-prod.s3.amazonaws.com/kusama/kusama.tar)               | `65f6fc3dd0410b296f651369690fd866070dbba8781a61454fc00cc11676452c` |
| Nodle     | `QmQtmsHoJEYUcxKE4tBqr9Z8kudcgkczQPfhkAxVExQX5y` | ~15GB         | [S3 URL](https://kepler-dictionary-projects-prod.s3.amazonaws.com/nodle/nodle.tar)                 | `71b52ef798f96c86214213e26a1960477d11f0f80916914159fd2feec2ba17fe` |
| Moonbeam  | `QmeeqBHdVu7iYnhVE9ZiYEKTWe4jXVUD5pVoGXT6LbCP2t` | ~123GB        | [S3 URL](https://kepler-dictionary-projects-prod.s3.us-east-1.amazonaws.com/moonbeam/moonbeam.tar) | `e90b0f7aa31dd720fc6dff4fc9d09a5b9dbb2b52b38a6e082208593c3b835923` |
| Moonriver | `QmXCr6uZFdY1YcGTa4u6ZieQPXK4VHE1Pjy7CBr7ubFwKR` | ~130GB        | [S3 URL](https://kepler-dictionary-projects-prod.s3.amazonaws.com/moonriver/moonriver.tar)         | `db22b7565d8fea385a9e69636eb805079bf6708e898296f27673bc2b4d7a476d` |
| Acala     | `Qmarrhgrpqw5VK71rMtb4GARpPvq8ajMjAqnjnWZFLV61N` | ~10G          | [S3 URL](https://kepler-dictionary-projects-prod.s3.amazonaws.com/acala/acala.tar)                 | `4f0d8105f45ca856c57fa5f87d102e398e1e99403612c077750cb07bc9839c0d` |
| Karura    | `QmWumrabg4k6t4EUMhQg19xWwcxGq1hWbcmfmRYiy2Bod5` | ~10G          | [S3 URL](https://kepler-dictionary-projects-prod.s3.amazonaws.com/karura/karura.tar)               | `046674efb30cdc7ab61b1e834201ac125548e0fafb5f6b69e321a9ddf7b06ae9` |
| Arbitrum  | `QmPKMkqTe7UMRPZWxuD8dFgufjKzWQEeW84Qo1x1X8VVLR` | ~240G         | [S3 URL](https://kepler-dictionary-projects-prod.s3.amazonaws.com/arbitrum/arbitrum.tar)           | `466bd2af217941c4d69cf7bbb00e258acbf6cc2a551f8d3e19fce22b8db8db2b` |
| Optimism  | `QmPuHdLxTQHEAitgLe9Sg1Jnr1WwJASDRSL5RUzBe3NywV` | ~250G         | [S3 URL](https://kepler-dictionary-projects-prod.s3.amazonaws.com/optimism/optimism.tar)           | `d5bc1ae0739214df6d2effff837e2bdcdc342eb56ca4609aab739787f6d6027a` |
| Khala     | `QmYCAns2cunZKJFU85KNK8CvL2ATAmCFVZRdBf963GqWYs` | ~78G          | [S3 URL](https://kepler-dictionary-projects-prod.s3.amazonaws.com/khala/khala.tar)                 | `1b18b40345b7473fb4d8219f1da60381126ec8bbbe064158d2ed5b1b3ad532cd` |
| Westend   | `Qma6BeSQGHrhP5aydmkQcJCR25TEwuNMogS5boovBBwoeW` | ~35G          | [S3 URL](https://kepler-dictionary-projects-prod.s3.amazonaws.com/westend/westend.tar)             | `72c94be8187a1298a81a7039900566a80447996899b047f6b4fe3f3066a89bef` |
| Astar     | `QmUmnKPhcE6JwGMYvY3Yitb5j8qxbQBMxgpkHpVQuXqxDH` | ~65G          | [S3 URL](https://kepler-dictionary-projects-prod.s3.amazonaws.com/astar/astar.tar)                 | `db2c8be67d18e7401290d67b3d7f457dc1881ef0505eb22807487d03b5031e81` |

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

1. First extract the downloaded snapshot and then extract it using the following command:

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

After the data restored, you can start adding the specific project to your service inside admin app, and start indexing the project, the indexing will start basing on the restored data and continue indexing the project.
