# Function Tools

You can extend your AI Apps with additional function tooling, facilitating connections to external systems and tools. This capability enables rich integrations, allowing users to create versatile applications that can interact seamlessly with blockchains and other ecosystems.

Function tools are functions that extend the functionality of the LLM. They can be used to do many things like request data from external APIs and services, perform computations or analyse structured data outputs from the AI.

An example of a simple tool is making a GraphQL query from a specific SubQuery indexing sdk project.

## Defining a function tool

Fucntion tools consist of 4 parts:

- `name`: The name of the tool, this is used to identify the tool and must be unique amongst the provided tools
- `description`: This is like a system prompt for the LLM to understand what the tool does and when it should be used, it should be as perscripte as possible as it allows the AI to determe when to use the tool and what it should be used for.
- `parameters`: This defines what parameters the LLM needs to gather in order to run the tool.
- `call`: This is the function implementation that takes an input that should match the defined parameters and return a string with the result.

### Example

This tool example makes a graphql request to get the amount of SQT a wallet address has delegated on the SubQuery network.

```ts
import { FunctionTool, type IContext } from "jsr:@subql/ai-app-framework";

export class TotalDelegation extends FunctionTool {
  constructor(readonly endpoint: string) {
    super();
  }

  // The name can be inferred from the class name or if you wish to be explicit it can be done here
  // name = 'total-delegation-amount';
  description = `This tool gets the total delegation amount of SQT for the given user address.
If no delegation is found it will return null.`;
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

  async call(
    { account }: { account: string },
    ctx: IContext
  ): Promise<string | null> {
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

### Context

Tool calls have access to a context. This provides relevant functions that a tool can use relating to the LLM and Vector DB.

It has the following interface:

```ts
type IContext = {
  // Converts text into vector data using the nomic-embed-text model
  computeQueryEmbedding: (query: string) => Promise<number[]>;
  // Searches the provided vector DB with vector data from computeQueryEmbedding and returns matching resuls
  vectorSearch: (table: string, vector: number[]) => Promise<any[]>;
};
```
