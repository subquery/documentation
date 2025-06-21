# ENV Support

SubQuery provides support for environment variables to configure your project dynamically. This enables flexibility in managing different configurations for development, testing, and production environments.

To utilise environment variable support:

The .env files are automatically created when you initialise a project using the CLI. You can modify these files to adjust configurations according to your requirements.

```shell
# Example .env
ENDPOINT=https://polygon-rpc.com
CHAIN_ID=204
```

In your .env files, _CHAIN_ID_ and provided _ENDPOINT_ of your project are already added you can configure these variables to match your blockchain network settings. Additionally, you can keep sensitive information such as _CONTRACT_ADDRESS_ from project.ts in your .env files for added security.

Multiple ENDPOINT can be added in .env file using comma separated.

```shell
ENDPOINT=https://polygon-rpc.com,https://polygon.llamarpc.com
```

The package.json file includes build scripts that allow you to build with either production (`.env`) or development (`.env.develop`).

```json
"scripts": {
    "build": "subql codegen && subql build", // default is production, if you have `@subql/cli` version `5.0.0` or above, you will need to install `@subql/common-<network>` package in the dependencies before execute this command.
    "build:develop": "NODE_ENV=develop subql codegen && NODE_ENV=develop subql build"
}
```

Use `build` script to generate artefacts using the default production .env settings.
Use `build:develop` script to generate artefacts using the development .env.develop settings.

Using environment variables and .env files provides a convenient way to manage project configurations and keep sensitive information secure.

Note: Ensure that .env files are NOT included in your project's .gitignore to prevent them from being committed to version control and exposing sensitive information.

This documentation provides comprehensive guidance on utilizing environment variable support in SubQuery projects for better configurability and security.
