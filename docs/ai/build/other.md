# Other

Other random bits of information that don't yet have a place

* Don't use a `deno.json` file in your project for import maps. They won't be resolved when publishing.
* The http interface implements OpenAPI interface methods:
  * [GET `/v1/models`](https://platform.openai.com/docs/api-reference/models)
  * [POST `/v1/chat/completions`](https://platform.openai.com/docs/api-reference/chat/create)
