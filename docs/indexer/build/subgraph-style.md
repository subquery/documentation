# Comparison with Subgraph Query Style.
We support using `Subgraph` query style `GraphQL` queries, which are a bit different from `subquery` style. 
Below is an introduction to how to install it and the differences between it and subql-query.

## Install subql/query-subgraph
Then to run a SubQuery node, run the following command:

```shell
npm install -g @subql/query-subgraph
```

The `-g` flag means to install it globally which means on OSX, the location will be `/usr/local/lib/node_modules`.

Once installed, you can check the version by running:

```shell
> subql-query-subgraph --version
0.1.0
```



## The query and response are different.

If you use the `subquery` style of querying, your request will look like this.
```graphql
query Accounts {
    accounts(first: 1) {
        nodes {
            id
            publicKey
            firstTransferBlock
            lastTransferBlock
        }
        totalCount
    }
}

## response
{
    "data": {
        "accounts": {
            "nodes": [
                {
                    "id": "12idzncwtgfd1nyayku6av5nmmm9i6uj3gmqemww1uf6gtnt",
                    "publicKey": "75,253,207,177,222,234,104,53,181,245,154,126,141,241,106,172,178,139,201,199,36,28,222,64,157,201,204,153,101,163,82,138",
                    "firstTransferBlock": 243601,
                    "lastTransferBlock": 243601
                }
            ],
            "totalCount": 647
        }
    }
}
```

This is the query style of `subgraph`. It has one less level of `nodes` field nesting and does not support querying the `totalCount` field.
```graphql
query Accounts {
    accounts(first: 1) {
        id
        publicKey
        firstTransferBlock
        lastTransferBlock
    }
}

### response 
{
    "data": {
        "accounts": [
            {
                "id": "12idzncwtgfd1nyayku6av5nmmm9i6uj3gmqemww1uf6gtnt",
                "publicKey": "75,253,207,177,222,234,104,53,181,245,154,126,141,241,106,172,178,139,201,199,36,28,222,64,157,201,204,153,101,163,82,138",
                "firstTransferBlock": 243601,
                "lastTransferBlock": 243601
            }
        ]
    }
}
```

## List query with conditions
subquery uses the `filter` field as the filtering field, while subgraph uses the `where` field as the filtering field. Here is a comparison:

| Query condition               | subgraph                                 | subquery                          |
|-------------------------------|:------------------------------------------:|:-----------------------------------:|
| isNull                         | - | `field: { isNull: true }`         |
| equalTo                        | `field: value`                           | `field: { equalTo: value }`       |
| notEqualTo                     | `field_not: value`                       | `field: { notEqualTo: value }`    |
| distinctFrom                   | - | `field: { distinctFrom: value }`  |
| notDistinctFrom                | - | `field: { notDistinctFrom: value }` |
| in                             | `field_in: [value1, value2]`            | `field: { in: [value1, value2] }` |
| notIn                          | `field_not_in: [value1, value2]`        | `field: { notIn: [value1, value2] }` |
| lessThan                       | `field_lt: value`                       | `field: { lessThan: value }`      |
| lessThanOrEqualTo              | `field_lte: value`                      | `field: { lessThanOrEqualTo: value }` |
| greaterThan                    | `field_gt: value`                       | `field: { greaterThan: value }`   |
| greaterThanOrEqualTo           | `field_gte: value`                      | `field: { greaterThanOrEqualTo: value }` |
| includes                       | `field_contains: value`                 | `field: { includes: value }`      |
| notIncludes                    | `field_not_contains: value`             | `field: { notIncludes: value }`   |
| includesInsensitive            | `field_contains_nocase: value`          | `field: { includesInsensitive: value }` |
| notIncludesInsensitive         | `field_not_contains_nocase: value`      | `field: { notIncludesInsensitive: value }` |
| startsWith                     | `field_starts_with: value`              | `field: { startsWith: value }`    |
| notStartsWith                  | `field_not_starts_with: value`          | `field: { notStartsWith: value }` |
| startsWithInsensitive          | `field_starts_with_nocase: value`       | `field: { startsWithInsensitive: value }` |
| notStartsWithInsensitive       | `field_not_starts_with_nocase: value`   | `field: { notStartsWithInsensitive: value }` |
| endsWith                       | `field_ends_with: value`                | `field: { endsWith: value }`      |
| notEndsWith                    | `field_not_ends_with: value`            | `field: { notEndsWith: value }`   |
| endsWithInsensitive            | `field_ends_with_nocase: value`         | `field: { endsWithInsensitive: value }` |
| notEndsWithInsensitive         | `field_not_ends_with_nocase: value`     | `field: { notEndsWithInsensitive: value }` |
| like                           | - | `field: { like: value }`          |
| notLike                        | - | `field: { notLike: value }`       |
| likeInsensitive                | - | `field: { likeInsensitive: value }` |
| notLikeInsensitive             | - | `field: { notLikeInsensitive: value }` |
| equalToInsensitive             | - | `field: { equalToInsensitive: value }` |
| notEqualToInsensitive          | - | `field: { notEqualToInsensitive: value }` |
| distinctFromInsensitive        | - | `field: { distinctFromInsensitive: value }` |
| notDistinctFromInsensitive     | - | `field: { notDistinctFromInsensitive: value }` |
| inInsensitive                  | - | `field: { inInsensitive: [value1, value2] }` |
| notInInsensitive               | - | `field: { notInInsensitive: [value1, value2] }` |
| lessThanInsensitive            | - | `field: { lessThanInsensitive: value }` |
| lessThanOrEqualToInsensitive   | - | `field: { lessThanOrEqualToInsensitive: value }` |
| greaterThanInsensitive         | - | `field: { greaterThanInsensitive: value }` |
| greaterThanOrEqualToInsensitive| - | `field: { greaterThanOrEqualToInsensitive: value }` |


Example:
```graphql
# subquery style
query Accounts {
    accounts(
        first: 1
        filter: {
            id: {
                in: ["12idzncwtgfd1nyayku6av5nmmm9i6uj3gmqemww1uf6gtnt"]
            }
        }
    ) {
        nodes {
            id
            firstTransferBlock
            lastTransferBlock
        }
        totalCount
    }
}
```

The subgraph uses where as the query field, and the filter condition looks like this: `<field>_<operators>`.
```graphql
# subgraph style
query Accounts {
    accounts(
        first: 1
        where: {
            id_in:  ["12idzncwtgfd1nyayku6av5nmmm9i6uj3gmqemww1uf6gtnt"]
        }
    ) {
        id
        firstTransferBlock
        lastTransferBlock
    }
}
```

## List sort
The `subquery` only requires the `orderBy` field, while the `subgraph` requires two fields: `orderBy` and `orderDirection`.

Example:
```graphql
# subquery style
query Accounts {
    accounts(
        first: 1
        orderBy: ID_ASC
    ) {
        nodes {
            id
            firstTransferBlock
            lastTransferBlock
        }
        totalCount
    }
}
```

```graphql
# subgraph style
query Accounts {
    accounts(
        first: 1
        orderBy: id
        orderDirection: asc
    ) {
        id
        firstTransferBlock
        lastTransferBlock
    }
}
```

## skip item
The `subquery` passes the `offset` field, while the `subgraph` uses the `skip` field.

Example:
```graphql
# subquery style
query Accounts {
    accounts(
        first: 1
        offset: 10
    ) {
        nodes {
            id
            firstTransferBlock
            lastTransferBlock
        }
        totalCount
    }
}
```

```graphql
# subgraph style
query Accounts {
    accounts(
        first: 1
        skip: 10
    ) {
        id
        firstTransferBlock
        lastTransferBlock
    }
}
```

## Other unsupported features
- JSON field filtering is not supported.
- Cursor-based queries are not supported.