# Testing Framework Documentation

## Overview

This document outlines the testing framework used for Subquery projects. The testing framework provides an easy way to test the behavior of mapping handlers and validate the data being indexed.

## Usage

To use the testing framework, you need to:

1. Create test files with the naming convention *.test.ts and place them in the src/tests folder. Each test file should contain test cases for specific mapping handlers.
2. Run the testing service using the command: `subql-node test`.

## Writing Test Cases

Test cases should be written using the `subqlTest()` function with the following parameters:

- **name**: A string containing the name of the test.
- **blockHeight**: The height of the block used in the test.
- **dependentEntities**: An array of entities that are required for the test to run.
- **expectedEntities**: An array of entities that are expected after the mapping handler has run.
- **handler**: The name of the mapping handler function to test.

### Example test case

```javascript

// Example handleBlock function
/*
export async function handleBlock(block: SubstrateBlock): Promise<void> {
  // Create a new starterEntity with ID using block hash
  let record = new StarterEntity(block.block.header.hash.toString());
  // Record block number
  record.field1 = block.block.header.number.toNumber();
  await record.save();
}
*/

subqlTest(
  "handleBlock test",
  102,
  [],
  [
    StarterEntity.create({
      id: '0x44e94d2e22be8f915c19e18d221260232516c40db63553d8e2d9c5ff63aae9c1',
      field1: 102,
      field2: null,
      field3: null,
      field4: null,
      field5: null,
    }),
  ],
  'handleBlock',
);
```

## Testing Framework Implementation

The core of the testing framework is the TestingService class, which is responsible for:

- Discovering and importing test files.
- Running test cases in a sandboxed environment.
- Logging test results.

## Running Tests

To run the tests, execute the subql-node test command. The testing service will discover and import test files, run the tests, and log the results.

Example output:

Passing test:


Failing test:

