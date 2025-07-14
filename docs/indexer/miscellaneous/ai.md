# AI integration

## Model Context Protocol (MCP)

The SubQuery SDK supports MCP for supercharging development of SubQuery projects with AI tools. MCP allows you to create, build, and deploy SubQuery projects using AI IDEs like Cursor.

The integration runs locally in the same way the CLI is run, it requires no login, authentication or access to any private keys.

### Features

The SubQuery MCP integration supports all the same functionality as the CLI, including:
* Creating new SubQuery projects
* Building SubQuery projects
* Publishing SubQuery projects to IPFS
* Importing Contract ABIs into your project to generate datasources
* Deploying to OnFinality managed services


### Installing SubQuery MCP

For easy installation you can click the following buttons to install SubQuery MCP:

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-light.svg)](https://cursor.com/install-mcp?name=subquery&config=ewogICJzdWJxdWVyeSI6IHsKICAgICJjb21tYW5kIjogIm5weCIsCiAgICAiYXJncyI6IFsKICAgICAgIi15IiwKICAgICAgIkBzdWJxbC9jbGkiLAogICAgICAibWNwIgogICAgXQogIH0KfQ==)

<!-- {"name":"SubQuery","gallery":true,"command":"npx","args":["-y","@subql/cli","mcp"]} -->
[![VSCode Install MCP Server](https://img.shields.io/badge/VS_Code-NPM-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=SubQuery&inputs=%7B%22id%22%3A%22workingDirectory%22%2C%22type%22%3A%22promptString%22%2C%22description%22%3A%22Working%20Directory%22%7D&config=%7B%22type%22%3A%22stdio%22%2C%22command%22%3A%22npx%22%2C%22cwd%22%3A%22%24%7Binput%3AworkingDirectory%7D%22%2C%22args%22%3A%5B%22-y%22%2C%22%40subql%2Fcli%22%2C%22mcp%22%5D%7D)


#### Manual configuration

For adding SubQuery MCP into other tools, the following command needs be run by the client. This will vary depending on the client that

```bash
npx -y @subql/cli mcp
```

An example manual configuration:

```json
"subquery": {
  "command": "npx",
  "args": ["-y", "@subql/cli", "mcp"]
}
```

### Examples

* `Create a new subquery project called new-subquery for the base network`
* `Import a contract with the address 0x08e587bc0F634F5a97Cd38F73a9F55bC53B4e054 and it was deployed at block 32364699. It should index the Transfer event.`
