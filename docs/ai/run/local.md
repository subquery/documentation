# Running Locally

Now that you have made your application and built it, you can run it locally to test it out. To do so run the following command, where the `-p` is the path to the `manifest.ts`, and `-h` is the URL of the Ollama endpoint:

```shell
subql-ai -p ./path/to/manifest.ts -h  http://ollama.public.url
```

Once the project is running you should see the following: `Listening on http://0.0.0.0:7827/`

You can now interact with your application. The easiest way to do that is to run the repl in another terminal.

```shell
subql-ai repl
```

This will start a CLI chat. You can type `/bye` to exit.

Alternatively you can [run with docker](./docker.md) to get a web UI.

You may want to refer to the [command line arguments](../run/cli.md) used in SubQuery AI App Framework. It will help you understand the commands better.
