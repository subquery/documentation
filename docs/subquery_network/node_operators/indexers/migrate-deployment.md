# Migrate an Existing Deployment to New Version

## Background

When an author of a project publishes a new version of a SubQuery project, sometimes you may want to migrate your local deployment to the new version to avoid time spend reindexing data from scratch.

:::warning

Not all SubQuery project deployments support migration, and for those that do, they may only support migrations from specific deployment IDs or block heights.

If you tried to migrate from a deployment that does not support migrations, the project may fail to start, or you will have the risk of undermining the POI (Proof of Index) of the deployment.

**As a result, we strongly suggest that you backup the project deployment data before you attempt to migrate it to a new version.**
:::

## Steps

1. Check the deployment instruction that you want to migrate to. Usually the author will provide the details about whether the deployment supports migration and from which deployment it can be migrated.
2. Stop the current deployment from Indexer Admin UI
3. Rename schema in the database to the new schema name. The schema name is the first 15 characters of the deployment id, lower case. e.g `schema_<first 15>`

```
# if you runs postgres in docker-compose
sudo docker exec -it indexer_db psql -h localhost -p 5432 -U postgres -d postgres
ALTER SCHEMA <old> RENAME TO <new>;
```

4. Add new deployment and start from Indexer Admin UI.
5. Move allocation to the new deployment.
6. Delete old project
