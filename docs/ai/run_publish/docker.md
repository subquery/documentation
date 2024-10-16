# Docker

A docker image is provided for running applications.

## Docker Compose

This is an example docker compose which runs an app from IPFS with the given project (`-p=ipfs://QmNaNBhXJoFpRJeNQcnTH8Yh6Rf4pzJy6VSnfnQSZHysdZ`)

It also includes a web UI for testing purposes.
To use the web UI head to [http://localhost:8080](http://localhost:8080) and select the `subql-ai-0` model then start chatting.

::: warning
Docker compose doesn't currently support running local projects as dependencies are not resolved.
This is something that will be fixed in the future.
:::

```yml
services:
  subql-ai:
    image: subquerynetwork/subql-ai-app
    ports:
      - 7827:7827
    restart: unless-stopped
    volumes:
      - ./:/app
    command:
      - ${SUB_COMMAND:-}
      - -p=ipfs://QmNaNBhXJoFpRJeNQcnTH8Yh6Rf4pzJy6VSnfnQSZHysdZ
      - -h=http://host.docker.internal:11434
    healthcheck:
      test: ["CMD", "curl", "-f", "http://subql-ai:7827/ready"]
      interval: 3s
      timeout: 5s
      retries: 10

  # A simple chat UI
  ui:
    image: ghcr.io/open-webui/open-webui:main
    ports:
      - 8080:8080
    restart: always
    depends_on:
      "subql-ai":
        condition: service_healthy
    environment:
      - "OPENAI_API_BASE_URLS=http://subql-ai:7827/v1"
      - "OPENAI_API_KEYS=foobar"
      - "WEBUI_AUTH=false"
    volumes:
      - open-webui:/app/backend/data

volumes:
  open-webui:

```
