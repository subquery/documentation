# Environment Variable Support

SubQuery allows you to configure your project dynamically using environment variables. This makes it easy to manage different settings for development, testing, and production environments.

## Getting Started

When you initialize a SubQuery project with the CLI, `.env` files are created automatically. Edit these files to adjust your configuration:

```shell
# .env (production)
ENDPOINT=https://polygon-rpc.com
CHAIN_ID=204
```

* **ENDPOINT**
  Comma-separated list of RPC endpoints for your network.

  ```shell
  ENDPOINT=https://polygon-rpc.com,https://polygon.llamarpc.com
  ```
* **CHAIN\_ID**
  Numeric ID of your target blockchain network (e.g. `204` for Polygon zkEVM).

You can also store sensitive values—such as contract addresses or API keys—in your `.env` files:

```shell
CONTRACT_ADDRESS=0x1234...abcd
API_KEY=your_api_key_here
```

---

## Build Scripts

Your `package.json` includes two build scripts. By default, `build` uses `.env`. Use `build:develop` to load `.env.develop` instead.

```jsonc
"scripts": {
  // Uses production settings from .env
  "build": "subql codegen && subql build",
  
  // Uses development settings from .env.develop
  "build:develop": "NODE_ENV=develop subql codegen && NODE_ENV=develop subql build"
}
```

* **build**
  Generate project artifacts with production variables.
* **build\:develop**
  Generate project artifacts with development variables (`NODE_ENV=develop`).

---

## Best Practices

* **Version control**: Add your `.env*` files to `.gitignore` to avoid committing sensitive data.
* **Multiple environments**: Maintain separate files (e.g. `.env`, `.env.develop`, `.env.test`).
* **Documentation**: Keep a template (e.g. `.env.example`) in source control to show required variable names without real values.

Using environment variables in SubQuery helps you maintain flexible, secure, and environment-specific configurations.
