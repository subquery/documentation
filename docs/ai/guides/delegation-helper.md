# SubQuery Network Delegation Helper - Complex Example with Advanced Function tools

This is a more advanced example of a SubQuery AI application. It is an agent specifically designed to assist users with questions relating to their token delegation on the SubQuery Network. The agent utilizes multiple tools to extract and interpret relevant information about delegation from raw on-chain data (indexed using SubQuery of course).

This showcases an excellent integration of an AI framework with the SubQuery Indexing SDK, enabling the structuring of natural language responses based on on-chain data.

:::info note
You can follow along in the tutorial with the [example code here](https://github.com/subquery/subql-ai-app-example/tree/main/network-delegation-helper).
:::

<!-- @include: ../snippets/prerequisites.md -->

## 1. Install the framework

<!-- @include: ../snippets/install-the-framework.md -->

## 2. Create a New App

<!-- @include: ../snippets/create-a-new-app.md -->

## 3. Configure Manifest File

<!-- @include: ../snippets/configure-manifest-file.md -->

We need to update the manifest file to the following:

```ts
/** Gets the host names of any urls in a record */
export function extractConfigHostNames(
  config: Record<string, string>
): string[] {
  const hosts = Object.values(config)
    .filter((v) => typeof v === "string")
    .map((v) => {
      try {
        return new URL(v).hostname;
      } catch (_e) {
        return undefined;
      }
    })
    .filter((v) => !!v) as string[]; // Cast should be unnecessary with latest TS versions

  // Make unique
  return [...new Set(hosts)];
}

const defaultConfig = Value.Default(ConfigType, {} as Config) as Config;

const project: ProjectManifest = {
  specVersion: "0.0.1",
  endpoints: extractConfigHostNames(defaultConfig),
  config: JSON.parse(JSON.stringify(ConfigType)), // Convert to JSON Schema
  model: "llama3.1",
  entry: "./project.ts",
};

export default project;
```

The code includes the import of necessary types and functions, the definition of a utility function, and the creation of a project manifest object. Since we're sharing the config logic between the manifest file and the app's code, we import `ConfigType`, which we will explain later during the code explaination.

## 4. Configure App's Logic

<!-- @include: ../snippets/configure-app-logic.md -->

<!-- @include: ../snippets/update-system-prompt.md -->

```ts
const PROMPT = `
You are an agent designed to help a user with their token delegation on the SubQuery Network.
Given an input question, use the available tools to answer the users question quickly and concisely.
You answer must use the result of the tools available.
Do not mention that you used a tool or the name of a tool.
If you need more information to answer the question, ask the user for more details.
All token amounts are in SQT.

If the question seems to be unrelated to the API, just return "I don't know" as the answer.
`;
```

<!-- @include: ../snippets/add-a-function-tool.md -->

Since delegation data can only be derived from chain events, it must be pre-indexed to enable faster and simpler querying. For this reason, we are including a relevant GraphQL endpoint that provides access to this data. Additionally, we are establishing a connection to an RPC to retrieve token balances, although the same results could be achieved if the indexer were configured to include balance data.

Each tool can be assigned specific endpoints to ensure requests are routed correctly. Importantly, this data does not need to be hardcoded and can be provided dynamically in response to the LLM's request. In our case, the configuration might look like this:

```ts
export const ConfigType = Type.Object({
  GRAPHQL_ENDPOINT: Type.String({
    default: "https://api.subquery.network/sq/subquery/subquery-mainnet",
  }),
  BASE_RPC: Type.String({
    default: "https://gateway.subquery.network/rpc/base-full",
  }),
  BASE_SQT_ADDR: Type.String({
    default: "0x858c50C3AF1913b0E849aFDB74617388a1a5340d",
  }),
});

export type Config = Static<typeof ConfigType>;
```

You can now include the tools in the array and supply the configuration during initialisation:

```ts
const entrypoint: ProjectEntry = async (config: Config): Promise<Project> => {
  return {
    tools: [
      new TotalDelegation(config.GRAPHQL_ENDPOINT),
      new DelegatedIndexers(config.GRAPHQL_ENDPOINT),
      new UnclaimedDelegatorRewards(config.GRAPHQL_ENDPOINT),
      new CurrentDelegatorApy(config.GRAPHQL_ENDPOINT),
      new BetterIndexerApy(config.GRAPHQL_ENDPOINT),
      new TokenBalance(
        new JsonRpcProvider(config.BASE_RPC),
        config.BASE_SQT_ADDR
      ),
    ],
    systemPrompt: PROMPT,
  };
};

export default entrypoint;
```

Once the tools are added to the array, you can proceed with implementing them.

As mentioned earlier, there are two methods for obtaining data: using an SDK to access indexed data via GraphQL queries and fetching data directly from the RPC node.

Given the number of tools included in the project, the logic can be modularized and split across multiple files. To achieve this, the original project will include a dedicated `tools.ts` file for managing these tools.

### 4.1 Obtaining Data from Indexers

Let’s take the `TotalDelegation` tool as an example to illustrate its implementation in detail. This tool calculates the total delegation amount of SQT for a given user address. If no delegation is found, it returns `null`. You can view the tool's implementation here:

```ts
export class TotalDelegation extends FunctionTool {
  constructor(readonly endpoint: string) {
    super();
  }

  // name = 'total-delegation-amount';
  description = `This tool gets the total delegation amount of SQT for the given user address.
  If no delegation is found it will return null.
  `;
  parameters = {
    type: "object",
    required: ["account"],
    properties: {
      account: {
        type: "string",
        description:
          "The account or address of the user which to get delegation information for",
      },
    },
  };

  async call({ account }: { account: string }): Promise<string | null> {
    try {
      const res = await grahqlRequest<{
        delegator: null | { totalDelegations: Amount };
      }>(
        this.endpoint,
        `{
        delegator(id: "${account}") {
          totalDelegations
        }
      }`
      );

      if (!res.delegator) {
        return null;
      }

      return formatEther(res.delegator.totalDelegations.valueAfter.value);
    } catch (error) {
      return `${error}`;
    }
  }
}
```

The `TotalDelegation` tool queries a GraphQL endpoint to retrieve this information. If no delegation is found for the specified user address, it returns null.

Every tool utilising GraphQL depends on an external function named `graphqlRequest`, which can be relocated to a separate file and implemented as follows:

```ts
export async function grahqlRequest<T = unknown>(
  endpoint: string,
  query: string,
  variables?: unknown
): Promise<T> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const res = await response.json();

  if (res.errors) {
    console.log(`Request failed\n${query}`);

    throw new Error(
      res.errors.map((e: { message: string }) => e.message).join("\n")
    );
  }

  return res.data;
}
```

This function is an asynchronous utility created to send GraphQL requests to a designated endpoint. It is a generic function, enabling the caller to define the expected structure of the response data.

### 4.2 Fetching Data Directly from RPC

In our example, only the `TokenBalance` tool retrieves data directly from the node. Let’s review its implementation:

```ts
export class TokenBalance extends FunctionTool {
  constructor(
    readonly provider: AbstractProvider,
    readonly tokenAddress: string
  ) {
    super();
  }

  // name = 'token-balance';
  description = `This tool gets the current on chain SQT balance for the given address`;
  parameters = {
    type: "object",
    required: ["account"],
    properties: {
      account: {
        type: "string",
        description:
          "The account or address of the user which to get the balance for",
      },
    },
  };

  async call({ account }: { account: string }): Promise<string | null> {
    try {
      // Step 3: Define the ERC-20 contract ABI (only need the 'balanceOf' function)
      const erc20Abi = [
        "function balanceOf(address owner) view returns (uint256)",
      ];

      const erc20Contract = new Contract(
        this.tokenAddress,
        erc20Abi,
        this.provider
      );

      const balance = await erc20Contract.balanceOf(account);

      return formatEther(balance);
    } catch (error) {
      return `${error}`;
    }
  }
}
```

The tool is built to fetch the current on-chain balance of a specific token (SQT) for a given user address. The class constructor accepts two parameters: `provider`, an instance of AbstractProvider used to interact with the blockchain, and `tokenAddress`, the address of the token contract, both of which are hardcoded.

## 5. Run the AI App

<!-- @include: ../snippets/run-the-ai-app.md -->

Let's now try asking questions and obtaining responses using the previously demonstrated tools. For example, to extract the total delegations, you can use the following prompt:

```
What is the total delegation amount of SQT done for me?
```

This will return a response like:

```
The total delegation amount of SQT done for you is: 1000 SQT
```

This number is obtained from the indexer endpoint and can be cross-verified through a direct GraphQL query or another method to ensure accuracy and avoid bias.

To test the second tool, you can use this prompt:

```
What is my balance?
```

Which will return:

```
Your balance is 12442989724000780042135 SQT
```

This number is fetched directly from the RPC node, and further modifications such as type casting can be requested.

Other useful prompts for this project could include:

```
"My address is 0x108A496cDC32DA84e4D5905bb02ED695BC1024cd, use this for any further prompts. What is my delegation?",
"Who am I delegating to?",
"What is my balance?",
"Do I have any unclaimed rewards?",
"What is my current APY?",
"Are there better indexers to delegate to?"
```

## Summary

You now have a functional SubQuery AI App that utilizes the latest LLMs and integrates various function tools that access blockchain data. This example serves as a foundation for building your own tools that leverage on-chain data, allowing you to query it in a convenient way and enabling real-time data analysis through simple natural language prompts.

[**A full version of the code for this guide can be found here**](https://github.com/subquery/subql-ai-app-example/tree/main/fancy-greeter).

<!-- @include: ../snippets/summary.md -->
