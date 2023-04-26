# Restoring Dictionary Projects

The first SubQuery projects indexed on Kepler will be [Dictionary Projects](../../../academy/tutorials_examples/dictionary.md). These projects are commonly used, and are simple to index and create, but create large datasets.

In order to speed up the onboarding of Indexers, we are providing database snapshots for most of these dictionaries

## Downloading Database Snapshots

| Network   | Deployment ID                                    | Database Size | Download URL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | SHA256                                                             |
| --------- | ------------------------------------------------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Pollkadot | `QmZGAZQ7e1oZgfuK4V29Fa5gveYK3G2zEwvUzTZKNvSBsm` | ~170GB        | [POLKADOT-S3-URL](https://kepler-dictionary-projects.s3.ap-southeast-2.amazonaws.com/polkadot/polkadot.tar?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHoaDmFwLXNvdXRoZWFzdC0yIkYwRAIgTOil5bFSqp0B3m%2FEyAuN%2FeXTzGf6bluEHXNXHOJETcoCIH59wxs5ip85Sgk%2BpULY50hKkS7ke5hePt3INWGcQO7MKokDCHMQARoMMDM3NzkwNjQ0MTc0IgwjFgfvgVBm2v7ojRYq5gKEgIh%2F6bgqc0e64gEIeZmlv8i5wRg8HqNEU3yB8jT%2B27NTOUPZIk3jtQ9RFfqfqgfPAG2uS2rcE6Apm9MWPxCuGyoLNbU0N15niurHByBdAJhb981jDmXAO3AxMf2N2hmUWF9A6lPd5AWnDO33j8Qq2J%2FTS6ZsXdFQL0avwor9E2TTnJn3Wy9Vz2C4lKPxCeTYyhjyanSDHi%2BfXQ0yshwUKYjTiGbVScRnmp8eDzU1yKDmPovyFyxgH%2BXTyUMv3JsfOeOLuv5FEGokgjO7SUnul4gZY4YNPyw71tMi0fR3yTt60l7%2FfLyHD2AYPaEBCrQBdYD7wY6%2FLVhKafJ2yHOOnNts%2Bb7PAzotsfwa%2B6iTSa%2F7wGQfy8EWqF4jcYqRF6QC18mOTOATGNwdKFRlnBqLqcbZ9vsXn4NIRbiGIjeKnPpB2EftQTxY5GHnOwQc9I6JiAn2VhGJHWw%2B6yL%2Bz%2F%2B2NXqZCYloMLLo%2FqEGOrQCRkjj5vzcK%2Bc2Qd%2B9WHO%2FjoxguiHx6wpFQ%2FoZDm6pdQpiO6GQCkN5GcD%2FKCHb7drcL8%2BwcjWSpy%2Bulm6pVPDdGVgCeL65N4gw7qf9VReMOH4vuLi8xCXxNaBer331HLzq9pjxrKhF0dUEZnYN%2BD3spgzEhTp2lWP61q0MSC6d0lVQyG28pBmaFm3gUcdHojgEpSs8ZZ1tmRu8mXzx0wFmbnKG51blAWwt7tMYxVIY2DyvCB5mW5yhK%2F2jWAsRAQo5dnhXzOgUYtxRwbNYWvur8fh5CIuUEFP8%2BNW6IuVgioMdB%2Bqc7fiX0%2FU0TdyM10S%2Fk9f%2BI6QbbuFfe1V1N0%2B6kJI8YsW8WAFyLOiIDoDOCJupfy1eXnJ3uIDcnU%2F%2FvRNz720R5MEvK37MEKQgR2su7g9b7KI%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230419T092904Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAQRTD7O7HDF2FI6U2%2F20230419%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Signature=7ed84f4b99836430dbd6f32b408b9a49c532206ecb4c784e22fc4ae4496ff564) | `f14b6cf112cdb6dbb5e054310a176da03ed052f7e2b714647ea6d36f58433c9c` |
| Kusama    | `QmXwfCF8858YY924VHgNLsxRQfBLosVbB31mygRLhgJbWn` | TBC           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                                                                    |
| Moonbeam  | `QmRwisx41SRrR8fhNTRpKetNdpP7SaNkRAVrRgcdwoEtCH` | TBC           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                                                                    |

You can download the snapshot using the following command:

```bash
curl -o dictionary.tar <Download_URL>
```

## Restoring the Database Snapshot

This assumes that you have an indexer [running locally](../../../run_publish/run.md) with admin access to a PostgresQL database (you will be using the `pg_restore` command).

First extract the dowloaded snapshot and then extract it using the following command. You will get 2 files: `.mmr` and `schema_xxxxxxx.dump`

```bash
tar -xvf dictionary.tar
```

Then move `.mmr` to `<MMR_PATH>/poi/<Deployment_CID>`. Note that `<MMR_PATH>` is the path in your `docker-compose.yml` for the indexer-coordinator container under `--mmrPath`.

:::note
Make sure your `indexer_db` and `indexer_coordinator` containers are running with healthy status
:::

Then you can use the pg_restore tool to restore the indexing data to the current db for a locally run PostgresQL instance:

```bash
PGPASSWORD="<PG_PASSWORD>" pg_restore -v -j 4 -h localhost -p 5432 -U postgres -d postgres schema_xxxxxxx.dump > restore.log 2>&1 &
```

If you are running your PostgresQL database in Docker, first copy the `schema_xxxxxxx.dump` to `.data/postgres/` and then use this command:

```bash
docker exec -it indexer_db pg_restore -v -j 2 -h localhost -p 5432 -U postgres -d postgres /var/lib/postgresql/data/schema_xxxxxxx.dump
```

:::note
We use the `-j` parameter to update the number of jobs running concurrently. Depending on your machine size, you may want to increase this number to speed up the restore process. [Read more](https://www.postgresql.org/docs/current/app-pgrestore.html)
:::

The restore process will start and take quite a long time (like 2 days), please leave it to work away in the background. Here is an example of the output log.

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
