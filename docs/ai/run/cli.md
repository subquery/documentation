# CLI Reference

```
Run a SubQuery AI app

Commands:
  subql-ai            Run a SubQuery AI app                            [default]
  subql-ai info       Get information on a project
  subql-ai embed-web  Creates a Lance db table with emdeddings from a Web source
  subql-ai embed-mdx  Creates a Lance db table with embeddings from MDX files
  subql-ai repl       Creates a CLI chat with a running app
  subql-ai publish    Publishes a project to IPFS so it can be easily
                      distributed
  subql-ai init       Create a new project skeleton

Options:
      --version          Show version number                           [boolean]
      --help             Show help                                     [boolean]
  -p, --project          A path to a project file            [string] [required]
      --ipfsEndpoint     An endpoint to an IPFS gateway
          [string] [default: "https://unauthipfs.subquery.network/ipfs/api/v0/"]
      --ipfsAccessToken  A bearer authentication token to be used with the ipfs
                         endpoint                                       [string]
      --cacheDir         The location to cache data from ipfs. Default is a temp
                         directory                                      [string]
      --debug            Enable debug logging         [boolean] [default: false]
      --logFmt           Set the logger format
                        [string] [choices: "json", "pretty"] [default: "pretty"]
  -h, --host             The LLM RPC host. If the project model uses an OpenAI
                         model then the default value is not used.
                                    [string] [default: "http://localhost:11434"]
      --openAiApiKey     If the project models use OpenAI models, then this api
                         key will be parsed on to the OpenAI client     [string]
  -i, --interface        The interface to interact with the app
                             [string] [choices: "cli", "http"] [default: "http"]
      --port             The port the http service runs on
                                                        [number] [default: 7827]
      --forceReload      If the project is from IPFS force reload it and don't
                         use the cached version       [boolean] [default: false]
      --toolTimeout      Set a limit for how long a tool can take to run, unit
                         is MS                         [number] [default: 10000]
      --streamKeepAlive  The interval in MS to send empty data in stream
                         responses to keep the connection alive. Only wokrs with
                         http interface. Use 0 to disable.
                                                        [number] [default: 5000]
```

These can also be specified with environment variables. They should be prefixed with `SUBQL_AI_` and the flag renambed to capitalized snake case. E.g `SUBQL_AI_CACHE_DIR`

### `subql-ai`

Run an AI app.

```shell
subql-ai -p ./path/to/manifest.ts
```

### `info`

Get information on a project.

```shell
subql-ai info -p ./path/to/manifest.ts
```

::: details Example output

```json
Project Information:
    Model:
      llama3.1
    Conifg:
      GRAPHQL_ENDPOINT: https://gateway.subquery.network/query/QmcoJLxSeBnGwtmtNmWFCRusXVTGjYWCK1LoujthZ2NyGP
        "type": "object",
        "properties": {
          "GRAPHQL_ENDPOINT": {
            "default": "https://gateway.subquery.network/query/QmcoJLxSeBnGwtmtNmWFCRusXVTGjYWCK1LoujthZ2NyGP",
            "type": "string"
          },
          "BASE_RPC": {
            "default": "https://gateway.subquery.network/rpc/base-full",
            "type": "string"
          },
          "BASE_SQT_ADDR": {
            "default": "0x858c50C3AF1913b0E849aFDB74617388a1a5340d",
            "type": "string"
          }
        },
        "required": [
          "GRAPHQL_ENDPOINT",
          "BASE_RPC",
          "BASE_SQT_ADDR"
        ]
      }
    Tools:
      TotalDelegation
      DelegatedIndexers
      UnclaimedDelegatorRewards
      CurrentDelegatorApy
      BetterIndexerApy
      TokenBalance
      SubqueryDocs
    System Prompt:

      You are an agent designed to help a user with their token delegation on the SubQuery Network.
      Given an input question, use the available tools to answer the users question quickly and concisely.
      You answer must use the result of the tools available.
      Do not mention that you used a tool or the name of a tool.
      If you need more information to answer the question, ask the user for more details.
      All token amounts are in SQT.

      If the question seems to be unrelated to the API, just return "I don't know" as the answer.

    Endpoints:
      gateway.subquery.network
    Vector Storage:
      Type: lancedb
      Path: ipfs://QmbELwJY7akcah3Ds5taT3KSN3aPG8xUv5poJ8crdhXrhx

```

:::

### `embed-mdx`

Creates a Lance db table with embeddings from MDX files

```shell
subql-ai embed-mdx -i ./path/to/dir/with/markdown -o ./db --table your-table-name
```

### `repl`

When you have a running app you can run this in another terminal as a CLI interface for chatting with the App.

Type `/bye` to exit

```shell
subql-ai repl
```

### `publish`

Publish your project to IPFS, this is how you can distribute your project

```shell
subql-ai publish -p ./path/to/manifest.ts
```

::: tip Info
You can use the `--silent` flag to only output the IPFS url. This is useful with CI pipelines.
:::

::: details example output

```
✔ Loaded project manifest
✔ Loaded project
✔ Generated project bundle
✔ Published project code
✔ Published vector db
✔ Published project to IPFS
ipfs://QmSejMf351cHqNTEbmJDziVLJ26r3hyepq1e6wbnejvgqM
```

:::
