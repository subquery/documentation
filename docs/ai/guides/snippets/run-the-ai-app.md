We can run the project at any time using the following command, where the `-p` is the path to the `manifest.ts`, and `-h` is the URL of the Ollama endpoint.

```bash
subql-ai -p ./manifest.ts -h http://host.docker.internal:11434
```

Once the project is running you should see the following: `Listening on http://0.0.0.0:7827/`

You can now interact with your application. The easiest way to do that is to run the repl in another terminal.

```shell
subql-ai repl
```

This will start a CLI chat. You can type `/bye` to exit.

You should review the instructions on [running locally](../../run/local.md) or via [Docker](../../run/docker.md).

Alternatively you can [run with docker](./docker.md) to get a web UI.

You may want to refer to the [command line arguments](../../run/cli.md) used in SubQuery AI App Framework. It will help you understand the commands better.