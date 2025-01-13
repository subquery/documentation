## 5. Add a function tool

Function tools are functions that extend the functionality of the LLM. They can be used to do many things like request data from external APIs and services, perform computations or analyse structured data outputs from the AI. You can [read more about function tooling here](../../build/function_tools.md).

Function tools consist of 4 parts:

- `name`: The name of the tool, this is used to identify the tool and must be unique amongst the provided tools.
- `description`: This is like a system prompt for the LLM to understand what the tool does and when it should be used, it should be as descriptive as possible as it allows the AI to determine when to use the tool and what it should be used for.
- `parameters`: This defines what parameters the LLM needs to gather in order to run the tool.
- `call`: This is the function implementation that takes an input that should match the defined parameters and return a string with the result.